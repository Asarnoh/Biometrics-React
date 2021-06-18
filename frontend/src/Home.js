import * as faceapi from "face-api.js";
import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Paper, Typography, Box } from "@material-ui/core";

const nazwa_strony = "Biometria 20/21";

const videoCenterCSS = {
	marginLeft: "auto",
	marginRight: "auto",
	display: "block",
};

const paddingsCSS = {
	paddingLeft: "15px",
	paddingRight: "15px",
	paddingTop: "15px",
	paddingBottom: "15px",
};

function HomeBody() {
	// const detections = faceapi.detectAllFaces(input);

	const videoRef = useRef(null);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem(`profile`))
	);
	const videoWidth = 900;

	useEffect(() => {
		getVideo();
	}, [videoRef]);

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: { width: videoWidth } })
			.then((stream) => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.error("error:", err);
			});
	};

	// Promise.all([
	// 	faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
	// 	faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
	// 	faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
	// 	faceapi.nets.faceExpressionNet.loadFromUri("/models"),
	// ]).then(getVideo());

	return (
		<div style={{ justifyContent: "center", alignItems: "center" }}>
			<Paper style={paddingsCSS} elevation={3}>
				<Paper elevation={3} style={paddingsCSS}>
					<Box>
						{user ? (
							<video style={videoCenterCSS} ref={videoRef} />
						) : (
							<Typography variant="h6" component="h6">
								Proszę się zalogować.
							</Typography>
						)}
					</Box>
				</Paper>
				<div style={{ paddingTop: "15px" }} />
				<Paper elevation={3} style={paddingsCSS}>
					<Box></Box>
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
			<Navbar fixed="bottom" bg="light">
				<Typography variant="h6" component="h6">
					{nazwa_strony}
				</Typography>
			</Navbar>
		</>
	);
}
