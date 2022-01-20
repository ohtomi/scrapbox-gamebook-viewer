<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { project } from '../../stores/project'
  export let line: Link

  const href = '#'

  const dispatch = createEventDispatcher()

  function onClickNextPage(nextPage: string) {
    const e = {
      project: $project.name,
      page: nextPage,
    } as GoToEvent
    dispatch('goto', e)
  }
</script>

<a href="{href}" on:click|preventDefault|stopPropagation={() => onClickNextPage(line.nextPage)}>{line.nextPage}</a>
