import getCurrentUser from "@/app/action/getCurrentUser"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const POST = async (req,res)=>{
    const currentUser = await getCurrentUser()
    const {content} = await req.json()
    const postId =  await req.nextUrl.searchParams.get(`postId`)
    

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID');
      }

      try {
        const comment = await prisma.comment.create({
            data: {
              content:content,
              userId: currentUser.id,
              postId:postId
            }
          });

        return new Response(JSON.stringify(comment),{status:201})
      } catch (error) {
        console.log(error)
        return new Response("Failed to post commemt",{status:500})
      }

      
}