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

  const screenWrapper = ref<HTMLElement | null>(null)
  const resize = () => {
    if (!screenWrapper.value) return

    const designWidth = 1920
    const designHeight = 1080
    const clientWidth = screenWrapper.value.clientWidth
    const clientHeight = screenWrapper.value.clientHeight

    const scaleX = clientWidth / designWidth
    const scaleY = clientHeight / designHeight
    container.value.style.transform = `scale(${scaleX}, ${scaleY})`
  }
  // 全屏切换
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen.value) {
        await requestFullscreen(screenWrapper.value)
      } else {
        await exitFullscreen()
      }
    } catch (err) {
      console.error('全屏错误:', err)
    }
  }
  const requestFullscreen = async (element: HTMLElement | null) => {
    const methods = [
      'requestFullscreen',
      'webkitRequestFullscreen',
      'msRequestFullscreen',
    ]

    for (const method of methods) {
      if (element[method]) {
        await element[method]()
        break
      }
    }
  }

  const exitFullscreen = async () => {
    const methods = [
      'exitFullscreen',
      'webkitExitFullscreen',
      'msExitFullscreen',
    ]

    for (const method of methods) {
      if (document[method]) {
        await document[method]()
        break
      }
    }
  }
  const setupFullscreenListeners = () => {
    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'MSFullscreenChange',
    ]
    events.forEach((event) => {
      document.addEventListener(event, handleFullscreenChange)
    })
  }
  const handleFullscreenChange = () => {
    isFullscreen.value = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    )
    debouncedUpdate()
  }
  const debounce = (func: Function, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }
  }
  // 防抖优化
  const debouncedUpdate = debounce(resize, 200)

  onBeforeUnmount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', () => {})
    }
  })

  onMounted(() => {
    resize()
    setupFullscreenListeners()
    window.addEventListener('resize', debouncedUpdate)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedUpdate)
    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'MSFullscreenChange',
    ]
    events.forEach((event) => {
      document.removeEventListener(event, handleFullscreenChange)
    })
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
      padding: 0 24px 24px 24px; /* 上下内边距 */
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
