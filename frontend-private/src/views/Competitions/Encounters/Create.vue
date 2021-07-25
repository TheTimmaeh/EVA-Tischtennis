<template>
  <div class="encounters">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'CreateEncounter',
    components: {
      Form,
    },
    setup(){
      setTitle('Begegnung anlegen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const submit = (data) => {
        message.value = ''
        console.log(data)
        api({ method: 'POST', path: `/competitions/${route.params.competitionId}/encounters/create`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Begegnung wurde angelegt.'
            setTimeout(() => router.push({ path: '/competitions' }), 3000)
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
          { name: 'encounter', text: 'Begegnung', field: 'h2' },
          { name: 'home', text: 'Heimmannschaft:', field: 'search', apiPath: `/competitions/${route.params.competitionId}/association_teams`, displayFormat: '{{ name }} - {{ association_name }}', lookupRow: ['name', 'location'], returnPath: 'id', validate: { required: true } },
          { name: 'visitor', text: 'Gastmannschaft:', field: 'search', apiPath: `/competitions/${route.params.competitionId}/association_teams`, displayFormat: '{{ name }} - {{ association_name }}', lookupRow: ['name', 'location'], returnPath: 'id', validate: { required: true } },
          { name: 'date', text: 'Datum:', field: 'input', type: 'date', validate: { type: validate.types.date, required: true } },
          { name: 'gamestage', text: 'Gamestage:', field: 'gameStageSelect', validate: { min: 1, max: 2, required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
