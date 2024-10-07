import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, sign } from "hono/jwt";
import { signinInput } from "@goviop/mediumcommon"
import { signupInput } from "@goviop/mediumcommon"
// import bcrypt from 'bcrypt'

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success , error } = signupInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "Invalid userInput",
      error:error?.issues,
    }, 400);  // You could also set the status here
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });

    
  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      return c.json({
        message: "Error in the catch block of signup page",
        error: error.message,  // Safe access to the message property
      }, 403);  // Forbidden
    } else {
      return c.json({
        message: "Unknown error occurred",
      }, 403);  // Handle unknown errors
    }
  }
});

userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const {success } = signinInput.safeParse(body);

  if(!success){
    return c.json({
        message:"Invalid userInput"
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return c.json({
      message: "no user Exists",
    },401);
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
