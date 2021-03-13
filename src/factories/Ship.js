const Ship = function (name, position) {
  return {
    name,
    length: position.length,
    position,
    hits: [],
    hit(point) {
      this.hits.push(point);
    },
    isSunk() {
      return this.position.every((point) => this.hits.includes(point));
    },
  };
};

export default Ship;
