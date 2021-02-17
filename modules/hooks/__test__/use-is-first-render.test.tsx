import {renderHook} from "@testing-library/react-hooks";

import { useIsFirstRender } from '../';

describe("useIsFirstRender hook", ()=>{
  
    it("should return if is first render", ()=>{
        const { result } = renderHook(useIsFirstRender);

        expect(result.current).toBe(true)
    });    

})
