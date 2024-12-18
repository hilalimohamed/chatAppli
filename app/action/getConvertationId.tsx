import getUser from './getUser'
import prisma from '../../lib/prisma'

export const getConvertationId = async (convId: string) => {
  try {
    const user = await getUser()
    if (!user?.email) {
      return null
    }
    const convertationId = await prisma.conversation.findMany({
      where: {
        id: convId,
      },
      include: {
        users: true,
      },
    })
    // return convertationId
     return convertationId.length > 0 ? convertationId : null
  } catch (error) {
    return null
  }
}
