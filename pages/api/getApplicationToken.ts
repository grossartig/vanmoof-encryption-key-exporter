import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY } from './config'

const API_URL = "https://my.vanmoof.com/api/v8/"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET" && typeof req.headers.authorization === "string") {
		const token = req.headers.authorization
		const r = await fetch(API_URL + "getApplicationToken", {
			method: "GET",
			headers: {
				"Api-Key": API_KEY,
				"Authorization": `Bearer ${token}`,
				"User-Agent": "VanMoof/20 CFNetwork/1404.0.5 Darwin/22.3.0",
			}
		})
		const data: unknown = await r.json()
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
