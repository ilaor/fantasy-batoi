
// src/components/Partits/Enfrontaments.js
import React from 'react';
import { MATCHES_J1 } from '../../data/mockData';

const calculateGoals = (points) => {
    if (points < 40) return 0;
    return Math.floor((points - 30) / 10);
};

const Enfrontaments = ({ ivanLineup }) => {
    // Calcular puntos en vivo de la alineación de IVAN FC actual
    const currentIvanPoints = ivanLineup ? ivanLineup.reduce((acc, player) => acc + (player.p || 0), 0) : 0;

    return (
        <div>
            <h2 className="section-title">Jornada 1</h2>

            {MATCHES_J1.map((match) => {
                // Determine if IVAN FC is local or visitor in this match
                const isIvanLocal = match.local === "IVAN FC";
                const isIvanVisitor = match.visitor === "IVAN FC";

                const ptsL = isIvanLocal ? currentIvanPoints : match.ptsL;
                const ptsV = isIvanVisitor ? currentIvanPoints : match.ptsV;

                const scoreL = calculateGoals(ptsL);
                const scoreV = calculateGoals(ptsV);

                return (
                    <div key={match.id} className="card match-card">
                        <div className="match-score">
                            <div className="team">
                                <span>{match.local}</span>
                                <small>{ptsL} pts</small>
                            </div>
                            <span className="score-number">{scoreL} - {scoreV}</span>
                            <div className="team text-right">
                                <span>{match.visitor}</span>
                                <small>{ptsV} pts</small>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Enfrontaments;