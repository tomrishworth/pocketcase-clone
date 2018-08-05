<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="scss">

@import "node_modules/normalize.css/normalize";

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

html {
  box-sizing: border-box;
  -ms-overflow-style: scrollbar;
  overflow-y: scroll;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  background-color: #2b1d1d;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  max-width: 375px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background-color: #121212;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 100%;
    transform: translateX(0);
  }
}

.fadeInUp {
  animation-name: fadeInUp;
  animation-timing-function: ease-out;
  animation-duration: 800ms;
  animation-fill-mode: both;
}

@keyframes fadeInUpSm {
  0% {
    opacity: 0;
    transform: translateY(3px);
  }
  100% {
    opacity: 100%;
    transform: translateX(0);
  }
}

.fadeInUpSm {
  animation-name: fadeInUpSm;
  animation-timing-function: ease-out;
  animation-duration: 300ms;
  animation-fill-mode: both;
}

</style>


