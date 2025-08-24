export function deepSanatize(inputString) {
    if (!inputString.trim()) {
        return null;
    };
    if (typeof inputString === "string") {
    return inputString  
      .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|MERGE)\b)/gi, "")
      .replace(/(--|#|;|\/\*|\*\/)/g, "")
      .replace(/['"`\\]/g, "")
      .replace(/\$where|\$regex|\$ne|\$eq|\$gt|\$lt|\$gte|\$lte|\$in|\$nin|\$exists|\$all|\$size/gi, "")
      .toLowerCase();
  }
  return inputString;
}