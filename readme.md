# Split Khmer words

Split Khmer sentence into an array of words.

[![test](https://github.com/seanghay/split-khmer/actions/workflows/test.yml/badge.svg)](https://github.com/seanghay/split-khmer/actions/workflows/test.yml)
[![version](https://img.shields.io/npm/v/split-khmer)](https://npmjs.com/package/split-khmer)


## Installation

```
npm i split-khmer
```

## Usage ESM

```js

// Node.js 16+ ESM
import { split } from 'split-khmer'

// Browser Module
import { split } from 'https://unpkg.com/split-khmer@latest/dist/index.mjs'

// CommonJS
const { split } = require('split-khmer') 

const values = split('កូនខ្មែរអាចធ្វើបាន');

console.log(values);
// [ 'កូន', 'ខ្មែរ', 'អាច', 'ធ្វើ', 'បាន' ]

```



## License 

MIT
