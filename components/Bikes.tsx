import { bikeDetails } from "@/pages/api/typesAndInterfaces"
import GenericErrorBoundary from "./GenericErrorBoundary"
import Alert from "@mui/material/Alert"
import NextLink from "next/link"
import Link from "@mui/material/Link"
import CreateCertificate from "./CreateCertificate"

export default function Bikes(props: {
	bikes: bikeDetails[]
	fallback?: React.ReactNode
	viewerMode?: boolean,
	generateButton?: React.ReactNode,
	appToken?: string
}) {
	const {
		bikes,
		fallback,
		viewerMode,
		generateButton,
		appToken
	} = props

	let parsedBikes: React.ReactNode[] | null = []

	try {
		parsedBikes.push(bikes.map(bike => {
			try {
				return (
					<div key={bike.name + "-" + bike.bikeId}>
						<h4>{bike.name}</h4>
						<ul>
							{ bike?.frameNumber && <li>Frame Number: <code>{bike.frameNumber}</code></li> }
							{ bike?.frameSerial && <li>Frame Serial: <code>{bike.frameSerial}</code></li> }
							{ bike?.macAddress && <li>MAC Address: <code>{bike.macAddress}</code></li> }
							{ bike?.key?.encryptionKey && <li>Encryption Key: <code>{bike.key.encryptionKey}</code></li> }
							{ bike?.key?.passcode && <li>Passcode: <code>{bike.key.passcode}</code></li> }
							{ bike?.key?.userKeyId && <li>User Key ID: <code>{bike.key.userKeyId}</code></li> }
							{ !bike?.key && !bike?.xKeypair && <li>Your bike seems to be a newer model which requires you to generate and upload a keypair.<br />
								{ viewerMode ? <>
									Go to the <Link href="/account" component={NextLink}>account page</Link> to generate and upload a keypair.
								</> : <>
									<CreateCertificate appToken={appToken} bikeId={bike?.bikeId} bike={bike} />
								</>}
							</li> }
							{ !bike?.key && bike?.xKeypair && <li>
								<ul>
									{ bike.xKeypair.privateKey && <li>Private Key: <code>{bike.xKeypair.privateKey}</code></li> }
									{ bike.xKeypair.publicKey && <li>Public Key: <code>{bike.xKeypair.publicKey}</code></li> }
								</ul>
							</li> }
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
