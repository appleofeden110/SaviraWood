import {redirect} from "@sveltejs/kit";

export async function load({cookies}) {
    if(cookies.get('tempSesh')){
        console.log(`the guys with ${cookies.get('tempSesh')} got lucky!`)
        throw redirect(303, '/')
        return {
            message: 'Success!'
        }
    } else {
        throw new Error('FUCK YOU ERRORED ME, DADDY!')
    }
}