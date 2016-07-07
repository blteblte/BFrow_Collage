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
        //export var VerticalStack: () => SVG.SVGTemplate = () => {
        //    let template = new SVG.SVGTemplate();
        //    let offset = 10;
        //    let count = 3;
        //    let r = 10;
        //    let w = SVG.SVGComponent.viewBoxW;
        //    let h = SVG.SVGComponent.viewBoxH / count;
        //    template.AddItem(new SVG.SVGTemplateItem(0, 0,
        //        new SVG.SVGBoundBox(0, 0, w, h),
        //        new SVG.SVGClipBox(0 + offset, 0 + offset, w - offset * 2, h - offset * 2, r)
        //    ));
        //    template.AddItem(new SVG.SVGTemplateItem(0, 200,
        //        new SVG.SVGBoundBox(0, 200, w, h),
        //        new SVG.SVGClipBox(0 + offset, 200 + offset, w - offset * 2, h - offset * 2, r)
        //    ));
        //    template.AddItem(new SVG.SVGTemplateItem(0, 400,
        //        new SVG.SVGBoundBox(0, 400, w, h),
        //        new SVG.SVGClipBox(0 + offset, 400 + offset, w - offset * 2, h - offset * 2, r)
        //    ));
        //    return template;
        //};
        ////HorizontalStack: {
        //    //        Rect:
        //    //        [
        //    //            { x: 0, y: 0, w: 800 / 3, h: 600 },
        //    //            { x: (800 / 3), y: 0, w: 800 / 3, h: 600 },
        //    //            { x: (800 / 3) * 2, y: 0, w: 800 / 3, h: 600 }
        //    //        ]
        //    //    }
        //export var HorizontalStack: () => SVG.SVGTemplate = () => {
        //    let template = new SVG.SVGTemplate();
        //    let offset = 10;
        //    let count = 3;
        //    let r = 10;
        //    let w = SVG.SVGComponent.viewBoxW / count;
        //    let h = SVG.SVGComponent.viewBoxH;
        //    template.AddItem(new SVG.SVGTemplateItem(0, 0,
        //        new SVG.SVGBoundBox(0, 0, w, h),
        //        new SVG.SVGClipBox(0 + offset, 0 + offset, w - offset * 2, h - offset * 2, r)
        //    ));
        //    template.AddItem(new SVG.SVGTemplateItem(w, 0,
        //        new SVG.SVGBoundBox(w, 0, w, h),
        //        new SVG.SVGClipBox(w + offset, 0 + offset, w - offset * 2, h - offset * 2, r)
        //    ));
        //    template.AddItem(new SVG.SVGTemplateItem(w*2, 0,
        //        new SVG.SVGBoundBox(w * 2, 0, w, h),
        //        new SVG.SVGClipBox(w * 2 + offset, 0 + offset, w - offset * 2, h - offset * 2, r)
        //    ));
        //    return template;
        //};
        PredefinedTemplates.HorizontalStackSVG = function (callback) {
            var offset = 10;
            var widthOffset = 290;
            var template = new Collage.SVG.SVGTemplate(offset);
            var clipBox1 = new Collage.SVG.SVGClipFromSVG(widthOffset * 0, 0, offset, "content/svg/shape.svg");
            Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox1, function (boundBox1) {
                template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox1, clipBox1));
                var clipBox2 = new Collage.SVG.SVGClipFromSVG(widthOffset * 1, 0, offset, "content/svg/shape.svg");
                Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox2, function (boundBox2) {
                    template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox2, clipBox2));
                    var clipBox3 = new Collage.SVG.SVGClipFromSVG(widthOffset * 2, 0, offset, "content/svg/shape.svg");
                    Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox3, function (boundBox3) {
                        template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox3, clipBox3));
                        callback(template);
                    });
                });
            });
        };
    })(PredefinedTemplates = Collage.PredefinedTemplates || (Collage.PredefinedTemplates = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=Templates.js.map