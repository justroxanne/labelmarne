import React from 'react';

const PopupDemand = ({ demandeIndex, onTraitement, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Traitement de la demande</h3>
        <p>
          Êtes-vous sûr de vouloir traiter la demande {demandeIndex + 1} ?
        </p>
        <button onClick={onTraitement}>Traiter</button>
        <button onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
};

export default PopupDemand;