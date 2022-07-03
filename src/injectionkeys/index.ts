import type { InjectionKey } from 'vue'
import type { IApi } from '~/models/api.model'

export const ApiInjectionKey: InjectionKey<IApi> = Symbol('ApiInjectionKey')
