import React from "react";
import { Line } from "react-chartjs-2";
// import {Chart as ChartJS} from 'chart.js/auto';
import { Chart as ChartJS, registerables } from "chart.js";
// import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);

const LineGraph = (props) => {
  return (
    <div className="graphContainer">
      <Line
        data={{
          labels:props.xAxis.map(l=>l.substr(0,10) ),
          datasets: [
            {
              label: `Covid cases across ${props.country===""?'World':props.country.toUpperCase()}`,
              fill:false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: props.yAxis,

            }
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;
