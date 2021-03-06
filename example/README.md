
# How to add color themes in ReactJS?
Felix Tellmann

---

**TL;DR** Add as many color themes as you like to your react app, using a tiny react hook and CSS custom properties.

Over the last few weeks i've been upgrading my website with a complete
 redesign, including dark-mode functionality. I've found a some good resources to add a dark-mode / light
 -mode switcher, but very little info to do proper theming with more than
  just two themes.

Thats why I decided to build a new feature for my site: [use-color-theme](https://github.com/FelixTellmann/use-color-theme).
A simple react hook that toggles `light-theme`, `dark-theme` and any other
 class on the `body` tag. The hook is works with CSS [custom
  properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and uses
   `prefers-color-scheme` and localStorage under the hood to match users
    perferences and eliminate the *flash* problem thats often associated with
     color theming.

Now adding a new color theme happens in just a few steps. Check it out on my [site](https://felixtellmann.com) by hitting the theme icon in the header.


## Initial Setup

Adding multiple themes has never been easier. Just follow the simple steps and you can add theming to your site.
Let's create an example page to go through the steps or [click here](#adding-use-color-theme) to jump straight to the *add it to a page* part.

First, we create a new directory and install the basics.

```bash
mkdir colorful && cd colorful
yarn init -y
yarn add react react-dom next
```

Next, we create the `pages` folder required for `NextJs` and create two files: `_app.js` and `index.js`.
Lets also add some basics make it look pretty.

```jsx:_app.js
export const _App = ({ pageProps, Component }) => {

  return (
    <>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Ubuntu, Cantarell, Fira Sans, Helvetica Neue, sans-serif;
        }

        body {
          background-color: #fff;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        header {
          height: 100px;
          position: sticky;
          top: 0;
          margin-top: 32px;
          background-color: #fff
        }

        nav {
          max-width: 760px;
          padding: 32px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 0 auto;
        }

        button {
          border: 0;
          border-radius: 4px;
          height: 40px;
          min-width: 40px;
          padding: 0 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #e2e8f0;
          cursor: pointer;
          color: #fff;
          margin-left: 16px;
        }

        button:hover, button:focus, button:active {
          background-color: var(--button-bg-hover);
          outline: none;
        }
      `}</style>
      <header>
        <nav>
          <button>
            <svg stroke="currentColor"
                 fill="none"
                 strokeWidth="2"
                 viewBox="0 0 24 24"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 height="1em"
                 width="1em"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  );
};

export default _App;
```

```jsx:index.js
export default function Index() {
  return <>
    <style jsx>{`
      .wrapper {
        max-width: 760px;
        padding: 0 32px;
        margin: 0 auto;
      }
    `}</style>
    <main className="page">
      <div className="wrapper">
        <h1 className="intro">Hello World!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          animi consectetur delectus dolore eligendi id illo impedit iusto,
          laudantium nam nisi nulla quas, qui quisquam voluptatum? Illo nostrum
          odit optio.
        </p>
      </div>

    </main>
  </>;
}
```

### CSS variables

Lets add some CSS custom properties for the theme styling.

```js:index.js
...
<style jsx>{`
  .wrapper {
    max-width: 760px;
    padding: 0 32px;
    margin: 0 auto;
  }

  h1 {
    color: var(--headings);
  }

  p {
    color: var(--text)
  }
`}</style>
...
```

In the _app.js file we can then add the global CSS variables with its
 different colors. *You can also add the CSS properties with any other css-in-js
  framework or plain css files, as long as the classes are matched accordingly*

 Lets also swap the colors used for the header so we use CSS properties
  accross the board.

```js:_app.js
...
 <style jsx global>{`
  ...
  body {
    background-color: var(--background);
  }

  header {
    height: 100px;
    position: sticky;
    top: 0;
    margin-top: 32px;
    background-color: var(--background);
    backdrop-filter: blur(10px);
  }

  nav {
    max-width: 760px;
    padding: 32px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 auto;
  }

  button {
    border: 0;
    border-radius: 4px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--button-bg);
    transition: background-color 0.2s ease-in;
    cursor: pointer;
    color: var(--headings)
  }

  button:hover, button:focus, button:active {
    background-color: var(--button-bg-hover);
    outline: none;
  }

  body {
    --button-bg: #e2e8f0;
    --button-bg-hover: #cdd7e5;
    --background: #fff;
    --headings: #000;
    --text: #38393e;
  }
`}</style>
```

## Adding useColorTheme

Add the custom hook by running `yarn add use-color-theme` in the terminal and
 implement it in our _app.js file. This will make sure that the themes are
  available globally on each page.

```js:_app.js
import useColorTheme from "use-color-theme";

