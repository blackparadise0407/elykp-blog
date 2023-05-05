<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount, onDestroy, tick } from 'svelte';

  interface Grid {
    _el: Element;
    gap: number;
    items: any[];
    ncol: number;
    mod: number;
  }

  export let items: any[] = [];

  let colWidth = 'minmax(Min(16em, 100%), 1fr)';
  let grids: Grid[] = [];
  let masonryElement: HTMLDivElement;

  const refreshLayout = async () => {
    grids.forEach(async (grid) => {
      let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;

      grid.items.forEach((c) => {
        let new_h = c.getBoundingClientRect().height;

        if (new_h !== +c.dataset.h) {
          c.dataset.h = new_h;
          grid.mod++;
        }
      });

      if (grid.ncol !== ncol || grid.mod) {
        grid.ncol = ncol;
        grid.items.forEach((c) => c.style.removeProperty('margin-top'));
        if (grid.ncol > 1) {
          grid.items.slice(ncol).forEach((c, i) => {
            let prev_fin = grid.items[i].getBoundingClientRect().bottom,
              curr_ini = c.getBoundingClientRect().top;

            c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
          });
        }

        grid.mod = 0;
      }
    });
  };

  const calcGrid = async <T extends Element>(_masonryArr: T[]) => {
    await tick();
    if (_masonryArr.length && getComputedStyle(_masonryArr[0]).gridTemplateRows !== 'masonry') {
      grids = _masonryArr.map((grid) => {
        return {
          _el: grid,
          gap: parseFloat(getComputedStyle(grid).gridRowGap),
          items: [...grid.childNodes].filter(
            (c: any) => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1
          ),
          ncol: 0,
          mod: 0
        };
      });
      refreshLayout();
    }
  };

  onMount(() => {
    browser && window.addEventListener('resize', refreshLayout, false);
  });
  onDestroy(() => {
    browser && window.removeEventListener('resize', refreshLayout, false);
  });

  $: if (masonryElement) {
    calcGrid([masonryElement]);
  }

  $: if (items) {
    // eslint-disable-next-line no-self-assign
    masonryElement = masonryElement;
  }
</script>

<div bind:this={masonryElement} class="grid--masonry gap-5" style={` --col-width: ${colWidth};`}>
  <slot />
</div>

<style>
  :global(.grid--masonry) {
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--col-width));
    grid-template-rows: masonry;
    justify-content: center;
  }
  :global(.grid--masonry > *) {
    align-self: start;
  }
</style>
