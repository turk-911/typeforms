import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("auth_token");

        if (!token) {
            router.push("/auth/login"); 
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated;
}