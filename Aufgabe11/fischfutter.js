var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var L10_Animation;
(function (L10_Animation) {
    var futter = (function (_super) {
        __extends(futter, _super);
        function futter(_x, _y) {
            var _this = _super.call(this, _x, _y) || this;
            _this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
            _this.draw();
            return _this;
        }
        futter.prototype.move = function () {
            if (this.y <= 750) {
                this.y += 2;
            }
            this.draw();
        };
        futter.prototype.draw = function () {
            L10_Animation.crc2.strokeStyle = "#db850d";
            L10_Animation.crc2.fillStyle = "#db850d";
            L10_Animation.crc2.lineWidth = 2;
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.moveTo(this.x, this.y);
            L10_Animation.crc2.lineTo(this.x + 10, this.y + 10);
            L10_Animation.crc2.lineTo(this.x + 20, this.y + 5);
            L10_Animation.crc2.lineTo(this.x, this.y + 8);
            L10_Animation.crc2.closePath;
            L10_Animation.crc2.stroke();
            L10_Animation.crc2.fill();
        };
        return futter;
    }(L10_Animation.Elemente));
    L10_Animation.futter = futter;
})(L10_Animation || (L10_Animation = {}));
