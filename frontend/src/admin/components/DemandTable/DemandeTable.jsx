import React, {useState} from 'react';
import PopupDemand from '../PopUpDemandAdmin/PopUpDemandAdmin';
import './DemandeTable.css';

const DemandeTable = () => {
  const [rowCount, setRowCount] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const incrementRowCount = () => {
    setRowCount(rowCount + 1);
  };

  const decrementRowCount = () => {
    if (rowCount > 1) {
      setRowCount(rowCount - 1);
    }
  };

  const openPopup = (rowIndex) => {
    setSelectedRow(rowIndex);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedRow(null);
  };

  const handleTraitement = () => {
    closePopup();
    setRowCount(rowCount - 1);
  };

  return (
    <div className='Base-table'>
      <table className="table">
        <thead>
          <tr>
            <th>Numéro de demande</th>
            <th>Date</th>
            <th>Label</th>
            <th>Avancement</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }, (_, index) => (
            <tr key={index}>
              <td>
                <a href="#" onClick={() => openPopup(index)}>
                  Lien {index + 1}
                </a>
              </td>
              <td>Donnée {index + 1}</td>
              <td>Donnée {index + 1}</td>
              <td>Donnée {index + 1}</td>
              <td><button onClick={incrementRowCount}>Ajouter une ligne</button></td>
              <td><button onClick={decrementRowCount}>Supprimer une ligne</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    

    {popupOpen && (
      <PopupDemand
        demandeIndex={selectedRow}
        onTraitement={handleTraitement}
        onClose={closePopup}
      />
    )}
 
  </div>
);
};

export default DemandeTable