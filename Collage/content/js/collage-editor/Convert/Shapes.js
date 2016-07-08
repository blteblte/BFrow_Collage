var Collage;
(function (Collage) {
    var Convert;
    (function (Convert) {
        var Shapes = (function () {
            function Shapes() {
            }
            Shapes.FromClipBoxToBoundBox = function (correctMatrix, offeset, clipBox, callback) {
                var box = clipBox.GetClipBox(null, function (f) {
                    var bBox = f.getBBox();
                    var setX = clipBox.x; //+ offeset;
                    var setY = clipBox.y; //+ offeset;
                    var fnMatrix = Snap.Matrix;
                    var matrix = new fnMatrix;
                    var cropMatrix = f.transform().localMatrix;
                    matrix.add(cropMatrix);
                    var matrixX = matrix.x(setX, setY);
                    var matrixY = matrix.y(setY, setY);
                    var rotation = matrix.split().rotate;
                    if (rotation === 90)
                        matrixX -= bBox.w;
                    if (rotation === 180) {
                        matrixX -= bBox.w;
                        matrixY -= bBox.h;
                    }
                    if (rotation === 270 || rotation === -90)
                        matrixY -= bBox.h;
                    matrixX -= correctMatrix.x;
                    matrixY -= correctMatrix.y;
                    callback(new Collage.SVG.SVGBoundBox(matrixX, matrixY, bBox.w, bBox.h));
                });
            };
            return Shapes;
        })();
        Convert.Shapes = Shapes;
    })(Convert = Collage.Convert || (Collage.Convert = {}));
})(Collage || (Collage = {}));
