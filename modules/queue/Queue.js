const _Node = require('./node');
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }

    this.last = node;
  }

  dequeue() {
    if (this.first === null) {
      return null;
    }

    const node = this.first;
    this.first = this.first.next;

    if (node === this.last) {
      this.last = null;
    }
    return node.value; 
  }

  show() {
    if (this.first === null) {
      return null;
    }
    return this.first.value;
  }

  all() {
    let temp= this.first;
    let all = [];
    if (temp === null) {
      return null;
    } 
    while(temp){
      all.push(temp.value);
      temp = temp.next;
    }
    return all;
  }
}

module.exports = Queue;
