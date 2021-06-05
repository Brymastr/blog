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

export type SettingsAction = ToggleUnpublished | SetUnpublished;

const initialState: SettingsState = {
  unpublished: false,
};

export const SettingsContext = createContext<{ state: SettingsState; dispatch: Dispatch<SettingsAction> }>({
  state: initialState,
  dispatch: () => undefined,
});

const reducer = (state: SettingsState, action: SettingsAction) => {
  const { type } = action;

  switch (type) {
    case ActionType.ToggleUnpublished:
      return { ...state, unpublished: !state.unpublished };
    case ActionType.SetUnpublished:
      // @ts-ignore
      return { ...state, unpublished: action.payload };

    default:
      throw new Error();
  }
};

const SettingsProvider: FunctionComponent = function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
