import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import MyApp from './MyApp.vue';

const sampleStore = { alpha: 0, beta: 0 };
const readFn = vi.fn(({ name }: { name: 'alpha' | 'beta' }) => {
  console.log(`readFn::sampleStore[${name}]:`, sampleStore[name]);
  return (sampleStore[name])
});
const readFn_2 = vi.fn(({ name }: { name: 'alpha' | 'beta' }) => {
  console.log(`readFn_2::sampleStore[${name}]:`, sampleStore[name]);
  return (sampleStore[name])
});

const mockedFunctions = {
  my_on: vi.fn(() => 'on'),
  my_off: vi.fn(() => 'off'),
};

vi.mock('adax-core', () => ({
  __esModule: true,
  subscribe: vi.fn(() => ({
    on: mockedFunctions.my_on,
    off: mockedFunctions.my_off,
  })),
}));

describe('adax-vue interacts with adax as expected', () => {
  beforeEach(() => {
    readFn.mockClear();
    readFn_2.mockClear();
    mockedFunctions.my_on.mockClear();
    mockedFunctions.my_off.mockClear();
  });

  it('Component with useSync causes the invocation of on when mounted', async () => {
    render(MyApp, { props: { readFn, readFn_2 } });
    expect(mockedFunctions.my_on).toHaveBeenCalledTimes(1);
  });

  it('Component with useSync causes the invocation of off when un-mounted', async () => {
    const { getByTestId } = render(MyApp, { props: { readFn, readFn_2 } });
    expect(mockedFunctions.my_on).toHaveBeenCalledTimes(1);
    
    const hideShowToggle = getByTestId('hide-show-toggle');
    await fireEvent.click(hideShowToggle);
    
    expect(mockedFunctions.my_off).toHaveBeenCalledTimes(1);
  });
  
  it('Component with useSync causes the invocation of off when useSync`s query`s arguments are updated', async () => {
    const { getByTestId } = render(MyApp, { props: { readFn, readFn_2 } });
    expect(mockedFunctions.my_on).toHaveBeenCalledTimes(1);
    
    const isAlphaToggle = getByTestId('isAlpha-toggle');
    await fireEvent.click(isAlphaToggle);
    
    expect(mockedFunctions.my_off).toHaveBeenCalledTimes(1);
    expect(mockedFunctions.my_on).toHaveBeenCalledTimes(2);
  });

  it('Component with useSync causes re-invocation of readFn when useSync`s query`s arguments are updated', async () => {
    const { getByTestId } = render(MyApp, { props: { readFn, readFn_2 } });
    expect(readFn).toHaveBeenCalledWith({name:'alpha'});
    readFn.mockClear();
    const isAlphaToggle = getByTestId('isAlpha-toggle');
    await fireEvent.click(isAlphaToggle);
    expect(readFn).toHaveBeenCalledWith({name:'beta'});
  });
  
  it('Component with useSync causes the invocation of off when useSync`s query is updated', async () => {
    const { getByTestId } = render(MyApp, { props: { readFn, readFn_2 } });
    expect(mockedFunctions.my_on).toHaveBeenCalledTimes(1);
    const switchQueryToggle = getByTestId('switch-query-toggle');
    await fireEvent.click(switchQueryToggle);
    expect(mockedFunctions.my_off).toHaveBeenCalledTimes(1);
    expect(mockedFunctions.my_on).toHaveBeenCalledTimes(2);    
  });
  
  it('Component with useSync causes invocation of a diff readFn when useSync`s query is updated', async () => {
    const { getByTestId } = render(MyApp, { props: { readFn, readFn_2 } });
    expect(readFn).toHaveBeenCalledWith({name:'alpha'});
    expect(readFn).toHaveBeenCalledTimes(1);
    expect(readFn_2).toHaveBeenCalledTimes(0);
    const switchQueryToggle = getByTestId('switch-query-toggle');
    await fireEvent.click(switchQueryToggle);
    // readFn not called again!
    expect(readFn).toHaveBeenCalledTimes(1);
    expect(readFn_2).toHaveBeenCalledWith({name:'alpha'});
    expect(readFn_2).toHaveBeenCalledTimes(1);
  });
  
  it('Component with useSync causes the invocation of readFn when mounted if skipInitalQuerying is not set to true', async () => {
    render(MyApp, { props: { readFn, readFn_2 } });
    expect(readFn).toHaveBeenCalledWith({name:'alpha'});
  });
  
  it('Component with useSync causes no invocation of readFn when mounted if skipInitalQuerying is true', async () => {
    render(MyApp, { props: { readFn, readFn_2, skipInitalQuerying: true } });
    expect(readFn).toHaveBeenCalledTimes(0);
  });
  
  it('Component with useSync causes no invocation of readFn when useSync is updated with diff subscription if skipInitalQuerying is true', async () => {
    const { getByTestId } = render(MyApp, { props: { readFn, readFn_2, skipInitalQuerying: true } });
    expect(readFn).toHaveBeenCalledTimes(0);
    readFn.mockClear();
    const isAlphaToggle = getByTestId('isAlpha-toggle');
    await fireEvent.click(isAlphaToggle);
    expect(readFn).toHaveBeenCalledTimes(0);
  });

});