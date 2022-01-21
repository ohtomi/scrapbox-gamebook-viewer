<script lang="ts">
  import Heading from '../components/home/Heading.svelte'
  import ProjectLocation from '../components/home/ProjectLocation.svelte'
  import Disclaimer from '../components/home/Disclaimer.svelte'
  import { project } from '../stores/project'

  function onChangeProjectLocation(e: CustomEvent<ChangeProjectLocationEvent>) {
    project.changeLocation(e.detail.location)
  }
</script>

<main>
  <Heading />
  <ProjectLocation on:changeprojectlocation={onChangeProjectLocation} />
</main>
<footer>
  <Disclaimer />
</footer>

<style>
  main {
    max-width: 70vw;
    height: 100vh;
  }

  main {
    margin: 0 auto;
    padding: 1em;
  }

  main {
    text-align: center;
    background-color: whitesmoke;
  }

  footer {
    width: 100vw;
  }

  footer {
    z-index: 1000;
    position: fixed;
    bottom: 0;

    margin: 0 auto;
    padding: 0.5em;
  }

  footer {
    color: floralwhite;
    background-color: gray;
  }
</style>
