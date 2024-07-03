import { LightingModel } from 'cesium';

export enum CustomShaderKeys {
  CLAY = 'CLAY',
  UNLIT = 'UNLIT',
  UNLIT_BASE = 'UNLIT_BASE',
  UNDEFINED = 'UNDEFINED',
}

export const CUSTOM_SHADERS_DEFINITIONS = {
  [CustomShaderKeys.CLAY]: {
    fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        material.diffuse = vec3(1.0, 1.0, 0.8); // egg or clay
        material.roughness = 0.5;   
    }
  `,
  },
  [CustomShaderKeys.UNLIT]: {
    lightingModel: LightingModel.UNLIT,
    fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
    {
        // This is tuned for a specific tileset texture, not generic
        // Apply gamma correction
        vec3 gammaCorrection = vec3(1.0,1.0,1.25); // reduce blue somewhat
        
        // Apply black point correction
        float blackPoint = 0.02; // stretch to black
        float whitePoint = 0.75; // stretch to white
         
        vec3 color = (material.diffuse - vec3(blackPoint)) / (vec3(whitePoint) - vec3(blackPoint));
        color = clamp(color, 0.0, 1.0); // Ensure values are in [0,1] range
    
        // Apply gamma correction after point adjustments
        material.diffuse = pow(color, gammaCorrection);
    }
    `,
  },
  [CustomShaderKeys.UNLIT_BASE]: {
    lightingModel: LightingModel.UNLIT,
  },
};
