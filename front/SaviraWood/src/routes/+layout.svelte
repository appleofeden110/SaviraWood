<script>
  import "../app.postcss";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import Sidebar from "../lib/components/Sidebar.svelte";
  let s = "sidenav-1";


  export let data;
</script>
<div class="grid">
  <nav>
  <Navbar msg="{data.message}" Id="{data.id}" sidebar="{s}" />
  </nav>

  <main>
    <Alert />
    <slot />
  </main>

  <aside class="">
    <Sidebar />
  </aside>

  <footer>
    <Footer />
  </footer>
</div>

<style>

</style>