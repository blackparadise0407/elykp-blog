<script lang="ts">
  import { clickOutside } from '@/directives/clickOutside';
  import { clsx } from '@/lib/helpers/clsx';

  let open = false;
</script>

<div class={clsx('dropdown', $$restProps.class)} class:dropdown-open={open}>
  <div
    on:click={() => {
      open = true;
    }}
    on:keypress={undefined}
  >
    <slot />
  </div>
  <div
    class="dropdown-content"
    use:clickOutside={() => {
      open = false;
    }}
  >
    <slot name="overlay" />
  </div>
</div>
