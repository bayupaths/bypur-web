import { getProfile } from "@/lib/portfolio-api";

export async function GET() {
  const data = await getProfile();
  return Response.json(data);
}
