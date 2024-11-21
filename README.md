# **Prisma Transaction Example: 
01. Order Management System**

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
