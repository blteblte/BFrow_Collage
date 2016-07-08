var Collage;
(function (Collage) {
    var Images;
    (function (Images) {
        var SVGImage = (function () {
            function SVGImage(imageUrl) {
                this.imageUrl = imageUrl;
            }
            SVGImage.prototype.LoadImage = function (callback) {
                this._getImageParams(this.imageUrl, callback);
            };
            SVGImage.prototype._getImageParams = function (url, callback) {
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
                    callback(new Images.ImageSource(canvas.toDataURL('image/png'), this.width, this.height));
                };
                image.src = url;
            };
            return SVGImage;
        })();
        Images.SVGImage = SVGImage;
    })(Images = Collage.Images || (Collage.Images = {}));
})(Collage || (Collage = {}));
