import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import CssBaseline from '@mui/material/CssBaseline'
import { deepOrange, indigo } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useEffect, useMemo, useState } from 'react';
import { bikeDetails, getCustomerData } from './api/typesAndInterfaces';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

export default function Home() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					primary: {
						main: prefersDarkMode ? indigo[300] : indigo[900],
					},
					secondary: deepOrange,
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	)

	const [token, setToken] = useState<string>("")
	const [bikes, setBikes] = useState<Array<bikeDetails> | null>(null)
	const [refresh, setRefresh] = useState<boolean>(false)
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [errorPassword, setErrorPassword] = useState("")
	const [errorLogin, setErrorLogin] = useState(false)
	const [formDisabled, setFormDisabled] = useState(false)
	const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState<boolean>(false)

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		async function getToken(username: string, password: string) {
			const res = await fetch("/api/authenticate", {
				method: "POST",
				body: JSON.stringify({
					username,
					password
				})
			})
			const data: {
				token: string,
				refreshToken: string
			} = await res.json()
			return data
		}
		try {
			setToken((await getToken(username, password)).token)
		} catch (e) {
			setErrorLogin(true)
		}
	}

	useEffect(() => {
		async function getBikes(token: string) {
			const res = await fetch("/api/getBikes", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					token
				})
			})
			let data: Array<bikeDetails> | null = null
			try {
				data = await res.json()
			} catch (e: any) {
				data = null
			}
			return data
		}
		getBikes(token).then((b: Array<bikeDetails> | null) => {
			setBikes(b)
		})
	}, [token])

	return (
		<>
			<Head>
				<title>VanMoof Encryption Key Exporter</title>
				<meta name="description" content="VanMoof Encryption Key Exporter" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<main>
					<div className={styles.main}>
						<h1 style={{ textAlign: "center" }}>VanMoof Encryption Key Exporter</h1>
						{!bikes && <div>
							<Container maxWidth="sm">
								<Box sx={{
									marginTop: 8,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
									<Typography component="h1" variant="h5">Sign in with your VanMoof credentials.</Typography>
									<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													disabled={formDisabled}
													required
													fullWidth
													id="username"
													label="Username"
													name="username"
													autoComplete="username"
													error={errorLogin}
													onChange={(e) => {
														setUsername(e.target.value)
														setErrorLogin(false)
													}}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													disabled={formDisabled}
													required
													fullWidth
													name="password"
													label="Password"
													type="password"
													id="password"
													autoComplete="password"
													inputProps={{minLength: 8}}
													error={errorLogin}
													onChange={(e) => {
														setPassword(e.target.value)
														setErrorLogin(false)
													}}
													helperText={errorLogin && "Login failed. Try again."}
												/>
											</Grid>
											<Grid item xs={12}>
												<FormControlLabel control={<Checkbox onChange={() => {
													setPrivacyPolicyAgreed(!privacyPolicyAgreed)
												}} checked={privacyPolicyAgreed} />} label={<>
													I agree to the <Link href="https://grossartig.io/keyexport/privacy" target="_blank">data privacy policy</Link>.
												</>} />
											</Grid>
											<Grid item xs={12}>
												<Button
													disabled={formDisabled || !privacyPolicyAgreed}
													type="submit"
													fullWidth
													variant="contained"
													sx={{ mt: 1, mb: 2 }}
												>
													Login
												</Button>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</Container>
						</div>}
						{bikes && <div>
							<Button variant="contained" onClick={() => {
								setBikes(null)
								setToken("")
							}}>Logout</Button>
							{bikes.map((bike) => {
								return (
									<div key={bike.name + "-" + bike.bikeId}>
										<h4>{bike.name}</h4>
										<ul>
											<li>MAC Address: <code>{bike.macAddress}</code></li>
											<li>Encryption Key: <code>{bike.key.encryptionKey}</code></li>
											<li>Passcode: <code>{bike.key.passcode}</code></li>
											<li>User Key ID: <code>{bike.key.userKeyId}</code></li>
										</ul>
									</div>
								)
							})}
							<Button variant="contained" onClick={() => {
								function download(filename: string, content: string) {
									var element = document.createElement('a')
									element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(content))
									element.setAttribute('download', filename)
									element.style.display = 'none'
									document.body.appendChild(element)
									element.click()
									document.body.removeChild(element)
								}
								download("bikeData_" + (new Date()).toISOString().replaceAll(":", "-") + ".json", JSON.stringify(bikes))
							}}>Download</Button>
						</div>}
						<footer style={{ textAlign: "center", marginTop: "60px" }}>
							<Link href="https://grossartig.io/keyexport/legalnotice">Legal Notice (Impressum)</Link>&nbsp;-&nbsp;<Link href="https://grossartig.io/keyexport/privacy">Privacy Policy</Link>
							<br /><br />
							This project is <Link href="https://github.com/grossartig/vanmoof-encryption-key-exporter" target="_blank">open source</Link>.
							<br /><br />
							&copy; grossartig.io, 2023
						</footer>
					</div>
				</main>
			</ThemeProvider>
		</>
	)
}
