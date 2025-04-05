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
  

  


  