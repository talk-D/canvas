import { useState } from "react";

function Cropper() {
    /* 이미지 상태 관리 변수들 */
    // 프로필 이미지 화면에 보여주기
    const [profileImage, setProfileImage] = useState(null);
    // 사용자가 선택한 이미지
    const [selectImage, setSelectImage] = useState(null);
    // 크롭된 이미지
    const [croppedImage, setCroppedImage] = useState(null);
    // 이미지 cropper 모달
    const [openCropper, setOpenCropper] = useState(false);

    return(
        <div>
        <input
        type='file'
        ref={imageUploadInput}
        accept='image/*'
        onChange={selectImageHandelr} // 이미지 선택 handler 호출
        style={{ display: 'none' }}
      />
      <ProfileImageButton onClick={() => setProfileModal(true)}>
        <img
          className='profileImage'
          src={
            profileImage || // profileImage 표시
            'https://t1.daumcdn.net/cfile/tistory/243FE450575F82662D'
          }
          alt='프로필 사진'
        />
        <img
          className='cameraIcon'
          src={`${process.env.PUBLIC_URL}assets/svgs/camera.svg`}
          alt='프로필 사진'
        />
      </ProfileImageButton>

      {openCropper && ( // openCropper가 true일 때 모달을 연다
            <CropperModal
              imageSubmitHandler={imageSubmitHandler}
              selectImage={selectImage}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              setOpenCropper={setOpenCropper}
            />
          )}
      </div>
    );

}

export default Cropper;
