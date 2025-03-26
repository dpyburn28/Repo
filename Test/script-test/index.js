import * as js from '../../Libraries/javascript/src/index.js';

const canv = new js.Sketch.Canvas()
canv.fullscreen()

const brush = new js.Sketch.Brush(canv)

let p = [
    {x:100, y:200},
    {x:400, y:500},
    {x:400, y:100},
    {x:100, y:100}
]

brush.drawPoint(p[0].x, p[0].y, 10)
brush.drawPath(p, true)
brush.drawEllipse(p[1].x, p[1].y, 50, 100, 0.5)
brush.drawArc(p[0].x, p[0].y, 100, 0, Math.PI, true)
brush.drawCurve(p, true)

console.log(canv)
