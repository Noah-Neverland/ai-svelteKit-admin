<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface AvatarImageProps {
		src?: string;
		alt?: string;
		class?: string;
	}

	let { src, alt, class: className = '' }: AvatarImageProps = $props();
</script>

<img src={src} alt={alt} class={cn('aspect-square h-full w-full', className)} />
