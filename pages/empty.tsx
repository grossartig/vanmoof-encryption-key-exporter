import CssBaseline from "@mui/material/CssBaseline";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Script from "next/script";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/Footer";
import theme from "@/components/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home() {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	return (
		<>
			<Head>
				<title>VanMoof Encryption Key Exporter</title>
				<meta name="description" content="VanMoof Encryption Key Exporter" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<Script defer data-domain="vanoof.grossartig.io" src="https://plausible.grossartig.io/js/script.js" />
			<ThemeProvider theme={theme(prefersDarkMode)}>
				<CssBaseline />
				<main>
					<div className={styles.main}>
						<Footer />
					</div>
				</main>
			</ThemeProvider>
		</>
	)

}
