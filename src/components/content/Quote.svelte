<script lang="ts">
  import ParagraphLine from './ParagraphLine.svelte'
  export let line: Quote
</script>

<blockquote>
  <ParagraphLine lines={line.citations} />
</blockquote>

<style>
  blockquote {
    padding: 0.5em;
    background-color: turquoise;
  }
</style>
