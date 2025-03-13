import { trpc } from "@/trpc/client"

export const useUser = () => {
    const { data } = trpc.auth.getUser.useQuery('hello')

    if (!data) {
        return null
    }


    return data.user;
}