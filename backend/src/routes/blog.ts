import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createBlogInput } from "@goviop/mediumcommon";
import { updateBlogInput } from "@goviop/mediumcommon";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";

  const user = await verify(header, c.env.JWT_SECRET);

  if (user) {
    //@ts-ignore
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "Verification Failed",
    });
  }
});

blogRoute.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(403);
    return c.json({
        message:"Passed data is incorrect"
    })
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId:userId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      message: "Error while creating post/blogs",
    });
  }
});

blogRoute.post("/update", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(403);
    return c.json({
        message:"Error while updating blog data"
    })
}

  prisma.post.update({
    where: {
      id: body.userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.text("updated post");
});

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true,
        }
      }
    }


  });

  return c.json({ posts });
});

blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true,
        }
      }
    }
  });
  return c.json({ post });
});
