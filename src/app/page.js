import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "./util/db";

export default async function Home() {
    const client = await connectDB;
    const db = (await connectDB).db('nextblog')
    let result = await db.collection('post').find().toArray();

    return(
        <div>
            <p>{result[0]?.title}</p>
            <p>{result[0]?.content}</p>
        </div>
    )
}
