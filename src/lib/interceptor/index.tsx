import axios from "axios";
// import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => {
    // Başarılı response'ları doğrudan döndür
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;

      // Özel hata yönetimi yapılabilir
      if (status === 401) {
        // Örneğin kullanıcıyı logout yap
        // logoutUser();
      } else if (status === 403) {
        console.error("Erişim engellendi (403).");
      } else if (status >= 500) {
        console.error("Sunucu hatası:", data?.message || "Bilinmeyen hata.");
      }

      // Hata nesnesini standart bir formata dönüştür
      return Promise.reject({
        error,
      });
    }

    // Sunucuya erişilemezse veya başka bir durum oluşursa
    return Promise.reject({
      status: 500,
      message: "Sunucuya erişilemiyor. Lütfen bağlantınızı kontrol edin.",
      data: null,
    });
  }
);
