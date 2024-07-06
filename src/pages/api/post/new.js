import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";


export default async function(req, res){
    if(req.method === 'POST'){
            let {title, content} = req.body
            if(title && content){
                try{
                    const db = (await connectDB).db('nextblog')
                    let result = await db.collection('post').insertOne({title, content})
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