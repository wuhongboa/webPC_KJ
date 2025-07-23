<template>
  <div class="header">
    <div class="header_left">数智物流运输管理平台</div>
    <div class="header_center">车辆数据监控中心</div>
    <div class="header_right">
      <div
        class="fullscreen-tag"
        :class="isFullscreen ? 'fullscreen-tag2' : 'fullscreen-tag1'"
        @click="toggleFullscreen"
      >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const isFullscreen = ref(false)

  const emit = defineEmits(['toggleFullscreen'])
  const toggleFullscreen = () => {
    emit('toggleFullscreen')
    isFullscreen.value = !isFullscreen.value
  }
</script>

<style scoped lang="scss">
  .header {
    height: 150px;
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
      width: 300px;
      color: #00c2ff;
      font-weight: 400;
      font-size: 24px;
      letter-spacing: 6px;
      position: relative;
    }
    .header_center {
      color: #fff;
      font-weight: 800;
      font-size: 28px;
      letter-spacing: 6px;
    }

    .fullscreen-tag {
      position: absolute;
      right: 0;
      width: 35px;
      height: 35px;
      cursor: pointer;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .fullscreen-tag1 {
      background-image: url('@/assets/image/screen_scaling-1.png');
    }
    .fullscreen-tag2 {
      background-image: url('@/assets/image/screen_scaling-2.png');
    }
  }
</style>
