<template>
  <div class="overflow-x-auto">
    <table class="bg-white border table-auto">
    <thead>
      <tr>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Name
        </th>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Params
        </th>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Description
        </th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          saveSignature
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          format (() / image/jpeg / image/svg)
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Save image as PNG/JPEG or SVG
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          clearCanvas
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300" />
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Clear canvas
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          isCanvasEmpty
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300" />
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Returns true if the canvas is empty, otherwise it returns false
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          undo
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300" />
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Remove the last drawing
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          addWaterMark
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          {}
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Add waterMark
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          fromDataURL
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          (url)
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Draw signature image from data URL
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          handleBeginStroke
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300" />
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Emits `Signature started` when the user starts drawing on the canvas
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          handleEndStroke
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300" />
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Emits `Signature ended` when the user stops drawing on the canvas
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          handleBeforeUpdateStroke
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300" />
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Emits `Signature before update` before the drawing gets updated on the canvas
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          handleAfterUpdateStroke
        </td>
        <td class="px-6 py-4 whitespace-no-wrap" />
        <td class="px-6 py-4 whitespace-no-wrap">
          Emits `Signature after update` after the drawing gets updated on the canvas
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
