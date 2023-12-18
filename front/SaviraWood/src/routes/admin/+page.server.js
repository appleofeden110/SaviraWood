export async function load() {
    const response = await fetch('http://127.0.0.1:3333/users/read')
    const users = await response.json()

    const user = users.find((u) => u.is_admin === 1)
    console.log(user)
    if (user) {
        return user
    } else {
        return null
    }
}