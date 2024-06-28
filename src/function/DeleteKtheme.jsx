import React from 'react';


const DeleteKtheme = async () => {
    try {
        const response = await fetch('http://'+process.env.HOST+':'+process.env.PORT+'/deleteKtheme', {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('ktheme files deleted successfully');
        } else {
            alert('Failed to delete ktheme files');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting ktheme files');
    }
    };
export default DeleteKtheme;
