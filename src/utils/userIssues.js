import { ref } from 'vue';

const userIssues = ref([
    {
        class: 'fa-solid fa-droplet',
        type: 'blood',
        issueKey: 'bloodType',
        label: 'Grupa krwi',
        userData: 'Brak',
    },
    {
        class: 'fa-solid fa-hand-dots',
        type: 'allergies',
        issueKey: 'allergies',
        label: 'Uczulenia',
        userData: 'Brak',
    },
    {
        class: 'fa-solid fa-syringe',
        type: 'diabetes',
        issueKey: 'diabetes',
        label: 'Cukrzyca',
        userData: 'Nie',
    },
    {
        class: 'fa-solid fa-lungs',
        type: 'others',
        issueKey: 'isOrganDonor',
        label: 'Dawca organów',
        userData: 'Nie',
    },
    {
        class: 'fa-solid fa-crutch',
        type: 'others',
        issueKey: 'isBloodDonor',
        label: 'Honorowy dawca krwi',
        userData: 'Nie',
    },
]);

export default userIssues;
