export interface Options {
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
  toDataURL?: (format?: string) => void
  save?: (t: string) => void
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
