<script lang="ts">
  import { browser } from '$app/environment';

  import { clsx } from '@/lib/helpers/clsx';

  let open = false;
  let dropdown: HTMLDivElement;
  let overlay: HTMLDivElement;
  let offsetTop = 0;
  let offsetLeft = 0;

  $: dropdown && overlay && calculateOffset();

  function calculateOffset() {
    const dropdownRect = dropdown.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();
    offsetTop = dropdownRect.top + dropdownRect.height;
    offsetLeft = dropdownRect.left + dropdownRect.width - overlayRect.width;
  }

  function toggle() {
    open = !open;
  }

  $: if (open || !open) toggleScroll();

  function toggleScroll() {
    if (browser) {
      if (open) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = 'auto';
    }
  }
</script>

<div class={clsx('dropdown', $$restProps.class)} class:dropdown-open={open}>
  <div
    bind:this={dropdown}
    on:click={() => {
      open = true;
    }}
    on:keypress={() => {
      open = true;
    }}
  >
    <slot />
  </div>
  {#if open}
    <div class="fixed top-0 left-0 w-screen h-screen" on:click={toggle} on:keypress={toggle}>
      <div
        id="dropdown-overlay"
        class="absolute"
        bind:this={overlay}
        on:click|stopPropagation
        on:keypress|stopPropagation
        style={`--offset-top: ${offsetTop}px; --offset-left: ${offsetLeft}px`}
      >
        <slot name="overlay" />
      </div>
    </div>
  {/if}
</div>

<style>
  #dropdown-overlay {
    left: var(--offset-left);
    top: var(--offset-top);
  }
</style>
