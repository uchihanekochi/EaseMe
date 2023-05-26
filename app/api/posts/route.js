

import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/action/getCurrentUser";
const prisma = new PrismaClient


export const GET = async (req) => {
  const userId = await req.nextUrl.searchParams.get(`userId`)
  const session = await getCurrentUser();

  if (userId && typeof userId === 'string') {
    try {
      const posts = await prisma.post.findMany({
        where: {
          userId:userId
        },
        include: { user: true, comments: true },
        orderBy: [
          {
            createdAt: 'desc'
          }
        ]
      });
      return new Response(JSON.stringify(posts), { status: 201 })
    } catch (error) {
      return new Response("Failed to get posts", { status: 500 });
    }
  } else {
    try {
      if (!session) {
        const posts = await prisma.post.findMany({
          where: {
            privacyOption: "public"
          },
          include: { user: true, comments: true },
          orderBy: [
            {
              createdAt: 'desc'
            }
          ]
        });
        if (!posts) return null
        return new Response(JSON.stringify(posts), { status: 201 })
      } else if (session.email) {
        const posts = await prisma.post.findMany({
          where: {
            OR: [
              {
                privacyOption: "public"
              },
              {
                privacyOption: { in: ['private', 'specialist'] },
                userId: session?.id

              }
            ]
          },
          include: { user: true, comments: true },
          orderBy: [
            {
              createdAt: 'desc'
            }
          ]
        });
        if (!posts) return null
        return new Response(JSON.stringify(posts), { status: 201 })

      }

    } catch (error) {
      console.log(error)
      return new Response("Failed to get posts", { status: 500 });
    }
  }

}


export const POST = async (request) => {
  const { content, tag, privacyOption } = await request.json();
  const session = await getCurrentUser();
  try {


    const newPost = await prisma.post.create({
      data: {
        content: content,
        tag: tag,
        privacyOption: privacyOption,
        userId: session?.id

      }
    })

    return new Response(JSON.stringify(newPost), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to create a new post", { status: 500 });
  }
}

