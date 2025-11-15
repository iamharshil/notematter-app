import AuthWrapper from "./AuthWrapper";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <AuthWrapper>{children}</AuthWrapper>;
}