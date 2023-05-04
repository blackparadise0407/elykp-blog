<script lang="ts">
  import '../app.css';

  import { toastStore } from '@/lib/data-access/toast';
  import ToastCard from '@/components/toast-card.svelte';
</script>

<slot />

<div class="toast">
  {#each $toastStore as item (item.id)}
    <ToastCard data={item} />
  {/each}
</div>
