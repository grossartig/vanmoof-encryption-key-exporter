/*
vanmoof-encryption-key-exporter
Copyright (C) 2023  Justus Dietrich <git@justus-d.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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
import Stack from '@mui/material/Stack';
import Script from 'next/script';
import Snackbar from '@mui/material/Snackbar';
import { useLocalStorageString } from '@/components/useLocalStorage';
import Footer from '@/components/Footer';
import Bikes from '@/components/Bikes';
import DownloadButton from '@/components/DownloadButton';
import NextLink from "next/link";
import Alert from '@mui/material/Alert';
import { getTheme } from '@/components/theme';
// import PlausibleProvider from 'next-plausible';

export default function AccountPage() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

	const [token, setToken] = useLocalStorageString("vanmoofToken")
	const [bikes, setBikes] = useState<Array<bikeDetails> | null>(null)
	const [appToken, setAppToken] = useLocalStorageString("vanmoofAppToken")
	const [refresh, setRefresh] = useState<boolean>(false)
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [errorPassword, setErrorPassword] = useState("")
	const [errorLogin, setErrorLogin] = useState(false)
	const [formDisabled, setFormDisabled] = useState(false)
	const [ackNotVanMoof, setAckNotVanMoof] = useState<boolean>(false)
	const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState<boolean>(false)
	const [renderTrigger, setRenderTrigger] = useState<boolean>(false)
	const [easteregg, setEasteregg] = useState<number>(0)

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
	async function getAppToken(token: string) {
		const res = await fetch("/api/getApplicationToken", {
			method: "GET",
			headers: {
				"Authorization": token
			}
		})
		const data: {
			token: string
		} = await res.json()
		return data
	}
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			const { token } = await getToken(username, password)
			setToken(token)
			const appToken = await getAppToken(token)
			setAppToken(appToken.token)
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
			<Script defer data-domain="vanoof.grossartig.io" src="https://plausible.grossartig.io/js/script.js" />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{/* <PlausibleProvider domain="vanoof.grossartig.io" customDomain="https://plausible.grossartig.io" /> */}
				<main>
					<div className={styles.main}>
						{/* <Button onClick={() => {
							getAppToken(token)
						}}>Debug</Button> */}
						<h1 style={{ textAlign: "center" }} onClick={() => setEasteregg(easteregg + 1)}>VanMoof Encryption Key Exporter</h1>
						<Container maxWidth="sm">
							<Button
								href="/"
								LinkComponent={NextLink}
								variant="outlined"
								style={{ textAlign: "center" }}
							>Back</Button>
							{bikes && <Button
								variant="outlined"
								color="error"
								sx={{
									float: "right"
								}}
								onClick={() => {
									setBikes(null)
									setToken("")
									setAppToken("")
									setRenderTrigger(!renderTrigger)
								}}
							>Logout</Button>}
						</Container>
						{!bikes && <div>
							<Container maxWidth="sm">
								<Box sx={{
									marginTop: 4,
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
													setAckNotVanMoof(!ackNotVanMoof)
												}} checked={ackNotVanMoof} />} label={<>
													I acknowledge, that this tool is <b>not</b> affiliated with VanMoof B.V. and is a
													service offered by grossartig.io - it is provided to
													export the encryption keys of VanMoof bikes. For this, the VanMoof login
													is necessary.
												</>} />
												<FormControlLabel control={<Checkbox onChange={() => {
													setPrivacyPolicyAgreed(!privacyPolicyAgreed)
												}} checked={privacyPolicyAgreed} />} label={<>
													I agree to the <Link href="https://grossartig.io/keyexport/privacy" target="_blank">data privacy policy</Link>.
												</>} />
											</Grid>
											<Grid item xs={12}>
												<Button
													disabled={formDisabled || !privacyPolicyAgreed || !ackNotVanMoof}
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
							{/* {(() => {console.log(typeof bikes, bikes); return null})()} */}
							{ typeof bikes !== "string" && <Bikes
								bikes={bikes}
								fallback={<Alert severity="error">The bike data seems to be corrupt.</Alert>}
								generateButton={null}
								appToken={appToken}
							/>}
							<Stack spacing={1} direction="row">
								<DownloadButton
									filename={"bikeData_" + (new Date()).toISOString().replaceAll(":", "-") + ".json"}
									content={JSON.stringify(bikes)}
									buttonText="Download"
								/>
								<Button variant="outlined" onClick={() => {
									if (typeof window === "object") {
										window.print()
									}
								}}>Print</Button>
							</Stack>
							<h2>What to do with this file</h2>
							<p>
								You should definetely download the data from the site with the download button. It contains information
								about your bike(s). If you get a message that your bike isn&apos;t supported yet, come back in a few days
								and try downloading it again.<br />
								The idea behind this site is, that you can import this bike data into future 3rd party apps in
								order to connect to your bike. Meanwhile, just hold on to this file.
							</p>
						</div>}
						<Footer />
						<Snackbar
							anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
							open={easteregg > 4}
							onClose={() => {
								setEasteregg(0)
							}}
							message="This is an Internet-of-shit moment."
							key={"snackbar-easteregg"}
						/>
					</div>
				</main>
			</ThemeProvider>
		</>
	)
}
