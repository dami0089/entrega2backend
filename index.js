const fs = require("fs");
const path = "productos.json";

class productManager {
  //declaro el constructor
  // constructor() {
  //   path = "./productos.json";
  //   // this.products = [];
  // }

  //Este es el metodo para listar todos los productos
  async getProducts() {
    // return console.log(this.products);
    if (fs.existsSync(path)) {
      const productosJson = await fs.promises.readFile(path, "utf-8");
      const productosJS = JSON.parse(productosJson);
      return productosJS;
    } else {
      return [];
    }
  }

  async listarProductos() {
    const productos = await this.getProducts();
    console.log(productos);
  }

  //Este es el metodo para agregar los productos, con el id que se autoincrementa dependiendo el largo del objeto products
  async addProduct(obj) {
    const { nombre, description, price, thumbnail, code, stock } = obj;
    const products = {
      id: await this.id(),
      nombre,
      description,
      price,
      code,
      thumbnail,
      stock,
    };

    const productoArchivando = await this.getProducts();
    productoArchivando.push(products);
    // this.products.push(products);
    await fs.promises.writeFile(path, JSON.stringify(productoArchivando));
  }

  //Este metodo comprueba que el code del producto no exista ya dentro del arreglo products.

  async comprobador(obj) {
    const { code } = obj;

    const productosArchivados = await this.getProducts();

    const comprobador = productosArchivados.find(
      (product) => product.code === code
    );
    if (comprobador) {
      console.log("Este producto ya existe");
    } else {
      this.addProduct(obj);
    }
  }
  //este metodo sirve para listar los productos por id. si existe te lo muestra y sino te arroja un mensaje de que no existe.
  async getProductsById(id) {
    const existe = await this.evaluarProd(id);
    const productosArchivados = await this.getProducts();

    if (existe) {
      for (const a in productosArchivados) {
        if (productosArchivados[a].id === id) {
          console.log("El producto consultado es el: \n");
          console.log(productosArchivados[a]);
        }
      }
    } else {
      console.log("el producto no existe");
    }
  }
  //Este metodo evalua el id del producto para saber si ya existe o no
  async evaluarProd(idProd) {
    const productosArchivados = await this.getProducts();
    return productosArchivados.find((product) => product.id === idProd);
  }
  //este metodo genera el id dinamicamente
  async id() {
    const productosArchivados = await this.getProducts();
    let ids = 1;
    if (productosArchivados.length === 0) {
      ids = 1;
    } else {
      ids = productosArchivados[productosArchivados.length - 1].id + 1;
    }
    return ids;
  }
}

const productManager1 = new productManager();

async function agregarProductos() {
  //ACA CREAMOS LOS PRODUCTOS

  const producto1 = {
    titulo: "Producto de prueba",
    description: "Descripcion de un producto de prueba",
    price: "123",
    thumbnail: "No image",
    code: "1",
    stock: "123",
  };

  const producto2 = {
    titulo: "Producto22 de prueba",
    description: "222Descripcion de un producto de prueba",
    price: "22123",
    thumbnail: "222No image",
    code: "2",
    stock: "123",
  };

  const producto3 = {
    titulo: "33Producto de prueba",
    description: "33Descripcion de un producto de prueba",
    price: "33123",
    thumbnail: "3No image",
    code: "3",
    stock: "123",
  };
  setTimeout(async () => {
    await productManager1.comprobador(producto1);
  }, 200);
  setTimeout(async () => {
    await productManager1.comprobador(producto2);
  }, 300);
  setTimeout(async () => {
    await productManager1.comprobador(producto3);
  }, 200);
}

async function agregarProductoRepetido() {
  //ACA CREO UN PRODUCTO QUE YA ESTA REPETIDO PARA QUE APAREZCA EN CONSOLA QUE EL CODIGO YA FUE DADO DE ALTA ANTES

  console.log(
    "-----------------CARGO UN PRODUCTO QUE YA EXISTE Y ESTE ES EL MENSAJE: -----------------"
  );
  const producto4 = {
    titulo: "33Producto de prueba",
    description: "33Descripcion de un producto de prueba",
    price: "33123",
    thumbnail: "3No image",
    code: "3",
    stock: "123",
  };
  await productManager1.comprobador(producto4);
}

async function funcionesAdicionales() {
  console.log(
    "----------------- Llamo al metodo get products by id y me muestra el producto que existe: "
  );
  await productManager1.getProductsById(1);
  console.log(
    "-----------------Llamo al metodo getproductsbyid con un id que no existe para que me arroje el resultado ese: "
  );
  await productManager1.getProductsById(100);

  console.log(
    "-----------------Aca listamos todos los produtos: -----------------"
  );

  await productManager1.listarProductos();
}

// agregarProductos();
// agregarProductoRepetido();
funcionesAdicionales();
