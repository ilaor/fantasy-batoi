// src/components/Perfil/Perfil.js
import React, { useState } from 'react';
import { User, BookOpen, X } from 'lucide-react';

const Perfil = () => {
    const [showRules, setShowRules] = useState(false);

    return (
        <div className="card profile-card text-center animate-fade-in">
            <div className="profile-avatar"><User size={40} /></div>
            <h2 className="profile-name">Ivan FC</h2>
            <p className="profile-status">€454,5 M </p>

            <button
                className="reglament-btn"
                onClick={() => setShowRules(true)}
            >
                <BookOpen size={20} />
                Reglament
            </button>

            {showRules && (
                <div className="modal-overlay" onClick={() => setShowRules(false)}>
                    <div className="rules-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowRules(false)}>
                            <X size={20} />
                        </button>

                        <h2 className="rules-title">Reglament</h2>

                        <div className="rules-section">
                            <h3 className="rules-section-title">MERCAT I EQUIPS</h3>
                            <ul className="rules-list">
                                <li>Cada jugador disposarà de 500 M de pressupost.</li>
                                <li>Cada equip haurà d’estar format per 21 jugadors: 3 porters, 6 defenses, 6 migcampistes i 6 davanters.</li>
                                <li>El mercat de fitxatges es farà en una única sessió presencial mitjançant subhasta.</li>
                                <li>Els jugadors eixiran de manera aleatòria i cada participant podrà pujar el que vulga mentre tinga pressupost.</li>
                                <li>El jugador serà per a qui faça l’oferta més alta i se li descomptarà del pressupost.</li>
                                <li>No es podrà superar el límit de jugadors per posició.</li>
                                <li>Si després de traure tots els jugadors hi ha equips amb alguna posició incompleta, es farà una repesca amb els jugadors no fitxats.</li>
                                <li>En la repesca, les pujades començaran en 5 M i només es podrà pujar per les posicions que falten.</li>
                                <li>Una vegada acabada la subhasta i la repesca, el mercat quedarà tancat fins a final de temporada. No es permetran més fitxatges ni canvis.</li>
                            </ul>
                        </div>

                        <div className="rules-section">
                            <h3 className="rules-section-title">PARTITS I CLASSIFICACIÓ</h3>
                            <ul className="rules-list">
                                <li>La lliga es jugarà en format tots contra tots, amb un partit per jornada.</li>

                            </ul>
                        </div>

                        <div className="rules-section">
                            <h3 className="rules-section-title">SISTEMA DE GOLS</h3>
                            <ul className="rules-list">
                                <li>Els gols de cada equip es calcularan segons els punts fantasy totals de la jornada:</li>
                                <li>0 a 39 punts: 0 gols</li>
                                <li>40 a 49 punts: 1 gol</li>
                                <li>50 a 59 punts: 2 gols</li>
                                <li>60 a 69 punts: 3 gols</li>
                                <li>I així successivament, sumant 1 gol cada 10 punts.</li>
                            </ul>
                        </div>

                        <div className="rules-section">
                            <h3 className="rules-section-title">ALINEACIONS</h3>
                            <ul className="rules-list">
                                <li>Cada equip haurà d’enviar l’alineació com a mínim 10 minuts abans del primer partit de la jornada.</li>
                                <li>Una vegada passat este temps, l’alineació no es podrà modificar.</li>
                                <li>Les úniques formacions permeses són: 5-4-1, 5-3-2, 4-5-1, 4-4-2, 4-3-3, 3-5-2, 3-4-3.</li>
                                <li>Si un equip no envia l’alineació dins del termini, perdrà el partit 3-0 automàticament.</li>
                                <li>El partit contra el CD Ningú es donarà sempre com a victòria 3-0.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;