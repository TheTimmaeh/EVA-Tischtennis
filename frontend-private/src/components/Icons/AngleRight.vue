<template>
  <svg :class="[ `scale${scale}` ]" height="100%" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
    <g>
      <path
        :fill="secondaryColor"
        :opacity="secondaryOpacity"
        d="M128.14 256l56.47 56.49L88.46 409a23.76 23.76 0 0 1-33.6.18l-.18-.18-22.51-22.68a23.92 23.92 0 0 1 0-33.84z" />
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        d="M54.58 103.07L32 125.81a23.92 23.92 0 0 0 0 33.84L184.61 312.5 224 273l.06-.06a24 24 0 0 0-.16-33.94L88.37 103l-.17-.18a23.78 23.78 0 0 0-33.62.22z" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'AngleRightIcon',
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
