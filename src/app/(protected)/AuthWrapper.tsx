"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { apiCall } from "@/utils/apis";
import { useAuthStore } from "@/utils/store";

export default function AuthWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const setUser = useAuthStore((s) => s.setUser);

	useEffect(() => {
		const checkUser = async () => {
			const result = await apiCall("/auth");
			if (result.success) {
				setUser(result.data);
				setLoading(false);
			} else {
				return router.push("/login");
			}
		};

		checkUser();
	}, [router.push, setUser]);

	if (loading) {
		return <Loading />;
	} else {
		return <>{children}</>;
	}
}