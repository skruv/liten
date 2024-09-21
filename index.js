const domCache = new WeakMap()
export const e = new Proxy({}, { get: (_, t) => (...c) => (c[0] && typeof c[0] === 'object' && !c[0].t) ? { t, a: c[0], c: c.slice(1) } : { a: {}, t, c } })
export const r = (object, current = document.documentElement, parent = current.parentNode) => {
  if (typeof object === 'string' || typeof object === 'number') {
    if (!current || current.nodeName !== '#text') {
      current ? parent.replaceChild(document.createTextNode('' + object), current) : parent.appendChild(document.createTextNode('' + object))
    } else if (current.nodeValue !== ('' + object)) {
      current.nodeValue = object
    }
    return // text nodes have no attributes or children, so exit early
  } else if (!current || current.localName !== object.t) {
    let _current
    if (domCache.has(object)) {
      _current = domCache.get(object).cloneNode(true)
      current ? parent.replaceChild(_current, current) : parent.appendChild(_current)
      return // If we have a cached node we skip attributes or children, so exit early
    }
    _current = document.createElement(object.t)
    domCache.set(object, _current)
    current ? parent.replaceChild(_current, current) : parent.appendChild(_current)
    current = _current
  }
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
  if (!object.c.length && current.childNodes.length) {
    current.textContent = ''
    return
  }
  for (const i in object.c) {
    r(object.c[i], current.childNodes[i] || null, current)
  }
  while (current.childNodes.length > object.c.length) {
    current.removeChild(current.childNodes[current.childNodes.length - 1])
  }
}
