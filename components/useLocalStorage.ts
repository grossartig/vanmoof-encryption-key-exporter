/*
vanmoof-encryption-key-exporter
Copyright (C) 2023 Justus Dietrich <git@justus-d.de>

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
	const [firstRun, setFirstRun] = useState<boolean>(true)
	const [value, setValue] = useState<string>("")

	const setState = (newState: string) => {
		setValue(newState)
		if (localStorageSupported) {
			window.localStorage.setItem(localStorageKey, newState)
		}
	}

	if (firstRun && localStorageSupported) {
		const stored = window.localStorage.getItem(localStorageKey)
		if (stored !== null) {
			setValue(stored)
		} else {
			setState(initialValue || "")
		}
		setFirstRun(false)
	}

	return [value, setState]
}

export {
	useLocalStorageString
}
