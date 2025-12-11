<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Select from '$lib/components/ui/select/select.svelte';
	import type { FormField as FormFieldType } from '$lib/types/form.types';
	import type { UseFormReturn } from '$lib/hooks/useForm';
	import type { Snippet } from 'svelte';

	interface FormFieldProps {
		field: FormFieldType;
		form: UseFormReturn;
		options?: Snippet;
	}

	let { field, form, options }: FormFieldProps = $props();

	const value = $derived(form.values[field.name]);
	const error = $derived(form.errors[field.name as string]);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		form.setValue(field.name, target.value);
		if (field.rules) {
			form.validateField(field.name);
		}
	}

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		form.setValue(field.name, target.value);
		if (field.rules) {
			form.validateField(field.name);
		}
	}
</script>

<div class="space-y-2">
	<label for={field.name as string} class="block text-sm font-medium">
		{field.label}
		{#if field.rules}
			<span class="text-destructive">*</span>
		{/if}
	</label>

	{#if field.render}
		{@const rendered = field.render(value, form.values)}
		{rendered}
	{:else if field.component === 'Select' || field.component === 'select'}
		<Select
			id={field.name as string}
			value={value}
			onchange={handleChange}
			disabled={field.disabled}
			{...(field.props || {})}
		>
			{@render options?.()}
		</Select>
	{:else}
		<Input
			id={field.name as string}
			type="text"
			value={value}
			oninput={handleInput}
			placeholder={field.placeholder}
			disabled={field.disabled}
			{...(field.props || {})}
		/>
	{/if}

	{#if error}
		<p class="text-sm text-destructive">{error}</p>
	{/if}
</div>