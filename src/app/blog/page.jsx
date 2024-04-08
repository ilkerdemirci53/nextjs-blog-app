import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";

const getData = async () => {
	const res = await fetch("http://localhost:3000/api/blog");
	if (!res.ok) {
		throw new Error("Failed to fetch posts");
	}
	return res.json();
};

const BlogPage = async () => {
	// const posts = await getPosts();
	const posts = await getData();
	return (
		<div className={styles.container}>
			{posts.map((post) => (
				<div className={styles.post} key={post.id}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
};

export default BlogPage;
