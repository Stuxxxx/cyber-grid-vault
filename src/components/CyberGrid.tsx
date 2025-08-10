import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, LineSegments, Vector3 } from 'three';
import * as THREE from 'three';

extend({ LineSegments, LineBasicMaterial, BufferGeometry });

const CyberGridLines = () => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    const gridSize = 50;
    const gridSpacing = 2;
    
    // Create grid lines
    for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
      // Horizontal lines
      positions.push(-gridSize, 0, i, gridSize, 0, i);
      // Vertical lines  
      positions.push(i, 0, -gridSize, i, 0, gridSize);
      
      // Add colors (green cyber theme)
      for (let j = 0; j < 4; j++) {
        colors.push(0, 1, 0.53); // RGB for #00ff88
      }
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
      linesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <lineSegments ref={linesRef} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  );
};

const FloatingNodes = () => {
  const nodesRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 50; i++) {
      nodePositions.push({
        position: [
          (Math.random() - 0.5) * 100,
          Math.random() * 20 - 10,
          (Math.random() - 0.5) * 100
        ],
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return nodePositions;
  }, []);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, index) => {
        if (child) {
          child.position.y += Math.sin(state.clock.elapsedTime * nodes[index].speed) * 0.01;
          child.rotation.y += nodes[index].speed;
        }
      });
    }
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
      ))}
    </group>
  );
};

const CyberParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = Math.random() * 100 - 50;
      positions[i + 2] = (Math.random() - 0.5) * 200;
      
      colors[i] = 0;
      colors[i + 1] = Math.random() * 0.5 + 0.5;
      colors[i + 2] = Math.random() * 0.5 + 0.3;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      const time = state.clock.elapsedTime;
      
      const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positionArray.length; i += 3) {
        positionArray[i + 1] += Math.sin(time + positionArray[i] * 0.01) * 0.02;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors transparent opacity={0.6} />
    </points>
  );
};

export const CyberGrid = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ccff" />
        
        <CyberGridLines />
        <FloatingNodes />
        <CyberParticles />
      </Canvas>
    </div>
  );
};