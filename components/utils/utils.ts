export const extractKeys = (data: any[]) => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  };

  export const formatDate = (date: Date | null): string => {
    console.log('Date:', date);
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  export const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{8}$/.test(dateString);
  };

  export const mapKeys = (data: any[], keys: string[]) => {
    return data.map(item => {
      const newItem: any = {};
      Object.keys(item).forEach((key, index) => {
        newItem[keys[index]] = item[key];
      });
      return newItem;
    });
  };