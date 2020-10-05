import useColorTheme from "use-color-theme";

export const _App = ({ pageProps, Component }) => {

  const colorTheme = useColorTheme('light-theme', {
    classNames: ['light-theme', 'dark-theme', 'funky'],
  });

  return (
    <>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Ubuntu, Cantarell, Fira Sans, Helvetica Neue, sans-serif;
          background-color: var(--background);
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
          min-width: 40px;
          padding: 0 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--button-bg);
          cursor: pointer;
          color: var(--headings);
          margin-left: 16px;
        }

        button:hover, button:focus, button:active {
          background-color: var(--button-bg-hover);
          outline: none;
        }

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
          <button aria-label="Toggle Color Theme"
                  onClick={() => colorTheme.set('light-theme')}>
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
          <button aria-label="Toggle Color Theme"
                  onClick={() => colorTheme.set('dark-theme')}>
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
          <button aria-label="Toggle Color Theme"
                  onClick={() => colorTheme.set('funky')}>
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
      </header>
      <Component {...pageProps} />
    </>
  );
};

export default _App;
