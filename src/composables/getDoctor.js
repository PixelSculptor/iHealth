import doctors from '../jsons/lekarze.json';

const getDoctorsArray = () => {
    doctors.map((element) => ({
        Nazwa: element.Nazwa,
        Numer_ksiegi: element.Numer_ksiegi,
        Kod_izby: element.Izba_kod,
        Opis_izby: element.Izba_opis,
        Ulica: element.Adres_korespondencyjny_Ulica,
        Budynek: element.Adres_korespondencyjny_Budynek,
        Kod_pocztowy: element.Adres_korespondencyjny_KodPocztowy,
        Miejcowosc: element.Adres_korespondencyjny_Miejscowosc,
    }));
};

export default getDoctorsArray;
