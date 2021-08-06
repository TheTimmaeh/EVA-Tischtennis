<template>
<div class="match">
    <div class="split left">
        <div class="centered">
            <h2>Spieler 1</h2>
            <p>Spielerklasse - Verein </p>
            <p>Punktestand {{ home_score }}</p>
            <Button class="button" level="danger">Disqualifizieren</Button>

            <Button class="button">Weiße Karte</Button>
            <Button class="button">Gelbe Karte</Button>
            <Button class="button">Rote Karte</Button><br>

            <Button class="button" @click="action('score', { player: 'home' })">Punkt hinzufügen</Button>
            <Button class="button" @click="score1--">Punkt abziehen</Button>
        </div>
    </div>

    <div class="split right">
        <div class="centered">
            <h2>Spieler 2</h2>
            <p>Spielerklasse - Verein</p>
            <p>Punktestand {{ visitor_score }}</p>
            <Button class="button" level="danger">Disqualifizieren</Button>

            <Button class="button">Weiße Karte</Button>
            <Button class="button">Gelbe Karte</Button>
            <Button class="button">Rote Karte</Button><br>

            <Button class="button" @click="action('score', { player: 'visitor' })">Punkt hinzufügen</Button>
            <Button class="button" @click="score2--">Punkt abziehen</Button>
        </div>
    </div>
    <div class="submit">
        <Button class="button" >Spiel starten </Button>
        <Button class="button" >Erebnis Speichern und Spiel beenden </Button>
    </div>
</div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setTitle, useSocket } from '@/helper'
import Button from '@/components/FormElements/Button'

export default {
  name: 'match',
  components: {
    Button,
  },
  setup(){
    setTitle('Aktuelles Match')

    const route = useRoute()
    const router = useRouter()
    const socket = useSocket()
    const active = ref(false)
    const setId = ref()
    const home_score = ref(0)
    const visitor_score = ref(0)

    try {
      socket.on('confirmAction', (data) => {
        if(data.type === 'score'){
          if(data.player === 'home') home_score.value++
          else if(data.player === 'visitor') visitor_score.value++
        }
      })

      socket.on('setData', (data) => {
        if(data.error){
          console.error(data.error)
          router.push(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches`)
        } else {
          setId.value = data.id
          home_score.value = data.home_score
          visitor_score.value = data.visitor_score
          active.value = true
        }
      })

      socket.on('setEnd', (winner) => {
        console.log('Set beendet.', { winner })
        active.value = false
         // Fenster öffnen
         //
         // wenn Fenster geschlossen wird: active.value = true
         //
         // ansonsten: socket.emit('getSet', { match: route.params.matchId })
         //
         // wenn kein Set mehr benötigt: router.push(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches`)
      })

      socket.emit('getSet', { match: route.params.matchId })

    } catch(err){
      console.error(err)
      router.push(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches`)
    }

    const action = (type, data) => {
      if(active.value) socket.emit('action', { set: setId.value, type, ...data })
    }

    onUnmounted(() => {
      socket.off('confirmAction')
      socket.off('setData')
      socket.off('setEnd')
    })

    return {
      home_score,
      visitor_score,
      action,
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
