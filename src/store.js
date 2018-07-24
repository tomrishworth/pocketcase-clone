import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: {},
    albumPosition: {
      grid: {
        top: 0,
        left: 0,
        width: 0
      },
      full: {
        top: 0,
        left: 0,
        width: 0
      }
    },
    lastSelected: null,
  },
  getters: {
    albumList(state) {
      return Object.values(state.albums);
    }
  },
  mutations: {
    albums(state, albums) {
      for(const album of albums) {
        Vue.set(state.albums, album.album.id, album.album) 
      }
    },
    updateAlbumPositionGrid(state, payload) {
      state.albumPosition.grid.left = payload.left;
      state.albumPosition.grid.top = payload.top;
      state.albumPosition.grid.width = payload.width;
    },
    updateAlbumPositionFull(state, payload) {
      state.albumPosition.full.left = payload.left;
      state.albumPosition.full.top = payload.top;
      state.albumPosition.full.width = payload.width;
    },
    updateLastSelected(state, payload) {
      state.lastSelected = payload;
    }
  },
  actions: {
    getAlbums (context) {
      return fetch('https://api.myjson.com/bins/pfcsm')
      .then(res=>res.json())
      .then(res => {
        context.commit('albums',res.items);
      });
    },
    updateAlbumPositionGrid (context, payload) {
      context.commit('updateAlbumPositionGrid', payload);
    },
    updateAlbumPositionFull (context, payload) {
      context.commit('updateAlbumPositionFull', payload);
    },
    updateLastSelected (context, payload) {
      context.commit('updateLastSelected', payload);
    }
  }
})
