import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Pong3D() {
    const mountRef = useRef(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        let frameId;

        const init = () => {
            if (!mountRef.current) return;

            const width = 500;
            const height = 400;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 10;

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            mountRef.current.appendChild(renderer.domElement);

            // Palette
            const paddleGeometry = new THREE.BoxGeometry(2, 0.5, 0.5);
            const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
            paddle.position.y = -4;
            scene.add(paddle);

            // Balle
            const ballGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            scene.add(ball);

            // Mouvement balle
            let ballVelocity = { x: 0.05, y: 0.07 };

            // Contrôles clavier
            const keys = {};
            const onKeyDown = (e) => (keys[e.key] = true);
            const onKeyUp = (e) => (keys[e.key] = false);
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);

            // Animation
            const animate = () => {
                // Déplacement de la palette
                if (keys['ArrowLeft'] && paddle.position.x > -5) {
                    paddle.position.x -= 0.2;
                }
                if (keys['ArrowRight'] && paddle.position.x < 5) {
                    paddle.position.x += 0.2;
                }

                // Déplacement de la balle
                ball.position.x += ballVelocity.x;
                ball.position.y += ballVelocity.y;

                // Rebond sur murs
                if (ball.position.x >= 6 || ball.position.x <= -6) ballVelocity.x *= -1;
                if (ball.position.y >= 5) ballVelocity.y *= -1;

                // Collision avec la palette
                if (
                    ball.position.y <= paddle.position.y + 0.25 &&
                    ball.position.y >= paddle.position.y - 0.25 &&
                    Math.abs(ball.position.x - paddle.position.x) < 1.25
                ) {
                    ballVelocity.y *= -1;
                    setScore((prev) => prev + 1);
                }

                // Game over
                if (ball.position.y < -5) {
                    alert(`Perdu ! Score final : ${score}`);
                    ball.position.set(0, 0, 0);
                    setScore(0);
                    ballVelocity = { x: 0.05, y: 0.07 };
                }

                renderer.render(scene, camera);
                frameId = requestAnimationFrame(animate);
            };

            animate();

            // Cleanup
            return () => {
                cancelAnimationFrame(frameId);
                window.removeEventListener('keydown', onKeyDown);
                window.removeEventListener('keyup', onKeyUp);
                if (mountRef.current?.contains(renderer.domElement)) {
                    mountRef.current.removeChild(renderer.domElement);
                }
            };
        };

        // Lance au frame suivant pour être sûr que mountRef est prêt
        frameId = requestAnimationFrame(init);

        return () => cancelAnimationFrame(frameId);
    }, [score]);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Score : {score}</h2>
            <div
                ref={mountRef}
                style={{
                    width: '500px',
                    height: '400px',
                    margin: 'auto',
                    background: '#111',
                }}
            />
        </div>
    );
}
