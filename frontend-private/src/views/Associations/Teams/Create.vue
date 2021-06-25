<template>
  <div class="associationTeams">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { axios, setTitle, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'CreateAssociationTeam',
    components: {
      Form,
    },
    setup(){
      setTitle('Vereinsmannschaft anlegen')
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        axios().post('/associationTeams/create/success', data).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Vereinsmannschaft wurde angelegt.'
            setTimeout(() => router.push({ path: '/associationsTeams' }), 3000)
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
        rows: [
          { name: 'nameAssociationClass', text: 'Name der Vereinsmannschaft:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'season', text: 'Saison:', field: 'search', apiPath: '/seasons', displayFormat: '{{ title }}', lookupRow: ['title'], returnPath: 'id', validate: { required: true } },
          { name: 'playerClass', text: 'Spielerklasse:', field: 'search', apiPath: '/playerClasses', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
