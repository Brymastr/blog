import { createContext, useReducer, FunctionComponent, Dispatch } from 'react';

interface SettingsState {
  unpublished: boolean;
}

export enum ActionType {
  ToggleUnpublished,
  SetUnpublished,
}

export interface ToggleUnpublished {
  type: ActionType.ToggleUnpublished;
}

export interface SetUnpublished {
  type: ActionType.SetUnpublished;
  payload: boolean;
}

export type SettingsActions = ToggleUnpublished | SetUnpublished;

const initialState: SettingsState = {
  unpublished: false,
};

export const SettingsContext = createContext<{ state: SettingsState; dispatch: Dispatch<SettingsActions> }>({
  state: initialState,
  dispatch: () => undefined,
});

const reducer = (state: SettingsState, action: SettingsActions) => {
  const { type } = action;

  switch (type) {
    case ActionType.ToggleUnpublished:
      return { ...state, unpublished: !state.unpublished };
    // case ActionType.SetUnpublished:
    //   return { ...state, unpublished: action.payload };

    default:
      throw new Error();
  }
};

const SettingsProvider: FunctionComponent = function SettingsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
