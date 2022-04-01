/**
 * 添加
 */
export const setItem = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}

/**
 * 获取
 */

export const getItem = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return window.localStorage.getItem(key)
  }
}

/**
 * 删除
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
