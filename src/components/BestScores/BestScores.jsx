import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { apiScores } from "../../constants/api";

function BestScores() {
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiScores);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          let sortedScores = data.data.sort((a, b) => b.attributes.score - a.attributes.score);
          console.log(sortedScores);
          setScores(sortedScores);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Header type="first" content="Top 10" />

      {loading ? (
        "Fetching scores.."
      ) : (
        <div className="table">
          {scores.map((score, index) => {
            return (
              <div className="table__element" key={index}>
                <div>Position {index + 1} </div>
                <div>{score.attributes.name} </div>
                <div>{score.attributes.score} points </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default BestScores;
