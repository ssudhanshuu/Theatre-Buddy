<<<<<<< HEAD
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
=======
const isoTimeFormat = (dateTime) =>{
    const date = new Date(dateTime);
    const localTime = date.toLocaleDateString('en-US',{
        hour:'2-digit',
        minute:'2-digit',
        hour12:true ,

    });
    return localTime;
}

export default isoTimeFormat 
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
