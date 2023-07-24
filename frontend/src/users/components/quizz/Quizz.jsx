import React, { useState } from 'react';
import axios from 'axios';
import './quizz.css';

const Quizz = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [questions, setQuestions] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      });
  }, []);

  const handleQuestionChange = (question, value) => {
    setQuestions({
      ...questions,
      [question]: value,
    });
  };

  const handleSubmit = () => {
    // Calcule les résultats
    const countAnswers = {};
    for (const question of Object.values(questions)) {
      countAnswers[question] = (countAnswers[question] || 0) + 1;
    }
    const mostFrequentAnswer = Object.keys(countAnswers).reduce(
      (a, b) => (countAnswers[a] > countAnswers[b] ? a : b)
    );

    // Redirige vers la catégorie des labels
    const labelCategory = categories.find(
      (category) => category.name === mostFrequentAnswer
    );
    if (labelCategory) {
      window.location.href = `/labels/${labelCategory.id}`;
    } else {
      console.error('Aucune catégorie de label trouvée pour les réponses données.');
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz pour labellisation</h1>
      {/* Question 1 */}
      <div className="question">
        <h3>Quel est le secteur d'activité principal de votre entreprise ?</h3>
        <input type="radio" name="q1" value="Alimentaire" onChange={(e) => handleQuestionChange("q1", e.target.value)} />Alimentaire<br />
        <input type="radio" name="q1" value="Environnement et développement durable" onChange={(e) => handleQuestionChange("q1", e.target.value)} />Environnement et développement durable<br />
        <input type="radio" name="q1" value="Culture" onChange={(e) => handleQuestionChange("q1", e.target.value)} />Culture<br />
        <input type="radio" name="q1" value="Artisanat et tradition" onChange={(e) => handleQuestionChange("q1", e.target.value)} />Artisanat et tradition<br />
      </div>

      {/* Question 2 */}
      <div className="question">
        <h3>Quelle est la taille de votre entreprise ?</h3>
        <input type="radio" name="q2" value="Micro-entreprise (moins de 10 employés)" onChange={(e) => handleQuestionChange("q2", e.target.value)} />Micro-entreprise (moins de 10 employés)<br />
        <input type="radio" name="q2" value="Petite entreprise (10 à 50 employés)" onChange={(e) => handleQuestionChange("q2", e.target.value)} />Petite entreprise (10 à 50 employés)<br />
        <input type="radio" name="q2" value="Moyenne entreprise (50 à 250 employés)" onChange={(e) => handleQuestionChange("q2", e.target.value)} />Moyenne entreprise (50 à 250 employés)<br />
        <input type="radio" name="q2" value="Grande entreprise (plus de 250 employés)" onChange={(e) => handleQuestionChange("q2", e.target.value)} />Grande entreprise (plus de 250 employés)<br />
      </div>

      {/* Question 3 */}
      <div className="question">
        <h3>Quel est l'objectif principal de votre entreprise concernant la labellisation ?</h3>
        <input type="radio" name="q3" value="Améliorer la visibilité et la réputation de l'entreprise" onChange={(e) => handleQuestionChange("q3", e.target.value)} />Améliorer la visibilité et la réputation de l'entreprise<br />
        <input type="radio" name="q3" value="Renforcer l'engagement environnemental et social" onChange={(e) => handleQuestionChange("q3", e.target.value)} />Renforcer l'engagement environnemental et social<br />
        <input type="radio" name="q3" value="Développer des produits ou services innovants" onChange={(e) => handleQuestionChange("q3", e.target.value)} />Développer des produits ou services innovants<br />
        <input type="radio" name="q3" value="Préserver et promouvoir un savoir-faire traditionnel" onChange={(e) => handleQuestionChange("q3", e.target.value)} />Préserver et promouvoir un savoir-faire traditionnel<br />
      </div>

      {/* Question 4 */}
      <div className="question">
        <h3>Comment décririez-vous votre engagement envers la durabilité ?</h3>
        <input type="radio" name="q4" value="Nous avons intégré des pratiques durables dans tous nos processus." onChange={(e) => handleQuestionChange("q4", e.target.value)} />Nous avons intégré des pratiques durables dans tous nos processus.<br />
        <input type="radio" name="q4" value="Nous avons mis en place des initiatives pour réduire notre impact environnemental." onChange={(e) => handleQuestionChange("q4", e.target.value)} />Nous avons mis en place des initiatives pour réduire notre impact environnemental.<br />
        <input type="radio" name="q4" value="Nous cherchons constamment à innover pour proposer des solutions durables." onChange={(e) => handleQuestionChange("q4", e.target.value)} />Nous cherchons constamment à innover pour proposer des solutions durables.<br />
        <input type="radio" name="q4" value="Nous valorisons et préservons les ressources locales et les savoirs traditionnels." onChange={(e) => handleQuestionChange("q4", e.target.value)} />Nous valorisons et préservons les ressources locales et les savoirs traditionnels.<br />
      </div>

      {/* Question 5 */}
      <div className="question">
        <h3>Comment votre entreprise contribue-t-elle à la communauté locale ?</h3>
        <input type="radio" name="q5" value="En créant des emplois et en soutenant l'économie locale." onChange={(e) => handleQuestionChange("q5", e.target.value)} />En créant des emplois et en soutenant l'économie locale.<br />
        <input type="radio" name="q5" value="En participant activement à des projets environnementaux ou sociaux." onChange={(e) => handleQuestionChange("q5", e.target.value)} />En participant activement à des projets environnementaux ou sociaux.<br />
        <input type="radio" name="q5" value="En collaborant avec des institutions de recherche et d'innovation." onChange={(e) => handleQuestionChange("q5", e.target.value)} />En collaborant avec des institutions de recherche et d'innovation.<br />
        <input type="radio" name="q5" value="En perpétuant des pratiques culturelles et artisanales de la région." onChange={(e) => handleQuestionChange("q5", e.target.value)} />En perpétuant des pratiques culturelles et artisanales de la région.<br />
      </div>

      {/* Question 6 */}
      <div className="question">
        <h3>Avez-vous obtenu des certifications ou des labels similaires auparavant ?</h3>
        <input type="radio" name="q6" value="Oui, nous avons déjà obtenu des certifications ou des labels." onChange={(e) => handleQuestionChange("q6", e.target.value)} />Oui, nous avons déjà obtenu des certifications ou des labels.<br />
        <input type="radio" name="q6" value="Non, c'est notre première démarche de ce type." onChange={(e) => handleQuestionChange("q6", e.target.value)} />Non, c'est notre première démarche de ce type.<br />
      </div>

      {/* Question 7 */}
      <div className="question">
        <h3>Quel est le principal défi que votre entreprise souhaite relever avec la labellisation ?</h3>
        <input type="radio" name="q7" value="Améliorer notre compétitivité sur le marché." onChange={(e) => handleQuestionChange("q7", e.target.value)} />Améliorer notre compétitivité sur le marché.<br />
        <input type="radio" name="q7" value="Renforcer notre responsabilité sociale et environnementale." onChange={(e) => handleQuestionChange("q7", e.target.value)} />Renforcer notre responsabilité sociale et environnementale.<br />
        <input type="radio" name="q7" value="Valoriser notre capacité d'innovation et notre R&D." onChange={(e) => handleQuestionChange("q7", e.target.value)} />Valoriser notre capacité d'innovation et notre R&D.<br />
        <input type="radio" name="q7" value="Préserver et transmettre notre patrimoine culturel." onChange={(e) => handleQuestionChange("q7", e.target.value)} />Préserver et transmettre notre patrimoine culturel.<br />
      </div>

      <div className="submit-button">
        <button onClick={handleSubmit}>Soumettre</button>
      </div>
    </div>
  );
};

export default Quizz;
