import { renderHook, act } from '@test-utils';

import {useGoogleSignIn} from '../';

const UseGoogleSignInProps = {
  buttonId: 'google-signin-button',
  onSuccess: jest.fn(),
  onFailure: () => {},
};

describe('useGoogleSignIn (hook)', () => {
  let div = document.createElement('div');

  beforeEach(() => {
    div.id = UseGoogleSignInProps.buttonId;
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('it should return false if there is no button with the provided #id', () => {
    const { result, unmount, rerender } =  renderHook(() =>
      useGoogleSignIn(UseGoogleSignInProps)
    );

    expect(document.getElementById(UseGoogleSignInProps.buttonId)?.id).toBe(
      UseGoogleSignInProps.buttonId
    );

    expect(result.current.loaded).toBe(false);
  });

  // it("should be call a onSuccess funcition", ()=>{
  //   expect(UseGoogleSignInProps.onSuccess).toBeCalled()
  // })

  it('it should create a script element for the google script', () => {
    const { result, unmount, rerender } = renderHook(() => useGoogleSignIn(UseGoogleSignInProps));
    expect(document.querySelectorAll('script').length).toBe(1);
  });
});