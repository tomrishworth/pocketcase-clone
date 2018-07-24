<template>
  <div class="container"
       v-if="album">
    <div class="album-header">
      <div class="circle-mask"><div class="circle"></div></div>
      <div class="back-btn">
        <router-link to="/"><img src="../assets/arrow-left-regular.svg"/>Back</router-link>
      </div>
      <div ref="albumImage"
           class="album-image"
           :style="{ 'background-image': 'url(' + album.images[1].url + ')' }">
      </div>
      <div class="album-info">
        <div style="animation-delay: 300ms"
             class="fadeInUpSm">
          <h1 class="text-truncate">{{ album.name }}</h1>
          <div v-for="artist in album.artists">
            <h2 class="text-truncate">{{ artist.name }}</h2>
          </div>
          <!-- <div class="album-meta">
            <div>{{ album.tracks.total }} Songs</div>
            <div>{{ albumYear }}</div>
          </div> -->
        </div>
      </div>
    </div>
    <div style="animation-delay: 400ms"
         class="tracks fadeInUp">
      <div :key="index"
           class="track fadeInUpSm"
           :style="{'animation-delay': ((index * 120) + 400) + 'ms'}"
           v-for="(track, index) in album.tracks.items">
        <div class="track-number">{{ track.track_number }}</div>
        <div class="track-name">{{ track.name }}</div>
        <div class="track-time">{{ track.duration_ms | minutes }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import anime from "animejs";

export default {
  data() {
    return {
      album: {},
      currrentPosition: {},
    };
  },
  props: ["id"],
  methods: {
    updateAlbumPosition() {
      let domItem = this.$refs.albumImage;
      let albumPosition = domItem.getBoundingClientRect()
      let albumOffsetLeft = domItem.offsetLeft;
      this.$store.dispatch("updateAlbumPositionFull", {
        top: albumPosition.top,
        left: albumOffsetLeft,
        width: albumPosition.width
      });
    },
    animateItem() {
      let lastPosition = this.$refs.albumImage.getBoundingClientRect();
      let scaleFactor = this.$store.state.albumPosition.grid.width / lastPosition.width;
      anime({
        targets: ".album-image",
        duration: 400,
        elasticity: 0,
        easing: "easeInQuad",
        translateX: [this.$store.state.albumPosition.grid.left, '40px'],
        translateY: [this.$store.state.albumPosition.grid.top, '40px'],
        scale: [scaleFactor, 1],
        zIndex: [50, 0],
        // Get the albums new position after animation has completed
        complete: this.updateAlbumPosition
      });
    },
  },
  computed: {
    albumYear() {
      let fullDate = new Date(this.album.release_date)
      return fullDate.getFullYear();
    },
  },
  watch: {
    id: {
      handler: async function getAlbum() {
        if (!Object.keys(this.$store.state.albums).length) {
          await this.$store.dispatch("getAlbums");
        }
        this.album = this.$store.state.albums[this.id];
      },
      immediate: true
    }
  },
  mounted() {
    this.animateItem();
  },
};
</script>

<style lang="scss" scoped>

@keyframes fadeInLeft {
  from {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

.back-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 20;
  animation-name: fadeInLeft;
  animation-duration: 300ms;
  animation-fill-mode: both;
  animation-delay: 800ms;
  img {
    margin-right: 5px;
    width: 12px;
    position: relative;
    top: 1px;
  }
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 14px;
  }
}

@keyframes enlargeCircle {
  from {
    transform: none
  }

  to {
    transform: scale(30);
  }
}

.album-header {
  height: 400px;
  width: 375px;
  // background: #333;
  position: fixed;
  // overflow: hidden;
  top: 0;
  left: auto;
  right: auto;
  .circle {
    background: #333;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    animation-duration: 2000ms;
    animation-name: enlargeCircle;
    transform-origin: center center;
    animation-fill-mode: both;
  }
  .circle-mask {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.album-image {
  width: 290px;
  height: 290px;
  background-repeat: no-repeat;
  background-size: contain;
  transform: translateX(40px) translateY(40px);
  transform-origin: top left;
  box-shadow: 0px 3px 20px 5px rgba(0, 0, 0, 0.4);
  will-change: transform;
}

.album-info {
  text-align: center;
  padding: 15px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 30;
  h1 {
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 5px;
    font-weight: 700;
  }
  h2 {
    font-size: 16px;
    font-weight: 700;
    color: #888;
    margin-top: 0;
    margin-bottom: 0;
  }
}

// .album-meta {
//   display: flex;
//   justify-content: center;
//   color: #888;
//   text-transform: uppercase;
//   font-size: 12px;
//   div {
//     margin: 5px;
//   }
// }

.tracks {
  z-index: 30;
  position: relative;
  background-color: #121212;
  margin-top: 400px;
  font-size: 14px;
}

.track {
  display: flex;
  border-bottom: 1px solid #333;
  padding: 15px;
}

.track-number {
  flex-basis: 20px;
  color: #888;
}

.track-name {
  padding-left: 5px;
  padding-right: 5px;
}

.track-time {
  margin-left: auto;
  color: #888;
}
</style>
