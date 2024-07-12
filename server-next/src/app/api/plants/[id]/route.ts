import { GetPlantById } from "@/db/models/plant";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const _id = params.id;
    const product = await GetPlantById(_id);

    return NextResponse.json({
      product
    });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
