<template>
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <g class="fa-group">
      <path class="fa-secondary" :fill="secondaryColor" d="M53.2 467L32 96h384l-21.2 371a48 48 0 0 1-47.9 45H101.1a48 48 0 0 1-47.9-45z" :opacity="secondaryOpacity"></path>
      <path class="fa-primary" :fill="primaryColor" d="M0 80V48a16 16 0 0 1 16-16h120l9.4-18.7A23.72 23.72 0 0 1 166.8 0h114.3a24 24 0 0 1 21.5 13.3L312 32h120a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16A16 16 0 0 1 0 80z" :opacity="primaryOpacity"></path>
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
        type: Number,
        default: 1,
      },
      secondaryColor: {
        type: String,
        default: '#FFFFFF',
      },
      secondaryOpacity: {
        type: Number,
        default: 0.4,
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
    color: white;
    height: 16px;
    width: 16px;
  }
</style>
