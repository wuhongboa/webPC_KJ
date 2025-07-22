<template>
  <div class="digital-base">
    <div class="screen-item-header">数字底座</div>
    <div class="digital-base-charts">
      <BarChart :options="barOptions" />
      <DigitalBaseChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import BarChart from '@/components/BarChart/index.vue'
  import DigitalBaseChart from './DigitalBaseChart.vue'

  // 完全自定义的 ECharts 配置
  const barOptions = ref({
    title: {
      text: '例行检查',
      left: '3%',
      textStyle: {
        color: '#fff',
        fontSize: '1.6rem',
        fontWeight: '400',
      },
      top: '10%',
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
        fontSize: '1.2rem',
        fontWeight: '400',
      },
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月'],
      type: 'category',
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
        name: '检查',
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
        name: '未检查',
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
  .digital-base {
    position: relative;
    padding: 2.4rem;
    box-sizing: border-box;
    .digital-base-charts {
      display: grid;
      grid-template-columns: 1fr 2fr; /* 两列布局 */
      gap: 1.6rem; /* 设置间距 */
    }
  }
  .screen-item-header {
    position: absolute;
    top: 16px;
    left: 16px;
    color: #fff;
    font-size: 1.8rem;
    padding-left: 4.5rem;
    width: 40rem;
    height: 34px;
    background-image: url('@/assets/image/screen_item_header.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
