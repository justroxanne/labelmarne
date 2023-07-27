import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoryContext } from '../../../Context';
import './Quizz.css';

const QuizComponent = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const [answers, setAnswers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/categories`)
      .then((response) => {
        setCategory(response.data[0].id); // Mettre par défaut la première catégorie
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });

    axios
      .get(`${url}/api/labels`)
      .then((response) => {
        setLabels(response.data);
        setFilteredLabels(response.data); // Au départ, tous les labels sont affichés
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des labels :', error);
      });
  }, []);

  // Fonction pour obtenir la catégorie correspondante en fonction de la réponse sélectionnée
  const getCorrespondingCategory = (selectedAnswer) => {
    switch (selectedAnswer) {
      case 'Alimentaire':
        return 2;
      case 'Tourisme':
        return 1;
      case 'Vignoble & Découverte':
        return 3;
      case 'Culture & Patrimoine':
        return 7;
      default:
        return null;
    }
  };

  const handleFormSubmit = () => {
    setIsSubmitted(true);
  };

  const handleAnswerSelection = (questionId, selectedAnswer) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: selectedAnswer,
    }));

    setAnswers((prevAnswers) => {
      // Remove the previous answer for the same question
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questionId
      );
      // Add the new selected answer for the current question
      return [...updatedAnswers, { questionId, selectedAnswer }];
    });

    // Filtrer les labels en fonction de la catégorie correspondante
    if (labels.length > 0) {
      const correspondingCategory = getCorrespondingCategory(selectedAnswer);
      if (correspondingCategory) {
        const filtered = labels.filter(
          (label) => label.category_id === correspondingCategory
        );
        setFilteredLabels(filtered);
      }
    }
  };

  const questions = [
    {
      id: 1,
      text: "Quel est le secteur d'activité principal de votre entreprise ?",
      options: [
        'Alimentaire',
        'Tourisme',
        ' Vignoble & Découverte',
        'Culture & Patrimoine',
      ],
    },
    {
      id: 2,
      text: 'Quelle est la taille de votre entreprise ?',
      options: [
        'Micro-entreprise (moins de 10 employés)',
        'Petite entreprise (10 à 50 employés)',
        'Moyenne entreprise (50 à 250 employés)',
        'Grande entreprise (plus de 250 employés)',
      ],
    },
    {
      id: 3,
      text: "Quel est l'objectif principal de votre entreprise concernant la labellisation ?",
      options: [
        "Améliorer la visibilité et la réputation de l'entreprise",
        "Renforcer l'engagement environnemental et social",
        'Développer des produits ou services innovants',
        'Préserver et promouvoir un savoir-faire traditionnel',
      ],
    },
    {
      id: 4,
      text: 'Quel est le principal défi que votre entreprise souhaite relever avec la labellisation ?',
      options: [
        'Améliorer notre compétitivité sur le marché.',
        'Renforcer notre responsabilité sociale et environnementale.',
        'Développer des produits ou services innovants',
        'Préserver et transmettre notre patrimoine culturel.',
      ],
    },
  ];

  return (
    <div className='quizz-container'>
      <div className='quizz'>
        <h2>Quel label est fait pour vous ?</h2>
        <div className='quizz-questions'>
          {questions.map((question) => {
            return (
              <div key={question.id} className='question'>
                <h3>{question.text}</h3>
                <ul className='question-options'>
                  {question.options.map((option) => {
                    const isSelected =
                      selectedOptions[question.id] === option ||
                      answers.some(
                        (answer) =>
                          answer.questionId === question.id &&
                          answer.selectedAnswer === option
                      );

                    return (
                      <li key={option}>
                        <label>
                          <input
                            type='radio'
                            name={`question-${question.id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() =>
                              handleAnswerSelection(question.id, option)
                            }
                          />
                          {option}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleFormSubmit}>Valider</button>
      {isSubmitted && (
        // Afficher les résultats seulement si le formulaire est soumis
        <div className='quizz-results'>
          <h2>Résultats</h2>
          <div className='quizz-results-container'>
            <ul className='quizz-results-labels'>
              {filteredLabels.map((label) => {
                return (
                  <li key={label.id}>
                    <a
                      href={label.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img
                        className='label-logo'
                        src={`/api/public/uploads/${label.logo}`}
                        alt={`logo ${label.name}`}
                      />
                      <span> {label.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
