function submitForm() {
    var formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      department: document.getElementById('department').value,
      gender: document.getElementById('gender').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
    };
  
    console.log('Form Data:', formData);
  }
  