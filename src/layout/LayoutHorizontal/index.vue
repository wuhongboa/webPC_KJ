<!--
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-06-19 13:59:14
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-06-23 14:06:10
 * @FilePath: \newGit\src\layout\LayoutHorizontal\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main-container">
    <UHeader />
    <Main />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import UHeader from './HeaderHorizontal/index.vue'
  import Main from '../components/Main/index.vue'
  import Footer from '../components/Footer/index.vue'
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    flex-direction: column;
    min-height: 100%;
  }
</style>
