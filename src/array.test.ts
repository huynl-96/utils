import { describe, expect, it } from 'vitest'
import { flattenArrayable, partition, range, toArray } from './array'
import type { Arrayable, Nullable } from './types'

describe('toArray', () => {
  it.each([
    [undefined, []],
    [null, []],
    [false, [false]],
    [0, [0]],
    ['', ['']],
    [[], []],
    ['foo', ['foo']],
    [['foo'], ['foo']],
  ])('%s => %s', (input, expected) => {
    expect(toArray(input)).toEqual(expected)
  })
})

describe('flattenArrayable', () => {
  it.each([
    [undefined, []],
    [null, []],
    [1, [1]],
    [[1, '2', 3], [1, '2', 3]],
    [[1, [1, 2]], [1, 1, 2]],
    [[1, [1, [2]]], [1, 1, [2]]],
  ])('%s => %s', (input: Nullable<Arrayable<number | (number | string | number[])[]>>, expected) => {
    expect(flattenArrayable(input)).toEqual(expected)
  })
})

describe('range', () => {
  type Input = [number] | [number, number] | [number, number, number]
  const cases: [Input, number[]][] = [
    [[0], []],
    [[2], [0, 1]],
    [[2, 5], [2, 3, 4]],
    [[2, 10, 2], [2, 4, 6, 8]],
  ]

  it.each(cases)('%s => %s', (input, expected) => {
    expect(range(...input)).toEqual(expected)
  })
})

it('partition', () => {
  const data = range(10)

  expect(
    partition(data, i => i % 2),
  ).toEqual([
    [1, 3, 5, 7, 9],
    [0, 2, 4, 6, 8],
  ])

  expect(
    partition(
      data,
      i => i % 3 === 0,
      i => i % 2 === 0,
    ),
  ).toEqual([
    [0, 3, 6, 9],
    [2, 4, 8],
    [1, 5, 7],
  ])

  expect(
    partition(
      data,
      i => i,
    ),
  ).toHaveLength(2)

  expect(
    partition(
      data,
      i => i,
      i => i,
      i => i,
      i => i,
      i => i,
    ),
  ).toHaveLength(6)
})
