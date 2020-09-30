# use-color-theme

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) to help you implement a "theming" classes for your application.
The user setting persists to `localStorage` and allows you to add as many color themes as you wish.

`useColorTheme` works in one of two ways:

1.  By toggling a CSS class on whatever element you specify (defaults to `document.body`).
    You then setup your CSS to display different views based on the presence of the selector. For example, the following CSS is used in the demo app to ease the background color in/out of dark mode.

    ```css
    body.light-theme {
      background-color: #fff;
      color: #333;
      transition: background-color 0.3s ease;
    }
    body.dark-theme {
      background-color: #1a1919;
      color: #999;
    }
    ```

2.  If you don't use global classes, you can specify an `onChange` handler and take care of the implementation of switching to dark mode yourself.

- Support for Server Side Rendering (SSR) in version 2.2 and above.

## Requirement

To use `use-color-theme`, you must use `react@16.8.0` or greater which includes Hooks.

## Installation

```sh
$ npm i use-color-theme
```

## Usage

```js
const colorTheme = useColorTheme(initialState, colorThemeConfig);
```

### Parameters

You pass `useColorTheme` an `initialState` (a `string` specifying to define the default className, defaults to `light-theme`) and an optional `colorThemeConfig` object. The configuration object may contain the following keys.

| Key               | Description                                                                                                                                                                                                                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `classNames`      | The classes to apply. Default = [`'light-theme'`,`'dark-theme'`].                                                                                                                                                                                                                                                                             |
| `element`         | The element to apply the class name. Default = `document.body`.                                                                                                                                                                                                                                                           |
| `onChange`        | A function that will be called when the dark mode value changes and it is safe to access the DOM (i.e. it is called from within a `useEffect`). If you specify `onChange` then `classNames`, and `element` are ignored (i.e. no classes are automatically placed on the DOM). You have full control! |
| `storageKey`      | A string that will be used by the `storageProvider` to persist the dark mode value. If you specify a value of `null`, nothing will be persisted. Default = `colorTheme`.                                                                                                                                                                                                                   |
| `storageProvider` | A storage provider. Default = `localStorage`. You will generally never need to change this value.                                                                                                                                                                                                                       |

### Return object

A `colorTheme` object is returned with the following properties.

| Key         | Description                                             |
| :---------- | :------------------------------------------------------ |
| `value`     | The string containing the current state className.    |
| `set('value')`  | A function that allows you to set color theme to to `'value'`.  |
| `toggle()`  | A function that allows you to toggle dark mode, iterating over all provided theme classes.         |

Note that because the methods don't require any parameters, you can call them
direcly from an `onClick` handler from a button, for example
(i.e., no lambda function is required).

## Example

Here is a simple component that uses `useColorTheme` to provide a dark mode toggle control.
If dark mode is selected, the CSS class `color-theme` is applied to `document.body` and is removed
when de-selected.

```jsx
import React from 'react';
import useColorTheme from 'use-color-theme';

import Toggle from './Toggle';

const colorThemeToggle = () => {
  const colorTheme = useColorTheme(false);

  return (
    <div>
      <button type="button" onClick={colorTheme.disable}>
        ☀
      </button>
      <Toggle checked={colorTheme.value} onChange={colorTheme.toggle} />
      <button type="button" onClick={colorTheme.enable}>
        ☾
      </button>
    </div>
  );
};

export default colorThemeToggle;
```

## That flash!

If your CSS is setup to default to light-theme, but the user selects dark mode,
the next time they visit your app, they will be in dark mode.
However, the user will see a flash of light-theme before the app is spun up
and `useColorTheme` is called.

To prevent this, I've included some vanilla JavaScript that you can insert in your
`index.html` just after the `<body>` tag. It is in a file named `noflash.js.txt`
You can either insert the contents of this file in a `<script>` tag or automate the
step in your build process.

Note that if you change any of the default—such as `storageKey` or `classNames` for example—the `noflash.js` file will need to be modified with the same values.


### Next.js

For next.js uses copy the `noflash.js.txt` to your `public` folder (`public/noflash.js`) and then create a `_document.js` and include the script **before** `<Main />`.

```js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## License

**[MIT](LICENSE)** Licensed
