import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";


export default async function({params}){
    const db = (await connectDB).db('nextblog')
    let result = await db.collection('post').findOne({_id: ObjectId.createFromHexString(params.slug)});

    return(
        <div className="detail-container">
            <h2>{result?.title}</h2>
            <p>{result?.content}</p>
        </div>
    )
}