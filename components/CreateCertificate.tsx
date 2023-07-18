import { useEffect, useMemo, useState } from "react"
import * as ed from "@noble/ed25519"
import Button from "@mui/material/Button"
import { bikeDetails } from "@/pages/api/typesAndInterfaces"

export default function CreateCertificate(props: {
	appToken?: string,
	bikeId: string | number
	bike: bikeDetails
}) {
	const { appToken, bike } = props
	const [privateKey, setPrivateKey] = useState<string>("")
	const [publicKey, setPublicKey] = useState<string>("")
	const [renderTrigger, setRenderTrigger] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	useMemo(() => {
		(async () => {
			const privkey = ed.utils.randomPrivateKey()
			const pubkey = await ed.getPublicKeyAsync(privkey)
			setPrivateKey(Buffer.from(privkey).toString("base64"))
			setPublicKey(Buffer.from(pubkey).toString("base64"))
			setRenderTrigger(!renderTrigger)
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
		let data: unknown = null
		try {
			data = await res.text()
			if (typeof data === "string") {
				bike.xCertificate = data
			}
			bike.xKeypair = {
				publicKey,
				privateKey
			}
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
		if (!publicKey) msg = "Generating Keypair..."
		if (!bike?.xCertificate) msg = "Upload Key"
		if (bike?.xCertificate?.startsWith("Error")) msg = "Error. Try again."

		if (!msg) msg = "Upload Key"

		setButtonText(msg)
	}, [publicKey, bike?.xCertificate])

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
