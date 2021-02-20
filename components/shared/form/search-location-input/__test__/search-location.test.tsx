
import React from "react";
import { useForm } from "react-hook-form";

import { Wrapper, render, fireEvent } from '../../../../../modules/test-utils'

import SearchLocationInput  from "..";
import DEFAULT_CONFIG from "@constants/config";

jest.mock("@hooks")

import { useGeoCode, useGetPlacePredictions } from '@hooks';
import { cleanup } from "@testing-library/react-hooks";

const params =  {
  input: "",
  componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
}

const setState = jest.fn(()=>  []);

const useStateMock: any = (initState: any) => [initState, setState];
const handleSelectPrediction:any = ()=> {}
// const useGeoCode = useGeoCode({ placeId }, handleSelectPrediction);
// const error = getReactHookFormError({ name: 'street', errors });

const TestComponentHook:React.FC = () =>{
  const { errors } =  useForm({
    defaultValues: {
      street: '',
    },
  });

  return (
    <Wrapper>
      <SearchLocationInput  
          defaultValue=""
          noBorder
          placeholder="location"
          labelLess
          predictionsContainerWidth="160%"
          predictionsContainerPositionX="-6rem"
          handleChange={()=>{}}
          errors={errors}/>
    </Wrapper>
  )
}

let realOnKeyDown;
let eventMap;

beforeEach(() => {
  realOnKeyDown = window.addEventListener;
  
  window.addEventListener = jest.fn((eventName) =>{});
  
  jest.clearAllMocks()
  cleanup()
});

afterEach(() => {
    window.addEventListener = realOnKeyDown;
});

describe("SearchLocationInput component", ()=>{

  it("renders SearchLocationInput successfuly", () => {
    const { container } = render(<TestComponentHook />)
    expect(container.querySelector("input")).toBeDefined()
  });

  it("should call useGetPlacePredictions hook", ()=>{
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    render(<TestComponentHook />)
    expect(useGetPlacePredictions).toHaveBeenCalled()
    expect(useGetPlacePredictions).toHaveBeenCalledTimes(1)
    expect(useGetPlacePredictions(params, setState)).toBe(true)
    // expect(useGetPlacePredictions).toHaveBeenCalledWith(params, setState)
  })

  it("should call useGeoCode hook", ()=>{
    jest.spyOn(React, 'useCallback').mockImplementation(handleSelectPrediction);
    render(<TestComponentHook />)
    expect(useGeoCode).toHaveBeenCalled()
    expect(useGeoCode).toHaveBeenCalledTimes(1)
    // expect(useGeoCode({ placeId:"" }, handleSelectPrediction)).toBe(true)
  })

  it('should fire keyPress Event', async() => {
    cleanup()
    const {container,  findByPlaceholderText} =  render(<TestComponentHook />)
    const input = await findByPlaceholderText("location");
    fireEvent.keyPress(input, { key: "Enter", code: 13 });
    // expect(setState.mock.calls.length).toBe(0);
 });

})

