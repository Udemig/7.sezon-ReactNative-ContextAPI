/*
Context API:
Uygulama birden çok bileşenin ihtiyacı olan verileri bileşenleeden bağımsız bir şekilde konumlana merkezlerde yönetmeye yarar.

Context yapısı içinde verilerin stati ve verileri değiştirmeye yarayan fonksiyonları tuttabiliriz.

Context tuttuğumuz statelerin bileşenlere doğrudan aktarım yapabilen state yönetim aracıdır.
*/

import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

//*1.adım: Context yapısının temelini oluştur
export const UserContext = createContext();

//2.adım:Verileri bileşenlere aktaracak olan sağlayıcı ve onun tuttuğu verileri tanımlarız.
export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      //* apiye istek at
      .get('https://jsonplaceholder.typicode.com/users')
      //*cevap başarılıgelirse users staene veriyi aktar.
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      //*hata alırsak hatayı error statini aktar.
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  //* 3.adım: Sağlayıcı fonksiyonları mytlaka providerı retun etmelidir ve App'i sarmalamalıdır.
  //*value olarak eklenen değerler projedeki bileşenler tarafından erişilebilir olur.
  return (
    <UserContext.Provider value={{users, error, loading}}>
      {children}
    </UserContext.Provider>
  );
};
