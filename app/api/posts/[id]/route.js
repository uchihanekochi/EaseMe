import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export const GET = async(req,{params})=>{
    const postId = params.id

    try {
        if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
        },
      });

      return new Response(JSON.stringify(post),{status:201})
    } catch (error) {
        return new Response("Failed to find post",{status:500})
    }
}