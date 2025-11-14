
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}`, {
    ...options,
    credentials: 'include', // Include cookies for cross-origin requests
  });
	console.log("⚡️ ~ api.ts:4 ~ apiCall ~ response:", response)
	if (!response.ok) {
		throw new Error(`API call failed: ${response.statusText}`);
	}
	return response.json();
};

export const getCSRFToken = async () => {
	const data = await apiCall("/auth/csrf-token");
	return data.csrfToken;
};