export const _App = ({ pageProps, Component }) => {
  const colorTheme = useColorTheme('light-theme', {
    classNames: ['light-theme', 'dark-theme', 'funky']
  });
  return (
    <>
      <style jsx global>{`
        ...

        .light-theme {
          --button-bg: #e2e8f0;
          --button-bg-hover: #cdd7e5;
          --background: #fff;
          --headings: #000;
          --text: #38393e;
        }

        .dark-theme {
          --button-bg: rgb(255 255 255 / 0.08);
          --button-bg-hover: rgb(255 255 255 / 0.16);
          --background: #171923;
          --headings: #f9fafa;
          --text: #a0aec0;
        }

        .funky {
          --button-bg: #1f2833;
          --button-bg-hover: #425069;
          --background: #0b0c10;
          --headings: #66fcf1;
          --text: #e647ff;
        }
    `}</style>
      <header>
        <nav>
          <button aria-label="Toggle Color Theme" onClick={colorTheme.toggle}>
            <svg stroke="currentColor"
                 fill="none"
                 strokeWidth="2"
                 viewBox="0 0 24 24"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 height="1em"
                 width="1em"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </nav>
      </header>
      ...
    </>
  );
};

export default _App;
```

### In detail

Having a look at the detail to see whats happening.
  1. We import useColorTheme and impiment it the same way we would use any
   other react hook:
   ```js
    const colorTheme = useColorTheme('light-theme', {
      classNames: ['light-theme', 'dark-theme', 'funky']
    });
   ```
   The 1st
    parameter is the initial class, which will be used if nothing else has
     been selected yet. The second parameter is an Object with the
      [configuration](https://github.com/FelixTellmann/use-color-theme#parameters) for the hook. *you can name the classes
       in any way you like, but semantic names are recommended*

  2. We added classes for `.light-theme`, `.dark-theme` and `.funky` with
   different color variables.

  3. We added an onClick function to the button with `colorTheme.toggle`

### Set Specifc Theme

**But what if I want to change it to a specific theme?**<br />
Theres an easy solution
 to that as well. Lets have a look how we can impliment it:

```js:_app.js
...
<nav>
  <button aria-label="light-theme" onClick={() => colorTheme.set('light-theme')}>
    <svg stroke="currentColor"
         fill="none"
         strokeWidth="2"
         viewBox="0 0 24 24"
         strokeLinecap="round"
         strokeLinejoin="round"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  </button>
  <button aria-label="dark-theme" onClick={() => colorTheme.set('dark-theme')}>
    <svg stroke="currentColor"
         fill="none"
         strokeWidth="2"
         viewBox="0 0 24 24"
         strokeLinecap="round"
         strokeLinejoin="round"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>
  <button aria-label="funky theme" onClick={() => colorTheme.set('funky')}>
    <svg stroke="currentColor"
         fill="none"
         strokeWidth="2"
         viewBox="0 0 24 24"
         strokeLinecap="round"
         strokeLinejoin="round"
         height="1em"
         width="1em"
         xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
      <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
      <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
      <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
      <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
      <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
    </svg>
  </button>
  <button aria-label="Toggle Color Theme"
          onClick={() => colorTheme.toggle()}>Toggle
  </button>
</nav>
...
```

Now we are all set and can easily change the themes in any way we like. But
 what happens when we refresh the page? Check it out.



## The Flash

 As you see, when refreshing the page, the theme stays the same as before, but
  there is a split second of a white flash. Thats because the user-preference is stored in
   localStorage and only accessed during the react hydration. Luckily, there is
    a solution to that as well.

We can setup a code blocking script that completes loading before anything
 else can be executed. Lets create a file for the script `mkdir public && cd
  public` and create the file with `touch colorTheme.js` and copy the below
   code into the file.

```js:colorTheme.js
// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if color theme is the default.

(function() {
  // Change these if you use something different in your hook.
  var storageKey = 'colorTheme';
  var classNames = ['light-theme', 'dark-theme', 'funky'];

  function setClassOnDocumentBody(colorTheme) {
    var theme = 'light-theme';
    if (typeof colorTheme === 'string') {
      theme = colorTheme;
    }
    for (var i = 0; i < classNames.length; i++) {
      document.body.classList.remove(classNames[i]);
    }
    document.body.classList.add(theme);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }
  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches ? classNames[1] : classNames[0]);
    localStorage.setItem(storageKey, JSON.stringify('dark-theme'));
  } else {
    // source of truth from document.body
    var iscolorTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem(storageKey, iscolorTheme ? JSON.stringify('dark-theme') : JSON.stringify('light-theme'));
  }
}());
```

This script does the following:

1. It looks for the `localStorage` with the key `colorTheme`
2. Then it looks for the `prefers-color-scheme` CSS media query, to check
 whether its set to dark, which translates to the user loading the website having a system using color theme.
   * If there's no mode set in localStorage
     but the user's system uses color theme, we add a class `dark-theme` to the
      body of the main document.
   * If there's nothing set in localStorage we don't do anything, which will
    end up loading the default theme of our Site.
   * Otherwise, we add the class associated with the mode set in local
    storage to the body of the document

The last thing we then need to do is to load the script during page load. We
 want to make sure that the script runs after our meta tags are loaded, but
  before the content of the page get loaded. In Next.js we can use the
   `_document.js` file to load the script before the main content & after the
    `<head></head>` (check out the [docs](https://nextjs.org/docs/advanced
    -features/custom-document) for more info).

```js:_document.js
import Document, { Head, Html, Main, NextScript } from 'next/document';

class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <script src="./colorTheme.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;

```

## Result

By adding the script to the `body` before any other content is loaded, we
 avoid the **flash** successfully. You can find the code [here](https://github.com/FelixTellmann/use-color-theme/tree/master/example)
