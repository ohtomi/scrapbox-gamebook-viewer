<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import * as apiClient from '../stores/api-client'
  import { project } from '../stores/project'
  import { gamebook } from '../stores/gamebook'
  import Navbar from '../components/Navbar.svelte'
  import Book from '../components/Book.svelte'
  import Page from '../components/Page.svelte'
  import StatusBar from '../components/StatusBar.svelte'

  function goTo(project: string, page: string) {
    apiClient
      .fetchPageText(project, page)
      .then((text) => gamebook.goTo(text))
      .catch((err) => gamebook.handleError(err))
  }

  function onGoTo(e: CustomEvent<GoToEvent>) {
    goTo(e.detail.project, e.detail.page)
  }

  onMount(() => {
    goTo($project.name, $project.topPage)
  })

  afterUpdate(() => {
    window.scrollTo(0, 0)
  })
</script>

<div class="app">
  <Navbar />
  <Book />
  <Page on:goto={onGoTo} />
  <StatusBar />
</div>

<style>
  .app {
    background-color: thistle;
  }
</style>
