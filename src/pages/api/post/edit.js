import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";


export default async function handler(req, res){
        if(req.method === 'POST'){
            let {id, title, content} = req.body;
            console.log(req.body)

            if(id && title && content){
                try{
                    const db = (await connectDB).db('nextblog')
                    let result = await db.collection('post').updateOne({_id: ObjectId.createFromHexString(id)},
                    {
                        $set:{
                            title: title,
                            content: content
                        }})
                        return res.redirect(302, '/list')
                    }catch(error){
                        res.status(500).json({error: error})
                    }
                }
        }else{
            res.status(405).json({error: 'POST타입의 요청을 보내주세요.'});
        }
}