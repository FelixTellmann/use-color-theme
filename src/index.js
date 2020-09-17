import useEventListener from '@use-it/event-listener';
import { useCallback, useEffect, useMemo } from 'react';

import initialize from './initialize';

const useColorTheme = (
  initialValue = 'light-theme',
  {
    element,
    classNames = ['light-theme', 'dark-theme'],
    onChange,
    storageKey = 'colorTheme',
    storageProvider,
    global,
  } = {}
) => {
  const {
    usePersistedcolorThemeState,
    getDefaultOnChange,
    getInitialValue,
    mediaQueryEventTarget,
  } = useMemo(
    () => initialize(storageKey, storageProvider, global),
    [storageKey, storageProvider, global]
  );

  const [state, setState] = usePersistedcolorThemeState(getInitialValue(initialValue));

  const stateChangeCallback = useMemo(
    () => onChange || getDefaultOnChange(element, classNames),
    [onChange, element, classNames, getDefaultOnChange]
  );

  // Call the onChange handler
  useEffect(() => {
    stateChangeCallback(state);
  }, [stateChangeCallback, state]);

  // Listen for media changes and set state.
  useEventListener(
    'change',
    ({ matches }) => setState(() => (matches ? 'dark-theme' : 'light-theme')),
    mediaQueryEventTarget
  );

  return {
    value: state,
    // eslint-disable-next-line max-len
    set: useCallback(value => setState(() => (classNames.includes(value) ? value : classNames[0])), [setState, classNames]),
    toggle: useCallback(() => setState((current) => {
      const { length } = classNames;
      const currentIndex = classNames.indexOf(current);
      return currentIndex !== length - 1 ? classNames[currentIndex + 1] : classNames[0];
    }), [setState, classNames]),
  };
};

export default useColorTheme;
