namespace Collage.SVG {

    export interface IClipBox {
        x: number;
        y: number;
        GetClipBox(s: Paper, callback);
    }

}