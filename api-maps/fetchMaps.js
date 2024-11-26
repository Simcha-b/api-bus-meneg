import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// export async function calculateDistance(origin, destination) {
//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
//     origin
//   )}&destinations=${encodeURIComponent(
//     destination
//   )}&key=${API_KEY}&language=he`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("שגיאה בבקשת הנתונים");
//     }
//     const data = await response.json();

//     if (data.rows[0].elements[0].status === "OK") {
//       const distanceText = await data.rows[0].elements[0].distance.text;
//       return distanceText.replace("km", "ק''מ").replace("m", "מטר");
//     } else {
//       throw new Error("לא ניתן לחשב את המרחק, נסה כתובת אחרת.");
//     }
//   } catch (error) {
//     console.error("שגיאה בחישוב המרחק:", error.message);
//     throw error;
//   }
// }
export async function calculateDistance(locations) {
  if (!locations || locations.length < 2) {
    throw new Error("יש לספק לפחות שני מיקומים.");
  }

  let totalDistance = 0;

  for (let i = 0; i < locations.length - 1; i++) {
    const origin = locations[i];
    const destination = locations[i + 1];
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(
      destination
    )}&key=${API_KEY}&language=he`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `שגיאה בבקשת הנתונים: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (
        !data ||
        !data.rows ||
        !data.rows[0] ||
        !data.rows[0].elements ||
        !data.rows[0].elements[0]
      ) {
        throw new Error("התקבלו נתונים לא תקינים מה-API");
      }

      const element = data.rows[0].elements[0];
      if (element.status !== "OK") {
        throw new Error(
          `לא ניתן לחשב את המרחק בין ${origin} ל-${destination}: ${element.status}`
        );
      }

      if (!element.distance || typeof element.distance.value !== "number") {
        throw new Error(
          `נתוני המרחק חסרים או לא תקינים עבור הקטע בין ${origin} ל-${destination}`
        );
      }

      totalDistance += element.distance.value;
    } catch (error) {
      console.error("שגיאה בחישוב המרחק:", error.message);
      throw error;
    }
  }

  const totalDistanceInKm = (totalDistance / 1000).toFixed(2);
  return [{ totalDistanceInKm }];
}
