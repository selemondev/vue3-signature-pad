<p align="center">
 <h1 align="center">
  Vue 3 Signature Pad
 </h1>
</p>


A Vue 3 based smooth signature drawing component.

## Installation

```bash
npm install @selemondev/vue3-signature-pad
```

## Usage 

```ts
<script setup lang="ts">
import { VueSignaturePad } from "@selemondev/vue3-signature-pad"
import { onMounted, ref } from "vue";

const state = ref({
  options: {
    penColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)'
  },
  disabled: false,
})

const colors = [
  {
    color: 'rgb(51, 133, 255)'
  },

  {
    color: 'rgb(85, 255, 51)'
  },

  {
    color: 'rgb(255, 85, 51)'
  }
];

const activeColor = ref();

const signature = ref();

const handleSave = (t: string) => {
  return console.log(signature.value.undo())
};
const handleClear = (t: string) => {
  return signature.value.clearCanvas()
};
const handleUndo = (t: string) => {
  return signature.value.undo()
};

const handleDisabled = () => {
    return state.disabled = !state.disabled;
};

const handleFromDataURL = (url: string) => {
  return signature.value.fromDataURL(url);
};

const handleAddWaterMark = () => {
    return signature1.value.addWaterMark({
    text: "Selemondev",          // watermark text, > default ''
    font: "20px Arial",         // mark font, > default '20px sans-serif'
    style: 'all',               // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
    fillStyle: "red",           // fillcolor, > default '#333'
    strokeStyle: "blue",      // strokecolor, > default '#333'
    x: 100,                     // fill positionX, > default 20
    y: 200,                     // fill positionY, > default 20
    sx: 100,                    // stroke positionX, > default 40
    sy: 200                     // stroke positionY, > default 40
  });
}
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div class="flex flex-col items-center space-y-4">
      <div class="bg-gray-100 p-6">
        <VueSignaturePad ref="signature" height="400px" width="1280px" :maxWidth="2" :minWidth="2"
        :disabled="state.disabled"
          :options="{
            penColor: state.options.penColor, backgroundColor: state.options.backgroundColor
          }" />
      </div>

      <button type="button" @click="handleSave('image/jpeg')">Save</button>
       <button type="button" @click="handleClear">Clear</button>
       <button type="button" @click="handleUndo">Undo</button>
       <button type="button" @click="handleDisabled">Disabled</button>
       <button type="button" @click="handleFromDataURL('https://github.com/selemondev.png')">
       FronData URL
       </button>
       <button type="button" @click="handleAddWaterMark">Add watermark</button>
    </div>
  </div>
</template>
```

## Props 


| name          |     type      |           default         |       description             |
|:-------------:|:-------------:|:-------------------------:|   :-----------------:         |
| option        | `Object`     | {penColor:"rgb(0, 0, 0)", backgroundColor:"rgb(255,255,255)"} |     penColor and backgroundColor  |
|        width      | `String`      |         "100%"            | Pad width  |
|        height     | `String`      |         "100%"            | Pad height |
|        throttle   | `Number`      |         16                | Draw the next point at most once per every x milliseconds |
|        maxWidth   | `Number`      |         2                 | Maximum thickness of the pen line |
|        minWidth   | `Number`      |         2                 | Minimum thickness of the pen line |
|  clearOnResize  | `Boolean`     |          false          |Clear canvas on window resize|
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

