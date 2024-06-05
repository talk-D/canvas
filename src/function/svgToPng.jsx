import axios from 'axios';

export const svgToPng = async (blob, filename) => {
    const formData = new FormData();
    formData.append('file', blob, filename);

    try {
        await axios.post('http://localhost:5000/tabbar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error SVG to PNG:', error);
        throw error;  // 오류를 다시 던져서 handleTabberButton 함수에서 캐치할 수 있게 합니다.
    }
};
