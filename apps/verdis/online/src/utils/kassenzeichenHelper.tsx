import AmKanalAngeschlossen from '../app/components/kurzinfos/anschlussgrad/AmKanalAngeschlossen';
import DirekteinleitungInVerrohrtesGewaesser from '../app/components/kurzinfos/anschlussgrad/DirekteinleitungInVerrohrtesGewaesser';
import DirekteinleitungOffenesGewaesser from '../app/components/kurzinfos/anschlussgrad/DirekteinleitungOffenesGewaesser';
import Versickernd from '../app/components/kurzinfos/anschlussgrad/Versickernd';
import VersickerungsanlageMitNotueberlauf from '../app/components/kurzinfos/anschlussgrad/VersickerungsanlageMitNotueberlauf';
import Dachflaeche from '../app/components/kurzinfos/flaechenart/Dachflaeche';
import Gruendachflaeche from '../app/components/kurzinfos/flaechenart/Gruendachflaeche';
import Oekopflaster from '../app/components/kurzinfos/flaechenart/Oekopflaster';
import StaedtStrassenflaeche from '../app/components/kurzinfos/flaechenart/StaedtStrassenflaeche';
import StaedtStrassenflaecheOekopflaster from '../app/components/kurzinfos/flaechenart/StaedtStrassenflaecheOekopflaster';
import VersiegelteFlaeche from '../app/components/kurzinfos/flaechenart/VersiegelteFlaeche';

export const colorUnchanged = 'black';
export const colorChanged = '#436F8C';
export const colorNeededProof = '#B55959';
export const colorAccepted = '#3D7844';
export const colorRejected = '#B11623';
export const colorDraft = '#BD9546';

const getMergedFlaechenObject = (flaeche, flaechenCR) => {
  let ret = JSON.parse(JSON.stringify(flaeche));

  ret.flaecheninfo.groesse_korrektur =
    flaechenCR.groesse || ret.flaecheninfo.groesse_korrektur;
  ret.flaecheninfo.anschlussgrad =
    flaechenCR.anschlussgrad || ret.flaecheninfo.anschlussgrad;
  ret.flaecheninfo.flaechenart =
    flaechenCR.flaechenart || ret.flaecheninfo.flaechenart;
  return ret;
};

export const getMergedFlaeche = (flaecheOrFlaechenfeature, flaechenCR) => {
  if (flaechenCR === undefined) {
    return flaecheOrFlaechenfeature;
  } else {
    if (flaecheOrFlaechenfeature.flaechenart !== undefined) {
      //feature
      let featureProps = JSON.parse(JSON.stringify(flaecheOrFlaechenfeature));

      let crASG, crFA, crFAAbk, crG;
      try {
        crASG = flaechenCR.anschlussgrad.grad_abkuerzung;
      } catch (skip) {}

      try {
        crFA = flaechenCR.flaechenart.art;
      } catch (skip) {}
      try {
        crFAAbk = flaechenCR.flaechenart.art_abkuerzung;
      } catch (skip) {}
      try {
        crG = flaechenCR.groesse;
      } catch (skip) {}

      featureProps.anschlussgrad = crASG || featureProps.anschlussgrad;
      featureProps.flaechenart = crFA || featureProps.flaechenart;
      featureProps.art_abk = crFAAbk || featureProps.art_abk;
      featureProps.groesse = crG || featureProps.groesse;
      featureProps.groesse_korrektur = crG || featureProps.groesse_korrektur;
      return featureProps;
    } else {
      //flaechenobject
      return getMergedFlaechenObject(flaecheOrFlaechenfeature, flaechenCR);
    }
  }
};

export const getLinkForDoc = (doc) => {
  return 'https://wuppertal.regengeld.de/anhang/' + doc.uuid + '_' + doc.name;
};

export const getCRsForFeature = (kassenzeichen, flaechenFeature) => {
  if (
    kassenzeichen.aenderungsanfrage !== undefined &&
    kassenzeichen.aenderungsanfrage !== null &&
    kassenzeichen.aenderungsanfrage.flaechen !== undefined &&
    kassenzeichen.aenderungsanfrage.flaechen[flaechenFeature.bez] !== undefined
  ) {
    const ret = kassenzeichen.aenderungsanfrage.flaechen[flaechenFeature.bez];
    return ret;
  } else {
    return undefined;
  }
};

