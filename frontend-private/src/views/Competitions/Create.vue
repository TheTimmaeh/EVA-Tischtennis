<template>
  <div class="competitions">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { axios, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'CreateCompetition',
    components: {
      Form,
    },
    setup(){
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        axios().post('/competitions/create/success', data).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Turnier wurde angelegt.'
            console.log(res.data)
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
          { name: 'competition', text: 'Turnier', field: 'h2' },
          { name: 'name', text: 'Name:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'date', text: 'Datum:', field: 'input', type: 'text', validate: { type: validate.types.date, required: true } },
          { name: 'class', text: 'Spielerklasse:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          //TODO: Hier noch ein Dropdown einbinden, das die angelegten Seasons zeigt, sodass ein Turnier der Saison zugeorndet wird. Oder wollen wir die zuorndung automatisch anhand des Datums vornehmen? 
          
          { name: 'adress', text: 'Anschrift', field: 'h2' },
          { name: 'street', text: 'Straße:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'streetnumber', text: 'Hausnummer:', field: 'input', type: 'text', validate: { type: validate.types.streetnumber, required: true } },
          { name: 'zipcode', text: 'PLZ:', field: 'input', type: 'text', validate: { type: validate.types.zipcode, required: true } },
          { name: 'city', text: 'Ort:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'state', text: 'Bundesland:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'country', text: 'Land:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
        
          { name: 'konkakt', text: 'Kontakt', field: 'h2' },
          { name: 'phone', text: 'Telefon:', field: 'input', type: 'tel', validate: { type: validate.types.phone, required: true } },
          { name: 'mail', text: 'E-Mail:', field: 'input', type: 'email', validate: { type: validate.types.mail, required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
