import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

interface ApiResponse {
  status: number;
  text: string;
}

const fetchPageText = async (endpoint: string) => {
  try {
    const r: Response = await fetch(endpoint)
    const t: string = await r.text()
    return { status: r.status, text: t } as ApiResponse
  } catch (err) {
    console.error(err)
    return { status: 500, text: '' } as ApiResponse
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const { project, page } = req.query
  const endpoint = `https://scrapbox.io/api/pages/${project}/${page}/text`
  const apiResponse = await fetchPageText(endpoint)
  res.status(apiResponse.status).send(apiResponse.text)
}
