
import {cleanup, renderHook } from "@testing-library/react-hooks";
import { UseScriptData } from "@hooks/use-script";

import  { useScript } from '../';

jest.mock('../../utils/helper-functions', () => ({
    loadScript: jest.fn(),
    removeScript: jest.fn()
}));

import { loadScript, removeScript } from '../../utils/helper-functions';

afterEach(cleanup)

describe("useScript hook", ()=>{
    let value:UseScriptData = { id:"1", src:"../../utils/helper-functions", callback:()=>{}, async:true }

    const {unmount} =  renderHook(()=>useScript(value))

    it("should call a loadScript function",()=>{

        expect(loadScript).toHaveBeenCalledTimes(1)
        expect(loadScript).toHaveBeenCalledWith(value)
    })

    it("should call a removeScript function on unmount component",()=>{
    
        unmount()
        expect(removeScript).toHaveBeenCalledTimes(1)
        expect(removeScript).toHaveBeenCalledWith(value.id)
    })
})