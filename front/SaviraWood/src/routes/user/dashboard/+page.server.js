import {redirect} from "@sveltejs/kit";

export async function load({cookies}) {
    const cookie = cookies.get('sessionId');
    if (!cookie) {
        return {
            message: 'nope'
        }
    }
    const response = await fetch('http://127.0.0.1:5050/users');
    const users = await response.json();
    const user = users.find((u) => u.session_id === cookie);
    return{
        user
    };
}

export const actions = {
    signOut: async ({cookies}) => {
         cookies.set('sessionId', '', {
             expires: new Date('10/10/1970'),
             path: '/'
         });
        throw redirect(303, '/user/login')
    }
}