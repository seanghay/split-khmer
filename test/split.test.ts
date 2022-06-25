import { describe, it, expect } from 'vitest'
import { randomInteger } from '../'

describe('random integer', () => {
  it('should be integer', () => {
    expect(randomInteger()).toBeTypeOf("number")
  })
})