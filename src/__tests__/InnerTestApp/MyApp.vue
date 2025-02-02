<template>
    <div>
      <span 
        data-testid="hide-show-toggle" 
        @click="toggleHidden"
      >
        show/hide
      </span>
      <template v-if="!hidden">
        <span 
          data-testid="switch-query-toggle" 
          @click="toggleSwitchQuery"
        >
          show/hide
        </span>
        <MyComponent
          :query="switchQuery ? readFn_2 : readFn"
          :name="isAlpha ? 'alpha' : 'beta'"
          :skip-inital-querying="!!skipInitalQuerying"
          @click="toggleIsAlpha"
        />
      </template>
      <span v-else>Hidden</span>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import MyComponent from './MyComponent.vue';
  
  const props = defineProps({
    readFn: Function,
    readFn_2: Function,
    skipInitalQuerying: {
      type: Boolean,
      default: false
    }
  });
  
  const hidden = ref(false);
  const switchQuery = ref(false);
  const isAlpha = ref(true);
  
  const toggleHidden = () => (hidden.value = !hidden.value);
  const toggleSwitchQuery = () => (switchQuery.value = !switchQuery.value);
  const toggleIsAlpha = () => (isAlpha.value = !isAlpha.value);
  </script>