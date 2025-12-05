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

    // Date de naissance avec 3 sliders séparés (confusion totale)
    const [day, setDay] = useState(15);
    const [month, setMonth] = useState(6);
    const [year, setYear] = useState(2000);

    // Prénom et Nom (inversés)
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

    // Email avec construction par segments
    const [emailPart1, setEmailPart1] = useState('');
    const [emailPart2, setEmailPart2] = useState('');
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

        if (!firstName.trim()) newErrors.firstName = 'Prénom requis';
        if (!lastName.trim()) newErrors.lastName = 'Nom requis';

        if (password.length < 8) newErrors.password = 'Mot de passe trop court (min 8 caractères)';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

        const birthDate = new Date(year, month - 1, day);
        const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        if (age < 18) newErrors.birthDate = 'Vous devez avoir au moins 18 ans';

        const finalEmail = `${emailPart1}${emailPart2}@${emailDomain}`;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(finalEmail)) newErrors.email = 'Email invalide';

        if (termsRefused) newErrors.terms = 'Vous devez accepter les conditions';

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
        setFirstName('');
        setLastName('');
        setEmailPart1('');
        setEmailPart2('');
        setEmailDomain('');
        setTermsRefused(true);
        setErrors({});
    };

    return (
        <div className="register-wrapper">
            <div className="register-container-modern">
                {/* Bouton "S'inscrire" en haut dans une balise <a> */}
                <div className="header-action">
                    <a
                        href="#"
                        className="submit-link"
                        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                    >
                        S'inscrire →
                    </a>
                </div>

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

                    {/* 3. DATE DE NAISSANCE avec 3 sliders (confusion) */}
                    <div className="form-group">
                        <label>Date de naissance</label>
                        <div className="birth-date-container">
                            <div className="date-slider-group">
                                <label className="small-label">Jour: {day}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="31"
                                    value={day}
                                    onChange={(e) => setDay(parseInt(e.target.value))}
                                    className="date-slider"
                                />
                            </div>
                            <div className="date-slider-group">
                                <label className="small-label">Mois: {month}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="12"
                                    value={month}
                                    onChange={(e) => setMonth(parseInt(e.target.value))}
                                    className="date-slider"
                                />
                            </div>
                            <div className="date-slider-group">
                                <label className="small-label">Année: {year}</label>
                                <input
                                    type="range"
                                    min="1920"
                                    max="2024"
                                    value={year}
                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                    className="date-slider"
                                />
                            </div>
                            <div className="date-preview">
                                {day.toString().padStart(2, '0')}/{month.toString().padStart(2, '0')}/{year}
                            </div>
                        </div>
                        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                    </div>

                    {/* 4. NOM puis PRÉNOM (ordre inversé) */}
                    <div className="form-group">
                        <label>Nom de famille</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="text-input"
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Prénom</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="text-input"
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>

                    {/* 5. EMAIL en 2 parties + domaine */}
                    <div className="form-group">
                        <label>Adresse email</label>
                        <div className="email-split-container">
                            <input
                                type="text"
                                value={emailPart1}
                                onChange={(e) => setEmailPart1(e.target.value)}
                                className="email-part"
                                placeholder="partie 1"
                            />
                            <span className="plus-symbol">+</span>
                            <input
                                type="text"
                                value={emailPart2}
                                onChange={(e) => setEmailPart2(e.target.value)}
                                className="email-part"
                                placeholder="partie 2"
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

                    {/* Boutons inversés en bas */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="btn btn-cancel"
                        >
                            Retour
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="btn btn-delete"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}