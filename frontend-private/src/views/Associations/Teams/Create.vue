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
          { name: 'season', text: 'Saison:', field: 'seasonSelect', validate: { min: 2, max: 2, required: true } },
          { name: 'year', text: 'Jahr der Saison:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear(), validate: { type: validate.types.year, required: true } },
          { name: 'gender', text: 'Geschlecht der Mitglieder:', field: 'genderSelect', validate: { required: true } },
          { name: 'nameAssociation', text: 'Name des Vereins:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } }, //TODO: Das später noch als DropDown umsetzen, welches die unterschiedlichen beriets existierenden Vereine anbietet, oder die Möglichkeit eine Vereinsmannschaft anzulegen nur über den Verein selbst anbieten, das müssen wir zunächst noch entscheiden, letzteres finde ich sinnvoller
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
