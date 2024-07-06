'use client'
import './profile.css'
import { useState } from 'react';

export default function Profile({ onNameChange, onImageChange, onSubmit }) {
    const [name, setName] = useState(''); // 현재 이름 상태
    const [image, setImage] = useState(''); // 현재 이미지 상태
    const [localName, setLocalName] = useState('');
    const [localImage, setLocalImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);  //미리보기 이미지 state

    const handleNameChange = (e) => {   //이름 바뀨는 변수
        setLocalName(e.target.value);
        onNameChange(e.target.value);
    };

    const handleImageChange = (e) => {  //사진 바꾸는 변수
        const file = e.target.files[0];  //배열 X, 개별 파일에 접근할 수 있게
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLocalImage(imageUrl);
            setPreviewImage(imageUrl);
        }
    };

    const handleSubmit = (e) => {  
        setName(localName); // 제출 시 실제 이름 상태 업데이트
        setImage(localImage); // 제출 시 실제 이미지 상태 업데이트
        onNameChange(localName); // 제출 시 이름 변경 콜백 호출
        onImageChange(localImage); // 제출 시 이미지 변경 콜백 호출
        profileClose(); // 프로필 설정 창 닫기
    };

    return (
        <div className='profile-container'>
            <div className='profile-mini-container'>
                <div className='nav-text'>
                    <h3>프로필</h3>
                    <span onClick={onSubmit}>X</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder='이름을 입력하세요' 
                        defaultValue={name}
                        value={localName}
                        onChange={handleNameChange}
                    />
                    <input 
                        type="file" 
                        onChange={handleImageChange}
                    />
                     {previewImage && <img src={previewImage} className="preview-image" />}
                    <br></br>
                    <button type='submit'>제출</button>
                </form>
            </div>
        </div>
    )
}
