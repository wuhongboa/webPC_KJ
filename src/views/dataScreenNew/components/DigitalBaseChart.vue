<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as echarts from 'echarts'

  const chartRef = ref(null)
  let myChart = null

  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return

    myChart = echarts.init(chartRef.value)

    const option = {
      title: {
        text: '车队里程油耗统计',
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
        data: ['里程', '百公里油耗'],
        bottom: 10,
        itemHeight: 10,
        textStyle: {
          color: '#fff',
          fontSize: '1.2rem',
          fontWeight: '400',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '25%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '20240708',
            '20240709',
            '20240710',
            '20240711',
            '20240712',
            '20240713',
            '20240714',
          ],
          axisPointer: {
            type: 'shadow',
          },
          axisLine: {
            lineStyle: {
              color: '#00c2ff',
            },
          },
          axisLabel: {
            rotate: 45, // 旋转45度
            interval: 0, // 强制显示所有标签
            color: '#00c2ff', // 标签颜色
            align: 'right', // 对齐方式
            margin: 15, // 标签与轴线的距离
          },
          axisTick: {
            alignWithLabel: true, // 刻度与标签对齐
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '里程(km)',
          min: 0,
          max: 3000,
          interval: 500,
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
        {
          type: 'value',
          name: '百公里油耗（L）',
          min: 38,
          max: 44,
          interval: 1,
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
      ],
      series: [
        {
          name: '里程',
          type: 'bar',
          data: [2000, 2500, 1700, 1300, 1800, 1300, 500],
          // emphasis: {
          //   itemStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: '#2378f7' },
          //       { offset: 0.7, color: '#2378f7' },
          //       { offset: 1, color: '#83bff6' },
          //     ]),
          //   },
          // },
        },
        {
          name: '百公里油耗',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' L'
            },
          },
          smooth: true,
          data: [39.2, 39, 42, 43, 39.5, 38.5, 43],
          itemStyle: {
            color: 'rgba(240,177,98)', // 折线颜色
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(240,177,98, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(240,177,98, 0.1)',
              },
            ]),
          },
        },
      ],
    }

    myChart.setOption(option)
  }

  // 响应式调整
  const handleResize = () => {
    myChart?.resize()
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    myChart?.dispose()
  })
</script>
