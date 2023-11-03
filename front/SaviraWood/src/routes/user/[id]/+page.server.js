import {redirect} from "@sveltejs/kit";

export async function load({cookies, params}) {
    const cookie = cookies.get('sessionId');
    if (!cookie) {
        return {
            message: 'nope'
        }
    }
    const response = await fetch('http://127.0.0.1:5050/users');
    const users = await response.json();

    const user = users.find((u) => u.id === parseInt(params.id));
    if (user.id!==parseInt(params.id)) {
        return {
            message: 'nope'
        }
    }

    return{
        user
    };
}

export const actions = {
    signOut: async ({request, cookies}) => {
        if (cookies.get("sessionId")) {
            const cookieDelete = cookies.set('sessionId', '', {
                expires: new Date(5.34e10)
            });
            throw redirect(303, '/user/login')
        }
    }
}