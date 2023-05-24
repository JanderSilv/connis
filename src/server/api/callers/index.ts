import { Session } from 'next-auth'
import { userRouter } from '../routers'
import { prisma } from '../../db'

export const userCaller = (session: Session) => userRouter.createCaller({ session, prisma })
