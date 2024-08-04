export const userData = [
    {
        id: 1,
        name: "Timur",
        surname: "Timurov",
        username: "12",
        password: "12",
        tel: "055-898-5555",
        products: [
            {
                id: 1,
                category: "lenovo",
                name: "lenovo a3 ultra",
                description: "lenovo laptop for office",
                price: 500,
                new: "yes",
                img: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjgzOTAxfGltYWdlL3BuZ3xoNTYvaDk5Lzk5MTQ4MzE0MDUwODYucG5nfDdkZTZiMjM3ZTA2YmM5NTc0ZTRjMzcyMDhmZTU5N2NjZjE1NTg0MzhjZjQ2MDU4ODMwMzVmYzAwMmQ2YjU5MDE/lenovo-thinkpad-x390-yoga-hero.png",
                ram: 16,
                cpu: "Intel i7",
                rom: 512,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "Nvidea",
            },
            {
                id: 2,
                category: "acer",
                name: "Acer Aspire 5",
                description: "Affordable Acer laptop",
                price: 450,
                new: "yes",
                img: "https://strgimgr.umico.az/sized/1680/362936-fbf212a2e3e5d6784ce2b864899d9baf.jpg",
                ram: 8,
                cpu: "AMD Ryzen 5",
                rom: 256,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "NVIDIA GeForce MX350",
            },
            {
                id: 3,
                category: "hp",
                name: "HP Pavilion",
                description: "HP laptop for everyday use",
                price: 550,
                new: "yes",
                img: "https://amazoncomp.az/wp-content/uploads/2021/07/1401678_v01_b.jpg",
                ram: 12,
                cpu: "Intel i5",
                rom: 512,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "Intel UHD Graphics",
            },
            {
                id: 4,
                category: "dell",
                name: "Dell Inspiron",
                description: "Dell laptop with a touchscreen",
                price: 700,
                new: "yes",
                img: "https://www.bakuelectronics.az/assets/images/products/92883/ezgifcom-gif-maker-1.jpg",
                ram: 16,
                cpu: "Intel i7",
                rom: 512,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "NVIDIA GeForce GTX 1650",
            },
            {
                id: 5,
                category: "asus",
                name: "Asus ROG Zephyrus",
                description: "Gaming laptop with high performance",
                price: 1200,
                new: "yes",
                img: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW16lMH?ver=de7c&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
                ram: 32,
                cpu: "AMD Ryzen 9",
                rom: 256,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "NVIDIA GeForce RTX 3080",
            },
        ],
    },
    {
        id: 2,
        name: "Nazila",
        surname: "Mirzazada",
        username: "nazila12",
        password: "pass123",
        tel: "055-123-4567",
        products: [
            {
                id: 1,
                category: "apple",
                name: "MacBook Pro",
                description: "Apple laptop with M1 chip",
                price: 1500,
                new: "yes",
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202206_GEO_EMEA?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1683823678475",
                ram: 16,
                cpu: "Apple M1",
                rom: 512,
                romType: "ssd",
                operatingSystem: "macOS",
                videoCard: "Apple GPU",
            },
            {
                id: 2,
                category: "microsoft",
                name: "Surface Laptop 4",
                description: "Microsoft laptop with touch screen",
                price: 1000,
                new: "yes",
                img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-mbp13touch-silver-2020_GEO_EMEA?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1630525404000",
                ram: 8,
                cpu: "Intel i5",
                rom: 256,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "Intel Iris Plus",
            },
            {
                id: 3,
                category: "dell",
                name: "Dell XPS 13",
                description: "Ultra-thin Dell laptop",
                price: 900,
                new: "yes",
                img: "https://images.dell.com/is/image/DellContent/content/dam/ss2/products/laptops/xps/13-9310/cli-mod02-xps-13-9310-laptop-14.jpg?fmt=jpg&wid=768",
                ram: 16,
                cpu: "Intel i7",
                rom: 512,
                romType: "ssd",
                operatingSystem: "Windows",
                videoCard: "Intel UHD Graphics",
            },
        ],
    },
];

export function initData() {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
        localStorage.clear();
        localStorage.setItem("userId", null);
        localStorage.setItem("users", JSON.stringify(userData));
    }
}

