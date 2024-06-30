import { promises as fs } from 'fs';
import path from 'path';
import { Objective } from '@/lib/types';

function getRandomObjective(objectives: Objective[]): Objective {
  const randomIndex = Math.floor(Math.random() * objectives.length);
  return objectives[randomIndex];
}

export async function GET(): Promise<Response> {
  const filePath = path.join(process.cwd(), 'src/data', 'objectives.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const objectives: Objective[] = JSON.parse(jsonData);

  const randomObjective = getRandomObjective(objectives);

  return new Response(JSON.stringify(randomObjective), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
