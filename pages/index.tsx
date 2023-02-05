import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import CssBaseline from '@mui/material/CssBaseline'
import { deepOrange, indigo } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo, useState } from 'react';

'use client'
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
	const [bikes, setBikes] = useState<any>(null)
	const [refresh, setRefresh] = useState<boolean>(false)
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	async function getToken(username: string, password: string) {
		const res = await fetch("/api/authenticate", {
			method: "POST",
			body: JSON.stringify({
				username,
				password
			})
		})
		return res.json()
	}

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
		return res.json()
	}

	useMemo(async () => {
		setToken((await getToken(username, password)).token)
	}, [ refresh ])
	useMemo(async () => {
		setBikes(await getBikes(token))
	}, [ token ])
	

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
						<h1>Vanmoof Encryption Key Exporter</h1>
						
					</div>
				</main>
			</ThemeProvider>
		</>
	)
}
