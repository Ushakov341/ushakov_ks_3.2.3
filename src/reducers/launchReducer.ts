import { Launch } from '../types/launch';

export interface LaunchState {
  launches: Launch[];
  loading: boolean;
  error: string | null;
  selectedLaunch: Launch | null;
  isModalOpen: boolean;
}

export type LaunchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'OPEN_MODAL'; payload: Launch }
  | { type: 'CLOSE_MODAL' };

export const initialState: LaunchState = {
  launches: [],
  loading: false,
  error: null,
  selectedLaunch: null,
  isModalOpen: false,
};

export function launchReducer(state: LaunchState, action: LaunchAction): LaunchState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        launches: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        selectedLaunch: action.payload,
        isModalOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedLaunch: null,
        isModalOpen: false,
      };
    default:
      return state;
  }
}
