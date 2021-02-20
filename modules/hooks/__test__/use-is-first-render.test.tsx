import {renderHook} from "@test-utils";

import { useIsFirstRender } from '../';

describe("useIsFirstRender (hook)", ()=>{
  
    it("should return true, if is first render", ()=>{
        const { result } = renderHook(useIsFirstRender);

        expect(result.current).toBe(true)
    });    

    it('should return false, after component is re-render', () => {
        const { result, rerender } = renderHook(() => useIsFirstRender());
    
        rerender(useIsFirstRender);
        expect(result.current).toBe(false);
    });

})
