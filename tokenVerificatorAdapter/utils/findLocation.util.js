import maxmind from "maxmind";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../GeoLite2-City.mmdb');
const lookup = await maxmind.open(dbPath);


export async function findLocation(ip) {
    if(ip==="::1"||ip==="127.0.0.1") {
        return "india-gujarat-surat";
    }
    const geo = lookup.get(ip);
    if (geo) {
        const country = geo.country?.names?.en || 'N/A';
        const state = geo.subdivisions?.[0]?.names?.en || 'N/A';
        const city = geo.city?.names?.en || 'N/A';
        return `${city}-${state}-${country}`;
    } else {
        return null;
    }
};


export async function findCoordinates(ip) {
    if(ip==="::1"||ip==="127.0.0.1") {
        return "0, 1";
    }
    const geo = lookup.get(ip);
    if (geo && geo.location) {
        return `${geo.location.latitude}, ${geo.location.longitude}`;
    } else {
        return null;
    }
};


