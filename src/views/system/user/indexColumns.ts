/*
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-07-02 11:10:44
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-02 11:24:34
 * @FilePath: \newGit\src\views\system\user\indexColumns.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const columns = [
  {
    name: 'id',
    label: 'id',
    span: 4,
  },
  {
    name: 'name',
    label: '姓名',
    search: true,
    inSearch: true,
    valueType: 'input',
    span: 8,
    attrs: {
      placeholder: '请输入',
    },
  },
  {
    name: 'age',
    label: '年龄',
    span: 4,
  },
  {
    name: 'email',
    label: '邮箱',
    span: 12,
  },
  {
    name: 'create_date',
    label: '创建时间',
    span: 12,
  },
]
