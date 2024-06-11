// cropperModal.jsx
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // css도 import해줘야 한다.
function CropperModal(){

    return (
        <Wrapper>
          <button className='backButton'>
            <IconComponents
              iconType='vectorLeft'
              stroke='#FFF'
              onClick={() => setOpenCropper(false)}
            />
          </button>
          <button
            className='applyButton'
            onClick={() => imageSubmitHandler(croppedImage)} // 이미지 submit handler 호출
          >
            적용
          </button>
          <div>
            <Cropper
              src={selectImage} // 사용자가 선택한 사진
              crop={onCrop} // 크롭 함수 호출
              ref={cropperRef}
              aspectRatio={1} // 정사각형
              viewMode={1} // 크롭 영역이 이미지를 벗어나지 않게
              background={false}
              guides={false}
              data={{ width: '100%' }}
            />
          </div>
        </Wrapper>
      );
}
  