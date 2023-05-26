import { getServerSession } from "next-auth/next"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function getSession() {
    return await getServerSession(authOptions)
  }
  

export const GET = async()=>{
    try {
        const session = await getSession();
    
        if (!session?.user.email) {
          return null;
        }
    
        const currentUser = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          }
        });
    
        if (!currentUser) {
          return null;
        }
    
        return new Response(JSON.stringify(currentUser),{status:201})
      } catch (error) {
        console.log(error)
        return new Response('Faled to get user',{status:500})
      }
}