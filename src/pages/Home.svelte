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
</style>
