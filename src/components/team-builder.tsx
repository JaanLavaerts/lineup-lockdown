'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Combobox } from './ui/combobox';
import { useState } from 'react';
import { PlayerSimpleInfo } from '@/lib/types';

export default function TeamBuilder() {
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerSimpleInfo[]>([]);

  const handlePlayerSelect = (player: PlayerSimpleInfo) => {
    setSelectedPlayers((prevSelectedPlayers) => [...prevSelectedPlayers, player]);
  };

  const handlePlayerDeselect = (player: PlayerSimpleInfo) => {
    setSelectedPlayers((prevSelectedPlayers) => prevSelectedPlayers.filter((p) => p.id !== player.id));
  };

  const form = useForm({
    defaultValues: {
      pointGuard: '',
      shootingGuard: '',
      smallForward: '',
      powerForward: '',
      center: '',
    },
  });

  const formFields = {
    pointGuard: ['Point Guard', 'Guard'],
    shootingGuard: ['Shooting Guard', 'Guard'],
    smallForward: ['Small Forward', 'Forward'],
    powerForward: ['Power Forward', 'Forward'],
    center: ['Center', 'Center'],
  };

  function onSubmit(data: any) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="max-w-xs mx-auto mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {Object.entries(formFields).map(([key, value]) => (
            <FormItem key={key} className="space-y-0">
              <FormLabel htmlFor={key}>{value[0]}</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Combobox
                    pos={value[1]}
                    selectedPlayers={selectedPlayers}
                    onPlayerSelect={handlePlayerSelect}
                    onPlayerDeselect={handlePlayerDeselect}
                  />
                </FormControl>
                <Button type="button" variant="outline" className="border-primary">
                  <LockClosedIcon className="text-primary" />
                </Button>
              </div>
            </FormItem>
          ))}
          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
