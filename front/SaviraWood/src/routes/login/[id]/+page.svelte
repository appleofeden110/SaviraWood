<script>
    export let data;
</script>

{#if data.message === 'nope'}
    <h1>{data.message}</h1>
{:else}
    <h1>Welcome to your dashboard, {data.user.name}</h1>
    <h1>{data.user.id}</h1>
{/if}