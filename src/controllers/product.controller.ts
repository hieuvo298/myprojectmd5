import express, { Request, Response } from "express";
import ProductService from "../services/products.service";
import uploadCloud from "../configs/multer.cloudinary";

const productController = express.Router();
const productService = new ProductService();

productController.post(
  "/create",
  uploadCloud.single("productImage"),
  async (req: Request, res: Response) => {
    try {
      const imgProduct = req.file as Express.Multer.File;
      const newProduct = {
        categoryId: req.body.categoryId,
        productName: req.body.productName,
        productImage: imgProduct.path,
        description: req.body.description,
        price: req.body.price,
      };
      await productService.createProduct(newProduct);
      res.status(201).json({ msg: "Product created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);
productController.get("/get-by-ids", async (req: Request, res: Response) => {
  try {
    const ids: number[] = req.query.ids as any;
    const products = await productService.getProductByIds(ids);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

productController.patch(
  "/update/:id",
  uploadCloud.single("productImage"),
  async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id);
      const imgProduct = req.file as Express.Multer.File;
      const formUpdate = {
        categoryId: req.body.categoryId,
        productName: req.body.productName,
        productImage: imgProduct.path,
        description: req.body.description,
        price: req.body.price,
      };
      await productService.updateProduct(formUpdate, productId);
      res.status(200).json({ msg: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

productController.patch("/delete/:id", async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    await productService.softDeleteProduct(productId);
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
productController.patch("/return/:id", async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    await productService.returnProduct(productId);
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

productController.get("/get-all", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 6;
    const sortBy = req.query.sortBy as string | null;

    const data = await productService.getAllProduct(page, pageSize, sortBy);
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Get failed" });
  }
});
productController.get("/get-all-admin", async (req, res) => {
  try {
    const data = await productService.getAllProductAdmin();
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Get failed" });
  }
});
productController.get("/get-all/sort", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 6;
    const sortBy = req.query.sortBy as string;

    const data = await productService.getAllProduct(page, pageSize, sortBy);
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Get failed" });
  }
});
productController.get(
  "/get-by-category/:categoryId",
  async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.categoryId);
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 6;
      const sortBy = req.query.sortBy as string | null;

      const data = await productService.getProductsByCategory(
        categoryId,
        page,
        pageSize,
        sortBy
      );
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "Get by category failed" });
    }
  }
);

productController.get("/:id", async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const product = await productService.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
productController.get("/search", async (req, res) => {
  try {
    const productName = req.query.name as string; 

    const data = await productService.searchProductByName(productName);
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Search failed" });
  }
});


export default productController;
