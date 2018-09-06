const EventEmitter = require('events');
const {
  createReadStream
} = require('fs');
class LineReader extends EventEmitter {

  /**
   *Creates an instance of LineReader.
   *@classdesc 创建一个lineReader 同过实例方法.on（‘newLine’, callback）获取读取的buffer
   * @param {PathLike | string} path 
   * @example 
   * const linreader = new LineReader ('./test.txt');
   * linreader.on('newLine', (bf) => console.log(bf.toString('utf8')) );
   * 
   */
  constructor(path) {
    super();
    this.path = path;
    this.rs = createReadStream(this.path);
    this.tempArr = [];
    const RETURN = 0x0D;
    const NEW_LINE = 0x0A;
    this.on('newListener', (type) => {
      if (type === 'newLine') {
        this.rs.on('readable', () => {
          let current;
          while (current = this.rs.read(1)) {
            switch (current[0]) {
              case RETURN:
                this.emitData();
                const next = this.rs.read(1);
                if (next && next.length && next[0] !== NEW_LINE) {
                  this.tempArr.push(next[0]);
                }
                break;
              case NEW_LINE:
                this.emitData();
                break;
              default:
                this.tempArr.push(current[0])
                break;
            }
          }
        });

      }
    });

    this.rs.on('end', () => {
      if (this.tempArr.length) {
        this.emitData();
        this.emit('end');
      }
    });
  }
  /**
   * @method 
   * @private
   */
  emitData() {
    this.emit('newLine', Buffer.from(this.tempArr));
    this.tempArr.length = 0;
  }
}
module.exports = LineReader;
