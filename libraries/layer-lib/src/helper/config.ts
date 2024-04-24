export const config = {
  Ortho: {
    title: 'Orthofotos',
    layers: [
      {
        name: 'R102:luftbild2022',
      },
      {
        name: 'R102:luftbild2020',
      },
      {
        name: 'R102:luftbild2018',
      },
      {
        name: 'R102:luftbild2016',
      },
      {
        name: 'R102:luftbild2014',
      },
      {
        name: 'R102:luftbild2012',
      },
      {
        name: 'R102:luftbild2010',
      },
      {
        name: 'R102:luftbild2007',
      },
      {
        name: 'R102:luftbild2005',
      },
      {
        name: 'R102:luftbild2002',
      },
      {
        name: 'R102:luftbild1997',
      },
      {
        name: 'R102:luftbild1991',
      },
      {
        name: 'R102:luftbild1985',
      },
      {
        name: 'R102:luftbild1979',
      },
      {
        name: 'R102:luftbild1928',
      },
      {
        name: 'R102:trueortho2022',
      },
      {
        name: 'R102:trueortho2020',
      },
      {
        name: 'R102:trueortho2018',
      },
    ],
  },
  Starkregen: {
    layers: [
      {
        name: 'R102:50md',
      },
      {
        name: 'R102:50d',
      },
      {
        name: 'R102:50v',
      },
      {
        name: 'R102:100md',
      },
      {
        name: 'R102:100d',
      },
      {
        name: 'R102:100v',
      },
      {
        name: 'R102:90md',
      },
      {
        name: 'R102:90d',
      },
      {
        name: 'R102:90v',
      },
      {
        name: 'R102:SRmd',
      },
      {
        name: 'R102:SRd',
      },
      {
        name: 'R102:SRv',
      },
    ],
  },
  Lärmkarten: {
    layers: [
      {
        name: 'laerm2016:STR_RAST_DEN',
        Title: '2016 Straßenverkehrslärm (LDEN)',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2016:STR_RAST_NGT',
        Title: '2016 Straßenverkehrslärm (LNIGHT)',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2016:SCS_RAST_NGT',
        Title: '2016 Schienenverkehrslärm (LNIGHT)',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2016:IND_RAST_NGT',
        Title: '2016 Gewerbelärm (LNIGHT)',
        pictureBoundingBox: [
          788913.734902706, 6663818.344415807, 793755.542913145,
          6666825.663747405,
        ],
      },
      {
        name: 'laerm2022:STR_RAST_DEN',
        Title: '2022 Straßenverkehrslärm (LDEN)',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2022:STR_RAST_NGT',
        Title: '2022 Straßenverkehrslärm (LNIGHT)',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2022:SCS_RAST_DEN',
        Title: '2022 Schienenverkehrslärm (LNIGHT)',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
    ],
  },
  Schulen: {
    layers: [
      {
        name: 'poi_schulen_grund',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_gym',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_real',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_haupt',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_gesamt',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_forder',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_andere',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_beruf',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
    ],
  },
};

export const baseConfig = {
  Umwelt: {
    layers: [
      {
        name: 'baeume',
      },
      {
        name: 'kga',
      },
      {
        name: 'boden:radon',
      },
      {
        name: 'gewaesser:biotope',
      },
      {
        name: 'gewaesser:gewnamen',
      },
      {
        name: 'gewaesser:linien',
      },
      {
        name: 'gewaesser:teiche',
      },
      {
        name: 'gewaesser:quellen',
      },
      {
        name: 'gewaesser:station',
      },
      {
        name: 'gewaesser:strukturguete',
      },
      {
        name: 'gewaesser:einleitungen',
      },
      {
        name: 'gewaesser:querbauten',
      },
      {
        name: 'gewaesser:massnaue',
      },
      {
        name: 'gewaesser:entwicklungsziel',
      },
      {
        name: 'gewaesser:massnahmen',
      },
      {
        name: 'gewaesser:querbauweg',
      },
      {
        name: 'uschwemm_ermittelt',
      },
      {
        name: 'uschwemm_vor',
      },
      {
        name: 'uschwemm_fest',
      },
      {
        name: 'gefahr_niedrig',
      },
      {
        name: 'gefahr_mittel',
      },
      {
        name: 'gefahr_hoch',
      },
      {
        name: 'risiko_niedrig',
      },
      {
        name: 'risiko_mittel',
      },
      {
        name: 'risiko_hoch',
      },
      {
        name: 'R102:50md',
      },
      {
        name: 'R102:50d',
      },
      {
        name: 'R102:50v',
      },
      {
        name: 'R102:100md',
      },
      {
        name: 'R102:100d',
      },
      {
        name: 'R102:100v',
      },
      {
        name: 'R102:90md',
      },
      {
        name: 'R102:90d',
      },
      {
        name: 'R102:90v',
      },
      {
        name: 'R102:SRmd',
      },
      {
        name: 'R102:SRd',
      },
      {
        name: 'R102:SRv',
      },
      {
        name: 'stadt:kompensationoe',
      },
      {
        name: 'naturdenkmale',
      },
      {
        name: 'Klimafunktion',
      },
      {
        name: 'Planhinweise',
      },
      {
        name: 'Nachtsituation',
      },
      {
        name: 'Tagsituation',
      },
      {
        name: 'Hitze-Ist',
      },
      {
        name: 'Hitze-Stark-Ist',
      },
      {
        name: 'Hitze-2050',
      },
      {
        name: 'Frischluftschneisen',
      },
      {
        name: 'Freiflaechen',
      },
      {
        name: 'umweltzonen',
      },
      {
        name: 'uwz',
      },
      {
        name: 'no2',
      },
      {
        name: 'lugi2000',
      },
      {
        name: 'lugi1987',
      },
      {
        name: 'laerm2016:STR_RAST_DEN',
      },
      {
        name: 'laerm2016:STR_RAST_NGT',
      },
      {
        name: 'laerm2016:SCS_RAST_DEN',
      },
      {
        name: 'laerm2016:SCS_RAST_NGT',
      },
      {
        name: 'laerm2016:LDEN_BAHN',
      },
      {
        name: 'laerm2016:LNIGHT_BAHN',
      },
      {
        name: 'laerm2016:IND_RAST_DEN',
      },
      {
        name: 'laerm2016:IND_RAST_NGT',
      },
      {
        name: 'laerm2022:STR_RAST_DEN',
      },
      {
        name: 'laerm2022:STR_RAST_NGT',
      },
      {
        name: 'laerm2022:SCS_RAST_DEN',
      },
      {
        name: 'laerm2022:SCS_RAST_NGT',
      },
      {
        name: 'laerm:LDEN_BAHN_4',
      },
      {
        name: 'laerm:LNIGHT_BAHN_4',
      },
      {
        name: 'laerm2022:IND_RAST_DEN',
      },
      {
        name: 'laerm2022:IND_RAST_NGT',
      },
      {
        name: 'solar_year',
      },
      {
        name: 'solar_zy_photo',
      },
      {
        name: 'solar_zy_therm',
      },
      {
        name: 'solar_umring',
      },
      {
        name: 'solar_karte',
      },
    ],
  },
  POI: {
    layers: [
      {
        name: 'poi',
      },
      {
        name: 'poi_awg',
        pictureBoundingBox: [
          789024.8074594327, 6664703.341883925, 791171.0158942525,
          6666207.001549717,
        ],
      },
      {
        name: 'poi_bahnhoefe',
        pictureBoundingBox: [
          794448.2534819795, 6665461.740523942, 796594.4619167992,
          6666965.400189739,
        ],
      },
      {
        name: 'poi_behoerden',
      },
      {
        name: 'poi_bezirkssozialdienste',
      },
      {
        name: 'poi_bibliotheken',
      },
      {
        name: 'poi_bildungseinrichtungen',
      },
      {
        name: 'poi_haltestellen',
      },
      {
        name: 'poi_clubs',
      },
      {
        name: 'poi_dienstleistungsangebote',
      },
      {
        name: 'poi_feuerwehr',
        pictureBoundingBox: [
          793881.5445769589, 6668348.432670274, 794954.6487943687,
          6669100.262503172,
        ],
      },
      {
        name: 'poi_filmtheater',
        pictureBoundingBox: [
          795040.6404511896, 6666030.24092181, 797186.8488860093,
          6667533.900587609,
        ],
      },
      {
        name: 'poi_freizeitsportangebote',
        pictureBoundingBox: [
          802349.9312809596, 6668144.202485324, 806642.348150599,
          6671151.521816919,
        ],
      },
      {
        name: 'poi_friedhofsverband',
        pictureBoundingBox: [
          802432.937116363, 6668932.459339514, 803506.0413337728,
          6669684.289172413,
        ],
      },
      {
        name: 'poi_friedhoefe',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_friedhoefe_ehem',
      },
      {
        name: 'poi_gebaeude',
      },
      {
        name: 'poi_gruenanlagen',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_stauseen',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_wupperufer',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_jugend',
      },
      {
        name: 'poi_ksp',
      },
      {
        name: 'poi_kita',
      },
      {
        name: 'poi_kita_beh',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_kirchen',
      },
      {
        name: 'poi_krankenhaeuser',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_medien',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_moscheen',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_museen',
      },
      {
        name: 'poi_opunkte',
        pictureBoundingBox: [
          792683.0358600187, 6666519.9156342605, 796975.4527296581,
          6669527.234965856,
        ],
      },
      {
        name: 'poi_polizeidienststellen',
      },
      {
        name: 'poi_schulen',
      },
      {
        name: 'poi_schulen_grund',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_gym',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_real',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_haupt',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_gesamt',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_forder',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_andere',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schulen_beruf',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schwebebahnhaltestellen',
      },
      {
        name: 'poi_schwimmbaeder',
      },
      {
        name: 'poi_sehenswuerdigkeiten',
      },
      {
        name: 'poi_soziale',
      },
      {
        name: 'poi_sporthallen',
      },
      {
        name: 'poi_stadtverwaltung',
      },
      {
        name: 'poi_synagogen',
      },
      {
        name: 'poi_theater',
      },
      {
        name: 'poi_veranstaltungsorte',
      },
      {
        name: 'poi_wege',
      },
    ],
  },
  Karten: {
    layers: [
      {
        name: 'R102:luftbild2022',
      },
      {
        name: 'R102:luftbild2020',
      },
      {
        name: 'R102:luftbild2018',
      },
      {
        name: 'R102:luftbild2016',
      },
      {
        name: 'R102:luftbild2014',
      },
      {
        name: 'R102:luftbild2012',
      },
      {
        name: 'R102:luftbild2010',
      },
      {
        name: 'R102:luftbild2007',
      },
      {
        name: 'R102:luftbild2005',
      },
      {
        name: 'R102:luftbild2002',
      },
      {
        name: 'R102:luftbild1997',
      },
      {
        name: 'R102:luftbild1991',
      },
      {
        name: 'R102:luftbild1985',
      },
      {
        name: 'R102:luftbild1979',
      },
      {
        name: 'R102:luftbild1928',
      },
      {
        name: 'R102:trueortho2022',
      },
      {
        name: 'R102:trueortho2020',
      },
      {
        name: 'R102:trueortho2018',
      },
      {
        name: 'spw2_orange',
      },
      {
        name: 'spw2_light',
      },
      {
        name: 'spw2_graublau',
      },
      {
        name: 'oepnv_rvr',
      },
      {
        name: 'abkf',
      },
      {
        name: 'abkg',
      },
      {
        name: 'abkt',
      },
      {
        name: 'alf',
      },
      {
        name: 'algw',
      },
      {
        name: 'alkomf',
      },
      {
        name: 'alkomgw',
      },
      {
        name: 'albsf',
      },
      {
        name: 'albsgw',
      },
      {
        name: 'expsw',
      },
      {
        name: 'expg',
      },
      {
        name: 'R102:UEK125',
      },
      {
        name: 'R102:STADTRSW',
      },
      {
        name: 'R102:stadtgrundkarte_hausnr',
      },
      {
        name: 'urban',
      },
      {
        name: 'bplanreihe',
      },
      {
        name: 'bplanhintergrund',
      },
      {
        name: 'wuppertal:1827',
      },
      {
        name: 'wuppertal:1929',
      },
      {
        name: 'wuppertal:1979',
      },
      {
        name: 'wuppertal:2004',
      },
      {
        name: 'R102:DGK:schwarz',
      },
      {
        name: 'R102:DGK:gelb',
      },
      {
        name: 'R102:DGK:grau',
      },
      {
        name: 'R102:DGK:grau_nt',
      },
      {
        name: 'hillshade',
      },
    ],
  },
  Planung: {
    layers: [
      {
        name: 'bverfahren-r',
      },
      {
        name: 'bverfahren-n',
      },
      {
        name: 'innenr',
      },
      {
        name: 'r102:fnp',
      },
      {
        name: 'r102:fnp_clip',
      },
      {
        name: 'r102:fnp_haupt_fl',
      },
      {
        name: 'r102:fnp_ngF',
      },
      {
        name: 'Fnpaenderungsverfahren',
      },
      {
        name: 'Fnpaenderungsverfahren-r',
      },
      {
        name: 'Fnpaenderungsverfahren-n',
      },
      {
        name: 'Fnpaenderungsverfahren-a',
      },
      {
        name: 'landschaft:lundsschutz',
      },
      {
        name: 'lplan:festsetzung',
      },
      {
        name: 'lpnord:festsetzung',
      },
      {
        name: 'lpnord:entwicklung',
      },
      {
        name: 'lpost:festsetzung',
      },
      {
        name: 'lpost:entwicklung',
      },
      {
        name: 'lpgelpe:festsetzung',
      },
      {
        name: 'lpgelpe:entwicklung',
      },
      {
        name: 'lpwest:festsetzung',
      },
      {
        name: 'lpwest:entwicklung',
      },
      {
        name: 'baul',
      },
    ],
  },
  Infra: {
    layers: [
      {
        name: 'apotheken',
      },
      {
        name: 'fernwaermewsw',
      },
      {
        name: 'schaechte',
      },
      {
        name: 'sc_txt',
      },
      {
        name: 'haltungen',
      },
      {
        name: 'ha_txt',
      },
      {
        name: 'sflaechen',
      },
      {
        name: 'fl_txt',
      },
    ],
  },
  Gebiet: {
    layers: [
      {
        name: 'R102:fluruebersicht',
      },
    ],
  },
  Verkehr: {
    layers: [
      {
        name: 'einstr',
      },
    ],
  },
  Inspire: {
    layers: [
      {
        name: 'US.ChildCareService',
      },
    ],
  },
  Immo: {
    layers: [
      {
        name: 'borisplus_brw',
      },
    ],
  },
};
