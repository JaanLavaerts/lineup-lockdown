import { promises as fs } from 'fs';
import path from 'path';
import { Objective } from '@/lib/types';

export async function GET(): Promise<Response> {
  const filePath = path.join(process.cwd(), 'src/data', 'objectives.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const objectives: Objective[] = JSON.parse(jsonData);

  return new Response(JSON.stringify(objectives), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
