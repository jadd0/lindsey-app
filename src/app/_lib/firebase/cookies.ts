export async function setCookie(name: string, value: string) {
	document.cookie = `${name}=${value}; path=/; secure; samesite=strict`;
}

export async function deleteCookie(name: string) {
	document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
