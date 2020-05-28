const fs = require('fs')
const utils = require('./utils')

function addMapping(router, mapping) {
    // console.log('mapping',mapping)
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4)
            router.get(path, utils.res.decorator(mapping[url]))
            console.log(`register URL mapping: GET ${path}`)
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5)
            router.post(path, utils.res.decorator(mapping[url]))
            console.log(`register URL mapping: POST ${path}`)
        } else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

function addControllers(router, dir) {
    const path_filesDir = __dirname + `/${dir}/`
    const files = fs.readdirSync(path_filesDir)
    const js_files = files.filter((f) => {
        return f.endsWith('.js')
    })

    for (let f of js_files) {
        console.log(`process controller: ${f}...`)
        let mapping = require(path_filesDir + f)
        addMapping(router, mapping)
    }
}

module.exports = function (router, dir) {
    const _dir = dir || 'controllers'
    addControllers(router, _dir)
    return router.routes()
}
