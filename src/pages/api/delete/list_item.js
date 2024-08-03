import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res){
    console.log(req.body)

    if(req.method === 'DELETE'){
        try{
            let {id, email} = req.body;
            let session = await getServerSession(req, res, authOptions) //현재 로그인 정보

            if(session?.user?.email === email || session?.user?.email === 'admin@admin.com'){
                const db = (await connectDB).db('nextblog');  
                let result = await db.collection('post').deleteOne({_id: ObjectId.createFromHexString(id)});
                res.status(200).json({msg: '삭제 완료'});
            }else{
                //요청오류실수 400
                res.status(400).json({error: '삭제는 글 작성자만 할 수 있습니다.'})
            }
        }catch(error){
            res.status(500).json({msg: '서버 오류'+ error})
        }
    }else{ 
        res.status(405).json({msg: 'DELETE요청만 가능합니다.'})
    }
}