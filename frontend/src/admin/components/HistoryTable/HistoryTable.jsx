import { BsFillCheckCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs';
import './Historytable.css';

const Historytable = ({ demandes }) => {
  if (!demandes || !Array.isArray(demandes)) {
    // Gère le cas où demandes est indéfini ou n'est pas un tableau
    return null;
  }

  return (
    <div className="Base-tableHistory">
      <table className="table-history">
        <caption className="title-tableAdmin">Historique des demandes</caption>
        <thead>
          <tr>
            <th>Numéro de demande</th>
            <th>Date</th>
            <th>Label</th>
            <th>Avancement</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>N°{demande.id}</td>
              <td>{demande.date ? demande.date.toLocaleDateString() : ''}</td>
              <td>{demande.label}</td>
              <td>
                {demande.validee ? (
                  <span>
                    <BsFillCheckCircleFill className='iconevalid'style={{ width: '1em', height: '1em' }} />
                    Validée
                  </span>
                ) : demande.rejetee ? (
                  <span>
                    <BsFillExclamationCircleFill className='iconeinvalid' style={{ width: '1em', height: '1em' }} />
                    Rejetée
                  </span>
                ) : (
                  ''
                )}
              </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historytable;