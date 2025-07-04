<template>
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
    <slot v-if="!fullscreen" name="header"></slot>
    <div class="player-wrapper">
      <!-- 播放器容器 -->
      <div ref="playerContainer" class="player-box" @contextmenu="contextmenu">
        <div v-if="noData" class="no-data">{{ attrs.alt }}</div>
        <slot v-if="fullscreen" name="header"></slot>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    ref,
    reactive,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick,
  } from 'vue'

  // 接收父组件的动态属性（包括所有配置项）
  type easyPlayerProps = {
    alt?: string // 无数据时显示的文本
    videoUrl: string // 视频地址
    isLive?: boolean // 是否直播
    hasAudio?: boolean // 是否解析音频
    isMute?: boolean // 是否静音
    stretch?: boolean // 是否拉伸视频
    bufferTime?: number // 缓冲时间
    loadTimeOut?: number // 加载超时时间
    loadTimeReplay?: number // 重连次数
    // eslint-disable-next-line vue/prop-name-casing
    MSE?: boolean // MSE 模式
    // eslint-disable-next-line vue/prop-name-casing
    WCS?: boolean // WCS 模式
    // eslint-disable-next-line vue/prop-name-casing
    WASM?: boolean // WASM 模式
    isReplay?: boolean // 是否回放
    gpuDecoder?: boolean // 硬解码
    watermark?: object | null // 水印配置
    fullWatermark?: object | null // 全屏水印
    debug?: boolean // 是否打印日志
  }

  const attrs = withDefaults(defineProps<easyPlayerProps>(), {
    isLive: true,
    hasAudio: true,
    isMute: false,
    stretch: true,
    isReplay: false,
    bufferTime: 1,
    loadTimeOut: 30,
    loadTimeReplay: 3,
    MSE: false,
    WCS: true,
    WASM: false,
    gpuDecoder: false,
    watermark: null,
    fullWatermark: null,
    debug: false,
    videoUrl: '',
  })

  const emits = defineEmits<{
    (e: 'fullscreen', data: any): void
    (e: 'snapInside', data: any): void
    (e: 'customButtons', data: any): void
    (e: 'videoInfo', data: any): void
  }>()

  // 播放器 DOM 容器引用
  const playerContainer = ref<HTMLDivElement | null>(null)
  let playerInstance: any = null // 播放器实例
  const noData = ref(true) // 是否无数据

  // 配置与状态
  const config = reactive({
    isLive: attrs.isLive,
    hasAudio: attrs.hasAudio,
    isMute: attrs.isMute,
    stretch: attrs.stretch,
    bufferTime: attrs.bufferTime,
    loadTimeOut: attrs.loadTimeOut,
    loadTimeReplay: attrs.loadTimeReplay,
    MSE: attrs.MSE,
    WCS: attrs.WCS,
    WASM: attrs.WASM,
    gpuDecoder: attrs.gpuDecoder,
    watermark: attrs.watermark,
    fullWatermark: attrs.fullWatermark,
    debug: attrs.debug,
  })

  const fullscreen = ref(false)
  let isPlay = false

  // 初始化播放器
  const initializePlayer = () => {
    if (playerContainer.value) {
      playerInstance = new (window as any).EasyPlayerPro(
        playerContainer.value,
        {
          isLive: config.isLive,
          hasAudio: config.hasAudio,
          isMute: config.isMute,
          stretch: config.stretch,
          bufferTime: config.bufferTime,
          loadTimeOut: config.loadTimeOut,
          loadTimeReplay: config.loadTimeReplay,
          MSE: config.MSE,
          WCS: config.WCS,
          WASM: config.WASM,
          gpuDecoder: config.gpuDecoder,
          watermark: config.watermark,
          fullWatermark: config.fullWatermark,
          debug: config.debug,
        },
      )

      console.log('播放器实例', playerInstance)
      // 事件监听
      playerInstance.on('fullscreen', (status: boolean) => {
        console.log('全屏', status)
        fullscreen.value = status
        emits('fullscreen', status)
      })

      playerInstance.on('videoInfo', (data: any) => {
        isPlay = true
        playerContainer.value
          ?.querySelector('.easyplayer-icon-screenshot')
          ?.addEventListener('click', screenshot)
        emits('videoInfo', data)

        if (!attrs.isReplay) {
          return
        }
        // 获取子元素
        const childElement = document.querySelector('.easyplayer-record')
        if (childElement) {
          // 向上遍历两层父节点（根据实际HTML结构）
          const parentContainer = childElement.parentNode
          // 确保父容器存在且是HTMLElement
          if (parentContainer instanceof HTMLElement) {
            parentContainer.style.display = 'none' // 安全地设置样式
          }
        }
      })

      playerInstance.on('timeout', (error: any) =>
        console.error('timeout:', error),
      )

      playerInstance.on('recordStart', () => {
        emits('customButtons', '录像')
      })

      playerInstance.on('recordEnd', () => {
        emits('customButtons', '录像')
      })

      playerInstance.on('error', (error: any) => {
        console.error('播放错误:', error)
        destroyPlayer()
      })
    }
  }

  // 鼠标右键事件隐藏
  const contextmenu = () => {
    nextTick(() => {
      let playBtn = playerContainer.value?.querySelector(
        '.easyplayer-contextmenu-btn',
      ) as any
      playBtn?.remove()
    })
  }

  const screenshot = () => {
    const base64 = playerInstance.screenshot('', 'png', 0.2, 'base64')
    emits('snapInside', base64)
  }

  let timeout: any = null
  // 销毁播放器
  const destroyPlayer = () => {
    return new Promise((resolve) => {
      if (playerInstance) {
        playerContainer.value
          ?.querySelector('.easyplayer-icon-screenshot')
          ?.removeEventListener('click', screenshot)
        playerInstance.destroy()
        playerInstance = null
      }

      isPlay = false
      clearTimeout(timeout)

      setTimeout(() => {
        resolve(null)
      }, 100)
    })
  }

  //重播
  const onReplay = () => {
    destroyPlayer().then(() => {
      initializePlayer()
      play()
    })
  }

  // 播放功能
  const play = () => {
    console.log('播放视频', attrs.videoUrl)
    noData.value = false
    setTimeout(
      (url) => {
        playerInstance &&
          playerInstance
            .play(url)
            .then(() => {
              if (playerContainer.value) {
                let playBtn = playerContainer.value.querySelector(
                  '.easyplayer-play',
                ) as any
                playBtn.style = 'display:block'
              }
              timeout = setTimeout(() => {
                console.log(isPlay)
                if (!isPlay) {
                  play()
                }
              }, 1000)
            })
            .catch((error: any) => {
              console.error('播放失败:', error)
            })
      },
      100,
      attrs.videoUrl,
    )
  }

  // 暂停功能
  const pause = () => {
    playerInstance?.pause()
  }

  // 静音功能
  const toggleMute = () => {
    const isMuted = playerInstance?.isMute()
    playerInstance?.setMute(!isMuted)
  }

  // 全屏功能
  const toggleFullscreen = () => {
    playerInstance?.setFullscreen()
  }

  // 属性监听：当配置变化时重新初始化播放器
  watch(
    () => attrs.videoUrl,
    (newVal) => {
      console.log(newVal, playerInstance)
      if (newVal) {
        onReplay()
      } else {
        noData.value = true
        destroyPlayer()
      }
    },
    { deep: true },
  )

  // 生命周期管理
  onMounted(() => {
    if (attrs.videoUrl) {
      initializePlayer()
      play()
    }
  })

  onBeforeUnmount(() => {
    destroyPlayer()
  })

  // 暴露方法供父组件调用
  defineExpose({
    pause,
    onReplay,
    play,
    toggleMute,
    toggleFullscreen,
    stop,
    destroyPlayer,
  })
</script>

<style scoped>
  .player-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
  }
  .player-box {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    font-size: 16px;
    color: #ffffff;
    transform: translate(-50%, -50%);
  }
</style>
