import {
  MappingConstants,
  RoutedMap,
  FeatureCollectionDisplay,
} from 'react-cismap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  fitFeatureBounds,
  getMapping,
  mapBoundsChanged,
  setAutoFit,
  setSelectedFeatureIndexWithSelector,
} from '../../store/slices/mapping';
import 'react-cismap/topicMaps.css';
import 'leaflet/dist/leaflet.css';
import { getHeight } from '../../store/slices/ui';
import { createFlaechenStyler } from '../../utils/kassenzeichenMappingTools';
import { getKassenzeichen } from '../../store/slices/kassenzeichen';

const Map = () => {
  const [urlParams, setUrlParams] = useSearchParams();
  const dispatch = useDispatch();
  const mapping = useSelector(getMapping);
  const height = useSelector(getHeight);
  const kassenzeichen = useSelector(getKassenzeichen);
  const annotationEditable = false;

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }

  const isFlaecheSelected = (flaeche) => {
    return (
      mapping.featureCollection !== 'undefined' &&
      mapping.featureCollection.length > 0 &&
      mapping.selectedIndex !== 'undefined' &&
      mapping.featureCollection.length > mapping.selectedIndex &&
      mapping.featureCollection[mapping.selectedIndex] &&
      mapping.featureCollection[mapping.selectedIndex]?.properties.id ===
        flaeche.id
    );
  };

  const featureClick = (event, feature) => {
    if (isFlaecheSelected(feature.properties)) {
      dispatch(
        fitFeatureBounds(mapping.featureCollection[mapping.selectedIndex], '')
      );
    } else {
      dispatch(
        setSelectedFeatureIndexWithSelector((testFeature) => {
          return testFeature.properties.id === feature.properties.id;
        })
      );
    }
  };

  const mapStyle = {
    height: height - 55,
    cursor: 'grab',
  };

  return (
    <RoutedMap
      editable={true}
      // onFeatureCreation={this.onFeatureCreation}
      // onFeatureChangeAfterEditing={this.onFeatureChange}
      snappingEnabled={true}
      key={'leafletRoutedMap0 + '}
      referenceSystem={MappingConstants.crs25832}
      referenceSystemDefinition={MappingConstants.proj4crs25832def}
      // ref={(leafletMap) => {
      //   this.leafletRoutedMap = leafletMap;
      // }}
      layers=""
      style={mapStyle}
      // ondblclick={this.mapDblClick}
      doubleClickZoom={false}
      locationChangedHandler={(location) => {
        const newParams = { ...paramsToObject(urlParams), ...location };
        setUrlParams(newParams);
      }}
      autoFitConfiguration={{
        autoFitBounds: mapping.autoFitBounds,
        autoFitMode: mapping.autoFitMode,
        autoFitBoundsTarget: mapping.autoFitBoundsTarget,
      }}
      autoFitProcessedHandler={
        () => dispatch(setAutoFit({ autofit: false }))
        // this.props.mappingActions.setAutoFit(false)
      }
      urlSearchParams={urlParams}
      boundingBoxChangedHandler={
        (bbox) => dispatch(mapBoundsChanged({ bbox }))
        // this.props.mappingActions.mappingBoundsChanged(bbox)
      }
      backgroundlayers={
        // this.props.backgroundlayers ||
        mapping.backgrounds[mapping.selectedBackgroundIndex].layerkey
      }
    >
      <FeatureCollectionDisplay
        key={
          'fc' +
          JSON.stringify(mapping.featureCollection) +
          '+' +
          mapping.selectedIndex +
          '+editEnabled:'
          // this.props.uiState.changeRequestsEditMode
        }
        featureCollection={mapping.featureCollection.filter(
          (feature) =>
            annotationEditable || feature.properties.type !== 'annotation'
        )}
        boundingBox={mapping.boundingBox}
        clusteringEnabled={false}
        style={createFlaechenStyler(false, kassenzeichen)}
        //labeler={flaechenLabeler}
        // hoverer={this.props.hoverer}
        featureClickHandler={featureClick}
        // mapRef={this.leafletRoutedMap}
        showMarkerCollection={urlParams.get('zoom') >= 15}
        // markerStyle={getMarkerStyleFromFeatureConsideringSelection}
        snappingGuides={true}
      />
      {/* <CyclingBackgroundButton
        key={
            "CyclingBackgroundButton." +
            this.state.featuresInEditmode +
            this.props.mapping.selectedBackgroundIndex
        }
        position="topleft"
        backgrounds={this.props.mapping.backgrounds}
        setSelectedBackgroundIndex={
            this.props.mappingActions.setSelectedBackgroundIndex
        }
        currentBackgroundIndex={this.props.mapping.selectedBackgroundIndex}
    />
    {annotationEditable && (
        <NewPolyControl
            key={
                "NewPolyControl + update when CyclingBackgroundButton." +
                this.state.featuresInEditmode +
                this.props.mapping.selectedBackgroundIndex
            }
            onSelect={() => {
                this.setState({ featuresInEditmode: false });
            }}
            tooltip="Fläche anlegen"
        />
    )}
    {annotationEditable && (
        <NewMarkerControl
            key={
                "NewMarkerControl+ update when CyclingBackgroundButton." +
                this.state.featuresInEditmode +
                this.props.mapping.selectedBackgroundIndex
            }
            onSelect={() => {
                this.setState({ featuresInEditmode: false });
            }}
            tooltip="Punkt anlegen"
        />
    )}
    {annotationEditable && (
        <EditModeControlButton
            key={
                "EditModeControlButton" +
                this.state.featuresInEditmode +
                this.props.mapping.selectedBackgroundIndex
            }
            featuresInEditmode={this.state.featuresInEditmode}
            onChange={featuresInEditmode => {
                this.setState({ featuresInEditmode });
                try {
                    const map = this.leafletRoutedMap.leafletMap.leafletElement;
                    console.log("map.editTools.mode.name", map.editTools.mode.name);

                    if (map.editTools.mode.name !== undefined) {
                        console.log("stopDrawing");

                        map.editTools.stopDrawing();
                        map.editTools.mode.name = undefined;
                        map.editTools.validClicks = 0;
                    }
                } catch (skip) {}
            }}
        />
    )}
    {this.props.children} */}
    </RoutedMap>
  );
};

export default Map;
