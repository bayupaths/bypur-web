import { getSkills } from "@/lib/portfolio-api";

export async function GET() {
  const data = await getSkills();
  return Response.json(data);
}
