'use client';

import { useEffect, useState } from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlayerSimpleInfo } from '../../lib/types';
import store from '../../store/store';

export function Combobox(props: {
  pos: string;
  selectedPlayers: PlayerSimpleInfo[];
  onPlayerSelect: (player: PlayerSimpleInfo) => void;
  onPlayerDeselect: (player: PlayerSimpleInfo) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [players, setPlayers] = useState<PlayerSimpleInfo[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerSimpleInfo[]>([]);
  const [teamAbbr, setTeamAbbr] = useState<string>('');

  const team = store((state) => state);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch('/api/player-names', { method: 'GET' });
        const data: PlayerSimpleInfo[] = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    }

    fetchPlayers();
  }, []);

  useEffect(() => {
    if (team.abbreviation) {
      setTeamAbbr(team.abbreviation);
    }
  }, [team.abbreviation]);

  const handleInputChange = (inputValue: string) => {
    setValue(inputValue);
    if (inputValue) {
      const filtered = players.filter(
        (player) =>
          player.fullName.toLowerCase().includes(inputValue.toLowerCase()) &&
          player.teams.includes(teamAbbr) &&
          player.positions.includes(props.pos) &&
          !props.selectedPlayers.some((p) => p.id === player.id)
      );
      setFilteredPlayers(filtered.slice(0, 3));
    } else {
      const deselectPlayer = players.find((player) => player.fullName === value);
      if (deselectPlayer) props.onPlayerDeselect(deselectPlayer); // Deselect the player when input is cleared
      setFilteredPlayers([]);
    }
  };

  const handlePlayerSelect = (player: PlayerSimpleInfo) => {
    if (player.fullName === value) {
      setValue('');
      props.onPlayerDeselect(player);
    } else {
      if (value) {
        const previousPlayer = players.find((p) => p.fullName === value);
        if (previousPlayer) props.onPlayerDeselect(previousPlayer); // Deselect the previous player
      }
      setValue(player.fullName);
      props.onPlayerSelect(player);
    }
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="mb-3 w-full justify-between">
            {value ? players.find((player) => player.fullName === value)?.fullName : 'Search player...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search player..." className="h-9" onValueChange={handleInputChange} />
            <CommandList>
              <CommandEmpty>No players found.</CommandEmpty>
              <CommandGroup>
                {filteredPlayers.map((player) => (
                  <CommandItem key={player.id} value={player.fullName} onSelect={() => handlePlayerSelect(player)}>
                    {player.fullName}
                    <CheckIcon
                      className={cn('ml-auto h-4 w-4', value === player.fullName ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
