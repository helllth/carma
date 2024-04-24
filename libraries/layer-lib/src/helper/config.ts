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
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'boden:radon',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'gewaesser:quellen',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'gewaesser:station',
      },
      {
        name: 'gewaesser:strukturguete',
      },
      {
        name: 'gewaesser:einleitungen',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
        pictureBoundingBox: [
          792828.7439451873, 6668492.946426873, 797161.7679861032,
          6671500.2657584725,
        ],
      },
      {
        name: 'uschwemm_ermittelt',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'uschwemm_vor',
        pictureBoundingBox: [
          808524.6099721214, 6664293.687185457, 813466.7415821848,
          6667301.006517054,
        ],
      },
      {
        name: 'uschwemm_fest',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'gefahr_niedrig',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'gefahr_mittel',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'gefahr_hoch',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'risiko_niedrig',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'risiko_mittel',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'risiko_hoch',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'naturdenkmale',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2016:STR_RAST_NGT',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2016:SCS_RAST_DEN',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2016:SCS_RAST_NGT',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2016:LDEN_BAHN',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2016:LNIGHT_BAHN',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2016:IND_RAST_DEN',
        pictureBoundingBox: [
          788913.734902706, 6663818.344415807, 793755.542913145,
          6666825.663747405,
        ],
      },
      {
        name: 'laerm2016:IND_RAST_NGT',
        pictureBoundingBox: [
          788913.734902706, 6663818.344415807, 793755.542913145,
          6666825.663747405,
        ],
      },
      {
        name: 'laerm2022:STR_RAST_DEN',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2022:STR_RAST_NGT',
        pictureBoundingBox: [
          784621.3180330665, 6660622.321170634, 794304.9340539448,
          6666636.959833823,
        ],
      },
      {
        name: 'laerm2022:SCS_RAST_DEN',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2022:SCS_RAST_NGT',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm:LDEN_BAHN_4',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm:LNIGHT_BAHN_4',
        pictureBoundingBox: [
          793306.4753719696, 6664907.572068873, 802990.091392848,
          6670922.2107320605,
        ],
      },
      {
        name: 'laerm2022:IND_RAST_DEN',
        pictureBoundingBox: [
          788913.734902706, 6663818.344415807, 793755.542913145,
          6666825.663747405,
        ],
      },
      {
        name: 'laerm2022:IND_RAST_NGT',
        pictureBoundingBox: [
          788913.734902706, 6663818.344415807, 793755.542913145,
          6666825.663747405,
        ],
      },
      {
        name: 'solar_year',
      },
      {
        name: 'solar_zy_photo',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'solar_zy_therm',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
          799177.1974428413, 6659678.204438456, 800137.4376106737,
          6660409.730685716,
        ],
      },
      {
        name: 'poi_wupperufer',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
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
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_moscheen',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
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
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_schwimmbaeder',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_sehenswuerdigkeiten',
      },
      {
        name: 'poi_soziale',
      },
      {
        name: 'poi_sporthallen',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_stadtverwaltung',
      },
      {
        name: 'poi_synagogen',
      },
      {
        name: 'poi_theater',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
      },
      {
        name: 'poi_veranstaltungsorte',
      },
      {
        name: 'poi_wege',
        pictureBoundingBox: [
          790989.4779520752, 6664143.201786021, 800673.0939729535,
          6670157.840449209,
        ],
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
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
      },
      {
        name: 'expg',
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
      },
      {
        name: 'R102:UEK125',
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
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
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
      },
      {
        name: 'wuppertal:1929',
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
      },
      {
        name: 'wuppertal:1979',
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
      },
      {
        name: 'wuppertal:2004',
        pictureBoundingBox: [
          784874.5156892611, 6655868.893474152, 821182.1041247197,
          6679927.448126909,
        ],
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
        pictureBoundingBox: [
          790327.8199259817, 6664050.044157797, 794168.7805973117,
          6666976.149146838,
        ],
      },
      {
        name: 'innenr',
        pictureBoundingBox: [
          808586.7150576031, 6657920.749952179, 813165.7707833119,
          6660846.854941222,
        ],
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
        pictureBoundingBox: [
          795100.3568795373, 6660908.960026704, 797389.8847423919,
          6662372.012521227,
        ],
      },
      {
        name: 'Fnpaenderungsverfahren',
        pictureBoundingBox: [
          793980.0766837327, 6660217.443786437, 796269.6045465872,
          6661680.496280962,
        ],
      },
      {
        name: 'Fnpaenderungsverfahren-r',
        pictureBoundingBox: [
          793980.0766837327, 6660217.443786437, 796269.6045465872,
          6661680.496280962,
        ],
      },
      {
        name: 'Fnpaenderungsverfahren-n',
        pictureBoundingBox: [
          793980.0766837327, 6660217.443786437, 796269.6045465872,
          6661680.496280962,
        ],
      },
      {
        name: 'Fnpaenderungsverfahren-a',
        pictureBoundingBox: [
          793980.0766837327, 6660217.443786437, 796269.6045465872,
          6661680.496280962,
        ],
      },
      {
        name: 'landschaft:lundsschutz',
        pictureBoundingBox: [
          793980.0766837327, 6660217.443786437, 796269.6045465872,
          6661680.496280962,
        ],
      },
      {
        name: 'lplan:festsetzung',
        pictureBoundingBox: [
          790674.1752103989, 6660065.764058432, 795253.2309361077,
          6662991.869047475,
        ],
      },
      {
        name: 'lpnord:festsetzung',
        pictureBoundingBox: [
          786460.5840261785, 6664637.653812743, 788750.111889033,
          6666100.706307263,
        ],
      },
      {
        name: 'lpnord:entwicklung',
        pictureBoundingBox: [
          786460.5840261785, 6664637.653812743, 788750.111889033,
          6666100.706307263,
        ],
      },
      {
        name: 'lpost:festsetzung',
        pictureBoundingBox: [
          799296.0331352534, 6665023.421939869, 801585.5609981079,
          6666486.474434387,
        ],
      },
      {
        name: 'lpost:entwicklung',
        pictureBoundingBox: [
          799296.0331352534, 6665023.421939869, 801585.5609981079,
          6666486.474434387,
        ],
      },
      {
        name: 'lpgelpe:festsetzung',
        pictureBoundingBox: [
          798245.0239963323, 6661616.002538341, 799389.7879277592,
          6662347.528785604,
        ],
      },
      {
        name: 'lpgelpe:entwicklung',
        pictureBoundingBox: [
          798245.0239963323, 6661616.002538341, 799389.7879277592,
          6662347.528785604,
        ],
      },
      {
        name: 'lpwest:festsetzung',
        pictureBoundingBox: [
          792702.14511709, 6659814.95505937, 794991.6729799444,
          6661278.007553893,
        ],
      },
      {
        name: 'lpwest:entwicklung',
        pictureBoundingBox: [
          792702.14511709, 6659814.95505937, 794991.6729799444,
          6661278.007553893,
        ],
      },
      {
        name: 'baul',
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
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
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
      },
      {
        name: 'sc_txt',
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
      },
      {
        name: 'haltungen',
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
      },
      {
        name: 'ha_txt',
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
      },
      {
        name: 'sflaechen',
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
      },
      {
        name: 'fl_txt',
        pictureBoundingBox: [
          801365.804541788, 6668672.095711919, 801671.5526549286,
          6668977.84382506,
        ],
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
        pictureBoundingBox: [
          779236.43555291, 6639001.66376131, 823764.23187022, 6692356.43526254,
        ],
      },
    ],
  },
};
