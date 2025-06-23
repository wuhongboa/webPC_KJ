<!--
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-06-20 09:08:51
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-06-23 08:58:40
 * @FilePath: \newGit\src\views\functionPage\fullscreen\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <div class="app-container-inner">
      <div class="header">
        <div class="title">window切换全屏</div>
        <el-button type="primary" @click="fullWindowScreenAction">{{
          isFullscreen ? '退出全屏' : '点击全屏'
        }}</el-button>
      </div>
      <div ref="domRef" class="fullscreen" @click="fullscreenAction">
        <div class="title">DOM元素切换全屏</div>
        <div class="inner">
          <el-button type="primary">{{
            isFullscreen ? '退出全屏' : '点击全屏'
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useFullscreen } from '@vueuse/core'

  const domRef = ref<HTMLElement>(null)
  const {
    enter,
    toggle: fullWindowScreenAction,
    exit,
    isFullscreen,
  } = useFullscreen()

  const { toggle: fullscreenAction } = useFullscreen(domRef)
</script>

<style lang="scss" scoped>
  @use './index.scss';
</style>
