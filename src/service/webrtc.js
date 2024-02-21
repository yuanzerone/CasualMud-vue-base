import { ElMessage } from 'element-plus'
export default class WebrtcClient {

    ws;
    uid;
    room;
    connectionList = {};
    iceServers;
    timeout = 3000;
    timeoutObj = null;
    serverTimeoutObj = null;
    lockReconnect = false;
    wsServer;
    keepConnect = true;
    receiveBuffer = [];
    packetNum = 0;

    constructor(iceServers, wsServer, room) {
        this.iceServers = iceServers
        this.wsServer = wsServer
        this.createWebSocket(room)
        window.onbeforeunload = () => {
            this.keepConnect = false;
            this.ws.close();
        }
    }

    getConnectionNum() {
        return Object.keys(this.connectionList).length
    }

    createWebSocket(room) {
        this.ws = new WebSocket(this.wsServer)
        this.room = room
        this.ws.onclose = this.reconnect
        this.ws.onopen = this.onWSOpen
        this.ws.onmessage = this.onWSMessage
    }

    reconnect = () => {
        this.resetHeartbeat()
        if (this.keepConnect && !this.lockReconnect) {
            this.lockReconnect = true
            setTimeout(() => {
                this.createWebSocket()
                this.lockReconnect = false;
            }, 1000)
        }
    }

    resetHeartbeat() {
        this.timeoutObj && clearTimeout(this.timeoutObj)
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    }

    heartbeat() {
        this.resetHeartbeat()
        this.timeoutObj = setTimeout(() => {
            if (this.keepConnect) {
                this.ws.send(JSON.stringify({
                    type: "heartbeat",
                    from: this.uid
                }))
                this.serverTimeoutObj = setTimeout(() => {
                    this.ws.close();
                }, this.timeout)
            }
        }, this.timeout)
    }

    onReady = () => {
    };

    onConnected = () => {
    };

    onReceive = () => {
    };

    createConnection(remoteUid) {
        console.log("connect to remote")
        const peer = new RTCPeerConnection(
            {
                iceServers: this.iceServers
            }
        )
        peer.oniceconnectionstatechange = (event) => {
            if (peer.iceConnectionState === "disconnected") {
                this.closeConnection(remoteUid, -1, {
                    title: '断开连接',
                    message: '与主机的连接已断开',
                    type: 'error',
                    duration: 1000
                })
            }
        }
        const channel = peer.createDataChannel("channel");
        channel.onmessage = this.handelReceive
        channel.onopen = () => {
            ElMessage({
                title: '成功加入',
                message: '您已成功加入',
                type: 'success',
                duration: 1000
            })
            this.onConnected()
        }
        channel.onclose = () => {
            if (host !== -1) {
                this.closeConnection(remoteUid, -1, {
                    title: '断开连接',
                    message: '主机已断开连接',
                    type: 'error',
                    duration: 1000
                })
            }
        }
        let offer = new Promise((resolve, reject) => {
            peer.createOffer().then((desc) => {
                peer.setLocalDescription(desc).then(() => {
                    resolve(desc)
                })
            })
        })
        let candidate = new Promise((resolve, reject) => {
            let candidateList = []
            peer.onicecandidate = (event) => {
                if (event.candidate) {
                    candidateList.push(event.candidate)
                } else {
                    resolve(candidateList)
                }
            }
        })

        Promise.all([offer, candidate]).then((result) => {
            this.ws.send(JSON.stringify({
                type: 'call',
                data: {
                    from: this.uid,
                    to: remoteUid,
                    sdp: result[0]
                }
            }))
            this.ws.send(JSON.stringify({
                type: 'ice',
                data: {
                    from: this.uid,
                    to: remoteUid,
                    candidate: result[1]
                }
            }))
        })

        this.connectionList[remoteUid] = {
            peer: peer,
            channel: channel
        };
    }

    closeConnection(remoteUid, notify) {
        const connection = this.connectionList[remoteUid]
        if (connection.channel) {
            connection.channel.close()
        }
        if (connection.peer) {
            connection.peer.close()
        }
        delete this.connectionList[remoteUid]
        ElMessage(notify)
    }

    leave() {
        for (const key in this.connectionList) {
            const connection = this.connectionList[key]
            if (connection.channel) {
                connection.channel.close()
            }
            if (connection.peer) {
                connection.peer.close()
            }
            delete this.connectionList[key]
        }
        ElMessage({
            title: '成功断开',
            message: '与其他人的连接已成功断开',
            type: 'info',
            duration: 1000
        })
    }

