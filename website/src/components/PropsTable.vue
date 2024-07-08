<template>
  <div class="overflow-x-auto">
    <table class="rounded-md bg-white">
    <thead>
      <tr>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Name
        </th>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Type
        </th>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Default
        </th>
        <th class="px-6 py-3 border-b font-sans border-gray-300 text-left leading-4 tracking-wider">
          Description
        </th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          option
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Object
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          {penColor:"rgb(0, 0, 0)",
          backgroundColor:"rgb(255,255,255)"}
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          penColor and backgroundColor
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          width
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          String
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          "100%"
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Pad width
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          height
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          String
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          "100%"
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Pad height
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          throttle
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Number
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          16
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Draw the next point at most once per
          every x milliseconds
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          maxWidth
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Number
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          2
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Maximum thickness of the pen line
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          minWidth
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Number
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          2
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Minimum thickness of the pen line
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          clearOnResize
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Boolean
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          false
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Clear canvas on window resize
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          waterMark
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Object
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          {}
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Add addWaterMark
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          disabled
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Boolean
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          false
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Disable canvas
        </td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          defaultUrl
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          String
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          ""
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
          Show image by default
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
