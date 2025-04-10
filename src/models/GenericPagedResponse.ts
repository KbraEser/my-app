export interface GenericPagedResponse<T> {
  data: T[]; // Veri listesi
  meta: {
    currentPage: number; // Şu anki sayfa
    pageSize: number; // Sayfa boyutu
    totalCount: number; // Toplam kayıt sayısı
    totalPages: number; // Toplam sayfa sayısı
    hasPreviousPage: boolean; // Önceki sayfa var mı
    hasNextPage: boolean; // Sonraki sayfa var mı
  };
}

export const createGenericPagedResponse = <T>(
  items: T[],
  totalCount: number,
  currentPage: number,
  pageSize: number
): GenericPagedResponse<T> => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: items, // Veri listesi
    meta: {
      currentPage, // Şu anki sayfa
      pageSize, // Sayfa boyutu
      totalCount, // Toplam kayıt sayısı
      totalPages, // Toplam sayfa sayısı
      hasPreviousPage: currentPage > 1, // Önceki sayfa var mı
      hasNextPage: currentPage < totalPages, // Sonraki sayfa var mı
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapApiResponseToPagedResponse = <T>(
  apiResponse: any
): GenericPagedResponse<T> => {
  return {
    data: apiResponse.data, // Gelen veri listesi
    meta: {
      currentPage: apiResponse.meta.page,
      pageSize: apiResponse.meta.pageSize,
      totalCount: apiResponse.meta.totalCount,
      totalPages: apiResponse.meta.totalPages,
      hasPreviousPage: apiResponse.meta.hasPreviousPage,
      hasNextPage: apiResponse.meta.hasNextPage,
    },
  };
};
