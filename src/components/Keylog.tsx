import { useEffect, useState, useContext } from 'react';
import { SettingsContext, toggleUnpublishedAction } from 'context/Settings';

export default function useKeylog() {
  const [state, setState] = useState<string[]>([]);
  // const { setUnpublished } = useSettings();
  const { unpublished } = useContext(SettingsContext);

  function brycenTyped() {
    // toggleUnpublishedAction();
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
