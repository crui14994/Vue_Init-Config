// 本地存储localStorage
class Storage {
  constructor () {
    this.storage = window.localStorage
    this.prefix = 'mytest_' //给key家一个前缀
  }

  set (key, value, fun) {
    if (typeof value !== 'string') {
      try {
        value = JSON.stringify(value)
      } catch (e) {
      }
    }
    this.storage.setItem(this.prefix + key, value)
    typeof fun === 'function' && fun()
  }

  get (key, fun) {
    let value = this.storage.getItem(this.prefix + key)
    try {
      value = JSON.parse(value)
      if (value === null) value = {}
    } catch (e) {
      value = {}
    }
    return typeof fun === 'function' ? fun.call(this, value) : value
  }

  remove (key) {
    this.storage.removeItem(this.prefix + key)
  }

  cle() {
    this.storage.clear();
  }
}

export default new Storage()
