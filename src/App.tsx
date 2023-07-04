import { useState, useEffect } from "react";
import xButton from "./assets/exit-icon.svg";
import chartTriangle from "./assets/triangle.svg";
import chartFulcrum from "./assets/ellipse.svg";
import "./App.css";

interface ValueObject {
  degree: number;
  emoji: any;
  message: string;
  color: string;
}

const valueObject: ValueObject[] = [
  { degree: 30, emoji: "😃", message: "Much better", color: "#9FEAB8" },
  { degree: 15, emoji: "🙂", message: "Somewhat better", color: "#91CDEF" },
  { degree: 0, emoji: "😐", message: "About the same", color: "#A1AFC6" },
  { degree: -15, emoji: "😔", message: "Somewhat worse", color: "#FDCD70" },
  { degree: -30, emoji: "😫", message: "It's getting worse", color: "#F08770" },
];

//date variables
const today : Date = new Date()
const formattedDate : string = today.toISOString().split("T")[0];
const formattedStartDate : string = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

function App() {
  //state variables
  const [coughDynamic, setCoughDynamic] = useState<number>(0);
  const [rangeVariable, setRangeVariable] = useState<number>(0);
  function fetchAndSet (start: string, today: string) {
    //initial fetch
    const fetchData = (fromDate: string, toDate: string): any => {
      const url = `https://us-central1-hyfe-coughwatch.cloudfunctions.net/dummy_cough_events?aggregation=day&from=${fromDate}&to=${toDate}`;
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
        })
        .catch((error) => {
          throw new Error(`Error: ${error.message}`);
        });
    };
    fetchData(start, today)
      .then((data: any) => {
        const totalCoughs = data.reduce(
          (accumulator: any, currentValue: { coughs: any }) => {
            return accumulator + currentValue.coughs;
          },
          0
        );
        const averageCoughs = totalCoughs / data.length;
        const todayCough = data[data.length - 1].coughs;
        const percentageChange = ((todayCough - averageCoughs) / averageCoughs) * 100;
        
        setCoughDynamic(Math.floor(percentageChange));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  //useEffect(s)
  useEffect(() => {
    fetchAndSet(formattedStartDate, formattedDate)
  }, []);
  useEffect(() => {
    if (coughDynamic <= -50 && coughDynamic <= -100) {
      setRangeVariable(0);
    } else if (coughDynamic >= -50 && coughDynamic < -10) {
      setRangeVariable(1);
    } else if (coughDynamic >= -10 && coughDynamic < 10) {
      setRangeVariable(2);
    } else if (coughDynamic >= 10 && coughDynamic < 50) {
      setRangeVariable(3);
    } else if (coughDynamic >= 50 && coughDynamic >= 100) {
      setRangeVariable(4);
    }
  }, [coughDynamic]);
  //onClick functions
  const refreshClick = () => {
    fetchAndSet(formattedStartDate, formattedDate)
  };
  const onExitClick = () => {
    alert("you clicked the 'x' button");
    setCoughDynamic(0);
   }
// widget
  return (
    <>
      <header>
        <img
          onClick={onExitClick}
          src={xButton}
          className="x_button"
          alt="x button"
        />
        <div className="header_title">Insights</div>
      </header>
      <div className="insights_body">
        <section className="insight_card">
          <div>
            <div className="insight_title">Cough dynamic</div>
            <p className="insight_description">
              Last 24h comparing to the previous week
            </p>
            <div className="insight_emoji_message">
              <span className="insight_emoji">
                {valueObject[rangeVariable].emoji}
              </span>
              {valueObject[rangeVariable].message}
            </div>
          </div>
          <div>
            <div
              className="insight_metric"
              style={{ color: `${valueObject[rangeVariable].color}` }}
            >
              {coughDynamic > 0 && "+"}
              {coughDynamic}%
            </div>
            <div className="insight_chart">
              <img
                src={chartTriangle}
                className="insight_chart-triangle"
                alt="chart triangle"
              />
              <img
                src={chartFulcrum}
                className="insight_chart-fulcrum"
                alt="chart ellipse"
              />
              <div
                className="insight_chart-line"
                style={{
                  transform: `rotate(${valueObject[rangeVariable].degree}deg)`,
                  backgroundColor: `${valueObject[rangeVariable].color}`,
                  opacity: 0.8,
                }}
              ></div>
              <hr className="insight_chart-baseline"></hr>
            </div>
          </div>
        </section>
        <button onClick={refreshClick} className="refresh_button">
          Refresh
        </button>
      </div>
    </>
  );
}

export default App;
