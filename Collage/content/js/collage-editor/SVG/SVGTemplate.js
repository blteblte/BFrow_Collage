var Collage;
(function (Collage) {
    var SVG;
    (function (SVG) {
        var SVGTemplate = (function () {
            function SVGTemplate(offest) {
                this.offest = offest;
                this.Template = [];
                this.Template = [];
            }
            SVGTemplate.prototype.AddItem = function (item) {
                this.Template.push(item);
            };
            return SVGTemplate;
        })();
        SVG.SVGTemplate = SVGTemplate;
    })(SVG = Collage.SVG || (Collage.SVG = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=SVGTemplate.js.map