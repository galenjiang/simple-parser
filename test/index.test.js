const assert = require('assert')
const { tokenizer, parser } = require('../index')
const { compose, trace } = require('../util')

const str = '(add 2 (subtract 4 2))'
const tokens = [
    { type: 'paren', value: '(' },
    { type: 'symbol', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'symbol', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
]
const ast = {
    type: 'Program',
    body: [{
        type: 'CallExpression',
        name: 'add',
        params: [{
            type: 'NumberLiteral',
            value: '2'
        }, {
            type: 'CallExpression',
            name: 'subtract',
            params: [{
                type: 'NumberLiteral',
                value: '4'
            }, {
                type: 'NumberLiteral',
                value: '2'
            }]
        }]
    }]
}

assert.deepEqual(
    compose(
        // trace('tokens'),
        tokenizer,
    )(str),
    tokens
)

assert.deepEqual(
    compose(
        trace('ast'),
        parser,
    )(tokens),
    ast,
)

console.log('testing...passed')
