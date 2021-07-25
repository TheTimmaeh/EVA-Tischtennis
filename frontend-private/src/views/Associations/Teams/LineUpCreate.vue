<template>
  <div class="lineUpCreate">
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
    name: 'CreateLineUp',
    components: {
      Form,
    },
    setup(){
      const router = useRouter()
      const route = useRoute()
      setTitle(`Mannschaftsaufstellung anlegen | Verein ${route.params.associationId} | Mannschaft ${route.params.teamId} `)
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/teamMembers/${route.params.associationId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Mannschaftsaufstellung wurde angelegt.'
            setTimeout(() => router.push({ path: `/associations/${route.params.associationId}/teams` }), 3000)
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
          { name: 'member', text: 'Mannschaftsaufstellung', field: 'h2' },
          { name: 'position1', text: 'Spieler 1:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'position1', text: 'Spieler 2:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'position1', text: 'Spieler 3:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'position1', text: 'Spieler 4:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'position1', text: 'Spieler 5:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
