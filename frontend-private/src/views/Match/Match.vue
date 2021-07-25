<template>
<div class="match">
    <div class="split left">
        <div class="centered">
            <h2>Spieler 1</h2>
            <p>Spielerklasse - Verein </p>
            <p>Punktestand {{ score1 }}</p>
            <Button class="button" level="danger">Disqualifizieren </Button>
            <Button class="button" level="warning">Verwarnen </Button> <br>

            <Button class="button" >Weiße Karte </Button>
            <Button class="button" >Gelbe Karte </Button>
            <Button class="button" >Rote Karte </Button><br>

            <Button class="button" @action="score1++">Punkt hinzufügen </Button>
            <Button class="button" @action="score1--">Punkt abziehen </Button>
        </div>
    </div>

    <div class="split right">
        <div class="centered">
            <h2>Spieler 2</h2>
            <p>Spielerklasse - Verein</p>
            <p>Punktestand {{ score2 }}</p>
            <Button class="button" level="danger">Disqualifizieren </Button>
            <Button class="button" level="warning">Verwarnen </Button> <br>

            <Button class="button" >Weiße Karte </Button>
            <Button class="button" >Gelbe Karte </Button>
            <Button class="button" >Rote Karte </Button><br>

            <Button class="button" @action="score2++">Punkt hinzufügen </Button>
            <Button class="button" @action="score2--">Punkt abziehen </Button>


        </div>
    </div>
    <div class="submit">
        <Button class="button" >Spiel starten </Button>
        <Button class="button" >Erebnis Speichern und Spiel beenden </Button>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'

export default {
  name: 'match',
  components: {
    Button,
  },
  setup(){
    setTitle('Aktuelles Match')
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
  background-color: $color-background;
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
