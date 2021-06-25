import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Paper, Typography } from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh } from "./utilities";
import * as fs from "fs";
import { saveAs } from "file-saver";
import { findBackend } from "@tensorflow/tfjs";

const divCSS = { justifyContent: "center", alignItems: "center" };

const videoCenterCSS = {
	justifyContent: "center",
	position: "absolute",

	alignItems: "center",
	marginLeft: "auto",
	marginRight: "auto",
	display: "block",
	transform: "scaleX(-1)",
	textAlign: "center",
	width: 640,
	height: 480,
};

const canvasCenterCSS = {
	justifyContent: "center",
	position: "absolute",

	alignItems: "center",
	marginLeft: "auto",
	marginRight: "auto",
	display: "block",
	transform: "scaleX(-1)",
	textAlign: "center",
	width: 640,
	height: 480,
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
	let isWrittenOceFlag = true;

	const runFaceMesh = async () => {
		const net = await facemesh.load({
			inputResolution: { width: 640, height: 480 },
			scale: 0.8,
		});

		setInterval(() => {
			detectFace(net);
		}, 100);
	};

	const detectFace = async (net) => {
		if (
			typeof videoRef.current !== "undefined" &&
			videoRef.current !== null &&
			videoRef.current.video.readyState === 4
		) {
			const video = videoRef.current.video;
			const width = videoRef.current.video.videoWidth;
			const height = videoRef.current.video.videoHeight;

			videoRef.current.video.width = width;
			canvasRef.current.width = width;

			videoRef.current.video.height = height;
			canvasRef.current.height = height;

			const face = await net.estimateFaces(video);
			const canvas_text = canvasRef.current.getContext("2d");
			drawMesh(face, canvas_text);
			console.log(face);

			if (isWrittenOceFlag) {
				isWrittenOceFlag = false;
				// var FileSaver = require("file-saver");
				// var blob = new Blob(face, {
				// 	type: "text/plain;charset=utf-8",
				// });
				// FileSaver.saveAs(blob, "MartinsFace.txt");
				// const fs = require("fs");
				// const data = JSON.stringify(face);
				// fs.writeFile("user.json", data, (err) => {
				// 	if (err) {
				// 		throw err;
				// 	}
				// 	console.log("JSON data is saved.");
				// });
				var fs = require("browserify-fs");

				fs.mkdir("/faces", function () {
					fs.writeFile(
						"/faces/Martinsface.txt",
						JSON.stringify(face)
					);
				});
			}
		} else {
			console.error("Face not detected");
		}
	};

	runFaceMesh();
	return (
		<div style={divCSS}>
			<Paper style={paddingsCSS} elevation={3}>
				<Paper style={paddingsCSS} elevation={3}>
					{user ? (
						<div>
							<Webcam ref={videoRef} style={videoCenterCSS} />
							<canvas ref={canvasRef} style={canvasCenterCSS} />
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
