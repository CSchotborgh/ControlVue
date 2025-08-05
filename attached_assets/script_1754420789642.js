(function() {
    const t = document.createElement("link")
        .relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
    new MutationObserver(o => {
        for (const s of o)
            if (s.type === "childList")
                for (const i of s.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && n(i)
    })
        .observe(document, {
            childList: !0
            , subtree: !0
        });

    function r(o) {
        const s = {};
        return o.integrity && (s.integrity = o.integrity), o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function n(o) {
        if (o.ep) return;
        o.ep = !0;
        const s = r(o);
        fetch(o.href, s)
    }
})();
/**
 * @vue/shared v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function Us(e, t) {
    const r = new Set(e.split(","));
    return t ? n => r.has(n.toLowerCase()) : n => r.has(n)
}
const Ce = {}
    , Tr = []
    , Ze = () => { }
    , sd = () => !1
    , yo = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
    , Vs = e => e.startsWith("onUpdate:")
    , Le = Object.assign
    , qs = (e, t) => {
        const r = e.indexOf(t);
        r > -1 && e.splice(r, 1)
    }
    , id = Object.prototype.hasOwnProperty
    , me = (e, t) => id.call(e, t)
    , ee = Array.isArray
    , Rr = e => En(e) === "[object Map]"
    , zr = e => En(e) === "[object Set]"
    , Li = e => En(e) === "[object Date]"
    , ae = e => typeof e == "function"
    , Ne = e => typeof e == "string"
    , Wt = e => typeof e == "symbol"
    , Se = e => e !== null && typeof e == "object"
    , za = e => (Se(e) || ae(e)) && ae(e.then) && ae(e.catch)
    , Ha = Object.prototype.toString
    , En = e => Ha.call(e)
    , ld = e => En(e)
        .slice(8, -1)
    , Ba = e => En(e) === "[object Object]"
    , Ws = e => Ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
    , Zr = Us(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
    , vo = e => {
        const t = Object.create(null);
        return r => t[r] || (t[r] = e(r))
    }
    , ad = /-(\w)/g
    , _t = vo(e => e.replace(ad, (t, r) => r ? r.toUpperCase() : ""))
    , cd = /\B([A-Z])/g
    , br = vo(e => e.replace(cd, "-$1")
        .toLowerCase())
    , _o = vo(e => e.charAt(0)
        .toUpperCase() + e.slice(1))
    , Wo = vo(e => e ? `on${_o(e)}` : "")
    , Kt = (e, t) => !Object.is(e, t)
    , Kn = (e, t) => {
        for (let r = 0; r < e.length; r++) e[r](t)
    }
    , no = (e, t, r) => {
        Object.defineProperty(e, t, {
            configurable: !0
            , enumerable: !1
            , value: r
        })
    }
    , dn = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    }
    , ud = e => {
        const t = Ne(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t
    };
let Mi;
const Da = () => Mi || (Mi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function ur(e) {
    if (ee(e)) {
        const t = {};
        for (let r = 0; r < e.length; r++) {
            const n = e[r]
                , o = Ne(n) ? hd(n) : ur(n);
            if (o)
                for (const s in o) t[s] = o[s]
        }
        return t
    } else if (Ne(e) || Se(e)) return e
}
const dd = /;(?![^(]*\))/g
    , fd = /:([^]+)/
    , pd = /\/\*[^]*?\*\//g;

function hd(e) {
    const t = {};
    return e.replace(pd, "")
        .split(dd)
        .forEach(r => {
            if (r) {
                const n = r.split(fd);
                n.length > 1 && (t[n[0].trim()] = n[1].trim())
            }
        }), t
}

function ve(e) {
    let t = "";
    if (Ne(e)) t = e;
    else if (ee(e))
        for (let r = 0; r < e.length; r++) {
            const n = ve(e[r]);
            n && (t += n + " ")
        } else if (Se(e))
        for (const r in e) e[r] && (t += r + " ");
    return t.trim()
}

function wo(e) {
    if (!e) return null;
    let {
        class: t
        , style: r
    } = e;
    return t && !Ne(t) && (e.class = ve(t)), r && (e.style = ur(r)), e
}
const gd = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
    , md = Us(gd);

function Ua(e) {
    return !!e || e === ""
}

function bd(e, t) {
    if (e.length !== t.length) return !1;
    let r = !0;
    for (let n = 0; r && n < e.length; n++) r = hr(e[n], t[n]);
    return r
}

function hr(e, t) {
    if (e === t) return !0;
    let r = Li(e)
        , n = Li(t);
    if (r || n) return r && n ? e.getTime() === t.getTime() : !1;
    if (r = Wt(e), n = Wt(t), r || n) return e === t;
    if (r = ee(e), n = ee(t), r || n) return r && n ? bd(e, t) : !1;
    if (r = Se(e), n = Se(t), r || n) {
        if (!r || !n) return !1;
        const o = Object.keys(e)
            .length
            , s = Object.keys(t)
                .length;
        if (o !== s) return !1;
        for (const i in e) {
            const l = e.hasOwnProperty(i)
                , a = t.hasOwnProperty(i);
            if (l && !a || !l && a || !hr(e[i], t[i])) return !1
        }
    }
    return String(e) === String(t)
}

function Ks(e, t) {
    return e.findIndex(r => hr(r, t))
}
const ue = e => Ne(e) ? e : e == null ? "" : ee(e) || Se(e) && (e.toString === Ha || !ae(e.toString)) ? JSON.stringify(e, Va, 2) : String(e)
    , Va = (e, t) => t && t.__v_isRef ? Va(e, t.value) : Rr(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((r, [n, o], s) => (r[Ko(n, s) + " =>"] = o, r), {})
    } : zr(t) ? {
        [`Set(${t.size})`]: [...t.values()].map(r => Ko(r))
    } : Wt(t) ? Ko(t) : Se(t) && !ee(t) && !Ba(t) ? String(t) : t
    , Ko = (e, t = "") => {
        var r;
        return Wt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
    };
/**
 * @vue/reactivity v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let Je;
class qa {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Je, !t && Je && (this.index = (Je.scopes || (Je.scopes = []))
            .push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const r = Je;
            try {
                return Je = this, t()
            } finally {
                Je = r
            }
        }
    }
    on() {
        Je = this
    }
    off() {
        Je = this.parent
    }
    stop(t) {
        if (this._active) {
            let r, n;
            for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop();
            for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]();
            if (this.scopes)
                for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0);
            if (!this.detached && this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function yd(e) {
    return new qa(e)
}

function vd(e, t = Je) {
    t && t.active && t.effects.push(e)
}

function Wa() {
    return Je
}

function _d(e) {
    Je && Je.cleanups.push(e)
}
let dr;
class Gs {
    constructor(t, r, n, o) {
        this.fn = t, this.trigger = r, this.scheduler = n, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, vd(this, o)
    }
    get dirty() {
        if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
            this._dirtyLevel = 1, yr();
            for (let t = 0; t < this._depsLength; t++) {
                const r = this.deps[t];
                if (r.computed && (wd(r.computed), this._dirtyLevel >= 4)) break
            }
            this._dirtyLevel === 1 && (this._dirtyLevel = 0), vr()
        }
        return this._dirtyLevel >= 4
    }
    set dirty(t) {
        this._dirtyLevel = t ? 4 : 0
    }
    run() {
        if (this._dirtyLevel = 0, !this.active) return this.fn();
        let t = Dt
            , r = dr;
        try {
            return Dt = !0, dr = this, this._runnings++, ji(this), this.fn()
        } finally {
            zi(this), this._runnings--, dr = r, Dt = t
        }
    }
    stop() {
        var t;
        this.active && (ji(this), zi(this), (t = this.onStop) == null || t.call(this), this.active = !1)
    }
}

function wd(e) {
    return e.value
}

function ji(e) {
    e._trackId++, e._depsLength = 0
}

function zi(e) {
    if (e.deps.length > e._depsLength) {
        for (let t = e._depsLength; t < e.deps.length; t++) Ka(e.deps[t], e);
        e.deps.length = e._depsLength
    }
}

function Ka(e, t) {
    const r = e.get(t);
    r !== void 0 && t._trackId !== r && (e.delete(t), e.size === 0 && e.cleanup())
}
let Dt = !0
    , hs = 0;
const Ga = [];

function yr() {
    Ga.push(Dt), Dt = !1
}

function vr() {
    const e = Ga.pop();
    Dt = e === void 0 ? !0 : e
}

function Js() {
    hs++
}

function Qs() {
    for (hs--; !hs && gs.length;) gs.shift()()
}

function Ja(e, t, r) {
    if (t.get(e) !== e._trackId) {
        t.set(e, e._trackId);
        const n = e.deps[e._depsLength];
        n !== t ? (n && Ka(n, e), e.deps[e._depsLength++] = t) : e._depsLength++
    }
}
const gs = [];

function Qa(e, t, r) {
    Js();
    for (const n of e.keys()) {
        let o;
        n._dirtyLevel < t && (o ?? (o = e.get(n) === n._trackId)) && (n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0), n._dirtyLevel = t), n._shouldSchedule && (o ?? (o = e.get(n) === n._trackId)) && (n.trigger(), (!n._runnings || n.allowRecurse) && n._dirtyLevel !== 2 && (n._shouldSchedule = !1, n.scheduler && gs.push(n.scheduler)))
    }
    Qs()
}
const Xa = (e, t) => {
    const r = new Map;
    return r.cleanup = e, r.computed = t, r
}
    , oo = new WeakMap
    , fr = Symbol("")
    , ms = Symbol("");

function Ke(e, t, r) {
    if (Dt && dr) {
        let n = oo.get(e);
        n || oo.set(e, n = new Map);
        let o = n.get(r);
        o || n.set(r, o = Xa(() => n.delete(r))), Ja(dr, o)
    }
}

function St(e, t, r, n, o, s) {
    const i = oo.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()];
    else if (r === "length" && ee(e)) {
        const a = Number(n);
        i.forEach((c, u) => {
            (u === "length" || !Wt(u) && u >= a) && l.push(c)
        })
    } else switch (r !== void 0 && l.push(i.get(r)), t) {
        case "add":
            ee(e) ? Ws(r) && l.push(i.get("length")) : (l.push(i.get(fr)), Rr(e) && l.push(i.get(ms)));
            break;
        case "delete":
            ee(e) || (l.push(i.get(fr)), Rr(e) && l.push(i.get(ms)));
            break;
        case "set":
            Rr(e) && l.push(i.get(fr));
            break
    }
    Js();
    for (const a of l) a && Qa(a, 4);
    Qs()
}

function xd(e, t) {
    var r;
    return (r = oo.get(e)) == null ? void 0 : r.get(t)
}
const kd = Us("__proto__,__v_isRef,__isVue")
    , Ya = new Set(Object.getOwnPropertyNames(Symbol)
        .filter(e => e !== "arguments" && e !== "caller")
        .map(e => Symbol[e])
        .filter(Wt))
    , Hi = Sd();

function Sd() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...r) {
            const n = be(this);
            for (let s = 0, i = this.length; s < i; s++) Ke(n, "get", s + "");
            const o = n[t](...r);
            return o === -1 || o === !1 ? n[t](...r.map(be)) : o
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...r) {
            yr(), Js();
            const n = be(this)[t].apply(this, r);
            return Qs(), vr(), n
        }
    }), e
}

function Ed(e) {
    const t = be(this);
    return Ke(t, "has", e), t.hasOwnProperty(e)
}
class Za {
    constructor(t = !1, r = !1) {
        this._isReadonly = t, this._isShallow = r
    }
    get(t, r, n) {
        const o = this._isReadonly
            , s = this._isShallow;
        if (r === "__v_isReactive") return !o;
        if (r === "__v_isReadonly") return o;
        if (r === "__v_isShallow") return s;
        if (r === "__v_raw") return n === (o ? s ? jd : nc : s ? rc : tc)
            .get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
        const i = ee(t);
        if (!o) {
            if (i && me(Hi, r)) return Reflect.get(Hi, r, n);
            if (r === "hasOwnProperty") return Ed
        }
        const l = Reflect.get(t, r, n);
        return (Wt(r) ? Ya.has(r) : kd(r)) || (o || Ke(t, "get", r), s) ? l : ke(l) ? i && Ws(r) ? l : l.value : Se(l) ? o ? sc(l) : Cn(l) : l
    }
}
class ec extends Za {
    constructor(t = !1) {
        super(!1, t)
    }
    set(t, r, n, o) {
        let s = t[r];
        if (!this._isShallow) {
            const a = Nr(s);
            if (!so(n) && !Nr(n) && (s = be(s), n = be(n)), !ee(t) && ke(s) && !ke(n)) return a ? !1 : (s.value = n, !0)
        }
        const i = ee(t) && Ws(r) ? Number(r) < t.length : me(t, r)
            , l = Reflect.set(t, r, n, o);
        return t === be(o) && (i ? Kt(n, s) && St(t, "set", r, n) : St(t, "add", r, n)), l
    }
    deleteProperty(t, r) {
        const n = me(t, r);
        t[r];
        const o = Reflect.deleteProperty(t, r);
        return o && n && St(t, "delete", r, void 0), o
    }
    has(t, r) {
        const n = Reflect.has(t, r);
        return (!Wt(r) || !Ya.has(r)) && Ke(t, "has", r), n
    }
    ownKeys(t) {
        return Ke(t, "iterate", ee(t) ? "length" : fr), Reflect.ownKeys(t)
    }
}
class Cd extends Za {
    constructor(t = !1) {
        super(!0, t)
    }
    set(t, r) {
        return !0
    }
    deleteProperty(t, r) {
        return !0
    }
}
const Td = new ec
    , Rd = new Cd
    , $d = new ec(!0)
    , Xs = e => e
    , xo = e => Reflect.getPrototypeOf(e);

function In(e, t, r = !1, n = !1) {
    e = e.__v_raw;
    const o = be(e)
        , s = be(t);
    r || (Kt(t, s) && Ke(o, "get", t), Ke(o, "get", s));
    const {
        has: i
    } = xo(o), l = n ? Xs : r ? ti : fn;
    if (i.call(o, t)) return l(e.get(t));
    if (i.call(o, s)) return l(e.get(s));
    e !== o && e.get(t)
}

function Ln(e, t = !1) {
    const r = this.__v_raw
        , n = be(r)
        , o = be(e);
    return t || (Kt(e, o) && Ke(n, "has", e), Ke(n, "has", o)), e === o ? r.has(e) : r.has(e) || r.has(o)
}

function Mn(e, t = !1) {
    return e = e.__v_raw, !t && Ke(be(e), "iterate", fr), Reflect.get(e, "size", e)
}

function Bi(e) {
    e = be(e);
    const t = be(this);
    return xo(t)
        .has.call(t, e) || (t.add(e), St(t, "add", e, e)), this
}

function Di(e, t) {
    t = be(t);
    const r = be(this)
        , {
            has: n
            , get: o
        } = xo(r);
    let s = n.call(r, e);
    s || (e = be(e), s = n.call(r, e));
    const i = o.call(r, e);
    return r.set(e, t), s ? Kt(t, i) && St(r, "set", e, t) : St(r, "add", e, t), this
}

function Ui(e) {
    const t = be(this)
        , {
            has: r
            , get: n
        } = xo(t);
    let o = r.call(t, e);
    o || (e = be(e), o = r.call(t, e)), n && n.call(t, e);
    const s = t.delete(e);
    return o && St(t, "delete", e, void 0), s
}

function Vi() {
    const e = be(this)
        , t = e.size !== 0
        , r = e.clear();
    return t && St(e, "clear", void 0, void 0), r
}

function jn(e, t) {
    return function(n, o) {
        const s = this
            , i = s.__v_raw
            , l = be(i)
            , a = t ? Xs : e ? ti : fn;
        return !e && Ke(l, "iterate", fr), i.forEach((c, u) => n.call(o, a(c), a(u), s))
    }
}

function zn(e, t, r) {
    return function(...n) {
        const o = this.__v_raw
            , s = be(o)
            , i = Rr(s)
            , l = e === "entries" || e === Symbol.iterator && i
            , a = e === "keys" && i
            , c = o[e](...n)
            , u = r ? Xs : t ? ti : fn;
        return !t && Ke(s, "iterate", a ? ms : fr), {
            next() {
                const {
                    value: d
                    , done: f
                } = c.next();
                return f ? {
                    value: d
                    , done: f
                } : {
                    value: l ? [u(d[0]), u(d[1])] : u(d)
                    , done: f
                }
            }
            , [Symbol.iterator]() {
                return this
            }
        }
    }
}

function $t(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function Ad() {
    const e = {
        get(s) {
            return In(this, s)
        }
        , get size() {
            return Mn(this)
        }
        , has: Ln
        , add: Bi
        , set: Di
        , delete: Ui
        , clear: Vi
        , forEach: jn(!1, !1)
    }
        , t = {
            get(s) {
                return In(this, s, !1, !0)
            }
            , get size() {
                return Mn(this)
            }
            , has: Ln
            , add: Bi
            , set: Di
            , delete: Ui
            , clear: Vi
            , forEach: jn(!1, !0)
        }
        , r = {
            get(s) {
                return In(this, s, !0)
            }
            , get size() {
                return Mn(this, !0)
            }
            , has(s) {
                return Ln.call(this, s, !0)
            }
            , add: $t("add")
            , set: $t("set")
            , delete: $t("delete")
            , clear: $t("clear")
            , forEach: jn(!0, !1)
        }
        , n = {
            get(s) {
                return In(this, s, !0, !0)
            }
            , get size() {
                return Mn(this, !0)
            }
            , has(s) {
                return Ln.call(this, s, !0)
            }
            , add: $t("add")
            , set: $t("set")
            , delete: $t("delete")
            , clear: $t("clear")
            , forEach: jn(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(s => {
        e[s] = zn(s, !1, !1), r[s] = zn(s, !0, !1), t[s] = zn(s, !1, !0), n[s] = zn(s, !0, !0)
    }), [e, r, t, n]
}
const [Od, Pd, Nd, Fd] = Ad();

function Ys(e, t) {
    const r = t ? e ? Fd : Nd : e ? Pd : Od;
    return (n, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(me(r, o) && o in n ? r : n, o, s)
}
const Id = {
    get: Ys(!1, !1)
}
    , Ld = {
        get: Ys(!1, !0)
    }
    , Md = {
        get: Ys(!0, !1)
    }
    , tc = new WeakMap
    , rc = new WeakMap
    , nc = new WeakMap
    , jd = new WeakMap;

function zd(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Hd(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : zd(ld(e))
}

function Cn(e) {
    return Nr(e) ? e : Zs(e, !1, Td, Id, tc)
}

function oc(e) {
    return Zs(e, !1, $d, Ld, rc)
}

function sc(e) {
    return Zs(e, !0, Rd, Md, nc)
}

function Zs(e, t, r, n, o) {
    if (!Se(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const s = o.get(e);
    if (s) return s;
    const i = Hd(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? n : r);
    return o.set(e, l), l
}

function $r(e) {
    return Nr(e) ? $r(e.__v_raw) : !!(e && e.__v_isReactive)
}

function Nr(e) {
    return !!(e && e.__v_isReadonly)
}

function so(e) {
    return !!(e && e.__v_isShallow)
}

function ic(e) {
    return $r(e) || Nr(e)
}

function be(e) {
    const t = e && e.__v_raw;
    return t ? be(t) : e
}

function ei(e) {
    return Object.isExtensible(e) && no(e, "__v_skip", !0), e
}
const fn = e => Se(e) ? Cn(e) : e
    , ti = e => Se(e) ? sc(e) : e;
class lc {
    constructor(t, r, n, o) {
        this.getter = t, this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Gs(() => t(this._value), () => Gn(this, this.effect._dirtyLevel === 2 ? 2 : 3)), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n
    }
    get value() {
        const t = be(this);
        return (!t._cacheable || t.effect.dirty) && Kt(t._value, t._value = t.effect.run()) && Gn(t, 4), ac(t), t.effect._dirtyLevel >= 2 && Gn(t, 2), t._value
    }
    set value(t) {
        this._setter(t)
    }
    get _dirty() {
        return this.effect.dirty
    }
    set _dirty(t) {
        this.effect.dirty = t
    }
}

function Bd(e, t, r = !1) {
    let n, o;
    const s = ae(e);
    return s ? (n = e, o = Ze) : (n = e.get, o = e.set), new lc(n, o, s || !o, r)
}

function ac(e) {
    var t;
    Dt && dr && (e = be(e), Ja(dr, (t = e.dep) != null ? t : e.dep = Xa(() => e.dep = void 0, e instanceof lc ? e : void 0)))
}

function Gn(e, t = 4, r) {
    e = be(e);
    const n = e.dep;
    n && Qa(n, t)
}

function ke(e) {
    return !!(e && e.__v_isRef === !0)
}

function q(e) {
    return cc(e, !1)
}

function Dd(e) {
    return cc(e, !0)
}

function cc(e, t) {
    return ke(e) ? e : new Ud(e, t)
}
class Ud {
    constructor(t, r) {
        this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? t : be(t), this._value = r ? t : fn(t)
    }
    get value() {
        return ac(this), this._value
    }
    set value(t) {
        const r = this.__v_isShallow || so(t) || Nr(t);
        t = r ? t : be(t), Kt(t, this._rawValue) && (this._rawValue = t, this._value = r ? t : fn(t), Gn(this, 4))
    }
}

function v(e) {
    return ke(e) ? e.value : e
}
const Vd = {
    get: (e, t, r) => v(Reflect.get(e, t, r))
    , set: (e, t, r, n) => {
        const o = e[t];
        return ke(o) && !ke(r) ? (o.value = r, !0) : Reflect.set(e, t, r, n)
    }
};

function uc(e) {
    return $r(e) ? e : new Proxy(e, Vd)
}

function pn(e) {
    const t = ee(e) ? new Array(e.length) : {};
    for (const r in e) t[r] = Wd(e, r);
    return t
}
class qd {
    constructor(t, r, n) {
        this._object = t, this._key = r, this._defaultValue = n, this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return xd(be(this._object), this._key)
    }
}

function Wd(e, t, r) {
    const n = e[t];
    return ke(n) ? n : new qd(e, t, r)
}
/**
 * @vue/runtime-core v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function Ut(e, t, r, n) {
    try {
        return n ? e(...n) : e()
    } catch (o) {
        ko(o, t, r)
    }
}

function tt(e, t, r, n) {
    if (ae(e)) {
        const s = Ut(e, t, r, n);
        return s && za(s) && s.catch(i => {
            ko(i, t, r)
        }), s
    }
    const o = [];
    for (let s = 0; s < e.length; s++) o.push(tt(e[s], t, r, n));
    return o
}

function ko(e, t, r, n = !0) {
    const o = t ? t.vnode : null;
    if (t) {
        let s = t.parent;
        const i = t.proxy
            , l = `https://vuejs.org/error-reference/#runtime-${r}`;
        for (; s;) {
            const c = s.ec;
            if (c) {
                for (let u = 0; u < c.length; u++)
                    if (c[u](e, i, l) === !1) return
            }
            s = s.parent
        }
        const a = t.appContext.config.errorHandler;
        if (a) {
            Ut(a, null, 10, [e, i, l]);
            return
        }
    }
    Kd(e, r, o, n)
}

function Kd(e, t, r, n = !0) {
    console.error(e)
}
let hn = !1
    , bs = !1;
const Be = [];
let gt = 0;
const Ar = [];
let Mt = null
    , sr = 0;
const dc = Promise.resolve();
let ri = null;

function Tn(e) {
    const t = ri || dc;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Gd(e) {
    let t = gt + 1
        , r = Be.length;
    for (; t < r;) {
        const n = t + r >>> 1
            , o = Be[n]
            , s = gn(o);
        s < e || s === e && o.pre ? t = n + 1 : r = n
    }
    return t
}

function ni(e) {
    (!Be.length || !Be.includes(e, hn && e.allowRecurse ? gt + 1 : gt)) && (e.id == null ? Be.push(e) : Be.splice(Gd(e.id), 0, e), fc())
}

function fc() {
    !hn && !bs && (bs = !0, ri = dc.then(hc))
}

function Jd(e) {
    const t = Be.indexOf(e);
    t > gt && Be.splice(t, 1)
}

function Qd(e) {
    ee(e) ? Ar.push(...e) : (!Mt || !Mt.includes(e, e.allowRecurse ? sr + 1 : sr)) && Ar.push(e), fc()
}

function qi(e, t, r = hn ? gt + 1 : 0) {
    for (; r < Be.length; r++) {
        const n = Be[r];
        if (n && n.pre) {
            if (e && n.id !== e.uid) continue;
            Be.splice(r, 1), r--, n()
        }
    }
}

function pc(e) {
    if (Ar.length) {
        const t = [...new Set(Ar)].sort((r, n) => gn(r) - gn(n));
        if (Ar.length = 0, Mt) {
            Mt.push(...t);
            return
        }
        for (Mt = t, sr = 0; sr < Mt.length; sr++) Mt[sr]();
        Mt = null, sr = 0
    }
}
const gn = e => e.id == null ? 1 / 0 : e.id
    , Xd = (e, t) => {
        const r = gn(e) - gn(t);
        if (r === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return r
    };

function hc(e) {
    bs = !1, hn = !0, Be.sort(Xd);
    try {
        for (gt = 0; gt < Be.length; gt++) {
            const t = Be[gt];
            t && t.active !== !1 && Ut(t, null, 14)
        }
    } finally {
        gt = 0, Be.length = 0, pc(), hn = !1, ri = null, (Be.length || Ar.length) && hc()
    }
}

function Yd(e, t, ...r) {
    if (e.isUnmounted) return;
    const n = e.vnode.props || Ce;
    let o = r;
    const s = t.startsWith("update:")
        , i = s && t.slice(7);
    if (i && i in n) {
        const u = `${i === "modelValue" ? "model" : i}Modifiers`
            , {
                number: d
                , trim: f
            } = n[u] || Ce;
        f && (o = r.map(g => Ne(g) ? g.trim() : g)), d && (o = r.map(dn))
    }
    let l, a = n[l = Wo(t)] || n[l = Wo(_t(t))];
    !a && s && (a = n[l = Wo(br(t))]), a && tt(a, e, 6, o);
    const c = n[l + "Once"];
    if (c) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        e.emitted[l] = !0, tt(c, e, 6, o)
    }
}

function gc(e, t, r = !1) {
    const n = t.emitsCache
        , o = n.get(e);
    if (o !== void 0) return o;
    const s = e.emits;
    let i = {}
        , l = !1;
    if (!ae(e)) {
        const a = c => {
            const u = gc(c, t, !0);
            u && (l = !0, Le(i, u))
        };
        !r && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    return !s && !l ? (Se(e) && n.set(e, null), null) : (ee(s) ? s.forEach(a => i[a] = null) : Le(i, s), Se(e) && n.set(e, i), i)
}

function So(e, t) {
    return !e || !yo(t) ? !1 : (t = t.slice(2)
        .replace(/Once$/, ""), me(e, t[0].toLowerCase() + t.slice(1)) || me(e, br(t)) || me(e, t))
}
let Ie = null
    , Eo = null;

function io(e) {
    const t = Ie;
    return Ie = e, Eo = e && e.type.__scopeId || null, t
}

function Zd(e) {
    Eo = e
}

function ef() {
    Eo = null
}
const tf = e => le;

function le(e, t = Ie, r) {
    if (!t || e._n) return e;
    const n = (...o) => {
        n._d && nl(-1);
        const s = io(t);
        let i;
        try {
            i = e(...o)
        } finally {
            io(s), n._d && nl(1)
        }
        return i
    };
    return n._n = !0, n._c = !0, n._d = !0, n
}

function Go(e) {
    const {
        type: t
        , vnode: r
        , proxy: n
        , withProxy: o
        , props: s
        , propsOptions: [i]
        , slots: l
        , attrs: a
        , emit: c
        , render: u
        , renderCache: d
        , data: f
        , setupState: g
        , ctx: b
        , inheritAttrs: y
    } = e;
    let x, w;
    const k = io(e);
    try {
        if (r.shapeFlag & 4) {
            const j = o || n
                , D = j;
            x = ht(u.call(D, j, d, s, g, f, b)), w = a
        } else {
            const j = t;
            x = ht(j.length > 1 ? j(s, {
                attrs: a
                , slots: l
                , emit: c
            }) : j(s, null)), w = t.props ? a : rf(a)
        }
    } catch (j) {
        nn.length = 0, ko(j, e, 1), x = Z(rt)
    }
    let T = x;
    if (w && y !== !1) {
        const j = Object.keys(w)
            , {
                shapeFlag: D
            } = T;
        j.length && D & 7 && (i && j.some(Vs) && (w = nf(w, i)), T = Gt(T, w))
    }
    return r.dirs && (T = Gt(T), T.dirs = T.dirs ? T.dirs.concat(r.dirs) : r.dirs), r.transition && (T.transition = r.transition), x = T, io(k), x
}
const rf = e => {
    let t;
    for (const r in e) (r === "class" || r === "style" || yo(r)) && ((t || (t = {}))[r] = e[r]);
    return t
}
    , nf = (e, t) => {
        const r = {};
        for (const n in e) (!Vs(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
        return r
    };

function of(e, t, r) {
    const {
        props: n
        , children: o
        , component: s
    } = e, {
        props: i
        , children: l
        , patchFlag: a
    } = t, c = s.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (r && a >= 0) {
        if (a & 1024) return !0;
        if (a & 16) return n ? Wi(n, i, c) : !!i;
        if (a & 8) {
            const u = t.dynamicProps;
            for (let d = 0; d < u.length; d++) {
                const f = u[d];
                if (i[f] !== n[f] && !So(c, f)) return !0
            }
        }
    } else return (o || l) && (!l || !l.$stable) ? !0 : n === i ? !1 : n ? i ? Wi(n, i, c) : !0 : !!i;
    return !1
}

function Wi(e, t, r) {
    const n = Object.keys(t);
    if (n.length !== Object.keys(e)
        .length) return !0;
    for (let o = 0; o < n.length; o++) {
        const s = n[o];
        if (t[s] !== e[s] && !So(r, s)) return !0
    }
    return !1
}

function sf({
    vnode: e
    , parent: t
}, r) {
    for (; t;) {
        const n = t.subTree;
        if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e) (e = t.vnode)
            .el = r, t = t.parent;
        else break
    }
}
const oi = "components";

function gr(e, t) {
    return bc(oi, e, !0, t) || e
}
const mc = Symbol.for("v-ndc");

function Rn(e) {
    return Ne(e) ? bc(oi, e, !1) || e : e || mc
}

function bc(e, t, r = !0, n = !1) {
    const o = Ie || ze;
    if (o) {
        const s = o.type;
        if (e === oi) {
            const l = Yf(s, !1);
            if (l && (l === t || l === _t(t) || l === _o(_t(t)))) return s
        }
        const i = Ki(o[e] || s[e], t) || Ki(o.appContext[e], t);
        return !i && n ? s : i
    }
}

function Ki(e, t) {
    return e && (e[t] || e[_t(t)] || e[_o(_t(t))])
}
const lf = e => e.__isSuspense;

function af(e, t) {
    t && t.pendingBranch ? ee(e) ? t.effects.push(...e) : t.effects.push(e) : Qd(e)
}
const cf = Symbol.for("v-scx")
    , uf = () => Et(cf);

function df(e, t) {
    return si(e, null, t)
}
const Hn = {};

function Or(e, t, r) {
    return si(e, t, r)
}

function si(e, t, {
    immediate: r
    , deep: n
    , flush: o
    , once: s
    , onTrack: i
    , onTrigger: l
} = Ce) {
    if (t && s) {
        const $ = t;
        t = (...Q) => {
            $(...Q), D()
        }
    }
    const a = ze
        , c = $ => n === !0 ? $ : lr($, n === !1 ? 1 : void 0);
    let u, d = !1
        , f = !1;
    if (ke(e) ? (u = () => e.value, d = so(e)) : $r(e) ? (u = () => c(e), d = !0) : ee(e) ? (f = !0, d = e.some($ => $r($) || so($)), u = () => e.map($ => {
        if (ke($)) return $.value;
        if ($r($)) return c($);
        if (ae($)) return Ut($, a, 2)
    })) : ae(e) ? t ? u = () => Ut(e, a, 2) : u = () => (g && g(), tt(e, a, 3, [b])) : u = Ze, t && n) {
        const $ = u;
        u = () => lr($())
    }
    let g, b = $ => {
        g = T.onStop = () => {
            Ut($, a, 4), g = T.onStop = void 0
        }
    }
        , y;
    if (Oo)
        if (b = Ze, t ? r && tt(t, a, 3, [u(), f ? [] : void 0, b]) : u(), o === "sync") {
            const $ = uf();
            y = $.__watcherHandles || ($.__watcherHandles = [])
        } else return Ze;
    let x = f ? new Array(e.length)
        .fill(Hn) : Hn;
    const w = () => {
        if (!(!T.active || !T.dirty))
            if (t) {
                const $ = T.run();
                (n || d || (f ? $.some((Q, V) => Kt(Q, x[V])) : Kt($, x))) && (g && g(), tt(t, a, 3, [$, x === Hn ? void 0 : f && x[0] === Hn ? [] : x, b]), x = $)
            } else T.run()
    };
    w.allowRecurse = !!t;
    let k;
    o === "sync" ? k = w : o === "post" ? k = () => qe(w, a && a.suspense) : (w.pre = !0, a && (w.id = a.uid), k = () => ni(w));
    const T = new Gs(u, Ze, k)
        , j = Wa()
        , D = () => {
            T.stop(), j && qs(j.effects, T)
        };
    return t ? r ? w() : x = T.run() : o === "post" ? qe(T.run.bind(T), a && a.suspense) : T.run(), y && y.push(D), D
}

function ff(e, t, r) {
    const n = this.proxy
        , o = Ne(e) ? e.includes(".") ? yc(n, e) : () => n[e] : e.bind(n, n);
    let s;
    ae(t) ? s = t : (s = t.handler, r = t);
    const i = An(this)
        , l = si(o, s.bind(n), r);
    return i(), l
}

function yc(e, t) {
    const r = t.split(".");
    return () => {
        let n = e;
        for (let o = 0; o < r.length && n; o++) n = n[r[o]];
        return n
    }
}

function lr(e, t, r = 0, n) {
    if (!Se(e) || e.__v_skip) return e;
    if (t && t > 0) {
        if (r >= t) return e;
        r++
    }
    if (n = n || new Set, n.has(e)) return e;
    if (n.add(e), ke(e)) lr(e.value, t, r, n);
    else if (ee(e))
        for (let o = 0; o < e.length; o++) lr(e[o], t, r, n);
    else if (zr(e) || Rr(e)) e.forEach(o => {
        lr(o, t, r, n)
    });
    else if (Ba(e))
        for (const o in e) lr(e[o], t, r, n);
    return e
}

function Qe(e, t) {
    if (Ie === null) return e;
    const r = Po(Ie) || Ie.proxy
        , n = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [s, i, l, a = Ce] = t[o];
        s && (ae(s) && (s = {
            mounted: s
            , updated: s
        }), s.deep && lr(i), n.push({
            dir: s
            , instance: r
            , value: i
            , oldValue: void 0
            , arg: l
            , modifiers: a
        }))
    }
    return e
}

function Zt(e, t, r, n) {
    const o = e.dirs
        , s = t && t.dirs;
    for (let i = 0; i < o.length; i++) {
        const l = o[i];
        s && (l.oldValue = s[i].value);
        let a = l.dir[n];
        a && (yr(), tt(a, r, 8, [e.el, l, e, t]), vr())
    }
}
const jt = Symbol("_leaveCb")
    , Bn = Symbol("_enterCb");

function pf() {
    const e = {
        isMounted: !1
        , isLeaving: !1
        , isUnmounting: !1
        , leavingVNodes: new Map
    };
    return $n(() => {
        e.isMounted = !0
    }), kc(() => {
        e.isUnmounting = !0
    }), e
}
const Xe = [Function, Array]
    , vc = {
        mode: String
        , appear: Boolean
        , persisted: Boolean
        , onBeforeEnter: Xe
        , onEnter: Xe
        , onAfterEnter: Xe
        , onEnterCancelled: Xe
        , onBeforeLeave: Xe
        , onLeave: Xe
        , onAfterLeave: Xe
        , onLeaveCancelled: Xe
        , onBeforeAppear: Xe
        , onAppear: Xe
        , onAfterAppear: Xe
        , onAppearCancelled: Xe
    }
    , hf = {
        name: "BaseTransition"
        , props: vc
        , setup(e, {
            slots: t
        }) {
            const r = Ao()
                , n = pf();
            return () => {
                const o = t.default && wc(t.default(), !0);
                if (!o || !o.length) return;
                let s = o[0];
                if (o.length > 1) {
                    for (const f of o)
                        if (f.type !== rt) {
                            s = f;
                            break
                        }
                }
                const i = be(e)
                    , {
                        mode: l
                    } = i;
                if (n.isLeaving) return Jo(s);
                const a = Gi(s);
                if (!a) return Jo(s);
                const c = ys(a, i, n, r);
                vs(a, c);
                const u = r.subTree
                    , d = u && Gi(u);
                if (d && d.type !== rt && !ir(a, d)) {
                    const f = ys(d, i, n, r);
                    if (vs(d, f), l === "out-in") return n.isLeaving = !0, f.afterLeave = () => {
                        n.isLeaving = !1, r.update.active !== !1 && (r.effect.dirty = !0, r.update())
                    }, Jo(s);
                    l === "in-out" && a.type !== rt && (f.delayLeave = (g, b, y) => {
                        const x = _c(n, d);
                        x[String(d.key)] = d, g[jt] = () => {
                            b(), g[jt] = void 0, delete c.delayedLeave
                        }, c.delayedLeave = y
                    })
                }
                return s
            }
        }
    }
    , gf = hf;

function _c(e, t) {
    const {
        leavingVNodes: r
    } = e;
    let n = r.get(t.type);
    return n || (n = Object.create(null), r.set(t.type, n)), n
}

function ys(e, t, r, n) {
    const {
        appear: o
        , mode: s
        , persisted: i = !1
        , onBeforeEnter: l
        , onEnter: a
        , onAfterEnter: c
        , onEnterCancelled: u
        , onBeforeLeave: d
        , onLeave: f
        , onAfterLeave: g
        , onLeaveCancelled: b
        , onBeforeAppear: y
        , onAppear: x
        , onAfterAppear: w
        , onAppearCancelled: k
    } = t, T = String(e.key), j = _c(r, e), D = (V, oe) => {
        V && tt(V, n, 9, oe)
    }, $ = (V, oe) => {
        const W = oe[1];
        D(V, oe), ee(V) ? V.every(te => te.length <= 1) && W() : V.length <= 1 && W()
    }, Q = {
        mode: s
        , persisted: i
        , beforeEnter(V) {
            let oe = l;
            if (!r.isMounted)
                if (o) oe = y || l;
                else return;
            V[jt] && V[jt](!0);
            const W = j[T];
            W && ir(e, W) && W.el[jt] && W.el[jt](), D(oe, [V])
        }
        , enter(V) {
            let oe = a
                , W = c
                , te = u;
            if (!r.isMounted)
                if (o) oe = x || a, W = w || c, te = k || u;
                else return;
            let A = !1;
            const U = V[Bn] = de => {
                A || (A = !0, de ? D(te, [V]) : D(W, [V]), Q.delayedLeave && Q.delayedLeave(), V[Bn] = void 0)
            };
            oe ? $(oe, [V, U]) : U()
        }
        , leave(V, oe) {
            const W = String(e.key);
            if (V[Bn] && V[Bn](!0), r.isUnmounting) return oe();
            D(d, [V]);
            let te = !1;
            const A = V[jt] = U => {
                te || (te = !0, oe(), U ? D(b, [V]) : D(g, [V]), V[jt] = void 0, j[W] === e && delete j[W])
            };
            j[W] = e, f ? $(f, [V, A]) : A()
        }
        , clone(V) {
            return ys(V, t, r, n)
        }
    };
    return Q
}

function Jo(e) {
    if (Co(e)) return e = Gt(e), e.children = null, e
}

function Gi(e) {
    return Co(e) ? e.children ? e.children[0] : void 0 : e
}

function vs(e, t) {
    e.shapeFlag & 6 && e.component ? vs(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function wc(e, t = !1, r) {
    let n = []
        , o = 0;
    for (let s = 0; s < e.length; s++) {
        let i = e[s];
        const l = r == null ? i.key : String(r) + String(i.key != null ? i.key : s);
        i.type === Ve ? (i.patchFlag & 128 && o++, n = n.concat(wc(i.children, t, l))) : (t || i.type !== rt) && n.push(l != null ? Gt(i, {
            key: l
        }) : i)
    }
    if (o > 1)
        for (let s = 0; s < n.length; s++) n[s].patchFlag = -2;
    return n
} /*! #__NO_SIDE_EFFECTS__ */
function De(e, t) {
    return ae(e) ? Le({
        name: e.name
    }, t, {
        setup: e
    }) : e
}
const en = e => !!e.type.__asyncLoader
    , Co = e => e.type.__isKeepAlive;

function mf(e, t) {
    xc(e, "a", t)
}

function bf(e, t) {
    xc(e, "da", t)
}

function xc(e, t, r = ze) {
    const n = e.__wdc || (e.__wdc = () => {
        let o = r;
        for (; o;) {
            if (o.isDeactivated) return;
            o = o.parent
        }
        return e()
    });
    if (To(t, n, r), r) {
        let o = r.parent;
        for (; o && o.parent;) Co(o.parent.vnode) && yf(n, t, r, o), o = o.parent
    }
}

function yf(e, t, r, n) {
    const o = To(t, e, n, !0);
    Sc(() => {
        qs(n[t], o)
    }, r)
}

function To(e, t, r = ze, n = !1) {
    if (r) {
        const o = r[e] || (r[e] = [])
            , s = t.__weh || (t.__weh = (...i) => {
                if (r.isUnmounted) return;
                yr();
                const l = An(r)
                    , a = tt(t, r, e, i);
                return l(), vr(), a
            });
        return n ? o.unshift(s) : o.push(s), s
    }
}
const Tt = e => (t, r = ze) => (!Oo || e === "sp") && To(e, (...n) => t(...n), r)
    , vf = Tt("bm")
    , $n = Tt("m")
    , _f = Tt("bu")
    , wf = Tt("u")
    , kc = Tt("bum")
    , Sc = Tt("um")
    , xf = Tt("sp")
    , kf = Tt("rtg")
    , Sf = Tt("rtc");

function Ef(e, t = ze) {
    To("ec", e, t)
}

function Oe(e, t, r = {}, n, o) {
    if (Ie.isCE || Ie.parent && en(Ie.parent) && Ie.parent.isCE) return t !== "default" && (r.name = t), Z("slot", r, n && n());
    let s = e[t];
    s && s._c && (s._d = !1), M();
    const i = s && Ec(s(r))
        , l = We(Ve, {
            key: r.key || i && i.key || `_${t}`
        }, i || (n ? n() : []), i && e._ === 1 ? 64 : -2);
    return !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l
}

function Ec(e) {
    return e.some(t => ao(t) ? !(t.type === rt || t.type === Ve && !Ec(t.children)) : !0) ? e : null
}
const _s = e => e ? Hc(e) ? Po(e) || e.proxy : _s(e.parent) : null
    , tn = Le(Object.create(null), {
        $: e => e
        , $el: e => e.vnode.el
        , $data: e => e.data
        , $props: e => e.props
        , $attrs: e => e.attrs
        , $slots: e => e.slots
        , $refs: e => e.refs
        , $parent: e => _s(e.parent)
        , $root: e => _s(e.root)
        , $emit: e => e.emit
        , $options: e => li(e)
        , $forceUpdate: e => e.f || (e.f = () => {
            e.effect.dirty = !0, ni(e.update)
        })
        , $nextTick: e => e.n || (e.n = Tn.bind(e.proxy))
        , $watch: e => ff.bind(e)
    })
    , Qo = (e, t) => e !== Ce && !e.__isScriptSetup && me(e, t)
    , Cf = {
        get({
            _: e
        }, t) {
            const {
                ctx: r
                , setupState: n
                , data: o
                , props: s
                , accessCache: i
                , type: l
                , appContext: a
            } = e;
            let c;
            if (t[0] !== "$") {
                const g = i[t];
                if (g !== void 0) switch (g) {
                    case 1:
                        return n[t];
                    case 2:
                        return o[t];
                    case 4:
                        return r[t];
                    case 3:
                        return s[t]
                } else {
                    if (Qo(n, t)) return i[t] = 1, n[t];
                    if (o !== Ce && me(o, t)) return i[t] = 2, o[t];
                    if ((c = e.propsOptions[0]) && me(c, t)) return i[t] = 3, s[t];
                    if (r !== Ce && me(r, t)) return i[t] = 4, r[t];
                    ws && (i[t] = 0)
                }
            }
            const u = tn[t];
            let d, f;
            if (u) return t === "$attrs" && Ke(e, "get", t), u(e);
            if ((d = l.__cssModules) && (d = d[t])) return d;
            if (r !== Ce && me(r, t)) return i[t] = 4, r[t];
            if (f = a.config.globalProperties, me(f, t)) return f[t]
        }
        , set({
            _: e
        }, t, r) {
            const {
                data: n
                , setupState: o
                , ctx: s
            } = e;
            return Qo(o, t) ? (o[t] = r, !0) : n !== Ce && me(n, t) ? (n[t] = r, !0) : me(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = r, !0)
        }
        , has({
            _: {
                data: e
                , setupState: t
                , accessCache: r
                , ctx: n
                , appContext: o
                , propsOptions: s
            }
        }, i) {
            let l;
            return !!r[i] || e !== Ce && me(e, i) || Qo(t, i) || (l = s[0]) && me(l, i) || me(n, i) || me(tn, i) || me(o.config.globalProperties, i)
        }
        , defineProperty(e, t, r) {
            return r.get != null ? e._.accessCache[t] = 0 : me(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r)
        }
    };

function ii() {
    return Tc()
        .slots
}

function Cc() {
    return Tc()
        .attrs
}

function Tc() {
    const e = Ao();
    return e.setupContext || (e.setupContext = Dc(e))
}

function Ji(e) {
    return ee(e) ? e.reduce((t, r) => (t[r] = null, t), {}) : e
}
let ws = !0;

function Tf(e) {
    const t = li(e)
        , r = e.proxy
        , n = e.ctx;
    ws = !1, t.beforeCreate && Qi(t.beforeCreate, e, "bc");
    const {
        data: o
        , computed: s
        , methods: i
        , watch: l
        , provide: a
        , inject: c
        , created: u
        , beforeMount: d
        , mounted: f
        , beforeUpdate: g
        , updated: b
        , activated: y
        , deactivated: x
        , beforeDestroy: w
        , beforeUnmount: k
        , destroyed: T
        , unmounted: j
        , render: D
        , renderTracked: $
        , renderTriggered: Q
        , errorCaptured: V
        , serverPrefetch: oe
        , expose: W
        , inheritAttrs: te
        , components: A
        , directives: U
        , filters: de
    } = t;
    if (c && Rf(c, n, null), i)
        for (const z in i) {
            const ce = i[z];
            ae(ce) && (n[z] = ce.bind(r))
        }
    if (o) {
        const z = o.call(r, r);
        Se(z) && (e.data = Cn(z))
    }
    if (ws = !0, s)
        for (const z in s) {
            const ce = s[z]
                , Te = ae(ce) ? ce.bind(r, r) : ae(ce.get) ? ce.get.bind(r, r) : Ze
                , X = !ae(ce) && ae(ce.set) ? ce.set.bind(r) : Ze
                , Re = ne({
                    get: Te
                    , set: X
                });
            Object.defineProperty(n, z, {
                enumerable: !0
                , configurable: !0
                , get: () => Re.value
                , set: Pe => Re.value = Pe
            })
        }
    if (l)
        for (const z in l) Rc(l[z], n, r, z);
    if (a) {
        const z = ae(a) ? a.call(r) : a;
        Reflect.ownKeys(z)
            .forEach(ce => {
                Jn(ce, z[ce])
            })
    }
    u && Qi(u, e, "c");

    function ie(z, ce) {
        ee(ce) ? ce.forEach(Te => z(Te.bind(r))) : ce && z(ce.bind(r))
    }
    if (ie(vf, d), ie($n, f), ie(_f, g), ie(wf, b), ie(mf, y), ie(bf, x), ie(Ef, V), ie(Sf, $), ie(kf, Q), ie(kc, k), ie(Sc, j), ie(xf, oe), ee(W))
        if (W.length) {
            const z = e.exposed || (e.exposed = {});
            W.forEach(ce => {
                Object.defineProperty(z, ce, {
                    get: () => r[ce]
                    , set: Te => r[ce] = Te
                })
            })
        } else e.exposed || (e.exposed = {});
    D && e.render === Ze && (e.render = D), te != null && (e.inheritAttrs = te), A && (e.components = A), U && (e.directives = U)
}

function Rf(e, t, r = Ze) {
    ee(e) && (e = xs(e));
    for (const n in e) {
        const o = e[n];
        let s;
        Se(o) ? "default" in o ? s = Et(o.from || n, o.default, !0) : s = Et(o.from || n) : s = Et(o), ke(s) ? Object.defineProperty(t, n, {
            enumerable: !0
            , configurable: !0
            , get: () => s.value
            , set: i => s.value = i
        }) : t[n] = s
    }
}

function Qi(e, t, r) {
    tt(ee(e) ? e.map(n => n.bind(t.proxy)) : e.bind(t.proxy), t, r)
}

function Rc(e, t, r, n) {
    const o = n.includes(".") ? yc(r, n) : () => r[n];
    if (Ne(e)) {
        const s = t[e];
        ae(s) && Or(o, s)
    } else if (ae(e)) Or(o, e.bind(r));
    else if (Se(e))
        if (ee(e)) e.forEach(s => Rc(s, t, r, n));
        else {
            const s = ae(e.handler) ? e.handler.bind(r) : t[e.handler];
            ae(s) && Or(o, s, e)
        }
}

function li(e) {
    const t = e.type
        , {
            mixins: r
            , extends: n
        } = t
        , {
            mixins: o
            , optionsCache: s
            , config: {
                optionMergeStrategies: i
            }
        } = e.appContext
        , l = s.get(t);
    let a;
    return l ? a = l : !o.length && !r && !n ? a = t : (a = {}, o.length && o.forEach(c => lo(a, c, i, !0)), lo(a, t, i)), Se(t) && s.set(t, a), a
}

function lo(e, t, r, n = !1) {
    const {
        mixins: o
        , extends: s
    } = t;
    s && lo(e, s, r, !0), o && o.forEach(i => lo(e, i, r, !0));
    for (const i in t)
        if (!(n && i === "expose")) {
            const l = $f[i] || r && r[i];
            e[i] = l ? l(e[i], t[i]) : t[i]
        } return e
}
const $f = {
    data: Xi
    , props: Yi
    , emits: Yi
    , methods: Yr
    , computed: Yr
    , beforeCreate: Ue
    , created: Ue
    , beforeMount: Ue
    , mounted: Ue
    , beforeUpdate: Ue
    , updated: Ue
    , beforeDestroy: Ue
    , beforeUnmount: Ue
    , destroyed: Ue
    , unmounted: Ue
    , activated: Ue
    , deactivated: Ue
    , errorCaptured: Ue
    , serverPrefetch: Ue
    , components: Yr
    , directives: Yr
    , watch: Of
    , provide: Xi
    , inject: Af
};

function Xi(e, t) {
    return t ? e ? function() {
        return Le(ae(e) ? e.call(this, this) : e, ae(t) ? t.call(this, this) : t)
    } : t : e
}

function Af(e, t) {
    return Yr(xs(e), xs(t))
}

function xs(e) {
    if (ee(e)) {
        const t = {};
        for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
        return t
    }
    return e
}

function Ue(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Yr(e, t) {
    return e ? Le(Object.create(null), e, t) : t
}

function Yi(e, t) {
    return e ? ee(e) && ee(t) ? [...new Set([...e, ...t])] : Le(Object.create(null), Ji(e), Ji(t ?? {})) : t
}

function Of(e, t) {
    if (!e) return t;
    if (!t) return e;
    const r = Le(Object.create(null), e);
    for (const n in t) r[n] = Ue(e[n], t[n]);
    return r
}

function $c() {
    return {
        app: null
        , config: {
            isNativeTag: sd
            , performance: !1
            , globalProperties: {}
            , optionMergeStrategies: {}
            , errorHandler: void 0
            , warnHandler: void 0
            , compilerOptions: {}
        }
        , mixins: []
        , components: {}
        , directives: {}
        , provides: Object.create(null)
        , optionsCache: new WeakMap
        , propsCache: new WeakMap
        , emitsCache: new WeakMap
    }
}
let Pf = 0;

function Nf(e, t) {
    return function(n, o = null) {
        ae(n) || (n = Le({}, n)), o != null && !Se(o) && (o = null);
        const s = $c()
            , i = new WeakSet;
        let l = !1;
        const a = s.app = {
            _uid: Pf++
            , _component: n
            , _props: o
            , _container: null
            , _context: s
            , _instance: null
            , version: ep
            , get config() {
                return s.config
            }
            , set config(c) { }
            , use(c, ...u) {
                return i.has(c) || (c && ae(c.install) ? (i.add(c), c.install(a, ...u)) : ae(c) && (i.add(c), c(a, ...u))), a
            }
            , mixin(c) {
                return s.mixins.includes(c) || s.mixins.push(c), a
            }
            , component(c, u) {
                return u ? (s.components[c] = u, a) : s.components[c]
            }
            , directive(c, u) {
                return u ? (s.directives[c] = u, a) : s.directives[c]
            }
            , mount(c, u, d) {
                if (!l) {
                    const f = Z(n, o);
                    return f.appContext = s, d === !0 ? d = "svg" : d === !1 && (d = void 0), u && t ? t(f, c) : e(f, c, d), l = !0, a._container = c, c.__vue_app__ = a, Po(f.component) || f.component.proxy
                }
            }
            , unmount() {
                l && (e(null, a._container), delete a._container.__vue_app__)
            }
            , provide(c, u) {
                return s.provides[c] = u, a
            }
            , runWithContext(c) {
                const u = rn;
                rn = a;
                try {
                    return c()
                } finally {
                    rn = u
                }
            }
        };
        return a
    }
}
let rn = null;

function Jn(e, t) {
    if (ze) {
        let r = ze.provides;
        const n = ze.parent && ze.parent.provides;
        n === r && (r = ze.provides = Object.create(n)), r[e] = t
    }
}

function Et(e, t, r = !1) {
    const n = ze || Ie;
    if (n || rn) {
        const o = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : rn._context.provides;
        if (o && e in o) return o[e];
        if (arguments.length > 1) return r && ae(t) ? t.call(n && n.proxy) : t
    }
}

function Ff(e, t, r, n = !1) {
    const o = {}
        , s = {};
    no(s, $o, 1), e.propsDefaults = Object.create(null), Ac(e, t, o, s);
    for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
    r ? e.props = n ? o : oc(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s
}

function If(e, t, r, n) {
    const {
        props: o
        , attrs: s
        , vnode: {
            patchFlag: i
        }
    } = e, l = be(o), [a] = e.propsOptions;
    let c = !1;
    if ((n || i > 0) && !(i & 16)) {
        if (i & 8) {
            const u = e.vnode.dynamicProps;
            for (let d = 0; d < u.length; d++) {
                let f = u[d];
                if (So(e.emitsOptions, f)) continue;
                const g = t[f];
                if (a)
                    if (me(s, f)) g !== s[f] && (s[f] = g, c = !0);
                    else {
                        const b = _t(f);
                        o[b] = ks(a, l, b, g, e, !1)
                    }
                else g !== s[f] && (s[f] = g, c = !0)
            }
        }
    } else {
        Ac(e, t, o, s) && (c = !0);
        let u;
        for (const d in l) (!t || !me(t, d) && ((u = br(d)) === d || !me(t, u))) && (a ? r && (r[d] !== void 0 || r[u] !== void 0) && (o[d] = ks(a, l, d, void 0, e, !0)) : delete o[d]);
        if (s !== l)
            for (const d in s) (!t || !me(t, d)) && (delete s[d], c = !0)
    }
    c && St(e, "set", "$attrs")
}

function Ac(e, t, r, n) {
    const [o, s] = e.propsOptions;
    let i = !1
        , l;
    if (t)
        for (let a in t) {
            if (Zr(a)) continue;
            const c = t[a];
            let u;
            o && me(o, u = _t(a)) ? !s || !s.includes(u) ? r[u] = c : (l || (l = {}))[u] = c : So(e.emitsOptions, a) || (!(a in n) || c !== n[a]) && (n[a] = c, i = !0)
        }
    if (s) {
        const a = be(r)
            , c = l || Ce;
        for (let u = 0; u < s.length; u++) {
            const d = s[u];
            r[d] = ks(o, a, d, c[d], e, !me(c, d))
        }
    }
    return i
}

function ks(e, t, r, n, o, s) {
    const i = e[r];
    if (i != null) {
        const l = me(i, "default");
        if (l && n === void 0) {
            const a = i.default;
            if (i.type !== Function && !i.skipFactory && ae(a)) {
                const {
                    propsDefaults: c
                } = o;
                if (r in c) n = c[r];
                else {
                    const u = An(o);
                    n = c[r] = a.call(null, t), u()
                }
            } else n = a
        }
        i[0] && (s && !l ? n = !1 : i[1] && (n === "" || n === br(r)) && (n = !0))
    }
    return n
}

function Oc(e, t, r = !1) {
    const n = t.propsCache
        , o = n.get(e);
    if (o) return o;
    const s = e.props
        , i = {}
        , l = [];
    let a = !1;
    if (!ae(e)) {
        const u = d => {
            a = !0;
            const [f, g] = Oc(d, t, !0);
            Le(i, f), g && l.push(...g)
        };
        !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
    }
    if (!s && !a) return Se(e) && n.set(e, Tr), Tr;
    if (ee(s))
        for (let u = 0; u < s.length; u++) {
            const d = _t(s[u]);
            Zi(d) && (i[d] = Ce)
        } else if (s)
        for (const u in s) {
            const d = _t(u);
            if (Zi(d)) {
                const f = s[u]
                    , g = i[d] = ee(f) || ae(f) ? {
                        type: f
                    } : Le({}, f);
                if (g) {
                    const b = rl(Boolean, g.type)
                        , y = rl(String, g.type);
                    g[0] = b > -1, g[1] = y < 0 || b < y, (b > -1 || me(g, "default")) && l.push(d)
                }
            }
        }
    const c = [i, l];
    return Se(e) && n.set(e, c), c
}

function Zi(e) {
    return e[0] !== "$" && !Zr(e)
}

function el(e) {
    return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || ""
}

function tl(e, t) {
    return el(e) === el(t)
}

function rl(e, t) {
    return ee(t) ? t.findIndex(r => tl(r, e)) : ae(t) && tl(t, e) ? 0 : -1
}
const Pc = e => e[0] === "_" || e === "$stable"
    , ai = e => ee(e) ? e.map(ht) : [ht(e)]
    , Lf = (e, t, r) => {
        if (t._n) return t;
        const n = le((...o) => ai(t(...o)), r);
        return n._c = !1, n
    }
    , Nc = (e, t, r) => {
        const n = e._ctx;
        for (const o in e) {
            if (Pc(o)) continue;
            const s = e[o];
            if (ae(s)) t[o] = Lf(o, s, n);
            else if (s != null) {
                const i = ai(s);
                t[o] = () => i
            }
        }
    }
    , Fc = (e, t) => {
        const r = ai(t);
        e.slots.default = () => r
    }
    , Mf = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const r = t._;
            r ? (e.slots = be(t), no(t, "_", r)) : Nc(t, e.slots = {})
        } else e.slots = {}, t && Fc(e, t);
        no(e.slots, $o, 1)
    }
    , jf = (e, t, r) => {
        const {
            vnode: n
            , slots: o
        } = e;
        let s = !0
            , i = Ce;
        if (n.shapeFlag & 32) {
            const l = t._;
            l ? r && l === 1 ? s = !1 : (Le(o, t), !r && l === 1 && delete o._) : (s = !t.$stable, Nc(t, o)), i = t
        } else t && (Fc(e, t), i = {
            default: 1
        });
        if (s)
            for (const l in o) !Pc(l) && i[l] == null && delete o[l]
    };

function Ss(e, t, r, n, o = !1) {
    if (ee(e)) {
        e.forEach((f, g) => Ss(f, t && (ee(t) ? t[g] : t), r, n, o));
        return
    }
    if (en(n) && !o) return;
    const s = n.shapeFlag & 4 ? Po(n.component) || n.component.proxy : n.el
        , i = o ? null : s
        , {
            i: l
            , r: a
        } = e
        , c = t && t.r
        , u = l.refs === Ce ? l.refs = {} : l.refs
        , d = l.setupState;
    if (c != null && c !== a && (Ne(c) ? (u[c] = null, me(d, c) && (d[c] = null)) : ke(c) && (c.value = null)), ae(a)) Ut(a, l, 12, [i, u]);
    else {
        const f = Ne(a)
            , g = ke(a);
        if (f || g) {
            const b = () => {
                if (e.f) {
                    const y = f ? me(d, a) ? d[a] : u[a] : a.value;
                    o ? ee(y) && qs(y, s) : ee(y) ? y.includes(s) || y.push(s) : f ? (u[a] = [s], me(d, a) && (d[a] = u[a])) : (a.value = [s], e.k && (u[e.k] = a.value))
                } else f ? (u[a] = i, me(d, a) && (d[a] = i)) : g && (a.value = i, e.k && (u[e.k] = i))
            };
            i ? (b.id = -1, qe(b, r)) : b()
        }
    }
}
const qe = af;

function zf(e) {
    return Hf(e)
}

function Hf(e, t) {
    const r = Da();
    r.__VUE__ = !0;
    const {
        insert: n
        , remove: o
        , patchProp: s
        , createElement: i
        , createText: l
        , createComment: a
        , setText: c
        , setElementText: u
        , parentNode: d
        , nextSibling: f
        , setScopeId: g = Ze
        , insertStaticContent: b
    } = e, y = (p, h, _, R = null, S = null, N = null, L = void 0, P = null, F = !!h.dynamicChildren) => {
        if (p === h) return;
        p && !ir(p, h) && (R = C(p), Pe(p, S, N, !0), p = null), h.patchFlag === -2 && (F = !1, h.dynamicChildren = null);
        const {
            type: O
            , ref: B
            , shapeFlag: re
        } = h;
        switch (O) {
            case Ro:
                x(p, h, _, R);
                break;
            case rt:
                w(p, h, _, R);
                break;
            case Yo:
                p == null && k(h, _, R, L);
                break;
            case Ve:
                A(p, h, _, R, S, N, L, P, F);
                break;
            default:
                re & 1 ? D(p, h, _, R, S, N, L, P, F) : re & 6 ? U(p, h, _, R, S, N, L, P, F) : (re & 64 || re & 128) && O.process(p, h, _, R, S, N, L, P, F, K)
        }
        B != null && S && Ss(B, p && p.ref, N, h || p, !h)
    }, x = (p, h, _, R) => {
        if (p == null) n(h.el = l(h.children), _, R);
        else {
            const S = h.el = p.el;
            h.children !== p.children && c(S, h.children)
        }
    }, w = (p, h, _, R) => {
        p == null ? n(h.el = a(h.children || ""), _, R) : h.el = p.el
    }, k = (p, h, _, R) => {
        [p.el, p.anchor] = b(p.children, h, _, R, p.el, p.anchor)
    }, T = ({
        el: p
        , anchor: h
    }, _, R) => {
        let S;
        for (; p && p !== h;) S = f(p), n(p, _, R), p = S;
        n(h, _, R)
    }, j = ({
        el: p
        , anchor: h
    }) => {
        let _;
        for (; p && p !== h;) _ = f(p), o(p), p = _;
        o(h)
    }, D = (p, h, _, R, S, N, L, P, F) => {
        h.type === "svg" ? L = "svg" : h.type === "math" && (L = "mathml"), p == null ? $(h, _, R, S, N, L, P, F) : oe(p, h, S, N, L, P, F)
    }, $ = (p, h, _, R, S, N, L, P) => {
        let F, O;
        const {
            props: B
            , shapeFlag: re
            , transition: Y
            , dirs: se
        } = p;
        if (F = p.el = i(p.type, N, B && B.is, B), re & 8 ? u(F, p.children) : re & 16 && V(p.children, F, null, R, S, Xo(p, N), L, P), se && Zt(p, null, R, "created"), Q(F, p, p.scopeId, L, R), B) {
            for (const xe in B) xe !== "value" && !Zr(xe) && s(F, xe, null, B[xe], N, p.children, R, S, He);
            "value" in B && s(F, "value", null, B.value, N), (O = B.onVnodeBeforeMount) && pt(O, R, p)
        }
        se && Zt(p, null, R, "beforeMount");
        const fe = Bf(S, Y);
        fe && Y.beforeEnter(F), n(F, h, _), ((O = B && B.onVnodeMounted) || fe || se) && qe(() => {
            O && pt(O, R, p), fe && Y.enter(F), se && Zt(p, null, R, "mounted")
        }, S)
    }, Q = (p, h, _, R, S) => {
        if (_ && g(p, _), R)
            for (let N = 0; N < R.length; N++) g(p, R[N]);
        if (S) {
            let N = S.subTree;
            if (h === N) {
                const L = S.vnode;
                Q(p, L, L.scopeId, L.slotScopeIds, S.parent)
            }
        }
    }, V = (p, h, _, R, S, N, L, P, F = 0) => {
        for (let O = F; O < p.length; O++) {
            const B = p[O] = P ? zt(p[O]) : ht(p[O]);
            y(null, B, h, _, R, S, N, L, P)
        }
    }, oe = (p, h, _, R, S, N, L) => {
        const P = h.el = p.el;
        let {
            patchFlag: F
            , dynamicChildren: O
            , dirs: B
        } = h;
        F |= p.patchFlag & 16;
        const re = p.props || Ce
            , Y = h.props || Ce;
        let se;
        if (_ && er(_, !1), (se = Y.onVnodeBeforeUpdate) && pt(se, _, h, p), B && Zt(h, p, _, "beforeUpdate"), _ && er(_, !0), O ? W(p.dynamicChildren, O, P, _, R, Xo(h, S), N) : L || ce(p, h, P, null, _, R, Xo(h, S), N, !1), F > 0) {
            if (F & 16) te(P, h, re, Y, _, R, S);
            else if (F & 2 && re.class !== Y.class && s(P, "class", null, Y.class, S), F & 4 && s(P, "style", re.style, Y.style, S), F & 8) {
                const fe = h.dynamicProps;
                for (let xe = 0; xe < fe.length; xe++) {
                    const Ae = fe[xe]
                        , Me = re[Ae]
                        , st = Y[Ae];
                    (st !== Me || Ae === "value") && s(P, Ae, Me, st, S, p.children, _, R, He)
                }
            }
            F & 1 && p.children !== h.children && u(P, h.children)
        } else !L && O == null && te(P, h, re, Y, _, R, S);
        ((se = Y.onVnodeUpdated) || B) && qe(() => {
            se && pt(se, _, h, p), B && Zt(h, p, _, "updated")
        }, R)
    }, W = (p, h, _, R, S, N, L) => {
        for (let P = 0; P < h.length; P++) {
            const F = p[P]
                , O = h[P]
                , B = F.el && (F.type === Ve || !ir(F, O) || F.shapeFlag & 70) ? d(F.el) : _;
            y(F, O, B, null, R, S, N, L, !0)
        }
    }, te = (p, h, _, R, S, N, L) => {
        if (_ !== R) {
            if (_ !== Ce)
                for (const P in _) !Zr(P) && !(P in R) && s(p, P, _[P], null, L, h.children, S, N, He);
            for (const P in R) {
                if (Zr(P)) continue;
                const F = R[P]
                    , O = _[P];
                F !== O && P !== "value" && s(p, P, O, F, L, h.children, S, N, He)
            }
            "value" in R && s(p, "value", _.value, R.value, L)
        }
    }, A = (p, h, _, R, S, N, L, P, F) => {
        const O = h.el = p ? p.el : l("")
            , B = h.anchor = p ? p.anchor : l("");
        let {
            patchFlag: re
            , dynamicChildren: Y
            , slotScopeIds: se
        } = h;
        se && (P = P ? P.concat(se) : se), p == null ? (n(O, _, R), n(B, _, R), V(h.children || [], _, B, S, N, L, P, F)) : re > 0 && re & 64 && Y && p.dynamicChildren ? (W(p.dynamicChildren, Y, _, S, N, L, P), (h.key != null || S && h === S.subTree) && Ic(p, h, !0)) : ce(p, h, _, B, S, N, L, P, F)
    }, U = (p, h, _, R, S, N, L, P, F) => {
        h.slotScopeIds = P, p == null ? h.shapeFlag & 512 ? S.ctx.activate(h, _, R, L, F) : de(h, _, R, S, N, L, F) : we(p, h, F)
    }, de = (p, h, _, R, S, N, L) => {
        const P = p.component = Gf(p, R, S);
        if (Co(p) && (P.ctx.renderer = K), Jf(P), P.asyncDep) {
            if (S && S.registerDep(P, ie), !p.el) {
                const F = P.subTree = Z(rt);
                w(null, F, h, _)
            }
        } else ie(P, p, h, _, S, N, L)
    }, we = (p, h, _) => {
        const R = h.component = p.component;
        if (of(p, h, _))
            if (R.asyncDep && !R.asyncResolved) {
                z(R, h, _);
                return
            } else R.next = h, Jd(R.update), R.effect.dirty = !0, R.update();
        else h.el = p.el, R.vnode = h
    }, ie = (p, h, _, R, S, N, L) => {
        const P = () => {
            if (p.isMounted) {
                let {
                    next: B
                    , bu: re
                    , u: Y
                    , parent: se
                    , vnode: fe
                } = p;
                {
                    const Sr = Lc(p);
                    if (Sr) {
                        B && (B.el = fe.el, z(p, B, L)), Sr.asyncDep.then(() => {
                            p.isUnmounted || P()
                        });
                        return
                    }
                }
                let xe = B
                    , Ae;
                er(p, !1), B ? (B.el = fe.el, z(p, B, L)) : B = fe, re && Kn(re), (Ae = B.props && B.props.onVnodeBeforeUpdate) && pt(Ae, se, B, fe), er(p, !0);
                const Me = Go(p)
                    , st = p.subTree;
                p.subTree = Me, y(st, Me, d(st.el), C(st), p, S, N), B.el = Me.el, xe === null && sf(p, Me.el), Y && qe(Y, S), (Ae = B.props && B.props.onVnodeUpdated) && qe(() => pt(Ae, se, B, fe), S)
            } else {
                let B;
                const {
                    el: re
                    , props: Y
                } = h, {
                    bm: se
                    , m: fe
                    , parent: xe
                } = p, Ae = en(h);
                if (er(p, !1), se && Kn(se), !Ae && (B = Y && Y.onVnodeBeforeMount) && pt(B, xe, h), er(p, !0), re && $e) {
                    const Me = () => {
                        p.subTree = Go(p), $e(re, p.subTree, p, S, null)
                    };
                    Ae ? h.type.__asyncLoader()
                        .then(() => !p.isUnmounted && Me()) : Me()
                } else {
                    const Me = p.subTree = Go(p);
                    y(null, Me, _, R, p, S, N), h.el = Me.el
                }
                if (fe && qe(fe, S), !Ae && (B = Y && Y.onVnodeMounted)) {
                    const Me = h;
                    qe(() => pt(B, xe, Me), S)
                } (h.shapeFlag & 256 || xe && en(xe.vnode) && xe.vnode.shapeFlag & 256) && p.a && qe(p.a, S), p.isMounted = !0, h = _ = R = null
            }
        }
            , F = p.effect = new Gs(P, Ze, () => ni(O), p.scope)
            , O = p.update = () => {
                F.dirty && F.run()
            };
        O.id = p.uid, er(p, !0), O()
    }, z = (p, h, _) => {
        h.component = p;
        const R = p.vnode.props;
        p.vnode = h, p.next = null, If(p, h.props, R, _), jf(p, h.children, _), yr(), qi(p), vr()
    }, ce = (p, h, _, R, S, N, L, P, F = !1) => {
        const O = p && p.children
            , B = p ? p.shapeFlag : 0
            , re = h.children
            , {
                patchFlag: Y
                , shapeFlag: se
            } = h;
        if (Y > 0) {
            if (Y & 128) {
                X(O, re, _, R, S, N, L, P, F);
                return
            } else if (Y & 256) {
                Te(O, re, _, R, S, N, L, P, F);
                return
            }
        }
        se & 8 ? (B & 16 && He(O, S, N), re !== O && u(_, re)) : B & 16 ? se & 16 ? X(O, re, _, R, S, N, L, P, F) : He(O, S, N, !0) : (B & 8 && u(_, ""), se & 16 && V(re, _, R, S, N, L, P, F))
    }, Te = (p, h, _, R, S, N, L, P, F) => {
        p = p || Tr, h = h || Tr;
        const O = p.length
            , B = h.length
            , re = Math.min(O, B);
        let Y;
        for (Y = 0; Y < re; Y++) {
            const se = h[Y] = F ? zt(h[Y]) : ht(h[Y]);
            y(p[Y], se, _, null, S, N, L, P, F)
        }
        O > B ? He(p, S, N, !0, !1, re) : V(h, _, R, S, N, L, P, F, re)
    }, X = (p, h, _, R, S, N, L, P, F) => {
        let O = 0;
        const B = h.length;
        let re = p.length - 1
            , Y = B - 1;
        for (; O <= re && O <= Y;) {
            const se = p[O]
                , fe = h[O] = F ? zt(h[O]) : ht(h[O]);
            if (ir(se, fe)) y(se, fe, _, null, S, N, L, P, F);
            else break;
            O++
        }
        for (; O <= re && O <= Y;) {
            const se = p[re]
                , fe = h[Y] = F ? zt(h[Y]) : ht(h[Y]);
            if (ir(se, fe)) y(se, fe, _, null, S, N, L, P, F);
            else break;
            re--, Y--
        }
        if (O > re) {
            if (O <= Y) {
                const se = Y + 1
                    , fe = se < B ? h[se].el : R;
                for (; O <= Y;) y(null, h[O] = F ? zt(h[O]) : ht(h[O]), _, fe, S, N, L, P, F), O++
            }
        } else if (O > Y)
            for (; O <= re;) Pe(p[O], S, N, !0), O++;
        else {
            const se = O
                , fe = O
                , xe = new Map;
            for (O = fe; O <= Y; O++) {
                const Ge = h[O] = F ? zt(h[O]) : ht(h[O]);
                Ge.key != null && xe.set(Ge.key, O)
            }
            let Ae, Me = 0;
            const st = Y - fe + 1;
            let Sr = !1
                , Ni = 0;
            const Ur = new Array(st);
            for (O = 0; O < st; O++) Ur[O] = 0;
            for (O = se; O <= re; O++) {
                const Ge = p[O];
                if (Me >= st) {
                    Pe(Ge, S, N, !0);
                    continue
                }
                let ft;
                if (Ge.key != null) ft = xe.get(Ge.key);
                else
                    for (Ae = fe; Ae <= Y; Ae++)
                        if (Ur[Ae - fe] === 0 && ir(Ge, h[Ae])) {
                            ft = Ae;
                            break
                        } ft === void 0 ? Pe(Ge, S, N, !0) : (Ur[ft - fe] = O + 1, ft >= Ni ? Ni = ft : Sr = !0, y(Ge, h[ft], _, null, S, N, L, P, F), Me++)
            }
            const Fi = Sr ? Df(Ur) : Tr;
            for (Ae = Fi.length - 1, O = st - 1; O >= 0; O--) {
                const Ge = fe + O
                    , ft = h[Ge]
                    , Ii = Ge + 1 < B ? h[Ge + 1].el : R;
                Ur[O] === 0 ? y(null, ft, _, Ii, S, N, L, P, F) : Sr && (Ae < 0 || O !== Fi[Ae] ? Re(ft, _, Ii, 2) : Ae--)
            }
        }
    }, Re = (p, h, _, R, S = null) => {
        const {
            el: N
            , type: L
            , transition: P
            , children: F
            , shapeFlag: O
        } = p;
        if (O & 6) {
            Re(p.component.subTree, h, _, R);
            return
        }
        if (O & 128) {
            p.suspense.move(h, _, R);
            return
        }
        if (O & 64) {
            L.move(p, h, _, K);
            return
        }
        if (L === Ve) {
            n(N, h, _);
            for (let re = 0; re < F.length; re++) Re(F[re], h, _, R);
            n(p.anchor, h, _);
            return
        }
        if (L === Yo) {
            T(p, h, _);
            return
        }
        if (R !== 2 && O & 1 && P)
            if (R === 0) P.beforeEnter(N), n(N, h, _), qe(() => P.enter(N), S);
            else {
                const {
                    leave: re
                    , delayLeave: Y
                    , afterLeave: se
                } = P, fe = () => n(N, h, _), xe = () => {
                    re(N, () => {
                        fe(), se && se()
                    })
                };
                Y ? Y(N, fe, xe) : xe()
            }
        else n(N, h, _)
    }, Pe = (p, h, _, R = !1, S = !1) => {
        const {
            type: N
            , props: L
            , ref: P
            , children: F
            , dynamicChildren: O
            , shapeFlag: B
            , patchFlag: re
            , dirs: Y
        } = p;
        if (P != null && Ss(P, null, _, p, !0), B & 256) {
            h.ctx.deactivate(p);
            return
        }
        const se = B & 1 && Y
            , fe = !en(p);
        let xe;
        if (fe && (xe = L && L.onVnodeBeforeUnmount) && pt(xe, h, p), B & 6) Fn(p.component, _, R);
        else {
            if (B & 128) {
                p.suspense.unmount(_, R);
                return
            }
            se && Zt(p, null, h, "beforeUnmount"), B & 64 ? p.type.remove(p, h, _, S, K, R) : O && (N !== Ve || re > 0 && re & 64) ? He(O, h, _, !1, !0) : (N === Ve && re & 384 || !S && B & 16) && He(F, h, _), R && Rt(p)
        } (fe && (xe = L && L.onVnodeUnmounted) || se) && qe(() => {
            xe && pt(xe, h, p), se && Zt(p, null, h, "unmounted")
        }, _)
    }, Rt = p => {
        const {
            type: h
            , el: _
            , anchor: R
            , transition: S
        } = p;
        if (h === Ve) {
            kr(_, R);
            return
        }
        if (h === Yo) {
            j(p);
            return
        }
        const N = () => {
            o(_), S && !S.persisted && S.afterLeave && S.afterLeave()
        };
        if (p.shapeFlag & 1 && S && !S.persisted) {
            const {
                leave: L
                , delayLeave: P
            } = S, F = () => L(_, N);
            P ? P(p.el, N, F) : F()
        } else N()
    }, kr = (p, h) => {
        let _;
        for (; p !== h;) _ = f(p), o(p), p = _;
        o(h)
    }, Fn = (p, h, _) => {
        const {
            bum: R
            , scope: S
            , update: N
            , subTree: L
            , um: P
        } = p;
        R && Kn(R), S.stop(), N && (N.active = !1, Pe(L, p, h, _)), P && qe(P, h), qe(() => {
            p.isUnmounted = !0
        }, h), h && h.pendingBranch && !h.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve())
    }, He = (p, h, _, R = !1, S = !1, N = 0) => {
        for (let L = N; L < p.length; L++) Pe(p[L], h, _, R, S)
    }, C = p => p.shapeFlag & 6 ? C(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : f(p.anchor || p.el);
    let H = !1;
    const I = (p, h, _) => {
        p == null ? h._vnode && Pe(h._vnode, null, null, !0) : y(h._vnode || null, p, h, null, null, null, _), H || (H = !0, qi(), pc(), H = !1), h._vnode = p
    }
        , K = {
            p: y
            , um: Pe
            , m: Re
            , r: Rt
            , mt: de
            , mc: V
            , pc: ce
            , pbc: W
            , n: C
            , o: e
        };
    let ye, $e;
    return t && ([ye, $e] = t(K)), {
        render: I
        , hydrate: ye
        , createApp: Nf(I, ye)
    }
}

function Xo({
    type: e
    , props: t
}, r) {
    return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r
}

function er({
    effect: e
    , update: t
}, r) {
    e.allowRecurse = t.allowRecurse = r
}

function Bf(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function Ic(e, t, r = !1) {
    const n = e.children
        , o = t.children;
    if (ee(n) && ee(o))
        for (let s = 0; s < n.length; s++) {
            const i = n[s];
            let l = o[s];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = zt(o[s]), l.el = i.el), r || Ic(i, l)), l.type === Ro && (l.el = i.el)
        }
}

function Df(e) {
    const t = e.slice()
        , r = [0];
    let n, o, s, i, l;
    const a = e.length;
    for (n = 0; n < a; n++) {
        const c = e[n];
        if (c !== 0) {
            if (o = r[r.length - 1], e[o] < c) {
                t[n] = o, r.push(n);
                continue
            }
            for (s = 0, i = r.length - 1; s < i;) l = s + i >> 1, e[r[l]] < c ? s = l + 1 : i = l;
            c < e[r[s]] && (s > 0 && (t[n] = r[s - 1]), r[s] = n)
        }
    }
    for (s = r.length, i = r[s - 1]; s-- > 0;) r[s] = i, i = t[i];
    return r
}

function Lc(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Lc(t)
}
const Uf = e => e.__isTeleport
    , Ve = Symbol.for("v-fgt")
    , Ro = Symbol.for("v-txt")
    , rt = Symbol.for("v-cmt")
    , Yo = Symbol.for("v-stc")
    , nn = [];
let ut = null;

function M(e = !1) {
    nn.push(ut = e ? null : [])
}

function Vf() {
    nn.pop(), ut = nn[nn.length - 1] || null
}
let mn = 1;

function nl(e) {
    mn += e
}

function Mc(e) {
    return e.dynamicChildren = mn > 0 ? ut || Tr : null, Vf(), mn > 0 && ut && ut.push(e), e
}

function J(e, t, r, n, o, s) {
    return Mc(m(e, t, r, n, o, s, !0))
}

function We(e, t, r, n, o) {
    return Mc(Z(e, t, r, n, o, !0))
}

function ao(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function ir(e, t) {
    return e.type === t.type && e.key === t.key
}
const $o = "__vInternal"
    , jc = ({
        key: e
    }) => e ?? null
    , Qn = ({
        ref: e
        , ref_key: t
        , ref_for: r
    }) => (typeof e == "number" && (e = "" + e), e != null ? Ne(e) || ke(e) || ae(e) ? {
        i: Ie
        , r: e
        , k: t
        , f: !!r
    } : e : null);

function m(e, t = null, r = null, n = 0, o = null, s = e === Ve ? 0 : 1, i = !1, l = !1) {
    const a = {
        __v_isVNode: !0
        , __v_skip: !0
        , type: e
        , props: t
        , key: t && jc(t)
        , ref: t && Qn(t)
        , scopeId: Eo
        , slotScopeIds: null
        , children: r
        , component: null
        , suspense: null
        , ssContent: null
        , ssFallback: null
        , dirs: null
        , transition: null
        , el: null
        , anchor: null
        , target: null
        , targetAnchor: null
        , staticCount: 0
        , shapeFlag: s
        , patchFlag: n
        , dynamicProps: o
        , dynamicChildren: null
        , appContext: null
        , ctx: Ie
    };
    return l ? (ci(a, r), s & 128 && e.normalize(a)) : r && (a.shapeFlag |= Ne(r) ? 8 : 16), mn > 0 && !i && ut && (a.patchFlag > 0 || s & 6) && a.patchFlag !== 32 && ut.push(a), a
}
const Z = qf;

function qf(e, t = null, r = null, n = 0, o = null, s = !1) {
    if ((!e || e === mc) && (e = rt), ao(e)) {
        const l = Gt(e, t, !0);
        return r && ci(l, r), mn > 0 && !s && ut && (l.shapeFlag & 6 ? ut[ut.indexOf(e)] = l : ut.push(l)), l.patchFlag |= -2, l
    }
    if (Zf(e) && (e = e.__vccOpts), t) {
        t = zc(t);
        let {
            class: l
            , style: a
        } = t;
        l && !Ne(l) && (t.class = ve(l)), Se(a) && (ic(a) && !ee(a) && (a = Le({}, a)), t.style = ur(a))
    }
    const i = Ne(e) ? 1 : lf(e) ? 128 : Uf(e) ? 64 : Se(e) ? 4 : ae(e) ? 2 : 0;
    return m(e, t, r, n, o, i, s, !0)
}

function zc(e) {
    return e ? ic(e) || $o in e ? Le({}, e) : e : null
}

function Gt(e, t, r = !1) {
    const {
        props: n
        , ref: o
        , patchFlag: s
        , children: i
    } = e, l = t ? ui(n || {}, t) : n;
    return {
        __v_isVNode: !0
        , __v_skip: !0
        , type: e.type
        , props: l
        , key: l && jc(l)
        , ref: t && t.ref ? r && o ? ee(o) ? o.concat(Qn(t)) : [o, Qn(t)] : Qn(t) : o
        , scopeId: e.scopeId
        , slotScopeIds: e.slotScopeIds
        , children: i
        , target: e.target
        , targetAnchor: e.targetAnchor
        , staticCount: e.staticCount
        , shapeFlag: e.shapeFlag
        , patchFlag: t && e.type !== Ve ? s === -1 ? 16 : s | 16 : s
        , dynamicProps: e.dynamicProps
        , dynamicChildren: e.dynamicChildren
        , appContext: e.appContext
        , dirs: e.dirs
        , transition: e.transition
        , component: e.component
        , suspense: e.suspense
        , ssContent: e.ssContent && Gt(e.ssContent)
        , ssFallback: e.ssFallback && Gt(e.ssFallback)
        , el: e.el
        , anchor: e.anchor
        , ctx: e.ctx
        , ce: e.ce
    }
}

function G(e = " ", t = 0) {
    return Z(Ro, null, e, t)
}

function Ye(e = "", t = !1) {
    return t ? (M(), We(rt, null, e)) : Z(rt, null, e)
}

function ht(e) {
    return e == null || typeof e == "boolean" ? Z(rt) : ee(e) ? Z(Ve, null, e.slice()) : typeof e == "object" ? zt(e) : Z(Ro, null, String(e))
}

function zt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Gt(e)
}

function ci(e, t) {
    let r = 0;
    const {
        shapeFlag: n
    } = e;
    if (t == null) t = null;
    else if (ee(t)) r = 16;
    else if (typeof t == "object")
        if (n & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1), ci(e, o()), o._c && (o._d = !0));
            return
        } else {
            r = 32;
            const o = t._;
            !o && !($o in t) ? t._ctx = Ie : o === 3 && Ie && (Ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else ae(t) ? (t = {
        default: t
        , _ctx: Ie
    }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [G(t)]) : r = 8);
    e.children = t, e.shapeFlag |= r
}

function ui(...e) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
        const n = e[r];
        for (const o in n)
            if (o === "class") t.class !== n.class && (t.class = ve([t.class, n.class]));
            else if (o === "style") t.style = ur([t.style, n.style]);
            else if (yo(o)) {
                const s = t[o]
                    , i = n[o];
                i && s !== i && !(ee(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i)
            } else o !== "" && (t[o] = n[o])
    }
    return t
}

function pt(e, t, r, n = null) {
    tt(e, t, 7, [r, n])
}
const Wf = $c();
let Kf = 0;

function Gf(e, t, r) {
    const n = e.type
        , o = (t ? t.appContext : e.appContext) || Wf
        , s = {
            uid: Kf++
            , vnode: e
            , type: n
            , parent: t
            , appContext: o
            , root: null
            , next: null
            , subTree: null
            , effect: null
            , update: null
            , scope: new qa(!0)
            , render: null
            , proxy: null
            , exposed: null
            , exposeProxy: null
            , withProxy: null
            , provides: t ? t.provides : Object.create(o.provides)
            , accessCache: null
            , renderCache: []
            , components: null
            , directives: null
            , propsOptions: Oc(n, o)
            , emitsOptions: gc(n, o)
            , emit: null
            , emitted: null
            , propsDefaults: Ce
            , inheritAttrs: n.inheritAttrs
            , ctx: Ce
            , data: Ce
            , props: Ce
            , attrs: Ce
            , slots: Ce
            , refs: Ce
            , setupState: Ce
            , setupContext: null
            , attrsProxy: null
            , slotsProxy: null
            , suspense: r
            , suspenseId: r ? r.pendingId : 0
            , asyncDep: null
            , asyncResolved: !1
            , isMounted: !1
            , isUnmounted: !1
            , isDeactivated: !1
            , bc: null
            , c: null
            , bm: null
            , m: null
            , bu: null
            , u: null
            , um: null
            , bum: null
            , da: null
            , a: null
            , rtg: null
            , rtc: null
            , ec: null
            , sp: null
        };
    return s.ctx = {
        _: s
    }, s.root = t ? t.root : s, s.emit = Yd.bind(null, s), e.ce && e.ce(s), s
}
let ze = null;
const Ao = () => ze || Ie;
let co, Es;
{
    const e = Da()
        , t = (r, n) => {
            let o;
            return (o = e[r]) || (o = e[r] = []), o.push(n), s => {
                o.length > 1 ? o.forEach(i => i(s)) : o[0](s)
            }
        };
    co = t("__VUE_INSTANCE_SETTERS__", r => ze = r), Es = t("__VUE_SSR_SETTERS__", r => Oo = r)
}
const An = e => {
    const t = ze;
    return co(e), e.scope.on(), () => {
        e.scope.off(), co(t)
    }
}
    , ol = () => {
        ze && ze.scope.off(), co(null)
    };

function Hc(e) {
    return e.vnode.shapeFlag & 4
}
let Oo = !1;

function Jf(e, t = !1) {
    t && Es(t);
    const {
        props: r
        , children: n
    } = e.vnode, o = Hc(e);
    Ff(e, r, o, t), Mf(e, n);
    const s = o ? Qf(e, t) : void 0;
    return t && Es(!1), s
}

function Qf(e, t) {
    const r = e.type;
    e.accessCache = Object.create(null), e.proxy = ei(new Proxy(e.ctx, Cf));
    const {
        setup: n
    } = r;
    if (n) {
        const o = e.setupContext = n.length > 1 ? Dc(e) : null
            , s = An(e);
        yr();
        const i = Ut(n, e, 0, [e.props, o]);
        if (vr(), s(), za(i)) {
            if (i.then(ol, ol), t) return i.then(l => {
                sl(e, l, t)
            })
                .catch(l => {
                    ko(l, e, 0)
                });
            e.asyncDep = i
        } else sl(e, i, t)
    } else Bc(e, t)
}

function sl(e, t, r) {
    ae(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Se(t) && (e.setupState = uc(t)), Bc(e, r)
}
let il;

function Bc(e, t, r) {
    const n = e.type;
    if (!e.render) {
        if (!t && il && !n.render) {
            const o = n.template || li(e)
                .template;
            if (o) {
                const {
                    isCustomElement: s
                    , compilerOptions: i
                } = e.appContext.config, {
                    delimiters: l
                    , compilerOptions: a
                } = n, c = Le(Le({
                    isCustomElement: s
                    , delimiters: l
                }, i), a);
                n.render = il(o, c)
            }
        }
        e.render = n.render || Ze
    } {
        const o = An(e);
        yr();
        try {
            Tf(e)
        } finally {
            vr(), o()
        }
    }
}

function Xf(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
        get(t, r) {
            return Ke(e, "get", "$attrs"), t[r]
        }
    }))
}

function Dc(e) {
    const t = r => {
        e.exposed = r || {}
    };
    return {
        get attrs() {
            return Xf(e)
        }
        , slots: e.slots
        , emit: e.emit
        , expose: t
    }
}

function Po(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(uc(ei(e.exposed)), {
        get(t, r) {
            if (r in t) return t[r];
            if (r in tn) return tn[r](e)
        }
        , has(t, r) {
            return r in t || r in tn
        }
    }))
}

function Yf(e, t = !0) {
    return ae(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Zf(e) {
    return ae(e) && "__vccOpts" in e
}
const ne = (e, t) => Bd(e, t, Oo);

function di(e, t, r) {
    const n = arguments.length;
    return n === 2 ? Se(t) && !ee(t) ? ao(t) ? Z(e, null, [t]) : Z(e, t) : Z(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && ao(r) && (r = [r]), Z(e, t, r))
}
const ep = "3.4.21";
/**
 * @vue/runtime-dom v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
const tp = "http://www.w3.org/2000/svg"
    , rp = "http://www.w3.org/1998/Math/MathML"
    , Ht = typeof document < "u" ? document : null
    , ll = Ht && Ht.createElement("template")
    , np = {
        insert: (e, t, r) => {
            t.insertBefore(e, r || null)
        }
        , remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        }
        , createElement: (e, t, r, n) => {
            const o = t === "svg" ? Ht.createElementNS(tp, e) : t === "mathml" ? Ht.createElementNS(rp, e) : Ht.createElement(e, r ? {
                is: r
            } : void 0);
            return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o
        }
        , createText: e => Ht.createTextNode(e)
        , createComment: e => Ht.createComment(e)
        , setText: (e, t) => {
            e.nodeValue = t
        }
        , setElementText: (e, t) => {
            e.textContent = t
        }
        , parentNode: e => e.parentNode
        , nextSibling: e => e.nextSibling
        , querySelector: e => Ht.querySelector(e)
        , setScopeId(e, t) {
            e.setAttribute(t, "")
        }
        , insertStaticContent(e, t, r, n, o, s) {
            const i = r ? r.previousSibling : t.lastChild;
            if (o && (o === s || o.nextSibling))
                for (; t.insertBefore(o.cloneNode(!0), r), !(o === s || !(o = o.nextSibling)););
            else {
                ll.innerHTML = n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e;
                const l = ll.content;
                if (n === "svg" || n === "mathml") {
                    const a = l.firstChild;
                    for (; a.firstChild;) l.appendChild(a.firstChild);
                    l.removeChild(a)
                }
                t.insertBefore(l, r)
            }
            return [i ? i.nextSibling : t.firstChild, r ? r.previousSibling : t.lastChild]
        }
    }
    , At = "transition"
    , Vr = "animation"
    , bn = Symbol("_vtc")
    , ar = (e, {
        slots: t
    }) => di(gf, op(e), t);
ar.displayName = "Transition";
const Uc = {
    name: String
    , type: String
    , css: {
        type: Boolean
        , default: !0
    }
    , duration: [String, Number, Object]
    , enterFromClass: String
    , enterActiveClass: String
    , enterToClass: String
    , appearFromClass: String
    , appearActiveClass: String
    , appearToClass: String
    , leaveFromClass: String
    , leaveActiveClass: String
    , leaveToClass: String
};
ar.props = Le({}, vc, Uc);
const tr = (e, t = []) => {
    ee(e) ? e.forEach(r => r(...t)) : e && e(...t)
}
    , al = e => e ? ee(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;

function op(e) {
    const t = {};
    for (const A in e) A in Uc || (t[A] = e[A]);
    if (e.css === !1) return t;
    const {
        name: r = "v"
        , type: n
        , duration: o
        , enterFromClass: s = `${r}-enter-from`
        , enterActiveClass: i = `${r}-enter-active`
        , enterToClass: l = `${r}-enter-to`
        , appearFromClass: a = s
        , appearActiveClass: c = i
        , appearToClass: u = l
        , leaveFromClass: d = `${r}-leave-from`
        , leaveActiveClass: f = `${r}-leave-active`
        , leaveToClass: g = `${r}-leave-to`
    } = e, b = sp(o), y = b && b[0], x = b && b[1], {
        onBeforeEnter: w
        , onEnter: k
        , onEnterCancelled: T
        , onLeave: j
        , onLeaveCancelled: D
        , onBeforeAppear: $ = w
        , onAppear: Q = k
        , onAppearCancelled: V = T
    } = t, oe = (A, U, de) => {
        rr(A, U ? u : l), rr(A, U ? c : i), de && de()
    }, W = (A, U) => {
        A._isLeaving = !1, rr(A, d), rr(A, g), rr(A, f), U && U()
    }, te = A => (U, de) => {
        const we = A ? Q : k
            , ie = () => oe(U, A, de);
        tr(we, [U, ie]), cl(() => {
            rr(U, A ? a : s), Ot(U, A ? u : l), al(we) || ul(U, n, y, ie)
        })
    };
    return Le(t, {
        onBeforeEnter(A) {
            tr(w, [A]), Ot(A, s), Ot(A, i)
        }
        , onBeforeAppear(A) {
            tr($, [A]), Ot(A, a), Ot(A, c)
        }
        , onEnter: te(!1)
        , onAppear: te(!0)
        , onLeave(A, U) {
            A._isLeaving = !0;
            const de = () => W(A, U);
            Ot(A, d), ap(), Ot(A, f), cl(() => {
                A._isLeaving && (rr(A, d), Ot(A, g), al(j) || ul(A, n, x, de))
            }), tr(j, [A, de])
        }
        , onEnterCancelled(A) {
            oe(A, !1), tr(T, [A])
        }
        , onAppearCancelled(A) {
            oe(A, !0), tr(V, [A])
        }
        , onLeaveCancelled(A) {
            W(A), tr(D, [A])
        }
    })
}

function sp(e) {
    if (e == null) return null;
    if (Se(e)) return [Zo(e.enter), Zo(e.leave)];
    {
        const t = Zo(e);
        return [t, t]
    }
}

function Zo(e) {
    return ud(e)
}

function Ot(e, t) {
    t.split(/\s+/)
        .forEach(r => r && e.classList.add(r)), (e[bn] || (e[bn] = new Set))
            .add(t)
}

function rr(e, t) {
    t.split(/\s+/)
        .forEach(n => n && e.classList.remove(n));
    const r = e[bn];
    r && (r.delete(t), r.size || (e[bn] = void 0))
}

function cl(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e)
    })
}
let ip = 0;

function ul(e, t, r, n) {
    const o = e._endId = ++ip
        , s = () => {
            o === e._endId && n()
        };
    if (r) return setTimeout(s, r);
    const {
        type: i
        , timeout: l
        , propCount: a
    } = lp(e, t);
    if (!i) return n();
    const c = i + "end";
    let u = 0;
    const d = () => {
        e.removeEventListener(c, f), s()
    }
        , f = g => {
            g.target === e && ++u >= a && d()
        };
    setTimeout(() => {
        u < a && d()
    }, l + 1), e.addEventListener(c, f)
}

function lp(e, t) {
    const r = window.getComputedStyle(e)
        , n = b => (r[b] || "")
            .split(", ")
        , o = n(`${At}Delay`)
        , s = n(`${At}Duration`)
        , i = dl(o, s)
        , l = n(`${Vr}Delay`)
        , a = n(`${Vr}Duration`)
        , c = dl(l, a);
    let u = null
        , d = 0
        , f = 0;
    t === At ? i > 0 && (u = At, d = i, f = s.length) : t === Vr ? c > 0 && (u = Vr, d = c, f = a.length) : (d = Math.max(i, c), u = d > 0 ? i > c ? At : Vr : null, f = u ? u === At ? s.length : a.length : 0);
    const g = u === At && /\b(transform|all)(,|$)/.test(n(`${At}Property`)
        .toString());
    return {
        type: u
        , timeout: d
        , propCount: f
        , hasTransform: g
    }
}

function dl(e, t) {
    for (; e.length < t.length;) e = e.concat(e);
    return Math.max(...t.map((r, n) => fl(r) + fl(e[n])))
}

function fl(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1)
        .replace(",", ".")) * 1e3
}

function ap() {
    return document.body.offsetHeight
}

function cp(e, t, r) {
    const n = e[bn];
    n && (t = (t ? [t, ...n] : [...n])
        .join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t
}
const uo = Symbol("_vod")
    , Vc = Symbol("_vsh")
    , lt = {
        beforeMount(e, {
            value: t
        }, {
            transition: r
        }) {
            e[uo] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : qr(e, t)
        }
        , mounted(e, {
            value: t
        }, {
            transition: r
        }) {
            r && t && r.enter(e)
        }
        , updated(e, {
            value: t
            , oldValue: r
        }, {
            transition: n
        }) {
            !t != !r && (n ? t ? (n.beforeEnter(e), qr(e, !0), n.enter(e)) : n.leave(e, () => {
                qr(e, !1)
            }) : qr(e, t))
        }
        , beforeUnmount(e, {
            value: t
        }) {
            qr(e, t)
        }
    };

function qr(e, t) {
    e.style.display = t ? e[uo] : "none", e[Vc] = !t
}
const up = Symbol("")
    , dp = /(^|;)\s*display\s*:/;

function fp(e, t, r) {
    const n = e.style
        , o = Ne(r);
    let s = !1;
    if (r && !o) {
        if (t)
            if (Ne(t))
                for (const i of t.split(";")) {
                    const l = i.slice(0, i.indexOf(":"))
                        .trim();
                    r[l] == null && Xn(n, l, "")
                } else
                for (const i in t) r[i] == null && Xn(n, i, "");
        for (const i in r) i === "display" && (s = !0), Xn(n, i, r[i])
    } else if (o) {
        if (t !== r) {
            const i = n[up];
            i && (r += ";" + i), n.cssText = r, s = dp.test(r)
        }
    } else t && e.removeAttribute("style");
    uo in e && (e[uo] = s ? n.display : "", e[Vc] && (n.display = "none"))
}
const pl = /\s*!important$/;

function Xn(e, t, r) {
    if (ee(r)) r.forEach(n => Xn(e, t, n));
    else if (r == null && (r = ""), t.startsWith("--")) e.setProperty(t, r);
    else {
        const n = pp(e, t);
        pl.test(r) ? e.setProperty(br(n), r.replace(pl, ""), "important") : e[n] = r
    }
}
const hl = ["Webkit", "Moz", "ms"]
    , es = {};

function pp(e, t) {
    const r = es[t];
    if (r) return r;
    let n = _t(t);
    if (n !== "filter" && n in e) return es[t] = n;
    n = _o(n);
    for (let o = 0; o < hl.length; o++) {
        const s = hl[o] + n;
        if (s in e) return es[t] = s
    }
    return t
}
const gl = "http://www.w3.org/1999/xlink";

function hp(e, t, r, n, o) {
    if (n && t.startsWith("xlink:")) r == null ? e.removeAttributeNS(gl, t.slice(6, t.length)) : e.setAttributeNS(gl, t, r);
    else {
        const s = md(t);
        r == null || s && !Ua(r) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : r)
    }
}

function gp(e, t, r, n, o, s, i) {
    if (t === "innerHTML" || t === "textContent") {
        n && i(n, o, s), e[t] = r ?? "";
        return
    }
    const l = e.tagName;
    if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
        const c = l === "OPTION" ? e.getAttribute("value") || "" : e.value
            , u = r ?? "";
        (c !== u || !("_value" in e)) && (e.value = u), r == null && e.removeAttribute(t), e._value = r;
        return
    }
    let a = !1;
    if (r === "" || r == null) {
        const c = typeof e[t];
        c === "boolean" ? r = Ua(r) : r == null && c === "string" ? (r = "", a = !0) : c === "number" && (r = 0, a = !0)
    }
    try {
        e[t] = r
    } catch { }
    a && e.removeAttribute(t)
}

function kt(e, t, r, n) {
    e.addEventListener(t, r, n)
}

function mp(e, t, r, n) {
    e.removeEventListener(t, r, n)
}
const ml = Symbol("_vei");

function bp(e, t, r, n, o = null) {
    const s = e[ml] || (e[ml] = {})
        , i = s[t];
    if (n && i) i.value = n;
    else {
        const [l, a] = yp(t);
        if (n) {
            const c = s[t] = wp(n, o);
            kt(e, l, c, a)
        } else i && (mp(e, l, i, a), s[t] = void 0)
    }
}
const bl = /(?:Once|Passive|Capture)$/;

function yp(e) {
    let t;
    if (bl.test(e)) {
        t = {};
        let n;
        for (; n = e.match(bl);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : br(e.slice(2)), t]
}
let ts = 0;
const vp = Promise.resolve()
    , _p = () => ts || (vp.then(() => ts = 0), ts = Date.now());

function wp(e, t) {
    const r = n => {
        if (!n._vts) n._vts = Date.now();
        else if (n._vts <= r.attached) return;
        tt(xp(n, r.value), t, 5, [n])
    };
    return r.value = e, r.attached = _p(), r
}

function xp(e, t) {
    if (ee(t)) {
        const r = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            r.call(e), e._stopped = !0
        }, t.map(n => o => !o._stopped && n && n(o))
    } else return t
}
const yl = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
    , kp = (e, t, r, n, o, s, i, l, a) => {
        const c = o === "svg";
        t === "class" ? cp(e, n, c) : t === "style" ? fp(e, r, n) : yo(t) ? Vs(t) || bp(e, t, r, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Sp(e, t, n, c)) ? gp(e, t, n, s, i, l, a) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), hp(e, t, n, c))
    };

function Sp(e, t, r, n) {
    if (n) return !!(t === "innerHTML" || t === "textContent" || t in e && yl(t) && ae(r));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const o = e.tagName;
        if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE") return !1
    }
    return yl(t) && Ne(r) ? !1 : t in e
}
const Jt = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return ee(t) ? r => Kn(t, r) : t
};

function Ep(e) {
    e.target.composing = !0
}

function vl(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}
const nt = Symbol("_assign")
    , _l = {
        created(e, {
            modifiers: {
                lazy: t
                , trim: r
                , number: n
            }
        }, o) {
            e[nt] = Jt(o);
            const s = n || o.props && o.props.type === "number";
            kt(e, t ? "change" : "input", i => {
                if (i.target.composing) return;
                let l = e.value;
                r && (l = l.trim()), s && (l = dn(l)), e[nt](l)
            }), r && kt(e, "change", () => {
                e.value = e.value.trim()
            }), t || (kt(e, "compositionstart", Ep), kt(e, "compositionend", vl), kt(e, "change", vl))
        }
        , mounted(e, {
            value: t
        }) {
            e.value = t ?? ""
        }
        , beforeUpdate(e, {
            value: t
            , modifiers: {
                lazy: r
                , trim: n
                , number: o
            }
        }, s) {
            if (e[nt] = Jt(s), e.composing) return;
            const i = o || e.type === "number" ? dn(e.value) : e.value
                , l = t ?? "";
            i !== l && (document.activeElement === e && e.type !== "range" && (r || n && e.value.trim() === l) || (e.value = l))
        }
    }
    , qc = {
        deep: !0
        , created(e, t, r) {
            e[nt] = Jt(r), kt(e, "change", () => {
                const n = e._modelValue
                    , o = Fr(e)
                    , s = e.checked
                    , i = e[nt];
                if (ee(n)) {
                    const l = Ks(n, o)
                        , a = l !== -1;
                    if (s && !a) i(n.concat(o));
                    else if (!s && a) {
                        const c = [...n];
                        c.splice(l, 1), i(c)
                    }
                } else if (zr(n)) {
                    const l = new Set(n);
                    s ? l.add(o) : l.delete(o), i(l)
                } else i(Wc(e, s))
            })
        }
        , mounted: wl
        , beforeUpdate(e, t, r) {
            e[nt] = Jt(r), wl(e, t, r)
        }
    };

function wl(e, {
    value: t
    , oldValue: r
}, n) {
    e._modelValue = t, ee(t) ? e.checked = Ks(t, n.props.value) > -1 : zr(t) ? e.checked = t.has(n.props.value) : t !== r && (e.checked = hr(t, Wc(e, !0)))
}
const Cp = {
    created(e, {
        value: t
    }, r) {
        e.checked = hr(t, r.props.value), e[nt] = Jt(r), kt(e, "change", () => {
            e[nt](Fr(e))
        })
    }
    , beforeUpdate(e, {
        value: t
        , oldValue: r
    }, n) {
        e[nt] = Jt(n), t !== r && (e.checked = hr(t, n.props.value))
    }
}
    , Tp = {
        deep: !0
        , created(e, {
            value: t
            , modifiers: {
                number: r
            }
        }, n) {
            const o = zr(t);
            kt(e, "change", () => {
                const s = Array.prototype.filter.call(e.options, i => i.selected)
                    .map(i => r ? dn(Fr(i)) : Fr(i));
                e[nt](e.multiple ? o ? new Set(s) : s : s[0]), e._assigning = !0, Tn(() => {
                    e._assigning = !1
                })
            }), e[nt] = Jt(n)
        }
        , mounted(e, {
            value: t
            , modifiers: {
                number: r
            }
        }) {
            xl(e, t, r)
        }
        , beforeUpdate(e, t, r) {
            e[nt] = Jt(r)
        }
        , updated(e, {
            value: t
            , modifiers: {
                number: r
            }
        }) {
            e._assigning || xl(e, t, r)
        }
    };

function xl(e, t, r) {
    const n = e.multiple
        , o = ee(t);
    if (!(n && !o && !zr(t))) {
        for (let s = 0, i = e.options.length; s < i; s++) {
            const l = e.options[s]
                , a = Fr(l);
            if (n)
                if (o) {
                    const c = typeof a;
                    c === "string" || c === "number" ? l.selected = t.includes(r ? dn(a) : a) : l.selected = Ks(t, a) > -1
                } else l.selected = t.has(a);
            else if (hr(Fr(l), t)) {
                e.selectedIndex !== s && (e.selectedIndex = s);
                return
            }
        } !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}

function Fr(e) {
    return "_value" in e ? e._value : e.value
}

function Wc(e, t) {
    const r = t ? "_trueValue" : "_falseValue";
    return r in e ? e[r] : t
}
const Rp = {
    created(e, t, r) {
        Dn(e, t, r, null, "created")
    }
    , mounted(e, t, r) {
        Dn(e, t, r, null, "mounted")
    }
    , beforeUpdate(e, t, r, n) {
        Dn(e, t, r, n, "beforeUpdate")
    }
    , updated(e, t, r, n) {
        Dn(e, t, r, n, "updated")
    }
};

function $p(e, t) {
    switch (e) {
        case "SELECT":
            return Tp;
        case "TEXTAREA":
            return _l;
        default:
            switch (t) {
                case "checkbox":
                    return qc;
                case "radio":
                    return Cp;
                default:
                    return _l
            }
    }
}

function Dn(e, t, r, n, o) {
    const i = $p(e.tagName, r.props && r.props.type)[o];
    i && i(e, t, r, n)
}
const Ap = {
    esc: "escape"
    , space: " "
    , up: "arrow-up"
    , left: "arrow-left"
    , right: "arrow-right"
    , down: "arrow-down"
    , delete: "backspace"
}
    , Op = (e, t) => {
        const r = e._withKeys || (e._withKeys = {})
            , n = t.join(".");
        return r[n] || (r[n] = o => {
            if (!("key" in o)) return;
            const s = br(o.key);
            if (t.some(i => i === s || Ap[i] === s)) return e(o)
        })
    }
    , Pp = Le({
        patchProp: kp
    }, np);
let kl;

function Np() {
    return kl || (kl = zf(Pp))
}
const Fp = (...e) => {
    const t = Np()
        .createApp(...e)
        , {
            mount: r
        } = t;
    return t.mount = n => {
        const o = Lp(n);
        if (!o) return;
        const s = t._component;
        !ae(s) && !s.render && !s.template && (s.template = o.innerHTML), o.innerHTML = "";
        const i = r(o, !1, Ip(o));
        return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i
    }, t
};

function Ip(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function Lp(e) {
    return Ne(e) ? document.querySelector(e) : e
}
var Mp = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const jp = Symbol();
var Sl;
(function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function"
})(Sl || (Sl = {}));

function zp() {
    const e = yd(!0)
        , t = e.run(() => q({}));
    let r = []
        , n = [];
    const o = ei({
        install(s) {
            o._a = s, s.provide(jp, o), s.config.globalProperties.$pinia = o, n.forEach(i => r.push(i)), n = []
        }
        , use(s) {
            return !this._a && !Mp ? n.push(s) : r.push(s), this
        }
        , _p: r
        , _a: null
        , _e: e
        , _s: new Map
        , state: t
    });
    return o
}
/*!
 * vue-router v4.3.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
const Er = typeof document < "u";

function Hp(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const _e = Object.assign;

function rs(e, t) {
    const r = {};
    for (const n in t) {
        const o = t[n];
        r[n] = dt(o) ? o.map(e) : e(o)
    }
    return r
}
const on = () => { }
    , dt = Array.isArray
    , Kc = /#/g
    , Bp = /&/g
    , Dp = /\//g
    , Up = /=/g
    , Vp = /\?/g
    , Gc = /\+/g
    , qp = /%5B/g
    , Wp = /%5D/g
    , Jc = /%5E/g
    , Kp = /%60/g
    , Qc = /%7B/g
    , Gp = /%7C/g
    , Xc = /%7D/g
    , Jp = /%20/g;

function fi(e) {
    return encodeURI("" + e)
        .replace(Gp, "|")
        .replace(qp, "[")
        .replace(Wp, "]")
}

function Qp(e) {
    return fi(e)
        .replace(Qc, "{")
        .replace(Xc, "}")
        .replace(Jc, "^")
}

function Cs(e) {
    return fi(e)
        .replace(Gc, "%2B")
        .replace(Jp, "+")
        .replace(Kc, "%23")
        .replace(Bp, "%26")
        .replace(Kp, "`")
        .replace(Qc, "{")
        .replace(Xc, "}")
        .replace(Jc, "^")
}

function Xp(e) {
    return Cs(e)
        .replace(Up, "%3D")
}

function Yp(e) {
    return fi(e)
        .replace(Kc, "%23")
        .replace(Vp, "%3F")
}

function Zp(e) {
    return e == null ? "" : Yp(e)
        .replace(Dp, "%2F")
}

function yn(e) {
    try {
        return decodeURIComponent("" + e)
    } catch { }
    return "" + e
}
const eh = /\/$/
    , th = e => e.replace(eh, "");

function ns(e, t, r = "/") {
    let n, o = {}
        , s = ""
        , i = "";
    const l = t.indexOf("#");
    let a = t.indexOf("?");
    return l < a && l >= 0 && (a = -1), a > -1 && (n = t.slice(0, a), s = t.slice(a + 1, l > -1 ? l : t.length), o = e(s)), l > -1 && (n = n || t.slice(0, l), i = t.slice(l, t.length)), n = sh(n ?? t, r), {
        fullPath: n + (s && "?") + s + i
        , path: n
        , query: o
        , hash: yn(i)
    }
}

function rh(e, t) {
    const r = t.query ? e(t.query) : "";
    return t.path + (r && "?") + r + (t.hash || "")
}

function El(e, t) {
    return !t || !e.toLowerCase()
        .startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function nh(e, t, r) {
    const n = t.matched.length - 1
        , o = r.matched.length - 1;
    return n > -1 && n === o && Ir(t.matched[n], r.matched[o]) && Yc(t.params, r.params) && e(t.query) === e(r.query) && t.hash === r.hash
}

function Ir(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function Yc(e, t) {
    if (Object.keys(e)
        .length !== Object.keys(t)
            .length) return !1;
    for (const r in e)
        if (!oh(e[r], t[r])) return !1;
    return !0
}

function oh(e, t) {
    return dt(e) ? Cl(e, t) : dt(t) ? Cl(t, e) : e === t
}

function Cl(e, t) {
    return dt(t) ? e.length === t.length && e.every((r, n) => r === t[n]) : e.length === 1 && e[0] === t
}

function sh(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const r = t.split("/")
        , n = e.split("/")
        , o = n[n.length - 1];
    (o === ".." || o === ".") && n.push("");
    let s = r.length - 1
        , i, l;
    for (i = 0; i < n.length; i++)
        if (l = n[i], l !== ".")
            if (l === "..") s > 1 && s--;
            else break;
    return r.slice(0, s)
        .join("/") + "/" + n.slice(i)
            .join("/")
}
var vn;
(function(e) {
    e.pop = "pop", e.push = "push"
})(vn || (vn = {}));
var sn;
(function(e) {
    e.back = "back", e.forward = "forward", e.unknown = ""
})(sn || (sn = {}));

function ih(e) {
    if (!e)
        if (Er) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), th(e)
}
const lh = /^[^#]+#/;

function ah(e, t) {
    return e.replace(lh, "#") + t
}

function ch(e, t) {
    const r = document.documentElement.getBoundingClientRect()
        , n = e.getBoundingClientRect();
    return {
        behavior: t.behavior
        , left: n.left - r.left - (t.left || 0)
        , top: n.top - r.top - (t.top || 0)
    }
}
const No = () => ({
    left: window.scrollX
    , top: window.scrollY
});

function uh(e) {
    let t;
    if ("el" in e) {
        const r = e.el
            , n = typeof r == "string" && r.startsWith("#")
            , o = typeof r == "string" ? n ? document.getElementById(r.slice(1)) : document.querySelector(r) : r;
        if (!o) return;
        t = ch(o, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY)
}

function Tl(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const Ts = new Map;

function dh(e, t) {
    Ts.set(e, t)
}

function fh(e) {
    const t = Ts.get(e);
    return Ts.delete(e), t
}
let ph = () => location.protocol + "//" + location.host;

function Zc(e, t) {
    const {
        pathname: r
        , search: n
        , hash: o
    } = t, s = e.indexOf("#");
    if (s > -1) {
        let l = o.includes(e.slice(s)) ? e.slice(s)
            .length : 1
            , a = o.slice(l);
        return a[0] !== "/" && (a = "/" + a), El(a, "")
    }
    return El(r, e) + n + o
}

function hh(e, t, r, n) {
    let o = []
        , s = []
        , i = null;
    const l = ({
        state: f
    }) => {
        const g = Zc(e, location)
            , b = r.value
            , y = t.value;
        let x = 0;
        if (f) {
            if (r.value = g, t.value = f, i && i === b) {
                i = null;
                return
            }
            x = y ? f.position - y.position : 0
        } else n(g);
        o.forEach(w => {
            w(r.value, b, {
                delta: x
                , type: vn.pop
                , direction: x ? x > 0 ? sn.forward : sn.back : sn.unknown
            })
        })
    };

    function a() {
        i = r.value
    }

    function c(f) {
        o.push(f);
        const g = () => {
            const b = o.indexOf(f);
            b > -1 && o.splice(b, 1)
        };
        return s.push(g), g
    }

    function u() {
        const {
            history: f
        } = window;
        f.state && f.replaceState(_e({}, f.state, {
            scroll: No()
        }), "")
    }

    function d() {
        for (const f of s) f();
        s = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u)
    }
    return window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, {
        passive: !0
    }), {
        pauseListeners: a
        , listen: c
        , destroy: d
    }
}

function Rl(e, t, r, n = !1, o = !1) {
    return {
        back: e
        , current: t
        , forward: r
        , replaced: n
        , position: window.history.length
        , scroll: o ? No() : null
    }
}

function gh(e) {
    const {
        history: t
        , location: r
    } = window, n = {
        value: Zc(e, r)
    }, o = {
        value: t.state
    };
    o.value || s(n.value, {
        back: null
        , current: n.value
        , forward: null
        , position: t.length - 1
        , replaced: !0
        , scroll: null
    }, !0);

    function s(a, c, u) {
        const d = e.indexOf("#")
            , f = d > -1 ? (r.host && document.querySelector("base") ? e : e.slice(d)) + a : ph() + e + a;
        try {
            t[u ? "replaceState" : "pushState"](c, "", f), o.value = c
        } catch (g) {
            console.error(g), r[u ? "replace" : "assign"](f)
        }
    }

    function i(a, c) {
        const u = _e({}, t.state, Rl(o.value.back, a, o.value.forward, !0), c, {
            position: o.value.position
        });
        s(a, u, !0), n.value = a
    }

    function l(a, c) {
        const u = _e({}, o.value, t.state, {
            forward: a
            , scroll: No()
        });
        s(u.current, u, !0);
        const d = _e({}, Rl(n.value, a, null), {
            position: u.position + 1
        }, c);
        s(a, d, !1), n.value = a
    }
    return {
        location: n
        , state: o
        , push: l
        , replace: i
    }
}

function mh(e) {
    e = ih(e);
    const t = gh(e)
        , r = hh(e, t.state, t.location, t.replace);

    function n(s, i = !0) {
        i || r.pauseListeners(), history.go(s)
    }
    const o = _e({
        location: ""
        , base: e
        , go: n
        , createHref: ah.bind(null, e)
    }, t, r);
    return Object.defineProperty(o, "location", {
        enumerable: !0
        , get: () => t.location.value
    }), Object.defineProperty(o, "state", {
        enumerable: !0
        , get: () => t.state.value
    }), o
}

function bh(e) {
    return typeof e == "string" || e && typeof e == "object"
}

function eu(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const Pt = {
    path: "/"
    , name: void 0
    , params: {}
    , query: {}
    , hash: ""
    , fullPath: "/"
    , matched: []
    , meta: {}
    , redirectedFrom: void 0
}
    , tu = Symbol("");
var $l;
(function(e) {
    e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})($l || ($l = {}));

function Lr(e, t) {
    return _e(new Error, {
        type: e
        , [tu]: !0
    }, t)
}

function xt(e, t) {
    return e instanceof Error && tu in e && (t == null || !!(e.type & t))
}
const Al = "[^/]+?"
    , yh = {
        sensitive: !1
        , strict: !1
        , start: !0
        , end: !0
    }
    , vh = /[.+*?^${}()[\]/\\]/g;

function _h(e, t) {
    const r = _e({}, yh, t)
        , n = [];
    let o = r.start ? "^" : "";
    const s = [];
    for (const c of e) {
        const u = c.length ? [] : [90];
        r.strict && !c.length && (o += "/");
        for (let d = 0; d < c.length; d++) {
            const f = c[d];
            let g = 40 + (r.sensitive ? .25 : 0);
            if (f.type === 0) d || (o += "/"), o += f.value.replace(vh, "\\$&"), g += 40;
            else if (f.type === 1) {
                const {
                    value: b
                    , repeatable: y
                    , optional: x
                    , regexp: w
                } = f;
                s.push({
                    name: b
                    , repeatable: y
                    , optional: x
                });
                const k = w || Al;
                if (k !== Al) {
                    g += 10;
                    try {
                        new RegExp(`(${k})`)
                    } catch (j) {
                        throw new Error(`Invalid custom RegExp for param "${b}" (${k}): ` + j.message)
                    }
                }
                let T = y ? `((?:${k})(?:/(?:${k}))*)` : `(${k})`;
                d || (T = x && c.length < 2 ? `(?:/${T})` : "/" + T), x && (T += "?"), o += T, g += 20, x && (g += -8), y && (g += -20), k === ".*" && (g += -50)
            }
            u.push(g)
        }
        n.push(u)
    }
    if (r.strict && r.end) {
        const c = n.length - 1;
        n[c][n[c].length - 1] += .7000000000000001
    }
    r.strict || (o += "/?"), r.end ? o += "$" : r.strict && (o += "(?:/|$)");
    const i = new RegExp(o, r.sensitive ? "" : "i");

    function l(c) {
        const u = c.match(i)
            , d = {};
        if (!u) return null;
        for (let f = 1; f < u.length; f++) {
            const g = u[f] || ""
                , b = s[f - 1];
            d[b.name] = g && b.repeatable ? g.split("/") : g
        }
        return d
    }

    function a(c) {
        let u = ""
            , d = !1;
        for (const f of e) {
            (!d || !u.endsWith("/")) && (u += "/"), d = !1;
            for (const g of f)
                if (g.type === 0) u += g.value;
                else if (g.type === 1) {
                    const {
                        value: b
                        , repeatable: y
                        , optional: x
                    } = g, w = b in c ? c[b] : "";
                    if (dt(w) && !y) throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);
                    const k = dt(w) ? w.join("/") : w;
                    if (!k)
                        if (x) f.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : d = !0);
                        else throw new Error(`Missing required param "${b}"`);
                    u += k
                }
        }
        return u || "/"
    }
    return {
        re: i
        , score: n
        , keys: s
        , parse: l
        , stringify: a
    }
}

function wh(e, t) {
    let r = 0;
    for (; r < e.length && r < t.length;) {
        const n = t[r] - e[r];
        if (n) return n;
        r++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0
}

function xh(e, t) {
    let r = 0;
    const n = e.score
        , o = t.score;
    for (; r < n.length && r < o.length;) {
        const s = wh(n[r], o[r]);
        if (s) return s;
        r++
    }
    if (Math.abs(o.length - n.length) === 1) {
        if (Ol(n)) return 1;
        if (Ol(o)) return -1
    }
    return o.length - n.length
}

function Ol(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const kh = {
    type: 0
    , value: ""
}
    , Sh = /[a-zA-Z0-9_]/;

function Eh(e) {
    if (!e) return [
        []
    ];
    if (e === "/") return [
        [kh]
    ];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

    function t(g) {
        throw new Error(`ERR (${r})/"${c}": ${g}`)
    }
    let r = 0
        , n = r;
    const o = [];
    let s;

    function i() {
        s && o.push(s), s = []
    }
    let l = 0
        , a, c = ""
        , u = "";

    function d() {
        c && (r === 0 ? s.push({
            type: 0
            , value: c
        }) : r === 1 || r === 2 || r === 3 ? (s.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), s.push({
            type: 1
            , value: c
            , regexp: u
            , repeatable: a === "*" || a === "+"
            , optional: a === "*" || a === "?"
        })) : t("Invalid state to consume buffer"), c = "")
    }

    function f() {
        c += a
    }
    for (; l < e.length;) {
        if (a = e[l++], a === "\\" && r !== 2) {
            n = r, r = 4;
            continue
        }
        switch (r) {
            case 0:
                a === "/" ? (c && d(), i()) : a === ":" ? (d(), r = 1) : f();
                break;
            case 4:
                f(), r = n;
                break;
            case 1:
                a === "(" ? r = 2 : Sh.test(a) ? f() : (d(), r = 0, a !== "*" && a !== "?" && a !== "+" && l--);
                break;
            case 2:
                a === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + a : r = 3 : u += a;
                break;
            case 3:
                d(), r = 0, a !== "*" && a !== "?" && a !== "+" && l--, u = "";
                break;
            default:
                t("Unknown state");
                break
        }
    }
    return r === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), i(), o
}

function Ch(e, t, r) {
    const n = _h(Eh(e.path), r)
        , o = _e(n, {
            record: e
            , parent: t
            , children: []
            , alias: []
        });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o
}

function Th(e, t) {
    const r = []
        , n = new Map;
    t = Fl({
        strict: !1
        , end: !0
        , sensitive: !1
    }, t);

    function o(u) {
        return n.get(u)
    }

    function s(u, d, f) {
        const g = !f
            , b = Rh(u);
        b.aliasOf = f && f.record;
        const y = Fl(t, u)
            , x = [b];
        if ("alias" in u) {
            const T = typeof u.alias == "string" ? [u.alias] : u.alias;
            for (const j of T) x.push(_e({}, b, {
                components: f ? f.record.components : b.components
                , path: j
                , aliasOf: f ? f.record : b
            }))
        }
        let w, k;
        for (const T of x) {
            const {
                path: j
            } = T;
            if (d && j[0] !== "/") {
                const D = d.record.path
                    , $ = D[D.length - 1] === "/" ? "" : "/";
                T.path = d.record.path + (j && $ + j)
            }
            if (w = Ch(T, d, y), f ? f.alias.push(w) : (k = k || w, k !== w && k.alias.push(w), g && u.name && !Nl(w) && i(u.name)), b.children) {
                const D = b.children;
                for (let $ = 0; $ < D.length; $++) s(D[$], w, f && f.children[$])
            }
            f = f || w, (w.record.components && Object.keys(w.record.components)
                .length || w.record.name || w.record.redirect) && a(w)
        }
        return k ? () => {
            i(k)
        } : on
    }

    function i(u) {
        if (eu(u)) {
            const d = n.get(u);
            d && (n.delete(u), r.splice(r.indexOf(d), 1), d.children.forEach(i), d.alias.forEach(i))
        } else {
            const d = r.indexOf(u);
            d > -1 && (r.splice(d, 1), u.record.name && n.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i))
        }
    }

    function l() {
        return r
    }

    function a(u) {
        let d = 0;
        for (; d < r.length && xh(u, r[d]) >= 0 && (u.record.path !== r[d].record.path || !ru(u, r[d]));) d++;
        r.splice(d, 0, u), u.record.name && !Nl(u) && n.set(u.record.name, u)
    }

    function c(u, d) {
        let f, g = {}
            , b, y;
        if ("name" in u && u.name) {
            if (f = n.get(u.name), !f) throw Lr(1, {
                location: u
            });
            y = f.record.name, g = _e(Pl(d.params, f.keys.filter(k => !k.optional)
                .concat(f.parent ? f.parent.keys.filter(k => k.optional) : [])
                .map(k => k.name)), u.params && Pl(u.params, f.keys.map(k => k.name))), b = f.stringify(g)
        } else if (u.path != null) b = u.path, f = r.find(k => k.re.test(b)), f && (g = f.parse(b), y = f.record.name);
        else {
            if (f = d.name ? n.get(d.name) : r.find(k => k.re.test(d.path)), !f) throw Lr(1, {
                location: u
                , currentLocation: d
            });
            y = f.record.name, g = _e({}, d.params, u.params), b = f.stringify(g)
        }
        const x = [];
        let w = f;
        for (; w;) x.unshift(w.record), w = w.parent;
        return {
            name: y
            , path: b
            , params: g
            , matched: x
            , meta: Ah(x)
        }
    }
    return e.forEach(u => s(u)), {
        addRoute: s
        , resolve: c
        , removeRoute: i
        , getRoutes: l
        , getRecordMatcher: o
    }
}

function Pl(e, t) {
    const r = {};
    for (const n of t) n in e && (r[n] = e[n]);
    return r
}

function Rh(e) {
    return {
        path: e.path
        , redirect: e.redirect
        , name: e.name
        , meta: e.meta || {}
        , aliasOf: void 0
        , beforeEnter: e.beforeEnter
        , props: $h(e)
        , children: e.children || []
        , instances: {}
        , leaveGuards: new Set
        , updateGuards: new Set
        , enterCallbacks: {}
        , components: "components" in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}

function $h(e) {
    const t = {}
        , r = e.props || !1;
    if ("component" in e) t.default = r;
    else
        for (const n in e.components) t[n] = typeof r == "object" ? r[n] : r;
    return t
}

function Nl(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function Ah(e) {
    return e.reduce((t, r) => _e(t, r.meta), {})
}

function Fl(e, t) {
    const r = {};
    for (const n in e) r[n] = n in t ? t[n] : e[n];
    return r
}

function ru(e, t) {
    return t.children.some(r => r === e || ru(e, r))
}

function Oh(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const n = (e[0] === "?" ? e.slice(1) : e)
        .split("&");
    for (let o = 0; o < n.length; ++o) {
        const s = n[o].replace(Gc, " ")
            , i = s.indexOf("=")
            , l = yn(i < 0 ? s : s.slice(0, i))
            , a = i < 0 ? null : yn(s.slice(i + 1));
        if (l in t) {
            let c = t[l];
            dt(c) || (c = t[l] = [c]), c.push(a)
        } else t[l] = a
    }
    return t
}

function Il(e) {
    let t = "";
    for (let r in e) {
        const n = e[r];
        if (r = Xp(r), n == null) {
            n !== void 0 && (t += (t.length ? "&" : "") + r);
            continue
        } (dt(n) ? n.map(s => s && Cs(s)) : [n && Cs(n)])
            .forEach(s => {
                s !== void 0 && (t += (t.length ? "&" : "") + r, s != null && (t += "=" + s))
            })
    }
    return t
}

function Ph(e) {
    const t = {};
    for (const r in e) {
        const n = e[r];
        n !== void 0 && (t[r] = dt(n) ? n.map(o => o == null ? null : "" + o) : n == null ? n : "" + n)
    }
    return t
}
const Nh = Symbol("")
    , Ll = Symbol("")
    , pi = Symbol("")
    , nu = Symbol("")
    , Rs = Symbol("");

function Wr() {
    let e = [];

    function t(n) {
        return e.push(n), () => {
            const o = e.indexOf(n);
            o > -1 && e.splice(o, 1)
        }
    }

    function r() {
        e = []
    }
    return {
        add: t
        , list: () => e.slice()
        , reset: r
    }
}

function Bt(e, t, r, n, o, s = i => i()) {
    const i = n && (n.enterCallbacks[o] = n.enterCallbacks[o] || []);
    return () => new Promise((l, a) => {
        const c = f => {
            f === !1 ? a(Lr(4, {
                from: r
                , to: t
            })) : f instanceof Error ? a(f) : bh(f) ? a(Lr(2, {
                from: t
                , to: f
            })) : (i && n.enterCallbacks[o] === i && typeof f == "function" && i.push(f), l())
        }
            , u = s(() => e.call(n && n.instances[o], t, r, c));
        let d = Promise.resolve(u);
        e.length < 3 && (d = d.then(c)), d.catch(f => a(f))
    })
}

function os(e, t, r, n, o = s => s()) {
    const s = [];
    for (const i of e)
        for (const l in i.components) {
            let a = i.components[l];
            if (!(t !== "beforeRouteEnter" && !i.instances[l]))
                if (Fh(a)) {
                    const u = (a.__vccOpts || a)[t];
                    u && s.push(Bt(u, r, n, i, l, o))
                } else {
                    let c = a();
                    s.push(() => c.then(u => {
                        if (!u) return Promise.reject(new Error(`Couldn't resolve component "${l}" at "${i.path}"`));
                        const d = Hp(u) ? u.default : u;
                        i.components[l] = d;
                        const g = (d.__vccOpts || d)[t];
                        return g && Bt(g, r, n, i, l, o)()
                    }))
                }
        }
    return s
}

function Fh(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function Ml(e) {
    const t = Et(pi)
        , r = Et(nu)
        , n = ne(() => t.resolve(v(e.to)))
        , o = ne(() => {
            const {
                matched: a
            } = n.value, {
                length: c
            } = a, u = a[c - 1], d = r.matched;
            if (!u || !d.length) return -1;
            const f = d.findIndex(Ir.bind(null, u));
            if (f > -1) return f;
            const g = jl(a[c - 2]);
            return c > 1 && jl(u) === g && d[d.length - 1].path !== g ? d.findIndex(Ir.bind(null, a[c - 2])) : f
        })
        , s = ne(() => o.value > -1 && jh(r.params, n.value.params))
        , i = ne(() => o.value > -1 && o.value === r.matched.length - 1 && Yc(r.params, n.value.params));

    function l(a = {}) {
        return Mh(a) ? t[v(e.replace) ? "replace" : "push"](v(e.to))
            .catch(on) : Promise.resolve()
    }
    return {
        route: n
        , href: ne(() => n.value.href)
        , isActive: s
        , isExactActive: i
        , navigate: l
    }
}
const Ih = De({
    name: "RouterLink"
    , compatConfig: {
        MODE: 3
    }
    , props: {
        to: {
            type: [String, Object]
            , required: !0
        }
        , replace: Boolean
        , activeClass: String
        , exactActiveClass: String
        , custom: Boolean
        , ariaCurrentValue: {
            type: String
            , default: "page"
        }
    }
    , useLink: Ml
    , setup(e, {
        slots: t
    }) {
        const r = Cn(Ml(e))
            , {
                options: n
            } = Et(pi)
            , o = ne(() => ({
                [zl(e.activeClass, n.linkActiveClass, "router-link-active")]: r.isActive
                , [zl(e.exactActiveClass, n.linkExactActiveClass, "router-link-exact-active")]: r.isExactActive
            }));
        return () => {
            const s = t.default && t.default(r);
            return e.custom ? s : di("a", {
                "aria-current": r.isExactActive ? e.ariaCurrentValue : null
                , href: r.href
                , onClick: r.navigate
                , class: o.value
            }, s)
        }
    }
})
    , Lh = Ih;

function Mh(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return
        }
        return e.preventDefault && e.preventDefault(), !0
    }
}

function jh(e, t) {
    for (const r in t) {
        const n = t[r]
            , o = e[r];
        if (typeof n == "string") {
            if (n !== o) return !1
        } else if (!dt(o) || o.length !== n.length || n.some((s, i) => s !== o[i])) return !1
    }
    return !0
}

function jl(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const zl = (e, t, r) => e ?? t ?? r
    , zh = De({
        name: "RouterView"
        , inheritAttrs: !1
        , props: {
            name: {
                type: String
                , default: "default"
            }
            , route: Object
        }
        , compatConfig: {
            MODE: 3
        }
        , setup(e, {
            attrs: t
            , slots: r
        }) {
            const n = Et(Rs)
                , o = ne(() => e.route || n.value)
                , s = Et(Ll, 0)
                , i = ne(() => {
                    let c = v(s);
                    const {
                        matched: u
                    } = o.value;
                    let d;
                    for (;
                        (d = u[c]) && !d.components;) c++;
                    return c
                })
                , l = ne(() => o.value.matched[i.value]);
            Jn(Ll, ne(() => i.value + 1)), Jn(Nh, l), Jn(Rs, o);
            const a = q();
            return Or(() => [a.value, l.value, e.name], ([c, u, d], [f, g, b]) => {
                u && (u.instances[d] = c, g && g !== u && c && c === f && (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards), u.updateGuards.size || (u.updateGuards = g.updateGuards))), c && u && (!g || !Ir(u, g) || !f) && (u.enterCallbacks[d] || [])
                    .forEach(y => y(c))
            }, {
                flush: "post"
            }), () => {
                const c = o.value
                    , u = e.name
                    , d = l.value
                    , f = d && d.components[u];
                if (!f) return Hl(r.default, {
                    Component: f
                    , route: c
                });
                const g = d.props[u]
                    , b = g ? g === !0 ? c.params : typeof g == "function" ? g(c) : g : null
                    , x = di(f, _e({}, b, t, {
                        onVnodeUnmounted: w => {
                            w.component.isUnmounted && (d.instances[u] = null)
                        }
                        , ref: a
                    }));
                return Hl(r.default, {
                    Component: x
                    , route: c
                }) || x
            }
        }
    });

function Hl(e, t) {
    if (!e) return null;
    const r = e(t);
    return r.length === 1 ? r[0] : r
}
const ou = zh;

function Hh(e) {
    const t = Th(e.routes, e)
        , r = e.parseQuery || Oh
        , n = e.stringifyQuery || Il
        , o = e.history
        , s = Wr()
        , i = Wr()
        , l = Wr()
        , a = Dd(Pt);
    let c = Pt;
    Er && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = rs.bind(null, C => "" + C)
        , d = rs.bind(null, Zp)
        , f = rs.bind(null, yn);

    function g(C, H) {
        let I, K;
        return eu(C) ? (I = t.getRecordMatcher(C), K = H) : K = C, t.addRoute(K, I)
    }

    function b(C) {
        const H = t.getRecordMatcher(C);
        H && t.removeRoute(H)
    }

    function y() {
        return t.getRoutes()
            .map(C => C.record)
    }

    function x(C) {
        return !!t.getRecordMatcher(C)
    }

    function w(C, H) {
        if (H = _e({}, H || a.value), typeof C == "string") {
            const h = ns(r, C, H.path)
                , _ = t.resolve({
                    path: h.path
                }, H)
                , R = o.createHref(h.fullPath);
            return _e(h, _, {
                params: f(_.params)
                , hash: yn(h.hash)
                , redirectedFrom: void 0
                , href: R
            })
        }
        let I;
        if (C.path != null) I = _e({}, C, {
            path: ns(r, C.path, H.path)
                .path
        });
        else {
            const h = _e({}, C.params);
            for (const _ in h) h[_] == null && delete h[_];
            I = _e({}, C, {
                params: d(h)
            }), H.params = d(H.params)
        }
        const K = t.resolve(I, H)
            , ye = C.hash || "";
        K.params = u(f(K.params));
        const $e = rh(n, _e({}, C, {
            hash: Qp(ye)
            , path: K.path
        }))
            , p = o.createHref($e);
        return _e({
            fullPath: $e
            , hash: ye
            , query: n === Il ? Ph(C.query) : C.query || {}
        }, K, {
            redirectedFrom: void 0
            , href: p
        })
    }

    function k(C) {
        return typeof C == "string" ? ns(r, C, a.value.path) : _e({}, C)
    }

    function T(C, H) {
        if (c !== C) return Lr(8, {
            from: H
            , to: C
        })
    }

    function j(C) {
        return Q(C)
    }

    function D(C) {
        return j(_e(k(C), {
            replace: !0
        }))
    }

    function $(C) {
        const H = C.matched[C.matched.length - 1];
        if (H && H.redirect) {
            const {
                redirect: I
            } = H;
            let K = typeof I == "function" ? I(C) : I;
            return typeof K == "string" && (K = K.includes("?") || K.includes("#") ? K = k(K) : {
                path: K
            }, K.params = {}), _e({
                query: C.query
                , hash: C.hash
                , params: K.path != null ? {} : C.params
            }, K)
        }
    }

    function Q(C, H) {
        const I = c = w(C)
            , K = a.value
            , ye = C.state
            , $e = C.force
            , p = C.replace === !0
            , h = $(I);
        if (h) return Q(_e(k(h), {
            state: typeof h == "object" ? _e({}, ye, h.state) : ye
            , force: $e
            , replace: p
        }), H || I);
        const _ = I;
        _.redirectedFrom = H;
        let R;
        return !$e && nh(n, K, I) && (R = Lr(16, {
            to: _
            , from: K
        }), Re(K, K, !0, !1)), (R ? Promise.resolve(R) : W(_, K))
            .catch(S => xt(S) ? xt(S, 2) ? S : X(S) : ce(S, _, K))
            .then(S => {
                if (S) {
                    if (xt(S, 2)) return Q(_e({
                        replace: p
                    }, k(S.to), {
                        state: typeof S.to == "object" ? _e({}, ye, S.to.state) : ye
                        , force: $e
                    }), H || _)
                } else S = A(_, K, !0, p, ye);
                return te(_, K, S), S
            })
    }

    function V(C, H) {
        const I = T(C, H);
        return I ? Promise.reject(I) : Promise.resolve()
    }

    function oe(C) {
        const H = kr.values()
            .next()
            .value;
        return H && typeof H.runWithContext == "function" ? H.runWithContext(C) : C()
    }

    function W(C, H) {
        let I;
        const [K, ye, $e] = Bh(C, H);
        I = os(K.reverse(), "beforeRouteLeave", C, H);
        for (const h of K) h.leaveGuards.forEach(_ => {
            I.push(Bt(_, C, H))
        });
        const p = V.bind(null, C, H);
        return I.push(p), He(I)
            .then(() => {
                I = [];
                for (const h of s.list()) I.push(Bt(h, C, H));
                return I.push(p), He(I)
            })
            .then(() => {
                I = os(ye, "beforeRouteUpdate", C, H);
                for (const h of ye) h.updateGuards.forEach(_ => {
                    I.push(Bt(_, C, H))
                });
                return I.push(p), He(I)
            })
            .then(() => {
                I = [];
                for (const h of $e)
                    if (h.beforeEnter)
                        if (dt(h.beforeEnter))
                            for (const _ of h.beforeEnter) I.push(Bt(_, C, H));
                        else I.push(Bt(h.beforeEnter, C, H));
                return I.push(p), He(I)
            })
            .then(() => (C.matched.forEach(h => h.enterCallbacks = {}), I = os($e, "beforeRouteEnter", C, H, oe), I.push(p), He(I)))
            .then(() => {
                I = [];
                for (const h of i.list()) I.push(Bt(h, C, H));
                return I.push(p), He(I)
            })
            .catch(h => xt(h, 8) ? h : Promise.reject(h))
    }

    function te(C, H, I) {
        l.list()
            .forEach(K => oe(() => K(C, H, I)))
    }

    function A(C, H, I, K, ye) {
        const $e = T(C, H);
        if ($e) return $e;
        const p = H === Pt
            , h = Er ? history.state : {};
        I && (K || p ? o.replace(C.fullPath, _e({
            scroll: p && h && h.scroll
        }, ye)) : o.push(C.fullPath, ye)), a.value = C, Re(C, H, I, p), X()
    }
    let U;

    function de() {
        U || (U = o.listen((C, H, I) => {
            if (!Fn.listening) return;
            const K = w(C)
                , ye = $(K);
            if (ye) {
                Q(_e(ye, {
                    replace: !0
                }), K)
                    .catch(on);
                return
            }
            c = K;
            const $e = a.value;
            Er && dh(Tl($e.fullPath, I.delta), No()), W(K, $e)
                .catch(p => xt(p, 12) ? p : xt(p, 2) ? (Q(p.to, K)
                    .then(h => {
                        xt(h, 20) && !I.delta && I.type === vn.pop && o.go(-1, !1)
                    })
                    .catch(on), Promise.reject()) : (I.delta && o.go(-I.delta, !1), ce(p, K, $e)))
                .then(p => {
                    p = p || A(K, $e, !1), p && (I.delta && !xt(p, 8) ? o.go(-I.delta, !1) : I.type === vn.pop && xt(p, 20) && o.go(-1, !1)), te(K, $e, p)
                })
                .catch(on)
        }))
    }
    let we = Wr()
        , ie = Wr()
        , z;

    function ce(C, H, I) {
        X(C);
        const K = ie.list();
        return K.length ? K.forEach(ye => ye(C, H, I)) : console.error(C), Promise.reject(C)
    }

    function Te() {
        return z && a.value !== Pt ? Promise.resolve() : new Promise((C, H) => {
            we.add([C, H])
        })
    }

    function X(C) {
        return z || (z = !C, de(), we.list()
            .forEach(([H, I]) => C ? I(C) : H()), we.reset()), C
    }

    function Re(C, H, I, K) {
        const {
            scrollBehavior: ye
        } = e;
        if (!Er || !ye) return Promise.resolve();
        const $e = !I && fh(Tl(C.fullPath, 0)) || (K || !I) && history.state && history.state.scroll || null;
        return Tn()
            .then(() => ye(C, H, $e))
            .then(p => p && uh(p))
            .catch(p => ce(p, C, H))
    }
    const Pe = C => o.go(C);
    let Rt;
    const kr = new Set
        , Fn = {
            currentRoute: a
            , listening: !0
            , addRoute: g
            , removeRoute: b
            , hasRoute: x
            , getRoutes: y
            , resolve: w
            , options: e
            , push: j
            , replace: D
            , go: Pe
            , back: () => Pe(-1)
            , forward: () => Pe(1)
            , beforeEach: s.add
            , beforeResolve: i.add
            , afterEach: l.add
            , onError: ie.add
            , isReady: Te
            , install(C) {
                const H = this;
                C.component("RouterLink", Lh), C.component("RouterView", ou), C.config.globalProperties.$router = H, Object.defineProperty(C.config.globalProperties, "$route", {
                    enumerable: !0
                    , get: () => v(a)
                }), Er && !Rt && a.value === Pt && (Rt = !0, j(o.location)
                    .catch(ye => { }));
                const I = {};
                for (const ye in Pt) Object.defineProperty(I, ye, {
                    get: () => a.value[ye]
                    , enumerable: !0
                });
                C.provide(pi, H), C.provide(nu, oc(I)), C.provide(Rs, a);
                const K = C.unmount;
                kr.add(C), C.unmount = function() {
                    kr.delete(C), kr.size < 1 && (c = Pt, U && U(), U = null, a.value = Pt, Rt = !1, z = !1), K()
                }
            }
        };

    function He(C) {
        return C.reduce((H, I) => H.then(() => oe(I)), Promise.resolve())
    }
    return Fn
}

function Bh(e, t) {
    const r = []
        , n = []
        , o = []
        , s = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < s; i++) {
        const l = t.matched[i];
        l && (e.matched.find(c => Ir(c, l)) ? n.push(l) : r.push(l));
        const a = e.matched[i];
        a && (t.matched.find(c => Ir(c, a)) || o.push(a))
    }
    return [r, n, o]
}
Cn({});

function Dh() {
    for (var e = 0, t, r, n = ""; e < arguments.length;)(t = arguments[e++]) && (r = su(t)) && (n && (n += " "), n += r);
    return n
}

function su(e) {
    if (typeof e == "string") return e;
    for (var t, r = "", n = 0; n < e.length; n++) e[n] && (t = su(e[n])) && (r && (r += " "), r += t);
    return r
}
var hi = "-";

function Uh(e) {
    var t = qh(e)
        , r = e.conflictingClassGroups
        , n = e.conflictingClassGroupModifiers
        , o = n === void 0 ? {} : n;

    function s(l) {
        var a = l.split(hi);
        return a[0] === "" && a.length !== 1 && a.shift(), iu(a, t) || Vh(l)
    }

    function i(l, a) {
        var c = r[l] || [];
        return a && o[l] ? [].concat(c, o[l]) : c
    }
    return {
        getClassGroupId: s
        , getConflictingClassGroupIds: i
    }
}

function iu(e, t) {
    var i;
    if (e.length === 0) return t.classGroupId;
    var r = e[0]
        , n = t.nextPart.get(r)
        , o = n ? iu(e.slice(1), n) : void 0;
    if (o) return o;
    if (t.validators.length !== 0) {
        var s = e.join(hi);
        return (i = t.validators.find(function(l) {
            var a = l.validator;
            return a(s)
        })) == null ? void 0 : i.classGroupId
    }
}
var Bl = /^\[(.+)\]$/;

function Vh(e) {
    if (Bl.test(e)) {
        var t = Bl.exec(e)[1]
            , r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
        if (r) return "arbitrary.." + r
    }
}

function qh(e) {
    var t = e.theme
        , r = e.prefix
        , n = {
            nextPart: new Map
            , validators: []
        }
        , o = Kh(Object.entries(e.classGroups), r);
    return o.forEach(function(s) {
        var i = s[0]
            , l = s[1];
        $s(l, n, i, t)
    }), n
}

function $s(e, t, r, n) {
    e.forEach(function(o) {
        if (typeof o == "string") {
            var s = o === "" ? t : Dl(t, o);
            s.classGroupId = r;
            return
        }
        if (typeof o == "function") {
            if (Wh(o)) {
                $s(o(n), t, r, n);
                return
            }
            t.validators.push({
                validator: o
                , classGroupId: r
            });
            return
        }
        Object.entries(o)
            .forEach(function(i) {
                var l = i[0]
                    , a = i[1];
                $s(a, Dl(t, l), r, n)
            })
    })
}

function Dl(e, t) {
    var r = e;
    return t.split(hi)
        .forEach(function(n) {
            r.nextPart.has(n) || r.nextPart.set(n, {
                nextPart: new Map
                , validators: []
            }), r = r.nextPart.get(n)
        }), r
}

function Wh(e) {
    return e.isThemeGetter
}

function Kh(e, t) {
    return t ? e.map(function(r) {
        var n = r[0]
            , o = r[1]
            , s = o.map(function(i) {
                return typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i)
                    .map(function(l) {
                        var a = l[0]
                            , c = l[1];
                        return [t + a, c]
                    })) : i
            });
        return [n, s]
    }) : e
}

function Gh(e) {
    if (e < 1) return {
        get: function() { }
        , set: function() { }
    };
    var t = 0
        , r = new Map
        , n = new Map;

    function o(s, i) {
        r.set(s, i), t++, t > e && (t = 0, n = r, r = new Map)
    }
    return {
        get: function(s) {
            var i = r.get(s);
            if (i !== void 0) return i;
            if ((i = n.get(s)) !== void 0) return o(s, i), i
        }
        , set: function(s, i) {
            r.has(s) ? r.set(s, i) : o(s, i)
        }
    }
}
var lu = "!";

function Jh(e) {
    var t = e.separator || ":"
        , r = t.length === 1
        , n = t[0]
        , o = t.length;
    return function(s) {
        for (var i = [], l = 0, a = 0, c, u = 0; u < s.length; u++) {
            var d = s[u];
            if (l === 0) {
                if (d === n && (r || s.slice(u, u + o) === t)) {
                    i.push(s.slice(a, u)), a = u + o;
                    continue
                }
                if (d === "/") {
                    c = u;
                    continue
                }
            }
            d === "[" ? l++ : d === "]" && l--
        }
        var f = i.length === 0 ? s : s.substring(a)
            , g = f.startsWith(lu)
            , b = g ? f.substring(1) : f
            , y = c && c > a ? c - a : void 0;
        return {
            modifiers: i
            , hasImportantModifier: g
            , baseClassName: b
            , maybePostfixModifierPosition: y
        }
    }
}

function Qh(e) {
    if (e.length <= 1) return e;
    var t = []
        , r = [];
    return e.forEach(function(n) {
        var o = n[0] === "[";
        o ? (t.push.apply(t, r.sort()
            .concat([n])), r = []) : r.push(n)
    }), t.push.apply(t, r.sort()), t
}

function Xh(e) {
    return {
        cache: Gh(e.cacheSize)
        , splitModifiers: Jh(e)
        , ...Uh(e)
    }
}
var Yh = /\s+/;

function Zh(e, t) {
    var r = t.splitModifiers
        , n = t.getClassGroupId
        , o = t.getConflictingClassGroupIds
        , s = new Set;
    return e.trim()
        .split(Yh)
        .map(function(i) {
            var l = r(i)
                , a = l.modifiers
                , c = l.hasImportantModifier
                , u = l.baseClassName
                , d = l.maybePostfixModifierPosition
                , f = n(d ? u.substring(0, d) : u)
                , g = !!d;
            if (!f) {
                if (!d) return {
                    isTailwindClass: !1
                    , originalClassName: i
                };
                if (f = n(u), !f) return {
                    isTailwindClass: !1
                    , originalClassName: i
                };
                g = !1
            }
            var b = Qh(a)
                .join(":")
                , y = c ? b + lu : b;
            return {
                isTailwindClass: !0
                , modifierId: y
                , classGroupId: f
                , originalClassName: i
                , hasPostfixModifier: g
            }
        })
        .reverse()
        .filter(function(i) {
            if (!i.isTailwindClass) return !0;
            var l = i.modifierId
                , a = i.classGroupId
                , c = i.hasPostfixModifier
                , u = l + a;
            return s.has(u) ? !1 : (s.add(u), o(a, c)
                .forEach(function(d) {
                    return s.add(l + d)
                }), !0)
        })
        .reverse()
        .map(function(i) {
            return i.originalClassName
        })
        .join(" ")
}

function eg() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    var n, o, s, i = l;

    function l(c) {
        var u = t[0]
            , d = t.slice(1)
            , f = d.reduce(function(g, b) {
                return b(g)
            }, u());
        return n = Xh(f), o = n.cache.get, s = n.cache.set, i = a, a(c)
    }

    function a(c) {
        var u = o(c);
        if (u) return u;
        var d = Zh(c, n);
        return s(c, d), d
    }
    return function() {
        return i(Dh.apply(null, arguments))
    }
}

function Ee(e) {
    var t = function(r) {
        return r[e] || []
    };
    return t.isThemeGetter = !0, t
}
var au = /^\[(?:([a-z-]+):)?(.+)\]$/i
    , tg = /^\d+\/\d+$/
    , rg = new Set(["px", "full", "screen"])
    , ng = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/
    , og = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/
    , sg = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;

function it(e) {
    return cr(e) || rg.has(e) || tg.test(e) || As(e)
}

function As(e) {
    return _r(e, "length", dg)
}

function ig(e) {
    return _r(e, "size", cu)
}

function lg(e) {
    return _r(e, "position", cu)
}

function ag(e) {
    return _r(e, "url", fg)
}

function Un(e) {
    return _r(e, "number", cr)
}

function cr(e) {
    return !Number.isNaN(Number(e))
}

function cg(e) {
    return e.endsWith("%") && cr(e.slice(0, -1))
}

function Kr(e) {
    return Ul(e) || _r(e, "number", Ul)
}

function pe(e) {
    return au.test(e)
}

function Gr() {
    return !0
}

function Nt(e) {
    return ng.test(e)
}

function ug(e) {
    return _r(e, "", pg)
}

function _r(e, t, r) {
    var n = au.exec(e);
    return n ? n[1] ? n[1] === t : r(n[2]) : !1
}

function dg(e) {
    return og.test(e)
}

function cu() {
    return !1
}

function fg(e) {
    return e.startsWith("url(")
}

function Ul(e) {
    return Number.isInteger(Number(e))
}

function pg(e) {
    return sg.test(e)
}

function hg() {
    var e = Ee("colors")
        , t = Ee("spacing")
        , r = Ee("blur")
        , n = Ee("brightness")
        , o = Ee("borderColor")
        , s = Ee("borderRadius")
        , i = Ee("borderSpacing")
        , l = Ee("borderWidth")
        , a = Ee("contrast")
        , c = Ee("grayscale")
        , u = Ee("hueRotate")
        , d = Ee("invert")
        , f = Ee("gap")
        , g = Ee("gradientColorStops")
        , b = Ee("gradientColorStopPositions")
        , y = Ee("inset")
        , x = Ee("margin")
        , w = Ee("opacity")
        , k = Ee("padding")
        , T = Ee("saturate")
        , j = Ee("scale")
        , D = Ee("sepia")
        , $ = Ee("skew")
        , Q = Ee("space")
        , V = Ee("translate")
        , oe = function() {
            return ["auto", "contain", "none"]
        }
        , W = function() {
            return ["auto", "hidden", "clip", "visible", "scroll"]
        }
        , te = function() {
            return ["auto", pe, t]
        }
        , A = function() {
            return [pe, t]
        }
        , U = function() {
            return ["", it]
        }
        , de = function() {
            return ["auto", cr, pe]
        }
        , we = function() {
            return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"]
        }
        , ie = function() {
            return ["solid", "dashed", "dotted", "double", "none"]
        }
        , z = function() {
            return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"]
        }
        , ce = function() {
            return ["start", "end", "center", "between", "around", "evenly", "stretch"]
        }
        , Te = function() {
            return ["", "0", pe]
        }
        , X = function() {
            return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]
        }
        , Re = function() {
            return [cr, Un]
        }
        , Pe = function() {
            return [cr, pe]
        };
    return {
        cacheSize: 500
        , theme: {
            colors: [Gr]
            , spacing: [it]
            , blur: ["none", "", Nt, pe]
            , brightness: Re()
            , borderColor: [e]
            , borderRadius: ["none", "", "full", Nt, pe]
            , borderSpacing: A()
            , borderWidth: U()
            , contrast: Re()
            , grayscale: Te()
            , hueRotate: Pe()
            , invert: Te()
            , gap: A()
            , gradientColorStops: [e]
            , gradientColorStopPositions: [cg, As]
            , inset: te()
            , margin: te()
            , opacity: Re()
            , padding: A()
            , saturate: Re()
            , scale: Re()
            , sepia: Te()
            , skew: Pe()
            , space: A()
            , translate: A()
        }
        , classGroups: {
            aspect: [{
                aspect: ["auto", "square", "video", pe]
            }]
            , container: ["container"]
            , columns: [{
                columns: [Nt]
            }]
            , "break-after": [{
                "break-after": X()
            }]
            , "break-before": [{
                "break-before": X()
            }]
            , "break-inside": [{
                "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
            }]
            , "box-decoration": [{
                "box-decoration": ["slice", "clone"]
            }]
            , box: [{
                box: ["border", "content"]
            }]
            , display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"]
            , float: [{
                float: ["right", "left", "none"]
            }]
            , clear: [{
                clear: ["left", "right", "both", "none"]
            }]
            , isolation: ["isolate", "isolation-auto"]
            , "object-fit": [{
                object: ["contain", "cover", "fill", "none", "scale-down"]
            }]
            , "object-position": [{
                object: [].concat(we(), [pe])
            }]
            , overflow: [{
                overflow: W()
            }]
            , "overflow-x": [{
                "overflow-x": W()
            }]
            , "overflow-y": [{
                "overflow-y": W()
            }]
            , overscroll: [{
                overscroll: oe()
            }]
            , "overscroll-x": [{
                "overscroll-x": oe()
            }]
            , "overscroll-y": [{
                "overscroll-y": oe()
            }]
            , position: ["static", "fixed", "absolute", "relative", "sticky"]
            , inset: [{
                inset: [y]
            }]
            , "inset-x": [{
                "inset-x": [y]
            }]
            , "inset-y": [{
                "inset-y": [y]
            }]
            , start: [{
                start: [y]
            }]
            , end: [{
                end: [y]
            }]
            , top: [{
                top: [y]
            }]
            , right: [{
                right: [y]
            }]
            , bottom: [{
                bottom: [y]
            }]
            , left: [{
                left: [y]
            }]
            , visibility: ["visible", "invisible", "collapse"]
            , z: [{
                z: ["auto", Kr]
            }]
            , basis: [{
                basis: te()
            }]
            , "flex-direction": [{
                flex: ["row", "row-reverse", "col", "col-reverse"]
            }]
            , "flex-wrap": [{
                flex: ["wrap", "wrap-reverse", "nowrap"]
            }]
            , flex: [{
                flex: ["1", "auto", "initial", "none", pe]
            }]
            , grow: [{
                grow: Te()
            }]
            , shrink: [{
                shrink: Te()
            }]
            , order: [{
                order: ["first", "last", "none", Kr]
            }]
            , "grid-cols": [{
                "grid-cols": [Gr]
            }]
            , "col-start-end": [{
                col: ["auto", {
                    span: ["full", Kr]
                }, pe]
            }]
            , "col-start": [{
                "col-start": de()
            }]
            , "col-end": [{
                "col-end": de()
            }]
            , "grid-rows": [{
                "grid-rows": [Gr]
            }]
            , "row-start-end": [{
                row: ["auto", {
                    span: [Kr]
                }, pe]
            }]
            , "row-start": [{
                "row-start": de()
            }]
            , "row-end": [{
                "row-end": de()
            }]
            , "grid-flow": [{
                "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
            }]
            , "auto-cols": [{
                "auto-cols": ["auto", "min", "max", "fr", pe]
            }]
            , "auto-rows": [{
                "auto-rows": ["auto", "min", "max", "fr", pe]
            }]
            , gap: [{
                gap: [f]
            }]
            , "gap-x": [{
                "gap-x": [f]
            }]
            , "gap-y": [{
                "gap-y": [f]
            }]
            , "justify-content": [{
                justify: ["normal"].concat(ce())
            }]
            , "justify-items": [{
                "justify-items": ["start", "end", "center", "stretch"]
            }]
            , "justify-self": [{
                "justify-self": ["auto", "start", "end", "center", "stretch"]
            }]
            , "align-content": [{
                content: ["normal"].concat(ce(), ["baseline"])
            }]
            , "align-items": [{
                items: ["start", "end", "center", "baseline", "stretch"]
            }]
            , "align-self": [{
                self: ["auto", "start", "end", "center", "stretch", "baseline"]
            }]
            , "place-content": [{
                "place-content": [].concat(ce(), ["baseline"])
            }]
            , "place-items": [{
                "place-items": ["start", "end", "center", "baseline", "stretch"]
            }]
            , "place-self": [{
                "place-self": ["auto", "start", "end", "center", "stretch"]
            }]
            , p: [{
                p: [k]
            }]
            , px: [{
                px: [k]
            }]
            , py: [{
                py: [k]
            }]
            , ps: [{
                ps: [k]
            }]
            , pe: [{
                pe: [k]
            }]
            , pt: [{
                pt: [k]
            }]
            , pr: [{
                pr: [k]
            }]
            , pb: [{
                pb: [k]
            }]
            , pl: [{
                pl: [k]
            }]
            , m: [{
                m: [x]
            }]
            , mx: [{
                mx: [x]
            }]
            , my: [{
                my: [x]
            }]
            , ms: [{
                ms: [x]
            }]
            , me: [{
                me: [x]
            }]
            , mt: [{
                mt: [x]
            }]
            , mr: [{
                mr: [x]
            }]
            , mb: [{
                mb: [x]
            }]
            , ml: [{
                ml: [x]
            }]
            , "space-x": [{
                "space-x": [Q]
            }]
            , "space-x-reverse": ["space-x-reverse"]
            , "space-y": [{
                "space-y": [Q]
            }]
            , "space-y-reverse": ["space-y-reverse"]
            , w: [{
                w: ["auto", "min", "max", "fit", pe, t]
            }]
            , "min-w": [{
                "min-w": ["min", "max", "fit", pe, it]
            }]
            , "max-w": [{
                "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
                    screen: [Nt]
                }, Nt, pe]
            }]
            , h: [{
                h: [pe, t, "auto", "min", "max", "fit"]
            }]
            , "min-h": [{
                "min-h": ["min", "max", "fit", pe, it]
            }]
            , "max-h": [{
                "max-h": [pe, t, "min", "max", "fit"]
            }]
            , "font-size": [{
                text: ["base", Nt, As]
            }]
            , "font-smoothing": ["antialiased", "subpixel-antialiased"]
            , "font-style": ["italic", "not-italic"]
            , "font-weight": [{
                font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Un]
            }]
            , "font-family": [{
                font: [Gr]
            }]
            , "fvn-normal": ["normal-nums"]
            , "fvn-ordinal": ["ordinal"]
            , "fvn-slashed-zero": ["slashed-zero"]
            , "fvn-figure": ["lining-nums", "oldstyle-nums"]
            , "fvn-spacing": ["proportional-nums", "tabular-nums"]
            , "fvn-fraction": ["diagonal-fractions", "stacked-fractons"]
            , tracking: [{
                tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", pe]
            }]
            , "line-clamp": [{
                "line-clamp": ["none", cr, Un]
            }]
            , leading: [{
                leading: ["none", "tight", "snug", "normal", "relaxed", "loose", pe, it]
            }]
            , "list-image": [{
                "list-image": ["none", pe]
            }]
            , "list-style-type": [{
                list: ["none", "disc", "decimal", pe]
            }]
            , "list-style-position": [{
                list: ["inside", "outside"]
            }]
            , "placeholder-color": [{
                placeholder: [e]
            }]
            , "placeholder-opacity": [{
                "placeholder-opacity": [w]
            }]
            , "text-alignment": [{
                text: ["left", "center", "right", "justify", "start", "end"]
            }]
            , "text-color": [{
                text: [e]
            }]
            , "text-opacity": [{
                "text-opacity": [w]
            }]
            , "text-decoration": ["underline", "overline", "line-through", "no-underline"]
            , "text-decoration-style": [{
                decoration: [].concat(ie(), ["wavy"])
            }]
            , "text-decoration-thickness": [{
                decoration: ["auto", "from-font", it]
            }]
            , "underline-offset": [{
                "underline-offset": ["auto", pe, it]
            }]
            , "text-decoration-color": [{
                decoration: [e]
            }]
            , "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"]
            , "text-overflow": ["truncate", "text-ellipsis", "text-clip"]
            , indent: [{
                indent: A()
            }]
            , "vertical-align": [{
                align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", pe]
            }]
            , whitespace: [{
                whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
            }]
            , break: [{
                break: ["normal", "words", "all", "keep"]
            }]
            , hyphens: [{
                hyphens: ["none", "manual", "auto"]
            }]
            , content: [{
                content: ["none", pe]
            }]
            , "bg-attachment": [{
                bg: ["fixed", "local", "scroll"]
            }]
            , "bg-clip": [{
                "bg-clip": ["border", "padding", "content", "text"]
            }]
            , "bg-opacity": [{
                "bg-opacity": [w]
            }]
            , "bg-origin": [{
                "bg-origin": ["border", "padding", "content"]
            }]
            , "bg-position": [{
                bg: [].concat(we(), [lg])
            }]
            , "bg-repeat": [{
                bg: ["no-repeat", {
                    repeat: ["", "x", "y", "round", "space"]
                }]
            }]
            , "bg-size": [{
                bg: ["auto", "cover", "contain", ig]
            }]
            , "bg-image": [{
                bg: ["none", {
                    "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                }, ag]
            }]
            , "bg-color": [{
                bg: [e]
            }]
            , "gradient-from-pos": [{
                from: [b]
            }]
            , "gradient-via-pos": [{
                via: [b]
            }]
            , "gradient-to-pos": [{
                to: [b]
            }]
            , "gradient-from": [{
                from: [g]
            }]
            , "gradient-via": [{
                via: [g]
            }]
            , "gradient-to": [{
                to: [g]
            }]
            , rounded: [{
                rounded: [s]
            }]
            , "rounded-s": [{
                "rounded-s": [s]
            }]
            , "rounded-e": [{
                "rounded-e": [s]
            }]
            , "rounded-t": [{
                "rounded-t": [s]
            }]
            , "rounded-r": [{
                "rounded-r": [s]
            }]
            , "rounded-b": [{
                "rounded-b": [s]
            }]
            , "rounded-l": [{
                "rounded-l": [s]
            }]
            , "rounded-ss": [{
                "rounded-ss": [s]
            }]
            , "rounded-se": [{
                "rounded-se": [s]
            }]
            , "rounded-ee": [{
                "rounded-ee": [s]
            }]
            , "rounded-es": [{
                "rounded-es": [s]
            }]
            , "rounded-tl": [{
                "rounded-tl": [s]
            }]
            , "rounded-tr": [{
                "rounded-tr": [s]
            }]
            , "rounded-br": [{
                "rounded-br": [s]
            }]
            , "rounded-bl": [{
                "rounded-bl": [s]
            }]
            , "border-w": [{
                border: [l]
            }]
            , "border-w-x": [{
                "border-x": [l]
            }]
            , "border-w-y": [{
                "border-y": [l]
            }]
            , "border-w-s": [{
                "border-s": [l]
            }]
            , "border-w-e": [{
                "border-e": [l]
            }]
            , "border-w-t": [{
                "border-t": [l]
            }]
            , "border-w-r": [{
                "border-r": [l]
            }]
            , "border-w-b": [{
                "border-b": [l]
            }]
            , "border-w-l": [{
                "border-l": [l]
            }]
            , "border-opacity": [{
                "border-opacity": [w]
            }]
            , "border-style": [{
                border: [].concat(ie(), ["hidden"])
            }]
            , "divide-x": [{
                "divide-x": [l]
            }]
            , "divide-x-reverse": ["divide-x-reverse"]
            , "divide-y": [{
                "divide-y": [l]
            }]
            , "divide-y-reverse": ["divide-y-reverse"]
            , "divide-opacity": [{
                "divide-opacity": [w]
            }]
            , "divide-style": [{
                divide: ie()
            }]
            , "border-color": [{
                border: [o]
            }]
            , "border-color-x": [{
                "border-x": [o]
            }]
            , "border-color-y": [{
                "border-y": [o]
            }]
            , "border-color-t": [{
                "border-t": [o]
            }]
            , "border-color-r": [{
                "border-r": [o]
            }]
            , "border-color-b": [{
                "border-b": [o]
            }]
            , "border-color-l": [{
                "border-l": [o]
            }]
            , "divide-color": [{
                divide: [o]
            }]
            , "outline-style": [{
                outline: [""].concat(ie())
            }]
            , "outline-offset": [{
                "outline-offset": [pe, it]
            }]
            , "outline-w": [{
                outline: [it]
            }]
            , "outline-color": [{
                outline: [e]
            }]
            , "ring-w": [{
                ring: U()
            }]
            , "ring-w-inset": ["ring-inset"]
            , "ring-color": [{
                ring: [e]
            }]
            , "ring-opacity": [{
                "ring-opacity": [w]
            }]
            , "ring-offset-w": [{
                "ring-offset": [it]
            }]
            , "ring-offset-color": [{
                "ring-offset": [e]
            }]
            , shadow: [{
                shadow: ["", "inner", "none", Nt, ug]
            }]
            , "shadow-color": [{
                shadow: [Gr]
            }]
            , opacity: [{
                opacity: [w]
            }]
            , "mix-blend": [{
                "mix-blend": z()
            }]
            , "bg-blend": [{
                "bg-blend": z()
            }]
            , filter: [{
                filter: ["", "none"]
            }]
            , blur: [{
                blur: [r]
            }]
            , brightness: [{
                brightness: [n]
            }]
            , contrast: [{
                contrast: [a]
            }]
            , "drop-shadow": [{
                "drop-shadow": ["", "none", Nt, pe]
            }]
            , grayscale: [{
                grayscale: [c]
            }]
            , "hue-rotate": [{
                "hue-rotate": [u]
            }]
            , invert: [{
                invert: [d]
            }]
            , saturate: [{
                saturate: [T]
            }]
            , sepia: [{
                sepia: [D]
            }]
            , "backdrop-filter": [{
                "backdrop-filter": ["", "none"]
            }]
            , "backdrop-blur": [{
                "backdrop-blur": [r]
            }]
            , "backdrop-brightness": [{
                "backdrop-brightness": [n]
            }]
            , "backdrop-contrast": [{
                "backdrop-contrast": [a]
            }]
            , "backdrop-grayscale": [{
                "backdrop-grayscale": [c]
            }]
            , "backdrop-hue-rotate": [{
                "backdrop-hue-rotate": [u]
            }]
            , "backdrop-invert": [{
                "backdrop-invert": [d]
            }]
            , "backdrop-opacity": [{
                "backdrop-opacity": [w]
            }]
            , "backdrop-saturate": [{
                "backdrop-saturate": [T]
            }]
            , "backdrop-sepia": [{
                "backdrop-sepia": [D]
            }]
            , "border-collapse": [{
                border: ["collapse", "separate"]
            }]
            , "border-spacing": [{
                "border-spacing": [i]
            }]
            , "border-spacing-x": [{
                "border-spacing-x": [i]
            }]
            , "border-spacing-y": [{
                "border-spacing-y": [i]
            }]
            , "table-layout": [{
                table: ["auto", "fixed"]
            }]
            , caption: [{
                caption: ["top", "bottom"]
            }]
            , transition: [{
                transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", pe]
            }]
            , duration: [{
                duration: Pe()
            }]
            , ease: [{
                ease: ["linear", "in", "out", "in-out", pe]
            }]
            , delay: [{
                delay: Pe()
            }]
            , animate: [{
                animate: ["none", "spin", "ping", "pulse", "bounce", pe]
            }]
            , transform: [{
                transform: ["", "gpu", "none"]
            }]
            , scale: [{
                scale: [j]
            }]
            , "scale-x": [{
                "scale-x": [j]
            }]
            , "scale-y": [{
                "scale-y": [j]
            }]
            , rotate: [{
                rotate: [Kr, pe]
            }]
            , "translate-x": [{
                "translate-x": [V]
            }]
            , "translate-y": [{
                "translate-y": [V]
            }]
            , "skew-x": [{
                "skew-x": [$]
            }]
            , "skew-y": [{
                "skew-y": [$]
            }]
            , "transform-origin": [{
                origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", pe]
            }]
            , accent: [{
                accent: ["auto", e]
            }]
            , appearance: ["appearance-none"]
            , cursor: [{
                cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", pe]
            }]
            , "caret-color": [{
                caret: [e]
            }]
            , "pointer-events": [{
                "pointer-events": ["none", "auto"]
            }]
            , resize: [{
                resize: ["none", "y", "x", ""]
            }]
            , "scroll-behavior": [{
                scroll: ["auto", "smooth"]
            }]
            , "scroll-m": [{
                "scroll-m": A()
            }]
            , "scroll-mx": [{
                "scroll-mx": A()
            }]
            , "scroll-my": [{
                "scroll-my": A()
            }]
            , "scroll-ms": [{
                "scroll-ms": A()
            }]
            , "scroll-me": [{
                "scroll-me": A()
            }]
            , "scroll-mt": [{
                "scroll-mt": A()
            }]
            , "scroll-mr": [{
                "scroll-mr": A()
            }]
            , "scroll-mb": [{
                "scroll-mb": A()
            }]
            , "scroll-ml": [{
                "scroll-ml": A()
            }]
            , "scroll-p": [{
                "scroll-p": A()
            }]
            , "scroll-px": [{
                "scroll-px": A()
            }]
            , "scroll-py": [{
                "scroll-py": A()
            }]
            , "scroll-ps": [{
                "scroll-ps": A()
            }]
            , "scroll-pe": [{
                "scroll-pe": A()
            }]
            , "scroll-pt": [{
                "scroll-pt": A()
            }]
            , "scroll-pr": [{
                "scroll-pr": A()
            }]
            , "scroll-pb": [{
                "scroll-pb": A()
            }]
            , "scroll-pl": [{
                "scroll-pl": A()
            }]
            , "snap-align": [{
                snap: ["start", "end", "center", "align-none"]
            }]
            , "snap-stop": [{
                snap: ["normal", "always"]
            }]
            , "snap-type": [{
                snap: ["none", "x", "y", "both"]
            }]
            , "snap-strictness": [{
                snap: ["mandatory", "proximity"]
            }]
            , touch: [{
                touch: ["auto", "none", "pinch-zoom", "manipulation", {
                    pan: ["x", "left", "right", "y", "up", "down"]
                }]
            }]
            , select: [{
                select: ["none", "text", "all", "auto"]
            }]
            , "will-change": [{
                "will-change": ["auto", "scroll", "contents", "transform", pe]
            }]
            , fill: [{
                fill: [e, "none"]
            }]
            , "stroke-w": [{
                stroke: [it, Un]
            }]
            , stroke: [{
                stroke: [e, "none"]
            }]
            , sr: ["sr-only", "not-sr-only"]
        }
        , conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"]
            , overscroll: ["overscroll-x", "overscroll-y"]
            , inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"]
            , "inset-x": ["right", "left"]
            , "inset-y": ["top", "bottom"]
            , flex: ["basis", "grow", "shrink"]
            , gap: ["gap-x", "gap-y"]
            , p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"]
            , px: ["pr", "pl"]
            , py: ["pt", "pb"]
            , m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"]
            , mx: ["mr", "ml"]
            , my: ["mt", "mb"]
            , "font-size": ["leading"]
            , "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"]
            , "fvn-ordinal": ["fvn-normal"]
            , "fvn-slashed-zero": ["fvn-normal"]
            , "fvn-figure": ["fvn-normal"]
            , "fvn-spacing": ["fvn-normal"]
            , "fvn-fraction": ["fvn-normal"]
            , rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"]
            , "rounded-s": ["rounded-ss", "rounded-es"]
            , "rounded-e": ["rounded-se", "rounded-ee"]
            , "rounded-t": ["rounded-tl", "rounded-tr"]
            , "rounded-r": ["rounded-tr", "rounded-br"]
            , "rounded-b": ["rounded-br", "rounded-bl"]
            , "rounded-l": ["rounded-tl", "rounded-bl"]
            , "border-spacing": ["border-spacing-x", "border-spacing-y"]
            , "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"]
            , "border-w-x": ["border-w-r", "border-w-l"]
            , "border-w-y": ["border-w-t", "border-w-b"]
            , "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"]
            , "border-color-x": ["border-color-r", "border-color-l"]
            , "border-color-y": ["border-color-t", "border-color-b"]
            , "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"]
            , "scroll-mx": ["scroll-mr", "scroll-ml"]
            , "scroll-my": ["scroll-mt", "scroll-mb"]
            , "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"]
            , "scroll-px": ["scroll-pr", "scroll-pl"]
            , "scroll-py": ["scroll-pt", "scroll-pb"]
        }
        , conflictingClassGroupModifiers: {
            "font-size": ["leading"]
        }
    }
}
var Qt = eg(hg);
const Os = e => Qt(e)
    , gg = "mr-2 px-2.5 py-0.5 rounded flex items-center justify-center"
    , mg = "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:text-blue-800 dark:hover:bg-blue-300"
    , bg = "p-1 rounded-full mr-2"
    , yg = {
        default: "text-blue-800 dark:text-blue-800"
        , dark: "text-gray-800 dark:bg-gray-700"
        , red: "text-red-800 dark:text-red-900"
        , green: "text-green-800 dark:text-green-900"
        , yellow: "text-yellow-800 dark:text-yellow-900"
        , indigo: "text-indigo-800 dark:text-indigo-900"
        , purple: "text-purple-800 dark:text-purple-900"
        , pink: "text-pink-800 dark:text-pink-900"
    }
    , vg = {
        default: "bg-blue-100 dark:bg-blue-200"
        , dark: "bg-gray-100 dark:bg-gray-700"
        , red: "bg-red-100 dark:bg-red-200"
        , green: "bg-green-100 dark:bg-green-200"
        , yellow: "bg-yellow-100 dark:bg-yellow-200"
        , indigo: "bg-indigo-100 dark:bg-indigo-200"
        , purple: "bg-purple-100 dark:bg-purple-200"
        , pink: "bg-pink-100 dark:bg-pink-200"
    }
    , _g = {
        xs: "text-xs font-semibold"
        , sm: "text-sm font-medium"
    };

function wg(e, t) {
    const r = Cc();
    return {
        badgeClasses: ne(() => Qt(_g[e.size], e.href ? "" : vg[e.type], e.href ? "" : yg[e.type], e.href ? mg : "", t.isContentEmpty.value ? bg : gg, r.class))
    }
}
const je = De({
    __name: "FwbBadge"
    , props: {
        type: {
            default: "default"
        }
        , size: {
            default: "xs"
        }
        , href: {
            default: null
        }
    }
    , setup(e) {
        const t = e
            , r = ii()
            , n = ne(() => !r.default)
            , o = ne(() => t.href ? "a" : "span")
            , {
                badgeClasses: s
            } = wg(t, {
                isContentEmpty: n
            });
        return (i, l) => (M(), We(Rn(o.value), {
            class: ve(v(s))
            , href: i.href
        }, {
            default: le(() => [Oe(i.$slots, "icon"), Oe(i.$slots, "default")])
            , _: 3
        }, 8, ["class", "href"]))
    }
});

function xg(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var uu = {
    exports: {}
};
/*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
*/
(function(e) {
    (function() {
        var t = {}.hasOwnProperty;

        function r() {
            for (var n = [], o = 0; o < arguments.length; o++) {
                var s = arguments[o];
                if (s) {
                    var i = typeof s;
                    if (i === "string" || i === "number") n.push(s);
                    else if (Array.isArray(s)) {
                        if (s.length) {
                            var l = r.apply(null, s);
                            l && n.push(l)
                        }
                    } else if (i === "object") {
                        if (s.toString !== Object.prototype.toString && !s.toString.toString()
                            .includes("[native code]")) {
                            n.push(s.toString());
                            continue
                        }
                        for (var a in s) t.call(s, a) && s[a] && n.push(a)
                    }
                }
            }
            return n.join(" ")
        }
        e.exports ? (r.default = r, e.exports = r) : window.classNames = r
    })()
})(uu);
var kg = uu.exports;
const Ps = xg(kg)
    , Sg = {
        0: "w-0 h-0"
        , .5: "w-0.5 h-0.5"
        , 1: "w-1 h-1"
        , 1.5: "w-1.5 h-1.5"
        , 10: "w-10 h-10"
        , 11: "w-11 h-11"
        , 12: "w-12 h-12"
        , 2: "w-2 h-2"
        , 2.5: "w-2.5 h-2.5"
        , 3: "w-3 h-3"
        , 4: "w-4 h-4"
        , 5: "w-5 h-5"
        , 6: "w-6 h-6"
        , 7: "w-7 h-7"
        , 8: "w-8 h-8"
        , 9: "w-9 h-9"
    }
    , Eg = {
        blue: "fill-blue-600"
        , gray: "fill-gray-600 dark:fill-gray-300"
        , green: "fill-green-500"
        , pink: "fill-pink-600"
        , purple: "fill-purple-600"
        , red: "fill-red-600"
        , white: "fill-white"
        , yellow: "fill-yellow-400"
    };

function Cg(e) {
    const t = ne(() => Sg[e.size.value])
        , r = ne(() => Eg[e.color.value])
        , n = ne(() => "text-gray-200 dark:text-gray-600")
        , o = ne(() => "animate-spin");
    return {
        spinnerClasses: ne(() => Ps(o.value, n.value, r.value, t.value))
    }
}
const Tg = m("path", {
    d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    , fill: "currentColor"
}, null, -1)
    , Rg = m("path", {
        d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        , fill: "currentFill"
    }, null, -1)
    , $g = [Tg, Rg]
    , Vn = De({
        __name: "FwbSpinner"
        , props: {
            color: {
                default: "blue"
            }
            , size: {
                default: "4"
            }
        }
        , setup(e) {
            const t = e
                , {
                    spinnerClasses: r
                } = Cg(pn(t));
            return (n, o) => (M(), J("svg", {
                class: ve(v(r))
                , fill: "none"
                , role: "status"
                , viewBox: "0 0 100 101"
                , xmlns: "http://www.w3.org/2000/svg"
            }, $g, 2))
        }
    })
    , Vl = {
        default: {
            default: "text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
            , blue: "text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
            , alternative: "font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
            , dark: "text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg dark:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700"
            , light: "text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
            , green: "focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:focus:ring-green-800"
            , red: "focus:outline-none text-white bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:focus:ring-red-900"
            , yellow: "focus:outline-none text-white bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900"
            , purple: "focus:outline-none text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg dark:bg-purple-600 dark:focus:ring-purple-900"
            , pink: "focus:outline-none text-white bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg dark:bg-pink-600 dark:focus:ring-pink-900"
        }
        , hover: {
            default: "hover:bg-blue-800 dark:hover:bg-blue-700"
            , blue: "hover:bg-blue-800 dark:hover:bg-blue-700"
            , alternative: "hover:bg-gray-100 hover:text-blue-700 dark:hover:text-white dark:hover:bg-gray-700"
            , dark: "hover:bg-gray-900 dark:hover:bg-gray-700"
            , light: "hover:bg-gray-100 dark:hover:border-gray-600"
            , green: "hover:bg-green-800 dark:hover:bg-green-700"
            , red: "hover:bg-red-800 dark:hover:bg-red-700"
            , yellow: "hover:bg-yellow-500"
            , purple: "hover:bg-purple-800 dark:hover:bg-purple-700"
            , pink: "hover:bg-pink-800 dark:hover:bg-pink-700"
        }
    }
    , ql = {
        default: {
            dark: "text-gray-900 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800"
            , default: "text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800"
            , blue: "text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800"
            , green: "text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center dark:border-green-500 dark:text-green-500 dark:focus:ring-green-800"
            , purple: "text-purple-700 border border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center dark:border-purple-400 dark:text-purple-400 dark:focus:ring-purple-900"
            , pink: "text-pink-700 border border-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm text-center dark:border-pink-400 dark:text-pink-400 dark:focus:ring-pink-900"
            , red: "text-red-700 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:border-red-500 dark:text-red-500 dark:focus:ring-red-900"
            , yellow: "text-yellow-400 border border-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm text-center dark:border-yellow-300 dark:text-yellow-300 dark:focus:ring-yellow-900"
        }
        , hover: {
            dark: "hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600"
            , default: "hover:text-white hover:bg-blue-800 dark:hover:text-white dark:hover:bg-blue-600"
            , blue: "hover:text-white hover:bg-blue-800 dark:hover:text-white dark:hover:bg-blue-600"
            , green: "hover:text-white hover:bg-green-800 dark:hover:text-white dark:hover:bg-green-600"
            , purple: "hover:text-white hover:bg-purple-800 dark:hover:text-white dark:hover:bg-purple-500"
            , pink: "hover:text-white hover:bg-pink-800 dark:hover:text-white dark:hover:bg-pink-500"
            , red: "hover:text-white hover:bg-red-800 dark:hover:text-white dark:hover:bg-red-600"
            , yellow: "hover:text-white hover:bg-yellow-500 dark:hover:text-white dark:hover:bg-yellow-400"
        }
    }
    , Wl = {
        hover: {
            "cyan-blue": "hover:bg-gradient-to-bl"
            , "green-blue": "hover:bg-gradient-to-bl"
            , "pink-orange": "hover:bg-gradient-to-bl"
            , "purple-blue": "hover:bg-gradient-to-bl"
            , "purple-pink": "hover:bg-gradient-to-l"
            , "red-yellow": "hover:bg-gradient-to-bl"
            , "teal-lime": "hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200"
            , blue: "hover:bg-gradient-to-br"
            , cyan: "hover:bg-gradient-to-br"
            , green: "hover:bg-gradient-to-br"
            , lime: "hover:bg-gradient-to-br"
            , pink: "hover:bg-gradient-to-br"
            , purple: "hover:bg-gradient-to-br"
            , red: "hover:bg-gradient-to-br"
            , teal: "hover:bg-gradient-to-br"
        }
        , default: {
            "cyan-blue": "text-white bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg"
            , "green-blue": "text-white bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg"
            , "pink-orange": "text-white bg-gradient-to-br from-pink-500 to-orange-400 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg"
            , "purple-blue": "text-white bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg"
            , "purple-pink": "text-white bg-gradient-to-r from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg"
            , "red-yellow": "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg"
            , "teal-lime": "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg"
            , blue: "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg"
            , cyan: "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
            , green: "text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg"
            , lime: "text-gray-900 bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 rounded-lg"
            , pink: "text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 rounded-lg"
            , purple: "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg"
            , red: "text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg"
            , teal: "text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 rounded-lg"
        }
    }
    , Kl = {
        default: {
            "cyan-blue": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            , "green-blue": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            , "pink-orange": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            , "purple-blue": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            , "purple-pink": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            , "red-yellow": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            , "teal-lime": "relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        }
        , hover: {
            "cyan-blue": "group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white"
            , "green-blue": "group-hover:from-green-400 group-hover:to-blue-600 hover:text-white"
            , "pink-orange": "group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white"
            , "purple-blue": "group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white"
            , "purple-pink": "group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white"
            , "red-yellow": "group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:hover:text-gray-900"
            , "teal-lime": "group-hover:from-teal-300 group-hover:to-lime-300 dark:hover:text-gray-900"
        }
    }
    , Ag = {
        xs: "text-xs px-2 py-1"
        , sm: "text-sm px-3 py-1.5"
        , md: "text-sm px-4 py-2"
        , lg: "text-base px-5 py-2.5"
        , xl: "text-base px-6 py-3"
    }
    , Og = {
        xs: "text-xs p-1"
        , sm: "text-sm p-1.5"
        , md: "text-sm p-2"
        , lg: "text-base p-2.5"
        , xl: "text-base p-3"
    }
    , Gl = {
        blue: "shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
        , cyan: "shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80"
        , green: "shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"
        , lime: "shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80"
        , pink: "shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80"
        , purple: "shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80"
        , red: "shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
        , teal: "shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
    }
    , ss = ["blue", "green", "cyan", "teal", "lime", "red", "pink", "purple"]
    , Pg = ["alternative", "light"];

function Ng(e) {
    const t = ii()
        , r = ne(() => e.square.value ? Og[e.size.value] : Ag[e.size.value])
        , n = ne(() => {
            const s = !!e.gradient.value
                , i = !!e.color.value
                , l = e.outline.value;
            let a = ""
                , c = "";
            if (s && l) ss.includes(e.gradient.value) ? console.warn(`cannot use outline prop with "${e.gradient.value}" gradient`) : (c = Kl.default[e.gradient.value], e.disabled.value || (a = Kl.hover[e.gradient.value]));
            else if (s) c = Wl.default[e.gradient.value], e.disabled.value || (a = Wl.hover[e.gradient.value]);
            else if (i && l)
                if (Pg.includes(e.color.value)) console.warn(`cannot use outline prop with "${e.color.value}" color`);
                else {
                    const d = e.color.value;
                    c = ql.default[d], e.disabled.value || (a = ql.hover[d])
                }
            else {
                const d = e.color.value;
                c = Vl.default[d], e.disabled.value || (a = Vl.hover[d])
            }
            let u = "";
            return e.shadow.value === "" ? e.gradient.value && ss.includes(e.gradient.value) && (u = Gl[e.gradient.value]) : typeof e.shadow.value == "string" && ss.includes(e.shadow.value) && (u = Gl[e.shadow.value]), [c, a, u, e.pill.value && "!rounded-full", e.disabled.value && "cursor-not-allowed opacity-50", s && l ? "p-0.5" : r.value, (t.prefix || t.suffix || e.loading.value) && "inline-flex items-center", e.class.value].filter(d => d)
                .join(" ")
        })
        , o = ne(() => e.gradient.value && e.outline.value ? ["relative bg-white dark:bg-gray-900 rounded-md inline-flex items-center", r.value, e.disabled.value ? "" : "group-hover:bg-opacity-0 transition-all ease-in duration-75"].filter(s => s)
            .join(" ") : "");
    return {
        wrapperClasses: n.value
        , spanClasses: o.value
    }
}

function Fg(e) {
    const t = {
        xs: "2.5"
        , sm: "3"
        , md: "4"
        , lg: "5"
        , xl: "6"
    }
        , r = ne(() => t[e.size.value]);
    return {
        color: ne(() => e.outline.value ? e.gradient.value ? e.gradient.value.includes("purple") ? "purple" : e.gradient.value.includes("blue") ? "blue" : e.gradient.value.includes("pink") ? "pink" : e.gradient.value.includes("red") ? "red" : "white" : ["alternative", "dark", "light"].includes(e.color.value) ? "white" : e.color.value === "default" ? "blue" : e.color.value : "white")
        , size: r
    }
}
const Ig = {
    key: 0
    , class: "mr-2"
}
    , Lg = {
        key: 0
        , class: "mr-2"
    }
    , Mg = {
        key: 1
        , class: "ml-2"
    }
    , jg = {
        key: 1
        , class: "ml-2"
    }
    , zg = De({
        __name: "FwbButton"
        , props: {
            class: {
                default: ""
            }
            , color: {
                default: "default"
            }
            , gradient: {
                default: null
            }
            , size: {
                default: "md"
            }
            , shadow: {
                default: null
            }
            , pill: {
                type: Boolean
                , default: !1
            }
            , square: {
                type: Boolean
                , default: !1
            }
            , outline: {
                type: Boolean
                , default: !1
            }
            , loading: {
                type: Boolean
                , default: !1
            }
            , loadingPosition: {
                default: "prefix"
            }
            , disabled: {
                type: Boolean
                , default: !1
            }
            , href: {
                default: ""
            }
            , tag: {
                default: "a"
            }
        }
        , setup(e) {
            const t = e
                , r = ne(() => Ng(pn(t)))
                , n = ne(() => Os(r.value.wrapperClasses))
                , o = ne(() => Os(r.value.spanClasses))
                , s = ne(() => t.outline && t.gradient)
                , i = ne(() => t.loading && t.loadingPosition === "prefix")
                , l = ne(() => t.loading && t.loadingPosition === "suffix")
                , {
                    color: a
                    , size: c
                } = Fg(pn(t))
                , u = t.tag !== "a" ? gr(t.tag) : "a"
                , d = t.href ? u : "button"
                , f = t.tag === "router-link" || t.tag === "nuxt-link" ? "to" : "href";
            return (g, b) => (M(), We(Rn(v(d)), wo({
                class: n.value
                , [v(f) || ""]: g.href
                , disabled: v(d) === "button" && g.disabled
            }), {
                default: le(() => [!s.value && (g.$slots.prefix || i.value) ? (M(), J("div", Ig, [i.value ? (M(), We(Vn, {
                    key: 0
                    , color: v(a)
                    , size: v(c)
                }, null, 8, ["color", "size"])) : Oe(g.$slots, "prefix", {
                    key: 1
                })])) : Ye("", !0), m("span", {
                    class: ve(o.value)
                }, [s.value && (g.$slots.prefix || i.value) ? (M(), J("span", Lg, [i.value ? (M(), We(Vn, {
                    key: 0
                    , color: v(a)
                    , size: v(c)
                }, null, 8, ["color", "size"])) : Oe(g.$slots, "prefix", {
                    key: 1
                })])) : Ye("", !0), Oe(g.$slots, "default"), s.value && (g.$slots.suffix || l.value) ? (M(), J("span", Mg, [l.value ? (M(), We(Vn, {
                    key: 0
                    , color: v(a)
                    , size: v(c)
                }, null, 8, ["color", "size"])) : Oe(g.$slots, "suffix", {
                    key: 1
                })])) : Ye("", !0)], 2), !s.value && (g.$slots.suffix || l.value) ? (M(), J("div", jg, [l.value ? (M(), We(Vn, {
                    key: 0
                    , color: v(a)
                    , size: v(c)
                }, null, 8, ["color", "size"])) : Oe(g.$slots, "suffix", {
                    key: 1
                })])) : Ye("", !0)])
                , _: 3
            }, 16, ["class", "disabled"]))
        }
    });
var Jl;
const du = typeof window < "u"
    , Hg = e => typeof e < "u"
    , Bg = e => typeof e == "function";
du && (Jl = window == null ? void 0 : window.navigator) != null && Jl.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function Ql(e) {
    return typeof e == "function" ? e() : v(e)
}

function Dg(e) {
    return e
}

function Ug(e, t) {
    var r;
    if (typeof e == "number") return e + t;
    const n = ((r = e.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : r[0]) || ""
        , o = e.slice(n.length)
        , s = parseFloat(n) + t;
    return Number.isNaN(s) ? e : s + o
}

function Vg(e) {
    return Wa() ? (_d(e), !0) : !1
}

function qg(e) {
    return typeof e == "function" ? ne(e) : q(e)
}

function Wg(e, t = !0) {
    Ao() ? $n(e) : t ? e() : Tn(e)
}

function Kg(e = !1, t = {}) {
    const {
        truthyValue: r = !0
        , falsyValue: n = !1
    } = t, o = ke(e), s = q(e);

    function i(l) {
        if (arguments.length) return s.value = l, s.value;
        {
            const a = Ql(r);
            return s.value = s.value === a ? Ql(n) : a, s.value
        }
    }
    return o ? i : [s, i]
}
const fu = du ? window : void 0;

function Gg(e, t = !1) {
    const r = q()
        , n = () => r.value = !!e();
    return n(), Wg(n, t), r
}

function Jr(e, t = {}) {
    const {
        window: r = fu
    } = t, n = Gg(() => r && "matchMedia" in r && typeof r.matchMedia == "function");
    let o;
    const s = q(!1)
        , i = () => {
            o && ("removeEventListener" in o ? o.removeEventListener("change", l) : o.removeListener(l))
        }
        , l = () => {
            n.value && (i(), o = r.matchMedia(qg(e)
                .value), s.value = o.matches, "addEventListener" in o ? o.addEventListener("change", l) : o.addListener(l))
        };
    return df(l), Vg(() => i()), s
}
const pu = {
    sm: 640
    , md: 768
    , lg: 1024
    , xl: 1280
    , "2xl": 1536
};
var Jg = Object.defineProperty
    , Xl = Object.getOwnPropertySymbols
    , Qg = Object.prototype.hasOwnProperty
    , Xg = Object.prototype.propertyIsEnumerable
    , Yl = (e, t, r) => t in e ? Jg(e, t, {
        enumerable: !0
        , configurable: !0
        , writable: !0
        , value: r
    }) : e[t] = r
    , Yg = (e, t) => {
        for (var r in t || (t = {})) Qg.call(t, r) && Yl(e, r, t[r]);
        if (Xl)
            for (var r of Xl(t)) Xg.call(t, r) && Yl(e, r, t[r]);
        return e
    };

function hu(e, t = {}) {
    function r(l, a) {
        let c = e[l];
        return a != null && (c = Ug(c, a)), typeof c == "number" && (c = `${c}px`), c
    }
    const {
        window: n = fu
    } = t;

    function o(l) {
        return n ? n.matchMedia(l)
            .matches : !1
    }
    const s = l => Jr(`(min-width: ${r(l)})`, t)
        , i = Object.keys(e)
            .reduce((l, a) => (Object.defineProperty(l, a, {
                get: () => s(a)
                , enumerable: !0
                , configurable: !0
            }), l), {});
    return Yg({
        greater(l) {
            return Jr(`(min-width: ${r(l, .1)})`, t)
        }
        , greaterOrEqual: s
        , smaller(l) {
            return Jr(`(max-width: ${r(l, -.1)})`, t)
        }
        , smallerOrEqual(l) {
            return Jr(`(max-width: ${r(l)})`, t)
        }
        , between(l, a) {
            return Jr(`(min-width: ${r(l)}) and (max-width: ${r(a, -.1)})`, t)
        }
        , isGreater(l) {
            return o(`(min-width: ${r(l, .1)})`)
        }
        , isGreaterOrEqual(l) {
            return o(`(min-width: ${r(l)})`)
        }
        , isSmaller(l) {
            return o(`(max-width: ${r(l, -.1)})`)
        }
        , isSmallerOrEqual(l) {
            return o(`(max-width: ${r(l)})`)
        }
        , isInBetween(l, a) {
            return o(`(min-width: ${r(l)}) and (max-width: ${r(a, -.1)})`)
        }
    }, i)
}

function Zg(e) {
    return JSON.parse(JSON.stringify(e))
}
const Zl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
    , ea = "__vueuse_ssr_handlers__";
Zl[ea] = Zl[ea] || {};
var ta;
(function(e) {
    e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE"
})(ta || (ta = {}));
var em = Object.defineProperty
    , ra = Object.getOwnPropertySymbols
    , tm = Object.prototype.hasOwnProperty
    , rm = Object.prototype.propertyIsEnumerable
    , na = (e, t, r) => t in e ? em(e, t, {
        enumerable: !0
        , configurable: !0
        , writable: !0
        , value: r
    }) : e[t] = r
    , nm = (e, t) => {
        for (var r in t || (t = {})) tm.call(t, r) && na(e, r, t[r]);
        if (ra)
            for (var r of ra(t)) rm.call(t, r) && na(e, r, t[r]);
        return e
    };
const om = {
    easeInSine: [.12, 0, .39, 0]
    , easeOutSine: [.61, 1, .88, 1]
    , easeInOutSine: [.37, 0, .63, 1]
    , easeInQuad: [.11, 0, .5, 0]
    , easeOutQuad: [.5, 1, .89, 1]
    , easeInOutQuad: [.45, 0, .55, 1]
    , easeInCubic: [.32, 0, .67, 0]
    , easeOutCubic: [.33, 1, .68, 1]
    , easeInOutCubic: [.65, 0, .35, 1]
    , easeInQuart: [.5, 0, .75, 0]
    , easeOutQuart: [.25, 1, .5, 1]
    , easeInOutQuart: [.76, 0, .24, 1]
    , easeInQuint: [.64, 0, .78, 0]
    , easeOutQuint: [.22, 1, .36, 1]
    , easeInOutQuint: [.83, 0, .17, 1]
    , easeInExpo: [.7, 0, .84, 0]
    , easeOutExpo: [.16, 1, .3, 1]
    , easeInOutExpo: [.87, 0, .13, 1]
    , easeInCirc: [.55, 0, 1, .45]
    , easeOutCirc: [0, .55, .45, 1]
    , easeInOutCirc: [.85, 0, .15, 1]
    , easeInBack: [.36, 0, .66, -.56]
    , easeOutBack: [.34, 1.56, .64, 1]
    , easeInOutBack: [.68, -.6, .32, 1.6]
};
nm({
    linear: Dg
}, om);

function sm(e, t, r, n = {}) {
    var o, s, i;
    const {
        clone: l = !1
        , passive: a = !1
        , eventName: c
        , deep: u = !1
        , defaultValue: d
    } = n, f = Ao(), g = r || (f == null ? void 0 : f.emit) || ((o = f == null ? void 0 : f.$emit) == null ? void 0 : o.bind(f)) || ((i = (s = f == null ? void 0 : f.proxy) == null ? void 0 : s.$emit) == null ? void 0 : i.bind(f == null ? void 0 : f.proxy));
    let b = c;
    t || (t = "modelValue"), b = c || b || `update:${t.toString()}`;
    const y = w => l ? Bg(l) ? l(w) : Zg(w) : w
        , x = () => Hg(e[t]) ? y(e[t]) : d;
    if (a) {
        const w = x()
            , k = q(w);
        return Or(() => e[t], T => k.value = y(T)), Or(k, T => {
            (T !== e[t] || u) && g(b, T)
        }, {
            deep: u
        }), k
    } else return ne({
        get() {
            return x()
        }
        , set(w) {
            g(b, w)
        }
    })
}
var im = typeof global == "object" && global && global.Object === Object && global;
const lm = im;
var am = typeof self == "object" && self && self.Object === Object && self
    , cm = lm || am || Function("return this")();
const gi = cm;
var um = gi.Symbol;
const Xt = um;
var gu = Object.prototype
    , dm = gu.hasOwnProperty
    , fm = gu.toString
    , Qr = Xt ? Xt.toStringTag : void 0;

function pm(e) {
    var t = dm.call(e, Qr)
        , r = e[Qr];
    try {
        e[Qr] = void 0;
        var n = !0
    } catch { }
    var o = fm.call(e);
    return n && (t ? e[Qr] = r : delete e[Qr]), o
}
var hm = Object.prototype
    , gm = hm.toString;

function mm(e) {
    return gm.call(e)
}
var bm = "[object Null]"
    , ym = "[object Undefined]"
    , oa = Xt ? Xt.toStringTag : void 0;

function mi(e) {
    return e == null ? e === void 0 ? ym : bm : oa && oa in Object(e) ? pm(e) : mm(e)
}

function bi(e) {
    return e != null && typeof e == "object"
}
var vm = "[object Symbol]";

function yi(e) {
    return typeof e == "symbol" || bi(e) && mi(e) == vm
}

function _m(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n;) o[r] = t(e[r], r, e);
    return o
}
var wm = Array.isArray;
const On = wm;
var xm = 1 / 0
    , sa = Xt ? Xt.prototype : void 0
    , ia = sa ? sa.toString : void 0;

function mu(e) {
    if (typeof e == "string") return e;
    if (On(e)) return _m(e, mu) + "";
    if (yi(e)) return ia ? ia.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -xm ? "-0" : t
}

function fo(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function")
}

function km(e) {
    return e
}
var Sm = "[object AsyncFunction]"
    , Em = "[object Function]"
    , Cm = "[object GeneratorFunction]"
    , Tm = "[object Proxy]";

function Rm(e) {
    if (!fo(e)) return !1;
    var t = mi(e);
    return t == Em || t == Cm || t == Sm || t == Tm
}
var $m = gi["__core-js_shared__"];
const is = $m;
var la = function() {
    var e = /[^.]+$/.exec(is && is.keys && is.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : ""
}();

function Am(e) {
    return !!la && la in e
}
var Om = Function.prototype
    , Pm = Om.toString;

function Nm(e) {
    if (e != null) {
        try {
            return Pm.call(e)
        } catch { }
        try {
            return e + ""
        } catch { }
    }
    return ""
}
var Fm = /[\\^$.*+?()[\]{}|]/g
    , Im = /^\[object .+?Constructor\]$/
    , Lm = Function.prototype
    , Mm = Object.prototype
    , jm = Lm.toString
    , zm = Mm.hasOwnProperty
    , Hm = RegExp("^" + jm.call(zm)
        .replace(Fm, "\\$&")
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

function Bm(e) {
    if (!fo(e) || Am(e)) return !1;
    var t = Rm(e) ? Hm : Im;
    return t.test(Nm(e))
}

function Dm(e, t) {
    return e == null ? void 0 : e[t]
}

function vi(e, t) {
    var r = Dm(e, t);
    return Bm(r) ? r : void 0
}

function Um(e, t, r) {
    switch (r.length) {
        case 0:
            return e.call(t);
        case 1:
            return e.call(t, r[0]);
        case 2:
            return e.call(t, r[0], r[1]);
        case 3:
            return e.call(t, r[0], r[1], r[2])
    }
    return e.apply(t, r)
}
var Vm = 800
    , qm = 16
    , Wm = Date.now;

function Km(e) {
    var t = 0
        , r = 0;
    return function() {
        var n = Wm()
            , o = qm - (n - r);
        if (r = n, o > 0) {
            if (++t >= Vm) return arguments[0]
        } else t = 0;
        return e.apply(void 0, arguments)
    }
}

function Gm(e) {
    return function() {
        return e
    }
}
var Jm = function() {
    try {
        var e = vi(Object, "defineProperty");
        return e({}, "", {}), e
    } catch { }
}();
const po = Jm;
var Qm = po ? function(e, t) {
    return po(e, "toString", {
        configurable: !0
        , enumerable: !1
        , value: Gm(t)
        , writable: !0
    })
} : km;
const Xm = Qm;
var Ym = Km(Xm);
const Zm = Ym;
var e0 = 9007199254740991
    , t0 = /^(?:0|[1-9]\d*)$/;

function bu(e, t) {
    var r = typeof e;
    return t = t ?? e0, !!t && (r == "number" || r != "symbol" && t0.test(e)) && e > -1 && e % 1 == 0 && e < t
}

function r0(e, t, r) {
    t == "__proto__" && po ? po(e, t, {
        configurable: !0
        , enumerable: !0
        , value: r
        , writable: !0
    }) : e[t] = r
}

function yu(e, t) {
    return e === t || e !== e && t !== t
}
var n0 = Object.prototype
    , o0 = n0.hasOwnProperty;

function s0(e, t, r) {
    var n = e[t];
    (!(o0.call(e, t) && yu(n, r)) || r === void 0 && !(t in e)) && r0(e, t, r)
}
var aa = Math.max;

function i0(e, t, r) {
    return t = aa(t === void 0 ? e.length - 1 : t, 0)
        , function() {
            for (var n = arguments, o = -1, s = aa(n.length - t, 0), i = Array(s); ++o < s;) i[o] = n[t + o];
            o = -1;
            for (var l = Array(t + 1); ++o < t;) l[o] = n[o];
            return l[t] = r(i), Um(e, this, l)
        }
}
var l0 = 9007199254740991;

function a0(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= l0
}
var c0 = "[object Arguments]";

function ca(e) {
    return bi(e) && mi(e) == c0
}
var vu = Object.prototype
    , u0 = vu.hasOwnProperty
    , d0 = vu.propertyIsEnumerable
    , f0 = ca(function() {
        return arguments
    }()) ? ca : function(e) {
        return bi(e) && u0.call(e, "callee") && !d0.call(e, "callee")
    };
const _u = f0;
var p0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
    , h0 = /^\w*$/;

function g0(e, t) {
    if (On(e)) return !1;
    var r = typeof e;
    return r == "number" || r == "symbol" || r == "boolean" || e == null || yi(e) ? !0 : h0.test(e) || !p0.test(e) || t != null && e in Object(t)
}
var m0 = vi(Object, "create");
const _n = m0;

function b0() {
    this.__data__ = _n ? _n(null) : {}, this.size = 0
}

function y0(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t
}
var v0 = "__lodash_hash_undefined__"
    , _0 = Object.prototype
    , w0 = _0.hasOwnProperty;

function x0(e) {
    var t = this.__data__;
    if (_n) {
        var r = t[e];
        return r === v0 ? void 0 : r
    }
    return w0.call(t, e) ? t[e] : void 0
}
var k0 = Object.prototype
    , S0 = k0.hasOwnProperty;

function E0(e) {
    var t = this.__data__;
    return _n ? t[e] !== void 0 : S0.call(t, e)
}
var C0 = "__lodash_hash_undefined__";

function T0(e, t) {
    var r = this.__data__;
    return this.size += this.has(e) ? 0 : 1, r[e] = _n && t === void 0 ? C0 : t, this
}

function mr(e) {
    var t = -1
        , r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
        var n = e[t];
        this.set(n[0], n[1])
    }
}
mr.prototype.clear = b0;
mr.prototype.delete = y0;
mr.prototype.get = x0;
mr.prototype.has = E0;
mr.prototype.set = T0;

function R0() {
    this.__data__ = [], this.size = 0
}

function Fo(e, t) {
    for (var r = e.length; r--;)
        if (yu(e[r][0], t)) return r;
    return -1
}
var $0 = Array.prototype
    , A0 = $0.splice;

function O0(e) {
    var t = this.__data__
        , r = Fo(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : A0.call(t, r, 1), --this.size, !0
}

function P0(e) {
    var t = this.__data__
        , r = Fo(t, e);
    return r < 0 ? void 0 : t[r][1]
}

function N0(e) {
    return Fo(this.__data__, e) > -1
}

function F0(e, t) {
    var r = this.__data__
        , n = Fo(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this
}

function Hr(e) {
    var t = -1
        , r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
        var n = e[t];
        this.set(n[0], n[1])
    }
}
Hr.prototype.clear = R0;
Hr.prototype.delete = O0;
Hr.prototype.get = P0;
Hr.prototype.has = N0;
Hr.prototype.set = F0;
var I0 = vi(gi, "Map");
const L0 = I0;

function M0() {
    this.size = 0, this.__data__ = {
        hash: new mr
        , map: new (L0 || Hr)
        , string: new mr
    }
}

function j0(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
}

function Io(e, t) {
    var r = e.__data__;
    return j0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map
}

function z0(e) {
    var t = Io(this, e)
        .delete(e);
    return this.size -= t ? 1 : 0, t
}

function H0(e) {
    return Io(this, e)
        .get(e)
}

function B0(e) {
    return Io(this, e)
        .has(e)
}

function D0(e, t) {
    var r = Io(this, e)
        , n = r.size;
    return r.set(e, t), this.size += r.size == n ? 0 : 1, this
}

function wr(e) {
    var t = -1
        , r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r;) {
        var n = e[t];
        this.set(n[0], n[1])
    }
}
wr.prototype.clear = M0;
wr.prototype.delete = z0;
wr.prototype.get = H0;
wr.prototype.has = B0;
wr.prototype.set = D0;
var U0 = "Expected a function";

function _i(e, t) {
    if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(U0);
    var r = function() {
        var n = arguments
            , o = t ? t.apply(this, n) : n[0]
            , s = r.cache;
        if (s.has(o)) return s.get(o);
        var i = e.apply(this, n);
        return r.cache = s.set(o, i) || s, i
    };
    return r.cache = new (_i.Cache || wr), r
}
_i.Cache = wr;
var V0 = 500;

function q0(e) {
    var t = _i(e, function(n) {
        return r.size === V0 && r.clear(), n
    })
        , r = t.cache;
    return t
}
var W0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
    , K0 = /\\(\\)?/g
    , G0 = q0(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(W0, function(r, n, o, s) {
            t.push(o ? s.replace(K0, "$1") : n || r)
        }), t
    });
const J0 = G0;

function Q0(e) {
    return e == null ? "" : mu(e)
}

function Lo(e, t) {
    return On(e) ? e : g0(e, t) ? [e] : J0(Q0(e))
}
var X0 = 1 / 0;

function wi(e) {
    if (typeof e == "string" || yi(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -X0 ? "-0" : t
}

function Y0(e, t) {
    t = Lo(t, e);
    for (var r = 0, n = t.length; e != null && r < n;) e = e[wi(t[r++])];
    return r && r == n ? e : void 0
}

function Z0(e, t) {
    for (var r = -1, n = t.length, o = e.length; ++r < n;) e[o + r] = t[r];
    return e
}
var ua = Xt ? Xt.isConcatSpreadable : void 0;

function eb(e) {
    return On(e) || _u(e) || !!(ua && e && e[ua])
}

function wu(e, t, r, n, o) {
    var s = -1
        , i = e.length;
    for (r || (r = eb), o || (o = []); ++s < i;) {
        var l = e[s];
        t > 0 && r(l) ? t > 1 ? wu(l, t - 1, r, n, o) : Z0(o, l) : n || (o[o.length] = l)
    }
    return o
}

function tb(e) {
    var t = e == null ? 0 : e.length;
    return t ? wu(e, 1) : []
}

function rb(e) {
    return Zm(i0(e, void 0, tb), e + "")
}

function nb(e, t) {
    return e != null && t in Object(e)
}

function ob(e, t, r) {
    t = Lo(t, e);
    for (var n = -1, o = t.length, s = !1; ++n < o;) {
        var i = wi(t[n]);
        if (!(s = e != null && r(e, i))) break;
        e = e[i]
    }
    return s || ++n != o ? s : (o = e == null ? 0 : e.length, !!o && a0(o) && bu(i, o) && (On(e) || _u(e)))
}

function sb(e, t) {
    return e != null && ob(e, t, nb)
}

function ib(e, t, r, n) {
    if (!fo(e)) return e;
    t = Lo(t, e);
    for (var o = -1, s = t.length, i = s - 1, l = e; l != null && ++o < s;) {
        var a = wi(t[o])
            , c = r;
        if (a === "__proto__" || a === "constructor" || a === "prototype") return e;
        if (o != i) {
            var u = l[a];
            c = n ? n(u, a, l) : void 0, c === void 0 && (c = fo(u) ? u : bu(t[o + 1]) ? [] : {})
        }
        s0(l, a, c), l = l[a]
    }
    return e
}

function lb(e, t, r) {
    for (var n = -1, o = t.length, s = {}; ++n < o;) {
        var i = t[n]
            , l = Y0(e, i);
        r(l, i) && ib(s, Lo(i, e), l)
    }
    return s
}

function ab(e, t) {
    return lb(e, t, function(r, n) {
        return sb(e, n)
    })
}
rb(function(e, t) {
    return e == null ? {} : ab(e, t)
});
new Date()
    .getFullYear();
const cb = {
    class: "container flex flex-wrap justify-between items-center mx-auto"
}
    , ub = m("span", {
        class: "sr-only"
    }, "Open main menu", -1)
    , db = m("svg", {
        "aria-hidden": "true"
        , class: "w-6 h-6"
        , fill: "currentColor"
        , viewBox: "0 0 20 20"
        , xmlns: "http://www.w3.org/2000/svg"
    }, [m("path", {
        "clip-rule": "evenodd"
        , d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        , "fill-rule": "evenodd"
    })], -1)
    , fb = {
        key: 0
        , class: "hidden md:order-2 md:flex"
    }
    , pb = " border-gray-200"
    , hb = "fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
    , gb = "rounded"
    , mb = "p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    , bb = "bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900"
    , yb = De({
        __name: "FwbNavbar"
        , props: {
            class: {
                type: String
                , default: ""
            }
            , sticky: {
                type: Boolean
                , default: !1
            }
            , rounded: {
                type: Boolean
                , default: !1
            }
            , solid: {
                type: Boolean
                , default: !1
            }
        }
        , setup(e) {
            const t = e
                , r = ii()
                , n = hu(pu)
                    .smaller("md")
                , o = q(!1)
                , s = Kg(o)
                , i = ne(() => Os([pb, t.sticky ? hb : "", t.rounded ? gb : "", t.solid ? mb : bb, t.class].join(" ")))
                , l = ne(() => n ? o.value : !0);
            return (a, c) => (M(), J("nav", {
                class: ve(i.value)
            }, [m("div", cb, [Oe(a.$slots, "logo"), m("button", {
                "aria-controls": "navbar-default"
                , "aria-expanded": "false"
                , class: "inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                , type: "button"
                , onClick: c[0] || (c[0] = u => v(s)())
            }, [ub, Oe(a.$slots, "menu-icon", {}, () => [db])]), Oe(a.$slots, "default", {
                isShowMenu: l.value
            }), v(r)["right-side"] ? (M(), J("div", fb, [Oe(a.$slots, "right-side")])) : Ye("", !0)])], 2))
        }
    })
    , vb = "w-full md:block md:w-auto"
    , _b = "flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
    , wb = "bg-gray-50"
    , xb = De({
        __name: "FwbNavbarCollapse"
        , props: {
            isShowMenu: {
                type: Boolean
                , default: !1
            }
        }
        , setup(e) {
            const t = e
                , r = hu(pu)
                    .smaller("md")
                , n = ne(() => Ps(vb, t.isShowMenu ? "" : "hidden"))
                , o = ne(() => Ps(_b, r.value ? wb : ""));
            return (s, i) => (M(), J("div", {
                class: ve(n.value)
            }, [m("ul", {
                class: ve(o.value)
            }, [Oe(s.$slots, "default")], 2)], 2))
        }
    })
    , kb = "bg-blue-700 md:bg-transparent text-white md:text-blue-700 dark:text-white"
    , Sb = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    , Eb = "block py-2 pr-4 pl-3 rounded md:p-0"
    , ls = De({
        __name: "FwbNavbarLink"
        , props: {
            link: {
                default: "/"
            }
            , isActive: {
                type: Boolean
                , default: !1
            }
            , component: {
                default: "a"
            }
            , linkAttr: {
                default: "href"
            }
            , disabled: {
                type: Boolean
                , default: !1
            }
        }
        , emits: ["click"]
        , setup(e, {
            emit: t
        }) {
            const r = e
                , n = ne(() => r.component !== "a" ? gr(r.component) : "a")
                , o = Qt(Eb, r.isActive ? kb : Sb)
                , s = i => {
                    r.disabled || t("click", i)
                };
            return (i, l) => (M(), J("li", null, [(M(), We(Rn(n.value), wo({
                [i.linkAttr || ""]: i.link
                , class: v(o)
                , onClick: s
            }), {
                default: le(() => [Oe(i.$slots, "default")])
                , _: 3
            }, 16, ["class"]))]))
        }
    })
    , Cb = ["src", "alt"]
    , Tb = {
        class: "self-center text-xl font-semibold whitespace-nowrap dark:text-white"
    }
    , Rb = De({
        __name: "FwbNavbarLogo"
        , props: {
            link: {
                default: "/"
            }
            , imageUrl: {
                default: "/assets/logo.svg"
            }
            , alt: {
                default: "Logo"
            }
            , component: {
                default: "a"
            }
            , linkAttr: {
                default: "href"
            }
        }
        , setup(e) {
            const t = e
                , r = ne(() => t.component !== "a" ? gr(t.component) : "a");
            return (n, o) => (M(), We(Rn(r.value), wo({
                class: "flex items-center"
                , [n.linkAttr || ""]: n.link
            }), {
                default: le(() => [m("img", {
                    src: n.imageUrl
                    , alt: n.alt
                    , class: "mr-3 h-6 sm:h-10"
                }, null, 8, Cb), m("span", Tb, [Oe(n.$slots, "default")])])
                , _: 3
            }, 16))
        }
    });

function at(e) {
    return e.split("-")[1]
}

function xi(e) {
    return e === "y" ? "height" : "width"
}

function bt(e) {
    return e.split("-")[0]
}

function Br(e) {
    return ["top", "bottom"].includes(bt(e)) ? "x" : "y"
}

function da(e, t, r) {
    let {
        reference: n
        , floating: o
    } = e;
    const s = n.x + n.width / 2 - o.width / 2
        , i = n.y + n.height / 2 - o.height / 2
        , l = Br(t)
        , a = xi(l)
        , c = n[a] / 2 - o[a] / 2
        , u = l === "x";
    let d;
    switch (bt(t)) {
        case "top":
            d = {
                x: s
                , y: n.y - o.height
            };
            break;
        case "bottom":
            d = {
                x: s
                , y: n.y + n.height
            };
            break;
        case "right":
            d = {
                x: n.x + n.width
                , y: i
            };
            break;
        case "left":
            d = {
                x: n.x - o.width
                , y: i
            };
            break;
        default:
            d = {
                x: n.x
                , y: n.y
            }
    }
    switch (at(t)) {
        case "start":
            d[l] -= c * (r && u ? -1 : 1);
            break;
        case "end":
            d[l] += c * (r && u ? -1 : 1)
    }
    return d
}
const $b = async (e, t, r) => {
    const {
        placement: n = "bottom"
        , strategy: o = "absolute"
        , middleware: s = []
        , platform: i
    } = r, l = s.filter(Boolean), a = await (i.isRTL == null ? void 0 : i.isRTL(t));
    let c = await i.getElementRects({
        reference: e
        , floating: t
        , strategy: o
    })
        , {
            x: u
            , y: d
        } = da(c, n, a)
        , f = n
        , g = {}
        , b = 0;
    for (let y = 0; y < l.length; y++) {
        const {
            name: x
            , fn: w
        } = l[y], {
            x: k
            , y: T
            , data: j
            , reset: D
        } = await w({
            x: u
            , y: d
            , initialPlacement: n
            , placement: f
            , strategy: o
            , middlewareData: g
            , rects: c
            , platform: i
            , elements: {
                reference: e
                , floating: t
            }
        });
        u = k ?? u, d = T ?? d, g = {
            ...g
            , [x]: {
                ...g[x]
                , ...j
            }
        }, D && b <= 50 && (b++, typeof D == "object" && (D.placement && (f = D.placement), D.rects && (c = D.rects === !0 ? await i.getElementRects({
            reference: e
            , floating: t
            , strategy: o
        }) : D.rects), {
            x: u
            , y: d
        } = da(c, f, a)), y = -1)
    }
    return {
        x: u
        , y: d
        , placement: f
        , strategy: o
        , middlewareData: g
    }
};

function xr(e, t) {
    return typeof e == "function" ? e(t) : e
}

function xu(e) {
    return typeof e != "number" ? function(t) {
        return {
            top: 0
            , right: 0
            , bottom: 0
            , left: 0
            , ...t
        }
    }(e) : {
        top: e
        , right: e
        , bottom: e
        , left: e
    }
}

function ln(e) {
    return {
        ...e
        , top: e.y
        , left: e.x
        , right: e.x + e.width
        , bottom: e.y + e.height
    }
}
async function Mo(e, t) {
    var r;
    t === void 0 && (t = {});
    const {
        x: n
        , y: o
        , platform: s
        , rects: i
        , elements: l
        , strategy: a
    } = e, {
        boundary: c = "clippingAncestors"
        , rootBoundary: u = "viewport"
        , elementContext: d = "floating"
        , altBoundary: f = !1
        , padding: g = 0
    } = xr(t, e), b = xu(g), y = l[f ? d === "floating" ? "reference" : "floating" : d], x = ln(await s.getClippingRect({
        element: (r = await (s.isElement == null ? void 0 : s.isElement(y))) == null || r ? y : y.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating))
        , boundary: c
        , rootBoundary: u
        , strategy: a
    })), w = d === "floating" ? {
        ...i.floating
        , x: n
        , y: o
    } : i.reference, k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), T = await (s.isElement == null ? void 0 : s.isElement(k)) && await (s.getScale == null ? void 0 : s.getScale(k)) || {
        x: 1
        , y: 1
    }, j = ln(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: w
        , offsetParent: k
        , strategy: a
    }) : w);
    return {
        top: (x.top - j.top + b.top) / T.y
        , bottom: (j.bottom - x.bottom + b.bottom) / T.y
        , left: (x.left - j.left + b.left) / T.x
        , right: (j.right - x.right + b.right) / T.x
    }
}
const wn = Math.min
    , or = Math.max;

function Ns(e, t, r) {
    return or(e, wn(t, r))
}
const Ab = e => ({
    name: "arrow"
    , options: e
    , async fn(t) {
        const {
            x: r
            , y: n
            , placement: o
            , rects: s
            , platform: i
            , elements: l
        } = t, {
            element: a
            , padding: c = 0
        } = xr(e, t) || {};
        if (a == null) return {};
        const u = xu(c)
            , d = {
                x: r
                , y: n
            }
            , f = Br(o)
            , g = xi(f)
            , b = await i.getDimensions(a)
            , y = f === "y"
            , x = y ? "top" : "left"
            , w = y ? "bottom" : "right"
            , k = y ? "clientHeight" : "clientWidth"
            , T = s.reference[g] + s.reference[f] - d[f] - s.floating[g]
            , j = d[f] - s.reference[f]
            , D = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a));
        let $ = D ? D[k] : 0;
        $ && await (i.isElement == null ? void 0 : i.isElement(D)) || ($ = l.floating[k] || s.floating[g]);
        const Q = T / 2 - j / 2
            , V = $ / 2 - b[g] / 2 - 1
            , oe = wn(u[x], V)
            , W = wn(u[w], V)
            , te = oe
            , A = $ - b[g] - W
            , U = $ / 2 - b[g] / 2 + Q
            , de = Ns(te, U, A)
            , we = at(o) != null && U != de && s.reference[g] / 2 - (U < te ? oe : W) - b[g] / 2 < 0 ? U < te ? te - U : A - U : 0;
        return {
            [f]: d[f] - we
            , data: {
                [f]: de
                , centerOffset: U - de + we
            }
        }
    }
})
    , Ob = ["top", "right", "bottom", "left"]
    , fa = Ob.reduce((e, t) => e.concat(t, t + "-start", t + "-end"), [])
    , Pb = {
        left: "right"
        , right: "left"
        , bottom: "top"
        , top: "bottom"
    };

function ho(e) {
    return e.replace(/left|right|bottom|top/g, t => Pb[t])
}

function ku(e, t, r) {
    r === void 0 && (r = !1);
    const n = at(e)
        , o = Br(e)
        , s = xi(o);
    let i = o === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
    return t.reference[s] > t.floating[s] && (i = ho(i)), {
        main: i
        , cross: ho(i)
    }
}
const Nb = {
    start: "end"
    , end: "start"
};

function Yn(e) {
    return e.replace(/start|end/g, t => Nb[t])
}
const Fb = function(e) {
    return e === void 0 && (e = {}), {
        name: "autoPlacement"
        , options: e
        , async fn(t) {
            var r, n, o;
            const {
                rects: s
                , middlewareData: i
                , placement: l
                , platform: a
                , elements: c
            } = t, {
                crossAxis: u = !1
                , alignment: d
                , allowedPlacements: f = fa
                , autoAlignment: g = !0
                , ...b
            } = xr(e, t), y = d !== void 0 || f === fa ? function(W, te, A) {
                return (W ? [...A.filter(U => at(U) === W), ...A.filter(U => at(U) !== W)] : A.filter(U => bt(U) === U))
                    .filter(U => !W || at(U) === W || !!te && Yn(U) !== U)
            }(d || null, g, f) : f, x = await Mo(t, b), w = ((r = i.autoPlacement) == null ? void 0 : r.index) || 0, k = y[w];
            if (k == null) return {};
            const {
                main: T
                , cross: j
            } = ku(k, s, await (a.isRTL == null ? void 0 : a.isRTL(c.floating)));
            if (l !== k) return {
                reset: {
                    placement: y[0]
                }
            };
            const D = [x[bt(k)], x[T], x[j]]
                , $ = [...((n = i.autoPlacement) == null ? void 0 : n.overflows) || [], {
                    placement: k
                    , overflows: D
                }]
                , Q = y[w + 1];
            if (Q) return {
                data: {
                    index: w + 1
                    , overflows: $
                }
                , reset: {
                    placement: Q
                }
            };
            const V = $.map(W => {
                const te = at(W.placement);
                return [W.placement, te && u ? W.overflows.slice(0, 2)
                    .reduce((A, U) => A + U, 0) : W.overflows[0], W.overflows
                ]
            })
                .sort((W, te) => W[1] - te[1])
                , oe = ((o = V.filter(W => W[2].slice(0, at(W[0]) ? 2 : 3)
                    .every(te => te <= 0))[0]) == null ? void 0 : o[0]) || V[0][0];
            return oe !== l ? {
                data: {
                    index: w + 1
                    , overflows: $
                }
                , reset: {
                    placement: oe
                }
            } : {}
        }
    }
}
    , Ib = function(e) {
        return e === void 0 && (e = {}), {
            name: "flip"
            , options: e
            , async fn(t) {
                var r;
                const {
                    placement: n
                    , middlewareData: o
                    , rects: s
                    , initialPlacement: i
                    , platform: l
                    , elements: a
                } = t, {
                    mainAxis: c = !0
                    , crossAxis: u = !0
                    , fallbackPlacements: d
                    , fallbackStrategy: f = "bestFit"
                    , fallbackAxisSideDirection: g = "none"
                    , flipAlignment: b = !0
                    , ...y
                } = xr(e, t), x = bt(n), w = bt(i) === i, k = await (l.isRTL == null ? void 0 : l.isRTL(a.floating)), T = d || (w || !b ? [ho(i)] : function(te) {
                    const A = ho(te);
                    return [Yn(te), A, Yn(A)]
                }(i));
                d || g === "none" || T.push(... function(te, A, U, de) {
                    const we = at(te);
                    let ie = function(z, ce, Te) {
                        const X = ["left", "right"]
                            , Re = ["right", "left"]
                            , Pe = ["top", "bottom"]
                            , Rt = ["bottom", "top"];
                        switch (z) {
                            case "top":
                            case "bottom":
                                return Te ? ce ? Re : X : ce ? X : Re;
                            case "left":
                            case "right":
                                return ce ? Pe : Rt;
                            default:
                                return []
                        }
                    }(bt(te), U === "start", de);
                    return we && (ie = ie.map(z => z + "-" + we), A && (ie = ie.concat(ie.map(Yn)))), ie
                }(i, b, g, k));
                const j = [i, ...T]
                    , D = await Mo(t, y)
                    , $ = [];
                let Q = ((r = o.flip) == null ? void 0 : r.overflows) || [];
                if (c && $.push(D[x]), u) {
                    const {
                        main: te
                        , cross: A
                    } = ku(n, s, k);
                    $.push(D[te], D[A])
                }
                if (Q = [...Q, {
                    placement: n
                    , overflows: $
                }], !$.every(te => te <= 0)) {
                    var V, oe;
                    const te = (((V = o.flip) == null ? void 0 : V.index) || 0) + 1
                        , A = j[te];
                    if (A) return {
                        data: {
                            index: te
                            , overflows: Q
                        }
                        , reset: {
                            placement: A
                        }
                    };
                    let U = (oe = Q.filter(de => de.overflows[0] <= 0)
                        .sort((de, we) => de.overflows[1] - we.overflows[1])[0]) == null ? void 0 : oe.placement;
                    if (!U) switch (f) {
                        case "bestFit": {
                            var W;
                            const de = (W = Q.map(we => [we.placement, we.overflows.filter(ie => ie > 0)
                                .reduce((ie, z) => ie + z, 0)
                            ])
                                .sort((we, ie) => we[1] - ie[1])[0]) == null ? void 0 : W[0];
                            de && (U = de);
                            break
                        }
                        case "initialPlacement":
                            U = i
                    }
                    if (n !== U) return {
                        reset: {
                            placement: U
                        }
                    }
                }
                return {}
            }
        }
    }
    , Lb = function(e) {
        return e === void 0 && (e = 0), {
            name: "offset"
            , options: e
            , async fn(t) {
                const {
                    x: r
                    , y: n
                } = t, o = await async function(s, i) {
                    const {
                        placement: l
                        , platform: a
                        , elements: c
                    } = s, u = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), d = bt(l), f = at(l), g = Br(l) === "x", b = ["left", "top"].includes(d) ? -1 : 1, y = u && g ? -1 : 1, x = xr(i, s);
                    let {
                        mainAxis: w
                        , crossAxis: k
                        , alignmentAxis: T
                    } = typeof x == "number" ? {
                        mainAxis: x
                        , crossAxis: 0
                        , alignmentAxis: null
                    } : {
                            mainAxis: 0
                            , crossAxis: 0
                            , alignmentAxis: null
                            , ...x
                        };
                    return f && typeof T == "number" && (k = f === "end" ? -1 * T : T), g ? {
                        x: k * y
                        , y: w * b
                    } : {
                        x: w * b
                        , y: k * y
                    }
                }(t, e);
                return {
                    x: r + o.x
                    , y: n + o.y
                    , data: o
                }
            }
        }
    };

function Mb(e) {
    return e === "x" ? "y" : "x"
}
const jb = function(e) {
    return e === void 0 && (e = {}), {
        name: "shift"
        , options: e
        , async fn(t) {
            const {
                x: r
                , y: n
                , placement: o
            } = t, {
                mainAxis: s = !0
                , crossAxis: i = !1
                , limiter: l = {
                    fn: x => {
                        let {
                            x: w
                            , y: k
                        } = x;
                        return {
                            x: w
                            , y: k
                        }
                    }
                }
                , ...a
            } = xr(e, t), c = {
                x: r
                , y: n
            }, u = await Mo(t, a), d = Br(bt(o)), f = Mb(d);
            let g = c[d]
                , b = c[f];
            if (s) {
                const x = d === "y" ? "bottom" : "right";
                g = Ns(g + u[d === "y" ? "top" : "left"], g, g - u[x])
            }
            if (i) {
                const x = f === "y" ? "bottom" : "right";
                b = Ns(b + u[f === "y" ? "top" : "left"], b, b - u[x])
            }
            const y = l.fn({
                ...t
                , [d]: g
                , [f]: b
            });
            return {
                ...y
                , data: {
                    x: y.x - r
                    , y: y.y - n
                }
            }
        }
    }
}
    , zb = function(e) {
        return e === void 0 && (e = {}), {
            name: "size"
            , options: e
            , async fn(t) {
                const {
                    placement: r
                    , rects: n
                    , platform: o
                    , elements: s
                } = t, {
                    apply: i = () => { }
                    , ...l
                } = xr(e, t), a = await Mo(t, l), c = bt(r), u = at(r), d = Br(r) === "x", {
                    width: f
                    , height: g
                } = n.floating;
                let b, y;
                c === "top" || c === "bottom" ? (b = c, y = u === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (y = c, b = u === "end" ? "top" : "bottom");
                const x = g - a[b]
                    , w = f - a[y]
                    , k = !t.middlewareData.shift;
                let T = x
                    , j = w;
                if (d) {
                    const $ = f - a.left - a.right;
                    j = u || k ? wn(w, $) : $
                } else {
                    const $ = g - a.top - a.bottom;
                    T = u || k ? wn(x, $) : $
                }
                if (k && !u) {
                    const $ = or(a.left, 0)
                        , Q = or(a.right, 0)
                        , V = or(a.top, 0)
                        , oe = or(a.bottom, 0);
                    d ? j = f - 2 * ($ !== 0 || Q !== 0 ? $ + Q : or(a.left, a.right)) : T = g - 2 * (V !== 0 || oe !== 0 ? V + oe : or(a.top, a.bottom))
                }
                await i({
                    ...t
                    , availableWidth: j
                    , availableHeight: T
                });
                const D = await o.getDimensions(s.floating);
                return f !== D.width || g !== D.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };

function et(e) {
    var t;
    return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}

function yt(e) {
    return et(e)
        .getComputedStyle(e)
}
const pa = Math.min
    , an = Math.max
    , go = Math.round;

function Su(e) {
    const t = yt(e);
    let r = parseFloat(t.width)
        , n = parseFloat(t.height);
    const o = e.offsetWidth
        , s = e.offsetHeight
        , i = go(r) !== o || go(n) !== s;
    return i && (r = o, n = s), {
        width: r
        , height: n
        , fallback: i
    }
}

function Yt(e) {
    return Cu(e) ? (e.nodeName || "")
        .toLowerCase() : ""
}
let qn;

function Eu() {
    if (qn) return qn;
    const e = navigator.userAgentData;
    return e && Array.isArray(e.brands) ? (qn = e.brands.map(t => t.brand + "/" + t.version)
        .join(" "), qn) : navigator.userAgent
}

function vt(e) {
    return e instanceof et(e)
        .HTMLElement
}

function Vt(e) {
    return e instanceof et(e)
        .Element
}

function Cu(e) {
    return e instanceof et(e)
        .Node
}

function ha(e) {
    return typeof ShadowRoot > "u" ? !1 : e instanceof et(e)
        .ShadowRoot || e instanceof ShadowRoot
}

function jo(e) {
    const {
        overflow: t
        , overflowX: r
        , overflowY: n
        , display: o
    } = yt(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !["inline", "contents"].includes(o)
}

function Hb(e) {
    return ["table", "td", "th"].includes(Yt(e))
}

function Fs(e) {
    const t = /firefox/i.test(Eu())
        , r = yt(e)
        , n = r.backdropFilter || r.WebkitBackdropFilter;
    return r.transform !== "none" || r.perspective !== "none" || !!n && n !== "none" || t && r.willChange === "filter" || t && !!r.filter && r.filter !== "none" || ["transform", "perspective"].some(o => r.willChange.includes(o)) || ["paint", "layout", "strict", "content"].some(o => {
        const s = r.contain;
        return s != null && s.includes(o)
    })
}

function Tu() {
    return !/^((?!chrome|android).)*safari/i.test(Eu())
}

function ki(e) {
    return ["html", "body", "#document"].includes(Yt(e))
}

function Ru(e) {
    return Vt(e) ? e : e.contextElement
}
const $u = {
    x: 1
    , y: 1
};

function Pr(e) {
    const t = Ru(e);
    if (!vt(t)) return $u;
    const r = t.getBoundingClientRect()
        , {
            width: n
            , height: o
            , fallback: s
        } = Su(t);
    let i = (s ? go(r.width) : r.width) / n
        , l = (s ? go(r.height) : r.height) / o;
    return i && Number.isFinite(i) || (i = 1), l && Number.isFinite(l) || (l = 1), {
        x: i
        , y: l
    }
}

function xn(e, t, r, n) {
    var o, s;
    t === void 0 && (t = !1), r === void 0 && (r = !1);
    const i = e.getBoundingClientRect()
        , l = Ru(e);
    let a = $u;
    t && (n ? Vt(n) && (a = Pr(n)) : a = Pr(e));
    const c = l ? et(l) : window
        , u = !Tu() && r;
    let d = (i.left + (u && ((o = c.visualViewport) == null ? void 0 : o.offsetLeft) || 0)) / a.x
        , f = (i.top + (u && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / a.y
        , g = i.width / a.x
        , b = i.height / a.y;
    if (l) {
        const y = et(l)
            , x = n && Vt(n) ? et(n) : n;
        let w = y.frameElement;
        for (; w && n && x !== y;) {
            const k = Pr(w)
                , T = w.getBoundingClientRect()
                , j = getComputedStyle(w);
            T.x += (w.clientLeft + parseFloat(j.paddingLeft)) * k.x, T.y += (w.clientTop + parseFloat(j.paddingTop)) * k.y, d *= k.x, f *= k.y, g *= k.x, b *= k.y, d += T.x, f += T.y, w = et(w)
                .frameElement
        }
    }
    return {
        width: g
        , height: b
        , top: f
        , right: d + g
        , bottom: f + b
        , left: d
        , x: d
        , y: f
    }
}

function qt(e) {
    return ((Cu(e) ? e.ownerDocument : e.document) || window.document)
        .documentElement
}

function zo(e) {
    return Vt(e) ? {
        scrollLeft: e.scrollLeft
        , scrollTop: e.scrollTop
    } : {
        scrollLeft: e.pageXOffset
        , scrollTop: e.pageYOffset
    }
}

function Au(e) {
    return xn(qt(e))
        .left + zo(e)
            .scrollLeft
}

function kn(e) {
    if (Yt(e) === "html") return e;
    const t = e.assignedSlot || e.parentNode || ha(e) && e.host || qt(e);
    return ha(t) ? t.host : t
}

function Ou(e) {
    const t = kn(e);
    return ki(t) ? t.ownerDocument.body : vt(t) && jo(t) ? t : Ou(t)
}

function mo(e, t) {
    var r;
    t === void 0 && (t = []);
    const n = Ou(e)
        , o = n === ((r = e.ownerDocument) == null ? void 0 : r.body)
        , s = et(n);
    return o ? t.concat(s, s.visualViewport || [], jo(n) ? n : []) : t.concat(n, mo(n))
}

function ga(e, t, r) {
    return t === "viewport" ? ln(function(n, o) {
        const s = et(n)
            , i = qt(n)
            , l = s.visualViewport;
        let a = i.clientWidth
            , c = i.clientHeight
            , u = 0
            , d = 0;
        if (l) {
            a = l.width, c = l.height;
            const f = Tu();
            (f || !f && o === "fixed") && (u = l.offsetLeft, d = l.offsetTop)
        }
        return {
            width: a
            , height: c
            , x: u
            , y: d
        }
    }(e, r)) : Vt(t) ? ln(function(n, o) {
        const s = xn(n, !0, o === "fixed")
            , i = s.top + n.clientTop
            , l = s.left + n.clientLeft
            , a = vt(n) ? Pr(n) : {
                x: 1
                , y: 1
            };
        return {
            width: n.clientWidth * a.x
            , height: n.clientHeight * a.y
            , x: l * a.x
            , y: i * a.y
        }
    }(t, r)) : ln(function(n) {
        const o = qt(n)
            , s = zo(n)
            , i = n.ownerDocument.body
            , l = an(o.scrollWidth, o.clientWidth, i.scrollWidth, i.clientWidth)
            , a = an(o.scrollHeight, o.clientHeight, i.scrollHeight, i.clientHeight);
        let c = -s.scrollLeft + Au(n);
        const u = -s.scrollTop;
        return yt(i)
            .direction === "rtl" && (c += an(o.clientWidth, i.clientWidth) - l), {
            width: l
            , height: a
            , x: c
            , y: u
        }
    }(qt(e)))
}

function ma(e) {
    return vt(e) && yt(e)
        .position !== "fixed" ? e.offsetParent : null
}

function ba(e) {
    const t = et(e);
    let r = ma(e);
    for (; r && Hb(r) && yt(r)
        .position === "static";) r = ma(r);
    return r && (Yt(r) === "html" || Yt(r) === "body" && yt(r)
        .position === "static" && !Fs(r)) ? t : r || function(n) {
            let o = kn(n);
            for (; vt(o) && !ki(o);) {
                if (Fs(o)) return o;
                o = kn(o)
            }
            return null
        }(e) || t
}

function Bb(e, t, r) {
    const n = vt(t)
        , o = qt(t)
        , s = xn(e, !0, r === "fixed", t);
    let i = {
        scrollLeft: 0
        , scrollTop: 0
    };
    const l = {
        x: 0
        , y: 0
    };
    if (n || !n && r !== "fixed")
        if ((Yt(t) !== "body" || jo(o)) && (i = zo(t)), vt(t)) {
            const a = xn(t, !0);
            l.x = a.x + t.clientLeft, l.y = a.y + t.clientTop
        } else o && (l.x = Au(o));
    return {
        x: s.left + i.scrollLeft - l.x
        , y: s.top + i.scrollTop - l.y
        , width: s.width
        , height: s.height
    }
}
const Db = {
    getClippingRect: function(e) {
        let {
            element: t
            , boundary: r
            , rootBoundary: n
            , strategy: o
        } = e;
        const s = r === "clippingAncestors" ? function(c, u) {
            const d = u.get(c);
            if (d) return d;
            let f = mo(c)
                .filter(x => Vt(x) && Yt(x) !== "body")
                , g = null;
            const b = yt(c)
                .position === "fixed";
            let y = b ? kn(c) : c;
            for (; Vt(y) && !ki(y);) {
                const x = yt(y)
                    , w = Fs(y);
                (b ? w || g : w || x.position !== "static" || !g || !["absolute", "fixed"].includes(g.position)) ? g = x : f = f.filter(k => k !== y), y = kn(y)
            }
            return u.set(c, f), f
        }(t, this._c) : [].concat(r)
            , i = [...s, n]
            , l = i[0]
            , a = i.reduce((c, u) => {
                const d = ga(t, u, o);
                return c.top = an(d.top, c.top), c.right = pa(d.right, c.right), c.bottom = pa(d.bottom, c.bottom), c.left = an(d.left, c.left), c
            }, ga(t, l, o));
        return {
            width: a.right - a.left
            , height: a.bottom - a.top
            , x: a.left
            , y: a.top
        }
    }
    , convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
        let {
            rect: t
            , offsetParent: r
            , strategy: n
        } = e;
        const o = vt(r)
            , s = qt(r);
        if (r === s) return t;
        let i = {
            scrollLeft: 0
            , scrollTop: 0
        }
            , l = {
                x: 1
                , y: 1
            };
        const a = {
            x: 0
            , y: 0
        };
        if ((o || !o && n !== "fixed") && ((Yt(r) !== "body" || jo(s)) && (i = zo(r)), vt(r))) {
            const c = xn(r);
            l = Pr(r), a.x = c.x + r.clientLeft, a.y = c.y + r.clientTop
        }
        return {
            width: t.width * l.x
            , height: t.height * l.y
            , x: t.x * l.x - i.scrollLeft * l.x + a.x
            , y: t.y * l.y - i.scrollTop * l.y + a.y
        }
    }
    , isElement: Vt
    , getDimensions: function(e) {
        return vt(e) ? Su(e) : e.getBoundingClientRect()
    }
    , getOffsetParent: ba
    , getDocumentElement: qt
    , getScale: Pr
    , async getElementRects(e) {
        let {
            reference: t
            , floating: r
            , strategy: n
        } = e;
        const o = this.getOffsetParent || ba
            , s = this.getDimensions;
        return {
            reference: Bb(t, await o(r), n)
            , floating: {
                x: 0
                , y: 0
                , ...await s(r)
            }
        }
    }
    , getClientRects: e => Array.from(e.getClientRects())
    , isRTL: e => yt(e)
        .direction === "rtl"
}
    , Ub = (e, t, r) => {
        const n = new Map
            , o = {
                platform: Db
                , ...r
            }
            , s = {
                ...o.platform
                , _c: n
            };
        return $b(e, t, {
            ...o
            , platform: s
        })
    }
    , pr = {
        disabled: !1
        , distance: 5
        , skidding: 0
        , container: "body"
        , boundary: void 0
        , instantMove: !1
        , disposeTimeout: 5e3
        , popperTriggers: []
        , strategy: "absolute"
        , preventOverflow: !0
        , flip: !0
        , shift: !0
        , overflowPadding: 0
        , arrowPadding: 0
        , arrowOverflow: !0
        , themes: {
            tooltip: {
                placement: "top"
                , triggers: ["hover", "focus", "touch"]
                , hideTriggers: e => [...e, "click"]
                , delay: {
                    show: 200
                    , hide: 0
                }
                , handleResize: !1
                , html: !1
                , loadingContent: "..."
            }
            , dropdown: {
                placement: "bottom"
                , triggers: ["click"]
                , delay: 0
                , handleResize: !0
                , autoHide: !0
            }
            , menu: {
                $extend: "dropdown"
                , triggers: ["hover", "focus"]
                , popperTriggers: ["hover", "focus"]
                , delay: {
                    show: 0
                    , hide: 400
                }
            }
        }
    };

function Is(e, t) {
    let r = pr.themes[e] || {}
        , n;
    do n = r[t], typeof n > "u" ? r.$extend ? r = pr.themes[r.$extend] || {} : (r = null, n = pr[t]) : r = null; while (r);
    return n
}

function Vb(e) {
    const t = [e];
    let r = pr.themes[e] || {};
    do r.$extend && !r.$resetCss ? (t.push(r.$extend), r = pr.themes[r.$extend] || {}) : r = null; while (r);
    return t.map(n => `v-popper--theme-${n}`)
}

function ya(e) {
    const t = [e];
    let r = pr.themes[e] || {};
    do r.$extend ? (t.push(r.$extend), r = pr.themes[r.$extend] || {}) : r = null; while (r);
    return t
}
let Mr = !1;
if (typeof window < "u") {
    Mr = !1;
    try {
        const e = Object.defineProperty({}, "passive", {
            get() {
                Mr = !0
            }
        });
        window.addEventListener("test", null, e)
    } catch { }
}
let Pu = !1;
typeof window < "u" && typeof navigator < "u" && (Pu = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const qb = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([t, `${t}-start`, `${t}-end`]), [])
    , va = {
        hover: "mouseenter"
        , focus: "focus"
        , click: "click"
        , touch: "touchstart"
        , pointer: "pointerdown"
    }
    , _a = {
        hover: "mouseleave"
        , focus: "blur"
        , click: "click"
        , touch: "touchend"
        , pointer: "pointerup"
    };

function wa(e, t) {
    const r = e.indexOf(t);
    r !== -1 && e.splice(r, 1)
}

function as() {
    return new Promise(e => requestAnimationFrame(() => {
        requestAnimationFrame(e)
    }))
}
const ct = [];
let nr = null;
const xa = {};

function ka(e) {
    let t = xa[e];
    return t || (t = xa[e] = []), t
}
let Ls = function() { };
typeof window < "u" && (Ls = window.Element);

function he(e) {
    return function(t) {
        return Is(t.theme, e)
    }
}
const cs = "__floating-vue__popper"
    , Nu = () => De({
        name: "VPopper"
        , provide() {
            return {
                [cs]: {
                    parentPopper: this
                }
            }
        }
        , inject: {
            [cs]: {
                default: null
            }
        }
        , props: {
            theme: {
                type: String
                , required: !0
            }
            , targetNodes: {
                type: Function
                , required: !0
            }
            , referenceNode: {
                type: Function
                , default: null
            }
            , popperNode: {
                type: Function
                , required: !0
            }
            , shown: {
                type: Boolean
                , default: !1
            }
            , showGroup: {
                type: String
                , default: null
            }
            , ariaId: {
                default: null
            }
            , disabled: {
                type: Boolean
                , default: he("disabled")
            }
            , positioningDisabled: {
                type: Boolean
                , default: he("positioningDisabled")
            }
            , placement: {
                type: String
                , default: he("placement")
                , validator: e => qb.includes(e)
            }
            , delay: {
                type: [String, Number, Object]
                , default: he("delay")
            }
            , distance: {
                type: [Number, String]
                , default: he("distance")
            }
            , skidding: {
                type: [Number, String]
                , default: he("skidding")
            }
            , triggers: {
                type: Array
                , default: he("triggers")
            }
            , showTriggers: {
                type: [Array, Function]
                , default: he("showTriggers")
            }
            , hideTriggers: {
                type: [Array, Function]
                , default: he("hideTriggers")
            }
            , popperTriggers: {
                type: Array
                , default: he("popperTriggers")
            }
            , popperShowTriggers: {
                type: [Array, Function]
                , default: he("popperShowTriggers")
            }
            , popperHideTriggers: {
                type: [Array, Function]
                , default: he("popperHideTriggers")
            }
            , container: {
                type: [String, Object, Ls, Boolean]
                , default: he("container")
            }
            , boundary: {
                type: [String, Ls]
                , default: he("boundary")
            }
            , strategy: {
                type: String
                , validator: e => ["absolute", "fixed"].includes(e)
                , default: he("strategy")
            }
            , autoHide: {
                type: [Boolean, Function]
                , default: he("autoHide")
            }
            , handleResize: {
                type: Boolean
                , default: he("handleResize")
            }
            , instantMove: {
                type: Boolean
                , default: he("instantMove")
            }
            , eagerMount: {
                type: Boolean
                , default: he("eagerMount")
            }
            , popperClass: {
                type: [String, Array, Object]
                , default: he("popperClass")
            }
            , computeTransformOrigin: {
                type: Boolean
                , default: he("computeTransformOrigin")
            }
            , autoMinSize: {
                type: Boolean
                , default: he("autoMinSize")
            }
            , autoSize: {
                type: [Boolean, String]
                , default: he("autoSize")
            }
            , autoMaxSize: {
                type: Boolean
                , default: he("autoMaxSize")
            }
            , autoBoundaryMaxSize: {
                type: Boolean
                , default: he("autoBoundaryMaxSize")
            }
            , preventOverflow: {
                type: Boolean
                , default: he("preventOverflow")
            }
            , overflowPadding: {
                type: [Number, String]
                , default: he("overflowPadding")
            }
            , arrowPadding: {
                type: [Number, String]
                , default: he("arrowPadding")
            }
            , arrowOverflow: {
                type: Boolean
                , default: he("arrowOverflow")
            }
            , flip: {
                type: Boolean
                , default: he("flip")
            }
            , shift: {
                type: Boolean
                , default: he("shift")
            }
            , shiftCrossAxis: {
                type: Boolean
                , default: he("shiftCrossAxis")
            }
            , noAutoFocus: {
                type: Boolean
                , default: he("noAutoFocus")
            }
            , disposeTimeout: {
                type: Number
                , default: he("disposeTimeout")
            }
        }
        , emits: ["show", "hide", "update:shown", "apply-show", "apply-hide", "close-group", "close-directive", "auto-hide", "resize", "dispose"]
        , data() {
            return {
                isShown: !1
                , isMounted: !1
                , skipTransition: !1
                , classes: {
                    showFrom: !1
                    , showTo: !1
                    , hideFrom: !1
                    , hideTo: !0
                }
                , result: {
                    x: 0
                    , y: 0
                    , placement: ""
                    , strategy: this.strategy
                    , arrow: {
                        x: 0
                        , y: 0
                        , centerOffset: 0
                    }
                    , transformOrigin: null
                }
                , shownChildren: new Set
                , lastAutoHide: !0
            }
        }
        , computed: {
            popperId() {
                return this.ariaId != null ? this.ariaId : this.randomId
            }
            , shouldMountContent() {
                return this.eagerMount || this.isMounted
            }
            , slotData() {
                return {
                    popperId: this.popperId
                    , isShown: this.isShown
                    , shouldMountContent: this.shouldMountContent
                    , skipTransition: this.skipTransition
                    , autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide
                    , show: this.show
                    , hide: this.hide
                    , handleResize: this.handleResize
                    , onResize: this.onResize
                    , classes: {
                        ...this.classes
                        , popperClass: this.popperClass
                    }
                    , result: this.positioningDisabled ? null : this.result
                    , attrs: this.$attrs
                }
            }
            , parentPopper() {
                var e;
                return (e = this[cs]) == null ? void 0 : e.parentPopper
            }
            , hasPopperShowTriggerHover() {
                var e, t;
                return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"))
            }
        }
        , watch: {
            shown: "$_autoShowHide"
            , disabled(e) {
                e ? this.dispose() : this.init()
            }
            , async container() {
                this.isShown && (this.$_ensureTeleport(), await this.$_computePosition())
            }
            , ...["triggers", "positioningDisabled"].reduce((e, t) => (e[t] = "$_refreshListeners", e), {})
            , ...["placement", "distance", "skidding", "boundary", "strategy", "overflowPadding", "arrowPadding", "preventOverflow", "shift", "shiftCrossAxis", "flip"].reduce((e, t) => (e[t] = "$_computePosition", e), {})
        }
        , created() {
            this.$_isDisposed = !0, this.randomId = `popper_${[Math.random(), Date.now()].map(e => e.toString(36).substring(2, 10)).join("_")}`, this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.")
        }
        , mounted() {
            this.init(), this.$_detachPopperNode()
        }
        , activated() {
            this.$_autoShowHide()
        }
        , deactivated() {
            this.hide()
        }
        , beforeUnmount() {
            this.dispose()
        }
        , methods: {
            show({
                event: e = null
                , skipDelay: t = !1
                , force: r = !1
            } = {}) {
                var n, o;
                (n = this.parentPopper) != null && n.lockedChild && this.parentPopper.lockedChild !== this || (this.$_pendingHide = !1, (r || !this.disabled) && (((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
                    this.$_showFrameLocked = !1
                })), this.$emit("update:shown", !0))
            }
            , hide({
                event: e = null
                , skipDelay: t = !1
            } = {}) {
                var r;
                if (!this.$_hideInProgress) {
                    if (this.shownChildren.size > 0) {
                        this.$_pendingHide = !0;
                        return
                    }
                    if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
                        this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
                            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({
                                skipDelay: t
                            }), this.parentPopper.lockedChild = null)
                        }, 1e3));
                        return
                    } ((r = this.parentPopper) == null ? void 0 : r.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1)
                }
            }
            , init() {
                var e;
                this.$_isDisposed && (this.$_isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes()
                    .filter(t => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show())
            }
            , dispose() {
                this.$_isDisposed || (this.$_isDisposed = !0, this.$_removeEventListeners(), this.hide({
                    skipDelay: !0
                }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"), this.$emit("dispose"))
            }
            , async onResize() {
                this.isShown && (await this.$_computePosition(), this.$emit("resize"))
            }
            , async $_computePosition() {
                if (this.$_isDisposed || this.positioningDisabled) return;
                const e = {
                    strategy: this.strategy
                    , middleware: []
                };
                (this.distance || this.skidding) && e.middleware.push(Lb({
                    mainAxis: this.distance
                    , crossAxis: this.skidding
                }));
                const t = this.placement.startsWith("auto");
                if (t ? e.middleware.push(Fb({
                    alignment: this.placement.split("-")[1] ?? ""
                })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(jb({
                    padding: this.overflowPadding
                    , boundary: this.boundary
                    , crossAxis: this.shiftCrossAxis
                })), !t && this.flip && e.middleware.push(Ib({
                    padding: this.overflowPadding
                    , boundary: this.boundary
                }))), e.middleware.push(Ab({
                    element: this.$_arrowNode
                    , padding: this.arrowPadding
                })), this.arrowOverflow && e.middleware.push({
                    name: "arrowOverflow"
                    , fn: ({
                        placement: n
                        , rects: o
                        , middlewareData: s
                    }) => {
                        let i;
                        const {
                            centerOffset: l
                        } = s.arrow;
                        return n.startsWith("top") || n.startsWith("bottom") ? i = Math.abs(l) > o.reference.width / 2 : i = Math.abs(l) > o.reference.height / 2, {
                            data: {
                                overflow: i
                            }
                        }
                    }
                }), this.autoMinSize || this.autoSize) {
                    const n = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
                    e.middleware.push({
                        name: "autoSize"
                        , fn: ({
                            rects: o
                            , placement: s
                            , middlewareData: i
                        }) => {
                            var l;
                            if ((l = i.autoSize) != null && l.skip) return {};
                            let a, c;
                            return s.startsWith("top") || s.startsWith("bottom") ? a = o.reference.width : c = o.reference.height, this.$_innerNode.style[n === "min" ? "minWidth" : n === "max" ? "maxWidth" : "width"] = a != null ? `${a}px` : null, this.$_innerNode.style[n === "min" ? "minHeight" : n === "max" ? "maxHeight" : "height"] = c != null ? `${c}px` : null, {
                                data: {
                                    skip: !0
                                }
                                , reset: {
                                    rects: !0
                                }
                            }
                        }
                    })
                } (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(zb({
                    boundary: this.boundary
                    , padding: this.overflowPadding
                    , apply: ({
                        availableWidth: n
                        , availableHeight: o
                    }) => {
                        this.$_innerNode.style.maxWidth = n != null ? `${n}px` : null, this.$_innerNode.style.maxHeight = o != null ? `${o}px` : null
                    }
                })));
                const r = await Ub(this.$_referenceNode, this.$_popperNode, e);
                Object.assign(this.result, {
                    x: r.x
                    , y: r.y
                    , placement: r.placement
                    , strategy: r.strategy
                    , arrow: {
                        ...r.middlewareData.arrow
                        , ...r.middlewareData.arrowOverflow
                    }
                })
            }
            , $_scheduleShow(e = null, t = !1) {
                if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), nr && this.instantMove && nr.instantMove && nr !== this.parentPopper) {
                    nr.$_applyHide(!0), this.$_applyShow(!0);
                    return
                }
                t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"))
            }
            , $_scheduleHide(e = null, t = !1) {
                if (this.shownChildren.size > 0) {
                    this.$_pendingHide = !0;
                    return
                }
                this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (nr = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"))
            }
            , $_computeDelay(e) {
                const t = this.delay;
                return parseInt(t && t[e] || t || 0)
            }
            , async $_applyShow(e = !1) {
                clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await as(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([...mo(this.$_referenceNode), ...mo(this.$_popperNode)], "scroll", () => {
                    this.$_computePosition()
                }))
            }
            , async $_applyShowEffect() {
                if (this.$_hideInProgress) return;
                if (this.computeTransformOrigin) {
                    const t = this.$_referenceNode.getBoundingClientRect()
                        , r = this.$_popperNode.querySelector(".v-popper__wrapper")
                        , n = r.parentNode.getBoundingClientRect()
                        , o = t.x + t.width / 2 - (n.left + r.offsetLeft)
                        , s = t.y + t.height / 2 - (n.top + r.offsetTop);
                    this.result.transformOrigin = `${o}px ${s}px`
                }
                this.isShown = !0, this.$_applyAttrsToTarget({
                    "aria-describedby": this.popperId
                    , "data-popper-shown": ""
                });
                const e = this.showGroup;
                if (e) {
                    let t;
                    for (let r = 0; r < ct.length; r++) t = ct[r], t.showGroup !== e && (t.hide(), t.$emit("close-group"))
                }
                ct.push(this), document.body.classList.add("v-popper--some-open");
                for (const t of ya(this.theme)) ka(t)
                    .push(this), document.body.classList.add(`v-popper--some-open--${t}`);
                this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await as(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus()
            }
            , async $_applyHide(e = !1) {
                if (this.shownChildren.size > 0) {
                    this.$_pendingHide = !0, this.$_hideInProgress = !1;
                    return
                }
                if (clearTimeout(this.$_scheduleTimer), !this.isShown) return;
                this.skipTransition = e, wa(ct, this), ct.length === 0 && document.body.classList.remove("v-popper--some-open");
                for (const r of ya(this.theme)) {
                    const n = ka(r);
                    wa(n, this), n.length === 0 && document.body.classList.remove(`v-popper--some-open--${r}`)
                }
                nr === this && (nr = null), this.isShown = !1, this.$_applyAttrsToTarget({
                    "aria-describedby": void 0
                    , "data-popper-shown": void 0
                }), clearTimeout(this.$_disposeTimer);
                const t = this.disposeTimeout;
                t !== null && (this.$_disposeTimer = setTimeout(() => {
                    this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1)
                }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await as(), this.classes.hideFrom = !1, this.classes.hideTo = !0
            }
            , $_autoShowHide() {
                this.shown ? this.show() : this.hide()
            }
            , $_ensureTeleport() {
                if (this.$_isDisposed) return;
                let e = this.container;
                if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e) throw new Error("No container for popover: " + this.container);
                e.appendChild(this.$_popperNode), this.isMounted = !0
            }
            , $_addEventListeners() {
                const e = r => {
                    this.isShown && !this.$_hideInProgress || (r.usedByTooltip = !0, !this.$_preventShow && this.show({
                        event: r
                    }))
                };
                this.$_registerTriggerListeners(this.$_targetNodes, va, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], va, this.popperTriggers, this.popperShowTriggers, e);
                const t = r => {
                    r.usedByTooltip || this.hide({
                        event: r
                    })
                };
                this.$_registerTriggerListeners(this.$_targetNodes, _a, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], _a, this.popperTriggers, this.popperHideTriggers, t)
            }
            , $_registerEventListeners(e, t, r) {
                this.$_events.push({
                    targetNodes: e
                    , eventType: t
                    , handler: r
                }), e.forEach(n => n.addEventListener(t, r, Mr ? {
                    passive: !0
                } : void 0))
            }
            , $_registerTriggerListeners(e, t, r, n, o) {
                let s = r;
                n != null && (s = typeof n == "function" ? n(s) : n), s.forEach(i => {
                    const l = t[i];
                    l && this.$_registerEventListeners(e, l, o)
                })
            }
            , $_removeEventListeners(e) {
                const t = [];
                this.$_events.forEach(r => {
                    const {
                        targetNodes: n
                        , eventType: o
                        , handler: s
                    } = r;
                    !e || e === o ? n.forEach(i => i.removeEventListener(o, s)) : t.push(r)
                }), this.$_events = t
            }
            , $_refreshListeners() {
                this.$_isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners())
            }
            , $_handleGlobalClose(e, t = !1) {
                this.$_showFrameLocked || (this.hide({
                    event: e
                }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
                    this.$_preventShow = !1
                }, 300)))
            }
            , $_detachPopperNode() {
                this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode)
            }
            , $_swapTargetAttrs(e, t) {
                for (const r of this.$_targetNodes) {
                    const n = r.getAttribute(e);
                    n && (r.removeAttribute(e), r.setAttribute(t, n))
                }
            }
            , $_applyAttrsToTarget(e) {
                for (const t of this.$_targetNodes)
                    for (const r in e) {
                        const n = e[r];
                        n == null ? t.removeAttribute(r) : t.setAttribute(r, n)
                    }
            }
            , $_updateParentShownChildren(e) {
                let t = this.parentPopper;
                for (; t;) e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.$_pendingHide && t.hide()), t = t.parentPopper
            }
            , $_isAimingPopper() {
                const e = this.$_referenceNode.getBoundingClientRect();
                if (cn >= e.left && cn <= e.right && un >= e.top && un <= e.bottom) {
                    const t = this.$_popperNode.getBoundingClientRect()
                        , r = cn - It
                        , n = un - Lt
                        , o = t.left + t.width / 2 - It + (t.top + t.height / 2) - Lt + t.width + t.height
                        , s = It + r * o
                        , i = Lt + n * o;
                    return Wn(It, Lt, s, i, t.left, t.top, t.left, t.bottom) || Wn(It, Lt, s, i, t.left, t.top, t.right, t.top) || Wn(It, Lt, s, i, t.right, t.top, t.right, t.bottom) || Wn(It, Lt, s, i, t.left, t.bottom, t.right, t.bottom)
                }
                return !1
            }
        }
        , render() {
            return this.$slots.default(this.slotData)
        }
    });
typeof document < "u" && typeof window < "u" && (Pu ? (document.addEventListener("touchstart", Sa, Mr ? {
    passive: !0
    , capture: !0
} : !0), document.addEventListener("touchend", Kb, Mr ? {
    passive: !0
    , capture: !0
} : !0)) : (window.addEventListener("mousedown", Sa, !0), window.addEventListener("click", Wb, !0)), window.addEventListener("resize", Qb));

function Sa(e) {
    for (let t = 0; t < ct.length; t++) {
        const r = ct[t];
        try {
            const n = r.popperNode();
            r.$_mouseDownContains = n.contains(e.target)
        } catch { }
    }
}

function Wb(e) {
    Fu(e)
}

function Kb(e) {
    Fu(e, !0)
}

function Fu(e, t = !1) {
    const r = {};
    for (let n = ct.length - 1; n >= 0; n--) {
        const o = ct[n];
        try {
            const s = o.$_containsGlobalTarget = Gb(o, e);
            o.$_pendingHide = !1, requestAnimationFrame(() => {
                if (o.$_pendingHide = !1, !r[o.randomId] && Ea(o, s, e)) {
                    if (o.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
                        let l = o.parentPopper;
                        for (; l;) r[l.randomId] = !0, l = l.parentPopper;
                        return
                    }
                    let i = o.parentPopper;
                    for (; i && Ea(i, i.$_containsGlobalTarget, e);) i.$_handleGlobalClose(e, t), i = i.parentPopper
                }
            })
        } catch { }
    }
}

function Gb(e, t) {
    const r = e.popperNode();
    return e.$_mouseDownContains || r.contains(t.target)
}

function Ea(e, t, r) {
    return r.closeAllPopover || r.closePopover && t || Jb(e, r) && !t
}

function Jb(e, t) {
    if (typeof e.autoHide == "function") {
        const r = e.autoHide(t);
        return e.lastAutoHide = r, r
    }
    return e.autoHide
}

function Qb(e) {
    for (let t = 0; t < ct.length; t++) ct[t].$_computePosition(e)
}
let It = 0
    , Lt = 0
    , cn = 0
    , un = 0;
typeof window < "u" && window.addEventListener("mousemove", e => {
    It = cn, Lt = un, cn = e.clientX, un = e.clientY
}, Mr ? {
    passive: !0
} : void 0);

function Wn(e, t, r, n, o, s, i, l) {
    const a = ((i - o) * (t - s) - (l - s) * (e - o)) / ((l - s) * (r - e) - (i - o) * (n - t))
        , c = ((r - e) * (t - s) - (n - t) * (e - o)) / ((l - s) * (r - e) - (i - o) * (n - t));
    return a >= 0 && a <= 1 && c >= 0 && c <= 1
}
const Xb = {
    extends: Nu()
}
    , Si = (e, t) => {
        const r = e.__vccOpts || e;
        for (const [n, o] of t) r[n] = o;
        return r
    };

function Yb(e, t, r, n, o, s) {
    return M(), J("div", {
        ref: "reference"
        , class: ve(["v-popper", {
            "v-popper--shown": e.slotData.isShown
        }])
    }, [Oe(e.$slots, "default", wo(zc(e.slotData)))], 2)
}
const Zb = Si(Xb, [
    ["render", Yb]
]);

function ey() {
    var e = window.navigator.userAgent
        , t = e.indexOf("MSIE ");
    if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
    var r = e.indexOf("Trident/");
    if (r > 0) {
        var n = e.indexOf("rv:");
        return parseInt(e.substring(n + 3, e.indexOf(".", n)), 10)
    }
    var o = e.indexOf("Edge/");
    return o > 0 ? parseInt(e.substring(o + 5, e.indexOf(".", o)), 10) : -1
}
let Zn;

function Ms() {
    Ms.init || (Ms.init = !0, Zn = ey() !== -1)
}
var Ho = {
    name: "ResizeObserver"
    , props: {
        emitOnMount: {
            type: Boolean
            , default: !1
        }
        , ignoreWidth: {
            type: Boolean
            , default: !1
        }
        , ignoreHeight: {
            type: Boolean
            , default: !1
        }
    }
    , emits: ["notify"]
    , mounted() {
        Ms(), Tn(() => {
            this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize()
        });
        const e = document.createElement("object");
        this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", Zn && this.$el.appendChild(e), e.data = "about:blank", Zn || this.$el.appendChild(e)
    }
    , beforeUnmount() {
        this.removeResizeHandlers()
    }
    , methods: {
        compareAndNotify() {
            (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize())
        }
        , emitSize() {
            this.$emit("notify", {
                width: this._w
                , height: this._h
            })
        }
        , addResizeHandlers() {
            this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify()
        }
        , removeResizeHandlers() {
            this._resizeObject && this._resizeObject.onload && (!Zn && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null)
        }
    }
};
const ty = tf();
Zd("data-v-b329ee4c");
const ry = {
    class: "resize-observer"
    , tabindex: "-1"
};
ef();
const ny = ty((e, t, r, n, o, s) => (M(), We("div", ry)));
Ho.render = ny;
Ho.__scopeId = "data-v-b329ee4c";
Ho.__file = "src/components/ResizeObserver.vue";
const Iu = (e = "theme") => ({
    computed: {
        themeClass() {
            return Vb(this[e])
        }
    }
})
    , oy = De({
        name: "VPopperContent"
        , components: {
            ResizeObserver: Ho
        }
        , mixins: [Iu()]
        , props: {
            popperId: String
            , theme: String
            , shown: Boolean
            , mounted: Boolean
            , skipTransition: Boolean
            , autoHide: Boolean
            , handleResize: Boolean
            , classes: Object
            , result: Object
        }
        , emits: ["hide", "resize"]
        , methods: {
            toPx(e) {
                return e != null && !isNaN(e) ? `${e}px` : null
            }
        }
    })
    , sy = ["id", "aria-hidden", "tabindex", "data-popper-placement"]
    , iy = {
        ref: "inner"
        , class: "v-popper__inner"
    }
    , ly = m("div", {
        class: "v-popper__arrow-outer"
    }, null, -1)
    , ay = m("div", {
        class: "v-popper__arrow-inner"
    }, null, -1)
    , cy = [ly, ay];

function uy(e, t, r, n, o, s) {
    const i = gr("ResizeObserver");
    return M(), J("div", {
        id: e.popperId
        , ref: "popover"
        , class: ve(["v-popper__popper", [e.themeClass, e.classes.popperClass, {
            "v-popper__popper--shown": e.shown
            , "v-popper__popper--hidden": !e.shown
            , "v-popper__popper--show-from": e.classes.showFrom
            , "v-popper__popper--show-to": e.classes.showTo
            , "v-popper__popper--hide-from": e.classes.hideFrom
            , "v-popper__popper--hide-to": e.classes.hideTo
            , "v-popper__popper--skip-transition": e.skipTransition
            , "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow
            , "v-popper__popper--no-positioning": !e.result
        }]])
        , style: ur(e.result ? {
            position: e.result.strategy
            , transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
        } : void 0)
        , "aria-hidden": e.shown ? "false" : "true"
        , tabindex: e.autoHide ? 0 : void 0
        , "data-popper-placement": e.result ? e.result.placement : void 0
        , onKeyup: t[2] || (t[2] = Op(l => e.autoHide && e.$emit("hide"), ["esc"]))
    }, [m("div", {
        class: "v-popper__backdrop"
        , onClick: t[0] || (t[0] = l => e.autoHide && e.$emit("hide"))
    }), m("div", {
        class: "v-popper__wrapper"
        , style: ur(e.result ? {
            transformOrigin: e.result.transformOrigin
        } : void 0)
    }, [m("div", iy, [e.mounted ? (M(), J(Ve, {
        key: 0
    }, [m("div", null, [Oe(e.$slots, "default")]), e.handleResize ? (M(), We(i, {
        key: 0
        , onNotify: t[1] || (t[1] = l => e.$emit("resize", l))
    })) : Ye("", !0)], 64)) : Ye("", !0)], 512), m("div", {
        ref: "arrow"
        , class: "v-popper__arrow-container"
        , style: ur(e.result ? {
            left: e.toPx(e.result.arrow.x)
            , top: e.toPx(e.result.arrow.y)
        } : void 0)
    }, cy, 4)], 4)], 46, sy)
}
const Lu = Si(oy, [
    ["render", uy]
])
    , Mu = {
        methods: {
            show(...e) {
                return this.$refs.popper.show(...e)
            }
            , hide(...e) {
                return this.$refs.popper.hide(...e)
            }
            , dispose(...e) {
                return this.$refs.popper.dispose(...e)
            }
            , onResize(...e) {
                return this.$refs.popper.onResize(...e)
            }
        }
    }
    , dy = De({
        name: "VPopperWrapper"
        , components: {
            Popper: Zb
            , PopperContent: Lu
        }
        , mixins: [Mu, Iu("finalTheme")]
        , props: {
            theme: {
                type: String
                , default: null
            }
        }
        , computed: {
            finalTheme() {
                return this.theme ?? this.$options.vPopperTheme
            }
        }
        , methods: {
            getTargetNodes() {
                return Array.from(this.$el.children)
                    .filter(e => e !== this.$refs.popperContent.$el)
            }
        }
    });

function fy(e, t, r, n, o, s) {
    const i = gr("PopperContent")
        , l = gr("Popper");
    return M(), We(l, {
        ref: "popper"
        , theme: e.finalTheme
        , "target-nodes": e.getTargetNodes
        , "popper-node": () => e.$refs.popperContent.$el
        , class: ve([e.themeClass])
    }, {
        default: le(({
            popperId: a
            , isShown: c
            , shouldMountContent: u
            , skipTransition: d
            , autoHide: f
            , show: g
            , hide: b
            , handleResize: y
            , onResize: x
            , classes: w
            , result: k
        }) => [Oe(e.$slots, "default", {
            shown: c
            , show: g
            , hide: b
        }), Z(i, {
            ref: "popperContent"
            , "popper-id": a
            , theme: e.finalTheme
            , shown: c
            , mounted: u
            , "skip-transition": d
            , "auto-hide": f
            , "handle-resize": y
            , classes: w
            , result: k
            , onHide: b
            , onResize: x
        }, {
            default: le(() => [Oe(e.$slots, "popper", {
                shown: c
                , hide: b
            })])
            , _: 2
        }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])])
        , _: 3
    }, 8, ["theme", "target-nodes", "popper-node", "class"])
}
const Ei = Si(dy, [
    ["render", fy]
]);
({
    ...Ei
});
({
    ...Ei
});
({
    ...Ei
});
Nu();
const Cr = {
    Success: "success"
    , Error: "error"
}
    , py = "block mb-2 text-sm font-medium"
    , hy = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    , gy = "cursor-not-allowed bg-gray-100"
    , my = {
        lg: "p-4"
        , md: "p-2.5 text-sm"
        , sm: "p-2 text-sm"
    }
    , by = "bg-green-50 border-green-500 dark:border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500"
    , yy = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

function vy(e) {
    const t = ne(() => {
        const n = e.validationStatus.value
            , o = n === Cr.Success ? by : n === Cr.Error ? yy : "";
        return Qt(hy, o, my[e.size.value], e.disabled.value ? gy : "")
    })
        , r = ne(() => {
            const n = e.validationStatus.value
                , o = n === Cr.Success ? "text-green-700 dark:text-green-500" : n === Cr.Error ? "text-red-700 dark:text-red-500" : "text-gray-900 dark:text-white";
            return Qt(py, o)
        });
    return {
        inputClasses: t
        , labelClasses: r
    }
}
const _y = {
    class: "flex relative"
}
    , wy = {
        key: 0
        , class: "w-10 flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none overflow-hidden"
    }
    , xy = ["disabled", "type", "required"]
    , ky = {
        key: 1
        , class: "absolute right-2.5 bottom-2.5"
    }
    , Sy = {
        key: 2
        , class: "mt-2 text-sm text-gray-500 dark:text-gray-400"
    }
    , Ca = De({
        __name: "FwbInput"
        , props: {
            disabled: {
                type: Boolean
                , default: !1
            }
            , label: {
                default: ""
            }
            , modelValue: {
                default: ""
            }
            , required: {
                type: Boolean
                , default: !1
            }
            , size: {
                default: "md"
            }
            , type: {
                default: "text"
            }
            , validationStatus: {
                default: void 0
            }
        }
        , setup(e) {
            const t = e
                , r = sm(t, "modelValue")
                , {
                    inputClasses: n
                    , labelClasses: o
                } = vy(pn(t))
                , s = ne(() => Qt("mt-2 text-sm", t.validationStatus === Cr.Success ? "text-green-600 dark:text-green-500" : "", t.validationStatus === Cr.Error ? "text-red-600 dark:text-red-500" : ""));
            return (i, l) => (M(), J("div", null, [i.label ? (M(), J("label", {
                key: 0
                , class: ve(v(o))
            }, ue(i.label), 3)) : Ye("", !0), m("div", _y, [i.$slots.prefix ? (M(), J("div", wy, [Oe(i.$slots, "prefix")])) : Ye("", !0), Qe(m("input", ui(i.$attrs, {
                "onUpdate:modelValue": l[0] || (l[0] = a => ke(r) ? r.value = a : null)
                , disabled: i.disabled
                , type: i.type
                , required: i.required
                , class: [v(n), i.$slots.prefix ? "pl-10" : ""]
            }), null, 16, xy), [
                [Rp, v(r)]
            ]), i.$slots.suffix ? (M(), J("div", ky, [Oe(i.$slots, "suffix")])) : Ye("", !0)]), i.$slots.validationMessage ? (M(), J("p", {
                key: 1
                , class: ve(s.value)
            }, [Oe(i.$slots, "validationMessage")], 2)) : Ye("", !0), i.$slots.helper ? (M(), J("p", Sy, [Oe(i.$slots, "helper")])) : Ye("", !0)]))
        }
    })
    , Ey = "w-fit relative inline-flex items-center cursor-pointer"
    , Cy = 'bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'
    , Ty = "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
    , Ry = {
        lg: "w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6"
        , md: "w-11 h-6 after:top-[2px] after:left-[2px] after:h-5 after:w-5"
        , sm: "w-9 h-5 after:top-[2px] after:left-[2px] after:h-4 after:w-4"
    }
    , $y = {
        red: "peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600"
        , green: "peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600"
        , purple: "peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:bg-purple-600"
        , yellow: "peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:bg-yellow-400"
        , teal: "peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:bg-teal-600"
        , orange: "peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:bg-orange-500"
    };

function Ay(e) {
    const t = ne(() => Ey)
        , r = ne(() => Cy)
        , n = ne(() => Ry[e.size.value])
        , o = ne(() => $y[e.color.value])
        , s = ne(() => Ty);
    return {
        labelClasses: t
        , toggleSize: n
        , toggleClasses: r
        , toggleColor: o
        , toggleBallClasses: s
    }
}
const Oy = ["disabled"]
    , Ta = De({
        __name: "FwbToggle"
        , props: {
            color: {
                default: ""
            }
            , disabled: {
                type: Boolean
                , default: !1
            }
            , label: {
                default: ""
            }
            , modelValue: {
                type: Boolean
                , default: !1
            }
            , size: {
                default: "md"
            }
        }
        , emits: ["update:modelValue"]
        , setup(e, {
            emit: t
        }) {
            const r = e
                , n = ne({
                    get() {
                        return r.modelValue
                    }
                    , set(c) {
                        t("update:modelValue", c)
                    }
                })
                , {
                    labelClasses: o
                    , toggleSize: s
                    , toggleClasses: i
                    , toggleColor: l
                    , toggleBallClasses: a
                } = Ay(pn(r));
            return (c, u) => (M(), J("label", {
                class: ve(v(o))
            }, [Qe(m("input", {
                "onUpdate:modelValue": u[0] || (u[0] = d => n.value = d)
                , disabled: c.disabled
                , class: "sr-only peer"
                , type: "checkbox"
            }, null, 8, Oy), [
                [qc, n.value]
            ]), m("span", {
                class: ve([v(i), v(s), v(l)])
            }, null, 2), m("span", {
                class: ve(v(a))
            }, ue(c.label), 3)], 2))
        }
    })
    , Py = {
        __name: "SiteNavigation"
        , setup(e) {
            return (t, r) => {
                const n = gr("RouterLink");
                return M(), J(Ve, null, [Z(n, {
                    to: {
                        name: "home"
                    }
                }), Z(v(yb), null, {
                    logo: le(() => [Z(v(Rb), {
                        alt: "ECX Logo"
                        , "image-url": "images/ecx_logo.png"
                        , link: "#"
                    }, {
                        default: le(() => [G(" EDGERACK ")])
                        , _: 1
                    })])
                    , default: le(({
                        isShowMenu: o
                    }) => [Z(v(xb), {
                        "is-show-menu": o
                    }, {
                        default: le(() => [Z(v(ls), null, {
                            default: le(() => [Z(n, {
                                to: {
                                    name: "home"
                                }
                            }, {
                                default: le(() => [G(" Home ")])
                                , _: 1
                            })])
                            , _: 1
                        }), Z(v(ls), null, {
                            default: le(() => [Z(n, {
                                to: {
                                    name: "rcu"
                                }
                            }, {
                                default: le(() => [G(" RCU View ")])
                                , _: 1
                            })])
                            , _: 1
                        }), Z(v(ls), null, {
                            default: le(() => [G(" Log In ")])
                            , _: 1
                        })])
                        , _: 2
                    }, 1032, ["is-show-menu"])])
                    , _: 1
                })], 64)
            }
        }
    }
    , Ny = {
        __name: "App"
        , setup(e) {
            return (t, r) => (M(), J(Ve, null, [Z(Py), Z(v(ou))], 64))
        }
    };

function ju(e, t) {
    return function() {
        return e.apply(t, arguments)
    }
}
const {
    toString: Fy
} = Object.prototype, {
    getPrototypeOf: Ci
} = Object, Bo = (e => t => {
    const r = Fy.call(t);
    return e[r] || (e[r] = r.slice(8, -1)
        .toLowerCase())
})(Object.create(null)), wt = e => (e = e.toLowerCase(), t => Bo(t) === e), Do = e => t => typeof t === e, {
    isArray: Dr
} = Array, Sn = Do("undefined");

function Iy(e) {
    return e !== null && !Sn(e) && e.constructor !== null && !Sn(e.constructor) && ot(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const zu = wt("ArrayBuffer");

function Ly(e) {
    let t;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && zu(e.buffer), t
}
const My = Do("string")
    , ot = Do("function")
    , Hu = Do("number")
    , Uo = e => e !== null && typeof e == "object"
    , jy = e => e === !0 || e === !1
    , eo = e => {
        if (Bo(e) !== "object") return !1;
        const t = Ci(e);
        return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
    }
    , zy = wt("Date")
    , Hy = wt("File")
    , By = wt("Blob")
    , Dy = wt("FileList")
    , Uy = e => Uo(e) && ot(e.pipe)
    , Vy = e => {
        let t;
        return e && (typeof FormData == "function" && e instanceof FormData || ot(e.append) && ((t = Bo(e)) === "formdata" || t === "object" && ot(e.toString) && e.toString() === "[object FormData]"))
    }
    , qy = wt("URLSearchParams")
    , Wy = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function Pn(e, t, {
    allOwnKeys: r = !1
} = {}) {
    if (e === null || typeof e > "u") return;
    let n, o;
    if (typeof e != "object" && (e = [e]), Dr(e))
        for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
    else {
        const s = r ? Object.getOwnPropertyNames(e) : Object.keys(e)
            , i = s.length;
        let l;
        for (n = 0; n < i; n++) l = s[n], t.call(null, e[l], l, e)
    }
}

function Bu(e, t) {
    t = t.toLowerCase();
    const r = Object.keys(e);
    let n = r.length
        , o;
    for (; n-- > 0;)
        if (o = r[n], t === o.toLowerCase()) return o;
    return null
}
const Du = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global
    , Uu = e => !Sn(e) && e !== Du;

function js() {
    const {
        caseless: e
    } = Uu(this) && this || {}, t = {}, r = (n, o) => {
        const s = e && Bu(t, o) || o;
        eo(t[s]) && eo(n) ? t[s] = js(t[s], n) : eo(n) ? t[s] = js({}, n) : Dr(n) ? t[s] = n.slice() : t[s] = n
    };
    for (let n = 0, o = arguments.length; n < o; n++) arguments[n] && Pn(arguments[n], r);
    return t
}
const Ky = (e, t, r, {
    allOwnKeys: n
} = {}) => (Pn(t, (o, s) => {
    r && ot(o) ? e[s] = ju(o, r) : e[s] = o
}, {
    allOwnKeys: n
}), e)
    , Gy = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e)
    , Jy = (e, t, r, n) => {
        e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
            value: t.prototype
        }), r && Object.assign(e.prototype, r)
    }
    , Qy = (e, t, r, n) => {
        let o, s, i;
        const l = {};
        if (t = t || {}, e == null) return t;
        do {
            for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0;) i = o[s], (!n || n(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
            e = r !== !1 && Ci(e)
        } while (e && (!r || r(e, t)) && e !== Object.prototype);
        return t
    }
    , Xy = (e, t, r) => {
        e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
        const n = e.indexOf(t, r);
        return n !== -1 && n === r
    }
    , Yy = e => {
        if (!e) return null;
        if (Dr(e)) return e;
        let t = e.length;
        if (!Hu(t)) return null;
        const r = new Array(t);
        for (; t-- > 0;) r[t] = e[t];
        return r
    }
    , Zy = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && Ci(Uint8Array))
    , ev = (e, t) => {
        const n = (e && e[Symbol.iterator])
            .call(e);
        let o;
        for (;
            (o = n.next()) && !o.done;) {
            const s = o.value;
            t.call(e, s[0], s[1])
        }
    }
    , tv = (e, t) => {
        let r;
        const n = [];
        for (;
            (r = e.exec(t)) !== null;) n.push(r);
        return n
    }
    , rv = wt("HTMLFormElement")
    , nv = e => e.toLowerCase()
        .replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, o) {
            return n.toUpperCase() + o
        })
    , Ra = (({
        hasOwnProperty: e
    }) => (t, r) => e.call(t, r))(Object.prototype)
    , ov = wt("RegExp")
    , Vu = (e, t) => {
        const r = Object.getOwnPropertyDescriptors(e)
            , n = {};
        Pn(r, (o, s) => {
            let i;
            (i = t(o, s, e)) !== !1 && (n[s] = i || o)
        }), Object.defineProperties(e, n)
    }
    , sv = e => {
        Vu(e, (t, r) => {
            if (ot(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1) return !1;
            const n = e[r];
            if (ot(n)) {
                if (t.enumerable = !1, "writable" in t) {
                    t.writable = !1;
                    return
                }
                t.set || (t.set = () => {
                    throw Error("Can not rewrite read-only method '" + r + "'")
                })
            }
        })
    }
    , iv = (e, t) => {
        const r = {}
            , n = o => {
                o.forEach(s => {
                    r[s] = !0
                })
            };
        return Dr(e) ? n(e) : n(String(e)
            .split(t)), r
    }
    , lv = () => { }
    , av = (e, t) => (e = +e, Number.isFinite(e) ? e : t)
    , us = "abcdefghijklmnopqrstuvwxyz"
    , $a = "0123456789"
    , qu = {
        DIGIT: $a
        , ALPHA: us
        , ALPHA_DIGIT: us + us.toUpperCase() + $a
    }
    , cv = (e = 16, t = qu.ALPHA_DIGIT) => {
        let r = "";
        const {
            length: n
        } = t;
        for (; e--;) r += t[Math.random() * n | 0];
        return r
    };

function uv(e) {
    return !!(e && ot(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}
const dv = e => {
    const t = new Array(10)
        , r = (n, o) => {
            if (Uo(n)) {
                if (t.indexOf(n) >= 0) return;
                if (!("toJSON" in n)) {
                    t[o] = n;
                    const s = Dr(n) ? [] : {};
                    return Pn(n, (i, l) => {
                        const a = r(i, o + 1);
                        !Sn(a) && (s[l] = a)
                    }), t[o] = void 0, s
                }
            }
            return n
        };
    return r(e, 0)
}
    , fv = wt("AsyncFunction")
    , pv = e => e && (Uo(e) || ot(e)) && ot(e.then) && ot(e.catch)
    , E = {
        isArray: Dr
        , isArrayBuffer: zu
        , isBuffer: Iy
        , isFormData: Vy
        , isArrayBufferView: Ly
        , isString: My
        , isNumber: Hu
        , isBoolean: jy
        , isObject: Uo
        , isPlainObject: eo
        , isUndefined: Sn
        , isDate: zy
        , isFile: Hy
        , isBlob: By
        , isRegExp: ov
        , isFunction: ot
        , isStream: Uy
        , isURLSearchParams: qy
        , isTypedArray: Zy
        , isFileList: Dy
        , forEach: Pn
        , merge: js
        , extend: Ky
        , trim: Wy
        , stripBOM: Gy
        , inherits: Jy
        , toFlatObject: Qy
        , kindOf: Bo
        , kindOfTest: wt
        , endsWith: Xy
        , toArray: Yy
        , forEachEntry: ev
        , matchAll: tv
        , isHTMLForm: rv
        , hasOwnProperty: Ra
        , hasOwnProp: Ra
        , reduceDescriptors: Vu
        , freezeMethods: sv
        , toObjectSet: iv
        , toCamelCase: nv
        , noop: lv
        , toFiniteNumber: av
        , findKey: Bu
        , global: Du
        , isContextDefined: Uu
        , ALPHABET: qu
        , generateString: cv
        , isSpecCompliantForm: uv
        , toJSONObject: dv
        , isAsyncFn: fv
        , isThenable: pv
    };

function ge(e, t, r, n, o) {
    Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error()
        .stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o)
}
E.inherits(ge, Error, {
    toJSON: function() {
        return {
            message: this.message
            , name: this.name
            , description: this.description
            , number: this.number
            , fileName: this.fileName
            , lineNumber: this.lineNumber
            , columnNumber: this.columnNumber
            , stack: this.stack
            , config: E.toJSONObject(this.config)
            , code: this.code
            , status: this.response && this.response.status ? this.response.status : null
        }
    }
});
const Wu = ge.prototype
    , Ku = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
    Ku[e] = {
        value: e
    }
});
Object.defineProperties(ge, Ku);
Object.defineProperty(Wu, "isAxiosError", {
    value: !0
});
ge.from = (e, t, r, n, o, s) => {
    const i = Object.create(Wu);
    return E.toFlatObject(e, i, function(a) {
        return a !== Error.prototype
    }, l => l !== "isAxiosError"), ge.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, s && Object.assign(i, s), i
};
const hv = null;

function zs(e) {
    return E.isPlainObject(e) || E.isArray(e)
}

function Gu(e) {
    return E.endsWith(e, "[]") ? e.slice(0, -2) : e
}

function Aa(e, t, r) {
    return e ? e.concat(t)
        .map(function(o, s) {
            return o = Gu(o), !r && s ? "[" + o + "]" : o
        })
        .join(r ? "." : "") : t
}

function gv(e) {
    return E.isArray(e) && !e.some(zs)
}
const mv = E.toFlatObject(E, {}, null, function(t) {
    return /^is[A-Z]/.test(t)
});

function Vo(e, t, r) {
    if (!E.isObject(e)) throw new TypeError("target must be an object");
    t = t || new FormData, r = E.toFlatObject(r, {
        metaTokens: !0
        , dots: !1
        , indexes: !1
    }, !1, function(y, x) {
        return !E.isUndefined(x[y])
    });
    const n = r.metaTokens
        , o = r.visitor || u
        , s = r.dots
        , i = r.indexes
        , a = (r.Blob || typeof Blob < "u" && Blob) && E.isSpecCompliantForm(t);
    if (!E.isFunction(o)) throw new TypeError("visitor must be a function");

    function c(b) {
        if (b === null) return "";
        if (E.isDate(b)) return b.toISOString();
        if (!a && E.isBlob(b)) throw new ge("Blob is not supported. Use a Buffer instead.");
        return E.isArrayBuffer(b) || E.isTypedArray(b) ? a && typeof Blob == "function" ? new Blob([b]) : Buffer.from(b) : b
    }

    function u(b, y, x) {
        let w = b;
        if (b && !x && typeof b == "object") {
            if (E.endsWith(y, "{}")) y = n ? y : y.slice(0, -2), b = JSON.stringify(b);
            else if (E.isArray(b) && gv(b) || (E.isFileList(b) || E.endsWith(y, "[]")) && (w = E.toArray(b))) return y = Gu(y), w.forEach(function(T, j) {
                !(E.isUndefined(T) || T === null) && t.append(i === !0 ? Aa([y], j, s) : i === null ? y : y + "[]", c(T))
            }), !1
        }
        return zs(b) ? !0 : (t.append(Aa(x, y, s), c(b)), !1)
    }
    const d = []
        , f = Object.assign(mv, {
            defaultVisitor: u
            , convertValue: c
            , isVisitable: zs
        });

    function g(b, y) {
        if (!E.isUndefined(b)) {
            if (d.indexOf(b) !== -1) throw Error("Circular reference detected in " + y.join("."));
            d.push(b), E.forEach(b, function(w, k) {
                (!(E.isUndefined(w) || w === null) && o.call(t, w, E.isString(k) ? k.trim() : k, y, f)) === !0 && g(w, y ? y.concat(k) : [k])
            }), d.pop()
        }
    }
    if (!E.isObject(e)) throw new TypeError("data must be an object");
    return g(e), t
}

function Oa(e) {
    const t = {
        "!": "%21"
        , "'": "%27"
        , "(": "%28"
        , ")": "%29"
        , "~": "%7E"
        , "%20": "+"
        , "%00": "\0"
    };
    return encodeURIComponent(e)
        .replace(/[!'()~]|%20|%00/g, function(n) {
            return t[n]
        })
}

function Ti(e, t) {
    this._pairs = [], e && Vo(e, this, t)
}
const Ju = Ti.prototype;
Ju.append = function(t, r) {
    this._pairs.push([t, r])
};
Ju.toString = function(t) {
    const r = t ? function(n) {
        return t.call(this, n, Oa)
    } : Oa;
    return this._pairs.map(function(o) {
        return r(o[0]) + "=" + r(o[1])
    }, "")
        .join("&")
};

function bv(e) {
    return encodeURIComponent(e)
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]")
}

function Qu(e, t, r) {
    if (!t) return e;
    const n = r && r.encode || bv
        , o = r && r.serialize;
    let s;
    if (o ? s = o(t, r) : s = E.isURLSearchParams(t) ? t.toString() : new Ti(t, r)
        .toString(n), s) {
        const i = e.indexOf("#");
        i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s
    }
    return e
}
class Pa {
    constructor() {
        this.handlers = []
    }
    use(t, r, n) {
        return this.handlers.push({
            fulfilled: t
            , rejected: r
            , synchronous: n ? n.synchronous : !1
            , runWhen: n ? n.runWhen : null
        }), this.handlers.length - 1
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(t) {
        E.forEach(this.handlers, function(n) {
            n !== null && t(n)
        })
    }
}
const Xu = {
    silentJSONParsing: !0
    , forcedJSONParsing: !0
    , clarifyTimeoutError: !1
}
    , yv = typeof URLSearchParams < "u" ? URLSearchParams : Ti
    , vv = typeof FormData < "u" ? FormData : null
    , _v = typeof Blob < "u" ? Blob : null
    , wv = {
        isBrowser: !0
        , classes: {
            URLSearchParams: yv
            , FormData: vv
            , Blob: _v
        }
        , protocols: ["http", "https", "file", "blob", "url", "data"]
    }
    , Yu = typeof window < "u" && typeof document < "u"
    , xv = (e => Yu && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product)
    , kv = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function"
    , Sv = Object.freeze(Object.defineProperty({
        __proto__: null
        , hasBrowserEnv: Yu
        , hasStandardBrowserEnv: xv
        , hasStandardBrowserWebWorkerEnv: kv
    }, Symbol.toStringTag, {
        value: "Module"
    }))
    , mt = {
        ...Sv
        , ...wv
    };

function Ev(e, t) {
    return Vo(e, new mt.classes.URLSearchParams, Object.assign({
        visitor: function(r, n, o, s) {
            return mt.isNode && E.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments)
        }
    }, t))
}

function Cv(e) {
    return E.matchAll(/\w+|\[(\w*)]/g, e)
        .map(t => t[0] === "[]" ? "" : t[1] || t[0])
}

function Tv(e) {
    const t = {}
        , r = Object.keys(e);
    let n;
    const o = r.length;
    let s;
    for (n = 0; n < o; n++) s = r[n], t[s] = e[s];
    return t
}

function Zu(e) {
    function t(r, n, o, s) {
        let i = r[s++];
        if (i === "__proto__") return !0;
        const l = Number.isFinite(+i)
            , a = s >= r.length;
        return i = !i && E.isArray(o) ? o.length : i, a ? (E.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !l) : ((!o[i] || !E.isObject(o[i])) && (o[i] = []), t(r, n, o[i], s) && E.isArray(o[i]) && (o[i] = Tv(o[i])), !l)
    }
    if (E.isFormData(e) && E.isFunction(e.entries)) {
        const r = {};
        return E.forEachEntry(e, (n, o) => {
            t(Cv(n), o, r, 0)
        }), r
    }
    return null
}

function Rv(e, t, r) {
    if (E.isString(e)) try {
        return (t || JSON.parse)(e), E.trim(e)
    } catch (n) {
        if (n.name !== "SyntaxError") throw n
    }
    return (r || JSON.stringify)(e)
}
const Ri = {
    transitional: Xu
    , adapter: ["xhr", "http"]
    , transformRequest: [function(t, r) {
        const n = r.getContentType() || ""
            , o = n.indexOf("application/json") > -1
            , s = E.isObject(t);
        if (s && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t)) return o ? JSON.stringify(Zu(t)) : t;
        if (E.isArrayBuffer(t) || E.isBuffer(t) || E.isStream(t) || E.isFile(t) || E.isBlob(t)) return t;
        if (E.isArrayBufferView(t)) return t.buffer;
        if (E.isURLSearchParams(t)) return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
        let l;
        if (s) {
            if (n.indexOf("application/x-www-form-urlencoded") > -1) return Ev(t, this.formSerializer)
                .toString();
            if ((l = E.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
                const a = this.env && this.env.FormData;
                return Vo(l ? {
                    "files[]": t
                } : t, a && new a, this.formSerializer)
            }
        }
        return s || o ? (r.setContentType("application/json", !1), Rv(t)) : t
    }]
    , transformResponse: [function(t) {
        const r = this.transitional || Ri.transitional
            , n = r && r.forcedJSONParsing
            , o = this.responseType === "json";
        if (t && E.isString(t) && (n && !this.responseType || o)) {
            const i = !(r && r.silentJSONParsing) && o;
            try {
                return JSON.parse(t)
            } catch (l) {
                if (i) throw l.name === "SyntaxError" ? ge.from(l, ge.ERR_BAD_RESPONSE, this, null, this.response) : l
            }
        }
        return t
    }]
    , timeout: 0
    , xsrfCookieName: "XSRF-TOKEN"
    , xsrfHeaderName: "X-XSRF-TOKEN"
    , maxContentLength: -1
    , maxBodyLength: -1
    , env: {
        FormData: mt.classes.FormData
        , Blob: mt.classes.Blob
    }
    , validateStatus: function(t) {
        return t >= 200 && t < 300
    }
    , headers: {
        common: {
            Accept: "application/json, text/plain, */*"
            , "Content-Type": void 0
        }
    }
};
E.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
    Ri.headers[e] = {}
});
const $i = Ri
    , $v = E.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"])
    , Av = e => {
        const t = {};
        let r, n, o;
        return e && e.split(`
`)
            .forEach(function(i) {
                o = i.indexOf(":"), r = i.substring(0, o)
                    .trim()
                    .toLowerCase(), n = i.substring(o + 1)
                        .trim(), !(!r || t[r] && $v[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n)
            }), t
    }
    , Na = Symbol("internals");

function Xr(e) {
    return e && String(e)
        .trim()
        .toLowerCase()
}

function to(e) {
    return e === !1 || e == null ? e : E.isArray(e) ? e.map(to) : String(e)
}

function Ov(e) {
    const t = Object.create(null)
        , r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let n;
    for (; n = r.exec(e);) t[n[1]] = n[2];
    return t
}
const Pv = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());

function ds(e, t, r, n, o) {
    if (E.isFunction(n)) return n.call(this, t, r);
    if (o && (t = r), !!E.isString(t)) {
        if (E.isString(n)) return t.indexOf(n) !== -1;
        if (E.isRegExp(n)) return n.test(t)
    }
}

function Nv(e) {
    return e.trim()
        .toLowerCase()
        .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n)
}

function Fv(e, t) {
    const r = E.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(n => {
        Object.defineProperty(e, n + r, {
            value: function(o, s, i) {
                return this[n].call(this, t, o, s, i)
            }
            , configurable: !0
        })
    })
}
class qo {
    constructor(t) {
        t && this.set(t)
    }
    set(t, r, n) {
        const o = this;

        function s(l, a, c) {
            const u = Xr(a);
            if (!u) throw new Error("header name must be a non-empty string");
            const d = E.findKey(o, u);
            (!d || o[d] === void 0 || c === !0 || c === void 0 && o[d] !== !1) && (o[d || a] = to(l))
        }
        const i = (l, a) => E.forEach(l, (c, u) => s(c, u, a));
        return E.isPlainObject(t) || t instanceof this.constructor ? i(t, r) : E.isString(t) && (t = t.trim()) && !Pv(t) ? i(Av(t), r) : t != null && s(r, t, n), this
    }
    get(t, r) {
        if (t = Xr(t), t) {
            const n = E.findKey(this, t);
            if (n) {
                const o = this[n];
                if (!r) return o;
                if (r === !0) return Ov(o);
                if (E.isFunction(r)) return r.call(this, o, n);
                if (E.isRegExp(r)) return r.exec(o);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(t, r) {
        if (t = Xr(t), t) {
            const n = E.findKey(this, t);
            return !!(n && this[n] !== void 0 && (!r || ds(this, this[n], n, r)))
        }
        return !1
    }
    delete(t, r) {
        const n = this;
        let o = !1;

        function s(i) {
            if (i = Xr(i), i) {
                const l = E.findKey(n, i);
                l && (!r || ds(n, n[l], l, r)) && (delete n[l], o = !0)
            }
        }
        return E.isArray(t) ? t.forEach(s) : s(t), o
    }
    clear(t) {
        const r = Object.keys(this);
        let n = r.length
            , o = !1;
        for (; n--;) {
            const s = r[n];
            (!t || ds(this, this[s], s, t, !0)) && (delete this[s], o = !0)
        }
        return o
    }
    normalize(t) {
        const r = this
            , n = {};
        return E.forEach(this, (o, s) => {
            const i = E.findKey(n, s);
            if (i) {
                r[i] = to(o), delete r[s];
                return
            }
            const l = t ? Nv(s) : String(s)
                .trim();
            l !== s && delete r[s], r[l] = to(o), n[l] = !0
        }), this
    }
    concat(...t) {
        return this.constructor.concat(this, ...t)
    }
    toJSON(t) {
        const r = Object.create(null);
        return E.forEach(this, (n, o) => {
            n != null && n !== !1 && (r[o] = t && E.isArray(n) ? n.join(", ") : n)
        }), r
    } [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON())
            .map(([t, r]) => t + ": " + r)
            .join(`
`)
    }
    get [Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(t) {
        return t instanceof this ? t : new this(t)
    }
    static concat(t, ...r) {
        const n = new this(t);
        return r.forEach(o => n.set(o)), n
    }
    static accessor(t) {
        const n = (this[Na] = this[Na] = {
            accessors: {}
        })
            .accessors
            , o = this.prototype;

        function s(i) {
            const l = Xr(i);
            n[l] || (Fv(o, i), n[l] = !0)
        }
        return E.isArray(t) ? t.forEach(s) : s(t), this
    }
}
qo.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
E.reduceDescriptors(qo.prototype, ({
    value: e
}, t) => {
    let r = t[0].toUpperCase() + t.slice(1);
    return {
        get: () => e
        , set(n) {
            this[r] = n
        }
    }
});
E.freezeMethods(qo);
const Ct = qo;

function fs(e, t) {
    const r = this || $i
        , n = t || r
        , o = Ct.from(n.headers);
    let s = n.data;
    return E.forEach(e, function(l) {
        s = l.call(r, s, o.normalize(), t ? t.status : void 0)
    }), o.normalize(), s
}

function ed(e) {
    return !!(e && e.__CANCEL__)
}

function Nn(e, t, r) {
    ge.call(this, e ?? "canceled", ge.ERR_CANCELED, t, r), this.name = "CanceledError"
}
E.inherits(Nn, ge, {
    __CANCEL__: !0
});

function Iv(e, t, r) {
    const n = r.config.validateStatus;
    !r.status || !n || n(r.status) ? e(r) : t(new ge("Request failed with status code " + r.status, [ge.ERR_BAD_REQUEST, ge.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r))
}
const Lv = mt.hasStandardBrowserEnv ? {
    write(e, t, r, n, o, s) {
        const i = [e + "=" + encodeURIComponent(t)];
        E.isNumber(r) && i.push("expires=" + new Date(r)
            .toGMTString()), E.isString(n) && i.push("path=" + n), E.isString(o) && i.push("domain=" + o), s === !0 && i.push("secure"), document.cookie = i.join("; ")
    }
    , read(e) {
        const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
        return t ? decodeURIComponent(t[3]) : null
    }
    , remove(e) {
        this.write(e, "", Date.now() - 864e5)
    }
} : {
    write() { }
    , read() {
        return null
    }
    , remove() { }
};

function Mv(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}

function jv(e, t) {
    return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
}

function td(e, t) {
    return e && !Mv(t) ? jv(e, t) : t
}
const zv = mt.hasStandardBrowserEnv ? function() {
    const t = /(msie|trident)/i.test(navigator.userAgent)
        , r = document.createElement("a");
    let n;

    function o(s) {
        let i = s;
        return t && (r.setAttribute("href", i), i = r.href), r.setAttribute("href", i), {
            href: r.href
            , protocol: r.protocol ? r.protocol.replace(/:$/, "") : ""
            , host: r.host
            , search: r.search ? r.search.replace(/^\?/, "") : ""
            , hash: r.hash ? r.hash.replace(/^#/, "") : ""
            , hostname: r.hostname
            , port: r.port
            , pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
        }
    }
    return n = o(window.location.href)
        , function(i) {
            const l = E.isString(i) ? o(i) : i;
            return l.protocol === n.protocol && l.host === n.host
        }
}() : function() {
    return function() {
        return !0
    }
}();

function Hv(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || ""
}

function Bv(e, t) {
    e = e || 10;
    const r = new Array(e)
        , n = new Array(e);
    let o = 0
        , s = 0
        , i;
    return t = t !== void 0 ? t : 1e3
        , function(a) {
            const c = Date.now()
                , u = n[s];
            i || (i = c), r[o] = a, n[o] = c;
            let d = s
                , f = 0;
            for (; d !== o;) f += r[d++], d = d % e;
            if (o = (o + 1) % e, o === s && (s = (s + 1) % e), c - i < t) return;
            const g = u && c - u;
            return g ? Math.round(f * 1e3 / g) : void 0
        }
}

function Fa(e, t) {
    let r = 0;
    const n = Bv(50, 250);
    return o => {
        const s = o.loaded
            , i = o.lengthComputable ? o.total : void 0
            , l = s - r
            , a = n(l)
            , c = s <= i;
        r = s;
        const u = {
            loaded: s
            , total: i
            , progress: i ? s / i : void 0
            , bytes: l
            , rate: a || void 0
            , estimated: a && i && c ? (i - s) / a : void 0
            , event: o
        };
        u[t ? "download" : "upload"] = !0, e(u)
    }
}
const Dv = typeof XMLHttpRequest < "u"
    , Uv = Dv && function(e) {
        return new Promise(function(r, n) {
            let o = e.data;
            const s = Ct.from(e.headers)
                .normalize();
            let {
                responseType: i
                , withXSRFToken: l
            } = e, a;

            function c() {
                e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a)
            }
            let u;
            if (E.isFormData(o)) {
                if (mt.hasStandardBrowserEnv || mt.hasStandardBrowserWebWorkerEnv) s.setContentType(!1);
                else if ((u = s.getContentType()) !== !1) {
                    const [y, ...x] = u ? u.split(";")
                        .map(w => w.trim())
                        .filter(Boolean) : [];
                    s.setContentType([y || "multipart/form-data", ...x].join("; "))
                }
            }
            let d = new XMLHttpRequest;
            if (e.auth) {
                const y = e.auth.username || ""
                    , x = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                s.set("Authorization", "Basic " + btoa(y + ":" + x))
            }
            const f = td(e.baseURL, e.url);
            d.open(e.method.toUpperCase(), Qu(f, e.params, e.paramsSerializer), !0), d.timeout = e.timeout;

            function g() {
                if (!d) return;
                const y = Ct.from("getAllResponseHeaders" in d && d.getAllResponseHeaders())
                    , w = {
                        data: !i || i === "text" || i === "json" ? d.responseText : d.response
                        , status: d.status
                        , statusText: d.statusText
                        , headers: y
                        , config: e
                        , request: d
                    };
                Iv(function(T) {
                    r(T), c()
                }, function(T) {
                    n(T), c()
                }, w), d = null
            }
            if ("onloadend" in d ? d.onloadend = g : d.onreadystatechange = function() {
                !d || d.readyState !== 4 || d.status === 0 && !(d.responseURL && d.responseURL.indexOf("file:") === 0) || setTimeout(g)
            }, d.onabort = function() {
                d && (n(new ge("Request aborted", ge.ECONNABORTED, e, d)), d = null)
            }, d.onerror = function() {
                n(new ge("Network Error", ge.ERR_NETWORK, e, d)), d = null
            }, d.ontimeout = function() {
                let x = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
                const w = e.transitional || Xu;
                e.timeoutErrorMessage && (x = e.timeoutErrorMessage), n(new ge(x, w.clarifyTimeoutError ? ge.ETIMEDOUT : ge.ECONNABORTED, e, d)), d = null
            }, mt.hasStandardBrowserEnv && (l && E.isFunction(l) && (l = l(e)), l || l !== !1 && zv(f))) {
                const y = e.xsrfHeaderName && e.xsrfCookieName && Lv.read(e.xsrfCookieName);
                y && s.set(e.xsrfHeaderName, y)
            }
            o === void 0 && s.setContentType(null), "setRequestHeader" in d && E.forEach(s.toJSON(), function(x, w) {
                d.setRequestHeader(w, x)
            }), E.isUndefined(e.withCredentials) || (d.withCredentials = !!e.withCredentials), i && i !== "json" && (d.responseType = e.responseType), typeof e.onDownloadProgress == "function" && d.addEventListener("progress", Fa(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && d.upload && d.upload.addEventListener("progress", Fa(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = y => {
                d && (n(!y || y.type ? new Nn(null, e, d) : y), d.abort(), d = null)
            }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
            const b = Hv(f);
            if (b && mt.protocols.indexOf(b) === -1) {
                n(new ge("Unsupported protocol " + b + ":", ge.ERR_BAD_REQUEST, e));
                return
            }
            d.send(o || null)
        })
    }
    , Hs = {
        http: hv
        , xhr: Uv
    };
E.forEach(Hs, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, "name", {
                value: t
            })
        } catch { }
        Object.defineProperty(e, "adapterName", {
            value: t
        })
    }
});
const Ia = e => `- ${e}`
    , Vv = e => E.isFunction(e) || e === null || e === !1
    , rd = {
        getAdapter: e => {
            e = E.isArray(e) ? e : [e];
            const {
                length: t
            } = e;
            let r, n;
            const o = {};
            for (let s = 0; s < t; s++) {
                r = e[s];
                let i;
                if (n = r, !Vv(r) && (n = Hs[(i = String(r))
                    .toLowerCase()], n === void 0)) throw new ge(`Unknown adapter '${i}'`);
                if (n) break;
                o[i || "#" + s] = n
            }
            if (!n) {
                const s = Object.entries(o)
                    .map(([l, a]) => `adapter ${l} ` + (a === !1 ? "is not supported by the environment" : "is not available in the build"));
                let i = t ? s.length > 1 ? `since :
` + s.map(Ia)
                        .join(`
`) : " " + Ia(s[0]) : "as no adapter specified";
                throw new ge("There is no suitable adapter to dispatch the request " + i, "ERR_NOT_SUPPORT")
            }
            return n
        }
        , adapters: Hs
    };

function ps(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Nn(null, e)
}

function La(e) {
    return ps(e), e.headers = Ct.from(e.headers), e.data = fs.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), rd.getAdapter(e.adapter || $i.adapter)(e)
        .then(function(n) {
            return ps(e), n.data = fs.call(e, e.transformResponse, n), n.headers = Ct.from(n.headers), n
        }, function(n) {
            return ed(n) || (ps(e), n && n.response && (n.response.data = fs.call(e, e.transformResponse, n.response), n.response.headers = Ct.from(n.response.headers))), Promise.reject(n)
        })
}
const Ma = e => e instanceof Ct ? e.toJSON() : e;

function jr(e, t) {
    t = t || {};
    const r = {};

    function n(c, u, d) {
        return E.isPlainObject(c) && E.isPlainObject(u) ? E.merge.call({
            caseless: d
        }, c, u) : E.isPlainObject(u) ? E.merge({}, u) : E.isArray(u) ? u.slice() : u
    }

    function o(c, u, d) {
        if (E.isUndefined(u)) {
            if (!E.isUndefined(c)) return n(void 0, c, d)
        } else return n(c, u, d)
    }

    function s(c, u) {
        if (!E.isUndefined(u)) return n(void 0, u)
    }

    function i(c, u) {
        if (E.isUndefined(u)) {
            if (!E.isUndefined(c)) return n(void 0, c)
        } else return n(void 0, u)
    }

    function l(c, u, d) {
        if (d in t) return n(c, u);
        if (d in e) return n(void 0, c)
    }
    const a = {
        url: s
        , method: s
        , data: s
        , baseURL: i
        , transformRequest: i
        , transformResponse: i
        , paramsSerializer: i
        , timeout: i
        , timeoutMessage: i
        , withCredentials: i
        , withXSRFToken: i
        , adapter: i
        , responseType: i
        , xsrfCookieName: i
        , xsrfHeaderName: i
        , onUploadProgress: i
        , onDownloadProgress: i
        , decompress: i
        , maxContentLength: i
        , maxBodyLength: i
        , beforeRedirect: i
        , transport: i
        , httpAgent: i
        , httpsAgent: i
        , cancelToken: i
        , socketPath: i
        , responseEncoding: i
        , validateStatus: l
        , headers: (c, u) => o(Ma(c), Ma(u), !0)
    };
    return E.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
        const d = a[u] || o
            , f = d(e[u], t[u], u);
        E.isUndefined(f) && d !== l || (r[u] = f)
    }), r
}
const nd = "1.6.7"
    , Ai = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
    Ai[e] = function(n) {
        return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
    }
});
const ja = {};
Ai.transitional = function(t, r, n) {
    function o(s, i) {
        return "[Axios v" + nd + "] Transitional option '" + s + "'" + i + (n ? ". " + n : "")
    }
    return (s, i, l) => {
        if (t === !1) throw new ge(o(i, " has been removed" + (r ? " in " + r : "")), ge.ERR_DEPRECATED);
        return r && !ja[i] && (ja[i] = !0, console.warn(o(i, " has been deprecated since v" + r + " and will be removed in the near future"))), t ? t(s, i, l) : !0
    }
};

function qv(e, t, r) {
    if (typeof e != "object") throw new ge("options must be an object", ge.ERR_BAD_OPTION_VALUE);
    const n = Object.keys(e);
    let o = n.length;
    for (; o-- > 0;) {
        const s = n[o]
            , i = t[s];
        if (i) {
            const l = e[s]
                , a = l === void 0 || i(l, s, e);
            if (a !== !0) throw new ge("option " + s + " must be " + a, ge.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (r !== !0) throw new ge("Unknown option " + s, ge.ERR_BAD_OPTION)
    }
}
const Bs = {
    assertOptions: qv
    , validators: Ai
}
    , Ft = Bs.validators;
class bo {
    constructor(t) {
        this.defaults = t, this.interceptors = {
            request: new Pa
            , response: new Pa
        }
    }
    async request(t, r) {
        try {
            return await this._request(t, r)
        } catch (n) {
            if (n instanceof Error) {
                let o;
                Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error;
                const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
                n.stack ? s && !String(n.stack)
                    .endsWith(s.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + s) : n.stack = s
            }
            throw n
        }
    }
    _request(t, r) {
        typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = jr(this.defaults, r);
        const {
            transitional: n
            , paramsSerializer: o
            , headers: s
        } = r;
        n !== void 0 && Bs.assertOptions(n, {
            silentJSONParsing: Ft.transitional(Ft.boolean)
            , forcedJSONParsing: Ft.transitional(Ft.boolean)
            , clarifyTimeoutError: Ft.transitional(Ft.boolean)
        }, !1), o != null && (E.isFunction(o) ? r.paramsSerializer = {
            serialize: o
        } : Bs.assertOptions(o, {
            encode: Ft.function
            , serialize: Ft.function
        }, !0)), r.method = (r.method || this.defaults.method || "get")
            .toLowerCase();
        let i = s && E.merge(s.common, s[r.method]);
        s && E.forEach(["delete", "get", "head", "post", "put", "patch", "common"], b => {
            delete s[b]
        }), r.headers = Ct.concat(i, s);
        const l = [];
        let a = !0;
        this.interceptors.request.forEach(function(y) {
            typeof y.runWhen == "function" && y.runWhen(r) === !1 || (a = a && y.synchronous, l.unshift(y.fulfilled, y.rejected))
        });
        const c = [];
        this.interceptors.response.forEach(function(y) {
            c.push(y.fulfilled, y.rejected)
        });
        let u, d = 0
            , f;
        if (!a) {
            const b = [La.bind(this), void 0];
            for (b.unshift.apply(b, l), b.push.apply(b, c), f = b.length, u = Promise.resolve(r); d < f;) u = u.then(b[d++], b[d++]);
            return u
        }
        f = l.length;
        let g = r;
        for (d = 0; d < f;) {
            const b = l[d++]
                , y = l[d++];
            try {
                g = b(g)
            } catch (x) {
                y.call(this, x);
                break
            }
        }
        try {
            u = La.call(this, g)
        } catch (b) {
            return Promise.reject(b)
        }
        for (d = 0, f = c.length; d < f;) u = u.then(c[d++], c[d++]);
        return u
    }
    getUri(t) {
        t = jr(this.defaults, t);
        const r = td(t.baseURL, t.url);
        return Qu(r, t.params, t.paramsSerializer)
    }
}
E.forEach(["delete", "get", "head", "options"], function(t) {
    bo.prototype[t] = function(r, n) {
        return this.request(jr(n || {}, {
            method: t
            , url: r
            , data: (n || {})
                .data
        }))
    }
});
E.forEach(["post", "put", "patch"], function(t) {
    function r(n) {
        return function(s, i, l) {
            return this.request(jr(l || {}, {
                method: t
                , headers: n ? {
                    "Content-Type": "multipart/form-data"
                } : {}
                , url: s
                , data: i
            }))
        }
    }
    bo.prototype[t] = r(), bo.prototype[t + "Form"] = r(!0)
});
const ro = bo;
class Oi {
    constructor(t) {
        if (typeof t != "function") throw new TypeError("executor must be a function.");
        let r;
        this.promise = new Promise(function(s) {
            r = s
        });
        const n = this;
        this.promise.then(o => {
            if (!n._listeners) return;
            let s = n._listeners.length;
            for (; s-- > 0;) n._listeners[s](o);
            n._listeners = null
        }), this.promise.then = o => {
            let s;
            const i = new Promise(l => {
                n.subscribe(l), s = l
            })
                .then(o);
            return i.cancel = function() {
                n.unsubscribe(s)
            }, i
        }, t(function(s, i, l) {
            n.reason || (n.reason = new Nn(s, i, l), r(n.reason))
        })
    }
    throwIfRequested() {
        if (this.reason) throw this.reason
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }
    unsubscribe(t) {
        if (!this._listeners) return;
        const r = this._listeners.indexOf(t);
        r !== -1 && this._listeners.splice(r, 1)
    }
    static source() {
        let t;
        return {
            token: new Oi(function(o) {
                t = o
            })
            , cancel: t
        }
    }
}
const Wv = Oi;

function Kv(e) {
    return function(r) {
        return e.apply(null, r)
    }
}

function Gv(e) {
    return E.isObject(e) && e.isAxiosError === !0
}
const Ds = {
    Continue: 100
    , SwitchingProtocols: 101
    , Processing: 102
    , EarlyHints: 103
    , Ok: 200
    , Created: 201
    , Accepted: 202
    , NonAuthoritativeInformation: 203
    , NoContent: 204
    , ResetContent: 205
    , PartialContent: 206
    , MultiStatus: 207
    , AlreadyReported: 208
    , ImUsed: 226
    , MultipleChoices: 300
    , MovedPermanently: 301
    , Found: 302
    , SeeOther: 303
    , NotModified: 304
    , UseProxy: 305
    , Unused: 306
    , TemporaryRedirect: 307
    , PermanentRedirect: 308
    , BadRequest: 400
    , Unauthorized: 401
    , PaymentRequired: 402
    , Forbidden: 403
    , NotFound: 404
    , MethodNotAllowed: 405
    , NotAcceptable: 406
    , ProxyAuthenticationRequired: 407
    , RequestTimeout: 408
    , Conflict: 409
    , Gone: 410
    , LengthRequired: 411
    , PreconditionFailed: 412
    , PayloadTooLarge: 413
    , UriTooLong: 414
    , UnsupportedMediaType: 415
    , RangeNotSatisfiable: 416
    , ExpectationFailed: 417
    , ImATeapot: 418
    , MisdirectedRequest: 421
    , UnprocessableEntity: 422
    , Locked: 423
    , FailedDependency: 424
    , TooEarly: 425
    , UpgradeRequired: 426
    , PreconditionRequired: 428
    , TooManyRequests: 429
    , RequestHeaderFieldsTooLarge: 431
    , UnavailableForLegalReasons: 451
    , InternalServerError: 500
    , NotImplemented: 501
    , BadGateway: 502
    , ServiceUnavailable: 503
    , GatewayTimeout: 504
    , HttpVersionNotSupported: 505
    , VariantAlsoNegotiates: 506
    , InsufficientStorage: 507
    , LoopDetected: 508
    , NotExtended: 510
    , NetworkAuthenticationRequired: 511
};
Object.entries(Ds)
    .forEach(([e, t]) => {
        Ds[t] = e
    });
const Jv = Ds;

function od(e) {
    const t = new ro(e)
        , r = ju(ro.prototype.request, t);
    return E.extend(r, ro.prototype, t, {
        allOwnKeys: !0
    }), E.extend(r, t, null, {
        allOwnKeys: !0
    }), r.create = function(o) {
        return od(jr(e, o))
    }, r
}
const Fe = od($i);
Fe.Axios = ro;
Fe.CanceledError = Nn;
Fe.CancelToken = Wv;
Fe.isCancel = ed;
Fe.VERSION = nd;
Fe.toFormData = Vo;
Fe.AxiosError = ge;
Fe.Cancel = Fe.CanceledError;
Fe.all = function(t) {
    return Promise.all(t)
};
Fe.spread = Kv;
Fe.isAxiosError = Gv;
Fe.mergeConfig = jr;
Fe.AxiosHeaders = Ct;
Fe.formToJSON = e => Zu(E.isHTMLForm(e) ? new FormData(e) : e);
Fe.getAdapter = rd.getAdapter;
Fe.HttpStatusCode = Jv;
Fe.default = Fe;
/*Container for States:*/
const Qv = {
    class: "container text-white"
}
    , Xv = {
        class: "max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800"
    }
    , Yv = {
        class: "my-6 mx-2"
    }
    , Zv = {
        class: "container flex flex-row"
    }
    , e_ = m("div", {
        class: "flex items-start text-2xl"
    }, "Cooling Unit", -1)
    , t_ = {
        /*section for toggleing States:*/
        class: "flex gap-3 flex-1 justify-end"
    }
    , r_ = {
        key: 0
        , class: "text-2xl"
    }
    , n_ = {
        key: 1
        , class: "text-2xl"
    }
    , o_ = {
        /*section for Last Updated:*/
        class: "flex justify-center uppercase text-xs italic m-2"
    }
    , s_ = m("div", {
        id: "updatedTime"
    }, "  2024-03-08 12:41:05 PM", -1)
    , i_ = m("div", {
        class: "inline-flex items-center justify-center w-full"
    }, [m("hr", {
        class: "w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300"
    }), m("span", {
        class: "absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase"
    }, "Controls")], -1)
    , l_ = {
        class: "flex justify-center text-sm italic m-2"
    }
    , a_ = {
        class: "grid grid-cols-2 m-2 sm:grid-cols-3 mx-auto gap-8 text-white w-full justify-around"
    }
    , c_ = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Machine:", -1)
    , u_ = {
        class: "flex justify-center"
    }
    , d_ = {
        key: 0
    }
    , f_ = {
        key: 1
    }
    , p_ = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Control Mode:", -1)
    , h_ = {
        class: "flex justify-center"
    }
    , g_ = {
        key: 0
    }
    , m_ = {
        key: 1
    }
    , b_ = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , y_ = {
        class: "text-4xl"
    }
    , v_ = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , __ = {
        class: "text-4xl"
    }
    , w_ = m("div", {
        class: "inline-flex items-center justify-center w-full"
    }, [m("hr", {
        class: "w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300"
    }), m("span", {
        class: "absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase"
    }, "Real Time Data")], -1)
    , x_ = {
        class: "grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full"
    }
    , k_ = {
        class: "custom-grid"
    }
    , S_ = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , E_ = m("br", null, null, -1)
    , C_ = {
        class: "text-4xl grid-rows-1"
    }
    , T_ = {
        class: "custom-grid"
    }
    , R_ = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, [G("Return Air"), m("br"), G("Humidity:")], -1)
    , $_ = {
        class: "text-4xl"
    }
    , A_ = {
        class: "custom-grid"
    }
    , O_ = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , P_ = m("br", null, null, -1)
    , N_ = {
        class: "text-4xl"
    }
    , F_ = {
        class: "custom-grid"
    }
    , I_ = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, [G("Supply Air"), m("br"), G("Humidity:")], -1)
    , L_ = {
        class: "text-4xl"
    }
    , M_ = {
        /*Fans/Motors Page View Grid*/
        class: "custom-grid"
    }
    , j_ = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Internal Fan (RPM)", -1)
    , z_ = {
        class: "text-4xl"
    }
    , H_ = {
        class: "custom-grid"
    }
    /*Fans and motors Condenser Motor (RPM) value*/
    , B_ = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "External Fan (RPM)", -1)
    , D_ = {
        class: "text-4xl"
    }
    , U_ = {
        class: "custom-grid"
    }
    /*Fans and motors Condenser Motor (RPM) value*/
    , V_ = m("div", {

        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Condenser Motor (RPM)", -1)
    , q_ = {
        class: "text-4xl"
    }
    , W_ = {
        key: 0
    }
    , K_ = {
        key: 1
    }
    , G_ = {
        __name: "HomeView"
        , setup(e) {
            const t = q("°F");
            let r = q(null)
                , n = q(!1)
                , o = q(!0)
                , s = q(!0)
                , i = q("80.6")
                , l = q("66.2")
                , a = q("0.0")
                , c = q("0")
                , u = q("0.0")
                , d = q("0")
                , f = q("0")
                , g = q("0")
                , b = q("0")
                , y = q(!1)
                , x = q("0")
                , w = q("0.0")
                , k = q("0.0")
                , T = [];
            const j = async () => {
                try {
                    const D = await Fe.get("http://192.168.221.166:3000/api/all");
                    if (D.status === 200) {
                        T = D.data;
                        for (let $ = 0; $ < T.length; $++) {
                            let Q = T[$];
                            w.value = parseFloat((T[$].returnAirTargetTemp / 10 * 1.8 + 32)
                                .toFixed(1)), a.value = parseFloat((T[$].returnAirTemperature / 10 * 1.8 + 32)
                                    .toFixed(1)), c.value = parseFloat((T[$].returnAirHumidity / 10)
                                        .toFixed(0)), k.value = parseFloat((T[$].supplyAirTargetTemp / 10 * 1.8 + 32)
                                            .toFixed(1)), u.value = parseFloat((T[$].supplyAirTemperature / 10 * 1.8 + 32)
                                                .toFixed(1)), d.value = T[$].supplyAirHumidity < 1e3 ? parseFloat((T[$].supplyAirHumidity / 10)
                                                    .toFixed(0)) : "-", f.value = parseInt(T[$].internalFanSpeed), g.value = parseInt(T[$].externalFanSpeed), b.value = parseInt(T[$].inverterCompressorSpeed), y.value = !!T[$].machine_active, x.value = !T[$].controlModeSetting
                        }
                    } else console.error("Error fetching data:", D.status)
                } catch (D) {
                    console.error("Error fetching data:", D)
                }
            };
            return $n(() => {
                j(), setInterval(j, 1e3)
            }), (D, $) => (M(), J("main", Qv, [m("div", Xv, [m("div", Yv, [m("div", Zv, [e_, m("div", t_, [m("button", {
                onClick: $[0] || ($[0] = Q => ke(r) ? r.value = !v(r) : r = !v(r))
            }, [v(r) ? (M(), J("div", r_, "[ - ]")) : (M(), J("div", n_, "[ + ]"))])])]), Qe(m("div", o_, [G("Last updated:"), s_], 512), [
                [lt, v(r)]
            ]), Z(ar, null, {
                default: le(() => [Qe(m("div", null, [i_, Qe(m("div", l_, "Log in to modify controls", 512), [
                    [lt, v(n) == !1]
                ]), m("div", a_, [m("div", {
                    class: ve(["custom-grid border-none", {
                        "grid-rows-2": v(n)
                    }])
                }, [c_, m("div", u_, [v(y) ? (M(), J("div", d_, [Z(v(je), {
                    type: "green"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", f_, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))]), Qe(m("div", null, [Z(v(Ta), {
                    modelValue: v(o)
                    , "onUpdate:modelValue": $[1] || ($[1] = Q => ke(o) ? o.value = Q : o = Q)
                    , color: "green"
                }, null, 8, ["modelValue"])], 512), [
                    [lt, v(n)]
                ])], 2), m("div", {
                    class: ve(["custom-grid border-none", {
                        "grid-rows-2": v(n)
                    }])
                }, [p_, m("div", h_, [v(x) ? (M(), J("div", g_, [Z(v(je), {
                    type: "green"
                    , size: "md"
                }, {
                    default: le(() => [G("Supply Air")])
                    , _: 1
                })])) : (M(), J("div", m_, [Z(v(je), {
                    type: "purple"
                    , size: "md"
                }, {
                    default: le(() => [G("Return Air")])
                    , _: 1
                })]))]), Qe(m("div", null, [Z(v(Ta), {
                    modelValue: v(s)
                    , "onUpdate:modelValue": $[2] || ($[2] = Q => ke(s) ? s.value = Q : s = Q)
                    , color: "green"
                }, null, 8, ["modelValue"])], 512), [
                    [lt, v(n)]
                ])], 2), v(x) ? (M(), J("div", {
                    key: 0
                    , class: ve(["custom-grid border-none", {
                        "grid-rows-2": v(n)
                    }])
                }, [m("div", b_, "Supply Air Target (" + ue(t.value) + "):", 1), m("div", y_, ue(v(k)), 1), Qe(m("div", null, [Z(v(Ca), {
                    modelValue: v(l)
                    , "onUpdate:modelValue": $[3] || ($[3] = Q => ke(l) ? l.value = Q : l = Q)
                    , placeholder: "Value"
                }, null, 8, ["modelValue"])], 512), [
                    [lt, v(n)]
                ])], 2)) : (M(), J("div", {
                    key: 1
                    , class: ve(["custom-grid border-none", {
                        "grid-rows-2": v(n)
                    }])
                }, [m("div", v_, "Return Air Target (" + ue(t.value) + "):", 1), m("div", __, ue(v(w)), 1), Qe(m("div", null, [Z(v(Ca), {
                    modelValue: v(i)
                    , "onUpdate:modelValue": $[4] || ($[4] = Q => ke(i) ? i.value = Q : i = Q)
                    , placeholder: "Value"
                }, null, 8, ["modelValue"])], 512), [
                    [lt, v(n)]
                ])], 2))]), w_, m("div", x_, [m("div", k_, [m("div", S_, [G("Return Air"), E_, G("Temp (" + ue(t.value) + "):", 1)]), m("div", C_, ue(v(a)), 1)]), m("div", T_, [R_, m("div", $_, ue(v(c)) + "%", 1)]), m("div", A_, [m("div", O_, [G("Supply Air"), P_, G("Temp (" + ue(t.value) + "):", 1)]), m("div", N_, ue(v(u)), 1)]), m("div", F_, [I_, m("div", L_, ue(v(d)) + "%", 1)]), m("div", M_, [j_, m("div", z_, ue(v(f)), 1)]), m("div", H_, [B_, m("div", D_, ue(v(g)), 1)]), m("div", U_, [V_, m("div", q_, ue(v(b)), 1)])])], 512), [
                    [lt, v(r)]
                ])])
                , _: 1
            })])]), Z(v(zg), {
                color: "light"
                , pill: ""
                , onClick: $[5] || ($[5] = Q => ke(n) ? n.value = !v(n) : n = !v(n))
            }, {
                default: le(() => [G("Toggle Log In State")])
                , _: 1
            }), m("div", null, [G("Status:   "), v(n) ? (M(), J("div", W_, "Logged In")) : (M(), J("div", K_, "Logged Out"))])]))
        }
    }
    , J_ = {
        class: "container text-white"
    }
    , Q_ = {
        class: "flex flex-row"
    }
    , X_ = m("div", {
        class: "flex flex-1 justify-start"
    }, [m("h1", {
        class: "mt-6"
    }, "Cooling Unit Readings:")], -1)
    , Y_ = {
        class: "flex justify-end mt-6"
    }
    , Z_ = {
        key: 0
    }
    , ew = {
        key: 1
    }
    , tw = m("div", {
        class: "flex justify-center uppercase text-xs italic mt-2"
    }, [G("Last updated:"), m("div", {
        id: "updatedTime"
    }, "  2024-03-18 3:03:05 PM")], -1)
    , rw = {
        class: "max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800"
    }
    , nw = {
        class: "my-6 mx-2"
    }
    , ow = {
        class: "container flex flex-row"
    }
    , sw = m("div", {
        class: "flex items-start"
    }, "States:", -1)
    , iw = {
        class: "flex gap-3 flex-1 justify-end"
    }
    , lw = {
        key: 0
    }
    , aw = {
        key: 1
    }
    , cw = {
        class: "grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mx-auto p-2 gap-8 text-white w-full"
    }
    , uw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Machine:", -1)
    , dw = {
        class: "flex justify-center"
    }
    , fw = {
        key: 0
    }
    , pw = {
        key: 1
    }
    , hw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Self-Check:", -1)
    , gw = {
        class: "flex justify-center"
    }
    , mw = {
        key: 0
    }
    , bw = {
        key: 1
    }
    , yw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Cooling:", -1)
    , vw = {
        class: "flex justify-center"
    }
    , _w = {
        key: 0
    }
    , ww = {
        key: 1
    }
    , xw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Heating:", -1)
    , kw = {
        class: "flex justify-center"
    }
    , Sw = {
        key: 0
    }
    , Ew = {
        key: 1
    }
    , Cw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Dehumidifier:", -1)
    , Tw = {
        class: "flex justify-center"
    }
    , Rw = {
        key: 0
    }
    , $w = {
        key: 1
    }
    , Aw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Humidifier:", -1)
    , Ow = {
        class: "flex justify-center"
    }
    , Pw = {
        key: 0
    }
    , Nw = {
        key: 1
    }
    , Fw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Dry Contact Alarming:", -1)
    , Iw = {
        class: "flex justify-center"
    }
    , Lw = {
        key: 0
    }
    , Mw = {
        key: 1
    }
    , jw = {
        class: "max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800"
    }
    , zw = {
        class: "my-6 mx-2"
    }
    , Hw = {
        class: "container flex flex-row"
    }
    , Bw = m("div", {
        class: "flex items-start"
    }, "Temperatures / Humidity:", -1)
    , Dw = {
        class: "flex gap-3 flex-1 justify-end"
    }
    , Uw = {
        key: 0
    }
    , Vw = {
        key: 1
    }
    , qw = {
        class: "grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full"
    }
    , Ww = {
        class: "custom-grid"
    }
    , Kw = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , Gw = m("br", null, null, -1)
    , Jw = {
        class: "text-4xl grid-rows-1"
    }
    , Qw = {
        class: "custom-grid"
    }
    , Xw = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, [G("Return Air"), m("br"), G("Humidity:")], -1)
    , Yw = {
        class: "text-4xl"
    }
    , Zw = {
        class: "custom-grid"
    }
    , ex = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , tx = m("br", null, null, -1)
    , rx = {
        class: "text-4xl"
    }
    , nx = {
        class: "custom-grid"
    }
    , ox = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, [G("Supply Air"), m("br"), G("Humidity:")], -1)
    , sx = {
        class: "text-4xl"
    }
    , ix = {
        class: "custom-grid"
    }
    , lx = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , ax = m("br", null, null, -1)
    , cx = {
        class: "text-4xl"
    }
    , ux = {
        class: "custom-grid"
    }
    , dx = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , fx = m("br", null, null, -1)
    , px = {
        class: "text-4xl"
    }
    , hx = {
        class: "custom-grid"
    }
    , gx = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , mx = m("br", null, null, -1)
    , bx = {
        class: "text-4xl"
    }
    , yx = {
        class: "custom-grid"
    }
    , vx = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , _x = m("br", null, null, -1)
    , wx = {
        class: "text-4xl"
    }
    , xx = {
        class: "custom-grid"
    }
    , kx = {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }
    , Sx = m("br", null, null, -1)
    , Ex = {
        class: "text-4xl"
    }
    , Cx = {
        class: "max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800"
    }
    , Tx = {
        class: "my-6 mx-2"
    }
    , Rx = {
        class: "container flex flex-row"
    }
    , $x = m("div", {
        class: "flex items-start"
    }, "Fans / Motors:", -1)
    , Ax = {
        class: "flex gap-3 flex-1 justify-end"
    }
    , Ox = {
        key: 0
    }
    , Px = {
        key: 1
    }
    , Nx = {
        class: "grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full"
    }
    , Fx = {
        class: "custom-grid"
    }
    , Ix = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Internal Fan (RPM)", -1)
    , Lx = {
        class: "text-4xl"
    }
    , Mx = {
        class: "custom-grid"
    }
    , jx = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "External Fan (RPM)", -1)
    , zx = {
        class: "text-4xl"
    }
    , Hx = {
        class: "custom-grid"
    }
    , Bx = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "Condenser Motor (RPM)", -1)
    , Dx = {
        class: "text-4xl"
    }
    , Ux = {
        class: "max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800"
    }
    , Vx = {
        class: "my-6 mx-2"
    }
    , qx = {
        class: "container flex flex-row"
    }
    , Wx = m("div", {
        class: "flex items-start"
    }, "Other Metrics:", -1)
    , Kx = {
        class: "flex gap-3 flex-1 justify-end"
    }
    , Gx = {
        key: 0
    }
    , Jx = {
        key: 1
    }
    , Qx = {
        class: "grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full"
    }
    , Xx = {
        class: "custom-grid"
    }
    , Yx = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "AC Voltage (VAC)", -1)
    , Zx = {
        class: "text-4xl"
    }
    , e1 = {
        class: "custom-grid"
    }
    , t1 = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, [G("Compressor Heater "), m("br"), G("Current (A)")], -1)
    , r1 = {
        class: "text-4xl"
    }
    , n1 = {
        class: "custom-grid"
    }
    , o1 = m("div", {
        class: "m-auto grid grid-rows-1 gap-4 text-center text-sm table-label"
    }, "EEV Position", -1)
    , s1 = {
        class: "text-4xl"
    }
    , i1 = {
        __name: "RCU"
        , setup(e) {
            let t = q(null)
                , r = q(null)
                , n = q(null)
                , o = q(null)
                , s = q(!1);
            const i = () => {
                s ? (n.value = !1, t.value = !1, o.value = !1, r.value = !1) : (n.value = !0, t.value = !0, o.value = !0, r.value = !0), s = !s
            }
                , l = q("°F");
            q(null), q(!1);
            let a = q(!1)
                , c = q(!1)
                , u = q(!1)
                , d = q(!1)
                , f = q(!1)
                , g = q(!1)
                , b = q(!1);
            q(!0);
            let y = q("0.0")
                , x = q("0")
                , w = q("0.0")
                , k = q("0")
                , T = q("0")
                , j = q("0")
                , D = q("0")
                , $ = q("0")
                , Q = q("0.0")
                , V = q("0.0")
                , oe = q("0.0")
                , W = q("0.0")
                , te = q("0.0")
                , A = q("0.0")
                , U = q("0.0")
                , de = q("0.0")
                , we = q("0.00")
                , ie = q("0")
                , z = [];
            const ce = async () => {
                try {
                    const Te = await Fe.get("http://192.168.221.166:3000/api/all");
                    if (Te.status === 200) {
                        z = Te.data;
                        for (let X = 0; X < z.length; X++) {
                            let Re = z[X];
                            Q.value = parseFloat((z[X].returnAirTargetTemp / 10 * 1.8 + 32)
                                .toFixed(1)), y.value = parseFloat((z[X].returnAirTemperature / 10 * 1.8 + 32)
                                    .toFixed(1)), x.value = parseFloat((z[X].returnAirHumidity / 10)
                                        .toFixed(0)), V.value = parseFloat((z[X].supplyAirTargetTemp / 10 * 1.8 + 32)
                                            .toFixed(1)), w.value = parseFloat((z[X].supplyAirTemperature / 10 * 1.8 + 32)
                                                .toFixed(1)), k.value = z[X].supplyAirHumidity < 1e3 ? parseFloat((z[X].supplyAirHumidity / 10)
                                                    .toFixed(0)) : "-", T.value = parseInt(z[X].internalFanSpeed), j.value = parseInt(z[X].externalFanSpeed), D.value = parseInt(z[X].inverterCompressorSpeed), a.value = !!z[X].machine_active, $.value = !z[X].controlModeSetting, oe.value = z[X].dischargeTemperature < 500 ? parseFloat((z[X].dischargeTemperature / 10 * 1.8 + 32)
                                                        .toFixed(1)) : "-", W.value = parseFloat((z[X].suctionTemperature / 10 * 1.8 + 32)
                                                            .toFixed(1)), te.value = parseFloat((z[X].evaporatorTemperature / 10 * 1.8 + 32)
                                                                .toFixed(1)), A.value = parseFloat((z[X].condenserTemperature / 10 * 1.8 + 32)
                                                                    .toFixed(1)), U.value = z[X].outdoorTemperature < 1e3 ? parseFloat((z[X].outdoorTemperature / 10 * 1.8 + 32)
                                                                        .toFixed(1)) : "-", de.value = parseFloat((z[X].acPowerVoltage / 10)
                                                                            .toFixed(1)), we.value = parseFloat((z[X].compressorHeaterCurrent / 100)
                                                                                .toFixed(2)), ie.value = parseInt(z[X].eevPosition), c.value = !!z[X].selfcheck_active, u.value = !!z[X].cooling_active, d.value = !!z[X].heating_active, f.value = !!z[X].dehumidification_active, g.value = !!z[X].humidifier_active, b.value = !!z[X].drycontactalarming_active
                        }
                    } else console.error("Error fetching data:", Te.status)
                } catch (Te) {
                    console.error("Error fetching data:", Te)
                }
            };
            return $n(() => {
                ce(), setInterval(ce, 1e3)
            }), (Te, X) => (M(), J("main", J_, [m("div", Q_, [X_, m("div", Y_, [m("button", {
                onClick: i
            }, [v(s) ? (M(), J("div", Z_, "[ Collapse All ]")) : (M(), J("div", ew, "[ Expand All ]"))])])]), tw, m("div", rw, [m("div", nw, [m("div", ow, [sw, m("div", iw, [m("button", {
                onClick: X[0] || (X[0] = Re => ke(t) ? t.value = !v(t) : t = !v(t))
            }, [v(t) ? (M(), J("div", lw, "[ - ]")) : (M(), J("div", aw, "[ + ]"))])])]), Z(ar, null, {
                default: le(() => [Qe(m("div", cw, [m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-green-600": v(a)
                    }])
                }, [uw, m("div", dw, [v(a) ? (M(), J("div", fw, [Z(v(je), {
                    type: "green"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", pw, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2), m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-blue-500": v(c)
                    }])
                }, [hw, m("div", gw, [v(c) ? (M(), J("div", mw, [Z(v(je), {
                    type: "blue"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", bw, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2), m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-green-600": v(u)
                    }])
                }, [yw, m("div", vw, [v(u) ? (M(), J("div", _w, [Z(v(je), {
                    type: "green"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", ww, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2), m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-red-500": v(d)
                    }])
                }, [xw, m("div", kw, [v(d) ? (M(), J("div", Sw, [Z(v(je), {
                    type: "green"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", Ew, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2), m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-purple-500": v(f)
                    }])
                }, [Cw, m("div", Tw, [v(f) ? (M(), J("div", Rw, [Z(v(je), {
                    type: "purple"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", $w, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2), m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-purple-500": v(g)
                    }])
                }, [Aw, m("div", Ow, [v(g) ? (M(), J("div", Pw, [Z(v(je), {
                    type: "purple"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", Nw, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2), m("div", {
                    class: ve(["custom-grid border-none dark:rounded-full dark:bg-gray-600", {
                        "dark:bg-purple-500": v(b)
                    }])
                }, [Fw, m("div", Iw, [v(b) ? (M(), J("div", Lw, [Z(v(je), {
                    type: "purple"
                    , size: "md"
                }, {
                    default: le(() => [G("ON")])
                    , _: 1
                })])) : (M(), J("div", Mw, [Z(v(je), {
                    type: "default"
                    , size: "md"
                }, {
                    default: le(() => [G("OFF")])
                    , _: 1
                })]))])], 2)], 512), [
                    [lt, v(t)]
                ])])
                , _: 1
            })])]), m("div", jw, [m("div", zw, [m("div", Hw, [Bw, m("div", Dw, [m("button", {
                onClick: X[1] || (X[1] = Re => ke(r) ? r.value = !v(r) : r = !v(r))
            }, [v(r) ? (M(), J("div", Uw, "[ - ]")) : (M(), J("div", Vw, "[ + ]"))])])]), Z(ar, null, {
                default: le(() => [Qe(m("div", qw, [m("div", Ww, [m("div", Kw, [G("Return Air"), Gw, G("Temp (" + ue(l.value) + "):", 1)]), m("div", Jw, ue(v(y)), 1)]), m("div", Qw, [Xw, m("div", Yw, ue(v(x)) + "%", 1)]), m("div", Zw, [m("div", ex, [G("Supply Air"), tx, G("Temp (" + ue(l.value) + "):", 1)]), m("div", rx, ue(v(w)), 1)]), m("div", nx, [ox, m("div", sx, ue(v(k)) + "%", 1)]), m("div", ix, [m("div", lx, [G("Discharge"), ax, G("Temp (" + ue(l.value) + "):", 1)]), m("div", cx, ue(v(oe)), 1)]), m("div", ux, [m("div", dx, [G("Suction"), fx, G("Temp (" + ue(l.value) + "):", 1)]), m("div", px, ue(v(W)), 1)]), m("div", hx, [m("div", gx, [G("Evaporator"), mx, G("Temp (" + ue(l.value) + "):", 1)]), m("div", bx, ue(v(te)), 1)]), m("div", yx, [m("div", vx, [G("Condenser"), _x, G("Temp (" + ue(l.value) + "):", 1)]), m("div", wx, ue(v(A)), 1)]), m("div", xx, [m("div", kx, [G("Outdoor"), Sx, G("Temp (" + ue(l.value) + "):", 1)]), m("div", Ex, ue(v(U)), 1)])], 512), [
                    [lt, v(r)]
                ])])
                , _: 1
            })])]), m("div", Cx, [m("div", Tx, [m("div", Rx, [$x, m("div", Ax, [m("button", {
                onClick: X[2] || (X[2] = Re => ke(n) ? n.value = !v(n) : n = !v(n))
            }, [v(n) ? (M(), J("div", Ox, "[ - ]")) : (M(), J("div", Px, "[ + ]"))])])]), Z(ar, null, {
                default: le(() => [Qe(m("div", Nx, [m("div", Fx, [Ix, m("div", Lx, ue(v(T)), 1)]), m("div", Mx, [jx, m("div", zx, ue(v(j)), 1)]), m("div", Hx, [Bx, m("div", Dx, ue(v(D)), 1)])], 512), [
                    [lt, v(n)]
                ])])
                , _: 1
            })])]), m("div", Ux, [m("div", Vx, [m("div", qx, [Wx, m("div", Kx, [m("button", {
                onClick: X[3] || (X[3] = Re => ke(o) ? o.value = !v(o) : o = !v(o))
            }, [v(o) ? (M(), J("div", Gx, "[ - ]")) : (M(), J("div", Jx, "[ + ]"))])])]), Z(ar, null, {
                default: le(() => [Qe(m("div", Qx, [m("div", Xx, [Yx, m("div", Zx, ue(v(de)), 1)]), m("div", e1, [t1, m("div", r1, ue(v(we)), 1)]), m("div", n1, [o1, m("div", s1, ue(v(ie)), 1)])], 512), [
                    [lt, v(o)]
                ])])
                , _: 1
            })])])]))
        }
    }
    , l1 = Hh({
        history: mh("/")
        , routes: [{
            path: "/"
            , name: "home"
            , component: G_
        }, {
            path: "/rcu"
            , name: "rcu"
            , component: i1
        }]
    })
    , Pi = Fp(Ny);
Pi.use(zp());
Pi.use(l1);
Pi.mount("#app");

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}