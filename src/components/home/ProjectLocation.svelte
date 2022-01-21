<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { link } from 'svelte-spa-router'
  import { isReady } from '../../stores/project'

  const dispatch = createEventDispatcher()

  let location: string = ''

  function changeProjectLocation(newLocation: string) {
    const e = {
      location: newLocation,
    } as ChangeProjectLocationEvent
    dispatch('changeprojectlocation', e)
  }

  $: changeProjectLocation(location)

  onMount(() => changeProjectLocation(location))
</script>

<h2>Scrapboxのプロジェクト名とページ名を入力してください</h2>
<p>
  <input
    type="text"
    placeholder="プロジェクト名/ページ名"
    bind:value={location}
  />
  <a href="/view" use:link>
    <button disabled={!$isReady}>Go!</button>
  </a>
</p>

<style>
  h2 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 42px;

    color: darkred;
  }

  input {
    min-width: 300px;
    width: 20vw;
  }

  input,
  button {
    margin: 0 0 0.5em 0;
    padding: 0.4em;
    -webkit-padding: 0.4em 0;

    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  input,
  button {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    outline: none;
    color: #333;
    background-color: whitesmoke;
  }

  button:disabled {
    color: #999;
  }

  a {
    text-decoration: none;
  }
</style>
