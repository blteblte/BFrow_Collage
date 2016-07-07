var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGComponent = (function () {
            function SVGComponent(svgId, options) {
                this.svgId = svgId;
                this.s = null;
                this.$svg = $("#" + svgId);
                if (options.clear) {
                    this.$svg.html('');
                }
                //this.SetViewBox(0, 0, SVGComponent.viewBoxW, SVGComponent.viewBoxH);
                this.s = Snap(svgId);
                this.InitializeTemplate(options.template);
            }
            SVGComponent.prototype.InitializeTemplate = function (template) {
                var _this = this;
                template(function (t) {
                    _this.t = t;
                    _this.elements = [];
                    _this.background = _this.s.rect(0, 0, 0, 0);
                    _this.background.attr({ fill: "white" });
                    var boundBoxAttr = { fill: "white" };
                    var clipBoxAttr = { fill: "white", stroke: "gray", strokeWidth: 1 };
                    t.Template.forEach(function (v, i) {
                        var el = new SVG.SVGCollageElement();
                        el.boundBox = v.BoundBox.ToRect(_this.s, boundBoxAttr);
                        v.ClipBox.GetClipBox(_this.s, function (clipBox) {
                            el.mask = clipBox;
                            el.mask.attr(clipBoxAttr);
                            $(el.mask.node)
                                .css({ cursor: "pointer" })
                                .click(function () {
                                if (!el.image) {
                                    _this.GetImage(i, function (image) {
                                        var posState = new SVG.SVGPositionState(v, el, image);
                                        el.image = _this.s.image(image.src, posState.imageX, posState.imageY, posState.imageW, posState.imageH);
                                        el.image.attr({ clip: el.mask });
                                        $(el.image.node).on('mousewheel', function (event) {
                                            posState.OnZoom(event, el.image);
                                        });
                                        var move = function (dx, dy) {
                                            posState.OnMove(dx, dy, this);
                                        };
                                        var start = function () {
                                            posState.OnMoveStart(this);
                                        };
                                        var stop = function () {
                                            posState.OnMoveStop(this);
                                        };
                                        el.image.drag(move, start, stop);
                                        el.image.touchstart(function (event) {
                                            posState.OnMoveStart(el.image);
                                        });
                                        el.image.touchmove(function (event) {
                                            var firstTouch = event.changedTouches[0];
                                            posState.OnMove(firstTouch.clientX, firstTouch.clientY, el.image, true);
                                        });
                                        el.image.touchend(function (event) {
                                            posState.OnMoveStop(el.image, mina.bounce, true);
                                        });
                                    });
                                }
                            });
                        });
                        _this.elements.push(el);
                        if (i + 1 === t.Template.length) {
                            _this.SetViewBoxToContent();
                        }
                    });
                });
            };
            SVGComponent.prototype.SetBackgroundColor = function (color) {
                this.background.animate({ fill: color }, 200);
                this.elements.forEach(function (v) { v.boundBox.animate({ fill: color }, 200); });
            };
            SVGComponent.prototype.SetViewBoxToContent = function () {
                var id = "tmp-shadow-svg-el-" + this._guid();
                var $tmpSvg = $("<svg id=\"" + id + "\" width=\"800\" height=\"600\" style=\"position: absolute; top: -1000px; left: -1000px;\"></svg>");
                this.$svg.after($tmpSvg);
                var s = Snap($tmpSvg[0]);
                var boundGroup = s.group();
                this.elements.forEach(function (v) {
                    var rect = s.rect = v.boundBox.clone();
                    boundGroup.add(rect);
                });
                var contentBBox = boundGroup.getBBox();
                SVGComponent.viewBoxW = contentBBox.w + this.t.offest * 2;
                SVGComponent.viewBoxH = contentBBox.h + this.t.offest * 2;
                this.SetViewBox(0, 0, SVGComponent.viewBoxW, SVGComponent.viewBoxH);
                $tmpSvg.remove();
            };
            SVGComponent.prototype._guid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            //onclick
            SVGComponent.prototype.ToImage = function (callback) {
                var svg = document.getElementById(this.svgId);
                //svg.toDataURL("image/png", {
                //    callback: function (data) {
                //        // Convert image to 'octet-stream' (Just a download, really)
                //        //var image = data.replace("image/png", "image/octet-stream");
                //        //window.location.href = image;
                //        $(document).append('<img src="'+data+'" alt="" />')
                //    },
                //    renderer: "canvg"
                //});
                svg.toDataURL("image/png", {
                    callback: function (data) {
                        callback(data);
                    },
                    renderer: "canvg"
                });
                return false;
            };
            SVGComponent.prototype.Output = function (data) {
                var img = new Image();
                img.setAttribute("src", data);
                $('#output').append(img);
            };
            SVGComponent.prototype.GetImage = function (i, callback) {
                //test
                var src = "";
                if (i == 0) {
                    src = "content/images/car.jpg";
                }
                else if (i == 1) {
                    src = "content/images/space2.jpg";
                }
                else if (i == 2) {
                    src = "content/images/space.jpg";
                }
                else if (i == 3) {
                    src = "content/images/piano.jpeg";
                }
                //
                //var svgImage = new Images.SVGImage(src);
                //svgImage.LoadImage(callback);
                Collage.Pipe.MediaPipe.GetImage(src, function (imageSource) {
                    callback(imageSource);
                });
            };
            SVGComponent.prototype.SetViewBox = function (x, y, w, h) {
                this.background.attr({ width: w, height: h });
                this.$svg[0].setAttribute("width", "" + w);
                this.$svg[0].setAttribute("height", "" + h);
                this.$svg[0].setAttribute("viewBox", x + " " + y + " " + w + " " + h);
            };
            SVGComponent.viewBoxW = 800;
            SVGComponent.viewBoxH = 600;
            return SVGComponent;
        })();
        SVG.SVGComponent = SVGComponent;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=SVGComponent.js.map