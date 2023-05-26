import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const GET = async (req,{params})=>{
    try {

        const userId = params.id
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
          }
      
          const existingUser = await prisma.user.findUnique({
            where: {
              id:  userId
            }
          });
      
          return new Response(JSON.stringify(existingUser), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response('Failed to find user', { status: 500 })
    }
}