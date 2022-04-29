<template>
  <div class="player">
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      style="object-fit: fill"
      :options="playerOptions"
      :x5-video-player-fullscreen="true"
      @pause="onPlayerPause($event)"
      @play="onPlayerPlay($event)"
      @fullscreenchange="onFullscreenChange($event)"
      @click="fullScreen"
    >
    </video-player>
  </div>
</template>

<script>
import test from '@/assets/images/bg.png'
import { videoPlayer } from 'vue-video-player';

export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      pictureImg: test,
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          //你的视频地址
          src: "https://vt1.doubanio.com/202204171340/68218f5fad1f316a036aa57f33fd796e/view/movie/M/302090987.mp4"
        }],
        poster: "https://img3.doubanio.com/img/trailer/medium/2410830010.jpg?",//你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          // timeDivider: true,
          // durationDisplay: true,
          // remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  methods: {
    fullScreen () {
      const player = this.$refs.videoPlayer.player
      player.requestFullscreen()//调用全屏api方法
      player.isFullscreen(true)
      player.play()
    },
    onPlayerPlay (player) {
      player.play()
    },
    onPlayerPause (player) {
      // alert("pause");
      player.pause();
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<style lang="less" scoped>
.video-js .vjs-big-play-button {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
}
</style>