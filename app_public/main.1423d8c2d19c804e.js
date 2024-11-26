"use strict";
(self.webpackChunkexpense_tracker_frontend = self.webpackChunkexpense_tracker_frontend || []).push([
  [792],
  {
    49: () => {
      function ee(e) {
        return "function" == typeof e;
      }
      function Vi(e) {
        const t = e((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (t.prototype = Object.create(Error.prototype)), (t.prototype.constructor = t), t;
      }
      const Hi = Vi(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function gi(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class et {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t))) for (const o of t) o.remove(this);
              else t.remove(this);
            const { initialTeardown: i } = this;
            if (ee(i))
              try {
                i();
              } catch (o) {
                n = o instanceof Hi ? o.errors : [o];
              }
            const { _finalizers: r } = this;
            if (r) {
              this._finalizers = null;
              for (const o of r)
                try {
                  ji(o);
                } catch (s) {
                  (n = n ?? []), s instanceof Hi ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new Hi(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) ji(n);
            else {
              if (n instanceof et) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(n);
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n ? (this._parentage = null) : Array.isArray(t) && gi(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && gi(t, n), n instanceof et && n._removeParent(this);
        }
      }
      et.EMPTY = (() => {
        const e = new et();
        return (e.closed = !0), e;
      })();
      const $o = et.EMPTY;
      function Ca(e) {
        return (
          e instanceof et || (e && "closed" in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        );
      }
      function ji(e) {
        ee(e) ? e() : e.unsubscribe();
      }
      const mi = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Sr = {
          setTimeout(e, n, ...t) {
            const { delegate: i } = Sr;
            return i?.setTimeout ? i.setTimeout(e, n, ...t) : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = Sr;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function uu(e) {
        Sr.setTimeout(() => {
          const { onUnhandledError: n } = mi;
          if (!n) throw e;
          n(e);
        });
      }
      function $i() {}
      const du = Go("C", void 0, void 0);
      function Go(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let Xn = null;
      function kn(e) {
        if (mi.useDeprecatedSynchronousErrorHandling) {
          const n = !Xn;
          if ((n && (Xn = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: i } = Xn;
            if (((Xn = null), t)) throw i;
          }
        } else e();
      }
      class Nr extends et {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n ? ((this.destination = n), Ca(n) && n.add(this)) : (this.destination = Wo);
        }
        static create(n, t, i) {
          return new Qn(n, t, i);
        }
        next(n) {
          this.isStopped
            ? Uo(
                (function hu(e) {
                  return Go("N", e, void 0);
                })(n),
                this
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? Uo(
                (function fu(e) {
                  return Go("E", void 0, e);
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped ? Uo(du, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Sa = Function.prototype.bind;
      function Tr(e, n) {
        return Sa.call(e, n);
      }
      class Na {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (i) {
              Gt(i);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (i) {
              Gt(i);
            }
          else Gt(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              Gt(t);
            }
        }
      }
      class Qn extends Nr {
        constructor(n, t, i) {
          let r;
          if ((super(), ee(n) || !n))
            r = { next: n ?? void 0, error: t ?? void 0, complete: i ?? void 0 };
          else {
            let o;
            this && mi.useDeprecatedNextContext
              ? ((o = Object.create(n)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: n.next && Tr(n.next, o),
                  error: n.error && Tr(n.error, o),
                  complete: n.complete && Tr(n.complete, o),
                }))
              : (r = n);
          }
          this.destination = new Na(r);
        }
      }
      function Gt(e) {
        mi.useDeprecatedSynchronousErrorHandling
          ? (function pu(e) {
              mi.useDeprecatedSynchronousErrorHandling &&
                Xn &&
                ((Xn.errorThrown = !0), (Xn.error = e));
            })(e)
          : uu(e);
      }
      function Uo(e, n) {
        const { onStoppedNotification: t } = mi;
        t && Sr.setTimeout(() => t(e, n));
      }
      const Wo = {
          closed: !0,
          next: $i,
          error: function Ta(e) {
            throw e;
          },
          complete: $i,
        },
        zo = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Gi(e) {
        return e;
      }
      let Ae = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const i = new e();
            return (i.source = this), (i.operator = t), i;
          }
          subscribe(t, i, r) {
            const o = (function _u(e) {
              return (
                (e && e instanceof Nr) ||
                ((function mu(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete);
                })(e) &&
                  Ca(e))
              );
            })(t)
              ? t
              : new Qn(t, i, r);
            return (
              kn(() => {
                const { operator: s, source: a } = this;
                o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o));
              }),
              o
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (i) {
              t.error(i);
            }
          }
          forEach(t, i) {
            return new (i = Ia(i))((r, o) => {
              const s = new Qn({
                next: (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: r,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var i;
            return null === (i = this.source) || void 0 === i ? void 0 : i.subscribe(t);
          }
          [zo]() {
            return this;
          }
          pipe(...t) {
            return (function Ma(e) {
              return 0 === e.length
                ? Gi
                : 1 === e.length
                ? e[0]
                : function (t) {
                    return e.reduce((i, r) => r(i), t);
                  };
            })(t)(this);
          }
          toPromise(t) {
            return new (t = Ia(t))((i, r) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => r(s),
                () => i(o)
              );
            });
          }
        }
        return (e.create = (n) => new e(n)), e;
      })();
      function Ia(e) {
        var n;
        return null !== (n = e ?? mi.Promise) && void 0 !== n ? n : Promise;
      }
      const vu = Vi(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Pe = (() => {
        class e extends Ae {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const i = new Oa(this, this);
            return (i.operator = t), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new vu();
          }
          next(t) {
            kn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(t);
              }
            });
          }
          error(t) {
            kn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(t);
              }
            });
          }
          complete() {
            kn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0;
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
          }
          _innerSubscribe(t) {
            const { hasError: i, isStopped: r, observers: o } = this;
            return i || r
              ? $o
              : ((this.currentObservers = null),
                o.push(t),
                new et(() => {
                  (this.currentObservers = null), gi(o, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: i, thrownError: r, isStopped: o } = this;
            i ? t.error(r) : o && t.complete();
          }
          asObservable() {
            const t = new Ae();
            return (t.source = this), t;
          }
        }
        return (e.create = (n, t) => new Oa(n, t)), e;
      })();
      class Oa extends Pe {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t);
        }
        next(n) {
          var t, i;
          null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.next) ||
            void 0 === i ||
            i.call(t, n);
        }
        error(n) {
          var t, i;
          null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.error) ||
            void 0 === i ||
            i.call(t, n);
        }
        complete() {
          var n, t;
          null === (t = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) ||
            void 0 === t ||
            t.call(n);
        }
        _subscribe(n) {
          var t, i;
          return null !==
            (i = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(n)) &&
            void 0 !== i
            ? i
            : $o;
        }
      }
      function ot(e) {
        return (n) => {
          if (
            (function Aa(e) {
              return ee(e?.lift);
            })(n)
          )
            return n.lift(function (t) {
              try {
                return e(t, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function tt(e, n, t, i, r) {
        return new yu(e, n, t, i, r);
      }
      class yu extends Nr {
        constructor(n, t, i, r, o, s) {
          super(n),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (l) {
                    n.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    n.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t && (null === (n = this.onFinalize) || void 0 === n || n.call(this));
          }
        }
      }
      function vt(e, n) {
        return ot((t, i) => {
          let r = 0;
          t.subscribe(
            tt(i, (o) => {
              i.next(e.call(n, o, r++));
            })
          );
        });
      }
      function Ot(e) {
        return this instanceof Ot ? ((this.v = e), this) : new Ot(e);
      }
      function At(e) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = (function je(e) {
              var n = "function" == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                i = 0;
              if (t) return t.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e };
                  },
                };
              throw new TypeError(
                n ? "Object is not iterable." : "Symbol.iterator is not defined."
              );
            })(e)),
            (t = {}),
            i("next"),
            i("throw"),
            i("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function i(o) {
          t[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Su = (e) => e && "number" == typeof e.length && "function" != typeof e;
      function og(e) {
        return ee(e?.then);
      }
      function sg(e) {
        return ee(e[zo]);
      }
      function ag(e) {
        return Symbol.asyncIterator && ee(e?.[Symbol.asyncIterator]);
      }
      function lg(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const cg = (function yC() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
      })();
      function ug(e) {
        return ee(e?.[cg]);
      }
      function dg(e) {
        return (function Ui(e, n, t) {
          if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
          var r,
            i = t.apply(e, n || []),
            o = [];
          return (
            (r = Object.create(
              ("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype
            )),
            a("next"),
            a("throw"),
            a("return", function s(h) {
              return function (p) {
                return Promise.resolve(p).then(h, d);
              };
            }),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r
          );
          function a(h, p) {
            i[h] &&
              ((r[h] = function (g) {
                return new Promise(function (m, D) {
                  o.push([h, g, m, D]) > 1 || l(h, g);
                });
              }),
              p && (r[h] = p(r[h])));
          }
          function l(h, p) {
            try {
              !(function c(h) {
                h.value instanceof Ot ? Promise.resolve(h.value.v).then(u, d) : f(o[0][2], h);
              })(i[h](p));
            } catch (g) {
              f(o[0][3], g);
            }
          }
          function u(h) {
            l("next", h);
          }
          function d(h) {
            l("throw", h);
          }
          function f(h, p) {
            h(p), o.shift(), o.length && l(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const t = e.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Ot(t.read());
              if (r) return yield Ot(void 0);
              yield yield Ot(i);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function fg(e) {
        return ee(e?.getReader);
      }
      function st(e) {
        if (e instanceof Ae) return e;
        if (null != e) {
          if (sg(e))
            return (function bC(e) {
              return new Ae((n) => {
                const t = e[zo]();
                if (ee(t.subscribe)) return t.subscribe(n);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Su(e))
            return (function DC(e) {
              return new Ae((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                n.complete();
              });
            })(e);
          if (og(e))
            return (function EC(e) {
              return new Ae((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete());
                  },
                  (t) => n.error(t)
                ).then(null, uu);
              });
            })(e);
          if (ag(e)) return hg(e);
          if (ug(e))
            return (function wC(e) {
              return new Ae((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return;
                n.complete();
              });
            })(e);
          if (fg(e))
            return (function CC(e) {
              return hg(dg(e));
            })(e);
        }
        throw lg(e);
      }
      function hg(e) {
        return new Ae((n) => {
          (function SC(e, n) {
            var t, i, r, o;
            return (function E(e, n, t, i) {
              return new (t || (t = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function r(o) {
                        return o instanceof t
                          ? o
                          : new t(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(e, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = At(e); !(i = yield t.next()).done; )
                  if ((n.next(i.value), n.closed)) return;
              } catch (s) {
                r = { error: s };
              } finally {
                try {
                  i && !i.done && (o = t.return) && (yield o.call(t));
                } finally {
                  if (r) throw r.error;
                }
              }
              n.complete();
            });
          })(e, n).catch((t) => n.error(t));
        });
      }
      function vi(e, n, t, i = 0, r = !1) {
        const o = n.schedule(function () {
          t(), r ? e.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((e.add(o), !r)) return o;
      }
      function Or(e, n, t = 1 / 0) {
        return ee(n)
          ? Or((i, r) => vt((o, s) => n(i, o, r, s))(st(e(i, r))), t)
          : ("number" == typeof n && (t = n),
            ot((i, r) =>
              (function NC(e, n, t, i, r, o, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && n.complete();
                  },
                  h = (g) => (c < i ? p(g) : l.push(g)),
                  p = (g) => {
                    o && n.next(g), c++;
                    let m = !1;
                    st(t(g, u++)).subscribe(
                      tt(
                        n,
                        (D) => {
                          r?.(D), o ? h(D) : n.next(D);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; l.length && c < i; ) {
                                const D = l.shift();
                                s ? vi(n, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              n.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    tt(n, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, r, e, t)
            ));
      }
      function pg(e = 1 / 0) {
        return Or(Gi, e);
      }
      const Jo = new Ae((e) => e.complete());
      function gg(e) {
        return e && ee(e.schedule);
      }
      function Nu(e) {
        return e[e.length - 1];
      }
      function Tu(e) {
        return ee(Nu(e)) ? e.pop() : void 0;
      }
      function Fa(e) {
        return gg(Nu(e)) ? e.pop() : void 0;
      }
      function mg(e, n = 0) {
        return ot((t, i) => {
          t.subscribe(
            tt(
              i,
              (r) => vi(i, e, () => i.next(r), n),
              () => vi(i, e, () => i.complete(), n),
              (r) => vi(i, e, () => i.error(r), n)
            )
          );
        });
      }
      function _g(e, n = 0) {
        return ot((t, i) => {
          i.add(e.schedule(() => t.subscribe(i), n));
        });
      }
      function vg(e, n) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Ae((t) => {
          vi(t, n, () => {
            const i = e[Symbol.asyncIterator]();
            vi(
              t,
              n,
              () => {
                i.next().then((r) => {
                  r.done ? t.complete() : t.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Yo(e, n) {
        return n
          ? (function PC(e, n) {
              if (null != e) {
                if (sg(e))
                  return (function IC(e, n) {
                    return st(e).pipe(_g(n), mg(n));
                  })(e, n);
                if (Su(e))
                  return (function AC(e, n) {
                    return new Ae((t) => {
                      let i = 0;
                      return n.schedule(function () {
                        i === e.length
                          ? t.complete()
                          : (t.next(e[i++]), t.closed || this.schedule());
                      });
                    });
                  })(e, n);
                if (og(e))
                  return (function OC(e, n) {
                    return st(e).pipe(_g(n), mg(n));
                  })(e, n);
                if (ag(e)) return vg(e, n);
                if (ug(e))
                  return (function RC(e, n) {
                    return new Ae((t) => {
                      let i;
                      return (
                        vi(t, n, () => {
                          (i = e[cg]()),
                            vi(
                              t,
                              n,
                              () => {
                                let r, o;
                                try {
                                  ({ value: r, done: o } = i.next());
                                } catch (s) {
                                  return void t.error(s);
                                }
                                o ? t.complete() : t.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ee(i?.return) && i.return()
                      );
                    });
                  })(e, n);
                if (fg(e))
                  return (function xC(e, n) {
                    return vg(dg(e), n);
                  })(e, n);
              }
              throw lg(e);
            })(e, n)
          : st(e);
      }
      class FC extends Pe {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const t = super._subscribe(n);
          return !t.closed && n.next(this._value), t;
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: i } = this;
          if (n) throw t;
          return this._throwIfClosed(), i;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      function Ar(...e) {
        return Yo(e, Fa(e));
      }
      function bg(e = {}) {
        const {
          connector: n = () => new Pe(),
          resetOnError: t = !0,
          resetOnComplete: i = !0,
          resetOnRefCountZero: r = !0,
        } = e;
        return (o) => {
          let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (u = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return ot((g, m) => {
            c++, !d && !u && f();
            const D = (l = l ?? n());
            m.add(() => {
              c--, 0 === c && !d && !u && (a = Mu(p, r));
            }),
              D.subscribe(m),
              !s &&
                c > 0 &&
                ((s = new Qn({
                  next: (y) => D.next(y),
                  error: (y) => {
                    (d = !0), f(), (a = Mu(h, t, y)), D.error(y);
                  },
                  complete: () => {
                    (u = !0), f(), (a = Mu(h, i)), D.complete();
                  },
                })),
                st(g).subscribe(s));
          })(o);
        };
      }
      function Mu(e, n, ...t) {
        if (!0 === n) return void e();
        if (!1 === n) return;
        const i = new Qn({
          next: () => {
            i.unsubscribe(), e();
          },
        });
        return st(n(...t)).subscribe(i);
      }
      function Iu(e, n) {
        return ot((t, i) => {
          let r = null,
            o = 0,
            s = !1;
          const a = () => s && !r && i.complete();
          t.subscribe(
            tt(
              i,
              (l) => {
                r?.unsubscribe();
                let c = 0;
                const u = o++;
                st(e(l, u)).subscribe(
                  (r = tt(
                    i,
                    (d) => i.next(n ? n(l, d, u, c++) : d),
                    () => {
                      (r = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function kC(e, n) {
        return e === n;
      }
      function ve(e) {
        for (let n in e) if (e[n] === ve) return n;
        throw Error("Could not find renamed property on target object.");
      }
      function Ye(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Ye).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const n = e.toString();
        if (null == n) return "" + n;
        const t = n.indexOf("\n");
        return -1 === t ? n : n.substring(0, t);
      }
      function Ou(e, n) {
        return null == e || "" === e
          ? null === n
            ? ""
            : n
          : null == n || "" === n
          ? e
          : e + " " + n;
      }
      const LC = ve({ __forward_ref__: ve });
      function X(e) {
        return (
          (e.__forward_ref__ = X),
          (e.toString = function () {
            return Ye(this());
          }),
          e
        );
      }
      function z(e) {
        return (function Au(e) {
          return "function" == typeof e && e.hasOwnProperty(LC) && e.__forward_ref__ === X;
        })(e)
          ? e()
          : e;
      }
      function Ru(e) {
        return e && !!e.ɵproviders;
      }
      class T extends Error {
        constructor(n, t) {
          super(
            (function La(e, n) {
              return `NG0${Math.abs(e)}${n ? ": " + n : ""}`;
            })(n, t)
          ),
            (this.code = n);
        }
      }
      function K(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function xu(e, n) {
        throw new T(-201, !1);
      }
      function en(e, n) {
        null == e &&
          (function G(e, n, t, i) {
            throw new Error(
              `ASSERTION ERROR: ${e}` + (null == i ? "" : ` [Expected=> ${t} ${i} ${n} <=Actual]`)
            );
          })(n, e, null, "!=");
      }
      function V(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function we(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ba(e) {
        return wg(e, Ha) || wg(e, Cg);
      }
      function wg(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null;
      }
      function Va(e) {
        return e && (e.hasOwnProperty(Pu) || e.hasOwnProperty(UC)) ? e[Pu] : null;
      }
      const Ha = ve({ ɵprov: ve }),
        Pu = ve({ ɵinj: ve }),
        Cg = ve({ ngInjectableDef: ve }),
        UC = ve({ ngInjectorDef: ve });
      var ne = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(ne || {});
      let Fu;
      function Rt(e) {
        const n = Fu;
        return (Fu = e), n;
      }
      function Ng(e, n, t) {
        const i = Ba(e);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : t & ne.Optional
          ? null
          : void 0 !== n
          ? n
          : void xu(Ye(e));
      }
      const Ne = globalThis;
      class F {
        constructor(n, t) {
          (this._desc = n),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = V({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Zo = {},
        Hu = "__NG_DI_FLAG__",
        ja = "ngTempTokenPath",
        qC = /\n/gm,
        Mg = "__source";
      let Rr;
      function yi(e) {
        const n = Rr;
        return (Rr = e), n;
      }
      function YC(e, n = ne.Default) {
        if (void 0 === Rr) throw new T(-203, !1);
        return null === Rr ? Ng(e, void 0, n) : Rr.get(e, n & ne.Optional ? null : void 0, n);
      }
      function P(e, n = ne.Default) {
        return (
          (function Sg() {
            return Fu;
          })() || YC
        )(z(e), n);
      }
      function U(e, n = ne.Default) {
        return P(e, $a(n));
      }
      function $a(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
      }
      function ju(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
          const i = z(e[t]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new T(900, !1);
            let r,
              o = ne.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = ZC(a);
              "number" == typeof l ? (-1 === l ? (r = a.token) : (o |= l)) : (r = a);
            }
            n.push(P(r, o));
          } else n.push(P(i));
        }
        return n;
      }
      function Xo(e, n) {
        return (e[Hu] = n), (e.prototype[Hu] = n), e;
      }
      function ZC(e) {
        return e[Hu];
      }
      function ti(e) {
        return { toString: e }.toString();
      }
      var Ga = (function (e) {
          return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
        })(Ga || {}),
        hn = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(hn || {});
      const Ln = {},
        le = [],
        Ua = ve({ ɵcmp: ve }),
        $u = ve({ ɵdir: ve }),
        Gu = ve({ ɵpipe: ve }),
        Og = ve({ ɵmod: ve }),
        ni = ve({ ɵfac: ve }),
        Qo = ve({ __NG_ELEMENT_ID__: ve }),
        Ag = ve({ __NG_ENV_ID__: ve });
      function Rg(e, n, t) {
        let i = e.length;
        for (;;) {
          const r = e.indexOf(n, t);
          if (-1 === r) return r;
          if (0 === r || e.charCodeAt(r - 1) <= 32) {
            const o = n.length;
            if (r + o === i || e.charCodeAt(r + o) <= 32) return r;
          }
          t = r + 1;
        }
      }
      function Uu(e, n, t) {
        let i = 0;
        for (; i < t.length; ) {
          const r = t[i];
          if ("number" == typeof r) {
            if (0 !== r) break;
            i++;
            const o = t[i++],
              s = t[i++],
              a = t[i++];
            e.setAttribute(n, s, a, o);
          } else {
            const o = r,
              s = t[++i];
            Pg(o) ? e.setProperty(n, o, s) : e.setAttribute(n, o, s), i++;
          }
        }
        return i;
      }
      function xg(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Pg(e) {
        return 64 === e.charCodeAt(0);
      }
      function es(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice();
          else {
            let t = -1;
            for (let i = 0; i < n.length; i++) {
              const r = n[i];
              "number" == typeof r
                ? (t = r)
                : 0 === t || Fg(e, t, r, null, -1 === t || 2 === t ? n[++i] : null);
            }
          }
        return e;
      }
      function Fg(e, n, t, i, r) {
        let o = 0,
          s = e.length;
        if (-1 === n) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === n) {
                s = -1;
                break;
              }
              if (a > n) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === i) return void (null !== r && (e[o + 1] = r));
            if (i === e[o + 1]) return void (e[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== s && (e.splice(s, 0, n), (o = s + 1)),
          e.splice(o++, 0, t),
          null !== i && e.splice(o++, 0, i),
          null !== r && e.splice(o++, 0, r);
      }
      const kg = "ng-template";
      function eS(e, n, t) {
        let i = 0,
          r = !0;
        for (; i < e.length; ) {
          let o = e[i++];
          if ("string" == typeof o && r) {
            const s = e[i++];
            if (t && "class" === o && -1 !== Rg(s.toLowerCase(), n, 0)) return !0;
          } else {
            if (1 === o) {
              for (; i < e.length && "string" == typeof (o = e[i++]); )
                if (o.toLowerCase() === n) return !0;
              return !1;
            }
            "number" == typeof o && (r = !1);
          }
        }
        return !1;
      }
      function Lg(e) {
        return 4 === e.type && e.value !== kg;
      }
      function tS(e, n, t) {
        return n === (4 !== e.type || t ? e.value : kg);
      }
      function nS(e, n, t) {
        let i = 4;
        const r = e.attrs || [],
          o = (function oS(e) {
            for (let n = 0; n < e.length; n++) if (xg(e[n])) return n;
            return e.length;
          })(r);
        let s = !1;
        for (let a = 0; a < n.length; a++) {
          const l = n[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)), ("" !== l && !tS(e, l, t)) || ("" === l && 1 === n.length))
                ) {
                  if (pn(i)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & i ? l : n[++a];
                if (8 & i && null !== e.attrs) {
                  if (!eS(e.attrs, c, t)) {
                    if (pn(i)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = iS(8 & i ? "class" : l, r, Lg(e), t);
                if (-1 === d) {
                  if (pn(i)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > o ? "" : r[d + 1].toLowerCase();
                  const h = 8 & i ? f : null;
                  if ((h && -1 !== Rg(h, c, 0)) || (2 & i && c !== f)) {
                    if (pn(i)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !pn(i) && !pn(l)) return !1;
            if (s && pn(l)) continue;
            (s = !1), (i = l | (1 & i));
          }
        }
        return pn(i) || s;
      }
      function pn(e) {
        return 0 == (1 & e);
      }
      function iS(e, n, t, i) {
        if (null === n) return -1;
        let r = 0;
        if (i || !t) {
          let o = !1;
          for (; r < n.length; ) {
            const s = n[r];
            if (s === e) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = n[++r];
                for (; "string" == typeof a; ) a = n[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += o ? 1 : 2;
          }
          return -1;
        }
        return (function sS(e, n) {
          let t = e.indexOf(4);
          if (t > -1)
            for (t++; t < e.length; ) {
              const i = e[t];
              if ("number" == typeof i) return -1;
              if (i === n) return t;
              t++;
            }
          return -1;
        })(n, e);
      }
      function Bg(e, n, t = !1) {
        for (let i = 0; i < n.length; i++) if (nS(e, n[i], t)) return !0;
        return !1;
      }
      function aS(e, n) {
        e: for (let t = 0; t < n.length; t++) {
          const i = n[t];
          if (e.length === i.length) {
            for (let r = 0; r < e.length; r++) if (e[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Vg(e, n) {
        return e ? ":not(" + n.trim() + ")" : n;
      }
      function lS(e) {
        let n = e[0],
          t = 1,
          i = 2,
          r = "",
          o = !1;
        for (; t < e.length; ) {
          let s = e[t];
          if ("string" == typeof s)
            if (2 & i) {
              const a = e[++t];
              r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + s) : 4 & i && (r += " " + s);
          else "" !== r && !pn(s) && ((n += Vg(o, r)), (r = "")), (i = s), (o = o || !pn(i));
          t++;
        }
        return "" !== r && (n += Vg(o, r)), n;
      }
      function tn(e) {
        return ti(() => {
          const n = jg(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ga.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || hn.Emulated,
              styles: e.styles || le,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          $g(t);
          const i = e.dependencies;
          return (
            (t.directiveDefs = Wa(i, !1)),
            (t.pipeDefs = Wa(i, !0)),
            (t.id = (function mS(e) {
              let n = 0;
              const t = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const r of t) n = (Math.imul(31, n) + r.charCodeAt(0)) << 0;
              return (n += 2147483648), "c" + n;
            })(t)),
            t
          );
        });
      }
      function fS(e) {
        return ie(e) || at(e);
      }
      function hS(e) {
        return null !== e;
      }
      function Te(e) {
        return ti(() => ({
          type: e.type,
          bootstrap: e.bootstrap || le,
          declarations: e.declarations || le,
          imports: e.imports || le,
          exports: e.exports || le,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Hg(e, n) {
        if (null == e) return Ln;
        const t = {};
        for (const i in e)
          if (e.hasOwnProperty(i)) {
            let r = e[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])), (t[r] = i), n && (n[r] = o);
          }
        return t;
      }
      function M(e) {
        return ti(() => {
          const n = jg(e);
          return $g(n), n;
        });
      }
      function ie(e) {
        return e[Ua] || null;
      }
      function at(e) {
        return e[$u] || null;
      }
      function yt(e) {
        return e[Gu] || null;
      }
      function jg(e) {
        const n = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          inputTransforms: null,
          inputConfig: e.inputs || Ln,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || le,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Hg(e.inputs, n),
          outputs: Hg(e.outputs),
        };
      }
      function $g(e) {
        e.features?.forEach((n) => n(e));
      }
      function Wa(e, n) {
        if (!e) return null;
        const t = n ? yt : fS;
        return () => ("function" == typeof e ? e() : e).map((i) => t(i)).filter(hS);
      }
      const Le = 0,
        O = 1,
        Z = 2,
        Re = 3,
        gn = 4,
        ns = 5,
        gt = 6,
        xr = 7,
        $e = 8,
        bi = 9,
        Pr = 10,
        J = 11,
        is = 12,
        Gg = 13,
        Fr = 14,
        Ge = 15,
        rs = 16,
        kr = 17,
        Bn = 18,
        os = 19,
        Ug = 20,
        Di = 21,
        ii = 22,
        ss = 23,
        as = 24,
        Q = 25,
        Wu = 1,
        Wg = 2,
        Vn = 7,
        Lr = 9,
        lt = 11;
      function Pt(e) {
        return Array.isArray(e) && "object" == typeof e[Wu];
      }
      function bt(e) {
        return Array.isArray(e) && !0 === e[Wu];
      }
      function zu(e) {
        return 0 != (4 & e.flags);
      }
      function zi(e) {
        return e.componentOffset > -1;
      }
      function qa(e) {
        return 1 == (1 & e.flags);
      }
      function mn(e) {
        return !!e.template;
      }
      function qu(e) {
        return 0 != (512 & e[Z]);
      }
      function qi(e, n) {
        return e.hasOwnProperty(ni) ? e[ni] : null;
      }
      let ct = null,
        Ka = !1;
      function nn(e) {
        const n = ct;
        return (ct = e), n;
      }
      const Kg = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function Yg(e) {
        if (!cs(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !Qg(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function Xg(e) {
        (e.dirty = !0),
          (function Zg(e) {
            if (void 0 === e.liveConsumerNode) return;
            const n = Ka;
            Ka = !0;
            try {
              for (const t of e.liveConsumerNode) t.dirty || Xg(t);
            } finally {
              Ka = n;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function Ju(e) {
        return e && (e.nextProducerIndex = 0), nn(e);
      }
      function Yu(e, n) {
        if (
          (nn(n),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (cs(e))
            for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
              Ja(e.producerNode[t], e.producerIndexOfThis[t]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
        }
      }
      function Qg(e) {
        Br(e);
        for (let n = 0; n < e.producerNode.length; n++) {
          const t = e.producerNode[n],
            i = e.producerLastReadVersion[n];
          if (i !== t.version || (Yg(t), i !== t.version)) return !0;
        }
        return !1;
      }
      function em(e) {
        if ((Br(e), cs(e)))
          for (let n = 0; n < e.producerNode.length; n++)
            Ja(e.producerNode[n], e.producerIndexOfThis[n]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function Ja(e, n) {
        if (
          ((function nm(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          Br(e),
          1 === e.liveConsumerNode.length)
        )
          for (let i = 0; i < e.producerNode.length; i++)
            Ja(e.producerNode[i], e.producerIndexOfThis[i]);
        const t = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
          (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          n < e.liveConsumerNode.length)
        ) {
          const i = e.liveConsumerIndexOfThis[n],
            r = e.liveConsumerNode[n];
          Br(r), (r.producerIndexOfThis[i] = n);
        }
      }
      function cs(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function Br(e) {
        (e.producerNode ??= []), (e.producerIndexOfThis ??= []), (e.producerLastReadVersion ??= []);
      }
      let im = null;
      const am = () => {},
        IS = (() => ({
          ...Kg,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: am,
        }))();
      class OS {
        constructor(n, t, i) {
          (this.previousValue = n), (this.currentValue = t), (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function lm(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = RS), AS;
      }
      function AS() {
        const e = um(this),
          n = e?.current;
        if (n) {
          const t = e.previous;
          if (t === Ln) e.previous = n;
          else for (let i in n) t[i] = n[i];
          (e.current = null), this.ngOnChanges(n);
        }
      }
      function RS(e, n, t, i) {
        const r = this.declaredInputs[t],
          o =
            um(e) ||
            (function xS(e, n) {
              return (e[cm] = n);
            })(e, { previous: Ln, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[r];
        (s[r] = new OS(l && l.currentValue, n, a === Ln)), (e[i] = n);
      }
      const cm = "__ngSimpleChanges__";
      function um(e) {
        return e[cm] || null;
      }
      const Hn = function (e, n, t) {};
      function Me(e) {
        for (; Array.isArray(e); ) e = e[Le];
        return e;
      }
      function Ya(e, n) {
        return Me(n[e]);
      }
      function kt(e, n) {
        return Me(n[e.index]);
      }
      function hm(e, n) {
        return e.data[n];
      }
      function zt(e, n) {
        const t = n[e];
        return Pt(t) ? t : t[Le];
      }
      function wi(e, n) {
        return null == n ? null : e[n];
      }
      function pm(e) {
        e[kr] = 0;
      }
      function VS(e) {
        1024 & e[Z] || ((e[Z] |= 1024), mm(e, 1));
      }
      function gm(e) {
        1024 & e[Z] && ((e[Z] &= -1025), mm(e, -1));
      }
      function mm(e, n) {
        let t = e[Re];
        if (null === t) return;
        t[ns] += n;
        let i = t;
        for (t = t[Re]; null !== t && ((1 === n && 1 === i[ns]) || (-1 === n && 0 === i[ns])); )
          (t[ns] += n), (i = t), (t = t[Re]);
      }
      const W = { lFrame: Tm(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
      function ym() {
        return W.bindingsEnabled;
      }
      function Hr() {
        return null !== W.skipHydrationRootTNode;
      }
      function w() {
        return W.lFrame.lView;
      }
      function re() {
        return W.lFrame.tView;
      }
      function ut() {
        let e = bm();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function bm() {
        return W.lFrame.currentTNode;
      }
      function jn(e, n) {
        const t = W.lFrame;
        (t.currentTNode = e), (t.isParent = n);
      }
      function td() {
        return W.lFrame.isParent;
      }
      function nd() {
        W.lFrame.isParent = !1;
      }
      function jr() {
        return W.lFrame.bindingIndex++;
      }
      function oi(e) {
        const n = W.lFrame,
          t = n.bindingIndex;
        return (n.bindingIndex = n.bindingIndex + e), t;
      }
      function ZS(e, n) {
        const t = W.lFrame;
        (t.bindingIndex = t.bindingRootIndex = e), id(n);
      }
      function id(e) {
        W.lFrame.currentDirectiveIndex = e;
      }
      function Cm() {
        return W.lFrame.currentQueryIndex;
      }
      function od(e) {
        W.lFrame.currentQueryIndex = e;
      }
      function QS(e) {
        const n = e[O];
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[gt] : null;
      }
      function Sm(e, n, t) {
        if (t & ne.SkipSelf) {
          let r = n,
            o = e;
          for (
            ;
            !((r = r.parent),
            null !== r || t & ne.Host || ((r = QS(o)), null === r || ((o = o[Fr]), 10 & r.type)));

          );
          if (null === r) return !1;
          (n = r), (e = o);
        }
        const i = (W.lFrame = Nm());
        return (i.currentTNode = n), (i.lView = e), !0;
      }
      function sd(e) {
        const n = Nm(),
          t = e[O];
        (W.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1);
      }
      function Nm() {
        const e = W.lFrame,
          n = null === e ? null : e.child;
        return null === n ? Tm(e) : n;
      }
      function Tm(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = n), n;
      }
      function Mm() {
        const e = W.lFrame;
        return (W.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
      }
      const Im = Mm;
      function ad() {
        const e = Mm();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Et() {
        return W.lFrame.selectedIndex;
      }
      function Ki(e) {
        W.lFrame.selectedIndex = e;
      }
      function Fe() {
        const e = W.lFrame;
        return hm(e.tView, e.selectedIndex);
      }
      let Am = !0;
      function Za() {
        return Am;
      }
      function Ci(e) {
        Am = e;
      }
      function Xa(e, n) {
        for (let t = n.directiveStart, i = n.directiveEnd; t < i; t++) {
          const o = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o;
          s && (e.contentHooks ??= []).push(-t, s),
            a && ((e.contentHooks ??= []).push(t, a), (e.contentCheckHooks ??= []).push(t, a)),
            l && (e.viewHooks ??= []).push(-t, l),
            c && ((e.viewHooks ??= []).push(t, c), (e.viewCheckHooks ??= []).push(t, c)),
            null != u && (e.destroyHooks ??= []).push(t, u);
        }
      }
      function Qa(e, n, t) {
        Rm(e, n, 3, t);
      }
      function el(e, n, t, i) {
        (3 & e[Z]) === t && Rm(e, n, t, i);
      }
      function ld(e, n) {
        let t = e[Z];
        (3 & t) === n && ((t &= 8191), (t += 1), (e[Z] = t));
      }
      function Rm(e, n, t, i) {
        const o = i ?? -1,
          s = n.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & e[kr] : 0; l < s; l++)
          if ("number" == typeof n[l + 1]) {
            if (((a = n[l]), null != i && a >= i)) break;
          } else
            n[l] < 0 && (e[kr] += 65536),
              (a < o || -1 == o) && (aN(e, t, n, l), (e[kr] = (4294901760 & e[kr]) + l + 2)),
              l++;
      }
      function xm(e, n) {
        Hn(4, e, n);
        const t = nn(null);
        try {
          n.call(e);
        } finally {
          nn(t), Hn(5, e, n);
        }
      }
      function aN(e, n, t, i) {
        const r = t[i] < 0,
          o = t[i + 1],
          a = e[r ? -t[i] : t[i]];
        r ? e[Z] >> 13 < e[kr] >> 16 && (3 & e[Z]) === n && ((e[Z] += 8192), xm(a, o)) : xm(a, o);
      }
      const $r = -1;
      class ds {
        constructor(n, t, i) {
          (this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = i);
        }
      }
      function ud(e) {
        return e !== $r;
      }
      function fs(e) {
        return 32767 & e;
      }
      function hs(e, n) {
        let t = (function dN(e) {
            return e >> 16;
          })(e),
          i = n;
        for (; t > 0; ) (i = i[Fr]), t--;
        return i;
      }
      let dd = !0;
      function tl(e) {
        const n = dd;
        return (dd = e), n;
      }
      const Pm = 255,
        Fm = 5;
      let fN = 0;
      const $n = {};
      function nl(e, n) {
        const t = km(e, n);
        if (-1 !== t) return t;
        const i = n[O];
        i.firstCreatePass &&
          ((e.injectorIndex = n.length), fd(i.data, e), fd(n, null), fd(i.blueprint, null));
        const r = il(e, n),
          o = e.injectorIndex;
        if (ud(r)) {
          const s = fs(r),
            a = hs(r, n),
            l = a[O].data;
          for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c];
        }
        return (n[o + 8] = r), o;
      }
      function fd(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function km(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function il(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
        let t = 0,
          i = null,
          r = n;
        for (; null !== r; ) {
          if (((i = Gm(r)), null === i)) return $r;
          if ((t++, (r = r[Fr]), -1 !== i.injectorIndex)) return i.injectorIndex | (t << 16);
        }
        return $r;
      }
      function hd(e, n, t) {
        !(function hN(e, n, t) {
          let i;
          "string" == typeof t ? (i = t.charCodeAt(0) || 0) : t.hasOwnProperty(Qo) && (i = t[Qo]),
            null == i && (i = t[Qo] = fN++);
          const r = i & Pm;
          n.data[e + (r >> Fm)] |= 1 << r;
        })(e, n, t);
      }
      function Lm(e, n, t) {
        if (t & ne.Optional || void 0 !== e) return e;
        xu();
      }
      function Bm(e, n, t, i) {
        if ((t & ne.Optional && void 0 === i && (i = null), !(t & (ne.Self | ne.Host)))) {
          const r = e[bi],
            o = Rt(void 0);
          try {
            return r ? r.get(n, i, t & ne.Optional) : Ng(n, i, t & ne.Optional);
          } finally {
            Rt(o);
          }
        }
        return Lm(i, 0, t);
      }
      function Vm(e, n, t, i = ne.Default, r) {
        if (null !== e) {
          if (2048 & n[Z] && !(i & ne.Self)) {
            const s = (function yN(e, n, t, i, r) {
              let o = e,
                s = n;
              for (; null !== o && null !== s && 2048 & s[Z] && !(512 & s[Z]); ) {
                const a = Hm(o, s, t, i | ne.Self, $n);
                if (a !== $n) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[Ug];
                  if (c) {
                    const u = c.get(t, $n, i);
                    if (u !== $n) return u;
                  }
                  (l = Gm(s)), (s = s[Fr]);
                }
                o = l;
              }
              return r;
            })(e, n, t, i, $n);
            if (s !== $n) return s;
          }
          const o = Hm(e, n, t, i, $n);
          if (o !== $n) return o;
        }
        return Bm(n, t, i, r);
      }
      function Hm(e, n, t, i, r) {
        const o = (function mN(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const n = e.hasOwnProperty(Qo) ? e[Qo] : void 0;
          return "number" == typeof n ? (n >= 0 ? n & Pm : vN) : n;
        })(t);
        if ("function" == typeof o) {
          if (!Sm(n, e, i)) return i & ne.Host ? Lm(r, 0, i) : Bm(n, t, i, r);
          try {
            let s;
            if (((s = o(i)), null != s || i & ne.Optional)) return s;
            xu();
          } finally {
            Im();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = km(e, n),
            l = $r,
            c = i & ne.Host ? n[Ge][gt] : null;
          for (
            (-1 === a || i & ne.SkipSelf) &&
            ((l = -1 === a ? il(e, n) : n[a + 8]),
            l !== $r && $m(i, !1) ? ((s = n[O]), (a = fs(l)), (n = hs(l, n))) : (a = -1));
            -1 !== a;

          ) {
            const u = n[O];
            if (jm(o, a, u.data)) {
              const d = gN(a, n, t, s, i, c);
              if (d !== $n) return d;
            }
            (l = n[a + 8]),
              l !== $r && $m(i, n[O].data[a + 8] === c) && jm(o, a, n)
                ? ((s = u), (a = fs(l)), (n = hs(l, n)))
                : (a = -1);
          }
        }
        return r;
      }
      function gN(e, n, t, i, r, o) {
        const s = n[O],
          a = s.data[e + 8],
          u = rl(
            a,
            s,
            t,
            null == i ? zi(a) && dd : i != s && 0 != (3 & a.type),
            r & ne.Host && o === a
          );
        return null !== u ? Ji(n, s, u, a) : $n;
      }
      function rl(e, n, t, i, r) {
        const o = e.providerIndexes,
          s = n.data,
          a = 1048575 & o,
          l = e.directiveStart,
          u = o >> 20,
          f = r ? a + u : e.directiveEnd;
        for (let h = i ? a : a + u; h < f; h++) {
          const p = s[h];
          if ((h < l && t === p) || (h >= l && p.type === t)) return h;
        }
        if (r) {
          const h = s[l];
          if (h && mn(h) && h.type === t) return l;
        }
        return null;
      }
      function Ji(e, n, t, i) {
        let r = e[t];
        const o = n.data;
        if (
          (function lN(e) {
            return e instanceof ds;
          })(r)
        ) {
          const s = r;
          s.resolving &&
            (function BC(e, n) {
              const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
              throw new T(-200, `Circular dependency in DI detected for ${e}${t}`);
            })(
              (function pe(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e && null != e && "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : K(e);
              })(o[t])
            );
          const a = tl(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Rt(s.injectImpl) : null;
          Sm(e, i, ne.Default);
          try {
            (r = e[t] = s.factory(void 0, o, e, i)),
              n.firstCreatePass &&
                t >= i.directiveStart &&
                (function sN(e, n, t) {
                  const { ngOnChanges: i, ngOnInit: r, ngDoCheck: o } = n.type.prototype;
                  if (i) {
                    const s = lm(n);
                    (t.preOrderHooks ??= []).push(e, s), (t.preOrderCheckHooks ??= []).push(e, s);
                  }
                  r && (t.preOrderHooks ??= []).push(0 - e, r),
                    o &&
                      ((t.preOrderHooks ??= []).push(e, o),
                      (t.preOrderCheckHooks ??= []).push(e, o));
                })(t, o[t], n);
          } finally {
            null !== c && Rt(c), tl(a), (s.resolving = !1), Im();
          }
        }
        return r;
      }
      function jm(e, n, t) {
        return !!(t[n + (e >> Fm)] & (1 << e));
      }
      function $m(e, n) {
        return !(e & ne.Self || (e & ne.Host && n));
      }
      class wt {
        constructor(n, t) {
          (this._tNode = n), (this._lView = t);
        }
        get(n, t, i) {
          return Vm(this._tNode, this._lView, n, $a(i), t);
        }
      }
      function vN() {
        return new wt(ut(), w());
      }
      function Gm(e) {
        const n = e[O],
          t = n.type;
        return 2 === t ? n.declTNode : 1 === t ? e[gt] : null;
      }
      const Wr = "__parameters__";
      function qr(e, n, t) {
        return ti(() => {
          const i = (function gd(e) {
            return function (...t) {
              if (e) {
                const i = e(...t);
                for (const r in i) this[r] = i[r];
              }
            };
          })(n);
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(Wr)
                ? l[Wr]
                : Object.defineProperty(l, Wr, { value: [] })[Wr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            t && (r.prototype = Object.create(t.prototype)),
            (r.prototype.ngMetadataName = e),
            (r.annotationCls = r),
            r
          );
        });
      }
      function Jr(e, n) {
        e.forEach((t) => (Array.isArray(t) ? Jr(t, n) : n(t)));
      }
      function Wm(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t);
      }
      function ol(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
      }
      function ms(e, n) {
        const t = [];
        for (let i = 0; i < e; i++) t.push(n);
        return t;
      }
      function qt(e, n, t) {
        let i = Yr(e, n);
        return (
          i >= 0
            ? (e[1 | i] = t)
            : ((i = ~i),
              (function NN(e, n, t, i) {
                let r = e.length;
                if (r == n) e.push(t, i);
                else if (1 === r) e.push(i, e[0]), (e[0] = t);
                else {
                  for (r--, e.push(e[r - 1], e[r]); r > n; ) (e[r] = e[r - 2]), r--;
                  (e[n] = t), (e[n + 1] = i);
                }
              })(e, i, n, t)),
          i
        );
      }
      function md(e, n) {
        const t = Yr(e, n);
        if (t >= 0) return e[1 | t];
      }
      function Yr(e, n) {
        return (function zm(e, n, t) {
          let i = 0,
            r = e.length >> t;
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = e[o << t];
            if (n === s) return o << t;
            s > n ? (r = o) : (i = o + 1);
          }
          return ~(r << t);
        })(e, n, 1);
      }
      const vd = Xo(qr("Optional"), 8),
        yd = Xo(qr("SkipSelf"), 4);
      function dl(e) {
        return 128 == (128 & e.flags);
      }
      var Si = (function (e) {
        return (e[(e.Important = 1)] = "Important"), (e[(e.DashCase = 2)] = "DashCase"), e;
      })(Si || {});
      const wd = new Map();
      let YN = 0;
      const Sd = "__ngContext__";
      function mt(e, n) {
        Pt(n)
          ? ((e[Sd] = n[os]),
            (function XN(e) {
              wd.set(e[os], e);
            })(n))
          : (e[Sd] = n);
      }
      let Nd;
      function Td(e, n) {
        return Nd(e, n);
      }
      function ys(e) {
        const n = e[Re];
        return bt(n) ? n[Re] : n;
      }
      function f_(e) {
        return p_(e[is]);
      }
      function h_(e) {
        return p_(e[gn]);
      }
      function p_(e) {
        for (; null !== e && !bt(e); ) e = e[gn];
        return e;
      }
      function Qr(e, n, t, i, r) {
        if (null != i) {
          let o,
            s = !1;
          bt(i) ? (o = i) : Pt(i) && ((s = !0), (i = i[Le]));
          const a = Me(i);
          0 === e && null !== t
            ? null == r
              ? v_(n, t, a)
              : Yi(n, t, a, r || null, !0)
            : 1 === e && null !== t
            ? Yi(n, t, a, r || null, !0)
            : 2 === e
            ? (function vl(e, n, t) {
                const i = ml(e, n);
                i &&
                  (function _T(e, n, t, i) {
                    e.removeChild(n, t, i);
                  })(e, i, n, t);
              })(n, a, s)
            : 3 === e && n.destroyNode(a),
            null != o &&
              (function bT(e, n, t, i, r) {
                const o = t[Vn];
                o !== Me(t) && Qr(n, e, i, o, r);
                for (let a = lt; a < t.length; a++) {
                  const l = t[a];
                  Ds(l[O], l, e, n, i, o);
                }
              })(n, e, o, t, r);
        }
      }
      function pl(e, n, t) {
        return e.createElement(n, t);
      }
      function m_(e, n) {
        const t = e[Lr],
          i = t.indexOf(n);
        gm(n), t.splice(i, 1);
      }
      function gl(e, n) {
        if (e.length <= lt) return;
        const t = lt + n,
          i = e[t];
        if (i) {
          const r = i[rs];
          null !== r && r !== e && m_(r, i), n > 0 && (e[t - 1][gn] = i[gn]);
          const o = ol(e, lt + n);
          !(function cT(e, n) {
            Ds(e, n, n[J], 2, null, null), (n[Le] = null), (n[gt] = null);
          })(i[O], i);
          const s = o[Bn];
          null !== s && s.detachView(o[O]), (i[Re] = null), (i[gn] = null), (i[Z] &= -129);
        }
        return i;
      }
      function Id(e, n) {
        if (!(256 & n[Z])) {
          const t = n[J];
          n[ss] && em(n[ss]),
            n[as] && em(n[as]),
            t.destroyNode && Ds(e, n, t, 3, null, null),
            (function fT(e) {
              let n = e[is];
              if (!n) return Od(e[O], e);
              for (; n; ) {
                let t = null;
                if (Pt(n)) t = n[is];
                else {
                  const i = n[lt];
                  i && (t = i);
                }
                if (!t) {
                  for (; n && !n[gn] && n !== e; ) Pt(n) && Od(n[O], n), (n = n[Re]);
                  null === n && (n = e), Pt(n) && Od(n[O], n), (t = n && n[gn]);
                }
                n = t;
              }
            })(n);
        }
      }
      function Od(e, n) {
        if (!(256 & n[Z])) {
          (n[Z] &= -129),
            (n[Z] |= 256),
            (function mT(e, n) {
              let t;
              if (null != e && null != (t = e.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = n[t[i]];
                  if (!(r instanceof ds)) {
                    const o = t[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        Hn(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          Hn(5, a, l);
                        }
                      }
                    else {
                      Hn(4, r, o);
                      try {
                        o.call(r);
                      } finally {
                        Hn(5, r, o);
                      }
                    }
                  }
                }
            })(e, n),
            (function gT(e, n) {
              const t = e.cleanup,
                i = n[xr];
              if (null !== t)
                for (let o = 0; o < t.length - 1; o += 2)
                  if ("string" == typeof t[o]) {
                    const s = t[o + 3];
                    s >= 0 ? i[s]() : i[-s].unsubscribe(), (o += 2);
                  } else t[o].call(i[t[o + 1]]);
              null !== i && (n[xr] = null);
              const r = n[Di];
              if (null !== r) {
                n[Di] = null;
                for (let o = 0; o < r.length; o++) (0, r[o])();
              }
            })(e, n),
            1 === n[O].type && n[J].destroy();
          const t = n[rs];
          if (null !== t && bt(n[Re])) {
            t !== n[Re] && m_(t, n);
            const i = n[Bn];
            null !== i && i.detachView(e);
          }
          !(function QN(e) {
            wd.delete(e[os]);
          })(n);
        }
      }
      function Ad(e, n, t) {
        return (function __(e, n, t) {
          let i = n;
          for (; null !== i && 40 & i.type; ) i = (n = i).parent;
          if (null === i) return t[Le];
          {
            const { componentOffset: r } = i;
            if (r > -1) {
              const { encapsulation: o } = e.data[i.directiveStart + r];
              if (o === hn.None || o === hn.Emulated) return null;
            }
            return kt(i, t);
          }
        })(e, n.parent, t);
      }
      function Yi(e, n, t, i, r) {
        e.insertBefore(n, t, i, r);
      }
      function v_(e, n, t) {
        e.appendChild(n, t);
      }
      function y_(e, n, t, i, r) {
        null !== i ? Yi(e, n, t, i, r) : v_(e, n, t);
      }
      function ml(e, n) {
        return e.parentNode(n);
      }
      function b_(e, n, t) {
        return E_(e, n, t);
      }
      let Rd,
        kd,
        E_ = function D_(e, n, t) {
          return 40 & e.type ? kt(e, t) : null;
        };
      function _l(e, n, t, i) {
        const r = Ad(e, i, n),
          o = n[J],
          a = b_(i.parent || n[gt], i, n);
        if (null != r)
          if (Array.isArray(t)) for (let l = 0; l < t.length; l++) y_(o, r, t[l], a, !1);
          else y_(o, r, t, a, !1);
        void 0 !== Rd && Rd(o, i, n, t, r);
      }
      function bs(e, n) {
        if (null !== n) {
          const t = n.type;
          if (3 & t) return kt(n, e);
          if (4 & t) return xd(-1, e[n.index]);
          if (8 & t) {
            const i = n.child;
            if (null !== i) return bs(e, i);
            {
              const r = e[n.index];
              return bt(r) ? xd(-1, r) : Me(r);
            }
          }
          if (32 & t) return Td(n, e)() || Me(e[n.index]);
          {
            const i = C_(e, n);
            return null !== i ? (Array.isArray(i) ? i[0] : bs(ys(e[Ge]), i)) : bs(e, n.next);
          }
        }
        return null;
      }
      function C_(e, n) {
        return null !== n ? e[Ge][gt].projection[n.projection] : null;
      }
      function xd(e, n) {
        const t = lt + e + 1;
        if (t < n.length) {
          const i = n[t],
            r = i[O].firstChild;
          if (null !== r) return bs(i, r);
        }
        return n[Vn];
      }
      function Pd(e, n, t, i, r, o, s) {
        for (; null != t; ) {
          const a = i[t.index],
            l = t.type;
          if ((s && 0 === n && (a && mt(Me(a), i), (t.flags |= 2)), 32 != (32 & t.flags)))
            if (8 & l) Pd(e, n, t.child, i, r, o, !1), Qr(n, e, r, a, o);
            else if (32 & l) {
              const c = Td(t, i);
              let u;
              for (; (u = c()); ) Qr(n, e, r, u, o);
              Qr(n, e, r, a, o);
            } else 16 & l ? N_(e, n, i, t, r, o) : Qr(n, e, r, a, o);
          t = s ? t.projectionNext : t.next;
        }
      }
      function Ds(e, n, t, i, r, o) {
        Pd(t, i, e.firstChild, n, r, o, !1);
      }
      function N_(e, n, t, i, r, o) {
        const s = t[Ge],
          l = s[gt].projection[i.projection];
        if (Array.isArray(l)) for (let c = 0; c < l.length; c++) Qr(n, e, r, l[c], o);
        else {
          let c = l;
          const u = s[Re];
          dl(i) && (c.flags |= 128), Pd(e, n, c, u, r, o, !0);
        }
      }
      function T_(e, n, t) {
        "" === t ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t);
      }
      function M_(e, n, t) {
        const { mergedAttrs: i, classes: r, styles: o } = t;
        null !== i && Uu(e, n, i),
          null !== r && T_(e, n, r),
          null !== o &&
            (function ET(e, n, t) {
              e.setAttribute(n, "style", t);
            })(e, n, o);
      }
      class R_ {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Ni(e) {
        return e instanceof R_ ? e.changingThisBreaksApplicationSecurity : e;
      }
      const El = new F("ENVIRONMENT_INITIALIZER"),
        j_ = new F("INJECTOR", -1),
        $_ = new F("INJECTOR_DEF_TYPES");
      class $d {
        get(n, t = Zo) {
          if (t === Zo) {
            const i = new Error(`NullInjectorError: No provider for ${Ye(n)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return t;
        }
      }
      function YT(...e) {
        return { ɵproviders: G_(0, e), ɵfromNgModule: !0 };
      }
      function G_(e, ...n) {
        const t = [],
          i = new Set();
        let r;
        const o = (s) => {
          t.push(s);
        };
        return (
          Jr(n, (s) => {
            const a = s;
            wl(a, o, [], i) && ((r ||= []), r.push(a));
          }),
          void 0 !== r && U_(r, o),
          t
        );
      }
      function U_(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { ngModule: i, providers: r } = e[t];
          Ud(r, (o) => {
            n(o, i);
          });
        }
      }
      function wl(e, n, t, i) {
        if (!(e = z(e))) return !1;
        let r = null,
          o = Va(e);
        const s = !o && ie(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          r = e;
        } else {
          const l = e.ngModule;
          if (((o = Va(l)), !o)) return !1;
          r = l;
        }
        const a = i.has(r);
        if (s) {
          if (a) return !1;
          if ((i.add(r), s.dependencies)) {
            const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
            for (const c of l) wl(c, n, t, i);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              i.add(r);
              try {
                Jr(o.imports, (u) => {
                  wl(u, n, t, i) && ((c ||= []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && U_(c, n);
            }
            if (!a) {
              const c = qi(r) || (() => new r());
              n({ provide: r, useFactory: c, deps: le }, r),
                n({ provide: $_, useValue: r, multi: !0 }, r),
                n({ provide: El, useValue: () => P(r), multi: !0 }, r);
            }
            const l = o.providers;
            if (null != l && !a) {
              const c = e;
              Ud(l, (u) => {
                n(u, c);
              });
            }
          }
        }
        return r !== e && void 0 !== e.providers;
      }
      function Ud(e, n) {
        for (let t of e) Ru(t) && (t = t.ɵproviders), Array.isArray(t) ? Ud(t, n) : n(t);
      }
      const ZT = ve({ provide: String, useValue: ve });
      function Wd(e) {
        return null !== e && "object" == typeof e && ZT in e;
      }
      function Zi(e) {
        return "function" == typeof e;
      }
      const zd = new F("Set Injector scope."),
        Cl = {},
        QT = {};
      let qd;
      function Sl() {
        return void 0 === qd && (qd = new $d()), qd;
      }
      class on {}
      class io extends on {
        get destroyed() {
          return this._destroyed;
        }
        constructor(n, t, i, r) {
          super(),
            (this.parent = t),
            (this.source = i),
            (this.scopes = r),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Jd(n, (s) => this.processProvider(s)),
            this.records.set(j_, ro(void 0, this)),
            r.has("environment") && this.records.set(on, ro(void 0, this));
          const o = this.records.get(zd);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get($_.multi, le, ne.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            const n = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const t of n) t();
          } finally {
            this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear();
          }
        }
        onDestroy(n) {
          return (
            this.assertNotDestroyed(), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n)
          );
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const t = yi(this),
            i = Rt(void 0);
          try {
            return n();
          } finally {
            yi(t), Rt(i);
          }
        }
        get(n, t = Zo, i = ne.Default) {
          if ((this.assertNotDestroyed(), n.hasOwnProperty(Ag))) return n[Ag](this);
          i = $a(i);
          const o = yi(this),
            s = Rt(void 0);
          try {
            if (!(i & ne.SkipSelf)) {
              let l = this.records.get(n);
              if (void 0 === l) {
                const c =
                  (function rM(e) {
                    return "function" == typeof e || ("object" == typeof e && e instanceof F);
                  })(n) && Ba(n);
                (l = c && this.injectableDefInScope(c) ? ro(Kd(n), Cl) : null),
                  this.records.set(n, l);
              }
              if (null != l) return this.hydrate(n, l);
            }
            return (i & ne.Self ? Sl() : this.parent).get(
              n,
              (t = i & ne.Optional && t === Zo ? null : t)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[ja] = a[ja] || []).unshift(Ye(n)), o)) throw a;
              return (function XC(e, n, t, i) {
                const r = e[ja];
                throw (
                  (n[Mg] && r.unshift(n[Mg]),
                  (e.message = (function QC(e, n, t, i = null) {
                    e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                    let r = Ye(n);
                    if (Array.isArray(n)) r = n.map(Ye).join(" -> ");
                    else if ("object" == typeof n) {
                      let o = [];
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s];
                          o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Ye(a)));
                        }
                      r = `{${o.join(", ")}}`;
                    }
                    return `${t}${i ? "(" + i + ")" : ""}[${r}]: ${e.replace(qC, "\n  ")}`;
                  })("\n" + e.message, r, t, i)),
                  (e.ngTokenPath = r),
                  (e[ja] = null),
                  e)
                );
              })(a, n, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            Rt(s), yi(o);
          }
        }
        resolveInjectorInitializers() {
          const n = yi(this),
            t = Rt(void 0);
          try {
            const r = this.get(El.multi, le, ne.Self);
            for (const o of r) o();
          } finally {
            yi(n), Rt(t);
          }
        }
        toString() {
          const n = [],
            t = this.records;
          for (const i of t.keys()) n.push(Ye(i));
          return `R3Injector[${n.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new T(205, !1);
        }
        processProvider(n) {
          let t = Zi((n = z(n))) ? n : z(n && n.provide);
          const i = (function tM(e) {
            return Wd(e)
              ? ro(void 0, e.useValue)
              : ro(
                  (function q_(e, n, t) {
                    let i;
                    if (Zi(e)) {
                      const r = z(e);
                      return qi(r) || Kd(r);
                    }
                    if (Wd(e)) i = () => z(e.useValue);
                    else if (
                      (function z_(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      i = () => e.useFactory(...ju(e.deps || []));
                    else if (
                      (function W_(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      i = () => P(z(e.useExisting));
                    else {
                      const r = z(e && (e.useClass || e.provide));
                      if (
                        !(function nM(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return qi(r) || Kd(r);
                      i = () => new r(...ju(e.deps));
                    }
                    return i;
                  })(e),
                  Cl
                );
          })(n);
          if (Zi(n) || !0 !== n.multi) this.records.get(t);
          else {
            let r = this.records.get(t);
            r ||
              ((r = ro(void 0, Cl, !0)), (r.factory = () => ju(r.multi)), this.records.set(t, r)),
              (t = n),
              r.multi.push(n);
          }
          this.records.set(t, i);
        }
        hydrate(n, t) {
          return (
            t.value === Cl && ((t.value = QT), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function iM(e) {
                return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy;
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const t = z(n.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
        removeOnDestroy(n) {
          const t = this._onDestroyHooks.indexOf(n);
          -1 !== t && this._onDestroyHooks.splice(t, 1);
        }
      }
      function Kd(e) {
        const n = Ba(e),
          t = null !== n ? n.factory : qi(e);
        if (null !== t) return t;
        if (e instanceof F) throw new T(204, !1);
        if (e instanceof Function)
          return (function eM(e) {
            const n = e.length;
            if (n > 0) throw (ms(n, "?"), new T(204, !1));
            const t = (function GC(e) {
              return (e && (e[Ha] || e[Cg])) || null;
            })(e);
            return null !== t ? () => t.factory(e) : () => new e();
          })(e);
        throw new T(204, !1);
      }
      function ro(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 };
      }
      function Jd(e, n) {
        for (const t of e) Array.isArray(t) ? Jd(t, n) : t && Ru(t) ? Jd(t.ɵproviders, n) : n(t);
      }
      const Nl = new F("AppId", { providedIn: "root", factory: () => oM }),
        oM = "ng",
        K_ = new F("Platform Initializer"),
        Xi = new F("Platform ID", { providedIn: "platform", factory: () => "unknown" }),
        J_ = new F("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function to() {
              if (void 0 !== kd) return kd;
              if (typeof document < "u") return document;
              throw new T(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Y_ = (e, n, t) => null;
      function rf(e, n, t = !1) {
        return Y_(e, n, t);
      }
      class gM {}
      class Q_ {}
      class _M {
        resolveComponentFactory(n) {
          throw (function mM(e) {
            const n = Error(`No component factory found for ${Ye(e)}.`);
            return (n.ngComponent = e), n;
          })(n);
        }
      }
      let Rl = (() => {
        class e {
          static {
            this.NULL = new _M();
          }
        }
        return e;
      })();
      function vM() {
        return ao(ut(), w());
      }
      function ao(e, n) {
        return new be(kt(e, n));
      }
      let be = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t;
          }
          static {
            this.__NG_ELEMENT_ID__ = vM;
          }
        }
        return e;
      })();
      function yM(e) {
        return e instanceof be ? e.nativeElement : e;
      }
      class lf {}
      let DM = (() => {
        class e {
          static {
            this.ɵprov = V({ token: e, providedIn: "root", factory: () => null });
          }
        }
        return e;
      })();
      class xl {
        constructor(n) {
          (this.full = n),
            (this.major = n.split(".")[0]),
            (this.minor = n.split(".")[1]),
            (this.patch = n.split(".").slice(2).join("."));
        }
      }
      const EM = new xl("16.2.12"),
        cf = {};
      function rv(e, n = null, t = null, i) {
        const r = ov(e, n, t, i);
        return r.resolveInjectorInitializers(), r;
      }
      function ov(e, n = null, t = null, i, r = new Set()) {
        const o = [t || le, YT(e)];
        return (
          (i = i || ("object" == typeof e ? void 0 : Ye(e))), new io(o, n || Sl(), i || null, r)
        );
      }
      let Ct = (() => {
        class e {
          static {
            this.THROW_IF_NOT_FOUND = Zo;
          }
          static {
            this.NULL = new $d();
          }
          static create(t, i) {
            if (Array.isArray(t)) return rv({ name: "" }, i, t, "");
            {
              const r = t.name ?? "";
              return rv({ name: r }, t.parent, t.providers, r);
            }
          }
          static {
            this.ɵprov = V({ token: e, providedIn: "any", factory: () => P(j_) });
          }
          static {
            this.__NG_ELEMENT_ID__ = -1;
          }
        }
        return e;
      })();
      function uf(e) {
        return e.ngOriginalError;
      }
      class ai {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const t = this._findOriginalError(n);
          this._console.error("ERROR", n), t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(n) {
          let t = n && uf(n);
          for (; t && uf(t); ) t = uf(t);
          return t || null;
        }
      }
      function df(e) {
        return (n) => {
          setTimeout(e, void 0, n);
        };
      }
      const j = class OM extends Pe {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, t, i) {
          let r = n,
            o = t || (() => null),
            s = i;
          if (n && "object" == typeof n) {
            const l = n;
            (r = l.next?.bind(l)), (o = l.error?.bind(l)), (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = df(o)), r && (r = df(r)), s && (s = df(s)));
          const a = super.subscribe({ next: r, error: o, complete: s });
          return n instanceof et && n.add(a), a;
        }
      };
      function av(...e) {}
      class ue {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new j(!1)),
            (this.onMicrotaskEmpty = new j(!1)),
            (this.onStable = new j(!1)),
            (this.onError = new j(!1)),
            typeof Zone > "u")
          )
            throw new T(908, !1);
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && t),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function AM() {
              const e = "function" == typeof Ne.requestAnimationFrame;
              let n = Ne[e ? "requestAnimationFrame" : "setTimeout"],
                t = Ne[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && n && t) {
                const i = n[Zone.__symbol__("OriginalDelegate")];
                i && (n = i);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return { nativeRequestAnimationFrame: n, nativeCancelAnimationFrame: t };
            })().nativeRequestAnimationFrame),
            (function PM(e) {
              const n = () => {
                !(function xM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(Ne, () => {
                      e.fakeTopEventTask ||
                        (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                          "fakeTopEventTask",
                          () => {
                            (e.lastRequestAnimationFrameId = -1),
                              hf(e),
                              (e.isCheckStableRunning = !0),
                              ff(e),
                              (e.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        e.fakeTopEventTask.invoke();
                    })),
                    hf(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, i, r, o, s, a) => {
                  if (
                    (function kM(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return t.invokeTask(r, o, s, a);
                  try {
                    return lv(e), t.invokeTask(r, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection && "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      cv(e);
                  }
                },
                onInvoke: (t, i, r, o, s, a, l) => {
                  try {
                    return lv(e), t.invoke(r, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), cv(e);
                  }
                },
                onHasTask: (t, i, r, o) => {
                  t.hasTask(r, o),
                    i === r &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask), hf(e), ff(e))
                        : "macroTask" == o.change && (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (t, i, r, o) => (
                  t.handleError(r, o), e.runOutsideAngular(() => e.onError.emit(o)), !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ue.isInAngularZone()) throw new T(909, !1);
        }
        static assertNotInAngularZone() {
          if (ue.isInAngularZone()) throw new T(909, !1);
        }
        run(n, t, i) {
          return this._inner.run(n, t, i);
        }
        runTask(n, t, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + r, n, RM, av, av);
          try {
            return o.runTask(s, t, i);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(n, t, i) {
          return this._inner.runGuarded(n, t, i);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const RM = {};
      function ff(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function hf(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function lv(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function cv(e) {
        e._nesting--, ff(e);
      }
      class FM {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new j()),
            (this.onMicrotaskEmpty = new j()),
            (this.onStable = new j()),
            (this.onError = new j());
        }
        run(n, t, i) {
          return n.apply(t, i);
        }
        runGuarded(n, t, i) {
          return n.apply(t, i);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, t, i, r) {
          return n.apply(t, i);
        }
      }
      const uv = new F("", { providedIn: "root", factory: dv });
      function dv() {
        const e = U(ue);
        let n = !0;
        return (function yg(...e) {
          const n = Fa(e),
            t = (function MC(e, n) {
              return "number" == typeof Nu(e) ? e.pop() : n;
            })(e, 1 / 0),
            i = e;
          return i.length ? (1 === i.length ? st(i[0]) : pg(t)(Yo(i, n))) : Jo;
        })(
          new Ae((r) => {
            (n = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                r.next(n), r.complete();
              });
          }),
          new Ae((r) => {
            let o;
            e.runOutsideAngular(() => {
              o = e.onStable.subscribe(() => {
                ue.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !n &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((n = !0), r.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ue.assertInAngularZone(),
                n &&
                  ((n = !1),
                  e.runOutsideAngular(() => {
                    r.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          }).pipe(bg())
        );
      }
      let pf = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--, 0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static {
            this.ɵprov = V({ token: e, providedIn: "root", factory: () => new e() });
          }
        }
        return e;
      })();
      function Ts(e) {
        for (; e; ) {
          e[Z] |= 64;
          const n = ys(e);
          if (qu(e) && !n) return e;
          e = n;
        }
        return null;
      }
      const mv = new F("", { providedIn: "root", factory: () => !1 });
      let kl = null;
      function bv(e, n) {
        return e[n] ?? wv();
      }
      function Dv(e, n) {
        const t = wv();
        t.producerNode?.length && ((e[n] = kl), (t.lView = e), (kl = Ev()));
      }
      const zM = {
        ...Kg,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Ts(e.lView);
        },
        lView: null,
      };
      function Ev() {
        return Object.create(zM);
      }
      function wv() {
        return (kl ??= Ev()), kl;
      }
      const Y = {};
      function x(e) {
        Cv(re(), w(), Et() + e, !1);
      }
      function Cv(e, n, t, i) {
        if (!i)
          if (3 == (3 & n[Z])) {
            const o = e.preOrderCheckHooks;
            null !== o && Qa(n, o, t);
          } else {
            const o = e.preOrderHooks;
            null !== o && el(n, o, 0, t);
          }
        Ki(t);
      }
      function v(e, n = ne.Default) {
        const t = w();
        return null === t ? P(e, n) : Vm(ut(), t, z(e), n);
      }
      function Ll(e, n, t, i, r, o, s, a, l, c, u) {
        const d = n.blueprint.slice();
        return (
          (d[Le] = r),
          (d[Z] = 140 | i),
          (null !== c || (e && 2048 & e[Z])) && (d[Z] |= 2048),
          pm(d),
          (d[Re] = d[Fr] = e),
          (d[$e] = t),
          (d[Pr] = s || (e && e[Pr])),
          (d[J] = a || (e && e[J])),
          (d[bi] = l || (e && e[bi]) || null),
          (d[gt] = o),
          (d[os] = (function ZN() {
            return YN++;
          })()),
          (d[ii] = u),
          (d[Ug] = c),
          (d[Ge] = 2 == n.type ? e[Ge] : d),
          d
        );
      }
      function fo(e, n, t, i, r) {
        let o = e.data[n];
        if (null === o)
          (o = (function gf(e, n, t, i, r) {
            const o = bm(),
              s = td(),
              l = (e.data[n] = (function tI(e, n, t, i, r, o) {
                let s = n ? n.injectorIndex : -1,
                  a = 0;
                return (
                  Hr() && (a |= 128),
                  {
                    type: t,
                    index: i,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: r,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: n,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, t, n, i, r));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && ((o.next = l), (l.prev = o))),
              l
            );
          })(e, n, t, i, r)),
            (function YS() {
              return W.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = t), (o.value = i), (o.attrs = r);
          const s = (function us() {
            const e = W.lFrame,
              n = e.currentTNode;
            return e.isParent ? n : n.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return jn(o, !0), o;
      }
      function Ms(e, n, t, i) {
        if (0 === t) return -1;
        const r = n.length;
        for (let o = 0; o < t; o++) n.push(i), e.blueprint.push(i), e.data.push(null);
        return r;
      }
      function Sv(e, n, t, i, r) {
        const o = bv(n, ss),
          s = Et(),
          a = 2 & i;
        try {
          Ki(-1), a && n.length > Q && Cv(e, n, Q, !1), Hn(a ? 2 : 0, r);
          const c = a ? o : null,
            u = Ju(c);
          try {
            null !== c && (c.dirty = !1), t(i, r);
          } finally {
            Yu(c, u);
          }
        } finally {
          a && null === n[ss] && Dv(n, ss), Ki(s), Hn(a ? 3 : 1, r);
        }
      }
      function mf(e, n, t) {
        if (zu(n)) {
          const i = nn(null);
          try {
            const o = n.directiveEnd;
            for (let s = n.directiveStart; s < o; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, t[s], s);
            }
          } finally {
            nn(i);
          }
        }
      }
      function _f(e, n, t) {
        ym() &&
          ((function lI(e, n, t, i) {
            const r = t.directiveStart,
              o = t.directiveEnd;
            zi(t) &&
              (function gI(e, n, t) {
                const i = kt(n, e),
                  r = Nv(t);
                let s = 16;
                t.signals ? (s = 4096) : t.onPush && (s = 64);
                const a = Bl(
                  e,
                  Ll(
                    e,
                    r,
                    null,
                    s,
                    i,
                    n,
                    null,
                    e[Pr].rendererFactory.createRenderer(i, t),
                    null,
                    null,
                    null
                  )
                );
                e[n.index] = a;
              })(n, t, e.data[r + t.componentOffset]),
              e.firstCreatePass || nl(t, n),
              mt(i, n);
            const s = t.initialInputs;
            for (let a = r; a < o; a++) {
              const l = e.data[a],
                c = Ji(n, e, a, t);
              mt(c, n),
                null !== s && mI(0, a - r, c, l, 0, s),
                mn(l) && (zt(t.index, n)[$e] = Ji(n, e, a, t));
            }
          })(e, n, t, kt(t, n)),
          64 == (64 & t.flags) && Av(e, n, t));
      }
      function vf(e, n, t = kt) {
        const i = n.localNames;
        if (null !== i) {
          let r = n.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? t(n, e) : e[s];
            e[r++] = a;
          }
        }
      }
      function Nv(e) {
        const n = e.tView;
        return null === n || n.incompleteFirstPass
          ? (e.tView = yf(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : n;
      }
      function yf(e, n, t, i, r, o, s, a, l, c, u) {
        const d = Q + i,
          f = d + r,
          h = (function JM(e, n) {
            const t = [];
            for (let i = 0; i < n; i++) t.push(i < e ? null : Y);
            return t;
          })(d, f),
          p = "function" == typeof c ? c() : c;
        return (h[O] = {
          type: e,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: u,
        });
      }
      let Tv = (e) => null;
      function Mv(e, n, t, i) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            t = null === t ? {} : t;
            const o = e[r];
            null === i ? Iv(t, n, r, o) : i.hasOwnProperty(r) && Iv(t, n, i[r], o);
          }
        return t;
      }
      function Iv(e, n, t, i) {
        e.hasOwnProperty(t) ? e[t].push(n, i) : (e[t] = [n, i]);
      }
      function bf(e, n, t, i) {
        if (ym()) {
          const r = null === i ? null : { "": -1 },
            o = (function uI(e, n) {
              const t = e.directiveRegistry;
              let i = null,
                r = null;
              if (t)
                for (let o = 0; o < t.length; o++) {
                  const s = t[o];
                  if (Bg(n, s.selectors, !1))
                    if ((i || (i = []), mn(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (r = r || new Map()),
                          s.findHostDirectiveDefs(s, a, r),
                          i.unshift(...a, s),
                          Df(e, n, a.length);
                      } else i.unshift(s), Df(e, n, 0);
                    else (r = r || new Map()), s.findHostDirectiveDefs?.(s, i, r), i.push(s);
                }
              return null === i ? null : [i, r];
            })(e, t);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && Ov(e, n, t, s, r, a),
            r &&
              (function dI(e, n, t) {
                if (n) {
                  const i = (e.localNames = []);
                  for (let r = 0; r < n.length; r += 2) {
                    const o = t[n[r + 1]];
                    if (null == o) throw new T(-301, !1);
                    i.push(n[r], o);
                  }
                }
              })(t, i, r);
        }
        t.mergedAttrs = es(t.mergedAttrs, t.attrs);
      }
      function Ov(e, n, t, i, r, o) {
        for (let c = 0; c < i.length; c++) hd(nl(t, n), e, i[c].type);
        !(function hI(e, n, t) {
          (e.flags |= 1), (e.directiveStart = n), (e.directiveEnd = n + t), (e.providerIndexes = n);
        })(t, e.data.length, i.length);
        for (let c = 0; c < i.length; c++) {
          const u = i[c];
          u.providersResolver && u.providersResolver(u);
        }
        let s = !1,
          a = !1,
          l = Ms(e, n, i.length, null);
        for (let c = 0; c < i.length; c++) {
          const u = i[c];
          (t.mergedAttrs = es(t.mergedAttrs, u.hostAttrs)),
            pI(e, t, n, l, u),
            fI(l, u, r),
            null !== u.contentQueries && (t.flags |= 4),
            (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) &&
              (t.flags |= 64);
          const d = u.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(t.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(t.index), (a = !0)),
            l++;
        }
        !(function nI(e, n, t) {
          const r = n.directiveEnd,
            o = e.data,
            s = n.attrs,
            a = [];
          let l = null,
            c = null;
          for (let u = n.directiveStart; u < r; u++) {
            const d = o[u],
              f = t ? t.get(d) : null,
              p = f ? f.outputs : null;
            (l = Mv(d.inputs, u, l, f ? f.inputs : null)), (c = Mv(d.outputs, u, c, p));
            const g = null === l || null === s || Lg(n) ? null : _I(l, u, s);
            a.push(g);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (n.flags |= 8),
            l.hasOwnProperty("style") && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = l),
            (n.outputs = c);
        })(e, t, o);
      }
      function Av(e, n, t) {
        const i = t.directiveStart,
          r = t.directiveEnd,
          o = t.index,
          s = (function XS() {
            return W.lFrame.currentDirectiveIndex;
          })();
        try {
          Ki(o);
          for (let a = i; a < r; a++) {
            const l = e.data[a],
              c = n[a];
            id(a),
              (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && cI(l, c);
          }
        } finally {
          Ki(-1), id(s);
        }
      }
      function cI(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n);
      }
      function Df(e, n, t) {
        (n.componentOffset = t), (e.components ??= []).push(n.index);
      }
      function fI(e, n, t) {
        if (t) {
          if (n.exportAs) for (let i = 0; i < n.exportAs.length; i++) t[n.exportAs[i]] = e;
          mn(n) && (t[""] = e);
        }
      }
      function pI(e, n, t, i, r) {
        e.data[i] = r;
        const o = r.factory || (r.factory = qi(r.type)),
          s = new ds(o, mn(r), v);
        (e.blueprint[i] = s),
          (t[i] = s),
          (function sI(e, n, t, i, r) {
            const o = r.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~n.index;
              (function aI(e) {
                let n = e.length;
                for (; n > 0; ) {
                  const t = e[--n];
                  if ("number" == typeof t && t < 0) return t;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(t, i, o);
            }
          })(e, n, i, Ms(e, t, r.hostVars, Y), r);
      }
      function Gn(e, n, t, i, r, o) {
        const s = kt(e, n);
        !(function Ef(e, n, t, i, r, o, s) {
          if (null == o) e.removeAttribute(n, r, t);
          else {
            const a = null == s ? K(o) : s(o, i || "", r);
            e.setAttribute(n, r, a, t);
          }
        })(n[J], s, o, e.value, t, i, r);
      }
      function mI(e, n, t, i, r, o) {
        const s = o[n];
        if (null !== s) for (let a = 0; a < s.length; ) Rv(i, t, s[a++], s[a++], s[a++]);
      }
      function Rv(e, n, t, i, r) {
        const o = nn(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(i) && (r = s[i].call(n, r)),
            null !== e.setInput ? e.setInput(n, r, t, i) : (n[i] = r);
        } finally {
          nn(o);
        }
      }
      function _I(e, n, t) {
        let i = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === i && (i = []);
                const s = e[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === n) {
                    i.push(o, s[a + 1], t[r + 1]);
                    break;
                  }
              }
              r += 2;
            } else r += 2;
          else r += 4;
        }
        return i;
      }
      function xv(e, n, t, i) {
        return [e, !0, !1, n, null, 0, i, t, null, null, null];
      }
      function Pv(e, n) {
        const t = e.contentQueries;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const o = t[i + 1];
            if (-1 !== o) {
              const s = e.data[o];
              od(t[i]), s.contentQueries(2, n[o], o);
            }
          }
      }
      function Bl(e, n) {
        return e[is] ? (e[Gg][gn] = n) : (e[is] = n), (e[Gg] = n), n;
      }
      function wf(e, n, t) {
        od(0);
        const i = nn(null);
        try {
          n(e, t);
        } finally {
          nn(i);
        }
      }
      function Fv(e) {
        return e[xr] || (e[xr] = []);
      }
      function kv(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Bv(e, n) {
        const t = e[bi],
          i = t ? t.get(ai, null) : null;
        i && i.handleError(n);
      }
      function Cf(e, n, t, i, r) {
        for (let o = 0; o < t.length; ) {
          const s = t[o++],
            a = t[o++];
          Rv(e.data[s], n[s], i, a, r);
        }
      }
      function vI(e, n) {
        const t = zt(n, e),
          i = t[O];
        !(function yI(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t]);
        })(i, t);
        const r = t[Le];
        null !== r && null === t[ii] && (t[ii] = rf(r, t[bi])), Sf(i, t, t[$e]);
      }
      function Sf(e, n, t) {
        sd(n);
        try {
          const i = e.viewQuery;
          null !== i && wf(1, i, t);
          const r = e.template;
          null !== r && Sv(e, n, r, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Pv(e, n),
            e.staticViewQueries && wf(2, e.viewQuery, t);
          const o = e.components;
          null !== o &&
            (function bI(e, n) {
              for (let t = 0; t < n.length; t++) vI(e, n[t]);
            })(n, o);
        } catch (i) {
          throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), i);
        } finally {
          (n[Z] &= -5), ad();
        }
      }
      let Vv = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(t, i, r) {
            const o = typeof Zone > "u" ? null : Zone.current,
              s = (function MS(e, n, t) {
                const i = Object.create(IS);
                t && (i.consumerAllowSignalWrites = !0), (i.fn = e), (i.schedule = n);
                const r = (s) => {
                  i.cleanupFn = s;
                };
                return (
                  (i.ref = {
                    notify: () => Xg(i),
                    run: () => {
                      if (((i.dirty = !1), i.hasRun && !Qg(i))) return;
                      i.hasRun = !0;
                      const s = Ju(i);
                      try {
                        i.cleanupFn(), (i.cleanupFn = am), i.fn(r);
                      } finally {
                        Yu(i, s);
                      }
                    },
                    cleanup: () => i.cleanupFn(),
                  }),
                  i.ref
                );
              })(
                t,
                (c) => {
                  this.all.has(c) && this.queue.set(c, o);
                },
                r
              );
            let a;
            this.all.add(s), s.notify();
            const l = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = i?.onDestroy(l)), { destroy: l };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [t, i] of this.queue)
                this.queue.delete(t), i ? i.run(() => t.run()) : t.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static {
            this.ɵprov = V({ token: e, providedIn: "root", factory: () => new e() });
          }
        }
        return e;
      })();
      function Vl(e, n, t) {
        let i = t ? e.styles : null,
          r = t ? e.classes : null,
          o = 0;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (r = Ou(r, a))
              : 2 == o && (i = Ou(i, a + ": " + n[++s] + ";"));
          }
        t ? (e.styles = i) : (e.stylesWithoutHost = i),
          t ? (e.classes = r) : (e.classesWithoutHost = r);
      }
      function Is(e, n, t, i, r = !1) {
        for (; null !== t; ) {
          const o = n[t.index];
          null !== o && i.push(Me(o)), bt(o) && Hv(o, i);
          const s = t.type;
          if (8 & s) Is(e, n, t.child, i);
          else if (32 & s) {
            const a = Td(t, n);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & s) {
            const a = C_(n, t);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = ys(n[Ge]);
              Is(l[O], l, a, i, !0);
            }
          }
          t = r ? t.projectionNext : t.next;
        }
        return i;
      }
      function Hv(e, n) {
        for (let t = lt; t < e.length; t++) {
          const i = e[t],
            r = i[O].firstChild;
          null !== r && Is(i[O], i, r, n);
        }
        e[Vn] !== e[Le] && n.push(e[Vn]);
      }
      function Hl(e, n, t, i = !0) {
        const r = n[Pr],
          o = r.rendererFactory,
          s = r.afterRenderEventManager;
        o.begin?.(), s?.begin();
        try {
          jv(e, n, e.template, t);
        } catch (l) {
          throw (i && Bv(n, l), l);
        } finally {
          o.end?.(), r.effectManager?.flush(), s?.end();
        }
      }
      function jv(e, n, t, i) {
        const r = n[Z];
        if (256 != (256 & r)) {
          n[Pr].effectManager?.flush(), sd(n);
          try {
            pm(n),
              (function Em(e) {
                return (W.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== t && Sv(e, n, t, 2, i);
            const s = 3 == (3 & r);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && Qa(n, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && el(n, c, 0, null), ld(n, 0);
            }
            if (
              ((function wI(e) {
                for (let n = f_(e); null !== n; n = h_(n)) {
                  if (!n[Wg]) continue;
                  const t = n[Lr];
                  for (let i = 0; i < t.length; i++) {
                    VS(t[i]);
                  }
                }
              })(n),
              $v(n, 2),
              null !== e.contentQueries && Pv(e, n),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && Qa(n, c);
            } else {
              const c = e.contentHooks;
              null !== c && el(n, c, 1), ld(n, 1);
            }
            !(function KM(e, n) {
              const t = e.hostBindingOpCodes;
              if (null === t) return;
              const i = bv(n, as);
              try {
                for (let r = 0; r < t.length; r++) {
                  const o = t[r];
                  if (o < 0) Ki(~o);
                  else {
                    const s = o,
                      a = t[++r],
                      l = t[++r];
                    ZS(a, s), (i.dirty = !1);
                    const c = Ju(i);
                    try {
                      l(2, n[s]);
                    } finally {
                      Yu(i, c);
                    }
                  }
                }
              } finally {
                null === n[as] && Dv(n, as), Ki(-1);
              }
            })(e, n);
            const a = e.components;
            null !== a && Uv(n, a, 0);
            const l = e.viewQuery;
            if ((null !== l && wf(2, l, i), s)) {
              const c = e.viewCheckHooks;
              null !== c && Qa(n, c);
            } else {
              const c = e.viewHooks;
              null !== c && el(n, c, 2), ld(n, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1), (n[Z] &= -73), gm(n);
          } finally {
            ad();
          }
        }
      }
      function $v(e, n) {
        for (let t = f_(e); null !== t; t = h_(t)) for (let i = lt; i < t.length; i++) Gv(t[i], n);
      }
      function CI(e, n, t) {
        Gv(zt(n, e), t);
      }
      function Gv(e, n) {
        if (
          !(function LS(e) {
            return 128 == (128 & e[Z]);
          })(e)
        )
          return;
        const t = e[O],
          i = e[Z];
        if ((80 & i && 0 === n) || 1024 & i || 2 === n) jv(t, e, t.template, e[$e]);
        else if (e[ns] > 0) {
          $v(e, 1);
          const r = t.components;
          null !== r && Uv(e, r, 1);
        }
      }
      function Uv(e, n, t) {
        for (let i = 0; i < n.length; i++) CI(e, n[i], t);
      }
      class Os {
        get rootNodes() {
          const n = this._lView,
            t = n[O];
          return Is(t, n, t.firstChild, []);
        }
        constructor(n, t) {
          (this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[$e];
        }
        set context(n) {
          this._lView[$e] = n;
        }
        get destroyed() {
          return 256 == (256 & this._lView[Z]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[Re];
            if (bt(n)) {
              const t = n[8],
                i = t ? t.indexOf(this) : -1;
              i > -1 && (gl(n, i), ol(t, i));
            }
            this._attachedToViewContainer = !1;
          }
          Id(this._lView[O], this._lView);
        }
        onDestroy(n) {
          !(function _m(e, n) {
            if (256 == (256 & e[Z])) throw new T(911, !1);
            null === e[Di] && (e[Di] = []), e[Di].push(n);
          })(this._lView, n);
        }
        markForCheck() {
          Ts(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[Z] &= -129;
        }
        reattach() {
          this._lView[Z] |= 128;
        }
        detectChanges() {
          Hl(this._lView[O], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new T(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function dT(e, n) {
              Ds(e, n, n[J], 2, null, null);
            })(this._lView[O], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new T(902, !1);
          this._appRef = n;
        }
      }
      class SI extends Os {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          Hl(n[O], n, n[$e], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Wv extends Rl {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const t = ie(n);
          return new As(t, this.ngModule);
        }
      }
      function zv(e) {
        const n = [];
        for (let t in e) e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t });
        return n;
      }
      class TI {
        constructor(n, t) {
          (this.injector = n), (this.parentInjector = t);
        }
        get(n, t, i) {
          i = $a(i);
          const r = this.injector.get(n, cf, i);
          return r !== cf || t === cf ? r : this.parentInjector.get(n, t, i);
        }
      }
      class As extends Q_ {
        get inputs() {
          const n = this.componentDef,
            t = n.inputTransforms,
            i = zv(n.inputs);
          if (null !== t)
            for (const r of i) t.hasOwnProperty(r.propName) && (r.transform = t[r.propName]);
          return i;
        }
        get outputs() {
          return zv(this.componentDef.outputs);
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function cS(e) {
              return e.map(lS).join(",");
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : []),
            (this.isBoundToModule = !!t);
        }
        create(n, t, i, r) {
          let o = (r = r || this.ngModule) instanceof on ? r : r?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new TI(n, o) : n,
            a = s.get(lf, null);
          if (null === a) throw new T(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(DM, null),
              effectManager: s.get(Vv, null),
              afterRenderEventManager: s.get(pf, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = i
              ? (function YM(e, n, t, i) {
                  const o = i.get(mv, !1) || t === hn.ShadowDom,
                    s = e.selectRootElement(n, o);
                  return (
                    (function ZM(e) {
                      Tv(e);
                    })(s),
                    s
                  );
                })(f, i, this.componentDef.encapsulation, s)
              : pl(
                  f,
                  h,
                  (function NI(e) {
                    const n = e.toLowerCase();
                    return "svg" === n ? "svg" : "math" === n ? "math" : null;
                  })(h)
                ),
            D = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528;
          let y = null;
          null !== p && (y = rf(p, s, !0));
          const S = yf(0, null, null, 1, 0, null, null, null, null, null, null),
            N = Ll(null, S, null, D, null, null, d, f, s, null, y);
          let A, $;
          sd(N);
          try {
            const te = this.componentDef;
            let se,
              He = null;
            te.findHostDirectiveDefs
              ? ((se = []), (He = new Map()), te.findHostDirectiveDefs(te, se, He), se.push(te))
              : (se = [te]);
            const ze = (function II(e, n) {
                const t = e[O],
                  i = Q;
                return (e[i] = n), fo(t, i, 2, "#host", null);
              })(N, p),
              rt = (function OI(e, n, t, i, r, o, s) {
                const a = r[O];
                !(function AI(e, n, t, i) {
                  for (const r of e) n.mergedAttrs = es(n.mergedAttrs, r.hostAttrs);
                  null !== n.mergedAttrs && (Vl(n, n.mergedAttrs, !0), null !== t && M_(i, t, n));
                })(i, e, n, s);
                let l = null;
                null !== n && (l = rf(n, r[bi]));
                const c = o.rendererFactory.createRenderer(n, t);
                let u = 16;
                t.signals ? (u = 4096) : t.onPush && (u = 64);
                const d = Ll(r, Nv(t), null, u, r[e.index], e, o, c, null, null, l);
                return a.firstCreatePass && Df(a, e, i.length - 1), Bl(r, d), (r[e.index] = d);
              })(ze, p, te, se, N, d, f);
            ($ = hm(S, Q)),
              p &&
                (function xI(e, n, t, i) {
                  if (i) Uu(e, t, ["ng-version", EM.full]);
                  else {
                    const { attrs: r, classes: o } = (function uS(e) {
                      const n = [],
                        t = [];
                      let i = 1,
                        r = 2;
                      for (; i < e.length; ) {
                        let o = e[i];
                        if ("string" == typeof o)
                          2 === r ? "" !== o && n.push(o, e[++i]) : 8 === r && t.push(o);
                        else {
                          if (!pn(r)) break;
                          r = o;
                        }
                        i++;
                      }
                      return { attrs: n, classes: t };
                    })(n.selectors[0]);
                    r && Uu(e, t, r), o && o.length > 0 && T_(e, t, o.join(" "));
                  }
                })(f, te, p, i),
              void 0 !== t &&
                (function PI(e, n, t) {
                  const i = (e.projection = []);
                  for (let r = 0; r < n.length; r++) {
                    const o = t[r];
                    i.push(null != o ? Array.from(o) : null);
                  }
                })($, this.ngContentSelectors, t),
              (A = (function RI(e, n, t, i, r, o) {
                const s = ut(),
                  a = r[O],
                  l = kt(s, r);
                Ov(a, r, s, t, null, i);
                for (let u = 0; u < t.length; u++) mt(Ji(r, a, s.directiveStart + u, s), r);
                Av(a, r, s), l && mt(l, r);
                const c = Ji(r, a, s.directiveStart + s.componentOffset, s);
                if (((e[$e] = r[$e] = c), null !== o)) for (const u of o) u(c, n);
                return mf(a, s, e), c;
              })(rt, te, se, He, N, [FI])),
              Sf(S, N, null);
          } finally {
            ad();
          }
          return new MI(this.componentType, A, ao($, N), N, $);
        }
      }
      class MI extends gM {
        constructor(n, t, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new SI(r)),
            (this.componentType = n);
        }
        setInput(n, t) {
          const i = this._tNode.inputs;
          let r;
          if (null !== i && (r = i[n])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(n) && Object.is(this.previousInputValues.get(n), t))
            )
              return;
            const o = this._rootLView;
            Cf(o[O], o, r, n, t), this.previousInputValues.set(n, t), Ts(zt(this._tNode.index, o));
          }
        }
        get injector() {
          return new wt(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function FI() {
        const e = ut();
        Xa(w()[O], e);
      }
      function $l(e) {
        return (
          !!(function Nf(e) {
            return null !== e && ("function" == typeof e || "object" == typeof e);
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function _t(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0);
      }
      function ye(e, n, t, i) {
        const r = w();
        return _t(r, jr(), n) && (re(), Gn(Fe(), r, e, n, t, i)), ye;
      }
      let cy = function uy(e, n, t, i) {
        return Ci(!0), n[J].createComment("");
      };
      function B(e, n, t) {
        const i = w();
        return (
          _t(i, jr(), n) &&
            (function Kt(e, n, t, i, r, o, s, a) {
              const l = kt(n, t);
              let u,
                c = n.inputs;
              !a && null != c && (u = c[i])
                ? (Cf(e, t, u, i, r),
                  zi(n) &&
                    (function rI(e, n) {
                      const t = zt(n, e);
                      16 & t[Z] || (t[Z] |= 64);
                    })(t, n.index))
                : 3 & n.type &&
                  ((i = (function iI(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(i)),
                  (r = null != s ? s(r, n.value || "", i) : r),
                  o.setProperty(l, i, r));
            })(re(), Fe(), i, e, n, i[J], t, !1),
          B
        );
      }
      function Rf(e, n, t, i, r) {
        const s = r ? "class" : "style";
        Cf(e, t, n.inputs[s], s, i);
      }
      function k(e, n, t, i) {
        const r = w(),
          o = re(),
          s = Q + e,
          a = r[J],
          l = o.firstCreatePass
            ? (function pO(e, n, t, i, r, o) {
                const s = n.consts,
                  l = fo(n, e, 2, i, wi(s, r));
                return (
                  bf(n, t, l, wi(s, o)),
                  null !== l.attrs && Vl(l, l.attrs, !1),
                  null !== l.mergedAttrs && Vl(l, l.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, l),
                  l
                );
              })(s, o, r, n, t, i)
            : o.data[s],
          c = dy(o, r, l, a, n, e);
        r[s] = c;
        const u = qa(l);
        return (
          jn(l, !0),
          M_(a, c, l),
          32 != (32 & l.flags) && Za() && _l(o, r, c, l),
          0 ===
            (function jS() {
              return W.lFrame.elementDepthCount;
            })() && mt(c, r),
          (function $S() {
            W.lFrame.elementDepthCount++;
          })(),
          u && (_f(o, r, l), mf(o, l, r)),
          null !== i && vf(r, l),
          k
        );
      }
      function L() {
        let e = ut();
        td() ? nd() : ((e = e.parent), jn(e, !1));
        const n = e;
        (function US(e) {
          return W.skipHydrationRootTNode === e;
        })(n) &&
          (function KS() {
            W.skipHydrationRootTNode = null;
          })(),
          (function GS() {
            W.lFrame.elementDepthCount--;
          })();
        const t = re();
        return (
          t.firstCreatePass && (Xa(t, e), zu(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function cN(e) {
              return 0 != (8 & e.flags);
            })(n) &&
            Rf(t, n, w(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function uN(e) {
              return 0 != (16 & e.flags);
            })(n) &&
            Rf(t, n, w(), n.stylesWithoutHost, !1),
          L
        );
      }
      let dy = (e, n, t, i, r, o) => (
        Ci(!0),
        pl(
          i,
          r,
          (function Om() {
            return W.lFrame.currentNamespace;
          })()
        )
      );
      function ql(e) {
        return !!e && "function" == typeof e.then;
      }
      function py(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function oe(e, n, t, i) {
        const r = w(),
          o = re(),
          s = ut();
        return (
          (function my(e, n, t, i, r, o, s) {
            const a = qa(i),
              c = e.firstCreatePass && kv(e),
              u = n[$e],
              d = Fv(n);
            let f = !0;
            if (3 & i.type || s) {
              const g = kt(i, n),
                m = s ? s(g) : g,
                D = d.length,
                y = s ? (N) => s(Me(N[i.index])) : i.index;
              let S = null;
              if (
                (!s &&
                  a &&
                  (S = (function bO(e, n, t, i) {
                    const r = e.cleanup;
                    if (null != r)
                      for (let o = 0; o < r.length - 1; o += 2) {
                        const s = r[o];
                        if (s === t && r[o + 1] === i) {
                          const a = n[xr],
                            l = r[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, n, r, i.index)),
                null !== S)
              )
                ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = o),
                  (S.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = vy(i, n, u, o, !1);
                const N = t.listen(m, r, o);
                d.push(o, N), c && c.push(r, y, D, D + 1);
              }
            } else o = vy(i, n, u, o, !1);
            const h = i.outputs;
            let p;
            if (f && null !== h && (p = h[r])) {
              const g = p.length;
              if (g)
                for (let m = 0; m < g; m += 2) {
                  const A = n[p[m]][p[m + 1]].subscribe(o),
                    $ = d.length;
                  d.push(o, A), c && c.push(r, i.index, $, -($ + 1));
                }
            }
          })(o, r, r[J], s, e, n, i),
          oe
        );
      }
      function _y(e, n, t, i) {
        try {
          return Hn(6, n, t), !1 !== t(i);
        } catch (r) {
          return Bv(e, r), !1;
        } finally {
          Hn(7, n, t);
        }
      }
      function vy(e, n, t, i, r) {
        return function o(s) {
          if (s === Function) return i;
          Ts(e.componentOffset > -1 ? zt(e.index, n) : n);
          let l = _y(n, t, i, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = _y(n, t, c, s) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && s.preventDefault(), l;
        };
      }
      function DO(e, n) {
        let t = null;
        const i = (function rS(e) {
          const n = e.attrs;
          if (null != n) {
            const t = n.indexOf(5);
            if (!(1 & t)) return n[t + 1];
          }
          return null;
        })(e);
        for (let r = 0; r < n.length; r++) {
          const o = n[r];
          if ("*" !== o) {
            if (null === i ? Bg(e, o, !0) : aS(i, o)) return r;
          } else t = r;
        }
        return t;
      }
      function Jl(e, n) {
        return (e << 17) | (n << 2);
      }
      function Mi(e) {
        return (e >> 17) & 32767;
      }
      function kf(e) {
        return 2 | e;
      }
      function er(e) {
        return (131068 & e) >> 2;
      }
      function Lf(e, n) {
        return (-131069 & e) | (n << 2);
      }
      function Bf(e) {
        return 1 | e;
      }
      function Iy(e, n, t, i, r) {
        const o = e[t + 1],
          s = null === n;
        let a = i ? Mi(o) : er(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = e[a + 1];
          TO(e[a], n) && ((l = !0), (e[a + 1] = i ? Bf(u) : kf(u))), (a = i ? Mi(u) : er(u));
        }
        l && (e[t + 1] = i ? kf(o) : Bf(o));
      }
      function TO(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || "string" != typeof n) && Yr(e, n) >= 0)
        );
      }
      const Xe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Oy(e) {
        return e.substring(Xe.key, Xe.keyEnd);
      }
      function Ay(e, n) {
        const t = Xe.textEnd;
        return t === n
          ? -1
          : ((n = Xe.keyEnd =
              (function AO(e, n, t) {
                for (; n < t && e.charCodeAt(n) > 32; ) n++;
                return n;
              })(e, (Xe.key = n), t)),
            Eo(e, n, t));
      }
      function Eo(e, n, t) {
        for (; n < t && e.charCodeAt(n) <= 32; ) n++;
        return n;
      }
      function ce(e, n) {
        return (
          (function bn(e, n, t, i) {
            const r = w(),
              o = re(),
              s = oi(2);
            o.firstUpdatePass && By(o, e, s, i),
              n !== Y &&
                _t(r, s, n) &&
                Hy(
                  o,
                  o.data[Et()],
                  r,
                  r[J],
                  e,
                  (r[s + 1] = (function $O(e, n) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof n ? (e += n) : "object" == typeof e && (e = Ye(Ni(e)))),
                      e
                    );
                  })(n, t)),
                  i,
                  s
                );
          })(e, n, null, !0),
          ce
        );
      }
      function tr(e) {
        !(function Dn(e, n, t, i) {
          const r = re(),
            o = oi(2);
          r.firstUpdatePass && By(r, null, o, i);
          const s = w();
          if (t !== Y && _t(s, o, t)) {
            const a = r.data[Et()];
            if ($y(a, i) && !Ly(r, o)) {
              let l = i ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (t = Ou(l, t || "")), Rf(r, a, s, t, i);
            } else
              !(function jO(e, n, t, i, r, o, s, a) {
                r === Y && (r = le);
                let l = 0,
                  c = 0,
                  u = 0 < r.length ? r[0] : null,
                  d = 0 < o.length ? o[0] : null;
                for (; null !== u || null !== d; ) {
                  const f = l < r.length ? r[l + 1] : void 0,
                    h = c < o.length ? o[c + 1] : void 0;
                  let g,
                    p = null;
                  u === d
                    ? ((l += 2), (c += 2), f !== h && ((p = d), (g = h)))
                    : null === d || (null !== u && u < d)
                    ? ((l += 2), (p = u))
                    : ((c += 2), (p = d), (g = h)),
                    null !== p && Hy(e, n, t, i, p, g, s, a),
                    (u = l < r.length ? r[l] : null),
                    (d = c < o.length ? o[c] : null);
                }
              })(
                r,
                a,
                s,
                s[J],
                s[o + 1],
                (s[o + 1] = (function VO(e, n, t) {
                  if (null == t || "" === t) return le;
                  const i = [],
                    r = Ni(t);
                  if (Array.isArray(r)) for (let o = 0; o < r.length; o++) e(i, r[o], !0);
                  else if ("object" == typeof r)
                    for (const o in r) r.hasOwnProperty(o) && e(i, o, r[o]);
                  else "string" == typeof r && n(i, r);
                  return i;
                })(e, n, t)),
                i,
                o
              );
          }
        })(HO, Kn, e, !0);
      }
      function Kn(e, n) {
        for (
          let t = (function IO(e) {
            return (
              (function xy(e) {
                (Xe.key = 0),
                  (Xe.keyEnd = 0),
                  (Xe.value = 0),
                  (Xe.valueEnd = 0),
                  (Xe.textEnd = e.length);
              })(e),
              Ay(e, Eo(e, 0, Xe.textEnd))
            );
          })(n);
          t >= 0;
          t = Ay(n, t)
        )
          qt(e, Oy(n), !0);
      }
      function Ly(e, n) {
        return n >= e.expandoStartIndex;
      }
      function By(e, n, t, i) {
        const r = e.data;
        if (null === r[t + 1]) {
          const o = r[Et()],
            s = Ly(e, t);
          $y(o, i) && null === n && !s && (n = !1),
            (n = (function FO(e, n, t, i) {
              const r = (function rd(e) {
                const n = W.lFrame.currentDirectiveIndex;
                return -1 === n ? null : e[n];
              })(e);
              let o = i ? n.residualClasses : n.residualStyles;
              if (null === r)
                0 === (i ? n.classBindings : n.styleBindings) &&
                  ((t = Ls((t = Vf(null, e, n, t, i)), n.attrs, i)), (o = null));
              else {
                const s = n.directiveStylingLast;
                if (-1 === s || e[s] !== r)
                  if (((t = Vf(r, e, n, t, i)), null === o)) {
                    let l = (function kO(e, n, t) {
                      const i = t ? n.classBindings : n.styleBindings;
                      if (0 !== er(i)) return e[Mi(i)];
                    })(e, n, i);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = Vf(null, e, n, l[1], i)),
                      (l = Ls(l, n.attrs, i)),
                      (function LO(e, n, t, i) {
                        e[Mi(t ? n.classBindings : n.styleBindings)] = i;
                      })(e, n, i, l));
                  } else
                    o = (function BO(e, n, t) {
                      let i;
                      const r = n.directiveEnd;
                      for (let o = 1 + n.directiveStylingLast; o < r; o++)
                        i = Ls(i, e[o].hostAttrs, t);
                      return Ls(i, n.attrs, t);
                    })(e, n, i);
              }
              return void 0 !== o && (i ? (n.residualClasses = o) : (n.residualStyles = o)), t;
            })(r, o, n, i)),
            (function SO(e, n, t, i, r, o) {
              let s = o ? n.classBindings : n.styleBindings,
                a = Mi(s),
                l = er(s);
              e[i] = t;
              let u,
                c = !1;
              if (
                (Array.isArray(t)
                  ? ((u = t[1]), (null === u || Yr(t, u) > 0) && (c = !0))
                  : (u = t),
                r)
              )
                if (0 !== l) {
                  const f = Mi(e[a + 1]);
                  (e[i + 1] = Jl(f, a)),
                    0 !== f && (e[f + 1] = Lf(e[f + 1], i)),
                    (e[a + 1] = (function wO(e, n) {
                      return (131071 & e) | (n << 17);
                    })(e[a + 1], i));
                } else (e[i + 1] = Jl(a, 0)), 0 !== a && (e[a + 1] = Lf(e[a + 1], i)), (a = i);
              else (e[i + 1] = Jl(l, 0)), 0 === a ? (a = i) : (e[l + 1] = Lf(e[l + 1], i)), (l = i);
              c && (e[i + 1] = kf(e[i + 1])),
                Iy(e, u, i, !0),
                Iy(e, u, i, !1),
                (function NO(e, n, t, i, r) {
                  const o = r ? e.residualClasses : e.residualStyles;
                  null != o && "string" == typeof n && Yr(o, n) >= 0 && (t[i + 1] = Bf(t[i + 1]));
                })(n, u, e, i, o),
                (s = Jl(a, l)),
                o ? (n.classBindings = s) : (n.styleBindings = s);
            })(r, o, n, t, s, i);
        }
      }
      function Vf(e, n, t, i, r) {
        let o = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((o = n[a]), (i = Ls(i, o.hostAttrs, r)), o !== e);

        )
          a++;
        return null !== e && (t.directiveStylingLast = a), i;
      }
      function Ls(e, n, t) {
        const i = t ? 1 : 2;
        let r = -1;
        if (null !== n)
          for (let o = 0; o < n.length; o++) {
            const s = n[o];
            "number" == typeof s
              ? (r = s)
              : r === i &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), qt(e, s, !!t || n[++o]));
          }
        return void 0 === e ? null : e;
      }
      function HO(e, n, t) {
        const i = String(n);
        "" !== i && !i.includes(" ") && qt(e, i, t);
      }
      function Hy(e, n, t, i, r, o, s, a) {
        if (!(3 & n.type)) return;
        const l = e.data,
          c = l[a + 1],
          u = (function CO(e) {
            return 1 == (1 & e);
          })(c)
            ? jy(l, n, t, r, er(c), s)
            : void 0;
        Yl(u) ||
          (Yl(o) ||
            ((function EO(e) {
              return 2 == (2 & e);
            })(c) &&
              (o = jy(l, null, t, r, a, s))),
          (function DT(e, n, t, i, r) {
            if (n) r ? e.addClass(t, i) : e.removeClass(t, i);
            else {
              let o = -1 === i.indexOf("-") ? void 0 : Si.DashCase;
              null == r
                ? e.removeStyle(t, i, o)
                : ("string" == typeof r &&
                    r.endsWith("!important") &&
                    ((r = r.slice(0, -10)), (o |= Si.Important)),
                  e.setStyle(t, i, r, o));
            }
          })(i, s, Ya(Et(), t), r, o));
      }
      function jy(e, n, t, i, r, o) {
        const s = null === n;
        let a;
        for (; r > 0; ) {
          const l = e[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = t[r + 1];
          f === Y && (f = d ? le : void 0);
          let h = d ? md(f, i) : u === i ? f : void 0;
          if ((c && !Yl(h) && (h = md(l, i)), Yl(h) && ((a = h), s))) return a;
          const p = e[r + 1];
          r = s ? Mi(p) : er(p);
        }
        if (null !== n) {
          let l = o ? n.residualClasses : n.residualStyles;
          null != l && (a = md(l, i));
        }
        return a;
      }
      function Yl(e) {
        return void 0 !== e;
      }
      function $y(e, n) {
        return 0 != (e.flags & (n ? 8 : 16));
      }
      function de(e, n = "") {
        const t = w(),
          i = re(),
          r = e + Q,
          o = i.firstCreatePass ? fo(i, r, 1, n, null) : i.data[r],
          s = Gy(i, t, o, n, e);
        (t[r] = s), Za() && _l(i, t, s, o), jn(o, !1);
      }
      let Gy = (e, n, t, i, r) => (
        Ci(!0),
        (function hl(e, n) {
          return e.createText(n);
        })(n[J], i)
      );
      function an(e) {
        return En("", e, ""), an;
      }
      function En(e, n, t) {
        const i = w(),
          r = (function po(e, n, t, i) {
            return _t(e, jr(), t) ? n + K(t) + i : Y;
          })(i, e, n, t);
        return (
          r !== Y &&
            (function ci(e, n, t) {
              const i = Ya(n, e);
              !(function g_(e, n, t) {
                e.setValue(n, t);
              })(e[J], i, t);
            })(i, Et(), r),
          En
        );
      }
      const Co = "en-US";
      let d0 = Co;
      class ir {}
      class cR {}
      class zf extends ir {
        constructor(n, t, i) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Wv(this));
          const r = (function Wt(e, n) {
            const t = e[Og] || null;
            if (!t && !0 === n)
              throw new Error(`Type ${Ye(e)} does not have '\u0275mod' property.`);
            return t;
          })(n);
          (this._bootstrapComponents = (function li(e) {
            return e instanceof Function ? e() : e;
          })(r.bootstrap)),
            (this._r3Injector = ov(
              n,
              t,
              [
                { provide: ir, useValue: this },
                { provide: Rl, useValue: this.componentFactoryResolver },
                ...i,
              ],
              Ye(n),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class qf extends cR {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new zf(this.moduleType, n, []);
        }
      }
      class L0 extends ir {
        constructor(n) {
          super(), (this.componentFactoryResolver = new Wv(this)), (this.instance = null);
          const t = new io(
            [
              ...n.providers,
              { provide: ir, useValue: this },
              { provide: Rl, useValue: this.componentFactoryResolver },
            ],
            n.parent || Sl(),
            n.debugName,
            new Set(["environment"])
          );
          (this.injector = t), n.runEnvironmentInitializers && t.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      let hR = (() => {
        class e {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t)) {
              const i = G_(0, t.type),
                r =
                  i.length > 0
                    ? (function fR(e, n, t = null) {
                        return new L0({
                          providers: e,
                          parent: n,
                          debugName: t,
                          runEnvironmentInitializers: !0,
                        }).injector;
                      })([i], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t, r);
            }
            return this.cachedInjectors.get(t);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values()) null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static {
            this.ɵprov = V({ token: e, providedIn: "environment", factory: () => new e(P(on)) });
          }
        }
        return e;
      })();
      function wn(e) {
        e.getStandaloneInjector = (n) => n.get(hR).getOrCreateStandaloneInjector(e);
      }
      function kR() {
        return this._results[Symbol.iterator]();
      }
      class Yf {
        get changes() {
          return this._changes || (this._changes = new j());
        }
        constructor(n = !1) {
          (this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = Yf.prototype;
          t[Symbol.iterator] || (t[Symbol.iterator] = kR);
        }
        get(n) {
          return this._results[n];
        }
        map(n) {
          return this._results.map(n);
        }
        filter(n) {
          return this._results.filter(n);
        }
        find(n) {
          return this._results.find(n);
        }
        reduce(n, t) {
          return this._results.reduce(n, t);
        }
        forEach(n) {
          this._results.forEach(n);
        }
        some(n) {
          return this._results.some(n);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(n, t) {
          const i = this;
          i.dirty = !1;
          const r = (function rn(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(n);
          (this._changesDetected = !(function CN(e, n, t) {
            if (e.length !== n.length) return !1;
            for (let i = 0; i < e.length; i++) {
              let r = e[i],
                o = n[i];
              if ((t && ((r = t(r)), (o = t(o))), o !== r)) return !1;
            }
            return !0;
          })(i._results, r, t)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      function BR(e, n, t, i = !0) {
        const r = n[O];
        if (
          ((function hT(e, n, t, i) {
            const r = lt + i,
              o = t.length;
            i > 0 && (t[r - 1][gn] = n),
              i < o - lt ? ((n[gn] = t[r]), Wm(t, lt + i, n)) : (t.push(n), (n[gn] = null)),
              (n[Re] = t);
            const s = n[rs];
            null !== s &&
              t !== s &&
              (function pT(e, n) {
                const t = e[Lr];
                n[Ge] !== n[Re][Re][Ge] && (e[Wg] = !0), null === t ? (e[Lr] = [n]) : t.push(n);
              })(s, n);
            const a = n[Bn];
            null !== a && a.insertView(e), (n[Z] |= 128);
          })(r, n, e, t),
          i)
        ) {
          const o = xd(t, e),
            s = n[J],
            a = ml(s, e[Vn]);
          null !== a &&
            (function uT(e, n, t, i, r, o) {
              (i[Le] = r), (i[gt] = n), Ds(e, i, t, 1, r, o);
            })(r, e[gt], s, n, a, o);
        }
      }
      let ke = (() => {
        class e {
          static {
            this.__NG_ELEMENT_ID__ = jR;
          }
        }
        return e;
      })();
      const VR = ke,
        HR = class extends VR {
          constructor(n, t, i) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = i);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(n, t) {
            return this.createEmbeddedViewImpl(n, t);
          }
          createEmbeddedViewImpl(n, t, i) {
            const r = (function LR(e, n, t, i) {
              const r = n.tView,
                a = Ll(
                  e,
                  r,
                  t,
                  4096 & e[Z] ? 4096 : 16,
                  null,
                  n,
                  null,
                  null,
                  null,
                  i?.injector ?? null,
                  i?.hydrationInfo ?? null
                );
              a[rs] = e[n.index];
              const c = e[Bn];
              return null !== c && (a[Bn] = c.createEmbeddedView(r)), Sf(r, a, t), a;
            })(this._declarationLView, this._declarationTContainer, n, {
              injector: t,
              hydrationInfo: i,
            });
            return new Os(r);
          }
        };
      function jR() {
        return tc(ut(), w());
      }
      function tc(e, n) {
        return 4 & e.type ? new HR(n, e, ao(e, n)) : null;
      }
      let Cn = (() => {
        class e {
          static {
            this.__NG_ELEMENT_ID__ = qR;
          }
        }
        return e;
      })();
      function qR() {
        return tb(ut(), w());
      }
      const KR = Cn,
        Q0 = class extends KR {
          constructor(n, t, i) {
            super(), (this._lContainer = n), (this._hostTNode = t), (this._hostLView = i);
          }
          get element() {
            return ao(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new wt(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = il(this._hostTNode, this._hostLView);
            if (ud(n)) {
              const t = hs(n, this._hostLView),
                i = fs(n);
              return new wt(t[O].data[i + 8], t);
            }
            return new wt(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const t = eb(this._lContainer);
            return (null !== t && t[n]) || null;
          }
          get length() {
            return this._lContainer.length - lt;
          }
          createEmbeddedView(n, t, i) {
            let r, o;
            "number" == typeof i ? (r = i) : null != i && ((r = i.index), (o = i.injector));
            const a = n.createEmbeddedViewImpl(t || {}, o, null);
            return this.insertImpl(a, r, false), a;
          }
          createComponent(n, t, i, r, o) {
            const s =
              n &&
              !(function gs(e) {
                return "function" == typeof e;
              })(n);
            let a;
            if (s) a = t;
            else {
              const g = t || {};
              (a = g.index),
                (i = g.injector),
                (r = g.projectableNodes),
                (o = g.environmentInjector || g.ngModuleRef);
            }
            const l = s ? n : new As(ie(n)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule) {
              const m = (s ? c : this.parentInjector).get(on, null);
              m && (o = m);
            }
            ie(l.componentType ?? {});
            const h = l.create(c, r, null, o);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(n, t) {
            return this.insertImpl(n, t, !1);
          }
          insertImpl(n, t, i) {
            const r = n._lView;
            if (
              (function BS(e) {
                return bt(e[Re]);
              })(r)
            ) {
              const l = this.indexOf(n);
              if (-1 !== l) this.detach(l);
              else {
                const c = r[Re],
                  u = new Q0(c, c[gt], c[Re]);
                u.detach(u.indexOf(n));
              }
            }
            const s = this._adjustIndex(t),
              a = this._lContainer;
            return BR(a, r, s, !i), n.attachToViewContainerRef(), Wm(Zf(a), s, n), n;
          }
          move(n, t) {
            return this.insert(n, t);
          }
          indexOf(n) {
            const t = eb(this._lContainer);
            return null !== t ? t.indexOf(n) : -1;
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              i = gl(this._lContainer, t);
            i && (ol(Zf(this._lContainer), t), Id(i[O], i));
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              i = gl(this._lContainer, t);
            return i && null != ol(Zf(this._lContainer), t) ? new Os(i) : null;
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t;
          }
        };
      function eb(e) {
        return e[8];
      }
      function Zf(e) {
        return e[8] || (e[8] = []);
      }
      function tb(e, n) {
        let t;
        const i = n[e.index];
        return (
          bt(i) ? (t = i) : ((t = xv(i, n, null, e)), (n[e.index] = t), Bl(n, t)),
          nb(t, n, e, i),
          new Q0(t, e, n)
        );
      }
      let nb = function ib(e, n, t, i) {
        if (e[Vn]) return;
        let r;
        (r =
          8 & t.type
            ? Me(i)
            : (function JR(e, n) {
                const t = e[J],
                  i = t.createComment(""),
                  r = kt(n, e);
                return (
                  Yi(
                    t,
                    ml(t, r),
                    i,
                    (function vT(e, n) {
                      return e.nextSibling(n);
                    })(t, r),
                    !1
                  ),
                  i
                );
              })(n, t)),
          (e[Vn] = r);
      };
      class Xf {
        constructor(n) {
          (this.queryList = n), (this.matches = null);
        }
        clone() {
          return new Xf(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Qf {
        constructor(n = []) {
          this.queries = n;
        }
        createEmbeddedView(n) {
          const t = n.queries;
          if (null !== t) {
            const i = null !== n.contentQueries ? n.contentQueries[0] : t.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = t.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Qf(r);
          }
          return null;
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        dirtyQueriesWithMatches(n) {
          for (let t = 0; t < this.queries.length; t++)
            null !== lb(n, t).matches && this.queries[t].setDirty();
        }
      }
      class rb {
        constructor(n, t, i = null) {
          (this.predicate = n), (this.flags = t), (this.read = i);
        }
      }
      class eh {
        constructor(n = []) {
          this.queries = n;
        }
        elementStart(n, t) {
          for (let i = 0; i < this.queries.length; i++) this.queries[i].elementStart(n, t);
        }
        elementEnd(n) {
          for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(n);
        }
        embeddedTView(n) {
          let t = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              o = this.getByIndex(i).embeddedTView(n, r);
            o && ((o.indexInDeclarationView = i), null !== t ? t.push(o) : (t = [o]));
          }
          return null !== t ? new eh(t) : null;
        }
        template(n, t) {
          for (let i = 0; i < this.queries.length; i++) this.queries[i].template(n, t);
        }
        getByIndex(n) {
          return this.queries[n];
        }
        get length() {
          return this.queries.length;
        }
        track(n) {
          this.queries.push(n);
        }
      }
      class th {
        constructor(n, t = -1) {
          (this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(n, t) {
          this.isApplyingToNode(t) && this.matchTNode(n, t);
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1);
        }
        template(n, t) {
          this.elementStart(n, t);
        }
        embeddedTView(n, t) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-n.index, t), new th(this.metadata))
            : null;
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let i = n.parent;
            for (; null !== i && 8 & i.type && i.index !== t; ) i = i.parent;
            return t === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(n, t) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(n, t, XR(t, o)),
                this.matchTNodeWithReadOption(n, t, rl(t, n, o, !1, !1));
            }
          else
            i === ke
              ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1)
              : this.matchTNodeWithReadOption(n, t, rl(t, n, i, !1, !1));
        }
        matchTNodeWithReadOption(n, t, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === be || r === Cn || (r === ke && 4 & t.type)) this.addMatch(t.index, -2);
              else {
                const o = rl(t, n, r, !1, !1);
                null !== o && this.addMatch(t.index, o);
              }
            else this.addMatch(t.index, i);
          }
        }
        addMatch(n, t) {
          null === this.matches ? (this.matches = [n, t]) : this.matches.push(n, t);
        }
      }
      function XR(e, n) {
        const t = e.localNames;
        if (null !== t) for (let i = 0; i < t.length; i += 2) if (t[i] === n) return t[i + 1];
        return null;
      }
      function ex(e, n, t, i) {
        return -1 === t
          ? (function QR(e, n) {
              return 11 & e.type ? ao(e, n) : 4 & e.type ? tc(e, n) : null;
            })(n, e)
          : -2 === t
          ? (function tx(e, n, t) {
              return t === be ? ao(n, e) : t === ke ? tc(n, e) : t === Cn ? tb(n, e) : void 0;
            })(e, n, i)
          : Ji(e, e[O], t, n);
      }
      function ob(e, n, t, i) {
        const r = n[Bn].queries[i];
        if (null === r.matches) {
          const o = e.data,
            s = t.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : ex(n, o[c], s[l + 1], t.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function nh(e, n, t, i) {
        const r = e.queries.getByIndex(t),
          o = r.matches;
        if (null !== o) {
          const s = ob(e, n, r, t);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = n[-l];
              for (let d = lt; d < u.length; d++) {
                const f = u[d];
                f[rs] === f[Re] && nh(f[O], f, c, i);
              }
              if (null !== u[Lr]) {
                const d = u[Lr];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  nh(h[O], h, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function De(e) {
        const n = w(),
          t = re(),
          i = Cm();
        od(i + 1);
        const r = lb(t, i);
        if (
          e.dirty &&
          (function kS(e) {
            return 4 == (4 & e[Z]);
          })(n) ===
            (2 == (2 & r.metadata.flags))
        ) {
          if (null === r.matches) e.reset([]);
          else {
            const o = r.crossesNgTemplate ? nh(t, n, i, []) : ob(t, n, r, i);
            e.reset(o, yM), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function rr(e, n, t) {
        const i = re();
        i.firstCreatePass &&
          ((function ab(e, n, t) {
            null === e.queries && (e.queries = new eh()), e.queries.track(new th(n, t));
          })(i, new rb(e, n, t), -1),
          2 == (2 & n) && (i.staticViewQueries = !0)),
          (function sb(e, n, t) {
            const i = new Yf(4 == (4 & t));
            (function eI(e, n, t, i) {
              const r = Fv(n);
              r.push(t), e.firstCreatePass && kv(e).push(i, r.length - 1);
            })(e, n, i, i.destroy),
              null === n[Bn] && (n[Bn] = new Qf()),
              n[Bn].queries.push(new Xf(i));
          })(i, w(), n);
      }
      function lb(e, n) {
        return e.queries.getByIndex(n);
      }
      const Cx = new F("Application Initializer");
      let ah = (() => {
        class e {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, i) => {
                (this.resolve = t), (this.reject = i);
              })),
              (this.appInits = U(Cx, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [];
            for (const r of this.appInits) {
              const o = r();
              if (ql(o)) t.push(o);
              else if (py(o)) {
                const s = new Promise((a, l) => {
                  o.subscribe({ complete: a, error: l });
                });
                t.push(s);
              }
            }
            const i = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(t)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === t.length && i(),
              (this.initialized = !0);
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)();
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
          }
        }
        return e;
      })();
      const Nn = new F("LocaleId", {
        providedIn: "root",
        factory: () =>
          U(Nn, ne.Optional | ne.SkipSelf) ||
          (function Nx() {
            return (typeof $localize < "u" && $localize.locale) || Co;
          })(),
      });
      let lh = (() => {
        class e {
          constructor() {
            (this.taskId = 0), (this.pendingTasks = new Set()), (this.hasPendingTasks = new FC(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const t = this.taskId++;
            return this.pendingTasks.add(t), t;
          }
          remove(t) {
            this.pendingTasks.delete(t),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)();
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
          }
        }
        return e;
      })();
      const Ib = new F(""),
        oc = new F("");
      let hh,
        dh = (() => {
          class e {
            constructor(t, i, r) {
              (this._ngZone = t),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                hh ||
                  ((function Zx(e) {
                    hh = e;
                  })(r),
                  r.addToWindow(i)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ue.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) => !i.updateCb || !i.updateCb(t) || (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, i, r) {
              let o = -1;
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter((s) => s.timeoutId !== o)),
                    t(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: r });
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, i, r) {
              return [];
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)(P(ue), P(fh), P(oc));
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac });
            }
          }
          return e;
        })(),
        fh = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, i) {
              this._applications.set(t, i);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, i = !0) {
              return hh?.findTestabilityInTree(this, t, i) ?? null;
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "platform" });
            }
          }
          return e;
        })(),
        Ii = null;
      const Ob = new F("AllowMultipleToken"),
        ph = new F("PlatformDestroyListeners"),
        Ab = new F("appBootstrapListener");
      function Pb(e, n, t = []) {
        const i = `Platform: ${n}`,
          r = new F(i);
        return (o = []) => {
          let s = gh();
          if (!s || s.injector.get(Ob, !1)) {
            const a = [...t, ...o, { provide: r, useValue: !0 }];
            e
              ? e(a)
              : (function eP(e) {
                  if (Ii && !Ii.get(Ob, !1)) throw new T(400, !1);
                  (function Rb() {
                    !(function wS(e) {
                      im = e;
                    })(() => {
                      throw new T(600, !1);
                    });
                  })(),
                    (Ii = e);
                  const n = e.get(kb);
                  (function xb(e) {
                    e.get(K_, null)?.forEach((t) => t());
                  })(e);
                })(
                  (function Fb(e = [], n) {
                    return Ct.create({
                      name: n,
                      providers: [
                        { provide: zd, useValue: "platform" },
                        { provide: ph, useValue: new Set([() => (Ii = null)]) },
                        ...e,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function nP(e) {
            const n = gh();
            if (!n) throw new T(401, !1);
            return n;
          })();
        };
      }
      function gh() {
        return Ii?.get(kb) ?? null;
      }
      let kb = (() => {
        class e {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, i) {
            const r = (function iP(e = "zone.js", n) {
              return "noop" === e ? new FM() : "zone.js" === e ? new ue(n) : e;
            })(
              i?.ngZone,
              (function Lb(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: i?.ngZoneEventCoalescing,
                runCoalescing: i?.ngZoneRunCoalescing,
              })
            );
            return r.run(() => {
              const o = (function dR(e, n, t) {
                  return new zf(e, n, t);
                })(
                  t.moduleType,
                  this.injector,
                  (function $b(e) {
                    return [
                      { provide: ue, useFactory: e },
                      {
                        provide: El,
                        multi: !0,
                        useFactory: () => {
                          const n = U(oP, { optional: !0 });
                          return () => n.initialize();
                        },
                      },
                      { provide: jb, useFactory: rP },
                      { provide: uv, useFactory: dv },
                    ];
                  })(() => r)
                ),
                s = o.injector.get(ai, null);
              return (
                r.runOutsideAngular(() => {
                  const a = r.onError.subscribe({
                    next: (l) => {
                      s.handleError(l);
                    },
                  });
                  o.onDestroy(() => {
                    sc(this._modules, o), a.unsubscribe();
                  });
                }),
                (function Bb(e, n, t) {
                  try {
                    const i = t();
                    return ql(i)
                      ? i.catch((r) => {
                          throw (n.runOutsideAngular(() => e.handleError(r)), r);
                        })
                      : i;
                  } catch (i) {
                    throw (n.runOutsideAngular(() => e.handleError(i)), i);
                  }
                })(s, r, () => {
                  const a = o.injector.get(ah);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function f0(e) {
                          en(e, "Expected localeId to be defined"),
                            "string" == typeof e && (d0 = e.toLowerCase().replace(/_/g, "-"));
                        })(o.injector.get(Nn, Co) || Co),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, i = []) {
            const r = Vb({}, i);
            return (function Xx(e, n, t) {
              const i = new qf(t);
              return Promise.resolve(i);
            })(0, 0, t).then((o) => this.bootstrapModuleFactory(o, r));
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(or);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!t.instance.ngDoBootstrap) throw new T(-403, !1);
              t.instance.ngDoBootstrap(i);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new T(404, !1);
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i());
            const t = this._injector.get(ph, null);
            t && (t.forEach((i) => i()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Ct));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "platform" });
          }
        }
        return e;
      })();
      function Vb(e, n) {
        return Array.isArray(n) ? n.reduce(Vb, e) : { ...e, ...n };
      }
      let or = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = U(jb)),
              (this.zoneIsStable = U(uv)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = U(lh).hasPendingTasks.pipe(
                Iu((t) => (t ? Ar(!1) : this.zoneIsStable)),
                (function Dg(e, n = Gi) {
                  return (
                    (e = e ?? kC),
                    ot((t, i) => {
                      let r,
                        o = !0;
                      t.subscribe(
                        tt(i, (s) => {
                          const a = n(s);
                          (o || !e(r, a)) && ((o = !1), (r = a), i.next(s));
                        })
                      );
                    })
                  );
                })(),
                bg()
              )),
              (this._injector = U(on));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(t, i) {
            const r = t instanceof Q_;
            if (!this._injector.get(ah).done)
              throw (
                (!r &&
                  (function ts(e) {
                    const n = ie(e) || at(e) || yt(e);
                    return null !== n && n.standalone;
                  })(t),
                new T(405, !1))
              );
            let s;
            (s = r ? t : this._injector.get(Rl).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function Qx(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(ir),
              c = s.create(Ct.NULL, [], i || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(Ib, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView), sc(this.components, c), d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new T(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this.internalErrorHandler(t);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const i = t;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(t) {
            const i = t;
            sc(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t);
            const i = this._injector.get(Ab, []);
            i.push(...this._bootstrapListeners), i.forEach((r) => r(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return this._destroyListeners.push(t), () => sc(this._destroyListeners, t);
          }
          destroy() {
            if (this._destroyed) throw new T(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static {
            this.ɵfac = function (i) {
              return new (i || e)();
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
          }
        }
        return e;
      })();
      function sc(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      const jb = new F("", { providedIn: "root", factory: () => U(ai).handleError.bind(void 0) });
      function rP() {
        const e = U(ue),
          n = U(ai);
        return (t) => e.runOutsideAngular(() => n.handleError(t));
      }
      let oP = (() => {
        class e {
          constructor() {
            (this.zone = U(ue)), (this.applicationRef = U(or));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this.zone.run(() => {
                    this.applicationRef.tick();
                  });
                },
              }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)();
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
          }
        }
        return e;
      })();
      class qb {
        constructor() {}
        supports(n) {
          return $l(n);
        }
        create(n) {
          return new hP(n);
        }
      }
      const fP = (e, n) => n;
      class hP {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || fP);
        }
        forEachItem(n) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) n(t);
        }
        forEachOperation(n) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; t || i; ) {
            const s = !i || (t && t.currentIndex < Jb(i, r, o)) ? t : i,
              a = Jb(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, (i = i._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let f = 0; f < c; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  u <= p && p < c && (o[f] = h + 1);
                }
                o[s.previousIndex] = u - c;
              }
            }
            a !== l && n(s, a, l);
          }
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachMovedItem(n) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        forEachIdentityChange(n) {
          let t;
          for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) n(t);
        }
        diff(n) {
          if ((null == n && (n = []), !$l(n))) throw new T(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let r,
            o,
            s,
            t = this._itHead,
            i = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (o = n[a]),
                (s = this._trackByFn(a, o)),
                null !== t && Object.is(t.trackById, s)
                  ? (i && (t = this._verifyReinsertion(t, o, s, a)),
                    Object.is(t.item, o) || this._addIdentityChange(t, o))
                  : ((t = this._mismatch(t, o, s, a)), (i = !0)),
                (t = t._next);
          } else
            (r = 0),
              (function zI(e, n) {
                if (Array.isArray(e)) for (let t = 0; t < e.length; t++) n(e[t]);
                else {
                  const t = e[Symbol.iterator]();
                  let i;
                  for (; !(i = t.next()).done; ) n(i.value);
                }
              })(n, (a) => {
                (s = this._trackByFn(r, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (i && (t = this._verifyReinsertion(t, a, s, r)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, r)), (i = !0)),
                  (t = t._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(t), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (n = this._previousItHead = this._itHead; null !== n; n = n._next)
              n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null, n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, t, i, r) {
          let o;
          return (
            null === n ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
            null !==
            (n = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, o, r))
              : null !== (n = null === this._linkedRecords ? null : this._linkedRecords.get(i, r))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._moveAfter(n, o, r))
              : (n = this._addAfter(new pP(t, i), o, r)),
            n
          );
        }
        _verifyReinsertion(n, t, i, r) {
          let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(i, null);
          return (
            null !== o
              ? (n = this._reinsertAfter(o, n._prev, r))
              : n.currentIndex != r && ((n.currentIndex = r), this._addToMoves(n, r)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next;
            this._addToRemovals(this._unlink(n)), (n = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const r = n._prevRemoved,
            o = n._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(n, t, i),
            this._addToMoves(n, i),
            n
          );
        }
        _moveAfter(n, t, i) {
          return this._unlink(n), this._insertAfter(n, t, i), this._addToMoves(n, i), n;
        }
        _addAfter(n, t, i) {
          return (
            this._insertAfter(n, t, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, t, i) {
          const r = null === t ? this._itHead : t._next;
          return (
            (n._next = r),
            (n._prev = t),
            null === r ? (this._itTail = n) : (r._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new Kb()),
            this._linkedRecords.put(n),
            (n.currentIndex = i),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const t = n._prev,
            i = n._next;
          return (
            null === t ? (this._itHead = i) : (t._next = i),
            null === i ? (this._itTail = t) : (i._prev = t),
            n
          );
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new Kb()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n), (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class pP {
        constructor(n, t) {
          (this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class gP {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n), (n._nextDup = null), (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n));
        }
        get(n, t) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if ((null === t || t <= i.currentIndex) && Object.is(i.trackById, n)) return i;
          return null;
        }
        remove(n) {
          const t = n._prevDup,
            i = n._nextDup;
          return (
            null === t ? (this._head = i) : (t._nextDup = i),
            null === i ? (this._tail = t) : (i._prevDup = t),
            null === this._head
          );
        }
      }
      class Kb {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const t = n.trackById;
          let i = this.map.get(t);
          i || ((i = new gP()), this.map.set(t, i)), i.add(n);
        }
        get(n, t) {
          const r = this.map.get(n);
          return r ? r.get(n, t) : null;
        }
        remove(n) {
          const t = n.trackById;
          return this.map.get(t).remove(n) && this.map.delete(t), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Jb(e, n, t) {
        const i = e.previousIndex;
        if (null === i) return i;
        let r = 0;
        return t && i < t.length && (r = t[i]), i + n + r;
      }
      function Zb() {
        return new cc([new qb()]);
      }
      let cc = (() => {
        class e {
          static {
            this.ɵprov = V({ token: e, providedIn: "root", factory: Zb });
          }
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (i) => e.create(t, i || Zb()),
              deps: [[e, new yd(), new vd()]],
            };
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t));
            if (null != i) return i;
            throw new T(901, !1);
          }
        }
        return e;
      })();
      const bP = Pb(null, "core", []);
      let DP = (() => {
        class e {
          constructor(t) {}
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(or));
            };
          }
          static {
            this.ɵmod = Te({ type: e });
          }
          static {
            this.ɵinj = we({});
          }
        }
        return e;
      })();
      function Eh(e, n) {
        const t = ie(e),
          i = n.elementInjector || Sl();
        return new As(t).create(i, n.projectableNodes, n.hostElement, n.environmentInjector);
      }
      let wh = null;
      function Zs() {
        return wh;
      }
      class PP {}
      const Tt = new F("DocumentToken");
      function _D(e, n) {
        n = encodeURIComponent(n);
        for (const t of e.split(";")) {
          const i = t.indexOf("="),
            [r, o] = -1 == i ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
          if (r.trim() === n) return decodeURIComponent(o);
        }
        return null;
      }
      class yF {
        constructor(n, t, i, r) {
          (this.$implicit = n), (this.ngForOf = t), (this.index = i), (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let hi = (() => {
        class e {
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(t, i, r) {
            (this._viewContainer = t),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs.find(t).create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const i = this._viewContainer;
            t.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new yF(r.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) i.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = i.get(o);
                i.move(a, s), bD(a, r);
              }
            });
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((r) => {
              bD(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(v(Cn), v(ke), v(cc));
            };
          }
          static {
            this.ɵdir = M({
              type: e,
              selectors: [["", "ngFor", "", "ngForOf", ""]],
              inputs: {
                ngForOf: "ngForOf",
                ngForTrackBy: "ngForTrackBy",
                ngForTemplate: "ngForTemplate",
              },
              standalone: !0,
            });
          }
        }
        return e;
      })();
      function bD(e, n) {
        e.context.$implicit = n.item;
      }
      let qF = (() => {
        class e {
          static {
            this.ɵfac = function (i) {
              return new (i || e)();
            };
          }
          static {
            this.ɵmod = Te({ type: e });
          }
          static {
            this.ɵinj = we({});
          }
        }
        return e;
      })();
      function SD(e) {
        return "server" === e;
      }
      class ND {}
      class bk extends PP {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class jh extends bk {
        static makeCurrent() {
          !(function xP(e) {
            wh || (wh = e);
          })(new jh());
        }
        onAndCancel(n, t, i) {
          return (
            n.addEventListener(t, i),
            () => {
              n.removeEventListener(t, i);
            }
          );
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, t) {
          return "window" === t ? window : "document" === t ? n : "body" === t ? n.body : null;
        }
        getBaseHref(n) {
          const t = (function Dk() {
            return (ta = ta || document.querySelector("base")), ta ? ta.getAttribute("href") : null;
          })();
          return null == t
            ? null
            : (function Ek(e) {
                (wc = wc || document.createElement("a")), wc.setAttribute("href", e);
                const n = wc.pathname;
                return "/" === n.charAt(0) ? n : `/${n}`;
              })(t);
        }
        resetBaseElement() {
          ta = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return _D(document.cookie, n);
        }
      }
      let wc,
        ta = null,
        Ck = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac });
            }
          }
          return e;
        })();
      const $h = new F("EventManagerPlugins");
      let AD = (() => {
        class e {
          constructor(t, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              t.forEach((r) => {
                r.manager = this;
              }),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            let i = this._eventNameToPlugin.get(t);
            if (i) return i;
            if (((i = this._plugins.find((o) => o.supports(t))), !i)) throw new T(5101, !1);
            return this._eventNameToPlugin.set(t, i), i;
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P($h), P(ue));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      class RD {
        constructor(n) {
          this._doc = n;
        }
      }
      const Gh = "ng-app-id";
      let xD = (() => {
        class e {
          constructor(t, i, r, o = {}) {
            (this.doc = t),
              (this.appId = i),
              (this.nonce = r),
              (this.platformId = o),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = SD(o)),
              this.resetHostNodes();
          }
          addStyles(t) {
            for (const i of t) 1 === this.changeUsageCount(i, 1) && this.onStyleAdded(i);
          }
          removeStyles(t) {
            for (const i of t) this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
          }
          ngOnDestroy() {
            const t = this.styleNodesInDOM;
            t && (t.forEach((i) => i.remove()), t.clear());
            for (const i of this.getAllStyles()) this.onStyleRemoved(i);
            this.resetHostNodes();
          }
          addHost(t) {
            this.hostNodes.add(t);
            for (const i of this.getAllStyles()) this.addStyleToHost(t, i);
          }
          removeHost(t) {
            this.hostNodes.delete(t);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(t) {
            for (const i of this.hostNodes) this.addStyleToHost(i, t);
          }
          onStyleRemoved(t) {
            const i = this.styleRef;
            i.get(t)?.elements?.forEach((r) => r.remove()), i.delete(t);
          }
          collectServerRenderedStyles() {
            const t = this.doc.head?.querySelectorAll(`style[${Gh}="${this.appId}"]`);
            if (t?.length) {
              const i = new Map();
              return (
                t.forEach((r) => {
                  null != r.textContent && i.set(r.textContent, r);
                }),
                i
              );
            }
            return null;
          }
          changeUsageCount(t, i) {
            const r = this.styleRef;
            if (r.has(t)) {
              const o = r.get(t);
              return (o.usage += i), o.usage;
            }
            return r.set(t, { usage: i, elements: [] }), i;
          }
          getStyleElement(t, i) {
            const r = this.styleNodesInDOM,
              o = r?.get(i);
            if (o?.parentNode === t) return r.delete(i), o.removeAttribute(Gh), o;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = i),
                this.platformIsServer && s.setAttribute(Gh, this.appId),
                s
              );
            }
          }
          addStyleToHost(t, i) {
            const r = this.getStyleElement(t, i);
            t.appendChild(r);
            const o = this.styleRef,
              s = o.get(i)?.elements;
            s ? s.push(r) : o.set(i, { elements: [r], usage: 1 });
          }
          resetHostNodes() {
            const t = this.hostNodes;
            t.clear(), t.add(this.doc.head);
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Tt), P(Nl), P(J_, 8), P(Xi));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      const Uh = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Wh = /%COMP%/g,
        Mk = new F("RemoveStylesOnCompDestroy", { providedIn: "root", factory: () => !1 });
      function FD(e, n) {
        return n.map((t) => t.replace(Wh, e));
      }
      let kD = (() => {
        class e {
          constructor(t, i, r, o, s, a, l, c = null) {
            (this.eventManager = t),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.removeStylesOnCompDestroy = o),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = l),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = SD(a)),
              (this.defaultRenderer = new zh(t, s, l, this.platformIsServer));
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer;
            this.platformIsServer &&
              i.encapsulation === hn.ShadowDom &&
              (i = { ...i, encapsulation: hn.Emulated });
            const r = this.getOrCreateRenderer(t, i);
            return r instanceof BD ? r.applyToHost(t) : r instanceof qh && r.applyStyles(), r;
          }
          getOrCreateRenderer(t, i) {
            const r = this.rendererByCompId;
            let o = r.get(i.id);
            if (!o) {
              const s = this.doc,
                a = this.ngZone,
                l = this.eventManager,
                c = this.sharedStylesHost,
                u = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (i.encapsulation) {
                case hn.Emulated:
                  o = new BD(l, c, i, this.appId, u, s, a, d);
                  break;
                case hn.ShadowDom:
                  return new Rk(l, c, t, i, s, a, this.nonce, d);
                default:
                  o = new qh(l, c, i, u, s, a, d);
              }
              r.set(i.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(AD), P(xD), P(Nl), P(Mk), P(Tt), P(Xi), P(ue), P(J_));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      class zh {
        constructor(n, t, i, r) {
          (this.eventManager = n),
            (this.doc = t),
            (this.ngZone = i),
            (this.platformIsServer = r),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, t) {
          return t ? this.doc.createElementNS(Uh[t] || t, n) : this.doc.createElement(n);
        }
        createComment(n) {
          return this.doc.createComment(n);
        }
        createText(n) {
          return this.doc.createTextNode(n);
        }
        appendChild(n, t) {
          (LD(n) ? n.content : n).appendChild(t);
        }
        insertBefore(n, t, i) {
          n && (LD(n) ? n.content : n).insertBefore(t, i);
        }
        removeChild(n, t) {
          n && n.removeChild(t);
        }
        selectRootElement(n, t) {
          let i = "string" == typeof n ? this.doc.querySelector(n) : n;
          if (!i) throw new T(-5104, !1);
          return t || (i.textContent = ""), i;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, t, i, r) {
          if (r) {
            t = r + ":" + t;
            const o = Uh[r];
            o ? n.setAttributeNS(o, t, i) : n.setAttribute(t, i);
          } else n.setAttribute(t, i);
        }
        removeAttribute(n, t, i) {
          if (i) {
            const r = Uh[i];
            r ? n.removeAttributeNS(r, t) : n.removeAttribute(`${i}:${t}`);
          } else n.removeAttribute(t);
        }
        addClass(n, t) {
          n.classList.add(t);
        }
        removeClass(n, t) {
          n.classList.remove(t);
        }
        setStyle(n, t, i, r) {
          r & (Si.DashCase | Si.Important)
            ? n.style.setProperty(t, i, r & Si.Important ? "important" : "")
            : (n.style[t] = i);
        }
        removeStyle(n, t, i) {
          i & Si.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
        }
        setProperty(n, t, i) {
          n[t] = i;
        }
        setValue(n, t) {
          n.nodeValue = t;
        }
        listen(n, t, i) {
          if ("string" == typeof n && !(n = Zs().getGlobalEventTarget(this.doc, n)))
            throw new Error(`Unsupported event target ${n} for event ${t}`);
          return this.eventManager.addEventListener(n, t, this.decoratePreventDefault(i));
        }
        decoratePreventDefault(n) {
          return (t) => {
            if ("__ngUnwrap__" === t) return n;
            !1 === (this.platformIsServer ? this.ngZone.runGuarded(() => n(t)) : n(t)) &&
              t.preventDefault();
          };
        }
      }
      function LD(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class Rk extends zh {
        constructor(n, t, i, r, o, s, a, l) {
          super(n, o, s, l),
            (this.sharedStylesHost = t),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = FD(r.id, r.styles);
          for (const u of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a), (d.textContent = u), this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t);
        }
        insertBefore(n, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, i);
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class qh extends zh {
        constructor(n, t, i, r, o, s, a, l) {
          super(n, o, s, a),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestroy = r),
            (this.styles = l ? FD(l, i.styles) : i.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class BD extends qh {
        constructor(n, t, i, r, o, s, a, l) {
          const c = r + "-" + i.id;
          super(n, t, i, o, s, a, l, c),
            (this.contentAttr = (function Ik(e) {
              return "_ngcontent-%COMP%".replace(Wh, e);
            })(c)),
            (this.hostAttr = (function Ok(e) {
              return "_nghost-%COMP%".replace(Wh, e);
            })(c));
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
        }
        createElement(n, t) {
          const i = super.createElement(n, t);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      let xk = (() => {
        class e extends RD {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, i, r) {
            return t.addEventListener(i, r, !1), () => this.removeEventListener(t, i, r);
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r);
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Tt));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      const VD = ["alt", "control", "meta", "shift"],
        Pk = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Fk = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let kk = (() => {
        class e extends RD {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, i, r) {
            const o = e.parseEventName(i),
              s = e.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Zs().onAndCancel(t, o.domEventName, s));
          }
          static parseEventName(t) {
            const i = t.toLowerCase().split("."),
              r = i.shift();
            if (0 === i.length || ("keydown" !== r && "keyup" !== r)) return null;
            const o = e._normalizeKey(i.pop());
            let s = "",
              a = i.indexOf("code");
            if (
              (a > -1 && (i.splice(a, 1), (s = "code.")),
              VD.forEach((c) => {
                const u = i.indexOf(c);
                u > -1 && (i.splice(u, 1), (s += c + "."));
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = r), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(t, i) {
            let r = Pk[t.key] || t.key,
              o = "";
            return (
              i.indexOf("code.") > -1 && ((r = t.code), (o = "code.")),
              !(null == r || !r) &&
                ((r = r.toLowerCase()),
                " " === r ? (r = "space") : "." === r && (r = "dot"),
                VD.forEach((s) => {
                  s !== r && (0, Fk[s])(t) && (o += s + ".");
                }),
                (o += r),
                o === i)
            );
          }
          static eventCallback(t, i, r) {
            return (o) => {
              e.matchEventFullKeyCode(o, t) && r.runGuarded(() => i(o));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Tt));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      const Hk = Pb(bP, "browser", [
          { provide: Xi, useValue: "browser" },
          {
            provide: K_,
            useValue: function Lk() {
              jh.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Tt,
            useFactory: function Vk() {
              return (
                (function NT(e) {
                  kd = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        jk = new F(""),
        $D = [
          {
            provide: oc,
            useClass: class wk {
              addToWindow(n) {
                (Ne.getAngularTestability = (i, r = !0) => {
                  const o = n.findTestabilityInTree(i, r);
                  if (null == o) throw new T(5103, !1);
                  return o;
                }),
                  (Ne.getAllAngularTestabilities = () => n.getAllTestabilities()),
                  (Ne.getAllAngularRootElements = () => n.getAllRootElements()),
                  Ne.frameworkStabilizers || (Ne.frameworkStabilizers = []),
                  Ne.frameworkStabilizers.push((i) => {
                    const r = Ne.getAllAngularTestabilities();
                    let o = r.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && i(s);
                    };
                    r.forEach((l) => {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, t, i) {
                return null == t
                  ? null
                  : n.getTestability(t) ??
                      (i
                        ? Zs().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Ib, useClass: dh, deps: [ue, fh, oc] },
          { provide: dh, useClass: dh, deps: [ue, fh, oc] },
        ],
        GD = [
          { provide: zd, useValue: "root" },
          {
            provide: ai,
            useFactory: function Bk() {
              return new ai();
            },
            deps: [],
          },
          { provide: $h, useClass: xk, multi: !0, deps: [Tt, ue, Xi] },
          { provide: $h, useClass: kk, multi: !0, deps: [Tt] },
          kD,
          xD,
          AD,
          { provide: lf, useExisting: kD },
          { provide: ND, useClass: Ck, deps: [] },
          [],
        ];
      let $k = (() => {
        class e {
          constructor(t) {}
          static withServerTransition(t) {
            return { ngModule: e, providers: [{ provide: Nl, useValue: t.appId }] };
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(jk, 12));
            };
          }
          static {
            this.ɵmod = Te({ type: e });
          }
          static {
            this.ɵinj = we({ providers: [...GD, ...$D], imports: [qF, DP] });
          }
        }
        return e;
      })();
      function In(e, n) {
        return ot((t, i) => {
          let r = 0;
          t.subscribe(tt(i, (o) => e.call(n, o, r++) && i.next(o)));
        });
      }
      function qD(e) {
        return ot((n, t) => {
          try {
            n.subscribe(t);
          } finally {
            t.add(e);
          }
        });
      }
      typeof window < "u" && window;
      class Cc {}
      class Sc {}
      class Jn {
        constructor(n) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            n
              ? "string" == typeof n
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      n.split("\n").forEach((t) => {
                        const i = t.indexOf(":");
                        if (i > 0) {
                          const r = t.slice(0, i),
                            o = r.toLowerCase(),
                            s = t.slice(i + 1).trim();
                          this.maybeSetNormalizedName(r, o),
                            this.headers.has(o)
                              ? this.headers.get(o).push(s)
                              : this.headers.set(o, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && n instanceof Headers
                ? ((this.headers = new Map()),
                  n.forEach((t, i) => {
                    this.setHeaderEntries(i, t);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(n).forEach(([t, i]) => {
                        this.setHeaderEntries(t, i);
                      });
                  })
              : (this.headers = new Map());
        }
        has(n) {
          return this.init(), this.headers.has(n.toLowerCase());
        }
        get(n) {
          this.init();
          const t = this.headers.get(n.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(n) {
          return this.init(), this.headers.get(n.toLowerCase()) || null;
        }
        append(n, t) {
          return this.clone({ name: n, value: t, op: "a" });
        }
        set(n, t) {
          return this.clone({ name: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ name: n, value: t, op: "d" });
        }
        maybeSetNormalizedName(n, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Jn ? this.copyFrom(this.lazyInit) : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((n) => this.applyUpdate(n)), (this.lazyUpdate = null)));
        }
        copyFrom(n) {
          n.init(),
            Array.from(n.headers.keys()).forEach((t) => {
              this.headers.set(t, n.headers.get(t)),
                this.normalizedNames.set(t, n.normalizedNames.get(t));
            });
        }
        clone(n) {
          const t = new Jn();
          return (
            (t.lazyInit = this.lazyInit && this.lazyInit instanceof Jn ? this.lazyInit : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
            t
          );
        }
        applyUpdate(n) {
          const t = n.name.toLowerCase();
          switch (n.op) {
            case "a":
            case "s":
              let i = n.value;
              if (("string" == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(n.name, t);
              const r = ("a" === n.op ? this.headers.get(t) : void 0) || [];
              r.push(...i), this.headers.set(t, r);
              break;
            case "d":
              const o = n.value;
              if (o) {
                let s = this.headers.get(t);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, s);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        setHeaderEntries(n, t) {
          const i = (Array.isArray(t) ? t : [t]).map((o) => o.toString()),
            r = n.toLowerCase();
          this.headers.set(r, i), this.maybeSetNormalizedName(n, r);
        }
        forEach(n) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              n(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class Yk {
        encodeKey(n) {
          return KD(n);
        }
        encodeValue(n) {
          return KD(n);
        }
        decodeKey(n) {
          return decodeURIComponent(n);
        }
        decodeValue(n) {
          return decodeURIComponent(n);
        }
      }
      const Xk = /%(\d[a-f0-9])/gi,
        Qk = { 40: "@", "3A": ":", 24: "$", "2C": ",", "3B": ";", "3D": "=", "3F": "?", "2F": "/" };
      function KD(e) {
        return encodeURIComponent(e).replace(Xk, (n, t) => Qk[t] ?? n);
      }
      function Nc(e) {
        return `${e}`;
      }
      class Ai {
        constructor(n = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = n.encoder || new Yk()),
            n.fromString)
          ) {
            if (n.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function Zk(e, n) {
              const t = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((r) => {
                      const o = r.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [n.decodeKey(r), ""]
                            : [n.decodeKey(r.slice(0, o)), n.decodeValue(r.slice(o + 1))],
                        l = t.get(s) || [];
                      l.push(a), t.set(s, l);
                    }),
                t
              );
            })(n.fromString, this.encoder);
          } else
            n.fromObject
              ? ((this.map = new Map()),
                Object.keys(n.fromObject).forEach((t) => {
                  const i = n.fromObject[t],
                    r = Array.isArray(i) ? i.map(Nc) : [Nc(i)];
                  this.map.set(t, r);
                }))
              : (this.map = null);
        }
        has(n) {
          return this.init(), this.map.has(n);
        }
        get(n) {
          this.init();
          const t = this.map.get(n);
          return t ? t[0] : null;
        }
        getAll(n) {
          return this.init(), this.map.get(n) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(n, t) {
          return this.clone({ param: n, value: t, op: "a" });
        }
        appendAll(n) {
          const t = [];
          return (
            Object.keys(n).forEach((i) => {
              const r = n[i];
              Array.isArray(r)
                ? r.forEach((o) => {
                    t.push({ param: i, value: o, op: "a" });
                  })
                : t.push({ param: i, value: r, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(n, t) {
          return this.clone({ param: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ param: n, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((n) => {
                const t = this.encoder.encodeKey(n);
                return this.map
                  .get(n)
                  .map((i) => t + "=" + this.encoder.encodeValue(i))
                  .join("&");
              })
              .filter((n) => "" !== n)
              .join("&")
          );
        }
        clone(n) {
          const t = new Ai({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this), (t.updates = (this.updates || []).concat(n)), t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom.keys().forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
              this.updates.forEach((n) => {
                switch (n.op) {
                  case "a":
                  case "s":
                    const t = ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                    t.push(Nc(n.value)), this.map.set(n.param, t);
                    break;
                  case "d":
                    if (void 0 === n.value) {
                      this.map.delete(n.param);
                      break;
                    }
                    {
                      let i = this.map.get(n.param) || [];
                      const r = i.indexOf(Nc(n.value));
                      -1 !== r && i.splice(r, 1),
                        i.length > 0 ? this.map.set(n.param, i) : this.map.delete(n.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class eL {
        constructor() {
          this.map = new Map();
        }
        set(n, t) {
          return this.map.set(n, t), this;
        }
        get(n) {
          return this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n);
        }
        delete(n) {
          return this.map.delete(n), this;
        }
        has(n) {
          return this.map.has(n);
        }
        keys() {
          return this.map.keys();
        }
      }
      function JD(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function YD(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function ZD(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class na {
        constructor(n, t, i, r) {
          let o;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = n.toUpperCase()),
            (function tL(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== i ? i : null), (o = r))
              : (o = i),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new Jn()),
            this.context || (this.context = new eL()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams = t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Ai()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : JD(this.body) ||
              YD(this.body) ||
              ZD(this.body) ||
              (function nL(e) {
                return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Ai
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || ZD(this.body)
            ? null
            : YD(this.body)
            ? this.body.type || null
            : JD(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Ai
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(n = {}) {
          const t = n.method || this.method,
            i = n.url || this.url,
            r = n.responseType || this.responseType,
            o = void 0 !== n.body ? n.body : this.body,
            s = void 0 !== n.withCredentials ? n.withCredentials : this.withCredentials,
            a = void 0 !== n.reportProgress ? n.reportProgress : this.reportProgress;
          let l = n.headers || this.headers,
            c = n.params || this.params;
          const u = n.context ?? this.context;
          return (
            void 0 !== n.setHeaders &&
              (l = Object.keys(n.setHeaders).reduce((d, f) => d.set(f, n.setHeaders[f]), l)),
            n.setParams &&
              (c = Object.keys(n.setParams).reduce((d, f) => d.set(f, n.setParams[f]), c)),
            new na(t, i, o, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: s,
            })
          );
        }
      }
      var Io = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })(Io || {});
      class Jh {
        constructor(n, t = 200, i = "OK") {
          (this.headers = n.headers || new Jn()),
            (this.status = void 0 !== n.status ? n.status : t),
            (this.statusText = n.statusText || i),
            (this.url = n.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Yh extends Jh {
        constructor(n = {}) {
          super(n), (this.type = Io.ResponseHeader);
        }
        clone(n = {}) {
          return new Yh({
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class Oo extends Jh {
        constructor(n = {}) {
          super(n), (this.type = Io.Response), (this.body = void 0 !== n.body ? n.body : null);
        }
        clone(n = {}) {
          return new Oo({
            body: void 0 !== n.body ? n.body : this.body,
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class XD extends Jh {
        constructor(n) {
          super(n, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${n.url || "(unknown url)"}`
                : `Http failure response for ${n.url || "(unknown url)"}: ${n.status} ${
                    n.statusText
                  }`),
            (this.error = n.error || null);
        }
      }
      function Zh(e, n) {
        return {
          body: n,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let QD = (() => {
        class e {
          constructor(t) {
            this.handler = t;
          }
          request(t, i, r = {}) {
            let o;
            if (t instanceof na) o = t;
            else {
              let l, c;
              (l = r.headers instanceof Jn ? r.headers : new Jn(r.headers)),
                r.params &&
                  (c = r.params instanceof Ai ? r.params : new Ai({ fromObject: r.params })),
                (o = new na(t, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || "json",
                  withCredentials: r.withCredentials,
                }));
            }
            const s = Ar(o).pipe(
              (function Jk(e, n) {
                return ee(n) ? Or(e, n, 1) : Or(e, 1);
              })((l) => this.handler.handle(l))
            );
            if (t instanceof na || "events" === r.observe) return s;
            const a = s.pipe(In((l) => l instanceof Oo));
            switch (r.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      vt((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      vt((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      vt((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(vt((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(`Unreachable: unhandled observe type ${r.observe}}`);
            }
          }
          delete(t, i = {}) {
            return this.request("DELETE", t, i);
          }
          get(t, i = {}) {
            return this.request("GET", t, i);
          }
          head(t, i = {}) {
            return this.request("HEAD", t, i);
          }
          jsonp(t, i) {
            return this.request("JSONP", t, {
              params: new Ai().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, i = {}) {
            return this.request("OPTIONS", t, i);
          }
          patch(t, i, r = {}) {
            return this.request("PATCH", t, Zh(r, i));
          }
          post(t, i, r = {}) {
            return this.request("POST", t, Zh(r, i));
          }
          put(t, i, r = {}) {
            return this.request("PUT", t, Zh(r, i));
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Cc));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      function n1(e, n) {
        return n(e);
      }
      function rL(e, n) {
        return (t, i) => n.intercept(t, { handle: (r) => e(r, i) });
      }
      const sL = new F(""),
        ia = new F(""),
        i1 = new F("");
      function aL() {
        let e = null;
        return (n, t) => {
          null === e && (e = (U(sL, { optional: !0 }) ?? []).reduceRight(rL, n1));
          const i = U(lh),
            r = i.add();
          return e(n, t).pipe(qD(() => i.remove(r)));
        };
      }
      let r1 = (() => {
        class e extends Cc {
          constructor(t, i) {
            super(),
              (this.backend = t),
              (this.injector = i),
              (this.chain = null),
              (this.pendingTasks = U(lh));
          }
          handle(t) {
            if (null === this.chain) {
              const r = Array.from(
                new Set([...this.injector.get(ia), ...this.injector.get(i1, [])])
              );
              this.chain = r.reduceRight(
                (o, s) =>
                  (function oL(e, n, t) {
                    return (i, r) => t.runInContext(() => n(i, (o) => e(o, r)));
                  })(o, s, this.injector),
                n1
              );
            }
            const i = this.pendingTasks.add();
            return this.chain(t, (r) => this.backend.handle(r)).pipe(
              qD(() => this.pendingTasks.remove(i))
            );
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Sc), P(on));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      const dL = /^\)\]\}',?\n/;
      let s1 = (() => {
        class e {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ("JSONP" === t.method) throw new T(-2800, !1);
            const i = this.xhrFactory;
            return (i.ɵloadImpl ? Yo(i.ɵloadImpl()) : Ar(null)).pipe(
              Iu(
                () =>
                  new Ae((o) => {
                    const s = i.build();
                    if (
                      (s.open(t.method, t.urlWithParams),
                      t.withCredentials && (s.withCredentials = !0),
                      t.headers.forEach((g, m) => s.setRequestHeader(g, m.join(","))),
                      t.headers.has("Accept") ||
                        s.setRequestHeader("Accept", "application/json, text/plain, */*"),
                      !t.headers.has("Content-Type"))
                    ) {
                      const g = t.detectContentTypeHeader();
                      null !== g && s.setRequestHeader("Content-Type", g);
                    }
                    if (t.responseType) {
                      const g = t.responseType.toLowerCase();
                      s.responseType = "json" !== g ? g : "text";
                    }
                    const a = t.serializeBody();
                    let l = null;
                    const c = () => {
                        if (null !== l) return l;
                        const g = s.statusText || "OK",
                          m = new Jn(s.getAllResponseHeaders()),
                          D =
                            (function fL(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(s) || t.url;
                        return (
                          (l = new Yh({ headers: m, status: s.status, statusText: g, url: D })), l
                        );
                      },
                      u = () => {
                        let { headers: g, status: m, statusText: D, url: y } = c(),
                          S = null;
                        204 !== m && (S = typeof s.response > "u" ? s.responseText : s.response),
                          0 === m && (m = S ? 200 : 0);
                        let N = m >= 200 && m < 300;
                        if ("json" === t.responseType && "string" == typeof S) {
                          const A = S;
                          S = S.replace(dL, "");
                          try {
                            S = "" !== S ? JSON.parse(S) : null;
                          } catch ($) {
                            (S = A), N && ((N = !1), (S = { error: $, text: S }));
                          }
                        }
                        N
                          ? (o.next(
                              new Oo({
                                body: S,
                                headers: g,
                                status: m,
                                statusText: D,
                                url: y || void 0,
                              })
                            ),
                            o.complete())
                          : o.error(
                              new XD({
                                error: S,
                                headers: g,
                                status: m,
                                statusText: D,
                                url: y || void 0,
                              })
                            );
                      },
                      d = (g) => {
                        const { url: m } = c(),
                          D = new XD({
                            error: g,
                            status: s.status || 0,
                            statusText: s.statusText || "Unknown Error",
                            url: m || void 0,
                          });
                        o.error(D);
                      };
                    let f = !1;
                    const h = (g) => {
                        f || (o.next(c()), (f = !0));
                        let m = { type: Io.DownloadProgress, loaded: g.loaded };
                        g.lengthComputable && (m.total = g.total),
                          "text" === t.responseType &&
                            s.responseText &&
                            (m.partialText = s.responseText),
                          o.next(m);
                      },
                      p = (g) => {
                        let m = { type: Io.UploadProgress, loaded: g.loaded };
                        g.lengthComputable && (m.total = g.total), o.next(m);
                      };
                    return (
                      s.addEventListener("load", u),
                      s.addEventListener("error", d),
                      s.addEventListener("timeout", d),
                      s.addEventListener("abort", d),
                      t.reportProgress &&
                        (s.addEventListener("progress", h),
                        null !== a && s.upload && s.upload.addEventListener("progress", p)),
                      s.send(a),
                      o.next({ type: Io.Sent }),
                      () => {
                        s.removeEventListener("error", d),
                          s.removeEventListener("abort", d),
                          s.removeEventListener("load", u),
                          s.removeEventListener("timeout", d),
                          t.reportProgress &&
                            (s.removeEventListener("progress", h),
                            null !== a && s.upload && s.upload.removeEventListener("progress", p)),
                          s.readyState !== s.DONE && s.abort();
                      }
                    );
                  })
              )
            );
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(ND));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      const Xh = new F("XSRF_ENABLED"),
        a1 = new F("XSRF_COOKIE_NAME", { providedIn: "root", factory: () => "XSRF-TOKEN" }),
        l1 = new F("XSRF_HEADER_NAME", { providedIn: "root", factory: () => "X-XSRF-TOKEN" });
      class c1 {}
      let gL = (() => {
        class e {
          constructor(t, i, r) {
            (this.doc = t),
              (this.platform = i),
              (this.cookieName = r),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const t = this.doc.cookie || "";
            return (
              t !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = _D(t, this.cookieName)),
                (this.lastCookieString = t)),
              this.lastToken
            );
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(Tt), P(Xi), P(a1));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac });
          }
        }
        return e;
      })();
      function mL(e, n) {
        const t = e.url.toLowerCase();
        if (
          !U(Xh) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          t.startsWith("http://") ||
          t.startsWith("https://")
        )
          return n(e);
        const i = U(c1).getToken(),
          r = U(l1);
        return (
          null != i && !e.headers.has(r) && (e = e.clone({ headers: e.headers.set(r, i) })), n(e)
        );
      }
      var Ri = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = "Interceptors"),
          (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
          (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
          (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
          (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
          (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
          (e[(e.Fetch = 6)] = "Fetch"),
          e
        );
      })(Ri || {});
      function lr(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      function _L(...e) {
        const n = [
          QD,
          s1,
          r1,
          { provide: Cc, useExisting: r1 },
          { provide: Sc, useExisting: s1 },
          { provide: ia, useValue: mL, multi: !0 },
          { provide: Xh, useValue: !0 },
          { provide: c1, useClass: gL },
        ];
        for (const t of e) n.push(...t.ɵproviders);
        return (function Gd(e) {
          return { ɵproviders: e };
        })(n);
      }
      const u1 = new F("LEGACY_INTERCEPTOR_FN");
      let yL = (() => {
        class e {
          static {
            this.ɵfac = function (i) {
              return new (i || e)();
            };
          }
          static {
            this.ɵmod = Te({ type: e });
          }
          static {
            this.ɵinj = we({
              providers: [
                _L(
                  lr(Ri.LegacyInterceptors, [
                    { provide: u1, useFactory: aL },
                    { provide: ia, useExisting: u1, multi: !0 },
                  ])
                ),
              ],
            });
          }
        }
        return e;
      })();
      function Qh(e, n, t) {
        const i = ee(e) || n || t ? { next: e, error: n, complete: t } : e;
        return i
          ? ot((r, o) => {
              var s;
              null === (s = i.subscribe) || void 0 === s || s.call(i);
              let a = !0;
              r.subscribe(
                tt(
                  o,
                  (l) => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l), o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1), null === (l = i.complete) || void 0 === l || l.call(i), o.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1), null === (c = i.error) || void 0 === c || c.call(i, l), o.error(l);
                  },
                  () => {
                    var l, c;
                    a && (null === (l = i.unsubscribe) || void 0 === l || l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : Gi;
      }
      let SL = (() => {
        class e {
          constructor(t) {
            (this.httpClient = t),
              (this.expenseResponse = {
                expenses: [],
                maxPurchase: 0,
                total: 0,
                food: 0,
                entertainment: 0,
                travel: 0,
              });
          }
          fetchExpenses() {
            return this.httpClient.get("/api/expense").pipe(
              Qh((t) => {
                this.expenseResponse = t;
              })
            );
          }
          getExpenses() {
            return this.fetchExpenses();
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(P(QD));
            };
          }
          static {
            this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
          }
        }
        return e;
      })();
      function NL(e, n) {
        if (
          (1 & e &&
            (k(0, "tr")(1, "td"), de(2), L(), k(3, "td"), de(4), L(), k(5, "td"), de(6), L()()),
          2 & e)
        ) {
          const t = n.$implicit;
          x(2), an(t.name), x(2), an(t.amount), x(2), an(t.category);
        }
      }
      let TL = (() => {
        class e {
          constructor(t) {
            (this.expenseService = t),
              (this.total = 0),
              (this.expenses = []),
              (this.maxPurchase = 0),
              (this.food = 0),
              (this.entertainment = 0),
              (this.travel = 0);
          }
          ngOnInit() {
            this.getExpenses();
          }
          getExpenses() {
            this.expenseService.getExpenses().subscribe((t) => {
              (this.expenses = t.expenses),
                (this.total = t.total),
                (this.maxPurchase = t.maxPurchase),
                (this.food = t.food),
                (this.entertainment = t.entertainment),
                (this.travel = t.travel);
            });
          }
          logOut() {
            window.location.href = "/api/logout";
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(v(SL));
            };
          }
          static {
            this.ɵcmp = tn({
              type: e,
              selectors: [["app-expense-page"]],
              decls: 56,
              vars: 6,
              consts: [
                [1, "navbar", "navbar-expand-lg", "navbar-light", "bg-light"],
                ["href", "/expense", 1, "navbar-brand"],
                ["type", "button", 1, "btn", "btn-outline-danger", "ml-auto", 3, "click"],
                [1, "container", "mt-4"],
                [1, "row", "mb-4"],
                [1, "col-md-12"],
                [1, "card", "border-0"],
                [1, "card-body"],
                [1, "card-title", "text-center", "mb-4"],
                [1, "d-flex", "flex-column", "flex-md-row", "justify-content-around"],
                [1, "card", "text-center", "flex-fill", "mx-2", "mb-2", "mb-md-0"],
                [1, "card-title"],
                [1, "card-text", "font-weight-bold"],
                [1, "row"],
                [
                  1,
                  "table",
                  "table-striped",
                  "table-bordered",
                  "text-center",
                  2,
                  "border",
                  "1px solid #dee2e6",
                  "border-radius",
                  "10px",
                ],
                [1, "thead-dark"],
                ["scope", "col"],
                [4, "ngFor", "ngForOf"],
              ],
              template: function (i, r) {
                1 & i &&
                  (k(0, "nav", 0)(1, "a", 1),
                  de(2, "Expense Tracker"),
                  L(),
                  k(3, "button", 2),
                  oe("click", function () {
                    return r.logOut();
                  }),
                  de(4, "Logout"),
                  L()(),
                  k(5, "div", 3)(6, "div", 4)(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "h5", 8),
                  de(11, "Expense Statistics"),
                  L(),
                  k(12, "div", 9)(13, "div", 10)(14, "div", 7)(15, "h6", 11),
                  de(16, "Total Spend This Month"),
                  L(),
                  k(17, "p", 12),
                  de(18),
                  L()()(),
                  k(19, "div", 10)(20, "div", 7)(21, "h6", 11),
                  de(22, "Highest Purchase"),
                  L(),
                  k(23, "p", 12),
                  de(24),
                  L()()(),
                  k(25, "div", 10)(26, "div", 7)(27, "h6", 11),
                  de(28, "Food"),
                  L(),
                  k(29, "p", 12),
                  de(30),
                  L()()(),
                  k(31, "div", 10)(32, "div", 7)(33, "h6", 11),
                  de(34, "Entertainment"),
                  L(),
                  k(35, "p", 12),
                  de(36),
                  L()()(),
                  k(37, "div", 10)(38, "div", 7)(39, "h6", 11),
                  de(40, "Travel"),
                  L(),
                  k(41, "p", 12),
                  de(42),
                  L()()()()()()(),
                  k(43, "div", 13)(44, "div", 5)(45, "table", 14)(46, "thead", 15)(47, "tr")(
                    48,
                    "th",
                    16
                  ),
                  de(49, "Name"),
                  L(),
                  k(50, "th", 16),
                  de(51, "Amount"),
                  L(),
                  k(52, "th", 16),
                  de(53, "Category"),
                  L()()(),
                  k(54, "tbody"),
                  (function H(e, n, t, i, r, o, s, a) {
                    const l = w(),
                      c = re(),
                      u = e + Q,
                      d = c.firstCreatePass
                        ? (function uO(e, n, t, i, r, o, s, a, l) {
                            const c = n.consts,
                              u = fo(n, e, 4, s || null, wi(c, a));
                            bf(n, t, u, wi(c, l)), Xa(n, u);
                            const d = (u.tView = yf(
                              2,
                              u,
                              i,
                              r,
                              o,
                              n.directiveRegistry,
                              n.pipeRegistry,
                              null,
                              n.schemas,
                              c,
                              null
                            ));
                            return (
                              null !== n.queries &&
                                (n.queries.template(n, u),
                                (d.queries = n.queries.embeddedTView(u))),
                              u
                            );
                          })(u, c, l, n, t, i, r, o, s)
                        : c.data[u];
                    jn(d, !1);
                    const f = cy(c, l, d, e);
                    Za() && _l(c, l, f, d),
                      mt(f, l),
                      Bl(l, (l[u] = xv(f, l, f, d))),
                      qa(d) && _f(c, l, d),
                      null != s && vf(l, d, a);
                  })(55, NL, 7, 3, "tr", 17),
                  L()()()()()()),
                  2 & i &&
                    (x(18),
                    En("\u20ac ", r.total, ""),
                    x(6),
                    En("\u20ac ", r.maxPurchase, ""),
                    x(6),
                    En("\u20ac ", r.food, ""),
                    x(6),
                    En("\u20ac ", r.entertainment, ""),
                    x(6),
                    En("\u20ac ", r.travel, ""),
                    x(13),
                    B("ngForOf", r.expenses));
              },
              dependencies: [hi],
              encapsulation: 2,
            });
          }
        }
        return e;
      })();
      const { isArray: ML } = Array;
      const OL = ["addListener", "removeListener"],
        AL = ["addEventListener", "removeEventListener"],
        RL = ["on", "off"];
      function dt(e, n, t, i) {
        if ((ee(t) && ((i = t), (t = void 0)), i))
          return dt(e, n, t).pipe(
            (function d1(e) {
              return vt((n) =>
                (function IL(e, n) {
                  return ML(n) ? e(...n) : e(n);
                })(e, n)
              );
            })(i)
          );
        const [r, o] = (function FL(e) {
          return ee(e.addEventListener) && ee(e.removeEventListener);
        })(e)
          ? AL.map((s) => (a) => e[s](n, a, t))
          : (function xL(e) {
              return ee(e.addListener) && ee(e.removeListener);
            })(e)
          ? OL.map(f1(e, n))
          : (function PL(e) {
              return ee(e.on) && ee(e.off);
            })(e)
          ? RL.map(f1(e, n))
          : [];
        if (!r && Su(e)) return Or((s) => dt(s, n, t))(st(e));
        if (!r) throw new TypeError("Invalid event target");
        return new Ae((s) => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return r(a), () => o(a);
        });
      }
      function f1(e, n) {
        return (t) => (i) => e[t](n, i);
      }
      class kL extends et {
        constructor(n, t) {
          super();
        }
        schedule(n, t = 0) {
          return this;
        }
      }
      const Mc = {
          setInterval(e, n, ...t) {
            const { delegate: i } = Mc;
            return i?.setInterval ? i.setInterval(e, n, ...t) : setInterval(e, n, ...t);
          },
          clearInterval(e) {
            const { delegate: n } = Mc;
            return (n?.clearInterval || clearInterval)(e);
          },
          delegate: void 0,
        },
        h1 = { now: () => (h1.delegate || Date).now(), delegate: void 0 };
      class ra {
        constructor(n, t = ra.now) {
          (this.schedulerActionCtor = n), (this.now = t);
        }
        schedule(n, t = 0, i) {
          return new this.schedulerActionCtor(this, n).schedule(i, t);
        }
      }
      ra.now = h1.now;
      const VL = new (class BL extends ra {
        constructor(n, t = ra.now) {
          super(n, t), (this.actions = []), (this._active = !1);
        }
        flush(n) {
          const { actions: t } = this;
          if (this._active) return void t.push(n);
          let i;
          this._active = !0;
          do {
            if ((i = n.execute(n.state, n.delay))) break;
          } while ((n = t.shift()));
          if (((this._active = !1), i)) {
            for (; (n = t.shift()); ) n.unsubscribe();
            throw i;
          }
        }
      })(
        class LL extends kL {
          constructor(n, t) {
            super(n, t), (this.scheduler = n), (this.work = t), (this.pending = !1);
          }
          schedule(n, t = 0) {
            var i;
            if (this.closed) return this;
            this.state = n;
            const r = this.id,
              o = this.scheduler;
            return (
              null != r && (this.id = this.recycleAsyncId(o, r, t)),
              (this.pending = !0),
              (this.delay = t),
              (this.id =
                null !== (i = this.id) && void 0 !== i ? i : this.requestAsyncId(o, this.id, t)),
              this
            );
          }
          requestAsyncId(n, t, i = 0) {
            return Mc.setInterval(n.flush.bind(n, this), i);
          }
          recycleAsyncId(n, t, i = 0) {
            if (null != i && this.delay === i && !1 === this.pending) return t;
            null != t && Mc.clearInterval(t);
          }
          execute(n, t) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const i = this._execute(n, t);
            if (i) return i;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(n, t) {
            let r,
              i = !1;
            try {
              this.work(n);
            } catch (o) {
              (i = !0), (r = o || new Error("Scheduled action threw falsy error"));
            }
            if (i) return this.unsubscribe(), r;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: n, scheduler: t } = this,
                { actions: i } = t;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                gi(i, this),
                null != n && (this.id = this.recycleAsyncId(t, n, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        }
      );
      const { isArray: jL } = Array;
      function m1(e) {
        return 1 === e.length && jL(e[0]) ? e[0] : e;
      }
      function ep(...e) {
        const n = Tu(e),
          t = m1(e);
        return t.length
          ? new Ae((i) => {
              let r = t.map(() => []),
                o = t.map(() => !1);
              i.add(() => {
                r = o = null;
              });
              for (let s = 0; !i.closed && s < t.length; s++)
                st(t[s]).subscribe(
                  tt(
                    i,
                    (a) => {
                      if ((r[s].push(a), r.every((l) => l.length))) {
                        const l = r.map((c) => c.shift());
                        i.next(n ? n(...l) : l),
                          r.some((c, u) => !c.length && o[u]) && i.complete();
                      }
                    },
                    () => {
                      (o[s] = !0), !r[s].length && i.complete();
                    }
                  )
                );
              return () => {
                r = o = null;
              };
            })
          : Jo;
      }
      function We(e) {
        return ot((n, t) => {
          st(e).subscribe(tt(t, () => t.complete(), $i)), !t.closed && n.subscribe(t);
        });
      }
      function On(e) {
        return e <= 0
          ? () => Jo
          : ot((n, t) => {
              let i = 0;
              n.subscribe(
                tt(t, (r) => {
                  ++i <= e && (t.next(r), e <= i && t.complete());
                })
              );
            });
      }
      function tp(...e) {
        const n = Tu(e);
        return ot((t, i) => {
          const r = e.length,
            o = new Array(r);
          let s = e.map(() => !1),
            a = !1;
          for (let l = 0; l < r; l++)
            st(e[l]).subscribe(
              tt(
                i,
                (c) => {
                  (o[l] = c), !a && !s[l] && ((s[l] = !0), (a = s.every(Gi)) && (s = null));
                },
                $i
              )
            );
          t.subscribe(
            tt(i, (l) => {
              if (a) {
                const c = [l, ...o];
                i.next(n ? n(...c) : c);
              }
            })
          );
        });
      }
      Error;
      Math, Math, Math;
      const MV = ["*"],
        rH = ["dialog"];
      function hr(e) {
        return "string" == typeof e;
      }
      function pr(e) {
        return null != e;
      }
      function Lo(e) {
        return (e || document.body).getBoundingClientRect();
      }
      const ZE = { animation: !0, transitionTimerDelayMs: 5 },
        YH = () => {},
        { transitionTimerDelayMs: ZH } = ZE,
        _a = new Map(),
        $t = (e, n, t, i) => {
          let r = i.context || {};
          const o = _a.get(n);
          if (o)
            switch (i.runningTransition) {
              case "continue":
                return Jo;
              case "stop":
                e.run(() => o.transition$.complete()),
                  (r = Object.assign(o.context, r)),
                  _a.delete(n);
            }
          const s = t(n, i.animation, r) || YH;
          if (!i.animation || "none" === window.getComputedStyle(n).transitionProperty)
            return (
              e.run(() => s()),
              Ar(void 0).pipe(
                (function KH(e) {
                  return (n) =>
                    new Ae((t) =>
                      n.subscribe({
                        next: (s) => e.run(() => t.next(s)),
                        error: (s) => e.run(() => t.error(s)),
                        complete: () => e.run(() => t.complete()),
                      })
                    );
                })(e)
              )
            );
          const a = new Pe(),
            l = new Pe(),
            c = a.pipe(
              (function UL(...e) {
                return (n) =>
                  (function Ic(...e) {
                    return (function GL() {
                      return pg(1);
                    })()(Yo(e, Fa(e)));
                  })(n, Ar(...e));
              })(!0)
            );
          _a.set(n, {
            transition$: a,
            complete: () => {
              l.next(), l.complete();
            },
            context: r,
          });
          const u = (function JH(e) {
            const { transitionDelay: n, transitionDuration: t } = window.getComputedStyle(e);
            return 1e3 * (parseFloat(n) + parseFloat(t));
          })(n);
          return (
            e.runOutsideAngular(() => {
              const d = dt(n, "transitionend").pipe(
                We(c),
                In(({ target: h }) => h === n)
              );
              (function _1(...e) {
                return 1 === (e = m1(e)).length
                  ? st(e[0])
                  : new Ae(
                      (function $L(e) {
                        return (n) => {
                          let t = [];
                          for (let i = 0; t && !n.closed && i < e.length; i++)
                            t.push(
                              st(e[i]).subscribe(
                                tt(n, (r) => {
                                  if (t) {
                                    for (let o = 0; o < t.length; o++)
                                      o !== i && t[o].unsubscribe();
                                    t = null;
                                  }
                                  n.next(r);
                                })
                              )
                            );
                        };
                      })(e)
                    );
              })(
                (function g1(e = 0, n, t = VL) {
                  let i = -1;
                  return (
                    null != n && (gg(n) ? (t = n) : (i = n)),
                    new Ae((r) => {
                      let o = (function HL(e) {
                        return e instanceof Date && !isNaN(e);
                      })(e)
                        ? +e - t.now()
                        : e;
                      o < 0 && (o = 0);
                      let s = 0;
                      return t.schedule(function () {
                        r.closed || (r.next(s++), 0 <= i ? this.schedule(void 0, i) : r.complete());
                      }, o);
                    })
                  );
                })(u + ZH).pipe(We(c)),
                d,
                l
              )
                .pipe(We(c))
                .subscribe(() => {
                  _a.delete(n),
                    e.run(() => {
                      s(), a.next(), a.complete();
                    });
                });
            }),
            a.asObservable()
          );
        };
      let zc = (() => {
          class e {
            constructor() {
              this.animation = ZE.animation;
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
            }
          }
          return e;
        })(),
        sw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        aw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        uw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        dw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })();
      var Se = (function (e) {
        return (
          (e[(e.Tab = 9)] = "Tab"),
          (e[(e.Enter = 13)] = "Enter"),
          (e[(e.Escape = 27)] = "Escape"),
          (e[(e.Space = 32)] = "Space"),
          (e[(e.PageUp = 33)] = "PageUp"),
          (e[(e.PageDown = 34)] = "PageDown"),
          (e[(e.End = 35)] = "End"),
          (e[(e.Home = 36)] = "Home"),
          (e[(e.ArrowLeft = 37)] = "ArrowLeft"),
          (e[(e.ArrowUp = 38)] = "ArrowUp"),
          (e[(e.ArrowRight = 39)] = "ArrowRight"),
          (e[(e.ArrowDown = 40)] = "ArrowDown"),
          e
        );
      })(Se || {});
      typeof navigator < "u" &&
        navigator.userAgent &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (/Macintosh/.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2) ||
          /Android/.test(navigator.userAgent));
      const vw = [
        "a[href]",
        "button:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[contenteditable]",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");
      function yw(e) {
        const n = Array.from(e.querySelectorAll(vw)).filter((t) => -1 !== t.tabIndex);
        return [n[0], n[n.length - 1]];
      }
      new Date(1882, 10, 12), new Date(2174, 10, 25);
      let Rw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Fw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })();
      class yr {
        constructor(n, t, i) {
          (this.nodes = n), (this.viewRef = t), (this.componentRef = i);
        }
      }
      let Yj = (() => {
        class e {
          constructor(t, i) {
            (this._el = t), (this._zone = i);
          }
          ngOnInit() {
            this._zone.onStable
              .asObservable()
              .pipe(On(1))
              .subscribe(() => {
                $t(
                  this._zone,
                  this._el.nativeElement,
                  (t, i) => {
                    i && Lo(t), t.classList.add("show");
                  },
                  { animation: this.animation, runningTransition: "continue" }
                );
              });
          }
          hide() {
            return $t(this._zone, this._el.nativeElement, ({ classList: t }) => t.remove("show"), {
              animation: this.animation,
              runningTransition: "stop",
            });
          }
          static {
            this.ɵfac = function (i) {
              return new (i || e)(v(be), v(ue));
            };
          }
          static {
            this.ɵcmp = tn({
              type: e,
              selectors: [["ngb-modal-backdrop"]],
              hostAttrs: [2, "z-index", "1055"],
              hostVars: 6,
              hostBindings: function (i, r) {
                2 & i &&
                  (tr("modal-backdrop" + (r.backdropClass ? " " + r.backdropClass : "")),
                  ce("show", !r.animation)("fade", r.animation));
              },
              inputs: { animation: "animation", backdropClass: "backdropClass" },
              standalone: !0,
              features: [wn],
              decls: 0,
              vars: 0,
              template: function (i, r) {},
              encapsulation: 2,
            });
          }
        }
        return e;
      })();
      class kw {
        update(n) {}
        close(n) {}
        dismiss(n) {}
      }
      const Zj = [
          "animation",
          "ariaLabelledBy",
          "ariaDescribedBy",
          "backdrop",
          "centered",
          "fullscreen",
          "keyboard",
          "scrollable",
          "size",
          "windowClass",
          "modalDialogClass",
        ],
        Xj = ["animation", "backdropClass"];
      class Qj {
        _applyWindowOptions(n, t) {
          Zj.forEach((i) => {
            pr(t[i]) && (n[i] = t[i]);
          });
        }
        _applyBackdropOptions(n, t) {
          Xj.forEach((i) => {
            pr(t[i]) && (n[i] = t[i]);
          });
        }
        update(n) {
          this._applyWindowOptions(this._windowCmptRef.instance, n),
            this._backdropCmptRef &&
              this._backdropCmptRef.instance &&
              this._applyBackdropOptions(this._backdropCmptRef.instance, n);
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance;
        }
        get closed() {
          return this._closed.asObservable().pipe(We(this._hidden));
        }
        get dismissed() {
          return this._dismissed.asObservable().pipe(We(this._hidden));
        }
        get hidden() {
          return this._hidden.asObservable();
        }
        get shown() {
          return this._windowCmptRef.instance.shown.asObservable();
        }
        constructor(n, t, i, r) {
          (this._windowCmptRef = n),
            (this._contentRef = t),
            (this._backdropCmptRef = i),
            (this._beforeDismiss = r),
            (this._closed = new Pe()),
            (this._dismissed = new Pe()),
            (this._hidden = new Pe()),
            n.instance.dismissEvent.subscribe((o) => {
              this.dismiss(o);
            }),
            (this.result = new Promise((o, s) => {
              (this._resolve = o), (this._reject = s);
            })),
            this.result.then(null, () => {});
        }
        close(n) {
          this._windowCmptRef &&
            (this._closed.next(n), this._resolve(n), this._removeModalElements());
        }
        _dismiss(n) {
          this._dismissed.next(n), this._reject(n), this._removeModalElements();
        }
        dismiss(n) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const t = this._beforeDismiss();
              !(function KE(e) {
                return e && e.then;
              })(t)
                ? !1 !== t && this._dismiss(n)
                : t.then(
                    (i) => {
                      !1 !== i && this._dismiss(n);
                    },
                    () => {}
                  );
            } else this._dismiss(n);
        }
        _removeModalElements() {
          const n = this._windowCmptRef.instance.hide(),
            t = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : Ar(void 0);
          n.subscribe(() => {
            const { nativeElement: i } = this._windowCmptRef.location;
            i.parentNode.removeChild(i),
              this._windowCmptRef.destroy(),
              this._contentRef && this._contentRef.viewRef && this._contentRef.viewRef.destroy(),
              (this._windowCmptRef = null),
              (this._contentRef = null);
          }),
            t.subscribe(() => {
              if (this._backdropCmptRef) {
                const { nativeElement: i } = this._backdropCmptRef.location;
                i.parentNode.removeChild(i),
                  this._backdropCmptRef.destroy(),
                  (this._backdropCmptRef = null);
              }
            }),
            ep(n, t).subscribe(() => {
              this._hidden.next(), this._hidden.complete();
            });
        }
      }
      var Zp = (function (e) {
        return (e[(e.BACKDROP_CLICK = 0)] = "BACKDROP_CLICK"), (e[(e.ESC = 1)] = "ESC"), e;
      })(Zp || {});
      let e$ = (() => {
          class e {
            constructor(t, i, r) {
              (this._document = t),
                (this._elRef = i),
                (this._zone = r),
                (this._closed$ = new Pe()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new j()),
                (this.shown = new Pe()),
                (this.hidden = new Pe());
            }
            get fullscreenClass() {
              return !0 === this.fullscreen
                ? " modal-fullscreen"
                : hr(this.fullscreen)
                ? ` modal-fullscreen-${this.fullscreen}-down`
                : "";
            }
            dismiss(t) {
              this.dismissEvent.emit(t);
            }
            ngOnInit() {
              (this._elWithFocus = this._document.activeElement),
                this._zone.onStable
                  .asObservable()
                  .pipe(On(1))
                  .subscribe(() => {
                    this._show();
                  });
            }
            ngOnDestroy() {
              this._disableEventHandling();
            }
            hide() {
              const { nativeElement: t } = this._elRef,
                i = { animation: this.animation, runningTransition: "stop" },
                s = ep(
                  $t(this._zone, t, () => t.classList.remove("show"), i),
                  $t(this._zone, this._dialogEl.nativeElement, () => {}, i)
                );
              return (
                s.subscribe(() => {
                  this.hidden.next(), this.hidden.complete();
                }),
                this._disableEventHandling(),
                this._restoreFocus(),
                s
              );
            }
            _show() {
              const t = { animation: this.animation, runningTransition: "continue" };
              ep(
                $t(
                  this._zone,
                  this._elRef.nativeElement,
                  (o, s) => {
                    s && Lo(o), o.classList.add("show");
                  },
                  t
                ),
                $t(this._zone, this._dialogEl.nativeElement, () => {}, t)
              ).subscribe(() => {
                this.shown.next(), this.shown.complete();
              }),
                this._enableEventHandling(),
                this._setFocus();
            }
            _enableEventHandling() {
              const { nativeElement: t } = this._elRef;
              this._zone.runOutsideAngular(() => {
                dt(t, "keydown")
                  .pipe(
                    We(this._closed$),
                    In((r) => r.which === Se.Escape)
                  )
                  .subscribe((r) => {
                    this.keyboard
                      ? requestAnimationFrame(() => {
                          r.defaultPrevented || this._zone.run(() => this.dismiss(Zp.ESC));
                        })
                      : "static" === this.backdrop && this._bumpBackdrop();
                  });
                let i = !1;
                dt(this._dialogEl.nativeElement, "mousedown")
                  .pipe(
                    We(this._closed$),
                    Qh(() => (i = !1)),
                    Iu(() => dt(t, "mouseup").pipe(We(this._closed$), On(1))),
                    In(({ target: r }) => t === r)
                  )
                  .subscribe(() => {
                    i = !0;
                  }),
                  dt(t, "click")
                    .pipe(We(this._closed$))
                    .subscribe(({ target: r }) => {
                      t === r &&
                        ("static" === this.backdrop
                          ? this._bumpBackdrop()
                          : !0 === this.backdrop &&
                            !i &&
                            this._zone.run(() => this.dismiss(Zp.BACKDROP_CLICK))),
                        (i = !1);
                    });
              });
            }
            _disableEventHandling() {
              this._closed$.next();
            }
            _setFocus() {
              const { nativeElement: t } = this._elRef;
              if (!t.contains(document.activeElement)) {
                const i = t.querySelector("[ngbAutofocus]"),
                  r = yw(t)[0];
                (i || r || t).focus();
              }
            }
            _restoreFocus() {
              const t = this._document.body,
                i = this._elWithFocus;
              let r;
              (r = i && i.focus && t.contains(i) ? i : t),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => r.focus()), (this._elWithFocus = null);
                });
            }
            _bumpBackdrop() {
              "static" === this.backdrop &&
                $t(
                  this._zone,
                  this._elRef.nativeElement,
                  ({ classList: t }) => (t.add("modal-static"), () => t.remove("modal-static")),
                  { animation: this.animation, runningTransition: "continue" }
                );
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)(v(Tt), v(be), v(ue));
              };
            }
            static {
              this.ɵcmp = tn({
                type: e,
                selectors: [["ngb-modal-window"]],
                viewQuery: function (i, r) {
                  if ((1 & i && rr(rH, 7), 2 & i)) {
                    let o;
                    De(
                      (o = (function Ee() {
                        return (function nx(e, n) {
                          return e[Bn].queries[n].queryList;
                        })(w(), Cm());
                      })())
                    ) && (r._dialogEl = o.first);
                  }
                },
                hostAttrs: ["role", "dialog", "tabindex", "-1"],
                hostVars: 7,
                hostBindings: function (i, r) {
                  2 & i &&
                    (ye("aria-modal", !0)("aria-labelledby", r.ariaLabelledBy)(
                      "aria-describedby",
                      r.ariaDescribedBy
                    ),
                    tr("modal d-block" + (r.windowClass ? " " + r.windowClass : "")),
                    ce("fade", r.animation));
                },
                inputs: {
                  animation: "animation",
                  ariaLabelledBy: "ariaLabelledBy",
                  ariaDescribedBy: "ariaDescribedBy",
                  backdrop: "backdrop",
                  centered: "centered",
                  fullscreen: "fullscreen",
                  keyboard: "keyboard",
                  scrollable: "scrollable",
                  size: "size",
                  windowClass: "windowClass",
                  modalDialogClass: "modalDialogClass",
                },
                outputs: { dismissEvent: "dismiss" },
                standalone: !0,
                features: [wn],
                ngContentSelectors: MV,
                decls: 4,
                vars: 2,
                consts: [
                  ["role", "document"],
                  ["dialog", ""],
                  [1, "modal-content"],
                ],
                template: function (i, r) {
                  1 & i &&
                    ((function yy(e) {
                      const n = w()[Ge][gt];
                      if (!n.projection) {
                        const i = (n.projection = ms(e ? e.length : 1, null)),
                          r = i.slice();
                        let o = n.child;
                        for (; null !== o; ) {
                          const s = e ? DO(o, e) : 0;
                          null !== s && (r[s] ? (r[s].projectionNext = o) : (i[s] = o), (r[s] = o)),
                            (o = o.next);
                        }
                      }
                    })(),
                    k(0, "div", 0, 1)(2, "div", 2),
                    (function by(e, n = 0, t) {
                      const i = w(),
                        r = re(),
                        o = fo(r, Q + e, 16, null, t || null);
                      null === o.projection && (o.projection = n),
                        nd(),
                        (!i[ii] || Hr()) &&
                          32 != (32 & o.flags) &&
                          (function yT(e, n, t) {
                            N_(n[J], 0, n, t, Ad(e, t, n), b_(t.parent || n[gt], t, n));
                          })(r, i, o);
                    })(3),
                    L()()),
                    2 & i &&
                      tr(
                        "modal-dialog" +
                          (r.size ? " modal-" + r.size : "") +
                          (r.centered ? " modal-dialog-centered" : "") +
                          r.fullscreenClass +
                          (r.scrollable ? " modal-dialog-scrollable" : "") +
                          (r.modalDialogClass ? " " + r.modalDialogClass : "")
                      );
                },
                styles: [
                  "ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n",
                ],
                encapsulation: 2,
              });
            }
          }
          return e;
        })(),
        t$ = (() => {
          class e {
            constructor(t) {
              this._document = t;
            }
            hide() {
              const t = Math.abs(window.innerWidth - this._document.documentElement.clientWidth),
                i = this._document.body,
                r = i.style,
                { overflow: o, paddingRight: s } = r;
              if (t > 0) {
                const a = parseFloat(window.getComputedStyle(i).paddingRight);
                r.paddingRight = `${a + t}px`;
              }
              return (
                (r.overflow = "hidden"),
                () => {
                  t > 0 && (r.paddingRight = s), (r.overflow = o);
                }
              );
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)(P(Tt));
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
            }
          }
          return e;
        })(),
        n$ = (() => {
          class e {
            constructor(t, i, r, o, s, a, l) {
              (this._applicationRef = t),
                (this._injector = i),
                (this._environmentInjector = r),
                (this._document = o),
                (this._scrollBar = s),
                (this._rendererFactory = a),
                (this._ngZone = l),
                (this._activeWindowCmptHasChanged = new Pe()),
                (this._ariaHiddenValues = new Map()),
                (this._scrollBarRestoreFn = null),
                (this._modalRefs = []),
                (this._windowCmpts = []),
                (this._activeInstances = new j()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const c = this._windowCmpts[this._windowCmpts.length - 1];
                    ((e, n, t, i = !1) => {
                      e.runOutsideAngular(() => {
                        const r = dt(n, "focusin").pipe(
                          We(t),
                          vt((o) => o.target)
                        );
                        dt(n, "keydown")
                          .pipe(
                            We(t),
                            In((o) => o.which === Se.Tab),
                            tp(r)
                          )
                          .subscribe(([o, s]) => {
                            const [a, l] = yw(n);
                            (s === a || s === n) && o.shiftKey && (l.focus(), o.preventDefault()),
                              s === l && !o.shiftKey && (a.focus(), o.preventDefault());
                          }),
                          i &&
                            dt(n, "click")
                              .pipe(
                                We(t),
                                tp(r),
                                vt((o) => o[1])
                              )
                              .subscribe((o) => o.focus());
                      });
                    })(this._ngZone, c.location.nativeElement, this._activeWindowCmptHasChanged),
                      this._revertAriaHidden(),
                      this._setAriaHidden(c.location.nativeElement);
                  }
                });
            }
            _restoreScrollBar() {
              const t = this._scrollBarRestoreFn;
              t && ((this._scrollBarRestoreFn = null), t());
            }
            _hideScrollBar() {
              this._scrollBarRestoreFn || (this._scrollBarRestoreFn = this._scrollBar.hide());
            }
            open(t, i, r) {
              const o =
                  r.container instanceof HTMLElement
                    ? r.container
                    : pr(r.container)
                    ? this._document.querySelector(r.container)
                    : this._document.body,
                s = this._rendererFactory.createRenderer(null, null);
              if (!o)
                throw new Error(
                  `The specified modal container "${
                    r.container || "body"
                  }" was not found in the DOM.`
                );
              this._hideScrollBar();
              const a = new kw(),
                l = (t = r.injector || t).get(on, null) || this._environmentInjector,
                c = this._getContentRef(t, l, i, a, r);
              let u = !1 !== r.backdrop ? this._attachBackdrop(o) : void 0,
                d = this._attachWindowComponent(o, c.nodes),
                f = new Qj(d, c, u, r.beforeDismiss);
              return (
                this._registerModalRef(f),
                this._registerWindowCmpt(d),
                f.hidden.pipe(On(1)).subscribe(() =>
                  Promise.resolve(!0).then(() => {
                    this._modalRefs.length ||
                      (s.removeClass(this._document.body, "modal-open"),
                      this._restoreScrollBar(),
                      this._revertAriaHidden());
                  })
                ),
                (a.close = (h) => {
                  f.close(h);
                }),
                (a.dismiss = (h) => {
                  f.dismiss(h);
                }),
                (a.update = (h) => {
                  f.update(h);
                }),
                f.update(r),
                1 === this._modalRefs.length && s.addClass(this._document.body, "modal-open"),
                u && u.instance && u.changeDetectorRef.detectChanges(),
                d.changeDetectorRef.detectChanges(),
                f
              );
            }
            get activeInstances() {
              return this._activeInstances;
            }
            dismissAll(t) {
              this._modalRefs.forEach((i) => i.dismiss(t));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(t) {
              let i = Eh(Yj, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
              });
              return (
                this._applicationRef.attachView(i.hostView),
                t.appendChild(i.location.nativeElement),
                i
              );
            }
            _attachWindowComponent(t, i) {
              let r = Eh(e$, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
                projectableNodes: i,
              });
              return (
                this._applicationRef.attachView(r.hostView),
                t.appendChild(r.location.nativeElement),
                r
              );
            }
            _getContentRef(t, i, r, o, s) {
              return r
                ? r instanceof ke
                  ? this._createFromTemplateRef(r, o)
                  : hr(r)
                  ? this._createFromString(r)
                  : this._createFromComponent(t, i, r, o, s)
                : new yr([]);
            }
            _createFromTemplateRef(t, i) {
              const o = t.createEmbeddedView({
                $implicit: i,
                close(s) {
                  i.close(s);
                },
                dismiss(s) {
                  i.dismiss(s);
                },
              });
              return this._applicationRef.attachView(o), new yr([o.rootNodes], o);
            }
            _createFromString(t) {
              const i = this._document.createTextNode(`${t}`);
              return new yr([[i]]);
            }
            _createFromComponent(t, i, r, o, s) {
              const l = Eh(r, {
                  environmentInjector: i,
                  elementInjector: Ct.create({
                    providers: [{ provide: kw, useValue: o }],
                    parent: t,
                  }),
                }),
                c = l.location.nativeElement;
              return (
                s.scrollable && c.classList.add("component-host-scrollable"),
                this._applicationRef.attachView(l.hostView),
                new yr([[c]], l.hostView, l)
              );
            }
            _setAriaHidden(t) {
              const i = t.parentElement;
              i &&
                t !== this._document.body &&
                (Array.from(i.children).forEach((r) => {
                  r !== t &&
                    "SCRIPT" !== r.nodeName &&
                    (this._ariaHiddenValues.set(r, r.getAttribute("aria-hidden")),
                    r.setAttribute("aria-hidden", "true"));
                }),
                this._setAriaHidden(i));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((t, i) => {
                t ? i.setAttribute("aria-hidden", t) : i.removeAttribute("aria-hidden");
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(t) {
              const i = () => {
                const r = this._modalRefs.indexOf(t);
                r > -1 &&
                  (this._modalRefs.splice(r, 1), this._activeInstances.emit(this._modalRefs));
              };
              this._modalRefs.push(t),
                this._activeInstances.emit(this._modalRefs),
                t.result.then(i, i);
            }
            _registerWindowCmpt(t) {
              this._windowCmpts.push(t),
                this._activeWindowCmptHasChanged.next(),
                t.onDestroy(() => {
                  const i = this._windowCmpts.indexOf(t);
                  i > -1 &&
                    (this._windowCmpts.splice(i, 1), this._activeWindowCmptHasChanged.next());
                });
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)(P(or), P(Ct), P(on), P(Tt), P(t$), P(lf), P(ue));
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
            }
          }
          return e;
        })(),
        i$ = (() => {
          class e {
            constructor(t) {
              (this._ngbConfig = t),
                (this.backdrop = !0),
                (this.fullscreen = !1),
                (this.keyboard = !0);
            }
            get animation() {
              return void 0 === this._animation ? this._ngbConfig.animation : this._animation;
            }
            set animation(t) {
              this._animation = t;
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)(P(zc));
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
            }
          }
          return e;
        })(),
        r$ = (() => {
          class e {
            constructor(t, i, r) {
              (this._injector = t), (this._modalStack = i), (this._config = r);
            }
            open(t, i = {}) {
              const r = { ...this._config, animation: this._config.animation, ...i };
              return this._modalStack.open(this._injector, t, r);
            }
            get activeInstances() {
              return this._modalStack.activeInstances;
            }
            dismissAll(t) {
              this._modalStack.dismissAll(t);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
            static {
              this.ɵfac = function (i) {
                return new (i || e)(P(Ct), P(n$), P(i$));
              };
            }
            static {
              this.ɵprov = V({ token: e, factory: e.ɵfac, providedIn: "root" });
            }
          }
          return e;
        })(),
        Lw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({ providers: [r$] });
            }
          }
          return e;
        })(),
        Hw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Kw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Jw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Yw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Zw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Xw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        Qw = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        eC = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        tC = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })();
      new F("live announcer delay", {
        providedIn: "root",
        factory: function y$() {
          return 100;
        },
      });
      let nC = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })(),
        iC = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({});
            }
          }
          return e;
        })();
      const D$ = [sw, aw, uw, dw, Rw, Fw, Lw, Hw, iC, Kw, Jw, Yw, Zw, Xw, Qw, eC, tC, nC];
      let E$ = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e });
            }
            static {
              this.ɵinj = we({
                imports: [
                  D$,
                  sw,
                  aw,
                  uw,
                  dw,
                  Rw,
                  Fw,
                  Lw,
                  Hw,
                  iC,
                  Kw,
                  Jw,
                  Yw,
                  Zw,
                  Xw,
                  Qw,
                  eC,
                  tC,
                  nC,
                ],
              });
            }
          }
          return e;
        })(),
        w$ = (() => {
          class e {
            static {
              this.ɵfac = function (i) {
                return new (i || e)();
              };
            }
            static {
              this.ɵmod = Te({ type: e, bootstrap: [TL] });
            }
            static {
              this.ɵinj = we({ imports: [$k, E$, yL] });
            }
          }
          return e;
        })();
      Hk()
        .bootstrapModule(w$)
        .catch((e) => console.error(e));
    },
    73: () => {
      const ee = ":";
      Error;
      const qo = function (b, ..._) {
          if (qo.translate) {
            const C = qo.translate(b, _);
            (b = C[0]), (_ = C[1]);
          }
          let E = Pa(b[0], b.raw[0]);
          for (let C = 1; C < b.length; C++) E += _[C - 1] + Pa(b[C], b.raw[C]);
          return E;
        },
        Du = ":";
      function Pa(b, _) {
        return _.charAt(0) === Du
          ? b.substring(
              (function Aa(b, _) {
                for (let E = 1, C = 1; E < b.length; E++, C++)
                  if ("\\" === _[C]) C++;
                  else if (b[E] === ee) return E;
                throw new Error(`Unterminated $localize metadata block in "${_}".`);
              })(b, _) + 1
            )
          : b;
      }
      globalThis.$localize = qo;
    },
  },
  (ee) => {
    var Vi = (gi) => ee((ee.s = gi));
    Vi(73), Vi(49);
  },
]);