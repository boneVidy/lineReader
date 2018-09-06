# lineReader
`const LineReader = require('./');
const rd = new LineReader('./test.txt');
rd.on('newLine', (bf)=> {
  console.log(bf.toString('utf8'));
})`