    sendMessage(message) {
        const length = message.length;
        if (length > 16384) {
            const num = Math.ceil(length / 16300);
            for (const key in this.connectionList) {
                const channel = this.connectionList[key].channel
                channel.send(JSON.stringify({
                    type: 'total',
                    num: num
                }))
                for (let i = 0; i < num; i++) {
                    channel.send(JSON.stringify({
                        type: 'buffer',
                        num: i,
                        data: message.substring(i * 16300, (i + 1) * 16300)
                    }))
                }
            }
            this.ws.send()
            for (let i = 0; i < num; i++) {
                this.ws.send(JSON.stringify({
                    type: 'buffer',
                    num: i,
                    data: message.substring(i * 16384, (i + 1) * 16384)
                }))
            }
        } else {
            for (const key in this.connectionList) {
                const channel = this.connectionList[key].channel
                channel.send(message)
            }
        }
    }

    handelReceive = (event) => {
        const msg = event.data;
        try {
            const data = JSON.parse(msg);
            if (data.type === 'total') {
                this.receiveBuffer = [];
                this.packetNum = data.num;
            } else if (data.type === 'buffer') {
                this.receiveBuffer[data.num] = data.data;
                if (this.receiveBuffer.length === this.packetNum) {
                    this.onReceive(JSON.parse(this.receiveBuffer.join('')));
                }
            } else {
                this.onReceive(data);
            }
        } catch (e) {

        }
    }

    onWSOpen = () => {
        this.ws.send(JSON.stringify({
            type: 'connect',
            data: {
                room: this.room
            }
        }))
        this.heartbeat();
    }

    onWSMessage = (event) => {
        this.heartbeat();
        const body = JSON.parse(event.data)
        const data = body.data;
        switch (body.type) {
            case "connect":
                this.uid = data.num
                this.onReady()
                this.ws.send(JSON.stringify({
                    type: "getAllClients",
                    data: {
                        room: this.room,
                        from: this.uid
                    }
                }))
                break;
            case "getAllClients":
                const clients = data;
                console.log(clients)
                clients.forEach(client => {
                    this.createConnection(client)
                });
                break;
            case "call":
                const callFrom = data.from;
                ElMessage({
                    title: '有人加入',
                    message: '用户' + callFrom + '尝试加入中',
                    type: 'info',
                    duration: 1000
                })
                if (this.connectionList[callFrom]) {
                    const connection = this.connectionList[callFrom];
                    if (connection.channel) {
                        connection.channel.close();
                    }
                    if (connection.peer) {
                        connection.peer.close();
                    }
                    delete this.connectionList[callFrom];
                }
                const connection = new RTCPeerConnection({
                    iceServers: this.iceServers
                });
                connection.ondatachannel = (event) => {
                    const channel = event.channel;
                    if (channel) {
                        channel.onopen = () => {
                            ElMessage({
                                title: '有人加入',
                                message: '用户' + callFrom + '成功加入',
                                type: 'success',
                                duration: 1000
                            })
                        }
                        channel.onclose = () => {
                            if (host !== -1) {
                                this.closeConnection(callFrom, 1, {
                                    title: '有人断开',
                                    message: '用户' + callFrom + '已断开连接',
                                    type: 'info',
                                    duration: 1000
                                })
                            }
                        }
                        this.connectionList[callFrom].channel = channel
                    }
                }
                connection.oniceconnectionstatechange = (event) => {
                    if (connection.iceConnectionState === "disconnected") {
                        this.closeConnection(callFrom, 1, {
                            title: '有人断开',
                            message: '用户' + callFrom + '的连接已断开',
                            type: 'info',
                            duration: 1000
                        })
                    }
                }
                this.connectionList[callFrom] = { peer: connection };

                let candidate = new Promise((resolve, reject) => {
                    let candidateList = []
                    connection.onicecandidate = (event) => {
                        if (event.candidate) {
                            candidateList.push(event.candidate)
                        } else {
                            resolve(candidateList)
                        }
                    }
                })
                let answer = new Promise((resolve, reject) => {
                    connection.setRemoteDescription(data.sdp).then(() => {
                        connection.createAnswer().then((desc) => {
                            connection.setLocalDescription(desc).then(() => {
                                resolve(desc)
                            })
                        })
                    })
                })

                Promise.all([answer, candidate]).then(result => {
                    this.ws.send(JSON.stringify({
                        type: 'answer',
                        data: {
                            from: this.uid,
                            to: callFrom,
                            sdp: result[0]
                        }
                    }))
                    this.ws.send(JSON.stringify({
                        type: 'ice',
                        data: {
                            from: this.uid,
                            to: callFrom,
                            candidate: result[1]
                        }
                    }))
                })
                break;
            case "answer":
                const answerFrom = data.from;
                if (this.connectionList[answerFrom]) {
                    const connection = this.connectionList[answerFrom].peer;
                    connection.setRemoteDescription(data.sdp)
                }
                break;
            case "ice":
                const iceFrom = data.from;
                if (this.connectionList[iceFrom]) {
                    const connection = this.connectionList[iceFrom].peer;
                    const candidateList = data.sdp;
                    for (const candidate of candidateList) {
                        connection.addIceCandidate(candidate)
                    }
                }
                break;
        }
    }
}