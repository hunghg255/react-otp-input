# reactjs-otp-input

[![npm version](https://badge.fury.io/js/reactjs-otp-input.svg)](https://badge.fury.io/js/reactjs-otp-input) [![npm](https://img.shields.io/npm/dw/reactjs-otp-input.svg?logo=npm)](https://www.npmjs.com/package/reactjs-otp-input) [![npm](https://img.shields.io/bundlephobia/minzip/reactjs-otp-input)](https://www.npmjs.com/package/reactjs-otp-input)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

A fully customizable, one-time password input component for the web built with React.

![see here](https://media.giphy.com/media/lN98dFU6h3oP0wWS5x/giphy.gif)

[Live Demo](https://reactjs-otp-input-demo.vercel.app/)

## Installation

[![NPM](https://nodei.co/npm/reactjs-otp-input.png?compact=true)](https://nodei.co/npm/reactjs-otp-input/)


#### To install the latest stable version:

```
npm install --save reactjs-otp-input@latest
```

#### Basic usage:

```jsx
import React, { Component } from 'react';
import { OtpInput } from 'react-otp-input';

export default const App {
  const [otp, setOtp] = useState('');

  const handleChange = (otp) => setOtp({ otp });

  return <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />;
}
```

## API

<table>
  <tr>
    <th>Name<br/></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>numInputs</td>
    <td>number</td>
    <td>true</td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td>true</td>
    <td>console.log</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>string / number</td>
    <td>true</td>
    <td>''</td>
    <td>The value of the OTP passed into the component.</td>
  </tr>
    <tr>
     <td>placeholder</td>
     <td>string</td>
     <td>false</td>
     <td>none</td>
     <td>Specify an expected value of each input. The length of this string should be equal to <code>numInputs</code>.</td>
   </tr>
  <tr>
    <td>separator</td>
    <td>component<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input.</td>
  </tr>
  <tr>
    <td>containerStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to container of inputs.</td>
  </tr>
  <tr>
    <td>inputStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input.</td>
  </tr>
  <tr>
    <td>focusStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to inputs on focus.</td>
  </tr>
  <tr>
    <td>isDisabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
  </tr>
  <tr>
    <td>disabledStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when disabled.</td>
  </tr>
  <tr>
    <td>hasErrored</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Indicates there is an error in the inputs.</td>
  </tr>
  <tr>
    <td>errorStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when errored.</td>
  </tr>
  <tr>
    <td>shouldAutoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on initial page load.</td>
  </tr>
  <tr>
    <td>isInputNum</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Restrict input to only numbers.</td>
  </tr>
  <tr>
    <td>isInputSecure</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Masks input characters.</td>
  </tr>
  <tr>
    <td>data-cy</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
  <tr>
    <td>data-testid</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
</table>

## Development

#### To run the development server:

```
npm run dev
```

### Support auto fill on mobile
