/// <reference path="Snap.svg-0.4.1/dist/snap.svg-min.js" />
/// <reference path="jquery.mousewheel.min.js" />
/// <reference path="Snap.svg-0.4.1/src/paper.js" />

/*
    TODO (general):
        0. REFACTOR this shit!!!
        1. fix VerticalStack 1st tile bug - wtf & where it comes from???
         |+ IE bug!!!!
        2. + ZOOM in/out
        4. Zoom double touch support
        5. Add/remove tiles
        6. Resize tiles

        7. Save to FILE (svg -> canvas -> image)

        etc & more to come...
*/

/**
* @deprecated
*/
(function ($) {

    $.fn.Collage = function (options) {

        if (options.clear | true) {
            $(this).html('');
        }

        var rectPadding = 20;
        var rectBorderRadius = 2;

        var s = Snap($(this).attr("id"));
        var template = options.template;

        var masks = {};
        var containerAttributes = { fill: "white"/*, stroke: "gray", strokeWidth: 1*/ };
        var rectAttributes = { fill: "white", stroke: "gray", strokeWidth: 1 };

        $.each(template.Rect, function (i, v) {
            masks[i] = {};
            masks[i].mask = s.rect(v.x, v.y, v.w, v.h);
            masks[i].mask.attr(containerAttributes);
            masks[i].rect = s.rect(v.x + rectPadding, v.y + rectPadding, v.w - rectPadding * 2, v.h - rectPadding * 2, rectBorderRadius);
            masks[i].rect.attr(rectAttributes);
            $(masks[i].rect.node)
                .css({ cursor: "pointer" })
                .click(function () {
                    if (!masks[i].image) {

                        var $element = $(this);
                        GetImage(i, function (image) {
                            $element.hide();


                            //move
                            var initialX = 0;
                            var initialY = 0;
                            var maxX = 800;
                            var maxY = 600;
                            var minX = 0;
                            var minY = 0;
                            var stickX = 0;
                            var stickY = 0;
                            var xMinOutOfBounds = false;
                            var xMaxOutOfBounds = false;
                            var yMinOutOfBounds = false;
                            var yMaxOutOfBounds = false;
                            //


                            var imageW = v.w;
                            var imageH = image.h * (v.w / image.w);
                            var imageX = v.x;
                            var imageY = v.y - imageH / 2;
                            if (v.h > v.w) {
                                imageH = v.h;
                                imageW = image.w * (v.h / image.h);
                                imageY = v.y;
                                imageX = v.x - imageW / 2;
                            }

                            masks[i].image = s.image(image.src, imageX, imageY, imageW, imageH);
                            masks[i].image.attr({ clip: masks[i].mask });

                            $(masks[i].image.node).on('mousewheel', function (event) {
                                event.preventDefault();
                                console.log(event.deltaX, event.deltaY, event.deltaFactor);

                                var scrollSpeed = event.deltaFactor / 10;
                                var value = event.deltaY > 0 ? scrollSpeed : -scrollSpeed;

                                imageW += value;
                                imageH += value;
                                masks[i].image.animate({ width: imageW, height: imageH }, 50, mina.easein);
                            });

                            var move = function (dx, dy) {
                                //var transform = this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy];
                                //this.attr({
                                //    transform: transform,
                                //});
                                var thisX = initialX + dx;
                                var thisY = initialY + dy;

                                //xMin
                                if (thisX >= minX) {
                                    stickX = thisX;
                                    this.attr({ x: thisX });
                                    xMinOutOfBounds = false;
                                }
                                else {
                                    this.attr({ x: thisX });
                                    xMinOutOfBounds = true;
                                }

                                //xMax
                                if (thisX <= maxX) {
                                    stickX = thisX;
                                    this.attr({ x: thisX });
                                    xMaxOutOfBounds = false;
                                }
                                else {
                                    this.attr({ x: thisX });
                                    xMaxOutOfBounds = true;
                                }

                                //yMin
                                if (thisY >= minY) {
                                    stickY = thisY;
                                    this.attr({ y: thisY });
                                    yMinOutOfBounds = false;
                                }
                                else {
                                    this.attr({ y: thisY });
                                    yMinOutOfBounds = true;
                                }

                                if (thisY <= maxY) {
                                    stickY = thisY;
                                    this.attr({ y: thisY });
                                    yMaxOutOfBounds = false;
                                }
                                else {
                                    this.attr({ y: thisY });
                                    yMaxOutOfBounds = true;
                                }

                                console.log("dx: " + dx + ", dy: " + dy
                                    + "\n minX: " + minX + ", maxX: " + maxX + ", minY: " + minY + ", maxY: " + maxY
                                    + "\n thisX: " + thisX + ", thisY: " + thisY
                                    + "\n stickX: " + stickX + ", stickY: " + stickY);
                            };

                            var start = function () {
                                var bBox = this.getBBox();
                                initialX = bBox.x;
                                initialY = bBox.y;

                                var cropBBox = masks[i].mask.getBBox();
                                maxX = cropBBox.x;
                                maxY = cropBBox.y;

                                if (cropBBox.w < cropBBox.h) {
                                    minX = maxX - imageW + cropBBox.w;
                                    minY = -maxY;
                                }
                                else {
                                    minX = -maxX;
                                    minY = maxY - imageH + cropBBox.h;
                                }


                                //this.data('origTransform', this.transform().local);
                            };

                            var stop = function () {
                                if (xMinOutOfBounds) {
                                    this.animate({ x: minX }, 200, mina.bounce);
                                }
                                if (xMaxOutOfBounds) {
                                    this.animate({ x: maxX }, 200, mina.bounce);
                                }
                                if (yMinOutOfBounds) {
                                    this.animate({ y: minY }, 200, mina.bounce);
                                }
                                if (yMaxOutOfBounds) {
                                    this.animate({ y: maxY }, 200, mina.bounce);
                                }
                            };

                            masks[i].image.drag(move, start, stop);
                        });
                    }
                });
        });
    };


    function getDataUri(url, callback, w, h) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // Get raw image data
            //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            //callback(canvas.toDataURL('image/png'));

            callback({ src: canvas.toDataURL('image/png'), w: w, h: h });
        };

        image.src = url;
    }

    function GetImage(i, callback) {
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
        //
        var pic_real_width, pic_real_height;

        $("<img/>")
        .attr("src", src)
        .load(function () {
            pic_real_width = this.width;
            pic_real_height = this.height;

            getDataUri(src, callback, pic_real_width, pic_real_height)
        });
    }

})(jQuery);


function toImage() {
    var svg = document.getElementById("svg");

    //svg.toDataURL("image/png", {
    //    callback: function (data) {
    //        // Convert image to 'octet-stream' (Just a download, really)
    //        //var image = data.replace("image/png", "image/octet-stream");
    //        //window.location.href = image;
    //        $(document).append('<img src="'+data+'" alt="" />')
    //    },
    //    renderer: "canvg"
    //});

    var img = new Image();

    svg.toDataURL("image/png", {
        callback: function (data) {
            img.setAttribute("src", data);
            $('#output').append(img);
        },
        renderer: "canvg"
    })

    return false;
}