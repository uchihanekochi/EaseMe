
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/action/getCurrentUser";
const prisma = new PrismaClient()

export const POST = async (request) => {
    try {
        const {postId} = await request.json();
        const currentUser = await getCurrentUser()
        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
          }
       
          const post = await prisma.post.findUnique({
            where: {
              id: postId
            }
          });

          if (!post) {
            throw new Error('Invalid ID');
          }
      
          let updatedLikedIds = [...(post.likedIds || [])];
          updatedLikedIds.push(currentUser.id);

          const updatedPost = await prisma.post.update({
            where: {
              id: postId
            },
            data: {
              likedIds: updatedLikedIds
            }
          });
        return new Response(JSON.stringify(updatedPost), { status: 201 })
    } catch (error) {
        console.log(error)

        return new Response("Failed to updated", { status: 500 });
    }
}

export const PUT = async (request) => {
    try {
        const {postId} = await request.json();
        const currentUser = await getCurrentUser()
        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
          }
       
          const post = await prisma.post.findUnique({
            where: {
              id: postId
            }
          });

          if (!post) {
            throw new Error('Invalid ID');
          }
      
          let updatedLikedIds = [...(post.likedIds || [])];
          updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);

          const updatedPost = await prisma.post.update({
            where: {
              id: postId
            },
            data: {
              likedIds: updatedLikedIds
            }
          });
        return new Response(JSON.stringify(updatedPost), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to updated", { status: 500 });
    }
}