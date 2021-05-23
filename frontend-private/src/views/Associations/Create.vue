<template>
  <div class="createAssociation">
    <div class="message" v-if="message">{{ message }}</div>
    <div class="row"><label for="name">Name des Vereins:</label><InputField type="text" label="name" ref="e_name" v-model="name" /></div>
    <div class="row"><label for="jahr">Gründungsjahr:</label><InputField type="number" label="jahr" min="1874" :max="new Date().getFullYear()" ref="e_year" v-model="year" /></div>
    <div class="row"><label for="ort">Vereinsort:</label><InputField type="text" label="ort" ref="e_location" v-model="location" /></div>
    <div class="row"><label for="beschreibung">Beschreibung:</label><TextArea label="beschreibung" ref="e_description" v-model="description" /></div>
    <br />
    <h2>Anschrift</h2>
    <div class="row"><label for="a_strasse">Straße:</label><InputField type="text" label="a_strasse" ref="e_address_street" v-model="address_street" /></div>
    <div class="row"><label for="a_hausnummer">Hausnummer:</label><InputField type="text" label="a_hausnummer" ref="e_address_streetNumber" v-model="address_streetNumber" /></div>
    <div class="row"><label for="a_plz">PLZ:</label><InputField type="number" label="a_plz" ref="e_address_zipcode" v-model="address_zipcode" /></div>
    <div class="row"><label for="a_ort">Ort:</label><InputField type="text" label="a_ort" ref="e_address_city" v-model="address_city" /></div>
    <div class="row"><label for="a_bundesland">Bundesland:</label><InputField type="text" label="a_bundesland" ref="e_address_state" v-model="address_state" /></div>
    <div class="row"><label for="a_land">Land:</label><InputField type="text" label="a_land" ref="e_address_country" v-model="address_country" /></div>
    <br />
    <h2>Kontakt</h2>
    <div class="row"><label for="vorstand">Vorstand:</label><InputField type="text" label="vorstand" ref="e_contact_board" v-model="contact_board" /></div>
    <div class="row"><label for="telefon">Telefon:</label><InputField type="text" label="telefon" ref="e_contact_phone" v-model="contact_phone" /></div>
    <div class="row"><label for="email">E-Mail:</label><InputField type="text" label="email" ref="e_contact_mail" v-model="contact_mail" /></div>
    <div class="row"><label for="website">Website:</label><InputField type="text" label="website" ref="e_contact_website" v-model="contact_website" /></div>
    <br />
    <div class="row"><VButton class="button" @click="onSubmit" /></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { axios, validate } from '@/helper'
import VButton from '@/components/VButton'
import InputField from '@/components/InputField'
import TextArea from '@/components/TextArea'

export default {
  name: 'CreateAssociation',
  components: {
    VButton,
    InputField,
    TextArea,
  },
  setup(){
    const router = useRouter()

    const formdata = {
      name: ref(''),
      year: ref(''),
      location: ref(''),
      description: ref(''),
      address_street: ref(''),
      address_streetNumber: ref(''),
      address_zipcode: ref(''),
      address_city: ref(''),
      address_state: ref(''),
      address_country: ref(''),
      contact_board: ref(''),
      contact_phone: ref(''),
      contact_mail: ref(''),
      contact_website: ref(''),
    }

    const elements = {
      e_name: ref(null),
      e_year: ref(null),
      e_location: ref(null),
      e_description: ref(null),
      e_address_street: ref(null),
      e_address_streetNumber: ref(null),
      e_address_zipcode: ref(null),
      e_address_city: ref(null),
      e_address_state: ref(null),
      e_address_country: ref(null),
      e_contact_board: ref(null),
      e_contact_phone: ref(null),
      e_contact_mail: ref(null),
      e_contact_website: ref(null),
    }

    const definitions = {
      name: { min: 3, max: 255, required: true, },
      address_zipcode: {
        type: validate.types.zipcode,
        required: true,
      }
    }

    const message = ref()

    const onSubmit = () => {
      let data = Object.fromEntries(Object.entries(formdata).map(([k, v]) => [k, v.value]))

      let valid = validate.validate({ definitions, elements, formdata })

      if(valid){
        axios().post('/associations/create/success', data).then((res) => {
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
    }

    return {
      message,
      ...formdata,
      ...elements,
      onSubmit,
    }
  },
}
</script>

<style lang="scss" scoped>
  label {
    display: inline-block;
    width: 150px;
    text-align: left;
    margin-top: 13px;
  }

  h2 {
    text-align: left;
  }

  .row {
    text-align: left;
    margin-bottom: 10px;
  }

  .row > * {
    vertical-align: top;
  }

  .button {
    margin-left: 150px;
  }
</style>
