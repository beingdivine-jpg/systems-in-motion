import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createInkPass } from "./ink-pass";

export interface CuriosityScene {
  setRunning: (running: boolean) => void;
  dispose: () => void;
}

type Point = [number, number, number];

/** Small, independently modelled objects lit by a shared photographic studio. */
export function createCuriosityScene(canvas: HTMLCanvasElement): CuriosityScene {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const inkPass = createInkPass(renderer);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-500, 500, 500, -500, 1, 3000);
  camera.position.z = 1200;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.05);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.1;
  room.dispose();
  pmrem.dispose();

  const key = new THREE.DirectionalLight(0xfff6e8, 2.4);
  key.position.set(-300, 500, 600);
  const rim = new THREE.DirectionalLight(0xd9e5f5, 2);
  rim.position.set(400, 80, -200);
  scene.add(key, rim, new THREE.HemisphereLight(0xfaf8f2, 0x7c8995, 1.4));

  const materials = {
    titanium: new THREE.MeshStandardMaterial({ color: 0xaab5c0, metalness: 0.9, roughness: 0.25 }),
    silver: new THREE.MeshStandardMaterial({ color: 0xe0e3e1, metalness: 0.95, roughness: 0.17 }),
    porcelain: new THREE.MeshPhysicalMaterial({ color: 0xd6d4ce, metalness: 0.12, roughness: 0.32, clearcoat: 0.7 }),
    ink: new THREE.MeshPhysicalMaterial({ color: 0x24354a, metalness: 0.6, roughness: 0.27, clearcoat: 0.85 }),
    sage: new THREE.MeshStandardMaterial({ color: 0x718d84, metalness: 0.6, roughness: 0.29 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0x998674, metalness: 0.88, roughness: 0.28 }),
    lens: new THREE.MeshPhysicalMaterial({ color: 0x263b43, metalness: 0.45, roughness: 0.1, clearcoat: 1 }),
    crystal: new THREE.MeshPhysicalMaterial({ color: 0x9eafb2, metalness: 0.38, roughness: 0.16, clearcoat: 1, flatShading: true }),
  };
  type Material = THREE.Material;
  const sphere = new THREE.SphereGeometry(1, 24, 16);
  const unitCylinder = new THREE.CylinderGeometry(1, 1, 1, 20);
  const mesh = (group: THREE.Group, geometry: THREE.BufferGeometry, material: Material, at: Point = [0, 0, 0]) => {
    const item = new THREE.Mesh(geometry, material);
    item.position.set(...at);
    group.add(item);
    return item;
  };
  const ball = (group: THREE.Group, radius: number, material: Material, at: Point = [0, 0, 0]) => {
    const item = mesh(group, sphere, material, at);
    item.scale.setScalar(radius);
    return item;
  };
  const box = (group: THREE.Group, size: Point, material: Material, at: Point = [0, 0, 0], bevel = 0.04) =>
    mesh(group, new RoundedBoxGeometry(...size, 3, bevel), material, at);
  const rod = (group: THREE.Group, start: Point, end: Point, radius: number, material: Material) => {
    const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end);
    const delta = b.clone().sub(a);
    const item = mesh(group, unitCylinder, material);
    item.position.copy(a.add(b).multiplyScalar(0.5));
    item.scale.set(radius, delta.length(), radius);
    item.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
    return item;
  };
  const ring = (group: THREE.Group, radius: number, tube: number, material: Material, at: Point = [0, 0, 0]) =>
    mesh(group, new THREE.TorusGeometry(radius, tube, 12, 64), material, at);

  const chip = new THREE.Group();
  chip.name = "AI processor";
  box(chip, [1.2, 1.2, 0.16], materials.ink);
  box(chip, [0.92, 0.92, 0.08], materials.bronze, [0, 0, 0.11]);
  box(chip, [0.8, 0.8, 0.1], materials.titanium, [0, 0, 0.18]);
  box(chip, [0.64, 0.64, 0.025], materials.ink, [0, 0, 0.245], 0.01);
  for (let i = -3; i <= 3; i++) {
    for (const side of [-1, 1]) {
      box(chip, [0.085, 0.21, 0.06], materials.silver, [i * 0.145, side * 0.68, 0], 0.018);
      box(chip, [0.21, 0.085, 0.06], materials.silver, [side * 0.68, i * 0.145, 0], 0.018);
    }
  }
  for (let i = -1; i <= 1; i++) {
    box(chip, [0.12, 0.12, 0.016], materials.sage, [i * 0.18, 0.12, 0.266], 0.012);
    box(chip, [0.12, 0.12, 0.016], materials.titanium, [i * 0.18, -0.12, 0.266], 0.012);
  }
  ball(chip, 0.027, materials.porcelain, [-0.48, 0.47, 0.092]);

  const arm = new THREE.Group();
  arm.name = "Articulated robotics";
  mesh(arm, new THREE.CylinderGeometry(0.34, 0.4, 0.17, 40), materials.titanium, [0, -0.69, 0]);
  mesh(arm, new THREE.CylinderGeometry(0.24, 0.3, 0.12, 32), materials.ink, [0, -0.55, 0]);
  const joint = (at: Point, radius: number) => {
    const cylinder = mesh(arm, new THREE.CylinderGeometry(radius, radius, 0.28, 32), materials.porcelain, at);
    cylinder.rotation.x = Math.PI / 2;
    ring(arm, radius * 0.63, 0.025, materials.titanium, [at[0], at[1], at[2] + 0.15]);
    ball(arm, radius * 0.33, materials.ink, [at[0], at[1], at[2] + 0.14]);
  };
  joint([0, -0.42, 0], 0.2);
  rod(arm, [0, -0.42, 0], [-0.33, 0.14, 0], 0.115, materials.porcelain);
  rod(arm, [0.06, -0.39, 0.12], [-0.25, 0.1, 0.12], 0.035, materials.titanium);
  joint([-0.33, 0.14, 0], 0.17);
  rod(arm, [-0.33, 0.14, 0], [0.27, 0.52, 0], 0.085, materials.porcelain);
  rod(arm, [-0.26, 0.2, 0.1], [0.23, 0.5, 0.1], 0.022, materials.bronze);
  joint([0.27, 0.52, 0], 0.105);
  rod(arm, [0.32, 0.55, 0], [0.51, 0.49, 0], 0.07, materials.titanium);
  const grip = new THREE.Group();
  grip.position.set(0.52, 0.48, 0);
  grip.rotation.z = -0.5;
  arm.add(grip);
  box(grip, [0.14, 0.33, 0.2], materials.ink);
  for (const side of [-1, 1]) {
    box(grip, [0.28, 0.065, 0.105], materials.titanium, [0.15, side * 0.16, 0], 0.02);
    box(grip, [0.07, 0.13, 0.1], materials.ink, [0.28, side * 0.12, 0], 0.015);
  }

  const gyro = new THREE.Group();
  gyro.name = "Gyroscopic navigation";
  const gyroRings = [0.72, 0.55, 0.38].map((r, i) => {
    const item = ring(gyro, r, i === 0 ? 0.047 : 0.036, i === 1 ? materials.bronze : materials.silver);
    item.rotation.set(i * 0.6 + 0.3, i * 0.8, i * 0.4);
    return item;
  });
  ball(gyro, 0.2, materials.ink);
  ball(gyro, 0.07, materials.sage, [0.72, 0, 0]);

  const neural = new THREE.Group();
  neural.name = "Neural architecture";
  const nodes: Point[] = [[0, 0, 0], [-0.48, 0.34, 0.12], [0.38, 0.45, -0.18], [0.58, -0.1, 0.16],
    [-0.37, -0.42, -0.16], [0.12, -0.52, 0.23], [-0.1, 0.1, 0.55], [0.12, 0.18, -0.5]];
  nodes.forEach((at, i) => ball(neural, i === 0 ? 0.2 : 0.105, i % 3 === 0 ? materials.ink : materials.silver, at));
  nodes.slice(1).forEach(at => rod(neural, nodes[0], at, 0.022, materials.titanium));
  [[1, 2], [2, 3], [3, 5], [5, 4], [4, 1], [1, 6], [3, 6], [2, 7], [4, 7]].forEach(([a, b]) =>
    rod(neural, nodes[a], nodes[b], 0.015, materials.bronze));

  const crystal = new THREE.Group();
  crystal.name = "Faceted intelligence";
  const gem = mesh(crystal, new THREE.OctahedronGeometry(0.73), materials.crystal);
  gem.scale.y = 1.3;
  const gemRing = ring(crystal, 0.56, 0.025, materials.silver);
  gemRing.rotation.x = Math.PI / 2;

  const knot = new THREE.Group();
  knot.name = "Continuous learning";
  mesh(knot, new THREE.TorusKnotGeometry(0.43, 0.14, 128, 16, 2, 3), materials.titanium);

  const core = new THREE.Group();
  core.name = "Layered computing";
  [materials.porcelain, materials.ink, materials.sage].forEach((material, i) => {
    box(core, [0.98, 0.15, 0.78], material, [0, (i - 1) * 0.29, 0], 0.065);
    box(core, [0.68, 0.024, 0.48], materials.titanium, [0, (i - 1) * 0.29 + 0.085, 0], 0.012);
    for (let j = -2; j <= 2; j++) {
      ball(core, 0.019, materials.bronze, [j * 0.14, (i - 1) * 0.29, 0.39]);
    }
  });
  for (const x of [-0.36, 0.36]) for (const z of [-0.25, 0.25]) {
    rod(core, [x, -0.26, z], [x, 0.26, z], 0.026, materials.bronze);
  }

  const optic = new THREE.Group();
  optic.name = "Machine vision";
  const housing = mesh(optic, new THREE.CylinderGeometry(0.53, 0.48, 0.36, 48), materials.porcelain);
  housing.rotation.x = Math.PI / 2;
  ring(optic, 0.43, 0.07, materials.titanium, [0, 0, 0.2]);
  ring(optic, 0.33, 0.048, materials.ink, [0, 0, 0.25]);
  const lens = ball(optic, 0.3, materials.lens, [0, 0, 0.23]);
  lens.scale.z = 0.1;
  ring(optic, 0.24, 0.015, materials.bronze, [0, 0, 0.29]);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    ball(optic, 0.024, materials.ink, [Math.cos(a) * 0.46, Math.sin(a) * 0.46, 0.22]);
  }

  const models = [chip, arm, gyro, neural, crystal, knot, core, optic];
  const sizes = [65, 73, 62, 65, 46, 54, 68, 59];
  // A shared orbital speed preserves spacing while each object turns independently.
  const phases = [-0.8, 0, 0.8, 3.15, 2.4, 3.95, 1.6, 4.75];
  const rotations = [
    new THREE.Euler(0.32, -0.45, -0.28), new THREE.Euler(0.16, -0.35, -0.16),
    new THREE.Euler(0.45, 0.3, 0.2), new THREE.Euler(0.3, 0.35, -0.15),
    new THREE.Euler(0.1, 0.3, 0.3), new THREE.Euler(0.4, -0.2, -0.2),
    new THREE.Euler(0.6, -0.5, -0.22), new THREE.Euler(0.3, -0.4, 0.2),
  ];
  models.forEach(model => scene.add(model));

  let height = 1000;
  let compact = false;
  let elapsed = 0;
  let lastTime = 0;
  let lastPaint = 0;
  let frame = 0;
  let running = false;
  let disposed = false;
  let contextLost = false;

  const paint = () => {
    models.forEach((model, i) => {
      model.visible = !compact || i === 0 || i === 1 || i === 2 || i === 3;
      const angle = phases[i] + elapsed * 0.035;
      const x = 0.5 + (0.385 + Math.sin(elapsed * 0.12 + i) * 0.014) * Math.cos(angle);
      const y = 0.47 + (0.35 + Math.cos(elapsed * 0.1 + i) * 0.012) * Math.sin(angle);
      const depth = Math.sin(angle + i * 0.7);
      model.position.set((x - 0.5) * 1000, (0.5 - y) * height, depth * 90);
      model.scale.setScalar(sizes[i] * (0.89 + depth * 0.11));
      model.rotation.set(
        rotations[i].x + Math.sin(elapsed * 0.2 + i) * 0.2,
        rotations[i].y + (i === 2 || i === 3 || i === 5 ? elapsed * 0.13 : Math.sin(elapsed * 0.19 + i) * 0.58),
        rotations[i].z + Math.sin(elapsed * 0.13 + i) * 0.12,
      );
    });
    gyroRings.forEach((item, i) => { item.rotation.y = i * 0.8 + elapsed * (i % 2 ? -0.28 : 0.22); });
    grip.rotation.z = -0.5 + Math.sin(elapsed * 0.4) * 0.12;
    inkPass.render(scene, camera);
  };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height || disposed || contextLost) return;
    compact = window.innerWidth < 640;
    height = 1000 * bounds.height / bounds.width;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(bounds.width, bounds.height, false);
    inkPass.resize();
    paint();
  };
  const tick = (time: number) => {
    if (!running || disposed || contextLost) return;
    if (time - lastPaint >= 1000 / 30) {
      elapsed += lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
      lastTime = lastPaint = time;
      paint();
    }
    frame = requestAnimationFrame(tick);
  };
  const setRunning = (next: boolean) => {
    if (disposed || running === next) return;
    running = next;
    cancelAnimationFrame(frame);
    lastTime = lastPaint = 0;
    canvas.dataset.running = String(next);
    if (next && !contextLost) frame = requestAnimationFrame(tick);
  };
  const onLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    canvas.dataset.ready = "false";
  };
  const onRestored = () => {
    contextLost = false;
    resize();
    canvas.dataset.ready = "true";
    lastTime = lastPaint = 0;
    if (running) frame = requestAnimationFrame(tick);
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  canvas.dataset.ready = "true";
  canvas.dataset.objects = String(models.length);

  return {
    setRunning,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      const geometries = new Set<THREE.BufferGeometry>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) geometries.add(object.geometry); });
      geometries.forEach(geometry => geometry.dispose());
      Object.values(materials).forEach(material => material.dispose());
      environment.dispose();
      inkPass.dispose();
      renderer.dispose();
    },
  };
}
