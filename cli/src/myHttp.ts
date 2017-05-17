class myHttp {
	public constructor() {
	}
	public static setHttp() {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("http://192.168.7.11:8080", egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send();
		request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
	}
	private static onGetComplete(event: egret.Event): void {
		var request = <egret.HttpRequest>event.currentTarget;
		console.log("get data : ", request.response);
		// var responseLabel = new egret.TextField();
		// responseLabel.size = 18;
		// responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
		// this.addChild(responseLabel);
		// responseLabel.x = 50;
		// responseLabel.y = 70;
	}

	private static onGetIOError(event: egret.IOErrorEvent): void {
		console.log("get error : " + event);
	}

	private static onGetProgress(event: egret.ProgressEvent): void {
		console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
	}
}