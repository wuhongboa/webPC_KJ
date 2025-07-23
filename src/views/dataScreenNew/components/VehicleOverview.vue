<template>
  <div class="vehicle-overview">
    <div class="screen-item-header">车辆概况</div>
    <PieChart
      ref="chart1"
      :data="pieData1"
      :options="pieOptions"
      :seriesOption="pieSeriesOption"
    ></PieChart>
    <PieChart
      ref="chart2"
      :data="pieData2"
      :options="pieOptions"
      :seriesOption="pieSeriesOption"
      >车龄分布</PieChart
    >
    <PieChart
      ref="chart3"
      :data="pieData3"
      :options="pieOptions"
      :seriesOption="pieSeriesOption3"
      >车辆类型</PieChart
    >
    <PieChart
      ref="chart4"
      :data="pieData4"
      :options="pieOptions"
      :seriesOption="pieSeriesOption"
      >燃料类型分布</PieChart
    >
    <PieChart
      ref="chart5"
      :data="pieData5"
      :options="pieOptions"
      :seriesOption="pieSeriesOption"
      >新车二手车比例</PieChart
    >
    <PieChart
      ref="chart6"
      :data="pieData6"
      :options="pieOptions"
      :seriesOption="pieSeriesOption3"
      >车辆组织比例</PieChart
    >
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PieChart from '@/components/PieChart/index.vue'

  import {
    piechar1,
    piechar2,
    piechar3,
    piechar4,
    piechar5,
    piechar6,
  } from '@/mock/screen'

  type PieChartInstance = InstanceType<typeof PieChart>
  const chart1 = ref<PieChartInstance | null>(null)
  const chart2 = ref<PieChartInstance | null>(null)
  const chart3 = ref<PieChartInstance | null>(null)
  const chart4 = ref<PieChartInstance | null>(null)
  const chart5 = ref<PieChartInstance | null>(null)
  const chart6 = ref<PieChartInstance | null>(null)

  const chartRefs = ref<Array<PieChartInstance | null>>(
    [chart1, chart2, chart3, chart4, chart5, chart6].map((item) => item.value),
  )
  const resizeAllCharts = () => {
    chartRefs.value.forEach((chart) => {
      chart?.resize() // 现在可以正确调用组件暴露的方法
    })
  }

  const pieData1 = ref(piechar1)
  const pieData2 = ref(piechar2)
  const pieData3 = ref(piechar3)
  const pieData4 = ref(piechar4)
  const pieData5 = ref(piechar5)
  const pieData6 = ref(piechar6)

  const pieOptions = ref()
  let option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,42,90,0.7)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      bottom: 'bottom',
      itemWidth: 18,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
    },
  }
  const pieSeriesOption = ref()
  const pieSeriesOption3 = ref()
  let seriesOption = {
    radius: '50%',
    label: {
      show: true,
      position: 'inside',
      formatter: '{c}',
      color: '#fff',
    },
    labelLine: { show: false },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  }

  let seriesOption3 = {
    radius: '50%',
    label: {
      show: true,
      position: 'inside',
      formatter: '{d}%',
      color: '#fff',
    },
    labelLine: { show: false },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  }

  pieSeriesOption.value = seriesOption
  pieSeriesOption3.value = seriesOption3
  pieOptions.value = option

  // 暴露给父组件（如果需要）
  defineExpose({
    resizeAllCharts,
  })
</script>

<style scoped lang="scss">
  .vehicle-overview {
    position: relative;
    display: grid;
    grid-template-rows: repeat(2, 1fr); /* 上下两行，各占1份 */
    grid-template-columns: repeat(3, 1fr); /* 左右两列，各占1份 */
    gap: 5px; /* 可选：设置间距 */
    padding: 16px;
    box-sizing: border-box;

    .screen-item-header {
      position: absolute;
      top: 16px;
      left: 16px;
      color: #fff;
      font-size: 18px;
      padding-left: 45px;
      width: 400px;
      height: 34px;
      background-image: url('@/assets/image/screen_item_header.png');
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
</style>
