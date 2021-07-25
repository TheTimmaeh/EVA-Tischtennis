<template>
  <div class="persons">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'CreatePerson',
    components: {
      Form,
    },
    setup(){
      setTitle('Person anlegen')
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: '/persons', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Person wurde angelegt.'
            setTimeout(() => router.push({ path: '/persons' }), 3000)
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
          { name: 'member', text: 'Person', field: 'h2' },
          { name: 'name', text: 'Vorname:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'surname', text: 'Nachname:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'gender', text: 'Geschlecht:', field: 'genderSelect' },
          { name: 'birthday', text: 'Geburtsdatum:', field: 'input', type: 'date', validate: { type: validate.types.date, required: true } },

          { name: 'address', text: 'Anschrift', field: 'h2' },
          { name: 'street', text: 'Straße:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'streetnumber', text: 'Hausnummer:', field: 'input', type: 'text', validate: { type: validate.types.streetnumber, required: true } },
          { name: 'zipcode', text: 'PLZ:', field: 'input', type: 'text', validate: { type: validate.types.zipcode, required: true } },
          { name: 'city', text: 'Ort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'state', text: 'Bundesland:', field: 'stateSelect', validate: { min: 2, max: 2, required: true } },
          { name: 'country', text: 'Land:', field: 'countrySelect', validate: { min: 2, max: 2, required: true } },

          { name: 'contact', text: 'Kontakt', field: 'h2' },
          { name: 'phone', text: 'Telefon:', field: 'input', type: 'tel', validate: { type: validate.types.phone, required: true } },
          { name: 'mail', text: 'E-Mail:', field: 'input', type: 'email', validate: { type: validate.types.mail, required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
