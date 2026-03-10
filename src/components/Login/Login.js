// src/components/Login/Login.js
import React, { useState } from 'react';
import { TEAMS } from '../../data/mockData';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();

        // Find the team associated with this email
        const userTeam = TEAMS.find(t => t.email && t.email.toLowerCase() === normalizedEmail);

        if (userTeam) {
            onLogin(userTeam.id);
        } else {
            setError('Correu no trobat. Assegura\'t d\'escriure\'l bé.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '2rem',
            background: 'var(--bg-color)'
        }}>
            <div style={{
                background: 'var(--surface)',
                padding: '3rem 2rem',
                borderRadius: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '2rem', fontWeight: '800' }}>
                    Fantasy Front Batoi
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: '600' }}>
                    Inicia sessió per gestionar el teu equip
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Correu electrònic"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        style={{
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border-color)',
                            fontSize: '1rem',
                            outline: 'none',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s',
                            width: '100%'
                        }}
                        required
                    />

                    {error && (
                        <div style={{ color: '#e53e3e', fontSize: '0.85rem', fontWeight: 'bold' }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            marginTop: '0.5rem'
                        }}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
