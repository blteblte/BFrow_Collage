var Collage;
(function (Collage) {
    var Pipe;
    (function (Pipe) {
        //TODO: inspect effect on memory usage
        var MediaPipe = (function () {
            function MediaPipe() {
            }
            //TODO: check if image fails to load
            /**
             * Gets image from image pipe
             * @param url
             * @param callback
             */
            MediaPipe.GetImage = function (url, callback) {
                if (typeof (MediaPipe.images[url]) !== 'undefined') {
                    callback(MediaPipe.images[url]);
                }
                else {
                    (new Collage.Images.SVGImage(url)).LoadImage(function (imageSource) {
                        MediaPipe.images[url] = imageSource;
                        callback(imageSource);
                    });
                }
            };
            //TODO: check if svg fails to load
            /**
             * Get svg from svg pipe
             * @param url
             * @param callback
             */
            MediaPipe.GetSVGPath = function (url, callback) {
                if (typeof (MediaPipe.svgs[url]) !== 'undefined') {
                    callback(MediaPipe.svgs[url].clone());
                }
                else {
                    Snap.load(url, function (f) {
                        var clip = f.select("path");
                        MediaPipe.svgs[url] = clip;
                        callback(clip);
                    });
                }
            };
            MediaPipe.images = {};
            MediaPipe.svgs = {};
            return MediaPipe;
        })();
        Pipe.MediaPipe = MediaPipe;
    })(Pipe = Collage.Pipe || (Collage.Pipe = {}));
})(Collage || (Collage = {}));
