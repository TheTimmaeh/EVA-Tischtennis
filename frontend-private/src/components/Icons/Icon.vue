<template>
  <EditIcon
    v-if="type == 'edit'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <DeleteIcon
    v-if="type == 'delete'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
</template>

<script>
  import EditIcon from '@/components/Icons/Edit'
  import DeleteIcon from '@/components/Icons/Delete'

  export default {
    name: 'Icon',
    components:{
      EditIcon,
      DeleteIcon,
    },
    props: {
      type: {
        type: String,
        required: true,
      },
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
