import { BlankNode, CodeNode, CommandLineNode, DecorationNode, FormulaNode, getTitle, GoogleMapNode, HashTagNode, HelpfeelNode, IconNode, ImageNode, Line, LinkNode, Node, Page, parse, PlainNode, QuoteNode, StrongIconNode, StrongImageNode, StrongNode } from "@progfay/scrapbox-parser"
import { derived, writable } from 'svelte/store'

interface Gamebook {
  current?: Content
  parsed?: Page
  raw?: string
}

interface Content {
  title: string
  paragraphs: Paragraph[]
}

interface Paragraph {
  lines: ParagraphLine[]
  hide?: boolean
}

type ParagraphLine = Quote | Image | BlankSpace | Link | PlainText

interface Quote {
  citations: ParagraphLine[]
}

interface Image {
  imageSource: string
}

interface BlankSpace {
  space: string
}

interface Link {
  nextPage: string
}

interface PlainText {
  value: string
  crlf: boolean
}

function newGamebook() {
  const { subscribe, set, update } = writable(defaultGamebook())

  return {
    subscribe,
    goTo: (text: string) => update(state => goTo(state, text)),
    handleError: (err: Error) => update(state => handleError(state, err))
  }
}

function defaultGamebook(): Gamebook {
  return {
    current: null
  }
}

function goTo(state: Gamebook, text: string): Gamebook {
  const title = getTitle(text)
  const page = parse(text, { hasTitle: true })
  const content = buildContent(title, page)

  errors.set(null)

  return {
    ...state,
    current: content,
    parsed: page,
    raw: text
  }
}

function buildContent(title: string, page: Page): Content {
  const paragraphs: Paragraph[] = page
    .filter(block => block.type === 'line')
    .map(block => {
      return traverseLine(block as Line)
    })
    .reduceRight((acc: Paragraph[], cur: Paragraph) => {
      // いま要約しようとしている段落が：
      // 　・段落の切れ目である
      // 現時点の先頭の段落が：
      // 　・段落の切れ目である
      // 　・引用ブロックである
      // 　・通常の段落である
      if (!cur.lines.length) {
        acc.unshift({
          ...cur,
          hide: true
        })
        return acc
      }

      const crlf = {
        value: '',
        crlf: true
      } as PlainText

      const target = acc[0]

      // いま要約しようとしている段落が：
      // 　・引用ブロックである
      // 　・通常の段落である
      // 現時点の先頭の段落が：
      // 　・段落の切れ目である
      if (!target.lines.length) {
        acc.unshift(cur)
        return acc
      }

      // いま要約しようとしている段落が：
      // 　・通常の段落である
      // 現時点の先頭の段落が：
      // 　・引用ブロックである     --> TODO これを分けたい acc.unshift(cur) に！！！
      // 　・通常の段落である
      if (!cur.lines.some(line => 'citations' in line)) {
        target.lines = cur.lines.concat(crlf).concat(target.lines)
        return acc
      }

      // いま要約しようとしている段落が：
      // 　・引用ブロックである
      // 現時点の先頭の段落が：
      // 　・通常の段落である
      if (!target.lines.some(line => 'citations' in line)) {
        acc.unshift(cur)
        return acc
      }

      // いま要約しようとしている段落が：
      // 　・引用ブロックである
      // 現時点の先頭の段落が：
      // 　・引用ブロックである
      const accAsQuote = target.lines[target.lines.length - 1] as Quote
      const curAsQuote = cur.lines[cur.lines.length - 1] as Quote
      accAsQuote.citations = curAsQuote.citations.concat(crlf).concat(accAsQuote.citations)
      return acc
    }, [{
      lines: []
    }])

  return {
    title,
    paragraphs
  }
}

function traverseLine(block: Line): Paragraph {
  const lines: ParagraphLine[] = block.nodes
    .map(node => traverseNode(node))
    .flat()
  return {
    lines
  }
}

