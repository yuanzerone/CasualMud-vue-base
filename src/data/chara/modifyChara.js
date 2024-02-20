import BaseAction from "@/utils/BaseAction";

export default {
  addChara: (global, chara) => {
    if (!global.func.chara[chara]) return
    global.data.chara[chara] = JSON.parse(JSON.stringify(global.func.chara.default))
    BaseAction.mergeTrees(global.data.chara[chara], JSON.parse(JSON.stringify(global.func.chara[chara])))
  }
}