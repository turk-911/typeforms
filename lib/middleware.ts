import { NextResponse, NextRequest } from "next/server";
export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/dashboard/:path*", "/forms/:path*"],
};