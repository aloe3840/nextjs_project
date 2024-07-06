

export default function WritePage(){
    return(
        <div className="write-container">
            <form method="POST" action="/api/post/new">
                <input placeholder='제목을 입력하세요' name="title"></input>
                <br></br>
                <input placeholder='글내용을 입력하세요' name="content"></input>
                <br></br>
                <button type="submit">글 추가하기</button>
            </form>
        </div>
    )
}