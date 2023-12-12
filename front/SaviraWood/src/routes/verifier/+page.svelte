<script>
    export let data;
</script>

{#await data.message}
    <h1>...loading</h1>
{:then msg}
    <p>{msg}</p>
{:catch e}
    <p>{e.message}</p>
{/await}