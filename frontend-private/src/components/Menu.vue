<template>
  <div class="menu">
    <Page>
      <slot></slot>
    </Page>
  </div>
</template>

<script>
  import Page from '@/components/Page'

  export default {
    name: 'Menu',
    components: {
      Page,
    },
  }
</script>

<style lang="scss">
  .menu {
    background-color: #e0e0e0;
    height: 40px;
    margin-bottom: 20px;

    display: flex;
    align-items: center;

    a {
      height: 40px;
      padding: 0 20px;
      margin: 0 4px;

      font-size: 14px;

      display: inline-flex;
      align-items: center;

      font-weight: bold;
      color: $color-mono-dark;

      &:hover {
        background-color: $color-fade-grey;
      }

      &.router-link-exact-active {
        color: $color-highlight;
      }
    }
  }
</style>
