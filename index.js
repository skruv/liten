const domCache = {}
const cache = new WeakMap()
export const e = new Proxy({}, { get: (_, t) => (...c) => (c[0] && typeof c[0] === 'object' && !c[0].t) ? { t, a: c[0], c: c.slice(1) } : { t, c } })
export const r = (object, current = document.documentElement) => {
  if (object.a) {
    for (const key in object.a) {
      if (key === 'key' || key === 'cache' || ('' + object.a[key]) === ('' + current.getAttribute(key))) continue
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
  if (!object.c.length && current.childNodes.length) current.textContent = ''
  if (!object.c.length) return
  for (const i in object.c) {
    const c = object.c[i]
    let p = current.childNodes[i] || null
    if (typeof c === 'string' || typeof c === 'number') {
      if (!p || p.nodeName !== '#text') {
        p ? current.replaceChild(document.createTextNode(c), p) : current.appendChild(document.createTextNode(c))
      } else if (p.nodeValue !== (typeof c === 'string' ? c : '' + c)) {
        p.nodeValue = c
      }
      continue
    }
    if (c.a?.cached && cache.has(c)) {
      if (cache.get(c) === p) continue
      let _current = cache.get(c).cloneNode(true)
      p ? current.replaceChild(_current, p) : current.appendChild(_current)
      continue
    }
    if (c.a?.key && cache.has(c.a.key)) {
      if (cache.get(c.a.key) === p) continue
      let _current = cache.get(c.a.key)
      p ? current.replaceChild(_current, p) : current.appendChild(_current)
      p = _current
      continue
    }
    if (!p || p.localName !== c.t) {
      let _current = (domCache[c.t] || (domCache[c.t] = document.createElement(c.t))).cloneNode(false)
      c.a?.cached && cache.set(c, _current)
      c.a?.key && cache.set(c.a.key, _current) && cache.set(_current, c.a.key)
      p ? current.replaceChild(_current, p) : current.appendChild(_current)
      r(c, _current)
      continue
    }
    r(c, p)
  }
  while (current.childNodes.length > object.c.length) {
    current.removeChild(current.childNodes[current.childNodes.length - 1])
  }
}
