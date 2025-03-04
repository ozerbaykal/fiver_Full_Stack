type ExtendedError = Error & { status: number };

//aldığı parametrelere göre hata middleware ine gönderilmek üzere error nesnesi oluşturur
const error = (status: number, message: string): ExtendedError => {
  //bir error nesnesi oluştur
  const err = new Error(message) as ExtendedError;

  err.status = status;

  //hata mesajını döndür
  return err;
};

export default error;
