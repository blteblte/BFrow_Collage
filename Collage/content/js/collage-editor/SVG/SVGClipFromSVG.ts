namespace Collage.SVG {

    export class SVGClipFromSVG implements IClipBox {
        constructor(
            public x: number,
            public y: number,
            public offeset: number,
            public svgUrl: string
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
                let matrix = `matrix(1,0,0,1,${this.x + this.offeset},${this.y + this.offeset})`;
                clip.attr({ transform: matrix });
                if (s !== null) s.append(clip);
                callback(clip);
            });
        }
    }

}