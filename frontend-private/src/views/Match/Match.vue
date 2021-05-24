<template>
<div class="match">
    <div class="split left">
        <div class="centered">
            <h2>Spieler 1</h2>
            <p>Spielerklasse - Verein </p>
            <p>Punktestand {{ score1 }}</p>
            <VButton class="button" level="danger">Disqualifizieren </VButton>
            <VButton class="button" level="warning">Verwarnen </VButton> <br>

            <VButton class="button" @action="score1++">Punkt hinzufügen </VButton>
            <VButton class="button" @action="score1--">Punkt abziehen </VButton>
        </div>
    </div>

    <div class="split right">
        <div class="centered">
            <h2>Spieler 2</h2>
            <p>Spielerklasse - Verein</p>
            <p>Punktestand {{ score2 }}</p>
            <VButton class="button" level="danger">Disqualifizieren </VButton>
            <VButton class="button" level="warning">Verwarnen </VButton> <br>

            <VButton class="button" @action="score2++">Punkt hinzufügen </VButton>
            <VButton class="button" @action="score2--">Punkt abziehen </VButton>

      
        </div>
    </div>
    <div class="submit"> 
        <VButton class="button" >Erebnis Speichern und Spiel beenden </VButton>
    </div>
</div>
</template>

<script>

import { ref } from 'vue'
import VButton from '@/components/VButton'

export default {
  name: 'match',
  components: {
    VButton,
  },
  setup(){
    let score1 = ref(0);
    let score2 = ref(0);

    return {
      score1,
      score2
    }
  },
}


</script>

<style lang="scss" scoped>
.split {
  height: 80%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 20%;
  overflow-x: hidden;
  padding-top: 20px;
}

/*  left side */
.left {
  left: 0;
  background-color: $color-mono-dark;
  color: $color-light-text;
}

/* right side */
.right {
  right: 0;
  background-color: $color-fade-grey;
}

/*  content centered horizontally and vertically */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.submit{
    background-color: $color-fade-grey;
    z-index: 1;
    top:10%;
}

.button{
    margin: 10px;
}

</style>