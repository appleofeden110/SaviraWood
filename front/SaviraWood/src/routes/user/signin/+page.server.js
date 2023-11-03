import { redirect } from "@sveltejs/kit";
export const actions = {
    create: async ({ request }) => {
            const data = await request.formData();
            const parsed = {
                name: data.get('name'),
                surname: data.get('surname'),
                email: data.get('email'),
                password: data.get('password'),
                is_admin: parseInt(data.get('admin')),
                session_id: crypto.randomUUID()
            };
            const response = await fetch('http://127.0.0.1:5050/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsed)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            throw redirect(303, '/login')
    }
};