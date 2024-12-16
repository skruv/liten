export const e = new Proxy({}, { get: (_, t) => (a = null, ...c) => ({ t, c, a }) })
export const r = (object, current = document.documentElement) => {
  if (object.a) {
    for (const key in object.a) {
      if (key === 'template' || key === 'opaque' || (key[0] === 'o' && key[1] === 'n' && current[key] === object.a[key]) || ('' + object.a[key]) === ('' + current.getAttribute(key))) continue
      if (key[0] === 'o' && key[1] === 'n') { // Event listener
        current[key] = object.a[key]
        continue
      }
      if (object.a[key] !== false) {
        current.setAttribute(key, object.a[key])
        if (key === 'checked' || key === 'selected' || key === 'value') {
          current[key] = object.a[key]
        }
      } else {
        current.removeAttribute(key)
      }
    }
  }
  if (current.hasChildNodes()) {
    if (!object.c.length) {
      current.textContent = ''
      return
    }
  } else {
    if (!object.c.length) return
    const newChildren = []
    for (let i = 0; i < object.c.length; i++) {
      const c = object.c[i]
      if (typeof c === 'string') {
        newChildren.push(c)
        continue
      }
      const _current = c.a && c.a.template ? c.a.template.cloneNode(true) : document.createElement(c.t)
      newChildren.push(_current)
      r(c, _current)
    }
    current.replaceChildren(...newChildren)
    return
  }
  for (let i = 0; i < object.c.length; i++) {
    const c = object.c[i]
    let p = current.childNodes[i]
    let _current = p
    if (typeof c === 'string') {
      if (!p || p.nodeName !== '#text') {
        _current = document.createTextNode(c)
        p ? current.replaceChild(_current, p) : current.appendChild(_current)
      } else if (p.nodeValue !== c) {
        p.nodeValue = c
      }
      continue
    }
    if (c.a && c.a.opaque && p) continue
    if (!p || p.localName !== c.t) {
      _current = c.a && c.a.template ? c.a.template.cloneNode(true) : document.createElement(c.t)
      p ? current.replaceChild(_current, p) : current.appendChild(_current)
    }
    r(c, _current)
  }
  if (current.childNodes.length > object.c.length) {
    const rg = document.createRange()
    rg.setStartBefore(current.children[object.c.length])
    rg.setEndAfter(current.lastElementChild)
    rg.deleteContents()
  }
}
