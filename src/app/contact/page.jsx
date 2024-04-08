import Image from "next/image";
import styles from "./contact.module.css";

export const metadata = {
	title: "Contact Page",
	description: "Contact description",
};

const ContactPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				<Image src="/contact.png" alt="" fill className={styles.img} />
			</div>
			<div className={styles.formContainer}>
				<h1 className={styles.contactText}>Contact Form</h1>
				<form action="" className={styles.form}>
					<input type="text" required placeholder="Name and Surname" />
					<input type="email" required placeholder="Email Address" />
					<input type="text" placeholder="Phone Number (Optional)" />
					<textarea name="" id="" rows="10" placeholder="Message"></textarea>
					<button>Send</button>
				</form>
			</div>
		</div>
	);
};

export default ContactPage;
