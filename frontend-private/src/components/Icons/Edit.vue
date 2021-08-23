<template>
  <svg :class="[ `scale${scale}` ]" height="100%" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <g>
      <title>Bearbeiten</title>
      <path
        :fill="secondaryColor"
        :opacity="secondaryOpacity"
        d="M498 142.08l-56.6 56.55-128-128 56.55-56.55a48 48 0 0 1 67.91 0L498 74.17a48 48 0 0 1 0 67.91z" />
      <path
        :fill="primaryColor"
        :opacity="primaryOpacity"
        d="M12.85 371.11L.15 485.33a24 24 0 0 0 26.49 26.51l114.14-12.6 278-278-128-128z" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'EditIcon',
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
