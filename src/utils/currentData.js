export const currentDate = () => {
    const now = new Date();
    const months = [
        'stycznia',
        'lutego',
        'marca',
        'kwietnia',
        'maja',
        'czerwca',
        'lipca',
        'sierpnia',
        'wrzesnia',
        'października',
        'listopada',
        'grudnia',
    ];
    const currentData = ` ${now.getDate()} ${
        months[now.getMonth()]
    } ${now.getFullYear()}`;
    return currentData;
};
