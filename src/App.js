import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  ScrollControls, 
  Scroll, 
  useScroll, 
  Stars, 
  PerspectiveCamera, 
  Float, 
  Environment,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';

// --- 3D SPACE COMPONENTS ---

const Satellite = ({ position, speed, scale }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh shadowBlur={2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0d9488" metalness={1} roughness={0.2} />
      </mesh>
      {/* Turquoise Solar Panels */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const InfrastructurePath = () => {
  const scroll = useScroll();
  const group = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 2, -10),
      new THREE.Vector3(-5, -2, -20),
      new THREE.Vector3(2, 4, -30),
      new THREE.Vector3(0, 0, -50),
    ]);
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.position.z = scroll.offset * 65;
      group.current.rotation.z = Math.sin(scroll.offset * Math.PI) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[curve, 100, 0.4, 16, false]} />
        {/* Teal Metallic Pipe with Turquoise Glow */}
        <meshStandardMaterial 
            color="#134e4a" 
            emissive="#14b8a6" 
            emissiveIntensity={1.5} 
            metalness={0.9} 
            roughness={0.1} 
        />
      </mesh>
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t, i) => {
        const pos = curve.getPoint(t);
        return (
          <mesh key={i} position={pos}>
            <torusGeometry args={[0.65, 0.1, 16, 32]} />
            <meshStandardMaterial color="#2dd4bf" metalness={1} emissive="#2dd4bf" emissiveIntensity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};

// --- WEB UI OVERLAY ---

const Overlay = () => {
  return (
    <Scroll html style={{ width: '100%' }}>
      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col justify-center px-10 md:px-24">
        <div className="max-w-5xl p-12 bg-teal-950/20 backdrop-blur-xl border border-teal-400/20 rounded-[50px] shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
             <div className="h-[2px] w-12 bg-teal-400"></div>
             <span className="text-teal-400 font-black tracking-[0.5em] uppercase text-xs">
                Class A Government Contractor
             </span>
          </div>
          <h1 className="text-8xl md:text-[12rem] font-black text-white leading-[0.8] uppercase italic tracking-tighter">
            ABBS<br/>
            <span className="text-teal-400 not-italic">INFRA</span>
          </h1>
          <p className="mt-10 text-teal-100/60 text-xl md:text-3xl font-medium max-w-2xl leading-tight">
            Spearheading Heavy Civil Engineering across <br/>
            <span className="text-white font-black italic">Kanyakumari & Tirunelveli.</span>
          </p>
        </div>
      </section>

      {/* SECTION 2: D&B DATA (Turquoise Glossy Cards) */}
      <section className="h-screen flex items-center px-10 md:px-24">
        <div className="grid md:grid-cols-2 gap-10 w-full">
          <div className="p-10 bg-white/5 backdrop-blur-3xl border border-teal-400/20 rounded-[40px] shadow-[0_20px_50px_rgba(20,184,166,0.1)] hover:border-teal-400/50 transition-all duration-700">
            <h2 className="text-teal-400 font-black uppercase text-xs tracking-widest mb-4">Core Specialization</h2>
            <p className="text-white text-3xl md:text-4xl font-bold uppercase italic leading-tight">
              Water and Sewer Line Structures Construction
            </p>
          </div>
          <div className="p-10 bg-teal-900/20 backdrop-blur-3xl border border-teal-400/30 rounded-[40px] shadow-2xl translate-y-16">
            <h2 className="text-teal-400 font-black uppercase text-xs tracking-widest mb-4">Verified Profile</h2>
            <p className="text-white text-3xl md:text-4xl font-bold uppercase leading-tight">
              Heavy & Civil Engineering Authority
            </p>
            <div className="mt-8 flex gap-4">
                <span className="bg-teal-500 px-4 py-1 rounded-full text-xs font-black text-teal-950 uppercase tracking-tighter">D&B Registered</span>
                <span className="bg-white/10 px-4 py-1 rounded-full text-xs font-bold text-white uppercase italic">Private Limited</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: REACH */}
      <section className="h-screen flex items-center justify-end px-10 md:px-24">
        <div className="max-w-2xl text-right p-12 bg-teal-950/40 backdrop-blur-md border-r-[12px] border-teal-500">
          <h2 className="text-7xl md:text-9xl font-black text-white uppercase italic leading-none">Global<br/>Scale</h2>
          <div className="mt-12 space-y-10">
            <div>
              <p className="text-8xl font-black text-teal-400 italic leading-none">150<span className="text-white tracking-tighter not-italic text-5xl">KM</span></p>
              <p className="text-teal-100/40 font-bold uppercase tracking-[0.3em] text-sm mt-2">Pipeline Infrastructure Developed</p>
            </div>
            <div>
              <p className="text-8xl font-black text-white italic leading-none">50<span className="text-teal-400 tracking-tighter not-italic text-5xl">+</span></p>
              <p className="text-teal-100/40 font-bold uppercase tracking-[0.3em] text-sm mt-2">Major Government Contracts Executed</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-10">
        <div className="p-16 md:p-24 bg-gradient-to-br from-teal-600 to-teal-900 rounded-[60px] shadow-[0_0_100px_rgba(20,184,166,0.2)] w-full max-w-6xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 text-[15rem] font-black uppercase italic pointer-events-none">ABBS</div>
          <h2 className="text-7xl md:text-[10rem] font-black text-white uppercase mb-12 italic leading-[0.8]">
            Laying the<br/>Future
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <button className="bg-teal-400 text-teal-950 py-6 rounded-2xl text-2xl font-black uppercase hover:scale-105 transition-transform">
              Nagercoil HQ
            </button>
            <button className="border-4 border-white text-white py-6 rounded-2xl text-2xl font-black uppercase hover:bg-white hover:text-teal-900 transition-all">
              Tirunelveli Br.
            </button>
          </div>
        </div>
        <p className="mt-20 text-teal-800 font-black uppercase tracking-[1.5em] text-[10px] md:text-xs">
          ABBS INFRASTRUCTURE PRIVATE LIMITED • TAMIL NADU
        </p>
      </section>
    </Scroll>
  );
};

// --- MAIN APP SCENE ---

export default function App() {
  return (
    <div className="bg-[#000d0c] h-screen w-full overflow-hidden font-sans">
      <Canvas shadows antialias="true">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={4} color="#2dd4bf" />
        <spotLight position={[-20, 20, 20]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />

        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.25}>
            
            {/* Cosmic Background */}
            <Stars radius={100} depth={50} count={9000} factor={6} saturation={1} fade speed={2.5} />
            <Sparkles count={300} scale={25} size={2.5} speed={0.6} color="#2dd4bf" />
            
            {/* Winding Teal Pipeline */}
            <InfrastructurePath />
            
            {/* Satellite Interactivity */}
            <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
                <Satellite position={[6, 5, -8]} speed={1} scale={0.5} />
            </Float>
            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
                <Satellite position={[-7, -4, -18]} speed={0.5} scale={0.9} />
            </Float>
            
            <Environment preset="night" />

            <Overlay />
            
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}