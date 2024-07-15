import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function WritePage(){
    let session = await getServerSession(authOptions)

    if(session){
        return(
            <div className="write-container">
                <form method="POST" action="/api/post/new">
                    <input placeholder='제목을 입력하세요' name="title"></input>
                    <br></br>
                    <textarea placeholder='글내용을 입력하세요' name="content"></textarea>
                    <br></br>
                    <button type="submit">글 추가하기</button>
                </form>
            </div>
        )
        }else{
            return(
                <div>로그인이 필요해요.</div>
            )
        }
}