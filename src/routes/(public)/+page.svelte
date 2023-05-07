<script lang="ts">
  import dayjs from 'dayjs';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';

  import Masonry from '@/components/masonry.svelte';
  import { pb } from '@/lib/pb';
  import { enqueue } from '@/lib/data-access/toast';
  import { PbFilter } from '@/lib/helpers/common';
  import Loader from '@/components/loader.svelte';
  import { BAD_REQUEST } from '@/constants/messages';

  import type { PageData } from './$types';

  export let data: PageData;

  const PER_PAGE = 9;

  let email: string;
  let loading = false;
  const filters = new PbFilter();

  let posts: Post[] = [],
    page = 1,
    postLoading = true,
    hasMore = false;

  async function handleSubscribe() {
    if (!email) {
      return;
    }
    loading = true;
    try {
      await pb.collection('subscriptions').create({
        email
      });
      enqueue('Thanks for subscribing to our newsletter');
      email = '';
    } catch (e: any) {
      if (e?.response?.data?.email?.code === 'validation_not_unique') {
        enqueue('You have already subscribed', { variant: 'error' });
      } else enqueue(e?.message, { variant: 'error' });
    } finally {
      loading = false;
    }
  }

  let div: HTMLDivElement;

  function handleScroll(this: Document) {
    if (this.scrollingElement) {
      const scrolledToBot =
        this.scrollingElement.scrollHeight -
          (this.scrollingElement.scrollTop + this.scrollingElement.clientHeight) <
        20;
      if (scrolledToBot && !postLoading && hasMore) {
        page = page + 1;
        loadPosts(page);
      }
    }
  }

  onMount(() => {
    browser && document.addEventListener('scroll', handleScroll);
    loadPosts(page);
  });

  onDestroy(() => {
    browser && document.removeEventListener('scroll', handleScroll);
  });

  async function loadPosts(page: number) {
    postLoading = true;
    const url = new URL(location.href);
    const tags = url.searchParams.get('tags');
    if (tags) {
      filters.add(`tags ~ '${tags}'`);
    }
    try {
      const { items, totalItems } = await pb.collection('posts').getList<Post>(page, PER_PAGE, {
        sort: '-created',
        filter: filters.get()
      });
      posts = [...posts, ...items];
      hasMore = posts.length < totalItems;
    } catch (e) {
      enqueue(BAD_REQUEST, { variant: 'error' });
    } finally {
      postLoading = false;
    }
  }

  const latestPost = data.latestPost;
</script>

<svelte:head>
  <title>Elykp</title>
</svelte:head>

<div bind:this={div} class="container py-5 space-y-10">
  <div class="hero py-5 px-5 md:px-10 rounded-box">
    <div
      class="hero-content max-w-none w-full flex-col md:flex-row gap-3 items-start md:items-center"
    >
      {#if latestPost}
        <div class="flex-grow self-start md:max-w-[40%]">
          <span class="font-medium !text-primary">Latest post</span>
          <div class="prose max-w-none w-full">
            <h1>{latestPost.title}</h1>
            <p>{latestPost.description}</p>
            <a
              class="link !link-primary inline-block max-w-[10rem] truncate"
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
        <form class="form-control" on:submit|preventDefault={handleSubscribe}>
          <div class="input-group">
            <input
              type="email"
              placeholder="you@email.com"
              class="input input-bordered w-full"
              bind:value={email}
            />
            <button
              class="btn font-medium btn-primary !text-primary-content"
              class:loading
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center" />
  <Masonry items={posts}>
    {#each posts as item (item.id)}
      <a
        href={`/${item.slug}`}
        class="w-full card card-compact rounded-box bg-primary hover:shadow-lg transition-all md:hover:scale-110"
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
  {#if postLoading}
    <Loader class="mx-auto" />
  {/if}
</div>

<style>
  .hero {
    @apply bg-neutral;
  }

  .hero * {
    @apply text-neutral-content;
  }
</style>
