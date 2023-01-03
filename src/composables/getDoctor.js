import doctors from '../jsons/lekarze.json';

const arr = doctors;

const getDoctorsArray = () => {
    const result = arr.map((element) => {
        return element.Nazwa;
    });
    console.log(result);
};

export default getDoctorsArray;
