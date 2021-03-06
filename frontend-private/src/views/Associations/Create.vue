<template>
  <Page>
    <div class="associations">
      <div class="message" v-if="message">{{ message }}</div>
      <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
    </div>
  </Page>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Page from '@/components/Page'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'AssociationsCreate',
    components: {
      Page,
      Form,
    },
    setup(){
      setTitle('Verein anlegen')
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: '/associations', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Verein wurde angelegt.'
            setTimeout(() => router.push({ path: '/associations' }), 3000)
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
          { name: 'name', text: 'Name des Vereins:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'year', text: 'Gründungsjahr:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear(), validate: { type: validate.types.year, required: true } },
          { name: 'location', text: 'Vereinsort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'description', text: 'Beschreibung:', field: 'textarea', validate: { max: 2000 } },

          { name: 'address', text: 'Anschrift', field: 'h2' },
          { name: 'street', text: 'Straße:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'streetnumber', text: 'Hausnummer:', field: 'input', type: 'text', validate: { type: validate.types.streetnumber, required: true } },
          { name: 'zipcode', text: 'PLZ:', field: 'input', type: 'text', validate: { type: validate.types.zipcode, required: true } },
          { name: 'city', text: 'Ort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'state', text: 'Bundesland:', field: 'stateSelect', validate: { min: 2, max: 2, required: true } },
          { name: 'country', text: 'Land:', field: 'countrySelect', validate: { min: 2, max: 2, required: true } },

          { name: 'contact', text: 'Kontakt', field: 'h2' },
          { name: 'board', text: 'Vorstand:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }} {{ surname }}', lookupRow: ['name', 'surname'], returnPath: 'id', validate: { required: true } },
          { name: 'phone', text: 'Telefon:', field: 'input', type: 'tel', validate: { type: validate.types.phone, required: true } },
          { name: 'mail', text: 'E-Mail:', field: 'input', type: 'email', validate: { type: validate.types.mail, required: true } },
          { name: 'url', text: 'Website:', field: 'input', type: 'url', validate: { type: validate.types.url, required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
