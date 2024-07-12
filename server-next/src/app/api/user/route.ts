import { getAllUsers, getUserByEmail } from "@/db/models/user";

interface RequestBody {
    email: string;
}

export async function POST(request: Request): Promise<Response> {

    const {email} = await request.json()
    
    const users = await getUserByEmail(email);

    return new Response(JSON.stringify({
        message: "user",
        data: users
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
