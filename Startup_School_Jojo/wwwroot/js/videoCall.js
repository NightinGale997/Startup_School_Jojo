javascript
let peer;

export function startPeerJsConnection(dotNetReference) {
    peer = new Peer();

    peer.on("open", (id) => {
        dotNetReference.invokeMethodAsync("OnCall", id);
    });

    peer.on("call", (call) => {
        call.answer();
        call.on("stream", (stream) => {
            const streamReference = attachMediaStream(remoteVideoElement, stream);
            dotNetReference.invokeMethodAsync("OnStreamReceived", streamReference);
        });
        call.on("close", () => {
            dotNetReference.invokeMethodAsync("OnCallClosed");
        });
    });
}

export function callPeer(connectionId, localVideoReference) {
    const call = peer.call(connectionId, getUserMediaStream(localVideoReference));
    call.on("stream", (stream) => {
        const streamReference = attachMediaStream(remoteVideoElement, stream);
        dotNetReference.invokeMethodAsync("OnStreamReceived", streamReference);
    });
    call.on("close", () => {
        dotNetReference.invokeMethodAsync("OnCallClosed");
    });
}

export function startMediaDevices(localVideoReference) {
    const constraints = {
        audio: true,
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            const streamReference = attachMediaStream(localVideoElement, stream);
            dotNetReference.invokeMethodAsync("OnMediaDevicesStarted", streamReference);
        })
        .catch((error) => {
            console.error("Error accessing media devices: ", error);
        });
}

export function attachMediaStream(element, stream) {
    element.srcObject = stream;
    element.play();
    return element.srcObject.id;
}

export function stopMediaDevices(localVideoReference) {
    const stream = getUserMediaStream(localVideoReference);
    stream.getTracks().forEach((track) => {
        track.stop();
    });
    localVideoElement.pause();
    localVideoElement.srcObject = null;
}

export function createLocalVideoElement() {
    const element = document.createElement("video");
    element.autoplay = true;
    localVideoContainer.appendChild(element);
    return element.id;
}

export function createRemoteVideoElement() {
    const element = document.createElement("video");
    element.autoplay = true;
    remoteVideoContainer.appendChi


    ld(element);
    return element.id;
}

export function getUserMediaStream(localVideoReference) {
    const element = document.getElementById(localVideoReference);
    return element.srcObject;
}

export function startSignalRConnection(dotNetReference) {
    dotNetReference.invokeMethodAsync("OnSignalRConnectionStarted");
}

export function addCallHandler(connectionId, dotNetReference) {
    peer.on("call", (call) => {
        if (call.peer === connectionId) {
            call.answer();
            call.on("stream", (stream) => {
                const streamReference = attachMediaStream(remoteVideoElement, stream);
                dotNetReference.invokeMethodAsync("OnStreamReceived", streamReference);
            });
            call.on("close", () => {
                dotNetReference.invokeMethodAsync("OnCallClosed");
            });
        }
    });
}

export function removeCallHandler(connectionId) {
    const activeCall = peer.connections[connectionId];
    if (activeCall) {
        activeCall.close();
    }
}

