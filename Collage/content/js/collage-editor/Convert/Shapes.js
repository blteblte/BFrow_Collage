var Collage;
(function (Collage) {
    var Convert;
    (function (Convert) {
        var Shapes = (function () {
            function Shapes() {
            }
            Shapes.FromClipBoxToBoundBox = function (offeset, clipBox, callback) {
                var box = clipBox.GetClipBox(null, function (f) {
                    var bBox = f.getBBox();
                    callback(new Collage.SVG.SVGBoundBox(clipBox.x + offeset, clipBox.y + offeset, bBox.w, bBox.h));
                });
            };
            return Shapes;
        })();
        Convert.Shapes = Shapes;
    })(Convert = Collage.Convert || (Collage.Convert = {}));
})(Collage || (Collage = {}));
