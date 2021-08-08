<template>
    <Card class="personCard">
        <div class="header">
          <div class="primary-title">
            <div class="title">{{ data.name }} {{ data.surname }}</div>
          </div>
        </div>
        <div class="body">
          <tr>
            <td v-if="data.gender === 'm'">Geschlecht: Männlich</td>
            <td v-if="data.gender === 'f'">Geschlecht: Weilblich</td>
            <td v-if="data.gender === 'd'">Geschlecht: Divers</td>
            <td>Geburtsdatum: {{ data.birthday }}</td>
          </tr>
          <tr>
              <td>Adresse: {{ data.street }} {{ data.streetnumber }} | {{ data.zipcode }} {{ data.city }} | {{ data.state }} {{ data.country }}</td>
          </tr>
          <tr>
              <td>Kontakt: {{ data.phone }} | {{ data.mail }} </td>
          </tr>
        </div>
    </Card>
</template>

<script>
  import { computed } from 'vue'
  import { ref } from 'vue'
  import { api, setTitle } from '@/helper'
  import { useRoute } from 'vue-router' 
  import Button from '@/components/FormElements/Button'
  import Card from '@/components/Cards/Card'

  export default {
    name: 'PersonCard',
    components: {
      Button,
      Card,
    },
     props: {
       data: {
        type: Object,
        required: true,
      },
    },
    setup(props){
      const route = useRoute()
      const person = ref({})

      api(`/persons/${route.params.personId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        person.value = res.data
      })

      return {
        ...props.data,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .personCard{
    padding-top: 15px;;
  }
  .header{
      font-size: 18px;
      text-align: left;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      width:100%;
      min-height: 40px;
      padding: 16px;
      position: relative;
      border-width: 0 0 1px;
  }
  .header .primary-title{
    bottom: auto;
    display: inline-block;
    padding: 0;
    position: absolute;
    top: 50%;
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .title {
    font-size: 14px;
    font-weight:bold;
  }
  .body{
      padding: 16px;
      text-align: left;
      text-decoration: none;
      font-size: 14px;
      width:100%;
      line-height: 1.5;
      border-width: 0 0 1px;
  }
  td{
      text-align: inherit;
      display: table-cell;
      width: 30em;
  }
  tr{
      text-align: inherit;
  }
  .min {
      width: 1%;
      white-space: nowrap;
  }
</style>
