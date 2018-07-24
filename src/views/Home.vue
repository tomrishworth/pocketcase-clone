<template>
  <div class="container">
    <h1>My Albums</h1>
    <div v-if="loading">Loading...</div>
    <div v-images-loaded:on.done="imageDone" class="albums">
      <div :key="album.id"
           class="album"
           :ref="album.id"
           v-for="(album, index) in albums"
           v-show="!loading"
           @click="goToAlbum(album.id)">
        <div class="album-image">
          <img :src="album.images[1].url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import imagesLoaded from 'vue-images-loaded'

export default {
  name: "home",
  data() {
    return {
      loading: false
      // albums: [];
    };
  },
  directives: {
      imagesLoaded
  },
  computed: {
    albums() {
      return this.$store.getters.albumList;
    },
  },
  methods: {
    getAlbums() {
      this.$store.dispatch("getAlbums");
    },
    goToAlbum(value) {
      // Find DOM element of selected album
      let domItem = this.$refs[value][0];
      // Gets its position relative to the window
      let albumPosition = domItem.getBoundingClientRect()
      // Get its position relative to its parent
      let albumOffsetLeft = domItem.offsetLeft;
      // Update store with this info
      this.$store.dispatch("updateLastSelected", value);
      this.$store.dispatch("updateAlbumPositionGrid", {
        top: albumPosition.top,
        left: albumOffsetLeft,
        width: albumPosition.width
      });
      // Goto album page
      this.$router.push({ name: "album", params: { id: value } });
    },
    imageDone(instance) {
      this.loading = false;
    }
  },
  beforeMount() {
    if (!Object.keys(this.$store.state.albums).length) {
      this.loading = true;
      this.getAlbums();
    } 
  },
  mounted() {
    if (this.$store.state.lastSelected) {
      let lastSelectedDomItem = this.$refs[this.$store.state.lastSelected][0];
      let scaleFactor = this.$store.state.albumPosition.full.width / this.$store.state.albumPosition.grid.width;
      let distanceTop = this.$store.state.albumPosition.full.top - this.$store.state.albumPosition.grid.top;
      // let distanceLeft = this.$store.state.albumPosition.full.left - this.$store.state.albumPosition.grid.left;
      let distanceLeft = 40 - this.$store.state.albumPosition.grid.left;
      anime({
        targets: lastSelectedDomItem,
        duration: 300,
        elasticity: 0,
        easing: "easeInSine",
        translateX: [distanceLeft, 0],
        translateY: [distanceTop, 0],
        scale: [scaleFactor, 1]
      });
    }
  }
};
</script>

<style lang="scss" scoped>

h1 {
  padding-left: 25px;
}

.albums {
  display: flex;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;
}

.album {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  margin-bottom: 5px;
  transform-origin: top left;
  cursor: pointer;
}

.album-image {
  img {
    max-width: 100%;
    height: auto;
  }
}

</style>
