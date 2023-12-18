<div>
    <div class="container mx-auto overflow-hidden border rounded-md shadow-lg h-[32rem] w-96 my-10 px-5">
        <h1 class="text-[2rem] font-bold text-center">Sign In</h1>
        <form class="flex flex-col" method="POST" action="?/create">
            <label for="nameInput">Name</label>
            <input type="text" name="name" id="nameInput" class="border border-black" required>
            <label for="surnameInput">Surname</label>
            <input type="text" name="surname" id="surnameInput" class="border border-black" required>
            <label for="emailInput">Email</label>
            <input type="text" name="email" id="emailInput" class="border border-black" required>
            <label for="passInput">Password</label>
            <input type="password" id="passInput" name="password" class="border border-black" required>
            <input type="checkbox" name="admin" value=false hidden>
            <button type="submit" class="w-16 py-1 my-2 text-green-500 border border-green-500">Submit</button>
        </form>
    </div>
</div>