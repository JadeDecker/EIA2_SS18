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
    var Luftblase = (function (_super) {
        __extends(Luftblase, _super);
        function Luftblase() {
            var _this = _super.call(this, (Math.floor(Math.random() * (1000 - 100)) + 100), (Math.floor(Math.random() * (700 - 200)) + 200)) || this;
            _this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
            _this.draw();
            return _this;
        }
        Luftblase.prototype.move = function () {
            this.y -= 2;
            if (this.y <= (0 - this.radius)) {
                this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
                this.x = (Math.floor(Math.random() * (1000 - 100)) + 100);
                this.y = 800 + this.radius;
            }
            this.draw();
        };
        Luftblase.prototype.draw = function () {
            L10_Animation.crc2.strokeStyle = "#fff";
            L10_Animation.crc2.lineWidth = 2;
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
            L10_Animation.crc2.stroke();
        };
        return Luftblase;
    }(L10_Animation.Elemente));
    L10_Animation.Luftblase = Luftblase;
})(L10_Animation || (L10_Animation = {}));
