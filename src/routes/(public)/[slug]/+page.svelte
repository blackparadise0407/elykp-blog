<script lang="ts">
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import { getPbFileUrl, pb } from '@/lib/pb';
  import { globalStore } from '@/lib/data-access/global';

  import type { PageData } from './$types';
  import CommentInput from './comment-input.svelte';
  import CommentCard from './comment-card.svelte';

  export let data: PageData;

  let comments: Comment[] = [];

  let hasMoreComments = false;

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
  });
</script>

<svelte:head>
  <title>{post.title}</title>
  <meta name="author" content={post.expand.author?.username} />
  <meta name="description" content={post.description} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
  <meta property="og:url" content={`${$page.url.origin}/${post.slug}`} />
  <meta
    property="og:image"
    content={getPbFileUrl(post, post.banner, {
      thumb: '100x100'
    })}
  />
</svelte:head>

<article class="container py-5">
  <div class="prose max-w-none lg:prose-lg">
    <h1 class="text-4xl mb-0 text-center">{post.title}</h1>
    <p class="text-center">
      Published on
      {dayjs(post.created).format('MMM DD, YYYY')}
    </p>
    <div
      id="content"
      contenteditable="false"
      style={`--font-size: ${$globalStore.fontSize}px; --line-height: ${$globalStore.lineHeight}px`}
    >
      {@html post.content}
    </div>
    <div class="flex flex-wrap gap-3">
      {#each post.expand.tags ?? [] as item (item.id)}
        <a href={`/?tags=${item.id}`}>
          <div class={`badge md:badge-lg ${getBadgeColor(item.name)}`}>
            #{item.name}
          </div>
        </a>
      {/each}
    </div>
  </div>
  <div class="divider" />
  <CommentInput on:submit={(e) => handleComment(e.detail)} />
  <div class="mt-5">
    <p class="font-bold text-lg">Top comments</p>
    <ul class="mt-5 space-y-8">
      {#each comments as item (item.id)}
        <CommentCard data={item} />
      {/each}
    </ul>
    {#if hasMoreComments}
      <!-- content here -->
      <button class="btn btn-secondary">Load more</button>
    {/if}
  </div>
</article>

<style>
  :global(#content p) {
    font-size: var(--font-size);
    line-height: var(--line-height);
  }
</style>
