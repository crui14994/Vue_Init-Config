const plugins = []
if (process.env.NODE_ENV === 'production') {
  // 移除console.log
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.array.iterator',
        'es6.promise',
        'es7.promise.finally',
        'es6.symbol',
        'es6.array.find-index',
        'es7.array.includes',
        'es6.string.includes',
        'es6.array.find',
        'es6.object.assign'
      ]
    }]
  ],
  plugins
}
