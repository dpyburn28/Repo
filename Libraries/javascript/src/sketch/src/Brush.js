
export default class Brush {
    // Constructor - Default Brush
    constructor(canvas) {
        this.canvas = canvas
        this.stroke = "blue"
        this.fill = "yellow"
        this.thickness = 1
        this.setStyle()
    }
    // Setters & Getters
    set stroke(color) {
        if (!this._stroke) { this._stroke = "white" }
        this._stroke = color
    }
    get stroke() {
        return this._stroke
    }
    set fill(color) {
        if (!this._fill) { this._fill = "white" }
        this._fill = color
    }
    get fill() {
        return this._fill
    }
    set thickness(thickness) {
        if (!this._thickness) { this._thickness = 1 }
        this._thickness = thickness
    }
    get thickness() {
        return this._thickness
    }
    // Methods
    setStyle() {
        this.canvas.style = {
            stroke: this.stroke ? this.stroke : false,
            fill: this.fill ? this.fill : false, 
            lineWidth: this.thickness ? this.thickness : 0
        }
    }
    drawPoint(x, y, r) {
        const ctx = this.canvas.ctx
        this.setStyle()
        ctx.beginPath()
        ctx.ellipse(x, y, r, r, 0, Math.PI*2, 0)
        if (this.fill) ctx.fill()
        if (this.stroke && this.thickness > 0) ctx.stroke()
        ctx.closePath()
    }
    drawPath(points, closed) {
        const ctx = this.canvas.ctx
        this.setStyle()
        ctx.beginPath()
        let p0 = points.shift()
        ctx.moveTo(p0.x, p0.y)
        points.forEach(p => {
            ctx.lineTo(p.x, p.y)
        });
        if (closed) ctx.closePath()
        if (this.fill) ctx.fill()
        if (this.stroke && this.thickness > 0) ctx.stroke()
        ctx.closePath()
    }
    drawEllipse(x, y, w, h, shear = 0) {
        const ctx = this.canvas.ctx
        this.setStyle()
        ctx.beginPath()
        ctx.ellipse(x, y, w, h, shear, Math.PI*2, 0)
        if (this.fill) ctx.fill()
        if (this.stroke && this.thickness > 0) ctx.stroke()
        ctx.closePath()
    }
    drawArc(x, y, r, start, end, closed) {
        const ctx = this.canvas.ctx
        this.setStyle()
        ctx.beginPath()
        ctx.arc(x, y, r, start, end)
        if (closed) ctx.closePath()
        if (this.fill) ctx.fill()
        if (this.stroke && this.thickness > 0) ctx.stroke()
        ctx.closePath()
    }
}
