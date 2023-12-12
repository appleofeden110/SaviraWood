<script>
export let data;
</script>
{#if data !== null}
<nav>
    <p>welcome to the admin page, Hannah</p>
</nav>

<main>
<slot />
</main>

<aside>

</aside>

<footer>

</footer>
{:else}
    <p>401, Unauthorized</p>
{/if}