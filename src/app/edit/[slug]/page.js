import { ObjectId } from "mongodb";
import { connectDB } from "../../util/db";


export default async function EditPage({params}){
    const db = (await connectDB).db('nextblog')
    let result = await db.collection('post').findOne({_id: ObjectId.createFromHexString(params.slug)});

    return(
        <div className="write-container">
            <form method="POST" action="/api/post/edit">
                <input name="id" type="hidden" defaultValue={result._id}></input> {/* id도 default값 있어야함 */}
                <input defaultValue={result.title} name="title" ></input>
                <br></br>
                <input defaultValue={result.content} name="content"></input>
                <br></br>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}