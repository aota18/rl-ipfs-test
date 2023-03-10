// Three.js r44dev - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!window.Int32Array)
  (window.Int32Array = Array), (window.Float32Array = Array);
THREE.Color = function (b) {
  b !== void 0 && this.setHex(b);
  return this;
};
THREE.Color.prototype = {
  constructor: THREE.Color,
  r: 1,
  g: 1,
  b: 1,
  copy: function (b) {
    this.r = b.r;
    this.g = b.g;
    this.b = b.b;
    return this;
  },
  setRGB: function (b, c, e) {
    this.r = b;
    this.g = c;
    this.b = e;
    return this;
  },
  setHSV: function (b, c, e) {
    var f, g, j;
    if (e == 0) this.r = this.g = this.b = 0;
    else
      switch (
        ((f = Math.floor(b * 6)),
        (g = b * 6 - f),
        (b = e * (1 - c)),
        (j = e * (1 - c * g)),
        (c = e * (1 - c * (1 - g))),
        f)
      ) {
        case 1:
          this.r = j;
          this.g = e;
          this.b = b;
          break;
        case 2:
          this.r = b;
          this.g = e;
          this.b = c;
          break;
        case 3:
          this.r = b;
          this.g = j;
          this.b = e;
          break;
        case 4:
          this.r = c;
          this.g = b;
          this.b = e;
          break;
        case 5:
          this.r = e;
          this.g = b;
          this.b = j;
          break;
        case 6:
        case 0:
          (this.r = e), (this.g = c), (this.b = b);
      }
    return this;
  },
  setHex: function (b) {
    b = Math.floor(b);
    this.r = ((b >> 16) & 255) / 255;
    this.g = ((b >> 8) & 255) / 255;
    this.b = (b & 255) / 255;
    return this;
  },
  getHex: function () {
    return (
      (~~(this.r * 255) << 16) ^ (~~(this.g * 255) << 8) ^ ~~(this.b * 255)
    );
  },
  getContextStyle: function () {
    return (
      "rgb(" +
      Math.floor(this.r * 255) +
      "," +
      Math.floor(this.g * 255) +
      "," +
      Math.floor(this.b * 255) +
      ")"
    );
  },
  clone: function () {
    return new THREE.Color().setRGB(this.r, this.g, this.b);
  },
};
THREE.Vector2 = function (b, c) {
  this.x = b || 0;
  this.y = c || 0;
};
THREE.Vector2.prototype = {
  constructor: THREE.Vector2,
  set: function (b, c) {
    this.x = b;
    this.y = c;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    return this;
  },
  clone: function () {
    return new THREE.Vector2(this.x, this.y);
  },
  add: function (b, c) {
    this.x = b.x + c.x;
    this.y = b.y + c.y;
    return this;
  },
  addSelf: function (b) {
    this.x += b.x;
    this.y += b.y;
    return this;
  },
  sub: function (b, c) {
    this.x = b.x - c.x;
    this.y = b.y - c.y;
    return this;
  },
  subSelf: function (b) {
    this.x -= b.x;
    this.y -= b.y;
    return this;
  },
  multiplyScalar: function (b) {
    this.x *= b;
    this.y *= b;
    return this;
  },
  divideScalar: function (b) {
    b ? ((this.x /= b), (this.y /= b)) : this.set(0, 0);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (b) {
    return this.x * b.x + this.y * b.y;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  distanceTo: function (b) {
    return Math.sqrt(this.distanceToSquared(b));
  },
  distanceToSquared: function (b) {
    var c = this.x - b.x,
      b = this.y - b.y;
    return c * c + b * b;
  },
  setLength: function (b) {
    return this.normalize().multiplyScalar(b);
  },
  equals: function (b) {
    return b.x == this.x && b.y == this.y;
  },
};
THREE.Vector3 = function (b, c, e) {
  this.x = b || 0;
  this.y = c || 0;
  this.z = e || 0;
};
THREE.Vector3.prototype = {
  constructor: THREE.Vector3,
  set: function (b, c, e) {
    this.x = b;
    this.y = c;
    this.z = e;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    this.z = b.z;
    return this;
  },
  clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z);
  },
  add: function (b, c) {
    this.x = b.x + c.x;
    this.y = b.y + c.y;
    this.z = b.z + c.z;
    return this;
  },
  addSelf: function (b) {
    this.x += b.x;
    this.y += b.y;
    this.z += b.z;
    return this;
  },
  addScalar: function (b) {
    this.x += b;
    this.y += b;
    this.z += b;
    return this;
  },
  sub: function (b, c) {
    this.x = b.x - c.x;
    this.y = b.y - c.y;
    this.z = b.z - c.z;
    return this;
  },
  subSelf: function (b) {
    this.x -= b.x;
    this.y -= b.y;
    this.z -= b.z;
    return this;
  },
  multiply: function (b, c) {
    this.x = b.x * c.x;
    this.y = b.y * c.y;
    this.z = b.z * c.z;
    return this;
  },
  multiplySelf: function (b) {
    this.x *= b.x;
    this.y *= b.y;
    this.z *= b.z;
    return this;
  },
  multiplyScalar: function (b) {
    this.x *= b;
    this.y *= b;
    this.z *= b;
    return this;
  },
  divideSelf: function (b) {
    this.x /= b.x;
    this.y /= b.y;
    this.z /= b.z;
    return this;
  },
  divideScalar: function (b) {
    b ? ((this.x /= b), (this.y /= b), (this.z /= b)) : this.set(0, 0, 0);
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (b) {
    return this.x * b.x + this.y * b.y + this.z * b.z;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  lengthManhattan: function () {
    return this.x + this.y + this.z;
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  setLength: function (b) {
    return this.normalize().multiplyScalar(b);
  },
  cross: function (b, c) {
    this.x = b.y * c.z - b.z * c.y;
    this.y = b.z * c.x - b.x * c.z;
    this.z = b.x * c.y - b.y * c.x;
    return this;
  },
  crossSelf: function (b) {
    return this.set(
      this.y * b.z - this.z * b.y,
      this.z * b.x - this.x * b.z,
      this.x * b.y - this.y * b.x
    );
  },
  distanceTo: function (b) {
    return Math.sqrt(this.distanceToSquared(b));
  },
  distanceToSquared: function (b) {
    return new THREE.Vector3().sub(this, b).lengthSq();
  },
  setPositionFromMatrix: function (b) {
    this.x = b.n14;
    this.y = b.n24;
    this.z = b.n34;
  },
  setRotationFromMatrix: function (b) {
    var c = Math.cos(this.y);
    this.y = Math.asin(b.n13);
    Math.abs(c) > 1.0e-5
      ? ((this.x = Math.atan2(-b.n23 / c, b.n33 / c)),
        (this.z = Math.atan2(-b.n12 / c, b.n11 / c)))
      : ((this.x = 0), (this.z = Math.atan2(b.n21, b.n22)));
  },
  isZero: function () {
    return this.lengthSq() < 1.0e-4;
  },
};
THREE.Vector4 = function (b, c, e, f) {
  this.x = b || 0;
  this.y = c || 0;
  this.z = e || 0;
  this.w = f || 1;
};
THREE.Vector4.prototype = {
  constructor: THREE.Vector4,
  set: function (b, c, e, f) {
    this.x = b;
    this.y = c;
    this.z = e;
    this.w = f;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    this.z = b.z;
    this.w = b.w || 1;
  },
  clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w);
  },
  add: function (b, c) {
    this.x = b.x + c.x;
    this.y = b.y + c.y;
    this.z = b.z + c.z;
    this.w = b.w + c.w;
    return this;
  },
  addSelf: function (b) {
    this.x += b.x;
    this.y += b.y;
    this.z += b.z;
    this.w += b.w;
    return this;
  },
  sub: function (b, c) {
    this.x = b.x - c.x;
    this.y = b.y - c.y;
    this.z = b.z - c.z;
    this.w = b.w - c.w;
    return this;
  },
  subSelf: function (b) {
    this.x -= b.x;
    this.y -= b.y;
    this.z -= b.z;
    this.w -= b.w;
    return this;
  },
  multiplyScalar: function (b) {
    this.x *= b;
    this.y *= b;
    this.z *= b;
    this.w *= b;
    return this;
  },
  divideScalar: function (b) {
    b
      ? ((this.x /= b), (this.y /= b), (this.z /= b), (this.w /= b))
      : ((this.z = this.y = this.x = 0), (this.w = 1));
    return this;
  },
  negate: function () {
    return this.multiplyScalar(-1);
  },
  dot: function (b) {
    return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
  },
  lengthSq: function () {
    return this.dot(this);
  },
  length: function () {
    return Math.sqrt(this.lengthSq());
  },
  normalize: function () {
    return this.divideScalar(this.length());
  },
  setLength: function (b) {
    return this.normalize().multiplyScalar(b);
  },
  lerpSelf: function (b, c) {
    this.x += (b.x - this.x) * c;
    this.y += (b.y - this.y) * c;
    this.z += (b.z - this.z) * c;
    this.w += (b.w - this.w) * c;
    return this;
  },
};
THREE.Ray = function (b, c) {
  this.origin = b || new THREE.Vector3();
  this.direction = c || new THREE.Vector3();
};
THREE.Ray.prototype = {
  constructor: THREE.Ray,
  intersectScene: function (b) {
    return this.intersectObjects(b.objects);
  },
  intersectObjects: function (b) {
    var c,
      e,
      f = [];
    c = 0;
    for (e = b.length; c < e; c++) f = f.concat(this.intersectObject(b[c]));
    f.sort(function (b, c) {
      return b.distance - c.distance;
    });
    return f;
  },
  intersectObject: function (b) {
    function c(b, c, e) {
      var f;
      f = e.clone().subSelf(b).dot(c);
      if (f <= 0) return null;
      b = b.clone().addSelf(c.clone().multiplyScalar(f));
      return e.distanceTo(b);
    }
    function e(b, c, e, f) {
      var f = f.clone().subSelf(c),
        e = e.clone().subSelf(c),
        g = b.clone().subSelf(c),
        b = f.dot(f),
        c = f.dot(e),
        f = f.dot(g),
        h = e.dot(e),
        e = e.dot(g),
        g = 1 / (b * h - c * c),
        h = (h * f - c * e) * g,
        b = (b * e - c * f) * g;
      return h > 0 && b > 0 && h + b < 1;
    }
    if (b instanceof THREE.Particle) {
      var f = c(this.origin, this.direction, b.matrixWorld.getPosition());
      if (f == null || f > b.scale.x) return [];
      return [{ distance: f, point: b.position, face: null, object: b }];
    } else if (b instanceof THREE.Mesh) {
      f = c(this.origin, this.direction, b.matrixWorld.getPosition());
      if (
        f == null ||
        f >
          b.geometry.boundingSphere.radius *
            Math.max(b.scale.x, Math.max(b.scale.y, b.scale.z))
      )
        return [];
      var g,
        j,
        h,
        k,
        m,
        o,
        p,
        u,
        v,
        t,
        x = b.geometry,
        w = x.vertices,
        A = [],
        f = 0;
      for (g = x.faces.length; f < g; f++)
        if (
          ((j = x.faces[f]),
          (v = this.origin.clone()),
          (t = this.direction.clone()),
          (o = b.matrixWorld),
          (h = o.multiplyVector3(j.centroid.clone()).subSelf(v)),
          (u = h.dot(t)),
          !(u <= 0) &&
            ((h = o.multiplyVector3(w[j.a].position.clone())),
            (k = o.multiplyVector3(w[j.b].position.clone())),
            (m = o.multiplyVector3(w[j.c].position.clone())),
            (o =
              j instanceof THREE.Face4
                ? o.multiplyVector3(w[j.d].position.clone())
                : null),
            (p = b.matrixRotationWorld.multiplyVector3(j.normal.clone())),
            (u = t.dot(p)),
            b.doubleSided || (b.flipSided ? u > 0 : u < 0)))
        )
          if (
            ((u = p.dot(new THREE.Vector3().sub(h, v)) / u),
            (v = v.addSelf(t.multiplyScalar(u))),
            j instanceof THREE.Face3)
          )
            e(v, h, k, m) &&
              ((j = {
                distance: this.origin.distanceTo(v),
                point: v,
                face: j,
                object: b,
              }),
              A.push(j));
          else if (j instanceof THREE.Face4 && (e(v, h, k, o) || e(v, k, m, o)))
            (j = {
              distance: this.origin.distanceTo(v),
              point: v,
              face: j,
              object: b,
            }),
              A.push(j);
      A.sort(function (b, c) {
        return b.distance - c.distance;
      });
      return A;
    } else return [];
  },
};
THREE.Rectangle = function () {
  function b() {
    j = f - c;
    h = g - e;
  }
  var c,
    e,
    f,
    g,
    j,
    h,
    k = !0;
  this.getX = function () {
    return c;
  };
  this.getY = function () {
    return e;
  };
  this.getWidth = function () {
    return j;
  };
  this.getHeight = function () {
    return h;
  };
  this.getLeft = function () {
    return c;
  };
  this.getTop = function () {
    return e;
  };
  this.getRight = function () {
    return f;
  };
  this.getBottom = function () {
    return g;
  };
  this.set = function (h, j, p, u) {
    k = !1;
    c = h;
    e = j;
    f = p;
    g = u;
    b();
  };
  this.addPoint = function (h, j) {
    k
      ? ((k = !1), (c = h), (e = j), (f = h), (g = j))
      : ((c = c < h ? c : h),
        (e = e < j ? e : j),
        (f = f > h ? f : h),
        (g = g > j ? g : j));
    b();
  };
  this.add3Points = function (h, j, p, u, v, t) {
    k
      ? ((k = !1),
        (c = h < p ? (h < v ? h : v) : p < v ? p : v),
        (e = j < u ? (j < t ? j : t) : u < t ? u : t),
        (f = h > p ? (h > v ? h : v) : p > v ? p : v),
        (g = j > u ? (j > t ? j : t) : u > t ? u : t))
      : ((c =
          h < p
            ? h < v
              ? h < c
                ? h
                : c
              : v < c
              ? v
              : c
            : p < v
            ? p < c
              ? p
              : c
            : v < c
            ? v
            : c),
        (e =
          j < u
            ? j < t
              ? j < e
                ? j
                : e
              : t < e
              ? t
              : e
            : u < t
            ? u < e
              ? u
              : e
            : t < e
            ? t
            : e),
        (f =
          h > p
            ? h > v
              ? h > f
                ? h
                : f
              : v > f
              ? v
              : f
            : p > v
            ? p > f
              ? p
              : f
            : v > f
            ? v
            : f),
        (g =
          j > u
            ? j > t
              ? j > g
                ? j
                : g
              : t > g
              ? t
              : g
            : u > t
            ? u > g
              ? u
              : g
            : t > g
            ? t
            : g));
    b();
  };
  this.addRectangle = function (h) {
    k
      ? ((k = !1),
        (c = h.getLeft()),
        (e = h.getTop()),
        (f = h.getRight()),
        (g = h.getBottom()))
      : ((c = c < h.getLeft() ? c : h.getLeft()),
        (e = e < h.getTop() ? e : h.getTop()),
        (f = f > h.getRight() ? f : h.getRight()),
        (g = g > h.getBottom() ? g : h.getBottom()));
    b();
  };
  this.inflate = function (h) {
    c -= h;
    e -= h;
    f += h;
    g += h;
    b();
  };
  this.minSelf = function (h) {
    c = c > h.getLeft() ? c : h.getLeft();
    e = e > h.getTop() ? e : h.getTop();
    f = f < h.getRight() ? f : h.getRight();
    g = g < h.getBottom() ? g : h.getBottom();
    b();
  };
  this.instersects = function (b) {
    return (
      Math.min(f, b.getRight()) - Math.max(c, b.getLeft()) >= 0 &&
      Math.min(g, b.getBottom()) - Math.max(e, b.getTop()) >= 0
    );
  };
  this.empty = function () {
    k = !0;
    g = f = e = c = 0;
    b();
  };
  this.isEmpty = function () {
    return k;
  };
};
THREE.Matrix3 = function () {
  this.m = [];
};
THREE.Matrix3.prototype = {
  constructor: THREE.Matrix3,
  transpose: function () {
    var b,
      c = this.m;
    b = c[1];
    c[1] = c[3];
    c[3] = b;
    b = c[2];
    c[2] = c[6];
    c[6] = b;
    b = c[5];
    c[5] = c[7];
    c[7] = b;
    return this;
  },
  transposeIntoArray: function (b) {
    var c = this.m;
    b[0] = c[0];
    b[1] = c[3];
    b[2] = c[6];
    b[3] = c[1];
    b[4] = c[4];
    b[5] = c[7];
    b[6] = c[2];
    b[7] = c[5];
    b[8] = c[8];
    return this;
  },
};
THREE.Matrix4 = function (b, c, e, f, g, j, h, k, m, o, p, u, v, t, x, w) {
  this.set(
    b || 1,
    c || 0,
    e || 0,
    f || 0,
    g || 0,
    j || 1,
    h || 0,
    k || 0,
    m || 0,
    o || 0,
    p || 1,
    u || 0,
    v || 0,
    t || 0,
    x || 0,
    w || 1
  );
  this.flat = Array(16);
  this.m33 = new THREE.Matrix3();
};
THREE.Matrix4.prototype = {
  constructor: THREE.Matrix4,
  set: function (b, c, e, f, g, j, h, k, m, o, p, u, v, t, x, w) {
    this.n11 = b;
    this.n12 = c;
    this.n13 = e;
    this.n14 = f;
    this.n21 = g;
    this.n22 = j;
    this.n23 = h;
    this.n24 = k;
    this.n31 = m;
    this.n32 = o;
    this.n33 = p;
    this.n34 = u;
    this.n41 = v;
    this.n42 = t;
    this.n43 = x;
    this.n44 = w;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function (b) {
    this.set(
      b.n11,
      b.n12,
      b.n13,
      b.n14,
      b.n21,
      b.n22,
      b.n23,
      b.n24,
      b.n31,
      b.n32,
      b.n33,
      b.n34,
      b.n41,
      b.n42,
      b.n43,
      b.n44
    );
    return this;
  },
  lookAt: function (b, c, e) {
    var f = THREE.Matrix4.__v1,
      g = THREE.Matrix4.__v2,
      j = THREE.Matrix4.__v3;
    j.sub(b, c).normalize();
    if (j.length() === 0) j.z = 1;
    f.cross(e, j).normalize();
    f.length() === 0 && ((j.x += 1.0e-4), f.cross(e, j).normalize());
    g.cross(j, f).normalize();
    this.n11 = f.x;
    this.n12 = g.x;
    this.n13 = j.x;
    this.n21 = f.y;
    this.n22 = g.y;
    this.n23 = j.y;
    this.n31 = f.z;
    this.n32 = g.z;
    this.n33 = j.z;
    return this;
  },
  multiplyVector3: function (b) {
    var c = b.x,
      e = b.y,
      f = b.z,
      g = 1 / (this.n41 * c + this.n42 * e + this.n43 * f + this.n44);
    b.x = (this.n11 * c + this.n12 * e + this.n13 * f + this.n14) * g;
    b.y = (this.n21 * c + this.n22 * e + this.n23 * f + this.n24) * g;
    b.z = (this.n31 * c + this.n32 * e + this.n33 * f + this.n34) * g;
    return b;
  },
  multiplyVector4: function (b) {
    var c = b.x,
      e = b.y,
      f = b.z,
      g = b.w;
    b.x = this.n11 * c + this.n12 * e + this.n13 * f + this.n14 * g;
    b.y = this.n21 * c + this.n22 * e + this.n23 * f + this.n24 * g;
    b.z = this.n31 * c + this.n32 * e + this.n33 * f + this.n34 * g;
    b.w = this.n41 * c + this.n42 * e + this.n43 * f + this.n44 * g;
    return b;
  },
  rotateAxis: function (b) {
    var c = b.x,
      e = b.y,
      f = b.z;
    b.x = c * this.n11 + e * this.n12 + f * this.n13;
    b.y = c * this.n21 + e * this.n22 + f * this.n23;
    b.z = c * this.n31 + e * this.n32 + f * this.n33;
    b.normalize();
    return b;
  },
  crossVector: function (b) {
    var c = new THREE.Vector4();
    c.x = this.n11 * b.x + this.n12 * b.y + this.n13 * b.z + this.n14 * b.w;
    c.y = this.n21 * b.x + this.n22 * b.y + this.n23 * b.z + this.n24 * b.w;
    c.z = this.n31 * b.x + this.n32 * b.y + this.n33 * b.z + this.n34 * b.w;
    c.w = b.w
      ? this.n41 * b.x + this.n42 * b.y + this.n43 * b.z + this.n44 * b.w
      : 1;
    return c;
  },
  multiply: function (b, c) {
    var e = b.n11,
      f = b.n12,
      g = b.n13,
      j = b.n14,
      h = b.n21,
      k = b.n22,
      m = b.n23,
      o = b.n24,
      p = b.n31,
      u = b.n32,
      v = b.n33,
      t = b.n34,
      x = b.n41,
      w = b.n42,
      A = b.n43,
      y = b.n44,
      G = c.n11,
      D = c.n12,
      I = c.n13,
      J = c.n14,
      C = c.n21,
      B = c.n22,
      L = c.n23,
      E = c.n24,
      V = c.n31,
      H = c.n32,
      S = c.n33,
      K = c.n34,
      Q = c.n41,
      n = c.n42,
      T = c.n43,
      X = c.n44;
    this.n11 = e * G + f * C + g * V + j * Q;
    this.n12 = e * D + f * B + g * H + j * n;
    this.n13 = e * I + f * L + g * S + j * T;
    this.n14 = e * J + f * E + g * K + j * X;
    this.n21 = h * G + k * C + m * V + o * Q;
    this.n22 = h * D + k * B + m * H + o * n;
    this.n23 = h * I + k * L + m * S + o * T;
    this.n24 = h * J + k * E + m * K + o * X;
    this.n31 = p * G + u * C + v * V + t * Q;
    this.n32 = p * D + u * B + v * H + t * n;
    this.n33 = p * I + u * L + v * S + t * T;
    this.n34 = p * J + u * E + v * K + t * X;
    this.n41 = x * G + w * C + A * V + y * Q;
    this.n42 = x * D + w * B + A * H + y * n;
    this.n43 = x * I + w * L + A * S + y * T;
    this.n44 = x * J + w * E + A * K + y * X;
    return this;
  },
  multiplyToArray: function (b, c, e) {
    this.multiply(b, c);
    e[0] = this.n11;
    e[1] = this.n21;
    e[2] = this.n31;
    e[3] = this.n41;
    e[4] = this.n12;
    e[5] = this.n22;
    e[6] = this.n32;
    e[7] = this.n42;
    e[8] = this.n13;
    e[9] = this.n23;
    e[10] = this.n33;
    e[11] = this.n43;
    e[12] = this.n14;
    e[13] = this.n24;
    e[14] = this.n34;
    e[15] = this.n44;
    return this;
  },
  multiplySelf: function (b) {
    this.multiply(this, b);
    return this;
  },
  multiplyScalar: function (b) {
    this.n11 *= b;
    this.n12 *= b;
    this.n13 *= b;
    this.n14 *= b;
    this.n21 *= b;
    this.n22 *= b;
    this.n23 *= b;
    this.n24 *= b;
    this.n31 *= b;
    this.n32 *= b;
    this.n33 *= b;
    this.n34 *= b;
    this.n41 *= b;
    this.n42 *= b;
    this.n43 *= b;
    this.n44 *= b;
    return this;
  },
  determinant: function () {
    var b = this.n11,
      c = this.n12,
      e = this.n13,
      f = this.n14,
      g = this.n21,
      j = this.n22,
      h = this.n23,
      k = this.n24,
      m = this.n31,
      o = this.n32,
      p = this.n33,
      u = this.n34,
      v = this.n41,
      t = this.n42,
      x = this.n43,
      w = this.n44;
    return (
      f * h * o * v -
      e * k * o * v -
      f * j * p * v +
      c * k * p * v +
      e * j * u * v -
      c * h * u * v -
      f * h * m * t +
      e * k * m * t +
      f * g * p * t -
      b * k * p * t -
      e * g * u * t +
      b * h * u * t +
      f * j * m * x -
      c * k * m * x -
      f * g * o * x +
      b * k * o * x +
      c * g * u * x -
      b * j * u * x -
      e * j * m * w +
      c * h * m * w +
      e * g * o * w -
      b * h * o * w -
      c * g * p * w +
      b * j * p * w
    );
  },
  transpose: function () {
    var b;
    b = this.n21;
    this.n21 = this.n12;
    this.n12 = b;
    b = this.n31;
    this.n31 = this.n13;
    this.n13 = b;
    b = this.n32;
    this.n32 = this.n23;
    this.n23 = b;
    b = this.n41;
    this.n41 = this.n14;
    this.n14 = b;
    b = this.n42;
    this.n42 = this.n24;
    this.n24 = b;
    b = this.n43;
    this.n43 = this.n34;
    this.n43 = b;
    return this;
  },
  clone: function () {
    var b = new THREE.Matrix4();
    b.n11 = this.n11;
    b.n12 = this.n12;
    b.n13 = this.n13;
    b.n14 = this.n14;
    b.n21 = this.n21;
    b.n22 = this.n22;
    b.n23 = this.n23;
    b.n24 = this.n24;
    b.n31 = this.n31;
    b.n32 = this.n32;
    b.n33 = this.n33;
    b.n34 = this.n34;
    b.n41 = this.n41;
    b.n42 = this.n42;
    b.n43 = this.n43;
    b.n44 = this.n44;
    return b;
  },
  flatten: function () {
    this.flat[0] = this.n11;
    this.flat[1] = this.n21;
    this.flat[2] = this.n31;
    this.flat[3] = this.n41;
    this.flat[4] = this.n12;
    this.flat[5] = this.n22;
    this.flat[6] = this.n32;
    this.flat[7] = this.n42;
    this.flat[8] = this.n13;
    this.flat[9] = this.n23;
    this.flat[10] = this.n33;
    this.flat[11] = this.n43;
    this.flat[12] = this.n14;
    this.flat[13] = this.n24;
    this.flat[14] = this.n34;
    this.flat[15] = this.n44;
    return this.flat;
  },
  flattenToArray: function (b) {
    b[0] = this.n11;
    b[1] = this.n21;
    b[2] = this.n31;
    b[3] = this.n41;
    b[4] = this.n12;
    b[5] = this.n22;
    b[6] = this.n32;
    b[7] = this.n42;
    b[8] = this.n13;
    b[9] = this.n23;
    b[10] = this.n33;
    b[11] = this.n43;
    b[12] = this.n14;
    b[13] = this.n24;
    b[14] = this.n34;
    b[15] = this.n44;
    return b;
  },
  flattenToArrayOffset: function (b, c) {
    b[c] = this.n11;
    b[c + 1] = this.n21;
    b[c + 2] = this.n31;
    b[c + 3] = this.n41;
    b[c + 4] = this.n12;
    b[c + 5] = this.n22;
    b[c + 6] = this.n32;
    b[c + 7] = this.n42;
    b[c + 8] = this.n13;
    b[c + 9] = this.n23;
    b[c + 10] = this.n33;
    b[c + 11] = this.n43;
    b[c + 12] = this.n14;
    b[c + 13] = this.n24;
    b[c + 14] = this.n34;
    b[c + 15] = this.n44;
    return b;
  },
  setTranslation: function (b, c, e) {
    this.set(1, 0, 0, b, 0, 1, 0, c, 0, 0, 1, e, 0, 0, 0, 1);
    return this;
  },
  setScale: function (b, c, e) {
    this.set(b, 0, 0, 0, 0, c, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationX: function (b) {
    var c = Math.cos(b),
      b = Math.sin(b);
    this.set(1, 0, 0, 0, 0, c, -b, 0, 0, b, c, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationY: function (b) {
    var c = Math.cos(b),
      b = Math.sin(b);
    this.set(c, 0, b, 0, 0, 1, 0, 0, -b, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationZ: function (b) {
    var c = Math.cos(b),
      b = Math.sin(b);
    this.set(c, -b, 0, 0, b, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  setRotationAxis: function (b, c) {
    var e = Math.cos(c),
      f = Math.sin(c),
      g = 1 - e,
      j = b.x,
      h = b.y,
      k = b.z,
      m = g * j,
      o = g * h;
    this.set(
      m * j + e,
      m * h - f * k,
      m * k + f * h,
      0,
      m * h + f * k,
      o * h + e,
      o * k - f * j,
      0,
      m * k - f * h,
      o * k + f * j,
      g * k * k + e,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  },
  setPosition: function (b) {
    this.n14 = b.x;
    this.n24 = b.y;
    this.n34 = b.z;
    return this;
  },
  getPosition: function () {
    if (!this.position) this.position = new THREE.Vector3();
    this.position.set(this.n14, this.n24, this.n34);
    return this.position;
  },
  getColumnX: function () {
    if (!this.columnX) this.columnX = new THREE.Vector3();
    this.columnX.set(this.n11, this.n21, this.n31);
    return this.columnX;
  },
  getColumnY: function () {
    if (!this.columnY) this.columnY = new THREE.Vector3();
    this.columnY.set(this.n12, this.n22, this.n32);
    return this.columnY;
  },
  getColumnZ: function () {
    if (!this.columnZ) this.columnZ = new THREE.Vector3();
    this.columnZ.set(this.n13, this.n23, this.n33);
    return this.columnZ;
  },
  setRotationFromEuler: function (b, c) {
    var e = b.x,
      f = b.y,
      g = b.z,
      j = Math.cos(e),
      e = Math.sin(e),
      h = Math.cos(f),
      f = Math.sin(f),
      k = Math.cos(g),
      g = Math.sin(g);
    switch (c) {
      case "YXZ":
        var m = h * k,
          o = h * g,
          p = f * k,
          u = f * g;
        this.n11 = m + u * e;
        this.n12 = p * e - o;
        this.n13 = j * f;
        this.n21 = j * g;
        this.n22 = j * k;
        this.n23 = -e;
        this.n31 = o * e - p;
        this.n32 = u + m * e;
        this.n33 = j * h;
        break;
      case "ZXY":
        m = h * k;
        o = h * g;
        p = f * k;
        u = f * g;
        this.n11 = m - u * e;
        this.n12 = -j * g;
        this.n13 = p + o * e;
        this.n21 = o + p * e;
        this.n22 = j * k;
        this.n23 = u - m * e;
        this.n31 = -j * f;
        this.n32 = e;
        this.n33 = j * h;
        break;
      case "ZYX":
        m = j * k;
        o = j * g;
        p = e * k;
        u = e * g;
        this.n11 = h * k;
        this.n12 = p * f - o;
        this.n13 = m * f + u;
        this.n21 = h * g;
        this.n22 = u * f + m;
        this.n23 = o * f - p;
        this.n31 = -f;
        this.n32 = e * h;
        this.n33 = j * h;
        break;
      case "YZX":
        m = j * h;
        o = j * f;
        p = e * h;
        u = e * f;
        this.n11 = h * k;
        this.n12 = u - m * g;
        this.n13 = p * g + o;
        this.n21 = g;
        this.n22 = j * k;
        this.n23 = -e * k;
        this.n31 = -f * k;
        this.n32 = o * g + p;
        this.n33 = m - u * g;
        break;
      case "XZY":
        m = j * h;
        o = j * f;
        p = e * h;
        u = e * f;
        this.n11 = h * k;
        this.n12 = -g;
        this.n13 = f * k;
        this.n21 = m * g + u;
        this.n22 = j * k;
        this.n23 = o * g - p;
        this.n31 = p * g - o;
        this.n32 = e * k;
        this.n33 = u * g + m;
        break;
      default:
        (m = j * k),
          (o = j * g),
          (p = e * k),
          (u = e * g),
          (this.n11 = h * k),
          (this.n12 = -h * g),
          (this.n13 = f),
          (this.n21 = o + p * f),
          (this.n22 = m - u * f),
          (this.n23 = -e * h),
          (this.n31 = u - m * f),
          (this.n32 = p + o * f),
          (this.n33 = j * h);
    }
    return this;
  },
  setRotationFromQuaternion: function (b) {
    var c = b.x,
      e = b.y,
      f = b.z,
      g = b.w,
      j = c + c,
      h = e + e,
      k = f + f,
      b = c * j,
      m = c * h;
    c *= k;
    var o = e * h;
    e *= k;
    f *= k;
    j *= g;
    h *= g;
    g *= k;
    this.n11 = 1 - (o + f);
    this.n12 = m - g;
    this.n13 = c + h;
    this.n21 = m + g;
    this.n22 = 1 - (b + f);
    this.n23 = e - j;
    this.n31 = c - h;
    this.n32 = e + j;
    this.n33 = 1 - (b + o);
    return this;
  },
  scale: function (b) {
    var c = b.x,
      e = b.y,
      b = b.z;
    this.n11 *= c;
    this.n12 *= e;
    this.n13 *= b;
    this.n21 *= c;
    this.n22 *= e;
    this.n23 *= b;
    this.n31 *= c;
    this.n32 *= e;
    this.n33 *= b;
    this.n41 *= c;
    this.n42 *= e;
    this.n43 *= b;
    return this;
  },
  compose: function (b, c, e) {
    var f = THREE.Matrix4.__m1,
      g = THREE.Matrix4.__m2;
    f.identity();
    f.setRotationFromQuaternion(c);
    g.setScale(e.x, e.y, e.z);
    this.multiply(f, g);
    this.n14 = b.x;
    this.n24 = b.y;
    this.n34 = b.z;
    return this;
  },
  decompose: function (b, c, e) {
    var f = THREE.Matrix4.__v1,
      g = THREE.Matrix4.__v2,
      j = THREE.Matrix4.__v3;
    f.set(this.n11, this.n21, this.n31);
    g.set(this.n12, this.n22, this.n32);
    j.set(this.n13, this.n23, this.n33);
    b = b instanceof THREE.Vector3 ? b : new THREE.Vector3();
    c = c instanceof THREE.Quaternion ? c : new THREE.Quaternion();
    e = e instanceof THREE.Vector3 ? e : new THREE.Vector3();
    e.x = f.length();
    e.y = g.length();
    e.z = j.length();
    b.x = this.n14;
    b.y = this.n24;
    b.z = this.n34;
    f = THREE.Matrix4.__m1;
    f.copy(this);
    f.n11 /= e.x;
    f.n21 /= e.x;
    f.n31 /= e.x;
    f.n12 /= e.y;
    f.n22 /= e.y;
    f.n32 /= e.y;
    f.n13 /= e.z;
    f.n23 /= e.z;
    f.n33 /= e.z;
    c.setFromRotationMatrix(f);
    return [b, c, e];
  },
  extractPosition: function (b) {
    this.n14 = b.n14;
    this.n24 = b.n24;
    this.n34 = b.n34;
  },
  extractRotation: function (b, c) {
    var e = 1 / c.x,
      f = 1 / c.y,
      g = 1 / c.z;
    this.n11 = b.n11 * e;
    this.n21 = b.n21 * e;
    this.n31 = b.n31 * e;
    this.n12 = b.n12 * f;
    this.n22 = b.n22 * f;
    this.n32 = b.n32 * f;
    this.n13 = b.n13 * g;
    this.n23 = b.n23 * g;
    this.n33 = b.n33 * g;
  },
};
THREE.Matrix4.makeInvert = function (b, c) {
  var e = b.n11,
    f = b.n12,
    g = b.n13,
    j = b.n14,
    h = b.n21,
    k = b.n22,
    m = b.n23,
    o = b.n24,
    p = b.n31,
    u = b.n32,
    v = b.n33,
    t = b.n34,
    x = b.n41,
    w = b.n42,
    A = b.n43,
    y = b.n44;
  c === void 0 && (c = new THREE.Matrix4());
  c.n11 = m * t * w - o * v * w + o * u * A - k * t * A - m * u * y + k * v * y;
  c.n12 = j * v * w - g * t * w - j * u * A + f * t * A + g * u * y - f * v * y;
  c.n13 = g * o * w - j * m * w + j * k * A - f * o * A - g * k * y + f * m * y;
  c.n14 = j * m * u - g * o * u - j * k * v + f * o * v + g * k * t - f * m * t;
  c.n21 = o * v * x - m * t * x - o * p * A + h * t * A + m * p * y - h * v * y;
  c.n22 = g * t * x - j * v * x + j * p * A - e * t * A - g * p * y + e * v * y;
  c.n23 = j * m * x - g * o * x - j * h * A + e * o * A + g * h * y - e * m * y;
  c.n24 = g * o * p - j * m * p + j * h * v - e * o * v - g * h * t + e * m * t;
  c.n31 = k * t * x - o * u * x + o * p * w - h * t * w - k * p * y + h * u * y;
  c.n32 = j * u * x - f * t * x - j * p * w + e * t * w + f * p * y - e * u * y;
  c.n33 = g * o * x - j * k * x + j * h * w - e * o * w - f * h * y + e * k * y;
  c.n34 = j * k * p - f * o * p - j * h * u + e * o * u + f * h * t - e * k * t;
  c.n41 = m * u * x - k * v * x - m * p * w + h * v * w + k * p * A - h * u * A;
  c.n42 = f * v * x - g * u * x + g * p * w - e * v * w - f * p * A + e * u * A;
  c.n43 = g * k * x - f * m * x - g * h * w + e * m * w + f * h * A - e * k * A;
  c.n44 = f * m * p - g * k * p + g * h * u - e * m * u - f * h * v + e * k * v;
  c.multiplyScalar(1 / b.determinant());
  return c;
};
THREE.Matrix4.makeInvert3x3 = function (b) {
  var c = b.m33,
    e = c.m,
    f = b.n33 * b.n22 - b.n32 * b.n23,
    g = -b.n33 * b.n21 + b.n31 * b.n23,
    j = b.n32 * b.n21 - b.n31 * b.n22,
    h = -b.n33 * b.n12 + b.n32 * b.n13,
    k = b.n33 * b.n11 - b.n31 * b.n13,
    m = -b.n32 * b.n11 + b.n31 * b.n12,
    o = b.n23 * b.n12 - b.n22 * b.n13,
    p = -b.n23 * b.n11 + b.n21 * b.n13,
    u = b.n22 * b.n11 - b.n21 * b.n12,
    b = b.n11 * f + b.n21 * h + b.n31 * o;
  b == 0 &&
    console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");
  b = 1 / b;
  e[0] = b * f;
  e[1] = b * g;
  e[2] = b * j;
  e[3] = b * h;
  e[4] = b * k;
  e[5] = b * m;
  e[6] = b * o;
  e[7] = b * p;
  e[8] = b * u;
  return c;
};
THREE.Matrix4.makeFrustum = function (b, c, e, f, g, j) {
  var h;
  h = new THREE.Matrix4();
  h.n11 = (2 * g) / (c - b);
  h.n12 = 0;
  h.n13 = (c + b) / (c - b);
  h.n14 = 0;
  h.n21 = 0;
  h.n22 = (2 * g) / (f - e);
  h.n23 = (f + e) / (f - e);
  h.n24 = 0;
  h.n31 = 0;
  h.n32 = 0;
  h.n33 = -(j + g) / (j - g);
  h.n34 = (-2 * j * g) / (j - g);
  h.n41 = 0;
  h.n42 = 0;
  h.n43 = -1;
  h.n44 = 0;
  return h;
};
THREE.Matrix4.makePerspective = function (b, c, e, f) {
  var g,
    b = e * Math.tan((b * Math.PI) / 360);
  g = -b;
  return THREE.Matrix4.makeFrustum(g * c, b * c, g, b, e, f);
};
THREE.Matrix4.makeOrtho = function (b, c, e, f, g, j) {
  var h, k, m, o;
  h = new THREE.Matrix4();
  k = c - b;
  m = e - f;
  o = j - g;
  h.n11 = 2 / k;
  h.n12 = 0;
  h.n13 = 0;
  h.n14 = -((c + b) / k);
  h.n21 = 0;
  h.n22 = 2 / m;
  h.n23 = 0;
  h.n24 = -((e + f) / m);
  h.n31 = 0;
  h.n32 = 0;
  h.n33 = -2 / o;
  h.n34 = -((j + g) / o);
  h.n41 = 0;
  h.n42 = 0;
  h.n43 = 0;
  h.n44 = 1;
  return h;
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Matrix4.__m1 = new THREE.Matrix4();
THREE.Matrix4.__m2 = new THREE.Matrix4();
THREE.Object3D = function () {
  this.parent = void 0;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3();
  this.rotation = new THREE.Vector3();
  this.eulerOrder = "XYZ";
  this.scale = new THREE.Vector3(1, 1, 1);
  this.flipSided = this.doubleSided = this.dynamic = !1;
  this.renderDepth = null;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4();
  this.matrixWorld = new THREE.Matrix4();
  this.matrixRotationWorld = new THREE.Matrix4();
  this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
  this.quaternion = new THREE.Quaternion();
  this.useQuaternion = !1;
  this.boundRadius = 0;
  this.boundRadiusScale = 1;
  this.visible = !0;
  this.receiveShadow = this.castShadow = !1;
  this._vector = new THREE.Vector3();
  this.name = "";
};
THREE.Object3D.prototype = {
  constructor: THREE.Object3D,
  translate: function (b, c) {
    this.matrix.rotateAxis(c);
    this.position.addSelf(c.multiplyScalar(b));
  },
  translateX: function (b) {
    this.translate(b, this._vector.set(1, 0, 0));
  },
  translateY: function (b) {
    this.translate(b, this._vector.set(0, 1, 0));
  },
  translateZ: function (b) {
    this.translate(b, this._vector.set(0, 0, 1));
  },
  lookAt: function (b) {
    this.matrix.lookAt(b, this.position, this.up);
    this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix);
  },
  addChild: function (b) {
    if (this.children.indexOf(b) === -1) {
      b.parent !== void 0 && b.parent.removeChild(b);
      b.parent = this;
      this.children.push(b);
      for (var c = this; c.parent !== void 0; ) c = c.parent;
      c !== void 0 && c instanceof THREE.Scene && c.addChildRecurse(b);
    }
  },
  removeChild: function (b) {
    var c = this.children.indexOf(b);
    if (c !== -1) (b.parent = void 0), this.children.splice(c, 1);
  },
  getChildByName: function (b, c) {
    var e, f, g;
    e = 0;
    for (f = this.children.length; e < f; e++) {
      g = this.children[e];
      if (g.name === b) return g;
      if (c && ((g = g.getChildByName(b, c)), g !== void 0)) return g;
    }
  },
  updateMatrix: function () {
    this.matrix.setPosition(this.position);
    this.useQuaternion
      ? this.matrix.setRotationFromQuaternion(this.quaternion)
      : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
    if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1)
      this.matrix.scale(this.scale),
        (this.boundRadiusScale = Math.max(
          this.scale.x,
          Math.max(this.scale.y, this.scale.z)
        ));
    this.matrixWorldNeedsUpdate = !0;
  },
  update: function (b, c, e) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || c)
      b
        ? this.matrixWorld.multiply(b, this.matrix)
        : this.matrixWorld.copy(this.matrix),
        this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale),
        (this.matrixWorldNeedsUpdate = !1),
        (c = !0);
    for (var b = 0, f = this.children.length; b < f; b++)
      this.children[b].update(this.matrixWorld, c, e);
  },
};
THREE.Quaternion = function (b, c, e, f) {
  this.set(b || 0, c || 0, e || 0, f !== void 0 ? f : 1);
};
THREE.Quaternion.prototype = {
  constructor: THREE.Quaternion,
  set: function (b, c, e, f) {
    this.x = b;
    this.y = c;
    this.z = e;
    this.w = f;
    return this;
  },
  copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    this.z = b.z;
    this.w = b.w;
    return this;
  },
  setFromEuler: function (b) {
    var c = (0.5 * Math.PI) / 360,
      e = b.x * c,
      f = b.y * c,
      g = b.z * c,
      b = Math.cos(f),
      f = Math.sin(f),
      c = Math.cos(-g),
      g = Math.sin(-g),
      j = Math.cos(e),
      e = Math.sin(e),
      h = b * c,
      k = f * g;
    this.w = h * j - k * e;
    this.x = h * e + k * j;
    this.y = f * c * j + b * g * e;
    this.z = b * g * j - f * c * e;
    return this;
  },
  setFromAxisAngle: function (b, c) {
    var e = c / 2,
      f = Math.sin(e);
    this.x = b.x * f;
    this.y = b.y * f;
    this.z = b.z * f;
    this.w = Math.cos(e);
    return this;
  },
  setFromRotationMatrix: function (b) {
    var c = Math.pow(b.determinant(), 1 / 3);
    this.w = Math.sqrt(Math.max(0, c + b.n11 + b.n22 + b.n33)) / 2;
    this.x = Math.sqrt(Math.max(0, c + b.n11 - b.n22 - b.n33)) / 2;
    this.y = Math.sqrt(Math.max(0, c - b.n11 + b.n22 - b.n33)) / 2;
    this.z = Math.sqrt(Math.max(0, c - b.n11 - b.n22 + b.n33)) / 2;
    this.x = b.n32 - b.n23 < 0 ? -Math.abs(this.x) : Math.abs(this.x);
    this.y = b.n13 - b.n31 < 0 ? -Math.abs(this.y) : Math.abs(this.y);
    this.z = b.n21 - b.n12 < 0 ? -Math.abs(this.z) : Math.abs(this.z);
    this.normalize();
    return this;
  },
  calculateW: function () {
    this.w = -Math.sqrt(
      Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)
    );
    return this;
  },
  inverse: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  length: function () {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function () {
    var b = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    b == 0
      ? (this.w = this.z = this.y = this.x = 0)
      : ((b = 1 / b),
        (this.x *= b),
        (this.y *= b),
        (this.z *= b),
        (this.w *= b));
    return this;
  },
  multiplySelf: function (b) {
    var c = this.x,
      e = this.y,
      f = this.z,
      g = this.w,
      j = b.x,
      h = b.y,
      k = b.z,
      b = b.w;
    this.x = c * b + g * j + e * k - f * h;
    this.y = e * b + g * h + f * j - c * k;
    this.z = f * b + g * k + c * h - e * j;
    this.w = g * b - c * j - e * h - f * k;
    return this;
  },
  multiply: function (b, c) {
    this.x = b.x * c.w + b.y * c.z - b.z * c.y + b.w * c.x;
    this.y = -b.x * c.z + b.y * c.w + b.z * c.x + b.w * c.y;
    this.z = b.x * c.y - b.y * c.x + b.z * c.w + b.w * c.z;
    this.w = -b.x * c.x - b.y * c.y - b.z * c.z + b.w * c.w;
    return this;
  },
  multiplyVector3: function (b, c) {
    c || (c = b);
    var e = b.x,
      f = b.y,
      g = b.z,
      j = this.x,
      h = this.y,
      k = this.z,
      m = this.w,
      o = m * e + h * g - k * f,
      p = m * f + k * e - j * g,
      u = m * g + j * f - h * e,
      e = -j * e - h * f - k * g;
    c.x = o * m + e * -j + p * -k - u * -h;
    c.y = p * m + e * -h + u * -j - o * -k;
    c.z = u * m + e * -k + o * -h - p * -j;
    return c;
  },
};
THREE.Quaternion.slerp = function (b, c, e, f) {
  var g = b.w * c.w + b.x * c.x + b.y * c.y + b.z * c.z;
  if (Math.abs(g) >= 1)
    return (e.w = b.w), (e.x = b.x), (e.y = b.y), (e.z = b.z), e;
  var j = Math.acos(g),
    h = Math.sqrt(1 - g * g);
  if (Math.abs(h) < 0.001)
    return (
      (e.w = 0.5 * (b.w + c.w)),
      (e.x = 0.5 * (b.x + c.x)),
      (e.y = 0.5 * (b.y + c.y)),
      (e.z = 0.5 * (b.z + c.z)),
      e
    );
  g = Math.sin((1 - f) * j) / h;
  f = Math.sin(f * j) / h;
  e.w = b.w * g + c.w * f;
  e.x = b.x * g + c.x * f;
  e.y = b.y * g + c.y * f;
  e.z = b.z * g + c.z * f;
  return e;
};
THREE.Vertex = function (b) {
  this.position = b || new THREE.Vector3();
};
THREE.Face3 = function (b, c, e, f, g, j) {
  this.a = b;
  this.b = c;
  this.c = e;
  this.normal = f instanceof THREE.Vector3 ? f : new THREE.Vector3();
  this.vertexNormals = f instanceof Array ? f : [];
  this.color = g instanceof THREE.Color ? g : new THREE.Color();
  this.vertexColors = g instanceof Array ? g : [];
  this.vertexTangents = [];
  this.materials = j instanceof Array ? j : [j];
  this.centroid = new THREE.Vector3();
};
THREE.Face4 = function (b, c, e, f, g, j, h) {
  this.a = b;
  this.b = c;
  this.c = e;
  this.d = f;
  this.normal = g instanceof THREE.Vector3 ? g : new THREE.Vector3();
  this.vertexNormals = g instanceof Array ? g : [];
  this.color = j instanceof THREE.Color ? j : new THREE.Color();
  this.vertexColors = j instanceof Array ? j : [];
  this.vertexTangents = [];
  this.materials = h instanceof Array ? h : [h];
  this.centroid = new THREE.Vector3();
};
THREE.UV = function (b, c) {
  this.u = b || 0;
  this.v = c || 0;
};
THREE.UV.prototype = {
  constructor: THREE.UV,
  set: function (b, c) {
    this.u = b;
    this.v = c;
    return this;
  },
  copy: function (b) {
    this.u = b.u;
    this.v = b.v;
    return this;
  },
  clone: function () {
    return new THREE.UV(this.u, this.v);
  },
};
THREE.Geometry = function () {
  this.id = "Geometry" + THREE.GeometryIdCounter++;
  this.vertices = [];
  this.colors = [];
  this.faces = [];
  this.edges = [];
  this.faceUvs = [[]];
  this.faceVertexUvs = [[]];
  this.morphTargets = [];
  this.morphColors = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.boundingSphere = this.boundingBox = null;
  this.dynamic = this.hasTangents = !1;
};
THREE.Geometry.prototype = {
  constructor: THREE.Geometry,
  computeCentroids: function () {
    var b, c, e;
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (e = this.faces[b]),
        e.centroid.set(0, 0, 0),
        e instanceof THREE.Face3
          ? (e.centroid.addSelf(this.vertices[e.a].position),
            e.centroid.addSelf(this.vertices[e.b].position),
            e.centroid.addSelf(this.vertices[e.c].position),
            e.centroid.divideScalar(3))
          : e instanceof THREE.Face4 &&
            (e.centroid.addSelf(this.vertices[e.a].position),
            e.centroid.addSelf(this.vertices[e.b].position),
            e.centroid.addSelf(this.vertices[e.c].position),
            e.centroid.addSelf(this.vertices[e.d].position),
            e.centroid.divideScalar(4));
  },
  computeFaceNormals: function (b) {
    var c,
      e,
      f,
      g,
      j,
      h,
      k = new THREE.Vector3(),
      m = new THREE.Vector3();
    f = 0;
    for (g = this.faces.length; f < g; f++) {
      j = this.faces[f];
      if (b && j.vertexNormals.length) {
        k.set(0, 0, 0);
        c = 0;
        for (e = j.vertexNormals.length; c < e; c++)
          k.addSelf(j.vertexNormals[c]);
        k.divideScalar(3);
      } else
        (c = this.vertices[j.a]),
          (e = this.vertices[j.b]),
          (h = this.vertices[j.c]),
          k.sub(h.position, e.position),
          m.sub(c.position, e.position),
          k.crossSelf(m);
      k.isZero() || k.normalize();
      j.normal.copy(k);
    }
  },
  computeVertexNormals: function () {
    var b, c, e, f;
    if (this.__tmpVertices == void 0) {
      f = this.__tmpVertices = Array(this.vertices.length);
      b = 0;
      for (c = this.vertices.length; b < c; b++) f[b] = new THREE.Vector3();
      b = 0;
      for (c = this.faces.length; b < c; b++)
        if (((e = this.faces[b]), e instanceof THREE.Face3))
          e.vertexNormals = [
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
          ];
        else if (e instanceof THREE.Face4)
          e.vertexNormals = [
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
          ];
    } else {
      f = this.__tmpVertices;
      b = 0;
      for (c = this.vertices.length; b < c; b++) f[b].set(0, 0, 0);
    }
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (e = this.faces[b]),
        e instanceof THREE.Face3
          ? (f[e.a].addSelf(e.normal),
            f[e.b].addSelf(e.normal),
            f[e.c].addSelf(e.normal))
          : e instanceof THREE.Face4 &&
            (f[e.a].addSelf(e.normal),
            f[e.b].addSelf(e.normal),
            f[e.c].addSelf(e.normal),
            f[e.d].addSelf(e.normal));
    b = 0;
    for (c = this.vertices.length; b < c; b++) f[b].normalize();
    b = 0;
    for (c = this.faces.length; b < c; b++)
      (e = this.faces[b]),
        e instanceof THREE.Face3
          ? (e.vertexNormals[0].copy(f[e.a]),
            e.vertexNormals[1].copy(f[e.b]),
            e.vertexNormals[2].copy(f[e.c]))
          : e instanceof THREE.Face4 &&
            (e.vertexNormals[0].copy(f[e.a]),
            e.vertexNormals[1].copy(f[e.b]),
            e.vertexNormals[2].copy(f[e.c]),
            e.vertexNormals[3].copy(f[e.d]));
  },
  computeTangents: function () {
    function b(b, c, e, f, g, j, n) {
      k = b.vertices[c].position;
      m = b.vertices[e].position;
      o = b.vertices[f].position;
      p = h[g];
      u = h[j];
      v = h[n];
      t = m.x - k.x;
      x = o.x - k.x;
      w = m.y - k.y;
      A = o.y - k.y;
      y = m.z - k.z;
      G = o.z - k.z;
      D = u.u - p.u;
      I = v.u - p.u;
      J = u.v - p.v;
      C = v.v - p.v;
      B = 1 / (D * C - I * J);
      H.set((C * t - J * x) * B, (C * w - J * A) * B, (C * y - J * G) * B);
      S.set((D * x - I * t) * B, (D * A - I * w) * B, (D * G - I * y) * B);
      E[c].addSelf(H);
      E[e].addSelf(H);
      E[f].addSelf(H);
      V[c].addSelf(S);
      V[e].addSelf(S);
      V[f].addSelf(S);
    }
    var c,
      e,
      f,
      g,
      j,
      h,
      k,
      m,
      o,
      p,
      u,
      v,
      t,
      x,
      w,
      A,
      y,
      G,
      D,
      I,
      J,
      C,
      B,
      L,
      E = [],
      V = [],
      H = new THREE.Vector3(),
      S = new THREE.Vector3(),
      K = new THREE.Vector3(),
      Q = new THREE.Vector3(),
      n = new THREE.Vector3();
    c = 0;
    for (e = this.vertices.length; c < e; c++)
      (E[c] = new THREE.Vector3()), (V[c] = new THREE.Vector3());
    c = 0;
    for (e = this.faces.length; c < e; c++)
      (j = this.faces[c]),
        (h = this.faceVertexUvs[0][c]),
        j instanceof THREE.Face3
          ? b(this, j.a, j.b, j.c, 0, 1, 2)
          : j instanceof THREE.Face4 &&
            (b(this, j.a, j.b, j.c, 0, 1, 2), b(this, j.a, j.b, j.d, 0, 1, 3));
    var T = ["a", "b", "c", "d"];
    c = 0;
    for (e = this.faces.length; c < e; c++) {
      j = this.faces[c];
      for (f = 0; f < j.vertexNormals.length; f++)
        n.copy(j.vertexNormals[f]),
          (g = j[T[f]]),
          (L = E[g]),
          K.copy(L),
          K.subSelf(n.multiplyScalar(n.dot(L))).normalize(),
          Q.cross(j.vertexNormals[f], L),
          (g = Q.dot(V[g])),
          (g = g < 0 ? -1 : 1),
          (j.vertexTangents[f] = new THREE.Vector4(K.x, K.y, K.z, g));
    }
    this.hasTangents = !0;
  },
  computeBoundingBox: function () {
    var b;
    if (this.vertices.length > 0) {
      this.boundingBox = {
        x: [this.vertices[0].position.x, this.vertices[0].position.x],
        y: [this.vertices[0].position.y, this.vertices[0].position.y],
        z: [this.vertices[0].position.z, this.vertices[0].position.z],
      };
      for (var c = 1, e = this.vertices.length; c < e; c++) {
        b = this.vertices[c];
        if (b.position.x < this.boundingBox.x[0])
          this.boundingBox.x[0] = b.position.x;
        else if (b.position.x > this.boundingBox.x[1])
          this.boundingBox.x[1] = b.position.x;
        if (b.position.y < this.boundingBox.y[0])
          this.boundingBox.y[0] = b.position.y;
        else if (b.position.y > this.boundingBox.y[1])
          this.boundingBox.y[1] = b.position.y;
        if (b.position.z < this.boundingBox.z[0])
          this.boundingBox.z[0] = b.position.z;
        else if (b.position.z > this.boundingBox.z[1])
          this.boundingBox.z[1] = b.position.z;
      }
    }
  },
  computeBoundingSphere: function () {
    for (var b = 0, c = 0, e = this.vertices.length; c < e; c++)
      b = Math.max(b, this.vertices[c].position.length());
    this.boundingSphere = { radius: b };
  },
  computeEdgeFaces: function () {
    function b(b, c) {
      return Math.min(b, c) + "_" + Math.max(b, c);
    }
    function c(b, c, e) {
      b[c] === void 0
        ? ((b[c] = { set: {}, array: [] }),
          (b[c].set[e] = 1),
          b[c].array.push(e))
        : b[c].set[e] === void 0 && ((b[c].set[e] = 1), b[c].array.push(e));
    }
    var e,
      f,
      g,
      j,
      h,
      k = {};
    e = 0;
    for (f = this.faces.length; e < f; e++)
      (h = this.faces[e]),
        h instanceof THREE.Face3
          ? ((g = b(h.a, h.b)),
            c(k, g, e),
            (g = b(h.b, h.c)),
            c(k, g, e),
            (g = b(h.a, h.c)),
            c(k, g, e))
          : h instanceof THREE.Face4 &&
            ((g = b(h.b, h.d)),
            c(k, g, e),
            (g = b(h.a, h.b)),
            c(k, g, e),
            (g = b(h.a, h.d)),
            c(k, g, e),
            (g = b(h.b, h.c)),
            c(k, g, e),
            (g = b(h.c, h.d)),
            c(k, g, e));
    e = 0;
    for (f = this.edges.length; e < f; e++) {
      h = this.edges[e];
      g = h.vertexIndices[0];
      j = h.vertexIndices[1];
      h.faceIndices = k[b(g, j)].array;
      for (g = 0; g < h.faceIndices.length; g++)
        (j = h.faceIndices[g]), h.faces.push(this.faces[j]);
    }
  },
};
THREE.GeometryIdCounter = 0;
THREE.Spline = function (b) {
  function c(b, c, e, f, h, g, j) {
    b = (e - b) * 0.5;
    f = (f - c) * 0.5;
    return (
      (2 * (c - e) + b + f) * j + (-3 * (c - e) - 2 * b - f) * g + b * h + c
    );
  }
  this.points = b;
  var e = [],
    f = { x: 0, y: 0, z: 0 },
    g,
    j,
    h,
    k,
    m,
    o,
    p,
    u,
    v;
  this.initFromArray = function (b) {
    this.points = [];
    for (var c = 0; c < b.length; c++)
      this.points[c] = { x: b[c][0], y: b[c][1], z: b[c][2] };
  };
  this.getPoint = function (b) {
    g = (this.points.length - 1) * b;
    j = Math.floor(g);
    h = g - j;
    e[0] = j == 0 ? j : j - 1;
    e[1] = j;
    e[2] = j > this.points.length - 2 ? j : j + 1;
    e[3] = j > this.points.length - 3 ? j : j + 2;
    o = this.points[e[0]];
    p = this.points[e[1]];
    u = this.points[e[2]];
    v = this.points[e[3]];
    k = h * h;
    m = h * k;
    f.x = c(o.x, p.x, u.x, v.x, h, k, m);
    f.y = c(o.y, p.y, u.y, v.y, h, k, m);
    f.z = c(o.z, p.z, u.z, v.z, h, k, m);
    return f;
  };
  this.getControlPointsArray = function () {
    var b,
      c,
      e = this.points.length,
      f = [];
    for (b = 0; b < e; b++) (c = this.points[b]), (f[b] = [c.x, c.y, c.z]);
    return f;
  };
  this.getLength = function (b) {
    var c,
      e,
      f = (c = c = 0),
      h = new THREE.Vector3(),
      g = new THREE.Vector3(),
      j = [],
      k = 0;
    j[0] = 0;
    b || (b = 100);
    e = this.points.length * b;
    h.copy(this.points[0]);
    for (b = 1; b < e; b++)
      (c = b / e),
        (position = this.getPoint(c)),
        g.copy(position),
        (k += g.distanceTo(h)),
        h.copy(position),
        (c *= this.points.length - 1),
        (c = Math.floor(c)),
        c != f && ((j[c] = k), (f = c));
    j[j.length] = k;
    return { chunks: j, total: k };
  };
  this.reparametrizeByArcLength = function (b) {
    var c,
      e,
      f,
      h,
      g,
      j,
      k = [],
      m = new THREE.Vector3(),
      u = this.getLength();
    k.push(m.copy(this.points[0]).clone());
    for (c = 1; c < this.points.length; c++) {
      e = u.chunks[c] - u.chunks[c - 1];
      j = Math.ceil((b * e) / u.total);
      h = (c - 1) / (this.points.length - 1);
      g = c / (this.points.length - 1);
      for (e = 1; e < j - 1; e++)
        (f = h + e * (1 / j) * (g - h)),
          (position = this.getPoint(f)),
          k.push(m.copy(position).clone());
      k.push(m.copy(this.points[c]).clone());
    }
    this.points = k;
  };
};
THREE.Edge = function (b, c, e, f) {
  this.vertices = [b, c];
  this.vertexIndices = [e, f];
  this.faces = [];
  this.faceIndices = [];
};
THREE.Camera = function (b, c, e, f, g) {
  THREE.Object3D.call(this);
  this.fov = b || 50;
  this.aspect = c || 1;
  this.near = e || 0.1;
  this.far = f || 2e3;
  this.target = g || new THREE.Object3D();
  this.useTarget = !0;
  this.matrixWorldInverse = new THREE.Matrix4();
  this.projectionMatrix = null;
  this.updateProjectionMatrix();
};
THREE.Camera.prototype = new THREE.Object3D();
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function (b, c) {
  this.matrix.rotateAxis(c);
  c.multiplyScalar(b);
  this.position.addSelf(c);
  this.target.position.addSelf(c);
};
THREE.Camera.prototype.updateProjectionMatrix = function () {
  if (this.fullWidth) {
    var b = this.fullWidth / this.fullHeight,
      c = Math.tan((this.fov * Math.PI) / 360) * this.near,
      e = -c,
      f = b * e,
      b = Math.abs(b * c - f),
      e = Math.abs(c - e);
    this.projectionMatrix = THREE.Matrix4.makeFrustum(
      f + (this.x * b) / this.fullWidth,
      f + ((this.x + this.width) * b) / this.fullWidth,
      c - ((this.y + this.height) * e) / this.fullHeight,
      c - (this.y * e) / this.fullHeight,
      this.near,
      this.far
    );
  } else
    this.projectionMatrix = THREE.Matrix4.makePerspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
};
THREE.Camera.prototype.setViewOffset = function (b, c, e, f, g, j) {
  this.fullWidth = b;
  this.fullHeight = c;
  this.x = e;
  this.y = f;
  this.width = g;
  this.height = j;
  this.updateProjectionMatrix();
};
THREE.Camera.prototype.update = function (b, c, e) {
  if (this.useTarget)
    this.matrix.lookAt(this.position, this.target.position, this.up),
      this.matrix.setPosition(this.position),
      b
        ? this.matrixWorld.multiply(b, this.matrix)
        : this.matrixWorld.copy(this.matrix),
      THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse),
      (c = !0);
  else if (
    (this.matrixAutoUpdate && this.updateMatrix(),
    c || this.matrixWorldNeedsUpdate)
  )
    b
      ? this.matrixWorld.multiply(b, this.matrix)
      : this.matrixWorld.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (c = !0),
      THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
  for (b = 0; b < this.children.length; b++)
    this.children[b].update(this.matrixWorld, c, e);
};
THREE.OrthoCamera = function (b, c, e, f, g, j, h) {
  THREE.Camera.call(this, 45, 1, g, j, h);
  this.left = b;
  this.right = c;
  this.top = e;
  this.bottom = f;
  this.updateProjectionMatrix();
};
THREE.OrthoCamera.prototype = new THREE.Camera();
THREE.OrthoCamera.prototype.constructor = THREE.OrthoCamera;
THREE.OrthoCamera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix = THREE.Matrix4.makeOrtho(
    this.left,
    this.right,
    this.top,
    this.bottom,
    this.near,
    this.far
  );
};
THREE.Light = function (b) {
  THREE.Object3D.call(this);
  this.color = new THREE.Color(b);
};
THREE.Light.prototype = new THREE.Object3D();
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (b) {
  THREE.Light.call(this, b);
};
THREE.AmbientLight.prototype = new THREE.Light();
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (b, c, e, f) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3(0, 1, 0);
  this.intensity = c || 1;
  this.distance = e || 0;
  this.castShadow = f !== void 0 ? f : !1;
};
THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (b, c, e) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3();
  this.intensity = c || 1;
  this.distance = e || 0;
};
THREE.PointLight.prototype = new THREE.Light();
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.SpotLight = function (b, c, e, f) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3(0, 1, 0);
  this.target = new THREE.Object3D();
  this.intensity = c || 1;
  this.distance = e || 0;
  this.castShadow = f !== void 0 ? f : !1;
};
THREE.SpotLight.prototype = new THREE.Light();
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
THREE.Material = function (b) {
  this.id = THREE.MaterialCount++;
  b = b || {};
  this.opacity = b.opacity !== void 0 ? b.opacity : 1;
  this.transparent = b.transparent !== void 0 ? b.transparent : !1;
  this.blending = b.blending !== void 0 ? b.blending : THREE.NormalBlending;
  this.depthTest = b.depthTest !== void 0 ? b.depthTest : !0;
  this.polygonOffset = b.polygonOffset !== void 0 ? b.polygonOffset : !1;
  this.polygonOffsetFactor =
    b.polygonOffsetFactor !== void 0 ? b.polygonOffsetFactor : 0;
  this.polygonOffsetUnits =
    b.polygonOffsetUnits !== void 0 ? b.polygonOffsetUnits : 0;
  this.alphaTest = b.alphaTest !== void 0 ? b.alphaTest : 0;
};
THREE.MaterialCount = 0;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.LineBasicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color =
    b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.linewidth = b.linewidth !== void 0 ? b.linewidth : 1;
  this.linecap = b.linecap !== void 0 ? b.linecap : "round";
  this.linejoin = b.linejoin !== void 0 ? b.linejoin : "round";
  this.vertexColors = b.vertexColors ? b.vertexColors : !1;
};
THREE.LineBasicMaterial.prototype = new THREE.Material();
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color =
    b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== void 0 ? b.map : null;
  this.lightMap = b.lightMap !== void 0 ? b.lightMap : null;
  this.envMap = b.envMap !== void 0 ? b.envMap : null;
  this.combine = b.combine !== void 0 ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== void 0 ? b.reflectivity : 1;
  this.refractionRatio =
    b.refractionRatio !== void 0 ? b.refractionRatio : 0.98;
  this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
  this.wireframeLinewidth =
    b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
  this.wireframeLinecap =
    b.wireframeLinecap !== void 0 ? b.wireframeLinecap : "round";
  this.wireframeLinejoin =
    b.wireframeLinejoin !== void 0 ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
  this.skinning = b.skinning !== void 0 ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets : !1;
};
THREE.MeshBasicMaterial.prototype = new THREE.Material();
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color =
    b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== void 0 ? b.map : null;
  this.lightMap = b.lightMap !== void 0 ? b.lightMap : null;
  this.envMap = b.envMap !== void 0 ? b.envMap : null;
  this.combine = b.combine !== void 0 ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== void 0 ? b.reflectivity : 1;
  this.refractionRatio =
    b.refractionRatio !== void 0 ? b.refractionRatio : 0.98;
  this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
  this.wireframeLinewidth =
    b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
  this.wireframeLinecap =
    b.wireframeLinecap !== void 0 ? b.wireframeLinecap : "round";
  this.wireframeLinejoin =
    b.wireframeLinejoin !== void 0 ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
  this.skinning = b.skinning !== void 0 ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets : !1;
};
THREE.MeshLambertMaterial.prototype = new THREE.Material();
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color =
    b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.ambient =
    b.ambient !== void 0 ? new THREE.Color(b.ambient) : new THREE.Color(328965);
  this.specular =
    b.specular !== void 0
      ? new THREE.Color(b.specular)
      : new THREE.Color(1118481);
  this.shininess = b.shininess !== void 0 ? b.shininess : 30;
  this.map = b.map !== void 0 ? b.map : null;
  this.lightMap = b.lightMap !== void 0 ? b.lightMap : null;
  this.envMap = b.envMap !== void 0 ? b.envMap : null;
  this.combine = b.combine !== void 0 ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== void 0 ? b.reflectivity : 1;
  this.refractionRatio =
    b.refractionRatio !== void 0 ? b.refractionRatio : 0.98;
  this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
  this.wireframeLinewidth =
    b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
  this.wireframeLinecap =
    b.wireframeLinecap !== void 0 ? b.wireframeLinecap : "round";
  this.wireframeLinejoin =
    b.wireframeLinejoin !== void 0 ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
  this.skinning = b.skinning !== void 0 ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets : !1;
};
THREE.MeshPhongMaterial.prototype = new THREE.Material();
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
  this.wireframeLinewidth =
    b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
};
THREE.MeshDepthMaterial.prototype = new THREE.Material();
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.shading = b.shading ? b.shading : THREE.FlatShading;
  this.wireframe = b.wireframe ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth ? b.wireframeLinewidth : 1;
};
THREE.MeshNormalMaterial.prototype = new THREE.Material();
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {};
THREE.MeshShaderMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.fragmentShader =
    b.fragmentShader !== void 0 ? b.fragmentShader : "void main() {}";
  this.vertexShader =
    b.vertexShader !== void 0 ? b.vertexShader : "void main() {}";
  this.uniforms = b.uniforms !== void 0 ? b.uniforms : {};
  this.attributes = b.attributes;
  this.shading = b.shading !== void 0 ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== void 0 ? b.wireframe : !1;
  this.wireframeLinewidth =
    b.wireframeLinewidth !== void 0 ? b.wireframeLinewidth : 1;
  this.fog = b.fog !== void 0 ? b.fog : !1;
  this.lights = b.lights !== void 0 ? b.lights : !1;
  this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
  this.skinning = b.skinning !== void 0 ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== void 0 ? b.morphTargets : !1;
};
THREE.MeshShaderMaterial.prototype = new THREE.Material();
THREE.MeshShaderMaterial.prototype.constructor = THREE.MeshShaderMaterial;
THREE.ParticleBasicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color =
    b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== void 0 ? b.map : null;
  this.size = b.size !== void 0 ? b.size : 1;
  this.sizeAttenuation = b.sizeAttenuation !== void 0 ? b.sizeAttenuation : !0;
  this.vertexColors = b.vertexColors !== void 0 ? b.vertexColors : !1;
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material();
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color =
    b.color !== void 0 ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.program = b.program !== void 0 ? b.program : function () {};
};
THREE.ParticleCanvasMaterial.prototype = new THREE.Material();
THREE.ParticleCanvasMaterial.prototype.constructor =
  THREE.ParticleCanvasMaterial;
THREE.ParticleDOMMaterial = function (b) {
  THREE.Material.call(this);
  this.domElement = b;
};
THREE.Texture = function (b, c, e, f, g, j) {
  this.id = THREE.TextureCount++;
  this.image = b;
  this.mapping = c !== void 0 ? c : new THREE.UVMapping();
  this.wrapS = e !== void 0 ? e : THREE.ClampToEdgeWrapping;
  this.wrapT = f !== void 0 ? f : THREE.ClampToEdgeWrapping;
  this.magFilter = g !== void 0 ? g : THREE.LinearFilter;
  this.minFilter = j !== void 0 ? j : THREE.LinearMipMapLinearFilter;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.needsUpdate = !1;
};
THREE.Texture.prototype = {
  constructor: THREE.Texture,
  clone: function () {
    var b = new THREE.Texture(
      this.image,
      this.mapping,
      this.wrapS,
      this.wrapT,
      this.magFilter,
      this.minFilter
    );
    b.offset.copy(this.offset);
    b.repeat.copy(this.repeat);
    return b;
  },
};
THREE.TextureCount = 0;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.LatitudeReflectionMapping = function () {};
THREE.LatitudeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.UVMapping = function () {};
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.DataTexture = function (b, c, e, f, g, j, h, k, m) {
  THREE.Texture.call(this, null, g, j, h, k, m);
  this.image = { data: b, width: c, height: e };
  this.format = f !== void 0 ? f : THREE.RGBAFormat;
};
THREE.DataTexture.prototype = new THREE.Texture();
THREE.DataTexture.prototype.constructor = THREE.DataTexture;
THREE.DataTexture.prototype = {
  clone: function () {
    var b = new THREE.DataTexture(
      this.data.slice(0),
      this.mapping,
      this.wrapS,
      this.wrapT,
      this.magFilter,
      this.minFilter
    );
    b.offset.copy(this.offset);
    b.repeat.copy(this.repeat);
    return b;
  },
};
THREE.Particle = function (b) {
  THREE.Object3D.call(this);
  this.materials = b instanceof Array ? b : [b];
};
THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function (b, c) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = c instanceof Array ? c : [c];
  this.sortParticles = !1;
};
THREE.ParticleSystem.prototype = new THREE.Object3D();
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function (b, c, e) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = c instanceof Array ? c : [c];
  this.type = e != void 0 ? e : THREE.LineStrip;
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D();
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (b, c) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = c && c.length ? c : [c];
  this.overdraw = !1;
  if (
    this.geometry &&
    (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(),
    (this.boundRadius = b.boundingSphere.radius),
    this.geometry.morphTargets.length)
  ) {
    this.morphTargetBase = -1;
    this.morphTargetForcedOrder = [];
    this.morphTargetInfluences = [];
    this.morphTargetDictionary = {};
    for (var e = 0; e < this.geometry.morphTargets.length; e++)
      this.morphTargetInfluences.push(0),
        (this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e);
  }
};
THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (b) {
  if (this.morphTargetDictionary[b] !== void 0)
    return this.morphTargetDictionary[b];
  console.log(
    "THREE.Mesh.getMorphTargetIndexByName: morph target " +
      b +
      " does not exist. Returning 0."
  );
  return 0;
};
THREE.Bone = function (b) {
  THREE.Object3D.call(this);
  this.skin = b;
  this.skinMatrix = new THREE.Matrix4();
  this.hasNoneBoneChildren = !1;
};
THREE.Bone.prototype = new THREE.Object3D();
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (b, c, e) {
  this.matrixAutoUpdate && (c |= this.updateMatrix());
  if (c || this.matrixWorldNeedsUpdate)
    b
      ? this.skinMatrix.multiply(b, this.matrix)
      : this.skinMatrix.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (c = !0);
  var f,
    g = this.children.length;
  if (this.hasNoneBoneChildren) {
    this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
    for (f = 0; f < g; f++)
      (b = this.children[f]),
        b instanceof THREE.Bone
          ? b.update(this.skinMatrix, c, e)
          : b.update(this.matrixWorld, !0, e);
  } else for (f = 0; f < g; f++) this.children[f].update(this.skinMatrix, c, e);
};
THREE.Bone.prototype.addChild = function (b) {
  if (
    this.children.indexOf(b) === -1 &&
    (b.parent !== void 0 && b.parent.removeChild(b),
    (b.parent = this),
    this.children.push(b),
    !(b instanceof THREE.Bone))
  )
    this.hasNoneBoneChildren = !0;
};
THREE.SkinnedMesh = function (b, c) {
  THREE.Mesh.call(this, b, c);
  this.identityMatrix = new THREE.Matrix4();
  this.bones = [];
  this.boneMatrices = [];
  var e, f, g, j, h, k;
  if (this.geometry.bones !== void 0) {
    for (e = 0; e < this.geometry.bones.length; e++)
      (g = this.geometry.bones[e]),
        (j = g.pos),
        (h = g.rotq),
        (k = g.scl),
        (f = this.addBone()),
        (f.name = g.name),
        f.position.set(j[0], j[1], j[2]),
        f.quaternion.set(h[0], h[1], h[2], h[3]),
        (f.useQuaternion = !0),
        k !== void 0 ? f.scale.set(k[0], k[1], k[2]) : f.scale.set(1, 1, 1);
    for (e = 0; e < this.bones.length; e++)
      (g = this.geometry.bones[e]),
        (f = this.bones[e]),
        g.parent === -1 ? this.addChild(f) : this.bones[g.parent].addChild(f);
    this.boneMatrices = new Float32Array(16 * this.bones.length);
    this.pose();
  }
};
THREE.SkinnedMesh.prototype = new THREE.Mesh();
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update = function (b, c, e) {
  if (this.visible) {
    this.matrixAutoUpdate && (c |= this.updateMatrix());
    if (c || this.matrixWorldNeedsUpdate)
      b
        ? this.matrixWorld.multiply(b, this.matrix)
        : this.matrixWorld.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (c = !0);
    var f,
      g = this.children.length;
    for (f = 0; f < g; f++)
      (b = this.children[f]),
        b instanceof THREE.Bone
          ? b.update(this.identityMatrix, !1, e)
          : b.update(this.matrixWorld, c, e);
    e = this.bones.length;
    ba = this.bones;
    bm = this.boneMatrices;
    for (c = 0; c < e; c++) ba[c].skinMatrix.flattenToArrayOffset(bm, c * 16);
  }
};
THREE.SkinnedMesh.prototype.addBone = function (b) {
  b === void 0 && (b = new THREE.Bone(this));
  this.bones.push(b);
  return b;
};
THREE.SkinnedMesh.prototype.pose = function () {
  this.update(void 0, !0);
  for (var b, c = [], e = 0; e < this.bones.length; e++)
    (b = this.bones[e]),
      c.push(THREE.Matrix4.makeInvert(b.skinMatrix)),
      b.skinMatrix.flattenToArrayOffset(this.boneMatrices, e * 16);
  if (this.geometry.skinVerticesA === void 0) {
    this.geometry.skinVerticesA = [];
    this.geometry.skinVerticesB = [];
    var f;
    for (b = 0; b < this.geometry.skinIndices.length; b++) {
      var e = this.geometry.vertices[b].position,
        g = this.geometry.skinIndices[b].x,
        j = this.geometry.skinIndices[b].y;
      f = new THREE.Vector3(e.x, e.y, e.z);
      this.geometry.skinVerticesA.push(c[g].multiplyVector3(f));
      f = new THREE.Vector3(e.x, e.y, e.z);
      this.geometry.skinVerticesB.push(c[j].multiplyVector3(f));
      this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y !== 1 &&
        ((e =
          (1 -
            (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y)) *
          0.5),
        (this.geometry.skinWeights[b].x += e),
        (this.geometry.skinWeights[b].y += e));
    }
  }
};
THREE.Ribbon = function (b, c) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = c instanceof Array ? c : [c];
};
THREE.Ribbon.prototype = new THREE.Object3D();
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.LOD = function () {
  THREE.Object3D.call(this);
  this.LODs = [];
};
THREE.LOD.prototype = new THREE.Object3D();
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.add = function (b, c) {
  c === void 0 && (c = 0);
  for (var c = Math.abs(c), e = 0; e < this.LODs.length; e++)
    if (c < this.LODs[e].visibleAtDistance) break;
  this.LODs.splice(e, 0, { visibleAtDistance: c, object3D: b });
  this.addChild(b);
};
THREE.LOD.prototype.update = function (b, c, e) {
  this.matrixAutoUpdate && (c |= this.updateMatrix());
  if (c || this.matrixWorldNeedsUpdate)
    b
      ? this.matrixWorld.multiply(b, this.matrix)
      : this.matrixWorld.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (c = !0);
  if (this.LODs.length > 1) {
    b = e.matrixWorldInverse;
    b = -(
      b.n31 * this.position.x +
      b.n32 * this.position.y +
      b.n33 * this.position.z +
      b.n34
    );
    this.LODs[0].object3D.visible = !0;
    for (var f = 1; f < this.LODs.length; f++)
      if (b >= this.LODs[f].visibleAtDistance)
        (this.LODs[f - 1].object3D.visible = !1),
          (this.LODs[f].object3D.visible = !0);
      else break;
    for (; f < this.LODs.length; f++) this.LODs[f].object3D.visible = !1;
  }
  for (b = 0; b < this.children.length; b++)
    this.children[b].update(this.matrixWorld, c, e);
};
THREE.Sprite = function (b) {
  THREE.Object3D.call(this);
  if (b.material !== void 0)
    (this.material = b.material),
      (this.map = void 0),
      (this.blending = material.blending);
  else if (b.map !== void 0)
    (this.map =
      b.map instanceof THREE.Texture
        ? b.map
        : THREE.ImageUtils.loadTexture(b.map)),
      (this.material = void 0),
      (this.blending =
        b.blending !== void 0 ? b.blending : THREE.NormalBlending);
  this.useScreenCoordinates =
    b.useScreenCoordinates !== void 0 ? b.useScreenCoordinates : !0;
  this.mergeWith3D =
    b.mergeWith3D !== void 0 ? b.mergeWith3D : !this.useScreenCoordinates;
  this.affectedByDistance =
    b.affectedByDistance !== void 0
      ? b.affectedByDistance
      : !this.useScreenCoordinates;
  this.scaleByViewport =
    b.scaleByViewport !== void 0 ? b.scaleByViewport : !this.affectedByDistance;
  this.alignment =
    b.alignment instanceof THREE.Vector2
      ? b.alignment
      : THREE.SpriteAlignment.center;
  this.rotation3d = this.rotation;
  this.rotation = 0;
  this.opacity = 1;
  this.uvOffset = new THREE.Vector2(0, 0);
  this.uvScale = new THREE.Vector2(1, 1);
};
THREE.Sprite.prototype = new THREE.Object3D();
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.supr = THREE.Object3D.prototype;
THREE.Sprite.prototype.updateMatrix = function () {
  this.matrix.setPosition(this.position);
  this.rotation3d.set(0, 0, this.rotation);
  this.matrix.setRotationFromEuler(this.rotation3d);
  if (this.scale.x !== 1 || this.scale.y !== 1)
    this.matrix.scale(this.scale),
      (this.boundRadiusScale = Math.max(this.scale.x, this.scale.y));
  this.matrixWorldNeedsUpdate = !0;
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.matrixAutoUpdate = !1;
  this.collisions = this.overrideMaterial = this.fog = null;
  this.objects = [];
  this.lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
THREE.Scene.prototype = new THREE.Object3D();
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function (b) {
  this.supr.addChild.call(this, b);
  this.addChildRecurse(b);
};
THREE.Scene.prototype.addChildRecurse = function (b) {
  if (b instanceof THREE.Light)
    this.lights.indexOf(b) === -1 && this.lights.push(b);
  else if (
    !(b instanceof THREE.Camera || b instanceof THREE.Bone) &&
    this.objects.indexOf(b) === -1
  )
    this.objects.push(b), this.__objectsAdded.push(b);
  for (var c = 0; c < b.children.length; c++)
    this.addChildRecurse(b.children[c]);
};
THREE.Scene.prototype.removeChild = function (b) {
  this.supr.removeChild.call(this, b);
  this.removeChildRecurse(b);
};
THREE.Scene.prototype.removeChildRecurse = function (b) {
  if (b instanceof THREE.Light) {
    var c = this.lights.indexOf(b);
    c !== -1 && this.lights.splice(c, 1);
  } else
    b instanceof THREE.Camera ||
      ((c = this.objects.indexOf(b)),
      c !== -1 && (this.objects.splice(c, 1), this.__objectsRemoved.push(b)));
  for (c = 0; c < b.children.length; c++)
    this.removeChildRecurse(b.children[c]);
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Fog = function (b, c, e) {
  this.color = new THREE.Color(b);
  this.near = c || 1;
  this.far = e || 1e3;
};
THREE.FogExp2 = function (b, c) {
  this.color = new THREE.Color(b);
  this.density = c !== void 0 ? c : 2.5e-4;
};
THREE.Projector = function () {
  function b() {
    var b = (m[k] = m[k] || new THREE.RenderableVertex());
    k++;
    return b;
  }
  function c(b, c) {
    return c.z - b.z;
  }
  function e(b, c) {
    var e = 0,
      f = 1,
      h = b.z + b.w,
      g = c.z + c.w,
      j = -b.z + b.w,
      k = -c.z + c.w;
    return h >= 0 && g >= 0 && j >= 0 && k >= 0
      ? !0
      : (h < 0 && g < 0) || (j < 0 && k < 0)
      ? !1
      : (h < 0
          ? (e = Math.max(e, h / (h - g)))
          : g < 0 && (f = Math.min(f, h / (h - g))),
        j < 0
          ? (e = Math.max(e, j / (j - k)))
          : k < 0 && (f = Math.min(f, j / (j - k))),
        f < e ? !1 : (b.lerpSelf(c, e), c.lerpSelf(b, 1 - f), !0));
  }
  var f,
    g,
    j = [],
    h,
    k,
    m = [],
    o,
    p,
    u = [],
    v,
    t = [],
    x,
    w,
    A = [],
    y,
    G,
    D = [],
    I = new THREE.Vector4(),
    J = new THREE.Vector4(),
    C = new THREE.Matrix4(),
    B = new THREE.Matrix4(),
    L = [
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
    ],
    E = new THREE.Vector4(),
    V = new THREE.Vector4();
  this.projectVector = function (b, c) {
    C.multiply(c.projectionMatrix, c.matrixWorldInverse);
    C.multiplyVector3(b);
    return b;
  };
  this.unprojectVector = function (b, c) {
    C.multiply(c.matrixWorld, THREE.Matrix4.makeInvert(c.projectionMatrix));
    C.multiplyVector3(b);
    return b;
  };
  this.projectObjects = function (b, e, h) {
    var e = [],
      k,
      n,
      m;
    g = 0;
    n = b.objects;
    b = 0;
    for (k = n.length; b < k; b++) {
      m = n[b];
      var u;
      if (!(u = !m.visible))
        if ((u = m instanceof THREE.Mesh)) {
          a: {
            u = void 0;
            for (
              var o = m.matrixWorld,
                t =
                  -m.geometry.boundingSphere.radius *
                  Math.max(m.scale.x, Math.max(m.scale.y, m.scale.z)),
                p = 0;
              p < 6;
              p++
            )
              if (
                ((u =
                  L[p].x * o.n14 + L[p].y * o.n24 + L[p].z * o.n34 + L[p].w),
                u <= t)
              ) {
                u = !1;
                break a;
              }
            u = !0;
          }
          u = !u;
        }
      if (!u)
        (u = j[g] = j[g] || new THREE.RenderableObject()),
          g++,
          (f = u),
          I.copy(m.position),
          C.multiplyVector3(I),
          (f.object = m),
          (f.z = I.z),
          e.push(f);
    }
    h && e.sort(c);
    return e;
  };
  this.projectScene = function (f, g, j) {
    var I = [],
      n = g.near,
      T = g.far,
      X,
      M,
      W,
      ha,
      ca,
      fa,
      ga,
      $,
      Y,
      P,
      ea,
      Z,
      da,
      ia,
      U,
      ja,
      pa;
    G = w = v = p = 0;
    g.matrixAutoUpdate && g.update(void 0, !0);
    f.update(void 0, !1, g);
    C.multiply(g.projectionMatrix, g.matrixWorldInverse);
    L[0].set(C.n41 - C.n11, C.n42 - C.n12, C.n43 - C.n13, C.n44 - C.n14);
    L[1].set(C.n41 + C.n11, C.n42 + C.n12, C.n43 + C.n13, C.n44 + C.n14);
    L[2].set(C.n41 + C.n21, C.n42 + C.n22, C.n43 + C.n23, C.n44 + C.n24);
    L[3].set(C.n41 - C.n21, C.n42 - C.n22, C.n43 - C.n23, C.n44 - C.n24);
    L[4].set(C.n41 - C.n31, C.n42 - C.n32, C.n43 - C.n33, C.n44 - C.n34);
    L[5].set(C.n41 + C.n31, C.n42 + C.n32, C.n43 + C.n33, C.n44 + C.n34);
    for (X = 0; X < 6; X++)
      (Y = L[X]), Y.divideScalar(Math.sqrt(Y.x * Y.x + Y.y * Y.y + Y.z * Y.z));
    Y = this.projectObjects(f, g, !0);
    f = 0;
    for (X = Y.length; f < X; f++)
      if (((P = Y[f].object), P.visible))
        if (
          ((ea = P.matrixWorld),
          (Z = P.matrixRotationWorld),
          (da = P.materials),
          (ia = P.overdraw),
          (k = 0),
          P instanceof THREE.Mesh)
        ) {
          U = P.geometry;
          ha = U.vertices;
          ja = U.faces;
          U = U.faceVertexUvs;
          M = 0;
          for (W = ha.length; M < W; M++)
            (h = b()),
              h.positionWorld.copy(ha[M].position),
              ea.multiplyVector3(h.positionWorld),
              h.positionScreen.copy(h.positionWorld),
              C.multiplyVector4(h.positionScreen),
              (h.positionScreen.x /= h.positionScreen.w),
              (h.positionScreen.y /= h.positionScreen.w),
              (h.visible = h.positionScreen.z > n && h.positionScreen.z < T);
          ha = 0;
          for (M = ja.length; ha < M; ha++) {
            W = ja[ha];
            if (W instanceof THREE.Face3)
              if (
                ((ca = m[W.a]),
                (fa = m[W.b]),
                (ga = m[W.c]),
                ca.visible &&
                  fa.visible &&
                  ga.visible &&
                  (P.doubleSided ||
                    P.flipSided !=
                      (ga.positionScreen.x - ca.positionScreen.x) *
                        (fa.positionScreen.y - ca.positionScreen.y) -
                        (ga.positionScreen.y - ca.positionScreen.y) *
                          (fa.positionScreen.x - ca.positionScreen.x) <
                        0))
              )
                ($ = u[p] = u[p] || new THREE.RenderableFace3()),
                  p++,
                  (o = $),
                  o.v1.copy(ca),
                  o.v2.copy(fa),
                  o.v3.copy(ga);
              else continue;
            else if (W instanceof THREE.Face4)
              if (
                ((ca = m[W.a]),
                (fa = m[W.b]),
                (ga = m[W.c]),
                ($ = m[W.d]),
                ca.visible &&
                  fa.visible &&
                  ga.visible &&
                  $.visible &&
                  (P.doubleSided ||
                    P.flipSided !=
                      (($.positionScreen.x - ca.positionScreen.x) *
                        (fa.positionScreen.y - ca.positionScreen.y) -
                        ($.positionScreen.y - ca.positionScreen.y) *
                          (fa.positionScreen.x - ca.positionScreen.x) <
                        0 ||
                        (fa.positionScreen.x - ga.positionScreen.x) *
                          ($.positionScreen.y - ga.positionScreen.y) -
                          (fa.positionScreen.y - ga.positionScreen.y) *
                            ($.positionScreen.x - ga.positionScreen.x) <
                          0)))
              )
                (pa = t[v] = t[v] || new THREE.RenderableFace4()),
                  v++,
                  (o = pa),
                  o.v1.copy(ca),
                  o.v2.copy(fa),
                  o.v3.copy(ga),
                  o.v4.copy($);
              else continue;
            o.normalWorld.copy(W.normal);
            Z.multiplyVector3(o.normalWorld);
            o.centroidWorld.copy(W.centroid);
            ea.multiplyVector3(o.centroidWorld);
            o.centroidScreen.copy(o.centroidWorld);
            C.multiplyVector3(o.centroidScreen);
            ga = W.vertexNormals;
            ca = 0;
            for (fa = ga.length; ca < fa; ca++)
              ($ = o.vertexNormalsWorld[ca]),
                $.copy(ga[ca]),
                Z.multiplyVector3($);
            ca = 0;
            for (fa = U.length; ca < fa; ca++)
              if ((pa = U[ca][ha])) {
                ga = 0;
                for ($ = pa.length; ga < $; ga++) o.uvs[ca][ga] = pa[ga];
              }
            o.meshMaterials = da;
            o.faceMaterials = W.materials;
            o.overdraw = ia;
            o.z = o.centroidScreen.z;
            I.push(o);
          }
        } else if (P instanceof THREE.Line) {
          B.multiply(C, ea);
          ha = P.geometry.vertices;
          ca = b();
          ca.positionScreen.copy(ha[0].position);
          B.multiplyVector4(ca.positionScreen);
          M = 1;
          for (W = ha.length; M < W; M++)
            if (
              ((ca = b()),
              ca.positionScreen.copy(ha[M].position),
              B.multiplyVector4(ca.positionScreen),
              (fa = m[k - 2]),
              E.copy(ca.positionScreen),
              V.copy(fa.positionScreen),
              e(E, V))
            )
              E.multiplyScalar(1 / E.w),
                V.multiplyScalar(1 / V.w),
                (ea = A[w] = A[w] || new THREE.RenderableLine()),
                w++,
                (x = ea),
                x.v1.positionScreen.copy(E),
                x.v2.positionScreen.copy(V),
                (x.z = Math.max(E.z, V.z)),
                (x.materials = P.materials),
                I.push(x);
        } else if (
          P instanceof THREE.Particle &&
          (J.set(P.matrixWorld.n14, P.matrixWorld.n24, P.matrixWorld.n34, 1),
          C.multiplyVector4(J),
          (J.z /= J.w),
          J.z > 0 && J.z < 1)
        )
          (ea = D[G] = D[G] || new THREE.RenderableParticle()),
            G++,
            (y = ea),
            (y.x = J.x / J.w),
            (y.y = J.y / J.w),
            (y.z = J.z),
            (y.rotation = P.rotation.z),
            (y.scale.x =
              P.scale.x *
              Math.abs(
                y.x -
                  (J.x + g.projectionMatrix.n11) /
                    (J.w + g.projectionMatrix.n14)
              )),
            (y.scale.y =
              P.scale.y *
              Math.abs(
                y.y -
                  (J.y + g.projectionMatrix.n22) /
                    (J.w + g.projectionMatrix.n24)
              )),
            (y.materials = P.materials),
            I.push(y);
    j && I.sort(c);
    return I;
  };
};
THREE.DOMRenderer = function () {
  THREE.Renderer.call(this);
  var b = null,
    c = new THREE.Projector(),
    e,
    f,
    g,
    j;
  this.domElement = document.createElement("div");
  this.setSize = function (b, c) {
    e = b;
    f = c;
    g = e / 2;
    j = f / 2;
  };
  this.render = function (e, f) {
    var m, o, p, u, v, t, x, w;
    b = c.projectScene(e, f);
    m = 0;
    for (o = b.length; m < o; m++)
      if (((v = b[m]), v instanceof THREE.RenderableParticle)) {
        x = v.x * g + g;
        w = v.y * j + j;
        p = 0;
        for (u = v.material.length; p < u; p++)
          if (((t = v.material[p]), t instanceof THREE.ParticleDOMMaterial))
            (t = t.domElement),
              (t.style.left = x + "px"),
              (t.style.top = w + "px");
      }
  };
};
THREE.CanvasRenderer = function (b) {
  function c(b) {
    if (A != b) t.globalAlpha = A = b;
  }
  function e(b) {
    if (y != b) {
      switch (b) {
        case THREE.NormalBlending:
          t.globalCompositeOperation = "source-over";
          break;
        case THREE.AdditiveBlending:
          t.globalCompositeOperation = "lighter";
          break;
        case THREE.SubtractiveBlending:
          t.globalCompositeOperation = "darker";
      }
      y = b;
    }
  }
  function f(b) {
    if (G != b) t.strokeStyle = G = b;
  }
  function g(b) {
    if (D != b) t.fillStyle = D = b;
  }
  var j = this,
    h = null,
    k = new THREE.Projector(),
    b = b || {},
    m = b.canvas !== void 0 ? b.canvas : document.createElement("canvas"),
    o,
    p,
    u,
    v,
    t = m.getContext("2d"),
    x = new THREE.Color(0),
    w = 0,
    A = 1,
    y = 0,
    G = null,
    D = null,
    I = null,
    J = null,
    C = null,
    B,
    L,
    E,
    V,
    H = new THREE.RenderableVertex(),
    S = new THREE.RenderableVertex(),
    K,
    Q,
    n,
    T,
    X,
    M,
    W,
    ha,
    ca,
    fa,
    ga,
    $,
    Y = new THREE.Color(0),
    P = new THREE.Color(0),
    ea = new THREE.Color(0),
    Z = new THREE.Color(0),
    da = new THREE.Color(0),
    ia = [],
    U,
    ja,
    pa,
    la,
    ma,
    Fa,
    ya,
    Ia,
    Ja,
    Ta,
    ra = new THREE.Rectangle(),
    na = new THREE.Rectangle(),
    aa = new THREE.Rectangle(),
    xa = !1,
    va = new THREE.Color(),
    oa = new THREE.Color(),
    Da = new THREE.Color(),
    Ga = new THREE.Color(),
    sa = new THREE.Vector3(),
    R,
    Aa,
    ka,
    za,
    Wa,
    Ba,
    b = 16;
  R = document.createElement("canvas");
  R.width = R.height = 2;
  Aa = R.getContext("2d");
  Aa.fillStyle = "rgba(0,0,0,1)";
  Aa.fillRect(0, 0, 2, 2);
  ka = Aa.getImageData(0, 0, 2, 2);
  za = ka.data;
  Wa = document.createElement("canvas");
  Wa.width = Wa.height = b;
  Ba = Wa.getContext("2d");
  Ba.translate(-b / 2, -b / 2);
  Ba.scale(b, b);
  b--;
  this.domElement = m;
  this.sortElements = this.sortObjects = this.autoClear = !0;
  this.data = { vertices: 0, faces: 0 };
  this.setSize = function (b, c) {
    o = b;
    p = c;
    u = Math.floor(o / 2);
    v = Math.floor(p / 2);
    m.width = o;
    m.height = p;
    ra.set(-u, -v, u, v);
    na.set(-u, -v, u, v);
    A = 1;
    y = 0;
    C = J = I = D = G = null;
  };
  this.setClearColor = function (b, c) {
    x.copy(b);
    w = c;
    na.set(-u, -v, u, v);
  };
  this.setClearColorHex = function (b, c) {
    x.setHex(b);
    w = c;
    na.set(-u, -v, u, v);
  };
  this.clear = function () {
    t.setTransform(1, 0, 0, -1, u, v);
    na.isEmpty() ||
      (na.minSelf(ra),
      na.inflate(2),
      w < 1 &&
        t.clearRect(
          Math.floor(na.getX()),
          Math.floor(na.getY()),
          Math.floor(na.getWidth()),
          Math.floor(na.getHeight())
        ),
      w > 0 &&
        (e(THREE.NormalBlending),
        c(1),
        g(
          "rgba(" +
            Math.floor(x.r * 255) +
            "," +
            Math.floor(x.g * 255) +
            "," +
            Math.floor(x.b * 255) +
            "," +
            w +
            ")"
        ),
        t.fillRect(
          Math.floor(na.getX()),
          Math.floor(na.getY()),
          Math.floor(na.getWidth()),
          Math.floor(na.getHeight())
        )),
      na.empty());
  };
  this.render = function (b, m) {
    function o(b) {
      var c,
        e,
        f,
        h = b.lights;
      oa.setRGB(0, 0, 0);
      Da.setRGB(0, 0, 0);
      Ga.setRGB(0, 0, 0);
      b = 0;
      for (c = h.length; b < c; b++)
        (e = h[b]),
          (f = e.color),
          e instanceof THREE.AmbientLight
            ? ((oa.r += f.r), (oa.g += f.g), (oa.b += f.b))
            : e instanceof THREE.DirectionalLight
            ? ((Da.r += f.r), (Da.g += f.g), (Da.b += f.b))
            : e instanceof THREE.PointLight &&
              ((Ga.r += f.r), (Ga.g += f.g), (Ga.b += f.b));
    }
    function p(b, c, e, f) {
      var h,
        g,
        j,
        k,
        n = b.lights,
        b = 0;
      for (h = n.length; b < h; b++)
        (g = n[b]),
          (j = g.color),
          g instanceof THREE.DirectionalLight
            ? ((k = e.dot(g.position)),
              k <= 0 ||
                ((k *= g.intensity),
                (f.r += j.r * k),
                (f.g += j.g * k),
                (f.b += j.b * k)))
            : g instanceof THREE.PointLight &&
              ((k = e.dot(sa.sub(g.position, c).normalize())),
              k <= 0 ||
                ((k *=
                  g.distance == 0
                    ? 1
                    : 1 - Math.min(c.distanceTo(g.position) / g.distance, 1)),
                k != 0 &&
                  ((k *= g.intensity),
                  (f.r += j.r * k),
                  (f.g += j.g * k),
                  (f.b += j.b * k))));
    }
    function x(b, h, j) {
      c(j.opacity);
      e(j.blending);
      var k, n, m, o, p, ka;
      if (j instanceof THREE.ParticleBasicMaterial) {
        if (j.map)
          (o = j.map.image),
            (p = o.width >> 1),
            (ka = o.height >> 1),
            (j = h.scale.x * u),
            (m = h.scale.y * v),
            (k = j * p),
            (n = m * ka),
            aa.set(b.x - k, b.y - n, b.x + k, b.y + n),
            ra.instersects(aa) &&
              (t.save(),
              t.translate(b.x, b.y),
              t.rotate(-h.rotation),
              t.scale(j, -m),
              t.translate(-p, -ka),
              t.drawImage(o, 0, 0),
              t.restore());
      } else
        j instanceof THREE.ParticleCanvasMaterial &&
          ((k = h.scale.x * u),
          (n = h.scale.y * v),
          aa.set(b.x - k, b.y - n, b.x + k, b.y + n),
          ra.instersects(aa) &&
            (f(j.color.getContextStyle()),
            g(j.color.getContextStyle()),
            t.save(),
            t.translate(b.x, b.y),
            t.rotate(-h.rotation),
            t.scale(k, n),
            j.program(t),
            t.restore()));
    }
    function w(b, h, g, j) {
      c(j.opacity);
      e(j.blending);
      t.beginPath();
      t.moveTo(b.positionScreen.x, b.positionScreen.y);
      t.lineTo(h.positionScreen.x, h.positionScreen.y);
      t.closePath();
      if (j instanceof THREE.LineBasicMaterial) {
        b = j.linewidth;
        if (I != b) t.lineWidth = I = b;
        b = j.linecap;
        if (J != b) t.lineCap = J = b;
        b = j.linejoin;
        if (C != b) t.lineJoin = C = b;
        f(j.color.getContextStyle());
        t.stroke();
        aa.inflate(j.linewidth * 2);
      }
    }
    function A(b, f, h, g, k, u, o, t, ka) {
      j.data.vertices += 3;
      j.data.faces++;
      c(t.opacity);
      e(t.blending);
      K = b.positionScreen.x;
      Q = b.positionScreen.y;
      n = f.positionScreen.x;
      T = f.positionScreen.y;
      X = h.positionScreen.x;
      M = h.positionScreen.y;
      D(K, Q, n, T, X, M);
      if (t instanceof THREE.MeshBasicMaterial)
        if (t.map)
          t.map.mapping instanceof THREE.UVMapping &&
            ((la = o.uvs[0]),
            Za(
              K,
              Q,
              n,
              T,
              X,
              M,
              la[g].u,
              la[g].v,
              la[k].u,
              la[k].v,
              la[u].u,
              la[u].v,
              t.map
            ));
        else if (t.envMap) {
          if (t.envMap.mapping instanceof THREE.SphericalReflectionMapping)
            (b = m.matrixWorldInverse),
              sa.copy(o.vertexNormalsWorld[0]),
              (ma = (sa.x * b.n11 + sa.y * b.n12 + sa.z * b.n13) * 0.5 + 0.5),
              (Fa = -(sa.x * b.n21 + sa.y * b.n22 + sa.z * b.n23) * 0.5 + 0.5),
              sa.copy(o.vertexNormalsWorld[1]),
              (ya = (sa.x * b.n11 + sa.y * b.n12 + sa.z * b.n13) * 0.5 + 0.5),
              (Ia = -(sa.x * b.n21 + sa.y * b.n22 + sa.z * b.n23) * 0.5 + 0.5),
              sa.copy(o.vertexNormalsWorld[2]),
              (Ja = (sa.x * b.n11 + sa.y * b.n12 + sa.z * b.n13) * 0.5 + 0.5),
              (Ta = -(sa.x * b.n21 + sa.y * b.n22 + sa.z * b.n23) * 0.5 + 0.5),
              Za(K, Q, n, T, X, M, ma, Fa, ya, Ia, Ja, Ta, t.envMap);
        } else
          t.wireframe
            ? Ka(
                t.color,
                t.wireframeLinewidth,
                t.wireframeLinecap,
                t.wireframeLinejoin
              )
            : La(t.color);
      else if (t instanceof THREE.MeshLambertMaterial)
        t.map &&
          !t.wireframe &&
          (t.map.mapping instanceof THREE.UVMapping &&
            ((la = o.uvs[0]),
            Za(
              K,
              Q,
              n,
              T,
              X,
              M,
              la[g].u,
              la[g].v,
              la[k].u,
              la[k].v,
              la[u].u,
              la[u].v,
              t.map
            )),
          e(THREE.SubtractiveBlending)),
          xa
            ? !t.wireframe &&
              t.shading == THREE.SmoothShading &&
              o.vertexNormalsWorld.length == 3
              ? ((P.r = ea.r = Z.r = oa.r),
                (P.g = ea.g = Z.g = oa.g),
                (P.b = ea.b = Z.b = oa.b),
                p(ka, o.v1.positionWorld, o.vertexNormalsWorld[0], P),
                p(ka, o.v2.positionWorld, o.vertexNormalsWorld[1], ea),
                p(ka, o.v3.positionWorld, o.vertexNormalsWorld[2], Z),
                (da.r = (ea.r + Z.r) * 0.5),
                (da.g = (ea.g + Z.g) * 0.5),
                (da.b = (ea.b + Z.b) * 0.5),
                (pa = Xa(P, ea, Z, da)),
                Ua(K, Q, n, T, X, M, 0, 0, 1, 0, 0, 1, pa))
              : ((va.r = oa.r),
                (va.g = oa.g),
                (va.b = oa.b),
                p(ka, o.centroidWorld, o.normalWorld, va),
                (Y.r = Math.max(0, Math.min(t.color.r * va.r, 1))),
                (Y.g = Math.max(0, Math.min(t.color.g * va.g, 1))),
                (Y.b = Math.max(0, Math.min(t.color.b * va.b, 1))),
                t.wireframe
                  ? Ka(
                      Y,
                      t.wireframeLinewidth,
                      t.wireframeLinecap,
                      t.wireframeLinejoin
                    )
                  : La(Y))
            : t.wireframe
            ? Ka(
                t.color,
                t.wireframeLinewidth,
                t.wireframeLinecap,
                t.wireframeLinejoin
              )
            : La(t.color);
      else if (t instanceof THREE.MeshDepthMaterial)
        (U = m.near),
          (ja = m.far),
          (P.r = P.g = P.b = 1 - Oa(b.positionScreen.z, U, ja)),
          (ea.r = ea.g = ea.b = 1 - Oa(f.positionScreen.z, U, ja)),
          (Z.r = Z.g = Z.b = 1 - Oa(h.positionScreen.z, U, ja)),
          (da.r = (ea.r + Z.r) * 0.5),
          (da.g = (ea.g + Z.g) * 0.5),
          (da.b = (ea.b + Z.b) * 0.5),
          (pa = Xa(P, ea, Z, da)),
          Ua(K, Q, n, T, X, M, 0, 0, 1, 0, 0, 1, pa);
      else if (t instanceof THREE.MeshNormalMaterial)
        (Y.r = Va(o.normalWorld.x)),
          (Y.g = Va(o.normalWorld.y)),
          (Y.b = Va(o.normalWorld.z)),
          t.wireframe
            ? Ka(
                Y,
                t.wireframeLinewidth,
                t.wireframeLinecap,
                t.wireframeLinejoin
              )
            : La(Y);
    }
    function y(b, f, h, g, k, u, o, t, ka) {
      j.data.vertices += 4;
      j.data.faces++;
      c(t.opacity);
      e(t.blending);
      if (t.map || t.envMap)
        A(b, f, g, 0, 1, 3, o, t, ka), A(k, h, u, 1, 2, 3, o, t, ka);
      else if (
        ((K = b.positionScreen.x),
        (Q = b.positionScreen.y),
        (n = f.positionScreen.x),
        (T = f.positionScreen.y),
        (X = h.positionScreen.x),
        (M = h.positionScreen.y),
        (W = g.positionScreen.x),
        (ha = g.positionScreen.y),
        (ca = k.positionScreen.x),
        (fa = k.positionScreen.y),
        (ga = u.positionScreen.x),
        ($ = u.positionScreen.y),
        t instanceof THREE.MeshBasicMaterial)
      )
        G(K, Q, n, T, X, M, W, ha),
          t.wireframe
            ? Ka(
                t.color,
                t.wireframeLinewidth,
                t.wireframeLinecap,
                t.wireframeLinejoin
              )
            : La(t.color);
      else if (t instanceof THREE.MeshLambertMaterial)
        xa
          ? !t.wireframe &&
            t.shading == THREE.SmoothShading &&
            o.vertexNormalsWorld.length == 4
            ? ((P.r = ea.r = Z.r = da.r = oa.r),
              (P.g = ea.g = Z.g = da.g = oa.g),
              (P.b = ea.b = Z.b = da.b = oa.b),
              p(ka, o.v1.positionWorld, o.vertexNormalsWorld[0], P),
              p(ka, o.v2.positionWorld, o.vertexNormalsWorld[1], ea),
              p(ka, o.v4.positionWorld, o.vertexNormalsWorld[3], Z),
              p(ka, o.v3.positionWorld, o.vertexNormalsWorld[2], da),
              (pa = Xa(P, ea, Z, da)),
              D(K, Q, n, T, W, ha),
              Ua(K, Q, n, T, W, ha, 0, 0, 1, 0, 0, 1, pa),
              D(ca, fa, X, M, ga, $),
              Ua(ca, fa, X, M, ga, $, 1, 0, 1, 1, 0, 1, pa))
            : ((va.r = oa.r),
              (va.g = oa.g),
              (va.b = oa.b),
              p(ka, o.centroidWorld, o.normalWorld, va),
              (Y.r = Math.max(0, Math.min(t.color.r * va.r, 1))),
              (Y.g = Math.max(0, Math.min(t.color.g * va.g, 1))),
              (Y.b = Math.max(0, Math.min(t.color.b * va.b, 1))),
              G(K, Q, n, T, X, M, W, ha),
              t.wireframe
                ? Ka(
                    Y,
                    t.wireframeLinewidth,
                    t.wireframeLinecap,
                    t.wireframeLinejoin
                  )
                : La(Y))
          : (G(K, Q, n, T, X, M, W, ha),
            t.wireframe
              ? Ka(
                  t.color,
                  t.wireframeLinewidth,
                  t.wireframeLinecap,
                  t.wireframeLinejoin
                )
              : La(t.color));
      else if (t instanceof THREE.MeshNormalMaterial)
        (Y.r = Va(o.normalWorld.x)),
          (Y.g = Va(o.normalWorld.y)),
          (Y.b = Va(o.normalWorld.z)),
          G(K, Q, n, T, X, M, W, ha),
          t.wireframe
            ? Ka(
                Y,
                t.wireframeLinewidth,
                t.wireframeLinecap,
                t.wireframeLinejoin
              )
            : La(Y);
      else if (t instanceof THREE.MeshDepthMaterial)
        (U = m.near),
          (ja = m.far),
          (P.r = P.g = P.b = 1 - Oa(b.positionScreen.z, U, ja)),
          (ea.r = ea.g = ea.b = 1 - Oa(f.positionScreen.z, U, ja)),
          (Z.r = Z.g = Z.b = 1 - Oa(g.positionScreen.z, U, ja)),
          (da.r = da.g = da.b = 1 - Oa(h.positionScreen.z, U, ja)),
          (pa = Xa(P, ea, Z, da)),
          D(K, Q, n, T, W, ha),
          Ua(K, Q, n, T, W, ha, 0, 0, 1, 0, 0, 1, pa),
          D(ca, fa, X, M, ga, $),
          Ua(ca, fa, X, M, ga, $, 1, 0, 1, 1, 0, 1, pa);
    }
    function D(b, c, e, f, h, g) {
      t.beginPath();
      t.moveTo(b, c);
      t.lineTo(e, f);
      t.lineTo(h, g);
      t.lineTo(b, c);
      t.closePath();
    }
    function G(b, c, e, f, h, g, j, k) {
      t.beginPath();
      t.moveTo(b, c);
      t.lineTo(e, f);
      t.lineTo(h, g);
      t.lineTo(j, k);
      t.lineTo(b, c);
      t.closePath();
    }
    function Ka(b, c, e, h) {
      if (I != c) t.lineWidth = I = c;
      if (J != e) t.lineCap = J = e;
      if (C != h) t.lineJoin = C = h;
      f(b.getContextStyle());
      t.stroke();
      aa.inflate(c * 2);
    }
    function La(b) {
      g(b.getContextStyle());
      t.fill();
    }
    function Za(b, c, e, f, h, j, k, n, m, o, u, p, ka) {
      if (ka.image.width != 0) {
        if (ka.needsUpdate == !0 || ia[ka.id] == void 0) {
          var v = ka.wrapS == THREE.RepeatWrapping,
            Ba = ka.wrapT == THREE.RepeatWrapping;
          ia[ka.id] = t.createPattern(
            ka.image,
            v && Ba
              ? "repeat"
              : v && !Ba
              ? "repeat-x"
              : !v && Ba
              ? "repeat-y"
              : "no-repeat"
          );
          ka.needsUpdate = !1;
        }
        g(ia[ka.id]);
        var v = ka.offset.x / ka.repeat.x,
          Ba = ka.offset.y / ka.repeat.y,
          x = (ka.image.width - 1) * ka.repeat.x,
          ka = (ka.image.height - 1) * ka.repeat.y,
          k = (k + v) * x,
          n = (n + Ba) * ka,
          m = (m + v) * x,
          o = (o + Ba) * ka,
          u = (u + v) * x,
          p = (p + Ba) * ka;
        e -= b;
        f -= c;
        h -= b;
        j -= c;
        m -= k;
        o -= n;
        u -= k;
        p -= n;
        v = 1 / (m * p - u * o);
        ka = (p * e - o * h) * v;
        o = (p * f - o * j) * v;
        e = (m * h - u * e) * v;
        f = (m * j - u * f) * v;
        b = b - ka * k - e * n;
        c = c - o * k - f * n;
        t.save();
        t.transform(ka, o, e, f, b, c);
        t.fill();
        t.restore();
      }
    }
    function Ua(b, c, e, f, h, g, j, k, n, m, o, u, ka) {
      var p, v;
      p = ka.width - 1;
      v = ka.height - 1;
      j *= p;
      k *= v;
      n *= p;
      m *= v;
      o *= p;
      u *= v;
      e -= b;
      f -= c;
      h -= b;
      g -= c;
      n -= j;
      m -= k;
      o -= j;
      u -= k;
      v = 1 / (n * u - o * m);
      p = (u * e - m * h) * v;
      m = (u * f - m * g) * v;
      e = (n * h - o * e) * v;
      f = (n * g - o * f) * v;
      b = b - p * j - e * k;
      c = c - m * j - f * k;
      t.save();
      t.transform(p, m, e, f, b, c);
      t.clip();
      t.drawImage(ka, 0, 0);
      t.restore();
    }
    function Xa(b, c, e, f) {
      var h = ~~(b.r * 255),
        g = ~~(b.g * 255),
        b = ~~(b.b * 255),
        j = ~~(c.r * 255),
        k = ~~(c.g * 255),
        c = ~~(c.b * 255),
        n = ~~(e.r * 255),
        m = ~~(e.g * 255),
        e = ~~(e.b * 255),
        t = ~~(f.r * 255),
        o = ~~(f.g * 255),
        f = ~~(f.b * 255);
      za[0] = h < 0 ? 0 : h > 255 ? 255 : h;
      za[1] = g < 0 ? 0 : g > 255 ? 255 : g;
      za[2] = b < 0 ? 0 : b > 255 ? 255 : b;
      za[4] = j < 0 ? 0 : j > 255 ? 255 : j;
      za[5] = k < 0 ? 0 : k > 255 ? 255 : k;
      za[6] = c < 0 ? 0 : c > 255 ? 255 : c;
      za[8] = n < 0 ? 0 : n > 255 ? 255 : n;
      za[9] = m < 0 ? 0 : m > 255 ? 255 : m;
      za[10] = e < 0 ? 0 : e > 255 ? 255 : e;
      za[12] = t < 0 ? 0 : t > 255 ? 255 : t;
      za[13] = o < 0 ? 0 : o > 255 ? 255 : o;
      za[14] = f < 0 ? 0 : f > 255 ? 255 : f;
      Aa.putImageData(ka, 0, 0);
      Ba.drawImage(R, 0, 0);
      return Wa;
    }
    function Oa(b, c, e) {
      b = (b - c) / (e - c);
      return b * b * (3 - 2 * b);
    }
    function Va(b) {
      b = (b + 1) * 0.5;
      return b < 0 ? 0 : b > 1 ? 1 : b;
    }
    function Ma(b, c) {
      var e = c.x - b.x,
        f = c.y - b.y,
        h = e * e + f * f;
      h != 0 &&
        ((h = 1 / Math.sqrt(h)),
        (e *= h),
        (f *= h),
        (c.x += e),
        (c.y += f),
        (b.x -= e),
        (b.y -= f));
    }
    var Ya, $a, qa, Ca, Na, F, z, N;
    this.autoClear ? this.clear() : t.setTransform(1, 0, 0, -1, u, v);
    j.data.vertices = 0;
    j.data.faces = 0;
    h = k.projectScene(b, m, this.sortElements);
    (xa = b.lights.length > 0) && o(b);
    Ya = 0;
    for ($a = h.length; Ya < $a; Ya++) {
      qa = h[Ya];
      aa.empty();
      if (qa instanceof THREE.RenderableParticle) {
        B = qa;
        B.x *= u;
        B.y *= v;
        Ca = 0;
        for (Na = qa.materials.length; Ca < Na; )
          (N = qa.materials[Ca++]), N.opacity != 0 && x(B, qa, N, b);
      } else if (qa instanceof THREE.RenderableLine) {
        if (
          ((B = qa.v1),
          (L = qa.v2),
          (B.positionScreen.x *= u),
          (B.positionScreen.y *= v),
          (L.positionScreen.x *= u),
          (L.positionScreen.y *= v),
          aa.addPoint(B.positionScreen.x, B.positionScreen.y),
          aa.addPoint(L.positionScreen.x, L.positionScreen.y),
          ra.instersects(aa))
        ) {
          Ca = 0;
          for (Na = qa.materials.length; Ca < Na; )
            (N = qa.materials[Ca++]), N.opacity != 0 && w(B, L, qa, N, b);
        }
      } else if (qa instanceof THREE.RenderableFace3) {
        if (
          ((B = qa.v1),
          (L = qa.v2),
          (E = qa.v3),
          (B.positionScreen.x *= u),
          (B.positionScreen.y *= v),
          (L.positionScreen.x *= u),
          (L.positionScreen.y *= v),
          (E.positionScreen.x *= u),
          (E.positionScreen.y *= v),
          qa.overdraw &&
            (Ma(B.positionScreen, L.positionScreen),
            Ma(L.positionScreen, E.positionScreen),
            Ma(E.positionScreen, B.positionScreen)),
          aa.add3Points(
            B.positionScreen.x,
            B.positionScreen.y,
            L.positionScreen.x,
            L.positionScreen.y,
            E.positionScreen.x,
            E.positionScreen.y
          ),
          ra.instersects(aa))
        ) {
          Ca = 0;
          for (Na = qa.meshMaterials.length; Ca < Na; )
            if (
              ((N = qa.meshMaterials[Ca++]),
              N instanceof THREE.MeshFaceMaterial)
            ) {
              F = 0;
              for (z = qa.faceMaterials.length; F < z; )
                (N = qa.faceMaterials[F++]) &&
                  N.opacity != 0 &&
                  A(B, L, E, 0, 1, 2, qa, N, b);
            } else N.opacity != 0 && A(B, L, E, 0, 1, 2, qa, N, b);
        }
      } else if (
        qa instanceof THREE.RenderableFace4 &&
        ((B = qa.v1),
        (L = qa.v2),
        (E = qa.v3),
        (V = qa.v4),
        (B.positionScreen.x *= u),
        (B.positionScreen.y *= v),
        (L.positionScreen.x *= u),
        (L.positionScreen.y *= v),
        (E.positionScreen.x *= u),
        (E.positionScreen.y *= v),
        (V.positionScreen.x *= u),
        (V.positionScreen.y *= v),
        H.positionScreen.copy(L.positionScreen),
        S.positionScreen.copy(V.positionScreen),
        qa.overdraw &&
          (Ma(B.positionScreen, L.positionScreen),
          Ma(L.positionScreen, V.positionScreen),
          Ma(V.positionScreen, B.positionScreen),
          Ma(E.positionScreen, H.positionScreen),
          Ma(E.positionScreen, S.positionScreen)),
        aa.addPoint(B.positionScreen.x, B.positionScreen.y),
        aa.addPoint(L.positionScreen.x, L.positionScreen.y),
        aa.addPoint(E.positionScreen.x, E.positionScreen.y),
        aa.addPoint(V.positionScreen.x, V.positionScreen.y),
        ra.instersects(aa))
      ) {
        Ca = 0;
        for (Na = qa.meshMaterials.length; Ca < Na; )
          if (
            ((N = qa.meshMaterials[Ca++]), N instanceof THREE.MeshFaceMaterial)
          ) {
            F = 0;
            for (z = qa.faceMaterials.length; F < z; )
              (N = qa.faceMaterials[F++]) &&
                N.opacity != 0 &&
                y(B, L, E, V, H, S, qa, N, b);
          } else N.opacity != 0 && y(B, L, E, V, H, S, qa, N, b);
      }
      na.addRectangle(aa);
    }
    t.setTransform(1, 0, 0, 1, 0, 0);
  };
};
THREE.SVGRenderer = function () {
  function b(b, c, e) {
    var f, h, g, j;
    f = 0;
    for (h = b.lights.length; f < h; f++)
      (g = b.lights[f]),
        g instanceof THREE.DirectionalLight
          ? ((j = c.normalWorld.dot(g.position) * g.intensity),
            j > 0 &&
              ((e.r += g.color.r * j),
              (e.g += g.color.g * j),
              (e.b += g.color.b * j)))
          : g instanceof THREE.PointLight &&
            (V.sub(g.position, c.centroidWorld),
            V.normalize(),
            (j = c.normalWorld.dot(V) * g.intensity),
            j > 0 &&
              ((e.r += g.color.r * j),
              (e.g += g.color.g * j),
              (e.b += g.color.b * j)));
  }
  function c(c, e, h, k, n, t) {
    j.data.vertices += 3;
    j.data.faces++;
    K = f(Q++);
    K.setAttribute(
      "d",
      "M " +
        c.positionScreen.x +
        " " +
        c.positionScreen.y +
        " L " +
        e.positionScreen.x +
        " " +
        e.positionScreen.y +
        " L " +
        h.positionScreen.x +
        "," +
        h.positionScreen.y +
        "z"
    );
    n instanceof THREE.MeshBasicMaterial
      ? I.copy(n.color)
      : n instanceof THREE.MeshLambertMaterial
      ? D
        ? ((J.r = C.r),
          (J.g = C.g),
          (J.b = C.b),
          b(t, k, J),
          (I.r = Math.max(0, Math.min(n.color.r * J.r, 1))),
          (I.g = Math.max(0, Math.min(n.color.g * J.g, 1))),
          (I.b = Math.max(0, Math.min(n.color.b * J.b, 1))))
        : I.copy(n.color)
      : n instanceof THREE.MeshDepthMaterial
      ? ((E = 1 - n.__2near / (n.__farPlusNear - k.z * n.__farMinusNear)),
        I.setRGB(E, E, E))
      : n instanceof THREE.MeshNormalMaterial &&
        I.setRGB(g(k.normalWorld.x), g(k.normalWorld.y), g(k.normalWorld.z));
    n.wireframe
      ? K.setAttribute(
          "style",
          "fill: none; stroke: " +
            I.getContextStyle() +
            "; stroke-width: " +
            n.wireframeLinewidth +
            "; stroke-opacity: " +
            n.opacity +
            "; stroke-linecap: " +
            n.wireframeLinecap +
            "; stroke-linejoin: " +
            n.wireframeLinejoin
        )
      : K.setAttribute(
          "style",
          "fill: " + I.getContextStyle() + "; fill-opacity: " + n.opacity
        );
    m.appendChild(K);
  }
  function e(c, e, h, k, n, t, o) {
    j.data.vertices += 4;
    j.data.faces++;
    K = f(Q++);
    K.setAttribute(
      "d",
      "M " +
        c.positionScreen.x +
        " " +
        c.positionScreen.y +
        " L " +
        e.positionScreen.x +
        " " +
        e.positionScreen.y +
        " L " +
        h.positionScreen.x +
        "," +
        h.positionScreen.y +
        " L " +
        k.positionScreen.x +
        "," +
        k.positionScreen.y +
        "z"
    );
    t instanceof THREE.MeshBasicMaterial
      ? I.copy(t.color)
      : t instanceof THREE.MeshLambertMaterial
      ? D
        ? ((J.r = C.r),
          (J.g = C.g),
          (J.b = C.b),
          b(o, n, J),
          (I.r = Math.max(0, Math.min(t.color.r * J.r, 1))),
          (I.g = Math.max(0, Math.min(t.color.g * J.g, 1))),
          (I.b = Math.max(0, Math.min(t.color.b * J.b, 1))))
        : I.copy(t.color)
      : t instanceof THREE.MeshDepthMaterial
      ? ((E = 1 - t.__2near / (t.__farPlusNear - n.z * t.__farMinusNear)),
        I.setRGB(E, E, E))
      : t instanceof THREE.MeshNormalMaterial &&
        I.setRGB(g(n.normalWorld.x), g(n.normalWorld.y), g(n.normalWorld.z));
    t.wireframe
      ? K.setAttribute(
          "style",
          "fill: none; stroke: " +
            I.getContextStyle() +
            "; stroke-width: " +
            t.wireframeLinewidth +
            "; stroke-opacity: " +
            t.opacity +
            "; stroke-linecap: " +
            t.wireframeLinecap +
            "; stroke-linejoin: " +
            t.wireframeLinejoin
        )
      : K.setAttribute(
          "style",
          "fill: " + I.getContextStyle() + "; fill-opacity: " + t.opacity
        );
    m.appendChild(K);
  }
  function f(b) {
    H[b] == null &&
      ((H[b] = document.createElementNS("http://www.w3.org/2000/svg", "path")),
      T == 0 && H[b].setAttribute("shape-rendering", "crispEdges"));
    return H[b];
  }
  function g(b) {
    b = (b + 1) * 0.5;
    return b < 0 ? 0 : b > 1 ? 1 : b;
  }
  var j = this,
    h = null,
    k = new THREE.Projector(),
    m = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
    o,
    p,
    u,
    v,
    t,
    x,
    w,
    A,
    y = new THREE.Rectangle(),
    G = new THREE.Rectangle(),
    D = !1,
    I = new THREE.Color(16777215),
    J = new THREE.Color(16777215),
    C = new THREE.Color(0),
    B = new THREE.Color(0),
    L = new THREE.Color(0),
    E,
    V = new THREE.Vector3(),
    H = [],
    S = [],
    K,
    Q,
    n,
    T = 1;
  this.domElement = m;
  this.sortElements = this.sortObjects = this.autoClear = !0;
  this.data = { vertices: 0, faces: 0 };
  this.setQuality = function (b) {
    switch (b) {
      case "high":
        T = 1;
        break;
      case "low":
        T = 0;
    }
  };
  this.setSize = function (b, c) {
    o = b;
    p = c;
    u = o / 2;
    v = p / 2;
    m.setAttribute("viewBox", -u + " " + -v + " " + o + " " + p);
    m.setAttribute("width", o);
    m.setAttribute("height", p);
    y.set(-u, -v, u, v);
  };
  this.clear = function () {
    for (; m.childNodes.length > 0; ) m.removeChild(m.childNodes[0]);
  };
  this.render = function (b, f) {
    var g, o, p, I, J, H, E, P;
    this.autoClear && this.clear();
    j.data.vertices = 0;
    j.data.faces = 0;
    h = k.projectScene(b, f, this.sortElements);
    n = Q = 0;
    if ((D = b.lights.length > 0)) {
      E = b.lights;
      C.setRGB(0, 0, 0);
      B.setRGB(0, 0, 0);
      L.setRGB(0, 0, 0);
      g = 0;
      for (o = E.length; g < o; g++)
        (p = E[g]),
          (I = p.color),
          p instanceof THREE.AmbientLight
            ? ((C.r += I.r), (C.g += I.g), (C.b += I.b))
            : p instanceof THREE.DirectionalLight
            ? ((B.r += I.r), (B.g += I.g), (B.b += I.b))
            : p instanceof THREE.PointLight &&
              ((L.r += I.r), (L.g += I.g), (L.b += I.b));
    }
    g = 0;
    for (o = h.length; g < o; g++)
      if (((E = h[g]), G.empty(), E instanceof THREE.RenderableParticle)) {
        t = E;
        t.x *= u;
        t.y *= -v;
        p = 0;
        for (I = E.materials.length; p < I; ) p++;
      } else if (E instanceof THREE.RenderableLine) {
        if (
          ((t = E.v1),
          (x = E.v2),
          (t.positionScreen.x *= u),
          (t.positionScreen.y *= -v),
          (x.positionScreen.x *= u),
          (x.positionScreen.y *= -v),
          G.addPoint(t.positionScreen.x, t.positionScreen.y),
          G.addPoint(x.positionScreen.x, x.positionScreen.y),
          y.instersects(G))
        ) {
          p = 0;
          for (I = E.materials.length; p < I; )
            if ((P = E.materials[p++]) && P.opacity != 0) {
              J = t;
              H = x;
              var ea = n++;
              S[ea] == null &&
                ((S[ea] = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "line"
                )),
                T == 0 && S[ea].setAttribute("shape-rendering", "crispEdges"));
              K = S[ea];
              K.setAttribute("x1", J.positionScreen.x);
              K.setAttribute("y1", J.positionScreen.y);
              K.setAttribute("x2", H.positionScreen.x);
              K.setAttribute("y2", H.positionScreen.y);
              P instanceof THREE.LineBasicMaterial &&
                (K.setAttribute(
                  "style",
                  "fill: none; stroke: " +
                    P.color.getContextStyle() +
                    "; stroke-width: " +
                    P.linewidth +
                    "; stroke-opacity: " +
                    P.opacity +
                    "; stroke-linecap: " +
                    P.linecap +
                    "; stroke-linejoin: " +
                    P.linejoin
                ),
                m.appendChild(K));
            }
        }
      } else if (E instanceof THREE.RenderableFace3) {
        if (
          ((t = E.v1),
          (x = E.v2),
          (w = E.v3),
          (t.positionScreen.x *= u),
          (t.positionScreen.y *= -v),
          (x.positionScreen.x *= u),
          (x.positionScreen.y *= -v),
          (w.positionScreen.x *= u),
          (w.positionScreen.y *= -v),
          G.addPoint(t.positionScreen.x, t.positionScreen.y),
          G.addPoint(x.positionScreen.x, x.positionScreen.y),
          G.addPoint(w.positionScreen.x, w.positionScreen.y),
          y.instersects(G))
        ) {
          p = 0;
          for (I = E.meshMaterials.length; p < I; )
            if (
              ((P = E.meshMaterials[p++]), P instanceof THREE.MeshFaceMaterial)
            ) {
              J = 0;
              for (H = E.faceMaterials.length; J < H; )
                (P = E.faceMaterials[J++]) &&
                  P.opacity != 0 &&
                  c(t, x, w, E, P, b);
            } else P && P.opacity != 0 && c(t, x, w, E, P, b);
        }
      } else if (
        E instanceof THREE.RenderableFace4 &&
        ((t = E.v1),
        (x = E.v2),
        (w = E.v3),
        (A = E.v4),
        (t.positionScreen.x *= u),
        (t.positionScreen.y *= -v),
        (x.positionScreen.x *= u),
        (x.positionScreen.y *= -v),
        (w.positionScreen.x *= u),
        (w.positionScreen.y *= -v),
        (A.positionScreen.x *= u),
        (A.positionScreen.y *= -v),
        G.addPoint(t.positionScreen.x, t.positionScreen.y),
        G.addPoint(x.positionScreen.x, x.positionScreen.y),
        G.addPoint(w.positionScreen.x, w.positionScreen.y),
        G.addPoint(A.positionScreen.x, A.positionScreen.y),
        y.instersects(G))
      ) {
        p = 0;
        for (I = E.meshMaterials.length; p < I; )
          if (
            ((P = E.meshMaterials[p++]), P instanceof THREE.MeshFaceMaterial)
          ) {
            J = 0;
            for (H = E.faceMaterials.length; J < H; )
              (P = E.faceMaterials[J++]) &&
                P.opacity != 0 &&
                e(t, x, w, A, E, P, b);
          } else P && P.opacity != 0 && e(t, x, w, A, E, P, b);
      }
  };
};
THREE.ShaderChunk = {
  fog_pars_fragment:
    "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
  fog_fragment:
    "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
  envmap_pars_fragment:
    "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",
  envmap_fragment:
    "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",
  envmap_pars_vertex:
    "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
  envmap_vertex:
    "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
  map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_particle_fragment:
    "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
  map_pars_vertex:
    "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
  map_pars_fragment:
    "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
  map_vertex:
    "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
  map_fragment:
    "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",
  lightmap_pars_fragment:
    "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
  lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
  lightmap_fragment:
    "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
  lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
  lights_pars_vertex:
    "uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
  lights_vertex:
    "if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
  lights_pars_fragment:
    "#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
  lights_fragment:
    "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( vec3( 0.0 ), 1.0 );\nvec4 pointSpecular = vec4( vec3( 0.0 ), 1.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + viewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( vec3( 0.0 ), 1.0 );\nvec4 dirSpecular = vec4( vec3( 0.0 ), 1.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + viewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
  color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_fragment:
    "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
  color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_vertex: "#ifdef USE_COLOR\nvColor = color;\n#endif",
  skinning_pars_vertex:
    "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
  skinning_vertex:
    "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
  morphtarget_pars_vertex:
    "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
  morphtarget_vertex:
    "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
  default_vertex:
    "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
  shadowmap_pars_fragment:
    "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform float shadowDarkness;\nuniform float shadowBias;\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
  shadowmap_fragment:
    "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_SOFT\nconst float xPixelOffset = 1.0 / SHADOWMAP_WIDTH;\nconst float yPixelOffset = 1.0 / SHADOWMAP_HEIGHT;\n#endif\nvec4 shadowColor = vec4( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nif ( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nfor ( float y = -1.25; y <= 1.25; y += 1.25 )\nfor ( float x = -1.25; x <= 1.25; x += 1.25 ) {\nvec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < ( shadowCoord.z + shadowBias ) )\nshadow += 1.0;\n}\nshadow /= 9.0;\nshadowColor = shadowColor * vec4( vec3( ( 1.0 - shadowDarkness * shadow ) ), 1.0 );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < ( shadowCoord.z + shadowBias ) )\nshadowColor = shadowColor * vec4( vec3( shadowDarkness ), 1.0 );\n#endif\n}\n}\ngl_FragColor = gl_FragColor * shadowColor;\n#endif",
  shadowmap_pars_vertex:
    "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
  shadowmap_vertex:
    "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n}\n#endif",
  alphatest_fragment:
    "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
};
THREE.UniformsUtils = {
  merge: function (b) {
    var c,
      e,
      f,
      g = {};
    for (c = 0; c < b.length; c++)
      for (e in ((f = this.clone(b[c])), f)) g[e] = f[e];
    return g;
  },
  clone: function (b) {
    var c,
      e,
      f,
      g = {};
    for (c in b)
      for (e in ((g[c] = {}), b[c]))
        (f = b[c][e]),
          (g[c][e] =
            f instanceof THREE.Color ||
            f instanceof THREE.Vector2 ||
            f instanceof THREE.Vector3 ||
            f instanceof THREE.Vector4 ||
            f instanceof THREE.Matrix4 ||
            f instanceof THREE.Texture
              ? f.clone()
              : f instanceof Array
              ? f.slice()
              : f);
    return g;
  },
};
THREE.UniformsLib = {
  common: {
    diffuse: { type: "c", value: new THREE.Color(15658734) },
    opacity: { type: "f", value: 1 },
    map: { type: "t", value: 0, texture: null },
    offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
    lightMap: { type: "t", value: 2, texture: null },
    envMap: { type: "t", value: 1, texture: null },
    useRefract: { type: "i", value: 0 },
    reflectivity: { type: "f", value: 1 },
    refractionRatio: { type: "f", value: 0.98 },
    combine: { type: "i", value: 0 },
    morphTargetInfluences: { type: "f", value: 0 },
  },
  fog: {
    fogDensity: { type: "f", value: 2.5e-4 },
    fogNear: { type: "f", value: 1 },
    fogFar: { type: "f", value: 2e3 },
    fogColor: { type: "c", value: new THREE.Color(16777215) },
  },
  lights: {
    enableLighting: { type: "i", value: 1 },
    ambientLightColor: { type: "fv", value: [] },
    directionalLightDirection: { type: "fv", value: [] },
    directionalLightColor: { type: "fv", value: [] },
    pointLightColor: { type: "fv", value: [] },
    pointLightPosition: { type: "fv", value: [] },
    pointLightDistance: { type: "fv1", value: [] },
  },
  particle: {
    psColor: { type: "c", value: new THREE.Color(15658734) },
    opacity: { type: "f", value: 1 },
    size: { type: "f", value: 1 },
    scale: { type: "f", value: 1 },
    map: { type: "t", value: 0, texture: null },
    fogDensity: { type: "f", value: 2.5e-4 },
    fogNear: { type: "f", value: 1 },
    fogFar: { type: "f", value: 2e3 },
    fogColor: { type: "c", value: new THREE.Color(16777215) },
  },
  shadowmap: {
    shadowMap: { type: "tv", value: 3, texture: [] },
    shadowMatrix: { type: "m4v", value: [] },
    shadowBias: { type: "f", value: 0.0039 },
    shadowDarkness: { type: "f", value: 0.2 },
  },
};
THREE.ShaderLib = {
  lensFlareVertexTexture: {
    vertexShader:
      "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 UV;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader:
      "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}",
  },
  lensFlare: {
    vertexShader:
      "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 UV;\nvarying vec2 vUV;\nvoid main() {\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader:
      "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}",
  },
  sprite: {
    vertexShader:
      "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
    fragmentShader:
      "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}",
  },
  shadowPost: {
    vertexShader:
      "uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main() {\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",
    fragmentShader:
      "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main() {\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}",
  },
  shadowVolumeDynamic: {
    uniforms: { directionalLightDirection: { type: "fv", value: [] } },
    vertexShader:
      "uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm ) ), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}",
    fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0 );\n}",
  },
  depth: {
    uniforms: {
      mNear: { type: "f", value: 1 },
      mFar: { type: "f", value: 2e3 },
      opacity: { type: "f", value: 1 },
    },
    fragmentShader:
      "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
    vertexShader:
      "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
  },
  normal: {
    uniforms: { opacity: { type: "f", value: 1 } },
    fragmentShader:
      "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
    vertexShader:
      "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",
  },
  basic: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.shadowmap,
    ]),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
    vertexShader: [
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.color_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
  },
  lambert: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
    ]),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      "gl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
    vertexShader: [
      "varying vec3 vLightWeighting;",
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.lights_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.color_vertex,
      "vec3 transformedNormal = normalize( normalMatrix * normal );",
      THREE.ShaderChunk.lights_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
  },
  phong: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
      {
        ambient: { type: "c", value: new THREE.Color(328965) },
        specular: { type: "c", value: new THREE.Color(1118481) },
        shininess: { type: "f", value: 30 },
      },
    ]),
    fragmentShader: [
      "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment,
      THREE.ShaderChunk.envmap_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.lights_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );",
      THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.lights_fragment,
      THREE.ShaderChunk.lightmap_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
    vertexShader: [
      "#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
      THREE.ShaderChunk.map_pars_vertex,
      THREE.ShaderChunk.lightmap_pars_vertex,
      THREE.ShaderChunk.envmap_pars_vertex,
      THREE.ShaderChunk.lights_pars_vertex,
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex,
      THREE.ShaderChunk.morphtarget_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
      THREE.ShaderChunk.map_vertex,
      THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.envmap_vertex,
      THREE.ShaderChunk.color_vertex,
      "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;",
      THREE.ShaderChunk.lights_vertex,
      THREE.ShaderChunk.skinning_vertex,
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.default_vertex,
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
  },
  particle_basic: {
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.particle,
      THREE.UniformsLib.shadowmap,
    ]),
    fragmentShader: [
      "uniform vec3 psColor;\nuniform float opacity;",
      THREE.ShaderChunk.color_pars_fragment,
      THREE.ShaderChunk.map_particle_pars_fragment,
      THREE.ShaderChunk.fog_pars_fragment,
      THREE.ShaderChunk.shadowmap_pars_fragment,
      "void main() {\ngl_FragColor = vec4( psColor, opacity );",
      THREE.ShaderChunk.map_particle_fragment,
      THREE.ShaderChunk.alphatest_fragment,
      THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.shadowmap_fragment,
      THREE.ShaderChunk.fog_fragment,
      "}",
    ].join("\n"),
    vertexShader: [
      "uniform float size;\nuniform float scale;",
      THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.shadowmap_pars_vertex,
      "void main() {",
      THREE.ShaderChunk.color_vertex,
      "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
      THREE.ShaderChunk.shadowmap_vertex,
      "}",
    ].join("\n"),
  },
  depthRGBA: {
    uniforms: {},
    fragmentShader:
      "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}",
    vertexShader: [
      THREE.ShaderChunk.morphtarget_pars_vertex,
      "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
      THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.default_vertex,
      "}",
    ].join("\n"),
  },
};
THREE.WebGLRenderer = function (b) {
  function c(b, c, e) {
    var f,
      h,
      g,
      j = b.vertices,
      k = j.length,
      t = b.colors,
      m = t.length,
      o = b.__vertexArray,
      u = b.__colorArray,
      p = b.__sortArray,
      v = b.__dirtyVertices,
      x = b.__dirtyColors,
      A = b.__webglCustomAttributes,
      w,
      y;
    if (A) for (w in A) A[w].offset = 0;
    if (e.sortParticles) {
      ja.multiplySelf(e.matrixWorld);
      for (f = 0; f < k; f++)
        (h = j[f].position),
          ma.copy(h),
          ja.multiplyVector3(ma),
          (p[f] = [ma.z, f]);
      p.sort(function (b, c) {
        return c[0] - b[0];
      });
      for (f = 0; f < k; f++)
        (h = j[p[f][1]].position),
          (g = f * 3),
          (o[g] = h.x),
          (o[g + 1] = h.y),
          (o[g + 2] = h.z);
      for (f = 0; f < m; f++)
        (g = f * 3),
          (color = t[p[f][1]]),
          (u[g] = color.r),
          (u[g + 1] = color.g),
          (u[g + 2] = color.b);
      if (A)
        for (w in A) {
          f = A[w];
          t = f.value.length;
          for (g = 0; g < t; g++) {
            index = p[g][1];
            m = f.offset;
            if (f.size === 1) {
              if (f.boundTo === void 0 || f.boundTo === "vertices")
                f.array[m] = f.value[index];
            } else {
              if (f.boundTo === void 0 || f.boundTo === "vertices")
                y = f.value[index];
              f.size === 2
                ? ((f.array[m] = y.x), (f.array[m + 1] = y.y))
                : f.size === 3
                ? f.type === "c"
                  ? ((f.array[m] = y.r),
                    (f.array[m + 1] = y.g),
                    (f.array[m + 2] = y.b))
                  : ((f.array[m] = y.x),
                    (f.array[m + 1] = y.y),
                    (f.array[m + 2] = y.z))
                : ((f.array[m] = y.x),
                  (f.array[m + 1] = y.y),
                  (f.array[m + 2] = y.z),
                  (f.array[m + 3] = y.w));
            }
            f.offset += f.size;
          }
        }
    } else {
      if (v)
        for (f = 0; f < k; f++)
          (h = j[f].position),
            (g = f * 3),
            (o[g] = h.x),
            (o[g + 1] = h.y),
            (o[g + 2] = h.z);
      if (x)
        for (f = 0; f < m; f++)
          (color = t[f]),
            (g = f * 3),
            (u[g] = color.r),
            (u[g + 1] = color.g),
            (u[g + 2] = color.b);
      if (A)
        for (w in A)
          if (((f = A[w]), f.__original.needsUpdate)) {
            t = f.value.length;
            for (g = 0; g < t; g++) {
              m = f.offset;
              if (f.size === 1) {
                if (f.boundTo === void 0 || f.boundTo === "vertices")
                  f.array[m] = f.value[g];
              } else {
                if (f.boundTo === void 0 || f.boundTo === "vertices")
                  y = f.value[g];
                f.size === 2
                  ? ((f.array[m] = y.x), (f.array[m + 1] = y.y))
                  : f.size === 3
                  ? f.type === "c"
                    ? ((f.array[m] = y.r),
                      (f.array[m + 1] = y.g),
                      (f.array[m + 2] = y.b))
                    : ((f.array[m] = y.x),
                      (f.array[m + 1] = y.y),
                      (f.array[m + 2] = y.z))
                  : ((f.array[m] = y.x),
                    (f.array[m + 1] = y.y),
                    (f.array[m + 2] = y.z),
                    (f.array[m + 3] = y.w));
              }
              f.offset += f.size;
            }
          }
    }
    if (v || e.sortParticles)
      n.bindBuffer(n.ARRAY_BUFFER, b.__webglVertexBuffer),
        n.bufferData(n.ARRAY_BUFFER, o, c);
    if (x || e.sortParticles)
      n.bindBuffer(n.ARRAY_BUFFER, b.__webglColorBuffer),
        n.bufferData(n.ARRAY_BUFFER, u, c);
    if (A)
      for (w in A)
        if (((f = A[w]), f.__original.needsUpdate || e.sortParticles))
          n.bindBuffer(n.ARRAY_BUFFER, f.buffer),
            n.bufferData(n.ARRAY_BUFFER, f.array, c);
  }
  function e(b, c, e, f, g) {
    f.program || Q.initMaterial(f, c, e, g);
    if (f.morphTargets && !g.__webglMorphTargetInfluences) {
      g.__webglMorphTargetInfluences = new Float32Array(Q.maxMorphTargets);
      for (var h = 0, j = Q.maxMorphTargets; h < j; h++)
        g.__webglMorphTargetInfluences[h] = 0;
    }
    var h = f.program,
      j = h.uniforms,
      k = f.uniforms;
    h != X && (n.useProgram(h), (X = h));
    n.uniformMatrix4fv(j.projectionMatrix, !1, pa);
    if (
      e &&
      (f instanceof THREE.MeshBasicMaterial ||
        f instanceof THREE.MeshLambertMaterial ||
        f instanceof THREE.MeshPhongMaterial ||
        f instanceof THREE.LineBasicMaterial ||
        f instanceof THREE.ParticleBasicMaterial ||
        f.fog)
    )
      if (((k.fogColor.value = e.color), e instanceof THREE.Fog))
        (k.fogNear.value = e.near), (k.fogFar.value = e.far);
      else if (e instanceof THREE.FogExp2) k.fogDensity.value = e.density;
    if (
      f instanceof THREE.MeshPhongMaterial ||
      f instanceof THREE.MeshLambertMaterial ||
      f.lights
    ) {
      var m,
        t,
        o,
        u = 0,
        p = 0,
        v = 0,
        x,
        y,
        A,
        w = Fa,
        D = w.directional.colors,
        G = w.directional.positions,
        I = w.point.colors,
        U = w.point.positions,
        C = w.point.distances,
        J = 0,
        E = 0,
        e = (t = A = 0);
      for (m = c.length; e < m; e++)
        if (
          ((t = c[e]),
          (o = t.color),
          (x = t.position),
          (y = t.intensity),
          (A = t.distance),
          t instanceof THREE.AmbientLight)
        )
          (u += o.r), (p += o.g), (v += o.b);
        else if (t instanceof THREE.DirectionalLight)
          (A = J * 3),
            (D[A] = o.r * y),
            (D[A + 1] = o.g * y),
            (D[A + 2] = o.b * y),
            (G[A] = x.x),
            (G[A + 1] = x.y),
            (G[A + 2] = x.z),
            (J += 1);
        else if (t instanceof THREE.SpotLight)
          (A = J * 3),
            (D[A] = o.r * y),
            (D[A + 1] = o.g * y),
            (D[A + 2] = o.b * y),
            (o = 1 / x.length()),
            (G[A] = x.x * o),
            (G[A + 1] = x.y * o),
            (G[A + 2] = x.z * o),
            (J += 1);
        else if (t instanceof THREE.PointLight)
          (t = E * 3),
            (I[t] = o.r * y),
            (I[t + 1] = o.g * y),
            (I[t + 2] = o.b * y),
            (U[t] = x.x),
            (U[t + 1] = x.y),
            (U[t + 2] = x.z),
            (C[E] = A),
            (E += 1);
      for (e = J * 3; e < D.length; e++) D[e] = 0;
      for (e = E * 3; e < I.length; e++) I[e] = 0;
      w.point.length = E;
      w.directional.length = J;
      w.ambient[0] = u;
      w.ambient[1] = p;
      w.ambient[2] = v;
      c = Fa;
      k.enableLighting.value = c.directional.length + c.point.length;
      k.ambientLightColor.value = c.ambient;
      k.directionalLightColor.value = c.directional.colors;
      k.directionalLightDirection.value = c.directional.positions;
      k.pointLightColor.value = c.point.colors;
      k.pointLightPosition.value = c.point.positions;
      k.pointLightDistance.value = c.point.distances;
    }
    if (
      f instanceof THREE.MeshBasicMaterial ||
      f instanceof THREE.MeshLambertMaterial ||
      f instanceof THREE.MeshPhongMaterial
    )
      (k.diffuse.value = f.color),
        (k.opacity.value = f.opacity),
        (k.map.texture = f.map) &&
          k.offsetRepeat.value.set(
            f.map.offset.x,
            f.map.offset.y,
            f.map.repeat.x,
            f.map.repeat.y
          ),
        (k.lightMap.texture = f.lightMap),
        (k.envMap.texture = f.envMap),
        (k.reflectivity.value = f.reflectivity),
        (k.refractionRatio.value = f.refractionRatio),
        (k.combine.value = f.combine),
        (k.useRefract.value =
          f.envMap && f.envMap.mapping instanceof THREE.CubeRefractionMapping);
    if (f instanceof THREE.LineBasicMaterial)
      (k.diffuse.value = f.color), (k.opacity.value = f.opacity);
    else if (f instanceof THREE.ParticleBasicMaterial)
      (k.psColor.value = f.color),
        (k.opacity.value = f.opacity),
        (k.size.value = f.size),
        (k.scale.value = ya.height / 2),
        (k.map.texture = f.map);
    else if (f instanceof THREE.MeshPhongMaterial)
      (k.ambient.value = f.ambient),
        (k.specular.value = f.specular),
        (k.shininess.value = f.shininess);
    else if (f instanceof THREE.MeshDepthMaterial)
      (k.mNear.value = b.near),
        (k.mFar.value = b.far),
        (k.opacity.value = f.opacity);
    else if (f instanceof THREE.MeshNormalMaterial) k.opacity.value = f.opacity;
    if (g.receiveShadow && !f._shadowPass && k.shadowMatrix) {
      for (c = 0; c < xa.length; c++)
        (k.shadowMatrix.value[c] = xa[c]),
          (k.shadowMap.texture[c] = Q.shadowMap[c]);
      k.shadowDarkness.value = Q.shadowMapDarkness;
      k.shadowBias.value = Q.shadowMapBias;
    }
    for (var ja in k)
      if ((m = h.uniforms[ja]))
        if (((e = k[ja]), (u = e.type), (c = e.value), u == "i"))
          n.uniform1i(m, c);
        else if (u == "f") n.uniform1f(m, c);
        else if (u == "v2") n.uniform2f(m, c.x, c.y);
        else if (u == "v3") n.uniform3f(m, c.x, c.y, c.z);
        else if (u == "v4") n.uniform4f(m, c.x, c.y, c.z, c.w);
        else if (u == "c") n.uniform3f(m, c.r, c.g, c.b);
        else if (u == "fv1") n.uniform1fv(m, c);
        else if (u == "fv") n.uniform3fv(m, c);
        else if (u == "v3v") {
          if (!e._array) e._array = new Float32Array(3 * c.length);
          u = 0;
          for (p = c.length; u < p; u++)
            (v = u * 3),
              (e._array[v] = c[u].x),
              (e._array[v + 1] = c[u].y),
              (e._array[v + 2] = c[u].z);
          n.uniform3fv(m, e._array);
        } else if (u == "m4") {
          if (!e._array) e._array = new Float32Array(16);
          c.flattenToArray(e._array);
          n.uniformMatrix4fv(m, !1, e._array);
        } else if (u == "m4v") {
          if (!e._array) e._array = new Float32Array(16 * c.length);
          u = 0;
          for (p = c.length; u < p; u++)
            c[u].flattenToArrayOffset(e._array, u * 16);
          n.uniformMatrix4fv(m, !1, e._array);
        } else if (u == "t") {
          if ((n.uniform1i(m, c), (m = e.texture)))
            if (m.image instanceof Array && m.image.length == 6) {
              if (((e = m), e.image.length == 6))
                if (e.needsUpdate) {
                  if (!e.image.__webglTextureCube)
                    e.image.__webglTextureCube = n.createTexture();
                  n.activeTexture(n.TEXTURE0 + c);
                  n.bindTexture(n.TEXTURE_CUBE_MAP, e.image.__webglTextureCube);
                  for (c = 0; c < 6; c++)
                    n.texImage2D(
                      n.TEXTURE_CUBE_MAP_POSITIVE_X + c,
                      0,
                      n.RGBA,
                      n.RGBA,
                      n.UNSIGNED_BYTE,
                      e.image[c]
                    );
                  B(n.TEXTURE_CUBE_MAP, e, e.image[0]);
                  e.needsUpdate = !1;
                } else
                  n.activeTexture(n.TEXTURE0 + c),
                    n.bindTexture(
                      n.TEXTURE_CUBE_MAP,
                      e.image.__webglTextureCube
                    );
            } else
              m instanceof THREE.WebGLRenderTargetCube
                ? ((e = m),
                  n.activeTexture(n.TEXTURE0 + c),
                  n.bindTexture(n.TEXTURE_CUBE_MAP, e.__webglTexture))
                : L(m, c);
        } else if (u == "tv") {
          if (!e._array) {
            e._array = [];
            u = 0;
            for (p = e.texture.length; u < p; u++) e._array[u] = c + u;
          }
          n.uniform1iv(m, e._array);
          u = 0;
          for (p = e.texture.length; u < p; u++)
            (m = e.texture[u]) && L(m, e._array[u]);
        }
    n.uniformMatrix4fv(j.modelViewMatrix, !1, g._modelViewMatrixArray);
    n.uniformMatrix3fv(j.normalMatrix, !1, g._normalMatrixArray);
    (f instanceof THREE.MeshShaderMaterial ||
      f instanceof THREE.MeshPhongMaterial ||
      f.envMap) &&
      j.cameraPosition !== null &&
      n.uniform3f(j.cameraPosition, b.position.x, b.position.y, b.position.z);
    (f instanceof THREE.MeshShaderMaterial ||
      f.envMap ||
      f.skinning ||
      g.receiveShadow) &&
      j.objectMatrix !== null &&
      n.uniformMatrix4fv(j.objectMatrix, !1, g._objectMatrixArray);
    (f instanceof THREE.MeshPhongMaterial ||
      f instanceof THREE.MeshLambertMaterial ||
      f instanceof THREE.MeshShaderMaterial ||
      f.skinning) &&
      j.viewMatrix !== null &&
      n.uniformMatrix4fv(j.viewMatrix, !1, la);
    f.skinning &&
      (n.uniformMatrix4fv(j.cameraInverseMatrix, !1, la),
      n.uniformMatrix4fv(j.boneGlobalMatrices, !1, g.boneMatrices));
    return h;
  }
  function f(b, c, f, g, h, j) {
    if (g.opacity != 0) {
      var k,
        b = e(b, c, f, g, j).attributes;
      if (!g.morphTargets && b.position >= 0)
        n.bindBuffer(n.ARRAY_BUFFER, h.__webglVertexBuffer),
          n.vertexAttribPointer(b.position, 3, n.FLOAT, !1, 0, 0);
      else if (j.morphTargetBase) {
        c = g.program.attributes;
        j.morphTargetBase !== -1
          ? (n.bindBuffer(
              n.ARRAY_BUFFER,
              h.__webglMorphTargetsBuffers[j.morphTargetBase]
            ),
            n.vertexAttribPointer(c.position, 3, n.FLOAT, !1, 0, 0))
          : c.position >= 0 &&
            (n.bindBuffer(n.ARRAY_BUFFER, h.__webglVertexBuffer),
            n.vertexAttribPointer(c.position, 3, n.FLOAT, !1, 0, 0));
        if (j.morphTargetForcedOrder.length)
          for (
            var f = 0,
              m = j.morphTargetForcedOrder,
              t = j.morphTargetInfluences;
            f < g.numSupportedMorphTargets && f < m.length;

          )
            n.bindBuffer(n.ARRAY_BUFFER, h.__webglMorphTargetsBuffers[m[f]]),
              n.vertexAttribPointer(c["morphTarget" + f], 3, n.FLOAT, !1, 0, 0),
              (j.__webglMorphTargetInfluences[f] = t[m[f]]),
              f++;
        else {
          var m = [],
            o = -1,
            u = 0,
            t = j.morphTargetInfluences,
            p,
            v = t.length,
            f = 0;
          for (
            j.morphTargetBase !== -1 && (m[j.morphTargetBase] = !0);
            f < g.numSupportedMorphTargets;

          ) {
            for (p = 0; p < v; p++) !m[p] && t[p] > o && ((u = p), (o = t[u]));
            n.bindBuffer(n.ARRAY_BUFFER, h.__webglMorphTargetsBuffers[u]);
            n.vertexAttribPointer(c["morphTarget" + f], 3, n.FLOAT, !1, 0, 0);
            j.__webglMorphTargetInfluences[f] = o;
            m[u] = 1;
            o = -1;
            f++;
          }
        }
        g.program.uniforms.morphTargetInfluences !== null &&
          n.uniform1fv(
            g.program.uniforms.morphTargetInfluences,
            j.__webglMorphTargetInfluences
          );
      }
      if (h.__webglCustomAttributes)
        for (k in h.__webglCustomAttributes)
          b[k] >= 0 &&
            ((c = h.__webglCustomAttributes[k]),
            n.bindBuffer(n.ARRAY_BUFFER, c.buffer),
            n.vertexAttribPointer(b[k], c.size, n.FLOAT, !1, 0, 0));
      b.color >= 0 &&
        (n.bindBuffer(n.ARRAY_BUFFER, h.__webglColorBuffer),
        n.vertexAttribPointer(b.color, 3, n.FLOAT, !1, 0, 0));
      b.normal >= 0 &&
        (n.bindBuffer(n.ARRAY_BUFFER, h.__webglNormalBuffer),
        n.vertexAttribPointer(b.normal, 3, n.FLOAT, !1, 0, 0));
      b.tangent >= 0 &&
        (n.bindBuffer(n.ARRAY_BUFFER, h.__webglTangentBuffer),
        n.vertexAttribPointer(b.tangent, 4, n.FLOAT, !1, 0, 0));
      b.uv >= 0 &&
        (h.__webglUVBuffer
          ? (n.bindBuffer(n.ARRAY_BUFFER, h.__webglUVBuffer),
            n.vertexAttribPointer(b.uv, 2, n.FLOAT, !1, 0, 0),
            n.enableVertexAttribArray(b.uv))
          : n.disableVertexAttribArray(b.uv));
      b.uv2 >= 0 &&
        (h.__webglUV2Buffer
          ? (n.bindBuffer(n.ARRAY_BUFFER, h.__webglUV2Buffer),
            n.vertexAttribPointer(b.uv2, 2, n.FLOAT, !1, 0, 0),
            n.enableVertexAttribArray(b.uv2))
          : n.disableVertexAttribArray(b.uv2));
      g.skinning &&
        b.skinVertexA >= 0 &&
        b.skinVertexB >= 0 &&
        b.skinIndex >= 0 &&
        b.skinWeight >= 0 &&
        (n.bindBuffer(n.ARRAY_BUFFER, h.__webglSkinVertexABuffer),
        n.vertexAttribPointer(b.skinVertexA, 4, n.FLOAT, !1, 0, 0),
        n.bindBuffer(n.ARRAY_BUFFER, h.__webglSkinVertexBBuffer),
        n.vertexAttribPointer(b.skinVertexB, 4, n.FLOAT, !1, 0, 0),
        n.bindBuffer(n.ARRAY_BUFFER, h.__webglSkinIndicesBuffer),
        n.vertexAttribPointer(b.skinIndex, 4, n.FLOAT, !1, 0, 0),
        n.bindBuffer(n.ARRAY_BUFFER, h.__webglSkinWeightsBuffer),
        n.vertexAttribPointer(b.skinWeight, 4, n.FLOAT, !1, 0, 0));
      j instanceof THREE.Mesh
        ? (g.wireframe
            ? (n.lineWidth(g.wireframeLinewidth),
              n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, h.__webglLineBuffer),
              n.drawElements(n.LINES, h.__webglLineCount, n.UNSIGNED_SHORT, 0))
            : (n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, h.__webglFaceBuffer),
              n.drawElements(
                n.TRIANGLES,
                h.__webglFaceCount,
                n.UNSIGNED_SHORT,
                0
              )),
          (Q.data.vertices += h.__webglFaceCount),
          (Q.data.faces += h.__webglFaceCount / 3),
          Q.data.drawCalls++)
        : j instanceof THREE.Line
        ? ((j = j.type == THREE.LineStrip ? n.LINE_STRIP : n.LINES),
          n.lineWidth(g.linewidth),
          n.drawArrays(j, 0, h.__webglLineCount),
          Q.data.drawCalls++)
        : j instanceof THREE.ParticleSystem
        ? (n.drawArrays(n.POINTS, 0, h.__webglParticleCount),
          Q.data.drawCalls++)
        : j instanceof THREE.Ribbon &&
          (n.drawArrays(n.TRIANGLE_STRIP, 0, h.__webglVertexCount),
          Q.data.drawCalls++);
    }
  }
  function g(b, c, e) {
    if (!b.__webglVertexBuffer) b.__webglVertexBuffer = n.createBuffer();
    if (!b.__webglNormalBuffer) b.__webglNormalBuffer = n.createBuffer();
    b.hasPos &&
      (n.bindBuffer(n.ARRAY_BUFFER, b.__webglVertexBuffer),
      n.bufferData(n.ARRAY_BUFFER, b.positionArray, n.DYNAMIC_DRAW),
      n.enableVertexAttribArray(c.attributes.position),
      n.vertexAttribPointer(c.attributes.position, 3, n.FLOAT, !1, 0, 0));
    if (b.hasNormal) {
      n.bindBuffer(n.ARRAY_BUFFER, b.__webglNormalBuffer);
      if (e == THREE.FlatShading) {
        var f,
          h,
          g,
          j,
          k,
          m,
          t,
          o,
          u,
          p,
          v = b.count * 3;
        for (p = 0; p < v; p += 9)
          (e = b.normalArray),
            (f = e[p]),
            (h = e[p + 1]),
            (g = e[p + 2]),
            (j = e[p + 3]),
            (m = e[p + 4]),
            (o = e[p + 5]),
            (k = e[p + 6]),
            (t = e[p + 7]),
            (u = e[p + 8]),
            (f = (f + j + k) / 3),
            (h = (h + m + t) / 3),
            (g = (g + o + u) / 3),
            (e[p] = f),
            (e[p + 1] = h),
            (e[p + 2] = g),
            (e[p + 3] = f),
            (e[p + 4] = h),
            (e[p + 5] = g),
            (e[p + 6] = f),
            (e[p + 7] = h),
            (e[p + 8] = g);
      }
      n.bufferData(n.ARRAY_BUFFER, b.normalArray, n.DYNAMIC_DRAW);
      n.enableVertexAttribArray(c.attributes.normal);
      n.vertexAttribPointer(c.attributes.normal, 3, n.FLOAT, !1, 0, 0);
    }
    n.drawArrays(n.TRIANGLES, 0, b.count);
    b.count = 0;
  }
  function j(b) {
    if (ha != b.doubleSided)
      b.doubleSided ? n.disable(n.CULL_FACE) : n.enable(n.CULL_FACE),
        (ha = b.doubleSided);
    if (ca != b.flipSided)
      b.flipSided ? n.frontFace(n.CW) : n.frontFace(n.CCW), (ca = b.flipSided);
  }
  function h(b) {
    ga != b && (b ? n.enable(n.DEPTH_TEST) : n.disable(n.DEPTH_TEST), (ga = b));
  }
  function k(b, c, e) {
    $ != b &&
      (b ? n.enable(n.POLYGON_OFFSET_FILL) : n.disable(n.POLYGON_OFFSET_FILL),
      ($ = b));
    if (b && (Y != c || P != e)) n.polygonOffset(c, e), (Y = c), (P = e);
  }
  function m(b) {
    U[0].set(b.n41 - b.n11, b.n42 - b.n12, b.n43 - b.n13, b.n44 - b.n14);
    U[1].set(b.n41 + b.n11, b.n42 + b.n12, b.n43 + b.n13, b.n44 + b.n14);
    U[2].set(b.n41 + b.n21, b.n42 + b.n22, b.n43 + b.n23, b.n44 + b.n24);
    U[3].set(b.n41 - b.n21, b.n42 - b.n22, b.n43 - b.n23, b.n44 - b.n24);
    U[4].set(b.n41 - b.n31, b.n42 - b.n32, b.n43 - b.n33, b.n44 - b.n34);
    U[5].set(b.n41 + b.n31, b.n42 + b.n32, b.n43 + b.n33, b.n44 + b.n34);
    for (var c, b = 0; b < 6; b++)
      (c = U[b]), c.divideScalar(Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z));
  }
  function o(b) {
    for (
      var c = b.matrixWorld,
        e =
          -b.geometry.boundingSphere.radius *
          Math.max(b.scale.x, Math.max(b.scale.y, b.scale.z)),
        f = 0;
      f < 6;
      f++
    )
      if (
        ((b = U[f].x * c.n14 + U[f].y * c.n24 + U[f].z * c.n34 + U[f].w),
        b <= e)
      )
        return !1;
    return !0;
  }
  function p(b, c) {
    b.list[b.count] = c;
    b.count += 1;
  }
  function u(b) {
    var c,
      e,
      f = b.object,
      h = b.opaque,
      g = b.transparent;
    g.count = 0;
    b = h.count = 0;
    for (c = f.materials.length; b < c; b++)
      (e = f.materials[b]), e.transparent ? p(g, e) : p(h, e);
  }
  function v(b) {
    var c,
      e,
      f,
      h,
      g = b.object,
      j = b.buffer,
      k = b.opaque,
      n = b.transparent;
    n.count = 0;
    b = k.count = 0;
    for (f = g.materials.length; b < f; b++)
      if (((c = g.materials[b]), c instanceof THREE.MeshFaceMaterial)) {
        c = 0;
        for (e = j.materials.length; c < e; c++)
          (h = j.materials[c]) && (h.transparent ? p(n, h) : p(k, h));
      } else (h = c) && (h.transparent ? p(n, h) : p(k, h));
  }
  function t(b, c) {
    return c.z - b.z;
  }
  function x(b, c) {
    var k,
      t,
      u,
      p = 0,
      v,
      x,
      y,
      w,
      D = b.lights;
    aa ||
      (aa = new THREE.Camera(
        Q.shadowCameraFov,
        c.aspect,
        Q.shadowCameraNear,
        Q.shadowCameraFar
      ));
    k = 0;
    for (t = D.length; k < t; k++)
      if (((u = D[k]), u instanceof THREE.SpotLight && u.castShadow)) {
        Q.shadowMap[p] ||
          (Q.shadowMap[p] = new THREE.WebGLRenderTarget(
            Q.shadowMapWidth,
            Q.shadowMapHeight,
            {
              minFilter: THREE.LinearFilter,
              magFilter: THREE.LinearFilter,
              format: THREE.RGBAFormat,
            }
          ));
        xa[p] || (xa[p] = new THREE.Matrix4());
        v = Q.shadowMap[p];
        x = xa[p];
        aa.position.copy(u.position);
        aa.target.position.copy(u.target.position);
        aa.update(void 0, !0);
        b.update(void 0, !1, aa);
        x.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
        x.multiplySelf(aa.projectionMatrix);
        x.multiplySelf(aa.matrixWorldInverse);
        aa.matrixWorldInverse.flattenToArray(la);
        aa.projectionMatrix.flattenToArray(pa);
        ja.multiply(aa.projectionMatrix, aa.matrixWorldInverse);
        m(ja);
        Q.initWebGLObjects(b);
        E(v);
        n.clearColor(1, 1, 1, 1);
        Q.clear();
        n.clearColor(ra.r, ra.g, ra.b, na);
        x = b.__webglObjects.length;
        u = b.__webglObjectsImmediate.length;
        for (v = 0; v < x; v++)
          (y = b.__webglObjects[v]),
            (w = y.object),
            w.visible && w.castShadow
              ? !(w instanceof THREE.Mesh) || o(w)
                ? (w.matrixWorld.flattenToArray(w._objectMatrixArray),
                  A(w, aa, !1),
                  (y.render = !0))
                : (y.render = !1)
              : (y.render = !1);
        h(!0);
        C(THREE.NormalBlending);
        for (v = 0; v < x; v++)
          if (((y = b.__webglObjects[v]), y.render))
            (w = y.object),
              (buffer = y.buffer),
              j(w),
              (y = w.customDepthMaterial
                ? w.customDepthMaterial
                : w.geometry.morphTargets.length
                ? Da
                : oa),
              f(aa, D, null, y, buffer, w);
        for (v = 0; v < u; v++)
          (y = b.__webglObjectsImmediate[v]),
            (w = y.object),
            w.visible &&
              w.castShadow &&
              (w.matrixAutoUpdate &&
                w.matrixWorld.flattenToArray(w._objectMatrixArray),
              A(w, aa, !1),
              j(w),
              (program = e(aa, D, null, oa, w)),
              w.render(function (b) {
                g(b, program, oa.shading);
              }));
        p++;
      }
  }
  function w(b, c) {
    var e, f, h;
    e = R.attributes;
    var g = R.uniforms,
      j = ia / da,
      k,
      m = [],
      u = da * 0.5,
      o = ia * 0.5,
      p = !0;
    n.useProgram(R.program);
    X = R.program;
    ga = fa = -1;
    Aa ||
      (n.enableVertexAttribArray(R.attributes.position),
      n.enableVertexAttribArray(R.attributes.uv),
      (Aa = !0));
    n.disable(n.CULL_FACE);
    n.enable(n.BLEND);
    n.depthMask(!0);
    n.bindBuffer(n.ARRAY_BUFFER, R.vertexBuffer);
    n.vertexAttribPointer(e.position, 2, n.FLOAT, !1, 16, 0);
    n.vertexAttribPointer(e.uv, 2, n.FLOAT, !1, 16, 8);
    n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, R.elementBuffer);
    n.uniformMatrix4fv(g.projectionMatrix, !1, pa);
    n.activeTexture(n.TEXTURE0);
    n.uniform1i(g.map, 0);
    e = 0;
    for (f = b.__webglSprites.length; e < f; e++)
      (h = b.__webglSprites[e]),
        h.useScreenCoordinates
          ? (h.z = -h.position.z)
          : (h._modelViewMatrix.multiplyToArray(
              c.matrixWorldInverse,
              h.matrixWorld,
              h._modelViewMatrixArray
            ),
            (h.z = -h._modelViewMatrix.n34));
    b.__webglSprites.sort(t);
    e = 0;
    for (f = b.__webglSprites.length; e < f; e++)
      (h = b.__webglSprites[e]),
        h.material === void 0 &&
          h.map &&
          h.map.image &&
          h.map.image.width &&
          (h.useScreenCoordinates
            ? (n.uniform1i(g.useScreenCoordinates, 1),
              n.uniform3f(
                g.screenPosition,
                (h.position.x - u) / u,
                (o - h.position.y) / o,
                Math.max(0, Math.min(1, h.position.z))
              ))
            : (n.uniform1i(g.useScreenCoordinates, 0),
              n.uniform1i(g.affectedByDistance, h.affectedByDistance ? 1 : 0),
              n.uniformMatrix4fv(
                g.modelViewMatrix,
                !1,
                h._modelViewMatrixArray
              )),
          (k = h.map.image.width / (h.scaleByViewport ? ia : 1)),
          (m[0] = k * j * h.scale.x),
          (m[1] = k * h.scale.y),
          n.uniform2f(g.uvScale, h.uvScale.x, h.uvScale.y),
          n.uniform2f(g.uvOffset, h.uvOffset.x, h.uvOffset.y),
          n.uniform2f(g.alignment, h.alignment.x, h.alignment.y),
          n.uniform1f(g.opacity, h.opacity),
          n.uniform1f(g.rotation, h.rotation),
          n.uniform2fv(g.scale, m),
          h.mergeWith3D && !p
            ? (n.enable(n.DEPTH_TEST), (p = !0))
            : !h.mergeWith3D && p && (n.disable(n.DEPTH_TEST), (p = !1)),
          C(h.blending),
          L(h.map, 0),
          n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0));
    n.enable(n.CULL_FACE);
    n.enable(n.DEPTH_TEST);
    n.depthMask(W);
  }
  function A(b, c, e) {
    b._modelViewMatrix.multiplyToArray(
      c.matrixWorldInverse,
      b.matrixWorld,
      b._modelViewMatrixArray
    );
    e &&
      THREE.Matrix4.makeInvert3x3(b._modelViewMatrix).transposeIntoArray(
        b._normalMatrixArray
      );
  }
  function y(b) {
    var c, e, f, h;
    h = b.__materials;
    b = 0;
    for (e = h.length; b < e; b++)
      if (((f = h[b]), f.attributes))
        for (c in f.attributes) if (f.attributes[c].needsUpdate) return !0;
    return !1;
  }
  function G(b) {
    var c, e, f, h;
    h = b.__materials;
    b = 0;
    for (e = h.length; b < e; b++)
      if (((f = h[b]), f.attributes))
        for (c in f.attributes) f.attributes[c].needsUpdate = !1;
  }
  function D(b, c) {
    var e;
    for (e = b.length - 1; e >= 0; e--) b[e].object == c && b.splice(e, 1);
  }
  function I(b) {
    function c(b) {
      var h = [];
      e = 0;
      for (f = b.length; e < f; e++)
        b[e] == void 0 ? h.push("undefined") : h.push(b[e].id);
      return h.join("_");
    }
    var e,
      f,
      h,
      g,
      j,
      k,
      n,
      m,
      t = {},
      u = b.morphTargets !== void 0 ? b.morphTargets.length : 0;
    b.geometryGroups = {};
    h = 0;
    for (g = b.faces.length; h < g; h++)
      (j = b.faces[h]),
        (k = j.materials),
        (n = c(k)),
        t[n] == void 0 && (t[n] = { hash: n, counter: 0 }),
        (m = t[n].hash + "_" + t[n].counter),
        b.geometryGroups[m] == void 0 &&
          (b.geometryGroups[m] = {
            faces: [],
            materials: k,
            vertices: 0,
            numMorphTargets: u,
          }),
        (j = j instanceof THREE.Face3 ? 3 : 4),
        b.geometryGroups[m].vertices + j > 65535 &&
          ((t[n].counter += 1),
          (m = t[n].hash + "_" + t[n].counter),
          b.geometryGroups[m] == void 0 &&
            (b.geometryGroups[m] = {
              faces: [],
              materials: k,
              vertices: 0,
              numMorphTargets: u,
            })),
        b.geometryGroups[m].faces.push(h),
        (b.geometryGroups[m].vertices += j);
  }
  function J(b, c, e) {
    b.push({
      buffer: c,
      object: e,
      opaque: { list: [], count: 0 },
      transparent: { list: [], count: 0 },
    });
  }
  function C(b) {
    if (b != fa) {
      switch (b) {
        case THREE.AdditiveBlending:
          n.blendEquation(n.FUNC_ADD);
          n.blendFunc(n.SRC_ALPHA, n.ONE);
          break;
        case THREE.SubtractiveBlending:
          n.blendEquation(n.FUNC_ADD);
          n.blendFunc(n.ZERO, n.ONE_MINUS_SRC_COLOR);
          break;
        case THREE.MultiplyBlending:
          n.blendEquation(n.FUNC_ADD);
          n.blendFunc(n.ZERO, n.SRC_COLOR);
          break;
        default:
          n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD),
            n.blendFuncSeparate(
              n.SRC_ALPHA,
              n.ONE_MINUS_SRC_ALPHA,
              n.ONE,
              n.ONE_MINUS_SRC_ALPHA
            );
      }
      fa = b;
    }
  }
  function B(b, c, e) {
    (e.width & (e.width - 1)) == 0 && (e.height & (e.height - 1)) == 0
      ? (n.texParameteri(b, n.TEXTURE_WRAP_S, K(c.wrapS)),
        n.texParameteri(b, n.TEXTURE_WRAP_T, K(c.wrapT)),
        n.texParameteri(b, n.TEXTURE_MAG_FILTER, K(c.magFilter)),
        n.texParameteri(b, n.TEXTURE_MIN_FILTER, K(c.minFilter)),
        n.generateMipmap(b))
      : (n.texParameteri(b, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
        n.texParameteri(b, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE),
        n.texParameteri(b, n.TEXTURE_MAG_FILTER, S(c.magFilter)),
        n.texParameteri(b, n.TEXTURE_MIN_FILTER, S(c.minFilter)));
  }
  function L(b, c) {
    if (b.needsUpdate) {
      if (!b.__webglInit)
        (b.__webglTexture = n.createTexture()), (b.__webglInit = !0);
      n.activeTexture(n.TEXTURE0 + c);
      n.bindTexture(n.TEXTURE_2D, b.__webglTexture);
      b instanceof THREE.DataTexture
        ? n.texImage2D(
            n.TEXTURE_2D,
            0,
            K(b.format),
            b.image.width,
            b.image.height,
            0,
            K(b.format),
            n.UNSIGNED_BYTE,
            b.image.data
          )
        : n.texImage2D(
            n.TEXTURE_2D,
            0,
            n.RGBA,
            n.RGBA,
            n.UNSIGNED_BYTE,
            b.image
          );
      B(n.TEXTURE_2D, b, b.image);
      b.needsUpdate = !1;
    } else
      n.activeTexture(n.TEXTURE0 + c),
        n.bindTexture(n.TEXTURE_2D, b.__webglTexture);
  }
  function E(b) {
    var c = b instanceof THREE.WebGLRenderTargetCube;
    if (b && !b.__webglFramebuffer) {
      if (b.depthBuffer === void 0) b.depthBuffer = !0;
      if (b.stencilBuffer === void 0) b.stencilBuffer = !0;
      b.__webglRenderbuffer = n.createRenderbuffer();
      b.__webglTexture = n.createTexture();
      if (c) {
        n.bindTexture(n.TEXTURE_CUBE_MAP, b.__webglTexture);
        B(n.TEXTURE_CUBE_MAP, b, b);
        b.__webglFramebuffer = [];
        for (var e = 0; e < 6; e++)
          (b.__webglFramebuffer[e] = n.createFramebuffer()),
            n.texImage2D(
              n.TEXTURE_CUBE_MAP_POSITIVE_X + e,
              0,
              K(b.format),
              b.width,
              b.height,
              0,
              K(b.format),
              K(b.type),
              null
            );
      } else
        (b.__webglFramebuffer = n.createFramebuffer()),
          n.bindTexture(n.TEXTURE_2D, b.__webglTexture),
          B(n.TEXTURE_2D, b, b),
          n.texImage2D(
            n.TEXTURE_2D,
            0,
            K(b.format),
            b.width,
            b.height,
            0,
            K(b.format),
            K(b.type),
            null
          );
      n.bindRenderbuffer(n.RENDERBUFFER, b.__webglRenderbuffer);
      if (c)
        for (e = 0; e < 6; ++e)
          n.bindFramebuffer(n.FRAMEBUFFER, b.__webglFramebuffer[e]),
            n.framebufferTexture2D(
              n.FRAMEBUFFER,
              n.COLOR_ATTACHMENT0,
              n.TEXTURE_CUBE_MAP_POSITIVE_X + e,
              b.__webglTexture,
              0
            );
      else
        n.bindFramebuffer(n.FRAMEBUFFER, b.__webglFramebuffer),
          n.framebufferTexture2D(
            n.FRAMEBUFFER,
            n.COLOR_ATTACHMENT0,
            n.TEXTURE_2D,
            b.__webglTexture,
            0
          );
      b.depthBuffer && !b.stencilBuffer
        ? (n.renderbufferStorage(
            n.RENDERBUFFER,
            n.DEPTH_COMPONENT16,
            b.width,
            b.height
          ),
          n.framebufferRenderbuffer(
            n.FRAMEBUFFER,
            n.DEPTH_ATTACHMENT,
            n.RENDERBUFFER,
            b.__webglRenderbuffer
          ))
        : b.depthBuffer && b.stencilBuffer
        ? (n.renderbufferStorage(
            n.RENDERBUFFER,
            n.DEPTH_STENCIL,
            b.width,
            b.height
          ),
          n.framebufferRenderbuffer(
            n.FRAMEBUFFER,
            n.DEPTH_STENCIL_ATTACHMENT,
            n.RENDERBUFFER,
            b.__webglRenderbuffer
          ))
        : n.renderbufferStorage(n.RENDERBUFFER, n.RGBA4, b.width, b.height);
      c
        ? n.bindTexture(n.TEXTURE_CUBE_MAP, null)
        : n.bindTexture(n.TEXTURE_2D, null);
      n.bindRenderbuffer(n.RENDERBUFFER, null);
      n.bindFramebuffer(n.FRAMEBUFFER, null);
    }
    b
      ? ((c = c
          ? b.__webglFramebuffer[b.activeCubeFace]
          : b.__webglFramebuffer),
        (e = b.width),
        (b = b.height))
      : ((c = null), (e = da), (b = ia));
    c != M &&
      (n.bindFramebuffer(n.FRAMEBUFFER, c), n.viewport(ea, Z, e, b), (M = c));
  }
  function V(b) {
    b instanceof THREE.WebGLRenderTargetCube
      ? (n.bindTexture(n.TEXTURE_CUBE_MAP, b.__webglTexture),
        n.generateMipmap(n.TEXTURE_CUBE_MAP),
        n.bindTexture(n.TEXTURE_CUBE_MAP, null))
      : (n.bindTexture(n.TEXTURE_2D, b.__webglTexture),
        n.generateMipmap(n.TEXTURE_2D),
        n.bindTexture(n.TEXTURE_2D, null));
  }
  function H(b, c) {
    var e;
    b == "fragment"
      ? (e = n.createShader(n.FRAGMENT_SHADER))
      : b == "vertex" && (e = n.createShader(n.VERTEX_SHADER));
    n.shaderSource(e, c);
    n.compileShader(e);
    if (!n.getShaderParameter(e, n.COMPILE_STATUS))
      return console.error(n.getShaderInfoLog(e)), console.error(c), null;
    return e;
  }
  function S(b) {
    switch (b) {
      case THREE.NearestFilter:
      case THREE.NearestMipMapNearestFilter:
      case THREE.NearestMipMapLinearFilter:
        return n.NEAREST;
      default:
        return n.LINEAR;
    }
  }
  function K(b) {
    switch (b) {
      case THREE.RepeatWrapping:
        return n.REPEAT;
      case THREE.ClampToEdgeWrapping:
        return n.CLAMP_TO_EDGE;
      case THREE.MirroredRepeatWrapping:
        return n.MIRRORED_REPEAT;
      case THREE.NearestFilter:
        return n.NEAREST;
      case THREE.NearestMipMapNearestFilter:
        return n.NEAREST_MIPMAP_NEAREST;
      case THREE.NearestMipMapLinearFilter:
        return n.NEAREST_MIPMAP_LINEAR;
      case THREE.LinearFilter:
        return n.LINEAR;
      case THREE.LinearMipMapNearestFilter:
        return n.LINEAR_MIPMAP_NEAREST;
      case THREE.LinearMipMapLinearFilter:
        return n.LINEAR_MIPMAP_LINEAR;
      case THREE.ByteType:
        return n.BYTE;
      case THREE.UnsignedByteType:
        return n.UNSIGNED_BYTE;
      case THREE.ShortType:
        return n.SHORT;
      case THREE.UnsignedShortType:
        return n.UNSIGNED_SHORT;
      case THREE.IntType:
        return n.INT;
      case THREE.UnsignedShortType:
        return n.UNSIGNED_INT;
      case THREE.FloatType:
        return n.FLOAT;
      case THREE.AlphaFormat:
        return n.ALPHA;
      case THREE.RGBFormat:
        return n.RGB;
      case THREE.RGBAFormat:
        return n.RGBA;
      case THREE.LuminanceFormat:
        return n.LUMINANCE;
      case THREE.LuminanceAlphaFormat:
        return n.LUMINANCE_ALPHA;
    }
    return 0;
  }
  var Q = this,
    n,
    T = [],
    X = null,
    M = null,
    W = !0,
    ha = null,
    ca = null,
    fa = null,
    ga = null,
    $ = null,
    Y = null,
    P = null,
    ea = 0,
    Z = 0,
    da = 0,
    ia = 0,
    U = [
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
    ],
    ja = new THREE.Matrix4(),
    pa = new Float32Array(16),
    la = new Float32Array(16),
    ma = new THREE.Vector4(),
    Fa = {
      ambient: [0, 0, 0],
      directional: { length: 0, colors: [], positions: [] },
      point: { length: 0, colors: [], positions: [], distances: [] },
    },
    b = b || {},
    ya = b.canvas !== void 0 ? b.canvas : document.createElement("canvas"),
    Ia = b.stencil !== void 0 ? b.stencil : !0,
    Ja = b.preserveDrawingBuffer !== void 0 ? b.preserveDrawingBuffer : !1,
    Ta = b.antialias !== void 0 ? b.antialias : !1,
    ra =
      b.clearColor !== void 0
        ? new THREE.Color(b.clearColor)
        : new THREE.Color(0),
    na = b.clearAlpha !== void 0 ? b.clearAlpha : 0;
  _maxLights = b.maxLights !== void 0 ? b.maxLights : 4;
  this.data = { vertices: 0, faces: 0, drawCalls: 0 };
  this.maxMorphTargets = 8;
  this.domElement = ya;
  this.sortObjects = this.autoClear = !0;
  this.shadowMapBias = 0.0039;
  this.shadowMapDarkness = 0.5;
  this.shadowMapHeight = this.shadowMapWidth = 512;
  this.shadowCameraNear = 1;
  this.shadowCameraFar = 5e3;
  this.shadowCameraFov = 50;
  this.shadowMap = [];
  this.shadowMapEnabled = !1;
  this.shadowMapSoft = !0;
  var aa,
    xa = [],
    b = THREE.ShaderLib.depthRGBA,
    va = THREE.UniformsUtils.clone(b.uniforms),
    oa = new THREE.MeshShaderMaterial({
      fragmentShader: b.fragmentShader,
      vertexShader: b.vertexShader,
      uniforms: va,
    }),
    Da = new THREE.MeshShaderMaterial({
      fragmentShader: b.fragmentShader,
      vertexShader: b.vertexShader,
      uniforms: va,
      morphTargets: !0,
    });
  oa._shadowPass = !0;
  Da._shadowPass = !0;
  try {
    if (
      !(n = ya.getContext("experimental-webgl", {
        antialias: Ta,
        stencil: Ia,
        preserveDrawingBuffer: Ja,
      }))
    )
      throw "Error creating WebGL context.";
    console.log(
      navigator.userAgent +
        " | " +
        n.getParameter(n.VERSION) +
        " | " +
        n.getParameter(n.VENDOR) +
        " | " +
        n.getParameter(n.RENDERER) +
        " | " +
        n.getParameter(n.SHADING_LANGUAGE_VERSION)
    );
  } catch (Ga) {
    console.error(Ga);
  }
  n.clearColor(0, 0, 0, 1);
  n.clearDepth(1);
  n.enable(n.DEPTH_TEST);
  n.depthFunc(n.LEQUAL);
  n.frontFace(n.CCW);
  n.cullFace(n.BACK);
  n.enable(n.CULL_FACE);
  n.enable(n.BLEND);
  n.blendEquation(n.FUNC_ADD);
  n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
  n.clearColor(ra.r, ra.g, ra.b, na);
  this.context = n;
  var sa = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0,
    R = {};
  R.vertices = new Float32Array(16);
  R.faces = new Uint16Array(6);
  i = 0;
  R.vertices[i++] = -1;
  R.vertices[i++] = -1;
  R.vertices[i++] = 0;
  R.vertices[i++] = 1;
  R.vertices[i++] = 1;
  R.vertices[i++] = -1;
  R.vertices[i++] = 1;
  R.vertices[i++] = 1;
  R.vertices[i++] = 1;
  R.vertices[i++] = 1;
  R.vertices[i++] = 1;
  R.vertices[i++] = 0;
  R.vertices[i++] = -1;
  R.vertices[i++] = 1;
  R.vertices[i++] = 0;
  i = R.vertices[i++] = 0;
  R.faces[i++] = 0;
  R.faces[i++] = 1;
  R.faces[i++] = 2;
  R.faces[i++] = 0;
  R.faces[i++] = 2;
  R.faces[i++] = 3;
  R.vertexBuffer = n.createBuffer();
  R.elementBuffer = n.createBuffer();
  n.bindBuffer(n.ARRAY_BUFFER, R.vertexBuffer);
  n.bufferData(n.ARRAY_BUFFER, R.vertices, n.STATIC_DRAW);
  n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, R.elementBuffer);
  n.bufferData(n.ELEMENT_ARRAY_BUFFER, R.faces, n.STATIC_DRAW);
  R.program = n.createProgram();
  n.attachShader(
    R.program,
    H("fragment", THREE.ShaderLib.sprite.fragmentShader)
  );
  n.attachShader(R.program, H("vertex", THREE.ShaderLib.sprite.vertexShader));
  n.linkProgram(R.program);
  R.attributes = {};
  R.uniforms = {};
  R.attributes.position = n.getAttribLocation(R.program, "position");
  R.attributes.uv = n.getAttribLocation(R.program, "uv");
  R.uniforms.uvOffset = n.getUniformLocation(R.program, "uvOffset");
  R.uniforms.uvScale = n.getUniformLocation(R.program, "uvScale");
  R.uniforms.rotation = n.getUniformLocation(R.program, "rotation");
  R.uniforms.scale = n.getUniformLocation(R.program, "scale");
  R.uniforms.alignment = n.getUniformLocation(R.program, "alignment");
  R.uniforms.map = n.getUniformLocation(R.program, "map");
  R.uniforms.opacity = n.getUniformLocation(R.program, "opacity");
  R.uniforms.useScreenCoordinates = n.getUniformLocation(
    R.program,
    "useScreenCoordinates"
  );
  R.uniforms.affectedByDistance = n.getUniformLocation(
    R.program,
    "affectedByDistance"
  );
  R.uniforms.screenPosition = n.getUniformLocation(R.program, "screenPosition");
  R.uniforms.modelViewMatrix = n.getUniformLocation(
    R.program,
    "modelViewMatrix"
  );
  R.uniforms.projectionMatrix = n.getUniformLocation(
    R.program,
    "projectionMatrix"
  );
  var Aa = !1;
  this.setSize = function (b, c) {
    ya.width = b;
    ya.height = c;
    this.setViewport(0, 0, ya.width, ya.height);
  };
  this.setViewport = function (b, c, e, f) {
    ea = b;
    Z = c;
    da = e;
    ia = f;
    n.viewport(ea, Z, da, ia);
  };
  this.setScissor = function (b, c, e, f) {
    n.scissor(b, c, e, f);
  };
  this.enableScissorTest = function (b) {
    b ? n.enable(n.SCISSOR_TEST) : n.disable(n.SCISSOR_TEST);
  };
  this.enableDepthBufferWrite = function (b) {
    W = b;
    n.depthMask(b);
  };
  this.setClearColorHex = function (b, c) {
    ra.setHex(b);
    na = c;
    n.clearColor(ra.r, ra.g, ra.b, na);
  };
  this.setClearColor = function (b, c) {
    ra.copy(b);
    na = c;
    n.clearColor(ra.r, ra.g, ra.b, na);
  };
  this.clear = function () {
    n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT | n.STENCIL_BUFFER_BIT);
  };
  this.getContext = function () {
    return n;
  };
  this.initMaterial = function (b, c, e, f) {
    var h, g, j;
    b instanceof THREE.MeshDepthMaterial
      ? (j = "depth")
      : b instanceof THREE.MeshNormalMaterial
      ? (j = "normal")
      : b instanceof THREE.MeshBasicMaterial
      ? (j = "basic")
      : b instanceof THREE.MeshLambertMaterial
      ? (j = "lambert")
      : b instanceof THREE.MeshPhongMaterial
      ? (j = "phong")
      : b instanceof THREE.LineBasicMaterial
      ? (j = "basic")
      : b instanceof THREE.ParticleBasicMaterial && (j = "particle_basic");
    if (j) {
      var k = THREE.ShaderLib[j];
      b.uniforms = THREE.UniformsUtils.clone(k.uniforms);
      b.vertexShader = k.vertexShader;
      b.fragmentShader = k.fragmentShader;
    }
    var m, t, u;
    m = u = k = 0;
    for (t = c.length; m < t; m++)
      (g = c[m]),
        g instanceof THREE.SpotLight && u++,
        g instanceof THREE.DirectionalLight && u++,
        g instanceof THREE.PointLight && k++;
    k + u <= _maxLights
      ? (m = u)
      : ((m = Math.ceil((_maxLights * u) / (k + u))), (k = _maxLights - m));
    g = { directional: m, point: k };
    k = u = 0;
    for (m = c.length; k < m; k++)
      (t = c[k]), t instanceof THREE.SpotLight && t.castShadow && u++;
    var o = 50;
    if (f !== void 0 && f instanceof THREE.SkinnedMesh) o = f.bones.length;
    var p;
    a: {
      m = b.fragmentShader;
      t = b.vertexShader;
      var k = b.uniforms,
        c = b.attributes,
        e = {
          map: !!b.map,
          envMap: !!b.envMap,
          lightMap: !!b.lightMap,
          vertexColors: b.vertexColors,
          fog: e,
          sizeAttenuation: b.sizeAttenuation,
          skinning: b.skinning,
          morphTargets: b.morphTargets,
          maxMorphTargets: this.maxMorphTargets,
          maxDirLights: g.directional,
          maxPointLights: g.point,
          maxBones: o,
          shadowMapEnabled: this.shadowMapEnabled && f.receiveShadow,
          shadowMapSoft: this.shadowMapSoft,
          shadowMapWidth: this.shadowMapWidth,
          shadowMapHeight: this.shadowMapHeight,
          maxShadows: u,
          alphaTest: b.alphaTest,
        },
        v,
        f = [];
      j ? f.push(j) : (f.push(m), f.push(t));
      for (v in e) f.push(v), f.push(e[v]);
      j = f.join();
      v = 0;
      for (f = T.length; v < f; v++)
        if (T[v].code == j) {
          p = T[v].program;
          break a;
        }
      v = n.createProgram();
      f = [
        sa ? "#define VERTEX_TEXTURES" : "",
        "#define MAX_DIR_LIGHTS " + e.maxDirLights,
        "#define MAX_POINT_LIGHTS " + e.maxPointLights,
        "#define MAX_SHADOWS " + e.maxShadows,
        "#define MAX_BONES " + e.maxBones,
        e.map ? "#define USE_MAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.vertexColors ? "#define USE_COLOR" : "",
        e.skinning ? "#define USE_SKINNING" : "",
        e.morphTargets ? "#define USE_MORPHTARGETS" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
        e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n",
      ].join("\n");
      g = [
        "#ifdef GL_ES\nprecision highp float;\n#endif",
        "#define MAX_DIR_LIGHTS " + e.maxDirLights,
        "#define MAX_POINT_LIGHTS " + e.maxPointLights,
        "#define MAX_SHADOWS " + e.maxShadows,
        e.alphaTest ? "#define ALPHATEST " + e.alphaTest : "",
        e.fog ? "#define USE_FOG" : "",
        e.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "",
        e.map ? "#define USE_MAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.vertexColors ? "#define USE_COLOR" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
        e.shadowMapSoft
          ? "#define SHADOWMAP_WIDTH " + e.shadowMapWidth.toFixed(1)
          : "",
        e.shadowMapSoft
          ? "#define SHADOWMAP_HEIGHT " + e.shadowMapHeight.toFixed(1)
          : "",
        "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n",
      ].join("\n");
      n.attachShader(v, H("fragment", g + m));
      n.attachShader(v, H("vertex", f + t));
      n.linkProgram(v);
      n.getProgramParameter(v, n.LINK_STATUS) ||
        console.error(
          "Could not initialise shader\nVALIDATE_STATUS: " +
            n.getProgramParameter(v, n.VALIDATE_STATUS) +
            ", gl error [" +
            n.getError() +
            "]"
        );
      v.uniforms = {};
      v.attributes = {};
      var x,
        f = [
          "viewMatrix",
          "modelViewMatrix",
          "projectionMatrix",
          "normalMatrix",
          "objectMatrix",
          "cameraPosition",
          "cameraInverseMatrix",
          "boneGlobalMatrices",
          "morphTargetInfluences",
        ];
      for (x in k) f.push(x);
      x = f;
      f = 0;
      for (k = x.length; f < k; f++)
        (m = x[f]), (v.uniforms[m] = n.getUniformLocation(v, m));
      f = [
        "position",
        "normal",
        "uv",
        "uv2",
        "tangent",
        "color",
        "skinVertexA",
        "skinVertexB",
        "skinIndex",
        "skinWeight",
      ];
      for (x = 0; x < e.maxMorphTargets; x++) f.push("morphTarget" + x);
      for (p in c) f.push(p);
      p = f;
      x = 0;
      for (c = p.length; x < c; x++)
        (e = p[x]), (v.attributes[e] = n.getAttribLocation(v, e));
      T.push({ program: v, code: j });
      p = v;
    }
    b.program = p;
    p = b.program.attributes;
    p.position >= 0 && n.enableVertexAttribArray(p.position);
    p.color >= 0 && n.enableVertexAttribArray(p.color);
    p.normal >= 0 && n.enableVertexAttribArray(p.normal);
    p.tangent >= 0 && n.enableVertexAttribArray(p.tangent);
    b.skinning &&
      p.skinVertexA >= 0 &&
      p.skinVertexB >= 0 &&
      p.skinIndex >= 0 &&
      p.skinWeight >= 0 &&
      (n.enableVertexAttribArray(p.skinVertexA),
      n.enableVertexAttribArray(p.skinVertexB),
      n.enableVertexAttribArray(p.skinIndex),
      n.enableVertexAttribArray(p.skinWeight));
    if (b.attributes)
      for (h in b.attributes)
        p[h] !== void 0 && p[h] >= 0 && n.enableVertexAttribArray(p[h]);
    if (b.morphTargets)
      for (h = b.numSupportedMorphTargets = 0; h < this.maxMorphTargets; h++)
        (x = "morphTarget" + h),
          p[x] >= 0 &&
            (n.enableVertexAttribArray(p[x]), b.numSupportedMorphTargets++);
  };
  this.render = function (b, c, n, p) {
    var y,
      D,
      G,
      I,
      U,
      J,
      H,
      B,
      L = b.lights,
      P = b.fog;
    this.shadowMapEnabled && x(b, c);
    Q.data.vertices = 0;
    Q.data.faces = 0;
    Q.data.drawCalls = 0;
    c.matrixAutoUpdate && c.update(void 0, !0);
    b.update(void 0, !1, c);
    c.matrixWorldInverse.flattenToArray(la);
    c.projectionMatrix.flattenToArray(pa);
    ja.multiply(c.projectionMatrix, c.matrixWorldInverse);
    m(ja);
    this.initWebGLObjects(b);
    E(n);
    (this.autoClear || p) && this.clear();
    U = b.__webglObjects.length;
    for (p = 0; p < U; p++)
      if (((y = b.__webglObjects[p]), (H = y.object), H.visible))
        if (!(H instanceof THREE.Mesh) || o(H)) {
          if (
            (H.matrixWorld.flattenToArray(H._objectMatrixArray),
            A(H, c, !0),
            v(y),
            (y.render = !0),
            this.sortObjects)
          )
            y.object.renderDepth
              ? (y.z = y.object.renderDepth)
              : (ma.copy(H.position), ja.multiplyVector3(ma), (y.z = ma.z));
        } else y.render = !1;
      else y.render = !1;
    this.sortObjects && b.__webglObjects.sort(t);
    J = b.__webglObjectsImmediate.length;
    for (p = 0; p < J; p++)
      (y = b.__webglObjectsImmediate[p]),
        (H = y.object),
        H.visible &&
          (H.matrixAutoUpdate &&
            H.matrixWorld.flattenToArray(H._objectMatrixArray),
          A(H, c, !0),
          u(y));
    if (b.overrideMaterial) {
      h(b.overrideMaterial.depthTest);
      C(b.overrideMaterial.blending);
      for (p = 0; p < U; p++)
        if (((y = b.__webglObjects[p]), y.render))
          (H = y.object),
            (B = y.buffer),
            j(H),
            f(c, L, P, b.overrideMaterial, B, H);
      for (p = 0; p < J; p++)
        (y = b.__webglObjectsImmediate[p]),
          (H = y.object),
          H.visible &&
            (j(H),
            (D = e(c, L, P, b.overrideMaterial, H)),
            H.render(function (c) {
              g(c, D, b.overrideMaterial.shading);
            }));
    } else {
      C(THREE.NormalBlending);
      for (p = U - 1; p >= 0; p--)
        if (((y = b.__webglObjects[p]), y.render)) {
          H = y.object;
          B = y.buffer;
          G = y.opaque;
          j(H);
          for (y = 0; y < G.count; y++)
            (I = G.list[y]),
              h(I.depthTest),
              k(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits),
              f(c, L, P, I, B, H);
        }
      for (p = 0; p < J; p++)
        if (((y = b.__webglObjectsImmediate[p]), (H = y.object), H.visible)) {
          G = y.opaque;
          j(H);
          for (y = 0; y < G.count; y++)
            (I = G.list[y]),
              h(I.depthTest),
              k(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits),
              (D = e(c, L, P, I, H)),
              H.render(function (b) {
                g(b, D, I.shading);
              });
        }
      for (p = 0; p < U; p++)
        if (((y = b.__webglObjects[p]), y.render)) {
          H = y.object;
          B = y.buffer;
          G = y.transparent;
          j(H);
          for (y = 0; y < G.count; y++)
            (I = G.list[y]),
              C(I.blending),
              h(I.depthTest),
              k(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits),
              f(c, L, P, I, B, H);
        }
      for (p = 0; p < J; p++)
        if (((y = b.__webglObjectsImmediate[p]), (H = y.object), H.visible)) {
          G = y.transparent;
          j(H);
          for (y = 0; y < G.count; y++)
            (I = G.list[y]),
              C(I.blending),
              h(I.depthTest),
              k(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits),
              (D = e(c, L, P, I, H)),
              H.render(function (b) {
                g(b, D, I.shading);
              });
        }
    }
    b.__webglSprites.length && w(b, c);
    n &&
      n.minFilter !== THREE.NearestFilter &&
      n.minFilter !== THREE.LinearFilter &&
      V(n);
  };
  this.initWebGLObjects = function (b) {
    if (!b.__webglObjects)
      (b.__webglObjects = []),
        (b.__webglObjectsImmediate = []),
        (b.__webglSprites = []);
    for (; b.__objectsAdded.length; ) {
      var e = b.__objectsAdded[0],
        f = b,
        h = void 0,
        g = void 0,
        j = void 0;
      if (e._modelViewMatrix == void 0)
        (e._modelViewMatrix = new THREE.Matrix4()),
          (e._normalMatrixArray = new Float32Array(9)),
          (e._modelViewMatrixArray = new Float32Array(16)),
          (e._objectMatrixArray = new Float32Array(16)),
          e.matrixWorld.flattenToArray(e._objectMatrixArray);
      if (e instanceof THREE.Mesh)
        for (h in ((g = e.geometry),
        g.geometryGroups == void 0 && I(g),
        g.geometryGroups)) {
          j = g.geometryGroups[h];
          if (!j.__webglVertexBuffer) {
            var k = j;
            k.__webglVertexBuffer = n.createBuffer();
            k.__webglNormalBuffer = n.createBuffer();
            k.__webglTangentBuffer = n.createBuffer();
            k.__webglColorBuffer = n.createBuffer();
            k.__webglUVBuffer = n.createBuffer();
            k.__webglUV2Buffer = n.createBuffer();
            k.__webglSkinVertexABuffer = n.createBuffer();
            k.__webglSkinVertexBBuffer = n.createBuffer();
            k.__webglSkinIndicesBuffer = n.createBuffer();
            k.__webglSkinWeightsBuffer = n.createBuffer();
            k.__webglFaceBuffer = n.createBuffer();
            k.__webglLineBuffer = n.createBuffer();
            if (k.numMorphTargets) {
              var m = void 0,
                t = void 0;
              k.__webglMorphTargetsBuffers = [];
              m = 0;
              for (t = k.numMorphTargets; m < t; m++)
                k.__webglMorphTargetsBuffers.push(n.createBuffer());
            }
            for (
              var k = j,
                m = e,
                p = void 0,
                u = void 0,
                o = void 0,
                v = (o = void 0),
                x = void 0,
                w = void 0,
                A = (w = t = 0),
                U = (o = u = void 0),
                H = (U = u = p = void 0),
                o = void 0,
                v = m.geometry,
                x = v.faces,
                U = k.faces,
                p = 0,
                u = U.length;
              p < u;
              p++
            )
              (o = U[p]),
                (o = x[o]),
                o instanceof THREE.Face3
                  ? ((t += 3), (w += 1), (A += 3))
                  : o instanceof THREE.Face4 && ((t += 4), (w += 2), (A += 4));
            for (
              var p = k,
                u = m,
                C = (U = x = void 0),
                E = void 0,
                C = void 0,
                o = [],
                x = 0,
                U = u.materials.length;
              x < U;
              x++
            )
              if (((C = u.materials[x]), C instanceof THREE.MeshFaceMaterial)) {
                C = 0;
                for (l = p.materials.length; C < l; C++)
                  (E = p.materials[C]) && o.push(E);
              } else (E = C) && o.push(E);
            p = o;
            k.__materials = p;
            a: {
              x = u = void 0;
              U = p.length;
              for (u = 0; u < U; u++)
                if (
                  ((x = p[u]),
                  x.map || x.lightMap || x instanceof THREE.MeshShaderMaterial)
                ) {
                  u = !0;
                  break a;
                }
              u = !1;
            }
            a: {
              U = x = void 0;
              o = p.length;
              for (x = 0; x < o; x++)
                if (
                  ((U = p[x]),
                  !(
                    (U instanceof THREE.MeshBasicMaterial && !U.envMap) ||
                    U instanceof THREE.MeshDepthMaterial
                  ))
                ) {
                  U =
                    U && U.shading != void 0 && U.shading == THREE.SmoothShading
                      ? THREE.SmoothShading
                      : THREE.FlatShading;
                  break a;
                }
              U = !1;
            }
            a: {
              o = x = void 0;
              C = p.length;
              for (x = 0; x < C; x++)
                if (((o = p[x]), o.vertexColors)) {
                  o = o.vertexColors;
                  break a;
                }
              o = !1;
            }
            k.__vertexArray = new Float32Array(t * 3);
            if (U) k.__normalArray = new Float32Array(t * 3);
            if (v.hasTangents) k.__tangentArray = new Float32Array(t * 4);
            if (o) k.__colorArray = new Float32Array(t * 3);
            if (u) {
              if (v.faceUvs.length > 0 || v.faceVertexUvs.length > 0)
                k.__uvArray = new Float32Array(t * 2);
              if (v.faceUvs.length > 1 || v.faceVertexUvs.length > 1)
                k.__uv2Array = new Float32Array(t * 2);
            }
            if (m.geometry.skinWeights.length && m.geometry.skinIndices.length)
              (k.__skinVertexAArray = new Float32Array(t * 4)),
                (k.__skinVertexBArray = new Float32Array(t * 4)),
                (k.__skinIndexArray = new Float32Array(t * 4)),
                (k.__skinWeightArray = new Float32Array(t * 4));
            k.__faceArray = new Uint16Array(
              w * 3 +
                (m.geometry.edgeFaces ? m.geometry.edgeFaces.length * 6 : 0)
            );
            k.__lineArray = new Uint16Array(A * 2);
            if (k.numMorphTargets) {
              k.__morphTargetsArrays = [];
              v = 0;
              for (x = k.numMorphTargets; v < x; v++)
                k.__morphTargetsArrays.push(new Float32Array(t * 3));
            }
            k.__needsSmoothNormals = U == THREE.SmoothShading;
            k.__uvType = u;
            k.__vertexColorType = o;
            k.__normalType = U;
            k.__webglFaceCount =
              w * 3 +
              (m.geometry.edgeFaces ? m.geometry.edgeFaces.length * 6 : 0);
            k.__webglLineCount = A * 2;
            v = 0;
            for (x = p.length; v < x; v++)
              if (((u = p[v]), u.attributes)) {
                if (k.__webglCustomAttributes === void 0)
                  k.__webglCustomAttributes = {};
                for (a in u.attributes) {
                  o = u.attributes[a];
                  U = {};
                  for (H in o) U[H] = o[H];
                  if (!U.__webglInitialized || U.createUniqueBuffers)
                    (U.__webglInitialized = !0),
                      (w = 1),
                      U.type === "v2"
                        ? (w = 2)
                        : U.type === "v3"
                        ? (w = 3)
                        : U.type === "v4"
                        ? (w = 4)
                        : U.type === "c" && (w = 3),
                      (U.size = w),
                      (U.array = new Float32Array(t * w)),
                      (U.buffer = n.createBuffer()),
                      (U.buffer.belongsToAttribute = a),
                      (o.needsUpdate = !0),
                      (U.__original = o);
                  k.__webglCustomAttributes[a] = U;
                }
              }
            k.__inittedArrays = !0;
            g.__dirtyVertices = !0;
            g.__dirtyMorphTargets = !0;
            g.__dirtyElements = !0;
            g.__dirtyUvs = !0;
            g.__dirtyNormals = !0;
            g.__dirtyTangents = !0;
            g.__dirtyColors = !0;
          }
          J(f.__webglObjects, j, e);
        }
      else if (e instanceof THREE.Ribbon) {
        g = e.geometry;
        if (!g.__webglVertexBuffer)
          (h = g),
            (h.__webglVertexBuffer = n.createBuffer()),
            (h.__webglColorBuffer = n.createBuffer()),
            (h = g),
            (j = h.vertices.length),
            (h.__vertexArray = new Float32Array(j * 3)),
            (h.__colorArray = new Float32Array(j * 3)),
            (h.__webglVertexCount = j),
            (g.__dirtyVertices = !0),
            (g.__dirtyColors = !0);
        J(f.__webglObjects, g, e);
      } else if (e instanceof THREE.Line) {
        g = e.geometry;
        if (!g.__webglVertexBuffer)
          (h = g),
            (h.__webglVertexBuffer = n.createBuffer()),
            (h.__webglColorBuffer = n.createBuffer()),
            (h = g),
            (j = h.vertices.length),
            (h.__vertexArray = new Float32Array(j * 3)),
            (h.__colorArray = new Float32Array(j * 3)),
            (h.__webglLineCount = j),
            (g.__dirtyVertices = !0),
            (g.__dirtyColors = !0);
        J(f.__webglObjects, g, e);
      } else if (e instanceof THREE.ParticleSystem) {
        g = e.geometry;
        if (!g.__webglVertexBuffer) {
          h = g;
          h.__webglVertexBuffer = n.createBuffer();
          h.__webglColorBuffer = n.createBuffer();
          h = g;
          j = e;
          k = h.vertices.length;
          h.__vertexArray = new Float32Array(k * 3);
          h.__colorArray = new Float32Array(k * 3);
          h.__sortArray = [];
          h.__webglParticleCount = k;
          h.__materials = j.materials;
          H = t = m = void 0;
          m = 0;
          for (t = j.materials.length; m < t; m++)
            if (((H = j.materials[m]), H.attributes)) {
              if (h.__webglCustomAttributes === void 0)
                h.__webglCustomAttributes = {};
              for (a in H.attributes) {
                originalAttribute = H.attributes[a];
                attribute = {};
                for (property in originalAttribute)
                  attribute[property] = originalAttribute[property];
                if (
                  !attribute.__webglInitialized ||
                  attribute.createUniqueBuffers
                )
                  (attribute.__webglInitialized = !0),
                    (size = 1),
                    attribute.type === "v2"
                      ? (size = 2)
                      : attribute.type === "v3"
                      ? (size = 3)
                      : attribute.type === "v4"
                      ? (size = 4)
                      : attribute.type === "c" && (size = 3),
                    (attribute.size = size),
                    (attribute.array = new Float32Array(k * size)),
                    (attribute.buffer = n.createBuffer()),
                    (attribute.buffer.belongsToAttribute = a),
                    (originalAttribute.needsUpdate = !0),
                    (attribute.__original = originalAttribute);
                h.__webglCustomAttributes[a] = attribute;
              }
            }
          g.__dirtyVertices = !0;
          g.__dirtyColors = !0;
        }
        J(f.__webglObjects, g, e);
      } else
        THREE.MarchingCubes !== void 0 && e instanceof THREE.MarchingCubes
          ? f.__webglObjectsImmediate.push({
              object: e,
              opaque: { list: [], count: 0 },
              transparent: { list: [], count: 0 },
            })
          : e instanceof THREE.Sprite && f.__webglSprites.push(e);
      b.__objectsAdded.splice(0, 1);
    }
    for (; b.__objectsRemoved.length; ) {
      f = b.__objectsRemoved[0];
      e = b;
      if (
        f instanceof THREE.Mesh ||
        f instanceof THREE.ParticleSystem ||
        f instanceof THREE.Ribbon ||
        f instanceof THREE.Line
      )
        D(e.__webglObjects, f);
      else if (f instanceof THREE.Sprite) {
        e = e.__webglSprites;
        g = void 0;
        for (g = e.length - 1; g >= 0; g--) e[g] == f && e.splice(g, 1);
      } else
        f instanceof THREE.MarchingCubes && D(e.__webglObjectsImmediate, f);
      b.__objectsRemoved.splice(0, 1);
    }
    e = 0;
    for (f = b.__webglObjects.length; e < f; e++)
      if (
        ((h = b.__webglObjects[e].object),
        (m = k = g = j = void 0),
        h instanceof THREE.Mesh)
      ) {
        g = h.geometry;
        for (j in g.geometryGroups)
          if (
            ((k = g.geometryGroups[j]),
            (m = y(k)),
            g.__dirtyVertices ||
              g.__dirtyMorphTargets ||
              g.__dirtyElements ||
              g.__dirtyUvs ||
              g.__dirtyNormals ||
              g.__dirtyColors ||
              g.__dirtyTangents ||
              m)
          )
            if (
              ((m = k),
              (t = n.DYNAMIC_DRAW),
              (H = !g.dynamic),
              m.__inittedArrays)
            ) {
              var ja = (A = w = void 0),
                B = void 0,
                L = (ja = void 0),
                P = void 0,
                pa = void 0,
                K = void 0,
                M = (E = C = o = U = x = u = p = v = void 0),
                F = (B = K = B = pa = P = void 0),
                z = void 0,
                N = (z = F = P = void 0),
                Q = void 0,
                S =
                  (N =
                  z =
                  F =
                  ja =
                  ja =
                  L =
                  K =
                  B =
                  N =
                  z =
                  F =
                  Q =
                  N =
                  z =
                  F =
                  Q =
                  N =
                  z =
                  F =
                    void 0),
                la = 0,
                R = 0,
                ea = 0,
                ca = 0,
                V = 0,
                T = 0,
                Z = 0,
                X = 0,
                da = 0,
                O = 0,
                W = 0,
                N = (F = 0),
                N = void 0,
                Y = m.__vertexArray,
                ga = m.__uvArray,
                ha = m.__uv2Array,
                fa = m.__normalArray,
                ma = m.__tangentArray,
                $ = m.__colorArray,
                ia = m.__skinVertexAArray,
                aa = m.__skinVertexBArray,
                ta = m.__skinIndexArray,
                ua = m.__skinWeightArray,
                sa = m.__morphTargetsArrays,
                na = m.__webglCustomAttributes,
                z = void 0,
                ra = m.__faceArray,
                oa = m.__lineArray,
                ya = m.__needsSmoothNormals,
                p = m.__vertexColorType,
                v = m.__uvType,
                u = m.__normalType,
                wa = h.geometry,
                Fa = wa.__dirtyVertices,
                va = wa.__dirtyElements,
                xa = wa.__dirtyUvs,
                Aa = wa.__dirtyNormals,
                Ia = wa.__dirtyTangents,
                Ja = wa.__dirtyColors,
                Da = wa.__dirtyMorphTargets,
                Pa = wa.vertices,
                Ga = m.faces,
                Ta = wa.faces,
                ab = wa.faceVertexUvs[0],
                bb = wa.faceVertexUvs[1],
                Qa = wa.skinVerticesA,
                Ra = wa.skinVerticesB,
                Sa = wa.skinIndices,
                Ha = wa.skinWeights,
                Ea = wa.morphTargets;
              if (na) for (S in na) (na[S].offset = 0), (na[S].offsetSrc = 0);
              w = 0;
              for (A = Ga.length; w < A; w++)
                if (
                  ((ja = Ga[w]),
                  (B = Ta[ja]),
                  ab && (x = ab[ja]),
                  bb && (U = bb[ja]),
                  (ja = B.vertexNormals),
                  (L = B.normal),
                  (P = B.vertexColors),
                  (pa = B.color),
                  (K = B.vertexTangents),
                  B instanceof THREE.Face3)
                ) {
                  if (Fa)
                    (o = Pa[B.a].position),
                      (C = Pa[B.b].position),
                      (E = Pa[B.c].position),
                      (Y[R] = o.x),
                      (Y[R + 1] = o.y),
                      (Y[R + 2] = o.z),
                      (Y[R + 3] = C.x),
                      (Y[R + 4] = C.y),
                      (Y[R + 5] = C.z),
                      (Y[R + 6] = E.x),
                      (Y[R + 7] = E.y),
                      (Y[R + 8] = E.z),
                      (R += 9);
                  if (na)
                    for (S in na)
                      if (((z = na[S]), z.__original.needsUpdate))
                        (F = z.offset),
                          (N = z.offsetSrc),
                          z.size === 1
                            ? (z.boundTo === void 0 || z.boundTo === "vertices"
                                ? ((z.array[F] = z.value[B.a]),
                                  (z.array[F + 1] = z.value[B.b]),
                                  (z.array[F + 2] = z.value[B.c]))
                                : z.boundTo === "faces"
                                ? ((N = z.value[N]),
                                  (z.array[F] = N),
                                  (z.array[F + 1] = N),
                                  (z.array[F + 2] = N),
                                  z.offsetSrc++)
                                : z.boundTo === "faceVertices" &&
                                  ((z.array[F] = z.value[N]),
                                  (z.array[F + 1] = z.value[N + 1]),
                                  (z.array[F + 2] = z.value[N + 2]),
                                  (z.offsetSrc += 3)),
                              (z.offset += 3))
                            : (z.boundTo === void 0 || z.boundTo === "vertices"
                                ? ((o = z.value[B.a]),
                                  (C = z.value[B.b]),
                                  (E = z.value[B.c]))
                                : z.boundTo === "faces"
                                ? ((E = C = o = N = z.value[N]), z.offsetSrc++)
                                : z.boundTo === "faceVertices" &&
                                  ((o = z.value[N]),
                                  (C = z.value[N + 1]),
                                  (E = z.value[N + 2]),
                                  (z.offsetSrc += 3)),
                              z.size === 2
                                ? ((z.array[F] = o.x),
                                  (z.array[F + 1] = o.y),
                                  (z.array[F + 2] = C.x),
                                  (z.array[F + 3] = C.y),
                                  (z.array[F + 4] = E.x),
                                  (z.array[F + 5] = E.y),
                                  (z.offset += 6))
                                : z.size === 3
                                ? (z.type === "c"
                                    ? ((z.array[F] = o.r),
                                      (z.array[F + 1] = o.g),
                                      (z.array[F + 2] = o.b),
                                      (z.array[F + 3] = C.r),
                                      (z.array[F + 4] = C.g),
                                      (z.array[F + 5] = C.b),
                                      (z.array[F + 6] = E.r),
                                      (z.array[F + 7] = E.g),
                                      (z.array[F + 8] = E.b))
                                    : ((z.array[F] = o.x),
                                      (z.array[F + 1] = o.y),
                                      (z.array[F + 2] = o.z),
                                      (z.array[F + 3] = C.x),
                                      (z.array[F + 4] = C.y),
                                      (z.array[F + 5] = C.z),
                                      (z.array[F + 6] = E.x),
                                      (z.array[F + 7] = E.y),
                                      (z.array[F + 8] = E.z)),
                                  (z.offset += 9))
                                : ((z.array[F] = o.x),
                                  (z.array[F + 1] = o.y),
                                  (z.array[F + 2] = o.z),
                                  (z.array[F + 3] = o.w),
                                  (z.array[F + 4] = C.x),
                                  (z.array[F + 5] = C.y),
                                  (z.array[F + 6] = C.z),
                                  (z.array[F + 7] = C.w),
                                  (z.array[F + 8] = E.x),
                                  (z.array[F + 9] = E.y),
                                  (z.array[F + 10] = E.z),
                                  (z.array[F + 11] = E.w),
                                  (z.offset += 12)));
                  if (Da) {
                    F = 0;
                    for (z = Ea.length; F < z; F++)
                      (o = Ea[F].vertices[B.a].position),
                        (C = Ea[F].vertices[B.b].position),
                        (E = Ea[F].vertices[B.c].position),
                        (N = sa[F]),
                        (N[W] = o.x),
                        (N[W + 1] = o.y),
                        (N[W + 2] = o.z),
                        (N[W + 3] = C.x),
                        (N[W + 4] = C.y),
                        (N[W + 5] = C.z),
                        (N[W + 6] = E.x),
                        (N[W + 7] = E.y),
                        (N[W + 8] = E.z);
                    W += 9;
                  }
                  if (Ha.length)
                    (F = Ha[B.a]),
                      (z = Ha[B.b]),
                      (N = Ha[B.c]),
                      (ua[O] = F.x),
                      (ua[O + 1] = F.y),
                      (ua[O + 2] = F.z),
                      (ua[O + 3] = F.w),
                      (ua[O + 4] = z.x),
                      (ua[O + 5] = z.y),
                      (ua[O + 6] = z.z),
                      (ua[O + 7] = z.w),
                      (ua[O + 8] = N.x),
                      (ua[O + 9] = N.y),
                      (ua[O + 10] = N.z),
                      (ua[O + 11] = N.w),
                      (F = Sa[B.a]),
                      (z = Sa[B.b]),
                      (N = Sa[B.c]),
                      (ta[O] = F.x),
                      (ta[O + 1] = F.y),
                      (ta[O + 2] = F.z),
                      (ta[O + 3] = F.w),
                      (ta[O + 4] = z.x),
                      (ta[O + 5] = z.y),
                      (ta[O + 6] = z.z),
                      (ta[O + 7] = z.w),
                      (ta[O + 8] = N.x),
                      (ta[O + 9] = N.y),
                      (ta[O + 10] = N.z),
                      (ta[O + 11] = N.w),
                      (F = Qa[B.a]),
                      (z = Qa[B.b]),
                      (N = Qa[B.c]),
                      (ia[O] = F.x),
                      (ia[O + 1] = F.y),
                      (ia[O + 2] = F.z),
                      (ia[O + 3] = 1),
                      (ia[O + 4] = z.x),
                      (ia[O + 5] = z.y),
                      (ia[O + 6] = z.z),
                      (ia[O + 7] = 1),
                      (ia[O + 8] = N.x),
                      (ia[O + 9] = N.y),
                      (ia[O + 10] = N.z),
                      (ia[O + 11] = 1),
                      (F = Ra[B.a]),
                      (z = Ra[B.b]),
                      (N = Ra[B.c]),
                      (aa[O] = F.x),
                      (aa[O + 1] = F.y),
                      (aa[O + 2] = F.z),
                      (aa[O + 3] = 1),
                      (aa[O + 4] = z.x),
                      (aa[O + 5] = z.y),
                      (aa[O + 6] = z.z),
                      (aa[O + 7] = 1),
                      (aa[O + 8] = N.x),
                      (aa[O + 9] = N.y),
                      (aa[O + 10] = N.z),
                      (aa[O + 11] = 1),
                      (O += 12);
                  if (Ja && p)
                    P.length == 3 && p == THREE.VertexColors
                      ? ((B = P[0]), (F = P[1]), (z = P[2]))
                      : (z = F = B = pa),
                      ($[da] = B.r),
                      ($[da + 1] = B.g),
                      ($[da + 2] = B.b),
                      ($[da + 3] = F.r),
                      ($[da + 4] = F.g),
                      ($[da + 5] = F.b),
                      ($[da + 6] = z.r),
                      ($[da + 7] = z.g),
                      ($[da + 8] = z.b),
                      (da += 9);
                  if (Ia && wa.hasTangents)
                    (P = K[0]),
                      (pa = K[1]),
                      (B = K[2]),
                      (ma[Z] = P.x),
                      (ma[Z + 1] = P.y),
                      (ma[Z + 2] = P.z),
                      (ma[Z + 3] = P.w),
                      (ma[Z + 4] = pa.x),
                      (ma[Z + 5] = pa.y),
                      (ma[Z + 6] = pa.z),
                      (ma[Z + 7] = pa.w),
                      (ma[Z + 8] = B.x),
                      (ma[Z + 9] = B.y),
                      (ma[Z + 10] = B.z),
                      (ma[Z + 11] = B.w),
                      (Z += 12);
                  if (Aa && u)
                    if (ja.length == 3 && ya)
                      for (K = 0; K < 3; K++)
                        (L = ja[K]),
                          (fa[T] = L.x),
                          (fa[T + 1] = L.y),
                          (fa[T + 2] = L.z),
                          (T += 3);
                    else
                      for (K = 0; K < 3; K++)
                        (fa[T] = L.x),
                          (fa[T + 1] = L.y),
                          (fa[T + 2] = L.z),
                          (T += 3);
                  if (xa && x !== void 0 && v)
                    for (K = 0; K < 3; K++)
                      (ja = x[K]),
                        (ga[ea] = ja.u),
                        (ga[ea + 1] = ja.v),
                        (ea += 2);
                  if (xa && U !== void 0 && v)
                    for (K = 0; K < 3; K++)
                      (ja = U[K]),
                        (ha[ca] = ja.u),
                        (ha[ca + 1] = ja.v),
                        (ca += 2);
                  va &&
                    ((ra[V] = la),
                    (ra[V + 1] = la + 1),
                    (ra[V + 2] = la + 2),
                    (V += 3),
                    (oa[X] = la),
                    (oa[X + 1] = la + 1),
                    (oa[X + 2] = la),
                    (oa[X + 3] = la + 2),
                    (oa[X + 4] = la + 1),
                    (oa[X + 5] = la + 2),
                    (X += 6),
                    (la += 3));
                } else if (B instanceof THREE.Face4) {
                  if (Fa)
                    (o = Pa[B.a].position),
                      (C = Pa[B.b].position),
                      (E = Pa[B.c].position),
                      (M = Pa[B.d].position),
                      (Y[R] = o.x),
                      (Y[R + 1] = o.y),
                      (Y[R + 2] = o.z),
                      (Y[R + 3] = C.x),
                      (Y[R + 4] = C.y),
                      (Y[R + 5] = C.z),
                      (Y[R + 6] = E.x),
                      (Y[R + 7] = E.y),
                      (Y[R + 8] = E.z),
                      (Y[R + 9] = M.x),
                      (Y[R + 10] = M.y),
                      (Y[R + 11] = M.z),
                      (R += 12);
                  if (na)
                    for (S in na)
                      if (((z = na[S]), z.__original.needsUpdate))
                        (F = z.offset),
                          (N = z.offsetSrc),
                          z.size === 1
                            ? (z.boundTo === void 0 || z.boundTo === "vertices"
                                ? ((z.array[F] = z.value[B.a]),
                                  (z.array[F + 1] = z.value[B.b]),
                                  (z.array[F + 2] = z.value[B.c]),
                                  (z.array[F + 3] = z.value[B.d]))
                                : z.boundTo === "faces"
                                ? ((N = z.value[N]),
                                  (z.array[F] = N),
                                  (z.array[F + 1] = N),
                                  (z.array[F + 2] = N),
                                  (z.array[F + 3] = N),
                                  z.offsetSrc++)
                                : z.boundTo === "faceVertices" &&
                                  ((z.array[F] = z.value[N]),
                                  (z.array[F + 1] = z.value[N + 1]),
                                  (z.array[F + 2] = z.value[N + 2]),
                                  (z.array[F + 3] = z.value[N + 3]),
                                  (z.offsetSrc += 4)),
                              (z.offset += 4))
                            : (z.boundTo === void 0 || z.boundTo === "vertices"
                                ? ((o = z.value[B.a]),
                                  (C = z.value[B.b]),
                                  (E = z.value[B.c]),
                                  (M = z.value[B.d]))
                                : z.boundTo === "faces"
                                ? ((M = E = C = o = N = z.value[N]),
                                  z.offsetSrc++)
                                : z.boundTo === "faceVertices" &&
                                  ((o = z.value[N]),
                                  (C = z.value[N + 1]),
                                  (E = z.value[N + 2]),
                                  (M = z.value[N + 3]),
                                  (z.offsetSrc += 4)),
                              z.size === 2
                                ? ((z.array[F] = o.x),
                                  (z.array[F + 1] = o.y),
                                  (z.array[F + 2] = C.x),
                                  (z.array[F + 3] = C.y),
                                  (z.array[F + 4] = E.x),
                                  (z.array[F + 5] = E.y),
                                  (z.array[F + 6] = M.x),
                                  (z.array[F + 7] = M.y),
                                  (z.offset += 8))
                                : z.size === 3
                                ? (z.type === "c"
                                    ? ((z.array[F] = o.r),
                                      (z.array[F + 1] = o.g),
                                      (z.array[F + 2] = o.b),
                                      (z.array[F + 3] = C.r),
                                      (z.array[F + 4] = C.g),
                                      (z.array[F + 5] = C.b),
                                      (z.array[F + 6] = E.r),
                                      (z.array[F + 7] = E.g),
                                      (z.array[F + 8] = E.b),
                                      (z.array[F + 9] = M.r),
                                      (z.array[F + 10] = M.g),
                                      (z.array[F + 11] = M.b))
                                    : ((z.array[F] = o.x),
                                      (z.array[F + 1] = o.y),
                                      (z.array[F + 2] = o.z),
                                      (z.array[F + 3] = C.x),
                                      (z.array[F + 4] = C.y),
                                      (z.array[F + 5] = C.z),
                                      (z.array[F + 6] = E.x),
                                      (z.array[F + 7] = E.y),
                                      (z.array[F + 8] = E.z),
                                      (z.array[F + 9] = M.x),
                                      (z.array[F + 10] = M.y),
                                      (z.array[F + 11] = M.z)),
                                  (z.offset += 12))
                                : ((z.array[F] = o.x),
                                  (z.array[F + 1] = o.y),
                                  (z.array[F + 2] = o.z),
                                  (z.array[F + 3] = o.w),
                                  (z.array[F + 4] = C.x),
                                  (z.array[F + 5] = C.y),
                                  (z.array[F + 6] = C.z),
                                  (z.array[F + 7] = C.w),
                                  (z.array[F + 8] = E.x),
                                  (z.array[F + 9] = E.y),
                                  (z.array[F + 10] = E.z),
                                  (z.array[F + 11] = E.w),
                                  (z.array[F + 12] = M.x),
                                  (z.array[F + 13] = M.y),
                                  (z.array[F + 14] = M.z),
                                  (z.array[F + 15] = M.w),
                                  (z.offset += 16)));
                  if (Da) {
                    F = 0;
                    for (z = Ea.length; F < z; F++)
                      (o = Ea[F].vertices[B.a].position),
                        (C = Ea[F].vertices[B.b].position),
                        (E = Ea[F].vertices[B.c].position),
                        (M = Ea[F].vertices[B.d].position),
                        (N = sa[F]),
                        (N[W] = o.x),
                        (N[W + 1] = o.y),
                        (N[W + 2] = o.z),
                        (N[W + 3] = C.x),
                        (N[W + 4] = C.y),
                        (N[W + 5] = C.z),
                        (N[W + 6] = E.x),
                        (N[W + 7] = E.y),
                        (N[W + 8] = E.z),
                        (N[W + 9] = M.x),
                        (N[W + 10] = M.y),
                        (N[W + 11] = M.z);
                    W += 12;
                  }
                  if (Ha.length)
                    (F = Ha[B.a]),
                      (z = Ha[B.b]),
                      (N = Ha[B.c]),
                      (Q = Ha[B.d]),
                      (ua[O] = F.x),
                      (ua[O + 1] = F.y),
                      (ua[O + 2] = F.z),
                      (ua[O + 3] = F.w),
                      (ua[O + 4] = z.x),
                      (ua[O + 5] = z.y),
                      (ua[O + 6] = z.z),
                      (ua[O + 7] = z.w),
                      (ua[O + 8] = N.x),
                      (ua[O + 9] = N.y),
                      (ua[O + 10] = N.z),
                      (ua[O + 11] = N.w),
                      (ua[O + 12] = Q.x),
                      (ua[O + 13] = Q.y),
                      (ua[O + 14] = Q.z),
                      (ua[O + 15] = Q.w),
                      (F = Sa[B.a]),
                      (z = Sa[B.b]),
                      (N = Sa[B.c]),
                      (Q = Sa[B.d]),
                      (ta[O] = F.x),
                      (ta[O + 1] = F.y),
                      (ta[O + 2] = F.z),
                      (ta[O + 3] = F.w),
                      (ta[O + 4] = z.x),
                      (ta[O + 5] = z.y),
                      (ta[O + 6] = z.z),
                      (ta[O + 7] = z.w),
                      (ta[O + 8] = N.x),
                      (ta[O + 9] = N.y),
                      (ta[O + 10] = N.z),
                      (ta[O + 11] = N.w),
                      (ta[O + 12] = Q.x),
                      (ta[O + 13] = Q.y),
                      (ta[O + 14] = Q.z),
                      (ta[O + 15] = Q.w),
                      (F = Qa[B.a]),
                      (z = Qa[B.b]),
                      (N = Qa[B.c]),
                      (Q = Qa[B.d]),
                      (ia[O] = F.x),
                      (ia[O + 1] = F.y),
                      (ia[O + 2] = F.z),
                      (ia[O + 3] = 1),
                      (ia[O + 4] = z.x),
                      (ia[O + 5] = z.y),
                      (ia[O + 6] = z.z),
                      (ia[O + 7] = 1),
                      (ia[O + 8] = N.x),
                      (ia[O + 9] = N.y),
                      (ia[O + 10] = N.z),
                      (ia[O + 11] = 1),
                      (ia[O + 12] = Q.x),
                      (ia[O + 13] = Q.y),
                      (ia[O + 14] = Q.z),
                      (ia[O + 15] = 1),
                      (F = Ra[B.a]),
                      (z = Ra[B.b]),
                      (N = Ra[B.c]),
                      (B = Ra[B.d]),
                      (aa[O] = F.x),
                      (aa[O + 1] = F.y),
                      (aa[O + 2] = F.z),
                      (aa[O + 3] = 1),
                      (aa[O + 4] = z.x),
                      (aa[O + 5] = z.y),
                      (aa[O + 6] = z.z),
                      (aa[O + 7] = 1),
                      (aa[O + 8] = N.x),
                      (aa[O + 9] = N.y),
                      (aa[O + 10] = N.z),
                      (aa[O + 11] = 1),
                      (aa[O + 12] = B.x),
                      (aa[O + 13] = B.y),
                      (aa[O + 14] = B.z),
                      (aa[O + 15] = 1),
                      (O += 16);
                  if (Ja && p)
                    P.length == 4 && p == THREE.VertexColors
                      ? ((B = P[0]), (F = P[1]), (z = P[2]), (P = P[3]))
                      : (P = z = F = B = pa),
                      ($[da] = B.r),
                      ($[da + 1] = B.g),
                      ($[da + 2] = B.b),
                      ($[da + 3] = F.r),
                      ($[da + 4] = F.g),
                      ($[da + 5] = F.b),
                      ($[da + 6] = z.r),
                      ($[da + 7] = z.g),
                      ($[da + 8] = z.b),
                      ($[da + 9] = P.r),
                      ($[da + 10] = P.g),
                      ($[da + 11] = P.b),
                      (da += 12);
                  if (Ia && wa.hasTangents)
                    (P = K[0]),
                      (pa = K[1]),
                      (B = K[2]),
                      (K = K[3]),
                      (ma[Z] = P.x),
                      (ma[Z + 1] = P.y),
                      (ma[Z + 2] = P.z),
                      (ma[Z + 3] = P.w),
                      (ma[Z + 4] = pa.x),
                      (ma[Z + 5] = pa.y),
                      (ma[Z + 6] = pa.z),
                      (ma[Z + 7] = pa.w),
                      (ma[Z + 8] = B.x),
                      (ma[Z + 9] = B.y),
                      (ma[Z + 10] = B.z),
                      (ma[Z + 11] = B.w),
                      (ma[Z + 12] = K.x),
                      (ma[Z + 13] = K.y),
                      (ma[Z + 14] = K.z),
                      (ma[Z + 15] = K.w),
                      (Z += 16);
                  if (Aa && u)
                    if (ja.length == 4 && ya)
                      for (K = 0; K < 4; K++)
                        (L = ja[K]),
                          (fa[T] = L.x),
                          (fa[T + 1] = L.y),
                          (fa[T + 2] = L.z),
                          (T += 3);
                    else
                      for (K = 0; K < 4; K++)
                        (fa[T] = L.x),
                          (fa[T + 1] = L.y),
                          (fa[T + 2] = L.z),
                          (T += 3);
                  if (xa && x !== void 0 && v)
                    for (K = 0; K < 4; K++)
                      (ja = x[K]),
                        (ga[ea] = ja.u),
                        (ga[ea + 1] = ja.v),
                        (ea += 2);
                  if (xa && U !== void 0 && v)
                    for (K = 0; K < 4; K++)
                      (ja = U[K]),
                        (ha[ca] = ja.u),
                        (ha[ca + 1] = ja.v),
                        (ca += 2);
                  va &&
                    ((ra[V] = la),
                    (ra[V + 1] = la + 1),
                    (ra[V + 2] = la + 3),
                    (ra[V + 3] = la + 1),
                    (ra[V + 4] = la + 2),
                    (ra[V + 5] = la + 3),
                    (V += 6),
                    (oa[X] = la),
                    (oa[X + 1] = la + 1),
                    (oa[X + 2] = la),
                    (oa[X + 3] = la + 3),
                    (oa[X + 4] = la + 1),
                    (oa[X + 5] = la + 2),
                    (oa[X + 6] = la + 2),
                    (oa[X + 7] = la + 3),
                    (X += 8),
                    (la += 4));
                }
              Fa &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglVertexBuffer),
                n.bufferData(n.ARRAY_BUFFER, Y, t));
              if (na)
                for (S in na)
                  (z = na[S]),
                    z.__original.needsUpdate &&
                      (n.bindBuffer(n.ARRAY_BUFFER, z.buffer),
                      n.bufferData(n.ARRAY_BUFFER, z.array, t));
              if (Da) {
                F = 0;
                for (z = Ea.length; F < z; F++)
                  n.bindBuffer(n.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[F]),
                    n.bufferData(n.ARRAY_BUFFER, sa[F], t);
              }
              Ja &&
                da > 0 &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglColorBuffer),
                n.bufferData(n.ARRAY_BUFFER, $, t));
              Aa &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglNormalBuffer),
                n.bufferData(n.ARRAY_BUFFER, fa, t));
              Ia &&
                wa.hasTangents &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglTangentBuffer),
                n.bufferData(n.ARRAY_BUFFER, ma, t));
              xa &&
                ea > 0 &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglUVBuffer),
                n.bufferData(n.ARRAY_BUFFER, ga, t));
              xa &&
                ca > 0 &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglUV2Buffer),
                n.bufferData(n.ARRAY_BUFFER, ha, t));
              va &&
                (n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, m.__webglFaceBuffer),
                n.bufferData(n.ELEMENT_ARRAY_BUFFER, ra, t),
                n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, m.__webglLineBuffer),
                n.bufferData(n.ELEMENT_ARRAY_BUFFER, oa, t));
              O > 0 &&
                (n.bindBuffer(n.ARRAY_BUFFER, m.__webglSkinVertexABuffer),
                n.bufferData(n.ARRAY_BUFFER, ia, t),
                n.bindBuffer(n.ARRAY_BUFFER, m.__webglSkinVertexBBuffer),
                n.bufferData(n.ARRAY_BUFFER, aa, t),
                n.bindBuffer(n.ARRAY_BUFFER, m.__webglSkinIndicesBuffer),
                n.bufferData(n.ARRAY_BUFFER, ta, t),
                n.bindBuffer(n.ARRAY_BUFFER, m.__webglSkinWeightsBuffer),
                n.bufferData(n.ARRAY_BUFFER, ua, t));
              H &&
                (delete m.__inittedArrays,
                delete m.__colorArray,
                delete m.__normalArray,
                delete m.__tangentArray,
                delete m.__uvArray,
                delete m.__uv2Array,
                delete m.__faceArray,
                delete m.__vertexArray,
                delete m.__lineArray,
                delete m.__skinVertexAArray,
                delete m.__skinVertexBArray,
                delete m.__skinIndexArray,
                delete m.__skinWeightArray);
            }
        g.__dirtyVertices = !1;
        g.__dirtyMorphTargets = !1;
        g.__dirtyElements = !1;
        g.__dirtyUvs = !1;
        g.__dirtyNormals = !1;
        g.__dirtyTangents = !1;
        g.__dirtyColors = !1;
        G(k);
      } else if (h instanceof THREE.Ribbon) {
        g = h.geometry;
        if (g.__dirtyVertices || g.__dirtyColors) {
          h = g;
          j = n.DYNAMIC_DRAW;
          k = A = w = w = void 0;
          v = h.vertices;
          m = h.colors;
          p = v.length;
          t = m.length;
          u = h.__vertexArray;
          H = h.__colorArray;
          x = h.__dirtyColors;
          if (h.__dirtyVertices) {
            for (w = 0; w < p; w++)
              (A = v[w].position),
                (k = w * 3),
                (u[k] = A.x),
                (u[k + 1] = A.y),
                (u[k + 2] = A.z);
            n.bindBuffer(n.ARRAY_BUFFER, h.__webglVertexBuffer);
            n.bufferData(n.ARRAY_BUFFER, u, j);
          }
          if (x) {
            for (w = 0; w < t; w++)
              (color = m[w]),
                (k = w * 3),
                (H[k] = color.r),
                (H[k + 1] = color.g),
                (H[k + 2] = color.b);
            n.bindBuffer(n.ARRAY_BUFFER, h.__webglColorBuffer);
            n.bufferData(n.ARRAY_BUFFER, H, j);
          }
        }
        g.__dirtyVertices = !1;
        g.__dirtyColors = !1;
      } else if (h instanceof THREE.Line) {
        g = h.geometry;
        if (g.__dirtyVertices || g.__dirtyColors) {
          h = g;
          j = n.DYNAMIC_DRAW;
          k = A = w = w = void 0;
          v = h.vertices;
          m = h.colors;
          p = v.length;
          t = m.length;
          u = h.__vertexArray;
          H = h.__colorArray;
          x = h.__dirtyColors;
          if (h.__dirtyVertices) {
            for (w = 0; w < p; w++)
              (A = v[w].position),
                (k = w * 3),
                (u[k] = A.x),
                (u[k + 1] = A.y),
                (u[k + 2] = A.z);
            n.bindBuffer(n.ARRAY_BUFFER, h.__webglVertexBuffer);
            n.bufferData(n.ARRAY_BUFFER, u, j);
          }
          if (x) {
            for (w = 0; w < t; w++)
              (color = m[w]),
                (k = w * 3),
                (H[k] = color.r),
                (H[k + 1] = color.g),
                (H[k + 2] = color.b);
            n.bindBuffer(n.ARRAY_BUFFER, h.__webglColorBuffer);
            n.bufferData(n.ARRAY_BUFFER, H, j);
          }
        }
        g.__dirtyVertices = !1;
        g.__dirtyColors = !1;
      } else if (h instanceof THREE.ParticleSystem)
        (g = h.geometry),
          (m = y(g)),
          (g.__dirtyVertices || g.__dirtyColors || h.sortParticles || m) &&
            c(g, n.DYNAMIC_DRAW, h),
          (g.__dirtyVertices = !1),
          (g.__dirtyColors = !1),
          G(g);
  };
  this.setFaceCulling = function (b, c) {
    b
      ? (!c || c == "ccw" ? n.frontFace(n.CCW) : n.frontFace(n.CW),
        b == "back"
          ? n.cullFace(n.BACK)
          : b == "front"
          ? n.cullFace(n.FRONT)
          : n.cullFace(n.FRONT_AND_BACK),
        n.enable(n.CULL_FACE))
      : n.disable(n.CULL_FACE);
  };
  this.supportsVertexTextures = function () {
    return sa;
  };
};
THREE.WebGLRenderTarget = function (b, c, e) {
  this.width = b;
  this.height = c;
  e = e || {};
  this.wrapS = e.wrapS !== void 0 ? e.wrapS : THREE.ClampToEdgeWrapping;
  this.wrapT = e.wrapT !== void 0 ? e.wrapT : THREE.ClampToEdgeWrapping;
  this.magFilter = e.magFilter !== void 0 ? e.magFilter : THREE.LinearFilter;
  this.minFilter =
    e.minFilter !== void 0 ? e.minFilter : THREE.LinearMipMapLinearFilter;
  this.offset = new THREE.Vector2(0, 0);
  this.repeat = new THREE.Vector2(1, 1);
  this.format = e.format !== void 0 ? e.format : THREE.RGBAFormat;
  this.type = e.type !== void 0 ? e.type : THREE.UnsignedByteType;
  this.depthBuffer = e.depthBuffer !== void 0 ? e.depthBuffer : !0;
  this.stencilBuffer = e.stencilBuffer !== void 0 ? e.stencilBuffer : !0;
};
THREE.WebGLRenderTargetCube = function (b, c, e) {
  THREE.WebGLRenderTarget.call(this, b, c, e);
  this.activeCubeFace = 0;
};
THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget();
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
THREE.RenderableVertex = function () {
  this.positionWorld = new THREE.Vector3();
  this.positionScreen = new THREE.Vector4();
  this.visible = !0;
};
THREE.RenderableVertex.prototype.copy = function (b) {
  this.positionWorld.copy(b.positionWorld);
  this.positionScreen.copy(b.positionScreen);
};
THREE.RenderableFace3 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.faceMaterials = this.meshMaterials = null;
  this.overdraw = !1;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableFace4 = function () {
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.v4 = new THREE.RenderableVertex();
  this.centroidWorld = new THREE.Vector3();
  this.centroidScreen = new THREE.Vector3();
  this.normalWorld = new THREE.Vector3();
  this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ];
  this.faceMaterials = this.meshMaterials = null;
  this.overdraw = !1;
  this.uvs = [[]];
  this.z = null;
};
THREE.RenderableObject = function () {
  this.z = this.object = null;
};
THREE.RenderableParticle = function () {
  this.rotation = this.z = this.y = this.x = null;
  this.scale = new THREE.Vector2();
  this.materials = null;
};
THREE.RenderableLine = function () {
  this.z = null;
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.materials = null;
};
THREE.ColorUtils = {
  adjustHSV: function (b, c, e, f) {
    var g = THREE.ColorUtils.__hsv;
    THREE.ColorUtils.rgbToHsv(b, g);
    g.h = THREE.ColorUtils.clamp(g.h + c, 0, 1);
    g.s = THREE.ColorUtils.clamp(g.s + e, 0, 1);
    g.v = THREE.ColorUtils.clamp(g.v + f, 0, 1);
    b.setHSV(g.h, g.s, g.v);
  },
  rgbToHsv: function (b, c) {
    var e = b.r,
      f = b.g,
      g = b.b,
      j = Math.max(Math.max(e, f), g),
      h = Math.min(Math.min(e, f), g);
    if (h == j) h = e = 0;
    else {
      var k = j - h,
        h = k / j,
        e = e == j ? (f - g) / k : f == j ? 2 + (g - e) / k : 4 + (e - f) / k;
      e /= 6;
      e < 0 && (e += 1);
      e > 1 && (e -= 1);
    }
    c === void 0 && (c = { h: 0, s: 0, v: 0 });
    c.h = e;
    c.s = h;
    c.v = j;
    return c;
  },
  clamp: function (b, c, e) {
    return b < c ? c : b > e ? e : b;
  },
};
THREE.ColorUtils.__hsv = { h: 0, s: 0, v: 0 };
THREE.GeometryUtils = {
  merge: function (b, c) {
    var e = c instanceof THREE.Mesh,
      f = b.vertices.length,
      g = e ? c.geometry : c,
      j = b.vertices,
      h = g.vertices,
      k = b.faces,
      m = g.faces,
      o = b.faceVertexUvs[0],
      g = g.faceVertexUvs[0];
    e && c.matrixAutoUpdate && c.updateMatrix();
    for (var p = 0, u = h.length; p < u; p++) {
      var v = new THREE.Vertex(h[p].position.clone());
      e && c.matrix.multiplyVector3(v.position);
      j.push(v);
    }
    p = 0;
    for (u = m.length; p < u; p++) {
      var h = m[p],
        t,
        x,
        w = h.vertexNormals,
        v = h.vertexColors;
      h instanceof THREE.Face3
        ? (t = new THREE.Face3(h.a + f, h.b + f, h.c + f))
        : h instanceof THREE.Face4 &&
          (t = new THREE.Face4(h.a + f, h.b + f, h.c + f, h.d + f));
      t.normal.copy(h.normal);
      e = 0;
      for (j = w.length; e < j; e++)
        (x = w[e]), t.vertexNormals.push(x.clone());
      t.color.copy(h.color);
      e = 0;
      for (j = v.length; e < j; e++) (x = v[e]), t.vertexColors.push(x.clone());
      t.materials = h.materials.slice();
      t.centroid.copy(h.centroid);
      k.push(t);
    }
    p = 0;
    for (u = g.length; p < u; p++) {
      f = g[p];
      k = [];
      e = 0;
      for (j = f.length; e < j; e++) k.push(new THREE.UV(f[e].u, f[e].v));
      o.push(k);
    }
  },
  clone: function (b) {
    var c = new THREE.Geometry(),
      e,
      f = b.vertices,
      g = b.faces,
      j = b.faceVertexUvs[0],
      b = 0;
    for (e = f.length; b < e; b++) {
      var h = new THREE.Vertex(f[b].position.clone());
      c.vertices.push(h);
    }
    b = 0;
    for (e = g.length; b < e; b++) {
      var k = g[b],
        m,
        o,
        p = k.vertexNormals,
        u = k.vertexColors;
      k instanceof THREE.Face3
        ? (m = new THREE.Face3(k.a, k.b, k.c))
        : k instanceof THREE.Face4 && (m = new THREE.Face4(k.a, k.b, k.c, k.d));
      m.normal.copy(k.normal);
      f = 0;
      for (h = p.length; f < h; f++)
        (o = p[f]), m.vertexNormals.push(o.clone());
      m.color.copy(k.color);
      f = 0;
      for (h = u.length; f < h; f++) (o = u[f]), m.vertexColors.push(o.clone());
      m.materials = k.materials.slice();
      m.centroid.copy(k.centroid);
      c.faces.push(m);
    }
    b = 0;
    for (e = j.length; b < e; b++) {
      g = j[b];
      m = [];
      f = 0;
      for (h = g.length; f < h; f++) m.push(new THREE.UV(g[f].u, g[f].v));
      c.faceVertexUvs[0].push(m);
    }
    return c;
  },
  randomPointInTriangle: function (b, c, e) {
    var f,
      g,
      j,
      h = new THREE.Vector3(),
      k = THREE.GeometryUtils.__v1;
    f = THREE.GeometryUtils.random();
    g = THREE.GeometryUtils.random();
    f + g > 1 && ((f = 1 - f), (g = 1 - g));
    j = 1 - f - g;
    h.copy(b);
    h.multiplyScalar(f);
    k.copy(c);
    k.multiplyScalar(g);
    h.addSelf(k);
    k.copy(e);
    k.multiplyScalar(j);
    h.addSelf(k);
    return h;
  },
  randomPointInFace: function (b, c, e) {
    var f, g, j;
    if (b instanceof THREE.Face3)
      return (
        (f = c.vertices[b.a].position),
        (g = c.vertices[b.b].position),
        (j = c.vertices[b.c].position),
        THREE.GeometryUtils.randomPointInTriangle(f, g, j)
      );
    else if (b instanceof THREE.Face4) {
      f = c.vertices[b.a].position;
      g = c.vertices[b.b].position;
      j = c.vertices[b.c].position;
      var c = c.vertices[b.d].position,
        h;
      e
        ? b._area1 && b._area2
          ? ((e = b._area1), (h = b._area2))
          : ((e = THREE.GeometryUtils.triangleArea(f, g, c)),
            (h = THREE.GeometryUtils.triangleArea(g, j, c)),
            (b._area1 = e),
            (b._area2 = h))
        : ((e = THREE.GeometryUtils.triangleArea(f, g, c)),
          (h = THREE.GeometryUtils.triangleArea(g, j, c)));
      return THREE.GeometryUtils.random() * (e + h) < e
        ? THREE.GeometryUtils.randomPointInTriangle(f, g, c)
        : THREE.GeometryUtils.randomPointInTriangle(g, j, c);
    }
  },
  randomPointsInGeometry: function (b, c) {
    function e(b) {
      function c(e, f) {
        if (f < e) return e;
        var h = e + Math.floor((f - e) / 2);
        return o[h] > b ? c(e, h - 1) : o[h] < b ? c(h + 1, f) : h;
      }
      return c(0, o.length - 1);
    }
    var f,
      g,
      j = b.faces,
      h = b.vertices,
      k = j.length,
      m = 0,
      o = [],
      p,
      u,
      v,
      t;
    for (g = 0; g < k; g++) {
      f = j[g];
      if (f instanceof THREE.Face3)
        (p = h[f.a].position),
          (u = h[f.b].position),
          (v = h[f.c].position),
          (f._area = THREE.GeometryUtils.triangleArea(p, u, v));
      else if (f instanceof THREE.Face4)
        (p = h[f.a].position),
          (u = h[f.b].position),
          (v = h[f.c].position),
          (t = h[f.d].position),
          (f._area1 = THREE.GeometryUtils.triangleArea(p, u, t)),
          (f._area2 = THREE.GeometryUtils.triangleArea(u, v, t)),
          (f._area = f._area1 + f._area2);
      m += f._area;
      o[g] = m;
    }
    f = [];
    h = {};
    for (g = 0; g < c; g++)
      (k = THREE.GeometryUtils.random() * m),
        (k = e(k)),
        (f[g] = THREE.GeometryUtils.randomPointInFace(j[k], b, !0)),
        h[k] ? (h[k] += 1) : (h[k] = 1);
    return f;
  },
  triangleArea: function (b, c, e) {
    var f,
      g = THREE.GeometryUtils.__v1;
    g.sub(b, c);
    f = g.length();
    g.sub(b, e);
    b = g.length();
    g.sub(c, e);
    e = g.length();
    c = 0.5 * (f + b + e);
    return Math.sqrt(c * (c - f) * (c - b) * (c - e));
  },
  random16: function () {
    return (65280 * Math.random() + 255 * Math.random()) / 65535;
  },
};
THREE.GeometryUtils.random = THREE.GeometryUtils.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3();
THREE.ImageUtils = {
  loadTexture: function (b, c, e) {
    var f = new Image(),
      g = new THREE.Texture(f, c);
    f.onload = function () {
      g.needsUpdate = !0;
      e && e(this);
    };
    f.crossOrigin = "";
    f.src = b;
    return g;
  },
  loadTextureCube: function (b, c, e) {
    var f,
      g = [],
      j = new THREE.Texture(g, c),
      c = (g.loadCount = 0);
    for (f = b.length; c < f; ++c)
      (g[c] = new Image()),
        (g[c].onload = function () {
          g.loadCount += 1;
          if (g.loadCount == 6) j.needsUpdate = !0;
          e && e(this);
        }),
        (g[c].crossOrigin = ""),
        (g[c].src = b[c]);
    return j;
  },
  getNormalMap: function (b, c) {
    var e = function (b) {
      var c = Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]);
      return [b[0] / c, b[1] / c, b[2] / c];
    };
    c |= 1;
    var f = b.width,
      g = b.height,
      j = document.createElement("canvas");
    j.width = f;
    j.height = g;
    var h = j.getContext("2d");
    h.drawImage(b, 0, 0);
    for (
      var k = h.getImageData(0, 0, f, g).data,
        m = h.createImageData(f, g),
        o = m.data,
        p = 0;
      p < f;
      p++
    )
      for (var u = 1; u < g; u++) {
        var v = u - 1 < 0 ? g - 1 : u - 1,
          t = (u + 1) % g,
          x = p - 1 < 0 ? f - 1 : p - 1,
          w = (p + 1) % f,
          A = [],
          y = [0, 0, (k[(u * f + p) * 4] / 255) * c];
        A.push([-1, 0, (k[(u * f + x) * 4] / 255) * c]);
        A.push([-1, -1, (k[(v * f + x) * 4] / 255) * c]);
        A.push([0, -1, (k[(v * f + p) * 4] / 255) * c]);
        A.push([1, -1, (k[(v * f + w) * 4] / 255) * c]);
        A.push([1, 0, (k[(u * f + w) * 4] / 255) * c]);
        A.push([1, 1, (k[(t * f + w) * 4] / 255) * c]);
        A.push([0, 1, (k[(t * f + p) * 4] / 255) * c]);
        A.push([-1, 1, (k[(t * f + x) * 4] / 255) * c]);
        v = [];
        x = A.length;
        for (t = 0; t < x; t++) {
          var w = A[t],
            G = A[(t + 1) % x],
            w = [w[0] - y[0], w[1] - y[1], w[2] - y[2]],
            G = [G[0] - y[0], G[1] - y[1], G[2] - y[2]];
          v.push(
            e([
              w[1] * G[2] - w[2] * G[1],
              w[2] * G[0] - w[0] * G[2],
              w[0] * G[1] - w[1] * G[0],
            ])
          );
        }
        A = [0, 0, 0];
        for (t = 0; t < v.length; t++)
          (A[0] += v[t][0]), (A[1] += v[t][1]), (A[2] += v[t][2]);
        A[0] /= v.length;
        A[1] /= v.length;
        A[2] /= v.length;
        y = (u * f + p) * 4;
        o[y] = (((A[0] + 1) / 2) * 255) | 0;
        o[y + 1] = ((A[1] + 0.5) * 255) | 0;
        o[y + 2] = (A[2] * 255) | 0;
        o[y + 3] = 255;
      }
    h.putImageData(m, 0, 0);
    return j;
  },
};
THREE.SceneUtils = {
  showHierarchy: function (b, c) {
    THREE.SceneUtils.traverseHierarchy(b, function (b) {
      b.visible = c;
    });
  },
  traverseHierarchy: function (b, c) {
    var e,
      f,
      g = b.children.length;
    for (f = 0; f < g; f++)
      (e = b.children[f]), c(e), THREE.SceneUtils.traverseHierarchy(e, c);
  },
};
if (THREE.WebGLRenderer)
  THREE.ShaderUtils = {
    lib: {
      fresnel: {
        uniforms: {
          mRefractionRatio: { type: "f", value: 1.02 },
          mFresnelBias: { type: "f", value: 0.1 },
          mFresnelPower: { type: "f", value: 2 },
          mFresnelScale: { type: "f", value: 1 },
          tCube: { type: "t", value: 1, texture: null },
        },
        fragmentShader:
          "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
        vertexShader:
          "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}",
      },
      normal: {
        uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib.fog,
          THREE.UniformsLib.lights,
          {
            enableAO: { type: "i", value: 0 },
            enableDiffuse: { type: "i", value: 0 },
            enableSpecular: { type: "i", value: 0 },
            tDiffuse: { type: "t", value: 0, texture: null },
            tNormal: { type: "t", value: 2, texture: null },
            tSpecular: { type: "t", value: 3, texture: null },
            tAO: { type: "t", value: 4, texture: null },
            uNormalScale: { type: "f", value: 1 },
            tDisplacement: { type: "t", value: 5, texture: null },
            uDisplacementBias: { type: "f", value: 0 },
            uDisplacementScale: { type: "f", value: 1 },
            uDiffuseColor: { type: "c", value: new THREE.Color(15658734) },
            uSpecularColor: { type: "c", value: new THREE.Color(1118481) },
            uAmbientColor: { type: "c", value: new THREE.Color(328965) },
            uShininess: { type: "f", value: 30 },
            uOpacity: { type: "f", value: 1 },
          },
        ]),
        fragmentShader: [
          "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
          THREE.ShaderChunk.fog_pars_fragment,
          "void main() {\ngl_FragColor = vec4( 1.0 );\nvec4 mColor = vec4( uDiffuseColor, uOpacity );\nvec4 mSpecular = vec4( uSpecularColor, uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\nif( enableAO )\ngl_FragColor = gl_FragColor * texture2D( tAO, vUv );\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointTotal = vec4( vec3( 0.0 ), 1.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + viewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointTotal  += pointDistance * vec4( pointLightColor[ i ], 1.0 ) * ( mColor * pointDiffuseWeight + mSpecular * pointSpecularWeight * pointDiffuseWeight );\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirTotal = vec4( vec3( 0.0 ), 1.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + viewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirTotal  += vec4( directionalLightColor[ i ], 1.0 ) * ( mColor * dirDiffuseWeight + mSpecular * dirSpecularWeight * dirDiffuseWeight );\n}\n#endif\nvec4 totalLight = vec4( ambientLightColor * uAmbientColor, uOpacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirTotal;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointTotal;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
          THREE.ShaderChunk.fog_fragment,
          "}",
        ].join("\n"),
        vertexShader:
          "attribute vec4 tangent;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}",
      },
      cube: {
        uniforms: { tCube: { type: "t", value: 1, texture: null } },
        vertexShader:
          "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
          "uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}",
      },
      convolution: {
        uniforms: {
          tDiffuse: { type: "t", value: 0, texture: null },
          uImageIncrement: {
            type: "v2",
            value: new THREE.Vector2(0.001953125, 0),
          },
          cKernel: { type: "fv1", value: [] },
        },
        vertexShader:
          "varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
          "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}",
      },
      film: {
        uniforms: {
          tDiffuse: { type: "t", value: 0, texture: null },
          time: { type: "f", value: 0 },
          nIntensity: { type: "f", value: 0.5 },
          sIntensity: { type: "f", value: 0.05 },
          sCount: { type: "f", value: 4096 },
          grayscale: { type: "i", value: 1 },
        },
        vertexShader:
          "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
          "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}",
      },
      screen: {
        uniforms: {
          tDiffuse: { type: "t", value: 0, texture: null },
          opacity: { type: "f", value: 1 },
        },
        vertexShader:
          "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
          "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}",
      },
      basic: {
        uniforms: {},
        vertexShader:
          "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
          "void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}",
      },
    },
    buildKernel: function (b) {
      var c,
        e,
        f,
        g,
        j = 2 * Math.ceil(b * 3) + 1;
      j > 25 && (j = 25);
      g = (j - 1) * 0.5;
      e = Array(j);
      for (c = f = 0; c < j; ++c)
        (e[c] = Math.exp(-((c - g) * (c - g)) / (2 * b * b))), (f += e[c]);
      for (c = 0; c < j; ++c) e[c] /= f;
      return e;
    },
  };
THREE.AnimationHandler = (function () {
  var b = [],
    c = {},
    e = {
      update: function (c) {
        for (var e = 0; e < b.length; e++) b[e].update(c);
      },
      addToUpdate: function (c) {
        b.indexOf(c) === -1 && b.push(c);
      },
      removeFromUpdate: function (c) {
        c = b.indexOf(c);
        c !== -1 && b.splice(c, 1);
      },
      add: function (b) {
        c[b.name] !== void 0 &&
          console.log(
            "THREE.AnimationHandler.add: Warning! " +
              b.name +
              " already exists in library. Overwriting."
          );
        c[b.name] = b;
        if (b.initialized !== !0) {
          for (var e = 0; e < b.hierarchy.length; e++) {
            for (var f = 0; f < b.hierarchy[e].keys.length; f++) {
              if (b.hierarchy[e].keys[f].time < 0)
                b.hierarchy[e].keys[f].time = 0;
              if (
                b.hierarchy[e].keys[f].rot !== void 0 &&
                !(b.hierarchy[e].keys[f].rot instanceof THREE.Quaternion)
              ) {
                var k = b.hierarchy[e].keys[f].rot;
                b.hierarchy[e].keys[f].rot = new THREE.Quaternion(
                  k[0],
                  k[1],
                  k[2],
                  k[3]
                );
              }
            }
            if (b.hierarchy[e].keys[0].morphTargets !== void 0) {
              k = {};
              for (f = 0; f < b.hierarchy[e].keys.length; f++)
                for (
                  var m = 0;
                  m < b.hierarchy[e].keys[f].morphTargets.length;
                  m++
                ) {
                  var o = b.hierarchy[e].keys[f].morphTargets[m];
                  k[o] = -1;
                }
              b.hierarchy[e].usedMorphTargets = k;
              for (f = 0; f < b.hierarchy[e].keys.length; f++) {
                var p = {};
                for (o in k) {
                  for (
                    m = 0;
                    m < b.hierarchy[e].keys[f].morphTargets.length;
                    m++
                  )
                    if (b.hierarchy[e].keys[f].morphTargets[m] === o) {
                      p[o] = b.hierarchy[e].keys[f].morphTargetsInfluences[m];
                      break;
                    }
                  m === b.hierarchy[e].keys[f].morphTargets.length &&
                    (p[o] = 0);
                }
                b.hierarchy[e].keys[f].morphTargetsInfluences = p;
              }
            }
            for (f = 1; f < b.hierarchy[e].keys.length; f++)
              b.hierarchy[e].keys[f].time === b.hierarchy[e].keys[f - 1].time &&
                (b.hierarchy[e].keys.splice(f, 1), f--);
            for (f = 1; f < b.hierarchy[e].keys.length; f++)
              b.hierarchy[e].keys[f].index = f;
          }
          f = parseInt(b.length * b.fps, 10);
          b.JIT = {};
          b.JIT.hierarchy = [];
          for (e = 0; e < b.hierarchy.length; e++)
            b.JIT.hierarchy.push(Array(f));
          b.initialized = !0;
        }
      },
      get: function (b) {
        if (typeof b === "string")
          return c[b]
            ? c[b]
            : (console.log(
                "THREE.AnimationHandler.get: Couldn't find animation " + b
              ),
              null);
      },
      parse: function (b) {
        var e = [];
        if (b instanceof THREE.SkinnedMesh)
          for (var c = 0; c < b.bones.length; c++) e.push(b.bones[c]);
        else f(b, e);
        return e;
      },
    },
    f = function (b, e) {
      e.push(b);
      for (var c = 0; c < b.children.length; c++) f(b.children[c], e);
    };
  e.LINEAR = 0;
  e.CATMULLROM = 1;
  e.CATMULLROM_FORWARD = 2;
  return e;
})();
THREE.Animation = function (b, c, e, f) {
  this.root = b;
  this.data = THREE.AnimationHandler.get(c);
  this.hierarchy = THREE.AnimationHandler.parse(b);
  this.currentTime = 0;
  this.timeScale = 1;
  this.isPlaying = !1;
  this.loop = this.isPaused = !0;
  this.interpolationType = e !== void 0 ? e : THREE.AnimationHandler.LINEAR;
  this.JITCompile = f !== void 0 ? f : !0;
  this.points = [];
  this.target = new THREE.Vector3();
};
THREE.Animation.prototype.play = function (b, c) {
  if (!this.isPlaying) {
    this.isPlaying = !0;
    this.loop = b !== void 0 ? b : !0;
    this.currentTime = c !== void 0 ? c : 0;
    var e,
      f = this.hierarchy.length,
      g;
    for (e = 0; e < f; e++) {
      g = this.hierarchy[e];
      if (this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD)
        g.useQuaternion = !0;
      g.matrixAutoUpdate = !0;
      if (g.animationCache === void 0)
        (g.animationCache = {}),
          (g.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 }),
          (g.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 }),
          (g.animationCache.originalMatrix =
            g instanceof THREE.Bone ? g.skinMatrix : g.matrix);
      var j = g.animationCache.prevKey;
      g = g.animationCache.nextKey;
      j.pos = this.data.hierarchy[e].keys[0];
      j.rot = this.data.hierarchy[e].keys[0];
      j.scl = this.data.hierarchy[e].keys[0];
      g.pos = this.getNextKeyWith("pos", e, 1);
      g.rot = this.getNextKeyWith("rot", e, 1);
      g.scl = this.getNextKeyWith("scl", e, 1);
    }
    this.update(0);
  }
  this.isPaused = !1;
  THREE.AnimationHandler.addToUpdate(this);
};
THREE.Animation.prototype.pause = function () {
  this.isPaused
    ? THREE.AnimationHandler.addToUpdate(this)
    : THREE.AnimationHandler.removeFromUpdate(this);
  this.isPaused = !this.isPaused;
};
THREE.Animation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1;
  THREE.AnimationHandler.removeFromUpdate(this);
  for (var b = 0; b < this.hierarchy.length; b++)
    if (this.hierarchy[b].animationCache !== void 0)
      this.hierarchy[b] instanceof THREE.Bone
        ? (this.hierarchy[b].skinMatrix =
            this.hierarchy[b].animationCache.originalMatrix)
        : (this.hierarchy[b].matrix =
            this.hierarchy[b].animationCache.originalMatrix),
        delete this.hierarchy[b].animationCache;
};
THREE.Animation.prototype.update = function (b) {
  if (this.isPlaying) {
    var c = ["pos", "rot", "scl"],
      e,
      f,
      g,
      j,
      h,
      k,
      m,
      o,
      p = this.data.JIT.hierarchy,
      u,
      v;
    this.currentTime += b * this.timeScale;
    v = this.currentTime;
    u = this.currentTime %= this.data.length;
    o = parseInt(
      Math.min(u * this.data.fps, this.data.length * this.data.fps),
      10
    );
    for (var t = 0, x = this.hierarchy.length; t < x; t++)
      if (
        ((b = this.hierarchy[t]),
        (m = b.animationCache),
        this.JITCompile && p[t][o] !== void 0)
      )
        b instanceof THREE.Bone
          ? ((b.skinMatrix = p[t][o]),
            (b.matrixAutoUpdate = !1),
            (b.matrixWorldNeedsUpdate = !1))
          : ((b.matrix = p[t][o]),
            (b.matrixAutoUpdate = !1),
            (b.matrixWorldNeedsUpdate = !0));
      else {
        if (this.JITCompile)
          b instanceof THREE.Bone
            ? (b.skinMatrix = b.animationCache.originalMatrix)
            : (b.matrix = b.animationCache.originalMatrix);
        for (var w = 0; w < 3; w++) {
          e = c[w];
          h = m.prevKey[e];
          k = m.nextKey[e];
          if (k.time <= v) {
            if (u < v)
              if (this.loop) {
                h = this.data.hierarchy[t].keys[0];
                for (k = this.getNextKeyWith(e, t, 1); k.time < u; )
                  (h = k), (k = this.getNextKeyWith(e, t, k.index + 1));
              } else {
                this.stop();
                return;
              }
            else {
              do (h = k), (k = this.getNextKeyWith(e, t, k.index + 1));
              while (k.time < u);
            }
            m.prevKey[e] = h;
            m.nextKey[e] = k;
          }
          b.matrixAutoUpdate = !0;
          b.matrixWorldNeedsUpdate = !0;
          f = (u - h.time) / (k.time - h.time);
          g = h[e];
          j = k[e];
          if (f < 0 || f > 1)
            console.log(
              "THREE.Animation.update: Warning! Scale out of bounds:" +
                f +
                " on bone " +
                t
            ),
              (f = f < 0 ? 0 : 1);
          if (e === "pos")
            if (
              ((e = b.position),
              this.interpolationType === THREE.AnimationHandler.LINEAR)
            )
              (e.x = g[0] + (j[0] - g[0]) * f),
                (e.y = g[1] + (j[1] - g[1]) * f),
                (e.z = g[2] + (j[2] - g[2]) * f);
            else {
              if (
                this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
                this.interpolationType ===
                  THREE.AnimationHandler.CATMULLROM_FORWARD
              )
                if (
                  ((this.points[0] = this.getPrevKeyWith(
                    "pos",
                    t,
                    h.index - 1
                  ).pos),
                  (this.points[1] = g),
                  (this.points[2] = j),
                  (this.points[3] = this.getNextKeyWith(
                    "pos",
                    t,
                    k.index + 1
                  ).pos),
                  (f = f * 0.33 + 0.33),
                  (g = this.interpolateCatmullRom(this.points, f)),
                  (e.x = g[0]),
                  (e.y = g[1]),
                  (e.z = g[2]),
                  this.interpolationType ===
                    THREE.AnimationHandler.CATMULLROM_FORWARD)
                )
                  (f = this.interpolateCatmullRom(this.points, f * 1.01)),
                    this.target.set(f[0], f[1], f[2]),
                    this.target.subSelf(e),
                    (this.target.y = 0),
                    this.target.normalize(),
                    (f = Math.atan2(this.target.x, this.target.z)),
                    b.rotation.set(0, f, 0);
            }
          else if (e === "rot") THREE.Quaternion.slerp(g, j, b.quaternion, f);
          else if (e === "scl")
            (e = b.scale),
              (e.x = g[0] + (j[0] - g[0]) * f),
              (e.y = g[1] + (j[1] - g[1]) * f),
              (e.z = g[2] + (j[2] - g[2]) * f);
        }
      }
    if (this.JITCompile && p[0][o] === void 0) {
      this.hierarchy[0].update(void 0, !0);
      for (t = 0; t < this.hierarchy.length; t++)
        p[t][o] =
          this.hierarchy[t] instanceof THREE.Bone
            ? this.hierarchy[t].skinMatrix.clone()
            : this.hierarchy[t].matrix.clone();
    }
  }
};
THREE.Animation.prototype.interpolateCatmullRom = function (b, c) {
  var e = [],
    f = [],
    g,
    j,
    h,
    k,
    m,
    o;
  g = (b.length - 1) * c;
  j = Math.floor(g);
  g -= j;
  e[0] = j == 0 ? j : j - 1;
  e[1] = j;
  e[2] = j > b.length - 2 ? j : j + 1;
  e[3] = j > b.length - 3 ? j : j + 2;
  j = b[e[0]];
  k = b[e[1]];
  m = b[e[2]];
  o = b[e[3]];
  e = g * g;
  h = g * e;
  f[0] = this.interpolate(j[0], k[0], m[0], o[0], g, e, h);
  f[1] = this.interpolate(j[1], k[1], m[1], o[1], g, e, h);
  f[2] = this.interpolate(j[2], k[2], m[2], o[2], g, e, h);
  return f;
};
THREE.Animation.prototype.interpolate = function (b, c, e, f, g, j, h) {
  b = (e - b) * 0.5;
  f = (f - c) * 0.5;
  return (2 * (c - e) + b + f) * h + (-3 * (c - e) - 2 * b - f) * j + b * g + c;
};
THREE.Animation.prototype.getNextKeyWith = function (b, c, e) {
  var f = this.data.hierarchy[c].keys;
  for (
    this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
    this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
      ? (e = e < f.length - 1 ? e : f.length - 1)
      : (e %= f.length);
    e < f.length;
    e++
  )
    if (f[e][b] !== void 0) return f[e];
  return this.data.hierarchy[c].keys[0];
};
THREE.Animation.prototype.getPrevKeyWith = function (b, c, e) {
  for (
    var f = this.data.hierarchy[c].keys,
      e =
        this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
        this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
          ? e > 0
            ? e
            : 0
          : e >= 0
          ? e
          : e + f.length;
    e >= 0;
    e--
  )
    if (f[e][b] !== void 0) return f[e];
  return this.data.hierarchy[c].keys[f.length - 1];
};
THREE.FirstPersonCamera = function (b) {
  function c(b, c) {
    return function () {
      c.apply(b, arguments);
    };
  }
  THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
  this.movementSpeed = 1;
  this.lookSpeed = 0.005;
  this.noFly = !1;
  this.lookVertical = !0;
  this.autoForward = !1;
  this.activeLook = !0;
  this.heightSpeed = !1;
  this.heightCoef = 1;
  this.heightMin = 0;
  this.constrainVertical = !1;
  this.verticalMin = 0;
  this.verticalMax = 3.14;
  this.domElement = document;
  this.lastUpdate = new Date().getTime();
  this.tdiff = 0;
  if (b) {
    if (b.movementSpeed !== void 0) this.movementSpeed = b.movementSpeed;
    if (b.lookSpeed !== void 0) this.lookSpeed = b.lookSpeed;
    if (b.noFly !== void 0) this.noFly = b.noFly;
    if (b.lookVertical !== void 0) this.lookVertical = b.lookVertical;
    if (b.autoForward !== void 0) this.autoForward = b.autoForward;
    if (b.activeLook !== void 0) this.activeLook = b.activeLook;
    if (b.heightSpeed !== void 0) this.heightSpeed = b.heightSpeed;
    if (b.heightCoef !== void 0) this.heightCoef = b.heightCoef;
    if (b.heightMin !== void 0) this.heightMin = b.heightMin;
    if (b.heightMax !== void 0) this.heightMax = b.heightMax;
    if (b.constrainVertical !== void 0)
      this.constrainVertical = b.constrainVertical;
    if (b.verticalMin !== void 0) this.verticalMin = b.verticalMin;
    if (b.verticalMax !== void 0) this.verticalMax = b.verticalMax;
    if (b.domElement !== void 0) this.domElement = b.domElement;
  }
  this.theta =
    this.phi =
    this.lon =
    this.lat =
    this.mouseY =
    this.mouseX =
    this.autoSpeedFactor =
      0;
  this.mouseDragOn =
    this.freeze =
    this.moveRight =
    this.moveLeft =
    this.moveBackward =
    this.moveForward =
      !1;
  this.windowHalfX = window.innerWidth / 2;
  this.windowHalfY = window.innerHeight / 2;
  this.onMouseDown = function (b) {
    b.preventDefault();
    b.stopPropagation();
    if (this.activeLook)
      switch (b.button) {
        case 0:
          this.moveForward = !0;
          break;
        case 2:
          this.moveBackward = !0;
      }
    this.mouseDragOn = !0;
  };
  this.onMouseUp = function (b) {
    b.preventDefault();
    b.stopPropagation();
    if (this.activeLook)
      switch (b.button) {
        case 0:
          this.moveForward = !1;
          break;
        case 2:
          this.moveBackward = !1;
      }
    this.mouseDragOn = !1;
  };
  this.onMouseMove = function (b) {
    this.mouseX = b.clientX - this.windowHalfX;
    this.mouseY = b.clientY - this.windowHalfY;
  };
  this.onKeyDown = function (b) {
    switch (b.keyCode) {
      case 38:
      case 87:
        this.moveForward = !0;
        break;
      case 37:
      case 65:
        this.moveLeft = !0;
        break;
      case 40:
      case 83:
        this.moveBackward = !0;
        break;
      case 39:
      case 68:
        this.moveRight = !0;
        break;
      case 82:
        this.moveUp = !0;
        break;
      case 70:
        this.moveDown = !0;
        break;
      case 81:
        this.freeze = !this.freeze;
    }
  };
  this.onKeyUp = function (b) {
    switch (b.keyCode) {
      case 38:
      case 87:
        this.moveForward = !1;
        break;
      case 37:
      case 65:
        this.moveLeft = !1;
        break;
      case 40:
      case 83:
        this.moveBackward = !1;
        break;
      case 39:
      case 68:
        this.moveRight = !1;
        break;
      case 82:
        this.moveUp = !1;
        break;
      case 70:
        this.moveDown = !1;
    }
  };
  this.update = function () {
    var b = new Date().getTime();
    this.tdiff = (b - this.lastUpdate) / 1e3;
    this.lastUpdate = b;
    if (!this.freeze) {
      this.autoSpeedFactor = this.heightSpeed
        ? this.tdiff *
          ((this.position.y < this.heightMin
            ? this.heightMin
            : this.position.y > this.heightMax
            ? this.heightMax
            : this.position.y) -
            this.heightMin) *
          this.heightCoef
        : 0;
      var c = this.tdiff * this.movementSpeed;
      (this.moveForward || (this.autoForward && !this.moveBackward)) &&
        this.translateZ(-(c + this.autoSpeedFactor));
      this.moveBackward && this.translateZ(c);
      this.moveLeft && this.translateX(-c);
      this.moveRight && this.translateX(c);
      this.moveUp && this.translateY(c);
      this.moveDown && this.translateY(-c);
      c = this.tdiff * this.lookSpeed;
      this.activeLook || (c = 0);
      this.lon += this.mouseX * c;
      this.lookVertical && (this.lat -= this.mouseY * c);
      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = ((90 - this.lat) * Math.PI) / 180;
      this.theta = (this.lon * Math.PI) / 180;
      var b = this.target.position,
        g = this.position;
      b.x = g.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
      b.y = g.y + 100 * Math.cos(this.phi);
      b.z = g.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
    }
    b = 1;
    this.constrainVertical &&
      (b = 3.14 / (this.verticalMax - this.verticalMin));
    this.lon += this.mouseX * c;
    this.lookVertical && (this.lat -= this.mouseY * c * b);
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = ((90 - this.lat) * Math.PI) / 180;
    this.theta = (this.lon * Math.PI) / 180;
    if (this.constrainVertical)
      this.phi =
        ((this.phi - 0) * (this.verticalMax - this.verticalMin)) / 3.14 +
        this.verticalMin;
    b = this.target.position;
    g = this.position;
    b.x = g.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
    b.y = g.y + 100 * Math.cos(this.phi);
    b.z = g.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
    this.supr.update.call(this);
  };
  this.domElement.addEventListener(
    "contextmenu",
    function (b) {
      b.preventDefault();
    },
    !1
  );
  this.domElement.addEventListener("mousemove", c(this, this.onMouseMove), !1);
  this.domElement.addEventListener("mousedown", c(this, this.onMouseDown), !1);
  this.domElement.addEventListener("mouseup", c(this, this.onMouseUp), !1);
  this.domElement.addEventListener("keydown", c(this, this.onKeyDown), !1);
  this.domElement.addEventListener("keyup", c(this, this.onKeyUp), !1);
};
THREE.FirstPersonCamera.prototype = new THREE.Camera();
THREE.FirstPersonCamera.prototype.constructor = THREE.FirstPersonCamera;
THREE.FirstPersonCamera.prototype.supr = THREE.Camera.prototype;
THREE.FirstPersonCamera.prototype.translate = function (b, c) {
  this.matrix.rotateAxis(c);
  if (this.noFly) c.y = 0;
  this.position.addSelf(c.multiplyScalar(b));
  this.target.position.addSelf(c.multiplyScalar(b));
};
THREE.PathCamera = function (b) {
  function c(b, c, e, f) {
    var h = { name: e, fps: 0.6, length: f, hierarchy: [] },
      g,
      j = c.getControlPointsArray(),
      k = c.getLength(),
      m = j.length,
      G = 0;
    g = m - 1;
    c = { parent: -1, keys: [] };
    c.keys[0] = { time: 0, pos: j[0], rot: [0, 0, 0, 1], scl: [1, 1, 1] };
    c.keys[g] = { time: f, pos: j[g], rot: [0, 0, 0, 1], scl: [1, 1, 1] };
    for (g = 1; g < m - 1; g++)
      (G = (f * k.chunks[g]) / k.total), (c.keys[g] = { time: G, pos: j[g] });
    h.hierarchy[0] = c;
    THREE.AnimationHandler.add(h);
    return new THREE.Animation(
      b,
      e,
      THREE.AnimationHandler.CATMULLROM_FORWARD,
      !1
    );
  }
  function e(b, c) {
    var e,
      f,
      h = new THREE.Geometry();
    for (e = 0; e < b.points.length * c; e++)
      (f = e / (b.points.length * c)),
        (f = b.getPoint(f)),
        (h.vertices[e] = new THREE.Vertex(new THREE.Vector3(f.x, f.y, f.z)));
    return h;
  }
  function f(b, c) {
    var f = e(c, 10),
      h = e(c, 10),
      g = new THREE.LineBasicMaterial({ color: 16711680, linewidth: 3 });
    lineObj = new THREE.Line(f, g);
    particleObj = new THREE.ParticleSystem(
      h,
      new THREE.ParticleBasicMaterial({ color: 16755200, size: 3 })
    );
    lineObj.scale.set(1, 1, 1);
    b.addChild(lineObj);
    particleObj.scale.set(1, 1, 1);
    b.addChild(particleObj);
    h = new THREE.SphereGeometry(1, 16, 8);
    g = new THREE.MeshBasicMaterial({ color: 65280 });
    for (i = 0; i < c.points.length; i++)
      (f = new THREE.Mesh(h, g)),
        f.position.copy(c.points[i]),
        f.updateMatrix(),
        b.addChild(f);
  }
  THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
  this.id = "PathCamera" + THREE.PathCameraIdCounter++;
  this.duration = 1e4;
  this.waypoints = [];
  this.useConstantSpeed = !0;
  this.resamplingCoef = 50;
  this.debugPath = new THREE.Object3D();
  this.debugDummy = new THREE.Object3D();
  this.animationParent = new THREE.Object3D();
  this.lookSpeed = 0.005;
  this.lookHorizontal = this.lookVertical = !0;
  this.verticalAngleMap = { srcRange: [0, 6.28], dstRange: [0, 6.28] };
  this.horizontalAngleMap = { srcRange: [0, 6.28], dstRange: [0, 6.28] };
  this.domElement = document;
  if (b) {
    if (b.duration !== void 0) this.duration = b.duration * 1e3;
    if (b.waypoints !== void 0) this.waypoints = b.waypoints;
    if (b.useConstantSpeed !== void 0)
      this.useConstantSpeed = b.useConstantSpeed;
    if (b.resamplingCoef !== void 0) this.resamplingCoef = b.resamplingCoef;
    if (b.createDebugPath !== void 0) this.createDebugPath = b.createDebugPath;
    if (b.createDebugDummy !== void 0)
      this.createDebugDummy = b.createDebugDummy;
    if (b.lookSpeed !== void 0) this.lookSpeed = b.lookSpeed;
    if (b.lookVertical !== void 0) this.lookVertical = b.lookVertical;
    if (b.lookHorizontal !== void 0) this.lookHorizontal = b.lookHorizontal;
    if (b.verticalAngleMap !== void 0)
      this.verticalAngleMap = b.verticalAngleMap;
    if (b.horizontalAngleMap !== void 0)
      this.horizontalAngleMap = b.horizontalAngleMap;
    if (b.domElement !== void 0) this.domElement = b.domElement;
  }
  this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
  this.windowHalfX = window.innerWidth / 2;
  this.windowHalfY = window.innerHeight / 2;
  var g = Math.PI * 2,
    j = Math.PI / 180;
  this.update = function (b, c, e) {
    var f, h;
    this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed);
    this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed);
    this.lon = Math.max(0, Math.min(360, this.lon));
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = (90 - this.lat) * j;
    this.theta = this.lon * j;
    f = this.phi % g;
    this.phi = f >= 0 ? f : f + g;
    f = this.verticalAngleMap.srcRange;
    h = this.verticalAngleMap.dstRange;
    var k = h[1] - h[0];
    this.phi =
      TWEEN.Easing.Quadratic.EaseInOut(
        (((this.phi - f[0]) * (h[1] - h[0])) / (f[1] - f[0]) + h[0] - h[0]) / k
      ) *
        k +
      h[0];
    f = this.horizontalAngleMap.srcRange;
    h = this.horizontalAngleMap.dstRange;
    k = h[1] - h[0];
    this.theta =
      TWEEN.Easing.Quadratic.EaseInOut(
        (((this.theta - f[0]) * (h[1] - h[0])) / (f[1] - f[0]) + h[0] - h[0]) /
          k
      ) *
        k +
      h[0];
    f = this.target.position;
    f.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
    f.y = 100 * Math.cos(this.phi);
    f.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
    this.supr.update.call(this, b, c, e);
  };
  this.onMouseMove = function (b) {
    this.mouseX = b.clientX - this.windowHalfX;
    this.mouseY = b.clientY - this.windowHalfY;
  };
  this.spline = new THREE.Spline();
  this.spline.initFromArray(this.waypoints);
  this.useConstantSpeed &&
    this.spline.reparametrizeByArcLength(this.resamplingCoef);
  if (this.createDebugDummy) {
    var b = new THREE.MeshLambertMaterial({ color: 30719 }),
      h = new THREE.MeshLambertMaterial({ color: 65280 }),
      k = new THREE.CubeGeometry(10, 10, 20),
      m = new THREE.CubeGeometry(2, 2, 10);
    this.animationParent = new THREE.Mesh(k, b);
    b = new THREE.Mesh(m, h);
    b.position.set(0, 10, 0);
    this.animation = c(
      this.animationParent,
      this.spline,
      this.id,
      this.duration
    );
    this.animationParent.addChild(this);
    this.animationParent.addChild(this.target);
    this.animationParent.addChild(b);
  } else
    (this.animation = c(
      this.animationParent,
      this.spline,
      this.id,
      this.duration
    )),
      this.animationParent.addChild(this.target),
      this.animationParent.addChild(this);
  this.createDebugPath && f(this.debugPath, this.spline);
  this.domElement.addEventListener(
    "mousemove",
    (function (b, c) {
      return function () {
        c.apply(b, arguments);
      };
    })(this, this.onMouseMove),
    !1
  );
};
THREE.PathCamera.prototype = new THREE.Camera();
THREE.PathCamera.prototype.constructor = THREE.PathCamera;
THREE.PathCamera.prototype.supr = THREE.Camera.prototype;
THREE.PathCameraIdCounter = 0;
THREE.FlyCamera = function (b) {
  function c(b, c) {
    return function () {
      c.apply(b, arguments);
    };
  }
  THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
  this.tmpQuaternion = new THREE.Quaternion();
  this.movementSpeed = 1;
  this.rollSpeed = 0.005;
  this.autoForward = this.dragToLook = !1;
  this.domElement = document;
  if (b) {
    if (b.movementSpeed !== void 0) this.movementSpeed = b.movementSpeed;
    if (b.rollSpeed !== void 0) this.rollSpeed = b.rollSpeed;
    if (b.dragToLook !== void 0) this.dragToLook = b.dragToLook;
    if (b.autoForward !== void 0) this.autoForward = b.autoForward;
    if (b.domElement !== void 0) this.domElement = b.domElement;
  }
  this.useTarget = !1;
  this.useQuaternion = !0;
  this.mouseStatus = 0;
  this.moveState = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    forward: 0,
    back: 0,
    pitchUp: 0,
    pitchDown: 0,
    yawLeft: 0,
    yawRight: 0,
    rollLeft: 0,
    rollRight: 0,
  };
  this.moveVector = new THREE.Vector3(0, 0, 0);
  this.rotationVector = new THREE.Vector3(0, 0, 0);
  this.lastUpdate = -1;
  this.tdiff = 0;
  this.handleEvent = function (b) {
    if (typeof this[b.type] == "function") this[b.type](b);
  };
  this.keydown = function (b) {
    if (!b.altKey) {
      switch (b.keyCode) {
        case 16:
          this.movementSpeedMultiplier = 0.1;
          break;
        case 87:
          this.moveState.forward = 1;
          break;
        case 83:
          this.moveState.back = 1;
          break;
        case 65:
          this.moveState.left = 1;
          break;
        case 68:
          this.moveState.right = 1;
          break;
        case 82:
          this.moveState.up = 1;
          break;
        case 70:
          this.moveState.down = 1;
          break;
        case 38:
          this.moveState.pitchUp = 1;
          break;
        case 40:
          this.moveState.pitchDown = 1;
          break;
        case 37:
          this.moveState.yawLeft = 1;
          break;
        case 39:
          this.moveState.yawRight = 1;
          break;
        case 81:
          this.moveState.rollLeft = 1;
          break;
        case 69:
          this.moveState.rollRight = 1;
      }
      this.updateMovementVector();
      this.updateRotationVector();
    }
  };
  this.keyup = function (b) {
    switch (b.keyCode) {
      case 16:
        this.movementSpeedMultiplier = 1;
        break;
      case 87:
        this.moveState.forward = 0;
        break;
      case 83:
        this.moveState.back = 0;
        break;
      case 65:
        this.moveState.left = 0;
        break;
      case 68:
        this.moveState.right = 0;
        break;
      case 82:
        this.moveState.up = 0;
        break;
      case 70:
        this.moveState.down = 0;
        break;
      case 38:
        this.moveState.pitchUp = 0;
        break;
      case 40:
        this.moveState.pitchDown = 0;
        break;
      case 37:
        this.moveState.yawLeft = 0;
        break;
      case 39:
        this.moveState.yawRight = 0;
        break;
      case 81:
        this.moveState.rollLeft = 0;
        break;
      case 69:
        this.moveState.rollRight = 0;
    }
    this.updateMovementVector();
    this.updateRotationVector();
  };
  this.mousedown = function (b) {
    b.preventDefault();
    b.stopPropagation();
    if (this.dragToLook) this.mouseStatus++;
    else
      switch (b.button) {
        case 0:
          this.moveForward = !0;
          break;
        case 2:
          this.moveBackward = !0;
      }
  };
  this.mousemove = function (b) {
    if (!this.dragToLook || this.mouseStatus > 0) {
      var c = this.getContainerDimensions(),
        g = c.size[0] / 2,
        j = c.size[1] / 2;
      this.moveState.yawLeft = -(b.clientX - c.offset[0] - g) / g;
      this.moveState.pitchDown = (b.clientY - c.offset[1] - j) / j;
      this.updateRotationVector();
    }
  };
  this.mouseup = function (b) {
    b.preventDefault();
    b.stopPropagation();
    if (this.dragToLook)
      this.mouseStatus--,
        (this.moveState.yawLeft = this.moveState.pitchDown = 0);
    else
      switch (b.button) {
        case 0:
          this.moveForward = !1;
          break;
        case 2:
          this.moveBackward = !1;
      }
    this.updateRotationVector();
  };
  this.update = function () {
    var b = new Date().getTime();
    if (this.lastUpdate == -1) this.lastUpdate = b;
    this.tdiff = (b - this.lastUpdate) / 1e3;
    this.lastUpdate = b;
    var b = this.tdiff * this.movementSpeed,
      c = this.tdiff * this.rollSpeed;
    this.translateX(this.moveVector.x * b);
    this.translateY(this.moveVector.y * b);
    this.translateZ(this.moveVector.z * b);
    this.tmpQuaternion
      .set(
        this.rotationVector.x * c,
        this.rotationVector.y * c,
        this.rotationVector.z * c,
        1
      )
      .normalize();
    this.quaternion.multiplySelf(this.tmpQuaternion);
    this.matrix.setPosition(this.position);
    this.matrix.setRotationFromQuaternion(this.quaternion);
    this.matrixWorldNeedsUpdate = !0;
    this.supr.update.call(this);
  };
  this.updateMovementVector = function () {
    var b =
      this.moveState.forward || (this.autoForward && !this.moveState.back)
        ? 1
        : 0;
    this.moveVector.x = -this.moveState.left + this.moveState.right;
    this.moveVector.y = -this.moveState.down + this.moveState.up;
    this.moveVector.z = -b + this.moveState.back;
  };
  this.updateRotationVector = function () {
    this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
    this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
    this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft;
  };
  this.getContainerDimensions = function () {
    return this.domElement != document
      ? {
          size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
          offset: [this.domElement.offsetLeft, this.domElement.offsetTop],
        }
      : { size: [window.innerWidth, window.innerHeight], offset: [0, 0] };
  };
  this.domElement.addEventListener("mousemove", c(this, this.mousemove), !1);
  this.domElement.addEventListener("mousedown", c(this, this.mousedown), !1);
  this.domElement.addEventListener("mouseup", c(this, this.mouseup), !1);
  window.addEventListener("keydown", c(this, this.keydown), !1);
  window.addEventListener("keyup", c(this, this.keyup), !1);
  this.updateMovementVector();
  this.updateRotationVector();
};
THREE.FlyCamera.prototype = new THREE.Camera();
THREE.FlyCamera.prototype.constructor = THREE.FlyCamera;
THREE.FlyCamera.prototype.supr = THREE.Camera.prototype;
THREE.RollCamera = function (b, c, e, f) {
  THREE.Camera.call(this, b, c, e, f);
  this.mouseLook = !0;
  this.autoForward = !1;
  this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
  this.constrainVertical = [-0.9, 0.9];
  this.domElement = document;
  this.matrixAutoUpdate = this.useTarget = !1;
  this.forward = new THREE.Vector3(0, 0, 1);
  this.roll = 0;
  this.lastUpdate = -1;
  this.delta = 0;
  var g = new THREE.Vector3(),
    j = new THREE.Vector3(),
    h = new THREE.Vector3(),
    k = new THREE.Matrix4(),
    m = !1,
    o = 1,
    p = 0,
    u = 0,
    v = 0,
    t = 0,
    x = 0,
    w = window.innerWidth / 2,
    A = window.innerHeight / 2;
  this.update = function () {
    var b = new Date().getTime();
    if (this.lastUpdate == -1) this.lastUpdate = b;
    this.delta = (b - this.lastUpdate) / 1e3;
    this.lastUpdate = b;
    this.mouseLook &&
      ((b = this.delta * this.lookSpeed),
      this.rotateHorizontally(b * t),
      this.rotateVertically(b * x));
    b = this.delta * this.movementSpeed;
    this.translateZ(b * (p > 0 || (this.autoForward && !(p < 0)) ? 1 : p));
    this.translateX(b * u);
    this.translateY(b * v);
    m && (this.roll += this.rollSpeed * this.delta * o);
    if (this.forward.y > this.constrainVertical[1])
      (this.forward.y = this.constrainVertical[1]), this.forward.normalize();
    else if (this.forward.y < this.constrainVertical[0])
      (this.forward.y = this.constrainVertical[0]), this.forward.normalize();
    h.copy(this.forward);
    j.set(0, 1, 0);
    g.cross(j, h).normalize();
    j.cross(h, g).normalize();
    this.matrix.n11 = g.x;
    this.matrix.n12 = j.x;
    this.matrix.n13 = h.x;
    this.matrix.n21 = g.y;
    this.matrix.n22 = j.y;
    this.matrix.n23 = h.y;
    this.matrix.n31 = g.z;
    this.matrix.n32 = j.z;
    this.matrix.n33 = h.z;
    k.identity();
    k.n11 = Math.cos(this.roll);
    k.n12 = -Math.sin(this.roll);
    k.n21 = Math.sin(this.roll);
    k.n22 = Math.cos(this.roll);
    this.matrix.multiplySelf(k);
    this.matrixWorldNeedsUpdate = !0;
    this.matrix.n14 = this.position.x;
    this.matrix.n24 = this.position.y;
    this.matrix.n34 = this.position.z;
    this.supr.update.call(this);
  };
  this.translateX = function (b) {
    this.position.x += this.matrix.n11 * b;
    this.position.y += this.matrix.n21 * b;
    this.position.z += this.matrix.n31 * b;
  };
  this.translateY = function (b) {
    this.position.x += this.matrix.n12 * b;
    this.position.y += this.matrix.n22 * b;
    this.position.z += this.matrix.n32 * b;
  };
  this.translateZ = function (b) {
    this.position.x -= this.matrix.n13 * b;
    this.position.y -= this.matrix.n23 * b;
    this.position.z -= this.matrix.n33 * b;
  };
  this.rotateHorizontally = function (b) {
    g.set(this.matrix.n11, this.matrix.n21, this.matrix.n31);
    g.multiplyScalar(b);
    this.forward.subSelf(g);
    this.forward.normalize();
  };
  this.rotateVertically = function (b) {
    j.set(this.matrix.n12, this.matrix.n22, this.matrix.n32);
    j.multiplyScalar(b);
    this.forward.addSelf(j);
    this.forward.normalize();
  };
  this.domElement.addEventListener(
    "contextmenu",
    function (b) {
      b.preventDefault();
    },
    !1
  );
  this.domElement.addEventListener(
    "mousemove",
    function (b) {
      t = (b.clientX - w) / window.innerWidth;
      x = (b.clientY - A) / window.innerHeight;
    },
    !1
  );
  this.domElement.addEventListener(
    "mousedown",
    function (b) {
      b.preventDefault();
      b.stopPropagation();
      switch (b.button) {
        case 0:
          p = 1;
          break;
        case 2:
          p = -1;
      }
    },
    !1
  );
  this.domElement.addEventListener(
    "mouseup",
    function (b) {
      b.preventDefault();
      b.stopPropagation();
      switch (b.button) {
        case 0:
          p = 0;
          break;
        case 2:
          p = 0;
      }
    },
    !1
  );
  this.domElement.addEventListener(
    "keydown",
    function (b) {
      switch (b.keyCode) {
        case 38:
        case 87:
          p = 1;
          break;
        case 37:
        case 65:
          u = -1;
          break;
        case 40:
        case 83:
          p = -1;
          break;
        case 39:
        case 68:
          u = 1;
          break;
        case 81:
          m = !0;
          o = 1;
          break;
        case 69:
          m = !0;
          o = -1;
          break;
        case 82:
          v = 1;
          break;
        case 70:
          v = -1;
      }
    },
    !1
  );
  this.domElement.addEventListener(
    "keyup",
    function (b) {
      switch (b.keyCode) {
        case 38:
        case 87:
          p = 0;
          break;
        case 37:
        case 65:
          u = 0;
          break;
        case 40:
        case 83:
          p = 0;
          break;
        case 39:
        case 68:
          u = 0;
          break;
        case 81:
          m = !1;
          break;
        case 69:
          m = !1;
          break;
        case 82:
          v = 0;
          break;
        case 70:
          v = 0;
      }
    },
    !1
  );
};
THREE.RollCamera.prototype = new THREE.Camera();
THREE.RollCamera.prototype.constructor = THREE.RollCamera;
THREE.RollCamera.prototype.supr = THREE.Camera.prototype;
THREE.TrackballCamera = function (b) {
  function c(b, c) {
    return function () {
      c.apply(b, arguments);
    };
  }
  b = b || {};
  THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
  this.domElement = b.domElement || document;
  this.screen = b.screen || {
    width: window.innerWidth,
    height: window.innerHeight,
    offsetLeft: 0,
    offsetTop: 0,
  };
  this.radius = b.radius || (this.screen.width + this.screen.height) / 4;
  this.rotateSpeed = b.rotateSpeed || 1;
  this.zoomSpeed = b.zoomSpeed || 1.2;
  this.panSpeed = b.panSpeed || 0.3;
  this.noZoom = b.noZoom || !1;
  this.noPan = b.noPan || !1;
  this.staticMoving = b.staticMoving || !1;
  this.dynamicDampingFactor = b.dynamicDampingFactor || 0.2;
  this.minDistance = b.minDistance || 0;
  this.maxDistance = b.maxDistance || Infinity;
  this.keys = b.keys || [65, 83, 68];
  this.useTarget = !0;
  var e = !1,
    f = this.STATE.NONE,
    g = new THREE.Vector3(),
    j = new THREE.Vector3(),
    h = new THREE.Vector3(),
    k = new THREE.Vector2(),
    m = new THREE.Vector2(),
    o = new THREE.Vector2(),
    p = new THREE.Vector2();
  this.handleEvent = function (b) {
    if (typeof this[b.type] == "function") this[b.type](b);
  };
  this.getMouseOnScreen = function (b, c) {
    return new THREE.Vector2(
      ((b - this.screen.offsetLeft) / this.radius) * 0.5,
      ((c - this.screen.offsetTop) / this.radius) * 0.5
    );
  };
  this.getMouseProjectionOnBall = function (b, c) {
    var e = new THREE.Vector3(
        (b - this.screen.width * 0.5 - this.screen.offsetLeft) / this.radius,
        (this.screen.height * 0.5 + this.screen.offsetTop - c) / this.radius,
        0
      ),
      f = e.length();
    f > 1 ? e.normalize() : (e.z = Math.sqrt(1 - f * f));
    g = this.position.clone().subSelf(this.target.position);
    f = this.up.clone().setLength(e.y);
    f.addSelf(this.up.clone().crossSelf(g).setLength(e.x));
    f.addSelf(g.setLength(e.z));
    return f;
  };
  this.rotateCamera = function () {
    var b = Math.acos(j.dot(h) / j.length() / h.length());
    if (b) {
      var c = new THREE.Vector3().cross(j, h).normalize(),
        e = new THREE.Quaternion();
      b *= this.rotateSpeed;
      e.setFromAxisAngle(c, -b);
      e.multiplyVector3(g);
      e.multiplyVector3(this.up);
      e.multiplyVector3(h);
      this.staticMoving
        ? (j = h)
        : (e.setFromAxisAngle(c, b * (this.dynamicDampingFactor - 1)),
          e.multiplyVector3(j));
    }
  };
  this.zoomCamera = function () {
    var b = 1 + (m.y - k.y) * this.zoomSpeed;
    b !== 1 &&
      b > 0 &&
      (g.multiplyScalar(b),
      this.staticMoving
        ? (k = m)
        : (k.y += (m.y - k.y) * this.dynamicDampingFactor));
  };
  this.panCamera = function () {
    var b = p.clone().subSelf(o);
    if (b.lengthSq()) {
      b.multiplyScalar(g.length() * this.panSpeed);
      var c = g.clone().crossSelf(this.up).setLength(b.x);
      c.addSelf(this.up.clone().setLength(b.y));
      this.position.addSelf(c);
      this.target.position.addSelf(c);
      this.staticMoving
        ? (o = p)
        : o.addSelf(b.sub(p, o).multiplyScalar(this.dynamicDampingFactor));
    }
  };
  this.checkDistances = function () {
    if (!this.noZoom || !this.noPan)
      this.position.lengthSq() > this.maxDistance * this.maxDistance &&
        this.position.setLength(this.maxDistance),
        g.lengthSq() < this.minDistance * this.minDistance &&
          this.position.add(
            this.target.position,
            g.setLength(this.minDistance)
          );
  };
  this.update = function (b, c, e) {
    g = this.position.clone().subSelf(this.target.position);
    this.rotateCamera();
    this.noZoom || this.zoomCamera();
    this.noPan || this.panCamera();
    this.position.add(this.target.position, g);
    this.checkDistances();
    this.supr.update.call(this, b, c, e);
  };
  this.domElement.addEventListener(
    "contextmenu",
    function (b) {
      b.preventDefault();
    },
    !1
  );
  this.domElement.addEventListener(
    "mousemove",
    c(this, function (b) {
      e &&
        ((j = h = this.getMouseProjectionOnBall(b.clientX, b.clientY)),
        (k = m = this.getMouseOnScreen(b.clientX, b.clientY)),
        (o = p = this.getMouseOnScreen(b.clientX, b.clientY)),
        (e = !1));
      f !== this.STATE.NONE &&
        (f === this.STATE.ROTATE
          ? (h = this.getMouseProjectionOnBall(b.clientX, b.clientY))
          : f === this.STATE.ZOOM && !this.noZoom
          ? (m = this.getMouseOnScreen(b.clientX, b.clientY))
          : f === this.STATE.PAN &&
            !this.noPan &&
            (p = this.getMouseOnScreen(b.clientX, b.clientY)));
    }),
    !1
  );
  this.domElement.addEventListener(
    "mousedown",
    c(this, function (b) {
      b.preventDefault();
      b.stopPropagation();
      if (f === this.STATE.NONE)
        (f = b.button),
          f === this.STATE.ROTATE
            ? (j = h = this.getMouseProjectionOnBall(b.clientX, b.clientY))
            : f === this.STATE.ZOOM && !this.noZoom
            ? (k = m = this.getMouseOnScreen(b.clientX, b.clientY))
            : this.noPan ||
              (o = p = this.getMouseOnScreen(b.clientX, b.clientY));
    }),
    !1
  );
  this.domElement.addEventListener(
    "mouseup",
    c(this, function (b) {
      b.preventDefault();
      b.stopPropagation();
      f = this.STATE.NONE;
    }),
    !1
  );
  window.addEventListener(
    "keydown",
    c(this, function (b) {
      if (f === this.STATE.NONE) {
        if (b.keyCode === this.keys[this.STATE.ROTATE]) f = this.STATE.ROTATE;
        else if (b.keyCode === this.keys[this.STATE.ZOOM] && !this.noZoom)
          f = this.STATE.ZOOM;
        else if (b.keyCode === this.keys[this.STATE.PAN] && !this.noPan)
          f = this.STATE.PAN;
        f !== this.STATE.NONE && (e = !0);
      }
    }),
    !1
  );
  window.addEventListener(
    "keyup",
    c(this, function () {
      if (f !== this.STATE.NONE) f = this.STATE.NONE;
    }),
    !1
  );
};
THREE.TrackballCamera.prototype = new THREE.Camera();
THREE.TrackballCamera.prototype.constructor = THREE.TrackballCamera;
THREE.TrackballCamera.prototype.supr = THREE.Camera.prototype;
THREE.TrackballCamera.prototype.STATE = {
  NONE: -1,
  ROTATE: 0,
  ZOOM: 1,
  PAN: 2,
};
THREE.QuakeCamera = THREE.FirstPersonCamera;
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function () {
  console.log("Warning, getPoint() not implemented!");
  return null;
};
THREE.Curve.prototype.getPointAt = function (b) {
  return this.getPoint(this.getUtoTmapping(b));
};
THREE.Curve.prototype.getPoints = function (b) {
  b || (b = 5);
  var c,
    e = [];
  for (c = 0; c <= b; c++) e.push(this.getPoint(c / b));
  return e;
};
THREE.Curve.prototype.getSpacedPoints = function (b) {
  b || (b = 5);
  var c,
    e = [];
  for (c = 0; c <= b; c++) e.push(this.getPointAt(c / b));
  return e;
};
THREE.Curve.prototype.getLength = function () {
  var b = this.getLengths();
  return b[b.length - 1];
};
THREE.Curve.prototype.getLengths = function (b) {
  b || (b = 200);
  if (this.cacheArcLengths && this.cacheArcLengths.length == b + 1)
    return this.cacheArcLengths;
  var c = [],
    e,
    f = this.getPoint(0),
    g,
    j = 0;
  c.push(0);
  for (g = 1; g <= b; g++)
    (e = this.getPoint(g / b)), (j += e.distanceTo(f)), c.push(j), (f = e);
  return (this.cacheArcLengths = c);
};
THREE.Curve.prototype.getUtoTmapping = function (b, c) {
  var e = this.getLengths(),
    f = 0,
    g = e.length,
    j;
  j = c ? c : b * e[g - 1];
  time = Date.now();
  for (var h = 0, k = g - 1, m; h <= k; )
    if (((f = Math.floor(h + (k - h) / 2)), (m = e[f] - j), m < 0)) h = f + 1;
    else if (m > 0) k = f - 1;
    else {
      k = f;
      break;
    }
  f = k;
  if (e[f] == j) return f / (g - 1);
  h = e[f];
  return (e = (f + (j - h) / (e[f + 1] - h)) / (g - 1));
};
THREE.Curve.prototype.getNormalVector = function (b) {
  b = this.getTangent(b);
  return new THREE.Vector2(-b.y, b.x);
};
THREE.Curve.prototype.getTangent = function (b) {
  var c = b - 1.0e-4;
  b += 1.0e-4;
  c < 0 && (c = 0);
  b > 1 && (b = 1);
  var c = this.getPoint(c),
    b = this.getPoint(b),
    e = new THREE.Vector2();
  e.sub(b, c);
  return e.unit();
};
THREE.LineCurve = function (b, c) {
  b instanceof THREE.Vector2
    ? ((this.v1 = b), (this.v2 = c))
    : THREE.LineCurve.oldConstructor.apply(this, arguments);
};
THREE.LineCurve.oldConstructor = function (b, c, e, f) {
  this.constructor(new THREE.Vector2(b, c), new THREE.Vector2(e, f));
};
THREE.LineCurve.prototype = new THREE.Curve();
THREE.LineCurve.prototype.constructor = THREE.LineCurve;
THREE.LineCurve.prototype.getPoint = function (b) {
  var c = new THREE.Vector2();
  c.sub(this.v2, this.v1);
  c.multiplyScalar(b).addSelf(this.v1);
  return c;
};
THREE.LineCurve.prototype.getPointAt = function (b) {
  return this.getPoint(b);
};
THREE.LineCurve.prototype.getTangent = function () {
  var b = new THREE.Vector2();
  b.sub(this.v2, this.v1);
  b.normalize();
  return b;
};
THREE.QuadraticBezierCurve = function (b, c, e) {
  if (!(c instanceof THREE.Vector2))
    var f = Array.prototype.slice.call(arguments),
      b = new THREE.Vector2(f[0], f[1]),
      c = new THREE.Vector2(f[2], f[3]),
      e = new THREE.Vector2(f[4], f[5]);
  this.v0 = b;
  this.v1 = c;
  this.v2 = e;
};
THREE.QuadraticBezierCurve.prototype = new THREE.Curve();
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint = function (b) {
  var c;
  c = THREE.Shape.Utils.b2(b, this.v0.x, this.v1.x, this.v2.x);
  b = THREE.Shape.Utils.b2(b, this.v0.y, this.v1.y, this.v2.y);
  return new THREE.Vector2(c, b);
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (b) {
  var c;
  c = THREE.Curve.Utils.tangentQuadraticBezier(
    b,
    this.v0.x,
    this.v1.x,
    this.v2.x
  );
  b = THREE.Curve.Utils.tangentQuadraticBezier(
    b,
    this.v0.y,
    this.v1.y,
    this.v2.y
  );
  c = new THREE.Vector2(c, b);
  c.normalize();
  return c;
};
THREE.CubicBezierCurve = function (b, c, e, f) {
  if (!(c instanceof THREE.Vector2))
    var g = Array.prototype.slice.call(arguments),
      b = new THREE.Vector2(g[0], g[1]),
      c = new THREE.Vector2(g[2], g[3]),
      e = new THREE.Vector2(g[4], g[5]),
      f = new THREE.Vector2(g[6], g[7]);
  this.v0 = b;
  this.v1 = c;
  this.v2 = e;
  this.v3 = f;
};
THREE.CubicBezierCurve.prototype = new THREE.Curve();
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint = function (b) {
  var c;
  c = THREE.Shape.Utils.b3(b, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
  b = THREE.Shape.Utils.b3(b, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
  return new THREE.Vector2(c, b);
};
THREE.CubicBezierCurve.prototype.getTangent = function (b) {
  var c;
  c = THREE.Curve.Utils.tangentCubicBezier(
    b,
    this.v0.x,
    this.v1.x,
    this.v2.x,
    this.v3.x
  );
  b = THREE.Curve.Utils.tangentCubicBezier(
    b,
    this.v0.y,
    this.v1.y,
    this.v2.y,
    this.v3.y
  );
  c = new THREE.Vector2(c, b);
  c.normalize();
  return c;
};
THREE.SplineCurve = function (b) {
  this.points = b;
};
THREE.SplineCurve.prototype = new THREE.Curve();
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint = function (b) {
  var c = new THREE.Vector2(),
    e = [],
    f = this.points,
    g;
  g = (f.length - 1) * b;
  b = Math.floor(g);
  g -= b;
  e[0] = b == 0 ? b : b - 1;
  e[1] = b;
  e[2] = b > f.length - 2 ? b : b + 1;
  e[3] = b > f.length - 3 ? b : b + 2;
  c.x = THREE.Curve.Utils.interpolate(
    f[e[0]].x,
    f[e[1]].x,
    f[e[2]].x,
    f[e[3]].x,
    g
  );
  c.y = THREE.Curve.Utils.interpolate(
    f[e[0]].y,
    f[e[1]].y,
    f[e[2]].y,
    f[e[3]].y,
    g
  );
  return c;
};
THREE.ArcCurve = function (b, c, e, f, g, j) {
  this.aX = b;
  this.aY = c;
  this.aRadius = e;
  this.aStartAngle = f;
  this.aEndAngle = g;
  this.aClockwise = j;
};
THREE.ArcCurve.prototype = new THREE.Curve();
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve;
THREE.ArcCurve.prototype.getPoint = function (b) {
  var c = this.aEndAngle - this.aStartAngle;
  this.aClockwise || (b = 1 - b);
  b = this.aStartAngle + b * c;
  return new THREE.Vector2(
    this.aX + this.aRadius * Math.cos(b),
    this.aY + this.aRadius * Math.sin(b)
  );
};
THREE.Curve.Utils = {
  tangentQuadraticBezier: function (b, c, e, f) {
    return 2 * (1 - b) * (e - c) + 2 * b * (f - e);
  },
  tangentCubicBezier: function (b, c, e, f, g) {
    return (
      -3 * c * (1 - b) * (1 - b) +
      3 * e * (1 - b) * (1 - b) -
      6 * b * e * (1 - b) +
      6 * b * f * (1 - b) -
      3 * b * b * f +
      3 * b * b * g
    );
  },
  tangentSpline: function (b) {
    return (
      6 * b * b -
      6 * b +
      (3 * b * b - 4 * b + 1) +
      (-6 * b * b + 6 * b) +
      (3 * b * b - 2 * b)
    );
  },
  interpolate: function (b, c, e, f, g) {
    var b = (e - b) * 0.5,
      f = (f - c) * 0.5,
      j = g * g;
    return (
      (2 * c - 2 * e + b + f) * g * j +
      (-3 * c + 3 * e - 2 * b - f) * j +
      b * g +
      c
    );
  },
};
THREE.Curve.create = function (b, c) {
  b.prototype = new THREE.Curve();
  b.prototype.constructor = b;
  b.prototype.getPoint = c;
  return b;
};
THREE.LineCurve3 = THREE.Curve.create(
  function (b, c) {
    this.v1 = b;
    this.v2 = c;
  },
  function (b) {
    var c = new THREE.Vector3();
    c.sub(v2, v1);
    c.multiplyScalar(b);
    c.addSelf(this.v1);
    return c;
  }
);
THREE.QuadraticBezierCurve3 = THREE.Curve.create(
  function (b, c, e) {
    this.v0 = b;
    this.v1 = c;
    this.v2 = e;
  },
  function (b) {
    var c, e;
    c = THREE.Shape.Utils.b2(b, this.v0.x, this.v1.x, this.v2.x);
    e = THREE.Shape.Utils.b2(b, this.v0.y, this.v1.y, this.v2.y);
    b = THREE.Shape.Utils.b2(b, this.v0.z, this.v1.z, this.v2.z);
    return new THREE.Vector3(c, e, b);
  }
);
THREE.CurvePath = function () {
  this.curves = [];
  this.bends = [];
};
THREE.CurvePath.prototype = new THREE.Curve();
THREE.CurvePath.prototype.constructor = THREE.CurvePath;
THREE.CurvePath.prototype.add = function (b) {
  this.curves.push(b);
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function () {};
THREE.CurvePath.prototype.getPoint = function (b) {
  for (
    var c = b * this.getLength(), e = this.getCurveLengths(), b = 0;
    b < e.length;

  ) {
    if (e[b] >= c)
      return (
        (c = e[b] - c),
        (b = this.curves[b]),
        (c = 1 - c / b.getLength()),
        b.getPointAt(c)
      );
    b++;
  }
  return null;
};
THREE.CurvePath.prototype.getLength = function () {
  var b = this.getCurveLengths();
  return b[b.length - 1];
};
THREE.CurvePath.prototype.getCurveLengths = function () {
  if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
    return this.cacheLengths;
  var b = [],
    c = 0,
    e,
    f = this.curves.length;
  for (e = 0; e < f; e++) (c += this.curves[e].getLength()), b.push(c);
  return (this.cacheLengths = b);
};
THREE.CurvePath.prototype.getBoundingBox = function () {
  var b = this.getPoints(),
    c,
    e,
    f,
    g;
  c = e = Number.NEGATIVE_INFINITY;
  f = g = Number.POSITIVE_INFINITY;
  var j, h, k, m;
  m = new THREE.Vector2();
  h = 0;
  for (k = b.length; h < k; h++) {
    j = b[h];
    if (j.x > c) c = j.x;
    else if (j.x < f) f = j.x;
    if (j.y > e) e = j.y;
    else if (j.y < e) g = j.y;
    m.addSelf(j.x, j.y);
  }
  return { minX: f, minY: g, maxX: c, maxY: e, centroid: m.divideScalar(k) };
};
THREE.CurvePath.prototype.createPointsGeometry = function (b) {
  return this.createGeometry(this.getPoints(b, !0));
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (b) {
  return this.createGeometry(this.getSpacedPoints(b, !0));
};
THREE.CurvePath.prototype.createGeometry = function (b) {
  for (var c = new THREE.Geometry(), e = 0; e < b.length; e++)
    c.vertices.push(new THREE.Vertex(new THREE.Vector3(b[e].x, b[e].y, 0)));
  return c;
};
THREE.CurvePath.prototype.addWrapPath = function (b) {
  this.bends.push(b);
};
THREE.CurvePath.prototype.getTransformedPoints = function (b, c) {
  var e = this.getPoints(b),
    f,
    g;
  if (!c) c = this.bends;
  f = 0;
  for (g = c.length; f < g; f++) e = this.getWrapPoints(e, c[f]);
  return e;
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (b, c) {
  var e = this.getSpacedPoints(b),
    f,
    g;
  if (!c) c = this.bends;
  f = 0;
  for (g = c.length; f < g; f++) e = this.getWrapPoints(e, c[f]);
  return e;
};
THREE.CurvePath.prototype.getWrapPoints = function (b, c) {
  var e = this.getBoundingBox(),
    f,
    g,
    j,
    h,
    k,
    m;
  f = 0;
  for (g = b.length; f < g; f++)
    (j = b[f]),
      (h = j.x),
      (k = j.y),
      (m = h / e.maxX),
      (m = c.getUtoTmapping(m, h)),
      (h = c.getPoint(m)),
      (k = c.getNormalVector(m).multiplyScalar(k)),
      (j.x = h.x + k.x),
      (j.y = h.y + k.y);
  return b;
};
THREE.Path = function (b) {
  THREE.CurvePath.call(this);
  this.actions = [];
  b && this.fromPoints(b);
};
THREE.Path.prototype = new THREE.CurvePath();
THREE.Path.prototype.constructor = THREE.Path;
THREE.PathActions = {
  MOVE_TO: "moveTo",
  LINE_TO: "lineTo",
  QUADRATIC_CURVE_TO: "quadraticCurveTo",
  BEZIER_CURVE_TO: "bezierCurveTo",
  CSPLINE_THRU: "splineThru",
  ARC: "arc",
};
THREE.Path.prototype.fromPoints = function (b) {
  this.moveTo(b[0].x, b[0].y);
  var c,
    e = b.length;
  for (c = 1; c < e; c++) this.lineTo(b[c].x, b[c].y);
};
THREE.Path.prototype.moveTo = function () {
  var b = Array.prototype.slice.call(arguments);
  this.actions.push({ action: THREE.PathActions.MOVE_TO, args: b });
};
THREE.Path.prototype.lineTo = function (b, c) {
  var e = Array.prototype.slice.call(arguments),
    f = this.actions[this.actions.length - 1].args;
  this.curves.push(
    new THREE.LineCurve(
      new THREE.Vector2(f[f.length - 2], f[f.length - 1]),
      new THREE.Vector2(b, c)
    )
  );
  this.actions.push({ action: THREE.PathActions.LINE_TO, args: e });
};
THREE.Path.prototype.quadraticCurveTo = function (b, c, e, f) {
  var g = Array.prototype.slice.call(arguments),
    j = this.actions[this.actions.length - 1].args;
  this.curves.push(
    new THREE.QuadraticBezierCurve(
      new THREE.Vector2(j[j.length - 2], j[j.length - 1]),
      new THREE.Vector2(b, c),
      new THREE.Vector2(e, f)
    )
  );
  this.actions.push({ action: THREE.PathActions.QUADRATIC_CURVE_TO, args: g });
};
THREE.Path.prototype.bezierCurveTo = function (b, c, e, f, g, j) {
  var h = Array.prototype.slice.call(arguments),
    k = this.actions[this.actions.length - 1].args;
  this.curves.push(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(k[k.length - 2], k[k.length - 1]),
      new THREE.Vector2(b, c),
      new THREE.Vector2(e, f),
      new THREE.Vector2(g, j)
    )
  );
  this.actions.push({ action: THREE.PathActions.BEZIER_CURVE_TO, args: h });
};
THREE.Path.prototype.splineThru = function (b) {
  var c = Array.prototype.slice.call(arguments),
    e = this.actions[this.actions.length - 1].args,
    e = [new THREE.Vector2(e[e.length - 2], e[e.length - 1])],
    e = e.concat(b);
  this.curves.push(new THREE.SplineCurve(e));
  this.actions.push({ action: THREE.PathActions.CSPLINE_THRU, args: c });
};
THREE.Path.prototype.arc = function (b, c, e, f, g, j) {
  var h = Array.prototype.slice.call(arguments);
  this.curves.push(new THREE.ArcCurve(b, c, e, f, g, j));
  this.actions.push({ action: THREE.PathActions.ARC, args: h });
};
THREE.Path.prototype.getSpacedPoints = function (b) {
  b || (b = 40);
  for (var c = [], e = 0; e < b; e++) c.push(this.getPoint(e / b));
  return c;
};
THREE.Path.prototype.getPoints = function (b, c) {
  var b = b || 12,
    e = [],
    f,
    g,
    j,
    h,
    k,
    m,
    o,
    p,
    u,
    v,
    t,
    x,
    w;
  f = 0;
  for (g = this.actions.length; f < g; f++)
    switch (((j = this.actions[f]), (h = j.action), (j = j.args), h)) {
      case THREE.PathActions.LINE_TO:
        e.push(new THREE.Vector2(j[0], j[1]));
        break;
      case THREE.PathActions.QUADRATIC_CURVE_TO:
        k = j[2];
        m = j[3];
        u = j[0];
        v = j[1];
        e.length > 0
          ? ((h = e[e.length - 1]), (t = h.x), (x = h.y))
          : ((h = this.actions[f - 1].args),
            (t = h[h.length - 2]),
            (x = h[h.length - 1]));
        for (h = 1; h <= b; h++)
          (w = h / b),
            (j = THREE.Shape.Utils.b2(w, t, u, k)),
            (w = THREE.Shape.Utils.b2(w, x, v, m)),
            e.push(new THREE.Vector2(j, w));
        break;
      case THREE.PathActions.BEZIER_CURVE_TO:
        k = j[4];
        m = j[5];
        u = j[0];
        v = j[1];
        o = j[2];
        p = j[3];
        e.length > 0
          ? ((h = e[e.length - 1]), (t = h.x), (x = h.y))
          : ((h = this.actions[f - 1].args),
            (t = h[h.length - 2]),
            (x = h[h.length - 1]));
        for (h = 1; h <= b; h++)
          (w = h / b),
            (j = THREE.Shape.Utils.b3(w, t, u, o, k)),
            (w = THREE.Shape.Utils.b3(w, x, v, p, m)),
            e.push(new THREE.Vector2(j, w));
        break;
      case THREE.PathActions.CSPLINE_THRU:
        h = this.actions[f - 1].args;
        h = [new THREE.Vector2(h[h.length - 2], h[h.length - 1])];
        w = b * j[0].length;
        h = h.concat(j[0]);
        j = new THREE.SplineCurve(h);
        for (h = 1; h <= w; h++) e.push(j.getPointAt(h / w));
        break;
      case THREE.PathActions.ARC:
        h = this.actions[f - 1].args;
        k = j[0];
        m = j[1];
        o = j[2];
        u = j[3];
        w = j[4];
        v = !!j[5];
        p = h[h.length - 2];
        t = h[h.length - 1];
        h.length == 0 && (p = t = 0);
        x = w - u;
        var A = b * 2;
        for (h = 1; h <= A; h++)
          (w = h / A),
            v || (w = 1 - w),
            (w = u + w * x),
            (j = p + k + o * Math.cos(w)),
            (w = t + m + o * Math.sin(w)),
            e.push(new THREE.Vector2(j, w));
    }
  c && e.push(e[0]);
  return e;
};
THREE.Path.prototype.transform = function (b, c) {
  this.getBoundingBox();
  return this.getWrapPoints(this.getPoints(c), b);
};
THREE.Path.prototype.nltransform = function (b, c, e, f, g, j) {
  var h = this.getPoints(),
    k,
    m,
    o,
    p,
    u;
  k = 0;
  for (m = h.length; k < m; k++)
    (o = h[k]),
      (p = o.x),
      (u = o.y),
      (o.x = b * p + c * u + e),
      (o.y = f * u + g * p + j);
  return h;
};
THREE.Path.prototype.debug = function (b) {
  var c = this.getBoundingBox();
  b ||
    ((b = document.createElement("canvas")),
    b.setAttribute("width", c.maxX + 100),
    b.setAttribute("height", c.maxY + 100),
    document.body.appendChild(b));
  c = b.getContext("2d");
  c.fillStyle = "white";
  c.fillRect(0, 0, b.width, b.height);
  c.strokeStyle = "black";
  c.beginPath();
  var e,
    f,
    g,
    b = 0;
  for (e = this.actions.length; b < e; b++)
    (f = this.actions[b]),
      (g = f.args),
      (f = f.action),
      f != THREE.PathActions.CSPLINE_THRU && c[f].apply(c, g);
  c.stroke();
  c.closePath();
  c.strokeStyle = "red";
  f = this.getPoints();
  b = 0;
  for (e = f.length; b < e; b++)
    (g = f[b]),
      c.beginPath(),
      c.arc(g.x, g.y, 1.5, 0, Math.PI * 2, !1),
      c.stroke(),
      c.closePath();
};
THREE.Path.prototype.toShapes = function () {
  var b,
    c,
    e,
    f,
    g = [],
    j = new THREE.Path();
  b = 0;
  for (c = this.actions.length; b < c; b++)
    (e = this.actions[b]),
      (f = e.args),
      (e = e.action),
      e == THREE.PathActions.MOVE_TO &&
        j.actions.length != 0 &&
        (g.push(j), (j = new THREE.Path())),
      j[e].apply(j, f);
  j.actions.length != 0 && g.push(j);
  if (g.length == 0) return [];
  var h,
    j = [];
  if (THREE.Shape.Utils.isClockWise(g[0].getPoints())) {
    b = 0;
    for (c = g.length; b < c; b++)
      (f = g[b]),
        THREE.Shape.Utils.isClockWise(f.getPoints())
          ? (h && j.push(h),
            (h = new THREE.Shape()),
            (h.actions = f.actions),
            (h.curves = f.curves))
          : h.holes.push(f);
    j.push(h);
  } else {
    h = new THREE.Shape();
    b = 0;
    for (c = g.length; b < c; b++)
      (f = g[b]),
        THREE.Shape.Utils.isClockWise(f.getPoints())
          ? ((h.actions = f.actions),
            (h.curves = f.curves),
            j.push(h),
            (h = new THREE.Shape()))
          : h.holes.push(f);
  }
  return j;
};
THREE.Shape = function () {
  THREE.Path.apply(this, arguments);
  this.holes = [];
};
THREE.Shape.prototype = new THREE.Path();
THREE.Shape.prototype.constructor = THREE.Path;
THREE.Shape.prototype.extrude = function (b) {
  return new THREE.ExtrudeGeometry(this, b);
};
THREE.Shape.prototype.getPointsHoles = function (b) {
  var c,
    e = this.holes.length,
    f = [];
  for (c = 0; c < e; c++)
    f[c] = this.holes[c].getTransformedPoints(b, this.bends);
  return f;
};
THREE.Shape.prototype.getSpacedPointsHoles = function (b) {
  var c,
    e = this.holes.length,
    f = [];
  for (c = 0; c < e; c++)
    f[c] = this.holes[c].getTransformedSpacedPoints(b, this.bends);
  return f;
};
THREE.Shape.prototype.extractAllPoints = function (b) {
  return { shape: this.getTransformedPoints(b), holes: this.getPointsHoles(b) };
};
THREE.Shape.prototype.extractAllSpacedPoints = function (b) {
  return {
    shape: this.getTransformedSpacedPoints(b),
    holes: this.getSpacedPointsHoles(b),
  };
};
THREE.Shape.Utils = {
  removeHoles: function (b, c) {
    var e = b.concat(),
      f = e.concat(),
      g,
      j,
      h,
      k,
      m,
      o,
      p,
      u,
      v,
      t,
      x = [];
    for (m = 0; m < c.length; m++) {
      o = c[m];
      f = f.concat(o);
      j = Number.POSITIVE_INFINITY;
      for (g = 0; g < o.length; g++) {
        v = o[g];
        t = [];
        for (u = 0; u < e.length; u++)
          (p = e[u]),
            (p = v.distanceToSquared(p)),
            t.push(p),
            p < j && ((j = p), (h = g), (k = u));
      }
      g = k - 1 >= 0 ? k - 1 : e.length - 1;
      j = h - 1 >= 0 ? h - 1 : o.length - 1;
      var w = [o[h], e[k], e[g]];
      u = THREE.FontUtils.Triangulate.area(w);
      var A = [o[h], o[j], e[k]];
      v = THREE.FontUtils.Triangulate.area(A);
      t = k;
      p = h;
      k += 1;
      h += -1;
      k < 0 && (k += e.length);
      k %= e.length;
      h < 0 && (h += o.length);
      h %= o.length;
      g = k - 1 >= 0 ? k - 1 : e.length - 1;
      j = h - 1 >= 0 ? h - 1 : o.length - 1;
      w = [o[h], e[k], e[g]];
      w = THREE.FontUtils.Triangulate.area(w);
      A = [o[h], o[j], e[k]];
      A = THREE.FontUtils.Triangulate.area(A);
      u + v > w + A &&
        ((k = t),
        (h = p),
        k < 0 && (k += e.length),
        (k %= e.length),
        h < 0 && (h += o.length),
        (h %= o.length),
        (g = k - 1 >= 0 ? k - 1 : e.length - 1),
        (j = h - 1 >= 0 ? h - 1 : o.length - 1));
      u = e.slice(0, k);
      v = e.slice(k);
      t = o.slice(h);
      p = o.slice(0, h);
      j = [o[h], o[j], e[k]];
      x.push([o[h], e[k], e[g]]);
      x.push(j);
      e = u.concat(t).concat(p).concat(v);
    }
    return { shape: e, isolatedPts: x, allpoints: f };
  },
  triangulateShape: function (b, c) {
    var e = THREE.Shape.Utils.removeHoles(b, c),
      f = e.allpoints,
      g = e.isolatedPts,
      e = THREE.FontUtils.Triangulate(e.shape, !1),
      j,
      h,
      k,
      m,
      o = {};
    j = 0;
    for (h = f.length; j < h; j++)
      (m = f[j].x + ":" + f[j].y),
        o[m] !== void 0 && console.log("Duplicate point", m),
        (o[m] = j);
    j = 0;
    for (h = e.length; j < h; j++) {
      k = e[j];
      for (f = 0; f < 3; f++)
        (m = k[f].x + ":" + k[f].y), (m = o[m]), m !== void 0 && (k[f] = m);
    }
    j = 0;
    for (h = g.length; j < h; j++) {
      k = g[j];
      for (f = 0; f < 3; f++)
        (m = k[f].x + ":" + k[f].y), (m = o[m]), m !== void 0 && (k[f] = m);
    }
    return e.concat(g);
  },
  isClockWise: function (b) {
    return THREE.FontUtils.Triangulate.area(b) < 0;
  },
  b2p0: function (b, c) {
    var e = 1 - b;
    return e * e * c;
  },
  b2p1: function (b, c) {
    return 2 * (1 - b) * b * c;
  },
  b2p2: function (b, c) {
    return b * b * c;
  },
  b2: function (b, c, e, f) {
    return this.b2p0(b, c) + this.b2p1(b, e) + this.b2p2(b, f);
  },
  b3p0: function (b, c) {
    var e = 1 - b;
    return e * e * e * c;
  },
  b3p1: function (b, c) {
    var e = 1 - b;
    return 3 * e * e * b * c;
  },
  b3p2: function (b, c) {
    return 3 * (1 - b) * b * b * c;
  },
  b3p3: function (b, c) {
    return b * b * b * c;
  },
  b3: function (b, c, e, f, g) {
    return (
      this.b3p0(b, c) + this.b3p1(b, e) + this.b3p2(b, f) + this.b3p3(b, g)
    );
  },
};
THREE.TextPath = function (b, c) {
  THREE.Path.call(this);
  this.parameters = c || {};
  this.set(b);
};
THREE.TextPath.prototype.set = function (b, c) {
  this.text = b;
  var c = c || this.parameters,
    e = c.curveSegments !== void 0 ? c.curveSegments : 4,
    f = c.font !== void 0 ? c.font : "helvetiker",
    g = c.weight !== void 0 ? c.weight : "normal",
    j = c.style !== void 0 ? c.style : "normal";
  THREE.FontUtils.size = c.size !== void 0 ? c.size : 100;
  THREE.FontUtils.divisions = e;
  THREE.FontUtils.face = f;
  THREE.FontUtils.weight = g;
  THREE.FontUtils.style = j;
};
THREE.TextPath.prototype.toShapes = function () {
  for (
    var b = THREE.FontUtils.drawText(this.text).paths,
      c = [],
      e = 0,
      f = b.length;
    e < f;
    e++
  )
    c = c.concat(b[e].toShapes());
  return c;
};
THREE.CubeGeometry = function (b, c, e, f, g, j, h, k, m) {
  function o(b, c, e, h, k, m, o, t) {
    var u,
      v,
      x = f || 1,
      w = g || 1,
      S = k / 2,
      K = m / 2,
      Q = p.vertices.length;
    if ((b == "x" && c == "y") || (b == "y" && c == "x")) u = "z";
    else if ((b == "x" && c == "z") || (b == "z" && c == "x"))
      (u = "y"), (w = j || 1);
    else if ((b == "z" && c == "y") || (b == "y" && c == "z"))
      (u = "x"), (x = j || 1);
    var n = x + 1,
      T = w + 1;
    k /= x;
    var X = m / w;
    for (v = 0; v < T; v++)
      for (m = 0; m < n; m++) {
        var M = new THREE.Vector3();
        M[b] = (m * k - S) * e;
        M[c] = (v * X - K) * h;
        M[u] = o;
        p.vertices.push(new THREE.Vertex(M));
      }
    for (v = 0; v < w; v++)
      for (m = 0; m < x; m++)
        p.faces.push(
          new THREE.Face4(
            m + n * v + Q,
            m + n * (v + 1) + Q,
            m + 1 + n * (v + 1) + Q,
            m + 1 + n * v + Q,
            null,
            null,
            t
          )
        ),
          p.faceVertexUvs[0].push([
            new THREE.UV(m / x, v / w),
            new THREE.UV(m / x, (v + 1) / w),
            new THREE.UV((m + 1) / x, (v + 1) / w),
            new THREE.UV((m + 1) / x, v / w),
          ]);
  }
  THREE.Geometry.call(this);
  var p = this,
    u = b / 2,
    v = c / 2,
    t = e / 2,
    k = k ? -1 : 1;
  if (h !== void 0)
    if (h instanceof Array) this.materials = h;
    else {
      this.materials = [];
      for (var x = 0; x < 6; x++) this.materials.push([h]);
    }
  else this.materials = [];
  this.sides = { px: !0, nx: !0, py: !0, ny: !0, pz: !0, nz: !0 };
  if (m != void 0)
    for (var w in m) this.sides[w] != void 0 && (this.sides[w] = m[w]);
  this.sides.px && o("z", "y", 1 * k, -1, e, c, -u, this.materials[0]);
  this.sides.nx && o("z", "y", -1 * k, -1, e, c, u, this.materials[1]);
  this.sides.py && o("x", "z", 1 * k, 1, b, e, v, this.materials[2]);
  this.sides.ny && o("x", "z", 1 * k, -1, b, e, -v, this.materials[3]);
  this.sides.pz && o("x", "y", 1 * k, -1, b, c, t, this.materials[4]);
  this.sides.nz && o("x", "y", -1 * k, -1, b, c, -t, this.materials[5]);
  (function () {
    for (var b = [], c = [], e = 0, f = p.vertices.length; e < f; e++) {
      for (var h = p.vertices[e], g = !1, j = 0, k = b.length; j < k; j++) {
        var m = b[j];
        if (
          h.position.x == m.position.x &&
          h.position.y == m.position.y &&
          h.position.z == m.position.z
        ) {
          c[e] = j;
          g = !0;
          break;
        }
      }
      if (!g) (c[e] = b.length), b.push(new THREE.Vertex(h.position.clone()));
    }
    e = 0;
    for (f = p.faces.length; e < f; e++)
      (h = p.faces[e]),
        (h.a = c[h.a]),
        (h.b = c[h.b]),
        (h.c = c[h.c]),
        (h.d = c[h.d]);
    p.vertices = b;
  })();
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.CubeGeometry.prototype = new THREE.Geometry();
THREE.CubeGeometry.prototype.constructor = THREE.CubeGeometry;
THREE.CylinderGeometry = function (b, c, e, f, g, j) {
  function h(b, c, e) {
    k.vertices.push(new THREE.Vertex(new THREE.Vector3(b, c, e)));
  }
  THREE.Geometry.call(this);
  var k = this,
    m,
    o = Math.PI * 2,
    p = f / 2;
  for (m = 0; m < b; m++)
    h(Math.sin((o * m) / b) * c, Math.cos((o * m) / b) * c, -p);
  for (m = 0; m < b; m++)
    h(Math.sin((o * m) / b) * e, Math.cos((o * m) / b) * e, p);
  var u,
    v,
    t,
    x,
    w = c - e;
  for (m = 0; m < b; m++)
    (u = new THREE.Vector3()),
      u.copy(k.vertices[m].position),
      (u.z = w),
      u.normalize(),
      (v = new THREE.Vector3()),
      v.copy(k.vertices[m + b].position),
      (v.z = w),
      v.normalize(),
      (t = new THREE.Vector3()),
      t.copy(k.vertices[b + ((m + 1) % b)].position),
      (t.z = w),
      t.normalize(),
      (x = new THREE.Vector3()),
      x.copy(k.vertices[(m + 1) % b].position),
      (x.z = w),
      x.normalize(),
      k.faces.push(
        new THREE.Face4(m, m + b, b + ((m + 1) % b), (m + 1) % b, [u, v, t, x])
      );
  if (e > 0) {
    e = new THREE.Vector3(0, 0, -1);
    h(0, 0, -p - (j || 0));
    for (m = b; m < b + b / 2; m++)
      k.faces.push(
        new THREE.Face4(
          2 * b,
          (2 * m - 2 * b) % b,
          (2 * m - 2 * b + 1) % b,
          (2 * m - 2 * b + 2) % b,
          [e, e, e, e]
        )
      );
  }
  if (c > 0) {
    c = new THREE.Vector3(0, 0, 1);
    h(0, 0, p + (g || 0));
    for (m = b + b / 2; m < 2 * b; m++)
      k.faces.push(
        new THREE.Face4(
          2 * b + 1,
          ((2 * m - 2 * b + 2) % b) + b,
          ((2 * m - 2 * b + 1) % b) + b,
          ((2 * m - 2 * b) % b) + b,
          [c, c, c, c]
        )
      );
  }
  m = 0;
  for (b = this.faces.length; m < b; m++)
    (g = []),
      (p = this.faces[m]),
      (c = this.vertices[p.a]),
      (j = this.vertices[p.b]),
      (e = this.vertices[p.c]),
      (u = this.vertices[p.d]),
      g.push(
        new THREE.UV(
          0.5 + Math.atan2(c.position.x, c.position.y) / o,
          0.5 + c.position.z / f
        )
      ),
      g.push(
        new THREE.UV(
          0.5 + Math.atan2(j.position.x, j.position.y) / o,
          0.5 + j.position.z / f
        )
      ),
      g.push(
        new THREE.UV(
          0.5 + Math.atan2(e.position.x, e.position.y) / o,
          0.5 + e.position.z / f
        )
      ),
      p instanceof THREE.Face4 &&
        g.push(
          new THREE.UV(
            0.5 + Math.atan2(u.position.x, u.position.y) / o,
            0.5 + u.position.z / f
          )
        ),
      this.faceVertexUvs[0].push(g);
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.CylinderGeometry.prototype = new THREE.Geometry();
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry;
THREE.ExtrudeGeometry = function (b, c) {
  if (typeof b != "undefined") {
    THREE.Geometry.call(this);
    var b = b instanceof Array ? b : [b],
      e,
      f = b.length,
      g;
    this.shapebb = b[f - 1].getBoundingBox();
    for (e = 0; e < f; e++) (g = b[e]), this.addShape(g, c);
    this.computeCentroids();
    this.computeFaceNormals();
  }
};
THREE.ExtrudeGeometry.prototype = new THREE.Geometry();
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShape = function (b, c) {
  function e(b, c, e) {
    c || console.log("die");
    return c.clone().multiplyScalar(e).addSelf(b);
  }
  function f(b, c, e) {
    var f = THREE.ExtrudeGeometry.__v1,
      h = THREE.ExtrudeGeometry.__v2,
      g = THREE.ExtrudeGeometry.__v3,
      j = THREE.ExtrudeGeometry.__v4,
      k = THREE.ExtrudeGeometry.__v5,
      m = THREE.ExtrudeGeometry.__v6;
    f.set(b.x - c.x, b.y - c.y);
    h.set(b.x - e.x, b.y - e.y);
    f = f.normalize();
    h = h.normalize();
    g.set(-f.y, f.x);
    j.set(h.y, -h.x);
    k.copy(b).addSelf(g);
    m.copy(b).addSelf(j);
    if (k.equals(m)) return j.clone();
    k.copy(c).addSelf(g);
    m.copy(e).addSelf(j);
    g = f.dot(j);
    j = m.subSelf(k).dot(j);
    g == 0 &&
      (console.log("Either infinite or no solutions!"),
      j == 0
        ? console.log("Its finite solutions.")
        : console.log("Too bad, no solutions."));
    j /= g;
    if (j < 0)
      return (
        (c = Math.atan2(c.y - b.y, c.x - b.x)),
        (b = Math.atan2(e.y - b.y, e.x - b.x)),
        c > b && (b += Math.PI * 2),
        (anglec = (c + b) / 2),
        new THREE.Vector2(-Math.cos(anglec), -Math.sin(anglec))
      );
    return f.multiplyScalar(j).addSelf(k).subSelf(b).clone();
  }
  function g(b) {
    for (H = b.length; --H >= 0; ) {
      ga = H;
      $ = H - 1;
      $ < 0 && ($ = b.length - 1);
      for (var c = 0, e = t + p * 2, c = 0; c < e; c++) {
        var f = X * c,
          h = X * (c + 1),
          g = Y + ga + f,
          j = Y + ga + h,
          n = g,
          f = Y + $ + f,
          h = Y + $ + h,
          o = j;
        n += V;
        f += V;
        h += V;
        o += V;
        E.faces.push(new THREE.Face4(n, f, h, o, null, null, I));
        I &&
          ((n = c / e),
          (f = (c + 1) / e),
          (h = k + m * 2),
          (g = (E.vertices[g].position.z + m) / h),
          (j = (E.vertices[j].position.z + m) / h),
          E.faceVertexUvs[0].push([
            new THREE.UV(g, n),
            new THREE.UV(j, n),
            new THREE.UV(j, f),
            new THREE.UV(g, f),
          ]));
      }
    }
  }
  function j(b, c, e) {
    E.vertices.push(new THREE.Vertex(new THREE.Vector3(b, c, e)));
  }
  function h(b, c, e) {
    b += V;
    c += V;
    e += V;
    E.faces.push(new THREE.Face3(b, c, e, null, null, D));
    if (D) {
      var f = J.maxY,
        h = J.maxX,
        g = E.vertices[c].position.x,
        c = E.vertices[c].position.y,
        j = E.vertices[e].position.x,
        e = E.vertices[e].position.y;
      E.faceVertexUvs[0].push([
        new THREE.UV(
          E.vertices[b].position.x / h,
          E.vertices[b].position.y / f
        ),
        new THREE.UV(g / h, c / f),
        new THREE.UV(j / h, e / f),
      ]);
    }
  }
  var k = c.amount !== void 0 ? c.amount : 100,
    m = c.bevelThickness !== void 0 ? c.bevelThickness : 6,
    o = c.bevelSize !== void 0 ? c.bevelSize : m - 2,
    p = c.bevelSegments !== void 0 ? c.bevelSegments : 3,
    u = c.bevelEnabled !== void 0 ? c.bevelEnabled : !0,
    v = c.curveSegments !== void 0 ? c.curveSegments : 12,
    t = c.steps !== void 0 ? c.steps : 1,
    x = c.bendPath,
    w = c.extrudePath,
    A,
    y = !1,
    G = c.useSpacedPoints !== void 0 ? c.useSpacedPoints : !1,
    D = c.material,
    I = c.extrudeMaterial,
    J = this.shapebb;
  if (w) (A = w.getPoints(v)), (t = A.length), (y = !0), (u = !1);
  u || (o = m = p = 0);
  var C,
    B,
    L,
    E = this,
    V = this.vertices.length;
  x && b.addWrapPath(x);
  v = G ? b.extractAllSpacedPoints(v) : b.extractAllPoints(v);
  x = v.shape;
  v = v.holes;
  if ((w = !THREE.Shape.Utils.isClockWise(x))) {
    x = x.reverse();
    B = 0;
    for (L = v.length; B < L; B++)
      (C = v[B]), THREE.Shape.Utils.isClockWise(C) && (v[B] = C.reverse());
    w = !1;
  }
  w = THREE.Shape.Utils.triangulateShape(x, v);
  G = x;
  B = 0;
  for (L = v.length; B < L; B++) (C = v[B]), (x = x.concat(C));
  var H,
    S,
    K,
    Q,
    n,
    T,
    X = x.length,
    M = w.length,
    W = [];
  H = 0;
  S = G.length;
  ga = S - 1;
  for ($ = H + 1; H < S; H++, ga++, $++)
    ga == S && (ga = 0), $ == S && ($ = 0), (W[H] = f(G[H], G[ga], G[$]));
  var ha = [],
    ca,
    fa = W.concat();
  B = 0;
  for (L = v.length; B < L; B++) {
    C = v[B];
    ca = [];
    H = 0;
    S = C.length;
    ga = S - 1;
    for ($ = H + 1; H < S; H++, ga++, $++)
      ga == S && (ga = 0), $ == S && ($ = 0), (ca[H] = f(C[H], C[ga], C[$]));
    ha.push(ca);
    fa = fa.concat(ca);
  }
  for (K = 0; K < p; K++) {
    Q = K / p;
    n = m * (1 - Q);
    Q = o * Math.sin((Q * Math.PI) / 2);
    H = 0;
    for (S = G.length; H < S; H++) (T = e(G[H], W[H], Q)), j(T.x, T.y, -n);
    B = 0;
    for (L = v.length; B < L; B++) {
      C = v[B];
      ca = ha[B];
      H = 0;
      for (S = C.length; H < S; H++) (T = e(C[H], ca[H], Q)), j(T.x, T.y, -n);
    }
  }
  Q = o;
  for (H = 0; H < X; H++)
    (T = u ? e(x[H], fa[H], Q) : x[H]),
      y ? j(T.x, T.y + A[0].y, A[0].x) : j(T.x, T.y, 0);
  for (K = 1; K <= t; K++)
    for (H = 0; H < X; H++)
      (T = u ? e(x[H], fa[H], Q) : x[H]),
        y ? j(T.x, T.y + A[K - 1].y, A[K - 1].x) : j(T.x, T.y, (k / t) * K);
  for (K = p - 1; K >= 0; K--) {
    Q = K / p;
    n = m * (1 - Q);
    Q = o * Math.sin((Q * Math.PI) / 2);
    H = 0;
    for (S = G.length; H < S; H++) (T = e(G[H], W[H], Q)), j(T.x, T.y, k + n);
    B = 0;
    for (L = v.length; B < L; B++) {
      C = v[B];
      ca = ha[B];
      H = 0;
      for (S = C.length; H < S; H++)
        (T = e(C[H], ca[H], Q)),
          y ? j(T.x, T.y + A[t - 1].y, A[t - 1].x + n) : j(T.x, T.y, k + n);
    }
  }
  if (u) {
    u = X * 0;
    for (H = 0; H < M; H++) (o = w[H]), h(o[2] + u, o[1] + u, o[0] + u);
    u = X * (t + p * 2);
    for (H = 0; H < M; H++) (o = w[H]), h(o[0] + u, o[1] + u, o[2] + u);
  } else {
    for (H = 0; H < M; H++) (o = w[H]), h(o[2], o[1], o[0]);
    for (H = 0; H < M; H++)
      (o = w[H]), h(o[0] + X * t, o[1] + X * t, o[2] + X * t);
  }
  var ga,
    $,
    Y = 0;
  g(G);
  Y += G.length;
  B = 0;
  for (L = v.length; B < L; B++) (C = v[B]), g(C), (Y += C.length);
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2();
THREE.IcosahedronGeometry = function (b) {
  function c(b, c, e) {
    var f = Math.sqrt(b * b + c * c + e * e);
    return (
      g.vertices.push(
        new THREE.Vertex(new THREE.Vector3(b / f, c / f, e / f))
      ) - 1
    );
  }
  function e(b, c, e, f) {
    f.faces.push(new THREE.Face3(b, c, e));
  }
  function f(b, e) {
    var f = g.vertices[b].position,
      h = g.vertices[e].position;
    return c((f.x + h.x) / 2, (f.y + h.y) / 2, (f.z + h.z) / 2);
  }
  var g = this,
    j = new THREE.Geometry();
  this.subdivisions = b || 0;
  THREE.Geometry.call(this);
  b = (1 + Math.sqrt(5)) / 2;
  c(-1, b, 0);
  c(1, b, 0);
  c(-1, -b, 0);
  c(1, -b, 0);
  c(0, -1, b);
  c(0, 1, b);
  c(0, -1, -b);
  c(0, 1, -b);
  c(b, 0, -1);
  c(b, 0, 1);
  c(-b, 0, -1);
  c(-b, 0, 1);
  e(0, 11, 5, j);
  e(0, 5, 1, j);
  e(0, 1, 7, j);
  e(0, 7, 10, j);
  e(0, 10, 11, j);
  e(1, 5, 9, j);
  e(5, 11, 4, j);
  e(11, 10, 2, j);
  e(10, 7, 6, j);
  e(7, 1, 8, j);
  e(3, 9, 4, j);
  e(3, 4, 2, j);
  e(3, 2, 6, j);
  e(3, 6, 8, j);
  e(3, 8, 9, j);
  e(4, 9, 5, j);
  e(2, 4, 11, j);
  e(6, 2, 10, j);
  e(8, 6, 7, j);
  e(9, 8, 1, j);
  for (var h = 0; h < this.subdivisions; h++) {
    var b = new THREE.Geometry(),
      k;
    for (k in j.faces) {
      var m = f(j.faces[k].a, j.faces[k].b),
        o = f(j.faces[k].b, j.faces[k].c),
        p = f(j.faces[k].c, j.faces[k].a);
      e(j.faces[k].a, m, p, b);
      e(j.faces[k].b, o, m, b);
      e(j.faces[k].c, p, o, b);
      e(m, o, p, b);
    }
    j.faces = b.faces;
  }
  g.faces = j.faces;
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.IcosahedronGeometry.prototype = new THREE.Geometry();
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
THREE.LatheGeometry = function (b, c, e) {
  THREE.Geometry.call(this);
  this.steps = c || 12;
  this.angle = e || 2 * Math.PI;
  for (
    var c = this.angle / this.steps,
      e = [],
      f = [],
      g = [],
      j = [],
      h = new THREE.Matrix4().setRotationZ(c),
      k = 0;
    k < b.length;
    k++
  )
    this.vertices.push(new THREE.Vertex(b[k])),
      (e[k] = b[k].clone()),
      (f[k] = this.vertices.length - 1);
  for (var m = 0; m <= this.angle + 0.001; m += c) {
    for (k = 0; k < e.length; k++)
      m < this.angle
        ? ((e[k] = h.multiplyVector3(e[k].clone())),
          this.vertices.push(new THREE.Vertex(e[k])),
          (g[k] = this.vertices.length - 1))
        : (g = j);
    m == 0 && (j = f);
    for (k = 0; k < f.length - 1; k++)
      this.faces.push(new THREE.Face4(g[k], g[k + 1], f[k + 1], f[k])),
        this.faceVertexUvs[0].push([
          new THREE.UV(1 - m / this.angle, k / b.length),
          new THREE.UV(1 - m / this.angle, (k + 1) / b.length),
          new THREE.UV(1 - (m - c) / this.angle, (k + 1) / b.length),
          new THREE.UV(1 - (m - c) / this.angle, k / b.length),
        ]);
    f = g;
    g = [];
  }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.LatheGeometry.prototype = new THREE.Geometry();
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry;
THREE.PlaneGeometry = function (b, c, e, f) {
  THREE.Geometry.call(this);
  var g,
    j = b / 2,
    h = c / 2,
    e = e || 1,
    f = f || 1,
    k = e + 1,
    m = f + 1;
  b /= e;
  var o = c / f;
  for (g = 0; g < m; g++)
    for (c = 0; c < k; c++)
      this.vertices.push(
        new THREE.Vertex(new THREE.Vector3(c * b - j, -(g * o - h), 0))
      );
  for (g = 0; g < f; g++)
    for (c = 0; c < e; c++)
      this.faces.push(
        new THREE.Face4(
          c + k * g,
          c + k * (g + 1),
          c + 1 + k * (g + 1),
          c + 1 + k * g
        )
      ),
        this.faceVertexUvs[0].push([
          new THREE.UV(c / e, g / f),
          new THREE.UV(c / e, (g + 1) / f),
          new THREE.UV((c + 1) / e, (g + 1) / f),
          new THREE.UV((c + 1) / e, g / f),
        ]);
  this.computeCentroids();
  this.computeFaceNormals();
};
THREE.PlaneGeometry.prototype = new THREE.Geometry();
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry;
THREE.SphereGeometry = function (b, c, e) {
  THREE.Geometry.call(this);
  for (
    var b = b || 50,
      f,
      g = Math.PI,
      j = Math.max(3, c || 8),
      h = Math.max(2, e || 6),
      c = [],
      e = 0;
    e < h + 1;
    e++
  ) {
    f = e / h;
    var k = b * Math.cos(f * g),
      m = b * Math.sin(f * g),
      o = [],
      p = 0;
    for (f = 0; f < j; f++) {
      var u = (2 * f) / j,
        v = m * Math.sin(u * g),
        u = m * Math.cos(u * g);
      ((e == 0 || e == h) && f > 0) ||
        (p =
          this.vertices.push(new THREE.Vertex(new THREE.Vector3(u, k, v))) - 1);
      o.push(p);
    }
    c.push(o);
  }
  for (var t, x, w, g = c.length, e = 0; e < g; e++)
    if (((j = c[e].length), e > 0))
      for (f = 0; f < j; f++) {
        o = f == j - 1;
        h = c[e][o ? 0 : f + 1];
        k = c[e][o ? j - 1 : f];
        m = c[e - 1][o ? j - 1 : f];
        o = c[e - 1][o ? 0 : f + 1];
        v = e / (g - 1);
        t = (e - 1) / (g - 1);
        x = (f + 1) / j;
        var u = f / j,
          p = new THREE.UV(1 - x, v),
          v = new THREE.UV(1 - u, v),
          u = new THREE.UV(1 - u, t),
          A = new THREE.UV(1 - x, t);
        e < c.length - 1 &&
          ((t = this.vertices[h].position.clone()),
          (x = this.vertices[k].position.clone()),
          (w = this.vertices[m].position.clone()),
          t.normalize(),
          x.normalize(),
          w.normalize(),
          this.faces.push(
            new THREE.Face3(h, k, m, [
              new THREE.Vector3(t.x, t.y, t.z),
              new THREE.Vector3(x.x, x.y, x.z),
              new THREE.Vector3(w.x, w.y, w.z),
            ])
          ),
          this.faceVertexUvs[0].push([p, v, u]));
        e > 1 &&
          ((t = this.vertices[h].position.clone()),
          (x = this.vertices[m].position.clone()),
          (w = this.vertices[o].position.clone()),
          t.normalize(),
          x.normalize(),
          w.normalize(),
          this.faces.push(
            new THREE.Face3(h, m, o, [
              new THREE.Vector3(t.x, t.y, t.z),
              new THREE.Vector3(x.x, x.y, x.z),
              new THREE.Vector3(w.x, w.y, w.z),
            ])
          ),
          this.faceVertexUvs[0].push([p, u, A]));
      }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
  this.boundingSphere = { radius: b };
};
THREE.SphereGeometry.prototype = new THREE.Geometry();
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry;
THREE.TextGeometry = function (b, c) {
  var e = new THREE.TextPath(b, c).toShapes();
  c.amount = c.height !== void 0 ? c.height : 50;
  if (c.bevelThickness === void 0) c.bevelThickness = 10;
  if (c.bevelSize === void 0) c.bevelSize = 8;
  if (c.bevelEnabled === void 0) c.bevelEnabled = !1;
  if (c.bend) {
    var f = e[e.length - 1].getBoundingBox().maxX;
    c.bendPath = new THREE.QuadraticBezierCurve(
      new THREE.Vector2(0, 0),
      new THREE.Vector2(f / 2, 120),
      new THREE.Vector2(f, 0)
    );
  }
  THREE.ExtrudeGeometry.call(this, e, c);
};
THREE.TextGeometry.prototype = new THREE.ExtrudeGeometry();
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry;
THREE.FontUtils = {
  faces: {},
  face: "helvetiker",
  weight: "normal",
  style: "normal",
  size: 150,
  divisions: 10,
  getFace: function () {
    return this.faces[this.face][this.weight][this.style];
  },
  getTextShapes: function (b, c) {
    return new TextPath(b, c).toShapes();
  },
  loadFace: function (b) {
    var c = b.familyName.toLowerCase();
    this.faces[c] = this.faces[c] || {};
    this.faces[c][b.cssFontWeight] = this.faces[c][b.cssFontWeight] || {};
    this.faces[c][b.cssFontWeight][b.cssFontStyle] = b;
    return (this.faces[c][b.cssFontWeight][b.cssFontStyle] = b);
  },
  drawText: function (b) {
    for (
      var c = this.getFace(),
        e = this.size / c.resolution,
        f = 0,
        g = String(b).split(""),
        j = g.length,
        h = [],
        b = 0;
      b < j;
      b++
    ) {
      var k = new THREE.Path(),
        k = this.extractGlyphPoints(g[b], c, e, f, k);
      f += k.offset;
      h.push(k.path);
    }
    return { paths: h, offset: f / 2 };
  },
  extractGlyphPoints: function (b, c, e, f, g) {
    var j = [],
      h,
      k,
      m,
      o,
      p,
      u,
      v,
      t,
      x,
      w,
      A = c.glyphs[b] || c.glyphs[ctxt.options.fallbackCharacter];
    if (A) {
      if (A.o) {
        c = A._cachedOutline || (A._cachedOutline = A.o.split(" "));
        m = c.length;
        for (b = 0; b < m; )
          switch (((k = c[b++]), k)) {
            case "m":
              k = c[b++] * e + f;
              o = c[b++] * e;
              j.push(new THREE.Vector2(k, o));
              g.moveTo(k, o);
              break;
            case "l":
              k = c[b++] * e + f;
              o = c[b++] * e;
              j.push(new THREE.Vector2(k, o));
              g.lineTo(k, o);
              break;
            case "q":
              k = c[b++] * e + f;
              o = c[b++] * e;
              v = c[b++] * e + f;
              t = c[b++] * e;
              g.quadraticCurveTo(v, t, k, o);
              if ((h = j[j.length - 1])) {
                p = h.x;
                u = h.y;
                h = 1;
                for (divisions = this.divisions; h <= divisions; h++) {
                  var y = h / divisions,
                    G = THREE.Shape.Utils.b2(y, p, v, k),
                    y = THREE.Shape.Utils.b2(y, u, t, o);
                  j.push(new THREE.Vector2(G, y));
                }
              }
              break;
            case "b":
              if (
                ((k = c[b++] * e + f),
                (o = c[b++] * e),
                (v = c[b++] * e + f),
                (t = c[b++] * -e),
                (x = c[b++] * e + f),
                (w = c[b++] * -e),
                g.bezierCurveTo(k, o, v, t, x, w),
                (h = j[j.length - 1]))
              ) {
                p = h.x;
                u = h.y;
                h = 1;
                for (divisions = this.divisions; h <= divisions; h++)
                  (y = h / divisions),
                    (G = THREE.Shape.Utils.b3(y, p, v, x, k)),
                    (y = THREE.Shape.Utils.b3(y, u, t, w, o)),
                    j.push(new THREE.Vector2(G, y));
              }
          }
      }
      return { offset: A.ha * e, points: j, path: g };
    }
  },
};
(function (b) {
  var c = function (b) {
    for (var c = b.length, g = 0, j = c - 1, h = 0; h < c; j = h++)
      g += b[j].x * b[h].y - b[h].x * b[j].y;
    return g * 0.5;
  };
  b.Triangulate = function (b, f) {
    var g = b.length;
    if (g < 3) return null;
    var j = [],
      h = [],
      k = [],
      m,
      o,
      p;
    if (c(b) > 0) for (o = 0; o < g; o++) h[o] = o;
    else for (o = 0; o < g; o++) h[o] = g - 1 - o;
    var u = 2 * g;
    for (o = g - 1; g > 2; ) {
      if (u-- <= 0) {
        console.log("Warning, unable to triangulate polygon!");
        if (f) return k;
        return j;
      }
      m = o;
      g <= m && (m = 0);
      o = m + 1;
      g <= o && (o = 0);
      p = o + 1;
      g <= p && (p = 0);
      var v;
      a: {
        v = b;
        var t = m,
          x = o,
          w = p,
          A = g,
          y = h,
          G = void 0,
          D = void 0,
          I = void 0,
          J = void 0,
          C = void 0,
          B = void 0,
          L = void 0,
          E = void 0,
          V = void 0,
          D = v[y[t]].x,
          I = v[y[t]].y,
          J = v[y[x]].x,
          C = v[y[x]].y,
          B = v[y[w]].x,
          L = v[y[w]].y;
        if (1.0e-10 > (J - D) * (L - I) - (C - I) * (B - D)) v = !1;
        else {
          for (G = 0; G < A; G++)
            if (!(G == t || G == x || G == w)) {
              var E = v[y[G]].x,
                V = v[y[G]].y,
                H = void 0,
                S = void 0,
                K = void 0,
                Q = void 0,
                n = void 0,
                T = void 0,
                X = void 0,
                M = void 0,
                W = void 0,
                ha = void 0,
                ca = void 0,
                fa = void 0,
                H = (K = n = void 0),
                H = B - J,
                S = L - C,
                K = D - B,
                Q = I - L,
                n = J - D,
                T = C - I,
                X = E - D,
                M = V - I,
                W = E - J,
                ha = V - C,
                ca = E - B,
                fa = V - L,
                H = H * ha - S * W,
                n = n * M - T * X,
                K = K * fa - Q * ca;
              if (H >= 0 && K >= 0 && n >= 0) {
                v = !1;
                break a;
              }
            }
          v = !0;
        }
      }
      if (v) {
        j.push([b[h[m]], b[h[o]], b[h[p]]]);
        k.push([h[m], h[o], h[p]]);
        m = o;
        for (p = o + 1; p < g; m++, p++) h[m] = h[p];
        g--;
        u = 2 * g;
      }
    }
    if (f) return k;
    return j;
  };
  b.Triangulate.area = c;
  return b;
})(THREE.FontUtils);
window._typeface_js = {
  faces: THREE.FontUtils.faces,
  loadFace: THREE.FontUtils.loadFace,
};
THREE.TorusGeometry = function (b, c, e, f, g) {
  THREE.Geometry.call(this);
  this.radius = b || 100;
  this.tube = c || 40;
  this.segmentsR = e || 8;
  this.segmentsT = f || 6;
  this.arc = g || Math.PI * 2;
  g = new THREE.Vector3();
  b = [];
  c = [];
  for (e = 0; e <= this.segmentsR; e++)
    for (f = 0; f <= this.segmentsT; f++) {
      var j = (f / this.segmentsT) * this.arc,
        h = (e / this.segmentsR) * Math.PI * 2;
      g.x = this.radius * Math.cos(j);
      g.y = this.radius * Math.sin(j);
      var k = new THREE.Vector3();
      k.x = (this.radius + this.tube * Math.cos(h)) * Math.cos(j);
      k.y = (this.radius + this.tube * Math.cos(h)) * Math.sin(j);
      k.z = this.tube * Math.sin(h);
      this.vertices.push(new THREE.Vertex(k));
      b.push(new THREE.UV(f / this.segmentsT, 1 - e / this.segmentsR));
      c.push(k.clone().subSelf(g).normalize());
    }
  for (e = 1; e <= this.segmentsR; e++)
    for (f = 1; f <= this.segmentsT; f++) {
      var g = (this.segmentsT + 1) * e + f - 1,
        j = (this.segmentsT + 1) * (e - 1) + f - 1,
        h = (this.segmentsT + 1) * (e - 1) + f,
        k = (this.segmentsT + 1) * e + f,
        m = new THREE.Face4(g, j, h, k, [c[g], c[j], c[h], c[k]]);
      m.normal.addSelf(c[g]);
      m.normal.addSelf(c[j]);
      m.normal.addSelf(c[h]);
      m.normal.addSelf(c[k]);
      m.normal.normalize();
      this.faces.push(m);
      this.faceVertexUvs[0].push([
        b[g].clone(),
        b[j].clone(),
        b[h].clone(),
        b[k].clone(),
      ]);
    }
  this.computeCentroids();
};
THREE.TorusGeometry.prototype = new THREE.Geometry();
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry;
THREE.TorusKnotGeometry = function (b, c, e, f, g, j, h) {
  function k(b, c, e, f, h, g) {
    c = (e / f) * b;
    e = Math.cos(c);
    return new THREE.Vector3(
      h * (2 + e) * 0.5 * Math.cos(b),
      h * (2 + e) * Math.sin(b) * 0.5,
      g * h * Math.sin(c) * 0.5
    );
  }
  THREE.Geometry.call(this);
  this.radius = b || 200;
  this.tube = c || 40;
  this.segmentsR = e || 64;
  this.segmentsT = f || 8;
  this.p = g || 2;
  this.q = j || 3;
  this.heightScale = h || 1;
  this.grid = Array(this.segmentsR);
  e = new THREE.Vector3();
  f = new THREE.Vector3();
  j = new THREE.Vector3();
  for (b = 0; b < this.segmentsR; ++b) {
    this.grid[b] = Array(this.segmentsT);
    for (c = 0; c < this.segmentsT; ++c) {
      var m = (b / this.segmentsR) * 2 * this.p * Math.PI,
        h = (c / this.segmentsT) * 2 * Math.PI,
        g = k(m, h, this.q, this.p, this.radius, this.heightScale),
        m = k(m + 0.01, h, this.q, this.p, this.radius, this.heightScale);
      e.x = m.x - g.x;
      e.y = m.y - g.y;
      e.z = m.z - g.z;
      f.x = m.x + g.x;
      f.y = m.y + g.y;
      f.z = m.z + g.z;
      j.cross(e, f);
      f.cross(j, e);
      j.normalize();
      f.normalize();
      m = -this.tube * Math.cos(h);
      h = this.tube * Math.sin(h);
      g.x += m * f.x + h * j.x;
      g.y += m * f.y + h * j.y;
      g.z += m * f.z + h * j.z;
      this.grid[b][c] =
        this.vertices.push(new THREE.Vertex(new THREE.Vector3(g.x, g.y, g.z))) -
        1;
    }
  }
  for (b = 0; b < this.segmentsR; ++b)
    for (c = 0; c < this.segmentsT; ++c) {
      var f = (b + 1) % this.segmentsR,
        j = (c + 1) % this.segmentsT,
        g = this.grid[b][c],
        e = this.grid[f][c],
        f = this.grid[f][j],
        j = this.grid[b][j],
        h = new THREE.UV(b / this.segmentsR, c / this.segmentsT),
        m = new THREE.UV((b + 1) / this.segmentsR, c / this.segmentsT),
        o = new THREE.UV((b + 1) / this.segmentsR, (c + 1) / this.segmentsT),
        p = new THREE.UV(b / this.segmentsR, (c + 1) / this.segmentsT);
      this.faces.push(new THREE.Face4(g, e, f, j));
      this.faceVertexUvs[0].push([h, m, o, p]);
    }
  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};
THREE.TorusKnotGeometry.prototype = new THREE.Geometry();
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry;
THREE.Loader = function (b) {
  this.statusDomElement = (this.showStatus = b)
    ? THREE.Loader.prototype.addStatusElement()
    : null;
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
};
THREE.Loader.prototype = {
  addStatusElement: function () {
    var b = document.createElement("div");
    b.style.position = "absolute";
    b.style.right = "0px";
    b.style.top = "0px";
    b.style.fontSize = "0.8em";
    b.style.textAlign = "left";
    b.style.background = "rgba(0,0,0,0.25)";
    b.style.color = "#fff";
    b.style.width = "120px";
    b.style.padding = "0.5em 0.5em 0.5em 0.5em";
    b.style.zIndex = 1e3;
    b.innerHTML = "Loading ...";
    return b;
  },
  updateProgress: function (b) {
    var c = "Loaded ";
    c += b.total
      ? ((100 * b.loaded) / b.total).toFixed(0) + "%"
      : (b.loaded / 1e3).toFixed(2) + " KB";
    this.statusDomElement.innerHTML = c;
  },
  extractUrlbase: function (b) {
    b = b.split("/");
    b.pop();
    return b.join("/");
  },
  init_materials: function (b, c, e) {
    b.materials = [];
    for (var f = 0; f < c.length; ++f)
      b.materials[f] = [THREE.Loader.prototype.createMaterial(c[f], e)];
  },
  hasNormals: function (b) {
    var c,
      e,
      f = b.materials.length;
    for (e = 0; e < f; e++)
      if (((c = b.materials[e][0]), c instanceof THREE.MeshShaderMaterial))
        return !0;
    return !1;
  },
  createMaterial: function (b, c) {
    function e(b) {
      b = Math.log(b) / Math.LN2;
      return Math.floor(b) == b;
    }
    function f(b, c) {
      var f = new Image();
      f.onload = function () {
        if (!e(this.width) || !e(this.height)) {
          var c = Math.pow(2, Math.round(Math.log(this.width) / Math.LN2)),
            f = Math.pow(2, Math.round(Math.log(this.height) / Math.LN2));
          b.image.width = c;
          b.image.height = f;
          b.image.getContext("2d").drawImage(this, 0, 0, c, f);
        } else b.image = this;
        b.needsUpdate = !0;
      };
      f.src = c;
    }
    function g(b, e, h, g, j, k) {
      var m = document.createElement("canvas");
      b[e] = new THREE.Texture(m);
      b[e].sourceFile = h;
      if (g) {
        b[e].repeat.set(g[0], g[1]);
        if (g[0] != 1) b[e].wrapS = THREE.RepeatWrapping;
        if (g[1] != 1) b[e].wrapT = THREE.RepeatWrapping;
      }
      j && b[e].offset.set(j[0], j[1]);
      if (k) {
        g = {
          repeat: THREE.RepeatWrapping,
          mirror: THREE.MirroredRepeatWrapping,
        };
        if (g[k[0]] !== void 0) b[e].wrapS = g[k[0]];
        if (g[k[1]] !== void 0) b[e].wrapT = g[k[1]];
      }
      f(b[e], c + "/" + h);
    }
    function j(b) {
      return ((b[0] * 255) << 16) + ((b[1] * 255) << 8) + b[2] * 255;
    }
    var h, k, m;
    k = "MeshLambertMaterial";
    h = {
      color: 15658734,
      opacity: 1,
      map: null,
      lightMap: null,
      normalMap: null,
      wireframe: b.wireframe,
    };
    b.shading &&
      (b.shading == "Phong"
        ? (k = "MeshPhongMaterial")
        : b.shading == "Basic" && (k = "MeshBasicMaterial"));
    if (b.blending)
      if (b.blending == "Additive") h.blending = THREE.AdditiveBlending;
      else if (b.blending == "Subtractive")
        h.blending = THREE.SubtractiveBlending;
      else if (b.blending == "Multiply") h.blending = THREE.MultiplyBlending;
    if (b.transparent !== void 0 || b.opacity < 1)
      h.transparent = b.transparent;
    if (b.depthTest !== void 0) h.depthTest = b.depthTest;
    if (b.vertexColors !== void 0)
      if (b.vertexColors == "face") h.vertexColors = THREE.FaceColors;
      else if (b.vertexColors) h.vertexColors = THREE.VertexColors;
    if (b.colorDiffuse) h.color = j(b.colorDiffuse);
    else if (b.DbgColor) h.color = b.DbgColor;
    if (b.colorSpecular) h.specular = j(b.colorSpecular);
    if (b.colorAmbient) h.ambient = j(b.colorAmbient);
    if (b.transparency) h.opacity = b.transparency;
    if (b.specularCoef) h.shininess = b.specularCoef;
    b.mapDiffuse &&
      c &&
      g(
        h,
        "map",
        b.mapDiffuse,
        b.mapDiffuseRepeat,
        b.mapDiffuseOffset,
        b.mapDiffuseWrap
      );
    b.mapLight &&
      c &&
      g(
        h,
        "lightMap",
        b.mapLight,
        b.mapLightRepeat,
        b.mapLightOffset,
        b.mapLightWrap
      );
    b.mapNormal &&
      c &&
      g(
        h,
        "normalMap",
        b.mapNormal,
        b.mapNormalRepeat,
        b.mapNormalOffset,
        b.mapNormalWrap
      );
    b.mapSpecular &&
      c &&
      g(
        h,
        "specularMap",
        b.mapSpecular,
        b.mapSpecularRepeat,
        b.mapSpecularOffset,
        b.mapSpecularWrap
      );
    if (b.mapNormal) {
      var o = THREE.ShaderUtils.lib.normal,
        p = THREE.UniformsUtils.clone(o.uniforms),
        u = h.color;
      k = h.specular;
      m = h.ambient;
      var v = h.shininess;
      p.tNormal.texture = h.normalMap;
      if (b.mapNormalFactor) p.uNormalScale.value = b.mapNormalFactor;
      if (h.map) (p.tDiffuse.texture = h.map), (p.enableDiffuse.value = !0);
      if (h.specularMap)
        (p.tSpecular.texture = h.specularMap), (p.enableSpecular.value = !0);
      if (h.lightMap) (p.tAO.texture = h.lightMap), (p.enableAO.value = !0);
      p.uDiffuseColor.value.setHex(u);
      p.uSpecularColor.value.setHex(k);
      p.uAmbientColor.value.setHex(m);
      p.uShininess.value = v;
      if (h.opacity) p.uOpacity.value = h.opacity;
      h = new THREE.MeshShaderMaterial({
        fragmentShader: o.fragmentShader,
        vertexShader: o.vertexShader,
        uniforms: p,
        lights: !0,
        fog: !0,
      });
    } else h = new THREE[k](h);
    return h;
  },
  constructor: THREE.Loader,
};
THREE.JSONLoader = function (b) {
  THREE.Loader.call(this, b);
};
THREE.JSONLoader.prototype = new THREE.Loader();
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.supr = THREE.Loader.prototype;
THREE.JSONLoader.prototype.load = function (b) {
  var c = this,
    e = b.model,
    f = b.callback,
    g = b.texture_path ? b.texture_path : this.extractUrlbase(e),
    b = new Worker(e);
  b.onmessage = function (b) {
    c.createModel(b.data, f, g);
    c.onLoadComplete();
  };
  this.onLoadStart();
  b.postMessage(new Date().getTime());
};
THREE.JSONLoader.prototype.createModel = function (b, c, e) {
  var f = new THREE.Geometry(),
    g = b.scale !== void 0 ? 1 / b.scale : 1;
  this.init_materials(f, b.materials, e);
  (function (c) {
    if (b.version === void 0 || b.version != 2)
      console.error("Deprecated file format.");
    else {
      var e,
        g,
        m,
        o,
        p,
        u,
        v,
        t,
        x,
        w,
        A,
        y,
        G,
        D,
        I = b.faces;
      u = b.vertices;
      var J = b.normals,
        C = b.colors,
        B = 0;
      for (e = 0; e < b.uvs.length; e++) b.uvs[e].length && B++;
      for (e = 0; e < B; e++) (f.faceUvs[e] = []), (f.faceVertexUvs[e] = []);
      o = 0;
      for (p = u.length; o < p; )
        (v = new THREE.Vertex()),
          (v.position.x = u[o++] * c),
          (v.position.y = u[o++] * c),
          (v.position.z = u[o++] * c),
          f.vertices.push(v);
      o = 0;
      for (p = I.length; o < p; ) {
        c = I[o++];
        u = c & 1;
        m = c & 2;
        e = c & 4;
        g = c & 8;
        t = c & 16;
        v = c & 32;
        w = c & 64;
        c &= 128;
        u
          ? ((A = new THREE.Face4()),
            (A.a = I[o++]),
            (A.b = I[o++]),
            (A.c = I[o++]),
            (A.d = I[o++]),
            (u = 4))
          : ((A = new THREE.Face3()),
            (A.a = I[o++]),
            (A.b = I[o++]),
            (A.c = I[o++]),
            (u = 3));
        if (m) (m = I[o++]), (A.materials = f.materials[m]);
        m = f.faces.length;
        if (e)
          for (e = 0; e < B; e++)
            (y = b.uvs[e]),
              (x = I[o++]),
              (D = y[x * 2]),
              (x = y[x * 2 + 1]),
              (f.faceUvs[e][m] = new THREE.UV(D, x));
        if (g)
          for (e = 0; e < B; e++) {
            y = b.uvs[e];
            G = [];
            for (g = 0; g < u; g++)
              (x = I[o++]),
                (D = y[x * 2]),
                (x = y[x * 2 + 1]),
                (G[g] = new THREE.UV(D, x));
            f.faceVertexUvs[e][m] = G;
          }
        if (t)
          (t = I[o++] * 3),
            (g = new THREE.Vector3()),
            (g.x = J[t++]),
            (g.y = J[t++]),
            (g.z = J[t]),
            (A.normal = g);
        if (v)
          for (e = 0; e < u; e++)
            (t = I[o++] * 3),
              (g = new THREE.Vector3()),
              (g.x = J[t++]),
              (g.y = J[t++]),
              (g.z = J[t]),
              A.vertexNormals.push(g);
        if (w) (v = I[o++]), (v = new THREE.Color(C[v])), (A.color = v);
        if (c)
          for (e = 0; e < u; e++)
            (v = I[o++]), (v = new THREE.Color(C[v])), A.vertexColors.push(v);
        f.faces.push(A);
      }
    }
  })(g);
  (function () {
    var c, e, g, m;
    if (b.skinWeights) {
      c = 0;
      for (e = b.skinWeights.length; c < e; c += 2)
        (g = b.skinWeights[c]),
          (m = b.skinWeights[c + 1]),
          f.skinWeights.push(new THREE.Vector4(g, m, 0, 0));
    }
    if (b.skinIndices) {
      c = 0;
      for (e = b.skinIndices.length; c < e; c += 2)
        (g = b.skinIndices[c]),
          (m = b.skinIndices[c + 1]),
          f.skinIndices.push(new THREE.Vector4(g, m, 0, 0));
    }
    f.bones = b.bones;
    f.animation = b.animation;
  })();
  (function (c) {
    if (b.morphTargets !== void 0) {
      var e, g, m, o, p, u, v, t, x;
      e = 0;
      for (g = b.morphTargets.length; e < g; e++) {
        f.morphTargets[e] = {};
        f.morphTargets[e].name = b.morphTargets[e].name;
        f.morphTargets[e].vertices = [];
        t = f.morphTargets[e].vertices;
        x = b.morphTargets[e].vertices;
        m = 0;
        for (o = x.length; m < o; m += 3)
          (p = x[m] * c),
            (u = x[m + 1] * c),
            (v = x[m + 2] * c),
            t.push(new THREE.Vertex(new THREE.Vector3(p, u, v)));
      }
    }
    if (b.morphColors !== void 0) {
      e = 0;
      for (g = b.morphColors.length; e < g; e++) {
        f.morphColors[e] = {};
        f.morphColors[e].name = b.morphColors[e].name;
        f.morphColors[e].colors = [];
        o = f.morphColors[e].colors;
        p = b.morphColors[e].colors;
        c = 0;
        for (m = p.length; c < m; c += 3)
          (u = new THREE.Color(16755200)),
            u.setRGB(p[c], p[c + 1], p[c + 2]),
            o.push(u);
      }
    }
  })(g);
  (function () {
    if (b.edges !== void 0) {
      var c, e, g;
      for (c = 0; c < b.edges.length; c += 2)
        (e = b.edges[c]),
          (g = b.edges[c + 1]),
          f.edges.push(new THREE.Edge(f.vertices[e], f.vertices[g], e, g));
    }
  })();
  f.computeCentroids();
  f.computeFaceNormals();
  this.hasNormals(f) && f.computeTangents();
  c(f);
};
THREE.BinaryLoader = function (b) {
  THREE.Loader.call(this, b);
};
THREE.BinaryLoader.prototype = new THREE.Loader();
THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader;
THREE.BinaryLoader.prototype.supr = THREE.Loader.prototype;
THREE.BinaryLoader.prototype = {
  load: function (b) {
    var c = b.model,
      e = b.callback,
      f = b.texture_path
        ? b.texture_path
        : THREE.Loader.prototype.extractUrlbase(c),
      g = b.bin_path ? b.bin_path : THREE.Loader.prototype.extractUrlbase(c),
      b = new Date().getTime(),
      c = new Worker(c),
      j = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
    c.onmessage = function (b) {
      THREE.BinaryLoader.prototype.loadAjaxBuffers(
        b.data.buffers,
        b.data.materials,
        e,
        g,
        f,
        j
      );
    };
    c.onerror = function (b) {
      alert("worker.onerror: " + b.message + "\n" + b.data);
      b.preventDefault();
    };
    c.postMessage(b);
  },
  loadAjaxBuffers: function (b, c, e, f, g, j) {
    var h = new XMLHttpRequest(),
      k = f + "/" + b,
      m = 0;
    h.onreadystatechange = function () {
      h.readyState == 4
        ? h.status == 200 || h.status == 0
          ? THREE.BinaryLoader.prototype.createBinModel(h.responseText, e, g, c)
          : alert("Couldn't load [" + k + "] [" + h.status + "]")
        : h.readyState == 3
        ? j &&
          (m == 0 && (m = h.getResponseHeader("Content-Length")),
          j({ total: m, loaded: h.responseText.length }))
        : h.readyState == 2 && (m = h.getResponseHeader("Content-Length"));
    };
    h.open("GET", k, !0);
    h.overrideMimeType("text/plain; charset=x-user-defined");
    h.setRequestHeader("Content-Type", "text/plain");
    h.send(null);
  },
  createBinModel: function (b, c, e, f) {
    var g = function (c) {
      function e(b, c) {
        var f = p(b, c),
          g = p(b, c + 1),
          h = p(b, c + 2),
          j = p(b, c + 3),
          k = (((j << 1) & 255) | (h >> 7)) - 127;
        f |= ((h & 127) << 16) | (g << 8);
        if (f == 0 && k == -127) return 0;
        return (1 - 2 * (j >> 7)) * (1 + f * Math.pow(2, -23)) * Math.pow(2, k);
      }
      function g(b, c) {
        var e = p(b, c),
          f = p(b, c + 1),
          h = p(b, c + 2);
        return (p(b, c + 3) << 24) + (h << 16) + (f << 8) + e;
      }
      function m(b, c) {
        var e = p(b, c);
        return (p(b, c + 1) << 8) + e;
      }
      function o(b, c) {
        var e = p(b, c);
        return e > 127 ? e - 256 : e;
      }
      function p(b, c) {
        return b.charCodeAt(c) & 255;
      }
      function u(c) {
        var e, f, h;
        e = g(b, c);
        f = g(b, c + C);
        h = g(b, c + B);
        c = m(b, c + L);
        THREE.BinaryLoader.prototype.f3(y, e, f, h, c);
      }
      function v(c) {
        var e, f, h, j, n, o;
        e = g(b, c);
        f = g(b, c + C);
        h = g(b, c + B);
        j = m(b, c + L);
        n = g(b, c + E);
        o = g(b, c + V);
        c = g(b, c + H);
        THREE.BinaryLoader.prototype.f3n(y, I, e, f, h, j, n, o, c);
      }
      function t(c) {
        var e, f, h, j;
        e = g(b, c);
        f = g(b, c + S);
        h = g(b, c + K);
        j = g(b, c + Q);
        c = m(b, c + n);
        THREE.BinaryLoader.prototype.f4(y, e, f, h, j, c);
      }
      function x(c) {
        var e, f, h, j, o, p, t, u;
        e = g(b, c);
        f = g(b, c + S);
        h = g(b, c + K);
        j = g(b, c + Q);
        o = m(b, c + n);
        p = g(b, c + T);
        t = g(b, c + X);
        u = g(b, c + M);
        c = g(b, c + W);
        THREE.BinaryLoader.prototype.f4n(y, I, e, f, h, j, o, p, t, u, c);
      }
      function w(c) {
        var e, f;
        e = g(b, c);
        f = g(b, c + ha);
        c = g(b, c + ca);
        THREE.BinaryLoader.prototype.uv3(
          y.faceVertexUvs[0],
          J[e * 2],
          J[e * 2 + 1],
          J[f * 2],
          J[f * 2 + 1],
          J[c * 2],
          J[c * 2 + 1]
        );
      }
      function A(c) {
        var e, f, h;
        e = g(b, c);
        f = g(b, c + fa);
        h = g(b, c + ga);
        c = g(b, c + $);
        THREE.BinaryLoader.prototype.uv4(
          y.faceVertexUvs[0],
          J[e * 2],
          J[e * 2 + 1],
          J[f * 2],
          J[f * 2 + 1],
          J[h * 2],
          J[h * 2 + 1],
          J[c * 2],
          J[c * 2 + 1]
        );
      }
      var y = this,
        G = 0,
        D,
        I = [],
        J = [],
        C,
        B,
        L,
        E,
        V,
        H,
        S,
        K,
        Q,
        n,
        T,
        X,
        M,
        W,
        ha,
        ca,
        fa,
        ga,
        $,
        Y,
        P,
        ea,
        Z,
        da,
        ia;
      THREE.Geometry.call(this);
      THREE.Loader.prototype.init_materials(y, f, c);
      D = {
        signature: b.substr(G, 8),
        header_bytes: p(b, G + 8),
        vertex_coordinate_bytes: p(b, G + 9),
        normal_coordinate_bytes: p(b, G + 10),
        uv_coordinate_bytes: p(b, G + 11),
        vertex_index_bytes: p(b, G + 12),
        normal_index_bytes: p(b, G + 13),
        uv_index_bytes: p(b, G + 14),
        material_index_bytes: p(b, G + 15),
        nvertices: g(b, G + 16),
        nnormals: g(b, G + 16 + 4),
        nuvs: g(b, G + 16 + 8),
        ntri_flat: g(b, G + 16 + 12),
        ntri_smooth: g(b, G + 16 + 16),
        ntri_flat_uv: g(b, G + 16 + 20),
        ntri_smooth_uv: g(b, G + 16 + 24),
        nquad_flat: g(b, G + 16 + 28),
        nquad_smooth: g(b, G + 16 + 32),
        nquad_flat_uv: g(b, G + 16 + 36),
        nquad_smooth_uv: g(b, G + 16 + 40),
      };
      G += D.header_bytes;
      C = D.vertex_index_bytes;
      B = D.vertex_index_bytes * 2;
      L = D.vertex_index_bytes * 3;
      E = D.vertex_index_bytes * 3 + D.material_index_bytes;
      V =
        D.vertex_index_bytes * 3 +
        D.material_index_bytes +
        D.normal_index_bytes;
      H =
        D.vertex_index_bytes * 3 +
        D.material_index_bytes +
        D.normal_index_bytes * 2;
      S = D.vertex_index_bytes;
      K = D.vertex_index_bytes * 2;
      Q = D.vertex_index_bytes * 3;
      n = D.vertex_index_bytes * 4;
      T = D.vertex_index_bytes * 4 + D.material_index_bytes;
      X =
        D.vertex_index_bytes * 4 +
        D.material_index_bytes +
        D.normal_index_bytes;
      M =
        D.vertex_index_bytes * 4 +
        D.material_index_bytes +
        D.normal_index_bytes * 2;
      W =
        D.vertex_index_bytes * 4 +
        D.material_index_bytes +
        D.normal_index_bytes * 3;
      ha = D.uv_index_bytes;
      ca = D.uv_index_bytes * 2;
      fa = D.uv_index_bytes;
      ga = D.uv_index_bytes * 2;
      $ = D.uv_index_bytes * 3;
      c = D.vertex_index_bytes * 3 + D.material_index_bytes;
      ia = D.vertex_index_bytes * 4 + D.material_index_bytes;
      Y = D.ntri_flat * c;
      P = D.ntri_smooth * (c + D.normal_index_bytes * 3);
      ea = D.ntri_flat_uv * (c + D.uv_index_bytes * 3);
      Z =
        D.ntri_smooth_uv *
        (c + D.normal_index_bytes * 3 + D.uv_index_bytes * 3);
      da = D.nquad_flat * ia;
      c = D.nquad_smooth * (ia + D.normal_index_bytes * 4);
      ia = D.nquad_flat_uv * (ia + D.uv_index_bytes * 4);
      G += (function (c) {
        for (
          var f,
            g,
            j,
            k = D.vertex_coordinate_bytes * 3,
            m = c + D.nvertices * k;
          c < m;
          c += k
        )
          (f = e(b, c)),
            (g = e(b, c + D.vertex_coordinate_bytes)),
            (j = e(b, c + D.vertex_coordinate_bytes * 2)),
            THREE.BinaryLoader.prototype.v(y, f, g, j);
        return D.nvertices * k;
      })(G);
      G += (function (c) {
        for (
          var e,
            f,
            g,
            h = D.normal_coordinate_bytes * 3,
            j = c + D.nnormals * h;
          c < j;
          c += h
        )
          (e = o(b, c)),
            (f = o(b, c + D.normal_coordinate_bytes)),
            (g = o(b, c + D.normal_coordinate_bytes * 2)),
            I.push(e / 127, f / 127, g / 127);
        return D.nnormals * h;
      })(G);
      G += (function (c) {
        for (
          var f, g, j = D.uv_coordinate_bytes * 2, k = c + D.nuvs * j;
          c < k;
          c += j
        )
          (f = e(b, c)), (g = e(b, c + D.uv_coordinate_bytes)), J.push(f, g);
        return D.nuvs * j;
      })(G);
      Y = G + Y;
      P = Y + P;
      ea = P + ea;
      Z = ea + Z;
      da = Z + da;
      c = da + c;
      ia = c + ia;
      (function (b) {
        var c,
          e = D.vertex_index_bytes * 3 + D.material_index_bytes,
          f = e + D.uv_index_bytes * 3,
          g = b + D.ntri_flat_uv * f;
        for (c = b; c < g; c += f) u(c), w(c + e);
        return g - b;
      })(P);
      (function (b) {
        var c,
          e =
            D.vertex_index_bytes * 3 +
            D.material_index_bytes +
            D.normal_index_bytes * 3,
          f = e + D.uv_index_bytes * 3,
          g = b + D.ntri_smooth_uv * f;
        for (c = b; c < g; c += f) v(c), w(c + e);
        return g - b;
      })(ea);
      (function (b) {
        var c,
          e = D.vertex_index_bytes * 4 + D.material_index_bytes,
          f = e + D.uv_index_bytes * 4,
          g = b + D.nquad_flat_uv * f;
        for (c = b; c < g; c += f) t(c), A(c + e);
        return g - b;
      })(c);
      (function (b) {
        var c,
          e =
            D.vertex_index_bytes * 4 +
            D.material_index_bytes +
            D.normal_index_bytes * 4,
          f = e + D.uv_index_bytes * 4,
          g = b + D.nquad_smooth_uv * f;
        for (c = b; c < g; c += f) x(c), A(c + e);
        return g - b;
      })(ia);
      (function (b) {
        var c,
          e = D.vertex_index_bytes * 3 + D.material_index_bytes,
          f = b + D.ntri_flat * e;
        for (c = b; c < f; c += e) u(c);
        return f - b;
      })(G);
      (function (b) {
        var c,
          e =
            D.vertex_index_bytes * 3 +
            D.material_index_bytes +
            D.normal_index_bytes * 3,
          f = b + D.ntri_smooth * e;
        for (c = b; c < f; c += e) v(c);
        return f - b;
      })(Y);
      (function (b) {
        var c,
          e = D.vertex_index_bytes * 4 + D.material_index_bytes,
          f = b + D.nquad_flat * e;
        for (c = b; c < f; c += e) t(c);
        return f - b;
      })(Z);
      (function (b) {
        var c,
          e =
            D.vertex_index_bytes * 4 +
            D.material_index_bytes +
            D.normal_index_bytes * 4,
          f = b + D.nquad_smooth * e;
        for (c = b; c < f; c += e) x(c);
        return f - b;
      })(da);
      this.computeCentroids();
      this.computeFaceNormals();
      THREE.Loader.prototype.hasNormals(this) && this.computeTangents();
    };
    g.prototype = new THREE.Geometry();
    g.prototype.constructor = g;
    c(new g(e));
  },
  v: function (b, c, e, f) {
    b.vertices.push(new THREE.Vertex(new THREE.Vector3(c, e, f)));
  },
  f3: function (b, c, e, f, g) {
    b.faces.push(new THREE.Face3(c, e, f, null, null, b.materials[g]));
  },
  f4: function (b, c, e, f, g, j) {
    b.faces.push(new THREE.Face4(c, e, f, g, null, null, b.materials[j]));
  },
  f3n: function (b, c, e, f, g, j, h, k, m) {
    var j = b.materials[j],
      o = c[k * 3],
      p = c[k * 3 + 1],
      k = c[k * 3 + 2],
      u = c[m * 3],
      v = c[m * 3 + 1],
      m = c[m * 3 + 2];
    b.faces.push(
      new THREE.Face3(
        e,
        f,
        g,
        [
          new THREE.Vector3(c[h * 3], c[h * 3 + 1], c[h * 3 + 2]),
          new THREE.Vector3(o, p, k),
          new THREE.Vector3(u, v, m),
        ],
        null,
        j
      )
    );
  },
  f4n: function (b, c, e, f, g, j, h, k, m, o, p) {
    var h = b.materials[h],
      u = c[m * 3],
      v = c[m * 3 + 1],
      m = c[m * 3 + 2],
      t = c[o * 3],
      x = c[o * 3 + 1],
      o = c[o * 3 + 2],
      w = c[p * 3],
      A = c[p * 3 + 1],
      p = c[p * 3 + 2];
    b.faces.push(
      new THREE.Face4(
        e,
        f,
        g,
        j,
        [
          new THREE.Vector3(c[k * 3], c[k * 3 + 1], c[k * 3 + 2]),
          new THREE.Vector3(u, v, m),
          new THREE.Vector3(t, x, o),
          new THREE.Vector3(w, A, p),
        ],
        null,
        h
      )
    );
  },
  uv3: function (b, c, e, f, g, j, h) {
    var k = [];
    k.push(new THREE.UV(c, e));
    k.push(new THREE.UV(f, g));
    k.push(new THREE.UV(j, h));
    b.push(k);
  },
  uv4: function (b, c, e, f, g, j, h, k, m) {
    var o = [];
    o.push(new THREE.UV(c, e));
    o.push(new THREE.UV(f, g));
    o.push(new THREE.UV(j, h));
    o.push(new THREE.UV(k, m));
    b.push(o);
  },
  constructor: THREE.BinaryLoader,
};
THREE.SceneLoader = function () {
  this.onLoadStart = function () {};
  this.onLoadProgress = function () {};
  this.onLoadComplete = function () {};
  this.callbackSync = function () {};
  this.callbackProgress = function () {};
};
THREE.SceneLoader.prototype = {
  load: function (b, c) {
    var e = this,
      f = new Worker(b);
    f.postMessage(0);
    var g = THREE.Loader.prototype.extractUrlbase(b);
    f.onmessage = function (b) {
      function f(b, c) {
        return c == "relativeToHTML" ? b : g + "/" + b;
      }
      function k() {
        for (t in S.objects)
          if (!M.objects[t])
            if (((G = S.objects[t]), G.geometry !== void 0)) {
              if ((C = M.geometries[G.geometry])) {
                var b = !1;
                V = [];
                for (ha = 0; ha < G.materials.length; ha++)
                  (V[ha] = M.materials[G.materials[ha]]),
                    (b = V[ha] instanceof THREE.MeshShaderMaterial);
                b && C.computeTangents();
                D = G.position;
                r = G.rotation;
                q = G.quaternion;
                s = G.scale;
                q = 0;
                V.length == 0 && (V[0] = new THREE.MeshFaceMaterial());
                V.length > 1 && (V = [new THREE.MeshFaceMaterial()]);
                object = new THREE.Mesh(C, V);
                object.name = t;
                object.position.set(D[0], D[1], D[2]);
                q
                  ? (object.quaternion.set(q[0], q[1], q[2], q[3]),
                    (object.useQuaternion = !0))
                  : object.rotation.set(r[0], r[1], r[2]);
                object.scale.set(s[0], s[1], s[2]);
                object.visible = G.visible;
                M.scene.addObject(object);
                M.objects[t] = object;
                G.meshCollider &&
                  ((b = THREE.CollisionUtils.MeshColliderWBox(object)),
                  M.scene.collisions.colliders.push(b));
                if (G.castsShadow)
                  (b = new THREE.ShadowVolume(C)),
                    M.scene.addChild(b),
                    (b.position = object.position),
                    (b.rotation = object.rotation),
                    (b.scale = object.scale);
                G.trigger &&
                  G.trigger.toLowerCase() != "none" &&
                  ((b = { type: G.trigger, object: G }),
                  (M.triggers[object.name] = b));
              }
            } else
              (D = G.position),
                (r = G.rotation),
                (q = G.quaternion),
                (s = G.scale),
                (q = 0),
                (object = new THREE.Object3D()),
                (object.name = t),
                object.position.set(D[0], D[1], D[2]),
                q
                  ? (object.quaternion.set(q[0], q[1], q[2], q[3]),
                    (object.useQuaternion = !0))
                  : object.rotation.set(r[0], r[1], r[2]),
                object.scale.set(s[0], s[1], s[2]),
                (object.visible = G.visible !== void 0 ? G.visible : !1),
                M.scene.addObject(object),
                (M.objects[t] = object),
                (M.empties[t] = object),
                G.trigger &&
                  G.trigger.toLowerCase() != "none" &&
                  ((b = { type: G.trigger, object: G }),
                  (M.triggers[object.name] = b));
      }
      function m(b) {
        return function (c) {
          M.geometries[b] = c;
          k();
          Q -= 1;
          e.onLoadComplete();
          p();
        };
      }
      function o(b) {
        return function (c) {
          M.geometries[b] = c;
        };
      }
      function p() {
        e.callbackProgress(
          {
            totalModels: T,
            totalTextures: X,
            loadedModels: T - Q,
            loadedTextures: X - n,
          },
          M
        );
        e.onLoadProgress();
        Q == 0 && n == 0 && c(M);
      }
      var u,
        v,
        t,
        x,
        w,
        A,
        y,
        G,
        D,
        I,
        J,
        C,
        B,
        L,
        E,
        V,
        H,
        S,
        K,
        Q,
        n,
        T,
        X,
        M;
      S = b.data;
      E = new THREE.BinaryLoader();
      K = new THREE.JSONLoader();
      n = Q = 0;
      M = {
        scene: new THREE.Scene(),
        geometries: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        triggers: {},
        empties: {},
      };
      b = !1;
      for (t in S.objects)
        if (((G = S.objects[t]), G.meshCollider)) {
          b = !0;
          break;
        }
      if (b) M.scene.collisions = new THREE.CollisionSystem();
      if (S.transform) {
        b = S.transform.position;
        I = S.transform.rotation;
        var W = S.transform.scale;
        b && M.scene.position.set(b[0], b[1], b[2]);
        I && M.scene.rotation.set(I[0], I[1], I[2]);
        W && M.scene.scale.set(W[0], W[1], W[2]);
        (b || I || W) && M.scene.updateMatrix();
      }
      b = function () {
        n -= 1;
        p();
        e.onLoadComplete();
      };
      for (w in S.cameras) {
        I = S.cameras[w];
        if (I.type == "perspective")
          B = new THREE.Camera(I.fov, I.aspect, I.near, I.far);
        else if (I.type == "ortho")
          (B = new THREE.Camera()),
            (B.projectionMatrix = THREE.Matrix4.makeOrtho(
              I.left,
              I.right,
              I.top,
              I.bottom,
              I.near,
              I.far
            ));
        D = I.position;
        I = I.target;
        B.position.set(D[0], D[1], D[2]);
        B.target.position.set(I[0], I[1], I[2]);
        M.cameras[w] = B;
      }
      for (x in S.lights)
        (w = S.lights[x]),
          (B = w.color !== void 0 ? w.color : 16777215),
          (I = w.intensity !== void 0 ? w.intensity : 1),
          w.type == "directional"
            ? ((D = w.direction),
              (H = new THREE.DirectionalLight(B, I)),
              H.position.set(D[0], D[1], D[2]),
              H.position.normalize())
            : w.type == "point"
            ? ((D = w.position),
              (d = w.distance),
              (H = new THREE.PointLight(B, I, d)),
              H.position.set(D[0], D[1], D[2]))
            : w.type == "ambient" && (H = new THREE.AmbientLight(B)),
          M.scene.addLight(H),
          (M.lights[x] = H);
      for (A in S.fogs)
        (x = S.fogs[A]),
          x.type == "linear"
            ? (L = new THREE.Fog(0, x.near, x.far))
            : x.type == "exp2" && (L = new THREE.FogExp2(0, x.density)),
          (I = x.color),
          L.color.setRGB(I[0], I[1], I[2]),
          (M.fogs[A] = L);
      if (M.cameras && S.defaults.camera)
        M.currentCamera = M.cameras[S.defaults.camera];
      if (M.fogs && S.defaults.fog) M.scene.fog = M.fogs[S.defaults.fog];
      I = S.defaults.bgcolor;
      M.bgColor = new THREE.Color();
      M.bgColor.setRGB(I[0], I[1], I[2]);
      M.bgColorAlpha = S.defaults.bgalpha;
      for (u in S.geometries)
        if (
          ((A = S.geometries[u]),
          A.type == "bin_mesh" || A.type == "ascii_mesh")
        )
          (Q += 1), e.onLoadStart();
      T = Q;
      for (u in S.geometries)
        (A = S.geometries[u]),
          A.type == "cube"
            ? ((C = new THREE.CubeGeometry(
                A.width,
                A.height,
                A.depth,
                A.segmentsWidth,
                A.segmentsHeight,
                A.segmentsDepth,
                null,
                A.flipped,
                A.sides
              )),
              (M.geometries[u] = C))
            : A.type == "plane"
            ? ((C = new THREE.PlaneGeometry(
                A.width,
                A.height,
                A.segmentsWidth,
                A.segmentsHeight
              )),
              (M.geometries[u] = C))
            : A.type == "sphere"
            ? ((C = new THREE.SphereGeometry(
                A.radius,
                A.segmentsWidth,
                A.segmentsHeight
              )),
              (M.geometries[u] = C))
            : A.type == "cylinder"
            ? ((C = new THREE.CylinderGeometry(
                A.numSegs,
                A.topRad,
                A.botRad,
                A.height,
                A.topOffset,
                A.botOffset
              )),
              (M.geometries[u] = C))
            : A.type == "torus"
            ? ((C = new THREE.TorusGeometry(
                A.radius,
                A.tube,
                A.segmentsR,
                A.segmentsT
              )),
              (M.geometries[u] = C))
            : A.type == "icosahedron"
            ? ((C = new THREE.IcosahedronGeometry(A.subdivisions)),
              (M.geometries[u] = C))
            : A.type == "bin_mesh"
            ? E.load({ model: f(A.url, S.urlBaseType), callback: m(u) })
            : A.type == "ascii_mesh"
            ? K.load({ model: f(A.url, S.urlBaseType), callback: m(u) })
            : A.type == "embedded_mesh" &&
              (A = S.embeds[A.id]) &&
              K.createModel(A, o(u), "");
      for (y in S.textures)
        if (((u = S.textures[y]), u.url instanceof Array)) {
          n += u.url.length;
          for (E = 0; E < u.url.length; E++) e.onLoadStart();
        } else (n += 1), e.onLoadStart();
      X = n;
      for (y in S.textures) {
        u = S.textures[y];
        if (u.mapping != void 0 && THREE[u.mapping] != void 0)
          u.mapping = new THREE[u.mapping]();
        if (u.url instanceof Array) {
          E = [];
          for (var ha = 0; ha < u.url.length; ha++)
            E[ha] = f(u.url[ha], S.urlBaseType);
          E = THREE.ImageUtils.loadTextureCube(E, u.mapping, b);
        } else {
          E = THREE.ImageUtils.loadTexture(
            f(u.url, S.urlBaseType),
            u.mapping,
            b
          );
          if (THREE[u.minFilter] != void 0) E.minFilter = THREE[u.minFilter];
          if (THREE[u.magFilter] != void 0) E.magFilter = THREE[u.magFilter];
          if (u.repeat) {
            E.repeat.set(u.repeat[0], u.repeat[1]);
            if (u.repeat[0] != 1) E.wrapS = THREE.RepeatWrapping;
            if (u.repeat[1] != 1) E.wrapT = THREE.RepeatWrapping;
          }
          u.offset && E.offset.set(u.offset[0], u.offset[1]);
          if (u.wrap) {
            K = {
              repeat: THREE.RepeatWrapping,
              mirror: THREE.MirroredRepeatWrapping,
            };
            if (K[u.wrap[0]] !== void 0) E.wrapS = K[u.wrap[0]];
            if (K[u.wrap[1]] !== void 0) E.wrapT = K[u.wrap[1]];
          }
        }
        M.textures[y] = E;
      }
      for (v in S.materials) {
        y = S.materials[v];
        for (J in y.parameters)
          if (J == "envMap" || J == "map" || J == "lightMap")
            y.parameters[J] = M.textures[y.parameters[J]];
          else if (J == "shading")
            y.parameters[J] =
              y.parameters[J] == "flat"
                ? THREE.FlatShading
                : THREE.SmoothShading;
          else if (J == "blending")
            y.parameters[J] = THREE[y.parameters[J]]
              ? THREE[y.parameters[J]]
              : THREE.NormalBlending;
          else if (J == "combine")
            y.parameters[J] =
              y.parameters[J] == "MixOperation"
                ? THREE.MixOperation
                : THREE.MultiplyOperation;
          else if (J == "vertexColors")
            if (y.parameters[J] == "face") y.parameters[J] = THREE.FaceColors;
            else if (y.parameters[J]) y.parameters[J] = THREE.VertexColors;
        if (y.parameters.opacity !== void 0 && y.parameters.opacity < 1)
          y.parameters.transparent = !0;
        if (y.parameters.normalMap) {
          u = THREE.ShaderUtils.lib.normal;
          b = THREE.UniformsUtils.clone(u.uniforms);
          E = y.parameters.color;
          K = y.parameters.specular;
          A = y.parameters.ambient;
          L = y.parameters.shininess;
          b.tNormal.texture = M.textures[y.parameters.normalMap];
          if (y.parameters.normalMapFactor)
            b.uNormalScale.value = y.parameters.normalMapFactor;
          if (y.parameters.map)
            (b.tDiffuse.texture = y.parameters.map),
              (b.enableDiffuse.value = !0);
          if (y.parameters.lightMap)
            (b.tAO.texture = y.parameters.lightMap), (b.enableAO.value = !0);
          if (y.parameters.specularMap)
            (b.tSpecular.texture = M.textures[y.parameters.specularMap]),
              (b.enableSpecular.value = !0);
          b.uDiffuseColor.value.setHex(E);
          b.uSpecularColor.value.setHex(K);
          b.uAmbientColor.value.setHex(A);
          b.uShininess.value = L;
          if (y.parameters.opacity) b.uOpacity.value = y.parameters.opacity;
          y = new THREE.MeshShaderMaterial({
            fragmentShader: u.fragmentShader,
            vertexShader: u.vertexShader,
            uniforms: b,
            lights: !0,
            fog: !0,
          });
        } else y = new THREE[y.type](y.parameters);
        M.materials[v] = y;
      }
      k();
      e.callbackSync(M);
    };
  },
  constructor: THREE.SceneLoader,
};
THREE.UTF8Loader = function () {};
THREE.UTF8Loader.prototype = new THREE.UTF8Loader();
THREE.UTF8Loader.prototype.constructor = THREE.UTF8Loader;
THREE.UTF8Loader.prototype = {
  load: function (b) {
    var c = new XMLHttpRequest(),
      e = b.model,
      f = b.callback,
      g = b.scale !== void 0 ? b.scale : 1,
      j = b.offsetX !== void 0 ? b.offsetX : 0,
      h = b.offsetY !== void 0 ? b.offsetY : 0,
      k = b.offsetZ !== void 0 ? b.offsetZ : 0;
    c.onreadystatechange = function () {
      c.readyState == 4
        ? c.status == 200 || c.status == 0
          ? THREE.UTF8Loader.prototype.createModel(
              c.responseText,
              f,
              g,
              j,
              h,
              k
            )
          : alert("Couldn't load [" + e + "] [" + c.status + "]")
        : c.readyState != 3 &&
          c.readyState == 2 &&
          c.getResponseHeader("Content-Length");
    };
    c.open("GET", e, !0);
    c.send(null);
  },
  decompressMesh: function (b) {
    var c = b.charCodeAt(0);
    c >= 57344 && (c -= 2048);
    c++;
    for (var e = new Float32Array(8 * c), f = 1, g = 0; g < 8; g++) {
      for (var j = 0, h = 0; h < c; ++h) {
        var k = b.charCodeAt(h + f);
        j += (k >> 1) ^ -(k & 1);
        e[8 * h + g] = j;
      }
      f += c;
    }
    c = b.length - f;
    j = new Uint16Array(c);
    for (g = h = 0; g < c; g++)
      (k = b.charCodeAt(g + f)), (j[g] = h - k), k == 0 && h++;
    return [e, j];
  },
  createModel: function (b, c, e, f, g, j) {
    var h = function () {
      var c = this;
      c.materials = [];
      THREE.Geometry.call(this);
      var h = THREE.UTF8Loader.prototype.decompressMesh(b),
        o = [],
        p = [];
      (function (b, h, m) {
        for (var o, p, A, y = b.length; m < y; m += h)
          (o = b[m]),
            (p = b[m + 1]),
            (A = b[m + 2]),
            (o = (o / 16383) * e),
            (p = (p / 16383) * e),
            (A = (A / 16383) * e),
            (o += f),
            (p += g),
            (A += j),
            THREE.UTF8Loader.prototype.v(c, o, p, A);
      })(h[0], 8, 0);
      (function (b, c, e) {
        for (var f, g, h = b.length; e < h; e += c)
          (f = b[e]), (g = b[e + 1]), (f /= 1023), (g /= 1023), p.push(f, g);
      })(h[0], 8, 3);
      (function (b, c, e) {
        for (var f, g, h, j = b.length; e < j; e += c)
          (f = b[e]),
            (g = b[e + 1]),
            (h = b[e + 2]),
            (f = (f - 512) / 511),
            (g = (g - 512) / 511),
            (h = (h - 512) / 511),
            o.push(f, g, h);
      })(h[0], 8, 5);
      (function (b) {
        var e,
          f,
          g,
          h,
          j,
          m,
          G,
          D = b.length;
        for (e = 0; e < D; e += 3)
          (f = b[e]),
            (g = b[e + 1]),
            (h = b[e + 2]),
            THREE.UTF8Loader.prototype.f3n(c, o, f, g, h, 0, f, g, h),
            (j = p[f * 2]),
            (f = p[f * 2 + 1]),
            (m = p[g * 2]),
            (g = p[g * 2 + 1]),
            (G = p[h * 2]),
            (h = p[h * 2 + 1]),
            THREE.UTF8Loader.prototype.uv3(
              c.faceVertexUvs[0],
              j,
              f,
              m,
              g,
              G,
              h
            );
      })(h[1]);
      this.computeCentroids();
      this.computeFaceNormals();
    };
    h.prototype = new THREE.Geometry();
    h.prototype.constructor = h;
    c(new h());
  },
  v: function (b, c, e, f) {
    b.vertices.push(new THREE.Vertex(new THREE.Vector3(c, e, f)));
  },
  f3n: function (b, c, e, f, g, j, h, k, m) {
    var j = b.materials[j],
      o = c[k * 3],
      p = c[k * 3 + 1],
      k = c[k * 3 + 2],
      u = c[m * 3],
      v = c[m * 3 + 1],
      m = c[m * 3 + 2],
      h = new THREE.Vector3(c[h * 3], c[h * 3 + 1], c[h * 3 + 2]),
      k = new THREE.Vector3(o, p, k),
      m = new THREE.Vector3(u, v, m);
    b.faces.push(new THREE.Face3(e, f, g, [h, k, m], null, j));
  },
  uv3: function (b, c, e, f, g, j, h) {
    var k = [];
    k.push(new THREE.UV(c, e));
    k.push(new THREE.UV(f, g));
    k.push(new THREE.UV(j, h));
    b.push(k);
  },
  constructor: THREE.UTF8Loader,
};
THREE.MarchingCubes = function (b, c) {
  THREE.Object3D.call(this);
  this.materials = c instanceof Array ? c : [c];
  this.init = function (b) {
    this.isolation = 80;
    this.size = b;
    this.size2 = this.size * this.size;
    this.size3 = this.size2 * this.size;
    this.halfsize = this.size / 2;
    this.delta = 2 / this.size;
    this.yd = this.size;
    this.zd = this.size2;
    this.field = new Float32Array(this.size3);
    this.normal_cache = new Float32Array(this.size3 * 3);
    this.vlist = new Float32Array(36);
    this.nlist = new Float32Array(36);
    this.firstDraw = !0;
    this.maxCount = 4096;
    this.count = 0;
    this.hasNormal = this.hasPos = !1;
    this.positionArray = new Float32Array(this.maxCount * 3);
    this.normalArray = new Float32Array(this.maxCount * 3);
  };
  this.lerp = function (b, c, g) {
    return b + (c - b) * g;
  };
  this.VIntX = function (b, c, g, j, h, k, m, o, p, u) {
    h = (h - p) / (u - p);
    p = this.normal_cache;
    c[j] = k + h * this.delta;
    c[j + 1] = m;
    c[j + 2] = o;
    g[j] = this.lerp(p[b], p[b + 3], h);
    g[j + 1] = this.lerp(p[b + 1], p[b + 4], h);
    g[j + 2] = this.lerp(p[b + 2], p[b + 5], h);
  };
  this.VIntY = function (b, c, g, j, h, k, m, o, p, u) {
    h = (h - p) / (u - p);
    p = this.normal_cache;
    c[j] = k;
    c[j + 1] = m + h * this.delta;
    c[j + 2] = o;
    c = b + this.yd * 3;
    g[j] = this.lerp(p[b], p[c], h);
    g[j + 1] = this.lerp(p[b + 1], p[c + 1], h);
    g[j + 2] = this.lerp(p[b + 2], p[c + 2], h);
  };
  this.VIntZ = function (b, c, g, j, h, k, m, o, p, u) {
    h = (h - p) / (u - p);
    p = this.normal_cache;
    c[j] = k;
    c[j + 1] = m;
    c[j + 2] = o + h * this.delta;
    c = b + this.zd * 3;
    g[j] = this.lerp(p[b], p[c], h);
    g[j + 1] = this.lerp(p[b + 1], p[c + 1], h);
    g[j + 2] = this.lerp(p[b + 2], p[c + 2], h);
  };
  this.compNorm = function (b) {
    var c = b * 3;
    this.normal_cache[c] == 0 &&
      ((this.normal_cache[c] = this.field[b - 1] - this.field[b + 1]),
      (this.normal_cache[c + 1] =
        this.field[b - this.yd] - this.field[b + this.yd]),
      (this.normal_cache[c + 2] =
        this.field[b - this.zd] - this.field[b + this.zd]));
  };
  this.polygonize = function (b, c, g, j, h, k) {
    var m = j + 1,
      o = j + this.yd,
      p = j + this.zd,
      u = m + this.yd,
      v = m + this.zd,
      t = j + this.yd + this.zd,
      x = m + this.yd + this.zd,
      w = 0,
      A = this.field[j],
      y = this.field[m],
      G = this.field[o],
      D = this.field[u],
      I = this.field[p],
      J = this.field[v],
      C = this.field[t],
      B = this.field[x];
    A < h && (w |= 1);
    y < h && (w |= 2);
    G < h && (w |= 8);
    D < h && (w |= 4);
    I < h && (w |= 16);
    J < h && (w |= 32);
    C < h && (w |= 128);
    B < h && (w |= 64);
    var L = THREE.edgeTable[w];
    if (L == 0) return 0;
    var E = this.delta,
      V = b + E,
      H = c + E,
      E = g + E;
    L & 1 &&
      (this.compNorm(j),
      this.compNorm(m),
      this.VIntX(j * 3, this.vlist, this.nlist, 0, h, b, c, g, A, y));
    L & 2 &&
      (this.compNorm(m),
      this.compNorm(u),
      this.VIntY(m * 3, this.vlist, this.nlist, 3, h, V, c, g, y, D));
    L & 4 &&
      (this.compNorm(o),
      this.compNorm(u),
      this.VIntX(o * 3, this.vlist, this.nlist, 6, h, b, H, g, G, D));
    L & 8 &&
      (this.compNorm(j),
      this.compNorm(o),
      this.VIntY(j * 3, this.vlist, this.nlist, 9, h, b, c, g, A, G));
    L & 16 &&
      (this.compNorm(p),
      this.compNorm(v),
      this.VIntX(p * 3, this.vlist, this.nlist, 12, h, b, c, E, I, J));
    L & 32 &&
      (this.compNorm(v),
      this.compNorm(x),
      this.VIntY(v * 3, this.vlist, this.nlist, 15, h, V, c, E, J, B));
    L & 64 &&
      (this.compNorm(t),
      this.compNorm(x),
      this.VIntX(t * 3, this.vlist, this.nlist, 18, h, b, H, E, C, B));
    L & 128 &&
      (this.compNorm(p),
      this.compNorm(t),
      this.VIntY(p * 3, this.vlist, this.nlist, 21, h, b, c, E, I, C));
    L & 256 &&
      (this.compNorm(j),
      this.compNorm(p),
      this.VIntZ(j * 3, this.vlist, this.nlist, 24, h, b, c, g, A, I));
    L & 512 &&
      (this.compNorm(m),
      this.compNorm(v),
      this.VIntZ(m * 3, this.vlist, this.nlist, 27, h, V, c, g, y, J));
    L & 1024 &&
      (this.compNorm(u),
      this.compNorm(x),
      this.VIntZ(u * 3, this.vlist, this.nlist, 30, h, V, H, g, D, B));
    L & 2048 &&
      (this.compNorm(o),
      this.compNorm(t),
      this.VIntZ(o * 3, this.vlist, this.nlist, 33, h, b, H, g, G, C));
    w <<= 4;
    for (h = j = 0; THREE.triTable[w + h] != -1; )
      (b = w + h),
        (c = b + 1),
        (g = b + 2),
        this.posnormtriv(
          this.vlist,
          this.nlist,
          3 * THREE.triTable[b],
          3 * THREE.triTable[c],
          3 * THREE.triTable[g],
          k
        ),
        (h += 3),
        j++;
    return j;
  };
  this.posnormtriv = function (b, c, g, j, h, k) {
    var m = this.count * 3;
    this.positionArray[m] = b[g];
    this.positionArray[m + 1] = b[g + 1];
    this.positionArray[m + 2] = b[g + 2];
    this.positionArray[m + 3] = b[j];
    this.positionArray[m + 4] = b[j + 1];
    this.positionArray[m + 5] = b[j + 2];
    this.positionArray[m + 6] = b[h];
    this.positionArray[m + 7] = b[h + 1];
    this.positionArray[m + 8] = b[h + 2];
    this.normalArray[m] = c[g];
    this.normalArray[m + 1] = c[g + 1];
    this.normalArray[m + 2] = c[g + 2];
    this.normalArray[m + 3] = c[j];
    this.normalArray[m + 4] = c[j + 1];
    this.normalArray[m + 5] = c[j + 2];
    this.normalArray[m + 6] = c[h];
    this.normalArray[m + 7] = c[h + 1];
    this.normalArray[m + 8] = c[h + 2];
    this.hasNormal = this.hasPos = !0;
    this.count += 3;
    this.count >= this.maxCount - 3 && k(this);
  };
  this.begin = function () {
    this.count = 0;
    this.hasNormal = this.hasPos = !1;
  };
  this.end = function (b) {
    if (this.count != 0) {
      for (var c = this.count * 3; c < this.positionArray.length; c++)
        this.positionArray[c] = 0;
      b(this);
    }
  };
  this.addBall = function (b, c, g, j, h) {
    var k = this.size * Math.sqrt(j / h),
      m = g * this.size,
      o = c * this.size,
      p = b * this.size,
      u = Math.floor(m - k);
    u < 1 && (u = 1);
    m = Math.floor(m + k);
    m > this.size - 1 && (m = this.size - 1);
    var v = Math.floor(o - k);
    v < 1 && (v = 1);
    o = Math.floor(o + k);
    o > this.size - 1 && (o = this.size - 1);
    var t = Math.floor(p - k);
    t < 1 && (t = 1);
    k = Math.floor(p + k);
    k > this.size - 1 && (k = this.size - 1);
    for (var x, w, A, y, G, D; u < m; u++) {
      p = this.size2 * u;
      w = u / this.size - g;
      G = w * w;
      for (w = v; w < o; w++) {
        A = p + this.size * w;
        x = w / this.size - c;
        D = x * x;
        for (x = t; x < k; x++)
          (y = x / this.size - b),
            (y = j / (1.0e-6 + y * y + D + G) - h),
            y > 0 && (this.field[A + x] += y);
      }
    }
  };
  this.addPlaneX = function (b, c) {
    var g,
      j,
      h,
      k,
      m,
      o = this.size,
      p = this.yd,
      u = this.zd,
      v = this.field,
      t = o * Math.sqrt(b / c);
    t > o && (t = o);
    for (g = 0; g < t; g++)
      if (((j = g / o), (j *= j), (k = b / (1.0e-4 + j) - c), k > 0))
        for (j = 0; j < o; j++) {
          m = g + j * p;
          for (h = 0; h < o; h++) v[u * h + m] += k;
        }
  };
  this.addPlaneY = function (b, c) {
    var g,
      j,
      h,
      k,
      m,
      o,
      p = this.size,
      u = this.yd,
      v = this.zd,
      t = this.field,
      x = p * Math.sqrt(b / c);
    x > p && (x = p);
    for (j = 0; j < x; j++)
      if (((g = j / p), (g *= g), (k = b / (1.0e-4 + g) - c), k > 0)) {
        m = j * u;
        for (g = 0; g < p; g++) {
          o = m + g;
          for (h = 0; h < p; h++) t[v * h + o] += k;
        }
      }
  };
  this.addPlaneZ = function (b, c) {
    var g, j, h, k, m, o;
    size = this.size;
    yd = this.yd;
    zd = this.zd;
    field = this.field;
    dist = size * Math.sqrt(b / c);
    dist > size && (dist = size);
    for (h = 0; h < dist; h++)
      if (((g = h / size), (g *= g), (k = b / (1.0e-4 + g) - c), k > 0)) {
        m = zd * h;
        for (j = 0; j < size; j++) {
          o = m + j * yd;
          for (g = 0; g < size; g++) field[o + g] += k;
        }
      }
  };
  this.reset = function () {
    var b;
    for (b = 0; b < this.size3; b++)
      (this.normal_cache[b * 3] = 0), (this.field[b] = 0);
  };
  this.render = function (b) {
    this.begin();
    var c,
      g,
      j,
      h,
      k,
      m,
      o,
      p,
      u,
      v = this.size - 2;
    for (h = 1; h < v; h++) {
      u = this.size2 * h;
      o = (h - this.halfsize) / this.halfsize;
      for (j = 1; j < v; j++) {
        p = u + this.size * j;
        m = (j - this.halfsize) / this.halfsize;
        for (g = 1; g < v; g++)
          (k = (g - this.halfsize) / this.halfsize),
            (c = p + g),
            this.polygonize(k, m, o, c, this.isolation, b);
      }
    }
    this.end(b);
  };
  this.generateGeometry = function () {
    var b = 0,
      c = new THREE.Geometry(),
      g = [];
    this.render(function (j) {
      var h, k, m, o, p, u, v, t;
      for (h = 0; h < j.count; h++)
        (v = h * 3),
          (p = v + 1),
          (t = v + 2),
          (k = j.positionArray[v]),
          (m = j.positionArray[p]),
          (o = j.positionArray[t]),
          (u = new THREE.Vector3(k, m, o)),
          (k = j.normalArray[v]),
          (m = j.normalArray[p]),
          (o = j.normalArray[t]),
          (v = new THREE.Vector3(k, m, o)),
          v.normalize(),
          (p = new THREE.Vertex(u)),
          c.vertices.push(p),
          g.push(v);
      nfaces = j.count / 3;
      for (h = 0; h < nfaces; h++)
        (v = (b + h) * 3),
          (p = v + 1),
          (t = v + 2),
          (u = g[v]),
          (k = g[p]),
          (m = g[t]),
          (v = new THREE.Face3(v, p, t, [u, k, m])),
          c.faces.push(v);
      b += nfaces;
      j.count = 0;
    });
    return c;
  };
  this.init(b);
};
THREE.MarchingCubes.prototype = new THREE.Object3D();
THREE.MarchingCubes.prototype.constructor = THREE.MarchingCubes;
THREE.edgeTable = new Int32Array([
  0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331,
  3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975,
  2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620,
  2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711,
  1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635,
  1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912,
  1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554,
  2291, 3065, 2800, 1616, 1881, 1107, 1370, 598, 863, 85, 348, 3676, 3925, 3167,
  3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204,
  4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270,
  3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137,
  2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616,
  2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786,
  2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613,
  367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725,
  2988, 1196, 1445, 1711, 1958, 170, 419, 681, 928, 3376, 3129, 3891, 3642,
  2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993,
  3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153,
  400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030,
  778, 515, 265, 0,
]);
THREE.triTable = new Int32Array([
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,
  8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 0, 2, 9, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1,
  -1, -1, -1, -1, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 11,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1,
  -1, -1, -1, -1, -1, 3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, 0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1, 3, 9, 0, 3, 11,
  9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, 9, 8, 10, 10, 8, 11, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 8,
  4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 9, 4, 7, 1, 7, 3, 1, -1,
  -1, -1, -1, -1, -1, -1, 1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, 3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 9, 0, 2,
  8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1,
  -1, -1, -1, 8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 4,
  7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 8, 4, 7, 2, 3, 11,
  -1, -1, -1, -1, -1, -1, -1, 4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1,
  -1, 3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1, 1, 11, 10, 1, 4,
  11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1, 4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3,
  -1, -1, -1, -1, 4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1, 9,
  5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 3,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, 8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1,
  2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 10, 4,
  9, 5, -1, -1, -1, -1, -1, -1, -1, 5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1,
  -1, -1, -1, 2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1, 9, 5, 4, 2,
  3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 0, 8, 11, 4, 9, 5,
  -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1,
  -1, -1, 2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1, 10, 3, 11, 10, 1,
  3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10,
  -1, -1, -1, -1, 5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1, 5, 4,
  8, 5, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 5, 7, 9, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1,
  -1, -1, 0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, 3, 3, 5,
  7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1,
  -1, -1, -1, -1, -1, 10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1, 8, 0,
  2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1, 2, 10, 5, 2, 5, 3, 3, 5, 7, -1,
  -1, -1, -1, -1, -1, -1, 7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1,
  -1, 9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1, 2, 3, 11, 0, 1, 8, 1,
  7, 8, 1, 5, 7, -1, -1, -1, -1, 11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1,
  -1, -1, -1, 9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1, 5, 7, 0, 5,
  0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1, 11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0,
  7, 5, 7, 0, -1, 11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 5, 10,
  6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 5, 10, 6, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, 1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1,
  -1, 1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 1, 2,
  6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1,
  -1, -1, -1, -1, 5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1, 2, 3, 11,
  10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 0, 8, 11, 2, 0, 10, 6,
  5, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1,
  -1, -1, -1, 5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1, 6, 3, 11,
  6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 11, 0, 11, 5, 0, 5, 1, 5,
  11, 6, -1, -1, -1, -1, 3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1, 6,
  5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 8, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1,
  -1, -1, -1, -1, 1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, 6,
  5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1, 6, 1, 2, 6, 5, 1, 4, 7, 8, -1,
  -1, -1, -1, -1, -1, -1, 1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1, 8,
  4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1, 7, 3, 9, 7, 9, 4, 3, 2, 9, 5,
  9, 6, 2, 6, 9, -1, 3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 5,
  10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1, 0, 1, 9, 4, 7, 8, 2, 3, 11,
  5, 10, 6, -1, -1, -1, -1, 9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1,
  8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1, 5, 1, 11, 5, 11, 6, 1,
  0, 11, 7, 11, 4, 0, 4, 11, -1, 0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7,
  -1, 6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1, 10, 4, 9, 6, 4, 10,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1,
  -1, -1, -1, -1, -1, 10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1,
  8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1, 1, 4, 9, 1, 2, 4, 2, 6,
  4, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1,
  -1, 0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 8, 2,
  4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, 10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1,
  -1, -1, -1, -1, -1, 0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1, 3,
  11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1, 6, 4, 1, 6, 1, 10, 4, 8, 1,
  2, 1, 11, 8, 11, 1, -1, 9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1,
  8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1, 3, 11, 6, 3, 6, 0, 0, 6, 4,
  -1, -1, -1, -1, -1, -1, -1, 6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 7, 3, 0,
  10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1, 10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8,
  0, -1, -1, -1, -1, 10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1,
  2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 6, 9, 2, 9, 1, 6, 7, 9, 0,
  9, 3, 7, 3, 9, -1, 7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1, 7,
  3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 11, 10, 6, 8, 10,
  8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7,
  -1, 1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1, 11, 2, 1, 11, 1, 7,
  10, 6, 1, 6, 7, 1, -1, -1, -1, -1, 8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3,
  6, -1, 0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 0, 7,
  0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1, 7, 11, 6, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, 3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
  9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 9, 8, 3, 1, 11, 7,
  6, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, 1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 0,
  2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 2, 10, 3, 10, 8, 3,
  10, 9, 8, -1, -1, -1, -1, 7, 2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1, 2, 7, 6, 2, 3,
  7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6,
  -1, -1, -1, -1, 10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1, 10,
  7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1, 0, 3, 7, 0, 7, 10, 0, 10, 9,
  6, 10, 7, -1, -1, -1, -1, 7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1,
  -1, -1, 6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11,
  3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 6, 11, 8, 4, 6, 9, 0, 1, -1,
  -1, -1, -1, -1, -1, -1, 9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1,
  6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 11,
  0, 6, 11, 0, 4, 6, -1, -1, -1, -1, 4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1,
  -1, -1, -1, 10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1, 8, 2, 3, 8, 4,
  2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, 0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1, 1, 9,
  4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 1, 3, 8, 6, 1, 8, 4, 6, 6,
  10, 1, -1, -1, -1, -1, 10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1,
  -1, 4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1, 10, 9, 4, 6, 10, 4, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, 0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 5, 0,
  1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 11, 7, 6, 8, 3, 4, 3, 5, 4,
  3, 1, 5, -1, -1, -1, -1, 9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1,
  -1, 6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1, 7, 6, 11, 5, 4, 10,
  4, 2, 10, 4, 0, 2, -1, -1, -1, -1, 3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7,
  6, -1, 7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8,
  6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1, 3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1,
  -1, -1, -1, 6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1, 9, 5, 4, 10, 1,
  6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1, 1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9,
  5, 4, -1, 4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1, 7, 6, 10, 7,
  10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1, 6, 9, 5, 6, 11, 9, 11, 8, 9, -1,
  -1, -1, -1, -1, -1, -1, 3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1,
  0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1, 6, 11, 3, 6, 3, 5, 5,
  3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1,
  -1, -1, -1, 0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1, 11, 8, 5, 11,
  5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1, 6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3,
  -1, -1, -1, -1, 5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1, 9, 5, 6,
  9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1, 1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8,
  2, 6, 2, 8, -1, 1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
  3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1, 10, 1, 0, 10, 0, 6, 9, 5, 0, 5,
  6, 0, -1, -1, -1, -1, 0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, 10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10,
  7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 11, 7, 5, 8, 3,
  0, -1, -1, -1, -1, -1, -1, -1, 5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1,
  -1, -1, -1, 10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1, 11, 1, 2,
  11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 7, 1, 7, 5, 7,
  2, 11, -1, -1, -1, -1, 9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1, 7,
  5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1, 2, 5, 10, 2, 3, 5, 3, 7, 5, -1,
  -1, -1, -1, -1, -1, -1, 8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1,
  9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1, 9, 8, 2, 9, 2, 1, 8, 7,
  2, 10, 2, 5, 7, 5, 2, -1, 1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 9, 0, 3, 9, 3,
  5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1, 9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, 5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1,
  5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1, 0, 1, 9, 8, 4, 10, 8,
  10, 11, 10, 4, 5, -1, -1, -1, -1, 10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3,
  1, 4, -1, 2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1, 0, 4, 11, 0,
  11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11, -1, 0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8,
  11, 8, 5, -1, 9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5,
  10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1, 5, 10, 2, 5, 2, 4, 4, 2, 0, -1,
  -1, -1, -1, -1, -1, -1, 3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1, 5,
  10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 3, 5, 1,
  -1, -1, -1, -1, -1, -1, -1, 0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1, 9, 4, 5, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 7, 4, 9, 11, 9, 10, 11, -1,
  -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1,
  1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1, 3, 1, 4, 3, 4, 8, 1,
  10, 4, 7, 4, 11, 10, 11, 4, -1, 4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1,
  -1, -1, 9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1, 11, 7, 4, 11, 4,
  2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1, 11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4,
  -1, -1, -1, -1, 2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1, 9, 10, 7,
  9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1, 3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10,
  0, 4, 0, 10, -1, 1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,
  9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 0, 8, 1,
  8, 7, 1, -1, -1, -1, -1, 4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, 4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 8, 10,
  11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 11, 9, 10,
  -1, -1, -1, -1, -1, -1, -1, 0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1,
  -1, -1, 3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 11,
  1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 1, 2, 9, 2,
  11, 9, -1, -1, -1, -1, 0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, 3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2,
  8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1, 9, 10, 2, 0, 9, 2, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1,
  -1, 1, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 8, 9,
  1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, 1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, 0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
]);
THREE.Trident = function (b) {
  function c(c) {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(30, 0.1, b.length / 20, b.length / 5),
      new THREE.MeshBasicMaterial({ color: c })
    );
  }
  function e(b, c) {
    var e = new THREE.Geometry();
    e.vertices = [new THREE.Vertex(), new THREE.Vertex(b)];
    return new THREE.Line(e, new THREE.LineBasicMaterial({ color: c }));
  }
  THREE.Object3D.call(this);
  var f = Math.PI / 2,
    g,
    b = b || THREE.Trident.defaultParams;
  if (b !== THREE.Trident.defaultParams)
    for (g in THREE.Trident.defaultParams)
      b.hasOwnProperty(g) || (b[g] = THREE.Trident.defaultParams[g]);
  this.scale = new THREE.Vector3(b.scale, b.scale, b.scale);
  this.addChild(e(new THREE.Vector3(b.length, 0, 0), b.xAxisColor));
  this.addChild(e(new THREE.Vector3(0, b.length, 0), b.yAxisColor));
  this.addChild(e(new THREE.Vector3(0, 0, b.length), b.zAxisColor));
  if (b.showArrows)
    (g = c(b.xAxisColor)),
      (g.rotation.y = -f),
      (g.position.x = b.length),
      this.addChild(g),
      (g = c(b.yAxisColor)),
      (g.rotation.x = f),
      (g.position.y = b.length),
      this.addChild(g),
      (g = c(b.zAxisColor)),
      (g.rotation.y = Math.PI),
      (g.position.z = b.length),
      this.addChild(g);
};
THREE.Trident.prototype = new THREE.Object3D();
THREE.Trident.prototype.constructor = THREE.Trident;
THREE.Trident.defaultParams = {
  xAxisColor: 16711680,
  yAxisColor: 65280,
  zAxisColor: 255,
  showArrows: !0,
  length: 100,
  scale: 1,
};
THREE.PlaneCollider = function (b, c) {
  this.point = b;
  this.normal = c;
};
THREE.SphereCollider = function (b, c) {
  this.center = b;
  this.radius = c;
  this.radiusSq = c * c;
};
THREE.BoxCollider = function (b, c) {
  this.min = b;
  this.max = c;
  this.dynamic = !0;
  this.normal = new THREE.Vector3();
};
THREE.MeshCollider = function (b, c) {
  this.mesh = b;
  this.box = c;
  this.numFaces = this.mesh.geometry.faces.length;
  this.normal = new THREE.Vector3();
};
THREE.CollisionSystem = function () {
  this.collisionNormal = new THREE.Vector3();
  this.colliders = [];
  this.hits = [];
};
THREE.Collisions = new THREE.CollisionSystem();
THREE.CollisionSystem.prototype.merge = function (b) {
  this.colliders = this.colliders.concat(b.colliders);
  this.hits = this.hits.concat(b.hits);
};
THREE.CollisionSystem.prototype.rayCastAll = function (b) {
  b.direction.normalize();
  this.hits.length = 0;
  var c,
    e,
    f,
    g,
    j = 0;
  c = 0;
  for (e = this.colliders.length; c < e; c++)
    if (
      ((g = this.colliders[c]), (f = this.rayCast(b, g)), f < Number.MAX_VALUE)
    )
      (g.distance = f),
        f > j ? this.hits.push(g) : this.hits.unshift(g),
        (j = f);
  return this.hits;
};
THREE.CollisionSystem.prototype.rayCastNearest = function (b) {
  var c = this.rayCastAll(b);
  if (c.length == 0) return null;
  for (var e = 0; c[e] instanceof THREE.MeshCollider; ) {
    var f = this.rayMesh(b, c[e]);
    if (f.dist < Number.MAX_VALUE) {
      c[e].distance = f.dist;
      c[e].faceIndex = f.faceIndex;
      break;
    }
    e++;
  }
  if (e > c.length) return null;
  return c[e];
};
THREE.CollisionSystem.prototype.rayCast = function (b, c) {
  if (c instanceof THREE.PlaneCollider) return this.rayPlane(b, c);
  else if (c instanceof THREE.SphereCollider) return this.raySphere(b, c);
  else if (c instanceof THREE.BoxCollider) return this.rayBox(b, c);
  else if (c instanceof THREE.MeshCollider && c.box)
    return this.rayBox(b, c.box);
};
THREE.CollisionSystem.prototype.rayMesh = function (b, c) {
  for (
    var e = this.makeRayLocal(b, c.mesh), f = Number.MAX_VALUE, g, j = 0;
    j < c.numFaces;
    j++
  ) {
    var h = c.mesh.geometry.faces[j],
      k = c.mesh.geometry.vertices[h.a].position,
      m = c.mesh.geometry.vertices[h.b].position,
      o = c.mesh.geometry.vertices[h.c].position,
      p =
        h instanceof THREE.Face4
          ? c.mesh.geometry.vertices[h.d].position
          : null;
    h instanceof THREE.Face3
      ? ((h = this.rayTriangle(e, k, m, o, f, this.collisionNormal, c.mesh)),
        h < f &&
          ((f = h),
          (g = j),
          c.normal.copy(this.collisionNormal),
          c.normal.normalize()))
      : h instanceof THREE.Face4 &&
        ((h = this.rayTriangle(e, k, m, p, f, this.collisionNormal, c.mesh)),
        h < f &&
          ((f = h),
          (g = j),
          c.normal.copy(this.collisionNormal),
          c.normal.normalize()),
        (h = this.rayTriangle(e, m, o, p, f, this.collisionNormal, c.mesh)),
        h < f &&
          ((f = h),
          (g = j),
          c.normal.copy(this.collisionNormal),
          c.normal.normalize()));
  }
  return { dist: f, faceIndex: g };
};
THREE.CollisionSystem.prototype.rayTriangle = function (b, c, e, f, g, j, h) {
  var k = THREE.CollisionSystem.__v1,
    m = THREE.CollisionSystem.__v2;
  j.set(0, 0, 0);
  k.sub(e, c);
  m.sub(f, e);
  j.cross(k, m);
  k = j.dot(b.direction);
  if (!(k < 0))
    if (h.doubleSided || h.flipSided) j.multiplyScalar(-1), (k *= -1);
    else return Number.MAX_VALUE;
  h = j.dot(c) - j.dot(b.origin);
  if (!(h <= 0)) return Number.MAX_VALUE;
  if (!(h >= k * g)) return Number.MAX_VALUE;
  h /= k;
  k = THREE.CollisionSystem.__v3;
  k.copy(b.direction);
  k.multiplyScalar(h);
  k.addSelf(b.origin);
  Math.abs(j.x) > Math.abs(j.y)
    ? Math.abs(j.x) > Math.abs(j.z)
      ? ((b = k.y - c.y),
        (j = e.y - c.y),
        (g = f.y - c.y),
        (k = k.z - c.z),
        (e = e.z - c.z),
        (f = f.z - c.z))
      : ((b = k.x - c.x),
        (j = e.x - c.x),
        (g = f.x - c.x),
        (k = k.y - c.y),
        (e = e.y - c.y),
        (f = f.y - c.y))
    : Math.abs(j.y) > Math.abs(j.z)
    ? ((b = k.x - c.x),
      (j = e.x - c.x),
      (g = f.x - c.x),
      (k = k.z - c.z),
      (e = e.z - c.z),
      (f = f.z - c.z))
    : ((b = k.x - c.x),
      (j = e.x - c.x),
      (g = f.x - c.x),
      (k = k.y - c.y),
      (e = e.y - c.y),
      (f = f.y - c.y));
  c = j * f - e * g;
  if (c == 0) return Number.MAX_VALUE;
  c = 1 / c;
  f = (b * f - k * g) * c;
  if (!(f >= 0)) return Number.MAX_VALUE;
  c *= j * k - e * b;
  if (!(c >= 0)) return Number.MAX_VALUE;
  if (!(1 - f - c >= 0)) return Number.MAX_VALUE;
  return h;
};
THREE.CollisionSystem.prototype.makeRayLocal = function (b, c) {
  var e = THREE.CollisionSystem.__m;
  THREE.Matrix4.makeInvert(c.matrixWorld, e);
  var f = THREE.CollisionSystem.__r;
  f.origin.copy(b.origin);
  f.direction.copy(b.direction);
  e.multiplyVector3(f.origin);
  e.rotateAxis(f.direction);
  f.direction.normalize();
  return f;
};
THREE.CollisionSystem.prototype.rayBox = function (b, c) {
  var e;
  c.dynamic && c.mesh && c.mesh.matrixWorld
    ? (e = this.makeRayLocal(b, c.mesh))
    : ((e = THREE.CollisionSystem.__r),
      e.origin.copy(b.origin),
      e.direction.copy(b.direction));
  var f = 0,
    g = 0,
    j = 0,
    h = 0,
    k = 0,
    m = 0,
    o = !0;
  e.origin.x < c.min.x
    ? ((f = c.min.x - e.origin.x), (f /= e.direction.x), (o = !1), (h = -1))
    : e.origin.x > c.max.x &&
      ((f = c.max.x - e.origin.x), (f /= e.direction.x), (o = !1), (h = 1));
  e.origin.y < c.min.y
    ? ((g = c.min.y - e.origin.y), (g /= e.direction.y), (o = !1), (k = -1))
    : e.origin.y > c.max.y &&
      ((g = c.max.y - e.origin.y), (g /= e.direction.y), (o = !1), (k = 1));
  e.origin.z < c.min.z
    ? ((j = c.min.z - e.origin.z), (j /= e.direction.z), (o = !1), (m = -1))
    : e.origin.z > c.max.z &&
      ((j = c.max.z - e.origin.z), (j /= e.direction.z), (o = !1), (m = 1));
  if (o) return -1;
  o = 0;
  g > f && ((o = 1), (f = g));
  j > f && ((o = 2), (f = j));
  switch (o) {
    case 0:
      k = e.origin.y + e.direction.y * f;
      if (k < c.min.y || k > c.max.y) return Number.MAX_VALUE;
      e = e.origin.z + e.direction.z * f;
      if (e < c.min.z || e > c.max.z) return Number.MAX_VALUE;
      c.normal.set(h, 0, 0);
      break;
    case 1:
      h = e.origin.x + e.direction.x * f;
      if (h < c.min.x || h > c.max.x) return Number.MAX_VALUE;
      e = e.origin.z + e.direction.z * f;
      if (e < c.min.z || e > c.max.z) return Number.MAX_VALUE;
      c.normal.set(0, k, 0);
      break;
    case 2:
      h = e.origin.x + e.direction.x * f;
      if (h < c.min.x || h > c.max.x) return Number.MAX_VALUE;
      k = e.origin.y + e.direction.y * f;
      if (k < c.min.y || k > c.max.y) return Number.MAX_VALUE;
      c.normal.set(0, 0, m);
  }
  return f;
};
THREE.CollisionSystem.prototype.rayPlane = function (b, c) {
  var e = b.direction.dot(c.normal),
    f = c.point.dot(c.normal);
  if (e < 0) e = (f - b.origin.dot(c.normal)) / e;
  else return Number.MAX_VALUE;
  return e > 0 ? e : Number.MAX_VALUE;
};
THREE.CollisionSystem.prototype.raySphere = function (b, c) {
  var e = c.center.clone().subSelf(b.origin);
  if (e.lengthSq < c.radiusSq) return -1;
  var f = e.dot(b.direction.clone());
  if (f <= 0) return Number.MAX_VALUE;
  e = c.radiusSq - (e.lengthSq() - f * f);
  if (e >= 0) return Math.abs(f) - Math.sqrt(e);
  return Number.MAX_VALUE;
};
THREE.CollisionSystem.__v1 = new THREE.Vector3();
THREE.CollisionSystem.__v2 = new THREE.Vector3();
THREE.CollisionSystem.__v3 = new THREE.Vector3();
THREE.CollisionSystem.__nr = new THREE.Vector3();
THREE.CollisionSystem.__m = new THREE.Matrix4();
THREE.CollisionSystem.__r = new THREE.Ray();
THREE.CollisionUtils = {};
THREE.CollisionUtils.MeshOBB = function (b) {
  b.geometry.computeBoundingBox();
  var c = b.geometry.boundingBox,
    e = new THREE.Vector3(c.x[0], c.y[0], c.z[0]),
    c = new THREE.Vector3(c.x[1], c.y[1], c.z[1]),
    e = new THREE.BoxCollider(e, c);
  e.mesh = b;
  return e;
};
THREE.CollisionUtils.MeshAABB = function (b) {
  var c = THREE.CollisionUtils.MeshOBB(b);
  c.min.addSelf(b.position);
  c.max.addSelf(b.position);
  c.dynamic = !1;
  return c;
};
THREE.CollisionUtils.MeshColliderWBox = function (b) {
  return new THREE.MeshCollider(b, THREE.CollisionUtils.MeshOBB(b));
};
if (THREE.WebGLRenderer)
  THREE.AnaglyphWebGLRenderer = function (b) {
    THREE.WebGLRenderer.call(this, b);
    var c = this,
      e = this.setSize,
      f = this.render,
      g = new THREE.Camera(),
      j = new THREE.Camera(),
      h = new THREE.Matrix4(),
      k = new THREE.Matrix4(),
      m,
      o,
      p;
    g.useTarget = j.useTarget = !1;
    g.matrixAutoUpdate = j.matrixAutoUpdate = !1;
    var b = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
      },
      u = new THREE.WebGLRenderTarget(512, 512, b),
      v = new THREE.WebGLRenderTarget(512, 512, b),
      t = new THREE.Camera(53, 1, 1, 1e4);
    t.position.z = 2;
    _material = new THREE.MeshShaderMaterial({
      uniforms: {
        mapLeft: { type: "t", value: 0, texture: u },
        mapRight: { type: "t", value: 1, texture: v },
      },
      vertexShader:
        "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader:
        "uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}",
    });
    var x = new THREE.Scene();
    x.addObject(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), _material));
    this.setSize = function (b, f) {
      e.call(c, b, f);
      u.width = b;
      u.height = f;
      v.width = b;
      v.height = f;
    };
    this.render = function (b, e) {
      e.update(null, !0);
      if (m !== e.aspect || o !== e.near || p !== e.fov) {
        m = e.aspect;
        o = e.near;
        p = e.fov;
        var y = e.projectionMatrix.clone(),
          G = (125 / 30) * 0.5,
          D = (G * o) / 125,
          I = o * Math.tan((p * Math.PI) / 360),
          J;
        h.n14 = G;
        k.n14 = -G;
        G = -I * m + D;
        J = I * m + D;
        y.n11 = (2 * o) / (J - G);
        y.n13 = (J + G) / (J - G);
        g.projectionMatrix = y.clone();
        G = -I * m - D;
        J = I * m - D;
        y.n11 = (2 * o) / (J - G);
        y.n13 = (J + G) / (J - G);
        j.projectionMatrix = y.clone();
      }
      g.matrix = e.matrixWorld.clone().multiplySelf(k);
      g.update(null, !0);
      g.position.copy(e.position);
      g.near = o;
      g.far = e.far;
      f.call(c, b, g, u, !0);
      j.matrix = e.matrixWorld.clone().multiplySelf(h);
      j.update(null, !0);
      j.position.copy(e.position);
      j.near = o;
      j.far = e.far;
      f.call(c, b, j, v, !0);
      f.call(c, x, t);
    };
  };
if (THREE.WebGLRenderer)
  THREE.CrosseyedWebGLRenderer = function (b) {
    THREE.WebGLRenderer.call(this, b);
    this.autoClear = !1;
    var c = this,
      e = this.setSize,
      f = this.render,
      g,
      j,
      h = new THREE.Camera(),
      k = new THREE.Camera();
    c.separation = 10;
    if (b && b.separation !== void 0) c.separation = b.separation;
    new THREE.Camera(
      53,
      window.innerWidth / 2 / window.innerHeight,
      1,
      1e4
    ).position.z = -10;
    this.setSize = function (b, f) {
      e.call(c, b, f);
      g = b / 2;
      j = f;
    };
    this.render = function (b, e) {
      this.clear();
      h.fov = e.fov;
      h.aspect = 0.5 * e.aspect;
      h.near = e.near;
      h.far = e.far;
      h.updateProjectionMatrix();
      h.position.copy(e.position);
      h.target.position.copy(e.target.position);
      h.translateX(c.separation);
      k.projectionMatrix = h.projectionMatrix;
      k.position.copy(e.position);
      k.target.position.copy(e.target.position);
      k.translateX(-c.separation);
      this.setViewport(0, 0, g, j);
      f.call(c, b, h);
      this.setViewport(g, 0, g, j);
      f.call(c, b, k, !1);
    };
  };
