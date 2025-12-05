import './Login.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const navigate = useNavigate();

    // Password slider state (caractères de a-z, A-Z, 0-9, spéciaux)
    const passwordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const [password, setPassword] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    // Age avec devinette - Recherche dichotomique
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(120);
    const [age, setAge] = useState(60); // Milieu de la plage [0, 120]
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [ageHint, setAgeHint] = useState('Avez vous plus ou moins que 60 ans ?');
    const [attempts, setAttempts] = useState(0);

    // Username
    const [username, setUsername] = useState('');

    // Email - domaine sélectionné via des boutons radio stylisés
    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const domains = ['gmail.com', 'yahoo.fr', 'hotmail.com', 'outlook.com', 'custom'];
    const [customDomain, setCustomDomain] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const addPasswordChar = () => {
        setPassword(prev => prev + passwordChars[currentCharIndex]);
    };

    // Recherche dichotomique : l'utilisateur dit si c'est plus ou moins
    const handleAgeGuess = (isMore: boolean) => {
        setAttempts(prev => prev + 1);

        let newMin = minAge;
        let newMax = maxAge;

        if (isMore) {
            // L'âge réel est PLUS grand que la proposition actuelle
            newMin = age + 1;
        } else {
            // L'âge réel est MOINS grand que la proposition actuelle
            newMax = age - 1;
        }

        setMinAge(newMin);
        setMaxAge(newMax);

        // Calculer le nouveau milieu (dichotomie)
        const newAge = Math.floor((newMin + newMax) / 2);
        setAge(newAge);

        // Vérifier si on a une plage valide
        if (newMin > newMax) {
            setAgeHint('⚠️ Erreur dans la recherche - Recommencez');
        } else {
            setAgeHint(`Tentative ${attempts + 1} : Est-ce ${newAge} ans ?`);
        }
    };

    const confirmAge = () => {
        setAgeConfirmed(true);
        setAgeHint(`✓ Âge confirmé : ${age} ans`);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!username.trim()) newErrors.username = 'Nom d\'utilisateur requis';
        if (password.length < 8) newErrors.password = 'Mot de passe trop court (min 8 caractères)';
        if (!ageConfirmed) newErrors.age = 'Vous devez confirmer votre âge !';
        if (age < 18) newErrors.age = 'Vous devez avoir au moins 18 ans';

        const finalEmail = emailDomain === 'custom'
            ? `${emailLocal}@${customDomain}`
            : `${emailLocal}@${emailDomain}`;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(finalEmail)) newErrors.email = 'Email invalide';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (validateForm()) {
            alert('Connexion réussie ! (simulation)');
            navigate('/');
        }
    };

    const handleClear = () => {
        setPassword('');
        setMinAge(0);
        setMaxAge(120);
        setAge(60);
        setAgeConfirmed(false);
        setAgeHint('Trouvez votre âge avec + et -');
        setAttempts(0);
        setUsername('');
        setEmailLocal('');
        setEmailDomain('');
        setCustomDomain('');
        setErrors({});
    };

    return (
        <div className="login-wrapper">
            <div className="login-container-modern">
                {/* Bouton "Continuer" en haut dans une balise <a> */}
                <div className="header-action">
                    <a
                        href="#"
                        className="continue-link"
                        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                    >
                        Continuer →
                    </a>
                </div>

                <h1 className="login-title">Authentification Sécurisée</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    {/* 1. MOT DE PASSE en premier (inversé) */}
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-slider-container">
                            <label>Choisissez les caractères :</label>
                            <input
                                type="range"
                                min="0"
                                max={passwordChars.length - 1}
                                value={currentCharIndex}
                                onChange={(e) => setCurrentCharIndex(parseInt(e.target.value))}
                                className="password-slider"
                            />
                            <div className="slider-display">
                                Caractère actuel: <strong>{passwordChars[currentCharIndex]}</strong>
                            </div>
                            <button
                                type="button"
                                onClick={addPasswordChar}
                                className="add-char-btn"
                            >
                                Ajouter le caractère
                            </button>
                            <div className="password-preview">
                                {password || '(vide)'}
                            </div>
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    {/* 2. ÂGE avec devinette - Recherche dichotomique */}
                    <div className="form-group">
                        <label htmlFor="age">Quel âge avez-vous ?</label>
                        <div className="age-hint">{ageHint}</div>
                        <div className="age-selector">
                            <button
                                type="button"
                                onClick={() => handleAgeGuess(false)}
                                className="age-btn age-btn-minus"
                                disabled={ageConfirmed}
                                title="Mon âge est MOINS que ça"
                            >
                                −
                            </button>
                            <div className="age-display">{age} ans</div>
                            <button
                                type="button"
                                onClick={() => handleAgeGuess(true)}
                                className="age-btn age-btn-plus"
                                disabled={ageConfirmed}
                                title="Mon âge est PLUS que ça"
                            >
                                +
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={confirmAge}
                            className="confirm-age-btn"
                            disabled={ageConfirmed}
                        >
                            {ageConfirmed ? '✓ Âge confirmé' : 'Confirmer cet âge'}
                        </button>
                        {errors.age && <span className="error">{errors.age}</span>}
                    </div>

                    {/* 3. NOM D'UTILISATEUR avec placeholder bizarre */}
                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <div className="username-container">
                            <input
                                type="text"
                                id="username"
                                value={username || 'Nom d\'utilisateur'}
                                onChange={(e) => setUsername(e.target.value)}
                                className="username-input"
                            />
                        </div>
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>

                    {/* 4. EMAIL avec sélection créative du domaine */}
                    <div className="form-group">
                        <label htmlFor="email">Adresse email</label>
                        <div className="email-container">
                            <input
                                type="text"
                                value={emailLocal}
                                onChange={(e) => setEmailLocal(e.target.value)}
                                className="email-local"
                                placeholder="partie locale"
                            />
                            <span className="at-symbol">@</span>

                            <div className="domain-selector">
                                <select
                                    value={emailDomain}
                                    onChange={(e) => setEmailDomain(e.target.value)}
                                    className="domain-dropdown"
                                >
                                    <option value="">Choisir un domaine...</option>
                                    {domains.map(domain => (
                                        <option key={domain} value={domain}>
                                            {domain === 'custom' ? 'Personnalisé' : domain}
                                        </option>
                                    ))}
                                </select>

                                {emailDomain === 'custom' && (
                                    <input
                                        type="text"
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value)}
                                        className="custom-domain-input"
                                        placeholder="exemple.com"
                                    />
                                )}
                            </div>
                        </div>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    {/* Boutons inversés en bas */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-cancel"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="btn btn-delete"
                        >
                            Supprimer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
