<template>
  <svg :class="[ `scale${scale}` ]" height="100%" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 576">
    <g>
      <!-- <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        d="M340 352H204a12 12 0 0 0-12 12v40a12 12 0 0 0 12 12h136a12 12 0 0 0 12-12v-40a12 12 0 0 0-12-12zm-192 0H76a12 12 0 0 0-12 12v40a12 12 0 0 0 12 12h72a12 12 0 0 0 12-12v-40a12 12 0 0 0-12-12z" />
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        d="M528 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h480a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zM160 404a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h72a12 12 0 0 1 12 12zm192 0a12 12 0 0 1-12 12H204a12 12 0 0 1-12-12v-40a12 12 0 0 1 12-12h136a12 12 0 0 1 12 12z" /> -->
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        transform="rotate(90, 256, 288)"
        d="m496,64l-480,0a48,48 0 0 0 -48,48l0,352a48,48 0 0 0 48,48l480,0a48,48 0 0 0 48,-48l0,-352a48,48 0 0 0 -48,-48z" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'CardIcon',
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
