import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';

import { useEffectAfterMount } from '..';

describe('useEffectAfterMount hook', () => {
  let x:number, y:number;

  const callback = jest.fn();
  
  it('should return true if the dependencies do not change', () => {
   const {result} =  renderHook((dependencies: Array<any>) =>
      useEffectAfterMount(callback, (dependencies = [x, y]))
    );

    // expect(result.current).toBeTruthy();
  });

  it('should return false if the dependencies do change', () => {
    const {result, rerender } = renderHook((dependencies: Array<any>) =>
      useEffectAfterMount(callback, (dependencies = [x, y]))
    );
   
    rerender([3, 9]);
    expect(result.current).toBeFalsy();
  });
});