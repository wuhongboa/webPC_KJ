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
      default: '100%',
    },
    // 图表配置项
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
      type: String,
      default: '',
    },
  })

  const chartRef = ref(null)
  let chartInstance = null

  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return

    // 如果已经存在实例则先销毁
    if (chartInstance) {
      chartInstance.dispose()
    }

    // 初始化
    chartInstance = echarts.init(chartRef.value, props.theme)

    // 设置配置项
    chartInstance.setOption(props.options)

    // 设置加载状态
    if (props.loading) {
      chartInstance.showLoading()
    } else {
      chartInstance.hideLoading()
    }
  }

  // 监听窗口变化自动调整
  const resizeChart = () => {
    chartInstance?.resize()
  }

  // 监听props变化
  watch(
    () => props.options,
    (newVal) => {
      chartInstance?.setOption(newVal)
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
</script>
