import doctors from '../apiData/doctors.json';

const getDoctorsArray = () => {
    doctors.map((element) => ({
        doctorName: element.nameAndSurnameDoctor,
        bookNumber: element.bookNumberDoctor,
        medicalCode: element.medicalCodeDoctor,
        medicalOfficeDescription: element.medicalDescription,
        street: element.streetOffice,
        buildingNumber: element.buildingOffice,
        postalCode: element.postalCodeOffice,
        town: element.townOffice,
    }));
};

export default getDoctorsArray;
