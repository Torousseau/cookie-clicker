import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Pong3D() {
    const mountRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (gameOver) return;

        let frameId;

        const width = 500;
        const height = 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffec75, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffec75, 2);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        const paddleGeometry = new THREE.BoxGeometry(2, 0.5, 0.5);
        const paddleMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.4, roughness: 0.3 });
        const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
        paddle.position.y = -4;
        scene.add(paddle);

        const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff3333, metalness: 0.6, roughness: 0.2 });
        const ball = new THREE.Mesh(ballGeometry, ballMaterial);
        scene.add(ball);

        let ballVelocity = { x: 0.05, y: 0.07 };

        const keys = {};
        const handleKeyDown = (e) => (keys[e.key] = true);
        const handleKeyUp = (e) => (keys[e.key] = false);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const checkCollisions = () => {
            if (ball.position.x >= 6 || ball.position.x <= -6) ballVelocity.x *= -1;
            if (ball.position.y >= 5) ballVelocity.y *= -1;

            const hitVertical = Math.abs(ball.position.y - paddle.position.y) < 0.4;
            const hitHorizontal = Math.abs(ball.position.x - paddle.position.x) < 1.25;
            if (hitVertical && hitHorizontal && ballVelocity.y < 0) {
                ballVelocity.y *= -1;
                setScore((prev) => prev + 1);
            }

            if (ball.position.y < -5) {
                setGameOver(true);
            }
        };

        const animate = () => {
            if (!mountRef.current || gameOver) return;

            if (keys['ArrowLeft'] && paddle.position.x > -5) paddle.position.x -= 0.2;
            if (keys['ArrowRight'] && paddle.position.x < 5) paddle.position.x += 0.2;

            ball.position.x += ballVelocity.x;
            ball.position.y += ballVelocity.y;

            checkCollisions();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [gameOver]);

    const handleRestart = () => {
        setScore(0);
        setGameOver(false);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Score: {score}</h2>
            <div
                ref={mountRef}
                style={{
                    width: '500px',
                    height: '400px',
                    margin: 'auto',
                    background: '#111',
                }}
            />
            {gameOver && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <p style={{ color: 'red' }}>Game Over! Final Score: {score}</p>
                    <button onClick={handleRestart}>Restart</button>
                </div>
            )}
        </div>
    );
}
