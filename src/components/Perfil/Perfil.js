// src/components/Perfil/Perfil.js
import React from 'react';
import { User } from 'lucide-react';

const Perfil = () => (
    <div className="card profile-card text-center animate-fade-in">
        <div className="profile-avatar"><User size={40} /></div>
        <h2 className="profile-name">Torres FC</h2>
        <p className="profile-status">Pressupost: 454,5 M</p>
    </div>
);

export default Perfil;