import type { RequestEvent } from "@sveltejs/kit"

export const GET = async () => {
    return {
        status: 303,
        headers: {
            Location: '/'
        }
    }
}