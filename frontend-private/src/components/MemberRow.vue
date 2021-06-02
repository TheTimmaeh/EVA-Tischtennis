<template>
    <div class="row">
            <tr>
                <td>
                    {{name}}
                </td>
                <td>
                    {{surname}}
                </td>
                <td>
                    {{association}}
                </td>
                <td>
                    <Button>
                    </Button>
                </td>
            </tr>
    </div>
</template>

<script>

import Button from "./Button";
import { ref } from 'vue'

export default {
  name: 'MemberRow',
  components:{Button},
  setup(){
    let name = ref('Vorname')
    let surname = ref('Nachname')
    let association = ref('Mannschaft')
    return {
      name,
      surname,
      association
    }
  },
}
</script>

<style lang="scss" scoped>

Button{
    margin: 10px 20px;
}

td{
    text-align: inherit;
    display: table-cell;
    padding: 8px 12px;
    width: 30em;
}

tr{
    padding: 8px 12px;
    text-align: inherit;
}

.row{
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;

    &:hover{
      box-shadow: 0 4px 4px 0 $color-info;
  }
}
</style>