import { LayerProps } from "@carma-mapping/layers";

export const getLeafNodes = (node, result: any = {}): any => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const children = Array.from(node.children);
    if (children.length === 0) {
      // It's a leaf node
      result[node.nodeName] = node.textContent;
    } else {
      // Recursively find leaf nodes in children
      children.forEach((child) => getLeafNodes(child, result));
    }
  }
  return result;
};

export const objectToFeature = (jsonOutput: any, code: string) => {
  if (!jsonOutput) {
    return {
      properties: {
        title: "Keine Informationen gefunden",
      },
    };
  }
  const conf = code.split("\n").filter((line) => line.trim() !== "");
  let functionString = `(function(p) {
                    const info = {`;

  conf.forEach((rule) => {
    functionString += `${rule.trim()},\n`;
  });

  functionString += `
                                          };
                                          return info;
                    })`;

  const tmpInfo = eval(functionString)(jsonOutput);

  const properties = {
    ...tmpInfo,
  };

  return { properties };
};

export const functionToFeature = (output: any, code: string) => {
  let codeFunction = eval("(" + code + ")");
  const tmpInfo = codeFunction(output);

  const properties = {
    ...tmpInfo,
  };

  return { properties };
};

export const createUrl = (baseUrl, pos, minimalBoxSize, layerName) => {
  const url =
    baseUrl +
    `?SERVICE=WMS&request=GetFeatureInfo&format=image%2Fpng&transparent=true&version=1.1.1&tiled=true&width=10&height=10&srs=EPSG%3A25832&` +
    `bbox=` +
    `${pos[0] - minimalBoxSize},` +
    `${pos[1] - minimalBoxSize},` +
    `${pos[0] + minimalBoxSize},` +
    `${pos[1] + minimalBoxSize}&` +
    `x=5&y=5&` +
    `layers=${layerName}&` +
    `feature_count=100&QUERY_LAYERS=${layerName}&`;

  return url;
};

export const getFeatureForLayer = async (layer, pos) => {
  const props = layer.props as LayerProps;
  const minimalBoxSize = 1;
  const url = createUrl(
    props.url.replace("http", "https"),
    pos,
    minimalBoxSize,
    props.name,
  );

  const imgUrl =
    props.url +
    `&VERSION=1.1.1&REQUEST=GetFeatureInfo&BBOX=` +
    `${pos[0] - minimalBoxSize},` +
    `${pos[1] - minimalBoxSize},` +
    `${pos[0] + minimalBoxSize},` +
    `${pos[1] + minimalBoxSize}` +
    `&WIDTH=10&HEIGHT=10&SRS=EPSG:25832&FORMAT=image/png&TRANSPARENT=TRUE&BGCOLOR=0xF0F0F0&EXCEPTIONS=application/vnd.ogc.se_xml&FEATURE_COUNT=99&LAYERS=${props.name}&STYLES=default&QUERY_LAYERS=${props.name}&INFO_FORMAT=text/html&X=5&Y=5
            `;

  let output = "";

  let result = "";
  layer.other.keywords.forEach((keyword) => {
    const extracted = keyword.split("carmaconf://infoBoxMapping:")[1];
    result += extracted + "\n";
  });

  if (result) {
    await fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const content = xmlDoc.getElementsByTagName("gml:featureMember")[0];

        output = content?.outerHTML ? getLeafNodes(content) : "";
      });

    if (output) {
      const feature = result.includes("function")
        ? functionToFeature(output, result)
        : objectToFeature(output, result);

      return {
        properties: {
          ...feature.properties,
          genericLinks: [
            {
              url: imgUrl,
              tooltip: "Alte Sachdatenabfrage",
              iconname: "lupe",
            },
          ],
        },
        id: layer.id,
      };
    }
  }
};
