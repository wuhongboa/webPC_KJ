<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import * as echarts from 'echarts'

  const props = defineProps({
    // 图表宽度
    width: {
      type: String,
      default: '100%',
    },
    // 图表高度
    height: {
      type: String,
      default: '400px',
    },
    // ECharts 配置选项
    options: {
      type: Object,
      required: true,
    },
    // 是否显示加载动画
    loading: {
      type: Boolean,
      default: false,
    },
    // 主题
    theme: {
      type: [String, Object],
      default: '',
    },
    // 初始化额外参数
    initOpts: {
      type: Object,
      default: () => ({}),
    },
  })

  const emit = defineEmits(['chart-click', 'chart-ready', 'chart-error'])

  const chartRef = ref(null)
  let chartInstance = null

  // 初始化图表
  const initChart = () => {
    try {
      if (!chartRef.value) return

      // 如果已经存在实例则先销毁
      if (chartInstance) {
        chartInstance.dispose()
      }

      // 初始化图表实例
      chartInstance = echarts.init(chartRef.value, props.theme, props.initOpts)

      // 设置配置项
      chartInstance.setOption(props.options)

      // 设置加载状态
      if (props.loading) {
        chartInstance.showLoading()
      } else {
        chartInstance.hideLoading()
      }

      // 绑定事件
      chartInstance.on('click', (params) => {
        emit('chart-click', params)
      })

      // 图表就绪事件
      chartInstance.on('finished', () => {
        emit('chart-ready', chartInstance)
      })
    } catch (error) {
      console.error('ECharts 初始化失败:', error)
      emit('chart-error', error)
    }
  }

  // 监听窗口变化自动调整
  const resizeChart = () => {
    chartInstance?.resize()
  }

  // 监听props变化
  watch(
    () => props.options,
    (newOptions) => {
      chartInstance?.setOption(newOptions)
    },
    { deep: true },
  )

  watch(
    () => props.loading,
    (newVal) => {
      if (newVal) {
        chartInstance?.showLoading()
      } else {
        chartInstance?.hideLoading()
      }
    },
  )

  // 生命周期
  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
    window.removeEventListener('resize', resizeChart)
  })

  // 暴露方法
  defineExpose({
    getInstance: () => chartInstance,
    resize: resizeChart,
  })
</script>
