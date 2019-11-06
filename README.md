# bamazon-app
Amazon like MySql application

1. The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. 



2. Then when user selects product they wish to purchase the app asks for the quantity they want to purchase. After user enters quantity the app checks with the database to ensure there is enough quantity available in stock to satisfy order. If not then it displays the message.


3. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.