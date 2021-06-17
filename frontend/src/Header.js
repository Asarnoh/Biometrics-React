import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// import logo from "./images/logo_hagalaz.png";

import "bootstrap/dist/css/bootstrap.min.css";

// https://stackoverflow.com/questions/39999367/how-do-i-reference-a-local-image-in-react
// Myk z import działa.
const nazwa_strony = "Projekt zaliczeniowy - Biometria 20/21";

export function Header() {
	const __selector = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem(`profile`))
	);
	console.log(`user = ${user?.response}`);
	const userName = user?.response?.name;
	const userImageUrl = user?.response?.imageUrl;
	console.log(`userName = ${userName}, userImageUrl = ${userImageUrl}`);

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		history.push(`/`);
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		setUser(JSON.parse(localStorage.getItem(`profile`)));
	}, [location]);

	return (
		<>
			<Navbar bg="light" variant="light" fixed="top">
				<Navbar.Brand href="/">
					<Container>
						{/* <img src={logo} width="50" height="50" alt="" /> */}
						<h3>{nazwa_strony}</h3>
					</Container>
				</Navbar.Brand>

				{user ? (
					<>
						<Avatar
							alt={userName}
							src={userImageUrl}
							style={{ position: "absolute", right: "120px" }}
						>
							{userName?.charAt(0)}
						</Avatar>
						<p
							style={{
								position: "absolute",
								right: "180px",
								fontWeight: "bold",
							}}
						>
							{userName}
						</p>
						<Button
							style={{ position: "absolute", right: "10px" }}
							variant="dark"
							size="lg"
							active
							onClick={logout}
						>
							Wyloguj
						</Button>
					</>
				) : (
					<>
						<Button
							style={{ position: "absolute", right: "10px" }}
							variant="dark"
							size="lg"
							active
							onClick={() => {}}
							as={Link}
							to="/register"
						>
							Logowanie
						</Button>
					</>
				)}
			</Navbar>
		</>
	);
}
