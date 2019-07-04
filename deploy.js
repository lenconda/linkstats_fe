var deploy = require('ali-oss-deploy')

deploy({
  path: '../build',
  ossConfig: {
    region: 'oss-ap-northeast-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
  },
  bucket: {
    pro: {
      name: 'linkstats-static',
      refreshPath: '',
    },
    test: {
      name: 'linkstats-static',
      projectPath: ''
    },
  },
})
