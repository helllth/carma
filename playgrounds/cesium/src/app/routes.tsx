import ClassifyByGeoJson from './views/ClassifyByGeoJson';

import TilesetSelectionFromCityGml from './views/TilesetSelectionFromCityGml';
import TilesetSelectionFromBaseMapDE from './views/TilesetSelectionBasemapDe';
import TilesetSelectionClassify from './views/TilesetSelectionClassify';

import ObsoletePlanModelStyle from './views/obsolete/PlanningModelStyle';

import TestExtrudeGeoJson from './views/tests/ExtrudeGeoJson';
import TestMarkers from './views/tests/Markers';
import TestGeojsonWithCityGML from './views/tests/CityGml';

import TestObsoleteGeojson from './views/tests/obsolete/Geojson';
import TestObsoleteTileset from './views/tests/obsolete/Tileset';

import TestComponentCustomViewer from './views/tests/components/CustomViewer';
import TestComponentByGeoJsonClassifier from './views/tests/components/ByGeoJsonClassifier';

import StandaloneResium from './views/tests/standalone/Resium';
import StandaloneTopicMap from './views/tests/standalone/TopicMap';
import StandaloneTailwind from './views/tests/standalone/Tailwind';

import { ComponentType } from 'react';

export type RouteItem = [string, string, ComponentType];

export type RoutePath = [string, string, RouteItem[] | RoutePath[]];

export type RouteDescriptor = RouteItem | RoutePath;

// views or features 🚧 under heavy construction
// (obsolete or unmaintained)
// ⚙️ for debug or test views

export const viewerRoutes: RouteDescriptor[] = [
  ['/', '', ClassifyByGeoJson],
  ['/geojson-classify', 'Gebäudeauswahl', ClassifyByGeoJson],
  ['/extrude', 'Extrusion', TestExtrudeGeoJson],
  ['/poi', 'Marker', TestMarkers],
  [
    '/test',
    '⚙️ Test',
    [
      [
        '/citygml',
        'FeatureTest GeoJson Vergleich mit CityGML 🚧',
        TestGeojsonWithCityGML,
      ],
      //['/geojson-old', '(GeoJson Vergleich 🚧)', TestObsoleteGeojson],
      // ['/stadtmodell', 'Stil Vorauswahl 🚧', ObsoletePlanModelStyle],
      //['/tileset', '(FeatureTest Tileset 🚧)', TestObsoleteTileset],
      [
        '/geojson',
        'ComponentTest GeoJSON Overlay',
        TestComponentByGeoJsonClassifier,
      ],
      ['/viewer', 'ComponentTest Viewer', TestComponentCustomViewer],
    ],
  ],
  /*
  // TODO: defunct with the Tilesets visibile by default
  [
    '/tileset',
    '⚙️ Tileset',
    [
      ['/citygml', 'Auswahl in CityGML 🚧', TilesetSelectionFromCityGml],
      [
        '/citygml-classify',
        'Klassifiziertes CityGML 🚧',
        TilesetSelectionClassify,
      ],
      [
        '/basemap-de',
        'Auswahl in BaseMap.de 🚧',
        TilesetSelectionFromBaseMapDE,
      ],
    ],
  ],
  */
];

export const otherRoutes: RouteDescriptor[] = [
  [
    '/testapp',
    '⚙️ Standalone',
    [
      ['/resium', 'Standalone Test Resium', StandaloneResium],
      ['/tailwind', 'Standalone Test Tailwind', StandaloneTailwind],
      [
        '/topicMapWithBaseLayer',
        'Standalone Test TopicMapWithBaseLayer',
        StandaloneTopicMap,
      ],
    ],
  ],
];

export default viewerRoutes;
