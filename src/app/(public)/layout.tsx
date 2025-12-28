import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </AuthProvider>
    );
}
