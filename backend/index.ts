import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'

import { connectDB } from './config/connection'
import './config/passport'

import authRoutes from './routes/auth/auth'
import passwordRoutes from './routes/auth/password'
import linkRoutes from './routes/main/link'
import qrRoutes from './routes/main/qr'
import redirectRoutes from './routes/main/redirect'
import analyticsRoutes from './routes/main/analytics'

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(express.json())
app.set('trust proxy', true)

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BNCC.in API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.use(authRoutes)
app.use(passwordRoutes)
app.use('/api/links', linkRoutes)
app.use('/api/qrs', qrRoutes)
app.use('/api/redirect', redirectRoutes)
app.use('/api/analytics', analyticsRoutes)

app.listen(PORT, () => console.log(`server dah jalan - http://localhost:${PORT}`))