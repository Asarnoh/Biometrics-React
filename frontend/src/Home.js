import * as faceapi from 'face-api.js';
import React, { useState } from "react";
import {
	Navbar,
	Nav,
	Table,
	Button,
	Carousel,
	Jumbotron,
} from "react-bootstrap";
import { Link } from "react-router-dom";

console.log(faceapi.nets)
export default function Home() {
	return (
		<>
			<Navbar fixed="bottom" bg="light">
				<h3>HYR</h3>
			</Navbar>
		</>
	);
}