export const getCRsForFlaeche = (kassenzeichen, flaeche) => {
  if (
    kassenzeichen.aenderungsanfrage !== undefined &&
    kassenzeichen.aenderungsanfrage !== null &&
    kassenzeichen.aenderungsanfrage.flaechen !== undefined &&
    kassenzeichen.aenderungsanfrage.flaechen[flaeche.flaechenbezeichnung] !==
      undefined
  ) {
    const ret =
      kassenzeichen.aenderungsanfrage.flaechen[flaeche.flaechenbezeichnung];
    return ret;
  } else {
    return undefined;
  }
};

export const hasAttachment = (flaechenCR) => {
  if (flaechenCR?.nachrichten !== undefined) {
    for (const nachricht of flaechenCR.nachrichten) {
      if (nachricht.anhang !== undefined) {
        return true;
      }
    }
  }
};

export const kassenzeichenFlaechenSorter = (fa, fb) => {
  if (!isNaN(fa.flaechenbezeichnung) && !isNaN(fb.flaechenbezeichnung)) {
    return +fa.flaechenbezeichnung - +fb.flaechenbezeichnung;
  } else if (!isNaN(fa.flaechenbezeichnung) && isNaN(fb.flaechenbezeichnung)) {
    return -1;
  } else if (isNaN(fa.flaechenbezeichnung) && !isNaN(fb.flaechenbezeichnung)) {
    return 1;
  } else {
    if (fa.flaechenbezeichnung < fb.flaechenbezeichnung) {
      return -1;
    } else {
      return 1;
    }
  }
};

