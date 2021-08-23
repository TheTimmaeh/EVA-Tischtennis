<template>
  <svg :class="[ `scale${scale}` ]" height="100%" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <g>
      <title>Standort</title>
      <path
        :fill="secondaryColor"
        :opacity="secondaryOpacity"
        d="M192 0C86 0 0 86 0 192c0 77.41 27 99 172.27 309.67a24 24 0 0 0 39.46 0C357 291 384 269.41 384 192 384 86 298 0 192 0zm0 288a96 96 0 1 1 96-96 96 96 0 0 1-96 96z" />
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
      d="M192 256a64 64 0 1 1 64-64 64 64 0 0 1-64 64z" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'LocationIcon',
    props: {
      primaryColor: {
        type: String,
        default: '#FFFFFF',
      },
      primaryOpacity: {
        type: [String, Number],
        default: 1,
      },
      secondaryColor: {
        type: String,
        default: '#FFFFFF',
      },
      secondaryOpacity: {
        type: [String, Number],
        default: 0.4,
      },
      scale: {
        type: [String, Number],
        default: 1,
      },
    },
    setup(props){
      return {
        ...props,
      }
    }
  }
</script>

<style lang="scss" scoped>
  svg {
    &.scale2 {
      transform: scale(2);
    }

    &.scale3 {
      transform: scale(3);
    }
  }
</style>
