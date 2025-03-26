
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
    setStyle(style) {
        if(style) {
            style.thickness ? this.thickness = style.thickness : this.thickness = 0
            style.stroke ? this.stroke = style.stroke : this.stroke = false
            style.fill ? this.fill = style.fill : this.fill = false
        }
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
        ctx.ellipse(x, y, r, r, 0, Math.PI * 2, 0)
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
        points.unshift(p0)
        if (closed) ctx.closePath()
        if (this.fill) ctx.fill()
        if (this.stroke && this.thickness > 0) ctx.stroke()
        ctx.closePath()
    }
    drawEllipse(x, y, w, h, shear = 0) {
        const ctx = this.canvas.ctx
        this.setStyle()
        ctx.beginPath()
        ctx.ellipse(x, y, w, h, shear, Math.PI * 2, 0)
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
    drawCurve(points, closed) {
        const ctx = this.canvas.ctx
        let p1, c1, c2, p2
        // Handle points array
        if (Array.isArray(points) && points.length === 4) {
            [p1, c1, c2, p2] = points
        } else { // Handle points object
            p1 = points.p1
            c1 = points.c1
            c2 = points.c2
            p2 = points.p2
        }
        // Draw 
        this.setStyle()
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y)
        if (closed) ctx.closePath()
        if (this.fill) ctx.fill()
        if (this.stroke && this.thickness > 0) ctx.stroke()
        ctx.closePath()
    }
    // Shapes
    drawShape(shape, args, style) {
        switch (shape) {
            case "point":
                if (!style) {
                    let style = {
                        stroke: "black",
                        fill: "black",
                        thickness: 1
                    }
                    
                    this.setStyle(style)
                }
                var {x, y, r} = args
                this.drawPoint(x, y, r)
                break;
            case "square":
                if (!style) {
                    let style = {
                        stroke: "black",
                        fill: "white",
                        thickness: 1
                    }
                    this.setStyle(style)
                }
                var {x, y, s} = args
                var cx = x
                var cy = y
                x = cx - s/2
                y = cy - s/2
                let p = [
                    {x: x, y: y},
                    {x: x + s, y: y},
                    {x: x + s, y: y + s},
                    {x: x, y: y + s}
                ]
                this.drawPath(p, true)
                break;
        }
    }
}


