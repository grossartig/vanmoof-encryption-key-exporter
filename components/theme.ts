import { deepOrange, indigo } from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';

export function getTheme(prefersDarkMode: boolean) {
	const theme = createTheme({
		palette: {
			primary: {
				main: prefersDarkMode ? indigo[300] : indigo[900],
			},
			secondary: deepOrange,
			mode: prefersDarkMode ? 'dark' : 'light',
		},
	})
	return theme
}
