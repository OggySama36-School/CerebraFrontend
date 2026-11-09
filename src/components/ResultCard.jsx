// The API returns a calibrated probability as a percent (0-100); the base rate in the data is ~5%.
const MEDIUM_THRESHOLD = 5;
const HIGH_THRESHOLD = 15;

const STATUS_LABELS = {
  loading: 'Đang dự đoán...',
  error: 'Dự đoán thất bại',
  low: 'Nguy cơ thấp',
  medium: 'Nguy cơ trung bình',
  high: 'Nguy cơ cao',
  critical: 'Nguy cơ rất cao',
};

// Maps the server's risk_level text to a status key
const RISK_LEVEL_MAP = {
  'THẤP': 'low',
  'THAP': 'low',
  'LOW': 'low',
  'TRUNG BÌNH THẤP': 'low',
  'TRUNG BÌNH': 'medium',
  'TRUNG BINH': 'medium',
  'MEDIUM': 'medium',
  'CAO': 'high',
  'RẤT CAO': 'critical',
  'HIGH': 'high',
};

function getRisk(probability) {
  if (probability >= HIGH_THRESHOLD) return 'high';
  if (probability >= MEDIUM_THRESHOLD) return 'medium';
  return 'low';
}

// "TRUNG BÌNH THẤP" -> "Trung bình thấp"
function capitalize(text) {
  const t = String(text ?? '').trim().toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function ResultCard({ result, error, loading, onEdit, onNewPatient }) {
  const {
    risk_level: riskLevel,
    probability,
    advice,
    factors,
    warning,
    high_risk: highRisk,
  } = result ?? {};
  const hasResult = !loading && !error && typeof probability === 'number';

  let status = 'loading';
  if (!loading && error) {
    status = 'error';
  } else if (hasResult) {
    // Nhãn và màu theo risk_level của server (đã tính trên xác suất hiệu chỉnh)
    status = RISK_LEVEL_MAP[String(riskLevel ?? '').trim().toUpperCase()] ?? getRisk(probability);
  }

  const percent = hasResult ? probability.toFixed(1) : null;
  const gaugeValue = hasResult ? Math.min(Math.max(probability, 0), 100) : 0;
  const factorList = Array.isArray(factors) ? factors : [];

  return (
    <section className={`result-view result-view--${status}`} aria-live="polite">
      <div className="result-view__gauge-col">
        <div className="result-view__gauge">
          <svg
            viewBox="0 0 160 90"
            role="img"
            aria-label={hasResult ? `Tỉ lệ ước lượng ${percent}%` : 'Chưa có kết quả dự đoán'}
          >
            <path className="gauge-track" d="M15 80 A65 65 0 0 1 145 80" pathLength="100" />
            <path
              className="gauge-value"
              d="M15 80 A65 65 0 0 1 145 80"
              pathLength="100"
              strokeDasharray={`${gaugeValue} 100`}
            />
          </svg>
          <p className="result-view__percent">{hasResult ? `${percent}%` : '--'}</p>
        </div>
        <span className="result-view__badge">{STATUS_LABELS[status]}</span>
        <p className="result-view__caption">Tỉ lệ ước lượng</p>
      </div>

      <div className="result-view__detail">
        {status === 'error' && (
          <p className="result-view__message">Có lỗi xảy ra khi dự đoán: {error}</p>
        )}

        {hasResult && (
          <>
            <div className="result-view__tiles">
              <div className="tile">
                <span className="tile__label">Mức độ</span>
                <strong className="tile__value">{capitalize(riskLevel)}</strong>
              </div>
              <div className="tile">
                <span className="tile__label">Ngưỡng cảnh báo</span>
                <strong className="tile__value">{highRisk ? 'Vượt' : 'Chưa vượt'}</strong>
              </div>
              <div className="tile">
                <span className="tile__label">Số yếu tố</span>
                <strong className="tile__value">{factorList.length}</strong>
              </div>
            </div>

            {advice && <p className="result-view__advice">{advice}</p>}

            {factorList.length > 0 && (
              <ul className="chips" aria-label="Yếu tố ảnh hưởng">
                {factorList.map((f) => (
                  <li key={f} className="chip">
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {warning && <p className="result-view__warning">{warning}</p>}
          </>
        )}

        <div className="result-view__actions">
          <button type="button" className="btn" onClick={onNewPatient} disabled={loading}>
            Nhập bệnh nhân mới
          </button>
          <button type="button" className="btn btn--ghost" onClick={onEdit} disabled={loading}>
            Chỉnh sửa
          </button>
        </div>

        <p className="result-view__note">
          Kết quả từ mô hình học máy, chỉ mang tính tham khảo, không thay thế chẩn đoán y tế.
        </p>
      </div>
    </section>
  );
}

export default ResultCard;