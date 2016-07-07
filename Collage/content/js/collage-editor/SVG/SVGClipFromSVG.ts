namespace Collage.SVG {

    export class SVGClipFromSVG implements IClipBox {
        constructor(
            public x: number,
            public y: number,
            public offeset: number,
            public svgUrl: string,
            public correctMatrix: SVGCorrectMatrix = null
        ) { }

        GetClipBox(s: Paper, callback) {
            //let instance = this;
            //Snap.load(this.svgUrl, function (f) {
            //    let clip = f.select("path");
            //    let matrix = `matrix(1,0,0,1,${instance.x},${instance.y})`;
            //    clip.attr({
            //        transform: matrix,
            //    });

            //    if (s !== null) s.append(clip);
            //    callback(clip);
            //});
            Pipe.MediaPipe.GetSVGPath(this.svgUrl, (clip) => {

                let tr_X = this.x + this.offeset;
                let tr_Y = this.y + this.offeset;

                if (this.correctMatrix !== null) {
                    tr_X += this.correctMatrix.x;
                    tr_Y += this.correctMatrix.y;
                }

                //let matrix = `matrix(1,0,0,1,${tr_X},${tr_Y});`;
                let fnMatrix: any = Snap.Matrix;
                let matrix = new fnMatrix(1, 0, 0, 1, tr_X, tr_Y);

                if (this.correctMatrix !== null && this.correctMatrix.rotate !== null) {
                    let bBox = clip.getBBox();
                    matrix.rotate(this.correctMatrix.rotate, this.x, this.y);
                }


                clip.attr({ transform: matrix.toTransformString() });
                if (s !== null) s.append(clip);
                callback(clip);
            });
        }
    }

}