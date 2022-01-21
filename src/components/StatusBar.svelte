<script lang="ts">
  import { isError } from '../stores/gamebook'
</script>

<div class="status-bar">
  {#if $isError}
    <div class="error">通信エラー</div>
  {:else}
    <div class="normal">&#x2713;</div>
  {/if}
</div>

<style>
  .status-bar {
    display: flex;
    height: 22px;
  }

  .status-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 300;
  }

  .status-bar {
    font-size: 12px;
    line-height: 14px;
  }

  .error,
  .normal {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 0.5em;
    padding-right: 0.5em;

    border: 1px solid;
    border-top-left-radius: 4px;
  }

  .error {
    border-color: orangered;
    color: floralwhite;
    background-color: orangered;
  }

  .normal {
    border-color: lightgray;
    color: #333;
    background-color: lightgray;
  }
</style>
