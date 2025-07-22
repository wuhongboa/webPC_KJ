<template>
  <div class="cost-benefit-analysis">
    <div class="screen-item-header">成本效益分析</div>
    <LineChart :options="chartOptions" :loading="loading" :height="'100%'" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import LineChart from '@/components/LineChart/index.vue'

  const loading = ref(false)
  let color = ['#6997f8', '#c3ebae']
  const chartOptions = ref({
    color: color,
    title: {
      text: '成本与效益',
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
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
      bottom: '10%',
      containLabel: true,
    },
    legend: {
      data: ['效益', '成本'],
      textStyle: {
        color: '#00c2ff ',
      },
      itemHeight: 10,
      bottom: 10,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['第一年', '第二年', '第三年', '第四年', '第五年', '第六年'],
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
        data: [120, 132, 101, 134, 90, 230],
        label: {
          show: true,
          color: color[0],
        },
      },
      {
        name: '成本',
        type: 'line',
        data: [220, 82, 91, 234, 290, 330],
        label: {
          show: true,
          color: color[1],
        },
      },
    ],
  })
</script>

<style scoped lang="scss">
  .cost-benefit-analysis {
    width: 100%;
    height: 100%;
    padding: 2.4rem;
    box-sizing: border-box;
    position: relative;
  }
  .screen-item-header {
    position: absolute;
    top: 16px;
    left: 16px;
    color: #fff;
    font-size: 1.8rem;
    padding-left: 4.5rem;
    width: 40rem;
    height: 3.4rem;
    background-image: url('@/assets/image/screen_item_header.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
