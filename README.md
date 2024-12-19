![skruv](./icon.svg)

# @skruv/liten

Small DOM abstraction with element reuse.

[Github](https://github.com/skruv/liten) • [NPM](https://www.npmjs.com/package/@skruv/liten)

Installation: `npm i @skruv/liten`

Exposes two exports:

- `r(virtualElement, currentElement = document.documentElement)`: The main render function
  - Takes in a `virtualElement` created by `e()` and patches `currentElement` (a HTMLElement) and it's children
  - `currentElement` defaults to the whole document
- `e`: A proxy object that returns `(attributes, ...children) => virtualElement` curried with the keyname. Creates constructors for elements.
  - `const {div, img} = e`
  - creates virtual elements for `r` or as children of other virtual elements
  - attributes is a plain object with HTML attributes
  - Children are either plain strings or elements created by `e`

This library is focused on size first, low-complexity second and performance third.

## Size

About 0.5kb when compressed:

```txt
467     index.min.js.br
553     index.min.js.zst
564     index.min.js.gz
1088    index.min.js
2074    index.js (without comments)
```

> [!TIP]
> For small apps it can be more efficient to inline the entire app in the html response to avoid a roundtrip and get better combined compression.

## Example

```js
import { r, e } from '@skruv/liten'
// Or `import { r, e } from 'https://unpkg.com/@skruv/liten/index.js'` if you don't want to install
const { html, body, div, h1, hr, 'my-custom-element': myCustomElement, button } = e

r(
  html({ lang: 'en' },
    body(false,
      div(false,
        h1(false, 'My custom element'),
        hr(),
        myCustomElement(),
        button(
          { onclick: () => { alert('Hello, small screw') } },
          'Greet'
        )
      )
    )
  )
)
```

## Etymology

"Liten skruv" means "small screw" in swedish. It is the smaller cousin of <https://github.com/skruv/skruv>.
