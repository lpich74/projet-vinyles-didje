import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

export function isUserConnected() {
    return localStorage.getItem('token') !== null;
}

export async function getAllRecords(setRecords) {
    try {
        const response = await axios.get(API_ROUTES.RECORDS);
        if (response.status === 200) {
            setRecords(response.data);
            console.log('Records loaded successfully:', response.data);
        } else {
            window.alert('Échec lors de la récupération des disques !');
            console.error('Records failed to load:', response.statusText);
        }
    } catch (error) {
        window.alert('Erreur lors de la récupération des disques !');
        console.error('Error retrieving the records:', error.message);
    }
};

export async function getMyRecords(setRecords, setFilteredRecords) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_ROUTES.MY_RECORDS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            setRecords(response.data);
            setFilteredRecords(response.data);
            console.log('Records loaded successfully:', response.data);
        } else {
            window.alert('Échec lors de la récupération des disques !');
            console.error('Records failed to load:', response.statusText);
        }
    } catch (error) {
        window.alert('Erreur lors de la récupération des disques !');
        console.error('Error retrieving the records:', error.message);
    }
};

export function handleCoverChange(event, setCover, setCoverPreview) {
    const file = event.target.files[0];
    if (file) {
        const maxPhotoSize = 1 * 1024 * 1024;
        if (file.size > maxPhotoSize) {
            window.alert('Taille de 1mo dépassée !');
            setCover('');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setCover(file);
            setCoverPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

export function generateDateOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    }
    return years.map((year) => (
        <option key={year} value={year}>
            {year}
        </option>
    ));
};

export async function handleDelete(recordId, records, setRecords, filteredRecords, setFilteredRecords) {
    // ouvre une fenêtre de confirmation avant de supprimer définitivement le disque
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce disque ?");

    if (confirmation) {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            const response = await axios.delete(`${API_ROUTES.RECORDS}/${recordId}`, { headers: headers });
            if (response.status === 200) {
                setRecords(records.filter(record => record._id !== recordId));
                setFilteredRecords(filteredRecords.filter(record => record._id !== recordId));
                window.alert('Disque supprimé !');
            } else {
                window.alert("Échec lors de la suppression du disque !");
                console.error('Record failed to delete:', response.statusText);
            }
        } catch (error) {
            window.alert("Erreur lors de la suppression du disque !");
            console.error('Error while deleting the record:', error.message);
        }
    }
};