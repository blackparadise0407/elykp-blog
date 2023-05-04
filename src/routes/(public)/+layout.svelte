<script>
  import Header from './header.svelte';
</script>

<div class="container">
  <Header />
</div>
<main class="bg-base-200 min-h-[calc(100vh-116px)]"><slot /></main>
<footer class="footer footer-center p-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © 2023 - All right reserved by Elykp</p>
  </div>
</footer>
