import React, {useEffect} from 'react';
import { render } from '../../test-utils';

import { useIsMounted } from '../';

describe('useIsMounted (hook)', () => {
  const spy = jest.fn((_) => {});
  
  it('should returns a false value before mounting', () => {
   

    function MockComponent() {
      const isMounted = useIsMounted();
      spy(isMounted.current);
      return null;
    }

    render(<MockComponent />);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should returns a false value after unmounting', () => {
   
    function MockComponent() {
      const isMounted = useIsMounted();

      useEffect(() => {
        return () => {
          spy(isMounted.current);
        };
      }, [isMounted]);

      return null;
    }

    const { unmount } = render(<MockComponent />);
    unmount();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should returns true after the component mounts', () => {
   
    function MockComponent() {
      const isMounted = useIsMounted();

      useEffect(() => {
        spy(isMounted.current);
      }, [isMounted]);

      return null;
    }

    render(<MockComponent />);
    expect(spy).toHaveBeenCalledWith(true);
  });
});