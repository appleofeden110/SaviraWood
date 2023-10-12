<div>
    <div class="container mx-auto overflow-hidden border rounded-md shadow-lg h-[32rem] w-96 my-10 px-5">
        <h1 class="text-[2rem] font-bold text-center">Log in</h1>
        <form class="flex flex-col">
            <label for="emailInput">Email</label>
            <input type="text" bind:value={email} id="emailInput" class="border border-black" required>
            <label for="passInput">Password</label>
            <input type="password" bind:value={password} id="passInput" class="border border-black" required>
            <button type="submit" on:click={handleSubmit()} class="w-16 py-1 my-2 text-green-500 border border-green-500">Submit</button>
        </form>
    </div>
</div>

<script>
    let email = '';
    let password = '';
    function handleSubmit() {

    }
</script>