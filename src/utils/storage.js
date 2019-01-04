const prefix = 'rs-hjfzjc-' // 海军辅助舰船信息化管理系统

export function setItem(keyName, keyValue) {
  localStorage.setItem(prefix + keyName, JSON.stringify(keyValue))
}

export function getItem(keyName) {
  return JSON.parse(localStorage.getItem(prefix + keyName))
}
