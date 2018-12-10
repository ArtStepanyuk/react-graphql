import React from "react";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="sweet-loading">
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
