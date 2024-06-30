'use client';

import store from '../store/store';
import { useEffect, useState } from 'react';
import { teams } from '../data/teams';
import { Team } from '../lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function TeamSelector() {
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    const getRandomLogo = () => {
      const randomIndex = Math.floor(Math.random() * teams.length);
      const selectedTeam = teams[randomIndex];
      const state = store.getState();
      state.setTeam(selectedTeam);
      setTeam(selectedTeam);
    };

    getRandomLogo();
  }, []);

  const RandomLogoComponent = team?.logo;

  return (
    <div className="flex justify-center mt-2">
      {team && RandomLogoComponent ? <RandomLogoComponent /> : <Skeleton className="h-20 w-20 rounded-full" />}
    </div>
  );
}
