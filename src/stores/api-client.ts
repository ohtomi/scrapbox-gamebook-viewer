const API_ENDPOINT_BASE = 'https://scrapbox-gamebook-viewer.vercel.app/api/pages'

export const fetchPageText = async (project: string, page: string) => {
  try {
    const endpoint = `${API_ENDPOINT_BASE}/${project}/${page}`
    const r: Response = await fetch(endpoint)
    const t: string = await r.text()
    if (r.ok) {
      return t
    } else {
      throw new Error(t)
    }
  } catch (err) {
    throw new Error(err)
  }
}
