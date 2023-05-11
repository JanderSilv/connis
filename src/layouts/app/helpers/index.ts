import { pages } from 'src/constants'
import { checkUserIsCompany, checkUserIsICT } from 'src/helpers/users'
import { OldUser } from 'src/models/types'

export const getProfileURL = (user?: OldUser) => {
  if (!user) return ''
  if (checkUserIsCompany(user)) return `${pages.companyProfile}/${user.slug}`
  if (checkUserIsICT(user)) return `${pages.ictProfile}/${user.slug}`
  else return `${pages.analystProfile}/${user.username}`
}
