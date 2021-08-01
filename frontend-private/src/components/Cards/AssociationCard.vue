<template>
  <router-link class="associationCard" :to="`/associations/${data.id}`">
    <Card>
      <div class="title">
        {{ data.name }}
      </div>
      <div class="description">
        <div class="location"><Icon type="location" primaryColor="#000000" secondaryColor="#000000" /> {{ data.location }}</div>
        <div class="teams"><router-link :to="`/associations/${data.id}/teams`"><span class="label">Mannschaften:</span><span class="value">{{ teams?.length }}</span></router-link></div>
        <div class="members"><router-link :to="`/associations/${data.id}/members`"><span class="label">Mitglieder:</span><span class="value">{{ members?.length }}</span></router-link></div>
      </div>
      <div class="actions">
        <router-link :to="`/associations/${data.id}/update`">
          <Button><Icon type="edit" /></Button>
        </router-link>&nbsp;
        <router-link :to="`/associations/${data.id}/delete`">
          <Button level="danger"><Icon type="delete" /></Button>
        </router-link>
      </div>
    </Card>
  </router-link>
</template>

<script>
  import { computed } from 'vue'
  import { ref } from 'vue'
  import { api } from '@/helper'
  import Icon from '@/components/Icons/Icon'
  import Button from '@/components/FormElements/Button'
  import Card from '@/components/Cards/Card'

  export default {
    name: 'AssosciationCard',
    components: {
      Button,
      Card,
      Icon,
    },
     props: {
      data: {
        type: Object,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props){
      const teams = ref([])

      api(`/associations/${props.id}/teams`).then((res) => res.data).then((res) => {

        if(!res.success){
          console.error('Fehler...', res)
         return
        }

        teams.value = res.data
      })

      const members = ref([])

      api(`/associations/${props.id}/members`).then((res) => res.data).then((res) => {

        if(!res.success){
          console.error('Fehler...', res)
         return
        }

        members.value = res.data
      })


    return {
      teams,
      members,
    }
      return {
        ...props.data,
      }
    },
  }
</script>

<style lang="scss">
  .associationCard {
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

    .location {
      display: flex;
      align-items: center;

      & > svg {
        height: 20px;
        margin-right: 5px;
      }
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
