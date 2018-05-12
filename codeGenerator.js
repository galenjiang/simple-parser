const { compose, map, join } = require('./util')

function codeGenerator(node) {
    switch(node.type) {
        case 'Program':
            return compose(
                join('/n'),
                map(child => codeGenerator(child))
            )(node.body)
            break
        case 'ExpressionStatement':
            return `${codeGenerator(node.expression)};`
            break
        case 'CallExpression':
            const callee = compose(
                join(', '),
                map(node => codeGenerator(node))
            )(node.arguments)
            return `${node.callee.name}(${callee})`
            break
        case 'NumberLiteral':
            return node.value
            break
    }
}

module.exports = codeGenerator