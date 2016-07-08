namespace Collage.Convert {

    export class Shapes {
        static FromClipBoxToBoundBox(correctMatrix: SVG.SVGCorrectMatrix, offeset: number, clipBox: SVG.IClipBox, callback: (b: SVG.SVGBoundBox) => void) {
            let box = clipBox.GetClipBox(null, (f) => {
                let bBox = f.getBBox();
                let setX = clipBox.x //+ offeset;
                let setY = clipBox.y //+ offeset;

                let fnMatrix: any = Snap.Matrix;
                let matrix = new fnMatrix;
                let cropMatrix = f.transform().localMatrix;
                matrix.add(cropMatrix);

                let matrixX = matrix.x(setX, setY);
                let matrixY = matrix.y(setY, setY);

                let rotation = matrix.split().rotate;

                if (rotation === 90) matrixX -= bBox.w;
                if (rotation === 180) { matrixX -= bBox.w; matrixY -= bBox.h; }
                if (rotation === 270 || rotation === -90) matrixY -= bBox.h;

                matrixX -= correctMatrix.x;
                matrixY -= correctMatrix.y;

                callback(new SVG.SVGBoundBox(matrixX, matrixY, bBox.w, bBox.h));
            });
        }
    }

}