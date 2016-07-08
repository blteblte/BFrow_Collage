var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGTemplateItem = (function () {
            function SVGTemplateItem(BoundBox, ClipBox) {
                this.BoundBox = BoundBox;
                this.ClipBox = ClipBox;
            }
            return SVGTemplateItem;
        })();
        SVG.SVGTemplateItem = SVGTemplateItem;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
