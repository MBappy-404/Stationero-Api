import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import { USER_ROLE } from "../User/user.constant";
import { AdminController } from "./admin.controller";


const router = Router();

router.patch('/users/:userId/block', verifyToken(USER_ROLE.admin),  AdminController.blockUserByAdmin);
router.patch('/orders/:orderId/status', verifyToken(USER_ROLE.admin),   AdminController.shippingProduct);
 

export const AdminRoutes = router;