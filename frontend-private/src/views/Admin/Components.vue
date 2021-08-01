<template>
  <div class="components">
    <h2>Buttons</h2>
    <Button class="button">Einfacher Button</Button>
    <Button class="button" @action="clicked++">Einfacher Button mit Action ({{ clicked }}x geklickt)</Button>
    <Button class="button" level="danger">Button mit Level <strong>danger</strong></Button>
    <Button class="button" level="warning">Button mit Level <strong>warning</strong></Button>
    <Button class="button"></Button>
    <br /><br />
    <h2>Inputs</h2>
    <label for="input1">Input 1:</label><InputField label="input1" placeholder="Text Input" v-model="input1" /><br />
    Eingabe: <pre>{{ input1 }}</pre><br />
    <label for="input2">Input 2:</label><InputField type="password" label="input2" placeholder="Password Input" level="warning" /><br />
    <label for="input3">Input 3:</label><InputField type="number" label="input3" placeholder="Number Input" level="danger" /><br />
    <br /><br />
    <h2>Search</h2>
    <label for="search1">Search 1:</label><SearchField label="search1" placeholder="Search Input" apiPath="/persons" displayFormat="{{ id }} - {{ name }} {{ surname }}" :lookupRow="['name', 'surname']" returnPath="id" v-model="search1" displayValue="Test" /><br />
    Auswahl: <pre>{{ search1 }}</pre><br />
    <label for="search2">Search 2:</label><SearchField label="search2" placeholder="Search Input 2" apiPath="/persons" displayFormat="{{ id }} - {{ name }} {{ surname }}" :lookupRow="['name', 'surname']" returnPath="id" v-model="search1" displayValue="Test" /><br />
    Auswahl: <pre>{{ search1 }}</pre><br />
    <br /><br />
    <h2>TextArea</h2>
    <label for="textarea1">Textarea 1:</label><TextArea label="textarea1" placeholder="Textarea Input" v-model="input2" /><br />
    Eingabe: <pre>{{ input2 }}</pre><br />
    <label for="textarea2">Textarea 2:</label><TextArea label="textarea2" level="warning" v-model="beispieltext" /><br />
    <label for="textarea1">Textarea 3:</label><TextArea label="textarea3" level="danger" autoresize="false" /><br />
    <label for="seasonSelect">Saison auswählen:</label><SeasonSelect label="seasonSelect" v-model="season"></SeasonSelect><br />
    Season Wert: {{ season }}<br />
    <!-- <PlayerCard></PlayerCard><br />
    <PlayerClassCard></PlayerClassCard><br />
    <AssociationCard></AssociationCard><br /> -->
    <!-- <SeasonCard></SeasonCard><br /> -->
    <Table :content="content" :titles="titles"></Table><br />
  </div>
</template>

<script>
import { ref } from 'vue'
import { setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import InputField from '@/components/FormElements/InputField'
import SearchField from '@/components/FormElements/SearchField'
import TextArea from '@/components/FormElements/TextArea'
import SeasonSelect from '@/components/FormElements/Selects/SeasonSelect'
import PlayerCard from '@/components/Cards/PlayerCard'
import PlayerClassCard from '@/components/Cards/PlayerClassCard'
import SeasonCard from '@/components/Cards/SeasonCard'
import AssociationCard from '@/components/Cards/AssociationCard'
import Table from '@/components/Tables/Table'

export default {
  name: 'Components',
  components: {
    Button,
    InputField,
    SearchField,
    TextArea,
    SeasonSelect,
    PlayerCard,
    PlayerClassCard,
    SeasonCard,
    AssociationCard,
    Table,
  },
  setup(){
    setTitle('Components')
    let clicked = ref(0)
    let input1 = ref('')
    let input2 = ref('')
    let search1 = ref('')
    let season = ref('wi')

    return {
      clicked,
      input1,
      input2,
      search1,
      season,
      beispieltext: `Dies
ist
ein
Beispieltext`,
      members: [
        { id: 1, name: 'Tim', surname: 'Elbert', association: 'Mannschaft 1' },
        { id: 2, name: 'Tina', surname: 'Hänsel', association: 'Mannschaft 2' },
      ],
      titles: [
        { id: 1, text: 'Name' },
        { id: 2, text: 'Nachname'},
      ],
      content: [
        { id: 1, content: ['Tim', 'Elbert'] },
        { id: 2, content: ['Tina', 'Hänsel'] },
      ],

    }
  },
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 0 4px;
  }
</style>
