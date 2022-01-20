<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import * as apiClient from '../stores/api-client'
  import { project } from '../stores/project'
  import { gamebook, isError, isLoading } from '../stores/gamebook'

  const href = '#'

  function onClickNextPage(nextPage: string, e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    goTo($project.name, nextPage)
  }

  function goTo(project: string, page: string) {
    apiClient.fetchPageText(project, page)
      .then(text => gamebook.goTo(text))
      .catch(err => gamebook.handleError(err))
  }

  onMount(() => {
    goTo($project.name, $project.topPage)
  })

  afterUpdate(() => {
    window.scrollTo(0, 0)
	});
</script>

<main>
  <div>
    {#if $isLoading}
      <span>loading...</span>
    {:else}
      <div>
        <h1>{$gamebook.current.title}</h1>
        {#each $gamebook.current.paragraphs as paragraph}
          {#if !paragraph.hide}
            <p>
              {#each paragraph.lines as line}
                {#if 'citations' in line}<blockquote>{#each line.citations as citation}{#if 'value' in citation}<span>{citation.value}</span>{#if citation.crlf}<br />{/if}{/if}{/each}</blockquote>{/if}
                {#if 'imageSource' in line}<img src="{line.imageSource}" alt="イラスト" />{/if}
                {#if 'space' in line}{@html line.space}{/if}
                {#if 'nextPage' in line}<a href="{href}" on:click="{(e) => onClickNextPage(line.nextPage, e)}">{line.nextPage}</a>{/if}
                {#if 'value' in line}<span>{line.value}</span>{#if line.crlf}<br />{/if}{/if}
              {/each}
            </p>
          {/if}
        {/each}
      </div>
      <hr />
      <pre>{JSON.stringify($gamebook.parsed, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify($gamebook.current, null, 2)}</pre>
    {/if}
    {#if $isError}
      <div class="errors">なんだか調子が悪いみたいです</div>
    {/if}
  </div>
</main>

<style>
  main {
    padding: 1em;
    max-width: 70vw;
    margin: 0 auto;
    background-color: whitesmoke;
  }

  blockquote {
    padding: 0.5em;
    background-color: turquoise;
  }

  img {
    max-width: 65vw;
  }
</style>
