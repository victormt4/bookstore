class Book {
    public id: number;
    public name: string;
    public author: string;
    public category: string;
    public image: string;
    public description: string;
    public stock: number;
    public likes: number;
    public liked: boolean;

    constructor(id: number, name: string, author: string, category: string, image: string, description: string, stock: number, likes: number) {
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