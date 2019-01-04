/**
 * 格式化菜单数据
 * @param menus
 * @returns {Array}
 */
export function formatMenuData(menus) {
  let result = []

  // handle submenu
  menus.forEach((menu, index) => {
    if (!menu.parent) {
      menu.routeName = menu.name
      menu.titles = [menu.title]
      menu.children = []
      result.push(menu)
      console.log('menu', menu)
    }
  })

  menus.forEach(menu => {
    if (menu.parent !== null) {
      console.log('parent', menu)
      result.forEach(item => {
        console.log(item.id)
        if (menu.parent === item.id) {
          console.log(1)
          if (!item.children) {
            item.children = []
          }
          menu.routeName = menu.name
          menu.routeName = menu.name
          menu.titles = item.titles.concat([menu.title])
          item.children.push(menu)
          console.log('item', item)
        }
        let children = item.children
        if (children && children.length) {
          children.forEach(citem => {
            if (citem.id === menu.parent) {
              if (!citem.children) {
                citem.children = []
              }
              menu.routeName = menu.name
              menu.routeName = menu.name
              menu.titles = citem.titles.concat([menu.title])
              citem.children.push(menu)
            }
          })
        }
      })
    }
  })

  // handle menu item
  // let hasNoParentMenu = false
  // while (!hasNoParentMenu && menus.length > 0) {
  //   hasNoParentMenu = true
  //   menus.forEach((menu, index) => {
  //     const parentIndex = result.findIndex(
  //       element => element.id === menu.parent
  //     )
  //     if (parentIndex >= 0) {
  //       const parent = result[parentIndex]
  //       menu.routeName = menu.name
  //       menu.titles = parent.titles.concat([menu.title])
  //       parent.children.push(menu)
  //       menus.splice(index, 1)
  //       hasNoParentMenu = false
  //     }
  //   })
  // }

  result.map(c => {
    c.children.sort((a, b) => {
      if (a.id > b.id) {
        return 1
      }
      if (a.id < b.id) {
        return -1
      }
      if (a.id === b.id) {
        return 0
      }
    })
  })
  console.log('result', result)
  return result
}

/**
 * 格式化树型表格数据
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function formatTreeData(data) {
  let tempData = []
  const tempFunc = function(data, level, parent) {
    data.forEach(item => {
      item._level = level
      item._parent = parent
      item._expanded = false
      const children = item.children
      tempData.push(item)
      if (children && children.length > 0) {
        tempFunc(children, item._level + 1, item)
      }
    })
  }
  tempFunc(data, 0, null)
  console.log(tempData)
  return tempData
}
