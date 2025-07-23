<template>
  <div ref="screenWrapper" class="screen-wrapper">
    <div ref="container" class="screen">
      <ScreenHeader @toggle-fullscreen="toggleFullscreen"></ScreenHeader>
      <div class="screen-content">
        <!-- 车辆概括 -->
        <VehicleOverview />
        <!-- 成本与利益分析 -->
        <CostBenefitAnalysis />
        <!-- 数字底座 -->
        <DigitalBase />
        <!-- 维修保养 -->
        <Maintenance />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import screenfull from 'screenfull'
  import ScreenHeader from './components/ScreenHeader.vue'
  import VehicleOverview from './components/VehicleOverview.vue'
  import CostBenefitAnalysis from './components/CostBenefitAnalysis.vue'
  import DigitalBase from './components/DigitalBase.vue'
  import Maintenance from './components/Maintenance.vue'

  const container = ref<HTMLElement | null>(null)
  const isFullscreen = ref(false)
  // 全屏切换
  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(container.value)
      isFullscreen.value = !screenfull.isFullscreen
    }
  }

  // 监听全屏变化
  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      isFullscreen.value = screenfull.isFullscreen
    })
  }
  onBeforeUnmount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', () => {})
    }
  })

  const screenWrapper = ref<HTMLElement | null>(null)
  function resize() {
    if (!screenWrapper.value) return

    const designWidth = 1920
    const designHeight = 1080
    const clientWidth = screenWrapper.value.clientWidth
    const clientHeight = screenWrapper.value.clientHeight

    const scaleX = clientWidth / designWidth
    const scaleY = clientHeight / designHeight
    container.value.style.transform = `scale(${scaleX}, ${scaleY})`
  }

  onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })
</script>

<style scoped lang="scss">
  .screen-wrapper {
    background-color: #000318;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/image/screen_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .screen {
    // background-color: #000318;
    // width: 100%;
    // height: 100vh;
    // background-image: url('@/assets/image/screen_bg.png');
    // background-size: cover;
    // background-repeat: no-repeat;
    // overflow: hidden;
    display: flex;
    flex-direction: column;

    width: 1920px;
    height: 1080px;
    transform-origin: 0 0;
    position: relative;

    .screen-content {
      flex: 1;
      display: grid;
      grid-template-rows: 1fr 1fr; /* 上下两行，各占1份 */
      grid-template-columns: 1fr 1fr; /* 左右两列，各占1份 */
      gap: 24px; /* 可选：设置间距 */
      // height: calc(100vh - 18rem); /* 确保容器占满整个视口高度 */
      padding: 0 24px 24px 24px; /* 上下内边距 */
      // margin-top: -24px;
      min-height: 0; // 关键：允许内容收缩
      box-sizing: border-box;

      > div {
        min-height: 0; // 关键：允许网格项收缩
        overflow: hidden;
        border: 2px solid rgb(35, 77, 151);
        background-image: url('@/assets/image/charts/1-1-bg.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
</style>
