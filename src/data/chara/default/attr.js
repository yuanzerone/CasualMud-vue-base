// attr.js是默认的属性元素
// 存储静态的变量
// 不要在这里加方法
// 方法应该由Load去加载以便于版本升级与更新时对应变化
export default {
  // 名字
  name: '',
  // 姓氏
  lastName: '',
  // 身份
  identity: '',
  // 描述
  desc: '',
  // 年龄
  age: 0,
  // 行动
  action: '',
  // 基础属性
  hp: {
    now: 100,
    max: 100,
  },
  mp: {
    now: 100,
    max: 100,
  },
  sp: {
    now: 100,
    max: 100,
  },
  base: {
    // 力量
    str: 0,
    // 体力
    phy: 0,
    // 敏捷
    agi: 0,
    // 智力
    int: 0,
    // 精神
    spi: 0,
  },
  // 状态列表
  state: [],
  // 关系列表
  relation: [],
  // 身体数据
  body: {},
  // 性别
  sex: '',
  // 特性词条
  quality: [],
  // 种族
  race: '',
  // 技能
  skill: [],
  // 职业
  job: [],
  // 性格
  nature: '',
  // 持有金钱
  money: 0,
  // 持有道具
  bag: [],
  equip: [],
  // 可见范围
  visible: {},
}