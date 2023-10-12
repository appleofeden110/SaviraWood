export function load({cookies}) {
    const id = cookies.get('sessionId');

    if(!id) {
        cookies.set('sessionId', crypto.randomUUID(), {path: '/'});
    }


}
export const actions = {
    create: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const parsed = {
                name: data.get('name'),
                surname: data.get('surname'),
                email: data.get('email'),
                password: data.get('password'),
                is_admin: parseInt(data.get('admin')),
                session_id: cookies.get('sessionId')
            };
            const response = await fetch('http://localhost:5050/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsed)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // Handle the response here if needed
        } catch (error) {
            console.error('Error:', error);
        }
    }
};