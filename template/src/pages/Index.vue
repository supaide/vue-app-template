<template>
  <div>
  <mt-field label="邮箱" state="success" v-model="email"></mt-field>
  <mt-field label="邮箱" state="error" v-model="email"></mt-field>
  <mt-field label="邮箱" state="warning" v-model="email"></mt-field>
  </div>
</template>
<script>
{{#if_eq dependency "byneed"}}
import {Field} from 'mint-ui'
{{/if_eq}}
export default {
  {{#if_eq dependency "byneed"}}
  components: {
    Field.name: Field
  },
  {{/if_eq}}
  data () {
    return {
      email: '',
      pname: ''
    }
  }
}
</script>
<style lang="less" scoped>
span {color: red;}
</style>
