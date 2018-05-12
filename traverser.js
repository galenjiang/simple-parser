const { each } = require('./util')

function traverser(ast, visitor) {
    function traverseArray(children, parent) {
        each(node => {
            traverseNode(node, parent)
        })(children);
    }
    
    function traverseNode(node, parent) {
        const method = visitor[node.type]
        if (method) {
            method(node, parent)
        }
        switch (node.type) {
            case 'Program':
                traverseArray(node.body, node)
                break
            case 'CallExpression':
                traverseArray(node.params, node)
                break
            case 'NumberLiteral':
                break
            default:
                throw new TypeError(node.type)
        }
    }
    traverseNode(ast, null)

}


module.exports = traverser
