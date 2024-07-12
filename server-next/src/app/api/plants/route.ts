import { GetAllPlants } from "@/db/models/plant";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<Response> {
  const query = request.nextUrl.searchParams;
  try {
    const page = parseInt(query.get("page") || "0");
    const limit = parseInt(query.get("limit") || "4");
    const search = query.get("search") || "";
    const products = await GetAllPlants(page, limit, search);

    return new Response(
      JSON.stringify({
        products,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