export function registrateUser(newUser) {
    const newUserWithId = {
        id: Math.random(),
        ...newUser,
    };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = [...users, newUserWithId];
    localStorage.setItem("users", JSON.stringify(newUsers));
}

export function logInUser(formData) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
        (item) =>
            item.username === formData.username && item.password === formData.password
    );

    if (user) {
        localStorage.setItem("userId", user.id);
        return user;
    } else {
        return false;
    }
}

export function logOut() {
    localStorage.setItem("userId", null);
}

export function getAllProducts() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const allProducts = users.reduce((acc, user) => {
        if (user.products && Array.isArray(user.products)) {
            return [...acc, ...user.products];
        }
        return acc;
    }, []);

    return allProducts;
}

export function getAllCategories() {
    const allProducts = getAllProducts();

    if (!Array.isArray(allProducts)) {
        console.error("getAllProducts() должен возвращать массив продуктов");
        return [];
    }
    let allCategories = allProducts.map((product) => product.category.toLowerCase());

    allCategories = [...new Set(allCategories)];

    console.log(allCategories);

    return allCategories;
}

export function getUserData() {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const users = JSON.parse(localStorage.getItem("users"));

    if (!userId) {
        console.error('userId не найден в localStorage');
        return null;
    }

    if (!users) {
        console.error('users не найдены в localStorage');
        return null;
    }

    if (!Array.isArray(users)) {
        console.error('Неправильный формат данных users в localStorage');
        return null;
    }

    const user = users.find(user => user.id === userId);

    if (!user) {
        console.warn(`Пользователь с id: ${userId} не найден`);
        return null;
    }

    console.log(`Найден пользователь:, user`);
    return user;
}

export function deleteProductFromDatabase(userId, productId) {
    // Получаем список пользователей из localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Находим индекс пользователя
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        // Находим индекс продукта у найденного пользователя
        const productIndex = users[userIndex].products.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
            // Удаляем продукт из массива у найденного пользователя
            users[userIndex].products.splice(productIndex, 1);

            // Если у пользователя больше нет продуктов, удаляем пользователя из списка
            if (users[userIndex].products.length === 0) {
                users.splice(userIndex, 1);
            }

            // Обновляем localStorage с обновленным массивом пользователей
            localStorage.setItem("users", JSON.stringify(users));

            // Возвращаем обновленного пользователя(необезательно, зависит от требований)
            return users[userIndex]
        } else {

            console.error(`Продукт © id ${productId} не найден у пользователя id ${userId}`);
            return null; // Возвращаем null, если продукт не найден у пользователя

        }

    } else {
        console.error(`Пользователь © id ${userId} не найден в localStorage`);
        return null; // Возвращаем null, если пользователь не найден

    }

}

export function addNewProductToDatabase(user, newProduct) {

    // Получаем список пользователей из localStorage 
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Находим индекс пользователя по его id 
    const userIndex = users.findIndex(item => item.id === user.id);

    if (userIndex !== -1) {
        // Обновляем список продуктов пользователя

        users[userIndex].products = [...users[userIndex].products, newProduct];

        // Обновляем localStorage с обновленным массивом пользователей

        localStorage.setItem('users', JSON.stringify(users));

        // Возвращаем обновленного пользователя

        return users[userIndex];
    } else {
        console.error('Пользователь id ${user.id} не найден в localStorage');
        return null; // Возвращаем null, если пользователь не найден

    }

}

export function editProductFromDatabase(user, updatedProducts) {

    // Создаем обновленного пользователя с обновленным списком продуктов
    const updatedUser = { ...user, products: [...updatedProducts] };

    // Получаем список пользователей из 1ocalStorage

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Находим индекс пользователя по ero id

    const userIndex = users.findIndex(item => item.id === user.id);

    if (userIndex !== -1) {

        // Обновляем пользователя в массиве пользователей

        users[userIndex] = updatedUser;

        // Обновляем localStorage с обновленным массивом пользователей

        localStorage.setItem('users', JSON.stringify(users));

        // Возвращаем обновленного пользователя

        return users[userIndex];

    } else {
        console.error(`Пользователь id ${user.id} не найден в localStorage`);
        return null; // Возвращаем null, если пользователь не найден

    }
}