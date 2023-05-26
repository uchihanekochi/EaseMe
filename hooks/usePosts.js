
import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
const usePosts =(userId)=> {
  const url = userId ? `/api/posts?userId=${userId}` :`/api/posts`
  const { data, error, mutate,isLoading} = useSWR(url, fetcher)
 
  return {
    data,error,mutate,isLoading
  }
}

export default usePosts;