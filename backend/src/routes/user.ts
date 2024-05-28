import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { signUpObject, signInObject } from '@arnavjain/common-resources';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const { success } = signUpObject.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({ message: 'Inputs not correct' })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: body.password,
            },
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ jwt: token })
    } catch (err) {
        c.status(411);
        console.error(err);
        return c.json({ error: 'User already exists' })
    }

})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signInObject.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({ message: 'Inputs not correct' })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        },
    })

    if (!user) {
        c.status(403)
        return c.json({ error: 'Invalid credentials' })
    }

    const jwt = sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
})

