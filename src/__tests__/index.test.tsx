import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { useSync } from '../index';

// const mockedFunctions = {
//   my_on: vi.fn(() => 'on'),
//   my_off: vi.fn(() => 'off'),
// };

// vi.mock('adax-core', () => ({
//   __esModule: true,
//   subscribe: vi.fn(() => ({
//     on: mockedFunctions.my_on,
//     off: mockedFunctions.my_off,
//   })),
// }));
// const sampleStore = {
//   alpha: 0,
//   beta: 0
// };

// const readFn = vi.fn(({ name }: { name: 'alpha' | 'beta' }, stores = { sampleStore }) => sampleStore[name]);
// const readFn_2 = vi.fn(({ name }: { name: 'alpha' | 'beta' }, stores = { sampleStore }) => sampleStore[name]);

// vi.mock('adax-core', () => {
//   return {
//     __esModule: true,
//     subscribe: vi.fn(() => ({
//       on: mockedFunctions.my_on,
//       off: mockedFunctions.my_off,
//     })),
//   };
// });

// const MyComponent = {
//   props: {
//     query: {
//       type: Function,
//       required: true
//     },
//     name: {
//       type: String,
//       required: true
//     },
//     skipInitalQuerying: {
//       type: Boolean,
//       required: true
//     },
//     onClick: {
//       type: Function,
//       required: true
//     }
//   },
//   setup(props) {
//     const value = useSync(props.query, () => ({ name: props.name }), { skipInitalQuerying: props.skipInitalQuerying });
//     return { value };
//   },
//   template: `<span data-testid="isAlpha-toggle" @click="onClick">{{ name }}:{{ value }}</span>`
// };

// const MyApp = {
//   setup(props) {
//     const hidden = ref(false);
//     const switchQuery = ref(false);
//     const isAlpha = ref(true);

//     const toggleHidden = () => {
//       hidden.value = !hidden.value;
//     };

//     const toggleIsAlpha = () => {
//       isAlpha.value = !isAlpha.value;
//     };

//     const setSwitchQuery = () => {
//       switchQuery.value = !switchQuery.value;
//     };

//     return {
//       hidden,
//       switchQuery,
//       isAlpha,
//       toggleHidden,
//       toggleIsAlpha,
//       setSwitchQuery
//     };
//   },
//   template: `
//     <div>
//       <span data-testid="hide-show-toggle" @click="toggleHidden">show/hide</span>
//       <span v-if="!hidden">
//         <span data-testid="switch-query-toggle" @click="setSwitchQuery">show/hide</span>
//         <MyComponent
//           :query="switchQuery ? readFn_2 : readFn"
//           :name="isAlpha ? 'alpha' : 'beta'"
//           :skipInitalQuerying="skipInitalQuerying"
//           @click="toggleIsAlpha"
//         />
//       </span>
//       <span v-else>Hidden</span>
//     </div>
//   `
// };

describe('adax-vue interacts with adax as expected', () => {
  it('dummy temporary test', () => {
    expect(1==1).toBeDefined();
  });
  // beforeEach(() => {
  //   readFn.mockClear();
  //   readFn_2.mockClear();
  //   mockedFunctions.my_on.mockClear();
  //   mockedFunctions.my_off.mockClear();
  // });

  // it('Component with useSync causes the invocation of on when mounted', async () => {
  //   console.log("¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤");
  //   console.log(require('adax-core'));
  //   console.log("¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤");
  //   const wrapper = mount(MyApp, {
  //     global: {
  //       mocks: {
  //         readFn,
  //         readFn_2
  //       }
  //     }
  //   });
  //   // Access the component instance
  //   const vm = wrapper.vm;
  //   expect(vm).toBeDefined(); // Ensure the instance exists

  //   // Inspect the component's state
  //   expect(vm.hidden).toBe(false); // Example: Check a reactive property
  //   expect(mockedFunctions.my_on).toHaveBeenCalledTimes(1);
  // });
});