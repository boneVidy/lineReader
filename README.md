# lineReader
```js
const LineReader = require('linereader');
const rd = new LineReader('./test.txt');
rd.on('newLine', (bf)=> {
  console.log(bf.toString('utf8'));
})
```