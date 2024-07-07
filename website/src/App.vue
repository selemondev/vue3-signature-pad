<!-- eslint-disable no-alert -->
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import type { CanvasSignatureRef } from '@selemondev/vue3-signature-pad'
import GithubIcon from './components/icons/GithubIcon.vue'
import PropsTable from './components/PropsTable.vue'
import EventsTable from './components/EventsTable.vue'

const options = ref({
  penColor: 'rgb(0,0,0)',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: 2,
  minWidth: 2,
})

const colors = [
  {
    color: 'rgb(51, 133, 255)',
  },

  {
    color: 'rgb(85, 255, 51)',
  },

  {
    color: 'rgb(255, 85, 51)',
  },
]
const signature = ref<CanvasSignatureRef>()
const signatureWaterMark = ref<CanvasSignatureRef>()

function handleUndo() {
  return signature.value?.undo && signature.value?.undo()
}

function handleUndoWaterMark() {
  return signatureWaterMark.value?.undo && signatureWaterMark.value?.undo()
}

function handleClearCanvas() {
  return signature.value?.clearCanvas && signature.value?.clearCanvas()
}

function handleClearCanvasWaterMark() {
  return signatureWaterMark.value?.clearCanvas && signatureWaterMark.value?.clearCanvas()
}

function handleSaveSignature() {
  return signature.value?.saveSignature && alert(signature.value?.saveSignature())
}

function handleSaveSignatureWaterMark() {
  return signatureWaterMark.value?.saveSignature && alert(signatureWaterMark.value?.saveSignature())
}

function handleAddWaterMark() {
  return signatureWaterMark.value?.addWaterMark && signatureWaterMark.value.addWaterMark({
    text: 'Selemondev',
    font: '20px Sans',
    style: 'all',
    fillStyle: 'blue',
    strokeStyle: 'blue',
    x: 830,
    y: 380,
    sx: 830,
    sy: 380,
  })
}

const installCmd = ref(`npm install @selemondev/vue3-signature-pad`)
const localImportSnippet = ref(`import { VueSignaturePad } from '@selemondev/vue3-signature-pad'`)
const nuxiSnippet = ref(`npx nuxi@latest module add @selemondev/nuxt-signature-pad`)
const vueSignaturePadTypes = ref(`export interface Options {
  penColor: string
  backgroundColor: string
}

export interface WaterMarkObj {
  text: string
  font: string
  style: string
  fillStyle: string
  strokeStyle: string
  x: number
  y: number
  sx: number
  sy: number
}

export interface SignatureRef {
  addEventListener?: (type: string, listener: (event: Event) => void, options?: { once?: boolean }) => void
  addWaterMark?: (obj: WaterMarkObj) => void
  fromDataURL?: (url: string) => void
  fromData?: (data: any[], options?: { clear: boolean }) => void
  toDataURL?: (format?: string) => void
  save?: (t: string) => void
  toData?: () => void
  clear?: () => void
  isEmpty?: () => void
  undo?: () => void
  off?: () => void
  on?: () => void
  minWidth?: number
  maxWidth?: number
  penColor?: string
}

export interface CanvasSignatureRef {
  isCanvasEmpty?: () => void
  saveSignature?: (format?: string) => void
  clearCanvas?: () => void
  undo?: () => void
  addWaterMark?: (obj: WaterMarkObj) => void
  fromDataURL?: (url: string) => void
}

export interface Props {
  options: Options
  width: string
  height: string
  minWidth?: number
  maxWidth?: number
  waterMark?: WaterMarkObj
  throttle?: number
  disabled?: boolean
  clearOnResize?: boolean
  defaultUrl?: string
}

export interface CanvasOptions {
  signaturePad: SignatureRef
  throttle: number
  minWidth?: number
  maxWidth?: number
  option: Options
  canvasUuid: string
}
`)

onMounted(() => {
  handleAddWaterMark()
})
</script>

