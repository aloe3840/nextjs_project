'use client'
import Link from "next/link"
import { useState } from "react"
import './post_list.css'

export default function PostList({result}){
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
                                    body: JSON.stringify({id:item._id})
                                })
                                .then((res)=>{
                                    //fetch가 완료되면 실행될 코드. res엔 응답값 담겨있음
                                    if(res.status === 200){
                                        setListData(prev => prev.filter((i)=>i._id !== item._id)) //filter: 입력값을 배열에서 찾아 걸러줌
                                        //then에서 return하면 다음 then
                                        return res.json();
                                    }else{
                                        //200이 아니면 status 변경 X
                                        return res.json();
                                    }
                                }) 
                                .then((resJson)=>{
                                    console.log(resJson) //첫 번째 then에서 반환한 값을 매개변수로 받기 
                                })
                                .catch((error)=>{
                                    console.log(error)  //fetch사용할 땐 굳이 try없어도 fetch로 가능. fetch가 then, catch를 지원
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