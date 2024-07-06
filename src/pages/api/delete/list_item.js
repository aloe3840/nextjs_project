import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";


export default async function handler(req, res){
    console.log(req.body)
    let {id} = req.body;

    if(req.method === 'DELETE'){
        try{
            const db = (await connectDB).db('nextblog')
            let result = await db.collection('post').deleteOne({_id: ObjectId.createFromHexString(id)});
            res.status(200).json({msg: '삭제 완료'})
        }catch(error){
            res.status(500).json({msg: '서버 오류'+ error})
        }
    }else{
        res.status(405).json({msg: 'DELETE요청만 가능합니다.'})
    }
}