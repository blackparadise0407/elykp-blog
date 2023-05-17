<script lang="ts">
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  import { getPbFileUrl, pb } from '@/lib/pb';
  import { globalStore } from '@/lib/data-access/global';
  import { env } from '@/constants/environment';

  import type { PageData } from './$types';
  import CommentInput from './comment-input.svelte';
  import CommentCard from './comment-card.svelte';
  import { processHtml } from './html-processor';
  import TableOfContent from './table-of-content.svelte';

  export let data: PageData;

  let comments: Comment[] = [];
  let bannerUrl = '';
  let hasMoreComments = false;
  let html: string | undefined;
  let minReads: number | undefined;

  function getBadgeColor(name: string) {
    const availableColors = ['', 'badge-primary', 'badge-secondary', 'badge-accent', 'badge-ghost'];
    return availableColors[name.charCodeAt(0) % 5];
  }

  const post = data.post;

  async function handleComment(payload: CommentSubmitPayload) {
    if (post) {
      await pb.collection('comments').create({
        ...payload,
        post: post.id
      } as CreateCommentDto);
      loadComments();
    }
  }

  async function loadComments() {
    const { items, totalItems } = await pb.collection('comments').getList<Comment>(1, 10, {
      sort: '-created',
      filter: `post='${post.id}'`
    });
    comments = items;
    hasMoreComments = comments.length < totalItems;
  }

  onMount(() => {
    loadComments();
    const res = processHtml(post.content);
    html = res.html;
    minReads = res.minReads;
    fetch(`${env.pbUrl}/api/posts/${post.id}/view-counts`, {
      method: 'post'
    }).catch();
  });

  function getThumb(w: number) {
    if (w < 640) {
      return '480x360';
    } else if (w >= 640 && w < 1024) {
      return '640x480';
    } else return '768x576';
  }

  $: if (browser) {
    bannerUrl = getPbFileUrl(post, post.banner, {
      thumb: getThumb(window.innerWidth)
    });
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RXZ6MBM5RS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-RXZ6MBM5RS');
  </script>
  <title>{post.title}</title>
  <meta name="author" content={post.expand.author?.username} />
  <meta name="description" content={post.description} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
  <meta property="og:url" content={`${$page.url.origin}/${post.slug}`} />
  <meta property="og:image" content={bannerUrl} />
  <link rel="canonical" href={`${$page.url.origin}/${post.slug}`} />
</svelte:head>

<article class="container py-10">
  <div class="relative">
    <div class="prose max-w-none lg:prose-lg">
      {#if bannerUrl}
        <figure class="rounded-box overflow-hidden">
          <img class="object-cover w-full" src={bannerUrl} alt="" />
        </figure>
      {/if}
      <h1 class="text-4xl mb-0 text-center">{post.title}</h1>

      <p class="text-center">
        Published on
        {dayjs(post.created).format('MMM DD, YYYY')}
        {#if minReads}
          {' '}•{' '}
          <span>{Math.ceil(minReads)} min reads</span>
        {/if}
      </p>
      <TableOfContent {html} />
      <div
        id="content"
        style={`--font-size: ${$globalStore.fontSize}px; --line-height: ${$globalStore.lineHeight}px`}
      />
      <div class="flex flex-wrap gap-3">
        {#each post.expand.tags ?? [] as item (item.id)}
          <a href={`/?tags=${item.id}`}>
            <div class={`badge md:badge-lg ${getBadgeColor(item.name)}`}>
              #{item.name}
            </div>
          </a>
        {/each}
      </div>
      <div class="mt-5">
        <a class="link link-primary link-hover mt-5" href="/">← cd ..</a>
      </div>
    </div>
  </div>
  <div class="divider" />
  <CommentInput on:submit={(e) => handleComment(e.detail)} />
  {#if !!comments.length}
    <div class="mt-5">
      <p class="font-bold text-lg">Top comments</p>
      <ul class="mt-5 space-y-8">
        {#each comments as item (item.id)}
          <CommentCard data={item} />
        {/each}
      </ul>
      {#if hasMoreComments}
        <button class="btn btn-secondary">Load more</button>
      {/if}
    </div>
  {/if}
</article>

<style>
  :global(#content p) {
    font-size: var(--font-size);
    line-height: var(--line-height);
  }

  :global(.line-numbers .line-numbers-rows) {
    border-right: none;
  }
</style>
