import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "./util/db";
import Link from "next/link";

export default async function Home() {
    const client = await connectDB;
    const db = (await connectDB).db('nextblog')
    let result = await db.collection('post').find().toArray();

    return(
        <div className="home-page-container">
            <h2>Next Blog</h2>
                <h5>글을 보는 것 외의 활동은 로그인 후 이용 가능합니다.</h5>
                <Link href='/register'>회원가입 하러 가기</Link>
                <Link href='/write'>글 쓰러 가기</Link>
                <Link href='/mypost'>내가 쓴 글 보러가기</Link>
        </div>
    )
}
