import {renderHook} from "@testing-library/react-hooks";

import { useIsMounted } from '../';

describe("useIsMounted hook", ()=>{
    it('should keep track of if a component is mounted', () => {
        const { result, unmount } = renderHook(useIsMounted);
        
        expect(result.current.current).toBe(true);
        
        unmount();
    
        expect(result.current.current).toBe(false);
    });
})

