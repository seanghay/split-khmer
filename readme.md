# Split Khmer words

Split Khmer sentence into an array of words.

[![test](https://github.com/seanghay/split-khmer/actions/workflows/test.yml/badge.svg)](https://github.com/seanghay/split-khmer/actions/workflows/test.yml)
[![version](https://img.shields.io/npm/v/split-khmer)](https://npmjs.com/package/split-khmer)


## Installation

```
npm i split-khmer
```

## Usage

```js
import { split } from 'split-khmer'

const slices = split('កូនខ្មែរអាចធ្វើបាន');

console.log(slices);
// [ 'កូន', 'ខ្មែរ', 'អាច', 'ធ្វើ', 'បាន' ]

```



## License 

MIT
