import React, { useEffect, useRef, useState } from 'react';

const SKILLS = [
  { name: 'Machine Learning', category: 'ML' },
  { name: 'Deep Learning', category: 'ML' },
  { name: 'Neural Networks', category: 'ML' },
  { name: 'Scikit-learn', category: 'ML' },
  { name: 'Time Series', category: 'ML' },
  { name: 'Reinforcement Learning', category: 'ML' },
  { name: 'Generative AI', category: 'GenAI' },
  { name: 'LLMs', category: 'GenAI' },
  { name: 'Prompt Engineering', category: 'GenAI' },
  { name: 'LangChain', category: 'GenAI' },
  { name: 'RAG', category: 'GenAI' },
  { name: 'Vector Databases', category: 'GenAI' },
  { name: 'Semantic Kernel', category: 'GenAI' },
  { name: 'AWS Lambda', category: 'Cloud' },
  { name: 'AWS SageMaker', category: 'Cloud' },
  { name: 'DynamoDB', category: 'Cloud' },
  { name: 'Cognito', category: 'Cloud' },
  { name: 'CloudFront / S3', category: 'Cloud' },
  { name: 'AWS CDK', category: 'Cloud' },
  { name: 'Azure AI Foundry', category: 'Cloud' },
  { name: 'Python', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'R', category: 'Languages' },
  { name: 'Node.js', category: 'Languages' },
  { name: 'TensorFlow', category: 'Data' },
  { name: 'PyTorch', category: 'Data' },
  { name: 'Pandas', category: 'Data' },
  { name: 'NumPy', category: 'Data' },
  { name: 'Matplotlib / Seaborn', category: 'Data' },
  { name: 'Spark / Hive', category: 'Data' },
  { name: 'Docker', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  { name: 'Ray RLlib', category: 'Tools' },
  { name: 'Optuna', category: 'Tools' },
  { name: 'Weights & Biases', category: 'Tools' },
  { name: 'Streamlit', category: 'Tools' },
  { name: 'FastAPI', category: 'Tools' },
];

const CATEGORY_COLORS: Record<string, string> = {
  ML: '#7c6fcd',
  GenAI: '#3ecfb2',
  Cloud: '#60a5fa',
  Languages: '#fbbf24',
  Data: '#f97316',
  Tools: '#ec4899',
};

const CATEGORIES = Object.keys(CATEGORY_COLORS);

export default function Skills() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !(window as any).THREE) return;
    const THREE = (window as any).THREE;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const wireGeo = new THREE.SphereGeometry(2, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x7c6fcd, wireframe: true, transparent: true, opacity: 0.15 });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireSphere);

    const skillPoints: any[] = [];
    const n = SKILLS.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    SKILLS.forEach((skill, i) => {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / n);
      const x = Math.sin(phi) * Math.cos(theta) * 2;
      const y = Math.cos(phi) * 2;
      const z = Math.sin(phi) * Math.sin(theta) * 2;

      const color = CATEGORY_COLORS[skill.category] || '#ffffff';
      const geo = new THREE.SphereGeometry(0.05, 8, 8);
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.9 });
      const point = new THREE.Mesh(geo, mat);
      point.position.set(x, y, z);
      point.userData = { skill, origScale: 1 };
      scene.add(point);
      skillPoints.push(point);
    });

    sceneRef.current = { scene, skillPoints };

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0, rotY = 0;
    let autoRotate = true;

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; autoRotate = false; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (autoRotate) rotY += 0.003;
      wireSphere.rotation.y = rotY;
      wireSphere.rotation.x = rotX;
      skillPoints.forEach(p => {
        p.rotation.y = rotY;
        p.rotation.x = rotX;
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { skillPoints } = sceneRef.current;
    const THREE = (window as any).THREE;
    if (!THREE) return;
    skillPoints.forEach((p: any) => {
      const skill = p.userData.skill;
      const color = CATEGORY_COLORS[skill.category] || '#ffffff';
      if (!activeCategory || skill.category === activeCategory) {
        p.material.opacity = 0.9;
        p.material.color.set(new THREE.Color(color));
        p.scale.setScalar(1);
      } else {
        p.material.opacity = 0.1;
        p.scale.setScalar(0.5);
      }
    });
  }, [activeCategory]);

  return (
    <section id="skills" className="min-h-screen w-full py-24 px-6 md:px-12 bg-bg-tertiary relative flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center">
          <p className="text-overline mb-3">// SECTION_04</p>
          <h2 className="text-section text-text-primary">TECHNICAL ARSENAL</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={mountRef}
            className="h-[400px] lg:h-[500px] cursor-grab active:cursor-grabbing"
            style={{ userSelect: 'none' }}
          />

          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-all duration-200 ${
                  !activeCategory ? 'border-accent-teal text-accent-teal bg-accent-glow' : 'border-border-dim text-text-muted hover:border-border-accent'
                }`}
              >
                ALL
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-all duration-200 ${
                    activeCategory === cat ? 'border-current text-current' : 'border-border-dim text-text-muted hover:border-border-accent'
                  }`}
                  style={activeCategory === cat ? { color: CATEGORY_COLORS[cat], borderColor: CATEGORY_COLORS[cat] } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {SKILLS.filter(s => !activeCategory || s.category === activeCategory).map(skill => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 font-mono text-xs border transition-all duration-200 cursor-default"
                  style={{
                    borderColor: CATEGORY_COLORS[skill.category] + '40',
                    color: CATEGORY_COLORS[skill.category],
                    backgroundColor: CATEGORY_COLORS[skill.category] + '10',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill.name}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border-dim grid grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <div key={cat} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{cat}</span>
                  <span className="font-mono text-[10px] text-text-muted ml-auto">
                    {SKILLS.filter(s => s.category === cat).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
