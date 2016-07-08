var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGCorrectMatrix = (function () {
            function SVGCorrectMatrix(x, y, rotate) {
                if (rotate === void 0) { rotate = null; }
                this.x = x;
                this.y = y;
                this.rotate = rotate;
            }
            return SVGCorrectMatrix;
        })();
        SVG.SVGCorrectMatrix = SVGCorrectMatrix;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
