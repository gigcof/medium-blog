import z from 'zod'

export const signUpObject = z.object({
    name: z.string().max(10),
    password: z.string().min(6),
    email: z.string().email(),
})

// type inference in zod
export type SignUpObject = z.infer<typeof signUpObject>

export const signInObject = z.object({
    password: z.string().min(6),
    email: z.string().email(),
})

// type inference in zod
export type SignInObject = z.infer<typeof signInObject>

export const createBlogInput = z.object({
    title: z.string().max(100),
    content: z.string().max(1000),
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title: z.string().max(100),
    content: z.string().max(1000),
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>