'use strict'

import express from 'express'
import { testable } from '../src/controllers'
describe('test-pkg', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(testable(1, 2)).toBe(3)
    })


})
