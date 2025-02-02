<template>
    <div data-testid="ResultPanel">
      <div data-testid="winner">
        <span data-testid="winnerName">{{ data.winnerName }}</span>:
        <span data-testid="winnerScore">{{ data.winnerScore }}</span>
      </div>
      <div data-testid="runnerUp">
        <span data-testid="runnerUpName">{{ data.runnerUpName }}</span>:
        <span data-testid="runnerUpScore">{{ data.runnerUpScore }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useSync } from '../../index';
  import { getResult } from './facade';
  
  const data = useSync(()=>[getResult]);
  
  </script>
  
  <style scoped>
  /* Add any scoped styles here if needed */
  </style>