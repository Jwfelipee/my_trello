import { useState } from "react";

export const useStorageState = <T>(key: string, initialState: T) => {
	const [state, updateState] = useState<T>(() => {
		const storageValue = localStorage.getItem(key);

		if (storageValue) return JSON.parse(storageValue);

		return initialState;
	})

	const setState = (value: T) => {
		localStorage.setItem(key, JSON.stringify(value));
		updateState(value);
	}

	return [state, setState] as const;
}
