var Collage;
(function (Collage) {
    var Images;
    (function (Images) {
        var ImageSource = (function () {
            function ImageSource(src, w, h) {
                this.src = src;
                this.w = w;
                this.h = h;
            }
            return ImageSource;
        })();
        Images.ImageSource = ImageSource;
    })(Images = Collage.Images || (Collage.Images = {}));
})(Collage || (Collage = {}));
//# sourceMappingURL=ImageSource.js.map