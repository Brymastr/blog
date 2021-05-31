import { useEffect, useState, useContext } from 'react';
import { SettingsContext, ActionType } from 'context/Settings';

export default function useKeylog() {
  const [state, setState] = useState<string[]>([]);
  const { dispatch } = useContext(SettingsContext);

  function brycenTyped() {
    console.log('brycen');
    dispatch({ type: ActionType.ToggleUnpublished });
  }

  const joined = state.join('');
  if (joined.slice(-6) === 'brycen') {
    brycenTyped();
  }

  function updateKeylog(key: string) {
    let currentState = state;

    if (state.length >= 10) {
      currentState = state.slice(1, state.length);
    }

    setState([...currentState, key]);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => updateKeylog(e.key);
    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  });

  return null;
}
