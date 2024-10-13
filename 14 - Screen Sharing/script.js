const videoEl = document.getElementById('video');
const btnRequest = document.getElementById('requestbtn');
const btnShare = document.getElementById('sharebtn');

btnRequest.addEventListener('click', () => {
    selectMediaStream();
});

btnShare.addEventListener('click', async () => {
    if (videoEl.srcObject) {
        try {
            btnShare.disabled = true;
            await videoEl.requestPictureInPicture();
        } catch (error) {
            console.error('Error starting picture-in-picture:', error);
        } finally {
            btnShare.disabled = false;
        }
    } else {
        alert('กรุณาเลือกหน้าจอที่ต้องการแชร์ก่อน');
    }
});

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoEl.srcObject = mediaStream;
        videoEl.onloadedmetadata = () => {
            videoEl.play();
            videoEl.classList.remove('hidden');
        }
        btnShare.disabled = false;
    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('ไม่สามารถเข้าถึงอุปกรณ์ได้ กรุณาลองใหม่อีกครั้ง');
    }
}

// เพิ่มการจัดการเมื่อหยุดการแชร์หน้าจอ
videoEl.addEventListener('leavepictureinpicture', () => {
    if (videoEl.srcObject) {
        const tracks = videoEl.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoEl.srcObject = null;
        videoEl.classList.add('hidden');
        btnShare.disabled = true;
    }
});