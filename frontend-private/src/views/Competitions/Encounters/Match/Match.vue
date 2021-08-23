<template>
  <div :class="{ open: isMessageOpen }">
    <div class="match">
      <div class="home">
        <div class="details">
          {{ home_players }}<br />
          <small>{{ home_team }}</small>
        </div>
        <div class="score">
          {{ home_score }}
        </div>
        <div :class="[ 'actionmenu', { open: isOpenHome }]">
          <div class="button sub">
            <div><Icon type="card" primaryColor="#FFFFFF" /></div>
          </div>
          <div class="button sub">
            <div><Icon type="card" primaryColor="#FFFF00" /></div>
          </div>
          <div class="button sub">
            <div><Icon type="card" primaryColor="#FF0000" /></div>
          </div>
          <div class="button" @click="action('score', { player: 'home' })">
            <div><Icon type="plus" primaryColor="#363D40" secondaryColor="#363D40" /></div>
          </div>
          <div class="button" @click="openHome()">
            <div><Icon type="more" primaryColor="#363D40" :primaryOpacity="(isOpenHome ? 1 : 0.6)" /></div>
          </div>
          <div class="button" @click="action('scoreSub', { player: 'home' })">
            <div><Icon type="minus" primaryColor="#363D40" /></div>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="visitor">
        <div class="details">
          {{ visitor_players }}<br />
          <small>{{ visitor_team }}</small>
        </div>
        <div class="score">
          {{ visitor_score }}
        </div>
        <div :class="[ 'actionmenu', { open: isOpenVisitor }]">
          <div class="button sub">
            <div><Icon type="card" primaryColor="#FFFFFF" /></div>
          </div>
          <div class="button sub">
            <div><Icon type="card" primaryColor="#FFFF00" /></div>
          </div>
          <div class="button sub">
            <div><Icon type="card" primaryColor="#FF0000" /></div>
          </div>
          <div class="button" @click="action('score', { player: 'visitor' })">
            <div><Icon type="plus" primaryColor="#363D40" secondaryColor="#363D40" /></div>
          </div>
          <div class="button" @click="openVisitor()">
            <div><Icon type="more" primaryColor="#363D40" :primaryOpacity="(isOpenVisitor ? 1 : 0.6)" /></div>
          </div>
          <div class="button" @click="action('scoreSub', { player: 'visitor' })">
            <div><Icon type="minus" primaryColor="#363D40" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="endMessage">
      <div class="title">Das Set wurde beendet.</div>
      <div class="actions">
        <router-link :to="`/competitions/${$route.params.competitionId}/encounters/${$route.params.encounterId}/matches`">
          <Button level="danger"><Icon type="angleleft" />Begegnungen</Button>
        </router-link>&nbsp;
        <Button level="grey" @click="closeMessage()"><Icon type="deny" /> Schließen</Button>
        <template v-if="nextSet">
          &nbsp;<Button @click="goToNextSet()"><Icon type="angleright" /> Nächstes Set</Button>
        </template>
      </div>
    </div>
  </div>
  <Button style="position: fixed; buttom: 10px; right: 10px;" @click="isMessageOpen = true">Test</Button>
</template>

<script>
  import { ref, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { setTitle, useSocket } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import Icon from '@/components/Icons/Icon'

  export default {
    name: 'match',
    components: {
      Button,
      Icon,
    },
    setup(){
      setTitle('Aktuelles Match')

      const route = useRoute()
      const router = useRouter()
      const socket = useSocket()
      const active = ref(false)
      const setId = ref()
      const nextSet = ref(null)

      const home_players = ref('')
      const home_team = ref('')
      const home_score = ref(0)

      const visitor_players = ref('')
      const visitor_team = ref('')
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

            home_players.value = data.match.home_players
            home_team.value = data.match.home_team
            home_score.value = data.home_score

            visitor_players.value = data.match.visitor_players
            visitor_team.value = data.match.visitor_team
            visitor_score.value = data.visitor_score
            active.value = true
          }
        })

        socket.on('setEnd', (data) => {
          nextSet.value = data.nextSet
          openMessage()
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

      const isMessageOpen = ref(false)
      const openMessage = () => {
        active.value = false
        isMessageOpen.value = true
      }
      const closeMessage = () => {
        active.value = true
        isMessageOpen.value = false
      }

      const goToNextSet = () => {
        socket.emit('getSet', { match: route.params.matchId })
        closeMessage()
      }

      const isOpenHome = ref(false)
      const openHome = () => isOpenHome.value = !isOpenHome.value
      const isOpenVisitor = ref(false)
      const openVisitor = () => isOpenVisitor.value = !isOpenVisitor.value

      return {
        home_players,
        home_team,
        home_score,
        visitor_players,
        visitor_team,
        visitor_score,
        action,
        isMessageOpen,
        closeMessage,
        isOpenHome,
        openHome,
        isOpenVisitor,
        openVisitor,
        nextSet,
        goToNextSet,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .match {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 140px);
    display: flex;
    justify-content: space-around;

    & > div:not(.separator) {
      padding-top: 20px;

      display: flex;
      flex-direction: column;
      justify-content: space-between
    }

    filter: blur(0px) grayscale(0);
    transition: filter 0.2s;

    .open > & {
      filter: blur(2px) grayscale(1);
    }
  }

  .details {
    line-height: 1.5;
    font-size: 150%;
  }

  .score {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 400%;
    font-weight: 700;
  }

  .actionmenu {
    display: grid;
    grid-template-columns: min(15vw, 25vh) min(15vw, 25vh) min(15vw, 25vh);
    grid-template-rows: min(15vw, 25vh) min(15vw, 25vh);
    column-gap: 3px;
    row-gap: 3px;
  }

  .separator {
    width: 3px;
    border-radius: 3px;
    margin: 10px 0;
    background-color: $color-mono-light;
  }

  .button {
    background-color: $color-mono-light;
    user-select: none;
    cursor: pointer;

    height: min(15vw, 25vh);
    width: min(15vw, 25vh);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    &:hover {
      background-color: $color-mono-darker;
    }

    &.sub {
      transform: translateY(calc(100% + 3px));
      opacity: 0;
      transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
      z-index: 1;

      .actionmenu.open & {
        transform: translateY(0%) scale(1);
        opacity: 1;
      }
    }

    & > div {
      height: 33%;
      width: 33%;
    }
  }

  .endMessage {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    padding: 20px;
    background-color: white;
    border: 2px solid $color-mono-dark;

    transform: translate(-50%, 50%);
    opacity: 0;
    user-select: none;
    pointer-events: none;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

    .open > & {
      transform: translate(-50%, -50%);
      opacity: 1;
      pointer-events: all;
    }

    .title {
      margin-bottom: 40px;
    }
  }
</style>
