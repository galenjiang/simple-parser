/*
      //   [
      //     { type: 'paren',  value: '('        },
      //     { type: 'symbol',   value: 'add'      },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: '('        },
      //     { type: 'symbol',   value: 'subtract' },
      //     { type: 'number', value: '4'        },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: ')'        }, <<< 右圆括号
      //     { type: 'paren',  value: ')'        }  <<< 右圆括号
      //   ]
*/

/*
    当 ( 开始新的函数
            symbol  函数名
                取得value..  while...循环
    直到 ) 结束退出.


*/

function parser(tokens) {

 
    let index = 0

    function walk() {
        const token = tokens[index++]
        let node = {}
        if (token.type === 'number') {
            node = {
                type: 'NumberLiteral',
                value: token.value
            }
        } else if (token.type === 'paren' && token.value === '(') {
            let token = tokens[index++]
            if (token.type === 'symbol') {
            
                node = {
                    type: 'CallExpression',
                    name: token.value,
                    params: []
                }
                const context = node.params
                
                while(!(token.type === 'paren' && token.value === ')')) {
                    context.push(walk())
                    token = tokens[index]
                }

            } else {
                throw new TypeError(token.type)
            }


        } else if (token && token.type){ // 最外层
            throw new TypeError(token.type)
        } else {
            // !node
        }






        return node
    }

    return {
        type: 'Program',
        body: [walk()]
    }

}

module.exports = parser