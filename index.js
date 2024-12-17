export const e = new Proxy({}, { get: (_, t) => (a = false, ...c) => ({ t, c, a }) })
export const r = (object, current = document.documentElement) => {
  if (object.a) {
    for (const key in object.a) {
      if ((key[0] === 'o' && key[1] === 'n' && current[key] === object.a[key]) || ('' + object.a[key]) === ('' + current.getAttribute(key))) continue
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
      // Old children, no new children
      current.textContent = ''
      return current
    }
    // Both old and new children, diff
    for (let i = 0; i < object.c.length; i++) {
      const c = object.c[i]
      const p = current.childNodes[i]
      if (typeof c === 'string') {
        if (!p) {
          current.append(c)
        } else if (p.nodeName !== '#text') {
          p.replaceWith(c)
        } else if (p.nodeValue !== c) {
          p.nodeValue = c
        }
        continue
      }
      if (!p) {
        current.append(r(c, document.createElement(c.t)))
      } else if (p.localName !== c.t) {
        p.replaceWith(r(c, document.createElement(c.t)))
      } else {
        r(c, p)
      }
    }
    if (current.childNodes.length > object.c.length) {
      const rg = document.createRange()
      rg.setStartBefore(current.children[object.c.length])
      rg.setEndAfter(current.lastElementChild)
      rg.deleteContents()
    }
  } else if (!object.c.length) {
    // No old children, no new children
  } else {
    // No old children, new children
    const newChildren = []
    for (let i = 0; i < object.c.length; i++) {
      const c = object.c[i]
      if (typeof c === 'string') {
        newChildren.push(c)
        continue
      }
      newChildren.push(r(c, document.createElement(c.t)))
    }
    current.append(...newChildren)
  }
  return current
}