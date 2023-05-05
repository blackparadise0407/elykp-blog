<script lang="ts">
  import { browser } from '$app/environment';

  import { THEMES, globalStore, resetDefaultSetting } from '@/lib/data-access/global';

  $: {
    if (browser) {
      document.body.setAttribute('data-theme', $globalStore.theme);
    }
  }
</script>

<div
  class="fixed top-0 left-0 w-screen z-10"
  style="background-image: linear-gradient(hsl(0 0% 0% / 40%),transparent);"
>
  <div class="container">
    <nav class="navbar flex">
      <a
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium normal-case text-xl hover:text-primary-focus transition-colors"
        href="/"
      >
        Elykp
      </a>
      <div class="flex-grow" />

      <div class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-ghost btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content font-medium menu border-2 border-base-content border-opacity-10 p-3 shadow-lg bg-base-100 rounded-box w-96"
        >
          <div class="p-2 flex justify-between flex-row items-center">
            <span>Theme</span>
            <select class="select select-primary select-bordered" bind:value={$globalStore.theme}>
              <option disabled selected>Select theme</option>
              {#each THEMES as item}
                <option>{item}</option>
              {/each}
            </select>
          </div>
          <div class="divider" />
          <div class="p-2 flex justify-between flex-row items-center">
            <span style="width: -webkit-fill-available;">Reading size</span>
            <div class="relative w-full">
              <div class="absolute left-1/2 -translate-x-1/2 bottom-[100%]">
                {$globalStore.fontSize} px
              </div>
              <input
                type="range"
                min="16"
                max="24"
                step="2"
                class="range range-primary range-xs"
                bind:value={$globalStore.fontSize}
              />
            </div>
          </div>
          <div class="divider" />
          <div class="p-2 flex justify-between flex-row items-center">
            <span style="width: -webkit-fill-available;">Reading line height</span>
            <div class="relative w-full">
              <div class="absolute left-1/2 -translate-x-1/2 bottom-[100%]">
                {$globalStore.lineHeight} px
              </div>
              <input
                type="range"
                min="32"
                max="48"
                step="8"
                bind:value={$globalStore.lineHeight}
                class="range range-primary range-xs"
              />
            </div>
          </div>
          <div class="divider" />
          <div class="p-2 flex justify-between flex-row items-center">
            <span style="width: -webkit-fill-available;">Use default settings</span>
            <button class="btn btn-primary" on:click={() => resetDefaultSetting()}>Reset</button>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</div>
