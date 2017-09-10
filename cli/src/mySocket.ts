/**
 *
 * @author 
 *
 */
class mySocket extends egret.WebSocket {

    private static g_socket: mySocket = null;
    public constructor() { 
        super();
    }
    public static getInstance(): mySocket {
        if(mySocket.g_socket) {
            return mySocket.g_socket;
        }
        else {
            mySocket.g_socket= new mySocket();
            mySocket.g_socket.type = egret.WebSocket.TYPE_BINARY;
            mySocket.g_socket.__init();
            var pd = mySocket.g_socket.hashCode;
            console.log("----------- static create ------------ %d",pd);
            return mySocket.g_socket;
        }
    }


    public __init(): void {

        this.addEventListener(egret.Event.CONNECT,this.__onConnect,this);
        this.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.__onProgressData,this);
        this.addEventListener(egret.Event.CLOSE,this.__onClose,this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR,this.__onError,this);
        console.log("socket:connect ----------------------- __init");
        this.connect("ws://192.168.7.185",4001);
    }
    
    public __onConnect(event: egret.Event): void {
        console.log("-------------- socket is connected ----------------");
    }
    
    public __onSasen(flag: number,data: any)
    {
        console.log("--------------- __onSasen");
        console.log(data);
    }

    public __onClose(event: egret.Event): void {
        var pd = this.hashCode;
        console.log("----------- socket is closed ------------- %d",pd);
        this.removeEventListener(egret.Event.CONNECT,this.__onConnect,this);
        this.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.__onProgressData,this);
        this.removeEventListener(egret.Event.CLOSE,this.__onClose,this);
        this.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.__onError,this);
        mySocket.g_socket = null;

    }
    public __onProgressData(event:egret.ProgressEvent): void {
        var buffer = new egret.ByteArray();
        buffer.clear();
        this.readBytes(buffer);
    }


    public __onError(event: egret.IOErrorEvent): void {
        console.log(event.data)
        console.log(" --------------- socket has error ------------------ ");
    }
}
