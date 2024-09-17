// Get HTML elements
let expenseForm = document.getElementById('expenseForm');
let amountInput = document.getElementById('amount');
let descriptionInput = document.getElementById('description');
let dateInput = document.getElementById('date');
let expenseList = document.getElementById('expenseList');
let totalAmountElement = document.getElementById('totalAmount');

// Initialize an empty array for expenses
let expenses = [];

// Function to update the display of expenses and total amount
function updateDisplay() {
    expenseList.innerHTML = ''; // Clear the current list
    let totalAmount = 0; // Initialize total amount to 0

    // Loop through each expense and create a list item
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount} (${expense.date})`;
        expenseList.appendChild(li);
        
        // Add the expense amount to the total
        totalAmount += parseFloat(expense.amount);
    }

    // Update the total amount on the page
    totalAmountElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
}

// Function to add a new expense
function addExpense(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get values from input fields
    const amount = amountInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;

    // Create a new expense object
    const newExpense = {
        amount: amount,
        description: description,
        date: date
    };

    // Add the new expense to the array
    expenses.push(newExpense);

    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', expenses);

    // Clear input fields
    amountInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '';

    // Update the display
    updateDisplay();
}

// Load expenses from local storage when the page loads
function loadExpenses() {
    let storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
    }
    updateDisplay();
}

// Attach the addExpense function to the form's submit event
expenseForm.addEventListener('submit', addExpense);

// Load expenses and update display on page load
loadExpenses();
