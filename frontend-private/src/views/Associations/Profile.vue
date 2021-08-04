<template>
  <div class="association">
     <Card>
        <div class="header">
          <div class="primary-title">
            <div class="title">
              <div class="name">{{ association.name}}</div>
              <router-link  :to="`/persons/${association.board}/profile`">
                <Button>Vorsitzender</Button>
              </router-link>  
           </div>
          </div>
        </div>
        <div class="body">
          <tr>
            <td>Gründungsjahr: {{ association.year }}</td>
          </tr>
          <tr>
              <td :v-if='association.street' >Adresse: {{ association.street }} {{ association.streetnumber }} | {{ association.zipcode }} {{ association.city }} | {{ association.state }} {{ association.country }}</td>
          </tr>
          <tr>
              <td>Kontakt: {{ association.mail }} <br> {{ association.url }} </td>
          </tr>
          <tr>
              <td>Beschreibung: {{ association.description }}  </td> <br>
          </tr>
        </div>
    </Card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import { useRoute } from 'vue-router'
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'

export default {
  name: 'AssociationsProfile',
  components: {
    Button,
    Card,
  },
   props: {
      association: {
        type: Object,
      },
    },
  setup(){
    const route = useRoute()
    setTitle(`Verein ${route.params.associationId}`)

      const association = ref({})

      api(`/associations/${route.params.associationId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        association.value = res.data
      })

    return {
      Button,
      association,
    }
  },
}
</script>

<style lang="scss" scoped>

  .header{
      font-size: 18px;
      text-align: left;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      width:100%;
      min-height: 60px;
      padding: 16px;
      position: relative;
      border: 1px solid $color-mono-light;
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
    padding: 15px;
  }
  .body{
      padding: 16px;
      text-align: left;
      text-decoration: none;
      font-size: 14px;
      width: 120%;
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
  .name{
    display:inline-block;
    padding: 16px;
  }
  button{
    margin: 80px 16px;
  }
</style>
