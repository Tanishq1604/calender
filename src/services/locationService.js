export async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            resolve({
                latitude: 28.8389,  // Default to Moradabad
                longitude: 78.7768,
                timezone: 5.5
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Get timezone using Google Time Zone API or similar
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/timezone/json?location=${position.coords.latitude},${position.coords.longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=YOUR_GOOGLE_API_KEY`
                    );
                    const data = await response.json();
                    const timezoneOffset = data.rawOffset / 3600; // Convert seconds to hours

                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timezone: timezoneOffset
                    });
                } catch (error) {
                    console.error('Error getting timezone:', error);
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timezone: 5.5 // Default to IST if timezone API fails
                    });
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                resolve({
                    latitude: 28.8389,  // Default to Moradabad
                    longitude: 78.7768,
                    timezone: 5.5
                });
            }
        );
    });
}
