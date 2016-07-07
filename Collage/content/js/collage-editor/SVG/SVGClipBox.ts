namespace Collage.SVG {

    export class SVGClipBox implements IClipBox {
        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number,
            public r: number
        ) { }

        GetClipBox(s: Paper, callback) {
            callback(s.rect(this.x, this.y, this.w, this.h, this.r));
        }
    }

}