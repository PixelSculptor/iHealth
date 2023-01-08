import medicines from '../jsons/medicines.json';

const getMedicineArray = () => {
    medicines.map((element) => ({
        medicineName: element.medicinesName,
        medicinePower: element.power,
        form: element.medicineForm,
        substance: element.medicineSubstance,
        manfacturerName: element.medicineManufacturName,
        leaflet: element.medicineManufacturName,
    }));
};
export default getMedicineArray;
