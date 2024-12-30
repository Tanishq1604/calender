import { panchang } from 'mhah-panchang';
import { calculateSimplePanchang } from './simplePanchang';
import { hindiTithi, hindiNakshatra } from './hindiPanchang';

const tithiNames = [
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
    'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
    'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा/अमावस्या'
];

const pakshNames = ['शुक्ल पक्ष', 'कृष्ण पक्ष'];

let locationCache = null;

async function getLocation() {
    if (!locationCache) {
        locationCache = {
            latitude: 28.8389,  // Moradabad coordinates
            longitude: 78.7768,
            timezone: 5.5
        };
    }
    return locationCache;
}

async function calculatePanchang(date) {
    try {
        const place = await getLocation();
        
        try {
            // Try using mhah-panchang library
            const result = MhahPanchang.default.calculate({
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                hour: 12,
                min: 0,
                lat: place.latitude,
                lon: place.longitude,
                tzone: place.timezone
            });

            // Convert to Hindi
            const tithiName = hindiTithi[result.tithi] || result.tithi;
            const pakshaName = hindiTithi[result.paksha] || result.paksha;
            const nakshatraName = hindiNakshatra[result.nakshatra] || result.nakshatra;

            return {
                thithi: `${tithiName} (${pakshaName})`,
                nakshatra: nakshatraName,
                yoga: result.yoga,
                karana: result.karana,
                specialDay: getSpecialDay(date.toISOString().split('T')[0])
            };
        } catch (libraryError) {
            console.warn('mhah-panchang failed, using fallback calculator');
            // Use fallback calculation if library fails
            return calculateSimplePanchang(date);
        }
    } catch (error) {
        console.error('Error in panchang calculation:', error);
        return calculateSimplePanchang(date);
    }
}

async function generatePanchangData() {
    const panchangData = {};
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2025-12-31');

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        panchangData[dateStr] = await calculatePanchang(new Date(d));
    }
    return panchangData;
}

function getSpecialDay(dateStr) {
    // Only include Hindu festivals and special days
    const specialDays = {
        '2024-01-15': 'मकर संक्रांति',
        '2024-01-24': 'बसंत पंचमी',
        '2024-03-25': 'होली',
        '2024-04-09': 'चैत्र नवरात्रि',
        '2024-04-17': 'राम नवमी',
        '2024-08-19': 'रक्षाबंधन',
        '2024-09-07': 'कृष्ण जन्माष्टमी',
        '2024-10-02': 'शारदीय नवरात्रि',
        '2024-10-12': 'दशहरा',
        '2024-11-01': 'दीपावली',
        '2025-01-14': 'मकर संक्रांति',
        '2025-02-12': 'बसंत पंचमी',
        '2025-03-14': 'होली',
        '2025-03-30': 'चैत्र नवरात्रि',
        '2025-04-08': 'राम नवमी',
        '2025-08-09': 'रक्षाबंधन',
        '2025-08-27': 'कृष्ण जन्माष्टमी',
        '2025-09-22': 'शारदीय नवरात्रि',
        '2025-09-30': 'दशहरा',
        '2025-10-20': 'दीपावली'
    };
    return specialDays[dateStr];
}

// Export only once
export async function initializePanchangData() {
    return await generatePanchangData();
}
