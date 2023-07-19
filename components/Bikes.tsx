import { bikeDetails } from "@/pages/api/typesAndInterfaces"
import GenericErrorBoundary from "./GenericErrorBoundary"
import Alert from "@mui/material/Alert"
import NextLink from "next/link"
import Link from "@mui/material/Link"
import CreateCertificate from "./CreateCertificate"
import { Dispatch, SetStateAction, useState } from "react"

export default function Bikes(props: {
	bikes: bikeDetails[]
	fallback?: React.ReactNode
	viewerMode?: boolean,
	generateButton?: React.ReactNode,
	appToken?: string,
	trigger?: [
		trigger: number,
		setTrigger: Dispatch<SetStateAction<number>>
	]
}) {
	const {
		bikes,
		fallback,
		viewerMode,
		generateButton,
		appToken
	} = props

	const altTrigger = useState<number>(0)
	const trigger = props.trigger || altTrigger
	let parsedBikes: React.ReactNode[] | null = []

	try {
		parsedBikes.push(bikes.map(bike => {
			try {
				return (
					<div key={bike.name + "-" + bike.bikeId}>
						<h4>{bike.name}</h4>
						<ul>
							{ bike?.bikeId && <li>Bike ID: <code>{bike.bikeId}</code></li> }
							{ bike?.frameNumber && <li>Frame Number: <code>{bike.frameNumber}</code></li> }
							{ bike?.frameSerial && <li>Frame Serial: <code>{bike.frameSerial}</code></li> }
							{ bike?.macAddress && <li>MAC Address: <code>{bike.macAddress}</code></li> }
							{ bike?.key?.encryptionKey && <li>Encryption Key: <code>{bike.key.encryptionKey}</code></li> }
							{ bike?.key?.passcode && <li>Passcode: <code>{bike.key.passcode}</code></li> }
							{ bike?.key?.userKeyId && <li>User Key ID: <code>{bike.key.userKeyId}</code></li> }
							{ !bike?.key && <li>Your bike seems to be a newer model which requires you to generate and upload a keypair.<br />
								{ viewerMode ? <>
									Go to the <Link href="/account" component={NextLink}>account page</Link> to generate and upload a keypair.
								</> : <>
									{ (!bike?.xCertificate || typeof bike?.xCertificate === "string") && <CreateCertificate appToken={appToken} bikeId={bike?.bikeId} bike={bike} trigger={trigger} /> }
								</>}
							</li> }
							{ !bike?.key && bike?.xKeypair && bike?.xCertificate && <>
								<ul>
									{ bike.xKeypair.privateKey && <li>Private Key: <code>{bike.xKeypair.privateKey}</code></li> }
									{ bike.xKeypair.publicKey && <li>Public Key: <code>{bike.xKeypair.publicKey}</code></li> }
									{ bike.xCertificate && typeof bike.xCertificate !== "string" && <li>Certificate:
										<ul>
											<li>Created at: <code>{bike.xCertificate.created_at}</code></li>
											<li>Expiry: <code>{bike.xCertificate.expiry}</code></li>
											<li>Certificate:<br /><code>{bike.xCertificate.certificate}</code></li>
										</ul>
									</li> }
								</ul>
							</> }
						</ul>
					</div>
				)
			} catch (e) { console.log(e) }
			return null
		}))
	} catch {
		return fallback || null
	}

	return parsedBikes
}
