import medicines from '../apiData/medicines.json';

const getMedicineArray = () => {
    return medicines.map((element) => ({
        medicineName: element.medicinesName,
        medicinePower: element.power,
        form: element.medicineForm,
        substance: element.medicineSubstance,
        manfacturerName: element.medicineManufacturName,
        leaflet: element.medicineManufacturName,
    }));
};
export default getMedicineArray;
