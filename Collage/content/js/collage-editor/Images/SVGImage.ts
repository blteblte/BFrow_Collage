﻿namespace Collage.Images {

    export class SVGImage {

        constructor(public imageUrl: string) { }

        LoadImage(callback: (s: ImageSource) => void) {
            this._getImageParams(this.imageUrl, callback);
        }


        //todo - if image fails to load
        private _getImageParams(url: string, callback: (s: ImageSource) => void) {

            var image = new Image();
            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
                canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

                canvas.getContext('2d').drawImage(this, 0, 0);

                // Get raw image data
                //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

                // ... or get as Data URI
                //callback(canvas.toDataURL('image/png'));

                callback(new ImageSource(canvas.toDataURL('image/png'), this.width, this.height));
            };
            image.src = url;
        }

    }

}