import Header from '../components/header';
import ObjectiveCard from '@/components/objective-card';
import TeamBuilder from '@/components/team-builder';
import { Objective } from '../lib/types';

async function getObjective() {
  const res = await fetch(process.env.URL + '/api/random-objective', { method: 'GET' });
  if (!res.ok) {
    throw new Error('Failed to fetch objective');
  }
  return res.json();
}

export default async function Home() {
  const objective: Objective = await getObjective();

  return (
    <main className="dark:bg-background max-w-3xl mx-auto">
      <Header />
      <ObjectiveCard objective={objective} />
      <TeamBuilder />
    </main>
  );
}
