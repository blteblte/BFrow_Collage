var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGClipBox = (function () {
            function SVGClipBox(x, y, w, h, r) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.r = r;
            }
            SVGClipBox.prototype.GetClipBox = function (s, callback) {
                callback(s.rect(this.x, this.y, this.w, this.h, this.r));
            };
            return SVGClipBox;
        })();
        SVG.SVGClipBox = SVGClipBox;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
