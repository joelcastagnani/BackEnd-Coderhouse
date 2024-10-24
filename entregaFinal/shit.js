const productos = [
    {
        title: "Zapatillas deportivas",
        description: "Zapatillas cómodas para correr.",
        code: "ZAP001",
        price: 49.99,
        status: true,
        stock: 100,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Botas de invierno",
        description: "Botas impermeables y cálidas.",
        code: "ZAP002",
        price: 79.99,
        status: true,
        stock: 50,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Sandalias de verano",
        description: "Sandalias ligeras y cómodas.",
        code: "ZAP003",
        price: 29.99,
        status: true,
        stock: 150,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Zapatos de cuero",
        description: "Zapatos elegantes para ocasiones especiales.",
        code: "ZAP004",
        price: 89.99,
        status: true,
        stock: 30,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Zapatillas de baloncesto",
        description: "Zapatillas diseñadas para el rendimiento en la cancha.",
        code: "ZAP005",
        price: 69.99,
        status: true,
        stock: 75,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Zapatos de oficina",
        description: "Zapatos cómodos y formales para el trabajo.",
        code: "ZAP006",
        price: 59.99,
        status: true,
        stock: 40,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Zapatillas de running",
        description: "Ideales para correr largas distancias.",
        code: "ZAP007",
        price: 54.99,
        status: true,
        stock: 60,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Bailarinas",
        description: "Bailarinas elegantes y cómodas.",
        code: "ZAP008",
        price: 39.99,
        status: true,
        stock: 80,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Botines",
        description: "Botines versátiles para el día a día.",
        code: "ZAP009",
        price: 74.99,
        status: true,
        stock: 20,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Zapatillas de skate",
        description: "Zapatillas diseñadas para el skateboarding.",
        code: "ZAP010",
        price: 64.99,
        status: true,
        stock: 55,
        category: "calzado",
        photo: "http://localhost:8080/images/1729714771669-zapas.jpg"
    },
    {
        title: "Camiseta deportiva",
        description: "Camiseta ligera y transpirable.",
        code: "ROP001",
        price: 19.99,
        status: true,
        stock: 100,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Sudadera con capucha",
        description: "Sudadera cómoda para el invierno.",
        code: "ROP002",
        price: 39.99,
        status: true,
        stock: 50,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Pantalones cortos",
        description: "Pantalones ideales para el verano.",
        code: "ROP003",
        price: 24.99,
        status: true,
        stock: 150,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Camisa de vestir",
        description: "Camisa elegante para ocasiones formales.",
        code: "ROP004",
        price: 49.99,
        status: true,
        stock: 30,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Chaqueta ligera",
        description: "Chaqueta perfecta para entretiempo.",
        code: "ROP005",
        price: 59.99,
        status: true,
        stock: 75,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Pantalones de chándal",
        description: "Pantalones cómodos para hacer ejercicio.",
        code: "ROP006",
        price: 34.99,
        status: true,
        stock: 40,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Vestido de verano",
        description: "Vestido ligero y fresco para el calor.",
        code: "ROP007",
        price: 44.99,
        status: true,
        stock: 60,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Bermudas",
        description: "Bermudas cómodas para días cálidos.",
        code: "ROP008",
        price: 29.99,
        status: true,
        stock: 80,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Abrigo de lana",
        description: "Abrigo cálido para invierno.",
        code: "ROP009",
        price: 89.99,
        status: true,
        stock: 20,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Zapatillas de casa",
        description: "Zapatillas cómodas para estar en casa.",
        code: "ROP010",
        price: 34.99,
        status: true,
        stock: 55,
        category: "ropa",
        photo: "http://localhost:8080/images/1729714725255-remera.jpg"
    },
    {
        title: "Gorra deportiva",
        description: "Gorra ligera ideal para hacer deporte.",
        code: "GOR001",
        price: 19.99,
        status: true,
        stock: 100,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra de béisbol",
        description: "Clásica gorra de béisbol para uso diario.",
        code: "GOR002",
        price: 24.99,
        status: true,
        stock: 50,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra con visera",
        description: "Gorra con visera ancha para protegerse del sol.",
        code: "GOR003",
        price: 29.99,
        status: true,
        stock: 150,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra de camionero",
        description: "Gorra de estilo camionero con malla trasera.",
        code: "GOR004",
        price: 19.99,
        status: true,
        stock: 30,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra de moda",
        description: "Gorra de diseño moderno y urbano.",
        code: "GOR005",
        price: 34.99,
        status: true,
        stock: 75,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra para niños",
        description: "Gorra divertida y colorida para los más pequeños.",
        code: "GOR006",
        price: 14.99,
        status: true,
        stock: 40,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra de lana",
        description: "Gorra de lana cálida para el invierno.",
        code: "GOR007",
        price: 29.99,
        status: true,
        stock: 60,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra de viajero",
        description: "Gorra diseñada para el viajero aventurero.",
        code: "GOR008",
        price: 39.99,
        status: true,
        stock: 80,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra de surf",
        description: "Gorra diseñada para los amantes del surf.",
        code: "GOR009",
        price: 24.99,
        status: true,
        stock: 20,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    },
    {
        title: "Gorra personalizada",
        description: "Gorra que puedes personalizar a tu gusto.",
        code: "GOR010",
        price: 44.99,
        status: true,
        stock: 55,
        category: "gorras",
        photo: "http://localhost:8080/images/1729714686791-gorra.jpeg"
    }
];
let result = await studentsModel.insertMany(students);
console.log(result);
