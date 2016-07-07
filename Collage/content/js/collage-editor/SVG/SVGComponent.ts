﻿namespace Collage.SVG {

    export class SVGComponent {

        s: Paper = null;
        $svg: JQuery;
        static viewBoxW = 800;
        static viewBoxH = 600;

        background: any;
        elements: Array<SVGCollageElement>;
        t: SVGTemplate;

        constructor(
            public svgId: string,
            options: SVGOptions
        ) {
            this.$svg = $(`#${svgId}`);

            if (options.clear) {
                this.$svg.html('');
            }

            //this.SetViewBox(0, 0, SVGComponent.viewBoxW, SVGComponent.viewBoxH);

            this.s = Snap(svgId);
            this.InitializeTemplate(options.template);
        }

        InitializeTemplate(template: (c: (t: SVGTemplate) => void) => void) {

            template((t) => {

                this.t = t;
                this.elements = [];

                this.background = this.s.rect(0, 0, 0, 0);
                this.background.attr({fill: "white" });

                var boundBoxAttr = { fill: "white" };
                var clipBoxAttr = { fill: "white", stroke: "gray", strokeWidth: 1 };

                t.Template.forEach((v, i) => {
                    let el = new SVGCollageElement();
                    el.boundBox = v.BoundBox.ToRect(this.s, boundBoxAttr);
                    v.ClipBox.GetClipBox(this.s, (clipBox) => {
                        el.mask = clipBox;
                        el.mask.attr(clipBoxAttr);
                        $(el.mask.node)
                            .css({ cursor: "pointer" })
                            .click(() => {

                                if (!el.image) {

                                    this.GetImage(i, (image: Images.ImageSource) => {

                                        let posState = new SVGPositionState(v, el, image);


                                        el.image = this.s.image(image.src, posState.imageX, posState.imageY, posState.imageW, posState.imageH);
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

                    this.elements.push(el);

                    if (i + 1 === t.Template.length) {
                        this.SetViewBoxToContent();
                    }

                });


            });

        }

        SetBackgroundColor(color: string) {
            this.background.animate({ fill: color }, 200);
            this.elements.forEach((v) => { v.boundBox.animate({ fill: color }, 200); });
        }

        SetViewBoxToContent() {
            let id = `tmp-shadow-svg-el-${this._guid()}`;
            let $tmpSvg = $(`<svg id="${id}" width="800" height="600" style="position: absolute; top: -1000px; left: -1000px;"></svg>`);
            this.$svg.after($tmpSvg);

            let s = Snap(<SVGElement><any>$tmpSvg[0]);
            let boundGroup = s.group();
            this.elements.forEach((v) => {
                let rect = s.rect = v.boundBox.clone();
                boundGroup.add(rect);
            });
            let contentBBox = boundGroup.getBBox();

            SVGComponent.viewBoxW = contentBBox.w + this.t.offest * 2;
            SVGComponent.viewBoxH = contentBBox.h + this.t.offest * 2;

            this.SetViewBox(0, 0, SVGComponent.viewBoxW, SVGComponent.viewBoxH);
            $tmpSvg.remove();
        }

        _guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        //onclick
        ToImage(callback) {
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
                callback: (data) => {
                    callback(data);
                },
                renderer: "canvg"
            })

            return false;
        }

        Output(data) {
            var img = new Image();
            img.setAttribute("src", data);
            $('#output').append(img);
        }

        GetImage(i: number, callback: (s: Images.ImageSource) => void) {

            //test
            var src = "";
            if (i == 0) {
                src = "content/images/car.jpg";
            }
            else if (i == 1) {
                src = "content/images/space2.jpg"
            }
            else if (i == 2) {
                src = "content/images/space.jpg";
            }
            else if (i == 3) {
                src = "content/images/piano.jpeg"
            }
            //


            //var svgImage = new Images.SVGImage(src);
            //svgImage.LoadImage(callback);
            Pipe.MediaPipe.GetImage(src, (imageSource) => {
                callback(imageSource);
            });
        }

        SetViewBox(x, y, w, h) {
            this.background.attr({ width: w, height: h });
            this.$svg[0].setAttribute("width", `${w}`);
            this.$svg[0].setAttribute("height", `${h}`);
            this.$svg[0].setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
        }
    }

}