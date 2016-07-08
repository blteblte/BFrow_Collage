var Collage;
(function (Collage) {
    var PredefinedTemplates;
    (function (PredefinedTemplates) {
        /**
         * HORIZONTAL STACK
         */
        PredefinedTemplates._horizontalStackTemplate = {
            offset: 10,
            masks: [
                {
                    position: [0, 0],
                    correctMatrix: [0, 0, 0],
                    svg: "content/svg/shape.svg"
                },
                {
                    position: [290, 0],
                    correctMatrix: [0, 0, 0],
                    svg: "content/svg/shape.svg"
                },
                {
                    position: [580, 0],
                    correctMatrix: [0, 0, 0],
                    svg: "content/svg/shape.svg"
                }
            ]
        };
        PredefinedTemplates.HorizontalStackSVG = function (callback) {
            PredefinedTemplates.CalculateTemplate(callback, PredefinedTemplates._horizontalStackTemplate);
        };
        //
        /**
         * VERTICAL STACK
         */
        PredefinedTemplates._verticalStackTemplate = {
            offset: 10,
            masks: [
                {
                    position: [0, 0],
                    correctMatrix: [108, 0, 0],
                    svg: "content/svg/shape2.svg"
                },
                {
                    position: [0, 160],
                    correctMatrix: [108, 0, 0],
                    svg: "content/svg/shape2.svg"
                },
                {
                    position: [0, 320],
                    correctMatrix: [108, 0, 0],
                    svg: "content/svg/shape2.svg"
                }
            ]
        };
        PredefinedTemplates.VerticalStackSVG = function (callback) {
            PredefinedTemplates.CalculateTemplate(callback, PredefinedTemplates._verticalStackTemplate);
        };
        //
        /**
         * COMPLEX
         */
        PredefinedTemplates._complexTemplate = {
            offset: 10,
            masks: [
                {
                    position: [100, 0],
                    correctMatrix: [0, 0, 0],
                    svg: "content/svg/shape3(3).svg"
                },
                {
                    position: [180, 100],
                    correctMatrix: [0, 0, 90],
                    svg: "content/svg/shape3(3).svg"
                },
                {
                    position: [80, 550],
                    correctMatrix: [0, 0, 180],
                    svg: "content/svg/shape3(3).svg"
                },
                {
                    position: [0, 80],
                    correctMatrix: [0, 0, 270],
                    svg: "content/svg/shape3(3).svg"
                },
            ]
        };
        PredefinedTemplates.ComplexSVG = function (callback) {
            PredefinedTemplates.CalculateTemplate(callback, PredefinedTemplates._complexTemplate);
        };
        //
        PredefinedTemplates.CalculateTemplate = function (callback, type) {
            var offset = type.offset;
            var template = new Collage.SVG.SVGTemplate(offset);
            var calcTemplateRecursive = function (i) {
                var correctMatrix = new Collage.SVG.SVGCorrectMatrix(type.masks[i].correctMatrix[0], type.masks[i].correctMatrix[1], type.masks[i].correctMatrix[2]);
                var clipBox = new Collage.SVG.SVGClipFromSVG(type.masks[i].position[0], type.masks[i].position[1], offset, type.masks[i].svg, correctMatrix);
                Collage.Convert.Shapes.FromClipBoxToBoundBox(correctMatrix, offset, clipBox, function (boundBox) {
                    template.AddItem(new Collage.SVG.SVGTemplateItem(boundBox, clipBox));
                    if (i + 1 == type.masks.length) {
                        callback(template);
                    }
                    else {
                        calcTemplateRecursive(i + 1);
                    }
                });
            };
            calcTemplateRecursive(0);
        };
    })(PredefinedTemplates = Collage.PredefinedTemplates || (Collage.PredefinedTemplates = {}));
})(Collage || (Collage = {}));
