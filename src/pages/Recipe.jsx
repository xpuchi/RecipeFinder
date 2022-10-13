import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const dataDetail = await data.json();
    setDetails(dataDetail);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
        <p
          className="summary"
          dangerouslySetInnerHTML={{ __html: details.summary }}
        ></p>
      </div>

      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Intructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <p
              className="instructions"
              dangerouslySetInnerHTML={{ __html: details.instructions }}
            ></p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <div>
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 8rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }

  .summary {
    margin-top: 20px;
    width: 30rem;
    height: 900px;
    text-align: justify;
  }

  li,
  .instructions {
    font-size: 1.2rem;
    line-height: 2.2rem;
    margin-top: 1.5rem;
    margin-left: 2rem;
  }
  img {
    border-radius: 50px;
    width: 30rem;
  }
`;

const Button = styled.button`
  padding: 1rem;
  color: #313131;
  border: 2px solid black;
  margin-left: 1rem;
  margin-right: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 50px;
`;

const Info = styled.div`
  margin-left: 2rem;
  font-weight: 100;
`;

export default Recipe;
