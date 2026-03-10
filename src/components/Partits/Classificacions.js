// src/components/Partits/Classificacions.js
import React from 'react';
import { TEAMS, getTitulares } from '../../data/mockData';

const Classificacions = ({ ivanLineup }) => {

    // Helper to calculate total points for a given lineup
    const calculateLineupPoints = (lineup) => {
        return lineup.reduce((acc, player) => acc + (player.p || 0), 0);
    };

    // Build a dynamic standings array
    const liveStandings = TEAMS.map(team => {
        let currentPoints = 0;

        if (team.id === 5 && ivanLineup) {
            // Use the live modified lineup for the logged in user
            currentPoints = calculateLineupPoints(ivanLineup);
        } else {
            // Calculate based on the best 11
            const teamLineup = getTitulares(team.id);
            currentPoints = calculateLineupPoints(teamLineup);
        }

        return {
            ...team,
            livePts: currentPoints
        };
    });

    // Sort by live points in descending order
    liveStandings.sort((a, b) => b.livePts - a.livePts);

    return (
        <div>
            <h2 className="section-title">Classificació General en Viu</h2>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Equip</th>
                        <th>GF</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
                    {liveStandings.map((team, index) => (
                        <tr key={team.id} className={index === 0 ? "row-highlight" : ""}>
                            <td>{index + 1}</td>
                            <td>{team.name}</td>
                            <td>{team.gf}</td>
                            <td style={{ fontWeight: team.id === 5 ? '900' : '500', color: team.id === 5 ? 'var(--primary)' : 'inherit' }}>
                                {team.livePts}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Classificacions;