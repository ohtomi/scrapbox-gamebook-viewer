<script lang="ts">
  import { projectLocation, isReady } from '../stores/project'

  const goOnClicked = () => {
    console.log(new Date())
  }
</script>

<main>
  <h1>Scrapbox Gamebook</h1>
  <h3>Scrapbox Gamebook の URL（もしくは、プロジェクト名/ページ名）を入力してください</h3>
  <p>
    <input
      type="text"
      bind:value={$projectLocation}
      placeholder="URL | Scrapbox プロジェクト名/ページ名"
    />
    <button on:click={goOnClicked} disabled={!$isReady}>Go!</button>
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
