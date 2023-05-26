
import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
const useUser =(userId)=> {
  console.log(userId)
  const { data, error, mutate,isLoading} = useSWR(userId ? `/api/users/${userId}`:null, fetcher)
 
  return {
    data,error,mutate,isLoading
  }
}

export default useUser;