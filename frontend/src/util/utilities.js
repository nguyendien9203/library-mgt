  // Function to generate a random 5-digit number
  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  // Function to generate the barcode
  export const generateBarcode = () => {
    return `BC${generateRandomNumber()}`;
  };