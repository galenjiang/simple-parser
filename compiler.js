const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer')
const codeGenerator = require('./codeGenerator')
const { compose } = require('./util')

function compiler(input) {
    return compose(
        codeGenerator,
        transformer,
        parser,
        tokenizer,
    )(input)
}

module.exports = compiler