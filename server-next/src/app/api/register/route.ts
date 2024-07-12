import { register } from "@/db/models/user";
import { ZodError, z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const parsedData = z
      .object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(5),
      })
      .safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const newUser = await register(data);

    return Response.json(
      {
        message: "Success create account",
        data: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
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
