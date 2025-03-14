import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://stok-api-66a9f6c2f630.herokuapp.com",
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          toast.error(
            "Geçersiz istek: " +
              (error.response.data.message || "Veri doğrulama hatası")
          );
          break;
        case 401:
          toast.error("Oturum süresi doldu veya giriş yapılmadı");
          break;
        case 403:
          toast.error("Bu işlem için yetkiniz bulunmuyor");
          break;
        case 404:
          toast.error("İstenilen kaynak bulunamadı");
          break;
        case 422:
          toast.error(
            "Doğrulama hatası: " +
              (error.response.data.message ||
                "Lütfen girdiğiniz bilgileri kontrol edin")
          );
          break;
        case 500:
        case 501:
        case 502:
        case 503:
          toast.error("Sunucu hatası: Lütfen daha sonra tekrar deneyin");
          break;
      }
    } else if (error.request) {
      toast.error(
        "Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin"
      );
    } else {
      toast.error(`İstek hatası: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

export default api;
