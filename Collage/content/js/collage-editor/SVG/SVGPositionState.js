var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGPositionState = (function () {
            function SVGPositionState(v, el, image) {
                this.v = v;
                this.el = el;
                this.image = image;
                this.currentPositionX = 0;
                this.currentPositionY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.minX = 0;
                this.minY = 0;
                this.stickX = 0;
                this.stickY = 0;
                this.xMinOutOfBounds = false;
                this.xMaxOutOfBounds = false;
                this.yMinOutOfBounds = false;
                this.yMaxOutOfBounds = false;
                this.touchStartX = null;
                this.touchStartY = null;
                this.imageW = v.BoundBox.w;
                this.imageH = image.h * (v.BoundBox.w / image.w);
                this.imageX = v.BoundBox.x;
                this.imageY = v.BoundBox.y - this.imageH / 2;
                if (v.BoundBox.h > v.BoundBox.w) {
                    this.imageH = v.BoundBox.h;
                    this.imageW = image.w * (v.BoundBox.h / image.h);
                    this.imageY = v.BoundBox.y;
                    this.imageX = v.BoundBox.x - this.imageW / 2;
                }
                var cropBBox = el.boundBox.getBBox();
                this.maxX = cropBBox.x;
                this.maxY = cropBBox.y;
                if (cropBBox.w < cropBBox.h) {
                    this.minX = this.maxX - this.imageW + cropBBox.w;
                    this.minY = this.maxY;
                }
                else {
                    this.minX = this.maxX;
                    this.minY = this.maxY - this.imageH + cropBBox.h;
                }
            }
            SVGPositionState.prototype.OnZoom = function (event, target) {
                event.preventDefault();
                //console.log(event.deltaX, event.deltaY, event.deltaFactor);
                var scrollSpeed = event.deltaFactor / 5;
                var value = event.deltaY > 0 ? scrollSpeed : -scrollSpeed;
                var wV = value;
                var hV = value * (this.imageH / this.imageW);
                var newW = this.imageW + wV;
                var newH = this.imageH + hV;
                if (newW >= this.v.BoundBox.w && newH >= this.v.BoundBox.h) {
                    this.minX -= wV;
                    this.minY -= hV;
                    //console.log(this.minX, this.maxX);
                    //console.log(this.minY, this.maxY);
                    this.imageW = newW;
                    this.imageH = newH;
                    this.el.image.animate({ width: this.imageW, height: this.imageH }, 0, mina.easein);
                    this.OnMoveStart(target);
                    this.OnMove(-wV / 2, -hV / 2, target);
                    this.OnMoveStop(target, mina.easein);
                }
            };
            SVGPositionState.prototype.OnMoveStart = function (target) {
                var bBox = target.getBBox();
                this.currentPositionX = bBox.x;
                this.currentPositionY = bBox.y;
                //this.data('origTransform', this.transform().local);
            };
            SVGPositionState.prototype.OnMoveStop = function (target, anim, isTouch) {
                if (anim === void 0) { anim = mina.bounce; }
                if (isTouch === void 0) { isTouch = false; }
                if (isTouch) {
                    this.touchStartX = this.touchStartY = null;
                }
                this.currentPositionX = this.thisX;
                this.currentPositionY = this.thisY;
                if (this.xMinOutOfBounds) {
                    this.currentPositionX = this.minX;
                    target.animate({ x: this.minX }, 200, anim);
                }
                if (this.xMaxOutOfBounds) {
                    this.currentPositionX = this.maxX;
                    target.animate({ x: this.maxX }, 200, anim);
                }
                if (this.yMinOutOfBounds) {
                    this.currentPositionY = this.minY;
                    target.animate({ y: this.minY }, 200, anim);
                }
                if (this.yMaxOutOfBounds) {
                    this.currentPositionY = this.maxY;
                    target.animate({ y: this.maxY }, 200, anim);
                }
            };
            SVGPositionState.prototype.OnMove = function (dx, dy, target, isTouch) {
                //var transform = this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy];
                //this.attr({
                //    transform: transform,
                //});
                if (isTouch === void 0) { isTouch = false; }
                if (isTouch) {
                    if (this.touchStartX === null && this.touchStartY === null) {
                        this.touchStartX = dx;
                        this.touchStartY = dy;
                    }
                    dx = dx - this.touchStartX;
                    dy = dy - this.touchStartY;
                }
                this.thisX = this.currentPositionX + dx;
                this.thisY = this.currentPositionY + dy;
                // console.log("dx/dy:", dx, dy, "x/y:", this.thisX, this.thisY/*, this.currentPositionX, this.currentPositionY*/);
                //xMin
                if (this.thisX >= this.minX) {
                    this.stickX = this.thisX;
                    target.attr({ x: this.thisX });
                    this.xMinOutOfBounds = false;
                }
                else {
                    target.attr({ x: this.thisX });
                    this.xMinOutOfBounds = true;
                }
                //xMax
                if (this.thisX <= this.maxX) {
                    this.stickX = this.thisX;
                    target.attr({ x: this.thisX });
                    this.xMaxOutOfBounds = false;
                }
                else {
                    target.attr({ x: this.thisX });
                    this.xMaxOutOfBounds = true;
                }
                //yMin
                if (this.thisY >= this.minY) {
                    this.stickY = this.thisY;
                    target.attr({ y: this.thisY });
                    this.yMinOutOfBounds = false;
                }
                else {
                    target.attr({ y: this.thisY });
                    this.yMinOutOfBounds = true;
                }
                if (this.thisY <= this.maxY) {
                    this.stickY = this.thisY;
                    target.attr({ y: this.thisY });
                    this.yMaxOutOfBounds = false;
                }
                else {
                    target.attr({ y: this.thisY });
                    this.yMaxOutOfBounds = true;
                }
                //console.log("dx: " + dx + ", dy: " + dy
                //    + "\n minX: " + minX + ", maxX: " + maxX + ", minY: " + minY + ", maxY: " + maxY
                //    + "\n thisX: " + thisX + ", thisY: " + thisY
                //    + "\n stickX: " + stickX + ", stickY: " + stickY);
            };
            return SVGPositionState;
        })();
        SVG.SVGPositionState = SVGPositionState;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=SVGPositionState.js.map