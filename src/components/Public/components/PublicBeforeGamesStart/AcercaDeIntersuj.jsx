
import { useCallback, useEffect, useState } from 'react';
import './IntersujAbout.css';
import { useApiData } from '../../../../hooks/useApiData';




export const AcercaDeIntersuj = ({ data }) => {

   

    return (
        <section className="intersuj-about-section py-5 px-3">
            {/* Contenedor centralizado con ancho responsivo */}
            <div className="container" >

               

                {/* Título principal */}
                <h2 className="intersuj-about__title text-uppercase mb-4">
                    Donde la <span className="intersuj-about__highlight">pasión universitaria</span> se convierte en competencia
                </h2>
 {/* Cabecera / Subtítulo */}
                <p className="intersuj-about__eyebrow text-uppercase mb-4">
                    ¿Qué es el INTERSUJ?
                </p>
                {/* Párrafos descriptivos */}
                <div className="mb-4">
                    <p className="intersuj-about__paragraph mb-3">
                        El INTERSUJ es el Encuentro Deportivo del Sistema Universitario Jesuita: un espacio que reúne cada año a estudiantes atletas de sus instituciones para competir, superar sus límites y representar con orgullo a sus universidades. </p>
                    <p className="intersuj-about__paragraph mb-0">
                        Más que un torneo, es una celebración de identidad universitaria, compañerismo y excelencia deportiva. Desde 1983, miles de atletas han defendido los colores de su institución en este escenario único.
                    </p>
                </div>

             </div>
        </section>
    );
}

