// src/components/Partits/Classificacions.js
import React from 'react';
import { TEAMS } from '../../data/mockData';

const Classificacions = () => {
    return (
        <div>
            <h2 className="section-title">Classificació General</h2>
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
                    {TEAMS.map((team, index) => (
                        <tr key={team.id} className={index === 0 ? "row-highlight" : ""}>
                            <td>{index + 1}</td>
                            <td>{team.name}</td>
                            <td>{team.gf}</td>
                            <td>{team.pts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Classificacions;