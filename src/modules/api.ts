import api from '~/plugins/api'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(api)
}
