var Texture = (function () {
    // Working with a fix sized texture (512x512, 1024x1024, etc.).
    function Texture(filename, width, height) {
        this.width = width;
        this.height = height;
        this.load(filename);
    }
    Texture.prototype.load = function (filename) {
        var _this = this;
        var imageTexture = new Image();
        imageTexture.height = this.height;
        imageTexture.width = this.width;
        imageTexture.onload = function () {
            var internalCanvas = document.createElement("canvas");
            internalCanvas.width = _this.width;
            internalCanvas.height = _this.height;
            var internalContext = internalCanvas.getContext("2d");
            internalContext.drawImage(imageTexture, 0, 0);
            _this.internalBuffer = internalContext.getImageData(0, 0, _this.width, _this.height);
        };
        imageTexture.src = filename;
    };
    // Takes the U & V coordinates exported by Blender
    // and return the corresponding pixel color in the texture
    Texture.prototype.map = function (tu, tv) {
        if (this.internalBuffer) {
            // using a % operator to cycle/repeat the texture if needed
            var u = Math.abs(((tu * this.width) % this.width)) >> 0;
            var v = Math.abs(((tv * this.height) % this.height)) >> 0;
            var pos = (u + v * this.width) * 4;
            var r = this.internalBuffer.data[pos];
            var g = this.internalBuffer.data[pos + 1];
            var b = this.internalBuffer.data[pos + 2];
            var a = this.internalBuffer.data[pos + 3];
            return new BABYLON.Color4(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
        }
        else {
            return new BABYLON.Color4(1, 1, 1, 1);
        }
    };
    return Texture;
})();
//# sourceMappingURL=texture.js.map