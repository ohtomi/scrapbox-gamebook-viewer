<script lang="ts">
  import { gamebook, isError, isLoading } from '../stores/gamebook'
  import Paragraph from './content/Paragraph.svelte'
</script>

<div class="page-center">
  {#if $isLoading}
    <span>loading...</span>
  {:else}
    <div>
      <h1>{$gamebook.current.title}</h1>
      <Paragraph on:goto />
    </div>
  {/if}
  {#if $isError}
    <div class="errors">なんだか調子が悪いみたいです</div>
  {/if}
</div>

<style>
  .page-center {
    max-width: 960px;
    width: 960px;
    background-color: whitesmoke;
  }
</style>
