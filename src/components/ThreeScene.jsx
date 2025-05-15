import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function RotatingCubeOnly() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = 400;
        const height = 300;

        // Créer scène vide
        const scene = new THREE.Scene();

        // Créer caméra
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // Créer renderer et l’attacher
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Créer un seul cube (rien d’autre)
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation : faire tourner le cube
        let frameId;
        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Nettoyage au démontage
        return () => {
            cancelAnimationFrame(frameId);
            if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: '400px',
                height: '300px',
                border: '1px solid #ccc',
                margin: '20px auto',
                backgroundColor: '#eee',
            }}
        />
    );
}
