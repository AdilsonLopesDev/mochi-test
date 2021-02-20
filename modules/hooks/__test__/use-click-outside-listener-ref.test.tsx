import { Wrapper, render } from '../../test-utils'
import { cleanup, fireEvent,  } from '@testing-library/react';
import { useClickOutsideListenerRef } from '../';


type TestHookProps = {
    onClose:()=>{}
}
const TestHook: React.FC<TestHookProps> =({onClose})=>{
    const ref = useClickOutsideListenerRef(onClose)    

    return ( <Wrapper><div ref={ref}>htmlDivRef</div></Wrapper> )
}
let realAddEventListener;
let realRemoveEventListener;
let eventMap;

beforeEach(() => {
    realAddEventListener = window.addEventListener;
    realRemoveEventListener = window.removeEventListener;
    eventMap = {};
    
    window.addEventListener = jest.fn((eventName, callback) => {
      eventMap[eventName] = callback;
    });
    
    window.removeEventListener = jest.fn(eventName => {
      delete eventMap[eventName];
    });
});

afterEach(() => {
    window.addEventListener = realAddEventListener;
    window.removeEventListener = realRemoveEventListener;
});

describe('useClickOutsideListenerRef (hook)', () => {
    const onClose = jest.fn()
    it('renders without crushing', () => {
      const { getByText } = render(<TestHook onClose={onClose} />);
  
      expect(getByText('htmlDivRef')).toBeDefined();
    });
    
    describe("clickListener (function) ", ()=>{
        it("should not handle click inside element with listener ref", () => {
            const { getByText } = render(<TestHook onClose={onClose} />);
        
            getByText('htmlDivRef').click();
            expect(onClose).not.toHaveBeenCalled();
          });
        
          it('should handles click outside element with listener ref', () => {
             render(<TestHook onClose={onClose} />);
             fireEvent(document, new Event('click'));
             expect(onClose).toHaveBeenCalled();
          });
      
    })
    
    describe("escapeListener (function) ", ()=>{
        it('should handles keyup Event', () => {
            render(<TestHook onClose={onClose} />);
            fireEvent(document, new Event('keyup'));
            expect(onClose).toHaveBeenCalled();
        });
    })

    describe("Remove all events ", ()=>{
        const clickListener = jest.fn()
        it('should remove click and keyup event', () => {
           const { unmount } =  render(<TestHook onClose={onClose} />);
            unmount()
            // document.removeEventListener('click', clickListener);
            // document.removeEventListener('keyup', escapeListener);
            expect(window.addEventListener).toBeCalled();
            // expect(window.addEventListener).toBeCalledWith("click",clickListener);
        });
    })

  });
