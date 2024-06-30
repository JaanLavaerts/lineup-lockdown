import { create } from 'zustand';
import { TeamStore } from '@/lib/types';

const store = create<TeamStore>((set) => ({
  setTeam: (team) => set({ ...team }),
}));

export default store;
