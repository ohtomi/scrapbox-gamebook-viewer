<script lang="ts">
  import PageLeftSide from './PageLeftSide.svelte'
  import PageCenter from './PageCenter.svelte'
  import PageRightSide from './PageRightSide.svelte'
</script>

<div class="page">
  <PageLeftSide />
  <PageCenter on:goto />
  <PageRightSide />
</div>

<style>
  .page {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
</style>
