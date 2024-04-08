import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

const getData = async (slug) => {
	const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
};

export const generateMetadata = async ({ params }) => {
	const { slug } = params;
	const post = await getPost(slug);
	return {
		title: post.title,
		description: post.desc,
	};
};

const SinglePostPage = async ({ params }) => {
	const { slug } = params;
	const post = await getData(slug);
	// const post = await getPost(slug);

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image src="/post.jpg" alt="" fill className={styles.img} />
			</div>
			<div className={styles.textContainer}>
				<h1 className={styles.title}>{post?.title}</h1>
				<div className={styles.detail}>
					<Image
						className={styles.avatar}
						src="/post.jpg"
						alt=""
						width={50}
						height={50}
					/>
					{post && (
						<Suspense fallback={<div>Loading...</div>}>
							<PostUser userId={post.userId} />
						</Suspense>
					)}
					<div className={styles.detailText}>
						<span className={styles.detailTitle}>Published</span>
						<span className={styles.detailValue}>
							{post.createdAt.toString().slice(4, 16)}
						</span>
					</div>
				</div>
				<div className={styles.content}>{post.body}</div>
			</div>
		</div>
	);
};

export default SinglePostPage;
