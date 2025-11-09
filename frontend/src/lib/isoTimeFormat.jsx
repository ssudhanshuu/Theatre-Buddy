const isoDateTimeFormat = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export default isoDateTimeFormat;