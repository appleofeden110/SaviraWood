<script>
  import "../app.postcss";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>
<nav>
<Navbar />
</nav>

<main>
<slot />
</main>

<aside>

</aside>

<footer>
  <Footer />
</footer>

<style>
</style>
