<!--
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-07-04 11:06:07
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-04 15:36:28
 * @FilePath: \newGit\src\views\system\user\components\time.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-dialog v-model="timeVisible" title="下班时间" width="30%" draggable>
      <div>
        <p class="flex-align-center">
          距离下班还有
          <span class="off-duty-time">{{ offDutyTime }}</span>
        </p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="timeVisible = false">了解</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { onMounted, ref, onBeforeUnmount } from 'vue'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  dayjs.extend(duration)
  const timeVisible = ref(false)
  const offDutyTime = ref('')
  let timer = null

  const getTime = () => {
    const targetTime = dayjs().format('YYYY-MM-DD') + ' 18:00:00'
    const now = dayjs()
    const diff = dayjs.duration(dayjs(targetTime).diff(now))
    offDutyTime.value = [
      String(diff.hours()).padStart(2, '0'),
      String(diff.minutes()).padStart(2, '0'),
      String(diff.seconds()).padStart(2, '0'),
    ].join(':')
  }
  const show = () => {
    timeVisible.value = true
  }
  const hide = () => {
    timeVisible.value = false
  }
  onMounted(() => {
    getTime()
    timer = setInterval(getTime, 1000)
  })
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
  defineExpose({
    show,
    hide,
  })
  onMounted(() => {})
</script>
<style scoped lang="scss">
  .off-duty-time {
    color: red;
    font-size: 24px;
    margin-left: 8px;
  }
</style>
