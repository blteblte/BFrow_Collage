namespace Collage.SVG {

    export class SVGClipFromSVG implements IClipBox {

        x: number = 0;
        y: number = 0;

        constructor(
            public xOffset: number,
            public yOffset: number,
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

                let tr_X = this.x + this.offeset + this.xOffset;
                let tr_Y = this.y + this.offeset + this.yOffset;

                if (this.correctMatrix !== null) {
                    tr_X += this.correctMatrix.x;
                    tr_Y += this.correctMatrix.y;
                }

                //let matrix = `matrix(1,0,0,1,${tr_X},${tr_Y});`;
                let fnMatrix: any = Snap.Matrix;
                let matrix = new fnMatrix(1, 0, 0, 1, tr_X, tr_Y);

                if (this.correctMatrix !== null && this.correctMatrix.rotate !== null && this.correctMatrix.rotate !== 0) {
                    let bBox = clip.getBBox();
                    if (this.correctMatrix.rotate === 90) matrix.translate(bBox.w, 0);
                    if (this.correctMatrix.rotate === 180) matrix.translate(bBox.w, bBox.h);
                    if (this.correctMatrix.rotate === 270 || this.correctMatrix.rotate === -90) matrix.translate(0, bBox.w);
                    matrix.rotate(this.correctMatrix.rotate, this.x, this.y);
                }


                clip.attr({ transform: matrix.toTransformString() });
                if (s !== null) s.append(clip);
                callback(clip);
            });
        }
    }

}