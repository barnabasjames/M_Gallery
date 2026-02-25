/* ===================================
   GALLERY HIGHLIGHTS SECTION
   =================================== */

.gallery-highlights {
    padding: 80px 0;
    background: var(--secondary-color);
}

.highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.highlight-card {
    text-align: center;
    padding: 40px 25px;
    border-radius: 8px;
    transition: var(--transition);
    position: relative;
    background: var(--tertiary-color);
    border: 1px solid var(--border-color);
}

.highlight-card:hover {
    background: linear-gradient(135deg, var(--tertiary-color), #2a2a2a);
    transform: translateY(-10px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-color);
}

.highlight-icon {
    font-size: 48px;
    color: var(--primary-color);
    margin-bottom: 20px;
    transition: var(--transition);
}

.highlight-card:hover .highlight-icon {
    font-size: 56px;
    color: var(--accent-color);
    transform: rotate(-10deg);
    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
}

.highlight-card h3 {
    font-size: 20px;
    margin-bottom: 12px;
    color: var(--text-dark);
}

.highlight-card p {
    color: var(--text-light);
    line-height: 1.8;
    font-size: 15px;
}

/* ===================================
   SPECS COMPARISON SECTION
   =================================== */

.specs-comparison {
    padding: 80px 0;
    background: var(--light-bg);
}

.comparison-subtitle {
    text-align: center;
    color: var(--text-light);
    margin-bottom: 40px;
    font-size: 16px;
}

/* ===================================
   EXPLORE MORE SECTION
   =================================== */

.explore-more {
    text-align: center;
    padding: 80px 20px;
    background: linear-gradient(135deg, var(--light-bg), var(--tertiary-color));
    border-radius: 12px;
    margin: 60px 0;
    border: 1px solid var(--border-color);
}

.explore-more h2 {
    font-size: 42px;
    margin-bottom: 15px;
    color: var(--text-dark);
    letter-spacing: 1px;
}

.explore-more p {
    font-size: 16px;
    color: var(--text-light);
    margin-bottom: 30px;
}

/* ===================================
   ABOUT CTA SECTION
   =================================== */

.about-cta {
    text-align: center;
    padding: 80px 20px;
    background: linear-gradient(135deg, var(--secondary-color), #0a0a0a);
    color: #fff;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    margin-top: 80px;
}

.about-cta h2 {
    font-size: 42px;
    margin-bottom: 15px;
    letter-spacing: 1px;
}

.about-cta p {
    font-size: 16px;
    margin-bottom: 30px;
    opacity: 0.85;
    color: #ddd;
}

/* ===================================
   MODEL YEAR STYLING
   =================================== */

.model-year {
    color: var(--accent-color);
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 8px;
}

/* ===================================
   FORM ROW STYLING FIX
   =================================== */

.form-row .form-group {
    grid-column: span 1;
}

.form-row {
    display: contents;
}

/* Make sure responsive form works properly */
@media (max-width: 768px) {
    .form-row .form-group {
        grid-column: 1 / -1;
    }
}
