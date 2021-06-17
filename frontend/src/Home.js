import * as faceapi from "face-api.js";
import React, { useState, Component } from "react";
import { Navbar } from "react-bootstrap";
import { Button, Paper, Typography, Input } from "@material-ui/core";
import { Link } from "react-router-dom";

console.log(faceapi.nets);

const nazwa_strony = "Biometria 20/21";

function HomeBody() {
	// const detections = faceapi.detectAllFaces(input);
	const selectedFile = document.getElementById("input")?.files[0];
	const fileInput = React.createRef();

	const handleOnSubmit = (event) => {
		event.preventDefault();
		alert(`Selected file - ${fileInput.current.files[0].name}`);
	};

	return (
		<Paper style={{ paddingLeft: "15px", paddingRight: "15px" }}>
			<Paper elevation={3}>
				<Typography variant="h6" component="h6">
					Dzień dobry, proszę postępować z instrukcjami ponziej aby
					przejść przez rpoces rozpoznawania twarzy.
				</Typography>
			</Paper>
			<div style={{ position: "relative", paddingTop: "15px" }} />
			<Paper elevation={3}>
				<form onSubmit={handleOnSubmit}>
					<label>
						Wybierz plik
						<input type="file" ref={fileInput} />
					</label>
					<br />
					<Button type="submit">Wyślij</Button>
				</form>
			</Paper>
			<div style={{ position: "relative", paddingTop: "15px" }} />
			<Paper elevation={3}>
				<>hej</>
			</Paper>
		</Paper>
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
