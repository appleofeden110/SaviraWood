
export async function load({ cookies }) {
    const cookie = cookies.get('sessionId')
    if(!cookie) {
        console.log('Unidentified user (l, home)')
        return {
            message: 'HELL NO'
       }
    }
    console.log(cookie)
    return {
        message: 'HELL YEAH'
    }
}