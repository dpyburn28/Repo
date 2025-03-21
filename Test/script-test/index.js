import * as Utils from '../../Libraries/js-utils/src/index.js';
console.log(Utils)
const canvas = Utils.domUtils.manipulation.createCanvas({width: 200, height: 300, x: 10, y: 10, id: 'canvas'});

document.body.appendChild(canvas);