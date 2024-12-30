let panchangData = null;

export async function getHinduCalendarData(date) {
    try {
        if (!panchangData) {
            const { initializePanchangData } = await import('../utils/panchangCalculator');
            panchangData = await initializePanchangData();
        }
        
        // Handle potential calculation errors
        const data = panchangData[date];
        if (!data) {
            return {
                thithi: '',
                nakshatra: '',
                yoga: '',
                karana: '',
                special: null
            };
        }
        return data;
    } catch (error) {
        console.error('Error getting Hindu calendar data:', error);
        return {
            thithi: '',
            nakshatra: '',
            yoga: '',
            karana: '',
            special: null
        };
    }
}
