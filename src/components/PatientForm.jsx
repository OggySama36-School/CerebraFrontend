import { useState } from 'react';

const initialForm = {
  gender: 'Male',
  age: '',
  hypertension: '0',
  heart_disease: '0',
  ever_married: 'Yes',
  work_type: 'Private',
  Residence_type: 'Urban',
  avg_glucose_level: '',
  bmi: '',
  smoking_status: 'never smoked',
};

// Adjust these cutoffs to match your dataset / project requirements
const ADULT_AGE = 18; // below this: cannot be married or smoke
const WORK_AGE = 16; // below this: work type is forced to "children"

const LAST_FORM_STEP = 2; // bước 0, 1, 2 là các bước nhập; bước 3 là kết quả
const STEP_TITLES = ['Thông tin cơ bản', 'Chỉ số sức khỏe', 'Lối sống và hoàn cảnh'];

function PatientForm({ step, onStepChange, onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);

  const hasAge = form.age !== '';
  const age = Number(form.age);
  const isMinor = hasAge && age < ADULT_AGE;
  const isChild = hasAge && age < WORK_AGE;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'age' && value !== '') {
        const newAge = Number(value);

        if (newAge < ADULT_AGE) {
          next.ever_married = 'No';
          next.smoking_status = 'never smoked';
        }

        if (newAge < WORK_AGE) {
          next.work_type = 'children';
        } else if (prev.work_type === 'children') {
          next.work_type = 'Private';
        }
      }

      return next;
    });
  };

  // Chỉ các ô của bước hiện tại nằm trong DOM, nên trình duyệt tự kiểm tra đúng các ô đó
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step < LAST_FORM_STEP) {
      onStepChange(step + 1);
      return;
    }

    onSubmit({
      ...form,
      age: Number(form.age),
      hypertension: Number(form.hypertension),
      heart_disease: Number(form.heart_disease),
      avg_glucose_level: Number(form.avg_glucose_level),
      bmi: Number(form.bmi),
    });
  };

  // Ở bước kết quả, form vẫn được giữ (để bấm "Chỉnh sửa" không mất dữ liệu) nhưng không hiển thị
  if (step > LAST_FORM_STEP) return null;

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <div className="patient-form__head">
        <span className="patient-form__count">
          Bước {step + 1}/{LAST_FORM_STEP + 1}
        </span>
        <h2>{STEP_TITLES[step]}</h2>
      </div>

      {step === 0 && (
        <div className="form-row">
          <label>
            Giới tính
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </label>

          <label>
            Tuổi
            <input
              type="number"
              name="age"
              min="0"
              max="120"
              placeholder="VD: 54"
              required
              value={form.age}
              onChange={handleChange}
            />
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="form-row">
          <label>
            Cao huyết áp
            <select name="hypertension" value={form.hypertension} onChange={handleChange}>
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </label>

          <label>
            Bệnh tim
            <select name="heart_disease" value={form.heart_disease} onChange={handleChange}>
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </label>

          <label>
            Đường huyết (mg/dL)
            <input
              type="number"
              step="0.1"
              name="avg_glucose_level"
              placeholder="VD: 105"
              required
              value={form.avg_glucose_level}
              onChange={handleChange}
            />
          </label>

          <label>
            Chỉ số BMI
            <input
              type="number"
              step="0.1"
              name="bmi"
              placeholder="VD: 24.1"
              required
              value={form.bmi}
              onChange={handleChange}
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="form-row">
          <label>
            Hút thuốc
            <select
              name="smoking_status"
              value={form.smoking_status}
              onChange={handleChange}
              disabled={isMinor}
            >
              <option value="never smoked">Chưa từng hút</option>
              <option value="formerly smoked">Đã từng hút</option>
              <option value="smokes">Đang hút</option>
              <option value="Unknown">Không rõ</option>
            </select>
          </label>

          <label>
            Loại công việc
            <select
              name="work_type"
              value={form.work_type}
              onChange={handleChange}
              disabled={isChild}
            >
              <option value="Private">Tư nhân</option>
              <option value="Self-employed">Tự kinh doanh</option>
              <option value="Govt_job">Nhà nước</option>
              <option value="children" disabled={hasAge && age >= WORK_AGE}>
                Trẻ em
              </option>
              <option value="Never_worked">Chưa từng đi làm</option>
            </select>
          </label>

          <label>
            Đã kết hôn
            <select
              name="ever_married"
              value={form.ever_married}
              onChange={handleChange}
              disabled={isMinor}
            >
              <option value="Yes">Đã kết hôn</option>
              <option value="No">Chưa kết hôn</option>
            </select>
          </label>

          <label>
            Nơi sinh sống
            <select name="Residence_type" value={form.Residence_type} onChange={handleChange}>
              <option value="Urban">Thành thị</option>
              <option value="Rural">Nông thôn</option>
            </select>
          </label>
        </div>
      )}

      <div className="patient-form__actions">
        {step > 0 && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onStepChange(step - 1)}
          >
            Quay lại
          </button>
        )}
        <button type="submit" className="btn" disabled={loading}>
          {step < LAST_FORM_STEP ? 'Tiếp tục' : loading ? 'Đang dự đoán...' : 'Dự đoán nguy cơ'}
        </button>
      </div>
    </form>
  );
}

export default PatientForm;