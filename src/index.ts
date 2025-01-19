import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  getCurrentInstance,
} from 'vue';
import { subscribe, type Result, type QueryOptions } from 'adax-core';
export { trigger, addRule } from 'adax-core';

export const useSync = <FnType extends (x: any) => any>(
  readFn: FnType,
  getParamsObj?: () => Parameters<FnType>[0] | undefined,
  options: QueryOptions = {}
): Readonly<ReturnType<FnType>> => {
  console.info('adax-vue:useSync...');
  const isMounted = ref(false);
  const result = ref<Readonly<ReturnType<FnType>>>(
    options?.skipInitalQuerying
      ? undefined
      : readFn(getParamsObj ? getParamsObj() : undefined)
  );
  
  const readTrigger = (res: Result) => {
    console.info('adax-vue:readTrigger...');
    return (result.value = res.data)
  };
  let sub = subscribe(
    readTrigger,
    readFn,
    getParamsObj ? getParamsObj() : undefined,
    {
      ...options,
      skipInitalQuerying: true,
    }
  );

  const instance = getCurrentInstance();
  let propsToWatch = { ...instance?.props };

  watch(
    () => ({ ...instance?.props }),
    (newProps) => {
      for (const key in newProps) {
        if (newProps[key] !== propsToWatch[key]) {
          sub.off();
          sub = subscribe(
            readTrigger,
            readFn,
            getParamsObj ? getParamsObj() : undefined,
            {
              ...options,
              skipInitalQuerying: true,
            }
          );
          result.value = options?.skipInitalQuerying
            ? undefined
            : readFn(getParamsObj ? getParamsObj() : undefined);
          break;
        }
      }
      propsToWatch = { ...newProps };
      sub.on();
    }
  );

  onMounted(() => {
    console.info('adax-vue:onMounted...');
    isMounted.value = true;
    sub.on();
  });

  onBeforeUnmount(() => {
    console.info('adax-vue:onBeforeUnmount...');
    isMounted.value = false;
    sub.off();
  });
  console.info('adax-vue:result...');
  return result as Readonly<ReturnType<FnType>>;
};
