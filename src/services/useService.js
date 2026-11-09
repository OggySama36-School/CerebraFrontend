import apiClient from "./api";

export async function predictStroke(patientData) {
  try {
    const response = await apiClient.post('/predict', patientData);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data?.message || 'Lỗi từ server, vui lòng thử lại.', { cause: err });
    } else if (err.request) {
      throw new Error('Không thể kết nối tới server.', { cause: err });
    } else {
      throw new Error('Đã có lỗi xảy ra, vui lòng thử lại.', { cause: err });
    }
  }
}