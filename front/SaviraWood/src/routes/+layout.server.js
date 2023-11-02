import {deleteAlert} from "$lib/stores";
import {navigating} from "$app/stores";
export async function load({ cookies }) {
    const cookie = cookies.get('sessionId')
    if(!cookie) {
        console.log('Unidentified user (l, home)')
        return {
            message: 'HELL NO'
       }
    }
    console.log(cookie)
    const response = await fetch('http://127.0.0.1:5050/users')
    const users = await response.json();
    const user = users.find((u) => u.session_id === cookie)
    return {
        id: user.id,
        message: 'HELL YEAH'
    }
}