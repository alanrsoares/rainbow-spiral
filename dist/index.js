// node_modules/twgl.js/dist/5.x/twgl-full.module.js
var VecType = Float32Array;
function create$1(x, y, z) {
  const dst = new VecType(3);
  if (x) {
    dst[0] = x;
  }
  if (y) {
    dst[1] = y;
  }
  if (z) {
    dst[2] = z;
  }
  return dst;
}
function add(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] + b[0];
  dst[1] = a[1] + b[1];
  dst[2] = a[2] + b[2];
  return dst;
}
function multiply$1(a, b, dst) {
  dst = dst || new VecType(3);
  dst[0] = a[0] * b[0];
  dst[1] = a[1] * b[1];
  dst[2] = a[2] * b[2];
  return dst;
}
var MatType = Float32Array;
function identity(dst) {
  dst = dst || new MatType(16);
  dst[0] = 1;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 0;
  dst[5] = 1;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;
  return dst;
}
function inverse(m, dst) {
  dst = dst || new MatType(16);
  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  const tmp_0 = m22 * m33;
  const tmp_1 = m32 * m23;
  const tmp_2 = m12 * m33;
  const tmp_3 = m32 * m13;
  const tmp_4 = m12 * m23;
  const tmp_5 = m22 * m13;
  const tmp_6 = m02 * m33;
  const tmp_7 = m32 * m03;
  const tmp_8 = m02 * m23;
  const tmp_9 = m22 * m03;
  const tmp_10 = m02 * m13;
  const tmp_11 = m12 * m03;
  const tmp_12 = m20 * m31;
  const tmp_13 = m30 * m21;
  const tmp_14 = m10 * m31;
  const tmp_15 = m30 * m11;
  const tmp_16 = m10 * m21;
  const tmp_17 = m20 * m11;
  const tmp_18 = m00 * m31;
  const tmp_19 = m30 * m01;
  const tmp_20 = m00 * m21;
  const tmp_21 = m20 * m01;
  const tmp_22 = m00 * m11;
  const tmp_23 = m10 * m01;
  const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
  const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  dst[0] = d * t0;
  dst[1] = d * t1;
  dst[2] = d * t2;
  dst[3] = d * t3;
  dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
  dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
  dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
  dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
  dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
  dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
  dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
  dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
  dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
  dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
  dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
  dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
  return dst;
}
function transformPoint(m, v, dst) {
  dst = dst || create$1();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
  dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
  dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
  dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;
  return dst;
}
function transformDirection(m, v, dst) {
  dst = dst || create$1();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
  dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
  dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
  return dst;
}
var BYTE$2 = 5120;
var UNSIGNED_BYTE$3 = 5121;
var SHORT$2 = 5122;
var UNSIGNED_SHORT$3 = 5123;
var INT$3 = 5124;
var UNSIGNED_INT$3 = 5125;
var FLOAT$3 = 5126;
var UNSIGNED_SHORT_4_4_4_4$1 = 32819;
var UNSIGNED_SHORT_5_5_5_1$1 = 32820;
var UNSIGNED_SHORT_5_6_5$1 = 33635;
var HALF_FLOAT$1 = 5131;
var UNSIGNED_INT_2_10_10_10_REV$1 = 33640;
var UNSIGNED_INT_10F_11F_11F_REV$1 = 35899;
var UNSIGNED_INT_5_9_9_9_REV$1 = 35902;
var FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 36269;
var UNSIGNED_INT_24_8$1 = 34042;
var glTypeToTypedArray = {};
{
  const tt = glTypeToTypedArray;
  tt[BYTE$2] = Int8Array;
  tt[UNSIGNED_BYTE$3] = Uint8Array;
  tt[SHORT$2] = Int16Array;
  tt[UNSIGNED_SHORT$3] = Uint16Array;
  tt[INT$3] = Int32Array;
  tt[UNSIGNED_INT$3] = Uint32Array;
  tt[FLOAT$3] = Float32Array;
  tt[UNSIGNED_SHORT_4_4_4_4$1] = Uint16Array;
  tt[UNSIGNED_SHORT_5_5_5_1$1] = Uint16Array;
  tt[UNSIGNED_SHORT_5_6_5$1] = Uint16Array;
  tt[HALF_FLOAT$1] = Uint16Array;
  tt[UNSIGNED_INT_2_10_10_10_REV$1] = Uint32Array;
  tt[UNSIGNED_INT_10F_11F_11F_REV$1] = Uint32Array;
  tt[UNSIGNED_INT_5_9_9_9_REV$1] = Uint32Array;
  tt[FLOAT_32_UNSIGNED_INT_24_8_REV$1] = Uint32Array;
  tt[UNSIGNED_INT_24_8$1] = Uint32Array;
}
function getGLTypeForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array) {
    return BYTE$2;
  }
  if (typedArray instanceof Uint8Array) {
    return UNSIGNED_BYTE$3;
  }
  if (typedArray instanceof Uint8ClampedArray) {
    return UNSIGNED_BYTE$3;
  }
  if (typedArray instanceof Int16Array) {
    return SHORT$2;
  }
  if (typedArray instanceof Uint16Array) {
    return UNSIGNED_SHORT$3;
  }
  if (typedArray instanceof Int32Array) {
    return INT$3;
  }
  if (typedArray instanceof Uint32Array) {
    return UNSIGNED_INT$3;
  }
  if (typedArray instanceof Float32Array) {
    return FLOAT$3;
  }
  throw new Error("unsupported typed array type");
}
function getGLTypeForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array) {
    return BYTE$2;
  }
  if (typedArrayType === Uint8Array) {
    return UNSIGNED_BYTE$3;
  }
  if (typedArrayType === Uint8ClampedArray) {
    return UNSIGNED_BYTE$3;
  }
  if (typedArrayType === Int16Array) {
    return SHORT$2;
  }
  if (typedArrayType === Uint16Array) {
    return UNSIGNED_SHORT$3;
  }
  if (typedArrayType === Int32Array) {
    return INT$3;
  }
  if (typedArrayType === Uint32Array) {
    return UNSIGNED_INT$3;
  }
  if (typedArrayType === Float32Array) {
    return FLOAT$3;
  }
  throw new Error("unsupported typed array type");
}
function getTypedArrayTypeForGLType(type) {
  const CTOR = glTypeToTypedArray[type];
  if (!CTOR) {
    throw new Error("unknown gl type");
  }
  return CTOR;
}
var isArrayBuffer$1 = typeof SharedArrayBuffer !== "undefined" ? function isArrayBufferOrSharedArrayBuffer(a) {
  return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
} : function isArrayBuffer(a) {
  return a && a.buffer && a.buffer instanceof ArrayBuffer;
};
function error$1(...args) {
  console.error(...args);
}
var isTypeWeakMaps = new Map;
function isType(object, type) {
  if (!object || typeof object !== "object") {
    return false;
  }
  let weakMap = isTypeWeakMaps.get(type);
  if (!weakMap) {
    weakMap = new WeakMap;
    isTypeWeakMaps.set(type, weakMap);
  }
  let isOfType = weakMap.get(object);
  if (isOfType === undefined) {
    const s = Object.prototype.toString.call(object);
    isOfType = s.substring(8, s.length - 1) === type;
    weakMap.set(object, isOfType);
  }
  return isOfType;
}
function isBuffer(gl, t) {
  return typeof WebGLBuffer !== "undefined" && isType(t, "WebGLBuffer");
}
function isTexture(gl, t) {
  return typeof WebGLTexture !== "undefined" && isType(t, "WebGLTexture");
}
var STATIC_DRAW = 35044;
var ARRAY_BUFFER$1 = 34962;
var ELEMENT_ARRAY_BUFFER$2 = 34963;
var BUFFER_SIZE = 34660;
var BYTE$1 = 5120;
var UNSIGNED_BYTE$2 = 5121;
var SHORT$1 = 5122;
var UNSIGNED_SHORT$2 = 5123;
var INT$2 = 5124;
var UNSIGNED_INT$2 = 5125;
var FLOAT$2 = 5126;
var defaults$2 = {
  attribPrefix: ""
};
function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, array, drawType || STATIC_DRAW);
}
function createBufferFromTypedArray(gl, typedArray, type, drawType) {
  if (isBuffer(gl, typedArray)) {
    return typedArray;
  }
  type = type || ARRAY_BUFFER$1;
  const buffer = gl.createBuffer();
  setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
  return buffer;
}
function isIndices(name) {
  return name === "indices";
}
function getNormalizationForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array) {
    return true;
  }
  if (typedArrayType === Uint8Array) {
    return true;
  }
  return false;
}
function getArray$1(array) {
  return array.length ? array : array.data;
}
var texcoordRE = /coord|texture/i;
var colorRE = /color|colour/i;
function guessNumComponentsFromName(name, length2) {
  let numComponents;
  if (texcoordRE.test(name)) {
    numComponents = 2;
  } else if (colorRE.test(name)) {
    numComponents = 4;
  } else {
    numComponents = 3;
  }
  if (length2 % numComponents > 0) {
    throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length2} values is not evenly divisible by ${numComponents}. You should specify it.`);
  }
  return numComponents;
}
function getNumComponents$1(array, arrayName, numValues) {
  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues || getArray$1(array).length);
}
function makeTypedArray(array, name) {
  if (isArrayBuffer$1(array)) {
    return array;
  }
  if (isArrayBuffer$1(array.data)) {
    return array.data;
  }
  if (Array.isArray(array)) {
    array = {
      data: array
    };
  }
  let Type = array.type ? typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type) : undefined;
  if (!Type) {
    if (isIndices(name)) {
      Type = Uint16Array;
    } else {
      Type = Float32Array;
    }
  }
  return new Type(array.data);
}
function glTypeFromGLTypeOrTypedArrayType(glTypeOrTypedArrayCtor) {
  return typeof glTypeOrTypedArrayCtor === "number" ? glTypeOrTypedArrayCtor : glTypeOrTypedArrayCtor ? getGLTypeForTypedArrayType(glTypeOrTypedArrayCtor) : FLOAT$2;
}
function typedArrayTypeFromGLTypeOrTypedArrayCtor(glTypeOrTypedArrayCtor) {
  return typeof glTypeOrTypedArrayCtor === "number" ? getTypedArrayTypeForGLType(glTypeOrTypedArrayCtor) : glTypeOrTypedArrayCtor || Float32Array;
}
function attribBufferFromBuffer(gl, array) {
  return {
    buffer: array.buffer,
    numValues: 2 * 3 * 4,
    type: glTypeFromGLTypeOrTypedArrayType(array.type),
    arrayType: typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type)
  };
}
function attribBufferFromSize(gl, array) {
  const numValues = array.data || array;
  const arrayType = typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type);
  const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
  const buffer = gl.createBuffer();
  gl.bindBuffer(ARRAY_BUFFER$1, buffer);
  gl.bufferData(ARRAY_BUFFER$1, numBytes, array.drawType || STATIC_DRAW);
  return {
    buffer,
    numValues,
    type: getGLTypeForTypedArrayType(arrayType),
    arrayType
  };
}
function attribBufferFromArrayLike(gl, array, arrayName) {
  const typedArray = makeTypedArray(array, arrayName);
  return {
    arrayType: typedArray.constructor,
    buffer: createBufferFromTypedArray(gl, typedArray, undefined, array.drawType),
    type: getGLTypeForTypedArray(typedArray),
    numValues: 0
  };
}
function createAttribsFromArrays(gl, arrays) {
  const attribs = {};
  Object.keys(arrays).forEach(function(arrayName) {
    if (!isIndices(arrayName)) {
      const array = arrays[arrayName];
      const attribName = array.attrib || array.name || array.attribName || defaults$2.attribPrefix + arrayName;
      if (array.value) {
        if (!Array.isArray(array.value) && !isArrayBuffer$1(array.value)) {
          throw new Error("array.value is not array or typedarray");
        }
        attribs[attribName] = {
          value: array.value
        };
      } else {
        let fn;
        if (array.buffer && array.buffer instanceof WebGLBuffer) {
          fn = attribBufferFromBuffer;
        } else if (typeof array === "number" || typeof array.data === "number") {
          fn = attribBufferFromSize;
        } else {
          fn = attribBufferFromArrayLike;
        }
        const { buffer, type, numValues, arrayType } = fn(gl, array, arrayName);
        const normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
        const numComponents = getNumComponents$1(array, arrayName, numValues);
        attribs[attribName] = {
          buffer,
          numComponents,
          type,
          normalize: normalization,
          stride: array.stride || 0,
          offset: array.offset || 0,
          divisor: array.divisor === undefined ? undefined : array.divisor,
          drawType: array.drawType
        };
      }
    }
  });
  gl.bindBuffer(ARRAY_BUFFER$1, null);
  return attribs;
}
function getBytesPerValueForGLType(gl, type) {
  if (type === BYTE$1)
    return 1;
  if (type === UNSIGNED_BYTE$2)
    return 1;
  if (type === SHORT$1)
    return 2;
  if (type === UNSIGNED_SHORT$2)
    return 2;
  if (type === INT$2)
    return 4;
  if (type === UNSIGNED_INT$2)
    return 4;
  if (type === FLOAT$2)
    return 4;
  return 0;
}
var positionKeys = ["position", "positions", "a_position"];
function getNumElementsFromNonIndexedArrays(arrays) {
  let key;
  let ii;
  for (ii = 0;ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in arrays) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(arrays)[0];
  }
  const array = arrays[key];
  const length2 = getArray$1(array).length;
  if (length2 === undefined) {
    return 1;
  }
  const numComponents = getNumComponents$1(array, key);
  const numElements = length2 / numComponents;
  if (length2 % numComponents > 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length2}`);
  }
  return numElements;
}
function getNumElementsFromAttributes(gl, attribs) {
  let key;
  let ii;
  for (ii = 0;ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in attribs) {
      break;
    }
    key = defaults$2.attribPrefix + key;
    if (key in attribs) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(attribs)[0];
  }
  const attrib = attribs[key];
  if (!attrib.buffer) {
    return 1;
  }
  gl.bindBuffer(ARRAY_BUFFER$1, attrib.buffer);
  const numBytes = gl.getBufferParameter(ARRAY_BUFFER$1, BUFFER_SIZE);
  gl.bindBuffer(ARRAY_BUFFER$1, null);
  const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
  const totalElements = numBytes / bytesPerValue;
  const numComponents = attrib.numComponents || attrib.size;
  const numElements = totalElements / numComponents;
  if (numElements % 1 !== 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}
