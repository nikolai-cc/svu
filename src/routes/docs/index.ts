import type { RequestEvent } from "@sveltejs/kit"

export const get = async () => {
    return {
        status: 303,
        headers: {
            Location: '/'
        }
    }
}