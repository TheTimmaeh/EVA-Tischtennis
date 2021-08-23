<template>
  <Card class="matchCard">
    <table @click="clicked = !clicked">
      <tr>
        <td>
          <b>Heimspieler:</b> <br>
          {{ data.home_player_1.name}} {{ data.home_player_1.surname }}
          <template v-if="data.home_player_2"><br>
          {{ data.home_player_2.name }} {{ data.home_player_2.surname }}
          </template>
        </td>
        <td>
          <b>Gastpieler:</b> <br>
          {{ data.visitor_player_1.name }} {{ data.visitor_player_1.surname }}
          <template v-if="data.visitor_player_2"><br>
          {{ data.visitor_player_2.name }} {{ data.visitor_player_2.surname }}
          </template>
        </td>
        <template v-if="Math.max(data.home_score, data.visitor_score) > 0">
          <td class="score min pleft">{{ data.home_score }}</td>
          <td class="score min pcenter">:</td>
          <td class="score min pright">{{ data.visitor_score }}</td>
        </template>
        <template v-else>
          <td class="score min pright">TBD</td>
        </template>
        <td class="min" v-if="isAdmin || (isMine && !isDone)">
          <router-link v-if="isAdmin" :to="`/competitions/${$route.params.competitionId}/encounters/${$route.params.encounterId}/matches/${id}/update`">
            <Button><Icon type="edit" /></Button>
          </router-link>&nbsp;
          <router-link v-if="isMine && !isDone" :to="`/competitions/${$route.params.competitionId}/encounters/${$route.params.encounterId}/matches/${id}`">
            <Button><Icon type="tabletennis" /> Starten</Button>
          </router-link>
        </td>
      </tr>
    </table>
    <table v-if="data.sets.length > 0" class="setScore">
      <tr>
        <th>Set 1</th>
        <th>Set 2</th>
        <th>Set 3</th>
        <th>Set 4</th>
        <th>Set 5</th>
      </tr>
      <tr>
        <td v-for="(set, index) in data.sets" :key="set.id">
          <template v-if="Math.max(set.home_score, set.visitor_score) > 0">{{set.home_score}} : {{set.visitor_score}} </template>
          <template v-else-if="isDone"> / </template>
          <template v-else>TBD</template>
        </td>
      </tr>
    </table>
  </Card>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import Card from '@/components/Cards/Card'
  import Icon from '@/components/Icons/Icon'
  import Table from '@/components/Tables/Table'

  export default {
    name: 'MatchCard',
    components:{
      Button,
      Card,
      Icon,
      Table,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    setup(props){
      const store = useStore()
      let isAdmin = computed(() => !!store?.state?.user?.isAdmin)
      let isMine = computed(() => !!props?.data?.referee && props.data.referee == store?.state?.user?.id)
      let isDone = computed(() => Math.max(props?.data?.home_score, props?.data?.visitor_score) > 2)

      const clicked = ref(false)

      return {
        ...props.data,
        clicked,
        isAdmin,
        isMine,
        isDone,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .setScore{
    padding-top: 15px;

    td{
      text-align: center;
    }

    th{
      text-align: center;
    }
  }
  .matchCard{
    width: 80%;
    margin: 10px;
  }
  tr{
      text-align: inherit;
  }
  td{
      text-align: inherit;
      display: table-cell;
      width: 30em;
  }
  .min {
      width: 1%;
      white-space: nowrap;
  }

  .score {
    font-size: 200%;
    font-weight: 700;
    vertical-align: middle;
  }

  .pleft {
    padding-left: 20px;
  }

  .pcenter {
    padding-right: 5px;
    padding-left: 5px;
  }

  .pright {
    padding-right: 20px;
  }
</style>
