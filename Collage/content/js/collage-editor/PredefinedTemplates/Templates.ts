namespace Collage.PredefinedTemplates {

    /**
     * HORIZONTAL STACK
     */
    export var _horizontalStackTemplate = {
        offset: 10,
        masks:
        [
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
    }
    export var HorizontalStackSVG: (c: (t: SVG.SVGTemplate) => void) => void = (callback: (t: SVG.SVGTemplate) => void) => {
        CalculateTemplate(callback, _horizontalStackTemplate);
    };
    //


    /**
     * VERTICAL STACK
     */
    export var _verticalStackTemplate = {
        offset: 10,
        masks:
        [
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
    }
    export var VerticalStackSVG: (c: (t: SVG.SVGTemplate) => void) => void = (callback: (t: SVG.SVGTemplate) => void) => {
        CalculateTemplate(callback, _verticalStackTemplate);
    };
    //


    /**
     * COMPLEX
     */
    export var _complexTemplate = {
        offset: 10,
        masks:
        [
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
    }
    export var ComplexSVG: (c: (t: SVG.SVGTemplate) => void) => void = (callback: (t: SVG.SVGTemplate) => void) => {
        CalculateTemplate(callback, _complexTemplate);
    };
    //











    export var CalculateTemplate: (c: (t: SVG.SVGTemplate) => void, type) => void = (callback: (t: SVG.SVGTemplate) => void, type) => {
        let offset = type.offset;
        let template = new SVG.SVGTemplate(offset);

        let calcTemplateRecursive = (i) => {
            let correctMatrix = new SVG.SVGCorrectMatrix(type.masks[i].correctMatrix[0], type.masks[i].correctMatrix[1], type.masks[i].correctMatrix[2]);
            let clipBox = new SVG.SVGClipFromSVG(type.masks[i].position[0], type.masks[i].position[1], offset, type.masks[i].svg, correctMatrix);
            Convert.Shapes.FromClipBoxToBoundBox(correctMatrix, offset, clipBox, (boundBox) => {
                template.AddItem(new SVG.SVGTemplateItem(boundBox, clipBox));

                if (i + 1 == type.masks.length) { callback(template); }
                else { calcTemplateRecursive(i + 1); }
            });
        };

        calcTemplateRecursive(0);
    }


}