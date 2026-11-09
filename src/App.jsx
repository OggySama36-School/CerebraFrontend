import { useState } from 'react';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import ResultCard from './components/ResultCard';
import { predictStroke } from './services/useService';
import './App.css';
import './responsive.css'; // phải nằm sau App.css

const RESULT_STEP = 3; // 0-2: các bước nhập, 3: kết quả

function App() {
  const [step, setStep] = useState(0);
  const [formKey, setFormKey] = useState(0); // đổi key để xóa sạch form khi nhập bệnh nhân mới
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (patientData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setStep(RESULT_STEP);
    try {
      const data = await predictStroke(patientData);
      setResult(data); // keep the raw API response; each component formats it
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPatient = () => {
    setResult(null);
    setError(null);
    setStep(0);
    setFormKey((k) => k + 1);
  };

  const isResult = step === RESULT_STEP;

  return (
    <div className="app">
      <Header step={step} onStepClick={setStep} />
      <main className={isResult ? 'app-main app-main--result' : 'app-main'}>
        <PatientForm
          key={formKey}
          step={step}
          onStepChange={setStep}
          onSubmit={handleSubmit}
          loading={loading}
        />
        {isResult && (
          <ResultCard
            result={result}
            error={error}
            loading={loading}
            onEdit={() => setStep(0)}
            onNewPatient={handleNewPatient}
          />
        )}
      </main>
    </div>
  );
}

export default App;