export const veranlagungsgrundlage = [
  {
    flaechenart: 6,
    anschlussgrad: 3,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 1,
    anschlussgrad: 2,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 2,
    anschlussgrad: 2,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 3,
    anschlussgrad: 2,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 4,
    anschlussgrad: 2,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 5,
    anschlussgrad: 2,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 6,
    anschlussgrad: 2,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 1,
    anschlussgrad: 3,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 2,
    anschlussgrad: 3,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 3,
    anschlussgrad: 3,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 4,
    anschlussgrad: 3,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  {
    flaechenart: 5,
    anschlussgrad: 3,
    veranlagungsschluessel: 0,
    bezeichner: '999-Rest',
  },
  // {
  //     flaechenart: 2,
  //     anschlussgrad: 4,
  //     veranlagungsschluessel: 0.25,
  //     bezeichner: "730-Va-über"
  // },
  // {
  //     flaechenart: 4,
  //     anschlussgrad: 4,
  //     veranlagungsschluessel: 0.35,
  //     bezeichner: "730-Va-über"
  // },
  {
    flaechenart: 6,
    anschlussgrad: 4,
    veranlagungsschluessel: 0.35,
    bezeichner: '740-VFS',
  },
  {
    flaechenart: 2,
    anschlussgrad: 5,
    veranlagungsschluessel: 0.5,
    bezeichner: '715-GDF',
  },
  // {
  //     flaechenart: 1,
  //     anschlussgrad: 4,
  //     veranlagungsschluessel: 0.5,
  //     bezeichner: "730-Va-über"
  // },
  // {
  //     flaechenart: 3,
  //     anschlussgrad: 4,
  //     veranlagungsschluessel: 0.5,
  //     bezeichner: "730-Va-über"
  // },
  {
    flaechenart: 1,
    anschlussgrad: 4,
    veranlagungsschluessel: 0.4,
    bezeichner: '731-Va-über',
  },
  {
    flaechenart: 3,
    anschlussgrad: 4,
    veranlagungsschluessel: 0.4,
    bezeichner: '731-Va-über',
  },
  {
    flaechenart: 4,
    anschlussgrad: 4,
    veranlagungsschluessel: 0.4,
    bezeichner: '731-Va-über',
  },
  {
    flaechenart: 2,
    anschlussgrad: 1,
    veranlagungsschluessel: 0.5,
    bezeichner: '715-GDF',
  },
  {
    flaechenart: 5,
    anschlussgrad: 4,
    veranlagungsschluessel: 0.5,
    bezeichner: '740-VFS',
  },
  {
    flaechenart: 4,
    anschlussgrad: 5,
    veranlagungsschluessel: 0.7,
    bezeichner: '725-LVF',
  },
  {
    flaechenart: 6,
    anschlussgrad: 1,
    veranlagungsschluessel: 0.7,
    bezeichner: '740-VFS',
  },
  {
    flaechenart: 4,
    anschlussgrad: 1,
    veranlagungsschluessel: 0.7,
    bezeichner: '725-LVF',
  },
  {
    flaechenart: 6,
    anschlussgrad: 5,
    veranlagungsschluessel: 0.7,
    bezeichner: '740-VFS',
  },
  {
    flaechenart: 7,
    anschlussgrad: 5,
    veranlagungsschluessel: 1,
    bezeichner: 'VV-750',
  },
  {
    flaechenart: 3,
    anschlussgrad: 1,
    veranlagungsschluessel: 1,
    bezeichner: '720-VF',
  },
  {
    flaechenart: 1,
    anschlussgrad: 5,
    veranlagungsschluessel: 1,
    bezeichner: '710-DF',
  },
  {
    flaechenart: 5,
    anschlussgrad: 1,
    veranlagungsschluessel: 1,
    bezeichner: '740-VFS',
  },
  {
    flaechenart: 3,
    anschlussgrad: 5,
    veranlagungsschluessel: 1,
    bezeichner: '720-VF',
  },
  {
    flaechenart: 5,
    anschlussgrad: 5,
    veranlagungsschluessel: 1,
    bezeichner: '740-VFS',
  },
  {
    flaechenart: 7,
    anschlussgrad: 1,
    veranlagungsschluessel: 1,
    bezeichner: 'VV-750',
  },
  {
    flaechenart: 7,
    anschlussgrad: 2,
    veranlagungsschluessel: 1,
    bezeichner: 'VV-750',
  },
  {
    flaechenart: 7,
    anschlussgrad: 3,
    veranlagungsschluessel: 1,
    bezeichner: 'VV-750',
  },
  {
    flaechenart: 7,
    anschlussgrad: 4,
    veranlagungsschluessel: 1,
    bezeichner: 'VV-750',
  },
  {
    flaechenart: 1,
    anschlussgrad: 1,
    veranlagungsschluessel: 1,
    bezeichner: '710-DF',
  },
  {
    flaechenart: 2,
    anschlussgrad: 4,
    veranlagungsschluessel: 0.3,
    bezeichner: '735-GDF-V',
  },
];

export const flaechenartLookupByAbk = {
  DF: 1,
  GDF: 2,
  VF: 3,
  VFS: 5,
  LVS: 6,
  LVF: 4,
  VV: 7,
};

export const anschlussgradLookupByAbk = {
  'angeschl.': 1,
  'vers.': 2,
  'direkt OG': 3,
  'Va-Über': 4,
  'Bach verrohrt': 5,
};

export const getOverlayTextForFlaeche = (flaeche, flaechenCR) => {
  let mergedFlaeche = getMergedFlaeche(flaeche, flaechenCR);
  return (
    <div>
      {getInfoTextForFlaechenart(mergedFlaeche)}
      <br />
      {getInfoTextForAnschlussgrad(mergedFlaeche)}
    </div>
  );
};

export const getInfoTextForFlaechenart = (flaeche) => {
  let flaechenart;
  let switcher;
  if (flaeche.flaechenart) {
    switcher = flaeche.flaechenart;
  } else {
    switcher = flaeche.flaecheninfo.flaechenart.art;
  }

  switch (switcher) {
    case 'Dachfläche':
      flaechenart = <Dachflaeche />;
      break;
    case 'Gründach':
      flaechenart = <Gruendachflaeche />;
      break;
    case 'versiegelte Fläche':
      flaechenart = <VersiegelteFlaeche />;
      break;
    case 'städtische Straßenfläche':
      flaechenart = <StaedtStrassenflaeche />;
      break;
    case 'leicht versiegelte Straßenfläche':
      flaechenart = <StaedtStrassenflaecheOekopflaster />;
      break;
    case 'leicht versiegelte Fläche':
      flaechenart = <Oekopflaster />;
      break;
    default:
      throw new Error('unbekannte Flächenart: ' + switcher);
  }

  return flaechenart;
};

export const getInfoTextForAnschlussgrad = (flaeche) => {
  let anschlussgrad;

  let switcher;
  if (flaeche.anschlussgrad) {
    switcher = flaeche.anschlussgrad;
  } else {
    switcher = flaeche.flaecheninfo.anschlussgrad.grad_abkuerzung;
  }
  switch (switcher) {
    case 'angeschl.':
      anschlussgrad = <AmKanalAngeschlossen />;
      break;
    case 'vers.':
      anschlussgrad = <Versickernd />;
      break;
    case 'direkt OG':
      anschlussgrad = <DirekteinleitungOffenesGewaesser />;
      break;
    case 'Va-Über':
      anschlussgrad = <VersickerungsanlageMitNotueberlauf />;
      break;
    case 'Bach verrohrt':
      anschlussgrad = <DirekteinleitungInVerrohrtesGewaesser />;
      break;
    default:
      throw new Error('unbekannte Anschlussgrad: ' + switcher);
  }

  return anschlussgrad;
};
