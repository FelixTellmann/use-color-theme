import { useState } from 'react';
import createPersistedState from 'use-persisted-state';

const noop = () => {};

const mockElement = {
  classList: {
    add: noop,
    remove: noop,
  },
};

const preferDarkQuery = '(prefers-color-scheme: dark)';

const initialize = (storageKey, storageProvider, glbl = global) => {
  const usePersistedcolorThemeState = storageKey
    ? createPersistedState(storageKey, storageProvider)
    : useState;

  const mql = glbl.matchMedia ? glbl.matchMedia(preferDarkQuery) : {};

  const mediaQueryEventTarget = {
    addEventListener: (_, handler) => mql.addListener && mql.addListener(handler),
    removeEventListener: (_, handler) => mql.removeListener && mql.removeListener(handler),
  };

  const isColorSchemeQuerySupported = mql.media === preferDarkQuery;

  const getInitialValue = usersInitialState => (
    isColorSchemeQuerySupported ? mql.matches : usersInitialState
  );

  // Mock element if SSR else real body element.
  const defaultElement = (glbl.document && glbl.document.body) || mockElement;

  const getDefaultOnChange = (
    element = defaultElement,
    classNames = ['light-theme', 'dark-theme']
  ) => (val) => {
    classNames.forEach(item => element.classList.remove(item));
    element.classList.add(val);
  };

  return {
    usePersistedcolorThemeState,
    getDefaultOnChange,
    mediaQueryEventTarget,
    getInitialValue,
  };
};

export default initialize;
