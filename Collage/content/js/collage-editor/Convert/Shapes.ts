namespace Collage.Convert {

    export class Shapes {
        static FromClipBoxToBoundBox(offeset: number, clipBox: SVG.IClipBox, callback: (b: SVG.SVGBoundBox) => void) {
            var box = clipBox.GetClipBox(null, (f) => {
                var bBox = f.getBBox();
                callback(new SVG.SVGBoundBox(clipBox.x + offeset, clipBox.y + offeset, bBox.w, bBox.h));
            });
        }
    }

}