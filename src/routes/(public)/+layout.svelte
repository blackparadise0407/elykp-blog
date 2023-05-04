<script lang="ts">
  import { browser } from '$app/environment';
  const THEMES = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter'
  ];

  let theme = browser ? window.localStorage.getItem('theme') ?? '' : '';

  $: {
    if (browser && theme) {
      document.body.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }
</script>

<div class="container">
  <nav class="navbar flex">
    <a class="btn btn-ghost normal-case text-xl" href="/">Elykp</a>
    <div class="flex-grow" />
    <select class="select select-sm" bind:value={theme}>
      <option disabled selected>Select theme</option>
      {#each THEMES as item}
        <option>{item}</option>
      {/each}
    </select>
  </nav>
</div>
<main class="bg-base-200 min-h-[calc(100vh-116px)]"><slot /></main>
<footer class="footer footer-center p-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © 2023 - All right reserved by Elykp</p>
  </div>
</footer>
