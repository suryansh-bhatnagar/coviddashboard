import "./App.css";
import React, { useEffect, useState } from "react";
import LineGraph from "./Components/LineGraph";
import CovidSummary from "./CovidSummary";
import axios from "./axios";
import DataTable from "./Components/DataTable/DataTable";

function App() {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState("");
  const [coronaCount, setCoronaCount] = useState([]);
  const [xLabel, setXLabel] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getCoronaReportByDateRange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days,country]);



  const countryHandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from =  days==='1'? '2020-03-01': formatDate(new Date(Date.now() - days * 24 * 3600 * 1000));
    console.log(from, to);
    getCoronaReportByDateRange(e.target.value, from, to);
  };
  const daysHandler = (e) => {
    setDays(e.target.value);
    
    const d = new Date();
    const to = formatDate(d);
    // const from = formatDate(d.setDate(d.getDate() - 7));
    const from = e.target.value==='1'? '2020-03-01':formatDate(new Date(Date.now() - e.target.value* 24 * 3600 * 1000
    ));
    console.log(from,to);
    
    getCoronaReportByDateRange(country, from, to);
  };
  const formatDate = (date) => {
    const d = date;
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  };

  const getCoronaReportByDateRange = (countrySlug, from, to) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log(res);
        const yAxisCoronaCount = res.data.map((d) => d.Cases);
        const xAxisLabel = res.data.map((d) => d.Date);

        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug
        );
        setCoronaCount(yAxisCoronaCount);
        setTotalConfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.totalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setXLabel(xAxisLabel);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`/summary`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setCovidSummary(res.data);
          setTableData(res.data.Countries);
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.NewRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <p>Loading Data From The Server</p>;
  }

  return (
    <div className="App">
      <div>
        <div className="graphSection">
          <CovidSummary
            totalConfirmed={totalConfirmed}
            totalRecovered={totalRecovered}
            totalDeaths={totalDeaths}
            country={country}
          />

          <div className="selectField">
            <select value={country} onChange={countryHandler}>
              <option value="" disabled>
                Select Country
              </option>
              {covidSummary.Countries &&
                covidSummary.Countries.map((country) => (
                  <option key={country.Slug} value={country.Slug}>
                    {" "}
                    {country.Country}
                  </option>
                ))}
            </select>
            <select value={days} onChange={daysHandler}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="1">From starting</option>
            </select>
          </div>
          <LineGraph
            yAxis={coronaCount}
            xAxis={xLabel}
            country={country}
          />
        </div>
        <hr />
        <div className="dataTable">
          <DataTable tableData={tableData} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
