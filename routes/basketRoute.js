"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
async function basketRoute(req, res) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ohtoriaketi@gmail.com',
                pass: '461895300677' // generated ethereal password
            }
        });
        req.on('data', async (chunk) => {
            let body = JSON.parse(`${chunk}`);
            let info = await transporter.sendMail({
                from: 'merzlyakoff.ilya@yandex.ru',
                to: `ohtori@mail.ru, ${body.email}`,
                subject: "Company Entertainment",
                text: "Оформлен заказ на сайте company-entertainment",
                html: `
          <h1>Заказ с сайта Company Entertainment</h1>
          <p><strong>Имя: </strong> ${body.name}</p>
          <p><strong>Телефон: </strong> ${body.phone}</p>
          <p><strong>Email: </strong> ${body.email}</p>
          ${body.goods.map((good) => {
                    return `
              <p>${good.title}: <strong>${good.amount} шт.</strong></p>
              <p>Цена: ${good.price}/шт.</p>
              <br><br>
            `;
                })}
          <h2>Итоговая сумма: ${body.totalPrice}</h2>
        `
            });
            if (!info) {
                return res.status(500);
            }
            res.status(200).json({});
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500);
    }
}
module.exports = basketRoute;
