namespace Collage.SVG {

    export class SVGOptions {
        constructor(
            public template: (c: (t: SVGTemplate) => void) => void,
            public clear: boolean = true
        ) { }
    }

}