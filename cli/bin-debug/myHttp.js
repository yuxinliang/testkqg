var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var myHttp = (function () {
    function myHttp() {
    }
    myHttp.setHttp = function () {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://192.168.7.11:8080", egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    myHttp.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data : ", request.response);
        // var responseLabel = new egret.TextField();
        // responseLabel.size = 18;
        // responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        // this.addChild(responseLabel);
        // responseLabel.x = 50;
        // responseLabel.y = 70;
    };
    myHttp.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    myHttp.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return myHttp;
}());
__reflect(myHttp.prototype, "myHttp");
//# sourceMappingURL=myHttp.js.map