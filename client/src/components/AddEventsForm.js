import React, { useState } from "react";
import { useMyGames } from "./MyGamesContext";
import styled from "styled-components";

const AddEventForm = () => {
	const { myGames, addGame, setMyGames } = useMyGames();
	const [formData, setFormData] = useState({
		HomeTeam: "",
		AwayTeam: "",
		DateUtc: "",
		Location: "",
		Description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate form data here if needed

		// Add the new event to the myGames state
		setMyGames((prevGames) => [
			...prevGames,
			{
				HomeTeam: formData.HomeTeam,
				AwayTeam: formData.AwayTeam,
				DateUtc: formData.DateUtc,
				Location: formData.Location,
				Description: formData.Description,
			},
		]);

		// Reset the form
		setFormData({
			HomeTeam: "",
			AwayTeam: "",
			DateUtc: "",
			Location: "",
			Description: "",
		});
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit}>
				<Label>
					Home Team:
					<Input
						type="text"
						name="HomeTeam"
						value={formData.HomeTeam}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Away Team:
					<Input
						type="text"
						name="AwayTeam"
						value={formData.AwayTeam}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Date & Time:
					<Input
						type="datetime-local"
						name="DateUtc"
						value={formData.DateUtc}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Location:
					<Input
						type="text"
						name="Location"
						value={formData.Location}
						onChange={handleChange}
					/>
				</Label>
				<Label>
					Description:
					<Input
						type="text"
						name="Description"
						value={formData.Description}
						onChange={handleChange}
					/>
				</Label>

				<SubmitButton type="submit" >Create Event</SubmitButton>
			</Form>
		</FormContainer>
	);
};

export default AddEventForm;

const FormContainer = styled.div`
	width: 400px;
	margin: auto;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	margin-bottom: 16px;
`;

const Input = styled.input`
	margin-bottom: 8px;
`;

const SubmitButton = styled.button`
	padding: 10px;
	font-size: 18px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: #45a049;
	}
`;
