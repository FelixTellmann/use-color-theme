import { testHook, act, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useColorTheme from '../src';

afterEach(cleanup);

const createTestElement = arr => ({
  classList: {
    add: (className) => {
      arr.push({ method: 'add', className });
    },
    remove: (className) => {
      arr.push({ method: 'remove', className });
    },
  },
});

describe('useColorTheme without onChange', () => {
  test('initializing with a default value will return false', () => {
    let value;
    testHook(() => {
      ({ value } = useColorTheme(undefined, { storageKey: null }));
    });
    expect(value).toBe('light-theme');
  });

  test('initializing with a value of dark-theme will return dark-theme', () => {
    let value;
    testHook(() => {
      ({ value } = useColorTheme('dark-theme', { storageKey: null }));
    });
    expect(value).toBe('dark-theme');
  });

  test('initializing with a initial value of light-theme will return light-theme', () => {
    let value;
    testHook(() => {
      ({ value } = useColorTheme('light-theme', { storageKey: null }));
    });
    expect(value).toBe('light-theme');
  });

  test('calling `toggle` will return next iteration in className Array', () => {
    let value;
    let toggle;
    testHook(() => {
      ({ value, toggle } = useColorTheme('light-theme', { storageKey: null }));
    });
    act(toggle);
    expect(value).toBe('dark-theme');
    act(toggle);
    expect(value).toBe('light-theme');
  });

  test('a media change to "light-theme" will return true', () => {
    let callback;

    const mockGlobal = {
      matchMedia: media => ({
        media,
        match: false,
        addListener: (handler) => { callback = handler; },
        removeistener: () => {},
      }),
    };

    let value;
    testHook(() => {
      ({ value } = useColorTheme('light-theme', { storageKey: null, global: mockGlobal }));
    });
    callback({ matches: true });
    expect(value).toBe('dark-theme');
  });

  test('a media change to "dark mode" will return false', () => {
    let callback;

    const mockGlobal = {
      matchMedia: media => ({
        media,
        match: true,
        addListener: (handler) => { callback = handler; },
        removeistener: () => {},
      }),
    };

    let value;
    testHook(() => {
      ({ value } = useColorTheme('light-theme', { storageKey: null, global: mockGlobal }));
    });
    callback({ matches: false });
    expect(value).toBe('light-theme');
  });
});


describe('useColorTheme accepts a default `config`', () => {
  test('calling `disable` will call handler with `true`', () => {
    let value;
    testHook(() => {
      ({ value } = useColorTheme(true));
    });
    expect(value).toBe(true);
  });
});

describe('useColorTheme and default `onChange`', () => {
  test('`classNames` and `classNames` default', () => {
    const calls = [];
    const mockElement = createTestElement(calls);

    testHook(() => {
      (useColorTheme('light-theme', {
        storageKey: null,
        element: mockElement,
      }));
    });
    expect(calls.length).toBe(3);
    expect(calls[0]).toEqual({ method: 'remove', className: 'light-theme' });
    expect(calls[1]).toEqual({ method: 'remove', className: 'dark-theme' });
    expect(calls[2]).toEqual({ method: 'add', className: 'light-theme' });
  });

  test('`classNames` and `classNames` can be specified in `config`', () => {
    const calls = [];
    const mockElement = createTestElement(calls);

    let toggle;
    testHook(() => {
      ({ toggle } = useColorTheme('d', {
        storageKey: null,
        element: mockElement,
        classNames: ['d', 'l', 'r'],
      }));
    });
    expect(calls.length).toBe(4);
    expect(calls[0]).toEqual({ method: 'remove', className: 'd' });
    expect(calls[1]).toEqual({ method: 'remove', className: 'l' });
    expect(calls[2]).toEqual({ method: 'remove', className: 'r' });
    expect(calls[3]).toEqual({ method: 'add', className: 'd' });

    act(toggle);
    expect(calls.length).toBe(8);
    expect(calls[4]).toEqual({ method: 'remove', className: 'd' });
    expect(calls[5]).toEqual({ method: 'remove', className: 'l' });
    expect(calls[6]).toEqual({ method: 'remove', className: 'r' });
    expect(calls[7]).toEqual({ method: 'add', className: 'l' });
  });

  test('you can specify a custom `storageProvider` and a `storageKey', () => {
    const data = [];
    const mockProvider = {
      getItem: () => null,
      setItem: (key, value) => { data.push([key, value]); },
    };

    let toggle;
    testHook(() => {
      ({ toggle } = useColorTheme('light-theme', {
        storageKey: 'key',
        storageProvider: mockProvider,
        onChange: () => {},
      }));
    });
    expect(data.length).toBe(1);
    expect(data[0]).toEqual(['key', '"light-theme"']);

    act(toggle);

    expect(data.length).toBe(2);
    expect(data[1]).toEqual(['key', '"dark-theme"']);
  });
});
