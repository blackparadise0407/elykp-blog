<script lang="ts">
  import '../app.css';

  import { onDestroy, onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  import { toastStore } from '@/lib/data-access/toast';
  import ToastCard from '@/components/toast-card.svelte';
  import { globalStore } from '@/lib/data-access/global';
  import { env } from '@/constants/environment';

  let subscription: Unsubscriber;

  onMount(() => {
    const config = window.localStorage.getItem(env.globalConfigKey);
    if (config) {
      globalStore.set(JSON.parse(config));
    }
    subscription = globalStore.subscribe((value) => {
      window.localStorage.setItem(env.globalConfigKey, JSON.stringify(value));
    });
  });

  onDestroy(() => {
    subscription?.();
  });
</script>

<slot />

<div class="toast">
  {#each $toastStore as item (item.id)}
    <ToastCard data={item} />
  {/each}
</div>
