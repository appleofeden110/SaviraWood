import { redirect } from '@sveltejs/kit';


export const actions = {
    login: async ({ cookies, request}) => {
            const data = await request.formData();
            const parsed = {
                email: data.get('email'),
                password: data.get('password')
            };
            const responseGET = await fetch('http://127.0.0.1:5050/users');
            const users = await responseGET.json();
            const user = users.find((u)=> u.email === parsed.email);
            if (!user) {
                console.log('No user has been found by your email');
            }
            const responsePOST = await fetch('http://127.0.0.1:5050/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsed)
            });

            if(!responsePOST.ok) {
                console.log('login failed');
                console.log(`HTTP Error: ${responsePOST.status}`)
            }
            if(!cookies.get('sessionId')) {
                cookies.set('sessionId', user.session_id)
            }
            console.log(cookies.get('sessionId'))
            throw redirect(303, `/user/${user.id}`)

    }
}