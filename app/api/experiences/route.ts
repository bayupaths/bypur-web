import { getExperiences } from "@/lib/portfolio-api";

export async function GET() {
  const data = await getExperiences();
  return Response.json(data);
}
