import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import {
	IconButton,
	InputAdornment,
	Paper,
	TextField,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons/Visibility";
import { VisibilityOff } from "@material-ui/icons/VisibilityOff";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, signin } from "./actions/auth";
import volvo_tlo from "./images/DSC_8173.JPG";

const initialUserState = {
	firstName: "",
	lastName: "",
	Email: "",
	Hasło: "",
	confirmPassword: "",
};

const Icon = () => {
	return (
		<svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
			/>
		</svg>
	);
};

function InputFormWithProps(props) {
	return (
		<TextField
			name={props.name}
			onChange={props.handleChange}
			variant="outlined"
			required
			fullWidth
			label={props.label}
			autoFocus={props.autoFocus}
			type={props.type}
			InputProps={
				props.name === "Password"
					? {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={props.handleShowPassword}
									>
										{props.type === "Password" ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
					  }
					: null
			}
		/>
	);
}

function ImgTlo(props) {
	return (
		<img
			src={props.src}
			style={{ opacity: "0.5", align: "center", width: "100%" }}
		/>
	);
}

function RegisterFormNew() {
	const [showPassword, setshowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialUserState);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleShowPassword = () => {
		setshowPassword((oldState) => !oldState);
	};
	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);

		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	const switchMode = () => {
		setIsSignUp((oldState) => !oldState);
		handleShowPassword(false);
	};

	const googleSuccess = async (res) => {
		const response = res?.profileObj;
		//operator "?." daje ten komfort, ze nie rzuci wyjątkiem w chwili gdy res jest null.
		//Nazywa się to "chaining operator"
		const token = res?.tokenId;

		try {
			dispatch({ type: "AUTH", data: { response, token } });
			history.push(`/`);
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(`Błąd w logowaniu Kontem Google:`, { error });
	};

	return (
		<div
			style={{
				width: "50rem",
				align: "center",
				margin: "0 auto",
				position: "relative",
				top: "-650px",
			}}
		>
			<Container>
				<h3>{isSignUp ? "Zarejestruj się" : "Zaloguj się"}</h3>
				<Paper
					style={{
						paddingLeft: "45px",
						paddingRight: "45px",
						paddingTop: "45px",
						paddingBottom: "45px",
					}}
				>
					<Form onSubmit={handleSubmit} width="300px">
						<Row>
							{isSignUp ? null : (
								<Col style={{ paddingTop: "20px" }}>
									<GoogleLogin
										clientId="411707215205-8egenkrtisrm51ht1o2h85kkpvj1n1ab.apps.googleusercontent.com"
										render={(renderProps) => (
											<Button
												block
												variant="outline-secondary"
												size="lg"
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}
												startIcon={<Icon />}
											>
												Zaloguj się Kontem Google
											</Button>
										)}
										onSuccess={googleSuccess}
										onFailure={googleFailure}
										cookiePolicy={"single_host_origin"}
									/>
								</Col>
							)}
						</Row>
					</Form>
				</Paper>
			</Container>
		</div>
	);
}

export default function Register() {
	return (
		<>
			<ImgTlo src={volvo_tlo} />
			<RegisterFormNew />
		</>
	);
}
