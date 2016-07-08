var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGClipFromSVG = (function () {
            function SVGClipFromSVG(xOffset, yOffset, offeset, svgUrl, correctMatrix) {
                if (correctMatrix === void 0) { correctMatrix = null; }
                this.xOffset = xOffset;
                this.yOffset = yOffset;
                this.offeset = offeset;
                this.svgUrl = svgUrl;
                this.correctMatrix = correctMatrix;
                this.x = 0;
                this.y = 0;
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
                    var tr_X = _this.x + _this.offeset + _this.xOffset;
                    var tr_Y = _this.y + _this.offeset + _this.yOffset;
                    if (_this.correctMatrix !== null) {
                        tr_X += _this.correctMatrix.x;
                        tr_Y += _this.correctMatrix.y;
                    }
                    //let matrix = `matrix(1,0,0,1,${tr_X},${tr_Y});`;
                    var fnMatrix = Snap.Matrix;
                    var matrix = new fnMatrix(1, 0, 0, 1, tr_X, tr_Y);
                    if (_this.correctMatrix !== null && _this.correctMatrix.rotate !== null && _this.correctMatrix.rotate !== 0) {
                        var bBox = clip.getBBox();
                        if (_this.correctMatrix.rotate === 90)
                            matrix.translate(bBox.w, 0);
                        if (_this.correctMatrix.rotate === 180)
                            matrix.translate(bBox.w, bBox.h);
                        if (_this.correctMatrix.rotate === 270 || _this.correctMatrix.rotate === -90)
                            matrix.translate(0, bBox.w);
                        matrix.rotate(_this.correctMatrix.rotate, _this.x, _this.y);
                    }
                    clip.attr({ transform: matrix.toTransformString() });
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
