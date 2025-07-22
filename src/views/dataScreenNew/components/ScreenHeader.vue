<template>
  <div class="header">
    <div class="header_left">数智物流运输管理平台</div>
    <div class="header_center">车辆数据监控中心</div>
    <div class="header_right">主动安防预警系统</div>
  </div>
</template>

<script lang="ts" setup>
  import { h, ref } from 'vue'

  const data = ref()
</script>

<style scoped lang="scss">
  .header {
    height: 15rem;
    width: 100%;
    background-image: url('@/assets/image/screen_header.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: space-between;
    padding: 32px 60px 0;
    box-sizing: border-box;

    .header_left,
    .header_right {
      color: #00c2ff;
      font-weight: 400;
      font-size: 24px;
      letter-spacing: 6px;
    }
    .header_center {
      color: #fff;
      font-weight: 800;
      font-size: 28px;
      letter-spacing: 6px;
    }
  }
</style>
