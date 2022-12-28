const checkPesel = (pesel) => {
    const WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const pattern = /^[0-9]{11}$/;

    if (typeof pesel !== 'string' || !pattern.exec(pesel)) return false;

    const peselPattern = pesel.slice(0, 10);
    const controlSum = peselPattern
        .split('')
        .map((letter, index) => {
            return parseInt(letter) * WEIGHTS[index];
        })
        .reduce((acc, current) => acc + current, 0)
        .toString();

    return (
        (10 - parseInt(controlSum[controlSum.length - 1])).toString() ===
        pesel[pesel.length - 1]
    );
};

export default checkPesel;
