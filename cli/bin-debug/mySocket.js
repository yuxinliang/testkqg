var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var mySocket = (function (_super) {
    __extends(mySocket, _super);
    function mySocket() {
        return _super.call(this) || this;
    }
    mySocket.getInstance = function () {
        if (mySocket.g_socket) {
            return mySocket.g_socket;
        }
        else {
            mySocket.g_socket = new mySocket();
            mySocket.g_socket.type = egret.WebSocket.TYPE_BINARY;
            mySocket.g_socket.__init();
            var pd = mySocket.g_socket.hashCode;
            console.log("----------- static create ------------ %d", pd);
            return mySocket.g_socket;
        }
    };
    mySocket.prototype.__init = function () {
        this.addEventListener(egret.Event.CONNECT, this.__onConnect, this);
        this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.__onProgressData, this);
        this.addEventListener(egret.Event.CLOSE, this.__onClose, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__onError, this);
        console.log("socket:connect ----------------------- __init");
        this.connect("ws://192.168.7.185", 4001);
    };
    mySocket.prototype.__onConnect = function (event) {
        console.log("-------------- socket is connected ----------------");
    };
    mySocket.prototype.__onSasen = function (flag, data) {
        console.log("--------------- __onSasen");
        console.log(data);
    };
    mySocket.prototype.__onClose = function (event) {
        var pd = this.hashCode;
        console.log("----------- socket is closed ------------- %d", pd);
        this.removeEventListener(egret.Event.CONNECT, this.__onConnect, this);
        this.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.__onProgressData, this);
        this.removeEventListener(egret.Event.CLOSE, this.__onClose, this);
        this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__onError, this);
        mySocket.g_socket = null;
    };
    mySocket.prototype.__onProgressData = function (event) {
        var buffer = new egret.ByteArray();
        buffer.clear();
        this.readBytes(buffer);
    };
    mySocket.prototype.__onError = function (event) {
        console.log(event.data);
        console.log(" --------------- socket has error ------------------ ");
    };
    return mySocket;
}(egret.WebSocket));
mySocket.g_socket = null;
__reflect(mySocket.prototype, "mySocket");
//# sourceMappingURL=mySocket.js.map