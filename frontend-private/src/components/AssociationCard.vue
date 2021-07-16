<template>
  <router-link :to="`/associations/${id}`">
    <Card>
        <div class="header">
          <div class="primary-title">
            <div class="title">{{ name }}</div>
          </div>
        </div>
        <div class="body">
          <tr>
            <td>Ort: {{ location }}</td>
            <td><router-link :to="`/associations/${id}/playerClasses`">Mannschaften: {{ playerClasses?.length }}</router-link></td>
            <td><router-link :to="`/associations/${id}/members`">Mitglieder: {{ members?.length }}</router-link></td>
            <router-link :to="`/associations/${id}/update`">
              <Button>Bearbeiten</Button> <br>
            </router-link><br/>
          </tr>
        </div>
    </Card>
  </router-link>
</template>

<script>
  import { computed } from 'vue'
  import { ref } from 'vue'
  import Button from '@/components/Button'
  import Card from '@/components/Card'

  export default {
    name: 'AssosciationCard',
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
      return {
        ...props.data,
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
    min-height: 40px;
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
}
.body{
    color:$color-light-text;
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
