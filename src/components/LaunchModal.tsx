import { Portal } from './Portal';
import { Launch } from '../types/launch';
import { X } from 'lucide-react';

interface LaunchModalProps {
  launch: Launch;
  onClose: () => void;
}

export function LaunchModal({ launch, onClose }: LaunchModalProps) {
  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{launch.mission_name}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {launch.links?.mission_patch && (
              <div className="flex justify-center mb-6">
                <img
                  src={launch.links.mission_patch}
                  alt={launch.mission_name}
                  className="w-48 h-48 object-contain"
                />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Mission name:</h3>
                <p className="text-gray-600">{launch.mission_name}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Rocket name:</h3>
                <p className="text-gray-600">{launch.rocket.rocket_name}</p>
              </div>

              {launch.details && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Details:</h3>
                  <p className="text-gray-600 leading-relaxed">{launch.details}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
