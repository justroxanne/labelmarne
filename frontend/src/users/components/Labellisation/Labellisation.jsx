import React from 'react';
import raisin from './../../assets/raisin.jpg';
import tonneau from './../../assets/tonneau.jpg';
import './labellisation.css'; 

const Labellisation = () => {
  return (
    <div className='container-info'>
        <div className='content-info'>
        <div className="img-intro">
            <img src={tonneau} alt="loupe"/>
        </div>
        <div className="intro-labellisation">
            <h1>Accompagnement à la Labellisation : Stimuler l'Excellence et la Reconnaissance</h1>
            <p>Dans le monde d'aujourd'hui, où la concurrence est de plus en plus intense et où les consommateurs recherchent des produits et services de qualité supérieure, la labellisation est devenue un outil crucial pour stimuler l'excellence et la reconnaissance des entreprises. De nombreux organismes se sont engagés dans l'accompagnement des entreprises pour obtenir des labels de qualité et de durabilité, garantissant ainsi 
            la satisfaction des clients et contribuant au développement d'une société plus responsable sur le plan environnemental et social.</p>
        </div>
        </div>
        <div className="content-what">
        <div className="what">
            <h2>Qu'est-ce que la labellisation ?</h2>
            <p>La labellisation est un processus d'évaluation indépendant qui permet de reconnaître et de certifier la qualité, la durabilité, ou d'autres caractéristiques spécifiques d'un produit, d'un service, ou d'une entreprise. Les labels sont des marques d'excellence et de confiance, offrant aux consommateurs une assurance quant à la qualité du produit ou du service qu'ils achètent. Ils aident également les entreprises à se 
                démarquer sur le marché et à répondre aux attentes croissantes des consommateurs en matière de responsabilité sociale et environnementale.</p>
        </div>
        <div className="what-img">
            <img src={raisin} alt="tonneau"/>
        </div>
        </div>
 </div>
  )
}

export default Labellisation