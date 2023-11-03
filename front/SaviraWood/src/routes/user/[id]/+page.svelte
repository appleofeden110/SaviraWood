<script>
    export let data;
</script>

{#if data.message === 'nope'}
    <h1>{data.message}</h1>
{:else}
    <h1>Welcome to your dashboard, {data.user.name}</h1>
    <h1>{data.user.id}</h1>
    <form action="?/signOut" method="POST">
        <button type="submit" class="px-4 py-2 mr-5 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent ">Sign out</button>
    </form>
{/if}