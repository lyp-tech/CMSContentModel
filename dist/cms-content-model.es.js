var Oo = Object.defineProperty;
var Lo = (i, e, t) => e in i ? Oo(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var y = (i, e, t) => Lo(i, typeof e != "symbol" ? e + "" : e, t);
class Po extends HTMLElement {
  constructor() {
    super(), this.options = {
      links: [],
      shortlist: {
        count: 0,
        href: "/shortlist"
      },
      containerClass: ""
    }, this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["container-class"];
  }
  connectedCallback() {
    this.parseAttributes(), this.parseLinks(), this.render();
  }
  parseAttributes() {
    this.options.containerClass = this.getAttribute("container-class") || this.options.containerClass;
  }
  parseLinks() {
    const e = this.querySelector('script[type="application/json"]');
    if (e)
      try {
        const t = JSON.parse(e.textContent || "{}");
        Array.isArray(t.links) && (this.options.links = t.links), t.shortlist && (this.options.shortlist = { ...this.options.shortlist, ...t.shortlist }), t.containerClass && (this.options.containerClass = t.containerClass);
      } catch (t) {
        console.error("Failed to parse TopHeader data", t);
      }
  }
  renderLink(e) {
    return `
      <li class="flex items-center">
        <a href="${e.href}" 
           class="px-4 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
           ${e.text.includes(" ") ? `aria-label="${e.text}"` : ""}>
          ${e.text}
        </a>
      </li>
    `;
  }
  renderShortlist() {
    const { count: e, href: t } = this.options.shortlist;
    return `
      <li class="flex items-center">
        <a href="${t}"
           aria-label="Shortlist"
           class="px-4 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap">
          <span class="mr-1 text-[#E96A6A]">❤</span>
          My shortlisted
          <span class="ml-1">(${e})</span>
        </a>
      </li>
    `;
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #282e45;
          color: white;
          padding: 0.75rem 0;
          width: 100%;
          /* Force full width and prevent layout shifts */
          position: relative;
          box-sizing: border-box;
        }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          /* Ensure container takes full width */
          width: 100%;
          box-sizing: border-box;
        }
        .nav-container {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          /* Ensure nav takes full width of container */
          box-sizing: border-box;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0 0 0 auto; /* Push to the right */
          display: flex;
          gap: 1rem;
          /* Ensure ul doesn't exceed container */
          max-width: 100%;
          box-sizing: border-box;
        }
        li {
          display: flex;
        }
        a {
          color: inherit;
          text-decoration: none;
          padding: 0.25rem 0.75rem;
          white-space: nowrap;
        }
        a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      </style>
      <div class="container">
        <nav class="nav-container">
          <ul>
            ${this.options.links.map((e) => this.renderLink(e)).join(`
`)}
            ${this.renderShortlist()}
          </ul>
        </nav>
      </div>
    `;
  }
  // Handle attribute changes
  attributeChangedCallback(e, t, s) {
    e === "container-class" && s !== null && (this.options.containerClass = s, this.render());
  }
}
customElements.get("moe-top-header") || customElements.define("moe-top-header", Po);
function o(i, e, t, s) {
  var a = arguments.length, r = a < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(i, e, t, s);
  else for (var d = i.length - 1; d >= 0; d--) (n = i[d]) && (r = (a < 3 ? n(r) : a > 3 ? n(e, t, r) : n(e, t)) || r);
  return a > 3 && r && Object.defineProperty(e, t, r), r;
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ci = globalThis, wa = ci.ShadowRoot && (ci.ShadyCSS === void 0 || ci.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ka = Symbol(), dr = /* @__PURE__ */ new WeakMap();
let Xr = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ka) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (wa && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = dr.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && dr.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Bo = (i) => new Xr(typeof i == "string" ? i : i + "", void 0, ka), b = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, a, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + i[r + 1], i[0]);
  return new Xr(t, i, ka);
}, Ro = (i, e) => {
  if (wa) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), a = ci.litNonce;
    a !== void 0 && s.setAttribute("nonce", a), s.textContent = t.cssText, i.appendChild(s);
  }
}, lr = wa ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Bo(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Vo, defineProperty: No, getOwnPropertyDescriptor: zo, getOwnPropertyNames: Ho, getOwnPropertySymbols: Yo, getPrototypeOf: Uo } = Object, ft = globalThis, cr = ft.trustedTypes, qo = cr ? cr.emptyScript : "", Yi = ft.reactiveElementPolyfillSupport, Ss = (i, e) => i, rs = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? qo : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, xa = (i, e) => !Vo(i, e), hr = { attribute: !0, type: String, converter: rs, reflect: !1, useDefault: !1, hasChanged: xa };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ft.litPropertyMetadata ?? (ft.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ts = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = hr) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), a = this.getPropertyDescriptor(e, s, t);
      a !== void 0 && No(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: a, set: r } = zo(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: a, set(n) {
      const d = a == null ? void 0 : a.call(this);
      r == null || r.call(this, n), this.requestUpdate(e, d, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? hr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ss("elementProperties"))) return;
    const e = Uo(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ss("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ss("properties"))) {
      const t = this.properties, s = [...Ho(t), ...Yo(t)];
      for (const a of s) this.createProperty(a, t[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, a] of t) this.elementProperties.set(s, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const a = this._$Eu(t, s);
      a !== void 0 && this._$Eh.set(a, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const a of s) t.unshift(lr(a));
    } else e !== void 0 && t.push(lr(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ro(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var r;
    const s = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, s);
    if (a !== void 0 && s.reflect === !0) {
      const n = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : rs).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, n;
    const s = this.constructor, a = s._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const d = s.getPropertyOptions(a), l = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((r = d.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? d.converter : rs;
      this._$Em = a, this[a] = l.fromAttribute(t, d.type) ?? ((n = this._$Ej) == null ? void 0 : n.get(a)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, t, s) {
    var a;
    if (e !== void 0) {
      const r = this.constructor, n = this[e];
      if (s ?? (s = r.getPropertyOptions(e)), !((s.hasChanged ?? xa)(n, t) || s.useDefault && s.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: a, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [r, n] of a) {
        const { wrapped: d } = n, l = this[r];
        d !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((a) => {
        var r;
        return (r = a.hostUpdate) == null ? void 0 : r.call(a);
      }), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var a;
      return (a = s.hostUpdated) == null ? void 0 : a.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ts.elementStyles = [], ts.shadowRootOptions = { mode: "open" }, ts[Ss("elementProperties")] = /* @__PURE__ */ new Map(), ts[Ss("finalized")] = /* @__PURE__ */ new Map(), Yi == null || Yi({ ReactiveElement: ts }), (ft.reactiveElementVersions ?? (ft.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ts = globalThis, gi = Ts.trustedTypes, ur = gi ? gi.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Qr = "$lit$", gt = `lit$${Math.random().toFixed(9).slice(2)}$`, Jr = "?" + gt, jo = `<${Jr}>`, qt = document, Bs = () => qt.createComment(""), Rs = (i) => i === null || typeof i != "object" && typeof i != "function", _a = Array.isArray, Wo = (i) => _a(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Ui = `[ 	
\f\r]`, Cs = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pr = /-->/g, gr = />/g, Bt = RegExp(`>|${Ui}(?:([^\\s"'>=/]+)(${Ui}*=${Ui}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fr = /'/g, mr = /"/g, en = /^(?:script|style|textarea|title)$/i, Ko = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), p = Ko(1), $e = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), vr = /* @__PURE__ */ new WeakMap(), Vt = qt.createTreeWalker(qt, 129);
function tn(i, e) {
  if (!_a(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ur !== void 0 ? ur.createHTML(e) : e;
}
const Go = (i, e) => {
  const t = i.length - 1, s = [];
  let a, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Cs;
  for (let d = 0; d < t; d++) {
    const l = i[d];
    let h, u, g = -1, v = 0;
    for (; v < l.length && (n.lastIndex = v, u = n.exec(l), u !== null); ) v = n.lastIndex, n === Cs ? u[1] === "!--" ? n = pr : u[1] !== void 0 ? n = gr : u[2] !== void 0 ? (en.test(u[2]) && (a = RegExp("</" + u[2], "g")), n = Bt) : u[3] !== void 0 && (n = Bt) : n === Bt ? u[0] === ">" ? (n = a ?? Cs, g = -1) : u[1] === void 0 ? g = -2 : (g = n.lastIndex - u[2].length, h = u[1], n = u[3] === void 0 ? Bt : u[3] === '"' ? mr : fr) : n === mr || n === fr ? n = Bt : n === pr || n === gr ? n = Cs : (n = Bt, a = void 0);
    const m = n === Bt && i[d + 1].startsWith("/>") ? " " : "";
    r += n === Cs ? l + jo : g >= 0 ? (s.push(h), l.slice(0, g) + Qr + l.slice(g) + gt + m) : l + gt + (g === -2 ? d : m);
  }
  return [tn(i, r + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Vs {
  constructor({ strings: e, _$litType$: t }, s) {
    let a;
    this.parts = [];
    let r = 0, n = 0;
    const d = e.length - 1, l = this.parts, [h, u] = Go(e, t);
    if (this.el = Vs.createElement(h, s), Vt.currentNode = this.el.content, t === 2 || t === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (a = Vt.nextNode()) !== null && l.length < d; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const g of a.getAttributeNames()) if (g.endsWith(Qr)) {
          const v = u[n++], m = a.getAttribute(g).split(gt), x = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: r, name: x[2], strings: m, ctor: x[1] === "." ? Xo : x[1] === "?" ? Qo : x[1] === "@" ? Jo : xi }), a.removeAttribute(g);
        } else g.startsWith(gt) && (l.push({ type: 6, index: r }), a.removeAttribute(g));
        if (en.test(a.tagName)) {
          const g = a.textContent.split(gt), v = g.length - 1;
          if (v > 0) {
            a.textContent = gi ? gi.emptyScript : "";
            for (let m = 0; m < v; m++) a.append(g[m], Bs()), Vt.nextNode(), l.push({ type: 2, index: ++r });
            a.append(g[v], Bs());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Jr) l.push({ type: 2, index: r });
      else {
        let g = -1;
        for (; (g = a.data.indexOf(gt, g + 1)) !== -1; ) l.push({ type: 7, index: r }), g += gt.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const s = qt.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ns(i, e, t = i, s) {
  var n, d;
  if (e === $e) return e;
  let a = s !== void 0 ? (n = t._$Co) == null ? void 0 : n[s] : t._$Cl;
  const r = Rs(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== r && ((d = a == null ? void 0 : a._$AO) == null || d.call(a, !1), r === void 0 ? a = void 0 : (a = new r(i), a._$AT(i, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = a : t._$Cl = a), a !== void 0 && (e = ns(i, a._$AS(i, e.values), a, s)), e;
}
class Zo {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? qt).importNode(t, !0);
    Vt.currentNode = a;
    let r = Vt.nextNode(), n = 0, d = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new Ys(r, r.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (h = new ed(r, this, e)), this._$AV.push(h), l = s[++d];
      }
      n !== (l == null ? void 0 : l.index) && (r = Vt.nextNode(), n++);
    }
    return Vt.currentNode = qt, a;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class Ys {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, a) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ns(this, e, t), Rs(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== $e && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Wo(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== E && Rs(this._$AH) ? this._$AA.nextSibling.data = e : this.T(qt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: s } = e, a = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Vs.createElement(tn(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === a) this._$AH.p(t);
    else {
      const n = new Zo(a, this), d = n.u(this.options);
      n.p(t), this.T(d), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = vr.get(e.strings);
    return t === void 0 && vr.set(e.strings, t = new Vs(e)), t;
  }
  k(e) {
    _a(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, a = 0;
    for (const r of e) a === t.length ? t.push(s = new Ys(this.O(Bs()), this.O(Bs()), this, this.options)) : s = t[a], s._$AI(r), a++;
    a < t.length && (this._$AR(s && s._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class xi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, a, r) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = E;
  }
  _$AI(e, t = this, s, a) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) e = ns(this, e, t, 0), n = !Rs(e) || e !== this._$AH && e !== $e, n && (this._$AH = e);
    else {
      const d = e;
      let l, h;
      for (e = r[0], l = 0; l < r.length - 1; l++) h = ns(this, d[s + l], t, l), h === $e && (h = this._$AH[l]), n || (n = !Rs(h) || h !== this._$AH[l]), h === E ? e = E : e !== E && (e += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !a && this.j(e);
  }
  j(e) {
    e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xo extends xi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === E ? void 0 : e;
  }
}
class Qo extends xi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== E);
  }
}
class Jo extends xi {
  constructor(e, t, s, a, r) {
    super(e, t, s, a, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ns(this, e, t, 0) ?? E) === $e) return;
    const s = this._$AH, a = e === E && s !== E || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== E && (s === E || a);
    a && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ed {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ns(this, e);
  }
}
const qi = Ts.litHtmlPolyfillSupport;
qi == null || qi(Vs, Ys), (Ts.litHtmlVersions ?? (Ts.litHtmlVersions = [])).push("3.3.0");
const td = (i, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let a = s._$litPart$;
  if (a === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = a = new Ys(e.insertBefore(Bs(), r), r, void 0, t ?? {});
  }
  return a._$AI(i), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = globalThis;
let Is = class extends ts {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = td(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return $e;
  }
};
var Zr;
Is._$litElement$ = !0, Is.finalized = !0, (Zr = Ht.litElementHydrateSupport) == null || Zr.call(Ht, { LitElement: Is });
const ji = Ht.litElementPolyfillSupport;
ji == null || ji({ LitElement: Is });
(Ht.litElementVersions ?? (Ht.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sd = { attribute: !0, type: String, converter: rs, reflect: !1, hasChanged: xa }, id = (i = sd, e, t) => {
  const { kind: s, metadata: a } = t;
  let r = globalThis.litPropertyMetadata.get(a);
  if (r === void 0 && globalThis.litPropertyMetadata.set(a, r = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(t.name, i), s === "accessor") {
    const { name: n } = t;
    return { set(d) {
      const l = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(n, l, i);
    }, init(d) {
      return d !== void 0 && this.C(n, void 0, i, d), d;
    } };
  }
  if (s === "setter") {
    const { name: n } = t;
    return function(d) {
      const l = this[n];
      e.call(this, d), this.requestUpdate(n, l, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function c(i) {
  return (e, t) => typeof t == "object" ? id(i, e, t) : ((s, a, r) => {
    const n = a.hasOwnProperty(r);
    return a.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(a, r) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(i) {
  return c({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _i = (i, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(i, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(i, e) {
  return (t, s, a) => {
    const r = (n) => {
      var d;
      return ((d = n.renderRoot) == null ? void 0 : d.querySelector(i)) ?? null;
    };
    return _i(t, s, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function bt(i) {
  return (e, t) => _i(e, t, { async get() {
    var s;
    return await this.updateComplete, ((s = this.renderRoot) == null ? void 0 : s.querySelector(i)) ?? null;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ve(i) {
  return (e, t) => {
    const { slot: s, selector: a } = i ?? {}, r = "slot" + (s ? `[name=${s}]` : ":not([name])");
    return _i(e, t, { get() {
      var l;
      const n = (l = this.renderRoot) == null ? void 0 : l.querySelector(r), d = (n == null ? void 0 : n.assignedElements(i)) ?? [];
      return a === void 0 ? d : d.filter((h) => h.matches(a));
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Us(i) {
  return (e, t) => {
    const { slot: s } = i ?? {}, a = "slot" + (s ? `[name=${s}]` : ":not([name])");
    return _i(e, t, { get() {
      var n;
      const r = (n = this.renderRoot) == null ? void 0 : n.querySelector(a);
      return (r == null ? void 0 : r.assignedNodes(i)) ?? [];
    } });
  };
}
var ad = b`:host{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);color:var(--sgds-body-color-default);font-family:var(--sgds-font-family-brand);font-size:var(--sgds-font-size-2);font-weight:var(--sgds-font-weight-regular);line-height:var(--sgds-line-height-body);margin:0;*,:after,:before{box-sizing:border-box}:disabled{cursor:not-allowed}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}a[target=_blank]{align-items:center;display:flex;gap:var(--sgds-gap-2-xs)}::slotted(a[target=_blank]):after,a[target=_blank]:after{background-color:currentColor;content:"/";display:inline-block;-webkit-mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;padding:0 .45em}::slotted(svg){vertical-align:middle}}`;
class f extends Is {
  /** Emits a custom event with more convenient defaults. */
  emit(e, t) {
    const s = new CustomEvent(e, Object.assign({ bubbles: !0, cancelable: !1, composed: !0, detail: {} }, t));
    return this.dispatchEvent(s), s;
  }
  static define(e, t = this, s = {}) {
    if (!customElements.get(e)) {
      try {
        customElements.define(e, t, s);
      } catch {
        customElements.define(e, class extends t {
        }, s);
      }
      return;
    }
  }
  constructor() {
    super(), Object.entries(this.constructor.dependencies).forEach(([e, t]) => {
      this.constructor.define(e, t);
    });
  }
}
f.styles = [ad];
f.dependencies = {};
var rd = b`:host([variant=border]) .accordion{border:var(--sgds-border-width-1) solid var(--sgds-border-color-muted);border-radius:var(--sgds-border-radius-md)}`;
const nd = ["Enter", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
class fs extends f {
  constructor() {
    super(...arguments), this.allowMultiple = !1, this.variant = "default", this.density = "default";
  }
  /** @internal */
  get items() {
    return [...this.defaultNodes || []].filter((e) => typeof e.tagName < "u");
  }
  firstUpdated() {
    const e = [...this.items];
    e.forEach((t, s) => {
      if (e.length > 1)
        switch (s) {
          case 0:
            t.setAttribute("first-of-type", "");
            break;
          case e.length - 1:
            t.setAttribute("last-of-type", "");
            break;
          default:
            t.setAttribute("nth-of-type", "");
        }
      t.setAttribute("variant", this.variant), t.setAttribute("density", this.density);
    });
  }
  async _onToggle(e) {
    if (this.allowMultiple)
      return;
    const t = [...this.items];
    t && !t.length || t.forEach((s) => {
      e.composedPath().includes(s) || (s.open = !1);
    });
  }
  async _onKeyboardToggle(e) {
    if (nd.includes(e.key))
      return this._onToggle(e);
  }
  render() {
    return p`
      <div class="accordion">
        <slot @click=${this._onToggle} @keydown=${this._onKeyboardToggle}></slot>
      </div>
    `;
  }
}
fs.styles = [...f.styles, rd];
o([
  c({ type: Boolean, reflect: !0 })
], fs.prototype, "allowMultiple", void 0);
o([
  c({ type: String, reflect: !0 })
], fs.prototype, "variant", void 0);
o([
  c({ type: String, reflect: !0 })
], fs.prototype, "density", void 0);
o([
  ve()
], fs.prototype, "defaultNodes", void 0);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, qs = (i) => (...e) => ({ _$litDirective$: i, values: e });
let js = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this._$Ct = e, this._$AM = t, this._$Ci = s;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = qs(class extends js {
  constructor(i) {
    var e;
    if (super(i), i.type !== Ue.ATTRIBUTE || i.name !== "class" || ((e = i.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((e) => i[e]).join(" ") + " ";
  }
  update(i, [e]) {
    var s, a;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in e) e[r] && !((s = this.nt) != null && s.has(r)) && this.st.add(r);
      return this.render(e);
    }
    const t = i.element.classList;
    for (const r of this.st) r in e || (t.remove(r), this.st.delete(r));
    for (const r in e) {
      const n = !!e[r];
      n === this.st.has(r) || (a = this.nt) != null && a.has(r) || (n ? (t.add(r), this.st.add(r)) : (t.remove(r), this.st.delete(r)));
    }
    return $e;
  }
});
function oe(i, e, t) {
  return new Promise((s) => {
    if ((t == null ? void 0 : t.duration) === 1 / 0)
      throw new Error("Promise-based animations must be finite.");
    const a = i.animate(e, Object.assign(Object.assign({}, t), { duration: od() ? 0 : t == null ? void 0 : t.duration }));
    a.addEventListener("cancel", s, { once: !0 }), a.addEventListener("finish", s, { once: !0 });
  });
}
function od() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function os(i, e) {
  return i.map((t) => Object.assign(Object.assign({}, t), { height: t.height === "auto" ? `${e}px` : t.height }));
}
function ye(i) {
  return Promise.all(i.getAnimations().map((e) => new Promise((t) => {
    const s = requestAnimationFrame(t);
    e.addEventListener("cancel", () => s, { once: !0 }), e.addEventListener("finish", () => s, { once: !0 }), e.cancel();
  })));
}
const sn = /* @__PURE__ */ new Map(), dd = /* @__PURE__ */ new WeakMap();
function ld(i) {
  return i ?? { keyframes: [], options: { duration: 0 } };
}
function de(i, e) {
  const t = dd.get(i);
  if (t != null && t[e])
    return t[e];
  const s = sn.get(e);
  return s ? s : {
    keyframes: [],
    options: { duration: 0 }
  };
}
function G(i, e) {
  sn.set(i, ld(e));
}
function Le(i, e) {
  return new Promise((t) => {
    function s(a) {
      a.target === i && (i.removeEventListener(e, s), t());
    }
    i.addEventListener(e, s);
  });
}
function O(i, e) {
  const t = Object.assign({ waitUntilFirstUpdate: !1 }, e);
  return (s, a) => {
    const { update: r } = s;
    if (i in s) {
      const n = i;
      s.update = function(d) {
        if (d.has(n)) {
          const l = d.get(n), h = this[n];
          l !== h && (!t.waitUntilFirstUpdate || this.hasUpdated) && this[a](l, h);
        }
        r.call(this, d);
      };
    }
  };
}
var cd = b`:host([variant=border][last-of-type]) .accordion-item{border-bottom:none}:host([density=compact]) .accordion-btn{font-size:var(--sgds-font-size-2);line-height:var(--sgds-line-height-min);padding:var(--sgds-padding-sm) var(--sgds-padding-sm)}:host([density=compact]) .content{padding:var(--sgds-padding-xs) var(--sgds-padding-sm) var(--sgds-padding-sm)}.accordion-item{border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-muted)}.accordion-btn{align-items:center;background-color:var(--sgds-bg-transparent);border:0;color:var(--sgds-color-default);display:flex;font-size:var(--sgds-font-size-3);gap:var(--sgds-gap-sm);line-height:var(--sgds-line-height-heading);overflow-anchor:none;padding:var(--sgds-padding-lg) var(--sgds-padding-lg);text-align:left;width:100%}@media (prefers-reduced-motion:reduce){.accordion-btn,.accordion-btn:after{transition:none}}.accordion-btn:not(.collapsed){font-weight:var(--sgds-font-weight-semibold)}.accordion-btn:not(.disabled):hover,.accordion-btn:not(:disabled):hover{background-color:var(--sgds-bg-translucent-subtle);z-index:2}.accordion-btn:not(.disabled):focus,.accordion-btn:not(.disabled):focus-visible,.accordion-btn:not(:disabled):focus,.accordion-btn:not(:disabled):focus-visible{background-color:var(--sgds-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus);outline:0;z-index:3}.accordion-btn.disabled,.accordion-btn:disabled{cursor:not-allowed;opacity:var(--sgds-opacity-50)}slot[name=caret] sgds-icon,slot[name=caret]::slotted(*){color:var(--sgds-color-subtle);margin-left:auto;transition:transform .2s ease-in-out}.accordion-btn:not(.collapsed) slot[name=caret] sgds-icon,.accordion-btn:not(.collapsed) slot[name=caret]::slotted(*){transform:rotate(-180deg)}.accordion-body{overflow:hidden;padding:0}.content{display:block;padding:var(--sgds-padding-xs) var(--sgds-padding-lg) var(--sgds-padding-lg)}.hidden{display:none}`;
class kt extends f {
  constructor() {
    super(...arguments), this.open = !1, this.disabled = !1;
  }
  firstUpdated() {
    this.open || this.body.classList.add("hidden");
  }
  handleSummaryClick() {
    this.open ? this.hide() : this.show(), this.header.focus();
  }
  handleSummaryKeyDown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.open ? this.hide() : this.show()), (e.key === "ArrowUp" || e.key === "ArrowLeft") && (e.preventDefault(), this.hide()), (e.key === "ArrowDown" || e.key === "ArrowRight") && (e.preventDefault(), this.show());
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.emit("sgds-show", { cancelable: !0 }).defaultPrevented) {
        this.open = !1;
        return;
      }
      await ye(this.body), this.body.classList.remove("hidden");
      const { keyframes: t, options: s } = de(this, "accordion.show");
      await oe(this.body, os(t, this.body.scrollHeight), s), this.emit("sgds-after-show");
    } else {
      if (this.emit("sgds-hide", { cancelable: !0 }).defaultPrevented) {
        this.open = !0;
        return;
      }
      await ye(this.body);
      const { keyframes: t, options: s } = de(this, "accordion.hide"), a = s.duration;
      setTimeout(() => {
        this.body.classList.add("hidden");
      }, a - 20), await oe(this.body, os(t, this.body.scrollHeight), s), this.emit("sgds-after-hide");
    }
  }
  /** Shows the accordion. */
  async show() {
    if (!this.open)
      return this.open = !0, Le(this, "sgds-after-show");
  }
  /** Hide the accordion */
  async hide() {
    if (this.open)
      return this.open = !1, Le(this, "sgds-after-hide");
  }
  render() {
    return p`
      <div class="accordion-item">
        <button
          class=${T({
      "accordion-btn": !0,
      disabled: this.disabled,
      collapsed: !this.open
    })}
          ?disabled=${this.disabled}
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-controls="content"
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="header"></slot>
          <slot name="caret">
            <sgds-icon name="chevron-down" size=${this.getAttribute("density") === "compact" ? "md" : "lg"}></sgds-icon>
          </slot>
        </button>
        <div class="accordion-body">
          <slot id="content" name="content" class="content" role="region" aria-labelledby="header"></slot>
        </div>
      </div>
    `;
  }
}
kt.styles = [...f.styles, cd];
o([
  F(".accordion-item")
], kt.prototype, "accordion", void 0);
o([
  F(".accordion-btn")
], kt.prototype, "header", void 0);
o([
  F(".accordion-body")
], kt.prototype, "body", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], kt.prototype, "open", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], kt.prototype, "disabled", void 0);
o([
  O("open", { waitUntilFirstUpdate: !0 })
], kt.prototype, "handleOpenChange", null);
G("accordion.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 350, easing: "ease-in-out" }
});
G("accordion.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 350, easing: "ease-in-out" }
});
function hd(i) {
  return !!customElements.get(i);
}
function A(i, e) {
  customElements.get(i) || customElements.define(i, e);
}
function ud(i) {
  return hd(i) ? !0 : (console.error(`Custom element of name : ${i} is not registered. Remember to import the component file for custom element registration`), !1);
}
A("sgds-accordion", fs);
A("sgds-accordion-item", kt);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const an = Symbol.for(""), pd = (i) => {
  if ((i == null ? void 0 : i.r) === an) return i == null ? void 0 : i._$litStatic$;
}, ds = (i, ...e) => ({ _$litStatic$: e.reduce((t, s, a) => t + ((r) => {
  if (r._$litStatic$ !== void 0) return r._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(s) + i[a + 1], i[0]), r: an }), br = /* @__PURE__ */ new Map(), gd = (i) => (e, ...t) => {
  const s = t.length;
  let a, r;
  const n = [], d = [];
  let l, h = 0, u = !1;
  for (; h < s; ) {
    for (l = e[h]; h < s && (r = t[h], (a = pd(r)) !== void 0); ) l += a + e[++h], u = !0;
    h !== s && d.push(r), n.push(l), h++;
  }
  if (h === s && n.push(e[s]), u) {
    const g = n.join("$$lit$$");
    (e = br.get(g)) === void 0 && (n.raw = n, br.set(g, e = n)), t = d;
  }
  return i(e, ...t);
}, B = gd(p);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = (i) => i ?? E;
var fd = b`:host{--sgds-close-btn-border-radius:var(--sgds-border-radius-sm);display:inline-flex}.btn-close{align-items:center;background-color:var(--sgds-bg-transparent);border:0;border:var(--sgds-border-width-1) solid var(--sgds-border-color-transparent);border-radius:var(--sgds-close-btn-border-radius);cursor:pointer;display:flex;height:var(--sgds-dimension-32);justify-content:center;padding:0;position:relative;width:var(--sgds-dimension-32)}.btn-close-light{color:var(--sgds-color-fixed-light)}.btn-close-dark{color:var(--sgds-color-fixed-dark)}.btn-close:hover{background-color:var(--sgds-bg-translucent)}.btn-close:focus,.btn-close:focus-visible{background-color:var(--sgds-bg-translucent);box-shadow:var(--sgds-box-shadow-focus);outline:0}.btn-close-sm{height:var(--sgds-dimension-24);width:var(--sgds-dimension-24)}.btn-close.btn-close-sm{height:var(--sgds-icon-size-sm);width:var(--sgds-icon-size-sm)}`;
class Ze extends f {
  constructor() {
    super(...arguments), this.ariaLabel = "Close button", this.size = "md", this.variant = "default", this._clickHandler = () => {
    };
  }
  _handleClick() {
    this.removeEventListener("click", this._clickHandler), this.addEventListener("click", this._clickHandler);
  }
  firstUpdated() {
    ud("sgds-icon");
  }
  render() {
    return p`
      <button
        class=${T({
      "btn-close": !0,
      [`btn-close-${this.size}`]: this.size,
      "btn-close-light": this.variant === "light",
      "btn-close-dark": this.variant === "dark"
    })}
        aria-label=${C(this.ariaLabel)}
        @click=${this._handleClick}
      >
        <sgds-icon name="cross" size=${this.size}></sgds-icon>
      </button>
    `;
  }
}
Ze.styles = [...f.styles, fd];
o([
  c({ type: String })
], Ze.prototype, "ariaLabel", void 0);
o([
  c({ type: String, reflect: !0 })
], Ze.prototype, "size", void 0);
o([
  c({ type: String, reflect: !0 })
], Ze.prototype, "variant", void 0);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ia = class extends js {
  constructor(e) {
    if (super(e), this.it = E, e.type !== Ue.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === E || e == null) return this._t = void 0, this.it = e;
    if (e === $e) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
};
ia.directiveName = "unsafeHTML", ia.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class aa extends ia {
}
aa.directiveName = "unsafeSVG", aa.resultType = 2;
const md = qs(aa);
var vd = b`:host{color:inherit;display:inline-flex}:host([size=sm]) svg{height:var(--sgds-icon-size-sm);width:var(--sgds-icon-size-sm)}:host([size=md]) svg{height:var(--sgds-icon-size-md);width:var(--sgds-icon-size-md)}:host([size=xl]) svg{height:var(--sgds-icon-size-xl);width:var(--sgds-icon-size-xl)}:host([size="2-xl"]) svg{height:var(--sgds-icon-size-2-xl);width:var(--sgds-icon-size-2-xl)}:host([size="3-xl"]) svg{height:var(--sgds-icon-size-3-xl);width:var(--sgds-icon-size-3-xl)}svg{display:inline-block;height:var(--sgds-icon-size-lg);width:var(--sgds-icon-size-lg)}`;
class re extends f {
  constructor() {
    super(...arguments), this.size = "lg", this._svgContent = null;
  }
  async updated(e) {
    e.has("name") && await this._loadSvg(this.name);
  }
  async _loadSvg(e) {
    if (e) {
      const t = e.split("-").map((s) => String(s).charAt(0).toUpperCase() + String(s).slice(1)).join("");
      try {
        const a = (await import("./icon-registry-zJMECsRF.js"))[t];
        if (a)
          this._svgContent = a;
        else
          throw new Error("icon `name` not found");
      } catch (s) {
        console.error(`Unable to load icon: ${e}.`, s);
      }
    }
  }
  render() {
    return B`${md(this._svgContent)}`;
  }
}
re.styles = [...f.styles, vd];
o([
  c({ type: String, reflect: !0 })
], re.prototype, "name", void 0);
o([
  c({ type: String, reflect: !0 })
], re.prototype, "size", void 0);
o([
  R()
], re.prototype, "_svgContent", void 0);
var bd = b`:host([variant=success]) .alert{background-color:var(--sgds-success-surface-default)}:host([variant=warning]) .alert{--sgds-alert-color:var(--sgds-color-fixed-dark);background-color:var(--sgds-warning-surface-default)}:host([variant=danger]) .alert{background-color:var(--sgds-danger-surface-default)}:host([variant=neutral]) .alert{background-color:var(--sgds-neutral-surface-default)}:host([variant=success][outlined]) .alert{background-color:var(--sgds-success-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-success-border-color-default)}:host([variant=warning][outlined]) .alert{background-color:var(--sgds-warning-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-warning-border-color-default)}:host([variant=danger][outlined]) .alert{background-color:var(--sgds-danger-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-danger-border-color-default)}:host([variant=neutral][outlined]) .alert{background-color:var(--sgds-neutral-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-neutral-border-color-default)}.alert{--sgds-alert-color:var(--sgds-color-fixed-light);background-color:var(--sgds-primary-surface-default);border:var(--sgds-border-width-1) solid var(--sgds-border-color-transparent);border-radius:var(--sgds-border-radius-md);color:var(--sgds-alert-color);display:flex;flex-direction:row;gap:var(--sgds-gap-sm);padding:var(--sgds-padding-lg)}.alert.outlined{--sgds-alert-color:var(--sgds-color-fixed-dark);background-color:var(--sgds-primary-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-primary-border-color-default)}.alert-content{align-items:flex-start;display:flex;flex:1 0 0;flex-direction:column;gap:var(--sgds-gap-2-xs);padding-right:var(--sgds-padding-2-xl)}.alert-title{font-weight:var(--sgds-font-weight-semibold)}`;
class it extends f {
  constructor() {
    super(...arguments), this.show = !1, this.dismissible = !1, this.variant = "info", this.outlined = !1;
  }
  /** Closes the alert  */
  close() {
    this.show = !1;
  }
  /**@internal */
  _handleShowChange() {
    this.show ? this.emit("sgds-show") : this.emit("sgds-hide");
  }
  render() {
    return this.dismissible && this.show || !this.dismissible ? B`
          <div
            class="${T({
      alert: !0,
      show: this.show,
      "alert-dismissible": this.dismissible,
      outlined: this.outlined
    })}"
            role="alert"
            aria-hidden=${this.show ? "false" : "true"}
          >
            <slot name="icon"></slot>
            <div class="alert-content">
              ${this.title ? B`<div class="alert-title">${this.title}</div>` : E}
              <slot></slot>
            </div>
            ${this.dismissible ? B`<sgds-close-button
                  aria-label="close the alert"
                  @click=${this.close}
                  variant=${this.outlined ? "dark" : "light"}
                ></sgds-close-button>` : E}
          </div>
        ` : E;
  }
}
it.styles = [...f.styles, bd];
it.dependencies = {
  "sgds-close-button": Ze,
  "sgds-icon": re
};
o([
  c({ type: Boolean, reflect: !0 })
], it.prototype, "show", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], it.prototype, "dismissible", void 0);
o([
  c({ type: String, reflect: !0 })
], it.prototype, "variant", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], it.prototype, "outlined", void 0);
o([
  c({ type: String, reflect: !0 })
], it.prototype, "title", void 0);
o([
  O("show")
], it.prototype, "_handleShowChange", null);
var yd = b`:host{cursor:pointer;display:inline-block}.alert-link,.alert-link:hover{color:var(--sgds-alert-color);text-decoration-line:underline}.alert-link:focus,.alert-link:focus-visible{box-shadow:var(--sgds-box-shadow-focus);outline:0}`, Ca = b`::slotted(a[target=_blank]:after),a[target=_blank]:after{background-color:currentColor;content:"/";display:inline-block;margin:0 .125rem;-webkit-mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;mask-size:73%;-webkit-mask-size:73%;padding:0 .45em}`;
class Ci extends f {
  render() {
    return B`
      <a class="alert-link" href=${C(this.href)} target=${C(this.target)} tabindex="0"><slot></slot></a>
    `;
  }
}
Ci.styles = [...f.styles, Ca, yd];
o([
  c({ type: String, reflect: !0 })
], Ci.prototype, "href", void 0);
o([
  c()
], Ci.prototype, "target", void 0);
A("sgds-alert", it);
A("sgds-alert-link", Ci);
var wd = b`:host{display:inline-flex}:host([variant=success]) .badge{background-color:var(--sgds-success-surface-default)}:host([variant=danger]) .badge{background-color:var(--sgds-danger-surface-default)}:host([variant=warning]) .badge{background-color:var(--sgds-warning-surface-default);color:var(--sgds-color-fixed-dark)}:host([variant=neutral]) .badge{background-color:var(--sgds-neutral-surface-default)}:host([variant=success][outlined]) .badge{background-color:var(--sgds-success-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-success-border-color-default)}:host([variant=danger][outlined]) .badge{background-color:var(--sgds-danger-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-danger-border-color-default)}:host([variant=warning][outlined]) .badge{background-color:var(--sgds-warning-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-warning-border-color-default)}:host([variant=neutral][outlined]) .badge{background-color:var(--sgds-neutral-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-neutral-border-color-default)}.badge{align-items:center;background-color:var(--sgds-primary-surface-default);border:var(--sgds-border-width-1) solid var(--sgds-border-color-transparent);border-radius:var(--sgds-border-radius-sm);color:var(--sgds-color-fixed-light);display:inline-flex;font-size:var(--sgds-font-size-1);height:var(--sgds-dimension-24);justify-content:center;min-width:var(--sgds-dimension-24);padding:var(--sgds-padding-none) var(--sgds-padding-2-xs)}.badge.outlined{background-color:var(--sgds-primary-surface-muted);border:var(--sgds-border-width-1) solid var(--sgds-primary-border-color-default);color:var(--sgds-color-fixed-dark)}.badge-label{line-height:var(--sgds-line-height-min);padding:var(--sgds-padding-none) var(--sgds-padding-2-xs)}.badge-dismissible{padding-right:0}.badge-dimissible sgds-close-button{--sgds-close-btn-border-radius:var(--sgds-border-radius-sm)}slot::slotted(*){font-size:14px;font-weight:400}`;
class at extends f {
  constructor() {
    super(...arguments), this.show = !1, this.variant = "info", this.outlined = !1, this.dismissible = !1;
  }
  /** Closes the badge  */
  close() {
    this.show = !1;
  }
  /**@internal */
  _handleShowChange() {
    this.show ? this.emit("sgds-show") : this.emit("sgds-hide");
  }
  render() {
    return this.dismissible && this.show || !this.dismissible ? p`
          <div
            class="  
          ${T({
      "badge-dismissible": this.dismissible,
      badge: !0,
      outlined: this.outlined
    })}
            "
            aria-hidden=${this.show ? "false" : "true"}
          >
            ${this.dismissible ? E : p`<slot name="icon"></slot>`}
            <span class="badge-label">
              <slot></slot>
            </span>

            ${this.dismissible ? p`<sgds-close-button
                  size="sm"
                  aria-label="close the badge"
                  @click=${this.close}
                  variant=${this.outlined ? "dark" : "light"}
                ></sgds-close-button>` : E}
          </div>
        ` : E;
  }
}
at.styles = [...f.styles, wd];
at.dependencies = {
  "sgds-close-button": Ze
};
o([
  c({ type: Boolean, reflect: !0 })
], at.prototype, "show", void 0);
o([
  c({ reflect: !0 })
], at.prototype, "variant", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], at.prototype, "outlined", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], at.prototype, "dismissible", void 0);
o([
  O("show")
], at.prototype, "_handleShowChange", null);
A("sgds-badge", at);
var kd = b`:host([size=sm]) .overflow-btn{height:var(--sgds-dimension-24);width:var(--sgds-dimension-24)}.overflow-btn{align-items:center;background-color:var(--sgds-bg-transparent);border:0;border-radius:var(--sgds-border-radius-sm);cursor:pointer;display:flex;height:var(--sgds-dimension-32);justify-content:center;padding:0;position:relative;width:var(--sgds-dimension-32)}.overflow-btn:hover{background-color:var(--sgds-bg-translucent-subtle)}.overflow-btn:focus,.overflow-btn:focus-visible{background-color:var(--sgds-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus);outline:0}`;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rn = (i) => i.strings === void 0, xd = {}, _d = (i, e = xd) => i._$AH = e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ms = (i, e) => {
  var s;
  const t = i._$AN;
  if (t === void 0) return !1;
  for (const a of t) (s = a._$AO) == null || s.call(a, e, !1), Ms(a, e);
  return !0;
}, fi = (i) => {
  let e, t;
  do {
    if ((e = i._$AM) === void 0) break;
    t = e._$AN, t.delete(i), i = e;
  } while ((t == null ? void 0 : t.size) === 0);
}, nn = (i) => {
  for (let e; e = i._$AM; i = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(i)) break;
    t.add(i), Ed(e);
  }
};
function Cd(i) {
  this._$AN !== void 0 ? (fi(this), this._$AM = i, nn(this)) : this._$AM = i;
}
function $d(i, e = !1, t = 0) {
  const s = this._$AH, a = this._$AN;
  if (a !== void 0 && a.size !== 0) if (e) if (Array.isArray(s)) for (let r = t; r < s.length; r++) Ms(s[r], !1), fi(s[r]);
  else s != null && (Ms(s, !1), fi(s));
  else Ms(this, i);
}
const Ed = (i) => {
  i.type == Ue.CHILD && (i._$AP ?? (i._$AP = $d), i._$AQ ?? (i._$AQ = Cd));
};
class Ad extends js {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, s) {
    super._$AT(e, t, s), nn(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    var s, a;
    e !== this.isConnected && (this.isConnected = e, e ? (s = this.reconnected) == null || s.call(this) : (a = this.disconnected) == null || a.call(this)), t && (Ms(this, e), fi(this));
  }
  setValue(e) {
    if (rn(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $a = () => new Dd();
class Dd {
}
const Wi = /* @__PURE__ */ new WeakMap(), Ws = qs(class extends Ad {
  render(i) {
    return E;
  }
  update(i, [e]) {
    var s;
    const t = e !== this.G;
    return t && this.G !== void 0 && this.rt(void 0), (t || this.lt !== this.ct) && (this.G = e, this.ht = (s = i.options) == null ? void 0 : s.host, this.rt(this.ct = i.element)), E;
  }
  rt(i) {
    if (this.isConnected || (i = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let t = Wi.get(e);
      t === void 0 && (t = /* @__PURE__ */ new WeakMap(), Wi.set(e, t)), t.get(this.G) !== void 0 && this.G.call(this.ht, void 0), t.set(this.G, i), i !== void 0 && this.G.call(this.ht, i);
    } else this.G.value = i;
  }
  get lt() {
    var i, e;
    return typeof this.G == "function" ? (i = Wi.get(this.ht ?? globalThis)) == null ? void 0 : i.get(this.G) : (e = this.G) == null ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
var fe = "top", Ee = "bottom", Ae = "right", me = "left", $i = "auto", ms = [fe, Ee, Ae, me], jt = "start", ls = "end", on = "clippingParents", Ea = "viewport", ss = "popper", dn = "reference", ra = /* @__PURE__ */ ms.reduce(function(i, e) {
  return i.concat([e + "-" + jt, e + "-" + ls]);
}, []), Aa = /* @__PURE__ */ [].concat(ms, [$i]).reduce(function(i, e) {
  return i.concat([e, e + "-" + jt, e + "-" + ls]);
}, []), ln = "beforeRead", cn = "read", hn = "afterRead", un = "beforeMain", pn = "main", gn = "afterMain", fn = "beforeWrite", mn = "write", vn = "afterWrite", bn = [ln, cn, hn, un, pn, gn, fn, mn, vn];
function Ge(i) {
  return i ? (i.nodeName || "").toLowerCase() : null;
}
function De(i) {
  if (i == null)
    return window;
  if (i.toString() !== "[object Window]") {
    var e = i.ownerDocument;
    return e && e.defaultView || window;
  }
  return i;
}
function Wt(i) {
  var e = De(i).Element;
  return i instanceof e || i instanceof Element;
}
function Fe(i) {
  var e = De(i).HTMLElement;
  return i instanceof e || i instanceof HTMLElement;
}
function Da(i) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = De(i).ShadowRoot;
  return i instanceof e || i instanceof ShadowRoot;
}
function Sd(i) {
  var e = i.state;
  Object.keys(e.elements).forEach(function(t) {
    var s = e.styles[t] || {}, a = e.attributes[t] || {}, r = e.elements[t];
    !Fe(r) || !Ge(r) || (Object.assign(r.style, s), Object.keys(a).forEach(function(n) {
      var d = a[n];
      d === !1 ? r.removeAttribute(n) : r.setAttribute(n, d === !0 ? "" : d);
    }));
  });
}
function Td(i) {
  var e = i.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(s) {
      var a = e.elements[s], r = e.attributes[s] || {}, n = Object.keys(e.styles.hasOwnProperty(s) ? e.styles[s] : t[s]), d = n.reduce(function(l, h) {
        return l[h] = "", l;
      }, {});
      !Fe(a) || !Ge(a) || (Object.assign(a.style, d), Object.keys(r).forEach(function(l) {
        a.removeAttribute(l);
      }));
    });
  };
}
const Sa = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Sd,
  effect: Td,
  requires: ["computeStyles"]
};
function Ke(i) {
  return i.split("-")[0];
}
var Yt = Math.max, mi = Math.min, cs = Math.round;
function na() {
  var i = navigator.userAgentData;
  return i != null && i.brands && Array.isArray(i.brands) ? i.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function yn() {
  return !/^((?!chrome|android).)*safari/i.test(na());
}
function hs(i, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var s = i.getBoundingClientRect(), a = 1, r = 1;
  e && Fe(i) && (a = i.offsetWidth > 0 && cs(s.width) / i.offsetWidth || 1, r = i.offsetHeight > 0 && cs(s.height) / i.offsetHeight || 1);
  var n = Wt(i) ? De(i) : window, d = n.visualViewport, l = !yn() && t, h = (s.left + (l && d ? d.offsetLeft : 0)) / a, u = (s.top + (l && d ? d.offsetTop : 0)) / r, g = s.width / a, v = s.height / r;
  return {
    width: g,
    height: v,
    top: u,
    right: h + g,
    bottom: u + v,
    left: h,
    x: h,
    y: u
  };
}
function Ta(i) {
  var e = hs(i), t = i.offsetWidth, s = i.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - s) <= 1 && (s = e.height), {
    x: i.offsetLeft,
    y: i.offsetTop,
    width: t,
    height: s
  };
}
function wn(i, e) {
  var t = e.getRootNode && e.getRootNode();
  if (i.contains(e))
    return !0;
  if (t && Da(t)) {
    var s = e;
    do {
      if (s && i.isSameNode(s))
        return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function tt(i) {
  return De(i).getComputedStyle(i);
}
function Id(i) {
  return ["table", "td", "th"].indexOf(Ge(i)) >= 0;
}
function xt(i) {
  return ((Wt(i) ? i.ownerDocument : (
    // $FlowFixMe[prop-missing]
    i.document
  )) || window.document).documentElement;
}
function Ei(i) {
  return Ge(i) === "html" ? i : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    i.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    i.parentNode || // DOM Element detected
    (Da(i) ? i.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    xt(i)
  );
}
function yr(i) {
  return !Fe(i) || // https://github.com/popperjs/popper-core/issues/837
  tt(i).position === "fixed" ? null : i.offsetParent;
}
function Md(i) {
  var e = /firefox/i.test(na()), t = /Trident/i.test(na());
  if (t && Fe(i)) {
    var s = tt(i);
    if (s.position === "fixed")
      return null;
  }
  var a = Ei(i);
  for (Da(a) && (a = a.host); Fe(a) && ["html", "body"].indexOf(Ge(a)) < 0; ) {
    var r = tt(a);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || e && r.willChange === "filter" || e && r.filter && r.filter !== "none")
      return a;
    a = a.parentNode;
  }
  return null;
}
function Ks(i) {
  for (var e = De(i), t = yr(i); t && Id(t) && tt(t).position === "static"; )
    t = yr(t);
  return t && (Ge(t) === "html" || Ge(t) === "body" && tt(t).position === "static") ? e : t || Md(i) || e;
}
function Ia(i) {
  return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y";
}
function Fs(i, e, t) {
  return Yt(i, mi(e, t));
}
function Fd(i, e, t) {
  var s = Fs(i, e, t);
  return s > t ? t : s;
}
function kn() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function xn(i) {
  return Object.assign({}, kn(), i);
}
function _n(i, e) {
  return e.reduce(function(t, s) {
    return t[s] = i, t;
  }, {});
}
var Od = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, xn(typeof e != "number" ? e : _n(e, ms));
};
function Ld(i) {
  var e, t = i.state, s = i.name, a = i.options, r = t.elements.arrow, n = t.modifiersData.popperOffsets, d = Ke(t.placement), l = Ia(d), h = [me, Ae].indexOf(d) >= 0, u = h ? "height" : "width";
  if (!(!r || !n)) {
    var g = Od(a.padding, t), v = Ta(r), m = l === "y" ? fe : me, x = l === "y" ? Ee : Ae, w = t.rects.reference[u] + t.rects.reference[l] - n[l] - t.rects.popper[u], S = n[l] - t.rects.reference[l], L = Ks(r), H = L ? l === "y" ? L.clientHeight || 0 : L.clientWidth || 0 : 0, _ = w / 2 - S / 2, k = g[m], I = H - v[u] - g[x], P = H / 2 - v[u] / 2 + _, N = Fs(k, P, I), Z = l;
    t.modifiersData[s] = (e = {}, e[Z] = N, e.centerOffset = N - P, e);
  }
}
function Pd(i) {
  var e = i.state, t = i.options, s = t.element, a = s === void 0 ? "[data-popper-arrow]" : s;
  a != null && (typeof a == "string" && (a = e.elements.popper.querySelector(a), !a) || wn(e.elements.popper, a) && (e.elements.arrow = a));
}
const Cn = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ld,
  effect: Pd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function us(i) {
  return i.split("-")[1];
}
var Bd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Rd(i, e) {
  var t = i.x, s = i.y, a = e.devicePixelRatio || 1;
  return {
    x: cs(t * a) / a || 0,
    y: cs(s * a) / a || 0
  };
}
function wr(i) {
  var e, t = i.popper, s = i.popperRect, a = i.placement, r = i.variation, n = i.offsets, d = i.position, l = i.gpuAcceleration, h = i.adaptive, u = i.roundOffsets, g = i.isFixed, v = n.x, m = v === void 0 ? 0 : v, x = n.y, w = x === void 0 ? 0 : x, S = typeof u == "function" ? u({
    x: m,
    y: w
  }) : {
    x: m,
    y: w
  };
  m = S.x, w = S.y;
  var L = n.hasOwnProperty("x"), H = n.hasOwnProperty("y"), _ = me, k = fe, I = window;
  if (h) {
    var P = Ks(t), N = "clientHeight", Z = "clientWidth";
    if (P === De(t) && (P = xt(t), tt(P).position !== "static" && d === "absolute" && (N = "scrollHeight", Z = "scrollWidth")), P = P, a === fe || (a === me || a === Ae) && r === ls) {
      k = Ee;
      var X = g && P === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[N]
      );
      w -= X - s.height, w *= l ? 1 : -1;
    }
    if (a === me || (a === fe || a === Ee) && r === ls) {
      _ = Ae;
      var te = g && P === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[Z]
      );
      m -= te - s.width, m *= l ? 1 : -1;
    }
  }
  var ne = Object.assign({
    position: d
  }, h && Bd), xe = u === !0 ? Rd({
    x: m,
    y: w
  }, De(t)) : {
    x: m,
    y: w
  };
  if (m = xe.x, w = xe.y, l) {
    var ge;
    return Object.assign({}, ne, (ge = {}, ge[k] = H ? "0" : "", ge[_] = L ? "0" : "", ge.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + w + "px)" : "translate3d(" + m + "px, " + w + "px, 0)", ge));
  }
  return Object.assign({}, ne, (e = {}, e[k] = H ? w + "px" : "", e[_] = L ? m + "px" : "", e.transform = "", e));
}
function Vd(i) {
  var e = i.state, t = i.options, s = t.gpuAcceleration, a = s === void 0 ? !0 : s, r = t.adaptive, n = r === void 0 ? !0 : r, d = t.roundOffsets, l = d === void 0 ? !0 : d, h = {
    placement: Ke(e.placement),
    variation: us(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: a,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, wr(Object.assign({}, h, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: n,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, wr(Object.assign({}, h, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Ma = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Vd,
  data: {}
};
var oi = {
  passive: !0
};
function Nd(i) {
  var e = i.state, t = i.instance, s = i.options, a = s.scroll, r = a === void 0 ? !0 : a, n = s.resize, d = n === void 0 ? !0 : n, l = De(e.elements.popper), h = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return r && h.forEach(function(u) {
    u.addEventListener("scroll", t.update, oi);
  }), d && l.addEventListener("resize", t.update, oi), function() {
    r && h.forEach(function(u) {
      u.removeEventListener("scroll", t.update, oi);
    }), d && l.removeEventListener("resize", t.update, oi);
  };
}
const Fa = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Nd,
  data: {}
};
var zd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function hi(i) {
  return i.replace(/left|right|bottom|top/g, function(e) {
    return zd[e];
  });
}
var Hd = {
  start: "end",
  end: "start"
};
function kr(i) {
  return i.replace(/start|end/g, function(e) {
    return Hd[e];
  });
}
function Oa(i) {
  var e = De(i), t = e.pageXOffset, s = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: s
  };
}
function La(i) {
  return hs(xt(i)).left + Oa(i).scrollLeft;
}
function Yd(i, e) {
  var t = De(i), s = xt(i), a = t.visualViewport, r = s.clientWidth, n = s.clientHeight, d = 0, l = 0;
  if (a) {
    r = a.width, n = a.height;
    var h = yn();
    (h || !h && e === "fixed") && (d = a.offsetLeft, l = a.offsetTop);
  }
  return {
    width: r,
    height: n,
    x: d + La(i),
    y: l
  };
}
function Ud(i) {
  var e, t = xt(i), s = Oa(i), a = (e = i.ownerDocument) == null ? void 0 : e.body, r = Yt(t.scrollWidth, t.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), n = Yt(t.scrollHeight, t.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), d = -s.scrollLeft + La(i), l = -s.scrollTop;
  return tt(a || t).direction === "rtl" && (d += Yt(t.clientWidth, a ? a.clientWidth : 0) - r), {
    width: r,
    height: n,
    x: d,
    y: l
  };
}
function Pa(i) {
  var e = tt(i), t = e.overflow, s = e.overflowX, a = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + a + s);
}
function $n(i) {
  return ["html", "body", "#document"].indexOf(Ge(i)) >= 0 ? i.ownerDocument.body : Fe(i) && Pa(i) ? i : $n(Ei(i));
}
function Os(i, e) {
  var t;
  e === void 0 && (e = []);
  var s = $n(i), a = s === ((t = i.ownerDocument) == null ? void 0 : t.body), r = De(s), n = a ? [r].concat(r.visualViewport || [], Pa(s) ? s : []) : s, d = e.concat(n);
  return a ? d : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    d.concat(Os(Ei(n)))
  );
}
function oa(i) {
  return Object.assign({}, i, {
    left: i.x,
    top: i.y,
    right: i.x + i.width,
    bottom: i.y + i.height
  });
}
function qd(i, e) {
  var t = hs(i, !1, e === "fixed");
  return t.top = t.top + i.clientTop, t.left = t.left + i.clientLeft, t.bottom = t.top + i.clientHeight, t.right = t.left + i.clientWidth, t.width = i.clientWidth, t.height = i.clientHeight, t.x = t.left, t.y = t.top, t;
}
function xr(i, e, t) {
  return e === Ea ? oa(Yd(i, t)) : Wt(e) ? qd(e, t) : oa(Ud(xt(i)));
}
function jd(i) {
  var e = Os(Ei(i)), t = ["absolute", "fixed"].indexOf(tt(i).position) >= 0, s = t && Fe(i) ? Ks(i) : i;
  return Wt(s) ? e.filter(function(a) {
    return Wt(a) && wn(a, s) && Ge(a) !== "body";
  }) : [];
}
function Wd(i, e, t, s) {
  var a = e === "clippingParents" ? jd(i) : [].concat(e), r = [].concat(a, [t]), n = r[0], d = r.reduce(function(l, h) {
    var u = xr(i, h, s);
    return l.top = Yt(u.top, l.top), l.right = mi(u.right, l.right), l.bottom = mi(u.bottom, l.bottom), l.left = Yt(u.left, l.left), l;
  }, xr(i, n, s));
  return d.width = d.right - d.left, d.height = d.bottom - d.top, d.x = d.left, d.y = d.top, d;
}
function En(i) {
  var e = i.reference, t = i.element, s = i.placement, a = s ? Ke(s) : null, r = s ? us(s) : null, n = e.x + e.width / 2 - t.width / 2, d = e.y + e.height / 2 - t.height / 2, l;
  switch (a) {
    case fe:
      l = {
        x: n,
        y: e.y - t.height
      };
      break;
    case Ee:
      l = {
        x: n,
        y: e.y + e.height
      };
      break;
    case Ae:
      l = {
        x: e.x + e.width,
        y: d
      };
      break;
    case me:
      l = {
        x: e.x - t.width,
        y: d
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var h = a ? Ia(a) : null;
  if (h != null) {
    var u = h === "y" ? "height" : "width";
    switch (r) {
      case jt:
        l[h] = l[h] - (e[u] / 2 - t[u] / 2);
        break;
      case ls:
        l[h] = l[h] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return l;
}
function ps(i, e) {
  e === void 0 && (e = {});
  var t = e, s = t.placement, a = s === void 0 ? i.placement : s, r = t.strategy, n = r === void 0 ? i.strategy : r, d = t.boundary, l = d === void 0 ? on : d, h = t.rootBoundary, u = h === void 0 ? Ea : h, g = t.elementContext, v = g === void 0 ? ss : g, m = t.altBoundary, x = m === void 0 ? !1 : m, w = t.padding, S = w === void 0 ? 0 : w, L = xn(typeof S != "number" ? S : _n(S, ms)), H = v === ss ? dn : ss, _ = i.rects.popper, k = i.elements[x ? H : v], I = Wd(Wt(k) ? k : k.contextElement || xt(i.elements.popper), l, u, n), P = hs(i.elements.reference), N = En({
    reference: P,
    element: _,
    placement: a
  }), Z = oa(Object.assign({}, _, N)), X = v === ss ? Z : P, te = {
    top: I.top - X.top + L.top,
    bottom: X.bottom - I.bottom + L.bottom,
    left: I.left - X.left + L.left,
    right: X.right - I.right + L.right
  }, ne = i.modifiersData.offset;
  if (v === ss && ne) {
    var xe = ne[a];
    Object.keys(te).forEach(function(ge) {
      var Mt = [Ae, Ee].indexOf(ge) >= 0 ? 1 : -1, Ft = [fe, Ee].indexOf(ge) >= 0 ? "y" : "x";
      te[ge] += xe[Ft] * Mt;
    });
  }
  return te;
}
function Kd(i, e) {
  e === void 0 && (e = {});
  var t = e, s = t.placement, a = t.boundary, r = t.rootBoundary, n = t.padding, d = t.flipVariations, l = t.allowedAutoPlacements, h = l === void 0 ? Aa : l, u = us(s), g = u ? d ? ra : ra.filter(function(x) {
    return us(x) === u;
  }) : ms, v = g.filter(function(x) {
    return h.indexOf(x) >= 0;
  });
  v.length === 0 && (v = g);
  var m = v.reduce(function(x, w) {
    return x[w] = ps(i, {
      placement: w,
      boundary: a,
      rootBoundary: r,
      padding: n
    })[Ke(w)], x;
  }, {});
  return Object.keys(m).sort(function(x, w) {
    return m[x] - m[w];
  });
}
function Gd(i) {
  if (Ke(i) === $i)
    return [];
  var e = hi(i);
  return [kr(i), e, kr(e)];
}
function Zd(i) {
  var e = i.state, t = i.options, s = i.name;
  if (!e.modifiersData[s]._skip) {
    for (var a = t.mainAxis, r = a === void 0 ? !0 : a, n = t.altAxis, d = n === void 0 ? !0 : n, l = t.fallbackPlacements, h = t.padding, u = t.boundary, g = t.rootBoundary, v = t.altBoundary, m = t.flipVariations, x = m === void 0 ? !0 : m, w = t.allowedAutoPlacements, S = e.options.placement, L = Ke(S), H = L === S, _ = l || (H || !x ? [hi(S)] : Gd(S)), k = [S].concat(_).reduce(function(Qt, ht) {
      return Qt.concat(Ke(ht) === $i ? Kd(e, {
        placement: ht,
        boundary: u,
        rootBoundary: g,
        padding: h,
        flipVariations: x,
        allowedAutoPlacements: w
      }) : ht);
    }, []), I = e.rects.reference, P = e.rects.popper, N = /* @__PURE__ */ new Map(), Z = !0, X = k[0], te = 0; te < k.length; te++) {
      var ne = k[te], xe = Ke(ne), ge = us(ne) === jt, Mt = [fe, Ee].indexOf(xe) >= 0, Ft = Mt ? "width" : "height", _e = ps(e, {
        placement: ne,
        boundary: u,
        rootBoundary: g,
        altBoundary: v,
        padding: h
      }), Re = Mt ? ge ? Ae : me : ge ? Ee : fe;
      I[Ft] > P[Ft] && (Re = hi(Re));
      var si = hi(Re), Ot = [];
      if (r && Ot.push(_e[xe] <= 0), d && Ot.push(_e[Re] <= 0, _e[si] <= 0), Ot.every(function(Qt) {
        return Qt;
      })) {
        X = ne, Z = !1;
        break;
      }
      N.set(ne, Ot);
    }
    if (Z)
      for (var ii = x ? 3 : 1, Vi = function(ht) {
        var _s = k.find(function(ri) {
          var Lt = N.get(ri);
          if (Lt)
            return Lt.slice(0, ht).every(function(Ni) {
              return Ni;
            });
        });
        if (_s)
          return X = _s, "break";
      }, xs = ii; xs > 0; xs--) {
        var ai = Vi(xs);
        if (ai === "break") break;
      }
    e.placement !== X && (e.modifiersData[s]._skip = !0, e.placement = X, e.reset = !0);
  }
}
const An = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Zd,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function _r(i, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: i.top - e.height - t.y,
    right: i.right - e.width + t.x,
    bottom: i.bottom - e.height + t.y,
    left: i.left - e.width - t.x
  };
}
function Cr(i) {
  return [fe, Ae, Ee, me].some(function(e) {
    return i[e] >= 0;
  });
}
function Xd(i) {
  var e = i.state, t = i.name, s = e.rects.reference, a = e.rects.popper, r = e.modifiersData.preventOverflow, n = ps(e, {
    elementContext: "reference"
  }), d = ps(e, {
    altBoundary: !0
  }), l = _r(n, s), h = _r(d, a, r), u = Cr(l), g = Cr(h);
  e.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: h,
    isReferenceHidden: u,
    hasPopperEscaped: g
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": g
  });
}
const Dn = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Xd
};
function Qd(i, e, t) {
  var s = Ke(i), a = [me, fe].indexOf(s) >= 0 ? -1 : 1, r = typeof t == "function" ? t(Object.assign({}, e, {
    placement: i
  })) : t, n = r[0], d = r[1];
  return n = n || 0, d = (d || 0) * a, [me, Ae].indexOf(s) >= 0 ? {
    x: d,
    y: n
  } : {
    x: n,
    y: d
  };
}
function Jd(i) {
  var e = i.state, t = i.options, s = i.name, a = t.offset, r = a === void 0 ? [0, 0] : a, n = Aa.reduce(function(u, g) {
    return u[g] = Qd(g, e.rects, r), u;
  }, {}), d = n[e.placement], l = d.x, h = d.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += h), e.modifiersData[s] = n;
}
const Sn = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Jd
};
function el(i) {
  var e = i.state, t = i.name;
  e.modifiersData[t] = En({
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
const Ba = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: el,
  data: {}
};
function tl(i) {
  return i === "x" ? "y" : "x";
}
function sl(i) {
  var e = i.state, t = i.options, s = i.name, a = t.mainAxis, r = a === void 0 ? !0 : a, n = t.altAxis, d = n === void 0 ? !1 : n, l = t.boundary, h = t.rootBoundary, u = t.altBoundary, g = t.padding, v = t.tether, m = v === void 0 ? !0 : v, x = t.tetherOffset, w = x === void 0 ? 0 : x, S = ps(e, {
    boundary: l,
    rootBoundary: h,
    padding: g,
    altBoundary: u
  }), L = Ke(e.placement), H = us(e.placement), _ = !H, k = Ia(L), I = tl(k), P = e.modifiersData.popperOffsets, N = e.rects.reference, Z = e.rects.popper, X = typeof w == "function" ? w(Object.assign({}, e.rects, {
    placement: e.placement
  })) : w, te = typeof X == "number" ? {
    mainAxis: X,
    altAxis: X
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, X), ne = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, xe = {
    x: 0,
    y: 0
  };
  if (P) {
    if (r) {
      var ge, Mt = k === "y" ? fe : me, Ft = k === "y" ? Ee : Ae, _e = k === "y" ? "height" : "width", Re = P[k], si = Re + S[Mt], Ot = Re - S[Ft], ii = m ? -Z[_e] / 2 : 0, Vi = H === jt ? N[_e] : Z[_e], xs = H === jt ? -Z[_e] : -N[_e], ai = e.elements.arrow, Qt = m && ai ? Ta(ai) : {
        width: 0,
        height: 0
      }, ht = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : kn(), _s = ht[Mt], ri = ht[Ft], Lt = Fs(0, N[_e], Qt[_e]), Ni = _ ? N[_e] / 2 - ii - Lt - _s - te.mainAxis : Vi - Lt - _s - te.mainAxis, Do = _ ? -N[_e] / 2 + ii + Lt + ri + te.mainAxis : xs + Lt + ri + te.mainAxis, zi = e.elements.arrow && Ks(e.elements.arrow), So = zi ? k === "y" ? zi.clientTop || 0 : zi.clientLeft || 0 : 0, Ja = (ge = ne == null ? void 0 : ne[k]) != null ? ge : 0, To = Re + Ni - Ja - So, Io = Re + Do - Ja, er = Fs(m ? mi(si, To) : si, Re, m ? Yt(Ot, Io) : Ot);
      P[k] = er, xe[k] = er - Re;
    }
    if (d) {
      var tr, Mo = k === "x" ? fe : me, Fo = k === "x" ? Ee : Ae, Pt = P[I], ni = I === "y" ? "height" : "width", sr = Pt + S[Mo], ir = Pt - S[Fo], Hi = [fe, me].indexOf(L) !== -1, ar = (tr = ne == null ? void 0 : ne[I]) != null ? tr : 0, rr = Hi ? sr : Pt - N[ni] - Z[ni] - ar + te.altAxis, nr = Hi ? Pt + N[ni] + Z[ni] - ar - te.altAxis : ir, or = m && Hi ? Fd(rr, Pt, nr) : Fs(m ? rr : sr, Pt, m ? nr : ir);
      P[I] = or, xe[I] = or - Pt;
    }
    e.modifiersData[s] = xe;
  }
}
const Tn = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: sl,
  requiresIfExists: ["offset"]
};
function il(i) {
  return {
    scrollLeft: i.scrollLeft,
    scrollTop: i.scrollTop
  };
}
function al(i) {
  return i === De(i) || !Fe(i) ? Oa(i) : il(i);
}
function rl(i) {
  var e = i.getBoundingClientRect(), t = cs(e.width) / i.offsetWidth || 1, s = cs(e.height) / i.offsetHeight || 1;
  return t !== 1 || s !== 1;
}
function nl(i, e, t) {
  t === void 0 && (t = !1);
  var s = Fe(e), a = Fe(e) && rl(e), r = xt(e), n = hs(i, a, t), d = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (s || !s && !t) && ((Ge(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Pa(r)) && (d = al(e)), Fe(e) ? (l = hs(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : r && (l.x = La(r))), {
    x: n.left + d.scrollLeft - l.x,
    y: n.top + d.scrollTop - l.y,
    width: n.width,
    height: n.height
  };
}
function ol(i) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), s = [];
  i.forEach(function(r) {
    e.set(r.name, r);
  });
  function a(r) {
    t.add(r.name);
    var n = [].concat(r.requires || [], r.requiresIfExists || []);
    n.forEach(function(d) {
      if (!t.has(d)) {
        var l = e.get(d);
        l && a(l);
      }
    }), s.push(r);
  }
  return i.forEach(function(r) {
    t.has(r.name) || a(r);
  }), s;
}
function dl(i) {
  var e = ol(i);
  return bn.reduce(function(t, s) {
    return t.concat(e.filter(function(a) {
      return a.phase === s;
    }));
  }, []);
}
function ll(i) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(i());
      });
    })), e;
  };
}
function cl(i) {
  var e = i.reduce(function(t, s) {
    var a = t[s.name];
    return t[s.name] = a ? Object.assign({}, a, s, {
      options: Object.assign({}, a.options, s.options),
      data: Object.assign({}, a.data, s.data)
    }) : s, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var $r = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Er() {
  for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
    e[t] = arguments[t];
  return !e.some(function(s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function Ai(i) {
  i === void 0 && (i = {});
  var e = i, t = e.defaultModifiers, s = t === void 0 ? [] : t, a = e.defaultOptions, r = a === void 0 ? $r : a;
  return function(d, l, h) {
    h === void 0 && (h = r);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, $r, r),
      modifiersData: {},
      elements: {
        reference: d,
        popper: l
      },
      attributes: {},
      styles: {}
    }, g = [], v = !1, m = {
      state: u,
      setOptions: function(L) {
        var H = typeof L == "function" ? L(u.options) : L;
        w(), u.options = Object.assign({}, r, u.options, H), u.scrollParents = {
          reference: Wt(d) ? Os(d) : d.contextElement ? Os(d.contextElement) : [],
          popper: Os(l)
        };
        var _ = dl(cl([].concat(s, u.options.modifiers)));
        return u.orderedModifiers = _.filter(function(k) {
          return k.enabled;
        }), x(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!v) {
          var L = u.elements, H = L.reference, _ = L.popper;
          if (Er(H, _)) {
            u.rects = {
              reference: nl(H, Ks(_), u.options.strategy === "fixed"),
              popper: Ta(_)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(te) {
              return u.modifiersData[te.name] = Object.assign({}, te.data);
            });
            for (var k = 0; k < u.orderedModifiers.length; k++) {
              if (u.reset === !0) {
                u.reset = !1, k = -1;
                continue;
              }
              var I = u.orderedModifiers[k], P = I.fn, N = I.options, Z = N === void 0 ? {} : N, X = I.name;
              typeof P == "function" && (u = P({
                state: u,
                options: Z,
                name: X,
                instance: m
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ll(function() {
        return new Promise(function(S) {
          m.forceUpdate(), S(u);
        });
      }),
      destroy: function() {
        w(), v = !0;
      }
    };
    if (!Er(d, l))
      return m;
    m.setOptions(h).then(function(S) {
      !v && h.onFirstUpdate && h.onFirstUpdate(S);
    });
    function x() {
      u.orderedModifiers.forEach(function(S) {
        var L = S.name, H = S.options, _ = H === void 0 ? {} : H, k = S.effect;
        if (typeof k == "function") {
          var I = k({
            state: u,
            name: L,
            instance: m,
            options: _
          }), P = function() {
          };
          g.push(I || P);
        }
      });
    }
    function w() {
      g.forEach(function(S) {
        return S();
      }), g = [];
    }
    return m;
  };
}
var hl = /* @__PURE__ */ Ai(), ul = [Fa, Ba, Ma, Sa], pl = /* @__PURE__ */ Ai({
  defaultModifiers: ul
}), gl = [Fa, Ba, Ma, Sa, Sn, An, Tn, Cn, Dn], Ra = /* @__PURE__ */ Ai({
  defaultModifiers: gl
});
const In = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: gn,
  afterRead: hn,
  afterWrite: vn,
  applyStyles: Sa,
  arrow: Cn,
  auto: $i,
  basePlacements: ms,
  beforeMain: un,
  beforeRead: ln,
  beforeWrite: fn,
  bottom: Ee,
  clippingParents: on,
  computeStyles: Ma,
  createPopper: Ra,
  createPopperBase: hl,
  createPopperLite: pl,
  detectOverflow: ps,
  end: ls,
  eventListeners: Fa,
  flip: An,
  hide: Dn,
  left: me,
  main: pn,
  modifierPhases: bn,
  offset: Sn,
  placements: Aa,
  popper: ss,
  popperGenerator: Ai,
  popperOffsets: Ba,
  preventOverflow: Tn,
  read: cn,
  reference: dn,
  right: Ae,
  start: jt,
  top: fe,
  variationPlacements: ra,
  viewport: Ea,
  write: mn
}, Symbol.toStringTag, { value: "Module" })), ut = /* @__PURE__ */ new Map(), Ki = {
  set(i, e, t) {
    ut.has(i) || ut.set(i, /* @__PURE__ */ new Map());
    const s = ut.get(i);
    if (!s.has(e) && s.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
      return;
    }
    s.set(e, t);
  },
  get(i, e) {
    return ut.has(i) && ut.get(i).get(e) || null;
  },
  remove(i, e) {
    if (!ut.has(i))
      return;
    const t = ut.get(i);
    t.delete(e), t.size === 0 && ut.delete(i);
  }
}, fl = 1e6, ml = 1e3, da = "transitionend", Mn = (i) => (i && window.CSS && window.CSS.escape && (i = i.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)), i), vl = (i) => i == null ? `${i}` : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase(), bl = (i) => {
  do
    i += Math.floor(Math.random() * fl);
  while (document.getElementById(i));
  return i;
}, yl = (i) => {
  if (!i)
    return 0;
  let { transitionDuration: e, transitionDelay: t } = window.getComputedStyle(i);
  const s = Number.parseFloat(e), a = Number.parseFloat(t);
  return !s && !a ? 0 : (e = e.split(",")[0], t = t.split(",")[0], (Number.parseFloat(e) + Number.parseFloat(t)) * ml);
}, wl = (i) => {
  i.dispatchEvent(new Event(da));
}, mt = (i) => !i || typeof i != "object" ? !1 : (typeof i.jquery < "u" && (i = i[0]), typeof i.nodeType < "u"), Ns = (i) => mt(i) ? i.jquery ? i[0] : i : typeof i == "string" && i.length > 0 ? document.querySelector(Mn(i)) : null, Fn = (i) => {
  if (!mt(i) || i.getClientRects().length === 0)
    return !1;
  const e = getComputedStyle(i).getPropertyValue("visibility") === "visible", t = i.closest("details:not([open])");
  if (!t)
    return e;
  if (t !== i) {
    const s = i.closest("summary");
    if (s && s.parentNode !== t || s === null)
      return !1;
  }
  return e;
}, la = (i) => !i || i.nodeType !== Node.ELEMENT_NODE || i.classList.contains("disabled") ? !0 : typeof i.disabled < "u" ? i.disabled : i.hasAttribute("disabled") && i.getAttribute("disabled") !== "false", On = (i) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof i.getRootNode == "function") {
    const e = i.getRootNode();
    return e instanceof ShadowRoot ? e : null;
  }
  return i instanceof ShadowRoot ? i : i.parentNode ? On(i.parentNode) : null;
}, vi = () => {
}, Ln = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Gi = [], kl = (i) => {
  document.readyState === "loading" ? (Gi.length || document.addEventListener("DOMContentLoaded", () => {
    for (const e of Gi)
      e();
  }), Gi.push(i)) : i();
}, yt = () => document.documentElement.dir === "rtl", Pn = (i) => {
  kl(() => {
    const e = Ln();
    if (e) {
      const t = i.NAME, s = e.fn[t];
      e.fn[t] = i.jQueryInterface, e.fn[t].Constructor = i, e.fn[t].noConflict = () => (e.fn[t] = s, i.jQueryInterface);
    }
  });
}, Ut = (i, e = [], t = i) => typeof i == "function" ? i.call(...e) : t, xl = (i, e, t = !0) => {
  if (!t) {
    Ut(i);
    return;
  }
  const a = yl(e) + 5;
  let r = !1;
  const n = ({ target: d }) => {
    d === e && (r = !0, e.removeEventListener(da, n), Ut(i));
  };
  e.addEventListener(da, n), setTimeout(() => {
    r || wl(e);
  }, a);
}, _l = (i, e, t, s) => {
  const a = i.length;
  let r = i.indexOf(e);
  return r === -1 ? !t && s ? i[a - 1] : i[0] : (r += t ? 1 : -1, s && (r = (r + a) % a), i[Math.max(0, Math.min(r, a - 1))]);
}, Cl = /[^.]*(?=\..*)\.|.*/, $l = /\..*/, El = /::\d+$/, Zi = {};
let Ar = 1;
const Bn = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, Al = /* @__PURE__ */ new Set([
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll"
]);
function Rn(i, e) {
  return e && `${e}::${Ar++}` || i.uidEvent || Ar++;
}
function Vn(i) {
  const e = Rn(i);
  return i.uidEvent = e, Zi[e] = Zi[e] || {}, Zi[e];
}
function Dl(i, e) {
  return function t(s) {
    return Va(s, { delegateTarget: i }), t.oneOff && j.off(i, s.type, e), e.apply(i, [s]);
  };
}
function Sl(i, e, t) {
  return function s(a) {
    const r = i.querySelectorAll(e);
    for (let { target: n } = a; n && n !== this; n = n.parentNode)
      for (const d of r)
        if (d === n)
          return Va(a, { delegateTarget: n }), s.oneOff && j.off(i, a.type, e, t), t.apply(n, [a]);
  };
}
function Nn(i, e, t = null) {
  return Object.values(i).find((s) => s.callable === e && s.delegationSelector === t);
}
function zn(i, e, t) {
  const s = typeof e == "string", a = s ? t : e || t;
  let r = Hn(i);
  return Al.has(r) || (r = i), [s, a, r];
}
function Dr(i, e, t, s, a) {
  if (typeof e != "string" || !i)
    return;
  let [r, n, d] = zn(e, t, s);
  e in Bn && (n = ((x) => function(w) {
    if (!w.relatedTarget || w.relatedTarget !== w.delegateTarget && !w.delegateTarget.contains(w.relatedTarget))
      return x.call(this, w);
  })(n));
  const l = Vn(i), h = l[d] || (l[d] = {}), u = Nn(h, n, r ? t : null);
  if (u) {
    u.oneOff = u.oneOff && a;
    return;
  }
  const g = Rn(n, e.replace(Cl, "")), v = r ? Sl(i, t, n) : Dl(i, n);
  v.delegationSelector = r ? t : null, v.callable = n, v.oneOff = a, v.uidEvent = g, h[g] = v, i.addEventListener(d, v, r);
}
function ca(i, e, t, s, a) {
  const r = Nn(e[t], s, a);
  r && (i.removeEventListener(t, r, !!a), delete e[t][r.uidEvent]);
}
function Tl(i, e, t, s) {
  const a = e[t] || {};
  for (const [r, n] of Object.entries(a))
    r.includes(s) && ca(i, e, t, n.callable, n.delegationSelector);
}
function Hn(i) {
  return i = i.replace($l, ""), Bn[i] || i;
}
const j = {
  on(i, e, t, s) {
    Dr(i, e, t, s, !1);
  },
  one(i, e, t, s) {
    Dr(i, e, t, s, !0);
  },
  off(i, e, t, s) {
    if (typeof e != "string" || !i)
      return;
    const [a, r, n] = zn(e, t, s), d = n !== e, l = Vn(i), h = l[n] || {}, u = e.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(h).length)
        return;
      ca(i, l, n, r, a ? t : null);
      return;
    }
    if (u)
      for (const g of Object.keys(l))
        Tl(i, l, g, e.slice(1));
    for (const [g, v] of Object.entries(h)) {
      const m = g.replace(El, "");
      (!d || e.includes(m)) && ca(i, l, n, v.callable, v.delegationSelector);
    }
  },
  trigger(i, e, t) {
    if (typeof e != "string" || !i)
      return null;
    const s = Ln(), a = Hn(e), r = e !== a;
    let n = null, d = !0, l = !0, h = !1;
    r && s && (n = s.Event(e, t), s(i).trigger(n), d = !n.isPropagationStopped(), l = !n.isImmediatePropagationStopped(), h = n.isDefaultPrevented());
    const u = Va(new Event(e, { bubbles: d, cancelable: !0 }), t);
    return h && u.preventDefault(), l && i.dispatchEvent(u), u.defaultPrevented && n && n.preventDefault(), u;
  }
};
function Va(i, e = {}) {
  for (const [t, s] of Object.entries(e))
    try {
      i[t] = s;
    } catch {
      Object.defineProperty(i, t, {
        configurable: !0,
        get() {
          return s;
        }
      });
    }
  return i;
}
function Sr(i) {
  if (i === "true")
    return !0;
  if (i === "false")
    return !1;
  if (i === Number(i).toString())
    return Number(i);
  if (i === "" || i === "null")
    return null;
  if (typeof i != "string")
    return i;
  try {
    return JSON.parse(decodeURIComponent(i));
  } catch {
    return i;
  }
}
function Xi(i) {
  return i.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
const zs = {
  setDataAttribute(i, e, t) {
    i.setAttribute(`data-bs-${Xi(e)}`, t);
  },
  removeDataAttribute(i, e) {
    i.removeAttribute(`data-bs-${Xi(e)}`);
  },
  getDataAttributes(i) {
    if (!i)
      return {};
    const e = {}, t = Object.keys(i.dataset).filter((s) => s.startsWith("bs") && !s.startsWith("bsConfig"));
    for (const s of t) {
      let a = s.replace(/^bs/, "");
      a = a.charAt(0).toLowerCase() + a.slice(1), e[a] = Sr(i.dataset[s]);
    }
    return e;
  },
  getDataAttribute(i, e) {
    return Sr(i.getAttribute(`data-bs-${Xi(e)}`));
  }
};
class Yn {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(e) {
    return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e;
  }
  _mergeConfigObj(e, t) {
    const s = mt(t) ? zs.getDataAttribute(t, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof s == "object" ? s : {},
      ...mt(t) ? zs.getDataAttributes(t) : {},
      ...typeof e == "object" ? e : {}
    };
  }
  _typeCheckConfig(e, t = this.constructor.DefaultType) {
    for (const [s, a] of Object.entries(t)) {
      const r = e[s], n = mt(r) ? "element" : vl(r);
      if (!new RegExp(a).test(n))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${n}" but expected type "${a}".`
        );
    }
  }
}
const Il = "5.3.6";
class Un extends Yn {
  constructor(e, t) {
    super(), e = Ns(e), e && (this._element = e, this._config = this._getConfig(t), Ki.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Ki.remove(this._element, this.constructor.DATA_KEY), j.off(this._element, this.constructor.EVENT_KEY);
    for (const e of Object.getOwnPropertyNames(this))
      this[e] = null;
  }
  // Private
  _queueCallback(e, t, s = !0) {
    xl(e, t, s);
  }
  _getConfig(e) {
    return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  // Static
  static getInstance(e) {
    return Ki.get(Ns(e), this.DATA_KEY);
  }
  static getOrCreateInstance(e, t = {}) {
    return this.getInstance(e) || new this(e, typeof t == "object" ? t : null);
  }
  static get VERSION() {
    return Il;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(e) {
    return `${e}${this.EVENT_KEY}`;
  }
}
const Qi = (i) => {
  let e = i.getAttribute("data-bs-target");
  if (!e || e === "#") {
    let t = i.getAttribute("href");
    if (!t || !t.includes("#") && !t.startsWith("."))
      return null;
    t.includes("#") && !t.startsWith("#") && (t = `#${t.split("#")[1]}`), e = t && t !== "#" ? t.trim() : null;
  }
  return e ? e.split(",").map((t) => Mn(t)).join(",") : null;
}, Me = {
  find(i, e = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(e, i));
  },
  findOne(i, e = document.documentElement) {
    return Element.prototype.querySelector.call(e, i);
  },
  children(i, e) {
    return [].concat(...i.children).filter((t) => t.matches(e));
  },
  parents(i, e) {
    const t = [];
    let s = i.parentNode.closest(e);
    for (; s; )
      t.push(s), s = s.parentNode.closest(e);
    return t;
  },
  prev(i, e) {
    let t = i.previousElementSibling;
    for (; t; ) {
      if (t.matches(e))
        return [t];
      t = t.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(i, e) {
    let t = i.nextElementSibling;
    for (; t; ) {
      if (t.matches(e))
        return [t];
      t = t.nextElementSibling;
    }
    return [];
  },
  focusableChildren(i) {
    const e = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]'
    ].map((t) => `${t}:not([tabindex^="-"])`).join(",");
    return this.find(e, i).filter((t) => !la(t) && Fn(t));
  },
  getSelectorFromElement(i) {
    const e = Qi(i);
    return e && Me.findOne(e) ? e : null;
  },
  getElementFromSelector(i) {
    const e = Qi(i);
    return e ? Me.findOne(e) : null;
  },
  getMultipleElementsFromSelector(i) {
    const e = Qi(i);
    return e ? Me.find(e) : [];
  }
}, Tr = "dropdown", Ml = "bs.dropdown", Kt = `.${Ml}`, Na = ".data-api", Fl = "Escape", Ir = "Tab", Ol = "ArrowUp", Mr = "ArrowDown", Ll = 2, Pl = `hide${Kt}`, Bl = `hidden${Kt}`, Rl = `show${Kt}`, Vl = `shown${Kt}`, qn = `click${Kt}${Na}`, jn = `keydown${Kt}${Na}`, Nl = `keyup${Kt}${Na}`, is = "show", zl = "dropup", Hl = "dropend", Yl = "dropstart", Ul = "dropup-center", ql = "dropdown-center", Nt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', jl = `${Nt}.${is}`, ui = ".dropdown-menu", Wl = ".navbar", Kl = ".navbar-nav", Gl = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Zl = yt() ? "top-end" : "top-start", Xl = yt() ? "top-start" : "top-end", Ql = yt() ? "bottom-end" : "bottom-start", Jl = yt() ? "bottom-start" : "bottom-end", ec = yt() ? "left-start" : "right-start", tc = yt() ? "right-start" : "left-start", sc = "top", ic = "bottom", ac = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, rc = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class Ve extends Un {
  constructor(e, t) {
    super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = Me.next(this._element, ui)[0] || Me.prev(this._element, ui)[0] || Me.findOne(ui, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return ac;
  }
  static get DefaultType() {
    return rc;
  }
  static get NAME() {
    return Tr;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (la(this._element) || this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    if (!j.trigger(this._element, Rl, e).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Kl))
        for (const s of [].concat(...document.body.children))
          j.on(s, "mouseover", vi);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(is), this._element.classList.add(is), j.trigger(this._element, Vl, e);
    }
  }
  hide() {
    if (la(this._element) || !this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    this._completeHide(e);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(e) {
    if (!j.trigger(this._element, Pl, e).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const s of [].concat(...document.body.children))
          j.off(s, "mouseover", vi);
      this._popper && this._popper.destroy(), this._menu.classList.remove(is), this._element.classList.remove(is), this._element.setAttribute("aria-expanded", "false"), zs.removeDataAttribute(this._menu, "popper"), j.trigger(this._element, Bl, e), this._element.focus();
    }
  }
  _getConfig(e) {
    if (e = super._getConfig(e), typeof e.reference == "object" && !mt(e.reference) && typeof e.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Tr.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return e;
  }
  _createPopper() {
    if (typeof In > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let e = this._element;
    this._config.reference === "parent" ? e = this._parent : mt(this._config.reference) ? e = Ns(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
    const t = this._getPopperConfig();
    this._popper = Ra(e, this._menu, t);
  }
  _isShown() {
    return this._menu.classList.contains(is);
  }
  _getPlacement() {
    const e = this._parent;
    if (e.classList.contains(Hl))
      return ec;
    if (e.classList.contains(Yl))
      return tc;
    if (e.classList.contains(Ul))
      return sc;
    if (e.classList.contains(ql))
      return ic;
    const t = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return e.classList.contains(zl) ? t ? Xl : Zl : t ? Jl : Ql;
  }
  _detectNavbar() {
    return this._element.closest(Wl) !== null;
  }
  _getOffset() {
    const { offset: e } = this._config;
    return typeof e == "string" ? e.split(",").map((t) => Number.parseInt(t, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
  }
  _getPopperConfig() {
    const e = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }
      ]
    };
    return (this._inNavbar || this._config.display === "static") && (zs.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...e,
      ...Ut(this._config.popperConfig, [void 0, e])
    };
  }
  _selectMenuItem({ key: e, target: t }) {
    const s = Me.find(Gl, this._menu).filter((a) => Fn(a));
    s.length && _l(s, t, e === Mr, !s.includes(t)).focus();
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const t = Ve.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof t[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        t[e]();
      }
    });
  }
  static clearMenus(e) {
    if (e.button === Ll || e.type === "keyup" && e.key !== Ir)
      return;
    const t = Me.find(jl);
    for (const s of t) {
      const a = Ve.getInstance(s);
      if (!a || a._config.autoClose === !1)
        continue;
      const r = e.composedPath(), n = r.includes(a._menu);
      if (r.includes(a._element) || a._config.autoClose === "inside" && !n || a._config.autoClose === "outside" && n || a._menu.contains(e.target) && (e.type === "keyup" && e.key === Ir || /input|select|option|textarea|form/i.test(e.target.tagName)))
        continue;
      const d = { relatedTarget: a._element };
      e.type === "click" && (d.clickEvent = e), a._completeHide(d);
    }
  }
  static dataApiKeydownHandler(e) {
    const t = /input|textarea/i.test(e.target.tagName), s = e.key === Fl, a = [Ol, Mr].includes(e.key);
    if (!a && !s || t && !s)
      return;
    e.preventDefault();
    const r = this.matches(Nt) ? this : Me.prev(this, Nt)[0] || Me.next(this, Nt)[0] || Me.findOne(Nt, e.delegateTarget.parentNode), n = Ve.getOrCreateInstance(r);
    if (a) {
      e.stopPropagation(), n.show(), n._selectMenuItem(e);
      return;
    }
    n._isShown() && (e.stopPropagation(), n.hide(), r.focus());
  }
}
j.on(document, jn, Nt, Ve.dataApiKeydownHandler);
j.on(document, jn, ui, Ve.dataApiKeydownHandler);
j.on(document, qn, Ve.clearMenus);
j.on(document, Nl, Ve.clearMenus);
j.on(document, qn, Nt, function(i) {
  i.preventDefault(), Ve.getOrCreateInstance(this).toggle();
});
Pn(Ve);
const nc = (i, ...e) => Object.assign(i, ...e), oc = (i) => Object.keys(i);
function di(i) {
  return i && typeof i == "object" && i.constructor === Object;
}
const ha = (i, e) => (di(i) && di(e) && oc(e).forEach((t) => {
  di(e[t]) ? ((!i[t] || !di(i[t])) && (i[t] = e[t]), ha(i[t], e[t])) : nc(i, { [t]: e[t] });
}), i);
function Oe(i = "", e = "") {
  return `id-${Math.random().toString().substring(2, 6)}-sgds-${i}-${e}`;
}
const dc = "ArrowDown", lc = "ArrowUp", cc = "Escape";
class Pe extends f {
  constructor() {
    super(...arguments), this.myDropdown = $a(), this.bsDropdown = null, this.dropdownMenuId = Oe("dropdown-menu", "div"), this.noFlip = !1, this.menuAlignRight = !1, this.drop = "down", this.popperOpts = {}, this.modifierOpt = [], this.menuIsOpen = !1, this.close = "default", this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.close !== "inside" && document.addEventListener("click", (e) => this._handleClickOutOfElement(e, this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", (e) => this._handleClickOutOfElement(e, this));
  }
  firstUpdated() {
    this.bsDropdown = new Ve(this.myDropdown.value, {
      // autoClose not working as bootstrap is using attribute data-bs-toggle="dropdown" to configure autoclose. But it doesnt look into this attribute in the shadow dom
      reference: "toggle",
      // working
      popperConfig: (e) => {
        switch (this.dropdownConfig = {
          placement: "bottom-start",
          modifiers: this.noFlip ? [
            ...this.modifierOpt,
            {
              name: "flip",
              options: { fallbackPlacements: [] }
            }
          ] : this.modifierOpt
        }, this.drop) {
          case "up":
            this.dropdownConfig.placement = this.menuAlignRight ? "top-end" : "top-start";
            break;
          case "right":
            this.dropdownConfig.placement = "right-start";
            break;
          case "left":
            this.dropdownConfig.placement = "left-start";
            break;
          case "down":
            this.dropdownConfig.placement = this.menuAlignRight ? "bottom-end" : "bottom-start";
            break;
          default:
            this.dropdownConfig.placement = void 0;
            break;
        }
        return ha(e, ha(this.dropdownConfig, this.popperOpts));
      }
    }), this.myDropdown.value.addEventListener("show.bs.dropdown", () => {
      this.menuIsOpen = !0, this.emit("sgds-show");
    }), this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
      this.menuIsOpen = !0, this.emit("sgds-after-show");
    }), this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
      this.menuIsOpen = !1, this.emit("sgds-hide");
    }), this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      this.menuIsOpen = !1, this.emit("sgds-after-hide");
    }), this.addEventListener("keydown", this._handleKeyboardMenuEvent);
  }
  /** When invoked, opens the dropdown menu */
  showMenu() {
    this.bsDropdown.show();
  }
  /** When invoked, hides the dropdown menu */
  hideMenu() {
    this.bsDropdown.hide();
  }
  toggleMenu() {
    this.bsDropdown.toggle();
  }
  _handleKeyboardMenuEvent(e) {
    switch (e.key) {
      case dc:
        if (e.preventDefault(), !this.menuIsOpen)
          return this.showMenu();
        break;
      case lc:
        if (e.preventDefault(), !this.menuIsOpen)
          return this.showMenu();
        break;
      case cc:
        return this.hideMenu();
    }
  }
  _handleClickOutOfElement(e, t) {
    e.composedPath().includes(t) || this.hideMenu();
  }
}
o([
  c({ type: Boolean, state: !0 })
], Pe.prototype, "noFlip", void 0);
o([
  c({ type: Boolean, reflect: !0, state: !0 })
], Pe.prototype, "menuAlignRight", void 0);
o([
  c({ type: String, reflect: !0, state: !0 })
], Pe.prototype, "drop", void 0);
o([
  c({ type: Object })
], Pe.prototype, "popperOpts", void 0);
o([
  R()
], Pe.prototype, "dropdownConfig", void 0);
o([
  c()
], Pe.prototype, "modifierOpt", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Pe.prototype, "menuIsOpen", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Pe.prototype, "disabled", void 0);
const hc = "Tab", uc = "ArrowDown", pc = "ArrowUp", gc = "Enter";
class _t extends Pe {
  constructor() {
    super(...arguments), this.nextDropdownItemNo = 0, this.prevDropdownItemNo = -1;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("sgds-hide", this._resetMenu);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("sgds-hide", this._resetMenu);
  }
  firstUpdated() {
    super.firstUpdated(), this.addEventListener("keydown", this._handleKeyboardMenuItemsEvent);
  }
  handleSelectSlot(e) {
    const t = this._getActiveMenuItems(), s = t.indexOf(e.target);
    if (this.nextDropdownItemNo = s + 1, this.prevDropdownItemNo = s <= 0 ? t.length - 1 : s - 1, !e.target.disabled)
      this.emit("sgds-select"), this.close !== "outside" && this.bsDropdown.hide();
    else
      return;
  }
  _resetMenu() {
    this.nextDropdownItemNo = 0, this.prevDropdownItemNo = -1, this._getMenuItems().forEach((t) => {
      t.shadowRoot.querySelector(".dropdown-item").removeAttribute("tabindex");
    });
  }
  _handleKeyboardMenuItemsEvent(e) {
    const t = this._getActiveMenuItems();
    switch (e.key) {
      case uc:
        return e.preventDefault(), this.nextDropdownItemNo === t.length ? this._setMenuItem(0) : this._setMenuItem(this.nextDropdownItemNo > 0 ? this.nextDropdownItemNo : 0);
      case pc:
        return e.preventDefault(), this.prevDropdownItemNo < 0 ? this._setMenuItem(t.length - 1, !1) : this._setMenuItem(this.prevDropdownItemNo, !1);
      case hc:
        return this.menuIsOpen ? (e.preventDefault(), e.shiftKey ? this.prevDropdownItemNo < 0 ? this._setMenuItem(t.length - 1, !1) : this._setMenuItem(this.prevDropdownItemNo, !1) : this.nextDropdownItemNo === t.length ? this._setMenuItem(0) : this._setMenuItem(this.nextDropdownItemNo > 0 ? this.nextDropdownItemNo : 0)) : void 0;
      case gc:
        if (t.includes(e.target))
          return this.handleSelectSlot(e);
        break;
    }
  }
  _getMenuItems() {
    var e;
    if (this.shadowRoot.querySelector("slot#default"))
      return (e = this.shadowRoot.querySelector("slot#default")) === null || e === void 0 ? void 0 : e.assignedElements({
        flatten: !0
      });
    if (this.menu.hasChildNodes())
      return [...this.menu.children];
  }
  _getActiveMenuItems() {
    return this._getMenuItems().filter((e) => !e.disabled);
  }
  _setMenuItem(e, t = !0) {
    const s = this._getActiveMenuItems();
    if (s.length === 0)
      return;
    const a = s[e];
    this.nextDropdownItemNo = e + 1, this.prevDropdownItemNo = e - 1 < 0 ? s.length - 1 : e - 1;
    let r;
    if (a.disabled)
      return this._setMenuItem(t ? this.nextDropdownItemNo : this.prevDropdownItemNo);
    r = a, s.forEach((n) => {
      const d = n.shadowRoot.querySelector(".dropdown-item");
      d.setAttribute("tabindex", n === r ? "0" : "-1"), n === r && d.focus();
    });
  }
}
_t.styles = Pe.styles;
o([
  F("ul.dropdown-menu")
], _t.prototype, "menu", void 0);
o([
  R()
], _t.prototype, "nextDropdownItemNo", void 0);
o([
  R()
], _t.prototype, "prevDropdownItemNo", void 0);
var Gs = b`.dropdown-menu{background-clip:padding-box;background-color:var(--sgds-surface-default);border-radius:var(--sgds-border-radius-md);box-shadow:0 0 1px 0 hsla(0,0%,5%,.12),0 4px 8px 0 hsla(0,0%,5%,.12);color:var(--sgds-color-default);display:none;list-style:none;margin:0;min-width:var(--sgds-dimension-280);overflow-y:auto;padding:var(--sgds-padding-xs) 0;position:absolute;text-align:left;z-index:1000}.dropdown .dropdown-menu{max-height:var(--sgds-dimension-192)}.dropdown-menu.show{display:block}.nav-tabs .dropdown-menu{border-top-left-radius:0;border-top-right-radius:0;margin-top:calc(var(--sgds-nav-tabs-border-width)*-1)}@media (min-width:576px){.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}}@media (min-width:768px){.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}}@media (min-width:992px){.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}}@media (min-width:1200px){.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}}@media (min-width:1400px){.navbar-expand-xxl .navbar-nav .dropdown-menu{position:absolute}}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.sgds.navbar .dropdown-menu.megamenu{left:0;right:0;width:100%}.sgds.combobox>.dropdown-menu{min-width:100%}`, za = b`:host{position:relative}.dropdown{display:flex;height:100%}`;
class rt extends _t {
  constructor() {
    super(), this.noFlip = !1, this.menuAlignRight = !1, this.drop = "down", this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      }
    ];
  }
  _handleCloseMenu() {
    this._toggler[0].focus();
  }
  _handleClick() {
    this.disabled || this.toggleMenu();
  }
  async connectedCallback() {
    super.connectedCallback(), this.addEventListener("sgds-hide", this._handleCloseMenu);
  }
  async disconnectedCallback() {
    this.removeEventListener("sgds-hide", this._handleCloseMenu);
  }
  async firstUpdated() {
    super.firstUpdated(), this.menuIsOpen && this.showMenu(), this._handleDisabled();
  }
  _handleDisabled() {
    const e = this._toggler[0];
    this.disabled ? e.setAttribute("disabled", "true") : e.hasAttribute("disabled") && e.removeAttribute("disabled");
  }
  render() {
    return p`
      <div class="dropdown">
        <div
          class="toggler-container"
          ${Ws(this.myDropdown)}
          @click=${this._handleClick}
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="menu"
        >
          <slot name="toggler"></slot>
        </div>
        <div class="dropdown-menu" role="menu">
          <slot id="default" @click=${this.handleSelectSlot}></slot>
        </div>
      </div>
    `;
  }
}
rt.styles = [..._t.styles, za, Gs];
o([
  c({ type: Boolean, reflect: !0, state: !1 })
], rt.prototype, "noFlip", void 0);
o([
  c({ type: Boolean, reflect: !0, state: !1 })
], rt.prototype, "menuAlignRight", void 0);
o([
  c({ type: String, reflect: !0, state: !1 })
], rt.prototype, "drop", void 0);
o([
  ve({ slot: "toggler", flatten: !0 })
], rt.prototype, "_toggler", void 0);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], rt.prototype, "_handleDisabled", null);
var fc = b`.dropdown-item{align-items:center;background-color:var(--sgds-bg-transparent);clear:both;color:var(--sgds-color-default);cursor:pointer;display:flex;gap:var(--sgds-gap-sm);padding:var(--sgds-padding-sm) var(--sgds-padding-lg);text-align:inherit;white-space:nowrap}.dropdown-item:not(.nav-link):hover{background-color:var(--sgds-bg-translucent-subtle)}.dropdown-item:not(.nav-link):focus,.dropdown-item:not(.nav-link):focus-visible{background-color:var(--sgds-bg-translucent-subtle);box-shadow:inset var(--sgds-form-box-shadow-focus);outline:0}.dropdown-item:not(.nav-link).active{background-color:var(--sgds-bg-translucent-subtle);color:var(--sgds-primary-color-default);text-decoration:none}.dropdown-item.disabled,.dropdown-item:disabled{opacity:var(--sgds-opacity-50);pointer-events:none}::slotted(*){color:inherit!important;display:flex;gap:var(--sgds-gap-sm);text-decoration:none!important}.nav-link{gap:var(--sgds-gap-xs);padding:var(--sgds-padding-sm) var(--sgds-mainnav-padding-x)}.nav-link:hover{color:var(--sgds-primary-color-default)}.nav-link:focus,.nav-link:focus-visible{outline:0}.nav-link:focus-visible{box-shadow:var(--sgds-box-shadow-focus) inset;color:var(--sgds-primary-color-default)}.nav-link.active{background-color:var(--sgds-bg-translucent-subtle);color:var(--sgds-primary-color-default)}`;
class Ct extends f {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", (e) => {
      e.key === "Enter" && this.anchor[0].click();
    }), this.setAttribute("role", "menuitem"), this.setAttribute("aria-disabled", `${this.disabled}`);
  }
  render() {
    return p`
      <div
        class="dropdown-item ${T({
      disabled: this.disabled,
      active: this.active
    })}"
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>
      </div>
    `;
  }
}
Ct.styles = [za, fc];
Ct.dependencies = {
  "sgds-icon": re
};
o([
  ve({ flatten: !0 })
], Ct.prototype, "anchor", void 0);
o([
  c({ type: Boolean })
], Ct.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ct.prototype, "disabled", void 0);
class Di extends f {
  constructor() {
    super(...arguments), this.size = "md";
  }
  render() {
    return p`
      <sgds-dropdown>
        <button slot="toggler" class="overflow-btn">
          <sgds-icon name="three-dots" size=${this.size}></sgds-icon>
        </button>
        <slot></slot>
      </sgds-dropdown>
    `;
  }
}
Di.styles = [...f.styles, kd];
Di.dependencies = {
  "sgds-dropdown": rt,
  "sgds-dropdown-item": Ct,
  "sgds-icon": re
};
o([
  c({ type: String, reflect: !0 })
], Di.prototype, "size", void 0);
var mc = b`.breadcrumb{display:flex;gap:var(--sgds-gap-xs)}`;
class Zs extends f {
  constructor() {
    super(...arguments), this.ariaLabel = "breadcrumb";
  }
  /**
   * creates `<sgds-breadcrumb-item>
   *            <sgds-overflow-menu>
   *              <sgds-dropdown-item></sgds-dropdown-item>
   *               ...
   *            </sgds-overflow-menu>
   *          <sgds-breadcrumb-item>`
   */
  _replaceExcessItemsWithDropdown(e) {
    const t = document.createElement("sgds-breadcrumb-item"), s = document.createElement("sgds-overflow-menu");
    s.setAttribute("aria-haspopup", "menu"), s.setAttribute("size", "sm");
    const a = e.filter((r, n) => {
      if (n > 0 && n < e.length - 2) {
        const l = r.querySelector("a").cloneNode(!0), h = document.createElement("sgds-dropdown-item");
        h.appendChild(l), s.appendChild(h);
        return;
      } else
        return r;
    });
    t.appendChild(s), a.splice(1, 0, t), this.defaultSlot.replaceWith(...a);
  }
  _handleSlotChange(e) {
    const t = e.target.assignedElements({ flatten: !0 }).filter((s) => s.tagName.toLowerCase() === "sgds-breadcrumb-item");
    t.forEach((s, a) => {
      a === t.length - 1 ? (s.setAttribute("aria-current", "page"), s.active = !0) : s.removeAttribute("aria-current");
    }), t.length >= 5 && this._replaceExcessItemsWithDropdown(t);
  }
  render() {
    return B`
      <div aria-label=${C(this.ariaLabel)}>
        <div class="breadcrumb">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
Zs.styles = [...f.styles, mc];
Zs.dependencies = {
  "sgds-overflow-menu": Di
};
o([
  c({ type: String })
], Zs.prototype, "ariaLabel", void 0);
o([
  F("slot")
], Zs.prototype, "defaultSlot", void 0);
var vc = b`.nav-link::slotted(a){align-items:center;color:var(--sgds-link-color-default);cursor:pointer;display:inline-flex;flex-shrink:0;gap:var(--sgds-gap-2-xs);height:var(--sgds-dimension-24);justify-content:center;text-decoration:none!important}.nav-link::slotted(a:focus),.nav-link::slotted(a:focus-visible),.nav-link::slotted(a:hover),.nav-link::slotted(a[active]){color:var( --sgds-link-color-emphasis)}.nav-link::slotted(a:focus),.nav-link::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus);outline:0}.nav-link::slotted(a[disabled]){cursor:not-allowed;opacity:var(--sgds-opacity-50)}:host([variant=danger]) .nav-link::slotted(a){--sgds-link-color-default:var(--sgds-danger-color-default);color:var(--sgds-link-color-default,--sgds-danger-color-default)}:host([variant=danger]) .nav-link::slotted(a:focus),:host([variant=danger]) .nav-link::slotted(a:focus-visible),:host([variant=danger]) .nav-link::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-danger-color-emphasis);color:var(--sgds-link-color-emphasis,--sgds-danger-color-emphasis)}:host([variant=light]) .nav-link::slotted(a){--sgds-link-color-default:var(--sgds-color-fixed-light);color:var(--sgds-link-color-default,--sgds-color-fixed-light)}:host([variant=light]) .nav-link::slotted(a:focus),:host([variant=light]) .nav-link::slotted(a:focus-visible),:host([variant=light]) .nav-link::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-color-fixed-light);color:var(--sgds-link-color-emphasis,--sgds-color-fixed-light)}:host([variant=dark]) .nav-link::slotted(a){--sgds-link-color-default:var(--sgds-color-fixed-dark);color:var(--sgds-link-color-default,--sgds-color-fixed-dark)}:host([variant=dark]) .nav-link::slotted(a:focus),:host([variant=dark]) .nav-link::slotted(a:focus-visible),:host([variant=dark]) .nav-link::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-color-fixed-dark);color:var(--sgds-link-color-emphasis,--sgds-color-fixed-dark)}:host([size=lg]) .nav-link::slotted(a){font-size:var(--sgds-font-size-3)!important;height:var(--sgds-dimension-32)}:host([size=sm]) .nav-link::slotted(a){font-size:var(--sgds-font-size-1)!important;height:var(--sgds-dimension-20)}`;
class Xs extends f {
  constructor() {
    super(...arguments), this.size = "md", this.variant = "primary";
  }
  _handleSlotChange(e) {
    const t = this.querySelector("a");
    t && (t.hasAttribute("disabled") ? (t.setAttribute("href", "javascript:void(0)"), t.setAttribute("tabindex", "-1")) : t.setAttribute("tabindex", "0"));
  }
  render() {
    return p`<slot class="nav-link" @slotchange=${this._handleSlotChange}></slot>`;
  }
}
Xs.styles = [...f.styles, vc];
o([
  c({ type: String, reflect: !0 })
], Xs.prototype, "size", void 0);
o([
  c({ type: String, reflect: !0 })
], Xs.prototype, "variant", void 0);
var bc = b`:host{align-items:center;display:flex;gap:var(--sgds-gap-xs)}:host([active]) .nav-link::slotted(*){--sgds-link-color-default:var(--sgds-color-default);color:var(--sgds-link-color-default,--sgds-color-default);pointer-events:none}:host([active]) .nav-link::slotted(:focus),:host([active]) .nav-link::slotted(:focus-visible),:host([active]) .nav-link::slotted(:hover){--sgds-link-color-emphasis:var(--sgds-color-default);color:var(--sgds-link-color-emphasis,--sgds-color-default)}.separator svg{display:block}:host(:last-of-type) .separator{display:none}`;
class Ha extends f {
  constructor() {
    super(...arguments), this.active = !1;
  }
  render() {
    return p`
      <slot class="nav-link"></slot>
      <div class="separator">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.90413 2.13558C4.947 2.0926 4.99793 2.0585 5.05399 2.03524C5.11006 2.01198 5.17016 2 5.23086 2C5.29157 2 5.35167 2.01198 5.40774 2.03524C5.4638 2.0585 5.51473 2.0926 5.55759 2.13558L11.0954 7.67339C11.1384 7.71626 11.1725 7.76718 11.1957 7.82325C11.219 7.87932 11.231 7.93942 11.231 8.00012C11.231 8.06082 11.219 8.12093 11.1957 8.17699C11.1725 8.23306 11.1384 8.28398 11.0954 8.32685L5.55759 13.8647C5.47094 13.9513 5.35341 14 5.23086 14C5.10832 14 4.99079 13.9513 4.90413 13.8647C4.81748 13.778 4.7688 13.6605 4.7688 13.5379C4.7688 13.4154 4.81748 13.2979 4.90413 13.2112L10.1161 8.00012L4.90413 2.78904C4.86116 2.74617 4.82706 2.69525 4.80379 2.63918C4.78053 2.58312 4.76855 2.52301 4.76855 2.46231C4.76855 2.40161 4.78053 2.3415 4.80379 2.28544C4.82706 2.22937 4.86116 2.17845 4.90413 2.13558Z"
            fill="#757575"
          />
        </svg>
      </div>
    `;
  }
}
Ha.styles = [...Xs.styles, bc];
o([
  c({ type: Boolean, reflect: !0 })
], Ha.prototype, "active", void 0);
A("sgds-breadcrumb", Zs);
A("sgds-breadcrumb-item", Ha);
var yc = b`:host{--btn-font-weight:var(--sgds-font-weight-regular);--btn-bg:var(--sgds-primary-surface-default);--btn-hover-bg:var(--sgds-primary-surface-emphasis);--btn-border-radius:var(--sgds-border-radius-md)}:host([variant=primary]){--btn-bg:var(--sgds-primary-surface-default);--btn-color:var(--sgds-color-fixed-light)}:host([variant=outline]){--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:var(--sgds-primary-surface-translucent);--btn-color:var(--sgds-primary-color-default);--btn-border-width:var(--sgds-border-width-1);--btn-border-color:var(--sgds-primary-border-color-default)}:host([variant=ghost]){--btn-bg:var(--sgds-bg-transparent);--btn-hover-bg:var(--sgds-primary-surface-translucent);--btn-color:var(--sgds-primary-color-default)}:host([variant=danger]){--btn-bg:var(--sgds-danger-surface-default);--btn-hover-bg:var(--sgds-danger-surface-emphasis);--btn-color:var(--sgds-color-fixed-light)}.btn{align-items:center;background-color:var(--btn-bg);border:1px solid var(--sgds-border-color-transparent);border-radius:var(--btn-border-radius);color:var(--sgds-color-fixed-light);cursor:pointer;display:inline-flex;font-size:var(--sgds-font-size-2);font-weight:var(--btn-font-weight);gap:var(--sgds-gap-2-xs);height:var(--sgds-dimension-48);justify-content:center;line-height:var(--sgds-line-height-body);min-width:var(--sgds-dimension-96);padding:0 var(--sgds-padding-lg);text-align:center;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;user-select:none;vertical-align:middle}.btn-ghost,.btn-outline,.btn-primary{color:var(--btn-color)}.btn-outline{border:var(--btn-border-width) solid var(--btn-border-color)}@media (prefers-reduced-motion:reduce){.btn{transition:none}}.btn.active,.btn:hover{background-color:var(--btn-hover-bg)}.btn:focus,.btn:focus-visible{background-color:var(--btn-hover-bg);border-color:transparent;box-shadow:var(--sgds-box-shadow-focus);outline:0}.btn.disabled,.btn:disabled{color:var(--btn-color);cursor:not-allowed;opacity:var(--sgds-opacity-50)}.btn-lg{font-size:var(--sgds-font-size-3);height:var(--sgds-dimension-56);min-width:var(--sgds-dimension-112);padding:0 var(--sgds-padding-xl)}.btn-sm{font-size:var(--sgds-font-size-1);height:var(--sgds-dimension-40);min-width:var(--sgds-dimension-80);padding:0 var(--sgds-padding-md)}.btn slot::slotted(*){color:var(--btn-color)}`;
class we extends f {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.active = !1, this.disabled = !1, this.target = "_self";
  }
  /** Sets focus on the button. */
  focus(e) {
    this.button.focus(e);
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  _handleBlur() {
    this.emit("sgds-blur");
  }
  _handleFocus() {
    this.emit("sgds-focus");
  }
  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
  }
}
we.styles = [...f.styles, yc];
o([
  F(".btn")
], we.prototype, "button", void 0);
o([
  c({ reflect: !0 })
], we.prototype, "variant", void 0);
o([
  c({ reflect: !0 })
], we.prototype, "size", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], we.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], we.prototype, "disabled", void 0);
o([
  c({ type: String, reflect: !0 })
], we.prototype, "href", void 0);
o([
  c({ type: String, reflect: !0 })
], we.prototype, "target", void 0);
o([
  c({ type: String, reflect: !0 })
], we.prototype, "download", void 0);
o([
  c({ type: String })
], we.prototype, "ariaLabel", void 0);
class wc {
  constructor(e, t) {
    (this.host = e).addController(this), this.options = Object.assign({ form: (s) => s.closest("form") }, t);
  }
  hostConnected() {
    this.form = this.options.form(this.host);
  }
  hostDisconnected() {
    this.form && (this.form = void 0);
  }
  /**
   * Creates a temporary native HTML button that can participate in form and invoke form submits and reset
   * Button is removed once action is performed
   */
  doAction(e, t) {
    if (this.form) {
      const s = document.createElement("button");
      s.type = e, s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.clipPath = "inset(50%)", s.style.overflow = "hidden", s.style.whiteSpace = "nowrap", t && ["formaction", "formmethod", "formnovalidate", "formtarget"].forEach((a) => {
        t.hasAttribute(a) && s.setAttribute(a, t.getAttribute(a));
      }), this.form.append(s), s.click(), s.remove();
    }
  }
  /** Resets the form, restoring all the control to their default value */
  reset(e) {
    this.doAction("reset", e);
  }
  /** Submits the form, triggering validation and form data injection. */
  submit(e) {
    this.doAction("submit", e);
  }
}
var kc = b`:host{display:inline-block}.btn.full-width,:host([fullWidth]){width:100%}.btn.full-width.has-left-icon{justify-content:flex-start}.btn.full-width.has-right-icon{justify-content:space-between}.btn.full-width.has-left-icon.has-right-icon{justify-content:center}.btn span{padding:0 var(--sgds-padding-2-xs)}`;
class be extends we {
  constructor() {
    super(...arguments), this._hasLeftIcon = !1, this._hasRightIcon = !1, this.formSubmitController = new wc(this, {
      form: (e) => {
        if (e.hasAttribute("form")) {
          const t = e.getRootNode(), s = e.getAttribute("form");
          return t.getElementById(s);
        }
        return e.closest("form");
      }
    }), this.type = "button", this.fullWidth = !1, this._clickHandler = () => {
      this.type === "submit" && this.formSubmitController.submit(this), this.type === "reset" && this.formSubmitController.reset(this);
    };
  }
  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.removeEventListener("click", this._clickHandler), this.addEventListener("click", this._clickHandler);
  }
  _handleLeftIconSlotchange(e) {
    if (e.target.assignedNodes({ flatten: !0 }).length > 0)
      return this._hasLeftIcon = !0;
  }
  _handleRightIconSlotchange(e) {
    if (e.target.assignedNodes({ flatten: !0 }).length > 0)
      return this._hasRightIcon = !0;
  }
  render() {
    const e = this.href, t = e ? ds`a` : ds`button`;
    return B`
      <${t}
        class="btn ${T({
      disabled: this.disabled,
      active: this.active,
      "full-width": this.fullWidth,
      "has-left-icon": this._hasLeftIcon,
      "has-right-icon": this._hasRightIcon,
      [`btn-${this.variant}`]: this.variant,
      [`btn-${this.size}`]: this.size
    })}"
        ?disabled=${C(e ? void 0 : this.disabled)}
        type=${C(e ? void 0 : this.type)}
        href=${C(e ? this.href : void 0)}
        target=${C(e ? this.target : void 0)}
        download=${C(e ? this.download : void 0)}
        rel=${C(e && this.target === "_blank" ? "noreferrer noopener" : void 0)}
        role=${C(e ? "button" : void 0)}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this._handleClick}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
        aria-label=${C(this.ariaLabel)}
      >
      <slot name="leftIcon" @slotchange=${this._handleLeftIconSlotchange}></slot>
      <span><slot></slot></span>
      <slot name="rightIcon" @slotchange=${this._handleRightIconSlotchange}></slot>
      </${t}>
    `;
  }
}
be.styles = [...we.styles, Ca, kc];
o([
  R()
], be.prototype, "_hasLeftIcon", void 0);
o([
  R()
], be.prototype, "_hasRightIcon", void 0);
o([
  c({ type: String, reflect: !0 })
], be.prototype, "type", void 0);
o([
  c({ type: String, reflect: !0 })
], be.prototype, "form", void 0);
o([
  c({ type: String, reflect: !0, attribute: "formaction" })
], be.prototype, "formAction", void 0);
o([
  c({ type: String, reflect: !0, attribute: "formmethod" })
], be.prototype, "formMethod", void 0);
o([
  c({ attribute: "formnovalidate", type: Boolean, reflect: !0 })
], be.prototype, "formNoValidate", void 0);
o([
  c({ type: String, reflect: !0, attribute: "formtarget" })
], be.prototype, "formTarget", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], be.prototype, "fullWidth", void 0);
A("sgds-button", be);
var xc = b`:host([orientation=horizontal]) .card{flex-direction:row}:host(:not([hideBorder])) .card{border:var(--sgds-border-width-1) solid var(--sgds-border-color-muted)}:host([tinted]) .card{background-color:var(--sgds-bg-translucent-subtle);border:none}:host([orientation=horizontal]) .card-image{width:40%}:host([imagePosition=after]) .card-image{order:1}:host([orientation=vertical][imagePosition=after]) slot[name=image]::slotted(img){border-radius:calc(var(--sgds-border-radius-md) - var(--sgds-border-width-1));border-top-left-radius:var(--sgds-border-radius-none);border-top-right-radius:var(--sgds-border-radius-none)}:host([orientation=horizontal][imagePosition=after]) slot[name=image]::slotted(img){border-radius:calc(var(--sgds-border-radius-md) - var(--sgds-border-width-1));border-bottom-left-radius:var(--sgds-border-radius-none);border-top-left-radius:var(--sgds-border-radius-none)}:host([orientation=vertical][imageAdjustment="padding around"]) .card-image{padding:var(--sgds-padding-xl) var(--sgds-padding-xl) 0}:host([orientation=vertical][imageAdjustment="padding around"]) slot[name=image]::slotted(img){border-radius:calc(var(--sgds-border-radius-md) - var(--sgds-border-width-1))}:host([orientation=vertical]:not([imageAdjustment="aspect ratio"])) slot[name=image]::slotted(img){height:auto}:host([orientation=vertical][imageAdjustment="aspect ratio"]) slot[name=image]::slotted(img){object-fit:cover}.card{word-wrap:break-word;background-clip:border-box;background-color:var(--sgds-surface-default);border-radius:var(--sgds-border-radius-md);box-shadow:none;display:flex;flex-direction:column;height:auto;min-width:0;position:relative;transition:box-shadow .3s ease}a.card{color:initial;text-decoration:none}@media (prefers-reduced-motion:reduce){.card{transition:none}}.card.disabled{cursor:not-allowed;opacity:var(--sgds-opacity-50)}.card:not(.disabled):hover{box-shadow:0 0 1px 0 hsla(0,0%,5%,.12),0 8px 16px 0 hsla(0,0%,5%,.12)}a.card:focus{outline:0}a.card:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus)}.card-image{flex:1}.card-body{display:flex;flex:1;flex-direction:column;gap:var(--sgds-gap-lg);padding:var(--sgds-padding-xl)}.card-body,.card-title{color:var(--sgds-body-color-default)}.card-title{--sgds-font-size-5:var(--sgds-font-size-4);--sgds-font-size-6:var(--sgds-font-size-4);--sgds-margin-2-xs:var(--sgds-margin-none);--sgds-font-weight-bold:var(--sgds-font-weight-semibold);font-size:var(--sgds-font-size-4);font-weight:var(--sgds-font-weight-semibold)}.card-subtitle,.card-text,.card-title{margin-bottom:var(--sgds-margin-none)}slot[name=title]::slotted(a){--sgds-font-size-2:var(--sgds-font-size-4);--sgds-font-weight-regular:var(--sgds-font-weight-semibold);color:var(--sgds-link-color-default);font-size:var(--sgds-font-size-4);font-weight:var(--sgds-font-weight-semibold);text-decoration:none!important}slot[name=description]::slotted(*){color:var(--sgds-color-subtle)}slot[name=image]::slotted(img){border-top-left-radius:calc(var(--sgds-border-radius-md) - var(--sgds-border-width-1));border-top-right-radius:calc(var(--sgds-border-radius-md) - var(--sgds-border-width-1));display:block;width:100%}:host([orientation=horizontal]) slot[name=image]::slotted(img){border-bottom-left-radius:calc(var(--sgds-border-radius-md) - var(--sgds-border-width-1));border-top-right-radius:var(--sgds-border-radius-none);height:100%;object-fit:cover}slot[name=link]::slotted(*){font-weight:700;margin-top:var(--sgds-padding-sm)}slot[name=link]::slotted(a){color:var(--sgds-link-color-default);display:inline-flex;gap:var(--sgds-gap-2-xs);text-decoration:none!important}slot[name=link]::slotted(a:focus),slot[name=link]::slotted(a:hover),slot[name=title]::slotted(a:focus),slot[name=title]::slotted(a:hover){color:var(--sgds-link-color-emphasis)}slot[name=link]::slotted(a:focus),slot[name=title]::slotted(a:focus){outline:0}slot[name=link]::slotted(a:focus-visible),slot[name=title]::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus)}`, Wn = b`.text-primary{color:var(--sgds-primary-rgb)!important}.text-secondary{color:var(--sgds-secondary-rgb)!important}.text-success{color:var(--sgds-success-rgb)!important}.text-info{color:var(--sgds-info-rgb)!important}.text-warning{color:var(--sgds-warning-rgb)!important}.text-danger{color:var(--sgds-danger-rgb)!important}.text-light{color:var(--sgds-light-rgb)!important}.text-dark{color:var(--sgds-dark-rgb)!important}.text-muted{color:var(--sgds-secondary-color)!important}`, _c = b`.bg-primary{background-color:var(--sgds-primary)!important}.bg-secondary{background-color:var(--sgds-secondary)!important}.bg-success{background-color:var(--sgds-success)!important}.bg-info{background-color:var(--sgds-info)!important}.bg-warning{background-color:var(--sgds-warning)!important}.bg-danger{background-color:var(--sgds-danger)!important}.bg-light{background-color:var(--sgds-light)!important}.bg-dark{background-color:var(--sgds-dark)!important}`, Cc = b`.border-primary{border-color:var(--sgds-primary)!important}.border-secondary{border-color:var(--sgds-secondary)!important}.border-success{border-color:var(--sgds-success)!important}.border-info{border-color:var(--sgds-info)!important}.border-warning{border-color:var(--sgds-warning)!important}.border-danger{border-color:var(--sgds-danger)!important}.border-light{border-color:var(--sgds-light)!important}.border-dark{border-color:var(--sgds-dark)!important}`, Kn = b`.h1,.h2,.h3,.h4,.h5,.h6 ::slotted(h6),::slotted(h1),::slotted(h2),::slotted(h3),::slotted(h4),::slotted(h5),h1,h2,h3,h4,h5,h6{color:var(--sgds-heading-color);font-weight:700;line-height:1.2;margin-bottom:.5rem;margin-top:0}.h1,::slotted(h1),h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width:1200px){.h1,::slotted(h1),h1{font-size:2.5rem}}.h2,::slotted(h2),h2{font-size:calc(1.325rem + .9vw)}@media (min-width:1200px){.h2,::slotted(h2),h2{font-size:2rem}}.h3,::slotted(h3),h3{font-size:calc(1.275rem + .3vw)}@media (min-width:1200px){.h3,::slotted(h3),h3{font-size:1.5rem}}.h4,::slotted(h4),h4{font-size:1.125rem}.h5,.h6 ::slotted(h6),::slotted(h5),h5,h6{font-size:1rem}.h1,::slotted(h1),h1{line-height:1.2}.h2,::slotted(h2),h2{line-height:1.25}.h3,::slotted(h3),h3{line-height:1.33}.h4,::slotted(h4),h4{line-height:1.78}.h5,.h6 ::slotted(h6),::slotted(h5),h5,h6{line-height:1.2}`, $c = b`p{margin-bottom:1.5rem;margin-top:0}`;
class Qs extends f {
  constructor() {
    super(...arguments), this.hideBorder = !1, this.tinted = !1;
  }
}
Qs.styles = [...f.styles, Wn, _c, Cc, Kn, $c, xc];
o([
  c({ type: Boolean, reflect: !0 })
], Qs.prototype, "hideBorder", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Qs.prototype, "tinted", void 0);
var Ec = b`:host([orientation=horizontal]) .card-icon{padding:var(--sgds-padding-xl) 0 var(--sgds-padding-xl) var(--sgds-padding-xl)}.card-icon{line-height:0;padding:var(--sgds-padding-xl) var(--sgds-padding-xl) 0}.card-header{display:flex;flex-direction:column;gap:var(--sgds-gap-xs)}slot[name=subtitle]::slotted(*){--sgds-margin-2-xs:var(--sgds-margin-none);--sgds-margin-xs:var(--sgds-margin-none);--sgds-font-size-4:var(--sgds-font-size-1);--sgds-font-size-5:var(--sgds-font-size-1);--sgds-font-size-6:var(--sgds-font-size-1);--sgds-font-weight-bold:var(--sgds-font-weight-semibold);--sgds-line-height-heading:var(--sgds-line-height-min);--sgds-letter-spacing-tight:var(--sgds-letter-spacing-wide);color:var(--sgds-color-default);font-size:var(--sgds-font-size-1);font-weight:var(--sgds-font-weight-semibold);letter-spacing:var(--sgds-letter-spacing-wide);line-height:var(--sgds-line-height-min);margin:var(--sgds-margin-none);text-transform:uppercase}`;
class Ne extends Qs {
  constructor() {
    super(...arguments), this.stretchedLink = !1, this.disabled = !1, this.orientation = "vertical", this.imagePosition = "before", this.imageAdjustment = "default";
  }
  firstUpdated() {
    if (this._imageNode.length === 0) {
      const e = this.shadowRoot.querySelector(".card-image");
      e.style.display = "none";
    }
    if (this._iconNode.length === 0) {
      const e = this.shadowRoot.querySelector(".card-icon");
      e.style.display = "none";
    }
    if (this.disabled && this._linkNode.length > 0) {
      const e = this._linkNode[0].querySelector("a");
      e.setAttribute("disabled", "true"), e.removeAttribute("href");
    }
  }
  handleTitleSlotChange(e) {
    const t = e.target.assignedNodes({ flatten: !0 });
    this.stretchedLink && t[0] instanceof HTMLAnchorElement && (t[0].querySelector("a") || t[0]).removeAttribute("href");
  }
  handleLinkSlotChange(e) {
    const t = e.target.assignedNodes({ flatten: !0 });
    if (t.length > 1)
      return console.error("Multiple elements passed into SgdsCard's link slot");
    if (this.stretchedLink && t[0] instanceof HTMLAnchorElement) {
      const s = t[0].querySelector("a") || t[0];
      this.card.setAttribute("href", s.href);
      const a = this.shadowRoot.querySelector("slot[name='link']");
      a.style.display = "none";
    }
  }
  handleImgSlotChange(e) {
    if (e.target.assignedNodes({ flatten: !0 }).length > 1)
      return console.error("Multiple elements passed into SgdsCard's image slot");
  }
  render() {
    const e = this.stretchedLink ? ds`a` : ds`div`, t = !this.stretchedLink || this.disabled ? -1 : 0;
    return B`
      <${e} 
        class="card ${T({
      disabled: this.disabled
    })}"
        tabindex=${t}
      >
        <div class="card-image">
          <slot name="image" @slotchange=${this.handleImgSlotChange}></slot>
        </div>
        <div class="card-icon">
          <slot name="icon"></slot>
        </div>
        <div class="card-body">
          <div class="card-header">
            <slot name="subtitle"></slot>
            <h3 class="card-title"><slot name="title" @slotchange=${this.handleTitleSlotChange}></slot></h3>
          </div>
          <p class="card-text">
            <slot name="description"></slot>
          </p>
          <slot name="link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </${e}>
    `;
  }
}
Ne.styles = [...Qs.styles, Ec];
o([
  F("a.card")
], Ne.prototype, "card", void 0);
o([
  Us({ slot: "image", flatten: !0 })
], Ne.prototype, "_imageNode", void 0);
o([
  Us({ slot: "icon", flatten: !0 })
], Ne.prototype, "_iconNode", void 0);
o([
  Us({ slot: "link", flatten: !0 })
], Ne.prototype, "_linkNode", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ne.prototype, "stretchedLink", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ne.prototype, "disabled", void 0);
o([
  c({ type: String, reflect: !0 })
], Ne.prototype, "orientation", void 0);
o([
  c({ type: String, reflect: !0 })
], Ne.prototype, "imagePosition", void 0);
o([
  c({ type: String, reflect: !0 })
], Ne.prototype, "imageAdjustment", void 0);
A("sgds-card", Ne);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = qs(class extends js {
  constructor(i) {
    if (super(i), i.type !== Ue.PROPERTY && i.type !== Ue.ATTRIBUTE && i.type !== Ue.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!rn(i)) throw Error("`live` bindings can only contain a single expression");
  }
  render(i) {
    return i;
  }
  update(i, [e]) {
    if (e === $e || e === E) return e;
    const t = i.element, s = i.name;
    if (i.type === Ue.PROPERTY) {
      if (e === t[s]) return $e;
    } else if (i.type === Ue.BOOLEAN_ATTRIBUTE) {
      if (!!e === t.hasAttribute(s)) return $e;
    } else if (i.type === Ue.ATTRIBUTE && t.getAttribute(s) === e + "") return $e;
    return _d(i), e;
  }
});
var Ya = b`.invalid-feedback-container{display:flex;gap:var(--sgds-form-gap-sm)}.invalid-feedback,.invalid-feedback-container{color:var(--sgds-form-danger-color-default);line-height:var(--sgds-line-height-min)}.invalid-feedback{font-size:var(--sgds-font-size-1);font-weight:var(--sgds-font-weight-regular)}.valid-icon{color:var(--sgds-form-success-color-default)}`, Ua = b`.form-text{color:var(--sgds-form-color-subtle);font-size:var(--sgds-font-size-1);line-height:var(--sgds-line-height-min)}.form-text.disabled{opacity:var(--sgds-opacity-50)}`;
const Zt = (i = "value") => (e, t) => {
  const s = e.constructor, a = s.prototype.attributeChangedCallback;
  s.prototype.attributeChangedCallback = function(r, n, d) {
    var l;
    const h = s.getPropertyOptions(i), u = (typeof h.attribute == "string" ? h.attribute : i).toLowerCase();
    if (r === u) {
      const g = h.converter || rs, m = (typeof g == "function" ? g : (l = g == null ? void 0 : g.fromAttribute) !== null && l !== void 0 ? l : rs.fromAttribute)(d, h.type);
      this[i] !== m && (this[t] = m);
    }
    a.call(this, r, n, d);
  };
};
class Ac {
  constructor(e, t) {
    (this.host = e).addController(this), this._internals = this.host.attachInternals(), this.options = Object.assign({ setInvalid: (s, a) => {
      s.invalid = a;
    }, value: (s) => s.value, input: (s) => s.input }, t);
  }
  hostConnected() {
    this.host.addEventListener("invalid", (e) => this.handleInvalid(e));
  }
  hostDisconnected() {
    this.host.removeEventListener("invalid", (e) => this.handleInvalid(e));
  }
  /**
   * Prevents the native browser error message pop up when reportValidity() called by
   * associated form or the component's reportValidity during constraint validation
   * Sets invalid reactive prop to true
   */
  handleInvalid(e) {
    e.preventDefault(), this.options.setInvalid(this.host, !0);
  }
  /**
   * Sets invalid to false when invoked and
   * Updates the ValidityState based on new value, but
   * does not update invalid reactive prop
   * @param e
   */
  handleInput(e) {
    const t = e.target;
    this.options.setInvalid(this.host, !1), this.validateInput(t);
  }
  /**
   * Validate the input's new value after onChange and
   * update invalid reactive prop
   * @param e
   */
  handleChange(e) {
    const t = e.target;
    this.validateInput(t), this.options.setInvalid(this.host, !this.checkValidity());
  }
  get form() {
    return this._internals.form;
  }
  get validity() {
    return this._internals.validity;
  }
  get validationMessage() {
    return this._internals.validationMessage;
  }
  get willValidate() {
    return this._internals.willValidate;
  }
  /**
   * Checks the validity and updates the invalid reactive prop of form components
   */
  updateInvalidState() {
    this.options.setInvalid(this.host, !this.checkValidity());
  }
  /**
   * Resets the ValidityState of the control
   */
  resetValidity() {
    return this._internals.setValidity({});
  }
  /**
   * Reports the validity
   */
  checkValidity() {
    return this._internals.checkValidity();
  }
  /**
   * Reports the validity with a error popup message
   */
  reportValidity() {
    return this._internals.reportValidity();
  }
  setValidity(e, t, s) {
    return this._internals.setValidity(e, t, s);
  }
  /**
   * Sets the form control value into FormData,
   * making the value of control accessible via FormData
   */
  setFormValue() {
    const e = this.options.value(this.host);
    this._internals.setFormValue(e);
  }
  /**
   * Updates the ValidityState of the input in form component at current state
   */
  validateInput(e) {
    if (this.options.input(this.host).disabled)
      return this._internals.setValidity({});
    const t = e.validity;
    if (t.valid)
      this._internals.setValidity({});
    else
      for (const s in t)
        t[s] && (this.validationError = s.toString(), this._internals.setValidity({ [this.validationError]: !0 }, e.validationMessage, e));
  }
}
const $t = (i) => {
  class e extends i {
    constructor() {
      super(...arguments), this._isTouched = !1;
    }
    connectedCallback() {
      super.connectedCallback(), this.inputValidationController = new Ac(this);
    }
    async firstUpdated(s) {
      super.firstUpdated(s), this.input = this.shadowRoot.querySelector("input") || await this.sgdsInput || this.shadowRoot.querySelector("textarea") || await this.sgdsDatepickerInput, this._mixinValidate(this.input);
    }
    /**
     * Native lifecycle of Form-Associated Custom Element Callbacks
     */
    formResetCallback() {
      this._mixinResetFormControl ? this._mixinResetFormControl() : (this.value = this.defaultValue, this._mixinResetValidity(this.input)), this._mixinSetFormValue();
    }
    /**
     *
     * Methods use by classes using this mixin
     */
    /**
     * OnChange of form component
     * 1. Make value of control accessible via FormData
     * 2. Run change handler
     */
    _mixinHandleChange(s) {
      this._mixinSetFormValue(), this.inputValidationController.handleChange(s);
    }
    /**
     * OnChange of form component
     * 1. Make value of control accessible via FormData
     * 2. Run input handler
     */
    _mixinHandleInputChange(s) {
      this._mixinSetFormValue(), this.inputValidationController.handleInput(s);
    }
    /**
     * During form resetting,
     * 1. ValidityState is reset
     * 2. invalid reactive prop is updated after the reset
     * 3. Revalidates the ValidityState (but do not update invalid prop)
     * to prepare for the next validity check
     * 4. Reset touched state to false for a pristine form
     */
    _mixinResetValidity(s) {
      this.inputValidationController.resetValidity(), this.inputValidationController.updateInvalidState(), this.inputValidationController.validateInput(s), this._isTouched && (this._isTouched = !1);
    }
    _mixinValidate(s) {
      this.inputValidationController.validateInput(s);
    }
    _mixinSetFormValue() {
      this.inputValidationController.setFormValue();
    }
    _mixinCheckValidity() {
      return this.inputValidationController.checkValidity();
    }
    _mixinReportValidity() {
      return this.inputValidationController.reportValidity();
    }
    _mixinGetValidity() {
      return this.inputValidationController.validity;
    }
    _mixinGetValidationMessage() {
      return this.inputValidationController.validationMessage;
    }
    _mixinSetValidity(s, a, r) {
      return this.inputValidationController.setValidity(s, a, r);
    }
  }
  return e.formAssociated = !0, o([
    bt("sgds-input")
  ], e.prototype, "sgdsInput", void 0), o([
    bt("sgds-datepicker-input")
  ], e.prototype, "sgdsDatepickerInput", void 0), e;
};
var Si = b`.form-label{color:var(--sgds-form-color-default);margin-bottom:0}.form-label.disabled{opacity:var(--sgds-opacity-50)}.form-check-label{color:var(--sgds-form-color-default)}.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{cursor:not-allowed}`, qa = b`.form-control::placeholder{color:var(--sgds-form-color-subtle);font-family:var(--sgds-font-family-brand);font-weight:var(--sgds-font-weight-light);line-height:var(--sgds-line-height-body)}`;
class ce extends f {
  constructor() {
    super(...arguments), this.label = "", this.hintText = "", this.disabled = !1, this.invalid = !1, this._controlId = Oe("input"), this._labelId = Oe("label");
  }
  /** Programatically sets the invalid state of the input. Pass in boolean value in the argument */
  setInvalid(e) {
    this.invalid = e, e ? this.emit("sgds-invalid") : this.emit("sgds-valid");
  }
}
ce.styles = [...f.styles, Ya, Ua, Si, qa];
o([
  c({ reflect: !0 })
], ce.prototype, "label", void 0);
o([
  c({ reflect: !0 })
], ce.prototype, "hintText", void 0);
o([
  c({ reflect: !0 })
], ce.prototype, "name", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ce.prototype, "disabled", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ce.prototype, "invalid", void 0);
var Dc = b`input{margin:0}.form-check{display:flex;gap:var(--sgds-form-gap-md);padding:var(--sgds-form-padding-inline-sm) 0}.form-check-input,.form-check-input-container{height:var(--sgds-form-height-sm);width:var(--sgds-form-width-xs)}.form-check-input{appearance:none;background-color:var(--sgds-form-surface-default);background-image:var(--sgds-radio-bg-image);background-position:50%;background-repeat:no-repeat;background-size:auto;border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-default);border-radius:var(--sgds-form-border-radius-md)}:host(:not([disabled]):not([invalid]):not([checked]):not([indeterminate])) .form-check-input:hover{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis)}.form-check-input:focus,.form-check-input:focus-visible{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis);box-shadow:var(--sgds-form-box-shadow-focus);outline:0}.form-check-input:checked,.form-check-input[checked]{--sgds-radio-bg-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none"><path d="M14.347 3.979a.522.522 0 0 1 0 .739L7.043 12.02a.521.521 0 0 1-.738 0L2.653 8.369a.522.522 0 1 1 .739-.738l3.282 3.283 6.934-6.935a.52.52 0 0 1 .739 0Z" fill="%23fff"/></svg>');background-color:var(--sgds-form-primary-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-transparent)}.form-check-input:checked:focus,.form-check-input:checked:hover,.form-check-input[checked]:focus-visible,.form-check-input[checked]:hover{background-color:var(--sgds-form-primary-surface-emphasis)}.form-check-input:indeterminate,.form-check-input[indeterminate]{--sgds-radio-bg-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5Z" fill="%23fff"/></svg>');background-color:var(--sgds-form-primary-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-transparent)}.form-check-input:indeterminate:focus,.form-check-input:indeterminate:hover,.form-check-input[indeterminate]:focus-visible,.form-check-input[indeterminate]:hover{background-color:var(--sgds-form-primary-surface-emphasis)}:host([disabled]) .form-check{cursor:not-allowed;opacity:var(--sgds-opacity-50)}.form-check-input.is-invalid{border:var(--sgds-form-border-width-thick) solid var(--sgds-form-danger-border-color-default)}.form-check-input:checked.is-invalid,.form-check-input:indeterminate.is-invalid,.form-check-input[checked].is-invalid,.form-check-input[indeterminate].is-invalid{background-color:var(--sgds-form-danger-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-transparent)}.form-check-label{width:100%}`;
class Se extends $t(ce) {
  constructor() {
    super(...arguments), this.checked = !1, this.hasFeedback = !1, this.defaultChecked = !1, this.indeterminate = !1, this.required = !1, this._isTouched = !1;
  }
  _handleInvalidChange() {
    this.emit("sgds-validity-change", {
      detail: { invalid: this.invalid, validationMessage: this.input.validationMessage }
    });
  }
  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  focus(e) {
    this.input.focus(e);
  }
  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }
  _handleChange(e) {
    this.indeterminate && (this.indeterminate = !this.indeterminate), this.checked = !this.checked, this.value = this.input.value, super._mixinHandleChange(e), this.emit("sgds-change", { detail: { checked: this.checked, value: this.value } });
  }
  _handleKeyDown(e) {
    const t = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    e.key === "Enter" && !t && this.click();
  }
  _handleBlur() {
    this._isTouched = !0, this.emit("sgds-blur");
  }
  _handleFocus() {
    this.emit("sgds-focus");
  }
  _handleInvalid(e) {
    e.preventDefault(), this.invalid = !0;
  }
  /** @internal */
  _handleDisabledChange() {
    this.setInvalid(!1);
  }
  _handleIsTouched() {
    this._isTouched && (this.invalid = !this.input.checkValidity());
  }
  _mixinResetFormControl() {
    this._isTouched = !1, this.checked = this.input.checked = this.defaultChecked, this.input.dispatchEvent(new InputEvent("reset")), this._mixinResetValidity(this.input);
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  render() {
    return p`
      <div class="form-check">
        <div class="form-check-input-container">
          <input
            class=${T({
      "form-check-input": !0,
      "is-invalid": this.hasFeedback && this.invalid
    })}
            type="checkbox"
            id=${this._controlId}
            aria-invalid=${this.invalid ? "true" : "false"}
            name=${C(this.name)}
            ?indeterminate=${this.indeterminate}
            ?required=${this.required}
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-checked=${this.checked ? "true" : "false"}
            @change=${(e) => this._handleChange(e)}
            @keydown=${this._handleKeyDown}
            @invalid=${(e) => this._handleInvalid(e)}
            .checked=${Gt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            @blur=${this._handleBlur}
            @focus=${this._handleFocus}
          />
        </div>
        <label for="${this._controlId}" class="form-check-label" id="${this._labelId}"><slot></slot></label>
      </div>
    `;
  }
}
Se.styles = [...ce.styles, Dc];
o([
  c({ type: String, reflect: !0 })
], Se.prototype, "value", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Se.prototype, "checked", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Se.prototype, "hasFeedback", void 0);
o([
  Zt("checked")
], Se.prototype, "defaultChecked", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Se.prototype, "indeterminate", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Se.prototype, "required", void 0);
o([
  R()
], Se.prototype, "_isTouched", void 0);
o([
  O("invalid", { waitUntilFirstUpdate: !0 })
], Se.prototype, "_handleInvalidChange", null);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], Se.prototype, "_handleDisabledChange", null);
o([
  O("_isTouched", { waitUntilFirstUpdate: !0 })
], Se.prototype, "_handleIsTouched", null);
var Sc = b`:host([active]) .dropdown-item{background-color:var(--sgds-primary-surface-translucent)}.dropdown-item{background-color:var(--sgds-bg-transparent);clear:both;color:var(--sgds-color-default);cursor:pointer;height:100%;padding:var(--sgds-padding-sm) var(--sgds-padding-lg);text-align:inherit;white-space:nowrap}.dropdown-item .normal-item-content{align-items:center;display:flex;justify-content:space-between}:host([active]) .dropdown-item .normal-item-content{color:var(--sgds-primary-bg-default)}:host([active]) .dropdown-item .normal-item-content sgds-icon{fill:var(--sgds-primary-bg-default);color:var(--sgds-primary-bg-default)}.dropdown-item:hover{background:var(--sgds-bg-translucent-subtle)}.dropdown-item:focus,.dropdown-item:focus-visible{background:var(--sgds-bg-translucent-subtle);box-shadow:inset var(--sgds-form-box-shadow-focus);outline:0}`;
class vs extends f {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.checkbox = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "menuitem"), this.setAttribute("aria-disabled", `${this.disabled}`), this.addEventListener("keydown", (e) => {
      e.key === "Enter" && (this.checkbox ? this._handleCheckboxClick() : this._handleNonCheckboxClick());
    });
  }
  _handleNonCheckboxClick() {
    this.checkbox || this.emit("sgds-select");
  }
  _handleCheckboxClick() {
    this.shadowRoot.querySelector("sgds-checkbox").click();
  }
  _handleCheckboxChange(e) {
    const t = e.target;
    this.active = t.checked, this.active ? this.emit("sgds-select") : this.emit("sgds-unselect");
  }
  render() {
    const e = {
      disabled: this.disabled,
      active: this.active,
      checkbox: this.checkbox
    };
    return p`
      <div class="dropdown-item ${T(e)}" tabindex=${this.disabled ? "-1" : "0"}>
        ${this.checkbox ? p`
              <sgds-checkbox
                .checked=${this.active}
                .disabled=${this.disabled}
                @sgds-change=${this._handleCheckboxChange}
              >
                <slot></slot>
              </sgds-checkbox>
            ` : p`
              <div class="normal-item-content" @click=${this._handleNonCheckboxClick}>
                <slot></slot>
                ${this.active ? p` <sgds-icon name="check"></sgds-icon> ` : E}
              </div>
            `}
      </div>
    `;
  }
}
vs.dependencies = {
  "sgds-icon": re,
  "sgds-checkbox": Se
};
vs.styles = [Sc];
o([
  c({ type: Boolean, reflect: !0 })
], vs.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], vs.prototype, "disabled", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], vs.prototype, "checkbox", void 0);
var Tc = b`:host{display:block;position:relative}.combobox{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}.combobox .dropdown-menu{min-width:100%}.dropdown{display:flex;height:100%}.combobox .form-control-icon{align-items:center}.sgds.combobox{align-items:stretch;display:flex;flex-wrap:wrap;justify-content:flex-end;position:relative;width:-webkit-fill-available;width:-moz-available}.dropdown-menu{box-sizing:border-box;max-height:10rem;overflow-x:hidden;overflow-y:auto}.form-control-icon{bottom:0}.combobox-caret{color:var(--sgds-form-color-default)}.visually-hidden{clip:rect(0,0,0,0)!important;border:0!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}.form-control-group.disabled{cursor:not-allowed;opacity:var(--sgds-opacity-50)}.form-control-group{align-items:center;background-color:var(--sgds-form-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-default);border-radius:var(--sgds-form-border-radius-md);display:flex;gap:var(--sgds-form-gap-md);justify-content:space-between;min-height:var(--sgds-dimension-48);min-width:var(--sgds-dimension-256);padding:var(--sgds-form-padding-y) var(--sgds-form-padding-x);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:-webkit-fill-available;width:-moz-available}.form-control{appearance:none;background-clip:padding-box;background:none;border:none;color:var(--sgds-form-color-default);display:inline;flex-grow:1;font-size:var(--sgds-font-size-2);line-height:var(--sgds-line-height-body);outline:none;padding:0}.combobox-input-container{display:flex;flex-wrap:wrap;gap:var(--sgds-gap-xs);width:100%}.empty-menu{padding:var(--sgds-padding-sm) var(--sgds-padding-lg,20px)}.form-control-group.readonly{border-color:var(--sgds-border-color-muted)}.form-control-group:not(.disabled):not(.is-invalid):hover{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis)}.form-control-group:not(.disabled):not(.is-invalid):focus,.form-control-group:not(.disabled):not(.is-invalid):focus-within{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis);box-shadow:var(--sgds-form-box-shadow-focus);outline:0}.form-control-group.is-invalid{border:var(--sgds-form-border-width-thick) solid var(--sgds-form-danger-border-color-default)}.form-control-group.disabled{background-color:var(--sgds-form-surface-muted)}`;
class W extends $t(_t) {
  constructor() {
    super(), this.label = "", this.hintText = "", this.autofocus = !1, this.disabled = !1, this.required = !1, this.readonly = !1, this.value = "", this.displayValue = "", this.defaultValue = "", this.hasFeedback = !1, this.invalidFeedback = "", this.invalid = !1, this.menuList = [], this.multiSelect = !1, this.filterFunction = (e, t) => t.label.toLowerCase().startsWith(e.toLowerCase()), this.filteredMenuList = [], this._renderedMenu = [], this.selectedItems = [], this._isTouched = !1, this._controlId = Oe("input"), this._labelId = Oe("label"), this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      }
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("blur", async () => {
      this.invalid = !this._mixinReportValidity();
    }), this.addEventListener("sgds-hide", async () => {
      (await this._sgdsInput).focus(), this._renderedMenu = this.menuList;
    }), this.readonly && (this._handleKeyboardMenuEvent = null, this._handleKeyboardMenuItemsEvent = null);
  }
  async firstUpdated() {
    if (super.firstUpdated(), this._renderedMenu = this.menuList, this.value) {
      const e = this.value.split(";"), t = this.menuList.filter(({ value: s }) => e.includes(s));
      this.selectedItems = [...t, ...this.selectedItems], this.multiSelect || (this.displayValue = t[0].label);
    }
    this.multiSelect ? this.input = await this._multiSelectInput : this.input = await this._sgdsInput, this._mixinValidate(this.input), this.menuIsOpen && !this.readonly && this.showMenu();
  }
  async _handleValueChange() {
    this.value && this.emit("sgds-select");
    const e = await this._sgdsInput;
    this._mixinSetFormValue(), this.multiSelect ? this._mixinValidate(this.input) : this._mixinValidate(e), !(!this._isTouched && this.value === "") && (this.invalid = !this._mixinReportValidity());
  }
  // Called each time the user types in the <sgds-input>, we set .value and show the menu
  async _handleInputChange(e) {
    this.emit("sgds-input");
    const t = e.target;
    this.displayValue = t.value, this.filteredMenuList = this.menuList.filter((s) => this.filterFunction(this.displayValue, s)), this.displayValue === "" && !this.multiSelect && (this.selectedItems = [], this.value = this.selectedItems.join(";")), this.invalid = !1, this.showMenu(), this.displayValue = e.target.value, this._renderedMenu = this.filteredMenuList, this.displayValue === "" && (this._renderedMenu = this.menuList, await this.updateComplete);
  }
  /**
   * Called whenever an <sgds-combo-box-item> dispatches sgds-select"
   */
  async _handleItemSelected(e) {
    var t, s, a;
    const r = e.target, n = (s = (t = r.textContent) === null || t === void 0 ? void 0 : t.trim()) !== null && s !== void 0 ? s : "", d = (a = r.getAttribute("value")) !== null && a !== void 0 ? a : n, l = this.filteredMenuList.find((h) => h.value.toString() === d) || {
      label: n,
      value: d
    };
    this.multiSelect ? (this.selectedItems.some((h) => h.value === l.value) || (this.selectedItems = [...this.selectedItems, l], setTimeout(() => this.displayValue = "")), this.hideMenu(), this.value = this.selectedItems.map((h) => h.value).join(";")) : (this.selectedItems = [l], this.value = l.value.toString(), this.displayValue = this.selectedItems[0].label, this.hideMenu());
  }
  _handleItemUnselect(e) {
    var t, s, a;
    const r = e.target, n = (s = (t = r.textContent) === null || t === void 0 ? void 0 : t.trim()) !== null && s !== void 0 ? s : "", d = (a = r.getAttribute("value")) !== null && a !== void 0 ? a : n, l = this.filteredMenuList.find((h) => h.value.toString() === d) || {
      value: d
    };
    this.selectedItems = this.selectedItems.filter((h) => h.value !== l.value), this.value = this.selectedItems.map((h) => h.value).join(";");
  }
  async _handleBadgeDismissed(e) {
    this.selectedItems = this.selectedItems.filter((t) => t.value !== e.value), this.value = this.selectedItems.map((t) => t.value).join(";");
  }
  async _handleMultiSelectKeyDown(e) {
    this.multiSelect && e.key === "Backspace" && this.multiSelect && this.displayValue.trim() === "" && this.selectedItems.length > 0 && (this.selectedItems = this.selectedItems.slice(0, -1), this.value = this.selectedItems.map((t) => t.value).join(";"));
  }
  async _handleInputBlur(e) {
    e.preventDefault(), this.multiSelect ? this.selectedItems.filter(({ label: s }) => this.displayValue === s).length <= 0 && (this.displayValue = "") : this.selectedItems.length > 0 ? this.displayValue = this.selectedItems[0].label : this.displayValue = "";
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  _renderFeedback() {
    return this.invalid && this.hasFeedback ? p` <div class="invalid-feedback-container">
          <slot name="invalidIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                fill="currentColor"
              />
            </svg>
          </slot>
          <div id="${this._controlId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
          </div>
        </div>` : p`${this._renderHintText()}`;
  }
  _renderHintText() {
    const e = p` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  /** For form reset  */
  async _mixinResetFormControl() {
    if (this.value = this.defaultValue, this.multiSelect) {
      const e = this.value.split(";"), t = this.menuList.filter(({ value: s }) => e.includes(s));
      this.selectedItems = t, this._mixinResetValidity(await this._multiSelectInput);
    } else {
      const e = this.menuList.filter(({ value: t }) => t === this.value);
      e.length <= 0 ? this.displayValue = "" : this.displayValue = e[0].label, this._mixinResetValidity(await this._sgdsInput);
    }
  }
  _menu() {
    const e = p` <div class="empty-menu">No options</div> `, t = this._renderedMenu.map((s) => {
      let a = !1;
      return this.multiSelect ? a = this.selectedItems.map((n) => n.value).includes(s.value) : a = s.value === this.value, p`
        <sgds-combo-box-item
          ?active=${a}
          ?checkbox=${this.multiSelect}
          value=${s.value}
          @sgds-select=${this._handleItemSelected}
          @sgds-unselect=${this._handleItemUnselect}
        >
          ${s.label}
        </sgds-combo-box-item>
      `;
    });
    return this._renderedMenu.length === 0 ? e : t;
  }
  _handleClick() {
    if (this.readonly)
      return null;
    this.menuIsOpen ? this.hideMenu() : this.showMenu();
  }
  _renderLabel() {
    const e = p`
      <label
        for=${this._controlId}
        id=${this._labelId}
        class=${T({
      "form-label": !0,
      required: this.required
    })}
        >${this.label}</label
      >
    `;
    return this.label && e;
  }
  _renderInput() {
    const e = this.hasFeedback;
    return p`
      <div
        ${Ws(this.myDropdown)}
        class="form-control-group ${T({
      disabled: this.disabled,
      readonly: this.readonly,
      "is-invalid": this.invalid && e
    })}"
        @click=${this._handleClick}
      >
        <div class="combobox-input-container">
          ${this.multiSelect ? p`
                ${this.selectedItems.map((t) => p`<sgds-badge
                      outlined
                      variant="neutral"
                      show
                      dismissible
                      @sgds-hide=${() => this._handleBadgeDismissed(t)}
                      >${t.label}</sgds-badge
                    >`)}
              ` : E}
          <input
            class="form-control"
            type="text"
            id=${this._controlId}
            name=${C(this.name)}
            placeholder=${C(this.placeholder)}
            aria-invalid=${this.invalid ? "true" : "false"}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            .value=${this.displayValue}
            @input=${this._handleInputChange}
            @blur=${this._handleInputBlur}
            aria-describedby=${C(this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : void 0)}
            aria-labelledby="${this._labelId} ${this._controlId}Help ${this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : ""}"
          />
        </div>
        <sgds-icon name="chevron-down" size="md"></sgds-icon>
      </div>
    `;
  }
  render() {
    return p`
      <div class="combobox" @keydown=${this._handleMultiSelectKeyDown}>
        ${this._renderLabel()}
        <!-- The input -->
        ${this._renderInput()} ${this._renderFeedback()}
        <ul id=${this.dropdownMenuId} class="dropdown-menu" part="menu" tabindex="-1">
          ${this._menu()}
        </ul>
      </div>
      <!-- Required an input element for constraint validation -->
      ${this.multiSelect ? p`<input
            .value=${Gt(this.value)}
            id="multi-select-input-tracker"
            class="visually-hidden"
            ?required=${this.required}
          />` : E}
    `;
  }
}
W.styles = [..._t.styles, Gs, Ua, Ya, Tc];
W.dependencies = {
  "sgds-combo-box-item": vs,
  "sgds-icon": re,
  "sgds-badge": at
};
o([
  c({ reflect: !0 })
], W.prototype, "label", void 0);
o([
  c({ reflect: !0 })
], W.prototype, "hintText", void 0);
o([
  c({ reflect: !0 })
], W.prototype, "name", void 0);
o([
  c({ type: String, reflect: !0 })
], W.prototype, "placeholder", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "autofocus", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "disabled", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "required", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "readonly", void 0);
o([
  c({ type: String, reflect: !0 })
], W.prototype, "value", void 0);
o([
  R()
], W.prototype, "displayValue", void 0);
o([
  Zt()
], W.prototype, "defaultValue", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "hasFeedback", void 0);
o([
  c({ type: String, reflect: !0 })
], W.prototype, "invalidFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "invalid", void 0);
o([
  c({ type: Array })
], W.prototype, "menuList", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], W.prototype, "multiSelect", void 0);
o([
  c()
], W.prototype, "filterFunction", void 0);
o([
  R()
], W.prototype, "filteredMenuList", void 0);
o([
  R()
], W.prototype, "_renderedMenu", void 0);
o([
  R()
], W.prototype, "selectedItems", void 0);
o([
  bt("input.form-control")
], W.prototype, "_sgdsInput", void 0);
o([
  bt("input#multi-select-input-tracker")
], W.prototype, "_multiSelectInput", void 0);
o([
  O("value", { waitUntilFirstUpdate: !0 })
], W.prototype, "_handleValueChange", null);
A("sgds-combo-box", W);
var Ic = b`:host{--sgds-checkbox-group-gap:var(--sgds-spacer-2)}fieldset{border:0;gap:var(--sgds-form-gap-md);margin:0;min-width:0;padding:0}.label-hint-container,fieldset{display:flex;flex-direction:column}.label-hint-container{gap:var(--sgds-form-gap-sm)}.label-hint-container .form-label{color:var(--sgds-form-color-default);font-size:var(--sgds-font-size-2);font-weight:var(--sgds-font-weight-regular)}.checkbox-container{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}`;
class nt extends f {
  constructor() {
    super(), this.hasInvalidCheckbox = !1, this.label = "", this.invalidFeedback = "", this.hasFeedback = !1, this.hintText = "", this.addEventListener("sgds-validity-change", (e) => {
      this.hasInvalidCheckbox = e.detail.invalid, this.validationMessage = e.detail.validationMessage;
    });
  }
  _checkInvalidState() {
    this.hasInvalidCheckbox = Array.from(this.checkboxes).some((e) => e.invalid);
  }
  /** Overrides hasFeedback from individual SgdsCheckbox  */
  _forwardHasFeedback() {
    Array.from(this.checkboxes).forEach((e) => e.hasFeedback = this.hasFeedback);
  }
  _renderHintText() {
    const e = p` <div class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  firstUpdated() {
    this._forwardHasFeedback();
  }
  updated() {
    this._checkInvalidState();
  }
  render() {
    return p`
      <fieldset>
        <div class="label-hint-container">
          <label class="form-label">${this.label}</label>
          ${this._renderHintText()}
        </div>
        <div class="checkbox-container">
          <slot></slot>
        </div>
        ${this.hasInvalidCheckbox && this.hasFeedback ? p`
              <div class="invalid-feedback-container">
                <slot name="invalidIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                      fill="currentColor"
                    />
                  </svg>
                </slot>
                <div id="checkbox-feedback" tabindex="0" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
                </div>
              </div>
            ` : E}
      </fieldset>
    `;
  }
}
nt.styles = [...f.styles, Ya, Si, Ic, Ua];
o([
  ve({ flatten: !0 })
], nt.prototype, "checkboxes", void 0);
o([
  R()
], nt.prototype, "hasInvalidCheckbox", void 0);
o([
  R()
], nt.prototype, "validationMessage", void 0);
o([
  c({ reflect: !0 })
], nt.prototype, "label", void 0);
o([
  c({ type: String, reflect: !0 })
], nt.prototype, "invalidFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], nt.prototype, "hasFeedback", void 0);
o([
  c({ reflect: !0 })
], nt.prototype, "hintText", void 0);
A("sgds-checkbox", Se);
A("sgds-checkbox-group", nt);
function z(i) {
  const e = Object.prototype.toString.call(i);
  return i instanceof Date || typeof i == "object" && e === "[object Date]" ? new i.constructor(+i) : typeof i == "number" || e === "[object Number]" || typeof i == "string" || e === "[object String]" ? new Date(i) : /* @__PURE__ */ new Date(NaN);
}
function Q(i, e) {
  return i instanceof Date ? new i.constructor(e) : new Date(e);
}
function Gn(i, e) {
  const t = z(i);
  return isNaN(e) ? Q(i, NaN) : (e && t.setDate(t.getDate() + e), t);
}
const Zn = 6048e5, Mc = 864e5, Fc = 6e4, Oc = 36e5, Lc = 1e3;
let Pc = {};
function bs() {
  return Pc;
}
function wt(i, e) {
  var d, l, h, u;
  const t = bs(), s = (e == null ? void 0 : e.weekStartsOn) ?? ((l = (d = e == null ? void 0 : e.locale) == null ? void 0 : d.options) == null ? void 0 : l.weekStartsOn) ?? t.weekStartsOn ?? ((u = (h = t.locale) == null ? void 0 : h.options) == null ? void 0 : u.weekStartsOn) ?? 0, a = z(i), r = a.getDay(), n = (r < s ? 7 : 0) + r - s;
  return a.setDate(a.getDate() - n), a.setHours(0, 0, 0, 0), a;
}
function gs(i) {
  return wt(i, { weekStartsOn: 1 });
}
function Xn(i) {
  const e = z(i), t = e.getFullYear(), s = Q(i, 0);
  s.setFullYear(t + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const a = gs(s), r = Q(i, 0);
  r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0);
  const n = gs(r);
  return e.getTime() >= a.getTime() ? t + 1 : e.getTime() >= n.getTime() ? t : t - 1;
}
function Fr(i) {
  const e = z(i);
  return e.setHours(0, 0, 0, 0), e;
}
function bi(i) {
  const e = z(i), t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return t.setUTCFullYear(e.getFullYear()), +i - +t;
}
function Bc(i, e) {
  const t = Fr(i), s = Fr(e), a = +t - bi(t), r = +s - bi(s);
  return Math.round((a - r) / Mc);
}
function Rc(i) {
  const e = Xn(i), t = Q(i, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), gs(t);
}
function Vc(i) {
  return i instanceof Date || typeof i == "object" && Object.prototype.toString.call(i) === "[object Date]";
}
function Qn(i) {
  if (!Vc(i) && typeof i != "number")
    return !1;
  const e = z(i);
  return !isNaN(Number(e));
}
function Nc(i) {
  const e = z(i);
  return e.setHours(23, 59, 59, 999), e;
}
function zc(i) {
  const e = z(i), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Jn(i) {
  const e = z(i);
  return +Nc(e) == +zc(e);
}
function Hc(i) {
  const e = z(i), t = Q(i, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
const Yc = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Uc = (i, e, t) => {
  let s;
  const a = Yc[i];
  return typeof a == "string" ? s = a : e === 1 ? s = a.one : s = a.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + s : s + " ago" : s;
};
function Ji(i) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : i.defaultWidth;
    return i.formats[t] || i.formats[i.defaultWidth];
  };
}
const qc = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, jc = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Wc = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Kc = {
  date: Ji({
    formats: qc,
    defaultWidth: "full"
  }),
  time: Ji({
    formats: jc,
    defaultWidth: "full"
  }),
  dateTime: Ji({
    formats: Wc,
    defaultWidth: "full"
  })
}, Gc = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Zc = (i, e, t, s) => Gc[i];
function $s(i) {
  return (e, t) => {
    const s = t != null && t.context ? String(t.context) : "standalone";
    let a;
    if (s === "formatting" && i.formattingValues) {
      const n = i.defaultFormattingWidth || i.defaultWidth, d = t != null && t.width ? String(t.width) : n;
      a = i.formattingValues[d] || i.formattingValues[n];
    } else {
      const n = i.defaultWidth, d = t != null && t.width ? String(t.width) : i.defaultWidth;
      a = i.values[d] || i.values[n];
    }
    const r = i.argumentCallback ? i.argumentCallback(e) : e;
    return a[r];
  };
}
const Xc = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Qc = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Jc = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, eh = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, th = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, sh = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, ih = (i, e) => {
  const t = Number(i), s = t % 100;
  if (s > 20 || s < 10)
    switch (s % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
    }
  return t + "th";
}, ah = {
  ordinalNumber: ih,
  era: $s({
    values: Xc,
    defaultWidth: "wide"
  }),
  quarter: $s({
    values: Qc,
    defaultWidth: "wide",
    argumentCallback: (i) => i - 1
  }),
  month: $s({
    values: Jc,
    defaultWidth: "wide"
  }),
  day: $s({
    values: eh,
    defaultWidth: "wide"
  }),
  dayPeriod: $s({
    values: th,
    defaultWidth: "wide",
    formattingValues: sh,
    defaultFormattingWidth: "wide"
  })
};
function Es(i) {
  return (e, t = {}) => {
    const s = t.width, a = s && i.matchPatterns[s] || i.matchPatterns[i.defaultMatchWidth], r = e.match(a);
    if (!r)
      return null;
    const n = r[0], d = s && i.parsePatterns[s] || i.parsePatterns[i.defaultParseWidth], l = Array.isArray(d) ? nh(d, (g) => g.test(n)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      rh(d, (g) => g.test(n))
    );
    let h;
    h = i.valueCallback ? i.valueCallback(l) : l, h = t.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      t.valueCallback(h)
    ) : h;
    const u = e.slice(n.length);
    return { value: h, rest: u };
  };
}
function rh(i, e) {
  for (const t in i)
    if (Object.prototype.hasOwnProperty.call(i, t) && e(i[t]))
      return t;
}
function nh(i, e) {
  for (let t = 0; t < i.length; t++)
    if (e(i[t]))
      return t;
}
function oh(i) {
  return (e, t = {}) => {
    const s = e.match(i.matchPattern);
    if (!s) return null;
    const a = s[0], r = e.match(i.parsePattern);
    if (!r) return null;
    let n = i.valueCallback ? i.valueCallback(r[0]) : r[0];
    n = t.valueCallback ? t.valueCallback(n) : n;
    const d = e.slice(a.length);
    return { value: n, rest: d };
  };
}
const dh = /^(\d+)(th|st|nd|rd)?/i, lh = /\d+/i, ch = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, hh = {
  any: [/^b/i, /^(a|c)/i]
}, uh = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, ph = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, gh = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, fh = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, mh = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, vh = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, bh = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, yh = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, wh = {
  ordinalNumber: oh({
    matchPattern: dh,
    parsePattern: lh,
    valueCallback: (i) => parseInt(i, 10)
  }),
  era: Es({
    matchPatterns: ch,
    defaultMatchWidth: "wide",
    parsePatterns: hh,
    defaultParseWidth: "any"
  }),
  quarter: Es({
    matchPatterns: uh,
    defaultMatchWidth: "wide",
    parsePatterns: ph,
    defaultParseWidth: "any",
    valueCallback: (i) => i + 1
  }),
  month: Es({
    matchPatterns: gh,
    defaultMatchWidth: "wide",
    parsePatterns: fh,
    defaultParseWidth: "any"
  }),
  day: Es({
    matchPatterns: mh,
    defaultMatchWidth: "wide",
    parsePatterns: vh,
    defaultParseWidth: "any"
  }),
  dayPeriod: Es({
    matchPatterns: bh,
    defaultMatchWidth: "any",
    parsePatterns: yh,
    defaultParseWidth: "any"
  })
}, eo = {
  code: "en-US",
  formatDistance: Uc,
  formatLong: Kc,
  formatRelative: Zc,
  localize: ah,
  match: wh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function kh(i) {
  const e = z(i);
  return Bc(e, Hc(e)) + 1;
}
function to(i) {
  const e = z(i), t = +gs(e) - +Rc(e);
  return Math.round(t / Zn) + 1;
}
function ja(i, e) {
  var u, g, v, m;
  const t = z(i), s = t.getFullYear(), a = bs(), r = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((g = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : g.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((m = (v = a.locale) == null ? void 0 : v.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, n = Q(i, 0);
  n.setFullYear(s + 1, 0, r), n.setHours(0, 0, 0, 0);
  const d = wt(n, e), l = Q(i, 0);
  l.setFullYear(s, 0, r), l.setHours(0, 0, 0, 0);
  const h = wt(l, e);
  return t.getTime() >= d.getTime() ? s + 1 : t.getTime() >= h.getTime() ? s : s - 1;
}
function xh(i, e) {
  var d, l, h, u;
  const t = bs(), s = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((l = (d = e == null ? void 0 : e.locale) == null ? void 0 : d.options) == null ? void 0 : l.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (h = t.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, a = ja(i, e), r = Q(i, 0);
  return r.setFullYear(a, 0, s), r.setHours(0, 0, 0, 0), wt(r, e);
}
function so(i, e) {
  const t = z(i), s = +wt(t, e) - +xh(t, e);
  return Math.round(s / Zn) + 1;
}
function Y(i, e) {
  const t = i < 0 ? "-" : "", s = Math.abs(i).toString().padStart(e, "0");
  return t + s;
}
const pt = {
  // Year
  y(i, e) {
    const t = i.getFullYear(), s = t > 0 ? t : 1 - t;
    return Y(e === "yy" ? s % 100 : s, e.length);
  },
  // Month
  M(i, e) {
    const t = i.getMonth();
    return e === "M" ? String(t + 1) : Y(t + 1, 2);
  },
  // Day of the month
  d(i, e) {
    return Y(i.getDate(), e.length);
  },
  // AM or PM
  a(i, e) {
    const t = i.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.toUpperCase();
      case "aaa":
        return t;
      case "aaaaa":
        return t[0];
      case "aaaa":
      default:
        return t === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(i, e) {
    return Y(i.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(i, e) {
    return Y(i.getHours(), e.length);
  },
  // Minute
  m(i, e) {
    return Y(i.getMinutes(), e.length);
  },
  // Second
  s(i, e) {
    return Y(i.getSeconds(), e.length);
  },
  // Fraction of second
  S(i, e) {
    const t = e.length, s = i.getMilliseconds(), a = Math.trunc(
      s * Math.pow(10, t - 3)
    );
    return Y(a, e.length);
  }
}, Jt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Or = {
  // Era
  G: function(i, e, t) {
    const s = i.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return t.era(s, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return t.era(s, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return t.era(s, { width: "wide" });
    }
  },
  // Year
  y: function(i, e, t) {
    if (e === "yo") {
      const s = i.getFullYear(), a = s > 0 ? s : 1 - s;
      return t.ordinalNumber(a, { unit: "year" });
    }
    return pt.y(i, e);
  },
  // Local week-numbering year
  Y: function(i, e, t, s) {
    const a = ja(i, s), r = a > 0 ? a : 1 - a;
    if (e === "YY") {
      const n = r % 100;
      return Y(n, 2);
    }
    return e === "Yo" ? t.ordinalNumber(r, { unit: "year" }) : Y(r, e.length);
  },
  // ISO week-numbering year
  R: function(i, e) {
    const t = Xn(i);
    return Y(t, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(i, e) {
    const t = i.getFullYear();
    return Y(t, e.length);
  },
  // Quarter
  Q: function(i, e, t) {
    const s = Math.ceil((i.getMonth() + 1) / 3);
    switch (e) {
      // 1, 2, 3, 4
      case "Q":
        return String(s);
      // 01, 02, 03, 04
      case "QQ":
        return Y(s, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return t.ordinalNumber(s, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return t.quarter(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return t.quarter(s, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return t.quarter(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(i, e, t) {
    const s = Math.ceil((i.getMonth() + 1) / 3);
    switch (e) {
      // 1, 2, 3, 4
      case "q":
        return String(s);
      // 01, 02, 03, 04
      case "qq":
        return Y(s, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return t.ordinalNumber(s, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return t.quarter(s, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return t.quarter(s, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return t.quarter(s, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(i, e, t) {
    const s = i.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return pt.M(i, e);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return t.ordinalNumber(s + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return t.month(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return t.month(s, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return t.month(s, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(i, e, t) {
    const s = i.getMonth();
    switch (e) {
      // 1, 2, ..., 12
      case "L":
        return String(s + 1);
      // 01, 02, ..., 12
      case "LL":
        return Y(s + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return t.ordinalNumber(s + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return t.month(s, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return t.month(s, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return t.month(s, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(i, e, t, s) {
    const a = so(i, s);
    return e === "wo" ? t.ordinalNumber(a, { unit: "week" }) : Y(a, e.length);
  },
  // ISO week of year
  I: function(i, e, t) {
    const s = to(i);
    return e === "Io" ? t.ordinalNumber(s, { unit: "week" }) : Y(s, e.length);
  },
  // Day of the month
  d: function(i, e, t) {
    return e === "do" ? t.ordinalNumber(i.getDate(), { unit: "date" }) : pt.d(i, e);
  },
  // Day of year
  D: function(i, e, t) {
    const s = kh(i);
    return e === "Do" ? t.ordinalNumber(s, { unit: "dayOfYear" }) : Y(s, e.length);
  },
  // Day of week
  E: function(i, e, t) {
    const s = i.getDay();
    switch (e) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return t.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return t.day(s, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return t.day(s, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return t.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(i, e, t, s) {
    const a = i.getDay(), r = (a - s.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(r);
      // Padded numerical value
      case "ee":
        return Y(r, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return t.ordinalNumber(r, { unit: "day" });
      case "eee":
        return t.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return t.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return t.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return t.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(i, e, t, s) {
    const a = i.getDay(), r = (a - s.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      // Numerical value (same as in `e`)
      case "c":
        return String(r);
      // Padded numerical value
      case "cc":
        return Y(r, e.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return t.ordinalNumber(r, { unit: "day" });
      case "ccc":
        return t.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return t.day(a, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return t.day(a, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return t.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(i, e, t) {
    const s = i.getDay(), a = s === 0 ? 7 : s;
    switch (e) {
      // 2
      case "i":
        return String(a);
      // 02
      case "ii":
        return Y(a, e.length);
      // 2nd
      case "io":
        return t.ordinalNumber(a, { unit: "day" });
      // Tue
      case "iii":
        return t.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return t.day(s, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return t.day(s, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return t.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(i, e, t) {
    const a = i.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return t.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return t.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return t.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(i, e, t) {
    const s = i.getHours();
    let a;
    switch (s === 12 ? a = Jt.noon : s === 0 ? a = Jt.midnight : a = s / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return t.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return t.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return t.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return t.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(i, e, t) {
    const s = i.getHours();
    let a;
    switch (s >= 17 ? a = Jt.evening : s >= 12 ? a = Jt.afternoon : s >= 4 ? a = Jt.morning : a = Jt.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return t.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return t.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(i, e, t) {
    if (e === "ho") {
      let s = i.getHours() % 12;
      return s === 0 && (s = 12), t.ordinalNumber(s, { unit: "hour" });
    }
    return pt.h(i, e);
  },
  // Hour [0-23]
  H: function(i, e, t) {
    return e === "Ho" ? t.ordinalNumber(i.getHours(), { unit: "hour" }) : pt.H(i, e);
  },
  // Hour [0-11]
  K: function(i, e, t) {
    const s = i.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(s, { unit: "hour" }) : Y(s, e.length);
  },
  // Hour [1-24]
  k: function(i, e, t) {
    let s = i.getHours();
    return s === 0 && (s = 24), e === "ko" ? t.ordinalNumber(s, { unit: "hour" }) : Y(s, e.length);
  },
  // Minute
  m: function(i, e, t) {
    return e === "mo" ? t.ordinalNumber(i.getMinutes(), { unit: "minute" }) : pt.m(i, e);
  },
  // Second
  s: function(i, e, t) {
    return e === "so" ? t.ordinalNumber(i.getSeconds(), { unit: "second" }) : pt.s(i, e);
  },
  // Fraction of second
  S: function(i, e) {
    return pt.S(i, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(i, e, t) {
    const s = i.getTimezoneOffset();
    if (s === 0)
      return "Z";
    switch (e) {
      // Hours and optional minutes
      case "X":
        return Pr(s);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Rt(s);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Rt(s, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(i, e, t) {
    const s = i.getTimezoneOffset();
    switch (e) {
      // Hours and optional minutes
      case "x":
        return Pr(s);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Rt(s);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Rt(s, ":");
    }
  },
  // Timezone (GMT)
  O: function(i, e, t) {
    const s = i.getTimezoneOffset();
    switch (e) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Lr(s, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Rt(s, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(i, e, t) {
    const s = i.getTimezoneOffset();
    switch (e) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Lr(s, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Rt(s, ":");
    }
  },
  // Seconds timestamp
  t: function(i, e, t) {
    const s = Math.trunc(i.getTime() / 1e3);
    return Y(s, e.length);
  },
  // Milliseconds timestamp
  T: function(i, e, t) {
    const s = i.getTime();
    return Y(s, e.length);
  }
};
function Lr(i, e = "") {
  const t = i > 0 ? "-" : "+", s = Math.abs(i), a = Math.trunc(s / 60), r = s % 60;
  return r === 0 ? t + String(a) : t + String(a) + e + Y(r, 2);
}
function Pr(i, e) {
  return i % 60 === 0 ? (i > 0 ? "-" : "+") + Y(Math.abs(i) / 60, 2) : Rt(i, e);
}
function Rt(i, e = "") {
  const t = i > 0 ? "-" : "+", s = Math.abs(i), a = Y(Math.trunc(s / 60), 2), r = Y(s % 60, 2);
  return t + a + e + r;
}
const Br = (i, e) => {
  switch (i) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, io = (i, e) => {
  switch (i) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, _h = (i, e) => {
  const t = i.match(/(P+)(p+)?/) || [], s = t[1], a = t[2];
  if (!a)
    return Br(i, e);
  let r;
  switch (s) {
    case "P":
      r = e.dateTime({ width: "short" });
      break;
    case "PP":
      r = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      r = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      r = e.dateTime({ width: "full" });
      break;
  }
  return r.replace("{{date}}", Br(s, e)).replace("{{time}}", io(a, e));
}, ua = {
  p: io,
  P: _h
}, Ch = /^D+$/, $h = /^Y+$/, Eh = ["D", "DD", "YY", "YYYY"];
function ao(i) {
  return Ch.test(i);
}
function ro(i) {
  return $h.test(i);
}
function pa(i, e, t) {
  const s = Ah(i, e, t);
  if (console.warn(s), Eh.includes(i)) throw new RangeError(s);
}
function Ah(i, e, t) {
  const s = i[0] === "Y" ? "years" : "days of the month";
  return `Use \`${i.toLowerCase()}\` instead of \`${i}\` (in \`${e}\`) for formatting ${s} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Dh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Sh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Th = /^'([^]*?)'?$/, Ih = /''/g, Mh = /[a-zA-Z]/;
function no(i, e, t) {
  var u, g, v, m;
  const s = bs(), a = s.locale ?? eo, r = s.firstWeekContainsDate ?? ((g = (u = s.locale) == null ? void 0 : u.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, n = s.weekStartsOn ?? ((m = (v = s.locale) == null ? void 0 : v.options) == null ? void 0 : m.weekStartsOn) ?? 0, d = z(i);
  if (!Qn(d))
    throw new RangeError("Invalid time value");
  let l = e.match(Sh).map((x) => {
    const w = x[0];
    if (w === "p" || w === "P") {
      const S = ua[w];
      return S(x, a.formatLong);
    }
    return x;
  }).join("").match(Dh).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const w = x[0];
    if (w === "'")
      return { isToken: !1, value: Fh(x) };
    if (Or[w])
      return { isToken: !0, value: x };
    if (w.match(Mh))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + w + "`"
      );
    return { isToken: !1, value: x };
  });
  a.localize.preprocessor && (l = a.localize.preprocessor(d, l));
  const h = {
    firstWeekContainsDate: r,
    weekStartsOn: n,
    locale: a
  };
  return l.map((x) => {
    if (!x.isToken) return x.value;
    const w = x.value;
    (ro(w) || ao(w)) && pa(w, e, String(i));
    const S = Or[w[0]];
    return S(d, w, a.localize, h);
  }).join("");
}
function Fh(i) {
  const e = i.match(Th);
  return e ? e[1].replace(Ih, "'") : i;
}
function oo(i) {
  const e = z(i), t = e.getFullYear(), s = e.getMonth(), a = Q(i, 0);
  return a.setFullYear(t, s + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Oh() {
  return Object.assign({}, bs());
}
function Lh(i) {
  let t = z(i).getDay();
  return t === 0 && (t = 7), t;
}
function lo(i) {
  const e = z(i), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(0, 0, 0, 0), e;
}
function ga(i, e) {
  const t = z(i), s = z(e);
  return t.getTime() > s.getTime();
}
function fa(i, e) {
  const t = z(i), s = z(e);
  return +t < +s;
}
function ma(i, e) {
  const t = z(i), s = z(e);
  return +t == +s;
}
function Ph(i, e) {
  const t = e instanceof Date ? Q(e, 0) : new e(0);
  return t.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    i.getDate()
  ), t.setHours(
    i.getHours(),
    i.getMinutes(),
    i.getSeconds(),
    i.getMilliseconds()
  ), t;
}
const Bh = 10;
class co {
  constructor() {
    y(this, "subPriority", 0);
  }
  validate(e, t) {
    return !0;
  }
}
class Rh extends co {
  constructor(e, t, s, a, r) {
    super(), this.value = e, this.validateValue = t, this.setValue = s, this.priority = a, r && (this.subPriority = r);
  }
  validate(e, t) {
    return this.validateValue(e, this.value, t);
  }
  set(e, t, s) {
    return this.setValue(e, t, this.value, s);
  }
}
class Vh extends co {
  constructor() {
    super(...arguments);
    y(this, "priority", Bh);
    y(this, "subPriority", -1);
  }
  set(t, s) {
    return s.timestampIsSet ? t : Q(t, Ph(t, Date));
  }
}
class V {
  run(e, t, s, a) {
    const r = this.parse(e, t, s, a);
    return r ? {
      setter: new Rh(
        r.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: r.rest
    } : null;
  }
  validate(e, t, s) {
    return !0;
  }
}
class Nh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 140);
    y(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return a.era(t, { width: "abbreviated" }) || a.era(t, { width: "narrow" });
      // A, B
      case "GGGGG":
        return a.era(t, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return a.era(t, { width: "wide" }) || a.era(t, { width: "abbreviated" }) || a.era(t, { width: "narrow" });
    }
  }
  set(t, s, a) {
    return s.era = a, t.setFullYear(a, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
const se = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, qe = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function ie(i, e) {
  return i && {
    value: e(i.value),
    rest: i.rest
  };
}
function J(i, e) {
  const t = e.match(i);
  return t ? {
    value: parseInt(t[0], 10),
    rest: e.slice(t[0].length)
  } : null;
}
function je(i, e) {
  const t = e.match(i);
  if (!t)
    return null;
  if (t[0] === "Z")
    return {
      value: 0,
      rest: e.slice(1)
    };
  const s = t[1] === "+" ? 1 : -1, a = t[2] ? parseInt(t[2], 10) : 0, r = t[3] ? parseInt(t[3], 10) : 0, n = t[5] ? parseInt(t[5], 10) : 0;
  return {
    value: s * (a * Oc + r * Fc + n * Lc),
    rest: e.slice(t[0].length)
  };
}
function ho(i) {
  return J(se.anyDigitsSigned, i);
}
function ee(i, e) {
  switch (i) {
    case 1:
      return J(se.singleDigit, e);
    case 2:
      return J(se.twoDigits, e);
    case 3:
      return J(se.threeDigits, e);
    case 4:
      return J(se.fourDigits, e);
    default:
      return J(new RegExp("^\\d{1," + i + "}"), e);
  }
}
function yi(i, e) {
  switch (i) {
    case 1:
      return J(se.singleDigitSigned, e);
    case 2:
      return J(se.twoDigitsSigned, e);
    case 3:
      return J(se.threeDigitsSigned, e);
    case 4:
      return J(se.fourDigitsSigned, e);
    default:
      return J(new RegExp("^-?\\d{1," + i + "}"), e);
  }
}
function Wa(i) {
  switch (i) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function uo(i, e) {
  const t = e > 0, s = t ? e : 1 - e;
  let a;
  if (s <= 50)
    a = i || 100;
  else {
    const r = s + 50, n = Math.trunc(r / 100) * 100, d = i >= r % 100;
    a = i + n - (d ? 100 : 0);
  }
  return t ? a : 1 - a;
}
function po(i) {
  return i % 400 === 0 || i % 4 === 0 && i % 100 !== 0;
}
class zh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 130);
    y(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, s, a) {
    const r = (n) => ({
      year: n,
      isTwoDigitYear: s === "yy"
    });
    switch (s) {
      case "y":
        return ie(ee(4, t), r);
      case "yo":
        return ie(
          a.ordinalNumber(t, {
            unit: "year"
          }),
          r
        );
      default:
        return ie(ee(s.length, t), r);
    }
  }
  validate(t, s) {
    return s.isTwoDigitYear || s.year > 0;
  }
  set(t, s, a) {
    const r = t.getFullYear();
    if (a.isTwoDigitYear) {
      const d = uo(
        a.year,
        r
      );
      return t.setFullYear(d, 0, 1), t.setHours(0, 0, 0, 0), t;
    }
    const n = !("era" in s) || s.era === 1 ? a.year : 1 - a.year;
    return t.setFullYear(n, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Hh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 130);
    y(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    const r = (n) => ({
      year: n,
      isTwoDigitYear: s === "YY"
    });
    switch (s) {
      case "Y":
        return ie(ee(4, t), r);
      case "Yo":
        return ie(
          a.ordinalNumber(t, {
            unit: "year"
          }),
          r
        );
      default:
        return ie(ee(s.length, t), r);
    }
  }
  validate(t, s) {
    return s.isTwoDigitYear || s.year > 0;
  }
  set(t, s, a, r) {
    const n = ja(t, r);
    if (a.isTwoDigitYear) {
      const l = uo(
        a.year,
        n
      );
      return t.setFullYear(
        l,
        0,
        r.firstWeekContainsDate
      ), t.setHours(0, 0, 0, 0), wt(t, r);
    }
    const d = !("era" in s) || s.era === 1 ? a.year : 1 - a.year;
    return t.setFullYear(d, 0, r.firstWeekContainsDate), t.setHours(0, 0, 0, 0), wt(t, r);
  }
}
class Yh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 130);
    y(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s) {
    return yi(s === "R" ? 4 : s.length, t);
  }
  set(t, s, a) {
    const r = Q(t, 0);
    return r.setFullYear(a, 0, 4), r.setHours(0, 0, 0, 0), gs(r);
  }
}
class Uh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 130);
    y(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, s) {
    return yi(s === "u" ? 4 : s.length, t);
  }
  set(t, s, a) {
    return t.setFullYear(a, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class qh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 120);
    y(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    switch (s) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ":
        return ee(s.length, t);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return a.ordinalNumber(t, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return a.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return a.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return a.quarter(t, {
          width: "wide",
          context: "formatting"
        }) || a.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 4;
  }
  set(t, s, a) {
    return t.setMonth((a - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class jh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 120);
    y(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    switch (s) {
      // 1, 2, 3, 4
      case "q":
      case "qq":
        return ee(s.length, t);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return a.ordinalNumber(t, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return a.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || a.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return a.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return a.quarter(t, {
          width: "wide",
          context: "standalone"
        }) || a.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || a.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 4;
  }
  set(t, s, a) {
    return t.setMonth((a - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Wh extends V {
  constructor() {
    super(...arguments);
    y(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    y(this, "priority", 110);
  }
  parse(t, s, a) {
    const r = (n) => n - 1;
    switch (s) {
      // 1, 2, ..., 12
      case "M":
        return ie(
          J(se.month, t),
          r
        );
      // 01, 02, ..., 12
      case "MM":
        return ie(ee(2, t), r);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return ie(
          a.ordinalNumber(t, {
            unit: "month"
          }),
          r
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return a.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.month(t, { width: "narrow", context: "formatting" });
      // J, F, ..., D
      case "MMMMM":
        return a.month(t, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return a.month(t, { width: "wide", context: "formatting" }) || a.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.month(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 11;
  }
  set(t, s, a) {
    return t.setMonth(a, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Kh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 110);
    y(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    const r = (n) => n - 1;
    switch (s) {
      // 1, 2, ..., 12
      case "L":
        return ie(
          J(se.month, t),
          r
        );
      // 01, 02, ..., 12
      case "LL":
        return ie(ee(2, t), r);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return ie(
          a.ordinalNumber(t, {
            unit: "month"
          }),
          r
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return a.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || a.month(t, { width: "narrow", context: "standalone" });
      // J, F, ..., D
      case "LLLLL":
        return a.month(t, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return a.month(t, { width: "wide", context: "standalone" }) || a.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || a.month(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 11;
  }
  set(t, s, a) {
    return t.setMonth(a, 1), t.setHours(0, 0, 0, 0), t;
  }
}
function Gh(i, e, t) {
  const s = z(i), a = so(s, t) - e;
  return s.setDate(s.getDate() - a * 7), s;
}
class Zh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 100);
    y(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    switch (s) {
      case "w":
        return J(se.week, t);
      case "wo":
        return a.ordinalNumber(t, { unit: "week" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 53;
  }
  set(t, s, a, r) {
    return wt(Gh(t, a, r), r);
  }
}
function Xh(i, e) {
  const t = z(i), s = to(t) - e;
  return t.setDate(t.getDate() - s * 7), t;
}
class Qh extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 100);
    y(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    switch (s) {
      case "I":
        return J(se.week, t);
      case "Io":
        return a.ordinalNumber(t, { unit: "week" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 53;
  }
  set(t, s, a) {
    return gs(Xh(t, a));
  }
}
const Jh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], eu = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
class tu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 90);
    y(this, "subPriority", 1);
    y(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    switch (s) {
      case "d":
        return J(se.date, t);
      case "do":
        return a.ordinalNumber(t, { unit: "date" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    const a = t.getFullYear(), r = po(a), n = t.getMonth();
    return r ? s >= 1 && s <= eu[n] : s >= 1 && s <= Jh[n];
  }
  set(t, s, a) {
    return t.setDate(a), t.setHours(0, 0, 0, 0), t;
  }
}
class su extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 90);
    y(this, "subpriority", 1);
    y(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    switch (s) {
      case "D":
      case "DD":
        return J(se.dayOfYear, t);
      case "Do":
        return a.ordinalNumber(t, { unit: "date" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    const a = t.getFullYear();
    return po(a) ? s >= 1 && s <= 366 : s >= 1 && s <= 365;
  }
  set(t, s, a) {
    return t.setMonth(0, a), t.setHours(0, 0, 0, 0), t;
  }
}
function Ka(i, e, t) {
  var g, v, m, x;
  const s = bs(), a = (t == null ? void 0 : t.weekStartsOn) ?? ((v = (g = t == null ? void 0 : t.locale) == null ? void 0 : g.options) == null ? void 0 : v.weekStartsOn) ?? s.weekStartsOn ?? ((x = (m = s.locale) == null ? void 0 : m.options) == null ? void 0 : x.weekStartsOn) ?? 0, r = z(i), n = r.getDay(), l = (e % 7 + 7) % 7, h = 7 - a, u = e < 0 || e > 6 ? e - (n + h) % 7 : (l + h) % 7 - (n + h) % 7;
  return Gn(r, u);
}
class iu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 90);
    y(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return a.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.day(t, { width: "short", context: "formatting" }) || a.day(t, { width: "narrow", context: "formatting" });
      // T
      case "EEEEE":
        return a.day(t, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return a.day(t, { width: "short", context: "formatting" }) || a.day(t, { width: "narrow", context: "formatting" });
      // Tuesday
      case "EEEE":
      default:
        return a.day(t, { width: "wide", context: "formatting" }) || a.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.day(t, { width: "short", context: "formatting" }) || a.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 6;
  }
  set(t, s, a, r) {
    return t = Ka(t, a, r), t.setHours(0, 0, 0, 0), t;
  }
}
class au extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 90);
    y(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a, r) {
    const n = (d) => {
      const l = Math.floor((d - 1) / 7) * 7;
      return (d + r.weekStartsOn + 6) % 7 + l;
    };
    switch (s) {
      // 3
      case "e":
      case "ee":
        return ie(ee(s.length, t), n);
      // 3rd
      case "eo":
        return ie(
          a.ordinalNumber(t, {
            unit: "day"
          }),
          n
        );
      // Tue
      case "eee":
        return a.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.day(t, { width: "short", context: "formatting" }) || a.day(t, { width: "narrow", context: "formatting" });
      // T
      case "eeeee":
        return a.day(t, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return a.day(t, { width: "short", context: "formatting" }) || a.day(t, { width: "narrow", context: "formatting" });
      // Tuesday
      case "eeee":
      default:
        return a.day(t, { width: "wide", context: "formatting" }) || a.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.day(t, { width: "short", context: "formatting" }) || a.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 6;
  }
  set(t, s, a, r) {
    return t = Ka(t, a, r), t.setHours(0, 0, 0, 0), t;
  }
}
class ru extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 90);
    y(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(t, s, a, r) {
    const n = (d) => {
      const l = Math.floor((d - 1) / 7) * 7;
      return (d + r.weekStartsOn + 6) % 7 + l;
    };
    switch (s) {
      // 3
      case "c":
      case "cc":
        return ie(ee(s.length, t), n);
      // 3rd
      case "co":
        return ie(
          a.ordinalNumber(t, {
            unit: "day"
          }),
          n
        );
      // Tue
      case "ccc":
        return a.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || a.day(t, { width: "short", context: "standalone" }) || a.day(t, { width: "narrow", context: "standalone" });
      // T
      case "ccccc":
        return a.day(t, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return a.day(t, { width: "short", context: "standalone" }) || a.day(t, { width: "narrow", context: "standalone" });
      // Tuesday
      case "cccc":
      default:
        return a.day(t, { width: "wide", context: "standalone" }) || a.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || a.day(t, { width: "short", context: "standalone" }) || a.day(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 6;
  }
  set(t, s, a, r) {
    return t = Ka(t, a, r), t.setHours(0, 0, 0, 0), t;
  }
}
function nu(i, e) {
  const t = z(i), s = Lh(t), a = e - s;
  return Gn(t, a);
}
class ou extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 90);
    y(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(t, s, a) {
    const r = (n) => n === 0 ? 7 : n;
    switch (s) {
      // 2
      case "i":
      case "ii":
        return ee(s.length, t);
      // 2nd
      case "io":
        return a.ordinalNumber(t, { unit: "day" });
      // Tue
      case "iii":
        return ie(
          a.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(t, {
            width: "short",
            context: "formatting"
          }) || a.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
      // T
      case "iiiii":
        return ie(
          a.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
      // Tu
      case "iiiiii":
        return ie(
          a.day(t, {
            width: "short",
            context: "formatting"
          }) || a.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
      // Tuesday
      case "iiii":
      default:
        return ie(
          a.day(t, {
            width: "wide",
            context: "formatting"
          }) || a.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || a.day(t, {
            width: "short",
            context: "formatting"
          }) || a.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          r
        );
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 7;
  }
  set(t, s, a) {
    return t = nu(t, a), t.setHours(0, 0, 0, 0), t;
  }
}
class du extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 80);
    y(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "a":
      case "aa":
      case "aaa":
        return a.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return a.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, s, a) {
    return t.setHours(Wa(a), 0, 0, 0), t;
  }
}
class lu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 80);
    y(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "b":
      case "bb":
      case "bbb":
        return a.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return a.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, s, a) {
    return t.setHours(Wa(a), 0, 0, 0), t;
  }
}
class cu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 80);
    y(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "B":
      case "BB":
      case "BBB":
        return a.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return a.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || a.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, s, a) {
    return t.setHours(Wa(a), 0, 0, 0), t;
  }
}
class hu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 70);
    y(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "h":
        return J(se.hour12h, t);
      case "ho":
        return a.ordinalNumber(t, { unit: "hour" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 12;
  }
  set(t, s, a) {
    const r = t.getHours() >= 12;
    return r && a < 12 ? t.setHours(a + 12, 0, 0, 0) : !r && a === 12 ? t.setHours(0, 0, 0, 0) : t.setHours(a, 0, 0, 0), t;
  }
}
class uu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 70);
    y(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "H":
        return J(se.hour23h, t);
      case "Ho":
        return a.ordinalNumber(t, { unit: "hour" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 23;
  }
  set(t, s, a) {
    return t.setHours(a, 0, 0, 0), t;
  }
}
class pu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 70);
    y(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "K":
        return J(se.hour11h, t);
      case "Ko":
        return a.ordinalNumber(t, { unit: "hour" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 11;
  }
  set(t, s, a) {
    return t.getHours() >= 12 && a < 12 ? t.setHours(a + 12, 0, 0, 0) : t.setHours(a, 0, 0, 0), t;
  }
}
class gu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 70);
    y(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "k":
        return J(se.hour24h, t);
      case "ko":
        return a.ordinalNumber(t, { unit: "hour" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 1 && s <= 24;
  }
  set(t, s, a) {
    const r = a <= 24 ? a % 24 : a;
    return t.setHours(r, 0, 0, 0), t;
  }
}
class fu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 60);
    y(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "m":
        return J(se.minute, t);
      case "mo":
        return a.ordinalNumber(t, { unit: "minute" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 59;
  }
  set(t, s, a) {
    return t.setMinutes(a, 0, 0), t;
  }
}
class mu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 50);
    y(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, s, a) {
    switch (s) {
      case "s":
        return J(se.second, t);
      case "so":
        return a.ordinalNumber(t, { unit: "second" });
      default:
        return ee(s.length, t);
    }
  }
  validate(t, s) {
    return s >= 0 && s <= 59;
  }
  set(t, s, a) {
    return t.setSeconds(a, 0), t;
  }
}
class vu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 30);
    y(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, s) {
    const a = (r) => Math.trunc(r * Math.pow(10, -s.length + 3));
    return ie(ee(s.length, t), a);
  }
  set(t, s, a) {
    return t.setMilliseconds(a), t;
  }
}
class bu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 10);
    y(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(t, s) {
    switch (s) {
      case "X":
        return je(
          qe.basicOptionalMinutes,
          t
        );
      case "XX":
        return je(qe.basic, t);
      case "XXXX":
        return je(
          qe.basicOptionalSeconds,
          t
        );
      case "XXXXX":
        return je(
          qe.extendedOptionalSeconds,
          t
        );
      case "XXX":
      default:
        return je(qe.extended, t);
    }
  }
  set(t, s, a) {
    return s.timestampIsSet ? t : Q(
      t,
      t.getTime() - bi(t) - a
    );
  }
}
class yu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 10);
    y(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(t, s) {
    switch (s) {
      case "x":
        return je(
          qe.basicOptionalMinutes,
          t
        );
      case "xx":
        return je(qe.basic, t);
      case "xxxx":
        return je(
          qe.basicOptionalSeconds,
          t
        );
      case "xxxxx":
        return je(
          qe.extendedOptionalSeconds,
          t
        );
      case "xxx":
      default:
        return je(qe.extended, t);
    }
  }
  set(t, s, a) {
    return s.timestampIsSet ? t : Q(
      t,
      t.getTime() - bi(t) - a
    );
  }
}
class wu extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 40);
    y(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return ho(t);
  }
  set(t, s, a) {
    return [Q(t, a * 1e3), { timestampIsSet: !0 }];
  }
}
class ku extends V {
  constructor() {
    super(...arguments);
    y(this, "priority", 20);
    y(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return ho(t);
  }
  set(t, s, a) {
    return [Q(t, a), { timestampIsSet: !0 }];
  }
}
const xu = {
  G: new Nh(),
  y: new zh(),
  Y: new Hh(),
  R: new Yh(),
  u: new Uh(),
  Q: new qh(),
  q: new jh(),
  M: new Wh(),
  L: new Kh(),
  w: new Zh(),
  I: new Qh(),
  d: new tu(),
  D: new su(),
  E: new iu(),
  e: new au(),
  c: new ru(),
  i: new ou(),
  a: new du(),
  b: new lu(),
  B: new cu(),
  h: new hu(),
  H: new uu(),
  K: new pu(),
  k: new gu(),
  m: new fu(),
  s: new mu(),
  S: new vu(),
  X: new bu(),
  x: new yu(),
  t: new wu(),
  T: new ku()
}, _u = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Cu = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, $u = /^'([^]*?)'?$/, Eu = /''/g, Au = /\S/, Du = /[a-zA-Z]/;
function va(i, e, t, s) {
  var w, S, L, H;
  const a = Oh(), r = a.locale ?? eo, n = a.firstWeekContainsDate ?? ((S = (w = a.locale) == null ? void 0 : w.options) == null ? void 0 : S.firstWeekContainsDate) ?? 1, d = a.weekStartsOn ?? ((H = (L = a.locale) == null ? void 0 : L.options) == null ? void 0 : H.weekStartsOn) ?? 0;
  if (e === "")
    return i === "" ? z(t) : Q(t, NaN);
  const l = {
    firstWeekContainsDate: n,
    weekStartsOn: d,
    locale: r
  }, h = [new Vh()], u = e.match(Cu).map((_) => {
    const k = _[0];
    if (k in ua) {
      const I = ua[k];
      return I(_, r.formatLong);
    }
    return _;
  }).join("").match(_u), g = [];
  for (let _ of u) {
    ro(_) && pa(_, e, i), ao(_) && pa(_, e, i);
    const k = _[0], I = xu[k];
    if (I) {
      const { incompatibleTokens: P } = I;
      if (Array.isArray(P)) {
        const Z = g.find(
          (X) => P.includes(X.token) || X.token === k
        );
        if (Z)
          throw new RangeError(
            `The format string mustn't contain \`${Z.fullToken}\` and \`${_}\` at the same time`
          );
      } else if (I.incompatibleTokens === "*" && g.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${_}\` and any other token at the same time`
        );
      g.push({ token: k, fullToken: _ });
      const N = I.run(
        i,
        _,
        r.match,
        l
      );
      if (!N)
        return Q(t, NaN);
      h.push(N.setter), i = N.rest;
    } else {
      if (k.match(Du))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + k + "`"
        );
      if (_ === "''" ? _ = "'" : k === "'" && (_ = Su(_)), i.indexOf(_) === 0)
        i = i.slice(_.length);
      else
        return Q(t, NaN);
    }
  }
  if (i.length > 0 && Au.test(i))
    return Q(t, NaN);
  const v = h.map((_) => _.priority).sort((_, k) => k - _).filter((_, k, I) => I.indexOf(_) === k).map(
    (_) => h.filter((k) => k.priority === _).sort((k, I) => I.subPriority - k.subPriority)
  ).map((_) => _[0]);
  let m = z(t);
  if (isNaN(m.getTime()))
    return Q(t, NaN);
  const x = {};
  for (const _ of v) {
    if (!_.validate(m, l))
      return Q(t, NaN);
    const k = _.set(m, x, l);
    Array.isArray(k) ? (m = k[0], Object.assign(x, k[1])) : m = k;
  }
  return Q(t, m);
}
function Su(i) {
  return i.match($u)[1].replace(Eu, "'");
}
const as = {
  "DD/MM/YYYY": {
    imPattern: "`dd{/}`mm{/}`yyyy",
    imRangePattern: "`dd{/}`mm{/}`yyyy - `DD{/}`MM{/}`YYYY",
    fnsPattern: "dd/MM/yyyy"
  },
  "MM/DD/YYYY": {
    imPattern: "`mm{/}`dd{/}`yyyy",
    imRangePattern: "`mm{/}`dd{/}`yyyy - `MM{/}`DD{/}`YYYY",
    fnsPattern: "MM/dd/yyyy"
  },
  "YYYY/MM/DD": {
    imPattern: "`yyyy{/}`mm{/}`dd",
    imRangePattern: "`yyyy{/}`mm{/}`dd - `YYYY{/}`MM{/}`DD",
    fnsPattern: "yyyy/MM/dd"
  }
}, Tu = (i, e) => {
  const t = i.getFullYear(), s = (t - e) % 12, a = s < 0 ? 12 + s : s, r = [], n = t - a, d = t - a + 12 - 1;
  for (let l = n; l < d + 1; l++)
    r.push(l);
  return r;
}, Rr = (i) => {
  const e = i.getMonth(), t = i.getFullYear(), s = i.getDate(), a = new Date(t, e + 1), r = oo(a);
  return Jn(i) && r < s ? lo(a) : new Date(t, e + 1, s);
}, Vr = (i) => {
  const e = i.getMonth(), t = i.getFullYear(), s = i.getDate(), a = new Date(t, e - 1), r = oo(a);
  return Jn(i) && r < s ? lo(a) : new Date(t, e - 1, s);
}, ae = (i) => {
  const e = new Date(i);
  return e.setHours(12), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e;
};
var Iu = b`.datepicker-body{color:var(--sgds-form-color-default);display:flex;justify-content:center}table{border-collapse:collapse;text-align:center}.monthpicker,.yearpicker{display:grid;grid-template-columns:repeat(3,6rem);grid-template-rows:repeat(4,2.5rem)}button.month,button.year{background-color:transparent;border:0;border-radius:var(--sgds-form-border-radius-sm);line-height:var(--sgds-line-height-min);padding:0;position:relative}button.month.active:not(.selected-ends),button.year.active:not(.selected-ends),td[data-day].active:not(.selected-ends){background-color:var(--sgds-primary-surface-translucent);border-radius:0;cursor:pointer}button.month:hover:not(.active),button.year:hover:not(.active),td[data-day]:hover:not(.disabled):not(.selected-ends):not(.active){background-color:var(--sgds-bg-translucent-subtle);cursor:pointer}button.month:focus:not(.active),button.year:focus:not(.active),td[data-day]:focus:not(.disabled):not(.selected-ends):not(.active){background-color:var(--sgds-bg-translucent-subtle)}button.month:focus,button.year:focus,td[data-day]:focus{outline:var(--sgds-form-border-radius-sm) solid var(--sgds-blue-400)}button.month.active:not(.selected-ends):focus,button.year.active:not(.selected-ends):focus,td[data-day].active:not(.selected-ends):focus{border-radius:var(--sgds-form-border-radius-sm)}button.year.active{background-color:var(--sgds-primary-surface-translucent);cursor:pointer}td,th{border-radius:var(--sgds-form-border-radius-sm);height:var(--sgds-form-height-lg);line-height:var(--sgds-line-height-min);padding:0;position:relative;width:var(--sgds-form-width-md)}th{font-weight:var(--sgds-font-weight-semibold)}td[data-day]{cursor:pointer}button.month.active.selected-ends,button.year.active.selected-ends,td[data-day].active.selected-ends{background-color:var(--sgds-form-primary-surface-default);color:var(--sgds-form-color-fixed-light)}button.month.active.selected-ends:focus,button.month.active.selected-ends:hover,button.year.active.selected-ends:focus,button.year.active.selected-ends:hover,td[data-day].active.selected-ends:focus,td[data-day].active.selected-ends:hover{background-color:var(--sgds-form-primary-surface-emphasis)}td[data-day].disabled{cursor:not-allowed;opacity:var(--sgds-opacity-50)}.today{align-items:center;display:flex;flex-direction:column;justify-content:center}.today:after{background-color:var(--sgds-form-primary-surface-default);bottom:6px;content:".";line-height:4px;-webkit-mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' fill='none'%3E%3Ccircle cx='2' cy='2' r='2' fill='%235A42C0'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' fill='none'%3E%3Ccircle cx='2' cy='2' r='2' fill='%235A42C0'/%3E%3C/svg%3E");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;position:absolute;width:4px}.today.active.selected-ends:after{background-color:var(--sgds-form-color-inverse)}`;
const es = /* @__PURE__ */ new Date(), Mu = {
  ArrowUp: {
    days: -7,
    months: -3,
    years: -3
  },
  ArrowDown: {
    days: 7,
    months: 3,
    years: 3
  },
  ArrowRight: {
    days: 1,
    months: 1,
    years: 1
  },
  ArrowLeft: {
    days: -1,
    months: -1,
    years: -1
  }
};
class le extends f {
  constructor() {
    super(...arguments), this.selectedDate = [], this.mode = "single";
  }
  /**Shifts focus from Input to Calendar */
  focusOnCalendar(e) {
    e.blur(), this._focusOnCalendarCell();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this._handleKeyPress), this.addEventListener("blur", (e) => e.stopPropagation());
  }
  updated() {
    this.focusedTabIndex === 3 && this._focusOnCalendarCell();
  }
  _updateFocusedDate() {
    this.focusedDate = ae(this.displayDate), this.focusedDate.getFullYear() < 1900 && this.focusedDate.setFullYear(1900);
  }
  _setFocusedDate(e) {
    const t = this.focusedDate.getDate(), s = this.focusedDate.getMonth(), a = this.focusedDate.getFullYear();
    switch (this.view) {
      case "days": {
        const r = ae(new Date(a, s, t + e));
        (ga(r, new Date(0, 0, 1, 12)) || ma(r, new Date(0, 0, 1, 12))) && (this.focusedDate = r);
        break;
      }
      case "months": {
        const r = ae(new Date(a, s + e, t));
        (ga(r, new Date(0, 0, 1, 12)) || ma(r, new Date(0, 0, 1, 12))) && (this.focusedDate = r);
        break;
      }
      case "years": {
        const r = ae(new Date(a + e, s, t));
        r.getFullYear() >= 1900 && (this.focusedDate = r);
        break;
      }
    }
  }
  _handleEnterDateKeyboard(e) {
    const t = e.composedPath()[0];
    if (!t.classList.contains("disabled"))
      switch (this.view) {
        case "days":
          this._onClickDay(e);
          break;
        case "months": {
          const { month: s } = t.dataset;
          this._onClickMonth(parseInt(s));
          break;
        }
        case "years": {
          const { year: s } = t.dataset;
          this._onClickYear(parseInt(s));
        }
      }
  }
  _handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault(), this._handleEnterDateKeyboard(e);
      return;
    }
    if (e.key === "Tab") {
      const t = this._getFocusedTarget();
      this.focusedTabIndex !== 3 && t.blur();
      return;
    }
    if (e.key.includes("Arrow")) {
      e.preventDefault(), this._blurCalendarCell();
      const s = Mu[e.key][this.view];
      this._setFocusedDate(s), this._focusOnCalendarCell();
    }
  }
  _generateIncrementDates() {
    const e = ae(this.selectedDate[0]);
    if (this.selectedDate.length < 2)
      return [e];
    const t = ae(this.selectedDate[1]), s = [];
    if (e.getTime() < t.getTime())
      for (let a = e; a <= t; a.setDate(a.getDate() + 1))
        s.push(new Date(a));
    else
      for (let a = t; a <= e; a.setDate(a.getDate() + 1))
        s.push(new Date(a));
    return s;
  }
  _onClickDay(e) {
    const { day: t, date: s } = e.composedPath()[0].dataset, a = new Date(this.displayDate);
    if (a.setDate(parseInt(t)), e.type === "click" && (this.focusedDate = ae(new Date(s))), this.mode === "single")
      this.selectedDate = [a], this.emit("sgds-selectdates", { detail: this.selectedDate });
    else if (this.mode === "range") {
      const l = [...this.selectedDate];
      (l.length === 0 || l.length === 2) && (l.length = 0), l.push(a), this.selectedDate = l, this.emit("sgds-selectdates", { detail: this.selectedDate });
    }
    const r = this.minDate ? ae(new Date(this.minDate)) : null, n = this.maxDate ? ae(new Date(this.maxDate)) : null, d = ae(a);
    (r && d < r || n && d > n) && (e.stopPropagation(), e.preventDefault());
  }
  _onClickMonth(e, t = this.focusedDate.getFullYear()) {
    const s = new Date(this.displayDate);
    this.view = "days", s.setMonth(e), s.setFullYear(t), this.displayDate = s, this.emit("sgds-view", { detail: this.view }), this.emit("sgds-selectmonth", { detail: this.displayDate });
  }
  _onClickYear(e) {
    const t = new Date(this.displayDate);
    t.setFullYear(e), this.displayDate = t, this.view = "months", this.emit("sgds-view", { detail: this.view }), this.emit("sgds-selectyear", { detail: this.displayDate });
  }
  _getFocusedTarget() {
    const t = {
      days: `td[data-date="${this.focusedDate.toISOString()}"]`,
      months: `button[data-month="${this.focusedDate.getMonth()}"][data-year="${this.focusedDate.getFullYear()}"]`,
      years: `button[data-year="${this.focusedDate.getFullYear()}"]`
    }[this.view];
    return this.shadowRoot.querySelector(`${t}`);
  }
  _blurCalendarCell() {
    const e = this._getFocusedTarget();
    e.setAttribute("tabindex", "-1"), e.blur();
  }
  _focusOnCalendarCell() {
    const e = this._getFocusedTarget();
    e ? (e.setAttribute("tabindex", "3"), e.focus(), this.emit("sgds-update-focus", { detail: this.focusedDate })) : this.emit("sgds-change-calendar", { detail: this.focusedDate });
  }
  _generateDays() {
    const e = this.selectedDate.map((m) => ae(m)), t = this._generateIncrementDates(), s = this.minDate ? ae(new Date(this.minDate)) : null, a = this.maxDate ? ae(new Date(this.maxDate)) : null, r = this.displayDate.getFullYear(), n = this.displayDate.getMonth(), l = new Date(r, n, 1).getDay();
    let h = le.daysInMonth[n];
    n === 1 && (r % 4 === 0 && r % 100 !== 0 || r % 400 === 0) && (h = 29);
    const u = [];
    let g = 1;
    for (let m = 0; m < 9; m++) {
      const x = [];
      for (let w = 0; w <= 6; w++)
        if (g <= h && (m > 0 || w >= l)) {
          const S = new Date(r, n, g, 12, 0, 0, 0), L = S.toISOString(), H = s && Date.parse(L) < Date.parse(s.toISOString()), _ = a && Date.parse(L) > Date.parse(a.toISOString()), k = H || _ ? void 0 : this._onClickDay, I = es.getMonth() === this.displayDate.getMonth(), P = es.getFullYear() === this.displayDate.getFullYear(), N = es.getDate() === g, Z = e.length > 0 && t.some((xe) => Date.parse(L) === Date.parse(xe.toISOString())), X = e.length > 0 && t[0].toISOString() === L, te = e.length > 1 && t[t.length - 1].toISOString() === L, ne = `${N && I && P ? "Today's date, " : ""}` + no(S, "PPPP");
          x.push(p`<td
              key=${w}
              data-date=${L}
              data-day=${g}
              aria-label=${ne}
              aria-current=${C(N && I && P ? "date" : void 0)}
              class=${T({
            today: N && I && P,
            "selected-ends": X || te,
            active: Z,
            disabled: H || _
          })}
              @click=${k}
              aria-selected=${C(Z ? "true" : void 0)}
              tabindex=${this.focusedDate === new Date(L) ? "3" : "-1"}
              ?disabled=${H || _}
              aria-disabled=${C(H || _ ? "true" : void 0)}
              role="button"
            >
              ${g}
            </td>`), g++;
        } else
          x.push(p`<td key=${w}></td>`);
      if (u.push(p`<tr key=${m}>
          ${x}
        </tr>`), g > h)
        break;
    }
    return p`
      <table role="grid">
        <thead>
          <tr>
            ${le.DAY_LABELS.map((m, x) => p` <th key=${x} abbr=${m} scope="col">${m.slice(0, 3)}</th> `)}
          </tr>
        </thead>
        <tbody>
          ${u}
        </tbody>
      </table>
    `;
  }
  _generateMonths() {
    const e = this._generateIncrementDates(), t = e.map((r) => ae(new Date(r.getFullYear(), r.getMonth())).getTime()), s = this.displayDate.getFullYear();
    return p`
      <div class="monthpicker">
        ${le.MONTHVIEW_LABELS.map((r, n) => {
      const d = n === es.getMonth() && s === es.getFullYear(), l = ae(new Date(s, n)).getTime(), h = e[0].getMonth() === n, u = e[0].getFullYear() === s, g = e[e.length - 1].getMonth() === n, v = e[e.length - 1].getFullYear() === s, m = d ? `Current month ${r} ${s}` : `${r} ${s}`;
      return p` <button
            class=${T({
        active: t.includes(l),
        today: d,
        month: !0,
        "selected-ends": h && u || g && v
      })}
            @click=${() => this._onClickMonth(n)}
            data-month=${n}
            data-year=${s}
            tabindex="3"
            aria-selected=${t.includes(l)}
            aria-label=${m}
          >
            ${r.slice(0, 3)}
          </button>`;
    })}
      </div>
    `;
  }
  _generateYears() {
    const e = this._generateIncrementDates().map((r) => r.getFullYear()), t = es.getFullYear(), s = Tu(this.displayDate, t);
    return p`
      <div class="sgds yearpicker">
        ${s.map((r) => {
      const n = e[0] === r, d = e[e.length - 1] === r;
      return p`
            <button
              class=${T({
        active: e.includes(r),
        year: !0,
        today: t === r,
        "selected-ends": n || d
      })}
              @click=${() => this._onClickYear(r)}
              data-year=${r}
              tabindex="3"
              ?disabled=${r < 1900}
              aria-selected=${e.includes(r)}
              aria-label=${C(t === r ? `Current year, ${r}` : void 0)}
            >
              ${r}
            </button>
          `;
    })}
      </div>
    `;
  }
  render() {
    let e;
    switch (this.view) {
      case "days":
        e = p` ${this._generateDays()} `;
        break;
      case "months":
        e = p` ${this._generateMonths()} `;
        break;
      case "years":
        e = p` ${this._generateYears()} `;
        break;
      default:
        e = p` ${this._generateDays()} `;
        break;
    }
    return p` <div class="datepicker-body">${e}</div> `;
  }
}
le.styles = [Iu];
le.DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
le.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
le.MONTHVIEW_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
o([
  c({ type: Array })
], le.prototype, "selectedDate", void 0);
o([
  c({ attribute: !1 })
], le.prototype, "displayDate", void 0);
o([
  c({ type: String })
], le.prototype, "minDate", void 0);
o([
  c({ type: String })
], le.prototype, "maxDate", void 0);
o([
  c({ type: String, reflect: !0 })
], le.prototype, "mode", void 0);
o([
  c()
], le.prototype, "view", void 0);
o([
  c({ type: Boolean })
], le.prototype, "show", void 0);
o([
  c()
], le.prototype, "focusedTabIndex", void 0);
o([
  O("displayDate")
], le.prototype, "_updateFocusedDate", null);
var Fu = b`:host{display:inline-block}.btn.btn-icon{display:flex;height:var(--sgds-dimension-48,56px);min-width:unset;padding:0;width:var(--sgds-dimension-48,56px)}.btn.btn-icon.btn-lg{font-size:var(--sgds-font-size-3);height:var(--sgds-dimension-56);min-width:unset;padding:0;width:var(--sgds-dimension-56)}.btn.btn-icon.btn-sm{font-size:var(--sgds-font-size-1);height:var(--sgds-dimension-40);min-width:unset;padding:0;width:var(--sgds-dimension-40)}`;
class Et extends we {
  _assignIconSize(e) {
    if (e === "sm")
      return "md";
    if (e === "md")
      return "lg";
    if (e === "lg")
      return "xl";
  }
  render() {
    const e = this.href, t = e ? ds`a` : ds`button`;
    return B`
          <${t}
            class="btn btn-icon${T({
      disabled: this.disabled,
      active: this.active,
      [`btn-${this.variant}`]: this.variant,
      [`btn-${this.size}`]: this.size
    })}"
            ?disabled=${C(e ? void 0 : this.disabled)}
            type=${C(e ? void 0 : "button")}
            href=${C(e ? this.href : void 0)}
            target=${C(e ? this.target : void 0)}
            download=${C(e ? this.download : void 0)}
            rel=${C(e && this.target === "_blank" ? "noreferrer noopener" : void 0)}
            role=${C(e ? "button" : void 0)}
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.disabled ? "-1" : "0"}
            @click=${this._handleClick}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            aria-label=${C(this.ariaLabel)}
          >
            <sgds-icon name=${C(this.name)} size=${C(this._assignIconSize(this.size))}></sgds-icon>
          </${t}>
        `;
  }
}
Et.styles = [...we.styles, Fu];
Et.dependencies = {
  "sgds-icon": re
};
o([
  c({ type: String, reflect: !0 })
], Et.prototype, "name", void 0);
var Ou = b`.datepicker-header{display:flex;gap:var(--sgds-form-gap-md)}sgds-button{--btn-font-weight:var(--sgds-font-weight-semibold)}`;
class ot extends f {
  constructor() {
    super(...arguments), this.selectedDate = [];
  }
  _handleFocusedTabIndexChange() {
    let e;
    switch (this.focusedTabIndex) {
      case 0:
        e = this.shadowRoot.querySelector("sgds-icon-button[name='arrow-left']");
        break;
      case 1:
        e = this.shadowRoot.querySelector("sgds-button");
        break;
      case 2:
        e = this.shadowRoot.querySelector("sgds-icon-button[name='arrow-right']");
        break;
      default:
        return;
    }
    e.focus();
  }
  _changeView() {
    switch (this.view) {
      case "days":
        this.view = "months";
        break;
      case "months":
        this.view = "years";
        break;
    }
    this.emit("sgds-view", { detail: this.view });
  }
  renderHeader(e = this.displayDate, t = this.view) {
    if (t === "months")
      return e.getFullYear();
    if (t === "years") {
      const s = (/* @__PURE__ */ new Date()).getFullYear(), a = e.getFullYear(), r = (a - s) % 12, n = r < 0 ? 12 + r : r, d = a - n, l = a - n + 12 - 1;
      return `${d} - ${l}`;
    }
    return `${Lu[e.getMonth()]} ${e.getFullYear()}`;
  }
  _renderHeaderTemplate() {
    return p`${this.renderHeader()}`;
  }
  /** @internal */
  handleClickPrevious() {
    const { view: e, displayDate: t, focusedDate: s } = this;
    let a = new Date(t);
    e === "months" ? a.setFullYear(a.getFullYear() - 1) : this.view === "years" ? a.setFullYear(a.getFullYear() - 12) : s.getDate() !== t.getDate() ? a = Vr(s) : a = Vr(a), this.displayDate = a, this.emit("sgds-change-calendar", { detail: this.displayDate });
  }
  /** @internal */
  _handleClickNext() {
    const { view: e, displayDate: t, focusedDate: s } = this;
    let a = new Date(t);
    e === "months" ? a.setFullYear(a.getFullYear() + 1) : this.view === "years" ? a.setFullYear(a.getFullYear() + 12) : s.getDate() !== t.getDate() ? a = Rr(s) : a = Rr(a), this.displayDate = a, this.emit("sgds-change-calendar", { detail: this.displayDate });
  }
  _removeCaret() {
    const e = this.displayDate.getFullYear(), t = this.displayDate.getMonth(), s = new Date(e, t);
    return this.view === "months" ? e <= 1900 : this.view === "years" ? e < 1904 : ma(s, new Date(0, 0, 1)) || fa(s, new Date(0, 0, 1));
  }
  _ariaLabelForNextBtn() {
    return {
      days: "Show next month",
      months: "Show next year",
      years: "Show next 12 years"
    }[this.view];
  }
  _ariaLabelForPrevBtn() {
    return {
      days: "Show previous month",
      months: "Show previous year",
      years: "Show previous 12 years"
    }[this.view];
  }
  _ariaLabelForHeaderBtn() {
    const e = {
      days: `Current view is days, click to show months in ${this.displayDate.getFullYear()}`,
      months: `Current view is months, click to show years between ${this.renderHeader(this.displayDate, "years")}`,
      years: "Current view is years"
    };
    return `${this.renderHeader()}. ${e[this.view]}`;
  }
  render() {
    return p`
      <div class="datepicker-header dropdown-header" role="heading">
        <sgds-icon-button
          name="arrow-left"
          size="sm"
          variant="ghost"
          @click="${this.handleClickPrevious}"
          class=${T({ invisible: this._removeCaret() })}
          aria-label=${this._ariaLabelForPrevBtn()}
        >
        </sgds-icon-button>
        <sgds-button
          fullWidth
          variant="ghost"
          size="sm"
          @click=${this._changeView}
          class=${T({ disabled: this.view === "years" })}
          aria-disabled=${this.view === "years" ? "true" : "false"}
          aria-live="polite"
        >
          ${this._renderHeaderTemplate()}
        </sgds-button>
        <sgds-icon-button
          name="arrow-right"
          size="sm"
          variant="ghost"
          @click="${this._handleClickNext}"
          aria-label=${this._ariaLabelForNextBtn()}
        >
        </sgds-icon-button>
      </div>
    `;
  }
}
ot.styles = [Ou];
ot.dependencies = {
  "sgds-icon": re,
  "sgds-icon-button": Et,
  "sgds-button": be
};
o([
  c({ attribute: !1 })
], ot.prototype, "displayDate", void 0);
o([
  c({ attribute: !1 })
], ot.prototype, "focusedDate", void 0);
o([
  c({ attribute: !1 })
], ot.prototype, "selectedDate", void 0);
o([
  c()
], ot.prototype, "view", void 0);
o([
  c()
], ot.prototype, "focusedTabIndex", void 0);
o([
  O("focusedTabIndex", { waitUntilFirstUpdate: !0 })
], ot.prototype, "_handleFocusedTabIndexChange", null);
const Lu = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function vt(i) {
  return typeof i == "string" || i instanceof String;
}
function Nr(i) {
  var e;
  return typeof i == "object" && i != null && (i == null || (e = i.constructor) == null ? void 0 : e.name) === "Object";
}
function go(i, e) {
  return Array.isArray(e) ? go(i, (t, s) => e.includes(s)) : Object.entries(i).reduce((t, s) => {
    let [a, r] = s;
    return e(r, a) && (t[a] = r), t;
  }, {});
}
const $ = {
  NONE: "NONE",
  LEFT: "LEFT",
  FORCE_LEFT: "FORCE_LEFT",
  RIGHT: "RIGHT",
  FORCE_RIGHT: "FORCE_RIGHT"
};
function Pu(i) {
  switch (i) {
    case $.LEFT:
      return $.FORCE_LEFT;
    case $.RIGHT:
      return $.FORCE_RIGHT;
    default:
      return i;
  }
}
function ea(i) {
  return i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}
function wi(i, e) {
  if (e === i) return !0;
  const t = Array.isArray(e), s = Array.isArray(i);
  let a;
  if (t && s) {
    if (e.length != i.length) return !1;
    for (a = 0; a < e.length; a++) if (!wi(e[a], i[a])) return !1;
    return !0;
  }
  if (t != s) return !1;
  if (e && i && typeof e == "object" && typeof i == "object") {
    const r = e instanceof Date, n = i instanceof Date;
    if (r && n) return e.getTime() == i.getTime();
    if (r != n) return !1;
    const d = e instanceof RegExp, l = i instanceof RegExp;
    if (d && l) return e.toString() == i.toString();
    if (d != l) return !1;
    const h = Object.keys(e);
    for (a = 0; a < h.length; a++) if (!Object.prototype.hasOwnProperty.call(i, h[a])) return !1;
    for (a = 0; a < h.length; a++) if (!wi(i[h[a]], e[h[a]])) return !1;
    return !0;
  } else if (e && i && typeof e == "function" && typeof i == "function")
    return e.toString() === i.toString();
  return !1;
}
class Bu {
  /** Current input value */
  /** Current cursor position */
  /** Old input value */
  /** Old selection */
  constructor(e) {
    for (Object.assign(this, e); this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos); )
      --this.oldSelection.start;
    if (this.insertedCount)
      for (; this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end); )
        this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end ? ++this.oldSelection.end : ++this.cursorPos;
  }
  /** Start changing position */
  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }
  /** Inserted symbols count */
  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }
  /** Inserted symbols */
  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }
  /** Removed symbols count */
  get removedCount() {
    return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
    this.oldValue.length - this.value.length, 0);
  }
  /** Removed symbols */
  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }
  /** Unchanged head symbols */
  get head() {
    return this.value.substring(0, this.startChangePos);
  }
  /** Unchanged tail symbols */
  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }
  /** Remove direction */
  get removeDirection() {
    return !this.removedCount || this.insertedCount ? $.NONE : (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) && // if not range removed (event with backspace)
    this.oldSelection.end === this.oldSelection.start ? $.RIGHT : $.LEFT;
  }
}
function D(i, e) {
  return new D.InputMask(i, e);
}
function fo(i) {
  if (i == null) throw new Error("mask property should be defined");
  return i instanceof RegExp ? D.MaskedRegExp : vt(i) ? D.MaskedPattern : i === Date ? D.MaskedDate : i === Number ? D.MaskedNumber : Array.isArray(i) || i === Array ? D.MaskedDynamic : D.Masked && i.prototype instanceof D.Masked ? i : D.Masked && i instanceof D.Masked ? i.constructor : i instanceof Function ? D.MaskedFunction : (console.warn("Mask not found for mask", i), D.Masked);
}
function Hs(i) {
  if (!i) throw new Error("Options in not defined");
  if (D.Masked) {
    if (i.prototype instanceof D.Masked) return {
      mask: i
    };
    const {
      mask: e = void 0,
      ...t
    } = i instanceof D.Masked ? {
      mask: i
    } : Nr(i) && i.mask instanceof D.Masked ? i : {};
    if (e) {
      const s = e.mask;
      return {
        ...go(e, (a, r) => !r.startsWith("_")),
        mask: e.constructor,
        _mask: s,
        ...t
      };
    }
  }
  return Nr(i) ? {
    ...i
  } : {
    mask: i
  };
}
function st(i) {
  if (D.Masked && i instanceof D.Masked) return i;
  const e = Hs(i), t = fo(e.mask);
  if (!t) throw new Error("Masked class is not found for provided mask " + e.mask + ", appropriate module needs to be imported manually before creating mask.");
  return e.mask === t && delete e.mask, e._mask && (e.mask = e._mask, delete e._mask), new t(e);
}
D.createMask = st;
class Ga {
  /** */
  /** */
  /** */
  /** Safely returns selection start */
  get selectionStart() {
    let e;
    try {
      e = this._unsafeSelectionStart;
    } catch {
    }
    return e ?? this.value.length;
  }
  /** Safely returns selection end */
  get selectionEnd() {
    let e;
    try {
      e = this._unsafeSelectionEnd;
    } catch {
    }
    return e ?? this.value.length;
  }
  /** Safely sets element selection */
  select(e, t) {
    if (!(e == null || t == null || e === this.selectionStart && t === this.selectionEnd))
      try {
        this._unsafeSelect(e, t);
      } catch {
      }
  }
  /** */
  get isActive() {
    return !1;
  }
  /** */
  /** */
  /** */
}
D.MaskElement = Ga;
const zr = 90, Ru = 89;
class Ti extends Ga {
  /** HTMLElement to use mask on */
  constructor(e) {
    super(), this.input = e, this._onKeydown = this._onKeydown.bind(this), this._onInput = this._onInput.bind(this), this._onBeforeinput = this._onBeforeinput.bind(this), this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }
  get rootElement() {
    var e, t, s;
    return (e = (t = (s = this.input).getRootNode) == null ? void 0 : t.call(s)) != null ? e : document;
  }
  /** Is element in focus */
  get isActive() {
    return this.input === this.rootElement.activeElement;
  }
  /** Binds HTMLElement events to mask internal events */
  bindEvents(e) {
    this.input.addEventListener("keydown", this._onKeydown), this.input.addEventListener("input", this._onInput), this.input.addEventListener("beforeinput", this._onBeforeinput), this.input.addEventListener("compositionend", this._onCompositionEnd), this.input.addEventListener("drop", e.drop), this.input.addEventListener("click", e.click), this.input.addEventListener("focus", e.focus), this.input.addEventListener("blur", e.commit), this._handlers = e;
  }
  _onKeydown(e) {
    if (this._handlers.redo && (e.keyCode === zr && e.shiftKey && (e.metaKey || e.ctrlKey) || e.keyCode === Ru && e.ctrlKey))
      return e.preventDefault(), this._handlers.redo(e);
    if (this._handlers.undo && e.keyCode === zr && (e.metaKey || e.ctrlKey))
      return e.preventDefault(), this._handlers.undo(e);
    e.isComposing || this._handlers.selectionChange(e);
  }
  _onBeforeinput(e) {
    if (e.inputType === "historyUndo" && this._handlers.undo)
      return e.preventDefault(), this._handlers.undo(e);
    if (e.inputType === "historyRedo" && this._handlers.redo)
      return e.preventDefault(), this._handlers.redo(e);
  }
  _onCompositionEnd(e) {
    this._handlers.input(e);
  }
  _onInput(e) {
    e.isComposing || this._handlers.input(e);
  }
  /** Unbinds HTMLElement events to mask internal events */
  unbindEvents() {
    this.input.removeEventListener("keydown", this._onKeydown), this.input.removeEventListener("input", this._onInput), this.input.removeEventListener("beforeinput", this._onBeforeinput), this.input.removeEventListener("compositionend", this._onCompositionEnd), this.input.removeEventListener("drop", this._handlers.drop), this.input.removeEventListener("click", this._handlers.click), this.input.removeEventListener("focus", this._handlers.focus), this.input.removeEventListener("blur", this._handlers.commit), this._handlers = {};
  }
}
D.HTMLMaskElement = Ti;
class Vu extends Ti {
  /** InputElement to use mask on */
  constructor(e) {
    super(e), this.input = e;
  }
  /** Returns InputElement selection start */
  get _unsafeSelectionStart() {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }
  /** Returns InputElement selection end */
  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }
  /** Sets InputElement selection */
  _unsafeSelect(e, t) {
    this.input.setSelectionRange(e, t);
  }
  get value() {
    return this.input.value;
  }
  set value(e) {
    this.input.value = e;
  }
}
D.HTMLMaskElement = Ti;
class mo extends Ti {
  /** Returns HTMLElement selection start */
  get _unsafeSelectionStart() {
    const e = this.rootElement, t = e.getSelection && e.getSelection(), s = t && t.anchorOffset, a = t && t.focusOffset;
    return a == null || s == null || s < a ? s : a;
  }
  /** Returns HTMLElement selection end */
  get _unsafeSelectionEnd() {
    const e = this.rootElement, t = e.getSelection && e.getSelection(), s = t && t.anchorOffset, a = t && t.focusOffset;
    return a == null || s == null || s > a ? s : a;
  }
  /** Sets HTMLElement selection */
  _unsafeSelect(e, t) {
    if (!this.rootElement.createRange) return;
    const s = this.rootElement.createRange();
    s.setStart(this.input.firstChild || this.input, e), s.setEnd(this.input.lastChild || this.input, t);
    const a = this.rootElement, r = a.getSelection && a.getSelection();
    r && (r.removeAllRanges(), r.addRange(s));
  }
  /** HTMLElement value */
  get value() {
    return this.input.textContent || "";
  }
  set value(e) {
    this.input.textContent = e;
  }
}
D.HTMLContenteditableMaskElement = mo;
class Ii {
  constructor() {
    this.states = [], this.currentIndex = 0;
  }
  get currentState() {
    return this.states[this.currentIndex];
  }
  get isEmpty() {
    return this.states.length === 0;
  }
  push(e) {
    this.currentIndex < this.states.length - 1 && (this.states.length = this.currentIndex + 1), this.states.push(e), this.states.length > Ii.MAX_LENGTH && this.states.shift(), this.currentIndex = this.states.length - 1;
  }
  go(e) {
    return this.currentIndex = Math.min(Math.max(this.currentIndex + e, 0), this.states.length - 1), this.currentState;
  }
  undo() {
    return this.go(-1);
  }
  redo() {
    return this.go(1);
  }
  clear() {
    this.states.length = 0, this.currentIndex = 0;
  }
}
Ii.MAX_LENGTH = 100;
class Nu {
  /**
    View element
  */
  /** Internal {@link Masked} model */
  constructor(e, t) {
    this.el = e instanceof Ga ? e : e.isContentEditable && e.tagName !== "INPUT" && e.tagName !== "TEXTAREA" ? new mo(e) : new Vu(e), this.masked = st(t), this._listeners = {}, this._value = "", this._unmaskedValue = "", this._rawInputValue = "", this.history = new Ii(), this._saveSelection = this._saveSelection.bind(this), this._onInput = this._onInput.bind(this), this._onChange = this._onChange.bind(this), this._onDrop = this._onDrop.bind(this), this._onFocus = this._onFocus.bind(this), this._onClick = this._onClick.bind(this), this._onUndo = this._onUndo.bind(this), this._onRedo = this._onRedo.bind(this), this.alignCursor = this.alignCursor.bind(this), this.alignCursorFriendly = this.alignCursorFriendly.bind(this), this._bindEvents(), this.updateValue(), this._onChange();
  }
  maskEquals(e) {
    var t;
    return e == null || ((t = this.masked) == null ? void 0 : t.maskEquals(e));
  }
  /** Masked */
  get mask() {
    return this.masked.mask;
  }
  set mask(e) {
    if (this.maskEquals(e)) return;
    if (!(e instanceof D.Masked) && this.masked.constructor === fo(e)) {
      this.masked.updateOptions({
        mask: e
      });
      return;
    }
    const t = e instanceof D.Masked ? e : st({
      mask: e
    });
    t.unmaskedValue = this.masked.unmaskedValue, this.masked = t;
  }
  /** Raw value */
  get value() {
    return this._value;
  }
  set value(e) {
    this.value !== e && (this.masked.value = e, this.updateControl("auto"));
  }
  /** Unmasked value */
  get unmaskedValue() {
    return this._unmaskedValue;
  }
  set unmaskedValue(e) {
    this.unmaskedValue !== e && (this.masked.unmaskedValue = e, this.updateControl("auto"));
  }
  /** Raw input value */
  get rawInputValue() {
    return this._rawInputValue;
  }
  set rawInputValue(e) {
    this.rawInputValue !== e && (this.masked.rawInputValue = e, this.updateControl(), this.alignCursor());
  }
  /** Typed unmasked value */
  get typedValue() {
    return this.masked.typedValue;
  }
  set typedValue(e) {
    this.masked.typedValueEquals(e) || (this.masked.typedValue = e, this.updateControl("auto"));
  }
  /** Display value */
  get displayValue() {
    return this.masked.displayValue;
  }
  /** Starts listening to element events */
  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this._onClick,
      focus: this._onFocus,
      commit: this._onChange,
      undo: this._onUndo,
      redo: this._onRedo
    });
  }
  /** Stops listening to element events */
  _unbindEvents() {
    this.el && this.el.unbindEvents();
  }
  /** Fires custom event */
  _fireEvent(e, t) {
    const s = this._listeners[e];
    s && s.forEach((a) => a(t));
  }
  /** Current selection start */
  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }
  /** Current cursor position */
  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }
  set cursorPos(e) {
    !this.el || !this.el.isActive || (this.el.select(e, e), this._saveSelection());
  }
  /** Stores current selection */
  _saveSelection() {
    this.displayValue !== this.el.value && console.warn("Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."), this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }
  /** Syncronizes model value from view */
  updateValue() {
    this.masked.value = this.el.value, this._value = this.masked.value, this._unmaskedValue = this.masked.unmaskedValue, this._rawInputValue = this.masked.rawInputValue;
  }
  /** Syncronizes view from model value, fires change events */
  updateControl(e) {
    const t = this.masked.unmaskedValue, s = this.masked.value, a = this.masked.rawInputValue, r = this.displayValue, n = this.unmaskedValue !== t || this.value !== s || this._rawInputValue !== a;
    this._unmaskedValue = t, this._value = s, this._rawInputValue = a, this.el.value !== r && (this.el.value = r), e === "auto" ? this.alignCursor() : e != null && (this.cursorPos = e), n && this._fireChangeEvents(), !this._historyChanging && (n || this.history.isEmpty) && this.history.push({
      unmaskedValue: t,
      selection: {
        start: this.selectionStart,
        end: this.cursorPos
      }
    });
  }
  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */
  updateOptions(e) {
    const {
      mask: t,
      ...s
    } = e, a = !this.maskEquals(t), r = this.masked.optionsIsChanged(s);
    a && (this.mask = t), r && this.masked.updateOptions(s), (a || r) && this.updateControl();
  }
  /** Updates cursor */
  updateCursor(e) {
    e != null && (this.cursorPos = e, this._delayUpdateCursor(e));
  }
  /** Delays cursor update to support mobile browsers */
  _delayUpdateCursor(e) {
    this._abortUpdateCursor(), this._changingCursorPos = e, this._cursorChanging = setTimeout(() => {
      this.el && (this.cursorPos = this._changingCursorPos, this._abortUpdateCursor());
    }, 10);
  }
  /** Fires custom events */
  _fireChangeEvents() {
    this._fireEvent("accept", this._inputEvent), this.masked.isComplete && this._fireEvent("complete", this._inputEvent);
  }
  /** Aborts delayed cursor update */
  _abortUpdateCursor() {
    this._cursorChanging && (clearTimeout(this._cursorChanging), delete this._cursorChanging);
  }
  /** Aligns cursor to nearest available position */
  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, $.LEFT));
  }
  /** Aligns cursor only if selection is empty */
  alignCursorFriendly() {
    this.selectionStart === this.cursorPos && this.alignCursor();
  }
  /** Adds listener on custom event */
  on(e, t) {
    return this._listeners[e] || (this._listeners[e] = []), this._listeners[e].push(t), this;
  }
  /** Removes custom event listener */
  off(e, t) {
    if (!this._listeners[e]) return this;
    if (!t)
      return delete this._listeners[e], this;
    const s = this._listeners[e].indexOf(t);
    return s >= 0 && this._listeners[e].splice(s, 1), this;
  }
  /** Handles view input event */
  _onInput(e) {
    this._inputEvent = e, this._abortUpdateCursor();
    const t = new Bu({
      // new state
      value: this.el.value,
      cursorPos: this.cursorPos,
      // old state
      oldValue: this.displayValue,
      oldSelection: this._selection
    }), s = this.masked.rawInputValue, a = this.masked.splice(t.startChangePos, t.removed.length, t.inserted, t.removeDirection, {
      input: !0,
      raw: !0
    }).offset, r = s === this.masked.rawInputValue ? t.removeDirection : $.NONE;
    let n = this.masked.nearestInputPos(t.startChangePos + a, r);
    r !== $.NONE && (n = this.masked.nearestInputPos(n, $.NONE)), this.updateControl(n), delete this._inputEvent;
  }
  /** Handles view change event and commits model value */
  _onChange() {
    this.displayValue !== this.el.value && this.updateValue(), this.masked.doCommit(), this.updateControl(), this._saveSelection();
  }
  /** Handles view drop event, prevents by default */
  _onDrop(e) {
    e.preventDefault(), e.stopPropagation();
  }
  /** Restore last selection on focus */
  _onFocus(e) {
    this.alignCursorFriendly();
  }
  /** Restore last selection on focus */
  _onClick(e) {
    this.alignCursorFriendly();
  }
  _onUndo() {
    this._applyHistoryState(this.history.undo());
  }
  _onRedo() {
    this._applyHistoryState(this.history.redo());
  }
  _applyHistoryState(e) {
    e && (this._historyChanging = !0, this.unmaskedValue = e.unmaskedValue, this.el.select(e.selection.start, e.selection.end), this._saveSelection(), this._historyChanging = !1);
  }
  /** Unbind view events and removes element reference */
  destroy() {
    this._unbindEvents(), this._listeners.length = 0, delete this.el;
  }
}
D.InputMask = Nu;
class M {
  /** Inserted symbols */
  /** Additional offset if any changes occurred before tail */
  /** Raw inserted is used by dynamic mask */
  /** Can skip chars */
  static normalize(e) {
    return Array.isArray(e) ? e : [e, new M()];
  }
  constructor(e) {
    Object.assign(this, {
      inserted: "",
      rawInserted: "",
      tailShift: 0,
      skip: !1
    }, e);
  }
  /** Aggregate changes */
  aggregate(e) {
    return this.inserted += e.inserted, this.rawInserted += e.rawInserted, this.tailShift += e.tailShift, this.skip = this.skip || e.skip, this;
  }
  /** Total offset considering all changes */
  get offset() {
    return this.tailShift + this.inserted.length;
  }
  get consumed() {
    return !!this.rawInserted || this.skip;
  }
  equals(e) {
    return this.inserted === e.inserted && this.tailShift === e.tailShift && this.rawInserted === e.rawInserted && this.skip === e.skip;
  }
}
D.ChangeDetails = M;
class We {
  /** Tail value as string */
  /** Tail start position */
  /** Start position */
  constructor(e, t, s) {
    e === void 0 && (e = ""), t === void 0 && (t = 0), this.value = e, this.from = t, this.stop = s;
  }
  toString() {
    return this.value;
  }
  extend(e) {
    this.value += String(e);
  }
  appendTo(e) {
    return e.append(this.toString(), {
      tail: !0
    }).aggregate(e._appendPlaceholder());
  }
  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }
  set state(e) {
    Object.assign(this, e);
  }
  unshift(e) {
    if (!this.value.length || e != null && this.from >= e) return "";
    const t = this.value[0];
    return this.value = this.value.slice(1), t;
  }
  shift() {
    if (!this.value.length) return "";
    const e = this.value[this.value.length - 1];
    return this.value = this.value.slice(0, -1), e;
  }
}
class ue {
  /** */
  /** */
  /** Transforms value before mask processing */
  /** Transforms each char before mask processing */
  /** Validates if value is acceptable */
  /** Does additional processing at the end of editing */
  /** Format typed value to string */
  /** Parse string to get typed value */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  /** */
  constructor(e) {
    this._value = "", this._update({
      ...ue.DEFAULTS,
      ...e
    }), this._initialized = !0;
  }
  /** Sets and applies new options */
  updateOptions(e) {
    this.optionsIsChanged(e) && this.withValueRefresh(this._update.bind(this, e));
  }
  /** Sets new options */
  _update(e) {
    Object.assign(this, e);
  }
  /** Mask state */
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(e) {
    this._value = e._value;
  }
  /** Resets value */
  reset() {
    this._value = "";
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this.resolve(e, {
      input: !0
    });
  }
  /** Resolve new value */
  resolve(e, t) {
    t === void 0 && (t = {
      input: !0
    }), this.reset(), this.append(e, t, ""), this.doCommit();
  }
  get unmaskedValue() {
    return this.value;
  }
  set unmaskedValue(e) {
    this.resolve(e, {});
  }
  get typedValue() {
    return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
  }
  set typedValue(e) {
    this.format ? this.value = this.format(e, this) : this.unmaskedValue = String(e);
  }
  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.displayValue.length, {
      raw: !0
    });
  }
  set rawInputValue(e) {
    this.resolve(e, {
      raw: !0
    });
  }
  get displayValue() {
    return this.value;
  }
  get isComplete() {
    return !0;
  }
  get isFilled() {
    return this.isComplete;
  }
  /** Finds nearest input position in direction */
  nearestInputPos(e, t) {
    return e;
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), Math.min(this.displayValue.length, t - e);
  }
  /** Extracts value in range considering flags */
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), this.displayValue.slice(e, t);
  }
  /** Extracts tail in range */
  extractTail(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), new We(this.extractInput(e, t), e);
  }
  /** Appends tail */
  appendTail(e) {
    return vt(e) && (e = new We(String(e))), e.appendTo(this);
  }
  /** Appends char */
  _appendCharRaw(e, t) {
    return e ? (this._value += e, new M({
      inserted: e,
      rawInserted: e
    })) : new M();
  }
  /** Appends char */
  _appendChar(e, t, s) {
    t === void 0 && (t = {});
    const a = this.state;
    let r;
    if ([e, r] = this.doPrepareChar(e, t), e && (r = r.aggregate(this._appendCharRaw(e, t)), !r.rawInserted && this.autofix === "pad")) {
      const n = this.state;
      this.state = a;
      let d = this.pad(t);
      const l = this._appendCharRaw(e, t);
      d = d.aggregate(l), l.rawInserted || d.equals(r) ? r = d : this.state = n;
    }
    if (r.inserted) {
      let n, d = this.doValidate(t) !== !1;
      if (d && s != null) {
        const l = this.state;
        if (this.overwrite === !0) {
          n = s.state;
          for (let u = 0; u < r.rawInserted.length; ++u)
            s.unshift(this.displayValue.length - r.tailShift);
        }
        let h = this.appendTail(s);
        if (d = h.rawInserted.length === s.toString().length, !(d && h.inserted) && this.overwrite === "shift") {
          this.state = l, n = s.state;
          for (let u = 0; u < r.rawInserted.length; ++u)
            s.shift();
          h = this.appendTail(s), d = h.rawInserted.length === s.toString().length;
        }
        d && h.inserted && (this.state = l);
      }
      d || (r = new M(), this.state = a, s && n && (s.state = n));
    }
    return r;
  }
  /** Appends optional placeholder at the end */
  _appendPlaceholder() {
    return new M();
  }
  /** Appends optional eager placeholder at the end */
  _appendEager() {
    return new M();
  }
  /** Appends symbols considering flags */
  append(e, t, s) {
    if (!vt(e)) throw new Error("value should be string");
    const a = vt(s) ? new We(String(s)) : s;
    t != null && t.tail && (t._beforeTailState = this.state);
    let r;
    [e, r] = this.doPrepare(e, t);
    for (let n = 0; n < e.length; ++n) {
      const d = this._appendChar(e[n], t, a);
      if (!d.rawInserted && !this.doSkipInvalid(e[n], t, a)) break;
      r.aggregate(d);
    }
    return (this.eager === !0 || this.eager === "append") && t != null && t.input && e && r.aggregate(this._appendEager()), a != null && (r.tailShift += this.appendTail(a).tailShift), r;
  }
  remove(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), this._value = this.displayValue.slice(0, e) + this.displayValue.slice(t), new M();
  }
  /** Calls function and reapplies current value */
  withValueRefresh(e) {
    if (this._refreshing || !this._initialized) return e();
    this._refreshing = !0;
    const t = this.rawInputValue, s = this.value, a = e();
    return this.rawInputValue = t, this.value && this.value !== s && s.indexOf(this.value) === 0 && (this.append(s.slice(this.displayValue.length), {}, ""), this.doCommit()), delete this._refreshing, a;
  }
  runIsolated(e) {
    if (this._isolated || !this._initialized) return e(this);
    this._isolated = !0;
    const t = this.state, s = e(this);
    return this.state = t, delete this._isolated, s;
  }
  doSkipInvalid(e, t, s) {
    return !!this.skipInvalid;
  }
  /** Prepares string before mask processing */
  doPrepare(e, t) {
    return t === void 0 && (t = {}), M.normalize(this.prepare ? this.prepare(e, this, t) : e);
  }
  /** Prepares each char before mask processing */
  doPrepareChar(e, t) {
    return t === void 0 && (t = {}), M.normalize(this.prepareChar ? this.prepareChar(e, this, t) : e);
  }
  /** Validates if value is acceptable */
  doValidate(e) {
    return (!this.validate || this.validate(this.value, this, e)) && (!this.parent || this.parent.doValidate(e));
  }
  /** Does additional processing at the end of editing */
  doCommit() {
    this.commit && this.commit(this.value, this);
  }
  splice(e, t, s, a, r) {
    s === void 0 && (s = ""), a === void 0 && (a = $.NONE), r === void 0 && (r = {
      input: !0
    });
    const n = e + t, d = this.extractTail(n), l = this.eager === !0 || this.eager === "remove";
    let h;
    l && (a = Pu(a), h = this.extractInput(0, n, {
      raw: !0
    }));
    let u = e;
    const g = new M();
    if (a !== $.NONE && (u = this.nearestInputPos(e, t > 1 && e !== 0 && !l ? $.NONE : a), g.tailShift = u - e), g.aggregate(this.remove(u)), l && a !== $.NONE && h === this.rawInputValue)
      if (a === $.FORCE_LEFT) {
        let v;
        for (; h === this.rawInputValue && (v = this.displayValue.length); )
          g.aggregate(new M({
            tailShift: -1
          })).aggregate(this.remove(v - 1));
      } else a === $.FORCE_RIGHT && d.unshift();
    return g.aggregate(this.append(s, r, d));
  }
  maskEquals(e) {
    return this.mask === e;
  }
  optionsIsChanged(e) {
    return !wi(this, e);
  }
  typedValueEquals(e) {
    const t = this.typedValue;
    return e === t || ue.EMPTY_VALUES.includes(e) && ue.EMPTY_VALUES.includes(t) || (this.format ? this.format(e, this) === this.format(this.typedValue, this) : !1);
  }
  pad(e) {
    return new M();
  }
}
ue.DEFAULTS = {
  skipInvalid: !0
};
ue.EMPTY_VALUES = [void 0, null, ""];
D.Masked = ue;
class zt {
  /** */
  constructor(e, t) {
    e === void 0 && (e = []), t === void 0 && (t = 0), this.chunks = e, this.from = t;
  }
  toString() {
    return this.chunks.map(String).join("");
  }
  extend(e) {
    if (!String(e)) return;
    e = vt(e) ? new We(String(e)) : e;
    const t = this.chunks[this.chunks.length - 1], s = t && // if stops are same or tail has no stop
    (t.stop === e.stop || e.stop == null) && // if tail chunk goes just after last chunk
    e.from === t.from + t.toString().length;
    if (e instanceof We)
      s ? t.extend(e.toString()) : this.chunks.push(e);
    else if (e instanceof zt) {
      if (e.stop == null) {
        let a;
        for (; e.chunks.length && e.chunks[0].stop == null; )
          a = e.chunks.shift(), a.from += e.from, this.extend(a);
      }
      e.toString() && (e.stop = e.blockIndex, this.chunks.push(e));
    }
  }
  appendTo(e) {
    if (!(e instanceof D.MaskedPattern))
      return new We(this.toString()).appendTo(e);
    const t = new M();
    for (let s = 0; s < this.chunks.length; ++s) {
      const a = this.chunks[s], r = e._mapPosToBlock(e.displayValue.length), n = a.stop;
      let d;
      if (n != null && // if block not found or stop is behind lastBlock
      (!r || r.index <= n) && ((a instanceof zt || // for continuous block also check if stop is exist
      e._stops.indexOf(n) >= 0) && t.aggregate(e._appendPlaceholder(n)), d = a instanceof zt && e._blocks[n]), d) {
        const l = d.appendTail(a);
        t.aggregate(l);
        const h = a.toString().slice(l.rawInserted.length);
        h && t.aggregate(e.append(h, {
          tail: !0
        }));
      } else
        t.aggregate(e.append(a.toString(), {
          tail: !0
        }));
    }
    return t;
  }
  get state() {
    return {
      chunks: this.chunks.map((e) => e.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }
  set state(e) {
    const {
      chunks: t,
      ...s
    } = e;
    Object.assign(this, s), this.chunks = t.map((a) => {
      const r = "chunks" in a ? new zt() : new We();
      return r.state = a, r;
    });
  }
  unshift(e) {
    if (!this.chunks.length || e != null && this.from >= e) return "";
    const t = e != null ? e - this.from : e;
    let s = 0;
    for (; s < this.chunks.length; ) {
      const a = this.chunks[s], r = a.unshift(t);
      if (a.toString()) {
        if (!r) break;
        ++s;
      } else
        this.chunks.splice(s, 1);
      if (r) return r;
    }
    return "";
  }
  shift() {
    if (!this.chunks.length) return "";
    let e = this.chunks.length - 1;
    for (; 0 <= e; ) {
      const t = this.chunks[e], s = t.shift();
      if (t.toString()) {
        if (!s) break;
        --e;
      } else
        this.chunks.splice(e, 1);
      if (s) return s;
    }
    return "";
  }
}
class zu {
  constructor(e, t) {
    this.masked = e, this._log = [];
    const {
      offset: s,
      index: a
    } = e._mapPosToBlock(t) || (t < 0 ? (
      // first
      {
        index: 0,
        offset: 0
      }
    ) : (
      // last
      {
        index: this.masked._blocks.length,
        offset: 0
      }
    ));
    this.offset = s, this.index = a, this.ok = !1;
  }
  get block() {
    return this.masked._blocks[this.index];
  }
  get pos() {
    return this.masked._blockStartPos(this.index) + this.offset;
  }
  get state() {
    return {
      index: this.index,
      offset: this.offset,
      ok: this.ok
    };
  }
  set state(e) {
    Object.assign(this, e);
  }
  pushState() {
    this._log.push(this.state);
  }
  popState() {
    const e = this._log.pop();
    return e && (this.state = e), e;
  }
  bindBlock() {
    this.block || (this.index < 0 && (this.index = 0, this.offset = 0), this.index >= this.masked._blocks.length && (this.index = this.masked._blocks.length - 1, this.offset = this.block.displayValue.length));
  }
  _pushLeft(e) {
    for (this.pushState(), this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((t = this.block) == null ? void 0 : t.displayValue.length) || 0) {
      var t;
      if (e()) return this.ok = !0;
    }
    return this.ok = !1;
  }
  _pushRight(e) {
    for (this.pushState(), this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0)
      if (e()) return this.ok = !0;
    return this.ok = !1;
  }
  pushLeftBeforeFilled() {
    return this._pushLeft(() => {
      if (!(this.block.isFixed || !this.block.value) && (this.offset = this.block.nearestInputPos(this.offset, $.FORCE_LEFT), this.offset !== 0))
        return !0;
    });
  }
  pushLeftBeforeInput() {
    return this._pushLeft(() => {
      if (!this.block.isFixed)
        return this.offset = this.block.nearestInputPos(this.offset, $.LEFT), !0;
    });
  }
  pushLeftBeforeRequired() {
    return this._pushLeft(() => {
      if (!(this.block.isFixed || this.block.isOptional && !this.block.value))
        return this.offset = this.block.nearestInputPos(this.offset, $.LEFT), !0;
    });
  }
  pushRightBeforeFilled() {
    return this._pushRight(() => {
      if (!(this.block.isFixed || !this.block.value) && (this.offset = this.block.nearestInputPos(this.offset, $.FORCE_RIGHT), this.offset !== this.block.value.length))
        return !0;
    });
  }
  pushRightBeforeInput() {
    return this._pushRight(() => {
      if (!this.block.isFixed)
        return this.offset = this.block.nearestInputPos(this.offset, $.NONE), !0;
    });
  }
  pushRightBeforeRequired() {
    return this._pushRight(() => {
      if (!(this.block.isFixed || this.block.isOptional && !this.block.value))
        return this.offset = this.block.nearestInputPos(this.offset, $.NONE), !0;
    });
  }
}
class vo {
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  constructor(e) {
    Object.assign(this, e), this._value = "", this.isFixed = !0;
  }
  get value() {
    return this._value;
  }
  get unmaskedValue() {
    return this.isUnmasking ? this.value : "";
  }
  get rawInputValue() {
    return this._isRawInput ? this.value : "";
  }
  get displayValue() {
    return this.value;
  }
  reset() {
    this._isRawInput = !1, this._value = "";
  }
  remove(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this._value.length), this._value = this._value.slice(0, e) + this._value.slice(t), this._value || (this._isRawInput = !1), new M();
  }
  nearestInputPos(e, t) {
    t === void 0 && (t = $.NONE);
    const s = 0, a = this._value.length;
    switch (t) {
      case $.LEFT:
      case $.FORCE_LEFT:
        return s;
      case $.NONE:
      case $.RIGHT:
      case $.FORCE_RIGHT:
      default:
        return a;
    }
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this._value.length), this._isRawInput ? t - e : 0;
  }
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this._value.length), s === void 0 && (s = {}), s.raw && this._isRawInput && this._value.slice(e, t) || "";
  }
  get isComplete() {
    return !0;
  }
  get isFilled() {
    return !!this._value;
  }
  _appendChar(e, t) {
    if (t === void 0 && (t = {}), this.isFilled) return new M();
    const s = this.eager === !0 || this.eager === "append", r = this.char === e && (this.isUnmasking || t.input || t.raw) && (!t.raw || !s) && !t.tail, n = new M({
      inserted: this.char,
      rawInserted: r ? this.char : ""
    });
    return this._value = this.char, this._isRawInput = r && (t.raw || t.input), n;
  }
  _appendEager() {
    return this._appendChar(this.char, {
      tail: !0
    });
  }
  _appendPlaceholder() {
    const e = new M();
    return this.isFilled || (this._value = e.inserted = this.char), e;
  }
  extractTail() {
    return new We("");
  }
  appendTail(e) {
    return vt(e) && (e = new We(String(e))), e.appendTo(this);
  }
  append(e, t, s) {
    const a = this._appendChar(e[0], t);
    return s != null && (a.tailShift += this.appendTail(s).tailShift), a;
  }
  doCommit() {
  }
  get state() {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(e) {
    this._value = e._value, this._isRawInput = !!e._rawInputValue;
  }
  pad(e) {
    return this._appendPlaceholder();
  }
}
class ki {
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  /** */
  constructor(e) {
    const {
      parent: t,
      isOptional: s,
      placeholderChar: a,
      displayChar: r,
      lazy: n,
      eager: d,
      ...l
    } = e;
    this.masked = st(l), Object.assign(this, {
      parent: t,
      isOptional: s,
      placeholderChar: a,
      displayChar: r,
      lazy: n,
      eager: d
    });
  }
  reset() {
    this.isFilled = !1, this.masked.reset();
  }
  remove(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.value.length), e === 0 && t >= 1 ? (this.isFilled = !1, this.masked.remove(e, t)) : new M();
  }
  get value() {
    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : "");
  }
  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }
  get rawInputValue() {
    return this.masked.rawInputValue;
  }
  get displayValue() {
    return this.masked.value && this.displayChar || this.value;
  }
  get isComplete() {
    return !!this.masked.value || this.isOptional;
  }
  _appendChar(e, t) {
    if (t === void 0 && (t = {}), this.isFilled) return new M();
    const s = this.masked.state;
    let a = this.masked._appendChar(e, this.currentMaskFlags(t));
    return a.inserted && this.doValidate(t) === !1 && (a = new M(), this.masked.state = s), !a.inserted && !this.isOptional && !this.lazy && !t.input && (a.inserted = this.placeholderChar), a.skip = !a.inserted && !this.isOptional, this.isFilled = !!a.inserted, a;
  }
  append(e, t, s) {
    return this.masked.append(e, this.currentMaskFlags(t), s);
  }
  _appendPlaceholder() {
    return this.isFilled || this.isOptional ? new M() : (this.isFilled = !0, new M({
      inserted: this.placeholderChar
    }));
  }
  _appendEager() {
    return new M();
  }
  extractTail(e, t) {
    return this.masked.extractTail(e, t);
  }
  appendTail(e) {
    return this.masked.appendTail(e);
  }
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.value.length), this.masked.extractInput(e, t, s);
  }
  nearestInputPos(e, t) {
    t === void 0 && (t = $.NONE);
    const s = 0, a = this.value.length, r = Math.min(Math.max(e, s), a);
    switch (t) {
      case $.LEFT:
      case $.FORCE_LEFT:
        return this.isComplete ? r : s;
      case $.RIGHT:
      case $.FORCE_RIGHT:
        return this.isComplete ? r : a;
      case $.NONE:
      default:
        return r;
    }
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.value.length), this.value.slice(e, t).length;
  }
  doValidate(e) {
    return this.masked.doValidate(this.currentMaskFlags(e)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(e)));
  }
  doCommit() {
    this.masked.doCommit();
  }
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      masked: this.masked.state,
      isFilled: this.isFilled
    };
  }
  set state(e) {
    this.masked.state = e.masked, this.isFilled = e.isFilled;
  }
  currentMaskFlags(e) {
    var t;
    return {
      ...e,
      _beforeTailState: (e == null || (t = e._beforeTailState) == null ? void 0 : t.masked) || (e == null ? void 0 : e._beforeTailState)
    };
  }
  pad(e) {
    return new M();
  }
}
ki.DEFAULT_DEFINITIONS = {
  0: /\d/,
  a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  "*": /./
};
class Hu extends ue {
  /** */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const t = e.mask;
    t && (e.validate = (s) => s.search(t) >= 0), super._update(e);
  }
}
D.MaskedRegExp = Hu;
class pe extends ue {
  /** */
  /** */
  /** Single char for empty input */
  /** Single char for filled input */
  /** Show placeholder only when needed */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  constructor(e) {
    super({
      ...pe.DEFAULTS,
      ...e,
      definitions: Object.assign({}, ki.DEFAULT_DEFINITIONS, e == null ? void 0 : e.definitions)
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    e.definitions = Object.assign({}, this.definitions, e.definitions), super._update(e), this._rebuildMask();
  }
  _rebuildMask() {
    const e = this.definitions;
    this._blocks = [], this.exposeBlock = void 0, this._stops = [], this._maskedBlocks = {};
    const t = this.mask;
    if (!t || !e) return;
    let s = !1, a = !1;
    for (let r = 0; r < t.length; ++r) {
      if (this.blocks) {
        const h = t.slice(r), u = Object.keys(this.blocks).filter((v) => h.indexOf(v) === 0);
        u.sort((v, m) => m.length - v.length);
        const g = u[0];
        if (g) {
          const {
            expose: v,
            repeat: m,
            ...x
          } = Hs(this.blocks[g]), w = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            autofix: this.autofix,
            ...x,
            repeat: m,
            parent: this
          }, S = m != null ? new D.RepeatBlock(
            w
            /* TODO */
          ) : st(w);
          S && (this._blocks.push(S), v && (this.exposeBlock = S), this._maskedBlocks[g] || (this._maskedBlocks[g] = []), this._maskedBlocks[g].push(this._blocks.length - 1)), r += g.length - 1;
          continue;
        }
      }
      let n = t[r], d = n in e;
      if (n === pe.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }
      if (n === "{" || n === "}") {
        s = !s;
        continue;
      }
      if (n === "[" || n === "]") {
        a = !a;
        continue;
      }
      if (n === pe.ESCAPE_CHAR) {
        if (++r, n = t[r], !n) break;
        d = !1;
      }
      const l = d ? new ki({
        isOptional: a,
        lazy: this.lazy,
        eager: this.eager,
        placeholderChar: this.placeholderChar,
        displayChar: this.displayChar,
        ...Hs(e[n]),
        parent: this
      }) : new vo({
        char: n,
        eager: this.eager,
        isUnmasking: s
      });
      this._blocks.push(l);
    }
  }
  get state() {
    return {
      ...super.state,
      _blocks: this._blocks.map((e) => e.state)
    };
  }
  set state(e) {
    if (!e) {
      this.reset();
      return;
    }
    const {
      _blocks: t,
      ...s
    } = e;
    this._blocks.forEach((a, r) => a.state = t[r]), super.state = s;
  }
  reset() {
    super.reset(), this._blocks.forEach((e) => e.reset());
  }
  get isComplete() {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every((e) => e.isComplete);
  }
  get isFilled() {
    return this._blocks.every((e) => e.isFilled);
  }
  get isFixed() {
    return this._blocks.every((e) => e.isFixed);
  }
  get isOptional() {
    return this._blocks.every((e) => e.isOptional);
  }
  doCommit() {
    this._blocks.forEach((e) => e.doCommit()), super.doCommit();
  }
  get unmaskedValue() {
    return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((e, t) => e += t.unmaskedValue, "");
  }
  set unmaskedValue(e) {
    if (this.exposeBlock) {
      const t = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.unmaskedValue = e, this.appendTail(t), this.doCommit();
    } else super.unmaskedValue = e;
  }
  get value() {
    return this.exposeBlock ? this.exposeBlock.value : (
      // TODO return _value when not in change?
      this._blocks.reduce((e, t) => e += t.value, "")
    );
  }
  set value(e) {
    if (this.exposeBlock) {
      const t = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.value = e, this.appendTail(t), this.doCommit();
    } else super.value = e;
  }
  get typedValue() {
    return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
  }
  set typedValue(e) {
    if (this.exposeBlock) {
      const t = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.typedValue = e, this.appendTail(t), this.doCommit();
    } else super.typedValue = e;
  }
  get displayValue() {
    return this._blocks.reduce((e, t) => e += t.displayValue, "");
  }
  appendTail(e) {
    return super.appendTail(e).aggregate(this._appendPlaceholder());
  }
  _appendEager() {
    var e;
    const t = new M();
    let s = (e = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : e.index;
    if (s == null) return t;
    this._blocks[s].isFilled && ++s;
    for (let a = s; a < this._blocks.length; ++a) {
      const r = this._blocks[a]._appendEager();
      if (!r.inserted) break;
      t.aggregate(r);
    }
    return t;
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = this._mapPosToBlock(this.displayValue.length), a = new M();
    if (!s) return a;
    for (let n = s.index, d; d = this._blocks[n]; ++n) {
      var r;
      const l = d._appendChar(e, {
        ...t,
        _beforeTailState: (r = t._beforeTailState) == null || (r = r._blocks) == null ? void 0 : r[n]
      });
      if (a.aggregate(l), l.consumed) break;
    }
    return a;
  }
  extractTail(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    const s = new zt();
    return e === t || this._forEachBlocksInRange(e, t, (a, r, n, d) => {
      const l = a.extractTail(n, d);
      l.stop = this._findStopBefore(r), l.from = this._blockStartPos(r), l instanceof zt && (l.blockIndex = r), s.extend(l);
    }), s;
  }
  extractInput(e, t, s) {
    if (e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), s === void 0 && (s = {}), e === t) return "";
    let a = "";
    return this._forEachBlocksInRange(e, t, (r, n, d, l) => {
      a += r.extractInput(d, l, s);
    }), a;
  }
  _findStopBefore(e) {
    let t;
    for (let s = 0; s < this._stops.length; ++s) {
      const a = this._stops[s];
      if (a <= e) t = a;
      else break;
    }
    return t;
  }
  /** Appends placeholder depending on laziness */
  _appendPlaceholder(e) {
    const t = new M();
    if (this.lazy && e == null) return t;
    const s = this._mapPosToBlock(this.displayValue.length);
    if (!s) return t;
    const a = s.index, r = e ?? this._blocks.length;
    return this._blocks.slice(a, r).forEach((n) => {
      if (!n.lazy || e != null) {
        var d;
        t.aggregate(n._appendPlaceholder((d = n._blocks) == null ? void 0 : d.length));
      }
    }), t;
  }
  /** Finds block in pos */
  _mapPosToBlock(e) {
    let t = "";
    for (let s = 0; s < this._blocks.length; ++s) {
      const a = this._blocks[s], r = t.length;
      if (t += a.displayValue, e <= t.length)
        return {
          index: s,
          offset: e - r
        };
    }
  }
  _blockStartPos(e) {
    return this._blocks.slice(0, e).reduce((t, s) => t += s.displayValue.length, 0);
  }
  _forEachBlocksInRange(e, t, s) {
    t === void 0 && (t = this.displayValue.length);
    const a = this._mapPosToBlock(e);
    if (a) {
      const r = this._mapPosToBlock(t), n = r && a.index === r.index, d = a.offset, l = r && n ? r.offset : this._blocks[a.index].displayValue.length;
      if (s(this._blocks[a.index], a.index, d, l), r && !n) {
        for (let h = a.index + 1; h < r.index; ++h)
          s(this._blocks[h], h, 0, this._blocks[h].displayValue.length);
        s(this._blocks[r.index], r.index, 0, r.offset);
      }
    }
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    const s = super.remove(e, t);
    return this._forEachBlocksInRange(e, t, (a, r, n, d) => {
      s.aggregate(a.remove(n, d));
    }), s;
  }
  nearestInputPos(e, t) {
    if (t === void 0 && (t = $.NONE), !this._blocks.length) return 0;
    const s = new zu(this, e);
    if (t === $.NONE)
      return s.pushRightBeforeInput() || (s.popState(), s.pushLeftBeforeInput()) ? s.pos : this.displayValue.length;
    if (t === $.LEFT || t === $.FORCE_LEFT) {
      if (t === $.LEFT) {
        if (s.pushRightBeforeFilled(), s.ok && s.pos === e) return e;
        s.popState();
      }
      if (s.pushLeftBeforeInput(), s.pushLeftBeforeRequired(), s.pushLeftBeforeFilled(), t === $.LEFT) {
        if (s.pushRightBeforeInput(), s.pushRightBeforeRequired(), s.ok && s.pos <= e || (s.popState(), s.ok && s.pos <= e)) return s.pos;
        s.popState();
      }
      return s.ok ? s.pos : t === $.FORCE_LEFT ? 0 : (s.popState(), s.ok || (s.popState(), s.ok) ? s.pos : 0);
    }
    return t === $.RIGHT || t === $.FORCE_RIGHT ? (s.pushRightBeforeInput(), s.pushRightBeforeRequired(), s.pushRightBeforeFilled() ? s.pos : t === $.FORCE_RIGHT ? this.displayValue.length : (s.popState(), s.ok || (s.popState(), s.ok) ? s.pos : this.nearestInputPos(e, $.LEFT))) : e;
  }
  totalInputPositions(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    let s = 0;
    return this._forEachBlocksInRange(e, t, (a, r, n, d) => {
      s += a.totalInputPositions(n, d);
    }), s;
  }
  /** Get block by name */
  maskedBlock(e) {
    return this.maskedBlocks(e)[0];
  }
  /** Get all blocks by name */
  maskedBlocks(e) {
    const t = this._maskedBlocks[e];
    return t ? t.map((s) => this._blocks[s]) : [];
  }
  pad(e) {
    const t = new M();
    return this._forEachBlocksInRange(0, this.displayValue.length, (s) => t.aggregate(s.pad(e))), t;
  }
}
pe.DEFAULTS = {
  ...ue.DEFAULTS,
  lazy: !0,
  placeholderChar: "_"
};
pe.STOP_CHAR = "`";
pe.ESCAPE_CHAR = "\\";
pe.InputDefinition = ki;
pe.FixedDefinition = vo;
D.MaskedPattern = pe;
class pi extends pe {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */
  /** Min bound */
  /** Max bound */
  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  constructor(e) {
    super(e);
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const {
      to: t = this.to || 0,
      from: s = this.from || 0,
      maxLength: a = this.maxLength || 0,
      autofix: r = this.autofix,
      ...n
    } = e;
    this.to = t, this.from = s, this.maxLength = Math.max(String(t).length, a), this.autofix = r;
    const d = String(this.from).padStart(this.maxLength, "0"), l = String(this.to).padStart(this.maxLength, "0");
    let h = 0;
    for (; h < l.length && l[h] === d[h]; ) ++h;
    n.mask = l.slice(0, h).replace(/0/g, "\\0") + "0".repeat(this.maxLength - h), super._update(n);
  }
  get isComplete() {
    return super.isComplete && !!this.value;
  }
  boundaries(e) {
    let t = "", s = "";
    const [, a, r] = e.match(/^(\D*)(\d*)(\D*)/) || [];
    return r && (t = "0".repeat(a.length) + r, s = "9".repeat(a.length) + r), t = t.padEnd(this.maxLength, "0"), s = s.padEnd(this.maxLength, "9"), [t, s];
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    let s;
    return [e, s] = super.doPrepareChar(e.replace(/\D/g, ""), t), e || (s.skip = !this.isComplete), [e, s];
  }
  _appendCharRaw(e, t) {
    if (t === void 0 && (t = {}), !this.autofix || this.value.length + 1 > this.maxLength) return super._appendCharRaw(e, t);
    const s = String(this.from).padStart(this.maxLength, "0"), a = String(this.to).padStart(this.maxLength, "0"), [r, n] = this.boundaries(this.value + e);
    return Number(n) < this.from ? super._appendCharRaw(s[this.value.length], t) : Number(r) > this.to ? !t.tail && this.autofix === "pad" && this.value.length + 1 < this.maxLength ? super._appendCharRaw(s[this.value.length], t).aggregate(this._appendCharRaw(e, t)) : super._appendCharRaw(a[this.value.length], t) : super._appendCharRaw(e, t);
  }
  doValidate(e) {
    const t = this.value;
    if (t.search(/[^0]/) === -1 && t.length <= this._matchFrom) return !0;
    const [a, r] = this.boundaries(t);
    return this.from <= Number(r) && Number(a) <= this.to && super.doValidate(e);
  }
  pad(e) {
    const t = new M();
    if (this.value.length === this.maxLength) return t;
    const s = this.value, a = this.maxLength - this.value.length;
    if (a) {
      this.reset();
      for (let r = 0; r < a; ++r)
        t.aggregate(super._appendCharRaw("0", e));
      s.split("").forEach((r) => this._appendCharRaw(r));
    }
    return t;
  }
}
D.MaskedRange = pi;
const Yu = "d{.}`m{.}`Y";
class et extends pe {
  static extractPatternOptions(e) {
    const {
      mask: t,
      pattern: s,
      ...a
    } = e;
    return {
      ...a,
      mask: vt(t) ? t : s
    };
  }
  /** Pattern mask for date according to {@link MaskedDate#format} */
  /** Start date */
  /** End date */
  /** Format typed value to string */
  /** Parse string to get typed value */
  constructor(e) {
    super(et.extractPatternOptions({
      ...et.DEFAULTS,
      ...e
    }));
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const {
      mask: t,
      pattern: s,
      blocks: a,
      ...r
    } = {
      ...et.DEFAULTS,
      ...e
    }, n = Object.assign({}, et.GET_DEFAULT_BLOCKS());
    e.min && (n.Y.from = e.min.getFullYear()), e.max && (n.Y.to = e.max.getFullYear()), e.min && e.max && n.Y.from === n.Y.to && (n.m.from = e.min.getMonth() + 1, n.m.to = e.max.getMonth() + 1, n.m.from === n.m.to && (n.d.from = e.min.getDate(), n.d.to = e.max.getDate())), Object.assign(n, this.blocks, a), super._update({
      ...r,
      mask: vt(t) ? t : s,
      blocks: n
    });
  }
  doValidate(e) {
    const t = this.date;
    return super.doValidate(e) && (!this.isComplete || this.isDateExist(this.value) && t != null && (this.min == null || this.min <= t) && (this.max == null || t <= this.max));
  }
  /** Checks if date is exists */
  isDateExist(e) {
    return this.format(this.parse(e, this), this).indexOf(e) >= 0;
  }
  /** Parsed Date */
  get date() {
    return this.typedValue;
  }
  set date(e) {
    this.typedValue = e;
  }
  get typedValue() {
    return this.isComplete ? super.typedValue : null;
  }
  set typedValue(e) {
    super.typedValue = e;
  }
  maskEquals(e) {
    return e === Date || super.maskEquals(e);
  }
  optionsIsChanged(e) {
    return super.optionsIsChanged(et.extractPatternOptions(e));
  }
}
et.GET_DEFAULT_BLOCKS = () => ({
  d: {
    mask: pi,
    from: 1,
    to: 31,
    maxLength: 2
  },
  m: {
    mask: pi,
    from: 1,
    to: 12,
    maxLength: 2
  },
  Y: {
    mask: pi,
    from: 1900,
    to: 9999
  }
});
et.DEFAULTS = {
  ...pe.DEFAULTS,
  mask: Date,
  pattern: Yu,
  format: (i, e) => {
    if (!i) return "";
    const t = String(i.getDate()).padStart(2, "0"), s = String(i.getMonth() + 1).padStart(2, "0"), a = i.getFullYear();
    return [t, s, a].join(".");
  },
  parse: (i, e) => {
    const [t, s, a] = i.split(".").map(Number);
    return new Date(a, s - 1, t);
  }
};
D.MaskedDate = et;
class Mi extends ue {
  constructor(e) {
    super({
      ...Mi.DEFAULTS,
      ...e
    }), this.currentMask = void 0;
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update(e), "mask" in e && (this.exposeMask = void 0, this.compiledMasks = Array.isArray(e.mask) ? e.mask.map((t) => {
      const {
        expose: s,
        ...a
      } = Hs(t), r = st({
        overwrite: this._overwrite,
        eager: this._eager,
        skipInvalid: this._skipInvalid,
        ...a
      });
      return s && (this.exposeMask = r), r;
    }) : []);
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = this._applyDispatch(e, t);
    return this.currentMask && s.aggregate(this.currentMask._appendChar(e, this.currentMaskFlags(t))), s;
  }
  _applyDispatch(e, t, s) {
    e === void 0 && (e = ""), t === void 0 && (t = {}), s === void 0 && (s = "");
    const a = t.tail && t._beforeTailState != null ? t._beforeTailState._value : this.value, r = this.rawInputValue, n = t.tail && t._beforeTailState != null ? t._beforeTailState._rawInputValue : r, d = r.slice(n.length), l = this.currentMask, h = new M(), u = l == null ? void 0 : l.state;
    return this.currentMask = this.doDispatch(e, {
      ...t
    }, s), this.currentMask && (this.currentMask !== l ? (this.currentMask.reset(), n && (this.currentMask.append(n, {
      raw: !0
    }), h.tailShift = this.currentMask.value.length - a.length), d && (h.tailShift += this.currentMask.append(d, {
      raw: !0,
      tail: !0
    }).tailShift)) : u && (this.currentMask.state = u)), h;
  }
  _appendPlaceholder() {
    const e = this._applyDispatch();
    return this.currentMask && e.aggregate(this.currentMask._appendPlaceholder()), e;
  }
  _appendEager() {
    const e = this._applyDispatch();
    return this.currentMask && e.aggregate(this.currentMask._appendEager()), e;
  }
  appendTail(e) {
    const t = new M();
    return e && t.aggregate(this._applyDispatch("", {}, e)), t.aggregate(this.currentMask ? this.currentMask.appendTail(e) : super.appendTail(e));
  }
  currentMaskFlags(e) {
    var t, s;
    return {
      ...e,
      _beforeTailState: ((t = e._beforeTailState) == null ? void 0 : t.currentMaskRef) === this.currentMask && ((s = e._beforeTailState) == null ? void 0 : s.currentMask) || e._beforeTailState
    };
  }
  doDispatch(e, t, s) {
    return t === void 0 && (t = {}), s === void 0 && (s = ""), this.dispatch(e, this, t, s);
  }
  doValidate(e) {
    return super.doValidate(e) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(e)));
  }
  doPrepare(e, t) {
    t === void 0 && (t = {});
    let [s, a] = super.doPrepare(e, t);
    if (this.currentMask) {
      let r;
      [s, r] = super.doPrepare(s, this.currentMaskFlags(t)), a = a.aggregate(r);
    }
    return [s, a];
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    let [s, a] = super.doPrepareChar(e, t);
    if (this.currentMask) {
      let r;
      [s, r] = super.doPrepareChar(s, this.currentMaskFlags(t)), a = a.aggregate(r);
    }
    return [s, a];
  }
  reset() {
    var e;
    (e = this.currentMask) == null || e.reset(), this.compiledMasks.forEach((t) => t.reset());
  }
  get value() {
    return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : "";
  }
  set value(e) {
    this.exposeMask ? (this.exposeMask.value = e, this.currentMask = this.exposeMask, this._applyDispatch()) : super.value = e;
  }
  get unmaskedValue() {
    return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : "";
  }
  set unmaskedValue(e) {
    this.exposeMask ? (this.exposeMask.unmaskedValue = e, this.currentMask = this.exposeMask, this._applyDispatch()) : super.unmaskedValue = e;
  }
  get typedValue() {
    return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : "";
  }
  set typedValue(e) {
    if (this.exposeMask) {
      this.exposeMask.typedValue = e, this.currentMask = this.exposeMask, this._applyDispatch();
      return;
    }
    let t = String(e);
    this.currentMask && (this.currentMask.typedValue = e, t = this.currentMask.unmaskedValue), this.unmaskedValue = t;
  }
  get displayValue() {
    return this.currentMask ? this.currentMask.displayValue : "";
  }
  get isComplete() {
    var e;
    return !!((e = this.currentMask) != null && e.isComplete);
  }
  get isFilled() {
    var e;
    return !!((e = this.currentMask) != null && e.isFilled);
  }
  remove(e, t) {
    const s = new M();
    return this.currentMask && s.aggregate(this.currentMask.remove(e, t)).aggregate(this._applyDispatch()), s;
  }
  get state() {
    var e;
    return {
      ...super.state,
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map((t) => t.state),
      currentMaskRef: this.currentMask,
      currentMask: (e = this.currentMask) == null ? void 0 : e.state
    };
  }
  set state(e) {
    const {
      compiledMasks: t,
      currentMaskRef: s,
      currentMask: a,
      ...r
    } = e;
    t && this.compiledMasks.forEach((n, d) => n.state = t[d]), s != null && (this.currentMask = s, this.currentMask.state = a), super.state = r;
  }
  extractInput(e, t, s) {
    return this.currentMask ? this.currentMask.extractInput(e, t, s) : "";
  }
  extractTail(e, t) {
    return this.currentMask ? this.currentMask.extractTail(e, t) : super.extractTail(e, t);
  }
  doCommit() {
    this.currentMask && this.currentMask.doCommit(), super.doCommit();
  }
  nearestInputPos(e, t) {
    return this.currentMask ? this.currentMask.nearestInputPos(e, t) : super.nearestInputPos(e, t);
  }
  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : this._overwrite;
  }
  set overwrite(e) {
    this._overwrite = e;
  }
  get eager() {
    return this.currentMask ? this.currentMask.eager : this._eager;
  }
  set eager(e) {
    this._eager = e;
  }
  get skipInvalid() {
    return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
  }
  set skipInvalid(e) {
    this._skipInvalid = e;
  }
  get autofix() {
    return this.currentMask ? this.currentMask.autofix : this._autofix;
  }
  set autofix(e) {
    this._autofix = e;
  }
  maskEquals(e) {
    return Array.isArray(e) ? this.compiledMasks.every((t, s) => {
      if (!e[s]) return;
      const {
        mask: a,
        ...r
      } = e[s];
      return wi(t, r) && t.maskEquals(a);
    }) : super.maskEquals(e);
  }
  typedValueEquals(e) {
    var t;
    return !!((t = this.currentMask) != null && t.typedValueEquals(e));
  }
}
Mi.DEFAULTS = {
  ...ue.DEFAULTS,
  dispatch: (i, e, t, s) => {
    if (!e.compiledMasks.length) return;
    const a = e.rawInputValue, r = e.compiledMasks.map((n, d) => {
      const l = e.currentMask === n, h = l ? n.displayValue.length : n.nearestInputPos(n.displayValue.length, $.FORCE_LEFT);
      return n.rawInputValue !== a ? (n.reset(), n.append(a, {
        raw: !0
      })) : l || n.remove(h), n.append(i, e.currentMaskFlags(t)), n.appendTail(s), {
        index: d,
        weight: n.rawInputValue.length,
        totalInputPositions: n.totalInputPositions(0, Math.max(h, n.nearestInputPos(n.displayValue.length, $.FORCE_LEFT)))
      };
    });
    return r.sort((n, d) => d.weight - n.weight || d.totalInputPositions - n.totalInputPositions), e.compiledMasks[r[0].index];
  }
};
D.MaskedDynamic = Mi;
class Fi extends pe {
  constructor(e) {
    super({
      ...Fi.DEFAULTS,
      ...e
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    const {
      enum: t,
      ...s
    } = e;
    if (t) {
      const a = t.map((d) => d.length), r = Math.min(...a), n = Math.max(...a) - r;
      s.mask = "*".repeat(r), n && (s.mask += "[" + "*".repeat(n) + "]"), this.enum = t;
    }
    super._update(s);
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = Math.min(this.nearestInputPos(0, $.FORCE_RIGHT), this.value.length), a = this.enum.filter((r) => this.matchValue(r, this.unmaskedValue + e, s));
    if (a.length) {
      a.length === 1 && this._forEachBlocksInRange(0, this.value.length, (n, d) => {
        const l = a[0][d];
        d >= this.value.length || l === n.value || (n.reset(), n._appendChar(l, t));
      });
      const r = super._appendCharRaw(a[0][this.value.length], t);
      return a.length === 1 && a[0].slice(this.unmaskedValue.length).split("").forEach((n) => r.aggregate(super._appendCharRaw(n))), r;
    }
    return new M({
      skip: !this.isComplete
    });
  }
  extractTail(e, t) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), new We("", e);
  }
  remove(e, t) {
    if (e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), e === t) return new M();
    const s = Math.min(super.nearestInputPos(0, $.FORCE_RIGHT), this.value.length);
    let a;
    for (a = e; a >= 0 && !(this.enum.filter((d) => this.matchValue(d, this.value.slice(s, a), s)).length > 1); --a)
      ;
    const r = super.remove(a, t);
    return r.tailShift += a - e, r;
  }
  get isComplete() {
    return this.enum.indexOf(this.value) >= 0;
  }
}
Fi.DEFAULTS = {
  ...pe.DEFAULTS,
  matchValue: (i, e, t) => i.indexOf(e, t) === t
};
D.MaskedEnum = Fi;
class Uu extends ue {
  /** */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update({
      ...e,
      validate: e.mask
    });
  }
}
D.MaskedFunction = Uu;
var bo;
class Ce extends ue {
  /** Single char */
  /** Single char */
  /** Array of single chars */
  /** */
  /** */
  /** Digits after point */
  /** Flag to remove leading and trailing zeros in the end of editing */
  /** Flag to pad trailing zeros after point in the end of editing */
  /** Enable characters overwriting */
  /** */
  /** */
  /** */
  /** Format typed value to string */
  /** Parse string to get typed value */
  constructor(e) {
    super({
      ...Ce.DEFAULTS,
      ...e
    });
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    super._update(e), this._updateRegExps();
  }
  _updateRegExps() {
    const e = "^" + (this.allowNegative ? "[+|\\-]?" : ""), t = "\\d*", s = (this.scale ? "(" + ea(this.radix) + "\\d{0," + this.scale + "})?" : "") + "$";
    this._numberRegExp = new RegExp(e + t + s), this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(ea).join("") + "]", "g"), this._thousandsSeparatorRegExp = new RegExp(ea(this.thousandsSeparator), "g");
  }
  _removeThousandsSeparators(e) {
    return e.replace(this._thousandsSeparatorRegExp, "");
  }
  _insertThousandsSeparators(e) {
    const t = e.split(this.radix);
    return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator), t.join(this.radix);
  }
  doPrepareChar(e, t) {
    t === void 0 && (t = {});
    const [s, a] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && /*
      radix should be mapped when
      1) input is done from keyboard = flags.input && flags.raw
      2) unmasked value is set = !flags.input && !flags.raw
      and should not be mapped when
      1) value is set = flags.input && !flags.raw
      2) raw value is set = !flags.input && flags.raw
    */
    (t.input && t.raw || !t.input && !t.raw) ? e.replace(this._mapToRadixRegExp, this.radix) : e), t);
    return e && !s && (a.skip = !0), s && !this.allowPositive && !this.value && s !== "-" && a.aggregate(this._appendChar("-")), [s, a];
  }
  _separatorsCount(e, t) {
    t === void 0 && (t = !1);
    let s = 0;
    for (let a = 0; a < e; ++a)
      this._value.indexOf(this.thousandsSeparator, a) === a && (++s, t && (e += this.thousandsSeparator.length));
    return s;
  }
  _separatorsCountFromSlice(e) {
    return e === void 0 && (e = this._value), this._separatorsCount(this._removeThousandsSeparators(e).length, !0);
  }
  extractInput(e, t, s) {
    return e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t), this._removeThousandsSeparators(super.extractInput(e, t, s));
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = t.tail && t._beforeTailState ? t._beforeTailState._value : this._value, a = this._separatorsCountFromSlice(s);
    this._value = this._removeThousandsSeparators(this.value);
    const r = this._value;
    this._value += e;
    const n = this.number;
    let d = !isNaN(n), l = !1;
    if (d) {
      let v;
      this.min != null && this.min < 0 && this.number < this.min && (v = this.min), this.max != null && this.max > 0 && this.number > this.max && (v = this.max), v != null && (this.autofix ? (this._value = this.format(v, this).replace(Ce.UNMASKED_RADIX, this.radix), l || (l = r === this._value && !t.tail)) : d = !1), d && (d = !!this._value.match(this._numberRegExp));
    }
    let h;
    d ? h = new M({
      inserted: this._value.slice(r.length),
      rawInserted: l ? "" : e,
      skip: l
    }) : (this._value = r, h = new M()), this._value = this._insertThousandsSeparators(this._value);
    const u = t.tail && t._beforeTailState ? t._beforeTailState._value : this._value, g = this._separatorsCountFromSlice(u);
    return h.tailShift += (g - a) * this.thousandsSeparator.length, h;
  }
  _findSeparatorAround(e) {
    if (this.thousandsSeparator) {
      const t = e - this.thousandsSeparator.length + 1, s = this.value.indexOf(this.thousandsSeparator, t);
      if (s <= e) return s;
    }
    return -1;
  }
  _adjustRangeWithSeparators(e, t) {
    const s = this._findSeparatorAround(e);
    s >= 0 && (e = s);
    const a = this._findSeparatorAround(t);
    return a >= 0 && (t = a + this.thousandsSeparator.length), [e, t];
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length), [e, t] = this._adjustRangeWithSeparators(e, t);
    const s = this.value.slice(0, e), a = this.value.slice(t), r = this._separatorsCount(s.length);
    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(s + a));
    const n = this._separatorsCountFromSlice(s);
    return new M({
      tailShift: (n - r) * this.thousandsSeparator.length
    });
  }
  nearestInputPos(e, t) {
    if (!this.thousandsSeparator) return e;
    switch (t) {
      case $.NONE:
      case $.LEFT:
      case $.FORCE_LEFT: {
        const s = this._findSeparatorAround(e - 1);
        if (s >= 0) {
          const a = s + this.thousandsSeparator.length;
          if (e < a || this.value.length <= a || t === $.FORCE_LEFT)
            return s;
        }
        break;
      }
      case $.RIGHT:
      case $.FORCE_RIGHT: {
        const s = this._findSeparatorAround(e);
        if (s >= 0)
          return s + this.thousandsSeparator.length;
      }
    }
    return e;
  }
  doCommit() {
    if (this.value) {
      const e = this.number;
      let t = e;
      this.min != null && (t = Math.max(t, this.min)), this.max != null && (t = Math.min(t, this.max)), t !== e && (this.unmaskedValue = this.format(t, this));
      let s = this.value;
      this.normalizeZeros && (s = this._normalizeZeros(s)), this.padFractionalZeros && this.scale > 0 && (s = this._padFractionalZeros(s)), this._value = s;
    }
    super.doCommit();
  }
  _normalizeZeros(e) {
    const t = this._removeThousandsSeparators(e).split(this.radix);
    return t[0] = t[0].replace(/^(\D*)(0*)(\d*)/, (s, a, r, n) => a + n), e.length && !/\d$/.test(t[0]) && (t[0] = t[0] + "0"), t.length > 1 && (t[1] = t[1].replace(/0*$/, ""), t[1].length || (t.length = 1)), this._insertThousandsSeparators(t.join(this.radix));
  }
  _padFractionalZeros(e) {
    if (!e) return e;
    const t = e.split(this.radix);
    return t.length < 2 && t.push(""), t[1] = t[1].padEnd(this.scale, "0"), t.join(this.radix);
  }
  doSkipInvalid(e, t, s) {
    t === void 0 && (t = {});
    const a = this.scale === 0 && e !== this.thousandsSeparator && (e === this.radix || e === Ce.UNMASKED_RADIX || this.mapToRadix.includes(e));
    return super.doSkipInvalid(e, t, s) && !a;
  }
  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, Ce.UNMASKED_RADIX);
  }
  set unmaskedValue(e) {
    super.unmaskedValue = e;
  }
  get typedValue() {
    return this.parse(this.unmaskedValue, this);
  }
  set typedValue(e) {
    this.rawInputValue = this.format(e, this).replace(Ce.UNMASKED_RADIX, this.radix);
  }
  /** Parsed Number */
  get number() {
    return this.typedValue;
  }
  set number(e) {
    this.typedValue = e;
  }
  get allowNegative() {
    return this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }
  get allowPositive() {
    return this.min != null && this.min > 0 || this.max != null && this.max > 0;
  }
  typedValueEquals(e) {
    return (super.typedValueEquals(e) || Ce.EMPTY_VALUES.includes(e) && Ce.EMPTY_VALUES.includes(this.typedValue)) && !(e === 0 && this.value === "");
  }
}
bo = Ce;
Ce.UNMASKED_RADIX = ".";
Ce.EMPTY_VALUES = [...ue.EMPTY_VALUES, 0];
Ce.DEFAULTS = {
  ...ue.DEFAULTS,
  mask: Number,
  radix: ",",
  thousandsSeparator: "",
  mapToRadix: [bo.UNMASKED_RADIX],
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  scale: 2,
  normalizeZeros: !0,
  padFractionalZeros: !1,
  parse: Number,
  format: (i) => i.toLocaleString("en-US", {
    useGrouping: !1,
    maximumFractionDigits: 20
  })
};
D.MaskedNumber = Ce;
const ba = {
  MASKED: "value",
  UNMASKED: "unmaskedValue",
  TYPED: "typedValue"
};
function yo(i, e, t) {
  e === void 0 && (e = ba.MASKED), t === void 0 && (t = ba.MASKED);
  const s = st(i);
  return (a) => s.runIsolated((r) => (r[e] = a, r[t]));
}
function qu(i, e, t, s) {
  return yo(e, t, s)(i);
}
D.PIPE_TYPE = ba;
D.createPipe = yo;
D.pipe = qu;
class ju extends pe {
  get repeatFrom() {
    var e;
    return (e = Array.isArray(this.repeat) ? this.repeat[0] : this.repeat === 1 / 0 ? 0 : this.repeat) != null ? e : 0;
  }
  get repeatTo() {
    var e;
    return (e = Array.isArray(this.repeat) ? this.repeat[1] : this.repeat) != null ? e : 1 / 0;
  }
  constructor(e) {
    super(e);
  }
  updateOptions(e) {
    super.updateOptions(e);
  }
  _update(e) {
    var t, s, a;
    const {
      repeat: r,
      ...n
    } = Hs(e);
    this._blockOpts = Object.assign({}, this._blockOpts, n);
    const d = st(this._blockOpts);
    this.repeat = (t = (s = r ?? d.repeat) != null ? s : this.repeat) != null ? t : 1 / 0, super._update({
      mask: "m".repeat(Math.max(this.repeatTo === 1 / 0 && ((a = this._blocks) == null ? void 0 : a.length) || 0, this.repeatFrom)),
      blocks: {
        m: d
      },
      eager: d.eager,
      overwrite: d.overwrite,
      skipInvalid: d.skipInvalid,
      lazy: d.lazy,
      placeholderChar: d.placeholderChar,
      displayChar: d.displayChar
    });
  }
  _allocateBlock(e) {
    if (e < this._blocks.length) return this._blocks[e];
    if (this.repeatTo === 1 / 0 || this._blocks.length < this.repeatTo)
      return this._blocks.push(st(this._blockOpts)), this.mask += "m", this._blocks[this._blocks.length - 1];
  }
  _appendCharRaw(e, t) {
    t === void 0 && (t = {});
    const s = new M();
    for (
      let l = (a = (r = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : r.index) != null ? a : Math.max(this._blocks.length - 1, 0), h, u;
      // try to get a block or
      // try to allocate a new block if not allocated already
      h = (n = this._blocks[l]) != null ? n : u = !u && this._allocateBlock(l);
      ++l
    ) {
      var a, r, n, d;
      const g = h._appendChar(e, {
        ...t,
        _beforeTailState: (d = t._beforeTailState) == null || (d = d._blocks) == null ? void 0 : d[l]
      });
      if (g.skip && u) {
        this._blocks.pop(), this.mask = this.mask.slice(1);
        break;
      }
      if (s.aggregate(g), g.consumed) break;
    }
    return s;
  }
  _trimEmptyTail(e, t) {
    var s, a;
    e === void 0 && (e = 0);
    const r = Math.max(((s = this._mapPosToBlock(e)) == null ? void 0 : s.index) || 0, this.repeatFrom, 0);
    let n;
    t != null && (n = (a = this._mapPosToBlock(t)) == null ? void 0 : a.index), n == null && (n = this._blocks.length - 1);
    let d = 0;
    for (let l = n; r <= l && !this._blocks[l].unmaskedValue; --l, ++d)
      ;
    d && (this._blocks.splice(n - d + 1, d), this.mask = this.mask.slice(d));
  }
  reset() {
    super.reset(), this._trimEmptyTail();
  }
  remove(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = this.displayValue.length);
    const s = super.remove(e, t);
    return this._trimEmptyTail(e, t), s;
  }
  totalInputPositions(e, t) {
    return e === void 0 && (e = 0), t == null && this.repeatTo === 1 / 0 ? 1 / 0 : super.totalInputPositions(e, t);
  }
  get state() {
    return super.state;
  }
  set state(e) {
    this._blocks.length = e._blocks.length, this.mask = this.mask.slice(0, this._blocks.length), super.state = e;
  }
}
D.RepeatBlock = ju;
try {
  globalThis.IMask = D;
} catch {
}
var Wu = b`:host{--sgds-spinner-bg:var(--sgds-primary-surface-default);display:inline-flex}:host([variant=neutral]){--sgds-spinner-bg:var(--sgds-neutral-surface-default)}.spinner-wrapper{align-items:center;display:flex;flex-direction:column;gap:var(--sgds-gap-2-xs)}.spinner{animation:spinner .75s linear infinite;border-radius:50%;border-right:.25em solid var(--sgds-bg-translucent);border:.25em solid var(--sgds-bg-translucent);border-right-color:var(--sgds-spinner-bg);color:var(--sgds-spinner-color);display:inline-flex;height:var(--sgds-dimension-32);width:var(--sgds-dimension-32)}.spinner-sm{height:var(--sgds-dimension-24);width:var(--sgds-dimension-24)}.spinner-lg{height:var(--sgds-dimension-48);width:var(--sgds-dimension-48)}.spinner-label{color:var(--sgds-neutral-color-default);font-size:var(--sgds-font-size-1)}@media (prefers-reduced-motion:reduce){.spinner{animation-duration:1.5s}}

/*! CSS Used keyframes */@keyframes spinner{to{transform:rotate(1turn)}}.sr-only{clip:rect(0,0,0,0);border:0;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}`;
class ys extends f {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md";
  }
  render() {
    return B`
      <div class="spinner-wrapper">
        <div
          class="spinner ${T({
      [`spinner-${this.size}`]: this.size
    })}"
          role="status"
        >
          ${this.label ? E : B`<span class="sr-only">Loading...</span>`}
        </div>
        ${this.label ? B`<span class="spinner-label">${this.label}</span>` : E}
      </div>
    `;
  }
}
ys.styles = [...f.styles, Wn, Wu];
o([
  c({ type: String, reflect: !0 })
], ys.prototype, "variant", void 0);
o([
  c({ reflect: !0 })
], ys.prototype, "size", void 0);
o([
  c({ reflect: !0, type: String })
], ys.prototype, "label", void 0);
var Ku = b`:host{--input-border-radius:var(--sgds-form-border-radius-md)}.form-control-container{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}.form-control-container.disabled{opacity:var(--sgds-opacity-50)}.form-control-group{align-items:center;background-color:var(--sgds-form-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-default);border-radius:var(--input-border-radius);display:flex;gap:var(--sgds-form-gap-md);height:var(--sgds-dimension-48);justify-content:center;min-width:var(--sgds-dimension-256);padding:0 var(--sgds-form-padding-x);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:-webkit-fill-available;width:-moz-available}.form-control{appearance:none;background-clip:padding-box;background:none;border:none;color:var(--sgds-form-color-default);display:block;flex-grow:1;font-size:var(--sgds-font-size-2);line-height:var(--sgds-line-height-body);outline:none;padding:0}.form-control-group>.form-control:focus{z-index:3}@media (prefers-reduced-motion:reduce){.form-control-group{transition:none}}.form-control-group.readonly{border-color:var(--sgds-border-color-muted)}.form-control-group:not(.disabled):not(.is-invalid):hover{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis)}.form-control-group:not(.disabled):not(.is-invalid):focus,.form-control-group:not(.disabled):not(.is-invalid):focus-within{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis);box-shadow:var(--sgds-form-box-shadow-focus);outline:0}.form-control-group.is-invalid{border:var(--sgds-form-border-width-thick) solid var(--sgds-form-danger-border-color-default)}.form-control-group.disabled{background-color:var(--sgds-form-surface-muted)}:host(.quantity-toggle) input::-webkit-inner-spin-button{appearance:none;margin:0}:host(.quantity-toggle) input{text-align:center}.form-control-prefix,.form-control-suffix{color:var(--sgds-form-color-subtle);display:flex;flex-wrap:wrap;gap:var(--sgds-gap-xs)}.form-control-group.quantity-toggle{padding:0}`;
class U extends $t(ce) {
  constructor() {
    super(...arguments), this.type = "text", this.placeholder = "placeholder", this.autofocus = !1, this.readonly = !1, this.defaultValue = "", this.valid = !1, this.loading = !1, this.required = !1, this.value = "", this._isTouched = !1;
  }
  /** Sets focus on the input. */
  focus(e) {
    this.input.focus(e);
  }
  /** Sets blur on the input. */
  blur() {
    this.input.blur();
  }
  /** Programatically sets the invalid state of the input. Pass in boolean value in the argument */
  setInvalid(e) {
    this.invalid = e, e ? this.emit("sgds-invalid") : this.emit("sgds-valid");
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  setValidity(e, t, s) {
    return this._mixinSetValidity(e, t, s);
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  _handleFocus() {
    this.emit("sgds-focus");
  }
  _handleBlur() {
    this.emit("sgds-blur", { cancelable: !0 }).defaultPrevented || (this._isTouched = !0);
  }
  _handleClick() {
    this.focus();
  }
  _handleChange(e) {
    this.value = this.input.value, !this.emit("sgds-change", { cancelable: !0 }).defaultPrevented && super._mixinHandleChange(e);
  }
  _handleInputChange(e) {
    this.value = this.input.value, !this.emit("sgds-input", { cancelable: !0 }).defaultPrevented && super._mixinHandleInputChange(e);
  }
  /** @internal */
  _handleIsTouched() {
    this._isTouched && this.setInvalid(!this._mixinCheckValidity());
  }
  _handleDisabledChange() {
    this.setInvalid(!1);
  }
  _renderInput() {
    const e = this.hasFeedback === "both" || this.hasFeedback === "style";
    return B`
      <div
        class="form-control-group ${T({
      disabled: this.disabled,
      readonly: this.readonly,
      "is-invalid": this.invalid && e
    })}"
        @click=${this._handleClick}
      >
        <slot name="icon"></slot>
        ${this.prefix ? B`<span class="form-control-prefix">${this.prefix}</span>` : E}
        <input
          class="form-control"
          type=${this.type}
          id=${this._controlId}
          name=${C(this.name)}
          placeholder=${C(this.placeholder)}
          aria-invalid=${this.invalid ? "true" : "false"}
          pattern=${C(this.pattern)}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          .value=${Gt(this.value)}
          minlength=${C(this.minlength)}
          maxlength=${C(this.maxlength)}
          min=${C(this.min)}
          max=${C(this.max)}
          step=${C(this.step)}
          @input=${(t) => this._handleInputChange(t)}
          @change=${(t) => this._handleChange(t)}
          @invalid=${() => this.setInvalid(!0)}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          aria-describedby=${C(this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : void 0)}
          aria-labelledby="${this._labelId} ${this._controlId}Help ${this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : ""}"
        />
        ${this.loading ? B`<sgds-spinner size="sm"></sgds-spinner>` : E}
        ${this.valid ? B`<sgds-icon name="check-circle-fill" class="valid-icon"></sgds-icon>` : E}
        ${this.suffix ? B`<span class="form-control-suffix">${this.suffix}</span>` : E}
      </div>
    `;
  }
  _renderFeedback() {
    const e = this.hasFeedback === "both" || this.hasFeedback === "text";
    return this.invalid && e ? B` <div class="invalid-feedback-container">
          <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
          <div id="${this._controlId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
          </div>
        </div>` : B`${this._renderHintText()}`;
  }
  _renderLabel() {
    const e = B`
      <label
        for=${this._controlId}
        id=${this._labelId}
        class=${T({
      "form-label": !0,
      required: this.required
    })}
        >${this.label}</label
      >
    `;
    return this.label && e;
  }
  _renderHintText() {
    const e = B` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  render() {
    return B`
      <div
        class="form-control-container ${T({
      disabled: this.disabled
    })}"
      >
        ${this._renderLabel()} ${this._renderInput()} ${this._renderFeedback()}
      </div>
    `;
  }
}
U.styles = [...ce.styles, qa, Ku];
U.dependencies = {
  "sgds-spinner": ys,
  "sgds-icon": re
};
o([
  c({ reflect: !0 })
], U.prototype, "type", void 0);
o([
  c({ type: String })
], U.prototype, "prefix", void 0);
o([
  c({ type: String })
], U.prototype, "suffix", void 0);
o([
  c({ type: Number, reflect: !0 })
], U.prototype, "minlength", void 0);
o([
  c({ type: Number, reflect: !0 })
], U.prototype, "maxlength", void 0);
o([
  c()
], U.prototype, "min", void 0);
o([
  c()
], U.prototype, "max", void 0);
o([
  c({ type: String, reflect: !0 })
], U.prototype, "placeholder", void 0);
o([
  c({ type: String })
], U.prototype, "pattern", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], U.prototype, "autofocus", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], U.prototype, "readonly", void 0);
o([
  c()
], U.prototype, "step", void 0);
o([
  c({ type: String, reflect: !0 })
], U.prototype, "hasFeedback", void 0);
o([
  c({ type: String, reflect: !0 })
], U.prototype, "invalidFeedback", void 0);
o([
  Zt()
], U.prototype, "defaultValue", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], U.prototype, "valid", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], U.prototype, "loading", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], U.prototype, "required", void 0);
o([
  c({ reflect: !0 })
], U.prototype, "value", void 0);
o([
  R()
], U.prototype, "_isTouched", void 0);
o([
  O("_isTouched", { waitUntilFirstUpdate: !0 })
], U.prototype, "_handleIsTouched", null);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], U.prototype, "_handleDisabledChange", null);
var Gu = b`.input-container{display:flex;flex-direction:row;width:-webkit-fill-available;width:-moz-available}.form-control-group{border-right:0}.input-feedback{display:flex;flex-direction:column;width:-webkit-fill-available;width:-moz-available}.calendar-btn{all:unset}`;
class ws extends U {
  constructor() {
    super(), this.dateFormat = "DD/MM/YYYY", this.mode = "single", this._validateInput = async () => {
      const s = this.mask.value.split(" - ").filter((r) => r !== this.dateFormat).map((r) => ae(va(r, as[this.dateFormat].fnsPattern, /* @__PURE__ */ new Date()))), a = s.filter((r) => !Qn(r) || fa(r, new Date(0, 0, 1)) || fa(r, ae(new Date(this.minDate))) || ga(r, ae(new Date(this.maxDate))));
      if (a.length > 0)
        return this.setInvalid(!0), this.emit("sgds-invalid-input");
      if (this.mode === "range" && s.length === 1)
        return this.setInvalid(!0), this.emit("sgds-invalid-input");
      if (a.length === 0 && s.length > 0)
        return this.setInvalid(!1), this.emit("sgds-selectdates-input", { detail: s });
      if (s.length === 0 && a.length === 0)
        return this.setInvalid(!1), this.emit("sgds-empty-input");
    }, this.type = "text", this._handleBlur = () => null;
  }
  async _handleChange(e) {
    this.value = this.input.value, this.emit("sgds-change"), super._mixinHandleChange(e), await this._validateInput();
  }
  async firstUpdated(e) {
    super.firstUpdated(e), this._applyInputMask(this.dateFormat);
  }
  async _applyInputMask(e) {
    const t = await this.shadowInput, s = this.mode === "single" ? as[e].imPattern : as[e].imRangePattern, a = {
      d: { mask: D.MaskedRange, placeholderChar: "D", from: 0, to: 9, maxLength: 1 },
      m: { mask: D.MaskedRange, placeholderChar: "M", from: 0, to: 9, maxLength: 1 },
      y: { mask: D.MaskedRange, placeholderChar: "Y", from: 0, to: 9, maxLength: 1 },
      D: { mask: D.MaskedRange, placeholderChar: "D", from: 0, to: 9, maxLength: 1 },
      M: { mask: D.MaskedRange, placeholderChar: "M", from: 0, to: 9, maxLength: 1 },
      Y: { mask: D.MaskedRange, placeholderChar: "Y", from: 0, to: 9, maxLength: 1 }
    }, r = {
      mask: s,
      pattern: s,
      eager: !0,
      overwrite: !0,
      // define str -> date convertion
      parse: function(n) {
        return n.split(" - ").map((l) => va(l, as[e].fnsPattern, /* @__PURE__ */ new Date()));
      },
      format: function(n) {
        return n.map((l) => {
          let h, u = "";
          const g = l.getDate(), v = l.getMonth() + 1, m = l.getFullYear();
          return g < 10 && (h = "0" + g), v < 10 && (u = "0" + v), [h, u, m].join("/");
        }).join(" - ");
      },
      lazy: !1,
      blocks: a
    };
    this.mask = D(t, r), this.mask.on("accept", () => {
      this.value = this.mask.masked.value, this.emit("sgds-mask-input-change", { detail: this.value });
    }), this.mask.on("complete", this._validateInput);
  }
  updateMaskValue() {
    var e;
    (e = this.mask) === null || e === void 0 || e.updateValue();
  }
  destroyInputMask() {
    var e;
    (e = this.mask) === null || e === void 0 || e.destroy();
  }
  async applyInputMask() {
    return await this._applyInputMask(this.dateFormat);
  }
  async focus() {
    return (await this.shadowInput).focus();
  }
  render() {
    return p`
      <div
        class="form-control-container ${T({
      disabled: this.disabled
    })}"
      >
        ${this._renderLabel()}
        <div class="input-container">
          ${this._renderInput()}
          <slot name="calendar-btn"></slot>
        </div>
        ${this._renderFeedback()}
      </div>
    `;
  }
}
ws.styles = [...U.styles, Gu];
o([
  c({ type: String })
], ws.prototype, "minDate", void 0);
o([
  c({ type: String })
], ws.prototype, "maxDate", void 0);
o([
  c({ type: String, reflect: !0 })
], ws.prototype, "mode", void 0);
o([
  bt("input")
], ws.prototype, "shadowInput", void 0);
var Zu = b`:host{--datepicker-theme-color:var(--sgds-primary);--datepicker-hover-bg:var(--sgds-primary-100);--datepicker-bg:#fff;--datepicker-close-btn-bg:var(--datepicker-theme-color);--datepicker-close-btn-hover-bg:var(--sgds-primary-700);--datepicker-close-btn-color:#fff;--datepicker-selected-date-bg:var(--sgds-primary);--datepicker-selected-date-color:#fff;font-size:var(--sgds-font-size-1)}.dropdown{display:flex;height:100%}.datepicker.dropdown-menu.show{background-color:var(--sgds-form-surface-default);display:flex;flex-direction:column;gap:var(--sgds-form-gap-sm);overflow:unset;padding:var(--sgds-form-padding-y) var(--sgds-form-padding-x);width:var(--sgds-dimension-320)}sgds-datepicker-input{--input-border-radius:var(--sgds-form-border-radius-md) 0 0 var(--sgds-form-border-radius-md);flex:1;margin-right:0}sgds-icon-button{--btn-border-radius:0 var(--sgds-form-border-radius-md) var(--sgds-form-border-radius-md) 0}.datepicker-container{display:flex}.calendar-btn:not(.with-hint-text){align-self:center}.calendar-btn:not(.with-hint-text).with-label{align-self:end}.calendar-btn.with-hint-text.with-label,.calendar-btn:not(.with-hint-text).with-label{margin-top:calc(var(--sgds-font-size-2)*var(--sgds-line-height-body) - var(--sgds-line-height-min))}.calendar-btn.with-hint-text.with-label{align-self:center}`;
class q extends $t(Pe) {
  constructor() {
    super(...arguments), this.required = !1, this.disabled = !1, this.initialValue = [], this.dateFormat = "DD/MM/YYYY", this.minDate = "", this.maxDate = "", this.mode = "single", this.hasFeedback = !1, this.label = "", this.hintText = "", this.noFlip = !1, this.drop = "down", this.value = "", this.invalid = !1, this.view = "days", this.selectedDateRange = [], this.focusedTabIndex = 3, this.initialDisplayDate = /* @__PURE__ */ new Date(), this._makeInputValueString = (e, t, s) => {
      if (!e && !t)
        return this.value;
      const a = (r) => no(r, as[s].fnsPattern);
      switch (this.mode) {
        case "single": {
          e && (this.value = a(e));
          break;
        }
        case "range": {
          e && t && (this.value = `${a(e)} - ${a(t)}`), e && !t && (this.value = `${a(e)} - ${this.dateFormat}`);
          break;
        }
      }
      return this.value;
    }, this._dialogAriaLabels = {
      days: "Choose date",
      months: "Choose month",
      years: "Choose year"
    };
  }
  isValueEmpty() {
    return this.value === "" || this.value === "DD/MM/YYYY" || this.value === "DD/MM/YYYY - DD/MM/YYYY";
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  async connectedCallback() {
    if (super.connectedCallback(), this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      }
    ], this.addEventListener("sgds-view", this._handleViewChanged), this.addEventListener("sgds-change-calendar", this._handleDateChanged), this.addEventListener("sgds-update-focus", this._handleFocusDateChanged), this.addEventListener("sgds-selectmonth", this._handleSelectMonth), this.addEventListener("sgds-selectyear", this._handleSelectYear), this.addEventListener("sgds-selectdates", this._handleSelectDatesAndClose), this.addEventListener("sgds-selectdates-input", this._handleSelectDatesInput), this.addEventListener("sgds-empty-input", this._handleEmptyInput), this.addEventListener("keydown", this._handleTab), this.addEventListener("sgds-hide", this._handleCloseMenu), this.addEventListener("sgds-show", this._handleOpenMenu), this.addEventListener("blur", this._mixinCheckValidity), this.initialDisplayDate = this.displayDate || /* @__PURE__ */ new Date(), this.initialValue && this.initialValue.length > 0) {
      const e = new RegExp(this._getDateFormatRegex()), t = this.initialValue.filter((s) => !e.test(s));
      if (t.length > 0)
        return console.error("Invalid date format in initialValue:", t);
      {
        const s = this.initialValue.map((a) => ae(va(a, as[this.dateFormat].fnsPattern, /* @__PURE__ */ new Date())));
        this._handleSelectDates(s);
      }
    } else
      this.displayDate = this.initialDisplayDate;
  }
  async firstUpdated() {
    if (super.firstUpdated(), this.menuIsOpen) {
      const e = await this.datepickerInputAsync;
      this.showMenu(), (await this.calendar).focusOnCalendar(e);
    }
  }
  /** @internal */
  _getDateFormatRegex() {
    return this.dateFormat.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace("MM", "\\d{2}").replace("DD", "\\d{2}").replace("YYYY", "\\d{4}").replace("/", "\\/");
  }
  _handleTab(e) {
    if (!this.menuIsOpen)
      return;
    const t = Array(4);
    e.shiftKey && e.key === "Tab" ? (e.preventDefault(), this.focusedTabIndex = (this.focusedTabIndex - 1 + t.length) % t.length) : e.key === "Tab" && (e.preventDefault(), this.focusedTabIndex = (this.focusedTabIndex + 1 + t.length) % t.length);
  }
  _handleValueChange() {
    this.emit("sgds-change-date");
  }
  async _handleCloseMenu() {
    if ((await this.datepickerInputAsync).focus(), this.selectedDateRange.length === 0)
      this.displayDate = this.initialDisplayDate;
    else {
      const t = this.selectedDateRange.length;
      this.displayDate = this.selectedDateRange[t - 1], (await this.calendar)._updateFocusedDate();
    }
  }
  async _handleOpenMenu() {
    const e = await this.calendar, t = await this.datepickerInputAsync;
    e.focusOnCalendar(t);
  }
  _handleSelectDatesInput(e) {
    this._handleSelectDates(e.detail);
  }
  async _handleSelectDates(e) {
    e.sort((a, r) => a.getTime() - r.getTime()), this.displayDate = e[0], this.focusedDate = e[0], this.selectedDateRange = e;
    const t = this._makeInputValueString(this.selectedDateRange[0], this.selectedDateRange[1], this.dateFormat);
    this.value = t, (await this.datepickerInputAsync).updateMaskValue(), this._manageInternalsValid();
  }
  async _handleSelectDatesAndClose(e) {
    await this._handleSelectDates(e.detail), this.mode === "range" && this.selectedDateRange.length === 2 ? this.hideMenu() : this.mode === "single" && this.selectedDateRange.length === 1 && this.hideMenu();
  }
  /** update latest view state from datepicker-header */
  _handleViewChanged(e) {
    this.view = e.detail;
  }
  _handleDateChanged(e) {
    this.displayDate = e.detail;
  }
  _handleFocusDateChanged(e) {
    this.focusedDate = e.detail;
  }
  _handleSelectMonth(e) {
    this.displayDate = e.detail;
  }
  _handleSelectYear(e) {
    this.displayDate = e.detail;
  }
  async _handleInvalidInput() {
    this.selectedDateRange = [], this.displayDate = this.initialDisplayDate, this.invalid = !0, this._manageInternalsBadInput();
  }
  async _handleEmptyInput() {
    this._manageEmptyInput();
  }
  async _resetDatepicker() {
    this.displayDate = this.initialDisplayDate, this.selectedDateRange = [], this.value = "", this.view = "days";
    const e = await this.datepickerInputAsync;
    e.setInvalid(!1), e.destroyInputMask(), await e.applyInputMask(), this._mixinResetValidity(e), this.isValueEmpty() && this.required && this._handleEmptyInput();
  }
  _manageInternalsBadInput() {
    this._mixinSetValidity({
      badInput: !0
    }, "Invalid date input", this.datepickerInput);
  }
  /**
   * Even though element internals handles the required constraint validation. This custom one is still needed as
   * datepicker input has a special case where the default input mask "DD/MM/YYYY" means an empty input.
   * However, the required constraint validation sees "DD/MM/YYYY" as a non-empty input.
   */
  _manageEmptyInput() {
    this._mixinSetValidity({
      valueMissing: !0
    }, "Please fill in this field", this.datepickerInput);
  }
  /**
   * Called when a valid date is entered via input or selected by calendar
   * 1. sets validity state to valid
   * 2. updates invalid prop
   * 3. sets the form value of datepicker
   */
  _manageInternalsValid() {
    this._mixinSetValidity({}), this.invalid = this.datepickerInput.invalid = !1, this._mixinSetFormValue();
  }
  /**
   * Handles the form "reset" event
   */
  async _mixinResetFormControl() {
    this._resetDatepicker();
  }
  async _handleInputMaskChange(e) {
    this.value = e.detail, this.isValueEmpty() && this._resetDatepicker();
  }
  render() {
    return p`
      <div class="datepicker-container">
        <sgds-datepicker-input
          .value=${Gt(this.value)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          placeholder=${this.mode === "single" ? "DD/MM/YYYY" : "DD/MM/YYYY - DD/MM/YYYY"}
          mode=${this.mode}
          invalidFeedback=${C(this.invalidFeedback ? this.invalidFeedback : this._mixinGetValidationMessage())}
          @sgds-mask-input-change=${this._handleInputMaskChange}
          @sgds-invalid-input=${this._handleInvalidInput}
          minDate=${this.minDate}
          maxDate=${this.maxDate}
          label=${this.label}
          hintText=${this.hintText}
          name=${this.name}
          ?invalid=${this.invalid}
          hasFeedback=${C(this.hasFeedback ? "both" : void 0)}
        >
        </sgds-datepicker-input>
        <sgds-icon-button
          ${Ws(this.myDropdown)}
          role="button"
          class=${T({
      "calendar-btn": !0,
      "with-hint-text": this.hintText || this.invalid,
      "with-label": this.label
    })}
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="dialog"
          aria-controls=${this.dropdownMenuId}
          @click=${() => this.toggleMenu()}
          ariaLabel=${this.menuIsOpen ? "Close Calendar" : "Open Calendar"}
          ?disabled=${this.disabled}
          variant="outline"
          name="calendar"
        >
        </sgds-icon-button>
        <ul
          id=${this.dropdownMenuId}
          class="sgds datepicker dropdown-menu"
          role="dialog"
          aria-label=${this._dialogAriaLabels[this.view]}
          @click=${(e) => e.stopPropagation()}
        >
          <sgds-datepicker-header
            .view=${this.view}
            .displayDate=${this.displayDate}
            .focusedDate=${this.focusedDate}
            .selectedDate=${this.selectedDateRange}
            .focusedTabIndex=${this.focusedTabIndex}
          ></sgds-datepicker-header>
          <sgds-datepicker-calendar
            .show=${this.menuIsOpen}
            .view=${this.view}
            .displayDate=${this.displayDate}
            .mode=${this.mode}
            minDate=${this.minDate}
            maxDate=${this.maxDate}
            .selectedDate=${this.selectedDateRange}
            .focusedTabIndex=${this.focusedTabIndex}
          ></sgds-datepicker-calendar>
        </ul>
      </div>
    `;
  }
}
q.styles = [...Pe.styles, Gs, Zu];
q.dependencies = {
  "sgds-datepicker-input": ws,
  "sgds-datepicker-calendar": le,
  "sgds-datepicker-header": ot,
  "sgds-button": be,
  "sgds-icon-button": Et
};
o([
  c({ type: Boolean, reflect: !0 })
], q.prototype, "required", void 0);
o([
  c({ reflect: !0 })
], q.prototype, "name", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], q.prototype, "disabled", void 0);
o([
  c({ type: Array, reflect: !0 })
], q.prototype, "initialValue", void 0);
o([
  c({ type: String })
], q.prototype, "minDate", void 0);
o([
  c({ type: String })
], q.prototype, "maxDate", void 0);
o([
  c({ type: String, reflect: !0 })
], q.prototype, "mode", void 0);
o([
  c({ type: String, reflect: !0 })
], q.prototype, "invalidFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], q.prototype, "hasFeedback", void 0);
o([
  c({ reflect: !0 })
], q.prototype, "label", void 0);
o([
  c({ reflect: !0 })
], q.prototype, "hintText", void 0);
o([
  c({ type: Boolean, reflect: !0, state: !1 })
], q.prototype, "noFlip", void 0);
o([
  c({ type: String, reflect: !0, state: !1 })
], q.prototype, "drop", void 0);
o([
  c({ attribute: !1 })
], q.prototype, "displayDate", void 0);
o([
  R()
], q.prototype, "value", void 0);
o([
  R()
], q.prototype, "invalid", void 0);
o([
  R()
], q.prototype, "view", void 0);
o([
  R()
], q.prototype, "selectedDateRange", void 0);
o([
  R()
], q.prototype, "focusedDate", void 0);
o([
  R()
], q.prototype, "focusedTabIndex", void 0);
o([
  bt("sgds-datepicker-calendar")
], q.prototype, "calendar", void 0);
o([
  bt("sgds-datepicker-input")
], q.prototype, "datepickerInputAsync", void 0);
o([
  F("sgds-datepicker-input")
], q.prototype, "datepickerInput", void 0);
o([
  O("value")
], q.prototype, "_handleValueChange", null);
A("sgds-datepicker", q);
var Xu = b`:host([bordered]) .container{border:var(--sgds-border-width-1) solid var(--sgds-border-color-muted);border-radius:var(--sgds-border-radius-md)}.container{display:flex;flex-direction:column}.title{color:var(--sgds-header-color-default);font-size:var(--sgds-font-size-4);font-weight:var(--sgds-font-weight-semibold);letter-spacing:var(--sgds-letter-spacing-tight);line-height:var(--sgds-line-height-heading)}.description{color:var(--sgds-color-subtle);font-size:var(--sgds-font-size-2);font-weight:var(--sgds-font-weight-regular);line-height:var(--sgds-line-height-body)}.header{border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-muted);display:flex;flex-direction:column;gap:var(--sgds-gap-xs);padding:var(--sgds-padding-lg) var(--sgds-padding-xl)}`;
class wo {
  constructor(e, ...t) {
    this.slotNames = [], (this.host = e).addController(this), this.slotNames = t, this.handleSlotChange = this.handleSlotChange.bind(this);
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((e) => {
      var t;
      if (e.nodeType === e.TEXT_NODE && ((t = e.textContent) === null || t === void 0 ? void 0 : t.trim()) !== "")
        return !0;
      if (e.nodeType === e.ELEMENT_NODE) {
        const s = e;
        if (s.tagName.toLowerCase() === "sl-visually-hidden")
          return !1;
        if (!s.hasAttribute("slot"))
          return !0;
      }
      return !1;
    });
  }
  hasNamedSlot(e) {
    return this.host.querySelector(`:scope > [slot="${e}"]`) !== null;
  }
  test(e) {
    return e === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(e);
  }
  hostConnected() {
    var e;
    (e = this.host.shadowRoot) === null || e === void 0 || e.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    var e;
    (e = this.host.shadowRoot) === null || e === void 0 || e.removeEventListener("slotchange", this.handleSlotChange);
  }
  handleSlotChange(e) {
    const t = e.target;
    (this.slotNames.includes("[default]") && !t.name || t.name && this.slotNames.includes(t.name)) && this.host.requestUpdate();
  }
}
class Js extends f {
  constructor() {
    super(...arguments), this.bordered = !1, this.stacked = !1, this.hasSlotController = new wo(this, "title", "description");
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "list"), this.updateComplete.then(() => {
      this._updateDescriptionLists();
    });
  }
  _updateDescriptionLists() {
    this._descriptionLists && this._descriptionLists.forEach((e, t) => {
      this.stacked ? e.setAttribute("stacked", "") : e.removeAttribute("stacked"), this.bordered ? e.setAttribute("bordered", "") : e.removeAttribute("bordered"), t === this._descriptionLists.length - 1 && e.setAttribute("isLastChild", "");
    });
  }
  updated(e) {
    e.has("stacked") && this._updateDescriptionLists(), e.has("bordered") && this._updateDescriptionLists();
  }
  render() {
    const e = this.hasSlotController.test("title"), t = this.hasSlotController.test("description");
    return p`
      <div class="container" part="base">
        ${e || t ? p`
              <div class="header">
                ${e ? p` <div class="title">
                      <slot name="title"></slot>
                    </div>` : E}
                ${t ? p`
                      <div class="description">
                        <slot name="description"></slot>
                      </div>
                    ` : E}
              </div>
            ` : E}
        <div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
Js.styles = [...f.styles, Xu];
o([
  c({ type: Boolean, reflect: !0 })
], Js.prototype, "bordered", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Js.prototype, "stacked", void 0);
o([
  ve({ flatten: !0 })
], Js.prototype, "_descriptionLists", void 0);
var Qu = b`:host([bordered][islastchild]) .container:last-child{border-bottom:none}:host([stacked]) .container{align-items:flex-start;flex-direction:column;gap:var(--sgds-gap-xs);justify-content:flex-start}.container{align-items:flex-start;border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-muted);display:flex;gap:var(--sgds-gap-xs);justify-content:space-between;padding:var(--sgds-padding-lg) var(--sgds-padding-xl)}.data-container,.label-container{flex:1}.label{color:var(--sgds-color-default);font-weight:var(--sgds-font-weight-semibold)}.data,.label{font-size:var(--sgds-font-size-2)}.data{color:var(--sgds-color-subtle);font-weight:var(--sgds-font-weight-regular);margin:0}`;
let Ju = 0;
class Oi extends f {
  constructor() {
    super(...arguments), this.attrId = ++Ju, this.componentId = `sgds-description-list-${this.attrId}`, this.stacked = !1, this.bordered = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.id = this.id.length > 0 ? this.id : this.componentId, this.setAttribute("role", "listitem");
  }
  render() {
    return p`
      <div class="container" part="container">
        <div class="label-container" part="label-container">
          <span class="label" part="label">
            <slot></slot>
          </span>
        </div>
        <div class="data-container" part="data-container">
          <span class="data" part="data">
            <slot name="data"></slot>
          </span>
        </div>
      </div>
    `;
  }
}
Oi.styles = [...f.styles, Qu];
o([
  c({ type: Boolean, reflect: !0 })
], Oi.prototype, "stacked", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Oi.prototype, "bordered", void 0);
A("sgds-description-list", Oi);
A("sgds-description-list-group", Js);
var ep = b`:host{--container-size:8px}:host([orientation=horizontal]){border-top:var(--border-width) solid var(--sgds-border-color-muted);display:block;margin:calc((var(--container-size) - var(--border-width))/2) 0;width:100%}:host([orientation=vertical]){border-left:var(--border-width) solid var(--sgds-border-color-muted);display:inline-block;height:100%;margin:0 calc((var(--container-size) - var(--border-width))/2)}:host([thickness=thin]){--border-width:var(--sgds-border-width-1)}:host([thickness=thick]){--border-width:var(--sgds-border-width-2)}:host([thickness=thicker]){--border-width:var(--sgds-border-width-4)}`;
class Li extends f {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.thickness = "thin";
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "separator"), this.setAttribute("aria-orientation", this.orientation);
  }
}
Li.styles = [ep];
o([
  c({ type: String, reflect: !0 })
], Li.prototype, "orientation", void 0);
o([
  c({ type: String, reflect: !0 })
], Li.prototype, "thickness", void 0);
A("sgds-divider", Li);
const ya = /* @__PURE__ */ new Set();
function Ls(i) {
  ya.add(i), document.body.classList.add("sl-scroll-lock");
}
function Ps(i) {
  ya.delete(i), ya.size === 0 && document.body.classList.remove("sl-scroll-lock");
}
var tp = b`:host{display:contents}.drawer{height:100%;inset-inline-start:0;overflow:hidden;pointer-events:none;top:0;width:100%}.drawer-fixed{position:fixed;z-index:1100}.drawer-panel{background-color:var(--sgds-surface-default);display:flex;flex-direction:column;gap:var(--sgds-gap-2-xl);max-height:100%;max-width:100%;overflow:auto;padding:var(--sgds-padding-4-xl) var(--sgds-padding-3-xl);pointer-events:all;position:absolute;z-index:2}.drawer-panel:focus{outline:none}.drawer-top .drawer-panel{bottom:auto;height:var(--sgds-dimension-512);inset-inline-end:auto;inset-inline-start:0;top:0;width:100%}.drawer-end .drawer-panel{bottom:auto;height:100%;inset-inline-end:0;inset-inline-start:auto;top:0;width:var(--sgds-dimension-512)}.drawer-bottom .drawer-panel{bottom:0;height:var(--sgds-dimension-512);inset-inline-end:auto;inset-inline-start:0;top:auto;width:100%}.drawer-start .drawer-panel{bottom:auto;height:100%;inset-inline-end:auto;inset-inline-start:0;top:0;width:var(--sgds-dimension-512)}.drawer-header{display:flex;flex-direction:column;gap:var(--sgds-gap-sm)}slot[name=title]::slotted(*){--sgds-margin-2-xs:var(--sgds-margin-none);--sgds-font-size-6:var(--sgds-font-size-4);color:var(--sgds-color-default)!important;font-size:var(--sgds-font-size-6,var(--sgds-font-size-4));margin-bottom:var(--sgds-margin-2-xs,var(--sgds-margin-none))}slot[name=description]::slotted(*){--sgds-paragraph-spacing-xl:var(--sgds-margin-none);color:var(--sgds-color-subtle);margin-bottom:var(--sgds-paragraph-spacing-xl,var(--sgds-margin-none))}sgds-close-button{position:absolute;right:32px;top:32px}.drawer-body{-webkit-overflow-scrolling:touch;display:block;flex:1 1 auto;overflow:auto}.drawer-overlay{background-color:var(--sgds-bg-overlay);bottom:0;display:block;left:0;pointer-events:all;position:fixed;right:0;top:0}.drawer-contained .drawer-overlay{display:none}@media screen and (max-width:768px){.drawer-panel{padding:var(--sgds-padding-3-xl) var(--sgds-padding-lg)}sgds-close-button{right:20px;top:20px}}`;
class ze extends f {
  constructor() {
    super(...arguments), this.open = !1, this.placement = "end", this.contained = !1, this.handleDocumentKeyDown = (e) => {
      this.open && !this.contained && e.key === "Escape" && (e.stopPropagation(), this.requestClose("keyboard"));
    };
  }
  firstUpdated() {
    this.drawer.hidden = !this.open, this.open && (this.addOpenListeners(), this.contained || Ls(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Ps(this);
  }
  uppercaseFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  requestClose(e) {
    if (this.emit("sgds-request-close", {
      cancelable: !0,
      detail: { source: e }
    }).defaultPrevented) {
      const s = de(this, "drawer.denyClose");
      oe(this.panel, s.keyframes, s.options);
      return;
    }
    this.hide();
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sgds-show"), this.addOpenListeners(), this.originalTrigger = document.activeElement, this.contained || Ls(this);
      const e = this.querySelector("[autofocus]");
      e && e.removeAttribute("autofocus"), await Promise.all([ye(this.drawer), ye(this.overlay)]), this.drawer.hidden = !1, requestAnimationFrame(() => {
        this.emit("sgds-initial-focus", { cancelable: !0 }).defaultPrevented || (e ? e.focus({ preventScroll: !0 }) : this.panel.focus({ preventScroll: !0 })), e && e.setAttribute("autofocus", "");
      });
      const t = de(this, `drawer.show${this.uppercaseFirstLetter(this.placement)}`), s = de(this, "drawer.overlay.show");
      await Promise.all([
        oe(this.panel, t.keyframes, t.options),
        oe(this.overlay, s.keyframes, s.options)
      ]), this.emit("sgds-after-show");
    } else {
      this.emit("sgds-hide"), this.removeOpenListeners(), this.contained || Ps(this), await Promise.all([ye(this.drawer), ye(this.overlay)]);
      const e = de(this, `drawer.hide${this.uppercaseFirstLetter(this.placement)}`), t = de(this, "drawer.overlay.hide");
      await Promise.all([
        oe(this.overlay, t.keyframes, t.options).then(() => {
          this.overlay.hidden = !0;
        }),
        oe(this.panel, e.keyframes, e.options).then(() => {
          this.panel.hidden = !0;
        })
      ]), this.drawer.hidden = !0, this.overlay.hidden = !1, this.panel.hidden = !1;
      const s = this.originalTrigger;
      typeof (s == null ? void 0 : s.focus) == "function" && setTimeout(() => s.focus()), this.emit("sgds-after-hide");
    }
  }
  handleNoModalChange() {
    this.open && !this.contained && Ls(this), this.open && this.contained && Ps(this);
  }
  /** Shows the drawer. */
  async show() {
    if (!this.open)
      return this.open = !0, Le(this, "sgds-after-show");
  }
  /** Hides the drawer */
  async hide() {
    if (this.open)
      return this.open = !1, Le(this, "sgds-after-hide");
  }
  render() {
    return p`
      <div
        class=${T({
      drawer: !0,
      "drawer-open": this.open,
      "drawer-top": this.placement === "top",
      "drawer-end": this.placement === "end",
      "drawer-bottom": this.placement === "bottom",
      "drawer-start": this.placement === "start",
      "drawer-contained": this.contained,
      "drawer-fixed": !this.contained
    })}
      >
        <div class="drawer-overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          class="drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          tabindex="0"
        >
          <header class="drawer-header">
            <slot name="title"></slot>
            <slot name="description"></slot>
            <sgds-close-button
              class="drawer-close"
              aria-label="close drawer"
              @click="${() => this.requestClose("close-button")}"
            ></sgds-close-button>
          </header>
          <slot class="drawer-body"></slot>
        </div>
      </div>
    `;
  }
}
ze.styles = [...f.styles, tp];
ze.dependencies = {
  "sgds-close-button": Ze
};
o([
  F(".drawer")
], ze.prototype, "drawer", void 0);
o([
  F(".drawer-panel")
], ze.prototype, "panel", void 0);
o([
  F(".drawer-overlay")
], ze.prototype, "overlay", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ze.prototype, "open", void 0);
o([
  c({ type: String, reflect: !0 })
], ze.prototype, "placement", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ze.prototype, "contained", void 0);
o([
  O("open", { waitUntilFirstUpdate: !0 })
], ze.prototype, "handleOpenChange", null);
o([
  O("contained", { waitUntilFirstUpdate: !0 })
], ze.prototype, "handleNoModalChange", null);
G("drawer.showTop", {
  keyframes: [
    { opacity: 0, translate: "0 -100%" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.hideTop", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 -100%" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.showEnd", {
  keyframes: [
    { opacity: 0, translate: "100%" },
    { opacity: 1, translate: "0" }
  ],
  rtlKeyframes: [
    { opacity: 0, translate: "-100%" },
    { opacity: 1, translate: "0" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.hideEnd", {
  keyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "100%" }
  ],
  rtlKeyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "-100%" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.showBottom", {
  keyframes: [
    { opacity: 0, translate: "0 100%" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.hideBottom", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 100%" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.showStart", {
  keyframes: [
    { opacity: 0, translate: "-100%" },
    { opacity: 1, translate: "0" }
  ],
  rtlKeyframes: [
    { opacity: 0, translate: "100%" },
    { opacity: 1, translate: "0" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.hideStart", {
  keyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "-100%" }
  ],
  rtlKeyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "100%" }
  ],
  options: { duration: 250, easing: "ease" }
});
G("drawer.denyClose", {
  keyframes: [{ scale: 1 }, { scale: 1.01 }, { scale: 1 }],
  options: { duration: 250 }
});
G("drawer.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
G("drawer.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});
A("sgds-drawer", ze);
A("sgds-dropdown", rt);
A("sgds-dropdown-item", Ct);
var sp = b`.file-upload{display:flex;flex-direction:column;gap:var(--sgds-form-gap-2-xl)}.file-upload-container{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}.file-upload-list{display:flex;flex-direction:column;gap:var(--sgds-form-gap-xl);list-style-type:none}.file-upload-list-item{align-items:center;background-color:var(--sgds-form-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-muted);border-radius:var(--sgds-form-border-radius-md);display:flex;gap:var(--sgds-form-gap-lg);padding:var(--sgds-form-padding-y) var(--sgds-form-padding-x)}.file-upload-list-item span:not(:first-of-type){cursor:pointer}ul{margin:0;padding:0}input{display:none}label,sgds-button{cursor:pointer}sgds-close-button{margin-left:auto}sgds-icon.valid{color:var(--sgds-form-success-color-default)}sgds-icon.invalid{color:var(--sgds-color-muted)}`;
class Xe extends $t(ce) {
  constructor() {
    super(...arguments), this.multiple = !1, this.accept = "", this.hasFeedback = !1, this.required = !1, this.selectedFiles = [], this.inputRef = $a();
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  /**
   * Returns files selected for upload
   */
  get files() {
    return this.selectedFiles;
  }
  _setFileList(e) {
    this.emit("sgds-files-selected", { detail: e });
  }
  _handleClick(e) {
    e.preventDefault(), this.disabled || this.inputRef.value.click();
  }
  _handleChange(e) {
    const s = e.target.files;
    s.length > 0 && (this.selectedFiles = Array.from(s)), this._setFileList(s), this.requestUpdate(), super._mixinHandleChange(e);
  }
  _removeFileHandler(e) {
    const t = this.inputRef.value, s = t.files, a = new DataTransfer();
    for (let r = 0; r < s.length; r++)
      e !== r && a.items.add(s[r]);
    t.files = a.files, this._setFileList(a.files), this.selectedFiles = Array.from(a.files), this.requestUpdate(), this._mixinValidate(this.input);
  }
  _clearAllFiles() {
    const e = this.inputRef.value, t = new DataTransfer();
    e.files = t.files, this._setFileList(t.files), this.selectedFiles = Array.from(t.files);
  }
  /**
   * fileupload requries a custom _mixinResetFormControl for clearing files
   */
  _mixinResetFormControl() {
    this._clearAllFiles(), this._mixinResetValidity(this.input);
  }
  _handleDisabledChange() {
    this.setInvalid(!1);
  }
  _renderLabel() {
    const e = p`
      <label for=${this._controlId} id=${this._labelId} class="form-label"> ${this.label} </label>
    `;
    return this.label && e;
  }
  _renderHintText() {
    const e = p` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  _renderFeedback() {
    return p`
      <div class="invalid-feedback-container">
        <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
        <div id="${this._controlId}-invalid" class="invalid-feedback">
          ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
        </div>
      </div>
    `;
  }
  render() {
    const e = () => p`<sgds-icon name="check-circle-fill" class="${this.invalid ? "invalid" : "valid"}"></sgds-icon>`, t = this.selectedFiles.map((s, a) => p`
        <li key=${a} class="file-upload-list-item">
          ${e()}
          <span class="filename">${s.name}</span>
          <sgds-close-button
            aria-label="remove the file"
            @click=${() => this._removeFileHandler(a)}
          ></sgds-close-button>
        </li>
      `);
    return p`
      <div class="file-upload">
        <input
          ${Ws(this.inputRef)}
          type="file"
          @change=${this._handleChange}
          ?multiple=${this.multiple}
          accept=${this.accept}
          id=${this._controlId}
          ?required=${this.required}
          ?disabled=${this.disabled}
        />
        <div class="file-upload-container">
          ${this._renderLabel()}
          <sgds-button variant="outline" ?disabled=${this.disabled} @click=${this._handleClick}>
            <label for=${this._controlId}><slot></slot></label>
            <sgds-icon slot="rightIcon" name="upload"></sgds-icon>
          </sgds-button>
          ${this.hasFeedback && this.invalid ? this._renderFeedback() : this._renderHintText()}
        </div>
        <ul class="file-upload-list">
          ${t}
        </ul>
      </div>
    `;
  }
}
Xe.styles = [...ce.styles, sp];
Xe.dependencies = {
  "sgds-button": be,
  "sgds-close-button": Ze,
  "sgds-icon": re
};
o([
  c({ type: Boolean, reflect: !0 })
], Xe.prototype, "multiple", void 0);
o([
  c({ type: String, reflect: !0 })
], Xe.prototype, "accept", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Xe.prototype, "hasFeedback", void 0);
o([
  c({ type: String, reflect: !0 })
], Xe.prototype, "invalidFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Xe.prototype, "required", void 0);
o([
  R()
], Xe.prototype, "selectedFiles", void 0);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], Xe.prototype, "_handleDisabledChange", null);
A("sgds-file-upload", Xe);
var ip = b`.footer{container:footer/inline-size;height:auto}.footer-top{background-color:var(--sgds-bg-fixed-dark);border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-default);gap:var(--sgds-gap-md);padding:var(--sgds-padding-xl) var(--sgds-padding-2-xl)}.footer-header,.footer-top{display:flex;flex-direction:column}.footer-header{gap:var(--sgds-gap-xs);margin:var(--sgds-margin-3-xs) 0}slot[name=title]::slotted(*){--sgds-header-color-default:var(--sgds-color-fixed-light);--sgds-font-size-6:var(--sgds-font-size-5);--sgds-margin-2-xs:var(--sgds-margin-none);color:var(--sgds-header-color-default,--sgds-color-fixed-light);font-size:var(--sgds-font-size-6,--sgds-font-size-5);font-weight:var(--sgds-font-weight-bold);letter-spacing:var(--sgds-letter-spacing-tight);line-height:var(--sgds-line-height-heading);margin-bottom:var(--sgds-margin-2-xs,--sgds-margin-none);margin-top:var(--sgds-margin-none)}slot[name=description]::slotted(*){--sgds-font-size-2:var(--sgds-font-size-3);--sgds-paragraph-spacing-xl:var(--sgds-margin-none);color:var(--sgds-color-fixed-light);font-size:var(--sgds-font-size-2,--sgds-font-size-3);margin-bottom:var(--sgds-paragraph-spacing-xl,--sgds-margin-none);margin-top:var(--sgds-margin-none)}.footer-items{display:grid;gap:var(--sgds-gap-md) var(--sgds-gap-lg);grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}.footer ul{margin:0;padding:0}.footer ul li{list-style-type:none}.footer-mandatory-links ul li a{text-decoration:none}.footer-mandatory-links ul li a,.footer-mandatory-links ul li a:focus,.footer-mandatory-links ul li a:hover{color:var(--sgds-color-fixed-light)}.footer-mandatory-links ul li a:focus,.footer-mandatory-links ul li a:focus-visible{box-shadow:var(--sgds-box-shadow-focus);outline:0}.footer-bottom{background-color:var(--sgds-bg-fixed-dark);display:flex;flex-direction:column;gap:var(--sgds-gap-md);padding:var(--sgds-padding-xl) var(--sgds-padding-2-xl)}.social-media{display:flex;gap:var(--sgds-gap-sm)}slot[name=social-media]::slotted(a){--sgds-link-color-default:var(--sgds-color-fixed-light);--sgds-body-color-default:var(--sgds-color-fixed-light);color:var(--sgds-body-color-default,--sgds-link-color-default);display:inline-flex}slot[name=social-media]::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-color-fixed-light);color:var(--sgds-link-color-emphasis)}slot[name=social-media]::slotted(a:focus),slot[name=social-media]::slotted(a:focus-visible){--sgds-link-color-emphasis:var(--sgds-color-fixed-light);box-shadow:var(--sgds-box-shadow-focus);color:var(--sgds-link-color-emphasis);outline:0}.footer-mandatory-links{display:flex;flex-wrap:wrap;gap:var(--sgds-gap-xl) var(--sgds-gap-lg);justify-content:space-between}.footer-mandatory-links ul{display:flex;flex-wrap:wrap;gap:var(--sgds-gap-xs) var(--sgds-gap-xl)}.footer-copyrights{color:var(--sgds-color-fixed-light)}@container footer (max-width: 711px){.footer-bottom,.footer-top{padding:var(--sgds-padding-lg)}.footer-top{gap:var(--sgds-gap-lg)}.footer-mandatory-links,.footer-mandatory-links ul{flex-direction:column}}`;
class At extends f {
  constructor() {
    super(...arguments), this.copyrightLiner = "Government of Singapore", this.contactHref = "#", this.feedbackHref = "#", this.faqHref = "#", this.privacyHref = "#", this.termsOfUseHref = "#";
  }
  firstUpdated() {
    const e = this.shadowRoot.querySelector("slot[name='social-media']"), t = this.shadowRoot.querySelector("slot[name='title']"), s = this.shadowRoot.querySelector("slot[name='description']"), a = this.shadowRoot.querySelector("slot[name='items']"), r = e.assignedNodes({ flatten: !0 }), n = t.assignedNodes({ flatten: !0 }), d = s.assignedNodes({ flatten: !0 }), l = a.assignedNodes({ flatten: !0 });
    if (r.length === 0) {
      const h = this.shadowRoot.querySelector(".social-media");
      h.style.display = "none";
    }
    if (n.length === 0 && d.length === 0) {
      const h = this.shadowRoot.querySelector(".footer-header");
      h.style.display = "none";
    }
    if (l.length === 0) {
      const h = this.shadowRoot.querySelector(".footer-items");
      h.style.display = "none";
    }
    if (n.length === 0 && d.length === 0 && l.length === 0) {
      const h = this.shadowRoot.querySelector(".footer-top");
      h.style.display = "none";
    }
  }
  render() {
    return p`
      <footer class="footer">
        <section class="footer-top">
          <div class="footer-header">
            <slot name="title"></slot>
            <slot name="description"></slot>
          </div>
          <div class="footer-items">
            <slot name="items"></slot>
          </div>
        </section>
        <section class="footer-bottom">
          <div class="social-media">
            <slot name="social-media"></slot>
          </div>
          <div class="footer-mandatory-links">
            <ul>
              <li><a href=${this.contactHref}>Contact</a></li>
              <li><a href=${this.feedbackHref}>Feedback</a></li>
              <li><a href=${this.faqHref}>FAQ</a></li>
              <li>
                <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer">
                  Report Vulnerability
                </a>
              </li>
              <li><a href=${this.privacyHref}>Privacy Statement</a></li>
              <li><a href=${this.termsOfUseHref}>Terms of use</a></li>
            </ul>
            <div class="footer-copyrights">© ${(/* @__PURE__ */ new Date()).getFullYear()}, ${this.copyrightLiner}</div>
          </div>
        </section>
      </footer>
    `;
  }
}
At.styles = [...f.styles, ip];
o([
  c({ type: String })
], At.prototype, "copyrightLiner", void 0);
o([
  c({ type: String })
], At.prototype, "contactHref", void 0);
o([
  c({ type: String })
], At.prototype, "feedbackHref", void 0);
o([
  c({ type: String })
], At.prototype, "faqHref", void 0);
o([
  c({ type: String })
], At.prototype, "privacyHref", void 0);
o([
  c({ type: String })
], At.prototype, "termsOfUseHref", void 0);
var ap = b`.footer-item{margin-bottom:var(--sgds-margin-3-xs)}.footer-item,.links{display:flex;flex-direction:column;gap:var(--sgds-gap-xs)}slot[name=title]::slotted(*){--sgds-paragraph-spacing-xl:var(--sgds-margin-none);--sgds-font-weight-regular:var(--sgds-font-weight-semibold);color:var(--sgds-color-fixed-light);font-weight:var(--sgds-font-weight-regular,--sgds-font-weight-semibold);margin:var(--sgds-paragraph-spacing-xl,--sgds-margin-none)}.links{margin:0;padding:0}.links slot::slotted(a){--sgds-link-color-default:var(--sgds-color-fixed-light);color:var(--sgds-link-color-default,--sgds-fixed-light);text-decoration:none!important;width:fit-content}.links slot::slotted(a[target=_blank]){align-items:center;display:flex;gap:var(--sgds-gap-2-xs);justify-content:center}.links slot::slotted(a:focus),.links slot::slotted(a:focus-visible),slot::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-color-fixed-light);color:var(--sgds-link-color-emphasis,--sgds-color-fixed-light)}.links slot::slotted(a:focus),.links slot::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus);outline:0}`;
class ko extends f {
  render() {
    return p`
      <div class="footer-item">
        <slot name="title"></slot>
        <div class="links">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
ko.styles = [...f.styles, ap];
A("sgds-footer", At);
A("sgds-footer-item", ko);
A("sgds-icon", re);
A("sgds-icon-button", Et);
var rp = b`slot{display:flex;flex-direction:column;gap:var(--sgds-gap-xs)}slot::slotted(*){align-items:center;display:flex;gap:var(--sgds-gap-xs)}.sm{font-size:var(--sgds-font-size-1)}.lg{font-size:var(--sgds-font-size-3)}`;
class Pi extends f {
  constructor() {
    super(...arguments), this.role = "list", this.size = "md";
  }
  render() {
    return p`
      <div class=${T({ [this.size]: this.size })}>
        <slot></slot>
      </div>
    `;
  }
}
Pi.styles = [...f.styles, rp];
o([
  c({ type: String, reflect: !0 })
], Pi.prototype, "role", void 0);
o([
  c({ type: String, reflect: !0 })
], Pi.prototype, "size", void 0);
A("sgds-icon-list", Pi);
A("sgds-input", U);
A("sgds-link", Xs);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let xo = class extends Event {
  constructor(e, t, s, a) {
    super("context-request", { bubbles: !0, composed: !0 }), this.context = e, this.contextTarget = t, this.callback = s, this.subscribe = a ?? !1;
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Hr = class {
  constructor(e, t, s, a) {
    if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (r, n) => {
      this.unsubscribe && (this.unsubscribe !== n && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = r, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(r, n)), this.unsubscribe = n;
    }, this.host = e, t.context !== void 0) {
      const r = t;
      this.context = r.context, this.callback = r.callback, this.subscribe = r.subscribe ?? !1;
    } else this.context = t, this.callback = s, this.subscribe = a ?? !1;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new xo(this.context, this.host, this.t, this.subscribe));
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class np {
  get value() {
    return this.o;
  }
  set value(e) {
    this.setValue(e);
  }
  setValue(e, t = !1) {
    const s = t || !Object.is(e, this.o);
    this.o = e, s && this.updateObservers();
  }
  constructor(e) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [t, { disposer: s }] of this.subscriptions) t(this.o, s);
    }, e !== void 0 && (this.value = e);
  }
  addCallback(e, t, s) {
    if (!s) return void e(this.value);
    this.subscriptions.has(e) || this.subscriptions.set(e, { disposer: () => {
      this.subscriptions.delete(e);
    }, consumerHost: t });
    const { disposer: a } = this.subscriptions.get(e);
    e(this.value, a);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let op = class extends Event {
  constructor(e, t) {
    super("context-provider", { bubbles: !0, composed: !0 }), this.context = e, this.contextTarget = t;
  }
}, Yr = class extends np {
  constructor(e, t, s) {
    var a, r;
    super(t.context !== void 0 ? t.initialValue : s), this.onContextRequest = (n) => {
      if (n.context !== this.context) return;
      const d = n.contextTarget ?? n.composedPath()[0];
      d !== this.host && (n.stopPropagation(), this.addCallback(n.callback, d, n.subscribe));
    }, this.onProviderRequest = (n) => {
      if (n.context !== this.context || (n.contextTarget ?? n.composedPath()[0]) === this.host) return;
      const d = /* @__PURE__ */ new Set();
      for (const [l, { consumerHost: h }] of this.subscriptions) d.has(l) || (d.add(l), h.dispatchEvent(new xo(this.context, h, l, !0)));
      n.stopPropagation();
    }, this.host = e, t.context !== void 0 ? this.context = t.context : this.context = t, this.attachListeners(), (r = (a = this.host).addController) == null || r.call(a, this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new op(this.context, this.host));
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dp({ context: i }) {
  return (e, t) => {
    const s = /* @__PURE__ */ new WeakMap();
    if (typeof t == "object") return { get() {
      return e.get.call(this);
    }, set(a) {
      return s.get(this).setValue(a), e.set.call(this, a);
    }, init(a) {
      return s.set(this, new Yr(this, { context: i, initialValue: a })), a;
    } };
    {
      e.constructor.addInitializer((n) => {
        s.set(n, new Yr(n, { context: i }));
      });
      const a = Object.getOwnPropertyDescriptor(e, t);
      let r;
      if (a === void 0) {
        const n = /* @__PURE__ */ new WeakMap();
        r = { get() {
          return n.get(this);
        }, set(d) {
          s.get(this).setValue(d), n.set(this, d);
        }, configurable: !0, enumerable: !0 };
      } else {
        const n = a.set;
        r = { ...a, set(d) {
          s.get(this).setValue(d), n == null || n.call(this, d);
        } };
      }
      return void Object.defineProperty(e, t, r);
    }
  };
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function lp({ context: i, subscribe: e }) {
  return (t, s) => {
    typeof s == "object" ? s.addInitializer(function() {
      new Hr(this, { context: i, callback: (a) => {
        t.set.call(this, a);
      }, subscribe: e });
    }) : t.constructor.addInitializer((a) => {
      new Hr(a, { context: i, callback: (r) => {
        a[s] = r;
      }, subscribe: e });
    });
  };
}
const cp = 992, hp = 768, up = 576, pp = 1200, gp = 1400;
var fp = b`nav{background-color:var(--sgds-surface-default);box-shadow:0 2px 2px 0 hsla(0,0%,5%,.08)}.navbar{align-items:stretch;display:flex;flex-wrap:wrap;gap:var(--sgds-gap-xs);justify-content:space-between;margin:auto;max-width:var(--sgds-mainnav-max-width);min-height:80px;padding:0 var(--sgds-mainnav-padding-x);position:relative;width:100%}@media screen and (max-width:768px){.navbar{padding:0 var(--sgds-mainnav-mobile-padding-x)}}.navbar-brand{align-items:center;display:flex;text-decoration:none;white-space:nowrap}.navbar-brand:focus,.navbar-brand:focus-visible{box-shadow:var(--sgds-box-shadow-focus);outline:0}.navbar-nav{display:flex;flex-direction:column;height:100%;margin-bottom:0;margin-top:0;width:100%}nav>.navbar-body{background-color:var(--sgds-surface-default);border-top:var(--sgds-border-width-1) solid var(--sgds-border-color-translucent);bottom:0;box-shadow:0 2px 2px 0 hsla(0,0%,5%,.08);padding:var(--sgds-padding-md) 0;position:absolute;transition:transform .2s ease-in-out;width:100%;z-index:2000}nav>.navbar-body slot::slotted(:not(sgds-mainnav-item):not(sgds-mainnav-dropdown)){padding:var(--sgds-padding-sm) var(--sgds-mainnav-padding-x)}@media screen and (max-width:768px){nav>.navbar-body slot::slotted(:not(sgds-mainnav-item):not(sgds-mainnav-dropdown)){padding:var(--sgds-padding-sm) var(--sgds-mainnav-mobile-padding-x)}}.navbar-collapse{align-items:center;flex-basis:100%;flex-grow:1}.navbar-toggler{align-self:center}@media (prefers-reduced-motion:reduce){.navbar-toggler{transition:none}}.navbar-nav-scroll{overflow-y:auto}@media (min-width:576px){.navbar-expand-sm{flex-wrap:nowrap;gap:var(--sgds-gap-xl);justify-content:flex-start}.navbar-expand-sm .navbar-nav{flex-direction:row}.navbar-expand-sm .navbar-nav-scroll{overflow:visible}.navbar-expand-sm .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-sm .navbar-toggler{display:none}}@media (min-width:768px){.navbar-expand-md{flex-wrap:nowrap;gap:var(--sgds-gap-xl);justify-content:flex-start}.navbar-expand-md .navbar-nav{flex-direction:row}.navbar-expand-md .navbar-nav-scroll{overflow:visible}.navbar-expand-md .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-md .navbar-toggler{display:none}}@media (min-width:992px){.navbar-expand-lg{flex-wrap:nowrap;gap:var(--sgds-gap-xl);justify-content:flex-start}.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav-scroll{overflow:visible}.navbar-expand-lg .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-lg .navbar-toggler{display:none}}@media (min-width:1200px){.navbar-expand-xl{flex-wrap:nowrap;gap:var(--sgds-gap-xl);justify-content:flex-start}.navbar-expand-xl .navbar-nav .nav-link{padding-left:var(--mainnav-nav-link-padding-x);padding-right:var(--mainnav-nav-link-padding-x)}.navbar-expand-xl .navbar-nav-scroll{overflow:visible}.navbar-expand-xl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xl .navbar-toggler{display:none}}@media (min-width:1400px){.navbar-expand-xxl{flex-wrap:nowrap;gap:var(--sgds-gap-xl);justify-content:flex-start}.navbar-expand-xxl .navbar-nav{flex-direction:row}.navbar-expand-xxl .navbar-nav-scroll{overflow:visible}.navbar-expand-xxl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xxl .navbar-toggler{display:none}}.navbar-expand{flex-wrap:nowrap;gap:var(--sgds-gap-xl);justify-content:flex-start}.navbar-expand .navbar-nav{flex-direction:row}.navbar-expand .navbar-nav-scroll{overflow:visible}.navbar-expand .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand .navbar-toggler{display:none}slot[name=non-collapsible]{align-items:center;display:flex;gap:var(--sgds-spacer-4);margin-left:auto}.slot-end{align-items:stretch;display:flex;gap:var(--sgds-gap-xs);margin-left:auto}.slot-end::slotted(:not([name$=-mainnav-item]):not([name$=-mainnav-dropdown])){align-self:center}`;
const _o = "mainnav-context", Ur = {
  sm: up,
  md: hp,
  lg: cp,
  xl: pp,
  XXL: gp,
  never: 1 / 0,
  always: -1
};
class he extends f {
  constructor() {
    super(), this._breakpointReached = !1, this.brandHref = "", this.collapseId = Oe("mainnav", "collapse"), this.expand = "lg", this.breakpointReached = !1, this.expanded = !1, window.addEventListener("resize", () => {
      const e = window.innerWidth < Ur[this.expand];
      e !== this.breakpointReached ? this.requestUpdate() : (this.body && (this.body.hidden = !0), this.expanded = !1), e ? (this._handleMobileNav(), this._breakpointReached || (this._breakpointReached = !0)) : (this._handleDesktopNav(), this._breakpointReached = !1);
    });
  }
  /** @internal */
  get defaultSlotItems() {
    return [...this.defaultNodes || []].filter((e) => typeof e.tagName < "u");
  }
  /** @internal */
  get endSlotItems() {
    return [...this.endNodes || []].filter((e) => typeof e.tagName < "u");
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", (e) => this._handleClickOutOfElement(e, this.body));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", (e) => this._handleClickOutOfElement(e, this.body));
  }
  firstUpdated() {
    this.breakpointReached && this.body && (this.expanded = !1, this.body.hidden = !0, this._handleMobileNav(), this._breakpointReached = !0), [...this.defaultSlotItems, ...this.endSlotItems].forEach((t) => {
      t.setAttribute("expand", this.expand);
    });
  }
  _handleClickOutOfElement(e, t) {
    !e.composedPath().includes(t) && !e.composedPath().includes(this.header) && this.hide();
  }
  _handleSummaryClick() {
    this.expanded ? this.hide() : (document.querySelector("body").style.overflow = "hidden", this.show()), this.header.focus();
  }
  async _handleMobileNav() {
    if (!this.nav)
      return;
    this.nav.appendChild(this.body), await customElements.whenDefined("sgds-masthead");
    const e = this.nav.offsetTop, t = this.nav.clientHeight, s = e + t;
    this.body.style.top = `${s}px`, this.navScroll.style.maxHeight = `calc(100dvh - ${s}px)`;
  }
  _handleDesktopNav() {
    var e;
    (e = this.navbar) === null || e === void 0 || e.insertBefore(this.body, this.nonCollapsibleSlot);
  }
  async _animateToShow() {
    if (this.emit("sgds-show", { cancelable: !0 }).defaultPrevented) {
      this.expanded = !1;
      return;
    }
    await ye(this.body), this.body.hidden = !1;
    const { keyframes: t, options: s } = de(this, "mainnav.show");
    await oe(this.body, os(t, this.body.scrollHeight), s), this.body.style.height = "auto", this.emit("sgds-after-show");
  }
  async _animateToHide() {
    if (this.emit("sgds-hide", { cancelable: !0 }).defaultPrevented) {
      this.expanded = !0;
      return;
    }
    await ye(this.body);
    const { keyframes: t, options: s } = de(this, "mainnav.hide");
    await oe(this.body, os(t, this.body.scrollHeight), s), this.body.hidden = !0, this.body.style.height = "auto", this.emit("sgds-after-hide");
  }
  async handleOpenChange() {
    this.expanded ? this._animateToShow() : this._animateToHide();
  }
  /** Shows the menu. For when mainnav is in the collapsed form */
  async show() {
    if (!this.expanded)
      return this.expanded = !0, Le(this, "sgds-after-show");
  }
  /** Hide the menu. For when mainnav is in the collapsed form */
  async hide() {
    if (this.expanded)
      return this.expanded = !1, document.querySelector("body").style.removeProperty("overflow"), this.emit("close-dropdown-menu"), Le(this, "sgds-after-hide");
  }
  // assigning name attribute to elements added in slot="end", to use wildcard css selector to assign styles only to *-mainnav-item
  _handleSlotChange(e) {
    e.target.assignedElements({ flatten: !0 }).forEach((s) => {
      s.setAttribute("name", s.tagName.toLowerCase());
    });
  }
  render() {
    return this.breakpointReached = window.innerWidth < Ur[this.expand], p`
      <nav>
        <div class="navbar ${this._expandClass()}">
          <a class="navbar-brand" href=${this.brandHref} aria-label="brand-link">
            <slot name="brand"></slot>
          </a>
          <div class="navbar-body navbar-collapse" id=${this.collapseId}>
            <div class="navbar-nav navbar-nav-scroll">
              <slot></slot>
              <slot
                name="end"
                class=${T({ "slot-end": !this.breakpointReached })}
                @slotchange=${this._handleSlotChange}
              ></slot>
            </div>
          </div>
          <slot name="non-collapsible"></slot>
          <sgds-icon-button
            name=${this.expanded ? "cross" : "menu"}
            variant="ghost"
            size="sm"
            class="navbar-toggler"
            @click=${this._handleSummaryClick}
            aria-controls="${this.collapseId}"
            aria-expanded="${this.expanded}"
            aria-label="Toggle navigation"
          ></sgds-icon-button>
        </div>
      </nav>
    `;
  }
  _expandClass() {
    switch (this.expand) {
      case "always":
        return "navbar-expand";
      case "never":
        break;
      default:
        return `navbar-expand-${this.expand}`;
    }
  }
}
he.styles = [...f.styles, fp];
he.dependencies = {
  "sgds-icon": re
};
o([
  dp({ context: _o }),
  R()
], he.prototype, "_breakpointReached", void 0);
o([
  F("nav")
], he.prototype, "nav", void 0);
o([
  F(".navbar")
], he.prototype, "navbar", void 0);
o([
  F(".navbar-toggler")
], he.prototype, "header", void 0);
o([
  F(".navbar-body")
], he.prototype, "body", void 0);
o([
  F(".navbar-nav-scroll")
], he.prototype, "navScroll", void 0);
o([
  F("slot[name='non-collapsible']")
], he.prototype, "nonCollapsibleSlot", void 0);
o([
  c({ type: String })
], he.prototype, "brandHref", void 0);
o([
  c({ type: String })
], he.prototype, "expand", void 0);
o([
  R()
], he.prototype, "breakpointReached", void 0);
o([
  R()
], he.prototype, "expanded", void 0);
o([
  ve()
], he.prototype, "defaultNodes", void 0);
o([
  ve({ slot: "end" })
], he.prototype, "endNodes", void 0);
o([
  O("expanded", { waitUntilFirstUpdate: !0 })
], he.prototype, "handleOpenChange", null);
G("mainnav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
G("mainnav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
var Co = b`:host([expand=always]) .nav-link{border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}@media (min-width:576px){:host([expand=sm]) .nav-link{border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host([expand=sm]) .nav-link:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus)}}@media (min-width:768px){:host([expand=md]) .nav-link{border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host([expand=md]) .nav-link:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus)}}@media (min-width:992px){:host(:not([expand])) .nav-link,:host([expand=lg]) .nav-link{border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host([expand=lg]) .nav-link:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus)}}@media (min-width:1200px){:host([expand=xl]) .nav-link{border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host([expand=xl]) .nav-link:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus)}}@media (min-width:1400px){:host([expand=xxl]) .nav-link{border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host([expand=xxl]) .nav-link:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus)}}.nav-link{align-items:center;cursor:pointer;display:flex;gap:var(--sgds-gap-xs);padding:var(--sgds-padding-sm) var(--sgds-mainnav-padding-x);text-decoration:none}@media screen and (max-width:768px){.nav-link{padding:var(--sgds-padding-sm) var(--sgds-mainnav-mobile-padding-x)}}.nav-link.show,.nav-link:not(.disabled).active{border-color:var(--sgds-primary-border-color-default);color:var(--sgds-primary-color-default)}.nav-link:not(.disabled):hover{color:var(--sgds-primary-color-default)}.nav-link:not(.disabled):focus,.nav-link:not(.disabled):focus-visible{outline:0}.nav-link:not(.disabled):focus-visible{box-shadow:var(--sgds-box-shadow-focus) inset;color:var(--sgds-primary-color-default)}.nav-link.disabled{cursor:not-allowed;opacity:var(--sgds-opacity-50)}.dropdown-items{background-color:var(--sgds-surface-default);height:100%;left:100%;padding:var(--sgds-padding-md) 0;position:absolute;top:0;width:100%}.dropdown-items a{align-items:center;color:var(--sgds-color-default);cursor:pointer;display:flex;gap:var(--sgds-gap-xs);padding:var(--sgds-padding-sm) var(--sgds-mainnav-padding-x);text-decoration:none}.dropdown-items a:hover{color:var(--sgds-primary-color-default)}.dropdown-items a:focus,.dropdown-items a:focus-visible{outline:0}.dropdown-items a:focus-visible{box-shadow:var(--sgds-box-shadow-focus) inset;color:var(--sgds-primary-color-default)}slot[name=toggler]::slotted(*){flex:1}`;
const mp = "Tab", qr = "Enter", jr = " ";
class Be extends f {
  constructor() {
    super(...arguments), this.togglerId = Oe("dropdown", "button"), this.active = !1, this.disabled = !1;
  }
  /** @internal */
  get defaultSlotItems() {
    return [...this.defaultNodes || []].filter((e) => typeof e.tagName < "u");
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("close-dropdown-menu", () => {
      this._resetDropdownMenu(), this._hideDropdownMenuItems();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("close-dropdown-menu", () => {
      this._resetDropdownMenu(), this._hideDropdownMenuItems();
    });
  }
  willUpdate(e) {
    super.willUpdate(e), this.shadowRoot && this._breakpointReached && (this.shadowRoot.adoptedStyleSheets = [Gs.styleSheet, Co.styleSheet]);
  }
  updated() {
    this._breakpointReached && (this._copyTextToMenu(), this._resetDropdownMenu(), this._hideDropdownMenuItems());
  }
  _handleSlotChange(e) {
    e.target.assignedElements({ flatten: !0 }).forEach((s) => {
      s.addEventListener("keydown", this._handleKeyboardMenuItemsEvent.bind(this)), s.shadowRoot.querySelector(".dropdown-item").classList.add("nav-link"), s.shadowRoot.querySelector(".dropdown-item slot").assignedElements({
        flatten: !0
      }).forEach((n) => {
        n.tabIndex = -1;
      });
    });
  }
  _handleDesktopSlotChange(e) {
    e.target.assignedElements({ flatten: !0 }).forEach((s) => {
      s.shadowRoot.querySelector(".dropdown-item").classList.remove("nav-link");
    });
  }
  _handleKeyboardMenuItemsEvent(e) {
    if (!this._breakpointReached)
      return;
    const t = this.defaultSlotItems.filter((l) => !l.hasAttribute("disabled")), s = [this.menuHeaderButton, ...t], a = s.length;
    if (a === 0)
      return;
    const r = s[0], n = s[a - 1].shadowRoot.querySelector(".dropdown-item");
    let d = document.activeElement;
    switch (d === this && (d = this.shadowRoot.activeElement), e.key) {
      case "Tab": {
        if (e.shiftKey)
          d === r && (e.preventDefault(), setTimeout(() => {
            n.focus();
          }, 0));
        else {
          const l = d.shadowRoot ? d.shadowRoot.querySelector(".dropdown-item") : null;
          l && l === n && (e.preventDefault(), r.focus());
        }
        break;
      }
    }
  }
  _copyTextToMenu() {
    this.menuHeaderText.innerHTML = this.togglerNodes[0].innerHTML;
  }
  _hideDropdownMenuItems() {
    this.dropdownItems.style.display = "none", this.dropdownItems.setAttribute("aria-hidden", "true");
  }
  _resetDropdownMenu() {
    this._getNavbarBody().style.removeProperty("transform");
  }
  _handleKeyboardOpen(e) {
    this.disabled || (e.key === qr || e.key === jr) && (e.preventDefault(), this._openMenu());
  }
  _getNavbarBody() {
    const e = document.querySelector("sgds-mainnav");
    if (!(e != null && e.shadowRoot)) {
      console.warn("sgds-mainnav or its shadowRoot not found");
      return;
    }
    const t = e.shadowRoot.querySelector(".navbar-body");
    if (!t) {
      console.warn(".navbar-body not found in sgds-mainnav");
      return;
    }
    return t;
  }
  _openMenu() {
    const e = this._getNavbarBody();
    e.style.transform = "translateX(-100%)", this.dropdownItems.style.removeProperty("display"), this.dropdownItems.setAttribute("aria-hidden", "false"), setTimeout(() => {
      this.menuHeaderButton.focus();
    }, 50);
  }
  _handleHeaderKeyboardEvent(e) {
    switch (e.key) {
      case mp: {
        this._handleKeyboardMenuItemsEvent(e);
        break;
      }
      case qr:
      case jr: {
        e.preventDefault(), this._closeMenu();
        break;
      }
    }
  }
  _closeMenu() {
    this._resetDropdownMenu(), setTimeout(() => {
      this._hideDropdownMenuItems(), this.navLink.focus();
    }, 200);
  }
  render() {
    const e = p`
      <a
        class="${T({
      "nav-link": !0,
      active: this.active,
      disabled: this.disabled
    })}"
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        role="button"
        @click=${this._openMenu}
        @keydown=${this._handleKeyboardOpen}
      >
        <slot name="toggler"></slot>
        <sgds-icon name="chevron-right"></sgds-icon>
      </a>
      <div class="dropdown-items">
        <a tabindex="0" role="button" @click=${this._closeMenu} @keydown=${this._handleHeaderKeyboardEvent}>
          <sgds-icon name="chevron-left"></sgds-icon>
          <span></span>
        </a>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `, t = p`<sgds-dropdown
      modifierOpt=${[
      {
        name: "offset",
        options: {
          offset: [0, 0]
        }
      }
    ]}
      ?disabled=${this.disabled}
    >
      <a
        class="${T({
      "nav-link": !0,
      active: this.active,
      disabled: this.disabled
    })}"
        aria-disabled=${this.disabled ? "true" : "false"}
        id=${this.togglerId}
        tabindex=${this.disabled ? "-1" : "0"}
        role="button"
        slot="toggler"
      >
        <slot name="toggler"></slot>
        <sgds-icon name="chevron-down"></sgds-icon>
      </a>
      <slot @slotchange=${this._handleDesktopSlotChange}></slot>
    </sgds-dropdown>`;
    return this._breakpointReached ? e : t;
  }
}
Be.styles = [...f.styles, za, Gs, Co];
Be.dependencies = {
  "sgds-dropdown": rt,
  "sgds-dropdown-item": Ct,
  "sgds-icon": re
};
o([
  lp({ context: _o, subscribe: !0 }),
  R()
], Be.prototype, "_breakpointReached", void 0);
o([
  F(".nav-link")
], Be.prototype, "navLink", void 0);
o([
  F(".dropdown-items")
], Be.prototype, "dropdownItems", void 0);
o([
  F(".dropdown-items a")
], Be.prototype, "menuHeaderButton", void 0);
o([
  F(".dropdown-items span")
], Be.prototype, "menuHeaderText", void 0);
o([
  c({ type: Boolean })
], Be.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Be.prototype, "disabled", void 0);
o([
  ve({ slot: "toggler" })
], Be.prototype, "togglerNodes", void 0);
o([
  ve()
], Be.prototype, "defaultNodes", void 0);
var vp = b`:host([expand=always]) ::slotted(*){border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}@media screen and (min-width:576px){:host([expand=sm]) ::slotted(*){border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host(:not([disabled])[active][expand=sm]) ::slotted(*){border-color:var(--sgds-primary-border-color-default)}:host([expand=sm]) ::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus)}}@media screen and (min-width:768px){:host([expand=md]) ::slotted(*){border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host(:not([disabled])[active][expand=md]) ::slotted(*){border-color:var(--sgds-primary-border-color-default)}:host([expand=md]) ::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus)}}@media screen and (min-width:992px){:host([expand=lg]) ::slotted(*){border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host(:not([disabled])[active][expand=lg]) ::slotted(*){border-color:var(--sgds-primary-border-color-default)}:host([expand=lg]) ::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus)}}@media screen and (min-width:1200px){:host([expand=xl]) ::slotted(*){border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host(:not([disabled])[active][expand=xl]) ::slotted(*){border-color:var(--sgds-primary-border-color-default)}:host([expand=xl]) ::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus)}}@media screen and (min-width:1400px){:host([expand=xxl]) ::slotted(*){border-bottom:var(--sgds-border-width-4) solid transparent;min-height:100%;padding:0 var(--sgds-padding-md)}:host(:not([disabled])[active][expand=xxl]) ::slotted(*){border-color:var(--sgds-primary-border-color-default)}:host([expand=xxl]) ::slotted(a:focus-visible){box-shadow:var(--sgds-box-shadow-focus)}}@media screen and (max-width:576px){:host(:not([disabled])[active][expand=sm]) ::slotted(*){background-color:var(--sgds-bg-translucent-subtle)}}@media screen and (max-width:768px){:host(:not([disabled])[active][expand=md]) ::slotted(*){background-color:var(--sgds-bg-translucent-subtle)}}@media screen and (max-width:992px){:host(:not([disabled])[active][expand=lg]) ::slotted(*){background-color:var(--sgds-bg-translucent-subtle)}}@media screen and (max-width:1200px){:host(:not([disabled])[active][expand=xl]) ::slotted(*){background-color:var(--sgds-bg-translucent-subtle)}}@media screen and (max-width:1400px){:host(:not([disabled])[active][expand=xxl]) ::slotted(*){background-color:var(--sgds-bg-translucent-subtle)}}::slotted(*){--sgds-link-color-default:var(--sgds-color-default);align-items:center;box-sizing:border-box;color:var(--sgds-link-color-default,var(--sgds-color-default));cursor:pointer;display:flex;height:auto!important;padding:var(--sgds-padding-sm) var(--sgds-mainnav-padding-x);text-decoration:none!important;text-decoration:none}@media screen and (max-width:768px){::slotted(*){padding:var(--sgds-padding-sm) var(--sgds-mainnav-mobile-padding-x)}}:host(:not([disabled])[active]) ::slotted(*){--sgds-link-color-default:var(--sgds-primary-color-default);color:var(--sgds-link-color-default,var(--sgds-primary-color-default))}:host([disabled]) ::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-color-default);color:var(--sgds-link-color-emphasis,var(--sgds-color-default))}:host(:not([disabled])) ::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-primary-color-default);color:var(--sgds-link-color-emphasis,var(--sgds-primary-color-default))}::slotted(a:focus),::slotted(a:focus-visible){outline:0}::slotted(a:focus-visible){--sgds-link-color-emphasis:var(--sgds-primary-color-default);box-shadow:var(--sgds-box-shadow-focus) inset;color:var(--sgds-link-color-emphasis,var(--sgds-primary-color-default))}:host([disabled]) ::slotted(*){cursor:not-allowed;opacity:var(--sgds-opacity-50)}`;
class ei extends f {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1;
  }
  _handleDisabled() {
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }
  _handleSlotChange(e) {
    const t = e.target, a = t.assignedElements({ flatten: !0 }).filter((r) => r.tagName.toLowerCase() === "a" || r.tagName.toLowerCase() === "sgds-link");
    if (a.length > 1) {
      console.error("More than one anchor tag is added to sgds-mainnav-item");
      return;
    }
    if (a.length === 0 && t.assignedNodes({ flatten: !0 }).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const d = document.createElement("a");
        d.textContent = n.textContent, n.parentNode.replaceChild(d, n);
      }
    }), a.length === 1) {
      const r = a[0];
      this.active && r.setAttribute("aria-current", "true"), this.disabled && (r.setAttribute("href", "javascript:void(0)"), r.setAttribute("tabindex", "-1"));
    }
  }
  render() {
    return p`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }
}
ei.styles = [...f.styles, vp];
o([
  c({ type: Boolean })
], ei.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ei.prototype, "disabled", void 0);
o([
  O("disabled")
], ei.prototype, "_handleDisabled", null);
A("sgds-mainnav", he);
A("sgds-mainnav-dropdown", Be);
A("sgds-mainnav-item", ei);
var bp = b`b{font-weight:bolder}[role=button]{cursor:pointer}a{color:#0049dc}a:hover{color:#0022b9}.sgds-masthead{font-family:Inter,system-ui,sans-serif;font-size:.875rem;line-height:1.25rem}.banner{background-color:light-dark(#f3f3f3,#1a1a1a)}.container{margin-left:auto;margin-right:auto;max-width:var(--sgds-mainnav-max-width);padding:.25rem var(--sgds-mainnav-padding-x);width:100%}.sg-crest{flex-shrink:0;height:20px;width:20px}.sg-crest path{fill:#db0000}.masthead-layout{display:flex;gap:.25rem}.masthead-text-layout{align-items:center;display:flex;flex-wrap:wrap;gap:0 .75rem}.sgds-masthead-identify-icon{align-self:center;display:block;height:20px;transform:rotate(180deg);transition:transform .3s ease-in-out 0s;user-select:none;width:20px}.sgds-masthead-identify-icon.show{transform:rotate(0deg)}.sgds-masthead-button{align-items:center;color:light-dark(#0269d0,#60aaf4);cursor:pointer;display:flex;gap:4px}.sgds-masthead-button:hover{color:light-dark(#0151a0,#96c7f7)}.panel{background-color:light-dark(oklch(from #0e0e0e l c h/.1),oklch(from #fff l c h/.1))}.sgds-masthead .sgds-masthead-content{display:none;padding-bottom:1rem;padding-top:1rem}.sgds-masthead .sgds-masthead-content.show{display:block}.content-grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}.icon{margin-top:-.1em}.wrapper{display:flex;gap:.5rem}.content{display:flex;flex-direction:column;gap:.25rem}.content .title{font-weight:600}.content article{color:light-dark(#525252,#a5a5a5)}.banner-icon,.banner-icon-inline{height:20px;width:20px}.banner-icon path,.banner-icon-inline path{fill:light-dark(#1a1a1a,#f3f3f3)}a.trusted-websites-link{color:light-dark(#0269d0,#60aaf4);text-decoration:underline;width:fit-content}a.trusted-websites-link:hover{color:light-dark(#0151a0,#96c7f7)}.sgds-masthead-button:focus,.sgds-masthead-button:focus-visible,a.trusted-websites-link:focus,a.trusted-websites-link:focus-visible{box-shadow:0 0 0 4px #60aaf4;outline:0}@media screen and (max-width:768px){.container{padding:.25rem var(--sgds-mainnav-mobile-padding-x)}.sgds-masthead-content .content-grid{gap:1rem;grid-template-columns:1fr}}`, Za = b`svg{vertical-align:middle}`;
class Xa extends f {
  constructor() {
    super(...arguments), this.toggleVisibility = !1;
  }
  /** @internal */
  _handleKeydown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._toggleVisibility());
  }
  /** @internal */
  _toggleVisibility() {
    this.toggleVisibility = !this.toggleVisibility;
  }
  render() {
    return p`
      <div id="sgds-masthead" class="sgds-masthead" aria-label="A Singapore Government Agency Website" role="banner">
        <div class="banner">
          <div class="container">
            <div class="masthead-layout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                class="sg-crest"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.31179 7.0109C4.31179 7.0109 3.78527 7.78129 4.4749 8.77746C4.4749 8.77746 4.58365 8.27018 5.67275 8.27018H6.97989C8.21435 8.27018 9.13979 7.04881 8.55889 5.78895C8.55889 5.78895 9.42995 5.88317 9.72123 5.31901C10.0114 4.75544 9.70292 4.52966 9.26739 4.52966H7.07088C7.07088 4.9341 6.32687 4.9904 6.32687 4.52966H5.09241C5.09241 4.52966 4.16643 4.52966 4.14867 5.33797C4.14867 5.33797 4.35784 5.20641 4.56589 5.18803V5.40346C4.56589 5.40346 4.31179 5.45057 4.19361 5.51664C4.07599 5.58213 3.90344 5.7608 4.06711 6.22154C4.23023 6.68171 4.29403 6.84142 4.29403 6.84142C4.29403 6.84142 4.55757 6.60588 4.98422 6.60588H5.48356C6.37237 6.60588 6.20925 7.49864 5.31989 7.49864C4.43052 7.49864 4.3129 7.01032 4.3129 7.01032L4.31179 7.0109Z"
                  fill="currentColor"
                />
                <path
                  d="M8.94948 6.0808C8.94948 6.0808 9.24908 6.09976 9.46657 5.90271C9.46657 5.90271 11.4362 7.49118 8.51395 10.6859C5.59118 13.8813 7.85094 15.9494 7.85094 15.9494C7.85094 15.9494 7.32498 16.4751 7.62402 17.5C7.62402 17.5 6.40843 16.7894 5.47856 15.5823C4.13479 13.8382 3.31367 11.1697 7.00374 9.04116C7.00374 9.04116 9.43938 7.77268 8.94948 6.0808Z"
                  fill="currentColor"
                />
                <path
                  d="M5.93914 4.22922C5.93914 4.22922 6.33251 3.50249 7.24573 3.50249C7.96588 3.50249 8.13011 3.11988 8.13011 3.11988C8.13011 3.11988 8.44413 2.5 10.0298 2.5C11.4829 2.5 12.4621 3.00153 13.2544 3.67139C13.2544 3.67139 11.1183 2.2995 9.01282 4.22922H5.93914Z"
                  fill="currentColor"
                />
                <path
                  d="M14.8217 8.828C14.7612 6.5599 13.0668 4.12922 9.42448 4.2671C12.9825 1.14703 19.1543 8.11333 14.0711 11.7734C14.0711 11.7734 14.9216 10.517 14.8217 8.828Z"
                  fill="currentColor"
                />
                <path
                  d="M9.96927 4.51761C14.4106 4.37973 15.9962 9.89315 13.1278 12.3744L10.2478 13.8158C10.2478 13.8158 9.87273 12.5628 11.2648 11.0961C12.6568 9.6306 13.9994 6.88625 10.1518 5.08177C10.1518 5.08177 10.2245 4.70605 9.97038 4.51819L9.96927 4.51761Z"
                  fill="currentColor"
                />
                <path
                  d="M9.73904 5.75795C9.73904 5.75795 9.95708 5.54481 10.0298 5.36959C13.3331 6.79778 12.8133 9.21697 10.8403 11.2467C9.63029 12.537 10.0053 13.9284 10.0053 13.9284C10.0053 13.9284 8.52954 14.8803 8.02078 15.7076C8.02078 15.7076 5.88363 13.8233 8.84357 10.6957C11.748 7.62563 9.73904 5.75795 9.73904 5.75795Z"
                  fill="currentColor"
                />
              </svg>
              <div class="masthead-text-layout">
                <span>A Singapore Government Agency Website</span>
                <div
                  class="sgds-masthead-button"
                  id="sgds-masthead-identify"
                  role="button"
                  tabindex="0"
                  aria-expanded="${this.toggleVisibility}"
                  aria-controls="sgds-masthead-content"
                  @keydown=${this._handleKeydown}
                  @click=${this._toggleVisibility}
                >
                  <span>How to identify</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="sgds-masthead-identify-icon ${this.toggleVisibility ? "show" : null}"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.64645 7.14645C9.84171 6.95118 10.1583 6.95118 10.3536 7.14645L15.3536 12.1464C15.5488 12.3417 15.5488 12.6583 15.3536 12.8536C15.1583 13.0488 14.8417 13.0488 14.6464 12.8536L10 8.20711L5.35355 12.8536C5.15829 13.0488 4.84171 13.0488 4.64645 12.8536C4.45118 12.6583 4.45118 12.3417 4.64645 12.1464L9.64645 7.14645Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div
            id="sgds-masthead-content"
            class="container sgds-masthead-content ${this.toggleVisibility ? "show" : null}"
          >
            <div class="content-grid">
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.5 7.31409C2.5 7.01647 2.65873 6.74143 2.91644 6.59254L9.5831 2.74069C9.84105 2.59165 10.1589 2.59165 10.4169 2.74069L17.0836 6.59254C17.3413 6.74143 17.5 7.01647 17.5 7.31409V8.33314C17.5 8.79338 17.1269 9.16648 16.6667 9.16648H15.8333V14.9998H16.6667C17.1269 14.9998 17.5 15.3729 17.5 15.8331V16.6665C17.5 17.1267 17.1269 17.4998 16.6667 17.4998H3.33333C2.8731 17.4998 2.5 17.1267 2.5 16.6665V15.8331C2.5 15.3729 2.8731 14.9998 3.33333 14.9998H4.16667V9.16648H3.33333C2.8731 9.16648 2.5 8.79338 2.5 8.33314V7.31409ZM6.66667 9.16648V14.9998H8.75V9.16648H6.66667ZM11.25 9.16648V14.9998H13.3333V9.16648H11.25ZM11.25 6.24981C11.25 6.94017 10.6904 7.49981 10 7.49981C9.30964 7.49981 8.75 6.94017 8.75 6.24981C8.75 5.55945 9.30964 4.99981 10 4.99981C10.6904 4.99981 11.25 5.55945 11.25 6.24981Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Official website links end with .gov.sg</div>
                  <article>Government agencies communicate via .gov.sg websites (e.g. go.gov.sg/open).</article>
                  <a
                    href="https://www.gov.sg/trusted-sites#govsites"
                    class="trusted-websites-link"
                    rel="noreferrer"
                    target="_blank"
                    >Trusted websites</a
                  >
                </div>
              </div>
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.83334 8.33317H5.41668C4.26608 8.33317 3.33334 9.26591 3.33334 10.4165V16.2498C3.33334 17.4004 4.26608 18.3332 5.41668 18.3332H14.5833C15.7339 18.3332 16.6667 17.4004 16.6667 16.2498V10.4165C16.6667 9.26591 15.7339 8.33317 14.5833 8.33317H14.1667V5.83317C14.1667 3.53198 12.3012 1.6665 10 1.6665C7.69882 1.6665 5.83334 3.53198 5.83334 5.83317V8.33317ZM7.50001 8.33317H12.5V5.83317C12.5 4.45246 11.3807 3.33317 10 3.33317C8.6193 3.33317 7.50001 4.45246 7.50001 5.83317V8.33317Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Secure websites use HTTPS</div>
                  <article>
                    Look for a lock (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      class="banner-icon-inline"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.83331 8.33317H5.41665C4.26605 8.33317 3.33331 9.26591 3.33331 10.4165V16.2498C3.33331 17.4004 4.26605 18.3332 5.41665 18.3332H14.5833C15.7339 18.3332 16.6666 17.4004 16.6666 16.2498V10.4165C16.6666 9.26591 15.7339 8.33317 14.5833 8.33317H14.1666V5.83317C14.1666 3.53198 12.3012 1.6665 9.99998 1.6665C7.69879 1.6665 5.83331 3.53198 5.83331 5.83317V8.33317ZM7.49998 8.33317H12.5V5.83317C12.5 4.45246 11.3807 3.33317 9.99998 3.33317C8.61927 3.33317 7.49998 4.45246 7.49998 5.83317V8.33317Z"
                        fill="currentColor"
                      /></svg
                    >) or https:// as an added precaution. Share sensitive information only on official, secure
                    websites.
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
Xa.styles = [...f.styles, Za, Ca, bp];
o([
  R()
], Xa.prototype, "toggleVisibility", void 0);
A("sgds-masthead", Xa);
function Wr(i) {
  const e = i.tagName.toLowerCase();
  return i.getAttribute("tabindex") === "-1" || i.hasAttribute("disabled") || i.hasAttribute("aria-disabled") && i.getAttribute("aria-disabled") !== "false" || e === "input" && i.getAttribute("type") === "radio" && !i.hasAttribute("checked") || i.offsetParent === null || window.getComputedStyle(i).visibility === "hidden" ? !1 : (e === "audio" || e === "video") && i.hasAttribute("controls") || i.hasAttribute("tabindex") || i.hasAttribute("contenteditable") && i.getAttribute("contenteditable") !== "false" ? !0 : ["button", "input", "select", "textarea", "a", "audio", "video", "summary"].includes(e);
}
function yp(i) {
  var e, t;
  const s = [];
  function a(d) {
    d instanceof HTMLElement && (s.push(d), d.shadowRoot !== null && d.shadowRoot.mode === "open" && a(d.shadowRoot)), [...d.children].forEach((l) => a(l));
  }
  a(i);
  const r = (e = s.find((d) => Wr(d))) !== null && e !== void 0 ? e : null, n = (t = s.reverse().find((d) => Wr(d))) !== null && t !== void 0 ? t : null;
  return { start: r, end: n };
}
let As = [];
class wp {
  constructor(e) {
    this.tabDirection = "forward", this.element = e, this.handleFocusIn = this.handleFocusIn.bind(this), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  activate() {
    As.push(this.element), document.addEventListener("focusin", this.handleFocusIn), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
  }
  deactivate() {
    As = As.filter((e) => e !== this.element), document.removeEventListener("focusin", this.handleFocusIn), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
  }
  isActive() {
    return As[As.length - 1] === this.element;
  }
  checkFocus() {
    if (this.isActive() && !this.element.matches(":focus-within")) {
      const { start: e, end: t } = yp(this.element), s = this.tabDirection === "forward" ? e : t;
      typeof (s == null ? void 0 : s.focus) == "function" && s.focus({ preventScroll: !0 });
    }
  }
  handleFocusIn() {
    this.checkFocus();
  }
  handleKeyDown(e) {
    e.key === "Tab" && e.shiftKey && (this.tabDirection = "backward", requestAnimationFrame(() => this.checkFocus()));
  }
  handleKeyUp() {
    this.tabDirection = "forward";
  }
}
var kp = b`:host([size=sm]) .modal-panel{max-width:480px}:host([size=lg]) .modal-panel{max-width:800px}:host([size=fullscreen]) .modal-panel{max-width:1128px}:host(:not([size=fullscreen])) .modal-panel{background-color:var(--sgds-surface-default)}:host([size=fullscreen]) .modal-overlay{background-color:var(--sgds-surface-default)}.modal{align-items:start;bottom:0;display:flex;font-family:var(--sgds-body-font-family);justify-content:center;left:0;position:fixed;right:0;top:0;z-index:105500}.modal-panel{border-radius:var(--sgds-border-radius-md);display:flex;flex-direction:column;margin:var(--sgds-spacer-9) var(--sgds-spacer-6);max-height:calc(100% - var(--sgds-spacer-9) - var(--sgds-spacer-9));max-width:640px;position:relative;width:100%}.modal-panel:focus{outline:none}@media screen and (max-width:420px){.modal-panel{margin:var(--sgds-spacer-8) var(--sgds-spacer-6);max-height:calc(100% - var(--sgds-spacer-8) - var(--sgds-spacer-8))}}.modal.show .modal-panel{opacity:1;transform:none}.modal-header{display:flex;flex:0 0 auto;flex-direction:row;justify-content:space-between;padding:var(--sgds-padding-xl)}.modal-header__title-description{display:flex;flex-direction:column;gap:var(--sgds-gap-xs)}slot[name=title]::slotted(*){--sgds-margin-2-xs:var(--sgds-margin-none);--sgds-margin-xs:var(--sgds-margin-none);--sgds-font-size-6:var(--sgds-font-size-4);align-items:center;display:flex;flex:1 1 auto;font-size:var(--sgds-font-size-6,--sgds-font-size-4);gap:1rem;line-height:var(--sgds-line-height-heading);margin:var(--sgds-margin-none,var(--sgds-margin-xs,--sgds-margin-2-xs))}slot[name=description]::slotted(*){--sgds-paragraph-spacing-xl:var(--sgds-margin-none);color:var(--sgds-color-subtle);line-height:var(--sgds-line-height-body);margin:var(--sgds-margin-none,--sgds-paragraph-spacing-xl)}.modal-body{-webkit-overflow-scrolling:touch;overflow:auto;padding:0 var(--sgds-padding-xl) var(--sgds-padding-xl)}.modal-body slot::slotted(*){--sgds-paragraph-spacing-xl:var(--sgds-margin-none);margin:var(--sgds-paragraph-spacing-xl,--sgds-margin-none)}.modal-footer{display:flex;flex:0 0 auto;flex-wrap:wrap;gap:var(--sgds-gap-md);justify-content:flex-end;padding:var(--sgds-padding-xl)}.modal:not(.has-footer) .modal-footer{display:none}.modal-overlay{background-color:var(--sgds-bg-overlay);bottom:0;left:0;position:fixed;right:0;top:0}[hidden]{display:none}`;
class He extends f {
  constructor() {
    super(...arguments), this.hasSlotController = new wo(this, "footer"), this.open = !1, this.noAnimation = !1, this.size = "md";
  }
  connectedCallback() {
    super.connectedCallback(), this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this), this.modal = new wp(this), this._resizeHandler = this._debounce(this._onWindowResize.bind(this), 200);
  }
  firstUpdated() {
    this._onWindowResize(), this.dialog.hidden = !this.open, this.open && (this.addOpenListeners(), this.modal.activate(), Ls(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeResizeListener(), Ps(this);
  }
  _debounce(e, t) {
    let s;
    return (...a) => {
      clearTimeout(s), s = window.setTimeout(() => e(...a), t);
    };
  }
  /** Handle the window resize event. */
  _onWindowResize() {
    const t = this.panel.getBoundingClientRect().width, s = this.querySelectorAll("sgds-button[slot='footer']");
    this.panel && (s.length <= 1 || (t <= 360 ? s.forEach((a) => {
      const r = a;
      r.fullWidth = !0;
    }) : s.forEach((a) => {
      const r = a;
      r.fullWidth = !1;
    })));
  }
  /**  Add the resize event listener. */
  _addResizeListener() {
    window.addEventListener("resize", this._resizeHandler);
  }
  /** Remove the resize event listener. */
  _removeResizeListener() {
    window.removeEventListener("resize", this._resizeHandler);
  }
  /** Shows the dialog. */
  async show() {
    if (!this.open)
      return this.open = !0, Le(this, "sgds-after-show");
  }
  /** Hides the dialog */
  async hide() {
    if (this.open)
      return this.open = !1, Le(this, "sgds-after-hide");
  }
  requestClose(e) {
    if (this.emit("sgds-close", {
      cancelable: !0,
      detail: { source: e }
    }).defaultPrevented) {
      const s = de(this, "modal.denyClose");
      oe(this.panel, s.keyframes);
      return;
    }
    this.hide();
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  handleDocumentKeyDown(e) {
    this.open && e.key === "Escape" && (e.stopPropagation(), this.requestClose("keyboard"));
  }
  _overlayClickHandler() {
    this.size !== "fullscreen" && this.requestClose("overlay");
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sgds-show"), this.addOpenListeners(), this.originalTrigger = document.activeElement, this.modal.activate(), Ls(this), await Promise.all([ye(this.dialog), ye(this.overlay)]), this.dialog.hidden = !1;
      const e = de(this, "modal.show"), t = de(this, "modal.overlay.show");
      !this.noAnimation && await Promise.all([
        oe(this.panel, e.keyframes, e.options),
        oe(this.overlay, t.keyframes, t.options)
      ]), this.emit("sgds-after-show"), this.heading.focus(), this._addResizeListener();
    } else {
      this.emit("sgds-hide"), this.removeOpenListeners(), this.modal.deactivate(), await Promise.all([ye(this.dialog), ye(this.overlay)]);
      const e = de(this, "modal.hide"), t = de(this, "modal.overlay.hide");
      !this.noAnimation && await Promise.all([
        oe(this.overlay, t.keyframes, t.options).then(() => {
          this.overlay.hidden = !0;
        }),
        oe(this.panel, e.keyframes, e.options).then(() => {
          this.panel.hidden = !0;
        })
      ]), this.dialog.hidden = !0, this.overlay.hidden = !1, this.panel.hidden = !1, Ps(this);
      const s = this.originalTrigger;
      typeof (s == null ? void 0 : s.focus) == "function" && setTimeout(() => s.focus()), this.emit("sgds-after-hide"), this._removeResizeListener();
    }
  }
  render() {
    return p`
      <div
        class=${T({
      modal: !0,
      show: this.open,
      "has-footer": this.hasSlotController.test("footer")
    })}
      >
        <div class="modal-overlay" @click=${this._overlayClickHandler}></div>

        <div
          class="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-labelledby="title"
          tabindex="-1"
        >
          <div class="modal-header">
            <div class="modal-header__title-description">
              <slot class="modal-title" id="title" name="title"></slot>
              <slot name="description"></slot>
            </div>
            <sgds-close-button
              class="modal-header__close"
              @click="${() => this.requestClose("close-button")}"
              ariaLabel="close modal"
            ></sgds-close-button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
He.styles = [...f.styles, Kn, Za, kp];
He.dependencies = {
  "sgds-close-button": Ze
};
o([
  F(".modal")
], He.prototype, "dialog", void 0);
o([
  F(".modal-panel")
], He.prototype, "panel", void 0);
o([
  F(".modal-overlay")
], He.prototype, "overlay", void 0);
o([
  F(".modal-title")
], He.prototype, "heading", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], He.prototype, "open", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], He.prototype, "noAnimation", void 0);
o([
  c({ reflect: !0 })
], He.prototype, "size", void 0);
o([
  O("open", { waitUntilFirstUpdate: !0 })
], He.prototype, "handleOpenChange", null);
G("modal.show", {
  keyframes: [
    { opacity: 0, transform: "scale(1) translate(0, -100%)" },
    { opacity: 1, transform: "scale(1) translate(0, 0%)" }
  ],
  options: { duration: 400, easing: "ease" }
});
G("modal.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1) translate(0, 0)" },
    { opacity: 0, transform: "scale(1) translate(0, -100%)" }
  ],
  options: { duration: 400, easing: "ease" }
});
G("modal.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: { duration: 400 }
});
G("modal.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400 }
});
G("modal.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 400 }
});
A("sgds-modal", He);
var xp = b`ul{margin-bottom:1rem;margin-top:0;padding-left:2rem}svg{vertical-align:middle}.pagination{display:inline-flex;gap:var(--sgds-gap-2-xs);list-style:none;padding-left:0}.page-link{align-items:center;background-color:var(--sgds-bg-transparent);border:1px solid var(--sgds-border-color-default);border-radius:var(--sgds-border-radius-md);display:flex;height:var(--sgds-dimension-48);justify-content:center;width:var(--sgds-dimension-48)}@media (prefers-reduced-motion:reduce){.page-link{transition:none}}.page-link:focus,.page-link:not(.ellipsis):hover{background-color:var(--sgds-primary-bg-translucent);color:var(--sgds-primary-color-default);z-index:2}.page-link:focus{box-shadow:var(--sgds-box-shadow-focus);outline:0;z-index:3}.page-item>.page-link:not(.ellipsis){cursor:pointer}.page-item.active .page-link{background-color:var(--sgds-primary-bg-default);border-color:var(--sgds-info);color:var(--sgds-color-fixed-light);z-index:3}.ellipsis-disabled,.page-item.disabled .page-link{opacity:var(--sgds-opacity-50)}.ellipsis-disabled{cursor:not-allowed;pointer-events:none}.pagination-sm .page-link{font-size:var(--sgds-font-size-1);height:var(--sgds-dimension-40);width:var(--sgds-dimension-40)}.sr-only{clip:rect(0,0,0,0);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pagination-description{align-items:center;display:flex}.pagination-sm .pagination-description{font-size:var(--sgds-font-size-1)}`;
class Ye extends f {
  constructor() {
    super(...arguments), this.dataLength = 0, this.currentPage = 1, this.itemsPerPage = 5, this.variant = "default", this.navigation = "icon-button", this.size = "md", this._limit = 4, this.ellipsisContent = p`
    <span aria-hidden="true">…</span>
    <span class="sr-only" role="text">Ellipsis</span>
  `, this._renderFirstEllipsis = () => this.pages.length <= 7 || !(this.pages.length !== this._limit && this.currentPage > 4) ? null : p`
      <li class="page-item ">
        <span class="page-link ellipsis">${this.ellipsisContent}</span>
      </li>
    `, this._getNavButton = (e, t, s) => {
      const a = p`<sgds-icon
      size=${this.size}
      name=${e === "Prev" ? "arrow-left" : "arrow-right"}
      slot=${e === "Prev" ? "leftIcon" : "rightIcon"}
    ></sgds-icon>`;
      return p`
      <sgds-button
        ariaLabel=${e === "Prev" ? "Previous" : "Next"}
        size=${this.size}
        @click=${s ? void 0 : t}
        ?disabled=${s}
        variant="ghost"
        >${a}${e}</sgds-button
      >
    `;
    };
  }
  /**@internal */
  _handleValueChange() {
    return this.emit("sgds-page-change", { detail: { currentPage: this.currentPage } }), this.pages.length <= 7 ? this._limit = 5 : this.pages.length - this.currentPage <= 3 ? this._limit = 4 : this.currentPage > 4 ? this._limit = 3 : this._limit = 4;
  }
  _handlePageClick(e) {
    const s = e.target.closest("li");
    if (s) {
      const a = Number(s.getAttribute("key"));
      a !== this.currentPage && (this.currentPage = a);
    }
  }
  _handleNextButton() {
    this.currentPage = this.currentPage + 1;
  }
  _handlePrevButton() {
    this.currentPage = this.currentPage - 1;
  }
  get pages() {
    const e = [];
    for (let t = 1; t <= Math.ceil(this.dataLength / this.itemsPerPage); t++)
      e.push(t);
    return e;
  }
  _handleKeyDown(e, t, s, a) {
    if (e.key === "Enter")
      switch (t) {
        case "pageNumber":
          this.currentPage = s;
          break;
        case "directionButton":
          a ? this._handlePrevButton() : this._handleNextButton();
          break;
      }
  }
  _renderFirstPage() {
    return p`
      <li key=${1} class="page-item ${this.currentPage === 1 ? "active" : ""}">
        <span
          role="button"
          class="page-link"
          aria-label=${this.currentPage === 1 ? "Current Page, Page 1" : "Go to Page 1"}
          aria-current="${this.currentPage === 1}"
          tabindex="0"
          @click=${this._handlePageClick}
          @keydown=${(e) => this._handleKeyDown(e, "pageNumber", 1)}
          >1</span
        >
      </li>
    `;
  }
  _getAllPageNumbers() {
    const e = [];
    for (let t = 1; t <= this.pages.length; t++)
      e.push(t);
    return e;
  }
  _getPageNumbers() {
    const e = [];
    let t = 2, s;
    this._limit === 3 && (t = this.currentPage - Math.floor(this._limit / 2)), this._limit === 4 && (t = this.currentPage - Math.floor(this._limit / 2), this.currentPage + this._limit > this.pages.length && (t = this.pages.length - this._limit)), t <= 1 && (t = 2), s = t + this._limit - 1, s >= this.pages.length && (s = this.pages.length - 1);
    for (let a = t; a <= s; a++)
      e.push(a);
    return e;
  }
  _renderPgNumbers(e) {
    return e.map((t) => p`
        <li key=${t} class="page-item ${this.currentPage === t ? "active" : ""}">
          <span
            role="button"
            class="page-link"
            tabindex="0"
            aria-label=${this.currentPage === t ? `Current Page, Page ${t}` : `Go to Page ${t}`}
            aria-current="${this.currentPage === t}"
            @click=${this._handlePageClick}
            @keydown=${(s) => this._handleKeyDown(s, "pageNumber", t)}
            >${t}</span
          >
        </li>
      `);
  }
  _renderLastEllipsis() {
    const e = this.pages.length !== this._limit;
    return this.pages.length <= 7 || !e || this._limit >= this.pages.length || this.pages.length - this.currentPage < this._limit ? null : p`
      <li class="page-item">
        <span class="page-link ellipsis ">${this.ellipsisContent}</span>
      </li>
    `;
  }
  _renderLastPage() {
    return p`
      <li key=${this.pages.length} class="page-item ${this.currentPage === this.pages.length ? "active" : ""}">
        <span
          role="button"
          class="page-link"
          aria-label=${this.currentPage === this.pages.length ? `Current Page, Page ${this.pages.length}` : `Go to Page ${this.pages.length}`}
          aria-current="${this.currentPage === this.pages.length}"
          tabindex="0"
          @click=${this._handlePageClick}
          @keydown=${(e) => this._handleKeyDown(e, "pageNumber", this.pages.length)}
          >${this.pages.length}</span
        >
      </li>
    `;
  }
  _renderDirectionButton(e, t) {
    const s = e === "Prev" ? this.currentPage === 1 : this.currentPage === this.pages.length;
    return this.navigation === "button" ? p`${this._getNavButton(e, t, s)}` : this.navigation === "icon-button" ? p`${this._getIconButton(e, t, s)}` : p`${E}`;
  }
  _getIconButton(e, t, s) {
    return p`
      <sgds-icon-button
        ariaLabel=${e === "Prev" ? "Previous" : "Next"}
        size=${this.size}
        @click=${s ? void 0 : t}
        ?disabled=${s}
        variant="ghost"
        name=${e === "Prev" ? "arrow-left" : "arrow-right"}
      ></sgds-icon-button>
    `;
  }
  _renderDescriptionPagination() {
    return p`
      ${this._renderDirectionButton("Prev", this._handlePrevButton)}
      <div class="pagination-description">Page ${this.currentPage} of ${this.pages.length}</div>
      ${this._renderDirectionButton("Next", this._handleNextButton)}
    `;
  }
  _renderDefaultPagination() {
    return p`
      ${this._renderDirectionButton("Prev", this._handlePrevButton)} ${this._renderFirstPage()}
      ${this._renderFirstEllipsis()} ${this._renderPgNumbers(this._getPageNumbers())} ${this._renderLastEllipsis()}
      ${this.pages.length <= 1 ? E : this._renderLastPage()}
      ${this._renderDirectionButton("Next", this._handleNextButton)}
    `;
  }
  _renderNumberPagination() {
    return p` ${this._renderPgNumbers(this._getAllPageNumbers())} `;
  }
  _renderButtonPagination() {
    return p`
      ${this._renderDirectionButton("Prev", this._handlePrevButton)}
      ${this._renderDirectionButton("Next", this._handleNextButton)}
    `;
  }
  render() {
    return p`
      <nav aria-label="pagination" role="navigation">
        <ul class="pagination pagination-${this.size}">
          ${this.variant === "description" ? this._renderDescriptionPagination() : E}
          ${this.variant === "default" ? this._renderDefaultPagination() : E}
          ${this.variant === "number" ? this._renderNumberPagination() : E}
          ${this.variant === "button" ? this._renderButtonPagination() : E}
        </ul>
      </nav>
    `;
  }
}
Ye.styles = [...f.styles, xp];
Ye.dependencies = {
  "sgds-icon-button": Et,
  "sgds-button": be,
  "sgds-icon": re
};
o([
  c({ type: Number })
], Ye.prototype, "dataLength", void 0);
o([
  c({ type: Number })
], Ye.prototype, "currentPage", void 0);
o([
  c({ type: Number })
], Ye.prototype, "itemsPerPage", void 0);
o([
  c({ type: String })
], Ye.prototype, "variant", void 0);
o([
  c({ type: String })
], Ye.prototype, "navigation", void 0);
o([
  c({ type: String })
], Ye.prototype, "size", void 0);
o([
  R()
], Ye.prototype, "_limit", void 0);
o([
  O("currentPage", { waitUntilFirstUpdate: !1 })
], Ye.prototype, "_handleValueChange", null);
A("sgds-pagination", Ye);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $o = "important", _p = " !" + $o, Cp = qs(class extends js {
  constructor(i) {
    var e;
    if (super(i), i.type !== Ue.ATTRIBUTE || i.name !== "style" || ((e = i.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return Object.keys(i).reduce((e, t) => {
      const s = i[t];
      return s == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(i, [e]) {
    const { style: t } = i.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? t.removeProperty(s) : t[s] = null);
    for (const s in e) {
      const a = e[s];
      if (a != null) {
        this.ft.add(s);
        const r = typeof a == "string" && a.endsWith(_p);
        s.includes("-") || r ? t.setProperty(s, r ? a.slice(0, -11) : a, r ? $o : "") : t[s] = a;
      }
    }
    return $e;
  }
});
var $p = b`progress{vertical-align:baseline}.progress-container{display:flex;flex-direction:column;gap:var(--sgds-gap-2-xs);overflow:hidden}.progress{background-color:var(--sgds-bg-translucent)}.progress-bar{background-color:var(--sgds-primary-surface-default);display:flex;flex-direction:column;height:var(--sgds-dimension-4);justify-content:center;overflow:hidden;transition:width .6s ease}:host([variant=neutral]) .progress-bar{background-color:var(--sgds-neutral-surface-default)}.label{color:var(--sgds-color-subtle);font-size:var(--sgds-font-size-1);white-space:nowrap}@media (prefers-reduced-motion:reduce){.progress-bar{transition:none}}`;
class Dt extends f {
  constructor() {
    super(...arguments), this.variant = "primary", this.arialabel = "", this.label = "";
  }
  render() {
    return p`
      <div class="progress-container">
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style=${Cp({ width: `${this.value}%` })}
            aria-label=${this.arialabel}
            aria-valuenow=${this.value}
            aria-valuemin=${this.ariamin}
            aria-valuemax=${this.ariamax}
          ></div>
        </div>
        ${this.label ? p`<span class="label">${this.label}</span>` : E}
      </div>
    `;
  }
}
Dt.styles = [...f.styles, $p];
o([
  c({ type: String, reflect: !0 })
], Dt.prototype, "variant", void 0);
o([
  c({ type: Number, reflect: !0 })
], Dt.prototype, "value", void 0);
o([
  c({ type: Number, reflect: !0 })
], Dt.prototype, "ariamin", void 0);
o([
  c({ type: Number, reflect: !0 })
], Dt.prototype, "ariamax", void 0);
o([
  c({ type: String, reflect: !0 })
], Dt.prototype, "arialabel", void 0);
o([
  c({ type: String, reflect: !0 })
], Dt.prototype, "label", void 0);
A("sgds-progress-bar", Dt);
var Ep = b`.form-control-container{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}.input-group{align-items:stretch;display:flex;flex-wrap:wrap;gap:var(--sgds-form-gap-lg);position:relative}.input-group>sgds-input{flex:1 1 auto;min-width:0;position:relative}.input-group sgds-button:focus,.input-group>sgds-input:focus{z-index:3}.visually-hidden{clip:rect(0,0,0,0)!important;border:0!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}`;
class Te extends $t(ce) {
  constructor() {
    super(...arguments), this.value = 0, this.step = 1, this.defaultValue = 0;
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  async _handleChange() {
    const e = await this._sgdsInput;
    (parseInt(e.value) < this.step || e.value === "") && (e.value = "0"), this.value = parseInt(e.value), this._mixinSetFormValue(), this._mixinValidate(e.input), this.invalid = !this._mixinReportValidity();
  }
  async _handleInputChange() {
    const e = await this._sgdsInput;
    this.invalid = !1, (parseInt(e.value) < this.step || e.value === "") && (e.value = "0"), this.value = parseInt(e.value), this._mixinSetFormValue(), this._mixinValidate(e.input);
  }
  async _mixinResetFormControl() {
    const e = await this._sgdsInput;
    this.value = this.defaultValue, e.input.value = this.value.toString(), this._mixinResetValidity(e.input);
  }
  _handleKeyDown(e) {
    [
      "Backspace",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      ...Array.from(Array(10).keys()).map((s) => s.toString()),
      "Tab"
    ].includes(e.key) || e.preventDefault();
  }
  _handleInvalid() {
    this.invalid = !0;
  }
  _handleValid() {
    this.invalid = !1;
  }
  /** Simulates a click on the plus button */
  plus() {
    this.plusBtn.click();
  }
  /** Simulates a click on the minus button */
  minus() {
    this.minusBtn.click();
  }
  async _onPlus(e) {
    const t = await this._sgdsInput;
    e.preventDefault(), e.stopPropagation(), this.value = parseInt(t.value) + parseInt(t.step.toString()), this._validateOnClick(t.input);
  }
  async _onMinus(e) {
    const t = await this._sgdsInput;
    e.preventDefault(), e.stopPropagation(), this.value < this.step ? this.value = 0 : this.value = parseInt(t.value) - parseInt(t.step.toString()), this._validateOnClick(t.input);
  }
  /**
   * Validates the input on button clicks of the toggle.
   * Input is validated every time the button is click to update the invalid state
   * to indiciate the validity of quantity toggle
   * @param input native HTMLInputElement
   */
  async _validateOnClick(e) {
    await (await this._sgdsInput).updateComplete, this._mixinSetFormValue(), this._mixinValidate(e), this.invalid = !this._mixinReportValidity();
  }
  _renderFeedback() {
    const e = this.hasFeedback === "both" || this.hasFeedback === "text";
    return this.invalid && e ? B` <div class="invalid-feedback-container">
          <slot name="invalidIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                fill="currentColor"
              />
            </svg>
          </slot>
          <div id="${this._controlId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
          </div>
        </div>` : B`${this._renderHintText()}`;
  }
  _renderLabel() {
    const e = B`
      <label
        for=${this._controlId}
        id=${this._labelId}
        class=${T({
      "form-label": !0,
      disabled: this.disabled
    })}
        >${this.label}</label
      >
    `;
    return this.label && e;
  }
  _renderHintText() {
    const e = B` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  render() {
    return B`
      <div class="form-control-container">
        ${this._renderLabel()}
        <div class="input-group">
          <sgds-icon-button
            variant="ghost"
            ariaLabel=${`decrease by ${this.step}`}
            ?disabled=${this.disabled || (this.min !== void 0 ? this.value <= this.min : this.value < 1)}
            @click=${this._onMinus}
            name="dash"
          >
          </sgds-icon-button>
          <sgds-input
            type="number"
            class="quantity-toggle"
            name=${C(this.name)}
            step=${C(this.step)}
            min=${C(this.min)}
            max=${C(this.max)}
            .value=${Gt(this.value)}
            @sgds-change=${this._handleChange}
            @sgds-input=${this._handleInputChange}
            @sgds-invalid=${this._handleInvalid}
            @sgds-valid=${this._handleValid}
            @keydown=${this._handleKeyDown}
            ?disabled=${this.disabled}
            id=${this._controlId}
            ?invalid=${this.invalid}
            hasFeedback=${C(this.hasFeedback !== "text" ? "style" : void 0)}
          ></sgds-input>
          <sgds-icon-button
            variant="ghost"
            ariaLabel=${`increase by ${this.step}`}
            @click=${this._onPlus}
            ?disabled=${this.disabled || this.max !== void 0 && this.max && this.value >= this.max}
            name="plus"
          >
          </sgds-icon-button>
        </div>
        <div id="announcer" role="region" aria-live="assertive" class="visually-hidden">${this.value}</div>
        ${this._renderFeedback()}
      </div>
    `;
  }
}
Te.styles = [...ce.styles, qa, Za, Ep];
Te.dependencies = {
  "sgds-input": U,
  "sgds-icon-button": Et
};
o([
  F("sgds-icon-button[ariaLabel^='increase by']")
], Te.prototype, "plusBtn", void 0);
o([
  F("sgds-icon-button[ariaLabel^='decrease by']")
], Te.prototype, "minusBtn", void 0);
o([
  c({ type: Number, reflect: !0 })
], Te.prototype, "value", void 0);
o([
  c({ type: Number })
], Te.prototype, "step", void 0);
o([
  c()
], Te.prototype, "min", void 0);
o([
  c()
], Te.prototype, "max", void 0);
o([
  c({ type: String, reflect: !0 })
], Te.prototype, "hasFeedback", void 0);
o([
  c({ type: String, reflect: !0 })
], Te.prototype, "invalidFeedback", void 0);
o([
  Zt()
], Te.prototype, "defaultValue", void 0);
o([
  bt("sgds-input")
], Te.prototype, "_sgdsInput", void 0);
A("sgds-quantity-toggle", Te);
var Ap = b`:host{outline:0}input{margin:0}.form-check{display:flex;gap:var(--sgds-form-gap-md);padding:var(--sgds-form-padding-inline-sm) 0}.form-check-input-container{height:var(--sgds-form-height-sm);width:var(--sgds-form-width-xs)}.form-check-input{appearance:none;background-color:var(--sgds-form-surface-default);background-image:var(--sgds-radio-bg-image);background-position:50%;background-repeat:no-repeat;background-size:auto;border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-default);border-radius:50%;height:var(--sgds-form-height-sm);width:var(--sgds-form-height-sm)}.form-check-input:not([disabled]):not(.is-invalid):not([aria-checked=true]):hover{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis)}.form-check-input:focus,.form-check-input:focus-visible{border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-emphasis);box-shadow:var(--sgds-form-box-shadow-focus);outline:0}.form-check-input:checked,.form-check-input[checked]{--sgds-radio-bg-image:url('data:image/svg+xml;charset=utf-8,<svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" fill="%23fff"/></svg>');background-color:var(--sgds-form-primary-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-transparent)}.form-check-input:not([disabled]):not(.is-invalid):checked:focus-visible,.form-check-input:not([disabled]):not(.is-invalid):checked:hover,.form-check-input:not([disabled]):not(.is-invalid)[checked]:focus-visible,.form-check-input:not([disabled]):not(.is-invalid)[checked]:hover{background-color:var(--sgds-form-primary-surface-emphasis)}:host([disabled]) .form-check{cursor:not-allowed;opacity:var(--sgds-opacity-50)}.form-check-input:not([disabled]).is-invalid{border:var(--sgds-form-border-width-thick) solid var(--sgds-form-danger-border-color-default)}.form-check-input:checked.is-invalid,.form-check-input[checked].is-invalid{background-color:var(--sgds-form-danger-surface-default)}`;
class dt extends f {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.invalid = !1, this.radioId = Oe("radio");
  }
  connectedCallback() {
    super.connectedCallback(), this.setInitialAttributes(), this.addEventListeners();
  }
  handleCheckedChange() {
    var e;
    this.checked && ((e = this.input) === null || e === void 0 || e.focus()), this.setAttribute("aria-checked", this.checked ? "true" : "false"), this.setAttribute("tabindex", this.checked ? "0" : "-1");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleBlur() {
    this.emit("sgds-blur");
  }
  handleClick() {
    this.disabled || (this.checked = !0);
  }
  handleFocus() {
    this.emit("sgds-focus");
  }
  addEventListeners() {
    this.addEventListener("blur", () => this.handleBlur()), this.addEventListener("click", () => this.handleClick()), this.addEventListener("focus", () => this.handleFocus());
  }
  setInitialAttributes() {
    this.setAttribute("role", "radio"), this.setAttribute("tabindex", "-1"), this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  render() {
    return p`
      <div class="form-check">
        <div class="form-check-input-container">
          <input
            class=${T({
      "form-check-input": !0,
      "is-invalid": this.invalid
    })}
            type="radio"
            id=${C(this.radioId)}
            value=${C(this.value)}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-checked=${this.checked ? "true" : "false"}
            @click=${this.handleClick}
          />
        </div>
        <label for="${C(this.radioId)}" aria-label=${C(this.ariaLabel)} class="form-check-label">
          <slot></slot>
        </label>
      </div>
    `;
  }
}
dt.styles = [...f.styles, Si, Ap];
o([
  c({ type: Boolean, reflect: !0 })
], dt.prototype, "checked", void 0);
o([
  c()
], dt.prototype, "value", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], dt.prototype, "disabled", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], dt.prototype, "invalid", void 0);
o([
  F("input")
], dt.prototype, "input", void 0);
o([
  O("checked")
], dt.prototype, "handleCheckedChange", null);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], dt.prototype, "handleDisabledChange", null);
var Dp = b`fieldset{border:0;gap:var(--sgds-form-gap-md);margin:0;min-width:0;padding:0}.label-hint-container,fieldset{display:flex;flex-direction:column}.label-hint-container{gap:var(--sgds-form-gap-sm)}.radio-group-validation-input{display:none}.radio-container{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}`;
class ke extends $t(ce) {
  constructor() {
    super(...arguments), this.defaultValue = "", this.value = "", this.invalidFeedback = "", this.hasFeedback = !1, this.required = !1, this._isTouched = !1;
  }
  _handleValueChange() {
    this.emit("sgds-change", { detail: { value: this.value } }), this._updateCheckedRadio();
  }
  _handleInvalidChange() {
    this._radios.forEach((e) => e.invalid = this.invalid);
  }
  /**
   * radio requries a custom _mixinResetFormControl as the update of input value
   * requires to fire a reset event manually
   * */
  _mixinResetFormControl() {
    this.value = this.input.value = this.defaultValue, this._updateInputValue("reset"), this._mixinResetValidity(this.input);
  }
  connectedCallback() {
    super.connectedCallback(), this.defaultValue = this.value, this.addEventListener("sgds-blur", () => {
      this._isTouched = !0;
    });
  }
  firstUpdated(e) {
    super.firstUpdated(e);
    const t = this._radios;
    t.forEach((s, a) => {
      if (t.length > 1)
        switch (a) {
          case 0:
            s.setAttribute("first-of-type", "");
            break;
          case t.length - 1:
            s.setAttribute("last-of-type", "");
            break;
          default:
            s.setAttribute("nth-of-type", "");
        }
    }), this.value && this._updateInputValue("change");
  }
  _handleRadioClick(e) {
    e.preventDefault();
    const t = e.target;
    if (t.disabled)
      return;
    this.value = t.value, this._updateInputValue(), this._radios.forEach((a) => a.checked = a === t);
  }
  /**
   * when input value is set programatically, need to manually dispatch a change event
   * In order to prevent race conditions and ensure sequence of events, set input's value here instead of binding to value prop of input
   */
  _updateInputValue(e = "change") {
    this.input.value = this.value, this.input.dispatchEvent(new InputEvent(e));
  }
  _handleKeyDown(e) {
    var t;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key))
      return;
    const s = this._radios.filter((d) => !d.disabled), a = (t = s.find((d) => d.checked)) !== null && t !== void 0 ? t : s[0], r = e.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 1;
    let n = s.indexOf(a) + r;
    n < 0 && (n = s.length - 1), n > s.length - 1 && (n = 0), this._radios.forEach((d) => {
      d.checked = !1, d.tabIndex = -1;
    }), this.value = s[n].value, this._updateInputValue(), s[n].checked = !0, s[n].tabIndex = 0, e.preventDefault();
  }
  _handleSlotChange() {
    const e = this._radios;
    e.forEach((t) => t.checked = t.value === this.value), this._disabledChildRadios(), e.some((t) => t.checked) || e[0] && (e[0].tabIndex = 0);
  }
  _updateCheckedRadio() {
    this._radios.forEach((t) => t.checked = t.value === this.value);
  }
  _renderHintText() {
    const e = p` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  _handleIsTouched() {
    this._isTouched && (this.invalid = !this.input.checkValidity());
  }
  _handleDisabledChange() {
    this.setInvalid(!1), this._disabledChildRadios();
  }
  _disabledChildRadios() {
    this.disabled && this._radios.forEach((t) => t.disabled = this.disabled);
  }
  render() {
    const e = p`
      <slot
        class="radio-container"
        @click=${this._handleRadioClick}
        @keydown=${this._handleKeyDown}
        @slotchange=${this._handleSlotChange}
        role="presentation"
      ></slot>
    `;
    return p`
      <fieldset name=${this.name}>
        <div class="label-hint-container">
          <label
            class=${T({
      "form-label": !0,
      required: this.required
    })}
          >
            ${this.label}
          </label>
          ${this._renderHintText()}
        </div>
        ${e}
        <input
          type="text"
          class="radio-group-validation-input ${T({
      "is-invalid": this.hasFeedback && this.invalid
    })}"
          ?required=${this.required}
          tabindex="-1"
          @change=${(t) => super._mixinHandleChange(t)}
          .value=${Gt(this.value)}
        />
        ${this.invalid && this.hasFeedback ? p`
              <div class="invalid-feedback-container">
                <slot name="invalidIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                      fill="currentColor"
                    />
                  </svg>
                </slot>
                <div id="radio-group-feedback" tabindex="0" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
                </div>
              </div>
            ` : E}
      </fieldset>
    `;
  }
}
ke.styles = [...ce.styles, Dp];
o([
  F("slot:not([name])")
], ke.prototype, "defaultSlot", void 0);
o([
  R()
], ke.prototype, "defaultValue", void 0);
o([
  c({ reflect: !0 })
], ke.prototype, "value", void 0);
o([
  c({ type: String, reflect: !0 })
], ke.prototype, "invalidFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ke.prototype, "hasFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ke.prototype, "required", void 0);
o([
  O("value", { waitUntilFirstUpdate: !0 })
], ke.prototype, "_handleValueChange", null);
o([
  O("invalid", { waitUntilFirstUpdate: !0 })
], ke.prototype, "_handleInvalidChange", null);
o([
  R()
], ke.prototype, "_isTouched", void 0);
o([
  ve()
], ke.prototype, "_radios", void 0);
o([
  O("_isTouched", { waitUntilFirstUpdate: !0 })
], ke.prototype, "_handleIsTouched", null);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], ke.prototype, "_handleDisabledChange", null);
A("sgds-radio", dt);
A("sgds-radio-group", ke);
var Sp = b`:host{--sidenav-sticky-top:0rem;padding:var(--sgds-padding-md)}.sticky{height:calc(100vh - var(--sidenav-sticky-top));overflow-y:visible;position:sticky;top:var(--sidenav-sticky-top)}`;
class Bi extends f {
  constructor() {
    super(...arguments), this.sticky = !1;
  }
  /** @internal */
  get items() {
    return [...this.defaultNodes || []].filter((e) => typeof e.tagName < "u");
  }
  async onToggle(e) {
    const s = e.target.tagName === "SGDS-SIDENAV-LINK";
    if (e.defaultPrevented || s)
      return;
    const a = [...this.items];
    a && a.length;
  }
  render() {
    return p`
      <nav class=${T({ sticky: this.sticky })}>
        <div>
          <slot @click=${this.onToggle}></slot>
        </div>
      </nav>
    `;
  }
}
Bi.styles = [...f.styles, Sp];
o([
  c({ type: Boolean, attribute: !0 })
], Bi.prototype, "sticky", void 0);
o([
  ve()
], Bi.prototype, "defaultNodes", void 0);
var Tp = b`:host([class^=second-level]) .sidenav-btn{font-weight:var(--sgds-font-weight-regular);padding-left:var(--sgds-padding-3-xl)}button{all:unset}.sidenav-btn{background:0;border:0;border-radius:var(--sgds-border-radius-md);display:flex;font-size:var(--sgds-font-size-2);font-weight:var(--sgds-font-weight-semibold);gap:var(--sgds-gap-xs);line-height:var(--sgds-line-height-body);padding:var(--sgds-padding-sm) var(--sgds-padding-sm) var(--sgds-padding-sm) calc(var(--sgds-padding-sm) + var(--sgds-padding-2-xs));text-align:initial;width:100%;.caret-icon,slot[name=caret-icon]::slotted(*){margin-bottom:auto;margin-left:auto;transform:rotate(180deg);transition:all .3s ease-in-out}}.sidenav-btn:hover:not(.disabled){background-color:var(--sgds-bg-translucent-subtle)}.sidenav-btn.active{color:var(--sgds-color-default)}.sidenav-btn.disabled{opacity:var(--sgds-opacity-50);pointer-events:none}.sidenav-btn:not(.active){.caret-icon,slot[name=caret-icon]::slotted(*){transform:rotate(0deg)}}.sidenav-btn:focus-visible:not(.disabled),.sidenav-btn:focus:not(.disabled){background-color:var(--sgds-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus);outline:0}.no-menu-default:focus,.no-menu-default:focus-visible{background-color:var(--sgds-default-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus)}.no-menu-default::slotted(a){background:0;border:0;border-radius:var(--sgds-border-radius-md);color:inherit!important;display:flex;font-size:var(--sgds-font-size-2);font-weight:var(--sgds-font-weight-semibold)!important;gap:var(--sgds-gap-xs);line-height:var(--sgds-line-height-body)!important;line-height:var(--sgds-line-height-body);padding:var(--sgds-padding-sm) var(--sgds-padding-sm) var(--sgds-padding-sm) calc(var(--sgds-padding-sm) + var(--sgds-padding-2-xs));text-decoration:none!important}.no-menu-default::slotted(a:focus),.no-menu-default::slotted(a:focus-visible){background-color:var(--sgds-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus);outline:0!important}:host([class^=first-level][active]) .no-menu-default::slotted(a){background-color:var(--sgds-primary-surface-translucent);color:var(--sgds-primary-color-emphasis)!important}:host([class^=first-level][disabled]) .no-menu-default::slotted(a){opacity:var(--sgds-opacity-50);pointer-events:none}`;
class Qe extends f {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.isLink = !1, this._collapseId = Oe("sidenav", "collapse"), this._buttonId = Oe("sidenav", "button"), this._levelId = Oe("sidenav", "this"), this._firstLevelId = "first-level-" + this._levelId, this._secondLevelId = "second-level-" + this._levelId, this._thirdLevelId = "third-level-" + this._levelId, this.index = "-1";
  }
  _onToggle() {
    this.emit("sgds-toggle", { detail: { index: this.index } });
  }
  /** Shows the sidenav item. Only applicable to sgds-sidenav-item that are of menu types */
  async show() {
    if (!this.isLink && !this.active)
      return this.active = !0, Le(this, "sgds-after-show");
  }
  /** Hide the sidenav item.  Only applicable to sgds-sidenav-item that are of menu types */
  async hide() {
    if (!this.isLink && this.active)
      return this.active = !1, Le(this, "sgds-after-hide");
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add(this._firstLevelId);
  }
  firstUpdated() {
    this.isLink || (this.body.hidden = !this.active, this.body.style.height = this.active ? "auto" : "0"), this._handleOpenMenu();
  }
  /**
   * Sets active to true to open menu ,
   * evaluating based on whether any of the child in any level is active
   * If at least 1 child is active, parent item should be active
   */
  _handleOpenMenu() {
    this.active || (this.active = this._items.some((e) => e.active));
  }
  _handleSummaryClick() {
    this.active ? this.hide() : this.show(), this._onToggle(), this.header.focus();
  }
  _handleSummaryKeyDown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.active ? this.hide() : this.show()), (e.key === "ArrowUp" || e.key === "ArrowLeft") && (e.preventDefault(), this.hide()), (e.key === "ArrowDown" || e.key === "ArrowRight") && (e.preventDefault(), this.show());
  }
  async _handleOpenChange() {
    if (!this.isLink)
      if (this.active) {
        if (this.emit("sgds-show", { cancelable: !0 }).defaultPrevented) {
          this.active = !1;
          return;
        }
        await ye(this.body), this.body.hidden = !1;
        const { keyframes: t, options: s } = de(this, "sidenav.show");
        await oe(this.body, os(t, this.body.scrollHeight), s), this.body.style.height = "auto", this.emit("sgds-after-show");
      } else {
        if (this.emit("sgds-hide", { cancelable: !0 }).defaultPrevented) {
          this.active = !0;
          return;
        }
        await ye(this.body);
        const { keyframes: t, options: s } = de(this, "sidenav.hide");
        await oe(this.body, os(t, this.body.scrollHeight), s), this.body.hidden = !0, this.body.style.height = "auto", this.emit("sgds-after-hide");
      }
  }
  _handleSlotChange(e) {
    const t = e.target.assignedElements({ flatten: !0 }).filter((a) => a.tagName.toLowerCase() === "a");
    if (t.length > 1)
      return console.error("More than one anchor tag is added to sgds-sidenav-item");
    if (t.length === 1) {
      const a = t[0];
      return this.disabled && a.setAttribute("tabindex", "-1"), this.active && a.setAttribute("aria-current", "true"), this.isLink = !0;
    }
    e.target.assignedElements({ flatten: !0 }).filter((a) => a.tagName.toLowerCase() === "sgds-sidenav-item").forEach((a) => {
      const r = Array.from(a.classList).filter((n) => n.startsWith("first-level"))[0];
      a.classList.replace(r, this._secondLevelId);
    }), Array.from(this.classList).some((a) => a.startsWith("second-level")) && this._items.forEach((a) => a.classList.add(this._thirdLevelId)), this._handleOpenMenu();
  }
  render() {
    const e = p`
      <button
        @click=${this._handleSummaryClick}
        @keydown=${this._handleSummaryKeyDown}
        class="sidenav-btn ${T({
      disabled: this.disabled,
      active: this.active
    })}"
        aria-expanded=${this.active}
        aria-controls=${this._collapseId}
        aria-current=${this.active}
        id=${this._buttonId}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <slot name="icon"></slot>
        <slot name="title"></slot>
        <slot name="caret-icon">
          <sgds-icon name="chevron-down" size="lg" class="caret-icon"></sgds-icon>
        </slot>
      </button>
      <div class="sidenav-body" id="${this._collapseId}">
        <div class="sidenav-list" aria-labelledby="${this._buttonId}">
          <slot class="default" @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `, t = p` <slot @slotchange=${this._handleSlotChange} class="no-menu-default"></slot> `;
    return p`
      <div class="sidenav-item" aria-haspopup="${!this.isLink}">${this.isLink ? t : e}</div>
    `;
  }
}
Qe.styles = [...f.styles, Tp];
Qe.dependencies = {
  "sgds-icon": re
};
o([
  F(".sidenav-body")
], Qe.prototype, "body", void 0);
o([
  F(".sidenav-btn")
], Qe.prototype, "header", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Qe.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Qe.prototype, "disabled", void 0);
o([
  R()
], Qe.prototype, "isLink", void 0);
o([
  O("active", { waitUntilFirstUpdate: !0 })
], Qe.prototype, "_handleOpenChange", null);
o([
  ve()
], Qe.prototype, "_items", void 0);
G("sidenav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
G("sidenav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
var Ip = b`:host([class^=third-level]) ::slotted(a){padding-left:calc(var(--sgds-padding-xl) + var(--sgds-padding-3-xl))}::slotted(a){--sgds-link-color-default:var(--sgds-color-default);border-radius:var(--sgds-border-radius-md);color:var(--sgds-color-default,var(--sgds-link-color-default));display:block;padding:var(--sgds-padding-sm) var(--sgds-padding-sm) var(--sgds-padding-sm) var(--sgds-padding-3-xl);text-decoration:none!important}:host([active]) ::slotted(a){--sgds-link-color-default:var(--sgds-primary-color-emphasis);background-color:var(--sgds-primary-surface-translucent);color:var(--sgds-primary-color-emphasis,var(--sgds-link-color-default))}:host(:not([disabled]):not([active])) ::slotted(a:hover){background-color:var(--sgds-bg-translucent-subtle)}::slotted(a:focus),::slotted(a:focus-visible),::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-color-default);color:var(--sgds-color-default,var(--sgds-link-color-emphasis))}:host([active]) ::slotted(a:focus),:host([active]) ::slotted(a:focus-visible),:host([active]) ::slotted(a:hover){--sgds-link-color-emphasis:var(--sgds-primary-color-emphasis);color:var(--sgds-primary-color-emphasis,var(--sgds-link-color-emphasis))}:host([disabled]) ::slotted(a){opacity:var(--sgds-opacity-50);pointer-events:none}:host([disabled]) ::slotted(a:focus),:host([disabled]) ::slotted(a:focus-visible){box-shadow:none;outline:0}::slotted(a:focus),::slotted(a:focus-visible){background-color:var(--sgds-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus);outline:0}:host([active]) ::slotted(a:focus),:host([active]) ::slotted(a:focus-visible){background-color:var(--sgds-primary-bg-translucent)}`;
class ks extends f {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-disabled", `${this.disabled}`);
  }
  _handleDisabled() {
    this.setAttribute("aria-disabled", `${this.disabled}`), this._anchor[0].setAttribute("aria-disabled", `${this.disabled}`), this.disabled || this._anchor[0].removeAttribute("tabindex");
  }
  _handleSlotChange() {
    this._anchor[0].setAttribute("aria-disabled", `${this.disabled}`), this.disabled && (this._anchor[0].setAttribute("tabindex", "-1"), this._anchor[0].removeAttribute("href"), this._anchor[0].setAttribute("role", "link"));
  }
  render() {
    return p` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }
}
ks.styles = [...f.styles, Ip];
o([
  c({ type: Boolean, reflect: !0 })
], ks.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ks.prototype, "disabled", void 0);
o([
  ve({ flatten: !0 })
], ks.prototype, "_anchor", void 0);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], ks.prototype, "_handleDisabled", null);
A("sgds-sidenav", Bi);
A("sgds-sidenav-item", Qe);
A("sgds-sidenav-link", ks);
var Mp = b`.skeleton{--bg:var(--sgds-bg-translucent-subtle);background-color:var(--bg);border-radius:var(--sgds-border-radius-sm);display:flex;flex-direction:column;gap:var(--sgds-gap-xs)}.skeleton.skeleton-paragraph{background-color:transparent}.skeleton.skeleton-paragraph.auto-size-rows>div[class*=skeleton-row]{background-color:var(--sgds-bg-translucent);border-radius:var(--sgds-border-radius-sm);height:-webkit-fill-available}.sheen{--sheen-color:var(--sgds-bg-translucent);animation:sheen 8s ease-in-out infinite;background:linear-gradient(270deg,var(--bg) 0,var(--sheen-color) 33.33%,var(--sheen-color) 66.67%,var(--bg) 100%);background-size:400% 100%}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.sheen{animation:none}}`;
class St extends f {
  constructor() {
    super(...arguments), this.width = "", this.height = "", this.borderRadius = "", this.sheen = !1;
  }
  firstUpdated() {
    this.width && (this.skeleton.style.width = this.width), this.height && (this.skeleton.style.height = this.height), this.borderRadius && (this.skeleton.style.borderRadius = this.borderRadius), this.rows > 0 && Array.from(this.skeleton.children).forEach((t) => t.style.borderRadius = this.borderRadius);
  }
  render() {
    return p`
      <div
        class=${T({
      skeleton: !0,
      "skeleton-paragraph": this.rows > 0,
      "auto-size-rows": this.rows > 0,
      sheen: this.sheen && !this.rows
    })}
      >
        ${this.rows > 0 ? [...Array(this.rows).keys()].map((e) => {
      const t = { [`skeleton-row-${e}`]: !0, sheen: this.sheen };
      return p`<div class=${T(t)}></div>`;
    }) : E}
      </div>
    `;
  }
}
St.styles = [Mp];
o([
  F(".skeleton")
], St.prototype, "skeleton", void 0);
o([
  c({ type: String, reflect: !0 })
], St.prototype, "width", void 0);
o([
  c({ type: String, reflect: !0 })
], St.prototype, "height", void 0);
o([
  c({ type: String, reflect: !0 })
], St.prototype, "borderRadius", void 0);
o([
  c({ type: Number, reflect: !0 })
], St.prototype, "rows", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], St.prototype, "sheen", void 0);
A("sgds-skeleton", St);
A("sgds-spinner", ys);
var Fp = b`input{margin:0}.form-check{align-items:center;display:flex;gap:var(--sgds-form-gap-lg)}.form-check-input{--sgds-switch-width:var(--sgds-form-width-xl);--sgds-switch-height:var(--sgds-form-height-md);--sgds-switch-bg-image:url('data:image/svg+xml;charset=utf-8,<svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.5 12c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12Z" fill="%23fff"/></svg>');appearance:none;background-color:var(--sgds-form-surface-subtle);background-image:var(--sgds-switch-bg-image);background-position:left var(--sgds-form-padding-inline-sm) center;background-repeat:no-repeat;background-size:var(--sgds-form-width-xs) var(--sgds-form-height-sm);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-transparent);border-radius:var(--sgds-form-border-radius-full);height:var(--sgds-switch-height);padding:0 var(--sgds-form-padding-inline-sm);transition:background-position .15s ease-in-out;width:var(--sgds-switch-width)}.form-check-input:focus,.form-check-input:focus-visible{background-color:var(--sgds-form-surface-emphasis);box-shadow:var(--sgds-form-box-shadow-focus);outline:0}.form-check-input:not([disabled]):hover{background-color:var(--sgds-form-surface-emphasis)}.form-check-input:checked,.form-check-input[checked]{background-color:var(--sgds-form-primary-surface-default);background-position:right var(--sgds-form-padding-inline-sm) center}.form-check-input:not([disabled]):checked:focus,.form-check-input:not([disabled]):checked:hover,.form-check-input:not([disabled])[checked]:focus-visible,.form-check-input:not([disabled])[checked]:hover{background-color:var(--sgds-form-primary-surface-emphasis)}:host([disabled]) .form-check{cursor:not-allowed;opacity:var(--sgds-opacity-50)}:host([size=sm]) .form-check{font-size:var(--sgds-font-size-1)}:host([size=sm]) .form-check-input{--sgds-switch-width:var(--sgds-form-width-md);--sgds-switch-height:var(--sgds-form-height-sm);background-size:var(--sgds-form-width-2-xs) var(--sgds-form-height-2-xs)}:host([size=lg]) .form-check{font-size:var(--sgds-font-size-3)}:host([size=lg]) .form-check-input{--sgds-switch-width:var(--sgds-form-width-3-xl);--sgds-switch-height:var(--sgds-form-height-lg);background-size:var(--sgds-form-width-sm) var(--sgds-form-height-md)}@media (prefers-reduced-motion:reduce){.form-check .form-check-input{transition:none}}:host([icon]) .form-check-input:checked,:host([icon]) .form-check-input[checked]{--sgds-switch-bg-image:url('data:image/svg+xml;charset=utf-8,<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16Zm8.94-21.778a.776.776 0 0 0-.424-.424.781.781 0 0 0-.854.17L13.261 20.372l-4.924-4.925a.783.783 0 1 0-1.108 1.108l5.478 5.478a.777.777 0 0 0 .692.217.787.787 0 0 0 .416-.217L24.77 11.076a.777.777 0 0 0 .17-.854Z" fill="%23fff"/></svg>')}:host([icon]) .form-check-input{--sgds-switch-bg-image:url('data:image/svg+xml;charset=utf-8,<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16ZM10.164 9.416a.75.75 0 0 0-.53 1.28L14.937 16l-5.303 5.303a.75.75 0 0 0 1.06 1.061l5.304-5.303 5.303 5.303a.75.75 0 1 0 1.06-1.06L17.06 16l5.303-5.303a.75.75 0 0 0-1.06-1.061l-5.304 5.304-5.303-5.304a.75.75 0 0 0-.53-.22Z" fill="%23fff"/></svg>')}.d-none{display:none}`;
class Je extends f {
  constructor() {
    super(...arguments), this.size = "md", this.icon = !1, this.checked = !1, this.disabled = !1, this.defaultChecked = !1, this._inputId = Oe("switch");
  }
  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }
  /** Sets focus on the switch. */
  focus(e) {
    this.input.focus(e);
  }
  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }
  _handleChange() {
    this.checked = !this.checked, this.emit("sgds-change", { detail: { checked: this.checked } });
  }
  _handleKeyDown(e) {
    const t = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    e.key === "Enter" && !t && this.click();
  }
  /** @internal */
  _handleDisabledChange() {
    this.input.disabled = this.disabled;
  }
  firstUpdated() {
    var e;
    if (this._leftIconNodes.length === 0)
      return (e = this.shadowRoot.querySelector(".form-check-label.left-label")) === null || e === void 0 ? void 0 : e.classList.add("d-none");
  }
  render() {
    return p`
      <div class="form-check">
        <label for="${this._inputId}" class="form-check-label left-label"><slot name="leftLabel"></slot></label>
        <input
          class=${T({
      "form-check-input": !0
    })}
          type="checkbox"
          id=${this._inputId}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
        />
        <label for="${this._inputId}" class="form-check-label"><slot></slot></label>
      </div>
    `;
  }
}
Je.styles = [...f.styles, Si, Fp];
o([
  c({ reflect: !0, type: String })
], Je.prototype, "size", void 0);
o([
  c({ reflect: !0, type: Boolean })
], Je.prototype, "icon", void 0);
o([
  F('input[type="checkbox"]')
], Je.prototype, "input", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Je.prototype, "checked", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Je.prototype, "disabled", void 0);
o([
  Zt("checked")
], Je.prototype, "defaultChecked", void 0);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], Je.prototype, "_handleDisabledChange", null);
o([
  Us({ slot: "leftLabel", flatten: !0 })
], Je.prototype, "_leftIconNodes", void 0);
A("sgds-switch", Je);
var Op = b`.stepper{display:flex;flex-wrap:wrap}.stepper.vertical{flex-direction:column}.stepper.horizontal .stepper-item-container{align-items:center;display:flex;flex-basis:1em;flex-direction:column;flex-grow:1;flex-shrink:1;position:relative}.stepper.vertical .stepper-item-container{position:relative;width:fit-content}.stepper .stepper-item{align-items:center;display:flex;flex-direction:column;gap:var(--sgds-gap-sm)}.stepper.vertical .stepper-item{align-items:flex-start;flex-direction:row}.stepper.vertical .stepper-item-container:not(:last-child) .stepper-item{margin-bottom:var(--sgds-padding-xl)}.stepper .stepper-item:focus,.stepper .stepper-item:focus-visible{outline:0}.stepper .stepper-item.is-clickable:focus,.stepper .stepper-item.is-clickable:focus-visible{box-shadow:var(--sgds-box-shadow-focus)}.stepper.horizontal .stepper-item-container:not(:first-child) .stepper-item:before{background:var(--sgds-border-color-translucent);bottom:0;content:" ";height:var(--sgds-dimension-2);left:calc(-50% + 16px);position:absolute;top:15px;width:calc(100% - var(--sgds-dimension-32))}.stepper.vertical .stepper-item-container:not(:last-child) .stepper-item:after{background:var(--sgds-bg-translucent);bottom:0;content:" ";height:calc(100% - var(--sgds-dimension-32));left:15px;position:absolute;top:32px;width:var(--sgds-dimension-2)}.stepper.horizontal .stepper-item-container .stepper-item.is-active:before,.stepper.horizontal .stepper-item-container .stepper-item.is-completed:before,.stepper.vertical .stepper-item-container .stepper-item.is-completed:after{background:var(--sgds-primary-border-color-default)}.stepper .stepper-item.is-clickable{cursor:pointer}.stepper .stepper-marker{align-items:center;background:var(--sgds-bg-translucent);border:var(--sgds-border-width-2) solid var(--sgds-border-color-transparent);border-radius:50%;color:var(--sgds-color-default);display:flex;height:var(--sgds-dimension-32);justify-content:center;width:var(--sgds-dimension-32);z-index:1}.stepper:not(.vertical) .stepper-detail{max-width:var(--sgds-dimension-128);text-align:center}.stepper.vertical .stepper-detail{padding:var(--sgds-padding-2-xs) 0 0;text-align:left}.stepper .stepper-item:not(.is-active):not(.is-completed) .stepper-detail{color:var(--sgds-color-subtle)}.stepper .stepper-item.is-clickable:focus .stepper-marker,.stepper .stepper-item.is-clickable:focus-visible .stepper-marker,.stepper .stepper-item.is-clickable:hover .stepper-marker{background-color:var(--sgds-primary-surface-emphasis);border-color:var(--sgds-border-color-transparent);color:var(--sgds-color-fixed-light)}.stepper .stepper-item.is-clickable:focus .stepper-detail,.stepper .stepper-item.is-clickable:focus-visible .stepper-detail,.stepper .stepper-item.is-clickable:hover .stepper-detail{color:var(--sgds-primary-color-emphasis)}.stepper .stepper-item.is-clickable .stepper-detail,.stepper.clickable .stepper-item.is-active .stepper-detail{color:var(--sgds-primary-color-default)}.stepper .stepper-item.is-active .stepper-marker{background-color:var(--sgds-primary-surface-default);color:var(--sgds-color-fixed-light)}.stepper .stepper-item.is-completed .stepper-marker{background-color:var(--sgds-bg-transparent);border:var(--sgds-border-width-2) solid var(--sgds-primary-border-color-default);color:var(--sgds-primary-color-default)}`;
class lt extends f {
  constructor() {
    super(...arguments), this.steps = [], this.activeStep = 0, this.orientation = "horizontal", this.clickable = !1, this.defaultActiveStep = 0;
  }
  /** By default, it returns the corresponding component of the current activeStep as defined in the steps metadata. To get other components, pass in your desired step number as the parameter*/
  getComponent(e = this.activeStep) {
    return this.steps[e].component;
  }
  /** Moves the active step forward one step */
  nextStep() {
    this.emit("sgds-next-step"), this.activeStep < this.steps.length - 1 && this.activeStep++;
  }
  /** Moves the active step back one step */
  previousStep() {
    this.emit("sgds-previous-step"), this.activeStep > 0 && this.activeStep--;
  }
  /** Changes the active step to the last step */
  lastStep() {
    this.emit("sgds-last-step"), this.activeStep !== this.steps.length - 1 && (this.activeStep = this.steps.length - 1);
  }
  /** Changes active step to the first step */
  firstStep() {
    this.emit("sgds-first-step"), this.activeStep > 0 && (this.activeStep = 0);
  }
  /** Resets the Stepper to its initial active step state */
  reset() {
    this.emit("sgds-reset"), this.activeStep = this.defaultActiveStep;
  }
  /**@internal */
  _onStepperItemClick(e) {
    this.activeStep > e && (this.activeStep = e);
  }
  /**@internal */
  _handleActiveStepChange() {
    this.emit("sgds-arrived");
  }
  /**@internal */
  _handleKeyDown(e, t) {
    e.key === "Enter" && this._onStepperItemClick(t);
  }
  render() {
    return p`
      <div
        class="stepper ${T({
      [`${this.orientation}`]: this.orientation,
      clickable: this.clickable
    })}"
      >
        ${this.steps.map(({ stepHeader: e, iconName: t }, s) => p`
            <div class="stepper-item-container">
              <div
                class="stepper-item ${T({
      "is-active": this.activeStep === s,
      "is-completed": this.activeStep > s,
      "is-clickable": this.clickable && this.activeStep > s
    })}"
                tabindex=${this.clickable && this.activeStep > s ? "0" : "-1"}
                aria-current=${this.activeStep === s ? "step" : "false"}
                aria-disabled=${this.activeStep <= s ? "true" : "false"}
                @click="${this.clickable ? () => this._onStepperItemClick(s) : null}"
                @keydown=${this.clickable ? (a) => this._handleKeyDown(a, s) : null}
              >
                <div class="stepper-marker">
                  ${t ? p`<sgds-icon name=${t} size="md"></sgds-icon>` : s + 1}
                </div>
                <div class="stepper-detail">${e}</div>
              </div>
            </div>
          `)}
      </div>
    `;
  }
}
lt.styles = [...f.styles, Op];
lt.dependencies = { "sgds-icon": re };
o([
  c({ type: Array })
], lt.prototype, "steps", void 0);
o([
  c({ type: Number, reflect: !0 })
], lt.prototype, "activeStep", void 0);
o([
  c({ type: String, reflect: !0 })
], lt.prototype, "orientation", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], lt.prototype, "clickable", void 0);
o([
  Zt("activeStep")
], lt.prototype, "defaultActiveStep", void 0);
o([
  O("activeStep", { waitUntilFirstUpdate: !0 })
], lt.prototype, "_handleActiveStepChange", null);
A("sgds-stepper", lt);
var Lp = b`:host([density=compact]) .tab{font-size:var(--sgds-font-size-1);padding:var(--sgds-spacer-3) var(--sgds-spacer-5)}:host(:not([active])) .tab{cursor:pointer}:host([variant=solid]) .tab{background-color:var(--sgds-bg-translucent-subtle);border-radius:var(--sgds-border-radius-md)}:host([variant=solid][active]) .tab{background-color:var(--sgds-primary-surface-default);color:var(--sgds-color-fixed-light)}:host([variant=solid]:not([active]):not([disabled])) .tab:focus,:host([variant=solid]:not([active]):not([disabled])) .tab:focus-visible{background-color:var(--sgds-bg-translucent);box-shadow:var(--sgds-box-shadow-focus);outline:0}:host([variant=solid]:not([active]):not([disabled])) .tab:hover{background-color:var(--sgds-bg-translucent)}:host([disabled]) .tab{cursor:not-allowed;opacity:var(--sgds-opacity-50)}:host([variant=underlined][active]) .tab{color:var(--sgds-primary-color-default)}:host([variant=underlined][orientation=vertical]) .tab{border-right:var(--sgds-border-width-1) solid var(--sgds-border-color-muted)}:host([variant=underlined][orientation=vertical][active]) .tab:after{background-color:var(--sgds-primary-surface-default);bottom:0;content:"";height:100%;position:absolute;right:-1px;width:var(--sgds-border-width-4)}:host([variant=underlined][orientation=horizontal]) .tab{border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-muted)}:host([variant=underlined][orientation=horizontal][active]) .tab:after{background-color:var(--sgds-primary-surface-default);bottom:-1px;content:"";height:var(--sgds-border-width-4);left:0;position:absolute;width:100%}:host([variant=underlined]:not([active]):not([disabled])) .tab:focus,:host([variant=underlined]:not([active]):not([disabled])) .tab:focus-visible{background-color:var(--sgds-bg-translucent-subtle);box-shadow:var(--sgds-box-shadow-focus);outline:0}:host([variant=underlined]:not([active]):not([disabled])) .tab:hover{background-color:var(--sgds-bg-translucent-subtle)}.tab{align-items:center;color:var(--sgds-color-default);display:flex;gap:var(--sgds-spacer-3);padding:var(--sgds-spacer-4) var(--sgds-spacer-5);position:relative}.tab:focus,.tab:focus-visible{box-shadow:var(--sgds-box-shadow-focus);outline:0}`;
let Pp = 0;
class Tt extends f {
  constructor() {
    super(...arguments), this.attrId = ++Pp, this.componentId = `sgds-tab-${this.attrId}`, this.panel = "", this.active = !1, this.disabled = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.id = this.id.length > 0 ? this.id : this.componentId, this.setAttribute("role", "tab");
  }
  /** Sets focus to the tab. */
  focus(e) {
    var t, s;
    (s = (t = this.shadowRoot) === null || t === void 0 ? void 0 : t.querySelector(".tab")) === null || s === void 0 || s.focus(e);
  }
  /** Removes focus from the tab. */
  blur() {
    this.tab.blur();
  }
  /**@internal */
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  /**@internal */
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false"), this.disabled && (this.active = !1);
  }
  render() {
    return p`
      <div data-testid="inner-tab" tabindex=${this.disabled ? "-1" : "0"} class="tab">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `;
  }
}
Tt.styles = [Lp];
o([
  F(".tab")
], Tt.prototype, "tab", void 0);
o([
  c({ reflect: !0 })
], Tt.prototype, "panel", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Tt.prototype, "active", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Tt.prototype, "disabled", void 0);
o([
  O("active")
], Tt.prototype, "handleActiveChange", null);
o([
  O("disabled")
], Tt.prototype, "handleDisabledChange", null);
var Bp = b`.tab-group{display:flex;flex-direction:column;gap:var(--sgds-gap-xl)}.tab-group__nav{display:flex;flex-direction:row}.tab-group__content{flex:1}:host([orientation=vertical]) .tab-group{flex-direction:row}:host([orientation=vertical]) .tab-group__nav{flex-direction:column}:host([variant=solid]) .tab-group__nav{gap:var(--sgds-gap-xs)}`;
class ct extends f {
  constructor() {
    super(...arguments), this._tabs = [], this._panels = [], this.variant = "underlined", this.orientation = "horizontal", this.density = "default";
  }
  connectedCallback() {
    const e = Promise.all([
      customElements.whenDefined("sgds-tab"),
      customElements.whenDefined("sgds-tab-panel")
    ]);
    super.connectedCallback(), this._resizeObserver = new ResizeObserver(() => {
    }), this._mutationObserver = new MutationObserver((t) => {
      t.some((s) => !["aria-labelledby", "aria-controls"].includes(s.attributeName)) && setTimeout(() => this._setAriaLabels()), t.some((s) => s.attributeName === "disabled") && this._syncTabsAndPanels();
    }), this.updateComplete.then(() => {
      this._syncTabsAndPanels(), this._mutationObserver.observe(this, { attributes: !0, childList: !0, subtree: !0 }), this._resizeObserver.observe(this._nav), e.then(() => {
        new IntersectionObserver((s, a) => {
          var r;
          s[0].intersectionRatio > 0 && (this._setAriaLabels(), this._setActiveTab((r = this._getActiveTab()) !== null && r !== void 0 ? r : this._tabs[0], { emitEvents: !1 }), a.unobserve(s[0].target));
        }).observe(this._tabGroup);
      });
    });
  }
  disconnectedCallback() {
    this._mutationObserver.disconnect(), this._resizeObserver.unobserve(this._nav);
  }
  /** Shows the specified tab panel. */
  show(e) {
    const t = this._tabs.find((s) => s.panel === e);
    t && this._setActiveTab(t);
  }
  _getAllTabs(e = { includeDisabled: !0 }) {
    return [...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter((s) => e.includeDisabled ? s.tagName.toLowerCase() === "sgds-tab" : s.tagName.toLowerCase() === "sgds-tab" && !s.disabled);
  }
  _getAllPanels() {
    return [...this._body.assignedElements()].filter((e) => e.tagName.toLowerCase() === "sgds-tab-panel");
  }
  _getActiveTab() {
    return this._tabs.find((e) => e.active);
  }
  _handleClick(e) {
    const s = e.target.closest("sgds-tab");
    (s == null ? void 0 : s.closest("sgds-tab-group")) === this && s !== null && this._setActiveTab(s);
  }
  _handleKeyDown(e) {
    const s = e.target.closest("sgds-tab");
    if ((s == null ? void 0 : s.closest("sgds-tab-group")) === this && (["Enter", " "].includes(e.key) && s !== null && (this._setActiveTab(s), e.preventDefault()), ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key))) {
      const r = this._tabs.find((n) => n.matches(":focus"));
      if ((r == null ? void 0 : r.tagName.toLowerCase()) === "sgds-tab") {
        let n = this._tabs.indexOf(r);
        e.key === "Home" ? n = 0 : e.key === "End" ? n = this._tabs.length - 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? n-- : (e.key === "ArrowDown" || e.key === "ArrowRight") && n++, n < 0 && (n = this._tabs.length - 1), n > this._tabs.length - 1 && (n = 0), this._tabs[n].focus({ preventScroll: !0 }), this._setActiveTab(
          this._tabs[n]
          /** , { scrollBehavior: "smooth" }*/
        ), e.preventDefault();
      }
    }
  }
  _setActiveTab(e, t) {
    if (t = Object.assign({ emitEvents: !0 }, t), e !== this._activeTab && !e.disabled) {
      const s = this._activeTab;
      this._activeTab = e, this._tabs.forEach((a) => {
        a.active = a === this._activeTab;
      }), this._panels.map((a) => {
        var r;
        return a.active = a.name === ((r = this._activeTab) === null || r === void 0 ? void 0 : r.panel);
      }), t.emitEvents && (s && this.emit("sgds-tab-hide", { detail: { name: s.panel } }), this.emit("sgds-tab-show", { detail: { name: this._activeTab.panel } }));
    }
  }
  _setAriaLabels() {
    this._tabs.forEach((e) => {
      const t = this._panels.find((s) => s.name === e.panel);
      t && (e.setAttribute("aria-controls", t.getAttribute("id")), t.setAttribute("aria-labelledby", e.getAttribute("id")));
    });
  }
  // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
  _syncTabsAndPanels() {
    this._tabs = this._getAllTabs({ includeDisabled: !1 }), this._panels = this._getAllPanels();
  }
  _updateTabsAttribute(e) {
    if (!this._navSlot)
      return;
    this._navSlot.forEach((s) => {
      s.setAttribute(e, this[e]);
    });
  }
  _handleSlotChange() {
    this._updateTabsAttribute("variant"), this._updateTabsAttribute("orientation"), this._updateTabsAttribute("density"), this._syncTabsAndPanels();
  }
  willUpdate(e) {
    e.has("variant") && this._updateTabsAttribute("variant"), e.has("orientation") && this._updateTabsAttribute("orientation"), e.has("density") && this._updateTabsAttribute("density");
  }
  render() {
    return p`
      <div class="tab-group" @click=${this._handleClick} @keydown=${this._handleKeyDown}>
        <div class="tab-group__nav" role="tablist">
          <slot name="nav" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="tab-group__content">
          <slot class="tab-group__body" @slotchange=${this._syncTabsAndPanels}></slot>
        </div>
      </div>
    `;
  }
}
ct.styles = [...f.styles, Bp];
o([
  F(".tab-group")
], ct.prototype, "_tabGroup", void 0);
o([
  F(".tab-group__body")
], ct.prototype, "_body", void 0);
o([
  F(".tab-group__nav")
], ct.prototype, "_nav", void 0);
o([
  c({ type: String, reflect: !0 })
], ct.prototype, "variant", void 0);
o([
  c({ type: String, reflect: !0 })
], ct.prototype, "orientation", void 0);
o([
  c({ type: String, reflect: !0 })
], ct.prototype, "density", void 0);
o([
  ve({ slot: "nav", flatten: !0 })
], ct.prototype, "_navSlot", void 0);
var Rp = b`.tab-panel{display:block}.tab-panel:not(.tab-panel--active){display:none}`;
let Vp = 0;
class ti extends f {
  constructor() {
    super(...arguments), this.attrId = ++Vp, this.componentId = `sgds-tab-panel-${this.attrId}`, this.name = "", this.active = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.id = this.id.length > 0 ? this.id : this.componentId, this.setAttribute("role", "tabpanel");
  }
  _handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return p`
      <slot
        class=${T({
      "tab-panel": !0,
      "tab-panel--active": this.active
    })}
      ></slot>
    `;
  }
}
ti.styles = [...f.styles, Rp];
o([
  c({ reflect: !0 })
], ti.prototype, "name", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], ti.prototype, "active", void 0);
o([
  O("active")
], ti.prototype, "_handleActiveChange", null);
A("sgds-tab", Tt);
A("sgds-tab-group", ct);
A("sgds-tab-panel", ti);
var Np = b`tbody,td,th,thead,tr{border:var(--sgds-border-width-0) solid;border-color:inherit}th{text-align:-webkit-match-parent}table{border-collapse:collapse;caption-side:bottom}.table{border-color:var(--sgds-border-color-default);vertical-align:top;width:100%}.table>:not(caption) td,.table>:not(caption) th{border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-muted);padding:var(--sgds-padding-lg)}.table>tbody{vertical-align:inherit}.table>thead{vertical-align:bottom}.table>thead th{border-bottom:var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis)}.table-group-divider{border-top:calc(var(--sgds-border-width)*2) solid}.table>:not(:first-child){border-top:var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis)}.table-responsive{-webkit-overflow-scrolling:touch;overflow-x:auto}@media (max-width:575.98px){.table-responsive-sm{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:767.98px){.table-responsive-md{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:991.98px){.table-responsive-lg{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:1199.98px){.table-responsive-xl{-webkit-overflow-scrolling:touch;overflow-x:auto}}@media (max-width:1399.98px){.table-responsive-xxl{-webkit-overflow-scrolling:touch;overflow-x:auto}}`;
class It extends f {
  constructor() {
    super(...arguments), this.rowHeader = [], this.columnHeader = [], this.tableData = [], this.headerPosition = "horizontal", this.originalTableData = [];
  }
  connectedCallback() {
    super.connectedCallback(), this.originalTableData = [...this.tableData];
  }
  _renderTable() {
    if (this.headerPosition === "horizontal")
      return p`
        <thead>
          <tr>
            ${this.rowHeader.map((e, t) => p` <th>${e}</th> `)}
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map((e) => p`
              <tr>
                ${e.map((t) => p`<td>${t}</td>`)}
              </tr>
            `)}
        </tbody>
      `;
    if (this.headerPosition === "both")
      return p`
        <thead>
          <tr>
            <th></th>
            ${this.rowHeader.map((e, t) => p` <th>${e}</th> `)}
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map((e, t) => p`
              <tr>
                <th>${this.columnHeader[t]}</th>
                ${e.map((s) => p`<td>${s}</td>`)}
              </tr>
            `)}
        </tbody>
      `;
    if (this.headerPosition === "vertical") {
      const e = this.tableData[0].map((t, s) => this.tableData.map((a) => a[s]));
      return p`
        ${e.map((t, s) => p`
            <tr>
              <th>${this.columnHeader[s]}</th>
              ${t.map((a) => p`<td>${a}</td>`)}
            </tr>
          `)}
      `;
    }
  }
  render() {
    return p`
      <div
        class=${T({
      "table-responsive": this.responsive === "always",
      "table-responsive-sm": this.responsive === "sm",
      "table-responsive-md": this.responsive === "md",
      "table-responsive-lg": this.responsive === "lg",
      "table-responsive-xl": this.responsive === "xl"
    })}
        tabindex="0"
      >
        <table class="table">
          ${this._renderTable()}
        </table>
      </div>
    `;
  }
}
It.styles = [...f.styles, Np];
o([
  c({ type: String, reflect: !0 })
], It.prototype, "responsive", void 0);
o([
  c({ type: Array })
], It.prototype, "rowHeader", void 0);
o([
  c({ type: Array })
], It.prototype, "columnHeader", void 0);
o([
  c({ type: Array })
], It.prototype, "tableData", void 0);
o([
  c({ type: String, reflect: !0 })
], It.prototype, "headerPosition", void 0);
o([
  R()
], It.prototype, "originalTableData", void 0);
A("sgds-table", It);
var zp = b`.form-control-container{display:flex;flex-direction:column;gap:var(--sgds-form-gap-md)}.form-control-container.disabled{opacity:var(--sgds-opacity-50)}textarea{font-family:inherit;font-size:inherit;line-height:inherit;margin:0;resize:vertical}.form-control{appearance:none;background-clip:padding-box;background-color:var(--sgds-form-surface-default);border:var(--sgds-form-border-width-default) solid var(--sgds-border-color-default);border-radius:var(--sgds-form-border-radius-md);color:var(--sgds-form-color-default);min-height:var(--sgds-dimension-136);outline:0;padding:var(--sgds-form-padding-y) var(--sgds-form-padding-x);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}.form-control[readonly]{border-color:var(--sgds-border-color-muted)}@media (prefers-reduced-motion:reduce){.form-control{transition:none}}.form-control:not([disabled]):not(.is-invalid):hover{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis)}.form-control:not([disabled]):not(.is-invalid):focus,.form-control:not([disabled]):not(.is-invalid):focus-visible{border:var(--sgds-form-border-width-thick) solid var(--sgds-border-color-emphasis);box-shadow:var(--sgds-form-box-shadow-focus)}.form-control.is-invalid{border:var(--sgds-form-border-width-thick) solid var(--sgds-form-danger-border-color-default)}.form-control:disabled{background-color:var(--sgds-form-surface-muted)}.textarea-resize-none{resize:none}.textarea-resize-vertical{resize:vertical}.textarea-resize-auto{height:auto;overflow-y:hidden;resize:none}.textarea-info-container{display:flex;justify-content:space-between}.word-count{margin-left:auto}`;
class K extends $t(ce) {
  constructor() {
    super(...arguments), this.value = "", this.spellcheck = !1, this.rows = 4, this.placeholder = "Placeholder", this.invalidFeedback = "", this.autofocus = !1, this.readonly = !1, this.resize = "vertical", this.defaultValue = "", this.hasFeedback = !1, this.required = !1, this.hintText = "", this._isTouched = !1;
  }
  /** Sets focus on the textarea. */
  focus(e) {
    this.textarea.focus(e);
  }
  /** Sets blur on the textarea. */
  blur() {
    this.textarea.blur();
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  reportValidity() {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  checkValidity() {
    return this._mixinCheckValidity();
  }
  /**
   * Returns the ValidityState object
   */
  get validity() {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  /** Selects all the text in the textarea. */
  select() {
    this.textarea.select();
  }
  _handleInvalid(e) {
    e.preventDefault(), this.invalid = !0;
  }
  _handleChange(e) {
    this.value = this.input.value, this.emit("sgds-change"), super._mixinHandleChange(e);
  }
  _handleInputChange(e) {
    this.value = this.input.value, this.emit("sgds-input"), super._mixinHandleInputChange(e);
  }
  _handleFocus() {
    this.emit("sgds-focus");
  }
  _handleBlur() {
    this._isTouched = !0, this.emit("sgds-blur");
  }
  /** @internal */
  _handleRowsChange() {
    this._setTextareaHeight();
  }
  _setTextareaHeight() {
    this.resize === "auto" ? (this.textarea.style.height = "auto", this.textarea.style.height = `${this.textarea.scrollHeight}px`) : this.textarea.style.height = void 0;
  }
  /** @internal */
  _handleIsTouched() {
    this._isTouched && (this.invalid = !this.textarea.checkValidity());
  }
  /** @internal */
  _handleDisabledChange() {
    this.setInvalid(!1);
  }
  /** @internal */
  _handleValueChange() {
    this.updateComplete.then(() => this._setTextareaHeight());
  }
  _renderHintText() {
    const e = B` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && e;
  }
  _wordCount() {
    return B`
      <div
        class="form-text word-count ${T({
      "invalid-feedback": this.invalid && this.hasFeedback
    })}"
      >
        ${this.value.length}/${this.maxlength}
      </div>
    `;
  }
  render() {
    return B`
      <div
        class="form-control-container ${T({
      disabled: this.disabled
    })}"
      >
        <label for=${this._controlId} class="form-label">${this.label}</label>
        <textarea
          class=${T({
      "form-control": !0,
      "is-invalid": this.hasFeedback && this.invalid,
      "textarea-resize-none": this.resize === "none",
      "textarea-resize-vertical": this.resize === "vertical",
      "textarea-resize-auto": this.resize === "auto"
    })}
          id=${this._controlId}
          name=${C(this.name)}
          rows=${C(this.rows)}
          placeholder=${C(this.placeholder)}
          minlength=${C(this.minlength)}
          maxlength=${C(this.maxlength)}
          .value=${Gt(this.value)}
          aria-invalid=${this.invalid ? "true" : "false"}
          spellcheck=${C(this.spellcheck)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          ?autofocus=${this.autofocus}
          autocorrect=${C(this.autocorrect)}
          inputmode=${C(this.inputmode)}
          @input=${(e) => this._handleInputChange(e)}
          @change=${(e) => this._handleChange(e)}
          @invalid=${(e) => this._handleInvalid(e)}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        ></textarea>
        <div class="textarea-info-container">
          ${this.invalid && this.hasFeedback ? B`
                <div class="invalid-feedback-container">
                  <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
                  <div id="${this._controlId}-invalid" class="invalid-feedback">
                    ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
                  </div>
                </div>
              ` : B`${this._renderHintText()}`}
          ${this.maxlength > 0 ? this._wordCount() : E}
        </div>
      </div>
    `;
  }
}
K.styles = [...ce.styles, zp];
o([
  F("textarea.form-control")
], K.prototype, "textarea", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "name", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "value", void 0);
o([
  c({ type: Number, reflect: !0 })
], K.prototype, "minlength", void 0);
o([
  c({ type: Number, reflect: !0 })
], K.prototype, "maxlength", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], K.prototype, "spellcheck", void 0);
o([
  c({ type: Number })
], K.prototype, "rows", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "placeholder", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "invalidFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], K.prototype, "autofocus", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], K.prototype, "readonly", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "resize", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "inputmode", void 0);
o([
  c({ type: String, reflect: !0 })
], K.prototype, "autocorrect", void 0);
o([
  Zt()
], K.prototype, "defaultValue", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], K.prototype, "hasFeedback", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], K.prototype, "required", void 0);
o([
  c({ reflect: !0 })
], K.prototype, "hintText", void 0);
o([
  R()
], K.prototype, "_isTouched", void 0);
o([
  O("rows", { waitUntilFirstUpdate: !0 })
], K.prototype, "_handleRowsChange", null);
o([
  O("_isTouched", { waitUntilFirstUpdate: !0 })
], K.prototype, "_handleIsTouched", null);
o([
  O("disabled", { waitUntilFirstUpdate: !0 })
], K.prototype, "_handleDisabledChange", null);
o([
  O("value", { waitUntilFirstUpdate: !0 })
], K.prototype, "_handleValueChange", null);
A("sgds-textarea", K);
var Hp = b`:host([variant=info]) slot[name=icon]::slotted(*){color:var(--sgds-primary-color-default)}:host([variant=success]) slot[name=icon]::slotted(*){color:var(--sgds-success-color-default)}:host([variant=danger]) slot[name=icon]::slotted(*){color:var(--sgds-danger-color-default)}:host([variant=warning]) slot[name=icon]::slotted(*){color:var(--sgds-warning-color-fixed-light)}.toast{align-items:flex-start;background-clip:padding-box;background-color:var(--sgds-surface-default);border-radius:var(--sgds-border-radius-md);box-shadow:0 0 2px 0 rgba(0,0,0,.12),0 8px 16px 0 rgba(0,0,0,.14);display:flex;flex-direction:row;gap:var(--sgds-gap-xs);max-width:var(--sgds-dimension-480);min-width:var(--sgds-dimension-320);padding:var(--sgds-padding-md);pointer-events:auto;width:320px}.toast-content{word-wrap:break-word;gap:var(--sgds-gap-sm)}.toast-body,.toast-content{display:flex;flex-direction:column}.toast-body strong{line-height:var(--sgds-line-height-min)}.toast-body span{color:var(--sgds-color-subtle)}.toast-action{word-wrap:break-word;color:var(--sgds-link-color-default)}.toast-header strong{margin-right:auto;word-break:break-all}.close-btn{margin-left:auto}.d-none{display:none}`;
class Ie extends f {
  constructor() {
    super(...arguments), this.show = !1, this.title = "Title", this.noAnimation = !1, this.autohide = !1, this.delay = 5e3, this.variant = "info", this.dismissible = !1;
  }
  /** Shows the toast */
  async showToast() {
    if (!this.show)
      return this.show = !0, Le(this, "sgds-after-show");
  }
  /** Hide the toast */
  async hideToast() {
    if (this.show)
      return this.show = !1, Le(this, "sgds-after-hide");
  }
  /** @internal */
  handleCloseClick() {
    this.show = !1, this.emit("sgds-close");
  }
  /**@internal */
  async handleShowChange() {
    if (this.show) {
      this.emit("sgds-show"), this.toast.classList.remove("d-none");
      const e = de(this, "toast.show");
      this.noAnimation || await oe(this.toast, e.keyframes, e.options), this.emit("sgds-after-show");
    } else {
      this.emit("sgds-hide");
      const e = de(this, "toast.hide");
      this.noAnimation || await oe(this.toast, e.keyframes, e.options), this.toast.classList.add("d-none"), this.emit("sgds-after-hide");
    }
  }
  firstUpdated() {
    var e;
    if (this.show || this.toast.classList.add("d-none"), this._actionNodes.length === 0)
      return (e = this.shadowRoot.querySelector("slot[name='action']")) === null || e === void 0 ? void 0 : e.classList.add("d-none");
  }
  render() {
    return this.autohide && this.show && setTimeout(() => {
      this.show = !1;
    }, this.delay), p`
      <div
        class="toast"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
        aria-live="assertive"
        aria-atomic="true"
      >
        <slot name="icon"></slot>
        <div class="toast-content">
          <div class="toast-body">
            <strong>${this.title}</strong>
            <span><slot></slot></span>
          </div>
          <slot class="toast-action" name="action"></slot>
        </div>
        ${this.dismissible ? p`<sgds-close-button
              class="close-btn"
              ariaLabel="close toast"
              @click=${this.handleCloseClick}
            ></sgds-close-button>` : E}
      </div>
    `;
  }
}
Ie.styles = [...f.styles, Hp];
Ie.dependencies = {
  "sgds-close-button": Ze
};
o([
  F("div.toast")
], Ie.prototype, "toast", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ie.prototype, "show", void 0);
o([
  c({ type: String, reflect: !0 })
], Ie.prototype, "title", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ie.prototype, "noAnimation", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ie.prototype, "autohide", void 0);
o([
  c({ type: Number, reflect: !0 })
], Ie.prototype, "delay", void 0);
o([
  c({ type: String, reflect: !0 })
], Ie.prototype, "variant", void 0);
o([
  c({ type: Boolean, reflect: !0 })
], Ie.prototype, "dismissible", void 0);
o([
  O("show", { waitUntilFirstUpdate: !0 })
], Ie.prototype, "handleShowChange", null);
o([
  Us({ slot: "action", flatten: !0 })
], Ie.prototype, "_actionNodes", void 0);
G("toast.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400, easing: "ease" }
});
G("toast.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 400, easing: "ease" }
});
var Yp = b`.toast-container{max-width:100%;pointer-events:none;position:fixed;width:max-content;z-index:1090}.top-start{left:0;top:0}.top-center{left:50%;top:0;transform:translateX(-50%)}.top-end{right:0;top:0}.middle-start{left:0;top:50%;transform:translateY(-50%)}.middle-center{left:50%;top:50%;transform:translate(-50%,-50%)}.middle-end{right:0;top:50%;transform:translateY(-50%)}.bottom-start{bottom:0;left:0}.bottom-center{bottom:0;left:50%;transform:translateX(-50%)}.bottom-end{bottom:0;right:0}slot{display:flex;flex-direction:column;gap:.5rem}`;
class Qa extends f {
  render() {
    return B`
      <div
        class=${T({
      "sgds toast-container": !0,
      [this.position]: this.position
    })}
      >
        <slot></slot>
      </div>
    `;
  }
}
Qa.styles = [Yp];
o([
  c({ type: String, reflect: !0 })
], Qa.prototype, "position", void 0);
A("sgds-toast", Ie);
A("sgds-toast-container", Qa);
const Up = /^aria-[\w-]*$/i, Eo = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", Up],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
}, qp = /* @__PURE__ */ new Set([
  "background",
  "cite",
  "href",
  "itemtype",
  "longdesc",
  "poster",
  "src",
  "xlink:href"
]), jp = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Wp = (i, e) => {
  const t = i.nodeName.toLowerCase();
  return e.includes(t) ? qp.has(t) ? !!jp.test(i.nodeValue) : !0 : e.filter((s) => s instanceof RegExp).some((s) => s.test(t));
};
function Kp(i, e, t) {
  if (!i.length)
    return i;
  if (t && typeof t == "function")
    return t(i);
  const a = new window.DOMParser().parseFromString(i, "text/html"), r = [].concat(...a.body.querySelectorAll("*"));
  for (const n of r) {
    const d = n.nodeName.toLowerCase();
    if (!Object.keys(e).includes(d)) {
      n.remove();
      continue;
    }
    const l = [].concat(...n.attributes), h = [].concat(e["*"] || [], e[d] || []);
    for (const u of l)
      Wp(u, h) || n.removeAttribute(u.nodeName);
  }
  return a.body.innerHTML;
}
const Gp = "TemplateFactory", Zp = {
  allowList: Eo,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, Xp = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, Qp = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class Jp extends Yn {
  constructor(e) {
    super(), this._config = this._getConfig(e);
  }
  // Getters
  static get Default() {
    return Zp;
  }
  static get DefaultType() {
    return Xp;
  }
  static get NAME() {
    return Gp;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((e) => this._resolvePossibleFunction(e)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(e) {
    return this._checkContent(e), this._config.content = { ...this._config.content, ...e }, this;
  }
  toHtml() {
    const e = document.createElement("div");
    e.innerHTML = this._maybeSanitize(this._config.template);
    for (const [a, r] of Object.entries(this._config.content))
      this._setContent(e, r, a);
    const t = e.children[0], s = this._resolvePossibleFunction(this._config.extraClass);
    return s && t.classList.add(...s.split(" ")), t;
  }
  // Private
  _typeCheckConfig(e) {
    super._typeCheckConfig(e), this._checkContent(e.content);
  }
  _checkContent(e) {
    for (const [t, s] of Object.entries(e))
      super._typeCheckConfig({ selector: t, entry: s }, Qp);
  }
  _setContent(e, t, s) {
    const a = Me.findOne(s, e);
    if (a) {
      if (t = this._resolvePossibleFunction(t), !t) {
        a.remove();
        return;
      }
      if (mt(t)) {
        this._putElementInTemplate(Ns(t), a);
        return;
      }
      if (this._config.html) {
        a.innerHTML = this._maybeSanitize(t);
        return;
      }
      a.textContent = t;
    }
  }
  _maybeSanitize(e) {
    return this._config.sanitize ? Kp(e, this._config.allowList, this._config.sanitizeFn) : e;
  }
  _resolvePossibleFunction(e) {
    return Ut(e, [void 0, this]);
  }
  _putElementInTemplate(e, t) {
    if (this._config.html) {
      t.innerHTML = "", t.append(e);
      return;
    }
    t.textContent = e.textContent;
  }
}
const eg = "tooltip", tg = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), ta = "fade", sg = "modal", li = "show", ig = ".tooltip-inner", Kr = `.${sg}`, Gr = "hide.bs.modal", Ds = "hover", sa = "focus", ag = "click", rg = "manual", ng = "hide", og = "hidden", dg = "show", lg = "shown", cg = "inserted", hg = "click", ug = "focusin", pg = "focusout", gg = "mouseenter", fg = "mouseleave", mg = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: yt() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: yt() ? "right" : "left"
}, vg = {
  allowList: Eo,
  animation: !0,
  boundary: "clippingParents",
  container: !1,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: !1,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: !0,
  sanitizeFn: null,
  selector: !1,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
}, bg = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
class Ri extends Un {
  constructor(e, t) {
    if (typeof In > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
    super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return vg;
  }
  static get DefaultType() {
    return bg;
  }
  static get NAME() {
    return eg;
  }
  // Public
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout), j.off(this._element.closest(Kr), Gr, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const e = j.trigger(this._element, this.constructor.eventName(dg)), s = (On(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (e.defaultPrevented || !s)
      return;
    this._disposePopper();
    const a = this._getTipElement();
    this._element.setAttribute("aria-describedby", a.getAttribute("id"));
    const { container: r } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(a), j.trigger(this._element, this.constructor.eventName(cg))), this._popper = this._createPopper(a), a.classList.add(li), "ontouchstart" in document.documentElement)
      for (const d of [].concat(...document.body.children))
        j.on(d, "mouseover", vi);
    const n = () => {
      j.trigger(this._element, this.constructor.eventName(lg)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(n, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || j.trigger(this._element, this.constructor.eventName(ng)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(li), "ontouchstart" in document.documentElement)
      for (const a of [].concat(...document.body.children))
        j.off(a, "mouseover", vi);
    this._activeTrigger[ag] = !1, this._activeTrigger[sa] = !1, this._activeTrigger[Ds] = !1, this._isHovered = null;
    const s = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), j.trigger(this._element, this.constructor.eventName(og)));
    };
    this._queueCallback(s, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  // Protected
  _isWithContent() {
    return !!this._getTitle();
  }
  _getTipElement() {
    return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
  }
  _createTipElement(e) {
    const t = this._getTemplateFactory(e).toHtml();
    if (!t)
      return null;
    t.classList.remove(ta, li), t.classList.add(`bs-${this.constructor.NAME}-auto`);
    const s = bl(this.constructor.NAME).toString();
    return t.setAttribute("id", s), this._isAnimated() && t.classList.add(ta), t;
  }
  setContent(e) {
    this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(e) {
    return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new Jp({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: e,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [ig]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(e) {
    return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(ta);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(li);
  }
  _createPopper(e) {
    const t = Ut(this._config.placement, [this, e, this._element]), s = mg[t.toUpperCase()];
    return Ra(this._element, e, this._getPopperConfig(s));
  }
  _getOffset() {
    const { offset: e } = this._config;
    return typeof e == "string" ? e.split(",").map((t) => Number.parseInt(t, 10)) : typeof e == "function" ? (t) => e(t, this._element) : e;
  }
  _resolvePossibleFunction(e) {
    return Ut(e, [this._element, this._element]);
  }
  _getPopperConfig(e) {
    const t = {
      placement: e,
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        },
        {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        },
        {
          name: "preSetPlacement",
          enabled: !0,
          phase: "beforeMain",
          fn: (s) => {
            this._getTipElement().setAttribute("data-popper-placement", s.state.placement);
          }
        }
      ]
    };
    return {
      ...t,
      ...Ut(this._config.popperConfig, [void 0, t])
    };
  }
  _setListeners() {
    const e = this._config.trigger.split(" ");
    for (const t of e)
      if (t === "click")
        j.on(this._element, this.constructor.eventName(hg), this._config.selector, (s) => {
          this._initializeOnDelegatedTarget(s).toggle();
        });
      else if (t !== rg) {
        const s = t === Ds ? this.constructor.eventName(gg) : this.constructor.eventName(ug), a = t === Ds ? this.constructor.eventName(fg) : this.constructor.eventName(pg);
        j.on(this._element, s, this._config.selector, (r) => {
          const n = this._initializeOnDelegatedTarget(r);
          n._activeTrigger[r.type === "focusin" ? sa : Ds] = !0, n._enter();
        }), j.on(this._element, a, this._config.selector, (r) => {
          const n = this._initializeOnDelegatedTarget(r);
          n._activeTrigger[r.type === "focusout" ? sa : Ds] = n._element.contains(r.relatedTarget), n._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, j.on(this._element.closest(Kr), Gr, this._hideModalHandler);
  }
  _fixTitle() {
    const e = this._element.getAttribute("title");
    e && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    this._isHovered = !0, this._setTimeout(() => {
      this._isHovered && this.show();
    }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
      this._isHovered || this.hide();
    }, this._config.delay.hide));
  }
  _setTimeout(e, t) {
    clearTimeout(this._timeout), this._timeout = setTimeout(e, t);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(e) {
    const t = zs.getDataAttributes(this._element);
    for (const s of Object.keys(t))
      tg.has(s) && delete t[s];
    return e = {
      ...t,
      ...typeof e == "object" && e ? e : {}
    }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e.container = e.container === !1 ? document.body : Ns(e.container), typeof e.delay == "number" && (e.delay = {
      show: e.delay,
      hide: e.delay
    }), typeof e.title == "number" && (e.title = e.title.toString()), typeof e.content == "number" && (e.content = e.content.toString()), e;
  }
  _getDelegateConfig() {
    const e = {};
    for (const [t, s] of Object.entries(this._config))
      this.constructor.Default[t] !== s && (e[t] = s);
    return e.selector = !1, e.trigger = "manual", e;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const t = Ri.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof t[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        t[e]();
      }
    });
  }
}
Pn(Ri);
var yg = b`:host{display:contents}.tooltip-placeholder{display:inline-block}.tooltip{word-wrap:break-word;display:block;line-break:auto;opacity:0;text-align:left;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;z-index:1080}.tooltip.show{opacity:1}.tooltip-inner{background-color:var(--sgds-surface-fixed-dark);border-radius:var(--sgds-border-radius-md);box-shadow:0 0 2px 0 rgba(0,0,0,.12),0 8px 16px 0 rgba(0,0,0,.14);color:var(--sgds-color-fixed-light);font-size:var(--sgds-font-size-1);max-width:var(--sgds-dimension-320);padding:var(--sgds-padding-xs) var(--sgds-padding-sm)}div{max-width:fit-content}`;
class Xt extends f {
  constructor() {
    super(...arguments), this._myTooltip = $a(), this._bsTooltip = null, this.content = "", this.placement = "top", this.trigger = "hover focus";
  }
  _handleSlotChange() {
    this._tooltipTargetElements.forEach((e) => e.setAttribute("data-sgds-tooltip", this.content));
  }
  _handleClickOutOfElement(e, t) {
    e.composedPath().includes(t) || this.hide();
  }
  connectedCallback() {
    super.connectedCallback(), this.trigger === "click" && (document.addEventListener("click", (e) => this._handleClickOutOfElement(e, this)), document.addEventListener("touchstart", (e) => this._handleClickOutOfElement(e, this)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", (e) => this._handleClickOutOfElement(e, this)), document.removeEventListener("touchstart", (e) => this._handleClickOutOfElement(e, this));
  }
  _initializeTooltip() {
    this.tooltipConfig = {
      popperConfig: (e) => {
        this.popperConfig = e;
        const s = e.modifiers.map((a) => (a.name === "flip" && (a.options.fallbackPlacements = []), a));
        return this.popperConfig.modifiers = s, this.popperConfig;
      },
      placement: this.placement,
      trigger: this.trigger,
      title: this.content,
      html: !0,
      container: this.shadowRoot.querySelector("div")
      // tooltip to appear inside the shadow root of sgds-tooltip instead of anywhere in the DOM, so that scoped styles can apply
    }, this._bsTooltip = new Ri(this._myTooltip.value, this.tooltipConfig);
  }
  firstUpdated() {
    this._initializeTooltip(), this._myTooltip.value.addEventListener("show.bs.tooltip", () => {
      this.emit("sgds-show");
    }), this._myTooltip.value.addEventListener("shown.bs.tooltip", () => {
      this.emit("sgds-after-show");
    }), this._myTooltip.value.addEventListener("hide.bs.tooltip", () => {
      this.emit("sgds-hide");
    }), this._myTooltip.value.addEventListener("hidden.bs.tooltip", () => {
      this.emit("sgds-after-hide");
    });
  }
  /** Hides the Tooltip */
  hide() {
    this._bsTooltip.hide();
  }
  /** Shows the Tooltip */
  show() {
    this._bsTooltip.show();
  }
  render() {
    return p`
      <div ${Ws(this._myTooltip)} class="tooltip-placeholder">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
Xt.styles = [...f.styles, yg];
o([
  c({ type: String })
], Xt.prototype, "content", void 0);
o([
  c({ type: String })
], Xt.prototype, "placement", void 0);
o([
  c({ type: String })
], Xt.prototype, "trigger", void 0);
o([
  R()
], Xt.prototype, "popperConfig", void 0);
o([
  ve()
], Xt.prototype, "_tooltipTargetElements", void 0);
A("sgds-tooltip", Xt);
var wg = b`.container{display:flex;flex-direction:column;gap:var(--sgds-gap-xl)}slot:not([name])::slotted(*){--sgds-font-size-5:var(--sgds-font-size-4);--sgds-font-size-6:var(--sgds-font-size-4);--sgds-margin-2-xs:var(--sgds-margin-none);--sgds-font-weight-bold:var(--sgds-font-weight-semibold);font-size:var(--sgds-font-size-4);font-weight:var(--sgds-font-weight-bold,var(--sgds-font-weight-semibold));margin-bottom:var(--sgds-margin-2-xs,var(--sgds-margin-none))}.contents{display:flex;flex-direction:column;gap:var(--sgds-gap-md);list-style:none;margin:var(--sgds-margin-none);padding:var(--sgds-padding-none)}slot[name=contents]::slotted(li){--sgds-margin-3-xs:var(--sgds-margin-none);margin-top:var(--sgds-margin-3-xs,var(--sgds-margin-none))}`;
class Ao extends f {
  render() {
    return p`<div class="container">
      <slot></slot>
      <ul class="contents">
        <slot name="contents"></slot>
      </ul>
    </div> `;
  }
}
Ao.styles = [...f.styles, wg];
customElements.define("sgds-table-of-contents", Ao);
class kg extends HTMLElement {
  constructor() {
    super(), this.options = {
      placeholder: "Enter your address or postal code",
      distanceOptions: [
        { label: "Schools within 500m", value: "0.5", disabled: !0 },
        { label: "Schools between 500m to 1km", value: "1", disabled: !0 }
      ],
      areas: [],
      partnerCentres: [],
      specialNeeds: []
    };
  }
  connectedCallback() {
    this.style.display = "block", this.style.width = "100%", this.parseData(), this.render();
  }
  /**
   * Parse JSON data from child <script type="application/json"> tag
   */
  parseData() {
    const e = this.querySelector('script[type="application/json"]');
    if (e)
      try {
        const t = JSON.parse(e.textContent || "{}");
        this.options = { ...this.options, ...t };
      } catch (t) {
        console.error("Failed to parse SchoolFinderSidebar data", t);
      }
  }
  createRenderRoot() {
    return this;
  }
  render() {
    this.innerHTML = `
      <div class="col-span-4 pr-8 py-8" id="schoolFinderSidebar">
        ${this.renderHeader()}
        <sgds-accordion>
          ${this.renderLocationAccordion()}
          ${this.renderPartnerCentresAccordion()}
          ${this.renderSpecialNeedsAccordion()}
        </sgds-accordion>
      </div>
    `;
  }
  renderHeader() {
    return `
      <div class="flex items-center justify-between text-gray-700 mb-4">
        <div class="flex items-center">
          <span class="text-xl mr-2 icon-filter"></span>
          <span class="text-base">Criteria</span>
        </div>
        <button class="text-primary-500 text-base" id="clearAllBtn">Clear all</button>
      </div>
    `;
  }
  renderLocationAccordion() {
    const e = this.options.distanceOptions.map(
      (s, a) => `
          <div class="moe-radio mt-4 ${s.disabled ? "type--disabled" : ""}">
            <input id="distance-${a}" type="radio" name="postal-code-filter" value="${s.value}" ${s.disabled ? "disabled" : ""} />
            <label for="distance-${a}" class="pl-2">
              ${s.label}
              <div class="check"></div>
            </label>
          </div>
        `
    ).join(""), t = this.options.areas.map((s) => `<option value="${s.value}">${s.label}</option>`).join("");
    return `
      <sgds-accordion-item open>
        <div slot="header" class="moe-sidebar-toggle__button w-full flex items-center justify-between">
          <div class="moe-sidebar-toggle__button__label">Location</div>
          <span class="icon-chevron-down"></span>
        </div>
        <div slot="content" class="moe-sidebar-toggle__content__inner">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="Information correct as November 2022. Singapore Land Authority." tabindex="0"></span>
            <span class="text-xs text-gray-400">Disclaimer</span>
          </div>
          <span class="block text-sm mb-2">Search for schools near you</span>
          <div class="moe-autosuggest moe-autosuggest--size-large mb-4">
            <input placeholder="${this.options.placeholder}" aria-label="${this.options.placeholder}" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          ${e}
          <span class="block my-6 text-sm font-bold">OR</span>
          <div class="flex flex-row justify-between items-center mb-2">
            <span class="text-sm">Search for schools by area</span>
          </div>
          <div class="moe-select mb-4 moe-select--no-selection moe-select--size-full">
            <button type="button" class="w-full flex items-center justify-between border border-gray-300 rounded px-3 py-2">
              Select an area
              <span class="icon-dropdown"></span>
            </button>
            <!-- future select menu: ${t} -->
          </div>
        </div>
      </sgds-accordion-item>
    `;
  }
  renderPartnerCentresAccordion() {
    return `
      <sgds-accordion-item>
        <div slot="header" class="moe-sidebar-toggle__button w-full flex items-center justify-between">
          <div class="moe-sidebar-toggle__button__label">Partner Early Years Centres</div>
          <span class="icon-chevron-down"></span>
        </div>
        <div slot="content" class="moe-sidebar-toggle__content__inner">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="E-Bridge Pre-school, NTUC My First Skool …" tabindex="0"></span>
            <span class="text-xs text-gray-400">Who are they?</span>
          </div>
          ${this.options.partnerCentres.map(
      (t) => `
          <label for="pc-${t.id}" class="moe-checkbox flex items-center space-x-2 mt-2">
            <input id="pc-${t.id}" type="checkbox" value="${t.value}" />
            <span class="checkmark type-grey-2"></span>
            <span class="text-sm text-gray-500">${t.label}</span>
          </label>
        `
    ).join("")}
        </div>
      </sgds-accordion-item>
    `;
  }
  renderSpecialNeedsAccordion() {
    return `
      <sgds-accordion-item>
        <div slot="header" class="moe-sidebar-toggle__button w-full flex items-center justify-between">
          <div class="moe-sidebar-toggle__button__label">Support for special educational needs</div>
          <span class="icon-chevron-down"></span>
        </div>
        <div slot="content" class="moe-sidebar-toggle__content__inner">
          ${this.options.specialNeeds.map(
      (t) => `
          <label for="sn-${t.id}" class="moe-checkbox flex items-center space-x-2 mt-2">
            <input id="sn-${t.id}" type="checkbox" value="${t.value}" />
            <span class="checkmark type-grey-2"></span>
            <span class="text-sm text-gray-500">${t.label}</span>
          </label>
        `
    ).join("")}
          <span class="block text-sm text-gray-400 mb-2 mt-6"><strong>Note</strong>: All MKs are committed to supporting children …</span>
        </div>
      </sgds-accordion-item>
    `;
  }
}
customElements.get("school-finder-sidebar") || customElements.define("school-finder-sidebar", kg);
class xg extends HTMLElement {
  constructor() {
    super(), this.options = {
      resultsTitle: "MOE Kindergartens",
      addressPlaceholder: "Enter your address or postal code",
      distanceOptions: [
        { label: "Schools within 500m", value: "0.5", disabled: !0 },
        { label: "Schools between 500m – 1 km", value: "1", disabled: !0 }
      ],
      areas: [],
      partnerCenters: [],
      specialNeeds: [],
      schools: [],
      totalCount: 0,
      containerClass: "max-w-screen-xl mx-auto px-4 grid grid-cols-12 gap-3",
      sidebarClass: "col-span-12 lg:col-span-4 pr-8 py-8",
      mainClass: "col-span-12 lg:col-span-8 bg-gray-100 py-8 lg:ml-8"
    };
  }
  connectedCallback() {
    this.style.display = "block", this.style.width = "100%", this.parseData(), this.render(), this.setupEventListeners();
  }
  /**
   * Parse JSON data from child <script type="application/json"> tag
   */
  parseData() {
    const e = this.querySelector('script[type="application/json"]');
    if (e)
      try {
        const t = JSON.parse(e.textContent || "{}");
        this.options = { ...this.options, ...t }, !t.totalCount && t.schools && (this.options.totalCount = t.schools.length);
      } catch (t) {
        console.error("Failed to parse SchoolFinder data", t);
      }
  }
  /**
   * Use light DOM for better CSS integration
   */
  createRenderRoot() {
    return this;
  }
  /**
   * Setup event listeners for interactive elements
   */
  setupEventListeners() {
    const e = this.querySelector("#clearAllBtn");
    e && e.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("clear-filters", {
        bubbles: !0,
        composed: !0
      }));
    }), this.querySelectorAll(".moe-fav-love").forEach((s) => {
      s.addEventListener("click", (a) => {
        var n, d;
        a.preventDefault(), a.stopPropagation();
        const r = a.currentTarget.closest(".moe-card");
        if (r) {
          const l = ((d = (n = r.querySelector(".font-heading.text-lg")) == null ? void 0 : n.textContent) == null ? void 0 : d.trim()) || "";
          this.dispatchEvent(new CustomEvent("toggle-favorite", {
            bubbles: !0,
            composed: !0,
            detail: { schoolName: l }
          }));
        }
      });
    });
  }
  /**
   * Render the component
   */
  render() {
    this.innerHTML = `
      <div id="moe-school-finder-container" class="${this.options.containerClass}">
        ${this.renderSidebar()}
        ${this.renderResults()}
      </div>
    `;
  }
  /**
   * Render the sidebar with filters
   */
  renderSidebar() {
    return `
      <aside id="schoolFinderSidebar" class="${this.options.sidebarClass}">
        ${this.renderSidebarHeader()}
        <sgds-accordion>
          ${this.renderLocationAccordion()}
          ${this.renderPartnerCentersAccordion()}
          ${this.renderSpecialNeedsAccordion()}
        </sgds-accordion>
      </aside>
    `;
  }
  /**
   * Render the sidebar header
   */
  renderSidebarHeader() {
    return `
      <div class="flex items-center justify-between text-gray-700 mb-4">
        <div class="flex items-center">
          <span class="text-xl mr-2 icon-filter"></span>
          <span class="text-base">Criteria</span>
        </div>
        <button id="clearAllBtn" class="text-primary-500 text-base">Clear all</button>
      </div>
    `;
  }
  /**
   * Render the location accordion
   */
  renderLocationAccordion() {
    const e = this.options.distanceOptions.map((s, a) => `
        <div class="moe-radio mt-4 ${s.disabled ? "type--disabled" : ""}">
          <input id="distance-${a}" type="radio" name="postal-code-filter" value="${s.value}" ${s.disabled ? "disabled" : ""} />
          <label for="distance-${a}" class="pl-2">
            ${s.label}
            <div class="check"></div>
          </label>
        </div>
      `).join(""), t = this.options.areas.map((s) => `<option value="${s.value}">${s.label}</option>`).join("");
    return `
      <sgds-accordion-item open>
        <div slot="header" class="w-full flex items-center justify-between">
          <div>Location</div>
        </div>
        <div slot="content">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="Information correct as November 2022. © Singapore Land Authority." tabindex="0"></span>
            <span class="text-xs text-gray-500">Disclaimer</span>
          </div>
          
          <span class="block text-sm mb-2">Search for schools near you</span>
          
          <div class="moe-autosuggest moe-autosuggest--size-large mb-4">
            <input placeholder="${this.options.addressPlaceholder}" aria-label="${this.options.addressPlaceholder}" 
                   class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          
          ${e}
          
          <span class="block my-6 text-sm font-bold">OR</span>
          
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm">Search for schools by area</span>
          </div>
          
          <div class="moe-select mb-4 moe-select--no-selection moe-select--size-full">
            <button type="button" class="w-full flex items-center justify-between border border-gray-300 rounded px-3 py-2">
              Select an area
              <span class="icon-dropdown"></span>
            </button>
            <!-- Area options: ${t} -->
          </div>
        </div>
      </sgds-accordion-item>
    `;
  }
  /**
   * Render the partner centers accordion
   */
  renderPartnerCentersAccordion() {
    return `
      <sgds-accordion-item>
        <div slot="header" class="w-full flex items-center justify-between">
          <div>Partner Early Years Centres</div>
        </div>
        <div slot="content">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="E-Bridge Pre-school, NTUC My First Skool …" tabindex="0"></span>
            <span class="text-xs text-gray-500">Who are they?</span>
          </div>
          ${this.options.partnerCenters.map((t) => `
        <label for="pc-${t.id}" class="moe-checkbox flex items-center space-x-2 ${t === this.options.partnerCenters[0] ? "" : "mt-2"}">
          <input id="pc-${t.id}" type="checkbox" value="${t.value}" ${t.selected ? "checked" : ""} />
          <span class="checkmark type-grey-2"></span>
          <span class="text-sm text-gray-500">${t.label}</span>
        </label>
      `).join("") || `
            <label for="checkbox-my-first-skool" class="moe-checkbox flex items-center space-x-2">
              <input id="checkbox-my-first-skool" type="checkbox" value="My First Skool" />
              <span class="checkmark type-grey-2"></span>
              <span class="text-sm text-gray-500">My First Skool</span>
            </label>
            
            <label for="checkbox-pcf-sparkletots-preschool" class="moe-checkbox flex items-center space-x-2 mt-2">
              <input id="checkbox-pcf-sparkletots-preschool" type="checkbox" value="PCF Sparkletots Preschool" />
              <span class="checkmark type-grey-2"></span>
              <span class="text-sm text-gray-500">PCF Sparkletots Preschool</span>
            </label>
          `}
        </div>
      </sgds-accordion-item>
    `;
  }
  /**
   * Render the special needs accordion
   */
  renderSpecialNeedsAccordion() {
    return `
      <sgds-accordion-item>
        <div slot="header" class="w-full flex items-center justify-between">
          <div>Support for special educational needs</div>
        </div>
        <div slot="content">
          ${this.options.specialNeeds.map((t) => `
        <label for="sn-${t.id}" class="moe-checkbox flex items-center space-x-2 mt-2">
          <input id="sn-${t.id}" type="checkbox" value="${t.value}" ${t.selected ? "checked" : ""} />
          <span class="checkmark type-grey-2"></span>
          <span class="text-sm text-gray-500">${t.label}</span>
        </label>
      `).join("") || `
            <label for="checkbox-moderate-to-profound-hearing-loss-signing-approach" class="moe-checkbox flex items-center space-x-2 mt-2">
              <input id="checkbox-moderate-to-profound-hearing-loss-signing-approach" type="checkbox" 
                     value="Moderate to profound hearing loss (Signing Approach)" />
              <span class="checkmark type-grey-2"></span>
              <span class="text-sm text-gray-500">
                Moderate to profound hearing loss (Signing Approach)
              </span>
            </label>
          `}
          <span class="block text-sm text-gray-500 mb-1.5 mt-6">
            <strong>Note</strong>: All MKs are committed to supporting children …
          </span>
        </div>
      </sgds-accordion-item>
    `;
  }
  /**
   * Render the results section
   */
  renderResults() {
    return `
      <main class="${this.options.mainClass}">
        <div class="flex justify-between mb-4">
          <span class="text-2xl lg:text-2xl font-bold font-heading text-gray-700">
            ${this.options.resultsTitle}
          </span>
          
          <!-- Pagination placeholder -->
          <div class="moe-pagination">
            <!-- Pagination controls would go here -->
          </div>
        </div>
        
        <span class="block mb-2">
          Showing <span class="font-bold">${this.options.totalCount}</span> ${this.options.resultsTitle}
        </span>
        
        <div class="moe-school-card-animation">
          ${this.renderSchoolCards()}
        </div>
        
        <!-- Bottom pagination -->
        <div class="flex mt-8 justify-end">
          <div class="moe-pagination">
            <!-- Pagination controls would go here -->
          </div>
        </div>
      </main>
    `;
  }
  /**
   * Render the school cards
   */
  renderSchoolCards() {
    return this.options.schools.length === 0 ? `
        <div class="p-4 text-center text-gray-500">
          No schools found matching your criteria.
        </div>
      ` : this.options.schools.map((e) => `
        <div class="relative">
          <a href="${e.url}" target="_blank" tabindex="0" 
             class="moe-card hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 mb-4">
            <div class="moe-card-inner">
              <div class="flex flex-row justify-between mb-1.5 items-center">
                <div>
                  <p class="font-heading text-lg font-semibold text-gray-700 mb-2">
                    ${e.name}
                  </p>
                  
                  <div class="flex flex-col">
                    <div class="flex flex-row items-center">
                      <span class="icon-landmark text-xl text-gray-500"></span>
                      <p class="text-sm text-gray-500 ml-2 font-bold">${e.area}</p>
                    </div>
                    <p class="text-sm text-gray-500 mt-0 ml-4 pl-4">
                      ${e.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="moe-fav-love flex-shrink-0 ${e.isFavorite ? "active" : ""}" tabindex="0" 
                    aria-label="${e.isFavorite ? "Remove school from favorites" : "Add school to favorites"}">
              <span class="icon-heart"></span>
            </button>
          </a>
        </div>
      `).join("");
  }
}
customElements.get("school-finder") || customElements.define("school-finder", xg);
export {
  xg as SchoolFinder,
  kg as SchoolFinderSidebar,
  Po as TopHeader
};
//# sourceMappingURL=cms-content-model.es.js.map
