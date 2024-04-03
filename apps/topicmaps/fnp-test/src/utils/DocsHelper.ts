import { Doc } from '@cismet/document-viewer';

const tileservice = 'https://resources.cismet.de/tiles/';

function replaceUmlauteAndSpaces(str) {
  const umlautMap = {
    Ü: 'UE',
    Ä: 'AE',
    Ö: 'OE',
    ü: 'ue',
    ä: 'ae',
    ö: 'oe',
    ß: 'ss',
    ' ': '_',
  };
  let ret = str
    .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
      var big = umlautMap[a.slice(0, 1)];
      return big.charAt(0) + big.charAt(1) + a.slice(1);
    })
    .replace(
      new RegExp('[' + Object.keys(umlautMap).join('|') + ']', 'g'),
      (a) => umlautMap[a]
    );
  // console.log('in', str);
  // console.log('out', ret);
  return ret;
}

export function getDocsForAEVGazetteerEntry(props) {
  let { gazHit, searchForAEVs } = props;
  let docs: Doc[] = [];

  searchForAEVs({
    gazObject: [gazHit],
    done: (aevFeatures: any) => {
      if (aevFeatures === undefined || aevFeatures.length === 0) {
        console.log('::this should not happen -- race condition?');

        return;
      }
      const aev = aevFeatures[0];
      console.log(aev);
      let title =
        aev.verfahren === ''
          ? 'FNP-Änderung ' + aev.name
          : 'FNP-Berichtigung ' + aev.name;

      if (aev) {
        const filename =
          aev.verfahren === ''
            ? 'FNP-Änderung.' + aev.name + '.pdf'
            : 'FNP-Berichtigung.' + aev.name + '.pdf';
        docs.push({
          group: 'Änderungsverfahren',
          file: filename,
          url: aev.url.replace(
            'http://www.wuppertal.de/geoportal/',
            'https://wunda-geoportal-docs.cismet.de/'
          ),
          layer: replaceUmlauteAndSpaces(
            aev.url.replace('http://www.wuppertal.de/geoportal/', tileservice) +
              '/{z}/{x}/{y}.png'
          ),
          meta: replaceUmlauteAndSpaces(
            aev.url.replace('http://www.wuppertal.de/geoportal/', tileservice) +
              '/meta.json'
          ),
          title: title,
        });

        if (aev.docUrls.length > 0) {
          let url =
            'https://www.wuppertal.de/geoportal/fnp_dokumente/Info_FNP-Zusatzdokumente_WUP.pdf';
          docs.push({
            group: 'Zusatzdokumente',
            title: 'Info Dateinamen',
            file: 'Info_FNP-Zusatzdokumente_WUP.pdf',
            url: url.replace(
              'https://www.wuppertal.de/geoportal/',
              'https://wunda-geoportal-docs.cismet.de/'
            ),
            layer: replaceUmlauteAndSpaces(
              url.replace('https://www.wuppertal.de/geoportal/', tileservice) +
                '/{z}/{x}/{y}.png'
            ),
            meta: replaceUmlauteAndSpaces(
              url.replace('https://www.wuppertal.de/geoportal/', tileservice) +
                '/meta.json'
            ),
          });
        }

        for (let url of aev.docUrls) {
          const filename = url.substring(url.lastIndexOf('/') + 1);
          docs.push({
            group: 'Zusatzdokumente',
            file: filename,
            title: filename,
            url: url.replace(
              'https://www.wuppertal.de/geoportal/',
              'https://wunda-geoportal-docs.cismet.de/'
            ),
            layer: replaceUmlauteAndSpaces(
              url.replace('https://www.wuppertal.de/geoportal/', tileservice) +
                '/{z}/{x}/{y}.png'
            ),
            meta: replaceUmlauteAndSpaces(
              url.replace('https://www.wuppertal.de/geoportal/', tileservice) +
                '/meta.json'
            ),
          });
        }
      }
    },
  });

  console.log(docs);
  return docs;
}
