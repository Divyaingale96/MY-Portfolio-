// --- NEURAL CORE DASHBOARD ENGINE (Standard Script Edition) ---

// 1. BOOTLOADER SEQUENCE
const bootText = document.getElementById('boot-text');
const lines = [
    "> INITIALIZING AI CORE...",
    "> LOADING NEURAL NETWORK...",
    "> CHECKING SYSTEM STATUS: OPTIMAL",
    "> CONNECTING TO PORTFOLIO_DB...",
    "> DEPLOYING BENTO INTERFACE...",
    "> ACCESS GRANTED: DIVYA_INGALE"
];

let lineIdx = 0;
function playBoot() {
    if (lineIdx < lines.length) {
        bootText.innerHTML += lines[lineIdx] + "<br>";
        lineIdx++;
        setTimeout(playBoot, 150);
    } else {
        setTimeout(() => {
            const loader = document.getElementById('boot-loader');
            if (loader) {
                loader.style.transition = 'opacity 0.8s ease';
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    initReveal();
                }, 800);
            }
        }, 500);
    }
}
playBoot();

// 2. THREE.JS NEURAL CORE (Wrapped to prevent blocking if library fails)
function init3D() {
    try {
        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded');
            return;
        }
        
        const container = document.getElementById('canvas-3d');
        if (!container) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create Particle Sphere
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 3000; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;
            const d = Math.sqrt(x*x + y*y + z*z);
            vertices.push((x/d) * 1.5, (y/d) * 1.5, (z/d) * 1.5);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({ 
            color: 0x99ff00, 
            size: 0.02,
            transparent: true,
            opacity: 0.8
        });
        
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        camera.position.z = 3;

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.y += 0.005;
            points.rotation.x += 0.002;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    } catch (e) {
        console.warn('3D Engine Initialization failed:', e);
    }
}

// 3. BENTO REVEAL
function initReveal() {
    const tiles = document.querySelectorAll('.reveal');
    tiles.forEach((tile, idx) => {
        setTimeout(() => {
            tile.classList.add('active');
        }, idx * 100);
    });
    // Start 3D after reveal
    init3D();
}

// 4. SYSTEM SHELL LOGIC
const shellOutput = document.getElementById('shell-output');
const shellInput = document.getElementById('shell-input');

const botData = {
    help: "AVAILABLE COMMANDS: 'skills', 'projects', 'exp', 'contact', 'social', 'clear'",
    skills: "STACK: Python, C++, Oracle, Power BI, ML, Prompt Engineering.",
    projects: "SYSTEMS: [1] Time Table Gen [2] Sanjeevani AI [3] Social Media Analyzer [4] Voice OS",
    exp: "HISTORY: IBM Intern, PHN Robotics, Nandi Foundation Data Science.",
    contact: "COORD: divya.ingale96@gmail.com | +91 8261080295",
    social: "UPLINKS: GitHub: github.com/Divyaingale96 | LinkedIn: linkedin.com/in/divya-ingale-9927a1282/",
    clear: ""
};

if (shellInput) {
    shellInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = shellInput.value.trim().toLowerCase();
            shellOutput.innerHTML += `<div><span style="color:#99ff00">></span> ${cmd}</div>`;
            
            if (cmd === 'clear') {
                shellOutput.innerHTML = '<div>SYSTEM SHELL v2.0 // TYPE "HELP"</div>';
            } else if (botData[cmd]) {
                shellOutput.innerHTML += `<div style="color:#00f3ff; margin-bottom:0.5rem;">${botData[cmd]}</div>`;
            } else {
                shellOutput.innerHTML += `<div style="color:#ff3333">ERROR: COMMAND NOT FOUND</div>`;
            }
            
            shellInput.value = '';
            shellOutput.scrollTop = shellOutput.scrollHeight;
        }
    });
}
