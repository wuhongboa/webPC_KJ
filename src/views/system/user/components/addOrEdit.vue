<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      draggable
    >
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
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { UserForm } from './type'
  import { userSave, userUpdate } from '@/api/user'

  const emits = defineEmits(['submit'])
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
  const saveFormRef = ref<FormInstance>()
  let id = null
  const saveLoding = ref(false)
  const dialogVisible = ref<boolean>(false)
  const dialogTitle = ref('新增')
  const show = (val) => {
    dialogVisible.value = true
    const { title, row } = val
    if (row) {
      id = row.id
      userForm.name = row.name
      userForm.age = row.age
      userForm.email = row.email
    } else {
      id = null
    }
    dialogTitle.value = title
  }
  const hide = () => {
    dialogVisible.value = false
    resetFrom(saveFormRef.value)
  }

  const resetFrom = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const handleSave = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await saveFormRef.value.validate((valid, fields) => {
      if (valid) {
        save()
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const save = () => {
    let params = {
      id: id,
      name: userForm.name,
      age: userForm.age,
      email: userForm.email,
    }
    let api = dialogTitle.value == '新增' ? userSave : userUpdate
    let messageText = dialogTitle.value == '新增' ? '新增成功' : '修改成功'
    saveLoding.value = true
    api(params)
      .then((res) => {
        console.log(res)
        resetFrom(saveFormRef.value)
        emits('submit')
        hide()
        saveLoding.value = false
        dialogVisible.value = false
        ElMessage.success(messageText)
      })
      .catch((err) => {
        console.log(err)
        saveLoding.value = false
        dialogVisible.value = false
      })
      .finally(() => {
        saveLoding.value = false
        dialogVisible.value = false
      })
  }

  defineExpose({
    show,
    hide,
  })
</script>

<style scoped lang="scss"></style>
