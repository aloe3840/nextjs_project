import { connectDB } from "@/app/util/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function EditPage({ params }) {
        const session = await getServerSession(authOptions);

        if (session) {
            const db = (await connectDB).db('nextblog');
            const result = await db.collection('post').findOne({ _id: ObjectId.createFromHexString(params.slug) });

            console.log(result.email)
            console.log(session.user.email)
            console.log('result: ', result)
            
            if (result.email == session.user?.email) {
                return (
                    <div className="write-container">
                        <form method="POST" action="/api/post/edit">
                            <input name="id" type="hidden" defaultValue={result._id}></input>
                            <input defaultValue={result.title} name="title" ></input>
                            <br></br>
                            <textarea defaultValue={result.content} name="content"></textarea>
                            <br></br>
                            <button type="submit">수정하기</button>
                        </form>
                    </div>
                );
            } else {
                return (
                    <div>글 작성자만 수정 가능합니다.</div>
                );
            }
        } else {
            return (
                <div>글 작성자만 수정 가능합니다.</div>
            );
        }
    } 
