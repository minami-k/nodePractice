CREATE TABLE `products`(
    `id`int NOT NULL PRIMARY KEY,
    `title` varchar(255) NOT NULL, 
    `imageUrl` varchar(255) NOT NULL, 
    `description` text NOT NULL,
    `price` double NOT NULL
    );

   