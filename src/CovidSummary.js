import React from "react";
import Card from "./Components/Card";
import NumberFormat from "react-number-format";

const CovidSummary = (props) => {
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props;
  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>
        {country === "" ? "World Wide Corona Report" : country}
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card background = {'rgb(231, 83, 115)'}>
          <span>Total Confirmed</span> <br />
          <span>
            {
              <NumberFormat
                value={totalConfirmed}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </span>
        </Card>
        <Card background = {'rgb(117,223,122)'} >
          <span>Total Recovered</span> <br />
          <span>
            {
              <NumberFormat
                value={totalRecovered}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </span>
        </Card>
        <Card background = {'rgb(231, 83, 115)'}> 
          <span>Total Deaths</span> <br />
          <span>
            {
              <NumberFormat
                value={totalDeaths}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </span>
        </Card>
      </div>
    </div>
  );
};

export default CovidSummary;
