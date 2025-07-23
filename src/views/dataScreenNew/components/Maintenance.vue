<template>
  <div class="maintenance">
    <div class="screen-item-header">维修保养</div>

    <div class="maintenance-charts">
      <LineChart :options="lineOptions" />
      <pie-chart
        id="maintenancePieChart"
        :data="pieData"
        :options="pieOptions"
        :seriesOption="pieSeriesOption"
      />
      <BarChart :options="barOptions" :height="'100%'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import LineChart from '@/components/LineChart/index.vue'
  import PieChart from '@/components/PieChart/index.vue'
  import BarChart from '@/components/BarChart/index.vue'
  import { piechar7 } from '@/mock/screen'
  const pieData = ref(piechar7)
  const lineOptions = ref({
    title: {
      text: '维修保养费用',
      left: '3%',
      textStyle: {
        color: '#fff',
        // fontSize: '1.6rem',
        fontWeight: '400',
      },
      top: '15%',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,42,90,0.7)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '25%',
      bottom: '10%',
      containLabel: true,
    },
    legend: {
      data: ['效益', '成本'],
      textStyle: {
        color: '#00c2ff ',
        // fontSize: '1.2rem',
      },
      itemHeight: 10,
      bottom: 10,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月'],
      axisLine: {
        lineStyle: {
          color: '#00c2ff',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#00c2ff',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#00c2ff',
        },
      },
    },
    series: [
      {
        name: '效益',
        type: 'line',
        data: [120, 132, 101, 134, 90],
        label: {
          show: true,
          color: '#00c2ff',
        },
      },
    ],
  })
  const pieOptions = ref()
  const pieSeriesOption = ref()

  let option = {
    title: {
      text: '维修项目及比例',
      left: 'center',
      textStyle: {
        color: '#fff',
        // fontSize: '1.6rem',
        fontWeight: '400',
      },
      top: '15%',
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,42,90,0.7)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      bottom: '20',
      itemWidth: 18,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
        // fontSize: '1.2rem',
      },
    },
  }
  const seriesOption = {
    radius: '70%',
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
  pieSeriesOption.value = seriesOption
  pieOptions.value = option

  // 完全自定义的 ECharts 配置
  const barOptions = ref({
    title: {
      text: '维修保养频次',
      left: '3%',
      textStyle: {
        color: '#fff',
        // fontSize: '1.6rem',
        fontWeight: '400',
      },
      top: '15%',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,42,90,0.7)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
    },
    legend: {
      itemHeight: 10,
      bottom: 10,
      textStyle: {
        color: '#fff',
        // fontSize: '1.2rem',
        fontWeight: '400',
      },
    },
    grid: {
      top: '25%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#00c2ff',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#00c2ff',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月'],
      axisLine: {
        lineStyle: {
          color: '#00c2ff',
        },
      },
    },
    series: [
      {
        name: '已保养',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [320, 302, 301, 334, 390],
      },
      {
        name: '未保养',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90],
      },
    ],
  })
</script>

<style scoped lang="scss">
  .maintenance {
    position: relative;
    padding: 24px;
    box-sizing: border-box;
    .maintenance-charts {
      display: grid;
      grid-template-columns: 3fr 2fr 3fr;
      gap: 24px; /* 设置间距 */
      height: 100%;
      > div {
        width: 100%;
        height: 100%;
      }
    }
  }
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
</style>
