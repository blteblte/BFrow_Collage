namespace Collage.SVG {

    export class SVGBoundBox {
        constructor(
            public x: number,
            public y: number,
            public w: number,
            public h: number
        ) { }

        ToRect(s: Paper, attr: any = null) {
            let rect: any = s.rect(this.x, this.y, this.w, this.h);
            if (attr !== null) rect.attr(attr);
            return rect;
        }
    }

}