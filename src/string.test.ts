import { describe, expect, it } from 'vitest'
import { capitalize, ensurePrefix, ensureSuffix, slash, template } from './string'

describe('template', () => {
  it.each([
    ['Hello {0}! My name is {1}.', ['Inès', 'Anthony'], 'Hello Inès! My name is Anthony.'],
    ['{0} + {1} = {2}{3}', [1, '1', { v: 2 }, [2, 3]], '1 + 1 = [object Object]2,3'],
    ['{10}', [], 'undefined'],
    ['Hi', [''], 'Hi'],
  ])('%s => %s', (str, input, expected) => {
    expect(template(str, ...input)).toEqual(expected)
  })
})

describe('slash', () => {
  it.each([
    ['\\123', '/123'],
    ['\\\\', '//'],
    ['\\\h\\\i', '/h/i'],
  ])('%s => %s', (input, expected) => {
    expect(slash(input)).toEqual(expected)
  })
})

describe('ensurePrefix', () => {
  it.each([
    ['abc', 'abcdef', 'abcdef'],
    ['hi', 'jack', 'hi jack'],
  ])('[%s, %s] => %s', (suffix, str, expected) => {
    expect(ensurePrefix(suffix, str)).toEqual(expected)
  })
})

describe('ensureSuffix', () => {
  it.each([
    ['123', 'abc123', 'abc123'],
    ['world', 'hello', 'hello world'],
  ])('[%s, %s] => %s', (suffix, str, expected) => {
    expect(ensureSuffix(suffix, str)).toEqual(expected)
  })
})

it('capitalize', () => {
  expect(capitalize('hello World')).toEqual('Hello world')
  expect(capitalize('123')).toEqual('123')
  expect(capitalize('中国')).toEqual('中国')
  expect(capitalize('āÁĂÀ')).toEqual('Āáăà')
  expect(capitalize('\a')).toEqual('A')
})
