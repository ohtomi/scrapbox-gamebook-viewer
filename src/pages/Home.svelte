<script lang="ts">
  import { link } from 'svelte-spa-router'
  import { isReady, project } from '../stores/project'

  let projectLocation = ''

  $: project.changeLocation(projectLocation)
</script>

<main>
  <h1>Scrapbox Gamebook</h1>
  <h2>Scrapbox Gamebook のプロジェクト名とページ名を入力してください</h2>
  <p>
    <input
      type="text"
      bind:value={projectLocation}
      placeholder="Scrapbox プロジェクト名/ページ名"
    />
    <a href="/view" use:link><button disabled={!$isReady}>Go!</button></a>
  </p>
</main>
<footer>
  <div>
    このウェブサイトは Gamebook をホストしていません。
    <a href="https://scrapbox.io">Scrapbox</a> で記述された Gamebook を遊べます。
  </div>
  <div>
    <a href="https://vercel.com/">Vercel</a>
  </div>
  <div>
    <a href="https://github.com/ohtomi/scrapbox-gamebook-viewer">GitHub</a>
  </div>
</footer>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 70vw;
    margin: 0 auto;
    background-color: whitesmoke;
  }

  footer {
    padding: 1em;
    width: 100vw;
    margin: 0 auto;

    color: floralwhite;
    background-color: darkgrey;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
  }

  input {
    width: 60vw;
  }
</style>
