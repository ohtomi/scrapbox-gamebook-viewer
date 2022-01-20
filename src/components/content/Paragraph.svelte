<script lang="ts">
  import { gamebook } from '../../stores/gamebook'
  import ParagraphLine from './ParagraphLine.svelte'
</script>

{#each $gamebook.current.paragraphs as paragraph}
  {#if !paragraph.hide}
    <p>
      <ParagraphLine on:goto lines={paragraph.lines} />
    </p>
  {/if}
{/each}
