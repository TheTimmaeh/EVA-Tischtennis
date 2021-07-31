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
  <ApproveIcon
    v-if="type == 'approve'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <DenyIcon
    v-if="type == 'deny'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <LoginIcon
    v-if="type == 'login'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <LogoutIcon
    v-if="type == 'logout'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <InfoIcon
    v-if="type == 'info'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <WarningIcon
    v-if="type == 'warning'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
  <TableTennisIcon
    v-if="type == 'tabletennis'"
    :primaryColor="primaryColor"
    :primaryOpacity="primaryOpacity"
    :secondaryColor="secondaryColor"
    :secondaryOpacity="secondaryOpacity" />
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
  import TableTennisIcon from '@/components/Icons/TableTennis'

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
      TableTennisIcon,
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
</style>
