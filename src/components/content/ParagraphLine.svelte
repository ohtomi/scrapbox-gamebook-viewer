<script lang="ts">
  import Quote from './Quote.svelte'
  import Image from './Image.svelte'
  import BlankSpace from './BlankSpace.svelte'
  import Link from './Link.svelte'
  import PlainText from './PlainText.svelte'

  export let lines: ParagraphLine[]
</script>

{#each lines as line}
  {#if 'citations' in line}<Quote {line} />{/if}
  {#if 'imageSource' in line}<Image {line} />{/if}
  {#if 'space' in line}<BlankSpace {line} />{/if}
  {#if 'nextPage' in line}<Link on:goto {line} />{/if}
  {#if 'value' in line}<PlainText {line} />{/if}
{/each}
