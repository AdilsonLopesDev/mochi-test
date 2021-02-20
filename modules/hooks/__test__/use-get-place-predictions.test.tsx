import React, { useState } from 'react'
import { UseScriptData } from "@hooks/use-script";
import { AutocompletionRequest } from "@typescript";

import { Wrapper, render } from '../../test-utils'
import DEFAULT_CONFIG from '../../constants/config';
import { useGetPlacePredictions } from "../";

jest.mock('../use-script');

import { useScript } from '../';
import { useDebounce } from 'use-debounce';

type TestComponentProps = {
    onChange:()=>{}
}

const TestComponentHook: React.FC<TestComponentProps> = ({onChange})=>{

    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 1000);
    const request: AutocompletionRequest = {
        input: query === "" ? '' : debouncedQuery,
        componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
      };
    const loaded = useGetPlacePredictions(request, onChange);
    
    return (<Wrapper> <div id={DEFAULT_CONFIG.GOOGLE_MAPS_SCRIPT_ID}></div> </Wrapper>)
}

describe("useGetPlacePredictions (hook)",()=>{
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
      });
    
    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    let value:UseScriptData = {
        id: DEFAULT_CONFIG.GOOGLE_MAPS_SCRIPT_ID,
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`,
        callback: () => {},
        async: false
    }

    const onChange = jest.fn();
    render(<TestComponentHook onChange={onChange} />);

    it("should call useScript hook",()=>{
        expect(useScript).toBeCalledTimes(1)
    });

    it.todo("should call onChange function");

    it.todo("should return a truthy ")
})