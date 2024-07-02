import { promises as fs } from 'fs';
import path from 'path';
import { PlayerSimpleInfo } from '@/lib/types';

export async function GET(): Promise<Response> {
  const filePath = path.join(process.cwd(), 'src/data', 'player-names.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const players: PlayerSimpleInfo[] = JSON.parse(jsonData);

  return new Response(JSON.stringify(players), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
