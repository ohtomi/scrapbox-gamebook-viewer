<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { link } from 'svelte-spa-router'
  import { isReady } from '../../stores/project'

  const dispatch = createEventDispatcher()

  let location: string = ''

  $: {
    const e = {
      location,
    } as ChangeProjectLocationEvent
    dispatch('changeprojectlocation', e)
  }
</script>

<h2>Scrapbox Gamebook のプロジェクト名とページ名を入力してください</h2>
<p>
  <input
    type="text"
    placeholder="Scrapbox プロジェクト名/ページ名"
    bind:value={location}
  />
  <a href="/view" use:link>
    <button disabled={!$isReady}>Go!</button>
  </a>
</p>

<style>
  input {
    width: 60vw;
  }

  input,
  button {
    padding: 0.4em;
    -webkit-padding: 0.4em 0;
    margin: 0 0 0.5em 0;

    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;

    font-family: inherit;
    font-size: inherit;
  }

  button {
    color: #333;
    background-color: #f4f4f4;
    outline: none;
  }

  button:disabled {
    color: #999;
  }

  a {
    color: rgb(0, 100, 200);
    text-decoration: none;
  }
</style>
