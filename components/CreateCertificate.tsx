import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import * as ed from "@noble/ed25519"
import Button from "@mui/material/Button"
import { bikeDetails } from "@/pages/api/typesAndInterfaces"

export default function CreateCertificate(props: {
	appToken?: string,
	bikeId: string | number
	bike: bikeDetails
	trigger: [
		trigger: number,
		setTrigger: Dispatch<SetStateAction<number>>
	]
}) {
	const { appToken, bike } = props
	const [privateKey, setPrivateKey] = useState<string>("")
	const [publicKey, setPublicKey] = useState<string>("")
	const [trigger, setTrigger] = props.trigger
	const [loading, setLoading] = useState<boolean>(false)

	useMemo(() => {
		(async () => {
			const privkey = ed.utils.randomPrivateKey()
			const pubkey = await ed.getPublicKeyAsync(privkey)
			setPrivateKey(Buffer.from(privkey).toString("base64"))
			setPublicKey(Buffer.from(pubkey).toString("base64"))
			setTrigger(trigger + 1)
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const upload = async (bikeId: string, bike: bikeDetails) => {
		const res = await fetch("/api/createCertificate", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${appToken}`
			},
			body: JSON.stringify({
				publicKey,
				bikeId
			})
		})
		let data: { created_at: string, expiry: string, certificate: string } | string | null = null
		try {
			const rawData = await res.text()
			try {
				data = await JSON.parse(rawData)
			} catch (e) {
				console.error(e)
				data = rawData
			}
			// data = await res.json()
			if (typeof data === "object" && data != null) {
				bike.xCertificate = data
			}
			bike.xKeypair = {
				publicKey,
				privateKey,
				comment: "Important, this is just the generated keypair. You still need the certificate which is stored in xCertificate."
			}
			// bike.xCertificate = data
			setTrigger(trigger + 1)
			console.log(data)
		} catch (e: any) {
			console.error(e)
		}
		setLoading(false)
		return data
	}

	const [buttonText, setButtonText] = useState<string>("")

	useEffect(() => {
		let msg = ""
		if (loading) msg = "Loading..."
		else if (
			(typeof bike?.xCertificate === "string" && bike?.xCertificate?.startsWith("Error")) ||
			(bike?.xKeypair && !bike?.xCertificate)
			) msg = "Error. Try again."
		else if (!bike?.xCertificate) msg = "Upload Key"
		else if (!publicKey) msg = "Generating Keypair..."
		else msg = "Upload Key"

		setButtonText(msg)
	}, [publicKey, bike?.xCertificate, bike?.xKeypair, loading])

	return (
		<Button
			disabled={ !appToken || !publicKey || loading }
			onClick={() => {
				setLoading(true)
				upload(bike.bikeId, bike)
			}}
			variant="outlined"
		>
			{ buttonText }
		</Button>
	)
}
