// Simple Panchang calculation (fallback)
export function calculateSimplePanchang(date) {
    const lunarDay = Math.floor((date - new Date('2024-01-11')) / (24 * 60 * 60 * 1000));
    const tithiIndex = lunarDay % 30;
    const isShukla = Math.floor(lunarDay / 15) % 2 === 0;

    const tithiNames = [
        'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
        'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
        'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा'
    ];

    const nakshatraNames = [
        'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा',
        'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा',
        'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाती',
        'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढा',
        'उत्तराषाढा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद',
        'उत्तरा भाद्रपद', 'रेवती'
    ];

    return {
        thithi: `${tithiNames[tithiIndex % 15]} (${isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})`,
        nakshatra: nakshatraNames[Math.floor(lunarDay % 27)],
        yoga: 'Not available',
        karana: 'Not available',
        specialDay: null
    };
}
