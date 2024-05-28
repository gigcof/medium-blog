import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// app.use('/api/v1/blog/*', async (c, next) => {
//   // get the header
//   // verify the header
//   const header = c.req.header("authorization") || ""
//   const token = header?.split(' ')[1]
//   const response = await verify(token, c.env.JWT_SECRET);
//   if (!response) {
//     c.status(403)
//     return c.json({ error: 'Unauthorized' })
//   }
//   // c.set('userId', response.id)
//   await next()
// })

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
