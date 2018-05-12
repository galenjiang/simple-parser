const traverser = require('./traverser')

function transformer(ast) {
    const newAst = {
        type: 'Program',
        body: []
    }

    ast._context = newAst.body

    traverser(ast, {
        CallExpression(node, parent) {

            let expression = {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: node.name,
                },
                arguments: []
            }

            node._context = expression.arguments

            if (parent.type !== 'CallExpression') {
                expression = {
                    type: 'ExpressionStatement',
                    expression: expression,
                }
            }


            parent._context.push(expression)
        },
        NumberLiteral(node, parent) {
            let num = {
                type: 'NumberLiteral',
                value: node.value,
            }
            parent._context.push(num)
        }
    })

    return newAst

}

module.exports = transformer