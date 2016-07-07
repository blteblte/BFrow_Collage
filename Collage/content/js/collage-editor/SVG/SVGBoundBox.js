var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGBoundBox = (function () {
            function SVGBoundBox(x, y, w, h) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }
            SVGBoundBox.prototype.ToRect = function (s, attr) {
                if (attr === void 0) { attr = null; }
                var rect = s.rect(this.x, this.y, this.w, this.h);
                if (attr !== null)
                    rect.attr(attr);
                return rect;
            };
            return SVGBoundBox;
        })();
        SVG.SVGBoundBox = SVGBoundBox;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=SVGBoundBox.js.map