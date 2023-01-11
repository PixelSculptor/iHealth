const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const getDate = () => {
    return new Date().toLocaleDateString('pl-PL', options);
};
