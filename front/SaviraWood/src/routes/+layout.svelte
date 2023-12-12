<script>
  import "../app.postcss";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Alert from "$lib/components/Alert.svelte";
  import Sidebar from "../lib/components/Sidebar.svelte";
  export let data;
  let s = false;
</script>
<div class="grid z-0 relative">
    <header class="shadow-lg bg-slate-200">
      <nav class="container flex justify-evenly p-4 mx-auto">
        <button on:click={() => s = !s}>
            <span class="material-symbols-outlined">menu</span>
        </button>
        <Navbar msg="{data.message}" />
      </nav>
    </header>

  <main class="min-h-[46rem]">
    <Alert />
    <slot />
  </main>

  <aside class="z-10 absolute top-[4.5rem] {s ? 'sidebar' : 'sidebar-hidden'}" >
    <Sidebar />
  </aside>
  <footer>
    <Footer />
  </footer>
</div>

<style>
    .sidebar {
        transform: translateX(0%);
        transition: transform 0.3s ease-in-out;
    }

    .sidebar-hidden {
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }
</style>