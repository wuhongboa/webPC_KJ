<!--
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-07-01 10:09:53
 * @LastEditors: wuhongbo 1679462735@qq.com
 * @LastEditTime: 2025-07-16 18:05:57
 * @FilePath: \newGit\src\views\system\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapLayout>
    <PropTable
      :loading="loading"
      :columns="tableColumns"
      :table-data="list"
      :total="list.length"
      @selection-change="selectionChange"
      @reset="reset"
      @search="handleSearch"
    >
      <template #btn>
        <div style="display: flex; justify-content: flex-end">
          <el-button type="primary" icon="plus" @click="add">添加</el-button>
          <el-button type="primary" icon="AlarmClock" @click="handleTime"
            >时间</el-button
          >
        </div>
      </template>
    </PropTable>
    <AddOrEdit ref="addOrEditRef" @submit="handleSubmit"></AddOrEdit>
    <Time ref="timeRef"></Time>
  </PageWrapLayout>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import PropTable from '@/components/Table/PropTable/index.vue'
  import Time from './components/time.vue'
  import AddOrEdit from './components/addOrEdit.vue'
  import { getTableColumns } from './indexColumns'
  import { getUserList } from '@/api/user'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  const loading = ref(false)
  // const baseColumns = reactive(columns)
  const list = ref([])
  const title = ref('新增')
  const selectRowData = ref()

  const editFun = (row: any) => {
    title.value = '编辑'
    addOrEditRef.value.show({ title: title.value, row: row })
    // 实际业务逻辑...
  }

  const deleteFun = (row: any) => {
    console.log('删除行', row)
    // 实际业务逻辑...
  }

  // 动态生成 columns（传入父组件方法）
  const tableColumns = getTableColumns({
    editFun,
    deleteFun,
  })

  const selectionChange = (val) => {
    selectRowData.value = val
  }
  const reset = () => {}
  const handleSearch = (val) => {
    console.log(val)
  }

  const getUsers = () => {
    loading.value = true
    getUserList().then((res) => {
      loading.value = false
      list.value = res
    })
  }
  const addOrEditRef = ref()
  const add = () => {
    title.value = '新增'
    addOrEditRef.value.show({ title: title.value })
  }
  const handleSubmit = () => {
    getUsers()
  }
  const timeRef = ref(null)
  const handleTime = () => {
    timeRef.value.show()
  }

  onMounted(() => {
    getUsers()
  })
</script>
<style scoped lang="scss"></style>
