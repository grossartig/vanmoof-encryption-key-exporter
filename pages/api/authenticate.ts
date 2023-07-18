import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY } from './config'

const API_URL = "https://my.vanmoof.com/api/v8/"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { username, password } = JSON.parse(req.body)
	if (req.method === "POST" && typeof username === "string" && typeof password === "string") {
		const r = await fetch(API_URL + "authenticate", {
			method: "POST",
			headers: {
				"Api-Key": API_KEY,
				"Authorization": `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
				"User-Agent": "VanMoof/20 CFNetwork/1404.0.5 Darwin/22.3.0"
			}
		})
		const data: {
			token: string,
			refreshToken: string
		} = await r.json()
		if (r.status < 400) {
			res.statusCode = 200
			return res.json(data)
		} else {
			res.statusCode = r.status
			return res.send("Error " + r.status)
		}
	}
	res.statusCode = 400
	res.send("Bad request")
}
