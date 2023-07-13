// DemandeTable.jsx
import React, { useState, useEffect } from 'react';
import HistoryTable from '../HistoryTable/HistoryTable';
import AdminIdentity from '../AdminIdentity/AdminIdentity';
import PopupDemandAdmin from '../PopUpDemandAdmin/PopUpDemandAdmin';
import './DemandeTable.css';

const DemandeTable = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [demandes, setDemandes] = useState([
    { id: 1, label: 'Label 1', date: new Date(), avancement: 0  },
    // Autres demandes...
  ]);
  const [historiqueDemandes, setHistoriqueDemandes] = useState([]);
  const [demandesVisibles, setDemandesVisibles] = useState([]);

  useEffect(() => {
    setDemandesVisibles(demandes.filter((demande) => !demande.validee && !demande.rejetee));
  }, [demandes]);

  const handleOpenPopup = (demandeId) => {
    const demandeIndex = demandes.findIndex((demande) => demande.id === demandeId);
    setSelectedRow(demandeIndex);
    setPopupOpen(true);
  };
  
  const openPopup = (demande) => {
    setSelectedDemande(demande);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedDemande(null);
  };

  const handleValiderDemande = () => {
    const updatedDemande = { ...selectedDemande, validee: true };

    setHistoriqueDemandes([...historiqueDemandes, updatedDemande]);
    setDemandes(demandes.filter((demande) => demande.id !== selectedDemande.id));
    setDemandesVisibles(demandesVisibles.filter((demande) => demande.id !== selectedDemande.id));
    closePopup();
  };

  const handleRejeterDemande = () => {
    const updatedDemande = { ...selectedDemande, rejetee: true };

    setHistoriqueDemandes([...historiqueDemandes, updatedDemande]);
    setDemandes(demandes.filter((demande) => demande.id !== selectedDemande.id));
    setDemandesVisibles(demandesVisibles.filter((demande) => demande.id !== selectedDemande.id));
    closePopup();
  };

  return (
    <div className='Base-table'>
      <table className='table-A-Traiter'>
        <caption className='title-tableAdmin'>Demandes à traiter</caption>
        <thead>
          <tr>
            <th>Numéro de demande</th>
            <th>Date</th>
            <th>Label</th>
            <th>Avancement</th>
          </tr>
        </thead>
        <tbody>
          {demandesVisibles.map((demande) => (
            <tr key={demande.id}>
              <td> Numéro{demande.id}</td>
              <td>{demande.date.toLocaleString()}</td>
              <td>{demande.label}</td>
              <td>
                <button className='avancement' onClick={() => openPopup(demande)}>Traiter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popupOpen && (
        <PopupDemandAdmin
          demande={selectedDemande}
          handleValider={handleValiderDemande}
          handleRejeter={handleRejeterDemande}
          onClose={closePopup}
        />
      )}
      <HistoryTable 
      onOpenPopup={openPopup} 
      demandes={historiqueDemandes} 
      selectedDemandeIndex={selectedDemande?.id} 
      avancement
      />
    </div>
  );
};

export default DemandeTable;