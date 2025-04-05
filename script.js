//Get elements from HTML using their IDs
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

let transactions = loadTransactionsFromCookies(); // Load from cookies

//save transactions to cookies
//JSON.stringify().-Converts the transactions array to a string so that it can be stored in a cookie
function saveTransactionsToCookies() {
    document.cookie = `transactions=${JSON.stringify(transactions)}; 
    path=/`;//ensures accessability of cookies from any page
  }

//load transactions from cookies
function loadTransactionsFromCookies() {
    const cookie = document.cookie
      .split('; ')//splits the cookies into arrays
      .find(row => row.startsWith('transactions='));//find cookies that starts with transactions
    return cookie ? JSON.parse(cookie.split('=')[1]) : [];//turns it back to an actual array
  }
 
  //Add transaction
  form.addEventListener('submit', function (e) {
    e.preventDefault();//prevents form submission from refreshing the page
    const desc = descriptionInput.value.trim();
    //trim removes whitespace from the beginning and end of the string
    const amount = parseFloat(amountInput.value);
    if (desc && !isNaN(amount)) {
      transactions.push({ id: Date.now(), desc, amount });//add new item
      descriptionInput.value = '';//clears the description input box
      amountInput.value = '';//clears the amount input box
      updateUI();//refreshes the screen to show updated list of transactions
    }
  });

  //Remove transaction
  function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);//keeps all transactions except the one with the given id
    updateUI();
  }

  //Filter transactions
  function filterTransactions(type) {//it filters transactions based on a certain type
    updateUI(type);
  }

  //Update UI
  function updateUI(filter = 'all') {
    transactionList.innerHTML = '';//clears any previous list
    let income = 0;//variables for total
    let expense = 0;//variables for total
  
    transactions.forEach((t) => {//loops through all the transactions
      if (filter !== 'all' && (filter === 'income' && t.amount < 0 || filter === 'expense' && t.amount > 0)) {
        return;
      }
  
      const li = document.createElement('li');//creates a new list item which represents a single transaction
      li.className = t.amount >= 0 ? 'income' : 'expense';
      li.innerHTML = `
        ${t.desc} - Ksh ${Math.abs(t.amount)}
        <button onclick="removeTransaction(${t.id})">❌</button> 
      `;
      transactionList.appendChild(li);//adds the newly created list
  
      if (t.amount >= 0) {
        income += t.amount;
      } else {
        expense += t.amount;
      }
    });
  
    //Update the UI with totals
    totalIncomeEl.textContent = `Ksh ${income}`;
    totalExpenseEl.textContent = `Ksh ${Math.abs(expense)}`;//updates by showing a positive number using Math.abs()
    balanceEl.textContent = `Ksh ${income + expense}`;
    saveTransactionsToCookies();//saves transactions to cookies
  }
  
// Initialize UI
updateUI();

  
  

  


  