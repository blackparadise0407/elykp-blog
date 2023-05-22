<script lang="ts">
  import { browser } from '$app/environment';

  export let html: string | undefined;

  function getHeadings(html: string | undefined) {
    if (browser && html) {
      const content = document.createElement('div');
      content.innerHTML = html;
      return Array.from(content.querySelectorAll('h1'));
    }
  }

  $: headings = getHeadings(html) ?? [];
</script>

{#if headings.length}
  <div>
    <div class="text-2xl font-semibold">Table of Contents</div>
    <ol>
      {#each headings as heading}
        <li>
          <a class="link link-hover" href={`#${heading.id}`}>
            {heading.textContent}
          </a>
        </li>
      {/each}
    </ol>
  </div>
{/if}
