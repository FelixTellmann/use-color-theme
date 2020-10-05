export default function Index() {
  return <>
    <style jsx>{`
      .page {
        width: 100vw;
        height: 100vh;
        background-color: var(--background);
      }

      .wrapper {
        max-width: 760px;
        padding: 0 32px;
        margin: 0 auto;
      }

      h1 {
        color: var(--heading);
      }

      p {
        color: var(--text)
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
