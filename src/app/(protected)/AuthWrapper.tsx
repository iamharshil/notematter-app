"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { apiCall } from "@/utils/apis";

export default function AuthWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			const result = await apiCall("/auth");
			if (result.success) {
				setLoading(false);
			} else {
				return router.push("/login");
			}
		};

		checkUser();
	}, [router.push]);

	if (loading) {
		return <Loading />;
	} else {
		return <>{children}</>;
	}
}