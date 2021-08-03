<template>
  <router-link class="competitionsCard" :to="`/competitions/${data.id}`">
    <Card>
      <div class="title">
        Turnier: {{ data.name }}
      </div>
      <div class="description">
        <div class="playerClass"> Spielerklasse: {{playerClass.name}} </div>
         </div>
      <div class="actions">
        <router-link :to="`/competitions/${data.id}/update`">
          <Button><Icon type="edit" /></Button>
        </router-link>&nbsp;
        <router-link :to="`/competitions/${data.id}/delete`">
          <Button level="danger"><Icon type="delete" /></Button>
        </router-link>
      </div>
    </Card>
  </router-link>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { api, setTitle, validate } from '@/helper'
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
import Icon from '@/components/Icons/Icon'
import { ref } from 'vue'

export default {
  name: 'CompetitionCard',
  components:{
    Button,
    Card,
    Icon,
    },
  props: {
      data: {
        type: Object,
        required: true,
      },
    },setup(props){
      const playerClass = ref([])

      api(`/playerClasses/${props.data.player_class}`).then((res) => res.data).then((res) => {

        if(!res.success){
          console.error('Fehler...', res)
         return
        }

        playerClass.value = res.data
      })

     

    return {
      playerClass,
    }
      
    },
  }
</script>

<style lang="scss" scoped>
  .competitionsCard {
    display: block;
    width: 300px;
    margin: 10px;

    .title {
      border-bottom: 1px solid $color-mono-light;
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
      height: 40px;
      padding-bottom: 8px;
      display: flex;
      align-items: center;
    }

    .description {
      padding-top: 8px;

      & > div {
        line-height: 28px;
      }
    }

    .playerClass {
      display: flex;
      align-items: center;
    }

    .actions {
      padding-top: 8px;
      text-align: center;
    }

    .label {
      display: inline-block;
      min-width: 200px;
    }

    .value {
      display: inline-block;
      min-width: 46px;
      text-align: right;
    }
  }
</style>
