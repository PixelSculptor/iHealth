import medicines from '../jsons/leki.json';

const arrayMedicine = medicines;

const getMedicineArray = () => {
    const resultMedicines = arrayMedicine.map((element) => {
        return element.NazwaProduktuLeczniczego;
    });
    console.log(resultMedicines);
};

export default getMedicineArray;
