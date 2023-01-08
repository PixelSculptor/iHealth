import medicines from '../jsons/leki.json';

const getMedicineArray = () => {
    medicines.map((element) => ({
        Nazwa_leku: element.NazwaProduktuLeczniczego,
        Moc_leku: element.Moc,
        Postac: element.Postac_farmaceutyczna,
        Substancja_czynna: element.Substancja_czynna,
        Nazwa_wytworcy: element.Nazwa_wytwórcy,
        Ulotka: element.Ulotka,
    }));
};

export default getMedicineArray;
