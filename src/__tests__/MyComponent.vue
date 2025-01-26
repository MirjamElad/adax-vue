<template>
    <span data-testid="isAlpha-toggle" @click="handleClick">{{ `${name}:${value}` }}</span>
  </template>
  
  <script setup>
  import { useSync } from '../index';
  
  const props = defineProps({
    query: Function,
    name: {
      type: String,
      validator: v => ['alpha', 'beta'].includes(v)
    },
    skipInitalQuerying: Boolean,
    onClick: Function
  });
  
  const value = useSync(props.query, () => ({ name: props.name }), { skipInitalQuerying: props.skipInitalQuerying });
  
  const handleClick = () => {
    props.onClick?.();
  };
  </script>