<script lang="ts">
  import { page } from '$app/stores';
</script>

<div
  class="h-[1px] flex flex-col justify-center items-center gap-5 py-5"
  style="min-height: inherit;"
>
  <div class="flex gap-3 justify-center items-center">
    <div class="text-5xl">{$page.error?.code}</div>
    <p class="text-xl">{$page.error?.message}</p>
  </div>
  <a class="btn btn-primary justify-self-center" href="/">Take me back to home page</a>
</div>
