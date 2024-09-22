const domCache = new WeakMap()
export const e = new Proxy({}, { get: (_, t) => (...c) => (c[0] && typeof c[0] === 'object' && !c[0].t) ? { t, a: c[0], c: c.slice(1) } : { a: null, t, c } })
export const r = (object, current = document.documentElement, parent = current.parentNode) => {
  if (!current || current.localName !== object.t) {
    let _current = document.createElement(object.t)
    domCache.set(object, _current)
    current ? parent.replaceChild(_current, current) : parent.appendChild(_current)
    current = _current
  }
  if (object.a) {
    for (const key in object.a) {
      if (('' + object.a[key]) === ('' + current.getAttribute(key))) { continue }
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
  if (!object.c.length && current.childNodes.length) {
    current.textContent = ''
    return
  }
  for (const i in object.c) {
    const c = object.c[i]
    const p = current.childNodes[i] || null
    if (typeof c === 'string' || typeof c === 'number') {
      if (!p || p.nodeName !== '#text') {
        p ? current.replaceChild(document.createTextNode(c), p) : current.appendChild(document.createTextNode(c))
      } else if (p.nodeValue !== ('' + c)) {
        p.nodeValue = c
      }
    } else if (domCache.has(c)) {
      let _current = domCache.get(c).cloneNode(true)
      p ? current.replaceChild(_current, c) : current.appendChild(_current)
    } else {
      r(c, p, current)
    }
  }
  while (current.childNodes.length > object.c.length) {
    current.removeChild(current.childNodes[current.childNodes.length - 1])
  }
}
