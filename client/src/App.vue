<template>
  <v-app>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'


import { useDate } from 'vuetify/labs/date'

const date = useDate()
console.log(date.getMonth(new Date('March 1, 2021'))) // 3

</script>
