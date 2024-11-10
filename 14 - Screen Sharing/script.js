// ดึงองค์ประกอบ video จาก DOM โดยใช้ ID 'video'
const videoEl = document.getElementById('video');
// ดึงปุ่มขอแชร์หน้าจอจาก DOM โดยใช้ ID 'requestbtn'
const btnRequest = document.getElementById('requestbtn');
// ดึงปุ่มแชร์หน้าจอจาก DOM โดยใช้ ID 'sharebtn'
const btnShare = document.getElementById('sharebtn');

// เพิ่ม event listener ให้กับปุ่มขอแชร์หน้าจอ เมื่อคลิกจะเรียกฟังก์ชัน selectMediaStream
btnRequest.addEventListener('click', () => {
    selectMediaStream();
});

// เพิ่ม event listener ให้กับปุ่มแชร์หน้าจอ เมื่อคลิกจะเริ่มการแชร์หน้าจอในโหมด picture-in-picture
btnShare.addEventListener('click', async () => {
    // ตรวจสอบว่ามี media stream อยู่หรือไม่
    if (videoEl.srcObject) {
        try {
            // ปิดการใช้งานปุ่มแชร์เพื่อป้องกันการคลิกซ้ำ
            btnShare.disabled = true;
            // เรียกใช้ฟังก์ชัน requestPictureInPicture เพื่อเริ่มแชร์หน้าจอ
            await videoEl.requestPictureInPicture();
        } catch (error) {
            // แสดงข้อผิดพลาดใน console หากเกิดข้อผิดพลาด
            console.error('Error starting picture-in-picture:', error);
        } finally {
            // เปิดใช้งานปุ่มแชร์อีกครั้งเมื่อเสร็จสิ้น
            btnShare.disabled = false;
        }
    } else {
        // แสดงข้อความเตือนหากยังไม่ได้เลือกหน้าจอ
        alert('กรุณาเลือกหน้าจอที่ต้องการแชร์ก่อน');
    }
});

// ฟังก์ชันสำหรับเลือก media stream จากอุปกรณ์
async function selectMediaStream() {
    try {
        // ขอ media stream จากอุปกรณ์การแสดงผล
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        // ตั้งค่า media stream ให้กับ video element
        videoEl.srcObject = mediaStream;
        // เมื่อ metadata ของ video element โหลดเสร็จ จะเล่น video และลบ class 'hidden'
        videoEl.onloadedmetadata = () => {
            videoEl.play();
            videoEl.classList.remove('hidden');
        }
        // เปิดใช้งานปุ่มแชร์
        btnShare.disabled = false;
    } catch (error) {
        // แสดงข้อผิดพลาดใน console หากเกิดข้อผิดพลาดในการเข้าถึงอุปกรณ์
        console.error('Error accessing media devices:', error);
        // แสดงข้อความเตือนหากไม่สามารถเข้าถึงอุปกรณ์ได้
        alert('ไม่สามารถเข้าถึงอุปกรณ์ได้ กรุณาลองใหม่อีกครั้ง');
    }
}

// เพิ่ม event listener เมื่อออกจากโหมด picture-in-picture
videoEl.addEventListener('leavepictureinpicture', () => {
    // ตรวจสอบว่ามี media stream อยู่หรือไม่
    if (videoEl.srcObject) {
        // ดึง tracks จาก media stream
        const tracks = videoEl.srcObject.getTracks();
        // หยุดการทำงานของแต่ละ track
        tracks.forEach(track => track.stop());
        // ตั้งค่า srcObject เป็น null เพื่อเคลียร์ video element
        videoEl.srcObject = null;
        // เพิ่ม class 'hidden' เพื่อซ่อน video element
        videoEl.classList.add('hidden');
        // ปิดการใช้งานปุ่มแชร์
        btnShare.disabled = true;
    }
});