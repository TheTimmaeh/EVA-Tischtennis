<template>
  <div class="association">
    <Card>
        <div class="header">
          <div class="primary-title">
            <div class="title"><b>{{ association.name }}</b></div>
          </div>
        </div>
        <div class="body">
          <tr><b>Gründungsjahr:</b> {{association.year}}  </tr>
          <tr><b>Adresse:</b><br>
              {{association.street}} {{association.streetnumer}}<br>
              {{association.zipcode}} {{association.city}}<br>
              {{association.state}} - {{association.country}}<br>
          </tr>
          <tr><b>Mail:</b> {{association.mail}} <br>
          </tr>
          <tr><b>Website:</b> {{association.url}} <br>
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
.list{
  padding: 20px;
}
tr{
  padding: 20px;
  margin: 10px;
}
.body{
  padding: 20px;
}
</style>
