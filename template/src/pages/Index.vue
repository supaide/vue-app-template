<template>
<div>
  <mt-field label="邮箱" state="success" v-model="email"></mt-field>
  <mt-field label="邮箱" state="error" v-model="email"></mt-field>
  <mt-field label="邮箱" state="warning" v-model="email"></mt-field>
  <mt-cell title="goto home" is-link to="home?a=1"></mt-cell>
</div>
</template>
<script>
{{#if_eq dependency "byneed"}}
import {Field, Cell} from 'mint-ui'
{{/if_eq}}
export default {
  {{#if_eq dependency "byneed"}}
  components: {
    Field.name: Field,
    Cell.name: Cell
  },
  {{/if_eq}}
  data () {
    return {
      email: ''
    }
  }
}
</script>
