function tokenizer(script) {

    const reMap = {
        blank: /\s+/y,
        paren: /[()]/y,
        symbol: /[_$A-Za-z\u4e00-\u9fa5][\w\u4e00-\u9fa5]*/y,
        number: /\d+/y,
    }
    
    let res
    let resTag = false
    let lastIndex = 0
    const maxLen = script.length
    
    const tokens = []
    
    do {
        // 用于判断正则是否全部遍历过，并且没有找到相应的表达式，而导致的死循环
        resTag = false
        for (const key in reMap) {
            if (reMap.hasOwnProperty(key)) {
                const re = reMap[key];
                re.lastIndex = lastIndex
                res = re.exec(script)
                if (res) {
                    lastIndex = re.lastIndex
                    // TODO: token的分支
                    resTag = true
                    if (key === 'blank') {
                        break
                    } else {
                        tokens.push({
                            type: key,
                            value: res[0]
                        })
                        // res.lastIndex = 0
                        break
                    }
                }
            }
        }
        if (!resTag && lastIndex !== maxLen) {
            throw new Error('token resolved failed')
        }
        
    } while (res && lastIndex !== maxLen)
    return tokens
}

module.exports = tokenizer