export function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
}

export function createCanvas({width, height, x, y, id}) {
    // default values
    width = width || 100;
    height = height || 100;
    x = x || 0;
    y = y || 0;
    id = id || 'canvas';
    // create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = id;
    canvas.style.position = 'absolute';
    canvas.style.left = `${x}px`;
    canvas.style.top = `${y}px`;
    // return canvas
    return canvas;
}