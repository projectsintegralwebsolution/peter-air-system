const fs = require('fs');
const path = require('path');

['EnquiryForm.tsx', 'EnquiryModal.tsx'].forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', 'components', file);
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/&amp;/g, '&');
  fs.writeFileSync(filePath, code);
  console.log(file, 'updated.');
});
