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
        PredefinedTemplates.VerticalStackSVG = function (callback) {
            var offset = 10;
            var heightOffset = 160;
            var template = new Collage.SVG.SVGTemplate(offset);
            var correctMatrix = new Collage.SVG.SVGCorrectMatrix(110, 0);
            var clipBox1 = new Collage.SVG.SVGClipFromSVG(0, heightOffset * 0, offset, "content/svg/shape2.svg", correctMatrix);
            Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox1, function (boundBox1) {
                template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox1, clipBox1));
                var clipBox2 = new Collage.SVG.SVGClipFromSVG(0, heightOffset * 1, offset, "content/svg/shape2.svg", correctMatrix);
                Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox2, function (boundBox2) {
                    template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox2, clipBox2));
                    var clipBox3 = new Collage.SVG.SVGClipFromSVG(0, heightOffset * 2, offset, "content/svg/shape2.svg", correctMatrix);
                    Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox3, function (boundBox3) {
                        template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox3, clipBox3));
                        callback(template);
                    });
                });
            });
        };
        PredefinedTemplates.ComplexSVG = function (callback) {
            var offset = 10;
            var template = new Collage.SVG.SVGTemplate(offset);
            var correctMatrix1 = new Collage.SVG.SVGCorrectMatrix(200, 400);
            var clipBox1 = new Collage.SVG.SVGClipFromSVG(0, 0, offset, "content/svg/shape3.svg", correctMatrix1);
            Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox1, function (boundBox1) {
                template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox1, clipBox1));
                var correctMatrix2 = new Collage.SVG.SVGCorrectMatrix(200, 400, 90);
                var clipBox2 = new Collage.SVG.SVGClipFromSVG(180, 40, offset, "content/svg/shape3.svg", correctMatrix2);
                Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox2, function (boundBox2) {
                    template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox2, clipBox2));
                    var correctMatrix3 = new Collage.SVG.SVGCorrectMatrix(200, 400, 180);
                    var clipBox3 = new Collage.SVG.SVGClipFromSVG(168, 100, offset, "content/svg/shape3.svg", correctMatrix3);
                    Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox3, function (boundBox3) {
                        template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox3, clipBox3));
                        var correctMatrix4 = new Collage.SVG.SVGCorrectMatrix(200, 400, 270);
                        var clipBox4 = new Collage.SVG.SVGClipFromSVG(120, 140, offset, "content/svg/shape3.svg", correctMatrix4);
                        Collage.Convert.Shapes.FromClipBoxToBoundBox(offset, clipBox4, function (boundBox4) {
                            template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox4, clipBox4));
                            callback(template);
                        });
                    });
                });
            });
        };
    })(PredefinedTemplates = Collage.PredefinedTemplates || (Collage.PredefinedTemplates = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=Templates.js.map