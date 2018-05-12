const assert = require('assert')
const { compose, each, map, reduce } = require('../util')

assert(typeof each(i => i + 1) === 'function')
const arr = [1, 2, 3]
each((item, index) => arr[index] = arr[index] + 1)([1, 2, 3])
assert.deepEqual(arr, [2, 3, 4])

assert.deepEqual(map(i => i + 1)([1, 2, 3]), [2, 3, 4])

assert.equal(reduce((left, i) => left + i, 10)([1, 2, 3]), 16)

assert.deepEqual(compose(
    i => i * i,
    i => i + 1
)(2), 9)

console.log('testing...passed')