import {renderHook} from "@testing-library/react-hooks";

import {usePrevious} from '../';

describe("usePrevious hook", ()=>{
    let value: any = "Antonio"

    it("should return the previuos value correctly", ()=>{
        const { result, rerender } = renderHook(()=> usePrevious(value));

        expect(result.current).toBeUndefined;

        rerender(1)

        expect(result.current).toBe(value)
    });    

})
