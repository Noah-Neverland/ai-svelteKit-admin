<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';

	const badgeVariants = cva(
		'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
		{
			variants: {
				variant: {
					default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
					secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
					destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
					outline: 'text-foreground'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

	interface BadgeProps {
		variant?: BadgeVariant;
		class?: string;
		children?: Snippet;
	}

	let { variant, class: className = '', children }: BadgeProps = $props();
</script>

<div class={cn(badgeVariants({ variant }), className)}>
	{@render children?.()}
</div>
