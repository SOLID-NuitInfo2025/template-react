import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();

    // Confirmation de mot de passe avec slider (inversé - vient avant le mot de passe)
    const passwordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmCharIndex, setConfirmCharIndex] = useState(0);

    // Mot de passe principal
    const [password, setPassword] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    // Date de naissance avec dropdowns désordonnés
    const [day, setDay] = useState(15);
    const [month, setMonth] = useState(6);
    const [year, setYear] = useState(2000);

    // Noms des mois désordonnés
    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const shuffledMonthsWithNames = monthNames
        .map((name, index) => ({ name, value: index + 1 }))
        .sort(() => Math.random() - 0.5);

    // Générer des listes désordonnées
    const shuffledDays = Array.from({ length: 31 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    const shuffledYears = Array.from({ length: 105 }, (_, i) => 1920 + i).sort(() => Math.random() - 0.5);

    // Nom d'utilisateur
    const [username, setUsername] = useState('');

    // Email simple
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const domains = ['gmail.com', 'yahoo.fr', 'hotmail.com', 'outlook.com'];

    // Conditions avec checkbox inversé (coché = refusé)
    const [termsRefused, setTermsRefused] = useState(true);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const addPasswordChar = () => {
        setPassword(prev => prev + passwordChars[currentCharIndex]);
    };

    const addConfirmChar = () => {
        setConfirmPassword(prev => prev + passwordChars[confirmCharIndex]);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!username.trim()) newErrors.username = 'Nom d\'utilisateur requis';

        if (password.length < 8) newErrors.password = 'Mot de passe trop court (min 8 caractères)';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

        const birthDate = new Date(year, month - 1, day);
        const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        if (age < 18) newErrors.birthDate = 'Vous devez avoir au moins 18 ans';

        const finalEmail = `${email}@${emailDomain}`;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(finalEmail)) newErrors.email = 'Email invalide'; if (termsRefused) newErrors.terms = 'Vous devez accepter les conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (validateForm()) {
            alert('Inscription réussie ! (simulation)');
            navigate('/login');
        }
    };

    const handleClear = () => {
        setPassword('');
        setConfirmPassword('');
        setDay(15);
        setMonth(6);
        setYear(2000);
        setUsername('');
        setEmail('');
        setEmailDomain('');
        setTermsRefused(true);
        setErrors({});
    };

    return (
        <div className="register-wrapper">
            <div className="register-container-modern">
                <h1 className="register-title">Créer un compte</h1>

                <form className="register-form" onSubmit={handleSubmit}>
                    {/* 1. CONFIRMATION MOT DE PASSE en premier (confusion totale) */}
                    <div className="form-group">
                        <label>Confirmation du mot de passe</label>
                        <div className="password-slider-container">
                            <input
                                type="range"
                                min="0"
                                max={passwordChars.length - 1}
                                value={confirmCharIndex}
                                onChange={(e) => setConfirmCharIndex(parseInt(e.target.value))}
                                className="password-slider"
                            />
                            <div className="slider-display">
                                Caractère: <strong>{passwordChars[confirmCharIndex]}</strong>
                            </div>
                            <button
                                type="button"
                                onClick={addConfirmChar}
                                className="add-char-btn"
                            >
                                Ajouter
                            </button>
                            <div className="password-preview">
                                {confirmPassword || '(vide)'}
                            </div>
                        </div>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>

                    {/* 2. MOT DE PASSE (vient après la confirmation) */}
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <div className="password-slider-container">
                            <input
                                type="range"
                                min="0"
                                max={passwordChars.length - 1}
                                value={currentCharIndex}
                                onChange={(e) => setCurrentCharIndex(parseInt(e.target.value))}
                                className="password-slider"
                            />
                            <div className="slider-display">
                                Caractère: <strong>{passwordChars[currentCharIndex]}</strong>
                            </div>
                            <button
                                type="button"
                                onClick={addPasswordChar}
                                className="add-char-btn"
                            >
                                Ajouter
                            </button>
                            <div className="password-preview">
                                {password || '(vide)'}
                            </div>
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    {/* 3. DATE DE NAISSANCE avec dropdowns désordonnés */}
                    <div className="form-group">
                        <label>Date de naissance</label>
                        <div className="birth-date-container">
                            <div className="date-dropdown-group">
                                <label className="small-label">Jour</label>
                                <select
                                    value={day}
                                    onChange={(e) => setDay(parseInt(e.target.value))}
                                    className="date-dropdown"
                                >
                                    <option value="">Choisir...</option>
                                    {shuffledDays.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-dropdown-group">
                                <label className="small-label">Mois</label>
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(parseInt(e.target.value))}
                                    className="date-dropdown"
                                >
                                    <option value="">Choisir...</option>
                                    {shuffledMonthsWithNames.map(m => (
                                        <option key={m.value} value={m.value}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-dropdown-group">
                                <label className="small-label">Année</label>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                    className="date-dropdown"
                                >
                                    <option value="">Choisir...</option>
                                    {shuffledYears.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-preview">
                                {day.toString().padStart(2, '0')}/{month.toString().padStart(2, '0')}/{year}
                            </div>
                        </div>
                        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                    </div>

                    {/* 4. NOM D'UTILISATEUR */}
                    <div className="form-group">
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-input"
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>

                    {/* 5. EMAIL simple + domaine */}
                    <div className="form-group">
                        <label>Adresse email</label>
                        <div className="email-simple-container">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input"
                                placeholder="votre-email"
                            />
                            <span className="at-symbol">@</span>
                            <select
                                value={emailDomain}
                                onChange={(e) => setEmailDomain(e.target.value)}
                                className="domain-dropdown"
                            >
                                <option value="">Domaine...</option>
                                {domains.map(domain => (
                                    <option key={domain} value={domain}>{domain}</option>
                                ))}
                            </select>
                        </div>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    {/* 6. CONDITIONS inversées (coché = refusé) */}
                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={termsRefused}
                                onChange={(e) => setTermsRefused(e.target.checked)}
                            />
                            <span className="checkbox-text">
                                Je refuse les conditions d'utilisation
                            </span>
                        </label>
                        {errors.terms && <span className="error">{errors.terms}</span>}
                    </div>

                    {/* Boutons inversés en bas - Confirmer rouge gauche, Annuler vert droite */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-confirm"
                        >
                            Confirmer
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="btn btn-cancel"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}