<script>
  import Header from './header.svelte';
</script>

<div class="bg-base-100 min-h-screen pt-16">
  <Header />
  <div class="min-h-[calc(100vh-116px)]">
    <slot />
  </div>
  <footer class="footer footer-center p-4 text-base-content">
    <div>
      <p>Copyright © 2023 - All right reserved by Elykp</p>
    </div>
  </footer>
</div>
