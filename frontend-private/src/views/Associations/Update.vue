<template>
  <div class="users">
    <div class="message" v-if="message">{{ message }}</div>
    <Form v-if="rows" :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute  } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'UpdateAssociation',
    components: {
      Form,
    },
    setup(){
      setTitle('Vereinsdaten aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/associations/${route.params.associationId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }
        rows.value = [
          { name: 'name', text: 'Name des Vereins:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.name },
          { name: 'year', text: 'Gründungsjahr:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear(), validate: { type: validate.types.year, required: true }, value: res.data.year },
          { name: 'location', text: 'Vereinsort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.location },
          { name: 'description', text: 'Beschreibung:', field: 'textarea', validate: { max: 2000 }, value: res.data.description },

          { name: 'address', text: 'Anschrift', field: 'h2' },
          { name: 'street', text: 'Straße:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.street },
          { name: 'streetnumber', text: 'Hausnummer:', field: 'input', type: 'text', validate: { type: validate.types.streetnumber, required: true } , value: res.data.streetnumber},
          { name: 'zipcode', text: 'PLZ:', field: 'input', type: 'text', validate: { type: validate.types.zipcode, required: true }, value: res.data.zipcode },
          { name: 'city', text: 'Ort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } , value: res.data.city},
          { name: 'state', text: 'Bundesland:', field: 'stateSelect', validate: { min: 2, max: 2, required: true }, value: res.data.state },
          { name: 'country', text: 'Land:', field: 'countrySelect', validate: { min: 2, max: 2, required: true }, value: res.data.country },

          { name: 'contact', text: 'Kontakt', field: 'h2' },
          { name: 'board', text: 'Vorstand:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }} {{ surname }}', lookupRow: ['name', 'surname'], returnPath: 'id', validate: { required: true }, value: res.data.board },
          { name: 'phone', text: 'Telefon:', field: 'input', type: 'tel', validate: { type: validate.types.phone, required: true }, value: res.data.phone },
          { name: 'mail', text: 'E-Mail:', field: 'input', type: 'email', validate: { type: validate.types.mail, required: true }, value: res.data.mail },
          { name: 'url', text: 'Website:', field: 'input', type: 'url', validate: { type: validate.types.url, required: true }, value: res.data.url },
        ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/associations/${route.params.associationId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'vereinsdaten wurden aktualisiert.'
            setTimeout(() => router.push({ path: '/associations/' }), 3000)
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
