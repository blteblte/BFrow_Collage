var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGClipFromSVG = (function () {
            function SVGClipFromSVG(x, y, offeset, svgUrl) {
                this.x = x;
                this.y = y;
                this.offeset = offeset;
                this.svgUrl = svgUrl;
            }
            SVGClipFromSVG.prototype.GetClipBox = function (s, callback) {
                //let instance = this;
                //Snap.load(this.svgUrl, function (f) {
                //    let clip = f.select("path");
                //    let matrix = `matrix(1,0,0,1,${instance.x},${instance.y})`;
                //    clip.attr({
                //        transform: matrix,
                //    });
                var _this = this;
                //    if (s !== null) s.append(clip);
                //    callback(clip);
                //});
                Collage.Pipe.MediaPipe.GetSVGPath(this.svgUrl, function (clip) {
                    var matrix = "matrix(1,0,0,1," + (_this.x + _this.offeset) + "," + (_this.y + _this.offeset) + ")";
                    clip.attr({ transform: matrix });
                    if (s !== null)
                        s.append(clip);
                    callback(clip);
                });
            };
            return SVGClipFromSVG;
        })();
        SVG.SVGClipFromSVG = SVGClipFromSVG;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=SVGClipFromSVG.js.map