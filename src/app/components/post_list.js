'use client'
import Link from "next/link"
import { useState } from "react"
import './post_list.css'

export default function PostList({result, login}){
    const [listData, setListData] = useState(result)  //동적화면변동을 위해 가져온 result를 useState에 담음
    const [goodBtn, setGoodBtn] = useState(result.map(() => 0))  //게시물 추천 초기값들을 0으로
   
    const goodBtnHandler = (index)=>{
        const newGoodBtn = [...goodBtn];  //배열 풀기

        //추천을 반복해서 누를 수 없게
        if(goodBtn[index] === 1){
            newGoodBtn[index] -= 1;
        }else{
            newGoodBtn[index] += 1;  
        }
        setGoodBtn(newGoodBtn); 
    }

    return(
        <div>
            
            {
                
                //반복문 돌려서 가져온 result안에 데이터가 표시되게
                listData && listData.length > 0 ? result.map((item, index)=>{
                    return(
                        <div key={index} className="list-item">
                            <Link href={'/detail/' + item._id} style={{textDecoration:'none'}}>
                                <h2>{item.title}</h2> 
                                <p>{item.content}</p>
                            </Link>
                            <br></br>
                            <Link href={'/edit/' + item._id} style={{textDecoration:'none'}}><span>수정 🔨 </span></Link>
                            <span onClick={()=>{
                                fetch('/api/delete/list_item',{
                                    method: 'DELETE',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({id:item._id, email: item.email})
                                })
                                .then((res)=>{
                                    if(res.status == 200){
                                        setListData(prev => prev.filter((i)=>i._id !== item._id)) 
                                        return res.json();
                                    }else if(res.status == 400){
                                        alert('글 작성자만 삭제할 수 있습니다.')
                                        return res.json()
                                    }
                                }) 
                                .then((resJson)=>{
                                    console.log(resJson)  
                                })
                                .catch((error)=>{
                                    console.log(error)  
                                })
                            }}> 삭제 🗑</span> 
                            <br></br>
                            <span onClick={()=>{goodBtnHandler(index)}}>추천 💗</span><span>{goodBtn[index]}</span>
                            {/* [index] -> 0, 1, 2같은 숫자가 들어가 게시물을 구별해서 추천 수 높여줄 거임 */}
                        </div>
                    )
                }) : (
                        <div>
                            <div>작성된 글이 없습니다.</div>
                            <Link href='/write'>글 작성하러 가기</Link>
                        </div>

                      )
                      
            }
        </div>
    )
}