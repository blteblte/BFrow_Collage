namespace Collage.SVG {

    export class SVGTemplate {

        Template: Array<SVGTemplateItem> = [];
        constructor(
            public offest: number
        ) { this.Template = []; }

        AddItem(item: SVGTemplateItem) {
            this.Template.push(item);
        }
    }

}