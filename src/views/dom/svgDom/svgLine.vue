<template>
  <div class="light-line-container">
    <svg width="300" height="200" viewBox="0 0 300 200">
      <!-- 定义渐变 -->
      <defs>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="30%" stop-color="gold" />
          <stop offset="70%" stop-color="orange" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>

        <!-- 发光滤镜 -->
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- 背景路径（用于动画跟随） -->
      <!-- <path
        id="curve-path"
        d="M 50,150 Q 150,50 250,150"
        fill="none"
        stroke="transparent"
        stroke-width="10"
      /> -->

      <!-- 可见的曲线 -->
      <path
        d="M 50,150 Q 150,50 250,150"
        fill="none"
        stroke="#333"
        stroke-width="2"
      />

      <!-- 光线效果 -->
      <path
        d="M 50,150 Q 150,50 250,150"
        fill="none"
        stroke="url(#line-gradient)"
        stroke-width="4"
        filter="url(#glow)"
        stroke-dasharray="10, 300"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="300"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      <!-- 光点动画 -->
      <circle r="8" fill="white" filter="url(#glow)">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath xlink:href="#curve-path" />
        </animateMotion>
        <animate
          attributeName="r"
          values="4;8;4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script setup>
  // 不需要额外的JavaScript逻辑
</script>

<style scoped>
  .light-line-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #222;
  }
</style>
