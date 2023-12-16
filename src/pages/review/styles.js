export const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    maxWidth: '100%',
    overflowX: 'auto',
    padding: '150px',
  };
  
  export const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
  };
  
  export const theadStyle = {
    backgroundColor: '#2a8757',
    color: 'white',
  };
  
  export const headerCellStyle = {
    padding: '12px',
    textAlign: 'center',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
  };
  
  export const tableCellStyle = {
    borderBottom: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
  };

  export const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    
  };
  export  const modalContentStyle = {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
    
  
  };
  