import {renderHook} from "@testing-library/react-hooks";

import {usePrevious} from '../';

describe("usePrevious (hook)", ()=>{
    let value: any = "Antonio"

    it("should allow if argument passed is a undefined on usePrevious hook",()=>{
        const { result } = renderHook(()=> usePrevious(undefined));

        expect(result.current).toBeUndefined;
    })

    it("should return the previuos value correctly", ()=>{
        const { result, rerender } = renderHook(()=> usePrevious(value));
        rerender(1)
        expect(result.current).toBe(value)
    });    

})
