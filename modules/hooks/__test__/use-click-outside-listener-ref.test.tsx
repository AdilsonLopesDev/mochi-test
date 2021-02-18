import React, { useRef, useState } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event';
import { fireEvent } from "@testing-library/react";   

import { useClickOutsideListenerRef } from '../'

describe('useClickOutsideListenerRef hook', () => {
    const mockCallback = jest.fn();
    const mockHandle = jest.fn();
    const elementMock = { addEventListener: jest.fn() };
    
    // jest.spyOn(document, 'getElementById').mockImplementation(()=> elementMock);

    it('calls the outside click handler when an outside click is initiated',()=>{
        const { result } = renderHook(() => useClickOutsideListenerRef(mockCallback));
        // const refElement = result.current.refElement = document.createElement('div');

        act(() => {
            fireEvent.click(document.createElement('div'));
            fireEvent.mouseDown(document);
        });

        // expect(elementMock.addEventListener).toBeCalledWith();
    })

    it.todo('cleans up the event listeners after component is unmounted')
})

// describe('useOutsideClick', () => {


//     jest.spyOn(document, 'getElementById').mockImplementation(()=> elementMock);
  
//     it('refElement should be null at initial render', () => {
//       const { result } = renderHook(() => useClickOutsideListenerRef(()=>{}))
//       const refElement = result.current.current;
  
//       expect(refElement).toBeNull();
//     })
  
//     it('test', () => {
//         const { result } = renderHook(() => useClickOutsideListenerRef(mockCallback));
//         //  const refElement = result.current.current = document.createElement('div');
  
//         act(() => {
//           fireEvent.click(document.createElement('div'));
//           fireEvent.mouseDown(document);
//         });
  
//         expect(elementMock.addEventListener).toBeCalledWith();
//     })
  
//   });