<script lang="ts">
</script>

<main>
  <h1>Hello World!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>

<style global lang="postcss">
  /* @import url('../fonts/fonts.css'); */

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  ::-webkit-scrollbar {
    width: 18px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #bec5ca;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #919ba7;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
