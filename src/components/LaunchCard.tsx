import { Card, Button } from '@mantine/core';
import { Launch } from '../types/launch';

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: () => void;
}

export function LaunchCard({ launch, onSeeMore }: LaunchCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section className="flex justify-center p-6">
        {launch.links?.mission_patch_small ? (
          <img
            src={launch.links.mission_patch_small}
            alt={launch.mission_name}
            className="w-32 h-32 object-contain"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </Card.Section>

      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold mb-2 truncate" title={launch.mission_name}>
          {launch.mission_name}
        </h3>
        <p className="text-gray-500 mb-4">{launch.rocket.rocket_name}</p>
        <Button fullWidth onClick={onSeeMore}>
          See more
        </Button>
      </div>
    </Card>
  );
}
