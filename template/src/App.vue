<template>
<div id="app">
  <mt-button size="small" type="primary" @click.native="$router.goto('index')">Index</mt-button>
  <mt-button size="small" type="danger" @click.native="$router.goto('home')">Home</mt-button>
  <mt-button size="small" type="primary" @click.native="$router.goto('my')">My</mt-button>
  <page-view></page-view>
</div>
</template>
