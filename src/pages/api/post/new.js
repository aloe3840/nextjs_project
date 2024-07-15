import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res){
    let session = await getServerSession(req, res, authOptions);

    if(req.method === 'POST'){
            let {title, content} = req.body
            if(session){
                req.body.email = session?.user?.email;
            }
            if(title && content && req?.body?.email){
                try{
                    const email = req.body.email
                    const db = (await connectDB).db('nextblog')
                    let result = await db.collection('post').insertOne({title, content, email})
                    return res.redirect(302, '/list')
                }catch{
                    return res.status(500).json({error: '서버 오류'})
                 }
            }else{
                return res.status(400).json({error: '빈칸은 허용되지 않습니다.'})
            }
           }else{
        return res.status(405).json({error: 'POST타입 요청만 보내주세요'})
    }
}