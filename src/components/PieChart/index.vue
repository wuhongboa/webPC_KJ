<!-- src/components/PieChart.vue -->
<template>
  <div ref="chartRef" class="pie-chart"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import * as echarts from 'echarts'

  const props = defineProps<{
    data: { value: number; name: string }[]
    options?: echarts.EChartsOption // 允许自定义配置
    seriesOption?: echarts.PieSeriesOption
  }>()

  const chartRef = ref<HTMLElement | null>(null)
  const chartInstance = ref<echarts.ECharts | null>(null)

  // 初始化/更新图表
  const initChart = () => {
    if (!chartRef.value) return
    chartInstance.value = echarts.init(chartRef.value)
    updateChart()
  }

  const updateChart = () => {
    if (!chartInstance.value) return
    const defaultOption: echarts.EChartsOption = {
      series: [
        {
          type: 'pie',
          data: props.data,
          ...props.seriesOption,
        },
      ],
      ...props.options, // 合并父组件传递的配置
    }
    chartInstance.value.setOption(defaultOption)
  }
  // 响应式更新
  watch(() => props.data, updateChart, { deep: true })

  // 响应窗口大小变化
  const resizeChart = () => chartInstance.value?.resize()

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    chartInstance.value?.dispose()
  })
</script>

<style scoped>
  .pie-chart {
    width: 100%;
    height: 100%;
  }
</style>
