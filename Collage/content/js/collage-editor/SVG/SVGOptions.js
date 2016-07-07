var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGOptions = (function () {
            function SVGOptions(template, clear) {
                if (clear === void 0) { clear = true; }
                this.template = template;
                this.clear = clear;
            }
            return SVGOptions;
        })();
        SVG.SVGOptions = SVGOptions;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=SVGOptions.js.map