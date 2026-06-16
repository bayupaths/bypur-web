import { getServices } from "@/lib/portfolio-api";

export async function GET() {
  const data = await getServices();
  return Response.json(data);
}
