import React from "react";
import { Jumbotron, Container } from "reactstrap";

const WelcomeHero = ({ welcome, desc }) => {
  return (
    <div>
      <Jumbotron fluid style={{ background: "nonee", textAlign: "center" }}>
        <Container fluid>
          <h1 className="display-3">{welcome}</h1>
          <p className="lead">
            {desc} by{" "}
            <a
              href="https://robertmsoriano.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Roberto Soriano
            </a>
            .
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default WelcomeHero;
