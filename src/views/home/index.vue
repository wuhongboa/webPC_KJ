<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-16 17:28:55
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-06-20 11:02:19
 * @FilePath: \zb-admin\src\views\other\textClamp\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapLayout>
    <div id="video-player-box">
      <div class="easy-player">
        <easy-player
          id="EasyPlayer"
          ref="vVideoPlayerRef"
          live
          muted
          autoplay
          has-audio="false"
          :video-url="videoOption.videoUrl"
        ></easy-player>
      </div>
      <div class="operation-box">
        <div>
          <el-checkbox
            v-model="videoOption.hasAudio"
            label="音频（音频有问题,请设置成false，仅支持flv）"
            size="large"
          />
        </div>
        <div>
          <span>视频地址：</span>
          <el-input
            v-model="videoOption.videoUrl"
            style="width: 500px; margin-right: 10px"
            placeholder="请输入视频地址"
          />
          <el-button type="primary" @click="initPlay">初始化</el-button>
          <el-button
            v-if="videoOption.status"
            type="primary"
            @click="switchVideo"
            >播放</el-button
          >
          <el-button v-else @click="switchVideo">暂停</el-button>
        </div>
        <div>
          <span>在线地址</span>
          <p
            v-for="(item, index) in urlList"
            :key="index"
            @click="handleClickUrl(item)"
            ><span>地址{{ index + 1 }}：</span><span>{{ item }}</span></p
          >
        </div>
      </div>
    </div>
  </PageWrapLayout>
</template>

<script lang="ts" setup name="Home">
  import { reactive, ref } from 'vue'
  interface videoOptionFace {
    videoUrl: string
    hasAudio: boolean
    status: boolean
  }
  const urlList = ref<string[]>([
    'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
    'http://vjs.zencdn.net/v/oceans.mp4',
    'https://vod.pipi.cn/fec9203cvodtransbj1251246104/ccff07ce5285890807898977876/v.f42906.mp4',
    'https:/Wod.pipi.cn/fe5b84 ocvodcq1251246104/658e4b085285890797861659749/f0.mp4',
    'https://vod.pipi.cn/43903a81vodtransgzp1251246104/bbd4f07a5285890808066187974/v.f42906.mp4',
    'https://vod.pipi.cn/fec9203cvodtransbj1251246104/67c6e6575285890807968082814/v.f42906.mp4',
  ])
  const videoOption = reactive<videoOptionFace>({
    //视频地址
    videoUrl: '',
    //是否静音
    hasAudio: false,
    status: true,
  })
  const vVideoPlayerRef = ref(null)
  const initPlay = () => {
    let player = vVideoPlayerRef.value.getVueInstance()
    player.destroyPlayer()
    player.initPlayer()
  }
  const switchVideo = () => {
    debugger
    let player = vVideoPlayerRef.value.getVueInstance()
    player.switchVideo()
    videoOption.status = !player.pause
  }

  const handleClickUrl = (url) => {
    videoOption.videoUrl = url
  }
</script>

<style lang="scss" scoped>
  .easy-player {
    width: 800px;
    height: 450px;
    margin: 0 auto;
    background: #000;
  }
</style>
