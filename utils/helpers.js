module.exports = {
  formatDate: (date) => {
   
    if (!date) {
      return ''; 
    }
    
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(); 
  },
};
