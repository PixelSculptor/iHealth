import medicines from '../jsons/medicines.json';

const getMedicineArray = () => {
    medicines.map((element) => ({
        MedicineName: element.MedicinesName,
        MedicinePower: element.Power,
        Form: element.MedicineForm,
        Substance: element.MedicineSubstance,
        ManfacturerName: element.MedicineManufacturName,
        Leaflet: element.MedicineManufacturName,
    }));
};

export default getMedicineArray;
