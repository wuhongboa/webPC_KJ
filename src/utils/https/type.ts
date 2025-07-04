/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-16 16:50:48
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-02 14:24:32
 * @FilePath: \zb-admin\src\utils\https\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface IResponse<T = any> {
  code: number | string
  result: T
  data: T
  message: string
  status: string | number
}
