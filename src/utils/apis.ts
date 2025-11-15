
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}`, {
		...options,
		credentials: "include", // Include cookies for cross-origin requests
	});

	const result = await response.json();
	return result;
};

export const getCSRFToken = async () => {
	const data = await apiCall("/auth/csrf-token");
	return data.csrfToken;
};