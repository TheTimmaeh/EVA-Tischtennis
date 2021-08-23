<template>
  <svg :class="[ `scale${scale}` ]" height="100%" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
    <g>
      <path
        :fill="secondaryColor"
        :opacity="secondaryOpacity"
        d="M223.83 352.44a24 24 0 0 1 0 33.86L201.32 409l-.18.18a23.76 23.76 0 0 1-33.6-.18l-96.15-96.5 56.47-56.5z" />
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        d="M167.81 102.87l-.17.18L32.11 239a24 24 0 0 0-.17 33.93l.06.07 39.39 39.51L224 159.66a23.92 23.92 0 0 0 0-33.84l-22.54-22.74a23.77 23.77 0 0 0-33.62-.23z" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'AngleLeftIcon',
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
