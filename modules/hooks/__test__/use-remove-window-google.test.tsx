import {cleanup, renderHook} from "@testing-library/react-hooks";

import { useRemoveWindowGoogle } from '../';

beforeEach(()=>{
    cleanup()
})

describe("useRemoveWindowGoogle (hook)", ()=>{
   
    it('should set window.google.map as empty object when a component is unmounted',()=>{
        renderHook(useRemoveWindowGoogle)
        expect(window.google.maps).toEqual({})
    });

})

