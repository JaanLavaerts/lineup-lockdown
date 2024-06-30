import { Difficulty } from '../lib/types';
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons';

export default function DifficultyStars({ difficulty }: { difficulty: Difficulty }) {
  if (difficulty == Difficulty.EASY) {
    return (
      <div className="flex items-center">
        <StarFilledIcon className="w-5 h-5 text-primary" />
        <StarIcon className="w-5 h-5 text-primary" />
        <StarIcon className="w-5 h-5 text-primary" />
      </div>
    );
  } else if (difficulty == Difficulty.MEDIUM) {
    return (
      <div className="flex items-center">
        <StarFilledIcon className="w-5 h-5 text-primary" />
        <StarFilledIcon className="w-5 h-5 text-primary" />
        <StarIcon className="w-5 h-5 text-primary" />
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <StarFilledIcon className="w-5 h-5 text-primary" />
      <StarFilledIcon className="w-5 h-5 text-primary" />
      <StarFilledIcon className="w-5 h-5 text-primary" />
    </div>
  );
}
