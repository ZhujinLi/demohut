!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=192)}({192:function(e,r,t){"use strict";t.r(r);function n(e,r,t){const n=e.createShader(r);return e.shaderSource(n,t),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)}function o(e,r){const t=document.querySelector(e).getContext("webgl");null===t&&alert("Unable to initialize WebGL. Your browser or machine may not support it."),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!1),t.enable(t.BLEND),r.pma?t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA):t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA);const o=function(e){const r=n(e,e.VERTEX_SHADER,"\n    attribute vec4 aVertexPosition;\n\n    varying highp vec2 vTextureCoord;\n\n    void main() {\n      gl_Position = vec4(aVertexPosition.xy, 0.0, 1.0);\n      vTextureCoord = aVertexPosition.xy * 0.5 + 0.5;\n    }\n  "),t=n(e,e.FRAGMENT_SHADER,"\n    varying highp vec2 vTextureCoord;\n\n    uniform sampler2D uSampler;\n\n    void main() {\n      gl_FragColor = texture2D(uSampler, vTextureCoord);\n    }\n  "),o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,t),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?{program:o,attribLocations:{vertexPosition:e.getAttribLocation(o,"aVertexPosition")},uniformLocations:{projectionMatrix:e.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(o,"uModelViewMatrix"),uSampler:e.getUniformLocation(o,"uSampler")}}:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(o)),null)}(t);t.useProgram(o.program);const i=function(e){const r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,1,1,1,-1,-1,1,-1]),e.STATIC_DRAW),{position:r}}(t),a=t.FLOAT;t.bindBuffer(t.ARRAY_BUFFER,i.position),t.vertexAttribPointer(o.attribLocations.vertexPosition,2,a,!1,0,0),t.enableVertexAttribArray(o.attribLocations.vertexPosition);const u=function(e,r){let t;t=r.bleeding?new Uint8Array([255,0,0,0,255,0,0,255,255,0,0,255,255,0,0,0]):r.green?r.pma?new Uint8Array([0,25,0,25,255,0,0,255,255,0,0,255,0,25,0,25]):new Uint8Array([0,255,0,25,255,0,0,255,255,0,0,255,0,255,0,25]):new Uint8Array([0,0,0,0,255,0,0,255,255,0,0,255,0,0,0,0]);const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const o=e.RGBA,i=e.RGBA,a=e.UNSIGNED_BYTE;return e.texImage2D(e.TEXTURE_2D,0,o,2,2,0,i,a,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.generateMipmap(e.TEXTURE_2D),n}(t,r);t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,u),t.uniform1i(o.uniformLocations.uSampler,0),t.drawArrays(t.TRIANGLE_STRIP,0,4)}o("#view-bad",{}),o("#view-bleeding",{bleeding:!0}),o("#view-green-bad",{green:!0}),o("#view-green-pma",{green:!0,pma:!0})}});