function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
  const newAttribs = createAttribsFromArrays(gl, arrays);
  const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
  const indices = arrays.indices;
  if (indices) {
    const newIndices = makeTypedArray(indices, "indices");
    bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER$2);
    bufferInfo.numElements = newIndices.length;
    bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
  } else if (!bufferInfo.numElements) {
    bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
  }
  return bufferInfo;
}
function createBufferFromArray(gl, array, arrayName) {
  const type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER$2 : ARRAY_BUFFER$1;
  const typedArray = makeTypedArray(array, arrayName);
  return createBufferFromTypedArray(gl, typedArray, type);
}
function createBuffersFromArrays(gl, arrays) {
  const buffers = {};
  Object.keys(arrays).forEach(function(key) {
    buffers[key] = createBufferFromArray(gl, arrays[key], key);
  });
  if (arrays.indices) {
    buffers.numElements = arrays.indices.length;
    buffers.elementType = getGLTypeForTypedArray(makeTypedArray(arrays.indices));
  } else {
    buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
  }
  return buffers;
}
function augmentTypedArray(typedArray, numComponents) {
  let cursor = 0;
  typedArray.push = function() {
    for (let ii = 0;ii < arguments.length; ++ii) {
      const value = arguments[ii];
      if (value instanceof Array || isArrayBuffer$1(value)) {
        for (let jj = 0;jj < value.length; ++jj) {
          typedArray[cursor++] = value[jj];
        }
      } else {
        typedArray[cursor++] = value;
      }
    }
  };
  typedArray.reset = function(opt_index) {
    cursor = opt_index || 0;
  };
  typedArray.numComponents = numComponents;
  Object.defineProperty(typedArray, "numElements", {
    get: function() {
      return this.length / this.numComponents | 0;
    }
  });
  return typedArray;
}
function createAugmentedTypedArray(numComponents, numElements, opt_type) {
  const Type = opt_type || Float32Array;
  return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}
