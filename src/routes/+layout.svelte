<script lang="ts">
	import '../app.css';
	
	// 使用 Svelte 5 snippets 语法
	let { children } = $props();
</script>

{@render children?.()}
