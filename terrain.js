// ===== THREE.JS ANIMATED TERRAIN =====
// Wireframe terrain that syncs with terminal theme

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('terrain'), 
  alpha: true, 
  antialias: true 
});

renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 12, 25);

const geometry = new THREE.PlaneGeometry(200, 200, 200, 200);
let material = new THREE.MeshBasicMaterial({ 
  color: 0xff8a2b, 
  wireframe: true, 
  transparent: true, 
  opacity: 0.06 
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2.7;
scene.add(plane);

// Theme color mapping
function getTerrainColor(theme) {
  const colors = {
    amber: 0xff8a2b,
    green: 0x00ff00,
    white: 0xffffff,
    blue: 0x00aaff,
    magenta: 0xff1a7a
  };
  
  // Handle hex colors
  if (typeof theme === 'string' && theme.startsWith('#')) {
    const r = parseInt(theme.slice(1,3), 16);
    const g = parseInt(theme.slice(3,5), 16);
    const b = parseInt(theme.slice(5,7), 16);
    return (r << 16) | (g << 8) | b;
  }
  
  return colors[theme] || colors.amber;
}

// Update terrain color function
window.updateTerrainColor = function(theme) {
  const color = getTerrainColor(theme);
  scene.remove(plane);
  material = new THREE.MeshBasicMaterial({ 
    color: color, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.06 
  });
  plane.material = material;
  scene.add(plane);
};

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  const t = Date.now() * 0.0003;
  
  // Camera bobbing
  camera.position.y = 12 + Math.sin(t * 0.5) * 1.2;
  
  // Terrain wave animation
  const pos = plane.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, Math.sin(x * 0.2 + t) * 0.4 + Math.cos(y * 0.25 + t) * 0.4);
  }
  pos.needsUpdate = true;
  
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize with current theme
const currentTheme = localStorage.getItem('terminal-theme') || 'amber';
if (currentTheme !== 'amber') {
  window.updateTerrainColor(currentTheme);
}