function applyFuncToV3Array(array, matrix, fn) {
  const len = array.length;
  const tmp = new Float32Array(3);
  for (let ii = 0;ii < len; ii += 3) {
    fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
    array[ii] = tmp[0];
    array[ii + 1] = tmp[1];
    array[ii + 2] = tmp[2];
  }
}
function transformNormal(mi, v, dst) {
  dst = dst || create$1();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
  return dst;
}
function reorientDirections(array, matrix) {
  applyFuncToV3Array(array, matrix, transformDirection);
  return array;
}
function reorientNormals(array, matrix) {
  applyFuncToV3Array(array, inverse(matrix), transformNormal);
  return array;
}
function reorientPositions(array, matrix) {
  applyFuncToV3Array(array, matrix, transformPoint);
  return array;
}
function reorientVertices(arrays, matrix) {
  Object.keys(arrays).forEach(function(name) {
    const array = arrays[name];
    if (name.indexOf("pos") >= 0) {
      reorientPositions(array, matrix);
    } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
      reorientDirections(array, matrix);
    } else if (name.indexOf("norm") >= 0) {
      reorientNormals(array, matrix);
    }
  });
  return arrays;
}
function createXYQuadVertices(size, xOffset, yOffset) {
  size = size || 2;
  xOffset = xOffset || 0;
  yOffset = yOffset || 0;
  size *= 0.5;
  return {
    position: {
      numComponents: 2,
      data: [
        xOffset + -1 * size,
        yOffset + -1 * size,
        xOffset + 1 * size,
        yOffset + -1 * size,
        xOffset + -1 * size,
        yOffset + 1 * size,
        xOffset + 1 * size,
        yOffset + 1 * size
      ]
    },
    normal: [
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1
    ],
    texcoord: [
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1
    ],
    indices: [0, 1, 2, 2, 1, 3]
  };
}
function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
  width = width || 1;
  depth = depth || 1;
  subdivisionsWidth = subdivisionsWidth || 1;
  subdivisionsDepth = subdivisionsDepth || 1;
  matrix = matrix || identity();
  const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  for (let z = 0;z <= subdivisionsDepth; z++) {
    for (let x = 0;x <= subdivisionsWidth; x++) {
      const u = x / subdivisionsWidth;
      const v = z / subdivisionsDepth;
      positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
      normals.push(0, 1, 0);
      texcoords.push(u, v);
    }
  }
  const numVertsAcross = subdivisionsWidth + 1;
  const indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
  for (let z = 0;z < subdivisionsDepth; z++) {
    for (let x = 0;x < subdivisionsWidth; x++) {
      indices.push((z + 0) * numVertsAcross + x, (z + 1) * numVertsAcross + x, (z + 0) * numVertsAcross + x + 1);
      indices.push((z + 1) * numVertsAcross + x, (z + 1) * numVertsAcross + x + 1, (z + 0) * numVertsAcross + x + 1);
    }
  }
  const arrays = reorientVertices({
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  }, matrix);
  return arrays;
}
function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
  if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
    throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
  }
  opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
  opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
  opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
  opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
  const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
  const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
  const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  for (let y = 0;y <= subdivisionsHeight; y++) {
    for (let x = 0;x <= subdivisionsAxis; x++) {
      const u = x / subdivisionsAxis;
      const v = y / subdivisionsHeight;
      const theta = longRange * u + opt_startLongitudeInRadians;
      const phi = latRange * v + opt_startLatitudeInRadians;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const ux = cosTheta * sinPhi;
      const uy = cosPhi;
      const uz = sinTheta * sinPhi;
      positions.push(radius * ux, radius * uy, radius * uz);
      normals.push(ux, uy, uz);
      texcoords.push(1 - u, v);
    }
  }
  const numVertsAround = subdivisionsAxis + 1;
  const indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
  for (let x = 0;x < subdivisionsAxis; x++) {
    for (let y = 0;y < subdivisionsHeight; y++) {
      indices.push((y + 0) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x);
      indices.push((y + 1) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x + 1);
    }
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
var CUBE_FACE_INDICES = [
  [3, 7, 5, 1],
  [6, 2, 0, 4],
  [6, 7, 3, 2],
  [0, 1, 5, 4],
  [7, 6, 4, 5],
  [2, 3, 1, 0]
];
function createCubeVertices(size) {
  size = size || 1;
  const k = size / 2;
  const cornerVertices = [
    [-k, -k, -k],
    [+k, -k, -k],
    [-k, +k, -k],
    [+k, +k, -k],
    [-k, -k, +k],
    [+k, -k, +k],
    [-k, +k, +k],
    [+k, +k, +k]
  ];
  const faceNormals = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];
  const uvCoords = [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1]
  ];
  const numVertices = 6 * 4;
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, 6 * 2, Uint16Array);
  for (let f = 0;f < 6; ++f) {
    const faceIndices = CUBE_FACE_INDICES[f];
    for (let v = 0;v < 4; ++v) {
      const position = cornerVertices[faceIndices[v]];
      const normal = faceNormals[f];
      const uv = uvCoords[v];
      positions.push(position);
      normals.push(normal);
      texcoords.push(uv);
    }
    const offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
  if (radialSubdivisions < 3) {
    throw new Error("radialSubdivisions must be 3 or greater");
  }
  if (verticalSubdivisions < 1) {
    throw new Error("verticalSubdivisions must be 1 or greater");
  }
  const topCap = opt_topCap === undefined ? true : opt_topCap;
  const bottomCap = opt_bottomCap === undefined ? true : opt_bottomCap;
  const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
  const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
  const vertsAroundEdge = radialSubdivisions + 1;
  const slant = Math.atan2(bottomRadius - topRadius, height);
  const cosSlant = Math.cos(slant);
  const sinSlant = Math.sin(slant);
  const start = topCap ? -2 : 0;
  const end = verticalSubdivisions + (bottomCap ? 2 : 0);
  for (let yy = start;yy <= end; ++yy) {
    let v = yy / verticalSubdivisions;
    let y = height * v;
    let ringRadius;
    if (yy < 0) {
      y = 0;
      v = 1;
      ringRadius = bottomRadius;
    } else if (yy > verticalSubdivisions) {
      y = height;
      v = 1;
      ringRadius = topRadius;
    } else {
      ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
    }
    if (yy === -2 || yy === verticalSubdivisions + 2) {
      ringRadius = 0;
      v = 0;
    }
    y -= height / 2;
    for (let ii = 0;ii < vertsAroundEdge; ++ii) {
      const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
      const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
      positions.push(sin * ringRadius, y, cos * ringRadius);
      if (yy < 0) {
        normals.push(0, -1, 0);
      } else if (yy > verticalSubdivisions) {
        normals.push(0, 1, 0);
      } else if (ringRadius === 0) {
        normals.push(0, 0, 0);
      } else {
        normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
      }
      texcoords.push(ii / radialSubdivisions, 1 - v);
    }
  }
  for (let yy = 0;yy < verticalSubdivisions + extra; ++yy) {
    if (yy === 1 && topCap || yy === verticalSubdivisions + extra - 2 && bottomCap) {
      continue;
    }
    for (let ii = 0;ii < radialSubdivisions; ++ii) {
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 0) + 1 + ii, vertsAroundEdge * (yy + 1) + 1 + ii);
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 1) + 1 + ii, vertsAroundEdge * (yy + 1) + 0 + ii);
    }
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function expandRLEData(rleData, padding) {
  padding = padding || [];
  const data = [];
  for (let ii = 0;ii < rleData.length; ii += 4) {
    const runLength = rleData[ii];
    const element = rleData.slice(ii + 1, ii + 4);
    element.push.apply(element, padding);
    for (let jj = 0;jj < runLength; ++jj) {
      data.push.apply(data, element);
    }
  }
  return data;
}
function create3DFVertices() {
  const positions = [
    0,
    0,
    0,
    0,
    150,
    0,
    30,
    0,
    0,
    0,
    150,
    0,
    30,
    150,
    0,
    30,
    0,
    0,
    30,
    0,
    0,
    30,
    30,
    0,
    100,
    0,
    0,
    30,
    30,
    0,
    100,
    30,
    0,
    100,
    0,
    0,
    30,
    60,
    0,
    30,
    90,
    0,
    67,
    60,
    0,
    30,
    90,
    0,
    67,
    90,
    0,
    67,
    60,
    0,
    0,
    0,
    30,
    30,
    0,
    30,
    0,
    150,
    30,
    0,
    150,
    30,
    30,
    0,
    30,
    30,
    150,
    30,
    30,
    0,
    30,
    100,
    0,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    100,
    0,
    30,
    100,
    30,
    30,
    30,
    60,
    30,
    67,
    60,
    30,
    30,
    90,
    30,
    30,
    90,
    30,
    67,
    60,
    30,
    67,
    90,
    30,
    0,
    0,
    0,
    100,
    0,
    0,
    100,
    0,
    30,
    0,
    0,
    0,
    100,
    0,
    30,
    0,
    0,
    30,
    100,
    0,
    0,
    100,
    30,
    0,
    100,
    30,
    30,
    100,
    0,
    0,
    100,
    30,
    30,
    100,
    0,
    30,
    30,
    30,
    0,
    30,
    30,
    30,
    100,
    30,
    30,
    30,
    30,
    0,
    100,
    30,
    30,
    100,
    30,
    0,
    30,
    30,
    0,
    30,
    60,
    30,
    30,
    30,
    30,
    30,
    30,
    0,
    30,
    60,
    0,
    30,
    60,
    30,
    30,
    60,
    0,
    67,
    60,
    30,
    30,
    60,
    30,
    30,
    60,
    0,
    67,
    60,
    0,
    67,
    60,
    30,
    67,
    60,
    0,
    67,
    90,
    30,
    67,
    60,
    30,
    67,
    60,
    0,
    67,
    90,
    0,
    67,
    90,
    30,
    30,
    90,
    0,
    30,
    90,
    30,
    67,
    90,
    30,
    30,
    90,
    0,
    67,
    90,
    30,
    67,
    90,
    0,
    30,
    90,
    0,
    30,
    150,
    30,
    30,
    90,
    30,
    30,
    90,
    0,
    30,
    150,
    0,
    30,
    150,
    30,
    0,
    150,
    0,
    0,
    150,
    30,
    30,
    150,
    30,
    0,
    150,
    0,
    30,
    150,
    30,
    30,
    150,
    0,
    0,
    0,
    0,
    0,
    0,
    30,
    0,
    150,
    30,
    0,
    0,
    0,
    0,
    150,
    30,
    0,
    150,
    0
  ];
  const texcoords = [
    0.22,
    0.19,
    0.22,
    0.79,
    0.34,
    0.19,
    0.22,
    0.79,
    0.34,
    0.79,
    0.34,
    0.19,
    0.34,
    0.19,
    0.34,
    0.31,
    0.62,
    0.19,
    0.34,
    0.31,
    0.62,
    0.31,
    0.62,
    0.19,
    0.34,
    0.43,
    0.34,
    0.55,
    0.49,
    0.43,
    0.34,
    0.55,
    0.49,
    0.55,
    0.49,
    0.43,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  ];
  const normals = expandRLEData([
    18,
    0,
    0,
    1,
    18,
    0,
    0,
    -1,
    6,
    0,
    1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    -1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    -1,
    0,
    6,
    1,
    0,
    0,
    6,
    0,
    -1,
    0,
    6,
    -1,
    0,
    0
  ]);
  const colors = expandRLEData([
    18,
    200,
    70,
    120,
    18,
    80,
    70,
    200,
    6,
    70,
    200,
    210,
    6,
    200,
    200,
    70,
    6,
    210,
    100,
    70,
    6,
    210,
    160,
    70,
    6,
    70,
    180,
    210,
    6,
    100,
    70,
    210,
    6,
    76,
    210,
    100,
    6,
    140,
    210,
    80,
    6,
    90,
    130,
    110,
    6,
    160,
    160,
    220
  ], [255]);
  const numVerts = positions.length / 3;
  const arrays = {
    position: createAugmentedTypedArray(3, numVerts),
    texcoord: createAugmentedTypedArray(2, numVerts),
    normal: createAugmentedTypedArray(3, numVerts),
    color: createAugmentedTypedArray(4, numVerts, Uint8Array),
    indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
  };
  arrays.position.push(positions);
  arrays.texcoord.push(texcoords);
  arrays.normal.push(normals);
  arrays.color.push(colors);
  for (let ii = 0;ii < numVerts; ++ii) {
    arrays.indices.push(ii);
  }
  return arrays;
}
function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
  if (subdivisionsDown <= 0) {
    throw new Error("subdivisionDown must be > 0");
  }
  startOffset = startOffset || 0;
  endOffset = endOffset || 1;
  const subdivisionsThick = 2;
  const offsetRange = endOffset - startOffset;
  const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  function lerp(a, b, s) {
    return a + (b - a) * s;
  }
  function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
    for (let z = 0;z <= subdivisionsDown; z++) {
      const uBack = x / (subdivisionsThick - 1);
      const v = z / subdivisionsDown;
      const xBack = (uBack - 0.5) * 2;
      const angle = (startOffset + v * offsetRange) * Math.PI;
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      const radius = lerp(verticalRadius, arcRadius, s);
      const px = xBack * thickness;
      const py = c * verticalRadius;
      const pz = s * radius;
      positions.push(px, py, pz);
      const n = add(multiply$1([0, s, c], normalMult), normalAdd);
      normals.push(n);
      texcoords.push(uBack * uMult + uAdd, v);
    }
  }
  for (let x = 0;x < subdivisionsThick; x++) {
    const uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
    createArc(outerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
    createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
    createArc(innerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
    createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
  }
  const indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
  function createSurface(leftArcOffset, rightArcOffset) {
    for (let z = 0;z < subdivisionsDown; ++z) {
      indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
      indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
    }
  }
  const numVerticesDown = subdivisionsDown + 1;
  createSurface(numVerticesDown * 0, numVerticesDown * 4);
  createSurface(numVerticesDown * 5, numVerticesDown * 7);
  createSurface(numVerticesDown * 6, numVerticesDown * 2);
  createSurface(numVerticesDown * 3, numVerticesDown * 1);
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
  return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
}
function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
  if (radialSubdivisions < 3) {
    throw new Error("radialSubdivisions must be 3 or greater");
  }
  if (bodySubdivisions < 3) {
    throw new Error("verticalSubdivisions must be 3 or greater");
  }
  startAngle = startAngle || 0;
  endAngle = endAngle || Math.PI * 2;
  const range = endAngle - startAngle;
  const radialParts = radialSubdivisions + 1;
  const bodyParts = bodySubdivisions + 1;
  const numVertices = radialParts * bodyParts;
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
  for (let slice = 0;slice < bodyParts; ++slice) {
    const v = slice / bodySubdivisions;
    const sliceAngle = v * Math.PI * 2;
    const sliceSin = Math.sin(sliceAngle);
    const ringRadius = radius + sliceSin * thickness;
    const ny = Math.cos(sliceAngle);
    const y = ny * thickness;
    for (let ring = 0;ring < radialParts; ++ring) {
      const u = ring / radialSubdivisions;
      const ringAngle = startAngle + u * range;
      const xSin = Math.sin(ringAngle);
      const zCos = Math.cos(ringAngle);
      const x = xSin * ringRadius;
      const z = zCos * ringRadius;
      const nx = xSin * sliceSin;
      const nz = zCos * sliceSin;
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      texcoords.push(u, 1 - v);
    }
  }
  for (let slice = 0;slice < bodySubdivisions; ++slice) {
    for (let ring = 0;ring < radialSubdivisions; ++ring) {
      const nextRingIndex = 1 + ring;
      const nextSliceIndex = 1 + slice;
      indices.push(radialParts * slice + ring, radialParts * nextSliceIndex + ring, radialParts * slice + nextRingIndex);
      indices.push(radialParts * nextSliceIndex + ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * slice + nextRingIndex);
    }
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
  if (divisions < 3) {
    throw new Error("divisions must be at least 3");
  }
  stacks = stacks ? stacks : 1;
  stackPower = stackPower ? stackPower : 1;
  innerRadius = innerRadius ? innerRadius : 0;
  const numVertices = (divisions + 1) * (stacks + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
  let firstIndex = 0;
  const radiusSpan = radius - innerRadius;
  const pointsPerStack = divisions + 1;
  for (let stack = 0;stack <= stacks; ++stack) {
    const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
    for (let i = 0;i <= divisions; ++i) {
      const theta = 2 * Math.PI * i / divisions;
      const x = stackRadius * Math.cos(theta);
      const z = stackRadius * Math.sin(theta);
      positions.push(x, 0, z);
      normals.push(0, 1, 0);
      texcoords.push(1 - i / divisions, stack / stacks);
      if (stack > 0 && i !== divisions) {
        const a = firstIndex + (i + 1);
        const b = firstIndex + i;
        const c = firstIndex + i - pointsPerStack;
        const d = firstIndex + (i + 1) - pointsPerStack;
        indices.push(a, b, c);
        indices.push(a, c, d);
      }
    }
    firstIndex += divisions + 1;
  }
  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices
  };
}
function createBufferFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
    return createBuffersFromArrays(gl, arrays);
  };
}
function createBufferInfoFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
    return createBufferInfoFromArrays(gl, arrays);
  };
}
var create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
var create3DFBuffers = createBufferFunc(create3DFVertices);
var createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
var createCubeBuffers = createBufferFunc(createCubeVertices);
var createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
var createPlaneBuffers = createBufferFunc(createPlaneVertices);
var createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
var createSphereBuffers = createBufferFunc(createSphereVertices);
var createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
var createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
var createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
var createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
var createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
var createCrescentBuffers = createBufferFunc(createCrescentVertices);
var createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
var createCylinderBuffers = createBufferFunc(createCylinderVertices);
var createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
var createTorusBuffers = createBufferFunc(createTorusVertices);
var createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
var createDiscBuffers = createBufferFunc(createDiscVertices);
function isWebGL2(gl) {
  return !!gl.texStorage2D;
}
var glEnumToString = function() {
  const haveEnumsForType = {};
  const enums = {};
  function addEnums(gl) {
    const type = gl.constructor.name;
    if (!haveEnumsForType[type]) {
      for (const key in gl) {
        if (typeof gl[key] === "number") {
          const existing = enums[gl[key]];
          enums[gl[key]] = existing ? `${existing} | ${key}` : key;
        }
      }
      haveEnumsForType[type] = true;
    }
  }
  return function glEnumToString(gl, value) {
    addEnums(gl);
    return enums[value] || (typeof value === "number" ? `0x${value.toString(16)}` : value);
  };
}();
var defaults$1 = {
  textureColor: new Uint8Array([128, 192, 255, 255]),
  textureOptions: {},
  crossOrigin: undefined
};
var getShared2DContext = function() {
  let s_ctx;
  return function getShared2DContext() {
    s_ctx = s_ctx || (typeof document !== "undefined" && document.createElement ? document.createElement("canvas").getContext("2d") : null);
    return s_ctx;
  };
}();
var ALPHA = 6406;
var RGB = 6407;
var RGBA$1 = 6408;
var LUMINANCE = 6409;
var LUMINANCE_ALPHA = 6410;
var DEPTH_COMPONENT$1 = 6402;
var DEPTH_STENCIL$1 = 34041;
var RG = 33319;
var RG_INTEGER = 33320;
var RED = 6403;
var RED_INTEGER = 36244;
var RGB_INTEGER = 36248;
var RGBA_INTEGER = 36249;
var formatInfo = {};
{
  const f = formatInfo;
  f[ALPHA] = { numColorComponents: 1 };
  f[LUMINANCE] = { numColorComponents: 1 };
  f[LUMINANCE_ALPHA] = { numColorComponents: 2 };
  f[RGB] = { numColorComponents: 3 };
  f[RGBA$1] = { numColorComponents: 4 };
  f[RED] = { numColorComponents: 1 };
  f[RED_INTEGER] = { numColorComponents: 1 };
  f[RG] = { numColorComponents: 2 };
  f[RG_INTEGER] = { numColorComponents: 2 };
  f[RGB] = { numColorComponents: 3 };
  f[RGB_INTEGER] = { numColorComponents: 3 };
  f[RGBA$1] = { numColorComponents: 4 };
  f[RGBA_INTEGER] = { numColorComponents: 4 };
  f[DEPTH_COMPONENT$1] = { numColorComponents: 1 };
  f[DEPTH_STENCIL$1] = { numColorComponents: 2 };
}
var error = error$1;
function getElementById(id) {
  return typeof document !== "undefined" && document.getElementById ? document.getElementById(id) : null;
}
var TEXTURE0 = 33984;
var ARRAY_BUFFER = 34962;
var ELEMENT_ARRAY_BUFFER$1 = 34963;
var COMPILE_STATUS = 35713;
var LINK_STATUS = 35714;
var FRAGMENT_SHADER = 35632;
var VERTEX_SHADER = 35633;
var SEPARATE_ATTRIBS = 35981;
var ACTIVE_UNIFORMS = 35718;
var ACTIVE_ATTRIBUTES = 35721;
var TRANSFORM_FEEDBACK_VARYINGS = 35971;
var ACTIVE_UNIFORM_BLOCKS = 35382;
var UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
var UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
var UNIFORM_BLOCK_DATA_SIZE = 35392;
var UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
var FLOAT = 5126;
var FLOAT_VEC2 = 35664;
var FLOAT_VEC3 = 35665;
var FLOAT_VEC4 = 35666;
var INT = 5124;
var INT_VEC2 = 35667;
var INT_VEC3 = 35668;
var INT_VEC4 = 35669;
var BOOL = 35670;
var BOOL_VEC2 = 35671;
var BOOL_VEC3 = 35672;
var BOOL_VEC4 = 35673;
var FLOAT_MAT2 = 35674;
var FLOAT_MAT3 = 35675;
var FLOAT_MAT4 = 35676;
var SAMPLER_2D = 35678;
var SAMPLER_CUBE = 35680;
var SAMPLER_3D = 35679;
var SAMPLER_2D_SHADOW = 35682;
var FLOAT_MAT2x3 = 35685;
var FLOAT_MAT2x4 = 35686;
var FLOAT_MAT3x2 = 35687;
var FLOAT_MAT3x4 = 35688;
var FLOAT_MAT4x2 = 35689;
var FLOAT_MAT4x3 = 35690;
var SAMPLER_2D_ARRAY = 36289;
var SAMPLER_2D_ARRAY_SHADOW = 36292;
var SAMPLER_CUBE_SHADOW = 36293;
var UNSIGNED_INT = 5125;
var UNSIGNED_INT_VEC2 = 36294;
var UNSIGNED_INT_VEC3 = 36295;
var UNSIGNED_INT_VEC4 = 36296;
var INT_SAMPLER_2D = 36298;
var INT_SAMPLER_3D = 36299;
var INT_SAMPLER_CUBE = 36300;
var INT_SAMPLER_2D_ARRAY = 36303;
var UNSIGNED_INT_SAMPLER_2D = 36306;
var UNSIGNED_INT_SAMPLER_3D = 36307;
var UNSIGNED_INT_SAMPLER_CUBE = 36308;
var UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
var TEXTURE_2D$1 = 3553;
var TEXTURE_CUBE_MAP = 34067;
var TEXTURE_3D = 32879;
var TEXTURE_2D_ARRAY = 35866;
var typeMap = {};
function getBindPointForSamplerType(gl, type) {
  return typeMap[type].bindPoint;
}
function floatSetter(gl, location2) {
  return function(v) {
    gl.uniform1f(location2, v);
  };
}
function floatArraySetter(gl, location2) {
  return function(v) {
    gl.uniform1fv(location2, v);
  };
}
function floatVec2Setter(gl, location2) {
  return function(v) {
    gl.uniform2fv(location2, v);
  };
}
function floatVec3Setter(gl, location2) {
  return function(v) {
    gl.uniform3fv(location2, v);
  };
}
function floatVec4Setter(gl, location2) {
  return function(v) {
    gl.uniform4fv(location2, v);
  };
}
function intSetter(gl, location2) {
  return function(v) {
    gl.uniform1i(location2, v);
  };
}
function intArraySetter(gl, location2) {
  return function(v) {
    gl.uniform1iv(location2, v);
  };
}
function intVec2Setter(gl, location2) {
  return function(v) {
    gl.uniform2iv(location2, v);
  };
}
function intVec3Setter(gl, location2) {
  return function(v) {
    gl.uniform3iv(location2, v);
  };
}
function intVec4Setter(gl, location2) {
  return function(v) {
    gl.uniform4iv(location2, v);
  };
}
function uintSetter(gl, location2) {
  return function(v) {
    gl.uniform1ui(location2, v);
  };
}
function uintArraySetter(gl, location2) {
  return function(v) {
    gl.uniform1uiv(location2, v);
  };
}
function uintVec2Setter(gl, location2) {
  return function(v) {
    gl.uniform2uiv(location2, v);
  };
}
function uintVec3Setter(gl, location2) {
  return function(v) {
    gl.uniform3uiv(location2, v);
  };
}
function uintVec4Setter(gl, location2) {
  return function(v) {
    gl.uniform4uiv(location2, v);
  };
}
function floatMat2Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix2fv(location2, false, v);
  };
}
function floatMat3Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix3fv(location2, false, v);
  };
}
function floatMat4Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix4fv(location2, false, v);
  };
}
function floatMat23Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix2x3fv(location2, false, v);
  };
}
function floatMat32Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix3x2fv(location2, false, v);
  };
}
function floatMat24Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix2x4fv(location2, false, v);
  };
}
function floatMat42Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix4x2fv(location2, false, v);
  };
}
function floatMat34Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix3x4fv(location2, false, v);
  };
}
function floatMat43Setter(gl, location2) {
  return function(v) {
    gl.uniformMatrix4x3fv(location2, false, v);
  };
}
function samplerSetter(gl, type, unit, location2) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  return isWebGL2(gl) ? function(textureOrPair) {
    let texture;
    let sampler;
    if (!textureOrPair || isTexture(gl, textureOrPair)) {
      texture = textureOrPair;
      sampler = null;
    } else {
      texture = textureOrPair.texture;
      sampler = textureOrPair.sampler;
    }
    gl.uniform1i(location2, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
    gl.bindSampler(unit, sampler);
  } : function(texture) {
    gl.uniform1i(location2, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
  };
}
function samplerArraySetter(gl, type, unit, location2, size) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  const units = new Int32Array(size);
  for (let ii = 0;ii < size; ++ii) {
    units[ii] = unit + ii;
  }
  return isWebGL2(gl) ? function(textures) {
    gl.uniform1iv(location2, units);
    textures.forEach(function(textureOrPair, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      let texture;
      let sampler;
      if (!textureOrPair || isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.bindSampler(unit, sampler);
      gl.bindTexture(bindPoint, texture);
    });
  } : function(textures) {
    gl.uniform1iv(location2, units);
    textures.forEach(function(texture, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      gl.bindTexture(bindPoint, texture);
    });
  };
}
typeMap[FLOAT] = { Type: Float32Array, size: 4, setter: floatSetter, arraySetter: floatArraySetter };
typeMap[FLOAT_VEC2] = { Type: Float32Array, size: 8, setter: floatVec2Setter, cols: 2 };
typeMap[FLOAT_VEC3] = { Type: Float32Array, size: 12, setter: floatVec3Setter, cols: 3 };
typeMap[FLOAT_VEC4] = { Type: Float32Array, size: 16, setter: floatVec4Setter, cols: 4 };
typeMap[INT] = { Type: Int32Array, size: 4, setter: intSetter, arraySetter: intArraySetter };
typeMap[INT_VEC2] = { Type: Int32Array, size: 8, setter: intVec2Setter, cols: 2 };
typeMap[INT_VEC3] = { Type: Int32Array, size: 12, setter: intVec3Setter, cols: 3 };
typeMap[INT_VEC4] = { Type: Int32Array, size: 16, setter: intVec4Setter, cols: 4 };
typeMap[UNSIGNED_INT] = { Type: Uint32Array, size: 4, setter: uintSetter, arraySetter: uintArraySetter };
typeMap[UNSIGNED_INT_VEC2] = { Type: Uint32Array, size: 8, setter: uintVec2Setter, cols: 2 };
typeMap[UNSIGNED_INT_VEC3] = { Type: Uint32Array, size: 12, setter: uintVec3Setter, cols: 3 };
typeMap[UNSIGNED_INT_VEC4] = { Type: Uint32Array, size: 16, setter: uintVec4Setter, cols: 4 };
typeMap[BOOL] = { Type: Uint32Array, size: 4, setter: intSetter, arraySetter: intArraySetter };
typeMap[BOOL_VEC2] = { Type: Uint32Array, size: 8, setter: intVec2Setter, cols: 2 };
typeMap[BOOL_VEC3] = { Type: Uint32Array, size: 12, setter: intVec3Setter, cols: 3 };
typeMap[BOOL_VEC4] = { Type: Uint32Array, size: 16, setter: intVec4Setter, cols: 4 };
typeMap[FLOAT_MAT2] = { Type: Float32Array, size: 32, setter: floatMat2Setter, rows: 2, cols: 2 };
typeMap[FLOAT_MAT3] = { Type: Float32Array, size: 48, setter: floatMat3Setter, rows: 3, cols: 3 };
typeMap[FLOAT_MAT4] = { Type: Float32Array, size: 64, setter: floatMat4Setter, rows: 4, cols: 4 };
typeMap[FLOAT_MAT2x3] = { Type: Float32Array, size: 32, setter: floatMat23Setter, rows: 2, cols: 3 };
typeMap[FLOAT_MAT2x4] = { Type: Float32Array, size: 32, setter: floatMat24Setter, rows: 2, cols: 4 };
typeMap[FLOAT_MAT3x2] = { Type: Float32Array, size: 48, setter: floatMat32Setter, rows: 3, cols: 2 };
typeMap[FLOAT_MAT3x4] = { Type: Float32Array, size: 48, setter: floatMat34Setter, rows: 3, cols: 4 };
typeMap[FLOAT_MAT4x2] = { Type: Float32Array, size: 64, setter: floatMat42Setter, rows: 4, cols: 2 };
typeMap[FLOAT_MAT4x3] = { Type: Float32Array, size: 64, setter: floatMat43Setter, rows: 4, cols: 3 };
typeMap[SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1 };
typeMap[SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP };
typeMap[SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D };
typeMap[SAMPLER_2D_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1 };
typeMap[SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY };
typeMap[SAMPLER_2D_ARRAY_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY };
typeMap[SAMPLER_CUBE_SHADOW] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP };
typeMap[INT_SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1 };
typeMap[INT_SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D };
typeMap[INT_SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP };
typeMap[INT_SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY };
typeMap[UNSIGNED_INT_SAMPLER_2D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1 };
typeMap[UNSIGNED_INT_SAMPLER_3D] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D };
typeMap[UNSIGNED_INT_SAMPLER_CUBE] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP };
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null, size: 0, setter: samplerSetter, arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY };
function floatAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      switch (b.value.length) {
        case 4:
          gl.vertexAttrib4fv(index, b.value);
          break;
        case 3:
          gl.vertexAttrib3fv(index, b.value);
          break;
        case 2:
          gl.vertexAttrib2fv(index, b.value);
          break;
        case 1:
          gl.vertexAttrib1fv(index, b.value);
          break;
        default:
          throw new Error("the length of a float constant value must be between 1 and 4!");
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index, b.divisor || 0);
      }
    }
  };
}
function intAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4iv(index, b.value);
      } else {
        throw new Error("The length of an integer constant value must be 4!");
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT, b.stride || 0, b.offset || 0);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index, b.divisor || 0);
      }
    }
  };
}
function uintAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4uiv(index, b.value);
      } else {
        throw new Error("The length of an unsigned integer constant value must be 4!");
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT, b.stride || 0, b.offset || 0);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index, b.divisor || 0);
      }
    }
  };
}
function matAttribSetter(gl, index, typeInfo) {
  const defaultSize = typeInfo.size;
  const count = typeInfo.count;
  return function(b) {
    gl.bindBuffer(ARRAY_BUFFER, b.buffer);
    const numComponents = b.size || b.numComponents || defaultSize;
    const size = numComponents / count;
    const type = b.type || FLOAT;
    const typeInfo2 = typeMap[type];
    const stride = typeInfo2.size * numComponents;
    const normalize = b.normalize || false;
    const offset = b.offset || 0;
    const rowOffset = stride / count;
    for (let i = 0;i < count; ++i) {
      gl.enableVertexAttribArray(index + i);
      gl.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index + i, b.divisor || 0);
      }
    }
  };
}
var attrTypeMap = {};
attrTypeMap[FLOAT] = { size: 4, setter: floatAttribSetter };
attrTypeMap[FLOAT_VEC2] = { size: 8, setter: floatAttribSetter };
attrTypeMap[FLOAT_VEC3] = { size: 12, setter: floatAttribSetter };
attrTypeMap[FLOAT_VEC4] = { size: 16, setter: floatAttribSetter };
attrTypeMap[INT] = { size: 4, setter: intAttribSetter };
attrTypeMap[INT_VEC2] = { size: 8, setter: intAttribSetter };
attrTypeMap[INT_VEC3] = { size: 12, setter: intAttribSetter };
attrTypeMap[INT_VEC4] = { size: 16, setter: intAttribSetter };
attrTypeMap[UNSIGNED_INT] = { size: 4, setter: uintAttribSetter };
attrTypeMap[UNSIGNED_INT_VEC2] = { size: 8, setter: uintAttribSetter };
attrTypeMap[UNSIGNED_INT_VEC3] = { size: 12, setter: uintAttribSetter };
attrTypeMap[UNSIGNED_INT_VEC4] = { size: 16, setter: uintAttribSetter };
attrTypeMap[BOOL] = { size: 4, setter: intAttribSetter };
attrTypeMap[BOOL_VEC2] = { size: 8, setter: intAttribSetter };
attrTypeMap[BOOL_VEC3] = { size: 12, setter: intAttribSetter };
attrTypeMap[BOOL_VEC4] = { size: 16, setter: intAttribSetter };
attrTypeMap[FLOAT_MAT2] = { size: 4, setter: matAttribSetter, count: 2 };
attrTypeMap[FLOAT_MAT3] = { size: 9, setter: matAttribSetter, count: 3 };
attrTypeMap[FLOAT_MAT4] = { size: 16, setter: matAttribSetter, count: 4 };
var errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = "", lineOffset = 0) {
  const matches = [...log.matchAll(errorRE)];
  const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
    const lineNo = parseInt(m[1]);
    const next = matches[ndx + 1];
    const end = next ? next.index : log.length;
    const msg = log.substring(m.index, end);
    return [lineNo - 1, msg];
  }));
  return src.split(`
`).map((line, lineNo) => {
    const err = lineNoToErrorMap.get(lineNo);
    return `${lineNo + 1 + lineOffset}: ${line}${err ? `

^^^ ${err}` : ""}`;
  }).join(`
`);
}
var spaceRE = /^[ \t]*\n/;
function prepShaderSource(shaderSource) {
  let lineOffset = 0;
  if (spaceRE.test(shaderSource)) {
    lineOffset = 1;
    shaderSource = shaderSource.replace(spaceRE, "");
  }
  return { lineOffset, shaderSource };
}
function reportError(progOptions, msg) {
  progOptions.errorCallback(msg);
  if (progOptions.callback) {
    setTimeout(() => {
      progOptions.callback(`${msg}
${progOptions.errors.join(`
`)}`);
    });
  }
  return null;
}
function checkShaderStatus(gl, shaderType, shader, errFn) {
  errFn = errFn || error;
  const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
  if (!compiled) {
    const lastError = gl.getShaderInfoLog(shader);
    const { lineOffset, shaderSource } = prepShaderSource(gl.getShaderSource(shader));
    const error2 = `${addLineNumbersWithError(shaderSource, lastError, lineOffset)}
Error compiling ${glEnumToString(gl, shaderType)}: ${lastError}`;
    errFn(error2);
    return error2;
  }
  return "";
}
function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
  let transformFeedbackVaryings;
  let transformFeedbackMode;
  let callback;
  if (typeof opt_locations === "function") {
    opt_errorCallback = opt_locations;
    opt_locations = undefined;
  }
  if (typeof opt_attribs === "function") {
    opt_errorCallback = opt_attribs;
    opt_attribs = undefined;
  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
    const opt = opt_attribs;
    opt_errorCallback = opt.errorCallback;
    opt_attribs = opt.attribLocations;
    transformFeedbackVaryings = opt.transformFeedbackVaryings;
    transformFeedbackMode = opt.transformFeedbackMode;
    callback = opt.callback;
  }
  const errorCallback = opt_errorCallback || error;
  const errors = [];
  const options = {
    errorCallback(msg, ...args) {
      errors.push(msg);
      errorCallback(msg, ...args);
    },
    transformFeedbackVaryings,
    transformFeedbackMode,
    callback,
    errors
  };
  {
    let attribLocations = {};
    if (Array.isArray(opt_attribs)) {
      opt_attribs.forEach(function(attrib, ndx) {
        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
      });
    } else {
      attribLocations = opt_attribs || {};
    }
    options.attribLocations = attribLocations;
  }
  return options;
}
var defaultShaderType = [
  "VERTEX_SHADER",
  "FRAGMENT_SHADER"
];
function getShaderTypeFromScriptType(gl, scriptType) {
  if (scriptType.indexOf("frag") >= 0) {
    return FRAGMENT_SHADER;
  } else if (scriptType.indexOf("vert") >= 0) {
    return VERTEX_SHADER;
  }
  return;
}
function deleteProgramAndShaders(gl, program, notThese) {
  const shaders = gl.getAttachedShaders(program);
  for (const shader of shaders) {
    if (notThese.has(shader)) {
      gl.deleteShader(shader);
    }
  }
  gl.deleteProgram(program);
}
var wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
function createProgramNoCheck(gl, shaders, programOptions) {
  const program = gl.createProgram();
  const {
    attribLocations,
    transformFeedbackVaryings,
    transformFeedbackMode
  } = getProgramOptions(programOptions);
  for (let ndx = 0;ndx < shaders.length; ++ndx) {
    let shader = shaders[ndx];
    if (typeof shader === "string") {
      const elem = getElementById(shader);
      const src = elem ? elem.text : shader;
      let type = gl[defaultShaderType[ndx]];
      if (elem && elem.type) {
        type = getShaderTypeFromScriptType(gl, elem.type) || type;
      }
      shader = gl.createShader(type);
      gl.shaderSource(shader, prepShaderSource(src).shaderSource);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
  }
  Object.entries(attribLocations).forEach(([attrib, loc]) => gl.bindAttribLocation(program, loc, attrib));
  {
    let varyings = transformFeedbackVaryings;
    if (varyings) {
      if (varyings.attribs) {
        varyings = varyings.attribs;
      }
      if (!Array.isArray(varyings)) {
        varyings = Object.keys(varyings);
      }
      gl.transformFeedbackVaryings(program, varyings, transformFeedbackMode || SEPARATE_ATTRIBS);
    }
  }
  gl.linkProgram(program);
  return program;
}
function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaderSet = new Set(shaders);
  const program = createProgramNoCheck(gl, shaders, progOptions);
  function hasErrors(gl2, program2) {
    const errors = getProgramErrors(gl2, program2, progOptions.errorCallback);
    if (errors) {
      deleteProgramAndShaders(gl2, program2, shaderSet);
    }
    return errors;
  }
  if (progOptions.callback) {
    waitForProgramLinkCompletionAsync(gl, program).then(() => {
      const errors = hasErrors(gl, program);
      progOptions.callback(errors, errors ? undefined : program);
    });
    return;
  }
  return hasErrors(gl, program) ? undefined : program;
}
function wrapCallbackFnToAsyncFn(fn) {
  return function(gl, arg1, ...args) {
    return new Promise((resolve, reject) => {
      const programOptions = getProgramOptions(...args);
      programOptions.callback = (err, program) => {
        if (err) {
          reject(err);
        } else {
          resolve(program);
        }
      };
      fn(gl, arg1, programOptions);
    });
  };
}
var createProgramAsync = wrapCallbackFnToAsyncFn(createProgram);
var createProgramInfoAsync = wrapCallbackFnToAsyncFn(createProgramInfo);
async function waitForProgramLinkCompletionAsync(gl, program) {
  const ext = gl.getExtension("KHR_parallel_shader_compile");
  const checkFn = ext ? (gl2, program2) => gl2.getProgramParameter(program2, ext.COMPLETION_STATUS_KHR) : () => true;
  let waitTime = 0;
  do {
    await wait(waitTime);
    waitTime = 1000 / 60;
  } while (!checkFn(gl, program));
}
async function waitForAllProgramsLinkCompletionAsync(gl, programs) {
  for (const program of Object.values(programs)) {
    await waitForProgramLinkCompletionAsync(gl, program);
  }
}
function getProgramErrors(gl, program, errFn) {
  errFn = errFn || error;
  const linked = gl.getProgramParameter(program, LINK_STATUS);
  if (!linked) {
    const lastError = gl.getProgramInfoLog(program);
    errFn(`Error in program linking: ${lastError}`);
    const shaders = gl.getAttachedShaders(program);
    const errors = shaders.map((shader) => checkShaderStatus(gl, gl.getShaderParameter(shader, gl.SHADER_TYPE), shader, errFn));
    return `${lastError}
${errors.filter((_) => _).join(`
`)}`;
  }
  return;
}
function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  return createProgram(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback);
}
function isBuiltIn(info) {
  const name = info.name;
  return name.startsWith("gl_") || name.startsWith("webgl_");
}
var tokenRE = /(\.|\[|]|\w+)/g;
var isDigit = (s) => s >= "0" && s <= "9";
function addSetterToUniformTree(fullPath, setter, node, uniformSetters) {
  const tokens = fullPath.split(tokenRE).filter((s) => s !== "");
  let tokenNdx = 0;
  let path = "";
  for (;; ) {
    const token = tokens[tokenNdx++];
    path += token;
    const isArrayIndex = isDigit(token[0]);
    const accessor = isArrayIndex ? parseInt(token) : token;
    if (isArrayIndex) {
      path += tokens[tokenNdx++];
    }
    const isLastToken = tokenNdx === tokens.length;
    if (isLastToken) {
      node[accessor] = setter;
      break;
    } else {
      const token2 = tokens[tokenNdx++];
      const isArray = token2 === "[";
      const child = node[accessor] || (isArray ? [] : {});
      node[accessor] = child;
      node = child;
      uniformSetters[path] = uniformSetters[path] || function(node2) {
        return function(value) {
          setUniformTree(node2, value);
        };
      }(child);
      path += token2;
    }
  }
}
function createUniformSetters(gl, program) {
  let textureUnit = 0;
  function createUniformSetter(program2, uniformInfo, location2) {
    const isArray = uniformInfo.name.endsWith("[0]");
    const type = uniformInfo.type;
    const typeInfo = typeMap[type];
    if (!typeInfo) {
      throw new Error(`unknown type: 0x${type.toString(16)}`);
    }
    let setter;
    if (typeInfo.bindPoint) {
      const unit = textureUnit;
      textureUnit += uniformInfo.size;
      if (isArray) {
        setter = typeInfo.arraySetter(gl, type, unit, location2, uniformInfo.size);
      } else {
        setter = typeInfo.setter(gl, type, unit, location2, uniformInfo.size);
      }
    } else {
      if (typeInfo.arraySetter && isArray) {
        setter = typeInfo.arraySetter(gl, location2);
      } else {
        setter = typeInfo.setter(gl, location2);
      }
    }
    setter.location = location2;
    return setter;
  }
  const uniformSetters = {};
  const uniformTree = {};
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  for (let ii = 0;ii < numUniforms; ++ii) {
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      continue;
    }
    let name = uniformInfo.name;
    if (name.endsWith("[0]")) {
      name = name.substr(0, name.length - 3);
    }
    const location2 = gl.getUniformLocation(program, uniformInfo.name);
    if (location2) {
      const setter = createUniformSetter(program, uniformInfo, location2);
      uniformSetters[name] = setter;
      addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
    }
  }
  return uniformSetters;
}
function createTransformFeedbackInfo(gl, program) {
  const info = {};
  const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
  for (let ii = 0;ii < numVaryings; ++ii) {
    const varying = gl.getTransformFeedbackVarying(program, ii);
    info[varying.name] = {
      index: ii,
      type: varying.type,
      size: varying.size
    };
  }
  return info;
}
function createUniformBlockSpecFromProgram(gl, program) {
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  const uniformData = [];
  const uniformIndices = [];
  for (let ii = 0;ii < numUniforms; ++ii) {
    uniformIndices.push(ii);
    uniformData.push({});
    const uniformInfo = gl.getActiveUniform(program, ii);
    uniformData[ii].name = uniformInfo.name;
  }
  [
    ["UNIFORM_TYPE", "type"],
    ["UNIFORM_SIZE", "size"],
    ["UNIFORM_BLOCK_INDEX", "blockNdx"],
    ["UNIFORM_OFFSET", "offset"]
  ].forEach(function(pair) {
    const pname = pair[0];
    const key = pair[1];
    gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
      uniformData[ndx][key] = value;
    });
  });
  const blockSpecs = {};
  const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
  for (let ii = 0;ii < numUniformBlocks; ++ii) {
    const name = gl.getActiveUniformBlockName(program, ii);
    const blockSpec = {
      index: gl.getUniformBlockIndex(program, name),
      usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
      usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
      size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
      uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
    };
    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
    blockSpecs[name] = blockSpec;
  }
  return {
    blockSpecs,
    uniformData
  };
}
function setUniformTree(tree, values) {
  for (const name in values) {
    const prop = tree[name];
    if (typeof prop === "function") {
      prop(values[name]);
    } else {
      setUniformTree(tree[name], values[name]);
    }
  }
}
function setUniforms(setters, ...args) {
  const actualSetters = setters.uniformSetters || setters;
  const numArgs = args.length;
  for (let aNdx = 0;aNdx < numArgs; ++aNdx) {
    const values = args[aNdx];
    if (Array.isArray(values)) {
      const numValues = values.length;
      for (let ii = 0;ii < numValues; ++ii) {
        setUniforms(actualSetters, values[ii]);
      }
    } else {
      for (const name in values) {
        const setter = actualSetters[name];
        if (setter) {
          setter(values[name]);
        }
      }
    }
  }
}
function createAttributeSetters(gl, program) {
  const attribSetters = {};
  const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
  for (let ii = 0;ii < numAttribs; ++ii) {
    const attribInfo = gl.getActiveAttrib(program, ii);
    if (isBuiltIn(attribInfo)) {
      continue;
    }
    const index = gl.getAttribLocation(program, attribInfo.name);
    const typeInfo = attrTypeMap[attribInfo.type];
    const setter = typeInfo.setter(gl, index, typeInfo);
    setter.location = index;
    attribSetters[attribInfo.name] = setter;
  }
  return attribSetters;
}
function setAttributes(setters, buffers) {
  for (const name in buffers) {
    const setter = setters[name];
    if (setter) {
      setter(buffers[name]);
    }
  }
}
function setBuffersAndAttributes(gl, programInfo, buffers) {
  if (buffers.vertexArrayObject) {
    gl.bindVertexArray(buffers.vertexArrayObject);
  } else {
    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
    if (buffers.indices) {
      gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
  }
}
function createProgramInfoFromProgram(gl, program) {
  const uniformSetters = createUniformSetters(gl, program);
  const attribSetters = createAttributeSetters(gl, program);
  const programInfo = {
    program,
    uniformSetters,
    attribSetters
  };
  if (isWebGL2(gl)) {
    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
  }
  return programInfo;
}
var notIdRE = /\s|{|}|;/;
function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const errors = [];
  shaderSources = shaderSources.map(function(source) {
    if (!notIdRE.test(source)) {
      const script = getElementById(source);
      if (!script) {
        const err = `no element with id: ${source}`;
        progOptions.errorCallback(err);
        errors.push(err);
      } else {
        source = script.text;
      }
    }
    return source;
  });
  if (errors.length) {
    return reportError(progOptions, "");
  }
  const origCallback = progOptions.callback;
  if (origCallback) {
    progOptions.callback = (err, program2) => {
      origCallback(err, err ? undefined : createProgramInfoFromProgram(gl, program2));
    };
  }
  const program = createProgramFromSources(gl, shaderSources, progOptions);
  if (!program) {
    return null;
  }
  return createProgramInfoFromProgram(gl, program);
}
function checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions) {
  for (const [name, program] of Object.entries(programs)) {
    const options = { ...programOptions };
    const spec = programSpecs[name];
    if (!Array.isArray(spec)) {
      Object.assign(options, spec);
    }
    const errors = getProgramErrors(gl, program, options.errorCallback);
    if (errors) {
      for (const program2 of Object.values(programs)) {
        const shaders = gl.getAttachedShaders(program2);
        gl.deleteProgram(program2);
        for (const shader of shaders) {
          if (!noDeleteShadersSet.has(shader)) {
            gl.deleteShader(shader);
          }
        }
      }
      return errors;
    }
  }
  return;
}
function createPrograms(gl, programSpecs, programOptions = {}) {
  const noDeleteShadersSet = new Set;
  const programs = Object.fromEntries(Object.entries(programSpecs).map(([name, spec]) => {
    const options = { ...programOptions };
    const shaders = Array.isArray(spec) ? spec : spec.shaders;
    if (!Array.isArray(spec)) {
      Object.assign(options, spec);
    }
    shaders.forEach(noDeleteShadersSet.add, noDeleteShadersSet);
    return [name, createProgramNoCheck(gl, shaders, options)];
  }));
  if (programOptions.callback) {
    waitForAllProgramsLinkCompletionAsync(gl, programs).then(() => {
      const errors2 = checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions);
      programOptions.callback(errors2, errors2 ? undefined : programs);
    });
    return;
  }
  const errors = checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions);
  return errors ? undefined : programs;
}
function createProgramInfos(gl, programSpecs, programOptions) {
  programOptions = getProgramOptions(programOptions);
  function createProgramInfosForPrograms(gl2, programs2) {
    return Object.fromEntries(Object.entries(programs2).map(([name, program]) => [name, createProgramInfoFromProgram(gl2, program)]));
  }
  const origCallback = programOptions.callback;
  if (origCallback) {
    programOptions.callback = (err, programs2) => {
      origCallback(err, err ? undefined : createProgramInfosForPrograms(gl, programs2));
    };
  }
  const programs = createPrograms(gl, programSpecs, programOptions);
  if (origCallback || !programs) {
    return;
  }
  return createProgramInfosForPrograms(gl, programs);
}
var createProgramsAsync = wrapCallbackFnToAsyncFn(createPrograms);
var createProgramInfosAsync = wrapCallbackFnToAsyncFn(createProgramInfos);
var TRIANGLES = 4;
var UNSIGNED_SHORT = 5123;
function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
  type = type === undefined ? TRIANGLES : type;
  const indices = bufferInfo.indices;
  const elementType = bufferInfo.elementType;
  const numElements = count === undefined ? bufferInfo.numElements : count;
  offset = offset === undefined ? 0 : offset;
  if (elementType || indices) {
    if (instanceCount !== undefined) {
      gl.drawElementsInstanced(type, numElements, elementType === undefined ? UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
    } else {
      gl.drawElements(type, numElements, elementType === undefined ? UNSIGNED_SHORT : bufferInfo.elementType, offset);
    }
  } else {
    if (instanceCount !== undefined) {
      gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    } else {
      gl.drawArrays(type, offset, numElements);
    }
  }
}
var DEPTH_COMPONENT = 6402;
var DEPTH_COMPONENT24 = 33190;
var DEPTH_COMPONENT32F = 36012;
var DEPTH24_STENCIL8 = 35056;
var DEPTH32F_STENCIL8 = 36013;
var RGBA4 = 32854;
var RGB5_A1 = 32855;
var RGB565 = 36194;
var DEPTH_COMPONENT16 = 33189;
var STENCIL_INDEX = 6401;
var STENCIL_INDEX8 = 36168;
var DEPTH_STENCIL = 34041;
var DEPTH_ATTACHMENT = 36096;
var STENCIL_ATTACHMENT = 36128;
var DEPTH_STENCIL_ATTACHMENT = 33306;
var attachmentsByFormat = {};
attachmentsByFormat[DEPTH_STENCIL] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT16] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT24] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT32F] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH24_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH32F_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
var renderbufferFormats = {};
renderbufferFormats[RGBA4] = true;
renderbufferFormats[RGB5_A1] = true;
renderbufferFormats[RGB565] = true;
renderbufferFormats[DEPTH_STENCIL] = true;
renderbufferFormats[DEPTH_COMPONENT16] = true;
renderbufferFormats[STENCIL_INDEX] = true;
renderbufferFormats[STENCIL_INDEX8] = true;
function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  multiplier = Math.max(0, multiplier);
  const width = canvas.clientWidth * multiplier | 0;
  const height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

