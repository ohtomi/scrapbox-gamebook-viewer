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
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
  }
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { project, page } = req.query
  const endpoint = `https://scrapbox.io/api/pages/${project}/${page}/text`
  const apiResponse = await fetchPageText(endpoint)
  res.status(apiResponse.status).send(apiResponse.text)
}
