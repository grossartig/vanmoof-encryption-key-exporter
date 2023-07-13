import { useState } from "react"

/**
 * 
 * @param localStorageKey Key used for storing and retrieving data in localStorage
 * @param initialValue Set the initial value
 * @returns `[state, setState(newState: string)]`
 */
function useLocalStorageString(
	localStorageKey: string,
	initialValue?: string,
): [string, (state: string) => void] {
	const localStorageSupported = typeof window === "object" && typeof window.localStorage === "object"
	const [firstRun, setFirstRun] = useState()
	const [value, setValue] = useState<string>("")

	const setState = (newState: string) => {
		setValue(newState)
		window.localStorage.setItem(localStorageKey, newState)
	}
	
	if (firstRun && localStorageSupported) {
		const stored = window.localStorage.getItem(localStorageKey)
		if (stored !== null) {
			setValue(stored)
		} else {
			setState(initialValue || "")
		}
	}
	
	return [value, setState]
}
