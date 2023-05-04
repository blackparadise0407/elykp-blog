<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { remove } from '@/lib/data-access/toast';

  export let data: Toast;

  let timeout: NodeJS.Timeout | undefined;

  onMount(() => {
    timeout = setTimeout(() => {
      remove(data.id);
    }, 7000);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<div class={`alert ${data.variant}`}>
  <div>
    <span>{data.message}</span>
  </div>
</div>

<style lang="postcss">
  .info {
    @apply alert-info;
  }
  .warning {
    @apply alert-warning;
  }
  .error {
    @apply alert-error;
  }
  .success {
    @apply alert-success;
  }
</style>
