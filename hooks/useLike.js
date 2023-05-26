
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

 

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      signIn()
    }

    try {
      let request;

      if (hasLiked) {
        request = () => fetch('/api/like',{method:"PUT",body:JSON.stringify({postId:postId})});
    } else {
        request = () => fetch('/api/like',{method:"POST",body:JSON.stringify({postId:postId})});
    }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;