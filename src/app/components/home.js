'use client'
import { useState, useEffect } from 'react';
import './home.css';
import Profile from './profile';

export default function HomeProfile({ login }) {
    const [name, setName] = useState(login?.user?.name);
    const [image, setImage] = useState('/default_profile.png');  
    const [showProfile, setShowProfile] = useState(false);

    // 로컬 스토리지에서 데이터 가져오기
    // 입력한 데이터들을 저장하기 위해 (페이지를 나갔다 들어오면 사라짐을 방지하기 위해) 사용
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedImage = localStorage.getItem('image');
        if (storedName) setName(storedName);
        if (storedImage) setImage(storedImage);
    }, []);

    const profileOpen = () => {
        setShowProfile(true);
    };

    const profileClose = () => {
        setShowProfile(false); 
    };

    const handleNameChange = (newName) => {
        setName(newName);
        localStorage.setItem('name', newName);
    };

    const handleImageChange = (newImage) => {
        setImage(newImage);
        localStorage.setItem('image', newImage);
    };

    return (
        login? (
            <div className="profile">
                <h1>Profile</h1> 
                {image && <img src={image} alt="User selected" className='profile-img' />}
                <h3>{name}</h3>
                <br />
                <button className='profile-btn' onClick={profileOpen}>프로필 설정</button>
                {showProfile && 
                    <Profile 
                        onNameChange={handleNameChange}
                        onImageChange={handleImageChange} 
                        onSubmit={profileClose}
                    />
                }
            </div>
        ): (
            <div className='profile-fail'>
                <h3>로그인 후 프로필 설정이 가능합니다.</h3>
            </div>
        )
    );
}
