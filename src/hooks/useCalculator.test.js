import { renderHook, act } from '@testing-library/react'
import useCalculator from './useCalculator'

test('sum operation', () => {
  const { result } = renderHook(() => useCalculator())
  act(() => result.current.handleKey('2'))
  act(() => result.current.handleKey('+'))
  act(() => result.current.handleKey('3'))
  act(() => result.current.handleKey('='))
  expect(result.current.display).toBe('5')
})

test('overflow error', () => {
  const { result } = renderHook(() => useCalculator())
  for (let i = 0; i < 9; i++) act(() => result.current.handleKey('9'))
  act(() => result.current.handleKey('+'))
  act(() => result.current.handleKey('1'))
  act(() => result.current.handleKey('='))
  expect(result.current.display).toBe('ERROR')
})

test('max 9 chars input', () => {
  const { result } = renderHook(() => useCalculator())
  for (let i = 0; i < 12; i++) act(() => result.current.handleKey('1'))
  expect(result.current.display.length).toBeLessThanOrEqual(9)
})
