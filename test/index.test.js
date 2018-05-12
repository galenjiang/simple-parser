const assert = require('assert')
const { tokenizer, parser, traverser } = require('../index')
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
        // trace('ast'),
        parser,
    )(tokens),
    ast,
)

const arr = []
compose(
    // trace('ast'),
    ast => traverser(ast, {
        Program(node, parent) {
            arr.push(node.type)
        },
        CallExpression(node, parent) {
            arr.push(node.type)
        },
        NumberLiteral(node, parent) {
            arr.push(node.type)
        }
    }),
)(ast)

assert.deepEqual(
    arr,
    ['Program', 'CallExpression', 'NumberLiteral', 'CallExpression', 'NumberLiteral', 'NumberLiteral'],
)


console.log('testing...passed')
