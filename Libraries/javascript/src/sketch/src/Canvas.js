
export default class Canvas {
  // Constructor
  constructor(canvas) {
    if (canvas) {
      this.canvas = canvas
    } else {
      this.canvas = document.createElement('canvas')
      document.body.appendChild(this.canvas)
    }
    this.ctx = this.canvas.getContext('2d')
    this.canvas.style.position = 'absolute'
    this.backgroundColor = 'black'
    this.clear()
  }
  // Setters and Getters
  set style({stroke, fill, lineWidth, globalAlpha, globalCompositeOperation}) {
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
      if (globalAlpha) {
        this.ctx.globalAlpha = globalAlpha
        this._style.globalAlpha = globalAlpha
      }
      if (globalCompositeOperation) {
        this.ctx.globalCompositeOperation = globalCompositeOperation
        this._style.globalCompositeOperation = globalCompositeOperation
      }
  }
  get style() {
      return this._style
  }
  set bounds({x, y, width, height}) {
    if (!this._bounds) this._bounds = {x: 0, y: 0, width: 0, height: 0}
    if (x) {
      this._bounds.x = x
      this.canvas.style.left = x + 'px'
    }
    if (y) {
      this._bounds.y = y
      this.canvas.style.top = y + 'px'
    }
    if (width) {
      this._bounds.width = width
      this.canvas.width = width
    }
    if (height) {
      this._bounds.height = height
      this.canvas.height = height
    }
  }
  get bounds() {
    return this._bounds
  }
  set backgroundColor(color) {
    if (!this._backgroundColor) this._backgroundColor = 'white'
    if (color) {
      this._backgroundColor = color
    }
  }
  get backgroundColor() {
    return this.ctx.fillStyle
  }
  // Methods
  fullscreen() {
    let width = window.innerWidth
    let height = window.innerHeight
    this.bounds = {x: 0, y: 0, width: width, height: height}
    this.clear()
  }
  clear() {
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}