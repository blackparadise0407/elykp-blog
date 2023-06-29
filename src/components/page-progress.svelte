<script lang="ts">
  import { browser } from '$app/environment';

  let progress = 0;
  let scrollY = 0;

  $: if (browser) {
    const _progress =
      scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    progress = isFinite(_progress) ? _progress * 100 : 0;
  }
</script>

<progress
  class="fixed top-0 left-0 progress progress-primary z-50"
  class:invisible={!progress}
  value={progress}
  max="100"
/>
<svelte:window bind:scrollY />
