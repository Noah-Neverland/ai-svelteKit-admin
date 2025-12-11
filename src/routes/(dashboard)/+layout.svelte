<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import type {Snippet} from 'svelte';

  interface LayoutProps {
    children?: Snippet;
  }

  let {children}: LayoutProps = $props();
</script>

<MainLayout>
  {#if children}
    {@render children()}
  {/if}
</MainLayout>
