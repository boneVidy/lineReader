# lineReader
`const LineReader = require('./');\n
const rd = new LineReader('./test.txt');\n
rd.on('newLine', (bf)=> {\n
  console.log(bf.toString('utf8'));\n
})`
