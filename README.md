# Prisma Transaction Example: 
01. Order Management System

This project demonstrates the implementation of sequential transactions using **Prisma Client** and **MySQL** in a Node.js backend. The example focuses on a typical **Order Management System** scenario, showcasing how to handle database transactions effectively with Prisma.

---

## **Use Case: Sequential Transactions**

### **Scenario: Order Placement Workflow**
The `placeOrder` function handles a sequential transaction that processes an order in multiple steps. The steps include:

- Creating an order
- Validating product availability
- Deducting stock
- Adding order details
- Finalizing the order

All operations are performed as part of a single transaction, ensuring **data consistency**.

---

## **Main Steps in Sequential Transactions**

### **1. Validate Customer**
- Check if the customer exists in the `Customer` table.
- If the customer does not exist, abort the transaction.

### **2. Create an Order**
- Insert a new record in the `Order` table with the status `PENDING`.

### **3. Validate and Update Product Stock**
For each item in the order:
- Verify that the product exists and has sufficient stock.
- Deduct the required quantity from the product's stock.

### **4. Add Items to Order Details**
- Insert records into the `OrderDetail` table for each product in the order.

### **5. Finalize the Order**
- Update the `Order` status to `CONFIRMED` upon successful completion of all steps.

### **6. Rollback on Failure**
- If any step fails (e.g., insufficient stock, invalid product ID), the entire transaction is rolled back.

---

# 02. Wallet Transfer System with Prisma

This project demonstrates an **interactive transaction** system for wallet transfers using Prisma and MySQL. The system allows the transfer of funds between users' wallets and logs the transaction details. This example implements an interactive method where the transaction process involves checking balances, deducting from the sender’s wallet, adding to the receiver's wallet, and logging the transaction.

## Features

- **Wallet Transfer**: Deducts funds from the sender's wallet and adds them to the receiver’s wallet.
- **Transaction Logging**: Logs the transaction details including the sender, receiver, amount, status (success or failure), and timestamp.
- **Real-time Validation**: Ensures that the sender has sufficient funds before initiating the transfer.
  
## Use Case: Wallet Transfer Workflow

The system handles the following steps when a user initiates a wallet transfer:

### Main Steps in Interactive Transactions:
1. **Validate Sender's Wallet**:
   - Check if the sender exists and has a wallet.
   - Ensure the sender has sufficient funds.
   
2. **Validate Receiver's Wallet**:
   - Check if the receiver exists and has a wallet.

3. **Deduct Amount from Sender's Wallet**:
   - If the sender’s balance is sufficient, deduct the transfer amount from their wallet.

4. **Add Amount to Receiver's Wallet**:
   - Add the specified amount to the receiver's wallet.

5. **Log Transaction**:
   - Record the transaction in the `TransactionLog` table, including the sender, receiver, amount, status (SUCCESS), and timestamp.

6. **Rollback on Failure**:
   - If any step fails, the entire transaction is rolled back, and the status of the transaction is logged as FAILED.
