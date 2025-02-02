<script setup lang="ts">
import { ref, watch } from 'vue';
import ResultPanel from './ResultPanel.vue';
import FansGroup from './FansGroup.vue';

const duplicateGroupName = ref('none');
const setDuplicateGroupName = (name) => duplicateGroupName.value = name;

</script>

<template>
  <div
    data-testid="VoteApp"
    class="flex justify-between p-2 bg-slate-100 text-black shadow-inner border border-slate-300 border border-slate-300"
  >
    <div>
      <ResultPanel />
      <div>
        <FansGroup name="Red" :index=0 />
        <FansGroup name="Blue" :index=1 />
        <br />
        <span class="px-6">Duplicated FANS area:</span>
        <div class="flex px-6 w-18 mt-2">
          <label class="radio-button">
            <input data-testid="checkbox-none" type="radio" :checked="duplicateGroupName === 'none'"  name="options" value="none" @click="setDuplicateGroupName('none')" />
            None
          </label>
          <label class="radio-button">
            <input data-testid="checkbox-Red" type="radio" :checked="duplicateGroupName === 'Red'"  name="options" value="Red" @click="setDuplicateGroupName('Red')" />
            Red
          </label>
          <label class="radio-button ml-6">
            <input data-testid="checkbox-Blue" type="radio" :checked="duplicateGroupName === 'Blue'"  name="options" value="Blue" @click="setDuplicateGroupName('Blue')" />
            Blue
          </label>
        </div>
        <FansGroup v-if="duplicateGroupName !== 'none'" :name="duplicateGroupName"  :index=2 />
        <p> {{duplicateGroupName}} !== 'none' ?? ={{duplicateGroupName !== 'none'}}</p>
      </div>
    </div>
  </div>
</template>
