import PostList from "../components/post_list";
import { connectDB } from "../util/db";


export default async function ListPage(){
    const db = (await connectDB).db('nextblog')
    let result = await db.collection('post').find().toArray();

    return(
        <div className="list-bg">
            <PostList result={result}/>
        </div>
    )
}