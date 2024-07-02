import { promises as fs } from 'fs';
import path from 'path';
import { Player } from '@/lib/types';

export async function GET(): Promise<Response> {
  const filePath = path.join(process.cwd(), 'src/data', 'players.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const players: Player[] = JSON.parse(jsonData);

  return new Response(JSON.stringify(players), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
