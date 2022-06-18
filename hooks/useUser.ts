import { useEffect, useMemo } from "react";
import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";


export default function useUser() {
  const arg = useSWR('/api/user')
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (arg.data) {
      if (arg.data.status !== 'success'
        && pathname !== '/login') {
        push('/login')
      }
    }
  }, [arg, pathname, push])

  return {
    ...arg
  }
}
