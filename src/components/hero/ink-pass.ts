import * as THREE from "three";

/** Convert illuminated 3D surfaces to the portrait's transparent, monochrome ink dots. */
export function createInkPass(renderer: THREE.WebGLRenderer) {
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: renderer.extensions.has("EXT_color_buffer_float") ? THREE.HalfFloatType : THREE.UnsignedByteType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
  });
  const resolution = new THREE.Vector2();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      surface: { value: target.texture },
      resolution: { value: resolution },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    vertexShader: `
      varying vec2 inkUv;
      void main() {
        inkUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D surface;
      uniform vec2 resolution;
      varying vec2 inkUv;

      float random(vec2 p) {
        vec3 q = fract(vec3(p.xyx) * 0.1031);
        q += dot(q, q.yzx + 33.33);
        return fract((q.x + q.y) * q.z);
      }

      void main() {
        vec2 cell = floor(inkUv * resolution);
        vec4 sampleInk = texture2D(surface, inkUv);
        if (sampleInk.a < 0.01) discard;

        // Compress studio-light highlights before turning tone into dot density.
        vec3 lit = max(sampleInk.rgb * 0.8, 0.0);
        vec3 mapped = clamp((lit * (2.51 * lit + 0.03)) / (lit * (2.43 * lit + 0.59) + 0.14), 0.0, 1.0);
        float brightness = dot(pow(mapped, vec3(1.0 / 2.2)), vec3(0.2126, 0.7152, 0.0722));
        float density = clamp((1.0 - brightness) * 1.25 + 0.04, 0.035, 0.92);
        float dotAlpha = step(random(cell + 31.2), density);
        gl_FragColor = vec4(0.055, 0.065, 0.080, sampleInk.a * dotAlpha);
      }
    `,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geometry, material));
  const camera = new THREE.Camera();

  return {
    resize: () => {
      renderer.getDrawingBufferSize(resolution);
      target.setSize(resolution.x, resolution.y);
    },
    render: (objects: THREE.Scene, objectCamera: THREE.Camera) => {
      renderer.setRenderTarget(target);
      renderer.render(objects, objectCamera);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    },
    dispose: () => {
      target.dispose();
      geometry.dispose();
      material.dispose();
    },
  };
}
