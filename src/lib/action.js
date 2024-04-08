"use server";
import { revalidatePath } from "next/cache";
import { connectToDb } from "./connectToDb";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData) => {
	const { title, desc, slug, userId } = Object.fromEntries(formData);

	try {
		connectToDb();
		const newPost = new Post({
			title,
			desc,
			slug,
			userId,
		});

		await newPost.save();
		console.log("Post saved successfully");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		return { error: err.message };
	}
};

export const deletePost = async (formData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();

		await Post.findByIdAndDelete(id);
		console.log("Post saved successfully");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		return { error: err.message };
	}
};

export const addUser = async (prevState, formData) => {
	const { username, email, password, img } = Object.fromEntries(formData);

	try {
		connectToDb();
		const newUser = new User({
			username,
			email,
			password,
			img,
		});

		await newUser.save();
		console.log("User saved successfully");
		revalidatePath("/admin");
	} catch (err) {
		return { error: err.message };
	}
};

export const deleteUser = async (formData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();
		await Post.deleteMany({ userId: id });
		await User.findByIdAndDelete(id);
		console.log("User saved successfully");
		revalidatePath("/admin");
	} catch (err) {
		return { error: err.message };
	}
};

export const handleGithubLogin = async () => {
	"use server";
	await signIn("github");
};

export const handleLogout = async () => {
	"use server";
	await signOut();
};

export const register = async (previousState, formData) => {
	const { email, password, username, img, passwordRepeat } =
		Object.fromEntries(formData);

	if (password !== passwordRepeat) {
		return { error: "Passwords do not match" };
	}

	try {
		connectToDb();
		const user = await User.findOne({ username });
		if (user) {
			return { error: "User already exists" };
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img,
		});
		await newUser.save();
		return { success: true };
	} catch (err) {
		return { error: "Something went wrong!" };
	}
};

export const login = async (prevState, formData) => {
	const { password, username } = Object.fromEntries(formData);

	try {
		await signIn("credentials", {
			username,
			password,
		});
	} catch (err) {
		if (err.message.includes("CredentialsSignin")) {
			return { error: "Invalid username or password!" };
		}

		throw err;
	}
};
