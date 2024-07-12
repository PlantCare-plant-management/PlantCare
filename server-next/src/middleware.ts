import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";

const SECRET = process.env.SECRET as string;

export async function middleware(request: NextRequest) {
  try {
    const cookiesAuth = cookies().get("Authorization");
    if (!cookiesAuth) {
      throw new Error("UNAUTHORIZED");
    }
    
    let token = cookiesAuth.value.split(" ")[1];
    if (!token) {
      throw new Error("UNAUTHORIZED");
    }

    
    const secret = new TextEncoder().encode(SECRET);
    
    const decoded = await jose.jwtVerify<{ _id: string; email: string }>(
      token,
      secret
    );
    
    // gabisa find disini
    // const findUser = await getUserByEmail(decoded.payload.email)

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.payload._id);
    requestHeaders.set("x-user-email", decoded.payload.email);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    let status = 500;
    let message = "Internal Server Error";

    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        status = 401;
        message = "Access denied: Please log in first";
      } else if (error.message === "User not found") {
        status = 404;
        message = error.message;
      }
    }

    return NextResponse.json({ message }, { status });
  }
}

// ubah ini ya
export const config = {
  matcher: ["/api/wishlist"],
};
