import React, { useEffect } from "react";
import { ContentLayout } from "../../../helpers/ContentLayout";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { uiSetHeader } from "../../../ui/store";

export const Home = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const steps = [
    {
      number: "01",
      title: "Configura tu escuela",
      bullets: ["Carga el logo de tu universidad", "Agrega administradores"],
    },
    {
      number: "02",
      title: "Detalla el evento:",
      bullets: ["Configura las fechas del evento y las fechas límites"],
    },
    {
      number: "03",
      title: "Alta disciplinas",
      bullets: ["Elige los deportes que se jugarán este año"],
    },
    {
      number: "04",
      title: "Invita universidades",
      bullets: [
        "Da de alta a las universidades participantes",
        "Envía invitaciones",
      ],
    },
  ];

  useEffect(() => {
    dispatch(
      uiSetHeader({
        title: "",
        onBack: null,
      }),
    );
  }, []);

  if (profile?.role !== "Universidad") {
    return (
      <ContentLayout>
        <div className="container mt-5">
          <h1>Bienvenido a Intersuj</h1>
          <p>Seleccione una opción del menú para comenzar.</p>
        </div>
      </ContentLayout>
    );
  }
  
  return (
    <ContentLayout>
      <div className="container-dash ">
        <div className="home-container">
          <div className="home-welcome-section">
            <span className="home-welcome-subtitle">
              Te damos la bienvenida al
            </span>
            <h1 className="home-welcome-title">
              INTERSUJ {new Date().getFullYear()}
            </h1>
          </div>

          <div className="home-steps-flow">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* Step Card */}
                <div className="home-step-card">
                  <div className="home-step-circle">
                    <span className="home-step-number">{step.number}</span>
                    <span className="home-step-label">PASO</span>
                  </div>
                  <h3 className="home-step-title">{step.title}</h3>
                  <ul className="home-step-bullets">
                    {step.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="home-step-arrow" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="102" height="15" viewBox="0 0 102 15" fill="none">
                      <path d="M101.707 8.07106C102.098 7.68054 102.098 7.04737 101.707 6.65685L95.3431 0.292885C94.9526 -0.0976396 94.3195 -0.0976396 93.9289 0.292885C93.5384 0.683409 93.5384 1.31657 93.9289 1.7071L99.5858 7.36395L93.9289 13.0208C93.5384 13.4113 93.5384 14.0445 93.9289 14.435C94.3195 14.8255 94.9526 14.8255 95.3431 14.435L101.707 8.07106ZM0 7.36395V8.36395H1.94231V7.36395V6.36395H0V7.36395ZM5.82692 7.36395V8.36395H9.71154V7.36395V6.36395H5.82692V7.36395ZM13.5962 7.36395V8.36395H17.4808V7.36395V6.36395H13.5962V7.36395ZM21.3654 7.36395V8.36395H25.25V7.36395V6.36395H21.3654V7.36395ZM29.1346 7.36395V8.36395H33.0192V7.36395V6.36395H29.1346V7.36395ZM36.9038 7.36395V8.36395H40.7885V7.36395V6.36395H36.9038V7.36395ZM44.6731 7.36395V8.36395H48.5577V7.36395V6.36395H44.6731V7.36395ZM52.4423 7.36395V8.36395H56.3269V7.36395V6.36395H52.4423V7.36395ZM60.2115 7.36395V8.36395H64.0962V7.36395V6.36395H60.2115V7.36395ZM67.9808 7.36395V8.36395H71.8654V7.36395V6.36395H67.9808V7.36395ZM75.75 7.36395V8.36395H79.6346V7.36395V6.36395H75.75V7.36395ZM83.5192 7.36395V8.36395H87.4038V7.36395V6.36395H83.5192V7.36395ZM91.2885 7.36395V8.36395H95.1731V7.36395V6.36395H91.2885V7.36395ZM99.0577 7.36395V8.36395H101V7.36395V6.36395H99.0577V7.36395Z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
