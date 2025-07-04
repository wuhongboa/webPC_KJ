<!--
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-07-01 10:09:53
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-04 15:44:33
 * @FilePath: \newGit\src\views\system\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapLayout>
    <PropTable
      :loading="loading"
      :columns="baseColumns"
      :data="list"
      @selection-change="selectionChange"
      @reset="reset"
      @on-submit="onSubmit"
    >
      <template #btn>
        <div style="display: flex; justify-content: flex-end">
          <el-button type="primary" icon="plus" @click="add">添加</el-button>
          <el-button type="primary" icon="Edit" @click="edit">修改</el-button>
          <el-button type="danger" icon="delete" @click="batchDelete"
            >删除</el-button
          >
          <el-button type="primary" icon="AlarmClock" @click="handleTime"
            >时间</el-button
          >
        </div>
      </template>
      <!-- <template #sex="scope">{{ scope.row.sex ? '男' : '女' }}</template> -->
      <template #operation="scope">
        <el-button
          type="primary"
          size="small"
          icon="Edit"
          @click="edit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          size="small"
          icon="Delete"
          @click="del(scope.row)"
        >
          删除
        </el-button>
      </template>
    </PropTable>
    <el-dialog v-model="dialogVisible" title="新增" width="30%" draggable>
      <el-form
        ref="saveFormRef"
        :model="userForm"
        :rules="rules"
        label-width="80px"
        class="user-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userForm.age" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="saveLoding" @click="handleSave">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
    <Time ref="timeRef"></Time>
  </PageWrapLayout>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import PropTable from '@/components/Table/PropTable/index.vue'
  import Time from './components/time.vue'
  import { columns } from './indexColumns'
  import { UserForm } from './type'
  import { userSave, getUserList } from '@/api/user'
  import type { FormInstance, FormRules } from 'element-plus'
  const loading = ref(false)
  const saveLoding = ref(false)
  const baseColumns = reactive(columns)
  const list = ref()
  const selectionChange = () => {}
  const reset = () => {}
  const onSubmit = (val) => {
    console.log(val)
  }

  const batchDelete = () => {}
  const del = (row) => {}
  const getUsers = () => {
    getUserList().then((res) => {
      list.value = res
    })
  }

  const dialogVisible = ref<boolean>(false)
  const userForm = reactive<UserForm>({
    name: '',
    age: '',
    email: '',
  })
  const rules = reactive<FormRules<UserForm>>({
    name: [
      {
        required: true,
        message: '请输入姓名',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: '', trigger: 'blur' },
    ],
    age: [
      {
        required: true,
        message: '请输入年龄',
        trigger: 'blur',
      },
    ],
    email: {},
  })
  const add = () => {
    dialogVisible.value = true
  }
  const handleSave = () => {
    console.log(userForm)
    let params = {
      name: userForm.name,
      age: userForm.age,
      email: userForm.email,
    }
    saveLoding.value = true
    userSave(params)
      .then((res) => {
        list.value = res
        dialogVisible.value = false
      })
      .finally(() => {
        saveLoding.value = false
      })
  }
  const edit = (row) => {}

  const timeRef = ref(null)
  const handleTime = () => {
    timeRef.value.show()
  }

  onMounted(() => {
    getUsers()
  })
</script>
<style scoped lang="scss"></style>
