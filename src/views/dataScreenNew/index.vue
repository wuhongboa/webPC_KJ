<template>
  <div class="screen">
    <!-- 头部 -->
    <ScreenHeader></ScreenHeader>
    <div class="screen-main">
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
</template>

<script lang="ts" setup>
  import ScreenHeader from './components/ScreenHeader.vue'
  import VehicleOverview from './components/VehicleOverview.vue'
  import CostBenefitAnalysis from './components/CostBenefitAnalysis.vue'
  import DigitalBase from './components/DigitalBase.vue'
  import Maintenance from './components/Maintenance.vue'
</script>

<style scoped lang="scss">
  .screen {
    background-color: #000318;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/image/screen_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    .screen-main {
      display: grid;
      grid-template-rows: 1fr 1fr; /* 上下两行，各占1份 */
      grid-template-columns: 1fr 1fr; /* 左右两列，各占1份 */
      gap: 2.4rem; /* 可选：设置间距 */
      height: 87rem; /* 确保容器占满整个视口高度 */
      padding: 0 2.4rem 0 2.4rem;
      margin-top: -24px;

      > div {
        border: 2px solid rgb(35, 77, 151);
        background-image: url('@/assets/image/charts/1-1-bg.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
</style>
