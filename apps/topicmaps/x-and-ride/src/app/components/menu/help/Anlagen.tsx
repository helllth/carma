import Icon from 'react-cismap/commons/Icon';
import {
  faInfoCircle,
  faSearchLocation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Anlagen = () => {
  return (
    <>
      <p>
        Bewegen Sie den Mauszeiger im Kartenfenster auf eines der Symbole für
        Park+Ride- bzw. Bike+Ride-Anlagen (P+R- bzw. B+R-Anlagen), um sich den
        Namen der Anlage anzeigen zu lassen. Ein Klick auf das Symbol setzt den
        Fokus auf diese Anlage. Sie wird dann blau hinterlegt und die
        zugehörigen Informationen (Name, Lagebeschreibung, Anzahl der Plätze)
        werden in der Info-Box angezeigt. (Auf einem Tablet-PC wird der Fokus
        durch das erste Antippen des Symbols gesetzt, das zweite Antippen
        blendet den Namen ein.) Durch Anklicken des Symbols{' '}
        <FontAwesomeIcon icon={faInfoCircle} /> rechts neben dem Namen der
        Anlage öffnen Sie das Datenblatt mit den vollständigen Informationen zu
        dieser Anlage einschließlich einer Verknüpfung zur Fahrplanauskunft des
        VRR für die zugehörige Haltestelle. Mit dem Lupensymbol{' '}
        <FontAwesomeIcon icon={faSearchLocation} /> wird die Karte auf die
        Anlage, die gerade den Fokus hat, zentriert und gleichzeitig ein großer
        Betrachtungsmaßstab (Zoomstufe 14) eingestellt.{' '}
      </p>
      <p>
        Wenn Sie noch keine Anlage im aktuellen Kartenausschnitt selektiert
        haben, wird der Fokus automatisch auf die nördlichste Anlage gesetzt.
        Mit den Funktionen <a>&lt;&lt;</a> vorheriger Treffer und{' '}
        <a>&gt;&gt;</a> nächster Treffer können Sie ausgehend von der Anlage,
        auf der gerade der Fokus liegt, in nördlicher bzw. südlicher Richtung
        alle aktuell im Kartenfenster angezeigten Anlagen durchmustern.
      </p>
      <p>
        Mit der Schaltfläche <Icon name="chevron-circle-down" /> im dunkelgrau
        abgesetzten rechten Rand der Info-Box lässt sich diese so verkleinern,
        dass nur noch der Typ der Anlage (Park + Ride oder Bike + Ride), ihr
        Name und die Symbole <FontAwesomeIcon icon={faSearchLocation} /> und{' '}
        <FontAwesomeIcon icon={faInfoCircle} /> angezeigt werden - nützlich für
        Endgeräte mit kleinem Display. Mit der Schaltfläche{' '}
        <Icon name="chevron-circle-up" /> an derselben Stelle können Sie die
        Info-Box wieder vollständig einblenden.
      </p>
      <p>
        Ein kleines Foto über der Info-Box vermittelt Ihnen einen Eindruck vom
        Aussehen der Anlage vor Ort. Klicken Sie auf dieses Vorschaubild, um
        einen Bildbetrachter ("Leuchtkasten") mit dem Foto zu öffnen.
      </p>
    </>
  );
};

export default Anlagen;
