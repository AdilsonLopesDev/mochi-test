
import {cleanup } from "@test-utils";
import { UseScriptData } from "@hooks/use-script";

import  { useScript } from '../';

jest.mock('../../utils/helper-functions', () => ({
    loadScript: jest.fn(),
    removeScript: jest.fn()
}));

import { loadScript, removeScript } from '../../utils/helper-functions';
import DEFAULT_CONFIG from "@constants/config";
import { render, Wrapper } from "@test-utils";

afterEach(cleanup)

type TestComponentProps = {
    script:UseScriptData
}
const TestComponentHook: React.FC<TestComponentProps> = ({script}) =>{
    useScript(script)
    return (
        <Wrapper>
            <div id={DEFAULT_CONFIG.GOOGLE_MAPS_SCRIPT_ID}></div>
        </Wrapper>
    )
}

beforeEach(()=>{
    cleanup()
})

afterEach(()=>cleanup)
 
describe("useScript (hook)", ()=>{
    let value:UseScriptData = {  id: DEFAULT_CONFIG.GOOGLE_MAPS_SCRIPT_ID,
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`,
        callback: () => {},
        async: false }

    const { unmount } = render(<TestComponentHook script={value} />)
    
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