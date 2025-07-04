/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-16 14:38:15
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-02 11:52:24
 * @FilePath: \zb-admin\src\api\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { get, post } from '@/utils/https'
import { LoginRes, LoginData, UserSaveInster, UserListInster } from './userType'

enum URL {
  LOGIN = '/vue-element-perfect/user/login',
  LOGOUT = '/user/logout',
  USER_SAVE = '/user/save',
  GET_USER_List = '/user',
}
export const login = async (data: LoginData) =>
  post<any>({ url: URL.LOGIN, data })
export const logout = async () => post<LoginRes>({ url: URL.LOGOUT })
export const userSave = async (data: UserSaveInster) =>
  post<any>({ url: URL.USER_SAVE, data })
export const getUserList = async (data?: UserListInster) =>
  get<any>({ url: URL.GET_USER_List, data })
