import { useEffect, useContext } from 'react';
import { SettingsContext, ActionType } from 'context/Settings';

export default function useKeylog() {
  let state: string[] = [];
  const { dispatch } = useContext(SettingsContext);

  function reset() {
    state = [];
  }

  function adminTyped() {
    console.log('admin');
    dispatch({ type: ActionType.ToggleUnpublished });
    reset();
  }

  function updateKeylog(key: string) {
    let currentState = state;

    if (state.length >= 10) {
      currentState = state.slice(1, state.length);
    }

    state = [...currentState, key];

    const joined = state.join('');

    if (joined.slice(-5) === 'admin') {
      adminTyped();
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => updateKeylog(e.key);
    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, []);

  return null;
}
