// Utility function to serialize Firestore data
export function serializeData(data) {
  if (!data) return null;
  
  if (data instanceof Date) {
    return data.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }

  if (typeof data === 'object' && data !== null) {
    // Handle Firestore Timestamp
    if (data.toDate instanceof Function) {
      return data.toDate().toISOString();
    }

    // Handle regular objects
    const serialized = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeData(value);
    }
    return serialized;
  }

  return data;
} 