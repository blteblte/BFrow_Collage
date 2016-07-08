namespace Collage.Pipe {

    //TODO: inspect effect on memory usage

    export class MediaPipe {

        private static images = {};
        private static svgs = {};

        //TODO: check if image fails to load
        /**
         * Gets image from image pipe
         * @param url
         * @param callback
         */
        public static GetImage(url: string, callback: (i: Images.ImageSource) => void) {
            if (typeof (MediaPipe.images[url]) !== 'undefined') {
                callback(MediaPipe.images[url]);
            }
            else {
                (new Images.SVGImage(url)).LoadImage((imageSource) => {
                    MediaPipe.images[url] = imageSource;
                    callback(imageSource);
                });
            }
        }

        //TODO: check if svg fails to load
        /**
         * Get svg from svg pipe
         * @param url
         * @param callback
         */
        public static GetSVGPath(url: string, callback: (clipPath: any) => void) {
            if (typeof (MediaPipe.svgs[url]) !== 'undefined') {
                callback(MediaPipe.svgs[url].clone());
            }
            else {
                Snap.load(url, function (f) {
                    let clip = f.select("path");
                    MediaPipe.svgs[url] = clip;
                    callback(clip);
                });
            }
        }

    }

}