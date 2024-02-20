function mergeTrees(target, source) {
  if (Array.isArray(target)) {
    if (Array.isArray(source)) {
      source.forEach(element => {
        target.push(element)
      });
    } else {
      target.push(source)
    }
  } else if (typeof target === 'object') {
    if (Array.isArray(source)) {
      source.unshift(target)
      target = source
    } else if (typeof source === 'object') {
      // const keys = Array.from(new Set([...Object.keys(target), ...Object.keys(source)]))
      for (let key in source) {
        // console.log(key, key in target)
        if (key in target && typeof target[key] === 'object') {
          mergeTrees(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      }
    } else {
      target = source
    }
  }
}

export default {
  mergeTrees: mergeTrees
}