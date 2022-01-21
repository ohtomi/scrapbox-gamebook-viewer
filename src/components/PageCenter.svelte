<script lang="ts">
  import { gamebook, isLoading } from '../stores/gamebook'
  import Paragraph from './content/Paragraph.svelte'
</script>

<div class="page-center">
  {#if $isLoading}
    &nbsp;
  {:else}
    <div>
      <h1>{$gamebook.current.title}</h1>
      <Paragraph on:goto />
    </div>
  {/if}
</div>

<style>
  .page-center {
    max-width: 960px;
    width: 960px;
  }

  .page-center {
    padding-left: 8px;
    padding-right: 8px;

    border-radius: 4px;
  }

  .page-center {
    font-family: 'Roboto', Helvetica, Arial, 'Hiragino Sans', sans-serif;
    font-size: 14px;
    line-height: 28px;

    color: #333;
    background-color: whitesmoke;
  }

  h1 {
    font-size: 1.73em;
    font-weight: 400;
    line-height: 42px;
  }
</style>
