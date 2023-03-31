const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' })

let localTracks = []
let remoteUsers = {}

AgoraRTC.setLogLevel(4);

let joinAndDisplayLocalStream = async () => {
    document.getElementById('join-btn').innerHTML = "Connecting..."
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/rtcToken",
        success: async function (data) {
            const TOKEN = data.key;
            client.on('user-published', handleUserJoined)
            client.on('user-left', handleUserLeft)
            let UID = await client.join(APP_ID, CHANNEL_NAME, TOKEN, null)
            localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
            let player = `<div class="video-container" id="user-container-${UID}">
                                <div class="video-player" id="user-${UID}"></div>
                        </div>`
            document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
            localTracks[1].play(`user-${UID}`)
            await client.publish([localTracks[0], localTracks[1]])
            document.getElementById('join-btn').style.display = 'none'
        },
        error: function () {
            window.alert = function () {
                modalpopup = $('<div id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" class="modal fade mt-5 text-light" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content border-info"><div class="modal-header border-info"><h5 id="myModalTitle" class="modal-title fw-bold text-warning fs-4">Warning</h5><button type="button" class="btn-close bg-info" data-bs-dismiss="modal" aria-label="Close" onclick="location.reload();"></button></div><div class="modal-body text-light fw-bold"></div><div class="modal-footer border-info"><button type="button" class="btn btn-secondary border-info border-3 fw-bold" data-bs-dismiss="modal" onclick="location.reload();">Okay</button></div></div></div></div>');
                modalpopup.find(".modal-body").text(arguments[0]);
                modal = new bootstrap.Modal(modalpopup);
                modal.show();
            };
        alert('No available server at the moment. Please try again later.');
        },
    });
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('stream-controls').style.display = 'flex'
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)
    if (mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null) {
            player.remove()
        }
        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play(`user-${user.uid}`)
    }
    if (mediaType === 'audio') {
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

window.addEventListener("beforeunload",function(){
    if(document.querySelector('video-container') == null){
    }
    else{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
    }
});

let leaveAndRemoveLocalStream = async () => {
    for (let i = 0; localTracks.length > i; i++) {
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    document.getElementById('join-btn').innerHTML = "Join Stream"
    document.getElementById('join-btn').style.display = 'block'
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('video-streams').innerHTML = ''
}

let toggleMic = async (e) => {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    } else {
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}


let toggleCamera = async (e) => {
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    } else {
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

document.getElementById('join-btn').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)