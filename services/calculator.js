document.addEventListener('DOMContentLoaded', function() {
    const basicServiceSelect = document.getElementById('basic-service');
    const additionalInterviewCheckbox = document.getElementById('additional-interview');
    const careerConsultationCheckbox = document.getElementById('career-consultation');
    const interviewCount = document.getElementById('interview-count');
    const decreaseInterview = document.getElementById('decrease-interview');
    const increaseInterview = document.getElementById('increase-interview');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultSummary = document.getElementById('result-summary');
    const totalPrice = document.getElementById('total-price');
    
    additionalInterviewCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      interviewCount.disabled = !isChecked;
      decreaseInterview.disabled = !isChecked || parseInt(interviewCount.value) <= 1;
      increaseInterview.disabled = !isChecked || parseInt(interviewCount.value) >= 5;
    });
    
    decreaseInterview.addEventListener('click', function() {
      let count = parseInt(interviewCount.value);
      if (count > 1) {
        interviewCount.value = --count;
        decreaseInterview.disabled = count <= 1;
        increaseInterview.disabled = count >= 5;
      }
    });
    
    increaseInterview.addEventListener('click', function() {
      let count = parseInt(interviewCount.value);
      if (count < 5) {
        interviewCount.value = ++count;
        decreaseInterview.disabled = count <= 1;
        increaseInterview.disabled = count >= 5;
      }
    });
    
    interviewCount.addEventListener('change', function() {
      let count = parseInt(this.value);
      
      if (isNaN(count) || count < 1) {
        this.value = 1;
        count = 1;
      } else if (count > 5) {
        this.value = 5;
        count = 5;
      }
      
      decreaseInterview.disabled = count <= 1;
      increaseInterview.disabled = count >= 5;
    });
    
    calculateBtn.addEventListener('click', calculatePrice);
    resetBtn.addEventListener('click', resetForm);
    
    function calculatePrice() {
      if (!basicServiceSelect.value) {
        alert('Please select a base service first.');
        return;
      }

      const selectedOption = basicServiceSelect.options[basicServiceSelect.selectedIndex];
      const baseServiceName = selectedOption.text.split(' (')[0];
      const baseServicePrice = parseInt(selectedOption.dataset.price);
      
      let total = baseServicePrice;
      let serviceItems = [
        {
          name: baseServiceName,
          price: baseServicePrice
        }
      ];
      
      if (additionalInterviewCheckbox.checked) {
        const count = parseInt(interviewCount.value);
        const interviewPrice = 200 * count;
        total += interviewPrice;
        serviceItems.push({
          name: `Additional Candidate Interview (${count})`,
          price: interviewPrice
        });
      }
      
      if (careerConsultationCheckbox.checked) {
        const consultationPrice = 800;
        total += consultationPrice;
        serviceItems.push({
          name: 'Career Consultation & Guidance',
          price: consultationPrice
        });
      }
      
      displayResults(serviceItems, total);
    }
    
    function displayResults(serviceItems, total) {
      resultSummary.innerHTML = '';
      
      serviceItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'result-item';
        itemElement.innerHTML = `
          <span class="service-name">${item.name}</span>
          <span class="service-price">₪${item.price.toLocaleString()}</span>
        `;
        resultSummary.appendChild(itemElement);
      });
      
      totalPrice.textContent = `₪${total.toLocaleString()}`;
    }
    
    function resetForm() {
      basicServiceSelect.value = '';
      additionalInterviewCheckbox.checked = false;
      careerConsultationCheckbox.checked = false;
      interviewCount.value = 1;
      interviewCount.disabled = true;
      decreaseInterview.disabled = true;
      increaseInterview.disabled = true;
      
      resultSummary.innerHTML = '<p class="empty-message">Select services to see price calculation.</p>';
      totalPrice.textContent = '₪0';
    }
  });