<p align="center">
 <h1 align="center">
  Vue 3 Signature Pad
 </h1>
</p>

<!-- automd:badges color="green" license name="@selemondev/vue3-signature-pad" codecov bundlephobia packagephobia -->
[![CI](https://github.com/selemondev/vue3-signature-pad/actions/workflows/ci.yml/badge.svg)](https://github.com/selemondev/vue3-signature-pad/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@selemondev/vue3-signature-pad?color=green)](https://npmjs.com/package/@selemondev/vue3-signature-pad)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@selemondev/vue3-signature-pad?color=green)](https://bundlephobia.com/package/@selemondev/vue3-signature-pad)
[![install size](https://img.shields.io/npm/dm/%40selemondev%2Fvue3-signature-pad
)](https://packagephobia.com/result?p=@selemondev/vue3-signature-pad)
[![codecov](https://img.shields.io/codecov/c/gh/selemondev/vue3-signature-pad?color=green)](https://codecov.io/gh/selemondev/vue3-signature-pad)
[![license](https://img.shields.io/github/license/selemondev/vue3-signature-pad?color=green)](https://github.com/selemondev/vue3-signature-pad/blob/main/LICENSE)

<!-- /automd -->

## Installation

<!-- automd:pm-install name="@selemondev/vue3-signature-pad" -->

```sh
# ✨ Auto-detect
npx nypm install @selemondev/vue3-signature-pad

# npm
npm install @selemondev/vue3-signature-pad

# yarn
yarn add @selemondev/vue3-signature-pad

# pnpm
pnpm install @selemondev/vue3-signature-pad

# bun
bun install @selemondev/vue3-signature-pad

# deno
deno install @selemondev/vue3-signature-pad
```

<!-- /automd -->

## Usage

```vue
<script setup lang="ts">
import { VueSignaturePad } from "@selemondev/vue3-signature-pad";
import type { Signature } from "@selemondev/vue3-signature-pad";
import { ref, useTemplateRef } from "vue";

const state = ref({
    disabled: false,
});

const signature = useTemplateRef<Signature>("signature");

function dataURLToBlob(dataURL: string) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(";base64,");
    const contentType = parts[0]?.split(":")[1];
    const raw = window.atob(parts[1]!);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
function handleSave(dataURL: string, downloadFormat: string) {
    if (signature.value?.isCanvasEmpty())
        return alert("Signature cannot be empty!");
    const _data_url = signature.value?.toDataURL(dataURL);
    const blob = dataURLToBlob(_data_url!);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = downloadFormat;

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
function handleClear() {
    return signature.value?.clearCanvas();
}
function handleUndo() {
    return signature.value?.undo();
}
</script>

<template>
    <div class="grid place-items-center w-full min-h-screen">
        <div class="flex flex-col items-center space-y-4">
            <div class="bg-gray-100 p-6">
                <VueSignaturePad
                    ref="signature"
                    height="400px"
                    width="1280px"
                    :max-width="2"
                    :min-width="2"
                    :disabled="state.disabled"
                />
            </div>

            <button type="button" @click="handleSave('image/jpeg', 'signature-pad.jpg')">
                Save
            </button>
            <button type="button" @click="handleClear">Clear</button>
            <button type="button" @click="handleUndo">Undo</button>
        </div>
    </div>
</template>

```

## Props

| name          |     type      |           default         |       description             |
|:-------------:|:-------------:|:-------------------------:|   :-----------------:         |
| option        | `Object`     | {penColor:"oklch(0.0% 0.000 0.0)", backgroundColor:"oklch(100.0% 0.000 89.9)"} |     penColor and backgroundColor  |
|        width      | `String`      |         "100%"            | Pad width  |
|        height     | `String`      |         "100%"            | Pad height |
|        throttle   | `Number`      |         16                | Draw the next point at most once per every x milliseconds |
|        maxWidth   | `Number`      |         2                 | Maximum thickness of the pen line |
|        minWidth   | `Number`      |         2                 | Minimum thickness of the pen line |
|  clearOnResize  | `Boolean`     |          false          |Clear canvas on window resize|
|  scaleOnResize  | `Boolean`     |          true          |When true, scales the signature image to fit new canvas dimensions on resize. When false, redraws using original stroke data without distortion (useful for orientation changes on mobile devices)|
|  waterMark  | `Object`     |          {}          |Add addWaterMark |
|  disabled  | `Boolean`     |          false          |Disable canvas |
|  defaultUrl  | `String`     |          ""          |Show image by default |

## Events

| name              |  params                                       | description  |
| :-------------:   |:-------------:                                |:-------------:|
| saveSignature              | 	        format (() / image/jpeg / image/svg) | Save image as PNG/JPEG or SVG |
| clearCanvas             |                                   			| Clear canvas |
| isCanvasEmpty           |                                   			| Returns true if the canvas is empty, otherwise it returns false |
| undo             |                                   			| Remove the last drawing |
| addWaterMark      |           {}     | Add waterMark
| fromDataURL      |          (url)    | Draw signature image from data URL.
| handleBeginStroke |                  | Emits `Signature started` when the user starts drawing on the canvas.
| handleEndStroke |                  | Emits `Signature ended` when the user stops drawing on the canvas.
| handleBeforeUpdateStroke |                  | Emits `Signature before update` before the drawing gets updated on the canvas.
| handleAfterUpdateStroke |                  | Emits `Signature after update` after the drawing gets updated on the canvas.

## Credits go to these amazing projects

- [Signature Pad](https://github.com/szimek/signature_pad)

- [Vue 3 Signature](https://github.com/WangShayne/vue3-signature) - Vue 3 Signature Pad is an enhanced version of Vue 3 Signature with type safety and more options.

## License

[MIT](./LICENSE) © [Selemon Brahanu](https://selemon.dev)
