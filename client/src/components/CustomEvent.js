import React, { useState } from "react";
import { useMyGames } from "../MyGamesContext";
import styled from "styled-components";

const AddEventForm = () => {
  const { myGames, setMyGames } = useMyGames();
  const [formData, setFormData] = useState({
    HomeTeam: "",
    AwayTeam: "",
    DateUtc: "",
    Location: "",
    MatchNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data here if needed

    // Add the new event to the myGames state
    setMyGames((prevGames) => [...prevGames, formData]);

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
      <h2>Add Custom Event</h2>
      <Form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
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
            type="time"
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
        
        
        <SubmitButton type="submit">Add Event</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default AddEventForm;

const FormContainer = styled.div`
  /* Add your styling for the form container */
`;

const Form = styled.form`
  /* Add your styling for the form */
`;

const Label = styled.label`
  /* Add your styling for the form labels */
`;

const Input = styled.input`
  /* Add your styling for the form inputs */
`;

const SubmitButton = styled.button`
  /* Add your styling for the submit button */
`;