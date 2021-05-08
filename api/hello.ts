import type { VercelRequest, VercelResponse } from '@vercel/node'

export default (req: VercelRequest, res: VercelResponse) => {
  const { name = 'World' } = req.query
  res.status(200).send(`Hello ${name}!`)
}
