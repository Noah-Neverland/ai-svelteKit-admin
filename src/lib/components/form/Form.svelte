<script lang="ts">
	import { useForm } from '$lib/hooks/useForm';
	import type { FormConfig } from '$lib/types/form.types';
	import FormField from './FormField.svelte';
	import type { Snippet } from 'svelte';

	interface FormProps<T = any> {
		config: FormConfig<T>;
		class?: string;
		children?: Snippet;
	}

	let { config, class: className = '', children }: FormProps = $props();

	const form = useForm(config);

	const handleSubmit = form.handleSubmit(async (values) => {
		// 直接使用 config，因为它在组件生命周期中通常不会改变
		if (config.onSubmit) {
			await config.onSubmit(values);
		}
	});
</script>

<form onsubmit={(e) => { e.preventDefault(); handleSubmit(e); }} class={className}>
	<div class="space-y-4">
		{#each config.fields as field (field.name)}
			{#if !field.hidden}
				<FormField {field} form={form} />
			{/if}
		{/each}
	</div>
	{@render children?.()}
</form>
