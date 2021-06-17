import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
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

function Main() {
	const { path } = useRouteMatch();

	return (
		<>
			<Header />
			<Switch>
				<Route path={path} exact component={Home} />	
			</Switch>
		</>
	);
}

export default withRouter(App);
