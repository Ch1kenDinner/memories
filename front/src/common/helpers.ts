export const ga = (value: string) => ({ gridArea: value });


export const debounce = (fn, timeout) => {
	let timer;
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => fn(...args), timeout)
	}
}