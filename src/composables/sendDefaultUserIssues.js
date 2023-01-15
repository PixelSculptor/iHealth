import useCollection from './useCollections.js';
import { timestamp } from '../firebase/config.js';

const { error, addDoc } = useCollection('userIssues');
export const sendDefaultUserIssues = async (userId) => {
    try {
        await addDoc({
            userId,
            bloodType: '',
            allergies: '',
            diabetes: false,
            isBloodDonor: false,
            isOrganDonor: false,
            createdAt: timestamp(),
        });
        if (error.value) {
            throw new Error();
        }
        console.log(`Sent default issues for user`);
    } catch (err) {
        console.log(error.value);
    }
};
