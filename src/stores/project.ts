import { derived, writable } from 'svelte/store'

export const projectLocation = writable('')

export const startPage = derived(projectLocation, ($url, set) => {
  if ($url.startsWith('https://')) {
    if ($url.length <= 'https://'.length) {
      set('')
      return
    }
    set($url)
  } else {
    const tokens = $url.split('/')
    if (tokens.length != 2) {
      set('')
      return
    }
    if (!tokens[0] || !tokens[1]) {
      set('')
      return
    }
    set(`https://scrapbox.io/${tokens[0]}/${tokens[1]}`)
  }
}, '')

export const isReady = derived(startPage, ($startPage, set) => {
  set(!!$startPage)
}, false)
