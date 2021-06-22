import React, { useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import { Paper, Typography, Box } from "@material-ui/core";

import { Switch, useRouteMatch, withRouter } from "react-router";
import { Header } from "./Header";
import { useDispatch } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// class App extends Component {
function App() {
	// z: https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/
	// function App() {

	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(/*tu coś*/);
	// }, [dispatch]);

	return (
		<>
			<Main />
		</>
	);
}

function Footer() {
	const nazwa_strony = "Biometria 20/21";

	return (
		<Navbar fixed="bottom" bg="light">
			<Typography variant="h6" component="h6">
				{nazwa_strony}
			</Typography>
		</Navbar>
	);
}

function Main() {
	const { path } = useRouteMatch();

	return (
		<>
			<Header />
			<Switch>
				<Route path={path} exact component={Home} />
				<Route path={path + "register"} component={Register} />
			</Switch>
			<Footer />
		</>
	);
}

export default withRouter(App);
