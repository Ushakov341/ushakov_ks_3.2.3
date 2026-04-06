import { useEffect, useReducer } from 'react';
import { MantineProvider, Container, Title, Loader, Alert } from '@mantine/core';
import '@mantine/core/styles.css';
import { LaunchCard } from './components/LaunchCard';
import { LaunchModal } from './components/LaunchModal';
import { launchReducer, initialState } from './reducers/launchReducer';
import { Launch } from './types/launch';

function App() {
  const [state, dispatch] = useReducer(launchReducer, initialState);

  useEffect(() => {
    const fetchLaunches = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch(
          'https://api.spacexdata.com/v3/launches?launch_year=2020'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch launches');
        }
        const data: Launch[] = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    fetchLaunches();
  }, []);

  const handleOpenModal = (launch: Launch) => {
    dispatch({ type: 'OPEN_MODAL', payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="xl">
          <Title order={1} className="text-center mb-8">
            SpaceX запуски 2020
          </Title>

          {state.loading && (
            <div className="flex justify-center py-12">
              <Loader size="xl" />
            </div>
          )}

          {state.error && (
            <Alert color="red" title="Error" className="mb-4">
              {state.error}
            </Alert>
          )}

          {!state.loading && !state.error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.launches.map((launch, index) => (
                <LaunchCard
                  key={`${launch.mission_name}-${index}`}
                  launch={launch}
                  onSeeMore={() => handleOpenModal(launch)}
                />
              ))}
            </div>
          )}

          {state.isModalOpen && state.selectedLaunch && (
            <LaunchModal launch={state.selectedLaunch} onClose={handleCloseModal} />
          )}
        </Container>
      </div>
    </MantineProvider>
  );
}

export default App;