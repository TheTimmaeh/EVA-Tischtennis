<template>
  <div class="referees">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { axios, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'CreateReferee',
    components: {
      Form,
    },
    setup(){
      setTitle('Schiedsrichter anlegen')
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        axios().post('/Referees/create/success', data).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Schiedsrichter wurde angelegt.'
            console.log(res)
            setTimeout(() => router.push({ path: '/referees' }), 3000)
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
          { name: 'referee', text: 'Schiedsrichter', field: 'h2' },
          { name: 'name', text: 'Vorname:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'surname', text: 'Nachname:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'gender', text: 'Geschlecht:', field: 'genderSelect', validate: {  required: true } },
          { name: 'birthday', text: 'Geburtstag:', field: 'input', type: 'date', validate: { type: validate.types.date, required: true }  },

          { name: 'address', text: 'Anschrift', field: 'h2' },
          { name: 'street', text: 'Straße:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'streetnumber', text: 'Hausnummer:', field: 'input', type: 'text', validate: { type: validate.types.streetnumber, required: true } },
          { name: 'zipcode', text: 'PLZ:', field: 'input', type: 'text', validate: { type: validate.types.zipcode, required: true } },
          { name: 'city', text: 'Ort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'state', text: 'Bundesland:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'country', text: 'Land:', field: 'countrySelect', validate: { min: 2, max: 2, required: true } },

          { name: 'contact', text: 'Kontakt', field: 'h2' },
          { name: 'phone', text: 'Telefon:', field: 'input', type: 'tel', validate: { type: validate.types.phone, required: true } },
          { name: 'mail', text: 'E-Mail:', field: 'input', type: 'email', validate: { type: validate.types.mail, required: true } },

          { name: 'passwordh2', text: 'Passwort', field: 'h2' },
          { name: 'password', text: 'Passwort:', field: 'input', type: 'password', validate: { min: 3, max: 255, required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
