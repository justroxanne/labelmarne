import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from 'react-quiz-component';
import './quizz.css';

const Quizz = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [categories, setCategories] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  const quizData = {
    quizTitle: "Quiz pour labellisation",
    questions: [
      {
        question: "Quel est le secteur d'activité principal de votre entreprise ?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers: ["Alimentaire", "Environnement et développement durable", "Culture", "Artisanat et tradition"],
        correctAnswer:[],
      },
      {
        question: "Quelle est la taille de votre entreprise ?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers: ["Micro-entreprise (moins de 10 employés)", "Petite entreprise (10 à 50 employés)", "Moyenne entreprise (50 à 250 employés)", "Grande entreprise (plus de 250 employés)"],
        correctAnswer: [],
      },
      {
        question: "Quel est l'objectif principal de votre entreprise concernant la labélisation?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers: ["Valoriser mon entreprise", "Valoriser mes produits", "Valoriser mon savoir-faire", "Valoriser mon territoire"],
        correctAnswer: [],
      },
      {
        question: "Comment decriveriez vous votre engagement en matière de développement durable ?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers: ["Je suis engagé dans une démarche de développement durable", "Je suis engagé dans une démarche de développement durable et je souhaite le valoriser", "Je ne suis pas engagé dans une démarche de développement durable"],
        correctAnswer: [],
      },
      {
        question: "Comment votre entreprise contribue-t-elle à la communauté locale ?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers:["En créant des emplois et en soutenant l'économie locale.", "En soutenant les associations locales.", "En soutenant les initiatives locales.", "En soutenant les initiatives locales et en créant des emplois."],
        correctAnswer: [],
      },
      {
        question:"Avez-vous obtenu des certifications ou des labels similaires auparavant ?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers:["Oui", "Non"],
        correctAnswer: [],
      },
      {
        question: "Quel est le principal défi que votre entreprise souhaite relever avec la labellisation ?",
        questionType: "text",
        answerSelectionType: "multiple",
        answers:["Améliorer notre compétitivité sur le marché.","Renforcer notre responsabilité sociale et environnementale.","Valoriser notre capacité d'innovation et notre R&D.","Préserver et transmettre notre patrimoine culturel."],
        correctAnswer: [],  
      },
    ],
  };

  const handleQuizComplete = (userAnswers) => {
    // Filtrer les catégories sélectionnées par l'utilisateur
    const userAnswerToQ1 = userAnswers['0'];
    const filteredCategories = categories.filter(category => category.name === userAnswerToQ1);

    // Récupérer les labels correspondant aux catégories sélectionnées
    if (filteredCategories.length > 0) {
      const categoryId = filteredCategories[0].id;
      axios.get(`${url}/api/labels?categoryId=${categoryId}`)
        .then(response => {
          setFilteredLabels(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des labels :', error);
        });
    }
  };

  return (
    <div className="quiz-container">
      <Quiz quiz={quizData} onComplete={handleQuizComplete} />
      {filteredLabels.length > 0 && (
        <div>
          <h2>Résultat du Quiz</h2>
          <p>Les labels qui correspondent le mieux à votre entreprise sont :</p>
          <ul>
            {filteredLabels.map(label => (
              <li key={label.id}>{label.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quizz;






