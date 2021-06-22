import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Paper, Typography } from "@material-ui/core";

const divCSS = { justifyContent: "center", alignItems: "center" };

const videoCenterCSS = {
	marginLeft: "auto",
	marginRight: "auto",
	display: "block",
	transform: "scaleX(-1)",
};

const paddingsCSS = {
	paddingLeft: "15px",
	paddingRight: "15px",
	paddingTop: "15px",
	paddingBottom: "15px",
};

function HomeBody() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem(`profile`))
	);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	return (
		<div style={divCSS}>
			<Paper style={paddingsCSS} elevation={3}>
				<Paper style={paddingsCSS} elevation={3}>
					{user ? (
						<div>
							<Webcam ref={videoRef} style={videoCenterCSS} />
							<canvas ref={canvasRef} style={videoCenterCSS} />
						</div>
					) : (
						<Typography variant="h6" component="h6">
							Proszę się zalogować.
						</Typography>
					)}
				</Paper>
			</Paper>
		</div>
	);
}

export default function Home() {
	return (
		<>
			<div style={{ paddingTop: "80px" }} />
			<HomeBody />
		</>
	);
}
