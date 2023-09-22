const dataArray = [
    ["name", "email", "lastname", "blog"],
    ["Carl", "carl@yahoo.com", "N", "http://blog.carl.com"],
    ["Mila", "jane@janedoe.com", "Adams", "https://blog.anedoe.com"],
    ["John", "john@johndoe.com", "A", "https://blog.johndoe.com"],
    ["John", "john@johndoe.com", "A", "https://blog.johndoe.com"],
    ["John", "john@johndoe.com", "A", "https://blog.johndoe.com"],
    [""],
  ];
  
  dataArray.pop();
  const headers = dataArray[0];
  
  const result = dataArray.slice(1).map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  
  console.log(result);
