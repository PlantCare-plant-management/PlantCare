import { comparePassword } from "@/db/helpers/bcrypt";
import { signToken } from "@/db/helpers/jwt";
import { getUserByEmail } from "@/db/models/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const User = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = User.safeParse(body);

    if (!validation.success) {
      throw validation.error;
    }

    
    
    const user = await getUserByEmail(body.email);
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }
    
    const isValid = comparePassword(body.password, user.password);

    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const access_token = signToken({ _id: user._id, email: user.email });

    const response = NextResponse.json({
      message: "Login success",
      access_token,
      username: user.username
    });

    response.cookies.set("Authorization", `Bearer ${access_token}`);
    return response;
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return Response.json(
        {
          message: `${errorPath} ${errorMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    if (error instanceof Error) {
      if (
        error.message === "Username already exists" ||
        error.message === "Email already exists"
      ) {
        return Response.json(
          {
            message: error.message,
          },
          {
            status: 400,
          }
        );
      }
    }

    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
