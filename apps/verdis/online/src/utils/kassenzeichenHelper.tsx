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
