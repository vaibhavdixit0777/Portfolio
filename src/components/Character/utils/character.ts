import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedModel = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        loader.parse(
          encryptedModel,
          "/models/",
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
                
                if (mesh.material) {
                  const mat = mesh.material as THREE.MeshStandardMaterial;
                  const matName = mat.name ? mat.name.toLowerCase() : "";
                  const meshName = mesh.name ? mesh.name.toLowerCase() : "";
                  
                  // If it's a skin/body part, set the skin color
                  if (matName.includes("skin") || matName.includes("body") || matName.includes("head") || matName.includes("face") || 
                      meshName.includes("skin") || meshName.includes("body") || meshName.includes("head") || meshName.includes("face")) {
                      
                      // Clone material so we don't accidentally color shared materials incorrectly
                      mesh.material = mat.clone();
                      (mesh.material as THREE.MeshStandardMaterial).color.setHex(0xffccb4); // Natural warm skin tone
                  }
                  
                  // You can also add clothing color here if needed
                  if (matName.includes("shirt") || matName.includes("cloth") || meshName.includes("shirt") || meshName.includes("cloth")) {
                      mesh.material = mat.clone();
                      (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x222222); // Dark Cyberpunk shirt
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
