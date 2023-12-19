import chalk from 'chalk'
import express from 'express'
import { z } from 'zod'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const schema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
})

app.post('/signup', async (req, res) => {
  try {
    const body: z.infer<typeof schema> = schema.parse(req.body)
    const { username, password } = body

    //* Logik zum erstellen eines Users

    Logger.info('user created')
    res.json({ message: 'user created' })
  } catch (err) {
    Logger.error(err)
    res.status(400).json({ error: err })
  }
})

app.listen(3000)

const info = chalk.green
const error = chalk.red

const Logger = {
  info: (message: string) => console.log(info('info: '), message),
  error: (message: string) => console.log(error('error: '), message),
} as const
