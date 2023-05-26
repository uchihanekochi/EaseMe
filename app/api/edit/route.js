import { PrismaClient } from "@prisma/client"
import getCurrentUser from "@/app/action/getCurrentUser"
const prisma = new PrismaClient()
export const PUT = async (req,res)=>{
    try {
        const currentUser = await getCurrentUser()
    
        const { name, username, bio, profileImage, coverImage } = await req.json();  
        console.log(name,username,bio)

    
        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            name,
            username,
            bio,
            profileImage,
            coverImage
          }
        });
    
        return new Response(JSON.stringify(updatedUser),{status:201});
      } catch (error) {
        console.log(error);
        return new Response('Failed to update user',{status:500});
      }
}