var Collage;
(function (Collage) {
    var PredefinedTemplates;
    (function (PredefinedTemplates) {
        //VerticalStack: {
        //    Rect:
        //    [
        //        { x: 0, y: 0, w: 800, h: 200 },
        //        { x: 0, y: 200, w: 800, h: 200 },
        //        { x: 0, y: 400, w: 800, h: 200 }
        //    ]
        //}
        PredefinedTemplates.VerticalStact = function () {
            var template = new Collage.SVG.SVGTemplate();
            template.AddItem(new Collage.SVG.SVGTemplateItem(new Collage.SVG.SVGBoundBox(0, 0, 800, 200), new Collage.SVG.SVGClipBox(0, 0, 800, 200)));
            template.AddItem(new Collage.SVG.SVGTemplateItem(new Collage.SVG.SVGBoundBox(0, 200, 800, 200), new Collage.SVG.SVGClipBox(0, 200, 800, 200)));
            template.AddItem(new Collage.SVG.SVGTemplateItem(new Collage.SVG.SVGBoundBox(0, 400, 800, 200), new Collage.SVG.SVGClipBox(0, 400, 800, 200)));
            return template;
        };
    })(PredefinedTemplates = Collage.PredefinedTemplates || (Collage.PredefinedTemplates = {}));
})(Collage || (Collage = {}));
