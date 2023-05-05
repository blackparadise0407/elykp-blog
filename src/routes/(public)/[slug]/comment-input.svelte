<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';

  const TIMEOUT = 60;

  let name = '';
  let content = '';

  let interval: NodeJS.Timer | undefined;

  let time = TIMEOUT;

  const dispatch = createEventDispatcher<{
    submit: CommentSubmitPayload;
  }>();

  function handleSubmit() {
    if (!content) {
      return;
    }
    dispatch('submit', {
      commenter: name,
      content
    });
    reset();
  }

  function reset() {
    interval && clearInv();
    interval = setInterval(() => {
      if (time > 0) {
        time -= 1;
      } else {
        clearInv();
      }
    }, 1000);
    name = '';
    content = '';
  }

  function clearInv() {
    clearInterval(interval);
    interval = undefined;
    time = TIMEOUT;
  }

  onDestroy(() => {
    clearInterval(interval);
  });

  $: disabled = !!interval || !content;
</script>

<form class="mt-5 space-y-3" on:submit|preventDefault={() => handleSubmit()}>
  <p class="font-bold text-lg">Leave a comment</p>
  <input
    type="text"
    placeholder="Your name (optional)"
    class="input input-primary input-bordered w-full max-w-xs"
    bind:value={name}
  />
  <textarea
    class="textarea textarea-primary textarea-bordered w-full mt-5 text-base"
    placeholder="Aa..."
    bind:value={content}
  />
  <button class="btn btn-primary" class:btn-disabled={disabled} type="submit" {disabled}>
    Post
    {#if !!interval}
      {' '}
      <span class="normal-case">({time}s)</span>
    {/if}
  </button>
</form>
