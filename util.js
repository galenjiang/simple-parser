const util = require('util')

function compose(...args) {
    return args.reduce((left, func) => {
        return (arg) => { return left(func(arg)) }
    })
}

function each(iterator) {
    return (iterable) => {
        iterable.forEach(iterator)
    }
}

function map(iterator) {
    return (iterable) => {
        return iterable.map(iterator)
    }
}

function reduce(iterator, accumulation) {
    return (iteratable) => {
        return iteratable.reduce(iterator, accumulation)
    }
}

function trace(tag) {
    return (res) => {
        console.log(`${tag}: ${util.inspect(res, {
            depth: 9
        })}`)
        return res
    }
}

module.exports = {
    compose,
    trace,
    each,
    map,
    reduce,
}
