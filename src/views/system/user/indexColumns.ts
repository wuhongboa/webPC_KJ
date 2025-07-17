/*
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-07-02 11:10:44
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-02 11:24:34
 * @FilePath: \newGit\src\views\system\user\indexColumns.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export const getTableColumns = (methods: {
  editFun: (row: any) => void
  deleteFun: (row: any) => void
  // 其他方法...
}) => {
  return [
    {
      prop: 'id',
      label: 'id',
      span: 4,
    },
    {
      prop: 'name',
      label: '姓名',
      span: 8,
    },
    {
      prop: 'age',
      label: '年龄',
      span: 4,
    },
    {
      prop: 'email',
      label: '邮箱',
      span: 12,
    },
    {
      prop: 'create_date',
      label: '创建时间',
      span: 12,
    },
    {
      label: '操作',
      type: 'slot', // 插槽
      slotType: 'options', // 自定义内容
      width: 160,
      buttons: [
        {
          text: '编辑',
          fn: methods.editFun,
        },
        {
          text: '删除',
          type: 'danger',
          fn: methods.deleteFun,
        },
      ],
    },
  ]
}
