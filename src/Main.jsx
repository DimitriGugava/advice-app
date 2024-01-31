import "./Main.css";
import generateQuote from "../src/icons/generatequote.svg";
import pause from "../src/icons/pause.svg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
  const {
    data: adviceData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["advice"],
    queryFn: () =>
      fetch("https://api.adviceslip.com/advice").then((res) => res.json()),
  });
  console.log(adviceData);

  const [advice, setAdvice] = useState("");
  const [adviceNumber, setAdviceNumber] = useState(0);

  // Effect to update the state when adviceData changes
  useEffect(() => {
    if (adviceData && adviceData.slip) {
      setAdvice(adviceData.slip.advice);
      setAdviceNumber(adviceData.slip.id);
    }
  }, [adviceData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading advice</div>;

  return (
    <div className="main">
      <div className="container_Main">
        <h3 className="advice_Number">ADVICE #{adviceNumber}</h3>
        <h1 className="advice_Text">{advice}</h1>
        <div className="div_Line_Box">
          <div className="first_Div"></div>
          <img className="pause_Icon" src={pause} />
          <div className="second_Div"></div>
        </div>
      </div>

      <img className="generate_Icon" src={generateQuote} onClick={refetch} />
    </div>
  );
};
export default Main;
