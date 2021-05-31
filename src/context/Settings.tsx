import { createContext, useReducer, FunctionComponent } from 'react';

interface Settings {
  unpublished: boolean;
}

enum ActionType {
  ToggleUnpublished = 'TOGGLE_UNPUBLISHED',
  SetUnpublished = 'SET_UNPUBLISHED',
}

type Action = {
  type: ActionType;
  payload?: boolean;
};

export const toggleUnpublishedAction: Action = {
  type: ActionType.ToggleUnpublished,
};

export const setUnpublishedAction: Action = {
  type: ActionType.SetUnpublished,
};

const initialState: Settings = {
  unpublished: false,
};

export const SettingsContext = createContext<Settings>(initialState);

const reducer = (state: Settings, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.ToggleUnpublished:
      return { ...state, unpublished: !state.unpublished };
    // case ActionType.SetUnpublished:
    //   return { ...state, unpublished: payload };

    default:
      throw new Error();
  }
};

const SettingsProvider: FunctionComponent = function SettingsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { ...state, dispatch };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
