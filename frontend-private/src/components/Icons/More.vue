<template>
  <svg :class="[ `scale${scale}` ]" height="100%" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <g>
      <title>More</title>
      <path
        :fill="secondaryColor"
        :opacity="secondaryOpacity"
        d="M256 184a72 72 0 1 0 72 72 72 72 0 0 0-72-72z" />
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        d="M432 184a72 72 0 1 0 72 72 72 72 0 0 0-72-72zm-352 0a72 72 0 1 0 72 72 72 72 0 0 0-72-72z" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'MoreIcon',
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
