<script lang="ts">
  import dayjs from 'dayjs';

  import Masonry from '@/components/masonry.svelte';

  import type { PageData } from './$types';

  export let data: PageData;

  const posts = data.posts;
  const latestPost = data.latestPost;
</script>

<svelte:head>
  <title>Elykp</title>
</svelte:head>

<div class="container py-5 space-y-10">
  <div class="hero py-5 px-10 bg-base-300 rounded-box">
    <div
      class="hero-content max-w-none w-full flex-col md:flex-row gap-3 items-start md:items-center"
    >
      {#if latestPost}
        <div class="flex-grow self-start md:max-w-[40%]">
          <span class="font-medium">Latest post</span>
          <div class="prose max-w-none w-full">
            <h1>{latestPost.title}</h1>
            <p>{latestPost.description}</p>
            <a
              class="link link-primary inline-block max-w-[10rem] truncate"
              href={`/${latestPost.slug}`}
            >
              → cd ./{latestPost.title}
            </a>
          </div>
        </div>
      {/if}
      <div class="divider divider-horizontal" />
      <div class="space-y-3">
        <p class="font-bold text-xl">Subscribe For Updates</p>
        <div class="form-control">
          <div class="input-group">
            <input
              type="text"
              placeholder="you@email.com"
              class="input input-bordered input-primary w-full"
            />
            <button class="btn btn-primary font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center" />
  <Masonry items={posts.items}>
    {#each posts.items as item (item.id)}
      <a
        href={`/${item.slug}`}
        class="w-full card card-compact rounded-box bg-primary hover:shadow-lg transition-all hover:scale-110"
      >
        <div class="card-body prose">
          <div class="card-title flex-col items-start">
            <div class="text-3xl font-extrabold text-primary-content">
              {item.title}
            </div>
            <span class="text-sm font-normal opacity-80 text-primary-content">
              {dayjs(item.created).format('MMM DD, YYYY')}
            </span>
          </div>
          <p class="text-primary-content">{item.description}</p>
        </div>
      </a>
    {/each}
  </Masonry>
</div>
