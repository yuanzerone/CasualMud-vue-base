// 初始角色
const initCharaList = [
  '000_主角',
]

export default {
  start: (data) => {
    // data.func.chara.modifyChara.addChara(data, '000_主角')
    // data.func.chara.modifyChara.addChara(data, '001_妈妈')
    for (let one of initCharaList) {
      data.func.chara.modifyChara.addChara(data, one)
    }
  }
}