<template>
  <div class="min-h-screen bg-stone-100/90">
    <div class="max-w-screen-lg px-4 py-6 mx-auto space-y-6">
      <div class="space-y-2 md:flex md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold">
            Vue 3 Signature Pad
          </h1>
          <div class="text-stone-600">
            A beautiful signature pad component for Vue 3.
          </div>
        </div>
        <div class="flex items-center gap-1">
          <a
            href="https://x.com/selemondev" target="_blank"
            class="bg-black text-xs font-semibold text-white px-2.5 py-1 rounded-md inline-flex items-center hover:bg-black/80 transition-all duration-200 ease-in"
          >
            <svg class="mr-1 size-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"
              />
            </svg>
            @selemondev
          </a>
          <a
            href="https://github.com/selemondev/vue3-signature-pad" target="_blank"
            class="bg-black text-xs font-semibold text-white px-2.5 py-1 rounded-md inline-flex items-center hover:bg-black/80 transition-all duration-200 ease-in"
          >
            <GithubIcon class="mr-1 size-4" />
            Github
          </a>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <div class="p-4 bg-white rounded-md">
          <div class="relative bg-gray-100 rounded-md">
            <VueSignaturePad
              ref="signature" height="400px" width="950px" :max-width="options.maxWidth"
              :min-width="options.minWidth" :options="{
                penColor: options.penColor, backgroundColor: options.backgroundColor,
              }"
            />

            <div class="absolute flex flex-col space-y-2 top-3 right-4">
              <button
                type="button" class="grid p-2 bg-white rounded-md shadow-md place-items-center"
                @click="handleUndo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 8H5V3m.291 13.357a8 8 0 1 0 .188-8.991"
                  />
                </svg>
              </button>
              <button
                type="button" class="grid p-2 bg-white rounded-md shadow-md place-items-center"
                @click="handleClearCanvas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14">
                  <path
                    fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                    d="M11.5 8.5h-9l-.76 3.8a1 1 0 0 0 .21.83a1 1 0 0 0 .77.37h8.56a1.002 1.002 0 0 0 .77-.37a1.001 1.001 0 0 0 .21-.83zm0-3a1 1 0 0 1 1 1v2h-11v-2a1 1 0 0 1 1-1H4a1 1 0 0 0 1-1v-2a2 2 0 1 1 4 0v2a1 1 0 0 0 1 1zm-3 8V11"
                  />
                </svg>
              </button>
              <button
                type="button" class="grid p-2 bg-white rounded-md shadow-md place-items-center"
                @click="handleSaveSignature"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#000"
                    d="M21 7v14H3V3h14zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between w-full p-3 bg-white rounded-md">
          <div>
            <h1 class="text-lg">
              Choose pen color
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <div v-for="color in colors" :key="color.color">
              <button
                type="button" :style="`background: ${color.color}`"
                class="grid w-8 h-8 rounded-full place-items-center" @click="options.penColor = color.color"
              >
                <p v-if="options.penColor === color.color">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48">
                    <path
                      fill="#ffffff" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </p>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between w-full p-3 bg-white rounded-md">
          <div>
            <h1 class="text-lg">
              Choose maximum pen line thickness
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <input v-model="options.maxWidth" type="range" :min="0" :max="10">
            <p> {{ options.maxWidth }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between w-full p-3 bg-white rounded-md">
          <div>
            <h1 class="text-lg">
              Choose minimum pen line thickness
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <input v-model="options.minWidth" type="range" :min="0" :max="10">
            <p> {{ options.minWidth }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <h2 class="text-lg font-semibold">
          Installation
        </h2>
        <VCodeBlock :code="installCmd" highlightjs lang="bash" theme="atom-one-light" />
      </div>
      <div class="space-y-1">
        <h3 class="font-semibold">
          Register it as a local component
        </h3>
        <p class="text-sm">
          Register it as a local component as shown below and you are good to go 🎉:
        </p>
        <VCodeBlock :code="localImportSnippet" highlightjs lang="javascript" theme="atom-one-light" />
      </div>

      <div class="space-y-1">
        <h3 class="font-semibold">
          Usage
        </h3>

        <p class="text-sm">
          You can get the svgs from the <a href="https://icones.js.org/" target="_blank" class="text-blue-500 underline transition-all duration-200 ease-in hover:text-blue-600">Icones</a> library.
        </p>

        <VCodeBlock
          code="<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { VueSignaturePad } from '@selemondev/vue3-signature-pad'
import type { CanvasSignatureRef } from '@selemondev/vue3-signature-pad'

const options = ref({
  penColor: 'rgb(0,0,0)',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: 2,
  minWidth: 2,
})

const colors = [
  {
    color: 'rgb(51, 133, 255)',
  },
  {
    color: 'rgb(85, 255, 51)',
  },
  {
    color: 'rgb(255, 85, 51)',
  },
]
const signature = ref<CanvasSignatureRef>()

function handleUndo() {
  return signature.value?.undo && signature.value?.undo()
}

function handleClearCanvas() {
  return signature.value?.clearCanvas && signature.value?.clearCanvas()
}

function handleSaveSignature() {
  return signature.value?.saveSignature && alert(signature.value?.saveSignature())
}

</script>

<template>
  <div class='flex flex-col space-y-2'>
    <div class='p-4 bg-white rounded-md'>
      <div class='relative bg-gray-100 rounded-md'>
        <VueSignaturePad
          ref='signature'
          height='400px'
          width='950px'
          :max-width='options.maxWidth'
          :min-width='options.minWidth'
          :options='{
            penColor: options.penColor,
            backgroundColor: options.backgroundColor,
          }'
        />

        <div class='absolute flex flex-col space-y-2 top-3 right-4'>
          <button
            type='button'
            class='grid p-2 bg-white rounded-md shadow-md place-items-center'
            @click='handleUndo'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path
                fill='none'
                stroke='#000'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M10 8H5V3m.291 13.357a8 8 0 1 0 .188-8.991'
              />
            </svg>
          </button>
          <button
            type='button'
            class='grid p-2 bg-white rounded-md shadow-md place-items-center'
            @click='handleClearCanvas'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 14 14'
            >
              <path
                fill='none'
                stroke='#000'
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M11.5 8.5h-9l-.76 3.8a1 1 0 0 0 .21.83a1 1 0 0 0 .77.37h8.56a1.002 1.002 0 0 0 .77-.37a1.001 1.001 0 0 0 .21-.83zm0-3a1 1 0 0 1 1 1v2h-11v-2a1 1 0 0 1 1-1H4a1 1 0 0 0 1-1v-2a2 2 0 1 1 4 0v2a1 1 0 0 0 1 1zm-3 8V11'
              />
            </svg>
          </button>
          <button
            type='button'
            class='grid p-2 bg-white rounded-md shadow-md place-items-center'
            @click='handleSaveSignature'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path
                fill='#000'
                d='M21 7v14H3V3h14zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class='flex items-center justify-between w-full p-3 bg-white rounded-md'>
      <div>
        <h1 class='text-lg'>Choose pen color</h1>
      </div>
      <div class='flex items-center space-x-4'>
        <div v-for='color in colors' :key='color.color'>
          <button
            type='button'
            :style='{ background: color.color }'
            class='grid w-8 h-8 rounded-full place-items-center'
            @click='options.penColor = color.color'
          >
            <p v-if='options.penColor === color.color'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 48 48'
              >
                <path
                  fill='#ffffff'
                  fill-rule='evenodd'
                  stroke='#ffffff'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='4'
                  d='m4 24l5-5l10 10L39 9l5 5l-25 25z'
                  clip-rule='evenodd'
                />
              </svg>
            </p>
          </button>
        </div>
      </div>
    </div>
    <div class='flex items-center justify-between w-full p-3 bg-white rounded-md'>
      <div>
        <h1 class='text-lg'>Choose maximum pen line thickness</h1>
      </div>
      <div class='flex items-center space-x-4'>
        <input v-model='options.maxWidth' type='range' :min='0' :max='10' />
        <p>{{ options.maxWidth }}</p>
      </div>
    </div>
    <div class='flex items-center justify-between w-full p-3 bg-white rounded-md'>
      <div>
        <h1 class='text-lg'>Choose minimum pen line thickness</h1>
      </div>
      <div class='flex items-center space-x-4'>
        <input v-model='options.minWidth' type='range' :min='0' :max='10' />
        <p>{{ options.minWidth }}</p>
      </div>
    </div>
  </div>
</template>"
          highlightjs
          lang="javascript"
          theme="atom-one-light"
        />
      </div>

      <div class="space-y-1">
        <h3 class="font-semibold">
          Nuxt 3
        </h3>
        <p class="text-sm">
          If you are using Nuxt 3, you can simply install it by using nuxi as shown below and also add TypeScript as a dev dependency:
        </p>
        <VCodeBlock :code="nuxiSnippet" highlightjs lang="typescript" theme="atom-one-light" />
        <VCodeBlock code="npm install --save-dev Typescript" highlightjs lang="typescript" theme="atom-one-light" />
      </div>

      <div class="space-y-3">
        <h3 class="font-semibold">
          Props
        </h3>
        <PropsTable />
      </div>

      <div class="space-y-3">
        <h3 class="font-semibold">
          Events
        </h3>
        <EventsTable />
      </div>

      <div class="space-y-3">
        <h3 class="font-semibold">
          TypeScript
        </h3>
        <p class="text-sm">
          If you are using TypeScript, below are the types that can be imported from `@selemondev/vue3-signature-pad` as shown below:
        </p>
        <VCodeBlock code="import type { CanvasOptions, Props, WaterMarkObj, ..... } from @selemondev/vue3-signature-pad" highlightjs lang="typescript" theme="atom-one-light" />
        <VCodeBlock
          :code="vueSignaturePadTypes" highlightjs lang="typescript" theme="atom-one-light"
        />
      </div>

      <div class="space-y-3">
        <h3 class="font-semibold">
          Example with Watermark
        </h3>
        <div class="flex flex-col space-y-2">
          <div class="p-4 bg-white rounded-md">
            <div class="relative bg-gray-100 rounded-md">
              <VueSignaturePad
                ref="signatureWaterMark" height="400px" width="950px" :max-width="options.maxWidth"
                :min-width="options.minWidth" :options="{
                  penColor: options.penColor, backgroundColor: options.backgroundColor,
                }"
              />

              <div class="absolute flex flex-col space-y-2 top-3 right-4">
                <button
                  type="button" class="grid p-2 bg-white rounded-md shadow-md place-items-center"
                  @click="handleUndoWaterMark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 8H5V3m.291 13.357a8 8 0 1 0 .188-8.991"
                    />
                  </svg>
                </button>
                <button
                  type="button" class="grid p-2 bg-white rounded-md shadow-md place-items-center"
                  @click="handleClearCanvasWaterMark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14">
                    <path
                      fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                      d="M11.5 8.5h-9l-.76 3.8a1 1 0 0 0 .21.83a1 1 0 0 0 .77.37h8.56a1.002 1.002 0 0 0 .77-.37a1.001 1.001 0 0 0 .21-.83zm0-3a1 1 0 0 1 1 1v2h-11v-2a1 1 0 0 1 1-1H4a1 1 0 0 0 1-1v-2a2 2 0 1 1 4 0v2a1 1 0 0 0 1 1zm-3 8V11"
                    />
                  </svg>
                </button>
                <button
                  type="button" class="grid p-2 bg-white rounded-md shadow-md place-items-center"
                  @click="handleSaveSignatureWaterMark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#000"
                      d="M21 7v14H3V3h14zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between w-full p-3 bg-white rounded-md">
            <div>
              <h1 class="text-lg">
                Choose pen color
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <div v-for="color in colors" :key="color.color">
                <button
                  type="button" :style="{ background: color.color }"
                  class="grid w-8 h-8 rounded-full place-items-center" @click="options.penColor = color.color"
                >
                  <p v-if="options.penColor === color.color">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48">
                      <path
                        fill="#ffffff" fill-rule="evenodd" stroke="#ffffff" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between w-full p-3 bg-white rounded-md">
            <div>
              <h1 class="text-lg">
                Choose maximum pen line thickness
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <input v-model="options.maxWidth" type="range" :min="0" :max="10">
              <p> {{ options.maxWidth }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between w-full p-3 bg-white rounded-md">
            <div>
              <h1 class="text-lg">
                Choose minimum pen line thickness
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <input v-model="options.minWidth" type="range" :min="0" :max="10">
              <p> {{ options.minWidth }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
