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
      <header>
        <nav>
          <button>
            <svg stroke="currentColor"
                 fill="none"
                 stroke-width="2"
                 viewBox="0 0 24 24"
                 stroke-linecap="round"
                 stroke-linejoin="round"
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
