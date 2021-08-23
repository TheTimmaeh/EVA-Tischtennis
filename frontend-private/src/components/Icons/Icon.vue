<template>
  <EditIcon
    v-if="type == 'edit'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <DeleteIcon
    v-if="type == 'delete'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <ApproveIcon
    v-if="type == 'approve'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <DenyIcon
    v-if="type == 'deny'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <LoginIcon
    v-if="type == 'login'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <LogoutIcon
    v-if="type == 'logout'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <InfoIcon
    v-if="type == 'info'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <WarningIcon
    v-if="type == 'warning'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <LocationIcon
    v-if="type == 'location'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <TableTennisIcon
    v-if="type == 'tabletennis'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <PlusIcon
    v-if="type == 'plus'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <PlusIcon
    v-if="type == 'minus'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    secondaryOpacity="0"
    :scale="scale" />
  <MoreIcon
    v-if="type == 'more'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="primaryColor"
    :secondaryOpacity="primaryOpacity"
    :scale="scale" />
  <CardIcon
    v-if="type == 'card'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="primaryColor"
    :secondaryOpacity="primaryOpacity"
    :scale="scale" />
  <AngleRightIcon
    v-if="type == 'angleright'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
  <AngleLeftIcon
    v-if="type == 'angleleft'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity"
    :scale="scale" />
</template>

<script>
  import EditIcon from '@/components/Icons/Edit'
  import DeleteIcon from '@/components/Icons/Delete'
  import ApproveIcon from '@/components/Icons/Approve'
  import DenyIcon from '@/components/Icons/Deny'
  import LoginIcon from '@/components/Icons/Login'
  import LogoutIcon from '@/components/Icons/Logout'
  import InfoIcon from '@/components/Icons/Info'
  import WarningIcon from '@/components/Icons/Warning'
  import LocationIcon from '@/components/Icons/Location'
  import TableTennisIcon from '@/components/Icons/TableTennis'
  import PlusIcon from '@/components/Icons/Plus'
  import MoreIcon from '@/components/Icons/More'
  import CardIcon from '@/components/Icons/Card'
  import AngleRightIcon from '@/components/Icons/AngleRight'
  import AngleLeftIcon from '@/components/Icons/AngleLeft'

  export default {
    name: 'Icon',
    components:{
      EditIcon,
      DeleteIcon,
      ApproveIcon,
      DenyIcon,
      LoginIcon,
      LogoutIcon,
      InfoIcon,
      WarningIcon,
      LocationIcon,
      TableTennisIcon,
      PlusIcon,
      MoreIcon,
      CardIcon,
      AngleRightIcon,
      AngleLeftIcon,
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
</style>
