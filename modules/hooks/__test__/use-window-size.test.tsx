import { renderHook, act, fireEvent } from '@test-utils'

import {useWindowSize} from '../';

const customWindow = window as any

describe("useWindowSize (hook)", () => {
  customWindow.innerWidth = 500
  customWindow.innerHeight = 800

  it("reads initial innerWidth and innerHeight values from window", () => {
    const { result } = renderHook(useWindowSize)

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(800)
  })

  it("updates innerWidth and innerHeight values when window resizes", () => {
    const { result } = renderHook(useWindowSize)

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(800)

    act(() => {
      customWindow.innerWidth = 1000
      customWindow.innerHeight = 1000

      fireEvent(customWindow, new Event("resize"))
    })

    expect(result.current.width).toBe(1000)
    expect(result.current.height).toBe(1000)
  })
})