
export default class Canvas {
  constructor(canvas) {
    if (canvas) {
      this.canvas = canvas
    } else {
      this.canvas = document.createElement('canvas')
      document.body.appendChild(this.canvas)
    } 
  }
}