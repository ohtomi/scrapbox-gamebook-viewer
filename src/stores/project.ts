import { derived, writable } from 'svelte/store'

interface Project {
  name: string
  topPage: string
}

function newProject() {
  const { subscribe, update } = writable(defaultProject())

  return {
    subscribe,
    changeLocation: (location: string) => update(state => changeLocation(state, location))
  }
}

function defaultProject(): Project {
  return {
    name: '',
    topPage: ''
  }
}

function changeLocation(state: Project, location: string): Project {
  const tokens = location.split('/')
  if (tokens.length != 2) {
    return state
  }
  return {
    name: tokens[0],
    topPage: tokens[1]
  }
}

export const project = newProject()

export const isReady = derived(project, state => !!state.name && !!state.topPage, false)
