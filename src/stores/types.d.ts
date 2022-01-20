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
