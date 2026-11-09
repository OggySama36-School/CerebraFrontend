import { Brain, Check } from 'lucide-react';

const STEPS = ['Cơ bản', 'Sức khỏe', 'Lối sống', 'Kết quả'];

function Header({ step, onStepClick }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <div className="app-header__logo">
          <Brain size={22} aria-hidden="true" />
        </div>
        <div>
          <h1>Cerebra</h1>
          <p>Đánh giá nguy cơ đột quỵ dựa trên mô hình học máy</p>
        </div>
      </div>

      <nav aria-label="Các bước">
        <ol className="stepper">
          {STEPS.map((label, i) => {
            const state = i === step ? 'current' : i < step ? 'done' : 'todo';
            return (
              <li key={label} className={`stepper__item stepper__item--${state}`}>
                <button
                  type="button"
                  disabled={i >= step}
                  aria-current={i === step ? 'step' : undefined}
                  onClick={() => onStepClick(i)}
                >
                  <span className="stepper__dot">
                    {state === 'done' ? <Check size={14} aria-hidden="true" /> : i + 1}
                  </span>
                  <span className="stepper__label">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}

export default Header;