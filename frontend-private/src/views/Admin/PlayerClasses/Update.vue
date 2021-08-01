<template>
  <div class="playerClasses">
    <div class="message" v-if="message">{{ message }}</div>
    <Form v-if="rows" :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'UpdatePlayerClass',
    components: {
      Form,
    },
    setup(){
      setTitle('Spielerklasse aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/playerClasses/${route.params.playerClassId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        rows.value = [
          { name: 'name', text: 'Name der Spielerklasse:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.name  },
          { name: 'age_from', text: 'Mindestalter:', field: 'input', type: 'number', min: 6, max: 100, validate: { type: validate.types.age, required: true }, value: res.data.age_from },
          { name: 'age_to', text: 'Maximales Alter:', field: 'input', type: 'number', min: 6, max: 100, validate: { type: validate.types.age, required: true }, value: res.data.age_to },
          { name: 'gender', text: 'Geschlecht:', field: 'genderSelect', validate: {  required: true }, value: res.data.gender },
        ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

       api({ method: 'POST',  path: `/playerClasses/${route.params.playerClassId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spielerklasse wurde aktualisiert.'
            setTimeout(() => router.push({ path: '/admin/playerClasses' }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const invalid = () => {
        message.value = 'Bitte überprüfen Sie Ihre Eingabe.'
      }

      return {
        submit,
        invalid,
        message,
        rows,
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
