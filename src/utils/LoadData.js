const funcData = import.meta.globEager('@/data/**/*.js')
let funcTree = []
for (let item in funcData) {
  funcTree.push(item)
}

function LoadPath(path) {
  return funcData[path].default
}

function AddTreeItem(state, Data, module, path) {
  if (module.length === 1 && !Data[module[0]]) {
    Data[module[0].replace('.js', '')] = funcData[path].default
    state.cnt += 1
  } else if (module.length > 1) {
    if (!Data[module[0]]) {
      Data[module[0]] = {}
    }
    AddTreeItem(state, Data[module[0]], module.slice(1, module.length) ,path)
  }
}


export default {
  funcData: funcData,
  funcTree: funcTree,
  LoadPath: LoadPath,
  AddTreeItem: AddTreeItem,
}