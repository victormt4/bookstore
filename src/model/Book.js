class Book {

    constructor(id, name, author, category, image, description, stock, likes) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.category = category;
        this.image = image;
        this.description = description;
        this.stock = stock;
        this.likes = likes;
        this.liked = false;
    }
}

export default Book;