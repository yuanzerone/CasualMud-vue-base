export default {
  doAction: (data, func, action, params) => {
    if (func[action]) {
      func[action](data, params)
    }
  },
  returnAction: (data, func, action, params) => {
    if (func[action]) {
      return func[action](data, params)
    }
    return false
  }
}