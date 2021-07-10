<template>
  <div class="persons">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute   } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'UpdatePerson',
    components: {
      Form,
    },
    setup(){
      setTitle('Person aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/persons/${route.params.personId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        rows.value = [
          { name: 'member', text: 'Person', field: 'h2' },
          { name: 'name', text: 'Vorname:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value:res.data.name },
          { name: 'surname', text: 'Nachname:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value:res.data.surname  },
          //todo: mit daten vorbelegen
          { name: 'gender', text: 'Geschlecht:', field: 'genderSelect', value:res.data.gender },
          //todo: mit daten vorbelegen
          { name: 'birthday', text: 'Geburtsdatum:', field: 'input', type: 'date', validate: { type: validate.types.date, required: true }, value:res.data.birthday  },

          { name: 'address', text: 'Anschrift', field: 'h2' },
          { name: 'street', text: 'Straße:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value:res.data.street },
          { name: 'streetnumber', text: 'Hausnummer:', field: 'input', type: 'text', validate: { type: validate.types.streetnumber, required: true }, value:res.data.streetnumber  },
          { name: 'zipcode', text: 'PLZ:', field: 'input', type: 'text', validate: { type: validate.types.zipcode, required: true }, value:res.data.zipcode  },
          { name: 'city', text: 'Ort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value:res.data.city },
          //todo: mit daten vorbelegen
          { name: 'state', text: 'Bundesland:', field: 'stateSelect', validate: { min: 2, max: 2, required: true }, value:res.data.state },
          //todo: mit daten vorbelegen
          { name: 'country', text: 'Land:', field: 'countrySelect', validate: { min: 2, max: 2, required: true }, value:res.data.state },

          { name: 'contact', text: 'Kontakt', field: 'h2' },
          { name: 'phone', text: 'Telefon:', field: 'input', type: 'tel', validate: { type: validate.types.phone, required: true }, value:res.data.phone },
          { name: 'mail', text: 'E-Mail:', field: 'input', type: 'email', validate: { type: validate.types.mail, required: true }, value:res.data.mail },
        
           ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/persons/${route.params.personId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Person wurde aktualisiert.'
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
        rows,
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
