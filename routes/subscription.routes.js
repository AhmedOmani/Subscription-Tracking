import { Router } from "express" ;

const subscriptionRoutes = Router();

subscriptionRoutes.get("/" , (req , res) => {
    return res.send({
        message: "GET all Subscriptions"
    });
});

subscriptionRoutes.get("/:id" , (req, res) => {
    return res.send({
        title: "GET a susbscription details"
    });
});

subscriptionRoutes.post("/" , (req, res) => {
    return res.send({
        title: "CREATE new subscription"
    });
});

subscriptionRoutes.put("/:id" , (req, res) => {
    return res.send({
        title: "UPDATE Subscription"
    });
});

subscriptionRoutes.delete("/:id" , (req , res) => {
    return res.send({
        title: "DELETE Subscription"
    });
});

subscriptionRoutes.post("/:id/cancel" , (req , res) => {
    return res.send({
        message: "Subscription canceled"
    });
});

subscriptionRoutes.get("/upcoming-renewls" , (req , res) => {
    return res.send({
        message: "Upcoming renewls"
    });
});

export default subscriptionRoutes;