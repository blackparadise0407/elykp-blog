<script lang="ts">
  import dayjs from 'dayjs';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Elykp</title>
</svelte:head>

<div class="container py-5">
  <ul class="space-y-5">
    {#each data.items as item (item.id)}
      <li>
        <a
          href={`/${item.slug}`}
          class="card card-compact rounded-box hover:bg-base-300 transition-colors"
        >
          <div class="card-body">
            <div class="card-title flex items-center">
              {item.title}
              <div class="flex-grow" />
              <span class="text-sm font-normal opacity-80"
                >{dayjs(item.created).format('MMM DD, YYYY')}</span
              >
            </div>
            <p>{item.description}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>
