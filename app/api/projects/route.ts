import { getProjects } from "@/lib/portfolio-api";

export async function GET() {
  const data = await getProjects();
  return Response.json(data);
}
