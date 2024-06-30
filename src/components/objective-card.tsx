import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TeamSelector from './team-selector';
import { Objective } from '../lib/types';
import DifficultyStars from './difficulty-stars';

type CardProps = React.ComponentProps<typeof Card>;

type ObjectiveCardProps = CardProps & {
  objective: Objective;
};

export default async function ObjectiveCard({ className, objective, ...props }: ObjectiveCardProps) {
  return (
    <Card className={cn('max-w-sm mx-auto flex border-primary', className)} {...props}>
      <CardHeader className="flex items-center">
        <TeamSelector />
      </CardHeader>
      <CardContent className="p-0 pr-3 flex flex-col gap-2 justify-center my-auto">
        <CardDescription>{objective.description}</CardDescription>
        <DifficultyStars difficulty={objective.difficulty} />
      </CardContent>
    </Card>
  );
}
