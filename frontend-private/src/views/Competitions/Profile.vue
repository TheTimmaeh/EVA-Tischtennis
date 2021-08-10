<template>
<Page>
    <div class="competition">
      <Card>
          <div class="header">
              <div class="primary-title">
                <div class="title">
                  <div class="name">{{ competition.name }}</div>
              </div>
            </div>
          </div>
          <div class="body">
            <table>
              <tr>
                <td>Saison: {{ competition.season }}</td>
              </tr>
              <tr>
                <td>Spielerklasse: {{ competition.player_class }}</td>
              </tr>
              <tr>
                <td>Beschreibung: {{ competition.description }}</td>
              </tr>
            </table>
          </div>
      </Card>
    </div>
  </Page>
</template>

<script>
  import {  useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { api, setTitle } from '@/helper'
  import Page from '@/components/Page'
  import Button from '@/components/FormElements/Button'
  import Card from '@/components/Cards/Card'
  import CompetitionTable from '@/components/Tables/CompetitionTable'

export default {
  name: 'CompetitionsProfile',
  components: {
    Page,
    Button,
    Card,
    CompetitionTable,
  },
   props: {
    },
  setup(){
    const route = useRoute()
    setTitle(`Turnier ${route.params.competitionId}`)

      const competition = ref({})
      const encounters = ref({})

      api(`/competitions/${route.params.competitionId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }
        competition.value = res.data
      })
      
    return {
      Button,
      competition,
    }
  },
}
</script>

<style lang="scss" scoped>
  .competition{
    padding-top: 8px;
  }
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
