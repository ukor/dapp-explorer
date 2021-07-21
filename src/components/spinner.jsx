import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { PropagateLoader } from "react-spinners";

const SpinnerBox = styled.div`
  #dy_inner_spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
	background: #000;
  }
`;

const Spinner = ({ message }) => {
  return (
    <SpinnerBox>
      <div id="dy_inner_spinner">
        <PropagateLoader size={20} color={"#ff8400"} />
        <br />
        <p>{message}</p>
      </div>
    </SpinnerBox>
  );
};

Spinner.proptype = {
  message: Proptypes.string,
};

export default Spinner;
