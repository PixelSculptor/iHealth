import doctors from '../jsons/doctors.json';

const getDoctorsArray = () => {
    doctors.map((element) => ({
        DoctorName: element.NameAndSurnameDoctor,
        BookNumber: element.BookNumberDoctor,
        MedicalCode: element.MedicalCodeDoctor,
        MedicalOfficeDescription: element.MedicalDescription,
        Street: element.StreetOffice,
        BuildingNumber: element.BuildingOffice,
        PostalCode: element.PostalCodeOffice,
        Town: element.TownOffice,
    }));
};

export default getDoctorsArray;