function traverseNode(node: Node): ParagraphLine[] {
  if (node.type === 'quote') {
    return [traverseQuoteNode(node as QuoteNode)]
  }
  if (node.type === 'helpfeel') {
    return [traverseHelpfeelNode(node as HelpfeelNode)]
  }
  if (node.type === 'strongImage') {
    return [traverseStrongImageNode(node as StrongImageNode)]
  }
  if (node.type === 'strongIcon') {
    return [traverseStrongIconNode(node as StrongIconNode)]
  }
  if (node.type === 'strong') {
    return traverseStrongNode(node as StrongNode)
  }
  if (node.type === 'formula') {
    return [traverseFormulaNode(node as FormulaNode)]
  }
  if (node.type === 'decoration') {
    return traverseDecorationNode(node as DecorationNode)
  }
  if (node.type === 'code') {
    return [traverseCodeNode(node as CodeNode)]
  }
  if (node.type === 'commandLine') {
    return [traverseCommandLineNode(node as CommandLineNode)]
  }
  if (node.type === 'blank') {
    return [traverseBlankNode(node as BlankNode)]
  }
  if (node.type === 'image') {
    return [traverseImageNode(node as ImageNode)]
  }
  if (node.type === 'link') {
    return [traverseLinkNode(node as LinkNode)]
  }
  if (node.type === 'googleMap') {
    return [traverseGoogleMapNode(node as GoogleMapNode)]
  }
  if (node.type === 'icon') {
    return [traverseIconNode(node as IconNode)]
  }
  if (node.type === 'hashTag') {
    return traverseHashTagNode(node as HashTagNode)
  }
  if (node.type === 'plain') {
    return [traversePlainNode(node as PlainNode)]
  }
}

function traverseQuoteNode(node: QuoteNode): ParagraphLine {
  const citations: ParagraphLine[] = node.nodes
    .map(child => traverseNode(child))
    .flat()
  return {
    citations
  } as Quote
}

function traverseHelpfeelNode(node: HelpfeelNode): ParagraphLine {
  return {
    value: node.raw,
    crlf: false
  } as PlainText
}

function traverseStrongImageNode(node: StrongImageNode): ParagraphLine {
  return {
    imageSource: node.src
  } as Image
}

function traverseStrongIconNode(node: StrongIconNode): ParagraphLine {
  return {
    value: `${node.path}.icon`,
    crlf: false
  } as PlainText
}

function traverseStrongNode(node: StrongNode): ParagraphLine[] {
  return node.nodes
    .map(child => traverseNode(child))
    .flat()
}

function traverseFormulaNode(node: FormulaNode): ParagraphLine {
  return {
    value: node.raw,
    crlf: false
  } as PlainText
}

function traverseDecorationNode(node: DecorationNode): ParagraphLine[] {
  return node.nodes
    .map(child => traverseNode(child))
    .flat()
}

function traverseCodeNode(node: CodeNode): ParagraphLine {
  return {
    value: node.text,
    crlf: false
  } as PlainText
}

function traverseCommandLineNode(node: CommandLineNode): ParagraphLine {
  return {
    value: node.raw,
    crlf: false
  } as PlainText
}

function traverseBlankNode(node: BlankNode): ParagraphLine {
  return {
    space: node.text.split('').map(i => '&nbsp;').join('')
  } as BlankSpace
}

function traverseImageNode(node: ImageNode): ParagraphLine {
  return {
    imageSource: node.src
  } as Image
}

function traverseLinkNode(node: LinkNode): ParagraphLine {
  if (node.pathType === 'relative') {
    return {
      nextPage: node.href
    } as Link
  }
  if (node.pathType === 'absolute') {
    if (isLikeImage(node.href)) {
      return {
        imageSource: node.href
      } as Image
    } else {
      return {
        value: node.href,
        crlf: false
      } as PlainText
    }
  }
  if (node.pathType === 'root') {
    return {
      value: node.href,
      crlf: false
    } as PlainText
  }
}

function isLikeImage(href: string) {
  if (href.endsWith('.webp')) {
    return true
  }
  return false
}

function traverseGoogleMapNode(node: GoogleMapNode): ParagraphLine {
  return {
    value: node.raw,
    crlf: false
  } as PlainText
}

function traverseIconNode(node: IconNode): ParagraphLine {
  return {
    value: `${node.path}.icon`,
    crlf: false
  } as PlainText
}

function traverseHashTagNode(node: HashTagNode): ParagraphLine[] {
  return [
    {
      nextPage: node.href
    } as Link

  ]
}

function traversePlainNode(node: PlainNode): ParagraphLine {
  return {
    value: node.text,
    crlf: false
  } as PlainText
}

function handleError(state: Gamebook, err: Error): Gamebook {
  console.error(err)
  errors.set(err)
  return state
}

export const gamebook = newGamebook()

export const isLoading = derived(gamebook, state => !state.current, false)

export const errors = writable(null)

export const isError = derived(errors, state => !!state)
