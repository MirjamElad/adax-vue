<script setup lang="ts">
import { defineProps } from 'vue';
import { getMood, voteFor } from './facade';
import { useSync, trigger } from 'adax-vue';

const props = defineProps(['name', 'index']);

const data = useSync(() => [getMood, ({ name: props.name })]);
function vote() {
  trigger(voteFor, { name: props.name });
}
</script>
<template>
  <div class="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 my-2">
    <div>{{ name }} FANS = <span :data-testid="`mood-${props.index}`">{{ data?.mood }}</span></div>
    <button
      @click="vote"
      :data-testid="`btn-${props.index}`"
      class="bg-blue-300 mt-4 px-4 py-2 rounded-lg border border-slate-500 shadow-2xl"
    >
      Click to Vote
    </button>
  </div>
</template>

<style>
button,
a {
  display: block;
  margin-bottom: 1em;
}
</style>
