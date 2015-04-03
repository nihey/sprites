function Sprite(options) {
  this.canvas = options.canvas;
  this.context = this.canvas.getContext('2d');
  this.image = options.image;

  this.rows = options.rows;
  this.columns = options.columns;

  this.rowIndex = options.rowIndex || 0;
  this.columnIndex = options.columnIndex || 0;

  this.rowFrequency = options.rowFrequency || 0;
  this.columnFrequency = options.columnFrequency || 0;

  this._count = 0;
}

/*
 *  Private API
 */

Sprite.prototype._updateSprite = function(dimension) {
  if (this._count % this[dimension + 'Frequency'] === 0) {
    this[dimension + 'Index'] += 1;
    this[dimension + 'Index'] = this[dimension + 'Index'] % this[dimension + 's'];
  }
}

Sprite.prototype._getClipRectangle = function() {
  var blockWidth = this.image.width / this.columns;
  var blockHeight = this.image.height / this.rows;
  return {
    x: this.columnIndex * blockWidth,
    y: this.rowIndex * blockHeight,
    width: blockWidth,
    height: blockHeight,
  };
}

/*
 *  Public API
 */

Sprite.prototype.draw = function(x, y) {
  this._updateSprite('row');
  this._updateSprite('column');

  var clip = this._getClipRectangle();
  this.context.drawImage(this.image, clip.x, clip.y, clip.width, clip.height,
                         x, y, clip.width, clip.height);

  this._count += 1;
}