// src/index.ts
window.startApp = () => {
  const state = {
    skew: 0.5,
    step: 0.00001,
    frame: null,
    color: [0.2, 0.2, 0.2, 1],
    reverse: false,
    playing: false
  };
  function getCanvasSize() {
    const body = document.body;
    const keys = ["scroll", "offset", "client"];
    const maxDimension = (dimension) => Math.max(...keys.map((key) => key + dimension).filter((attribute) => !!body[attribute]).map((attribute) => body[attribute]));
    return [maxDimension("Height"), maxDimension("Width")];
  }
  function makeCanvas([height, width]) {
    const canvas2 = document.createElement("canvas");
    canvas2.id = "canvas";
    canvas2.width = width;
    canvas2.height = height;
    return canvas2;
  }
  const canvas = makeCanvas(getCanvasSize());
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  const container = document.getElementById("canvas-container");
  if (!container) {
    console.error("Canvas container not found");
    return;
  }
  container.style.width = `${canvas.width}px`;
  container.style.height = `${canvas.height}px`;
  container.appendChild(canvas);
  const gl = canvas.getContext("webgl");
  if (!gl) {
    console.error("WebGL not supported");
    return;
  }
  const vsSource = `
    attribute float a_index;
    uniform vec2 u_resolution;
    uniform vec2 u_center;
    uniform float u_skew;

    void main() {
      float angle = u_skew * a_index;
      float r = 1.0 + angle;
      vec2 pos = vec2(r * cos(angle), r * sin(angle));
      
      // Add center offset
      vec2 p = u_center + pos;

      // Convert to clipspace
      vec2 zeroToOne = p / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      // Flip Y because WebGL 0,0 is bottom left, Canvas top left
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;
  const fsSource = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
      gl_FragColor = u_color;
    }
  `;
  const programInfo = createProgramInfo(gl, [vsSource, fsSource]);
  const MAX_POINTS = 1e5;
  const indices = new Float32Array(MAX_POINTS);
  for (let i = 0;i < MAX_POINTS; i++) {
    indices[i] = i;
  }
  const arrays = {
    a_index: { numComponents: 1, data: indices }
  };
  const bufferInfo = createBufferInfoFromArrays(gl, arrays);
  function draw() {
    if (!gl)
      return;
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const uniforms = {
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_center: [gl.canvas.width / 2, gl.canvas.height / 2],
      u_skew: state.skew,
      u_color: state.color
    };
    gl.useProgram(programInfo.program);
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
    setUniforms(programInfo, uniforms);
    const maxIterations = Math.floor(Math.max(gl.canvas.width, gl.canvas.height) * 2);
    const count = Math.min(maxIterations, MAX_POINTS);
    drawBufferInfo(gl, bufferInfo, gl.LINE_STRIP, count);
  }
  function stop() {
    if (state.frame !== null) {
      window.cancelAnimationFrame(state.frame);
      state.frame = null;
    }
  }
  function play() {
    draw();
    state.skew += state.step * (state.reverse ? -1 : 1);
    state.frame = window.requestAnimationFrame(play);
  }
  window.togglePlay = () => {
    if (state.playing) {
      state.playing = false;
      stop();
    } else {
      state.playing = true;
      play();
    }
  };
  window.flip = () => {
    state.reverse = !state.reverse;
  };
  window.togglePlay();
};
