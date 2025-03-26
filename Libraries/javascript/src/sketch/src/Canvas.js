
export default class Canvas {
  constructor(canvas) {
    if (canvas) {
      this.canvas = canvas
    } else {
      this.canvas = document.createElement('canvas')
      document.body.appendChild(this.canvas)
    }
    this.ctx = this.canvas.getContext('2d')
  }
  set style({stroke, fill, lineWidth}) {
      if (!this._style) this._style = {}
      if (stroke) {
        this.ctx.strokeStyle = stroke
        this._style.stroke = stroke
      }
      if (fill) {
        this.ctx.fillStyle = fill
        this._style.fill = fill
      }
      if (lineWidth) {
        this.ctx.lineWidth = lineWidth
        this._style.lineWidth = lineWidth
      }
  }
  get style() {
      return this._style
  }
  
  
}