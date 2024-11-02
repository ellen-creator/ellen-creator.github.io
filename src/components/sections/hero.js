import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hello! My name is</h1>;
  const two = <h2 className="big-heading">Suhyun Lim</h2>;
  const three = <h3 className="medium-heading">Business consultant | Tech Enthusiast | Extreme hiker</h3>;
  const four = (
    <>
      <p>
        <b>Glad to e-meet you!</b>
      </p>

      <p>
        I am Suhyun Lim, an alumnus of {' '} <a href="https://www.bcg.com/">
        BCG</a> {' '} and {' '} <a href="https://www.kearney.com/">Kearney</a> {' '} currently heading to adventure of technology development for those in needs.
      </p>


      <p>
        When not decoding the customer journey, you can find me climbing up the mountains or reading books related to brain and technical treament.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.notion.so/Management-Consulting-A-to-Z_v2-2-MCAZ-622572d08c24476fa5a4e741ac78956b?pvs=4"
      target="_blank"
      rel="noreferrer">
      Check out my case book!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
