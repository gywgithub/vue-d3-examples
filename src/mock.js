import Mock from 'mockjs'

Mock.setup({
  timeout: '100'
})

const Random = Mock.Random

// let localIp = 'http://192.168.199.172:3000'

// ****************** node *********************//
// get node tree
Mock.mock(RegExp('/api/v1/nodes/tree' + '.*'), 'get', (option) => {
  let arrSplit = option.url.split('/')
  let id = arrSplit[arrSplit.length - 1]
  let data = null
  if (id > 50) {
    data = {
      'name': 'flare',
      'value': id,
      'children': [{
          'name': 'util',
          'value': 23,
          'children': [{
              'name': 'ssdf',
              'value': 104993
            },
            {
              'name': 'Geometry',
              'value': 13033
            },
            {
              'name': 'heap',
              'value': 24,
              'children': [{
                'name': 'FibonacciHeap',
                'value': 9354
              }]
            },
            {
              'name': 'math',
              'value': 49
            }
          ]
        },
        {
          'name': 'vis',
          'value': 38,
          'children': [{
            'name': 'Visualization',
            'value': 16540
          }]
        }
      ]
    }
  } else {
    // data = {
    //   'name': 'Root',
    //   'value': id
    // }
    data = {
      'value': '100025',
      'name': 'role_e9d2918211',
      'children': [{
        'value': '100026',
        'name': 'node_e9d2918311'
      }]
    }
  }
  // console.log('mock data: ', data)
  return {
    status: true,
    data: data
  }
})

// get node by id
Mock.mock(RegExp('/api/v1/nodes/node' + '.*'), 'get', (option) => {
  let arrSplit = option.url.split('/')
  let id = Number(arrSplit[arrSplit.length - 1])
  let desc = Random.sentence()
  let name = Random.word()
  let data = {}
  if (id > 50) {
    desc = {
      'ops': [{
        'insert': desc
      }]
    } // eslint-disable-line
  } else {
    desc = {
      'ops': [{
        'insert': '我们走在同一条路上，穿的却是各自的鞋。\n\n我们住在同一栋楼里，看到的却是不同的风景。\n\n                     ——德克里《云端之上》\n\n\n\n\n做决定是一份孤独的任务，但总得有人来做。\n'
      }]
    } // eslint-disable-line
  }
  data = {
    'name': name,
    'id': id,
    'description': desc
  }
  return {
    data: data,
    status: true
  }
})

// create node
Mock.mock(RegExp('/api/v1/nodes/node' + '.*'), 'post', (option) => {
  console.log('create node ', option)
  let id = Random.natural(100, 999999)
  console.log('id: ', id)
  return {
    status: true,
    data: {
      id: id
    }
  }
})

// edit node
Mock.mock(RegExp('/api/v1/nodes/node' + '.*'), 'put', (option) => {
  console.log('edit node ', option)
  return {
    status: true
  }
})

// delete node
Mock.mock(RegExp('/api/v1/nodes/node/' + '.*'), 'delete', (option) => {
  console.log('delete node ')
  return {
    status: true
  }
})

// ***************** node end ****************** //

// get url query variable
function getQeuryVariable(query, variable) {
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}
